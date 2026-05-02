/**
 * Playwright Enrichment Scraper for Locus Explore Places
 * 
 * Scrapes Google Maps/travel portals for:
 * - High-resolution image URLs
 * - Rating and descriptions
 * - Business/opening hours
 * 
 * Implements offline pre-caching (skip if data is fresh)
 */

import { chromium, Browser, Page } from 'playwright';
import Database from 'better-sqlite3';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { EXPLORE_PLACES_SEED } from '../../src/main/database/explorePlacesSeed';

// ─── Types ──────────────────────────────────────────
interface ExploreResult {
  title: string;
  location: string;
  category: string;
  tags?: string[];
  regionId?: string;
  provinceId?: string;
}

interface EnrichedData {
  fullImageUrl?: string;
  thumbnailUrl?: string;
  rating?: number;
  description?: string;
  openingHours?: string;
}

// ─── Hardcoded Data from GeoArchivePage (allResults) ──────────────────────────────────
// Use the centralized seed as the source of truth
const allResults: Record<string, any[]> = {
  'all': EXPLORE_PLACES_SEED
};

// ─── Utility Functions ──────────────────────────────────────────
const generateId = (title: string, location: string): string => {
  return `${title}-${location}`.toLowerCase().replace(/[^a-z0-9ก-๙]/g, '-').replace(/-+/g, '-');
};

const randomDelay = (minMs: number, maxMs: number): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

const isDataFresh = (updatedAt: string | null, maxAgeHours = 24): boolean => {
  if (!updatedAt) return false;
  const updated = new Date(updatedAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - updated.getTime()) / (1000 * 60 * 60);
  return hoursDiff < maxAgeHours;
};

// ─── Scraper Class ──────────────────────────────────────────
class EnrichmentScraper {
  private browser: Browser | null = null;
  private db: Database.Database;
  private scrapeCount = 0;
  private skipCount = 0;
  private errorCount = 0;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    console.log('✓ Browser launched');
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log('✓ Browser closed');
    }
    this.db.close();
  }

  private async scrapeGoogleMaps(page: Page, searchQuery: string): Promise<EnrichedData> {
    const result: EnrichedData = {};
    
    try {
      // Navigate to Google Maps with search query
      const encodedQuery = encodeURIComponent(searchQuery);
      await page.goto(`https://www.google.com/maps/search/${encodedQuery}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      await randomDelay(2000, 4000);

      // Try to extract rating
      try {
        const ratingElement = await page.$('span[aria-label*="ดาว"]');
        if (ratingElement) {
          const ariaLabel = await ratingElement.getAttribute('aria-label');
          const ratingMatch = ariaLabel?.match(/([0-9]+[.,][0-9]+)/);
          if (ratingMatch) {
            result.rating = parseFloat(ratingMatch[1].replace(',', '.'));
          }
        }
      } catch { /* ignore */ }

      // Try to extract images from Google Maps
      try {
        // Look for the main image
        const imageSelectors = [
          'div[aria-label*="รูปภาพ"] img',
          'div[data-section-id*="photos"] img',
          '.poi-photo-grid img',
          '.widget-scene-canvas img'
        ];
        
        for (const selector of imageSelectors) {
          const images = await page.$$(selector);
          for (const img of images) {
            const src = await img.getAttribute('src');
            if (src && src.startsWith('http') && !src.includes('gstatic.com') && src.length > 100) {
              result.fullImageUrl = src;
              // Thumbnail is typically the same or a smaller version
              result.thumbnailUrl = src.split('?')[0] + '?w=200&q=60';
              break;
            }
          }
          if (result.fullImageUrl) break;
        }
      } catch { /* ignore */ }

      // Try to extract description from reviews or info panels
      try {
        const infoSelectors = [
          'span[class*="business-name"]',
          'div[class*="address"]',
          'div[class*="review"]'
        ];
        
        for (const selector of infoSelectors) {
          const element = await page.$(selector);
          if (element) {
            const text = await element.textContent();
            if (text && text.length > 20 && text.length < 500) {
              result.description = text.trim();
              break;
            }
          }
        }
      } catch { /* ignore */ }

      // Try to extract opening hours
      try {
        const hoursElement = await page.$('span[class*="open"]');
        if (hoursElement) {
          const hoursText = await hoursElement.textContent();
          if (hoursText) {
            result.openingHours = hoursText.trim();
          }
        }
      } catch { /* ignore */ }

    } catch (error) {
      console.warn(`  ⚠ Google Maps scrape failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  private async scrapeTripadvisor(page: Page, searchQuery: string): Promise<EnrichedData> {
    const result: EnrichedData = {};
    
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      await page.goto(`https://www.tripadvisor.com/Search?q=${encodedQuery}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      await randomDelay(3000, 5000);

      // Extract rating
      try {
        const ratingElement = await page.$('[data-test-target*="rating"] span');
        if (ratingElement) {
          const text = await ratingElement.textContent();
          const ratingMatch = text?.match(/([0-9]+[.,][0-9]+)/);
          if (ratingMatch) {
            result.rating = parseFloat(ratingMatch[1].replace(',', '.'));
          }
        }
      } catch { /* ignore */ }

      // Extract images
      try {
        const images = await page.$$('img[class*="photo"]');
        for (const img of images) {
          const src = await img.getAttribute('src');
          if (src && src.startsWith('http') && src.length > 100) {
            result.fullImageUrl = src;
            result.thumbnailUrl = src.split('?')[0] + '?w=200&q=60';
            break;
          }
        }
      } catch { /* ignore */ }

    } catch (error) {
      console.warn(`  ⚠ TripAdvisor scrape failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  private async scrapeAgoda(page: Page, searchQuery: string): Promise<EnrichedData> {
    const result: EnrichedData = {};
    
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      await page.goto(`https://www.agoda.com/search?searchstring=${encodedQuery}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      await randomDelay(2000, 4000);

      // Extract rating from accommodation search
      try {
        const ratingElement = await page.$('[data-test-selector*="rating"]');
        if (ratingElement) {
          const text = await ratingElement.textContent();
          const ratingMatch = text?.match(/([0-9]+[.,][0-9]+)/);
          if (ratingMatch) {
            result.rating = parseFloat(ratingMatch[1].replace(',', '.'));
          }
        }
      } catch { /* ignore */ }

    } catch (error) {
      console.warn(`  ⚠ Agoda scrape failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  async scrapeLocation(location: ExploreResult): Promise<EnrichedData> {
    const page = await this.browser!.newPage();
    const searchQuery = `${location.title} ${location.location} Thailand`;
    
    let enriched: EnrichedData = {};

    // Try Google Maps first (most reliable for location data)
    const googleResult = await this.scrapeGoogleMaps(page, searchQuery);
    if (Object.keys(googleResult).length > 0) {
      enriched = { ...enriched, ...googleResult };
    }

    // Add random delay between requests to avoid rate limiting
    await randomDelay(5000, 10000);

    // Try TripAdvisor as fallback
    if (!enriched.fullImageUrl || !enriched.rating) {
      const tripadvisorResult = await this.scrapeTripadvisor(page, searchQuery);
      if (Object.keys(tripadvisorResult).length > 0) {
        enriched = { ...enriched, ...tripadvisorResult };
      }
    }

    // Add another delay
    await randomDelay(3000, 6000);

    // Try Agoda as last resort (mostly for accommodation)
    if (!enriched.rating) {
      const agodaResult = await this.scrapeAgoda(page, searchQuery);
      if (Object.keys(agodaResult).length > 0) {
        enriched = { ...enriched, ...agodaResult };
      }
    }

    await page.close();
    return enriched;
  }

  private checkExistingData(title: string, location: string): { exists: boolean; id?: number; updatedAt?: string | null; hasFullData?: boolean } {
    const row = this.db.prepare('SELECT id, updated_at, full_image_url, rating FROM explore_places WHERE title = ? AND location_name = ?').get(title, location) as any;
    
    if (!row) return { exists: false };

    return {
      exists: true,
      id: row.id,
      updatedAt: row.updated_at,
      hasFullData: Boolean(row.full_image_url && row.rating)
    };
  }

  async run(): Promise<void> {
    console.log('🚀 Starting Enrichment Scraper...\n');

    await this.init();

    // Flatten all results
    const allPlaces: ExploreResult[] = [];
    for (const places of Object.values(allResults)) {
      allPlaces.push(...places);
    }

    // Remove duplicates by title+location
    const seen = new Set<string>();
    const uniquePlaces = allPlaces.filter(place => {
      const key = `${place.title}-${place.location}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`📍 Total unique places to process: ${uniquePlaces.length}\n`);

    for (const place of uniquePlaces) {
      // Normalize location once for all uses
      const loc = (place as any).locationName || (place as any).location || '';
      
      // Check if data is fresh (offline pre-caching)
      const existing = this.checkExistingData(place.title, loc);
      
      if (existing.exists && isDataFresh(existing.updatedAt ?? null)) {
        console.log(`⏭️  SKIP (fresh): ${place.title}`);
        this.skipCount++;
        continue;
      }

      if (existing.exists && existing.hasFullData && isDataFresh(existing.updatedAt ?? null, 168)) {
        console.log(`⏭️  SKIP (complete): ${place.title}`);
        this.skipCount++;
        continue;
      }

      console.log(`🔍 SCRAPING: ${place.title} - ${loc}`);

      try {
        const enriched = await this.scrapeLocation({
          title: place.title,
          location: loc,
          category: place.category || ''
        });

        // Update database - use new_value only if it's not NULL, otherwise keep existing
        // Unlike the old COALESCE approach which never overwrites, this lets us enrich missing fields
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        
        if (enriched.thumbnailUrl !== null && enriched.thumbnailUrl !== undefined) {
          updateFields.push('thumbnail_url = ?');
          updateValues.push(enriched.thumbnailUrl);
        }
        if (enriched.fullImageUrl !== null && enriched.fullImageUrl !== undefined) {
          updateFields.push('full_image_url = ?');
          updateValues.push(enriched.fullImageUrl);
        }
        if (enriched.description !== null && enriched.description !== undefined) {
          updateFields.push('description = ?');
          updateValues.push(enriched.description);
        }
        if (enriched.rating !== null && enriched.rating !== undefined) {
          updateFields.push('rating = ?');
          updateValues.push(enriched.rating);
        }
        if (enriched.openingHours !== null && enriched.openingHours !== undefined) {
          updateFields.push('opening_hours = ?');
          updateValues.push(enriched.openingHours);
        }
        updateFields.push("updated_at = datetime('now')");
        
        // Always update at least updated_at timestamp
        if (updateValues.length > 1) {
          const update = this.db.prepare(`
            UPDATE explore_places 
            SET ${updateFields.join(', ')}
            WHERE title = ? AND location_name = ?
          `);
          update.run(...updateValues, place.title, loc);
        } else {
          // Only timestamp update - still refresh updated_at
          const touchUpdate = this.db.prepare(`
            UPDATE explore_places SET updated_at = datetime('now') WHERE title = ? AND location_name = ?
          `);
          touchUpdate.run(place.title, loc);
        }

        this.scrapeCount++;
        console.log(`   ✓ Saved enriched data for "${place.title}"`);

      } catch (error) {
        this.errorCount++;
        console.error(`   ✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Add delay between locations
      await randomDelay(8000, 15000);
    }

    await this.close();

    console.log('\n═══════════════════════════════════════════');
    console.log('📊 SCRAPER STATISTICS');
    console.log('═══════════════════════════════════════════');
    console.log(`✅ Scraped:  ${this.scrapeCount}`);
    console.log(`⏭️  Skipped:  ${this.skipCount}`);
    console.log(`❌ Errors:   ${this.errorCount}`);
    console.log(`📍 Total:    ${this.scrapeCount + this.skipCount + this.errorCount}`);
    console.log('═══════════════════════════════════════════\n');
  }
}

// ─── Main Entry Point ──────────────────────────────────────────
async function main() {
  // Get database path from Electron app or use default
  let dbPath: string;
  
  dbPath = path.join(os.homedir(), 'AppData', 'Roaming', 'locus', 'locus.db');
  if (!fs.existsSync(dbPath)) {
    // Fallback for different environments or local dev
    dbPath = path.join(process.cwd(), 'locus.db');
  }

  console.log(`📂 Database path: ${dbPath}`);

  const scraper = new EnrichmentScraper(dbPath);
  
  try {
    await scraper.run();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Export for use as module
export { EnrichmentScraper, allResults, generateId };
export type { ExploreResult, EnrichedData };

// Run if executed directly
if (process.argv.some(arg => arg.includes('enrichment-scraper'))) {
  main().catch(console.error);
}
