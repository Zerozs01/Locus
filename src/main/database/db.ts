import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { Region, Province } from '../../shared/types';

const dbPath = path.join(app.getPath('userData'), 'locus.db');

// Initialize Database (verbose mode disabled for cleaner terminal)
const db = new Database(dbPath);
let regionsCache: Region[] | null = null;
let provincesCache: Map<string, Province> | null = null;

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
      population_value INTEGER,
      area TEXT,
      area_value REAL,
      province_count INTEGER
    );
  `);

  // Create Stats Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS region_stats (
      region_id TEXT PRIMARY KEY,
      dailyCost TEXT,
      dailyCost_value INTEGER,
      monthlyCost TEXT,
      monthlyCost_value INTEGER,
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
      population_value INTEGER,
      area TEXT,
      area_value REAL,
      dailyCost TEXT,
      dailyCost_value INTEGER,
      safety INTEGER,
      FOREIGN KEY(region_id) REFERENCES regions(id)
    );
  `);

  // Create indexes for faster queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region ON provinces(region_id);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_stats_region ON region_stats(region_id);`);

  // Migrations: ensure numeric columns exist for legacy DBs
  ensureColumn('regions', 'population_value', 'INTEGER');
  ensureColumn('regions', 'area_value', 'REAL');
  ensureColumn('region_stats', 'dailyCost_value', 'INTEGER');
  ensureColumn('region_stats', 'monthlyCost_value', 'INTEGER');
  ensureColumn('provinces', 'population_value', 'INTEGER');
  ensureColumn('provinces', 'area_value', 'REAL');
  ensureColumn('provinces', 'dailyCost_value', 'INTEGER');

  backfillNumericColumns();

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
  population_value: number | null;
  area: string | null;
  area_value: number | null;
  province_count: number;
}

interface RegionStatsRow {
  region_id: string;
  dailyCost: string | null;
  dailyCost_value: number | null;
  monthlyCost: string | null;
  monthlyCost_value: number | null;
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
  population_value: number | null;
  area: string | null;
  area_value: number | null;
  dailyCost: string | null;
  dailyCost_value: number | null;
  safety: number | null;
}

const parsePopulationValue = (pop: string | null): number | null => {
  if (!pop) return null;
  const normalized = pop.replace(/,/g, '').trim();
  const match = normalized.match(/([\d.]+)\s*([KkMm]?)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return null;
  const unit = match[2]?.toUpperCase();
  if (unit === 'M') return Math.round(num * 1_000_000);
  if (unit === 'K') return Math.round(num * 1_000);
  return Math.round(num);
};

const parseAreaValue = (area: string | null): number | null => {
  if (!area) return null;
  const normalized = area.replace(/,/g, '').trim();
  const num = parseFloat(normalized);
  return Number.isNaN(num) ? null : num;
};

const parseCostValue = (cost: string | null): number | null => {
  if (!cost) return null;
  const match = cost.replace(/,/g, '').match(/([\d.]+)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  return Number.isNaN(num) ? null : Math.round(num);
};

const columnExists = (table: string, column: string): boolean => {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return columns.some((col) => col.name === column);
};

const ensureColumn = (table: string, column: string, type: string) => {
  if (!columnExists(table, column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  }
};

const backfillNumericColumns = () => {
  const updateRegions = db.prepare(`
    UPDATE regions
    SET population_value = ?, area_value = ?
    WHERE id = ?
  `);
  const updateStats = db.prepare(`
    UPDATE region_stats
    SET dailyCost_value = ?, monthlyCost_value = ?
    WHERE region_id = ?
  `);
  const updateProvinces = db.prepare(`
    UPDATE provinces
    SET population_value = ?, area_value = ?, dailyCost_value = ?
    WHERE id = ?
  `);

  const regions = db.prepare('SELECT id, population, area, population_value, area_value FROM regions').all() as RegionRow[];
  const stats = db.prepare('SELECT region_id, dailyCost, monthlyCost, dailyCost_value, monthlyCost_value FROM region_stats').all() as RegionStatsRow[];
  const provinces = db.prepare('SELECT id, population, area, dailyCost, population_value, area_value, dailyCost_value FROM provinces').all() as ProvinceRow[];

  db.transaction(() => {
    for (const reg of regions) {
      const popValue = reg.population_value ?? parsePopulationValue(reg.population);
      const areaValue = reg.area_value ?? parseAreaValue(reg.area);
      if (popValue !== reg.population_value || areaValue !== reg.area_value) {
        updateRegions.run(popValue, areaValue, reg.id);
      }
    }

    for (const stat of stats) {
      const dailyCostValue = stat.dailyCost_value ?? parseCostValue(stat.dailyCost);
      const monthlyCostValue = stat.monthlyCost_value ?? parseCostValue(stat.monthlyCost);
      if (dailyCostValue !== stat.dailyCost_value || monthlyCostValue !== stat.monthlyCost_value) {
        updateStats.run(dailyCostValue, monthlyCostValue, stat.region_id);
      }
    }

    for (const prov of provinces) {
      const popValue = prov.population_value ?? parsePopulationValue(prov.population);
      const areaValue = prov.area_value ?? parseAreaValue(prov.area);
      const dailyCostValue = prov.dailyCost_value ?? parseCostValue(prov.dailyCost);
      if (
        popValue !== prov.population_value ||
        areaValue !== prov.area_value ||
        dailyCostValue !== prov.dailyCost_value
      ) {
        updateProvinces.run(popValue, areaValue, dailyCostValue, prov.id);
      }
    }
  })();
};

export function getRegions(): Region[] {
  if (regionsCache) return regionsCache;

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
  
  const result = regions.map((reg) => {
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
        provinces: reg.province_count,
        popValue: reg.population_value ?? undefined,
        areaValue: reg.area_value ?? undefined
      },
      stats: {
          dailyCost: stats?.dailyCost || '',
          monthlyCost: stats?.monthlyCost || '',
          flora: stats?.flora || '',
          food: stats?.food || '',
          attraction: stats?.attraction || '',
          nightlife: stats?.nightlife || '',
          dailyCostValue: stats?.dailyCost_value ?? undefined,
          monthlyCostValue: stats?.monthlyCost_value ?? undefined
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
          safety: p.safety ?? undefined,
          populationValue: p.population_value ?? undefined,
          areaValue: p.area_value ?? undefined,
          dailyCostValue: p.dailyCost_value ?? undefined
      }))
    };
  });

  regionsCache = result;
  const provinceMap = new Map<string, Province>();
  for (const region of result) {
    for (const province of region.subProvinces) {
      provinceMap.set(province.id, province);
    }
  }
  provincesCache = provinceMap;
  return result;
}

export function getRegion(id: string): Region | undefined {
  if (regionsCache) return regionsCache.find(r => r.id === id);

  const reg = db.prepare('SELECT * FROM regions WHERE id = ?').get(id) as RegionRow | undefined;
  if (!reg) return undefined;
  const stats = db.prepare('SELECT * FROM region_stats WHERE region_id = ?').get(id) as RegionStatsRow | undefined;

  return {
    id: reg.id,
    name: reg.name,
    engName: reg.engName,
    code: reg.code,
    color: reg.color || '',
    gradient: reg.gradient || undefined,
    image: reg.image || '',
    desc: reg.desc || '',
    safety: reg.safety,
    summary: {
      pop: reg.population || '',
      area: reg.area || '',
      provinces: reg.province_count,
      popValue: reg.population_value ?? undefined,
      areaValue: reg.area_value ?? undefined
    },
    stats: {
      dailyCost: stats?.dailyCost || '',
      monthlyCost: stats?.monthlyCost || '',
      flora: stats?.flora || '',
      food: stats?.food || '',
      attraction: stats?.attraction || '',
      nightlife: stats?.nightlife || '',
      dailyCostValue: stats?.dailyCost_value ?? undefined,
      monthlyCostValue: stats?.monthlyCost_value ?? undefined
    },
    subProvinces: []
  };
}

export function getProvince(id: string): Province | undefined {
    if (provincesCache) return provincesCache.get(id);

    const row = db.prepare('SELECT * FROM provinces WHERE id = ?').get(id) as ProvinceRow | undefined;
    if (!row) return undefined;

    return {
      id: row.id,
      name: row.name,
      image: row.image || '',
      dist: row.dist,
      tam: row.tam,
      serenity: row.serenity ?? undefined,
      entertainment: row.entertainment ?? undefined,
      relax: row.relax ?? undefined,
      population: row.population ?? undefined,
      area: row.area ?? undefined,
      dailyCost: row.dailyCost ?? undefined,
      safety: row.safety ?? undefined,
      populationValue: row.population_value ?? undefined,
      areaValue: row.area_value ?? undefined,
      dailyCostValue: row.dailyCost_value ?? undefined
    };
}

export function seedDatabase(initialRegions: Region[]) {
    regionsCache = null;
    provincesCache = null;
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
        INSERT OR IGNORE INTO regions (id, name, engName, code, desc, color, gradient, image, safety, population, population_value, area, area_value, province_count)
        VALUES (@id, @name, @engName, @code, @desc, @color, @gradient, @image, @safety, @population, @population_value, @area, @area_value, @province_count)
    `);

    const insertStats = db.prepare(`
        INSERT OR IGNORE INTO region_stats (region_id, dailyCost, dailyCost_value, monthlyCost, monthlyCost_value, food, flora, attraction, nightlife)
        VALUES (@region_id, @dailyCost, @dailyCost_value, @monthlyCost, @monthlyCost_value, @food, @flora, @attraction, @nightlife)
    `);

    const insertProvince = db.prepare(`
        INSERT OR IGNORE INTO provinces (id, region_id, name, image, dist, tam, serenity, entertainment, relax, population, population_value, area, area_value, dailyCost, dailyCost_value, safety)
        VALUES (@id, @region_id, @name, @image, @dist, @tam, @serenity, @entertainment, @relax, @population, @population_value, @area, @area_value, @dailyCost, @dailyCost_value, @safety)
    `);

    const insertMany = db.transaction((regions: Region[]) => {
        for (const reg of regions) {
            const regionPopValue = parsePopulationValue(reg.summary.pop);
            const regionAreaValue = parseAreaValue(reg.summary.area);
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
                population_value: regionPopValue,
                area: reg.summary.area,
                area_value: regionAreaValue,
                province_count: reg.summary.provinces
            });

            const regionDailyCostValue = parseCostValue(reg.stats.dailyCost);
            const regionMonthlyCostValue = parseCostValue(reg.stats.monthlyCost);
            insertStats.run({
                region_id: reg.id,
                dailyCost: reg.stats.dailyCost,
                dailyCost_value: regionDailyCostValue,
                monthlyCost: reg.stats.monthlyCost,
                monthlyCost_value: regionMonthlyCostValue,
                food: reg.stats.food,
                flora: reg.stats.flora,
                attraction: reg.stats.attraction,
                nightlife: reg.stats.nightlife
            });

            for (const prov of reg.subProvinces) {
                const dailyCost = prov.dailyCost || '300 ฿';
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
                    population_value: parsePopulationValue(prov.population || null),
                    area: prov.area || null,
                    area_value: parseAreaValue(prov.area || null),
                    dailyCost: dailyCost,
                    dailyCost_value: parseCostValue(dailyCost),
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
    regionsCache = null;
    provincesCache = null;
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
