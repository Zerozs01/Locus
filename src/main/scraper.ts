import { chromium, type Browser, type Page } from 'playwright';
import { getExplorePlaceById, updateExplorePlace } from './database/db'; // I need to verify these exist or create them

export interface ScrapedData {
  thumbnailUrl?: string;
  fullImageUrl?: string;
  description?: string;
  rating?: number;
  openingHours?: string;
  sourceUrl?: string;
}

export async function scrapeGoogleMaps(
  page: Page,
  placeName: string,
  locationName: string | null,
  sourceUrl?: string | null
): Promise<ScrapedData> {
  const searchQuery = locationName
    ? `${placeName} ${locationName} ประเทศไทย`
    : `${placeName} ประเทศไทย`;

  const encodedQuery = encodeURIComponent(searchQuery);
  const searchUrl = `https://www.google.com/maps/search/${encodedQuery}`;
  const targetUrl = sourceUrl && sourceUrl.startsWith('http') ? sourceUrl : searchUrl;

  console.log(`  🔍 Searching: ${searchQuery}`);

  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    try {
      await page.waitForSelector('img[src*="googleusercontent"], a[href*="/maps/place/"]', { timeout: 5000 });
    } catch {}

    const result: ScrapedData = {
      sourceUrl: page.url(),
    };

    const currentUrl = page.url();
    if (currentUrl.includes('consent.google.com')) return result;

    if (currentUrl.includes('/maps/search/')) {
      try {
        const firstResult = page.locator('a[href^="https://www.google.com/maps/place"]').first();
        if (await firstResult.count()) {
          await firstResult.click({ timeout: 5000 });
          try {
            await page.waitForSelector('img[src*="googleusercontent"]', { timeout: 5000 });
          } catch {}
          result.sourceUrl = page.url();
        }
      } catch {}
    }

    try {
      try { await page.waitForSelector('[class*="fontDisplayLarge"]', { timeout: 3000 }); } catch {}
      let ratingText = null;
      try { ratingText = await page.locator('[class*="fontDisplayLarge"]').first().textContent({ timeout: 2000 }); } catch {}
      if (ratingText) {
        const ratingNum = parseFloat(ratingText.trim());
        if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) result.rating = ratingNum;
      }
      if (!result.rating) {
        try {
          const ratingLabel = await page.locator('div[role="img"][aria-label*="ดาว"], div[role="img"][aria-label*="stars"]').first().getAttribute('aria-label', { timeout: 2500 });
          const match = ratingLabel?.match(/(\d+(?:[\.,]\d+)?)/);
          if (match) {
            const num = parseFloat(match[1].replace(',', '.'));
            if (!isNaN(num) && num >= 1 && num <= 5) result.rating = num;
          }
        } catch {}
      }
    } catch {}

    // Try to get multiple image URLs
    try {
      let clicked = false;
      const selectors = [
        'img[src*="googleusercontent"]',
        'img[src*="ggpht.com"]',
        'button[aria-label*="รูปภาพ ของ"]',
        'button[aria-label*="Photo of"]',
        'button[aria-label*="ภาพถ่ายของ"]',
        'button[aria-label*="รูปภาพ"]',
        'button[aria-label*="ภาพถ่าย"]',
        'button[aria-label*="Photo"]',
        'button[aria-label*="photo"]'
      ];
      
      for (const selector of selectors) {
        try {
          const btn = page.locator(selector).first();
          if (await btn.isVisible({ timeout: 1000 })) {
            console.log(`  [Scraper] Clicking gallery selector: ${selector}`);
            await btn.click({ force: true });
            await page.waitForTimeout(800);
            
            // Check if gallery is opened by verifying if there are multiple images loaded
            const imgCount = await page.locator('img[src*="googleusercontent"], img[src*="ggpht.com"]').count();
            if (imgCount > 2) {
              console.log(`  [Scraper] Gallery successfully opened with ${imgCount} images using: ${selector}`);
              clicked = true;
              break;
            }
          }
        } catch (e) {
          console.warn(`  [Scraper] Selector click attempt failed (${selector}):`, e);
        }
      }

      // Wait for gallery images to settle
      try {
        await page.waitForSelector('img[src*="googleusercontent"], img[src*="ggpht.com"]', { timeout: 3000 });
      } catch {}

      const imgLocators = await page.locator('img[src*="googleusercontent"], img[src*="ggpht.com"]').all();
      const imgUrls = new Set<string>();
      
      for (const img of imgLocators) {
        try {
          const src = await img.getAttribute('src');
          if (src) {
            // Golden Rule: Exclude Google User Avatars/Profile Pics
            if (src.includes('/a/') || src.includes('/a-/') || src.includes('-mo')) continue;
            
            // Exclude extremely small thumbnails (often used for icons/avatars)
            const dimMatch = src.match(/w(\d+)-h(\d+)/);
            if (dimMatch) {
              const w = parseInt(dimMatch[1]);
              const h = parseInt(dimMatch[2]);
              if (w < 80 || h < 80) continue;
            }

            // Fix missing protocol
            const fullSrc = src.startsWith('//') ? `https:${src}` : src;
            // Get large version of image
            const largeUrl = fullSrc.replace(/=w\d+-h\d+.*$/, '=w1200-h800-k-no');
            imgUrls.add(largeUrl);
          }
        } catch {}
        if (imgUrls.size >= 12) break; // Limit to 12 images
      }

      const uniqueUrls = Array.from(imgUrls);
      if (uniqueUrls.length > 0) {
        result.thumbnailUrl = uniqueUrls[0].replace(/=w\d+-h\d+.*$/, '=w400-h300-k-no');
        result.fullImageUrl = JSON.stringify(uniqueUrls);
        console.log(`  🖼️ Images found: ${uniqueUrls.length}`);
      }
    } catch (err) {
      console.warn(`  [Scraper] Image scrape issue:`, err);
    }

    try {
      const address = await page.locator('[data-item-id="address"]').first().textContent({ timeout: 3000 });
      if (address) result.description = address.trim();
    } catch {}

    try {
      const hoursButton = page.locator('[data-item-id*="oh"]').first();
      if (await hoursButton.isVisible({ timeout: 2000 })) {
        const hoursText = await hoursButton.textContent({ timeout: 3000 });
        if (hoursText) result.openingHours = hoursText.trim();
      }
    } catch {}

    try {
      const websiteButton = page.locator('a[data-item-id="authority"]').first();
      if (await websiteButton.isVisible({ timeout: 1500 })) {
        const websiteUrl = await websiteButton.getAttribute('href', { timeout: 2000 });
        if (websiteUrl) {
          result.description = (result.description ? result.description + '\n' : '') + 'Website: ' + websiteUrl.trim();
        }
      }
    } catch {}

    return result;
  } catch (error) {
    console.error(`  ❌ Error scraping ${placeName}:`, error);
    return {};
  }
}

export async function scrapeSinglePlaceLogic(id: number) {
  const place = await getExplorePlaceById(id);
  if (!place) throw new Error(`Place with id ${id} not found`);

  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--disable-blink-features=AutomationControlled', '--lang=th-TH'],
    });

    const context = await browser.newContext({
      locale: 'th-TH',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
    });

    const page = await context.newPage();
    const data = await scrapeGoogleMaps(page, place.title, place.locationName, place.sourceUrl);

    if (data.rating || data.thumbnailUrl || data.description) {
      await updateExplorePlace(id, data);
    }
    
    // Return updated place
    return await getExplorePlaceById(id);
  } finally {
    if (browser) await browser.close();
  }
}
