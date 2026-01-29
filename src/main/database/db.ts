import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { Region, Province, RegionStats } from '../../shared/types';

const dbPath = path.join(app.getPath('userData'), 'locus.db');

// Initialize Database (verbose mode disabled for cleaner terminal)
const db = new Database(dbPath);

// Performance optimizations for SQLite
db.pragma('journal_mode = WAL');           // Write-Ahead Logging for better concurrency
db.pragma('cache_size = -64000');          // 64MB cache (negative = KB)
db.pragma('synchronous = NORMAL');         // Balance between safety and speed
db.pragma('temp_store = MEMORY');          // Store temp tables in memory
db.pragma('mmap_size = 268435456');        // Memory-mapped I/O (256MB)
db.pragma('foreign_keys = ON');            // Enforce foreign key constraints 

export function initDatabase() {
  // Create tables if they don't exist (no more DROP every time)
  // Create Regions Table
  // Changed population/area to TEXT to match source "6.2M" format
  db.exec(`
    CREATE TABLE IF NOT EXISTS regions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      engName TEXT NOT NULL,
      code TEXT NOT NULL,
      desc TEXT,
      color TEXT,
      gradient TEXT,
      image TEXT,
      safety INTEGER,
      population TEXT, 
      area TEXT,
      province_count INTEGER
    );
  `);

  // Create Stats Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS region_stats (
      region_id TEXT PRIMARY KEY,
      dailyCost TEXT,
      monthlyCost TEXT,
      food TEXT,
      flora TEXT,
      attraction TEXT,
      nightlife TEXT,
      FOREIGN KEY(region_id) REFERENCES regions(id)
    );
  `);

  // Create Provinces Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS provinces (
      id TEXT PRIMARY KEY,
      region_id TEXT NOT NULL,
      name TEXT NOT NULL,
      image TEXT,
      dist INTEGER,
      tam INTEGER,
      serenity INTEGER,
      entertainment INTEGER,
      relax INTEGER,
      population TEXT,
      area TEXT,
      dailyCost TEXT,
      safety INTEGER,
      FOREIGN KEY(region_id) REFERENCES regions(id)
    );
  `);

  // Create indexes for faster queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region ON provinces(region_id);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_stats_region ON region_stats(region_id);`);

  console.log('✓ Database ready at:', dbPath);
}

// Database row types (raw from SQLite)
interface RegionRow {
  id: string;
  name: string;
  engName: string;
  code: string;
  desc: string | null;
  color: string | null;
  gradient: string | null;
  image: string | null;
  safety: number;
  population: string | null;
  area: string | null;
  province_count: number;
}

interface RegionStatsRow {
  region_id: string;
  dailyCost: string | null;
  monthlyCost: string | null;
  food: string | null;
  flora: string | null;
  attraction: string | null;
  nightlife: string | null;
}

interface ProvinceRow {
  id: string;
  region_id: string;
  name: string;
  image: string | null;
  dist: number;
  tam: number;
  serenity: number | null;
  entertainment: number | null;
  relax: number | null;
  population: string | null;
  area: string | null;
  dailyCost: string | null;
  safety: number | null;
}

export function getRegions(): Region[] {
  const regions = db.prepare('SELECT * FROM regions').all() as RegionRow[];
  const allStats = db.prepare('SELECT * FROM region_stats').all() as RegionStatsRow[];
  const allProvinces = db.prepare('SELECT * FROM provinces').all() as ProvinceRow[];

  // Create lookup maps for performance
  const statsMap = new Map<string, RegionStatsRow>();
  for (const s of allStats) {
      statsMap.set(s.region_id, s);
  }

  const provincesMap = new Map<string, ProvinceRow[]>();
  for (const p of allProvinces) {
      if (!provincesMap.has(p.region_id)) {
          provincesMap.set(p.region_id, []);
      }
      provincesMap.get(p.region_id)!.push(p);
  }
  
  return regions.map((reg) => {
    const stats = statsMap.get(reg.id);
    const subProvinces = provincesMap.get(reg.id) || [];
    
    // Reconstruct the nested object structure expected by the frontend
    return {
      id: reg.id,
      name: reg.name,
      engName: reg.engName,
      code: reg.code,
      color: reg.color,
      gradient: reg.gradient,
      image: reg.image,
      desc: reg.desc,
      safety: reg.safety,
      // Reconstruct summary object
      summary: {
        pop: reg.population,
        area: reg.area,
        provinces: reg.province_count
      },
      stats: {
          dailyCost: stats?.dailyCost || '',
          monthlyCost: stats?.monthlyCost || '',
          flora: stats?.flora || '',
          food: stats?.food || '',
          attraction: stats?.attraction || '',
          nightlife: stats?.nightlife || ''
      },
      subProvinces: subProvinces.map((p: ProvinceRow): Province => ({
          id: p.id,
          name: p.name,
          image: p.image || '',
          dist: p.dist,
          tam: p.tam,
          serenity: p.serenity ?? undefined,
          entertainment: p.entertainment ?? undefined,
          relax: p.relax ?? undefined,
          population: p.population ?? undefined,
          area: p.area ?? undefined,
          dailyCost: p.dailyCost ?? undefined,
          safety: p.safety ?? undefined
      }))
    };
  });
}

export function getProvince(id: string): Province | undefined {
    return db.prepare('SELECT * FROM provinces WHERE id = ?').get(id) as Province | undefined;
}

export function seedDatabase(initialRegions: Region[]) {
    // Check main counts
    const regionCount = db.prepare('SELECT count(*) as count FROM regions').get() as { count: number };
    const provinceCount = db.prepare('SELECT count(*) as count FROM provinces').get() as { count: number };
    
    // Calculate expected province count from initialRegions
    const expectedProvinces = initialRegions.reduce((sum, r) => sum + r.subProvinces.length, 0);
    const expectedRegions = initialRegions.length;
    
    // Quick check to skip if everything looks populated (simple heuristic)
    if (regionCount.count >= expectedRegions && provinceCount.count >= expectedProvinces) {
        console.log(`✓ Database checks out (${regionCount.count} regions, ${provinceCount.count} provinces). Skipping seed.`);
        return; 
    }

    console.log('⏳ Verifying and Seeding Database...');
    const insertRegion = db.prepare(`
        INSERT OR IGNORE INTO regions (id, name, engName, code, desc, color, gradient, image, safety, population, area, province_count)
        VALUES (@id, @name, @engName, @code, @desc, @color, @gradient, @image, @safety, @population, @area, @province_count)
    `);

    const insertStats = db.prepare(`
        INSERT OR IGNORE INTO region_stats (region_id, dailyCost, monthlyCost, food, flora, attraction, nightlife)
        VALUES (@region_id, @dailyCost, @monthlyCost, @food, @flora, @attraction, @nightlife)
    `);

    const insertProvince = db.prepare(`
        INSERT OR IGNORE INTO provinces (id, region_id, name, image, dist, tam, serenity, entertainment, relax, population, area, dailyCost, safety)
        VALUES (@id, @region_id, @name, @image, @dist, @tam, @serenity, @entertainment, @relax, @population, @area, @dailyCost, @safety)
    `);

    const insertMany = db.transaction((regions: Region[]) => {
        for (const reg of regions) {
            insertRegion.run({
                id: reg.id,
                name: reg.name,
                engName: reg.engName,
                code: reg.code,
                desc: reg.desc,
                color: reg.color,
                gradient: reg.gradient,
                image: reg.image,
                safety: reg.safety,
                population: reg.summary.pop,
                area: reg.summary.area,
                province_count: reg.summary.provinces
            });

            insertStats.run({
                region_id: reg.id,
                dailyCost: reg.stats.dailyCost,
                monthlyCost: reg.stats.monthlyCost,
                food: reg.stats.food,
                flora: reg.stats.flora,
                attraction: reg.stats.attraction,
                nightlife: reg.stats.nightlife
            });

            for (const prov of reg.subProvinces) {
                insertProvince.run({
                    id: prov.id,
                    region_id: reg.id,
                    name: prov.name,
                    image: prov.image,
                    dist: prov.dist,
                    tam: prov.tam,
                    serenity: prov.serenity || 5,
                    entertainment: prov.entertainment || 5,
                    relax: prov.relax || 5,
                    population: prov.population || null,
                    area: prov.area || null,
                    dailyCost: prov.dailyCost || '300 ฿',
                    safety: prov.safety || 80
                });
            }
        }
    });

    insertMany(initialRegions);
    console.log('✓ Seeding process completed.');
}

// Force reseed database (for troubleshooting)
export function forceReseedDatabase(initialRegions: Region[]) {
    console.log('🔄 Force reseeding database...');
    db.exec('DELETE FROM provinces;');
    db.exec('DELETE FROM region_stats;');
    db.exec('DELETE FROM regions;');
    
    // Call seedDatabase with cleared tables
    seedDatabase(initialRegions);
}

// Get database stats for debugging
export function getDatabaseStats() {
    const regionCount = db.prepare('SELECT count(*) as count FROM regions').get() as { count: number };
    const provinceCount = db.prepare('SELECT count(*) as count FROM provinces').get() as { count: number };
    const statsCount = db.prepare('SELECT count(*) as count FROM region_stats').get() as { count: number };
    
    return {
        regions: regionCount.count,
        provinces: provinceCount.count,
        stats: statsCount.count,
        dbPath: dbPath
    };
}
