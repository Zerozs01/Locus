/**
 * Playwright Scraper for explore_places enrichment.
 *
 * Usage:
 *   npx tsx scripts/scrapeExplorePlaces.ts
 *
 * What it does:
 *   1. Reads all rows from explore_places in SQLite
 *   2. For each place without a thumbnail, searches Google Maps
 *   3. Scrapes: thumbnail URL, rating, description, opening hours
 *   4. Updates the SQLite row with enriched data
 *
 * Requirements:
 *   - playwright (already in devDeps)
 *   - better-sqlite3 (already in deps)
 *   - Run `npx playwright install chromium` once before first use
 */

import { chromium, type Browser, type Page } from 'playwright';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { homedir } from 'os';

// ─── Config ─────────────────────────────────────────
function resolveDbPath(): string {
  if (process.env.LOCUS_DB_PATH) {
    return path.resolve(process.env.LOCUS_DB_PATH);
  }

  const appData = process.env.APPDATA
    ? process.env.APPDATA
    : path.join(homedir(), 'AppData', 'Roaming');

  // Priority 1: Locus folder (Production)
  const locusPath = path.join(appData, 'Locus', 'locus.db');
  // Priority 2: Electron folder (Development)
  const electronPath = path.join(appData, 'Electron', 'locus.db');
  // Priority 3: locus folder (Lowercase, some legacy scripts used this)
  const legacyPath = path.join(appData, 'locus', 'locus.db');

  if (fs.existsSync(locusPath)) return locusPath;
  if (fs.existsSync(electronPath)) return electronPath;
  if (fs.existsSync(legacyPath)) return legacyPath;

  // Default to Electron if in dev, or Locus if not
  return fs.existsSync(path.join(appData, 'Electron')) ? electronPath : locusPath;
}

const DB_PATH = resolveDbPath();
const DELAY_BETWEEN_SEARCHES_MS = 3000; // Polite delay between searches
const MAX_RETRIES = 3;
const HEADLESS = true;
const HEADFUL_FALLBACK = true; // try a headful browser if headless attempts fail

const FORCE = process.argv.includes('--force'); // pass --force to re-scrape all rows

// ─── Types ──────────────────────────────────────────
interface PlaceRow {
  id: number;
  title: string;
  location_name: string | null;
  category: string | null;
  thumbnail_url: string | null;
  full_image_url: string | null;
  description: string | null;
  rating: number | null;
  opening_hours: string | null;
  source_url: string | null;
}

interface ScrapedData {
  thumbnailUrl?: string;
  fullImageUrl?: string;
  description?: string;
  rating?: number;
  openingHours?: string;
  sourceUrl?: string;
}

// ─── Database ───────────────────────────────────────
function openDatabase(): Database.Database {
  console.log(`📂 Opening database: ${DB_PATH}`);
  if (!fs.existsSync(DB_PATH)) {
    console.warn('⚠️ Database not found at path above. Run the app once or set LOCUS_DB_PATH.');
  }
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function getPlacesToEnrich(db: Database.Database): PlaceRow[] {
  // If --force is provided, return all rows; otherwise return only incomplete rows
  if (FORCE) {
    return db.prepare(`
      SELECT id, title, location_name, category, thumbnail_url, full_image_url,
             description, rating, opening_hours, source_url
      FROM explore_places
      ORDER BY id
    `).all() as PlaceRow[];
  }

  const rows = db.prepare(`
    SELECT id, title, location_name, category, thumbnail_url, full_image_url,
           description, rating, opening_hours, source_url
    FROM explore_places
    WHERE thumbnail_url IS NULL OR rating IS NULL
    ORDER BY id
  `).all() as PlaceRow[];
  return rows;
}

function updatePlace(db: Database.Database, id: number, data: ScrapedData): void {
  const updates: string[] = [];
  const params: (string | number | null)[] = [];

  if (data.thumbnailUrl) {
    updates.push('thumbnail_url = ?');
    params.push(data.thumbnailUrl);
  }
  if (data.fullImageUrl) {
    updates.push('full_image_url = ?');
    params.push(data.fullImageUrl);
  }
  if (data.description) {
    updates.push('description = ?');
    params.push(data.description);
  }
  if (data.rating !== undefined) {
    updates.push('rating = ?');
    params.push(data.rating);
  }
  if (data.openingHours) {
    updates.push('opening_hours = ?');
    params.push(data.openingHours);
  }
  if (data.sourceUrl) {
    updates.push('source_url = ?');
    params.push(data.sourceUrl);
  }

  if (updates.length === 0) return;

  updates.push("updated_at = datetime('now')");
  params.push(id);

  db.prepare(`UPDATE explore_places SET ${updates.join(', ')} WHERE id = ?`).run(...params);
}

// ─── Scraper ────────────────────────────────────────
async function scrapeGoogleMaps(
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
  if (targetUrl !== searchUrl) {
    console.log(`  🔗 Using source URL: ${targetUrl}`);
  }

  try {
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    try {
      await page.waitForSelector('img[src*="googleusercontent"], a[href*="/maps/place/"]', { timeout: 5000 });
    } catch {}

    const result: ScrapedData = {
      sourceUrl: page.url(),
    };

    const currentUrl = page.url();
    if (currentUrl.includes('consent.google.com')) {
      console.log('  ⚠️ Google consent page detected. Open manually once or use a persistent profile.');
      return result;
    }

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
      } catch {
        console.log('  ⚠️ Could not open first search result');
      }
    }

    // Try to extract rating with multiple strategies and waits (helps with lazy-load)
    try {
      // Wait briefly for common rating selectors to appear
      try {
        await page.waitForSelector('[class*="fontDisplayLarge"]', { timeout: 3000 });
      } catch {}

      let ratingText = null;
      try {
        ratingText = await page.locator('[class*="fontDisplayLarge"]').first().textContent({ timeout: 2000 });
      } catch {}

      if (ratingText) {
        const ratingNum = parseFloat(ratingText.trim());
        if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
          result.rating = ratingNum;
          console.log(`  ⭐ Rating: ${ratingNum}`);
        }
      }

      if (!result.rating) {
        // Alternative: aria-label on stars
        try {
          const ratingLabel = await page
            .locator('div[role="img"][aria-label*="ดาว"], div[role="img"][aria-label*="stars"]')
            .first()
            .getAttribute('aria-label', { timeout: 2500 });

          const match = ratingLabel?.match(/(\d+(?:[\.,]\d+)?)/);
          if (match) {
            const num = parseFloat(match[1].replace(',', '.'));
            if (!isNaN(num) && num >= 1 && num <= 5) {
              result.rating = num;
              console.log(`  ⭐ Rating (aria): ${num}`);
            }
          }
        } catch {}
      }

      if (!result.rating) {
        // Fallback: visible numeric spans
        try {
          const ratingAlt = await page.locator('span[aria-hidden="true"]').filter({ hasText: /^\d\.?\d?$/ }).first().textContent({ timeout: 2000 });
          if (ratingAlt) {
            const num = parseFloat(ratingAlt.trim());
            if (!isNaN(num) && num >= 1 && num <= 5) {
              result.rating = num;
              console.log(`  ⭐ Rating (alt): ${num}`);
            }
          }
        } catch {}
      }

      if (!result.rating) {
        console.log(`  ⚠️ Could not find rating`);
      }
    } catch (err) {
      console.log(`  ⚠️ Rating extraction error: ${err instanceof Error ? err.message : err}`);
    }

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

            const fullSrc = src.startsWith('//') ? `https:${src}` : src;
            const largeUrl = fullSrc.replace(/=w\d+-h\d+.*$/, '=w1200-h800-k-no');
            imgUrls.add(largeUrl);
          }
        } catch {}
        if (imgUrls.size >= 12) break;
      }

      const uniqueUrls = Array.from(imgUrls);
      if (uniqueUrls.length > 0) {
        result.thumbnailUrl = uniqueUrls[0].replace(/=w\d+-h\d+.*$/, '=w400-h300-k-no');
        result.fullImageUrl = JSON.stringify(uniqueUrls);
        console.log(`  🖼️ Images found: ${uniqueUrls.length}`);
      }
    } catch {
      console.log(`  ⚠️ Could not find images`);
    }

    // Try to get description / address
    try {
      const address = await page.locator('[data-item-id="address"]').first().textContent({ timeout: 3000 });
      if (address) {
        result.description = address.trim();
        console.log(`  📍 Address: ${result.description.substring(0, 50)}...`);
      }
    } catch {
      console.log(`  ⚠️ Could not find address`);
    }

    // Try to get opening hours
    try {
      // Click on "Hours" section if visible
      const hoursButton = page.locator('[data-item-id*="oh"]').first();
      if (await hoursButton.isVisible({ timeout: 2000 })) {
        const hoursText = await hoursButton.textContent({ timeout: 3000 });
        if (hoursText) {
          result.openingHours = hoursText.trim();
          console.log(`  🕐 Hours: ${result.openingHours.substring(0, 50)}...`);
        }
      }
    } catch {
      console.log(`  ⚠️ Could not find hours`);
    }

    // Try to get website
    try {
      const websiteButton = page.locator('a[data-item-id="authority"]').first();
      if (await websiteButton.isVisible({ timeout: 1500 })) {
        const websiteUrl = await websiteButton.getAttribute('href', { timeout: 2000 });
        if (websiteUrl) {
          result.description = (result.description ? result.description + '\n' : '') + 'Website: ' + websiteUrl.trim();
          console.log(`  🌐 Website: ${websiteUrl.substring(0, 50)}...`);
        }
      }
    } catch {}

    if (!result.thumbnailUrl && !result.rating) {
      console.log('  ⚠️ No image/rating found after search (likely search list or consent block)');
    }

    return result;
  } catch (error) {
    console.error(`  ❌ Error scraping ${placeName}:`, error instanceof Error ? error.message : error);
    return {};
  }
}

// ─── Main ───────────────────────────────────────────
async function main(): Promise<void> {
  console.log('═══════════════════════════════════════════');
  console.log('  Locus — Explore Places Scraper');
  console.log('═══════════════════════════════════════════');

  const db = openDatabase();
  const places = getPlacesToEnrich(db);

  if (places.length === 0) {
    console.log('✅ All places already enriched. Nothing to do.');
    db.close();
    return;
  }

  console.log(`\n📋 Found ${places.length} places to enrich\n`);

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: HEADLESS,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--lang=th-TH',
      ],
    });

    const context = await browser.newContext({
      locale: 'th-TH',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
    });

    const page = await context.newPage();

    let enriched = 0;
    let failed = 0;

    for (const place of places) {
      console.log(`\n[${enriched + failed + 1}/${places.length}] ${place.title} — ${place.location_name || 'ไม่ระบุ'}`);

      let success = false;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        if (attempt > 0) {
          console.log(`  🔄 Retry ${attempt}/${MAX_RETRIES}...`);
          await page.waitForTimeout(2000);
        }

        try {
          const data = await scrapeGoogleMaps(page, place.title, place.location_name, place.source_url);

          // Only update if we got meaningful data
          if (data.rating || data.thumbnailUrl || data.description) {
            updatePlace(db, place.id, data);
            enriched++;
            success = true;
            console.log(`  ✅ Enriched successfully`);
            break;
          } else {
            console.log(`  ⚠️ No meaningful data scraped`);
          }
        } catch (error) {
          console.error(`  ❌ Attempt ${attempt + 1} failed:`, error instanceof Error ? error.message : error);
        }
      }

      if (!success) {
        failed++;
        console.log(`  ❌ Failed after ${MAX_RETRIES + 1} attempts`);
        if (HEADFUL_FALLBACK) {
          console.log('  🔔 Trying headful fallback ( opens visible browser )...');
          let headfulBrowser: Browser | null = null;
          try {
            headfulBrowser = await chromium.launch({ headless: false, args: ['--lang=th-TH'] });
            const headfulContext = await headfulBrowser.newContext({ locale: 'th-TH', viewport: { width: 1366, height: 768 } });
            const headfulPage = await headfulContext.newPage();
            // Give more time for dynamic content in headful mode
            try {
              const data = await scrapeGoogleMaps(headfulPage, place.title, place.location_name, place.source_url);
              if (data.rating || data.thumbnailUrl || data.description) {
                updatePlace(db, place.id, data);
                enriched++;
                success = true;
                console.log(`  ✅ Enriched successfully (headful fallback)`);
              } else {
                console.log('  ⚠️ Headful fallback also did not find meaningful data');
              }
            } catch (err) {
              console.log('  ❌ Headful attempt error:', err instanceof Error ? err.message : err);
            }
            await headfulContext.close();
          } catch (err) {
            console.log('  ❌ Could not start headful browser:', err instanceof Error ? err.message : err);
          } finally {
            if (headfulBrowser) await headfulBrowser.close();
          }
          if (!success) {
            console.log('  ⚠️ Marking as failed (headful fallback exhausted)');
          }
        }
      }

      // Polite delay between requests
      if (enriched + failed < places.length) {
        await page.waitForTimeout(DELAY_BETWEEN_SEARCHES_MS);
      }
    }

    await context.close();

    console.log('\n═══════════════════════════════════════════');
    console.log(`  Results: ${enriched} enriched, ${failed} failed`);
    console.log('═══════════════════════════════════════════\n');
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    if (browser) await browser.close();
    db.close();
  }
}

main().catch(console.error);
