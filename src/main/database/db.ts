import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { Region, Province } from '../../shared/types';

const dbPath = path.join(app.getPath('userData'), 'locus.db');

// Initialize Database (verbose mode disabled for cleaner terminal)
const db = new Database(dbPath);
let regionsCache: Region[] | null = null;
let regionSummaryCache: Region[] | null = null;
let provincesCache: Map<string, Province> | null = null;
let provincesByRegionCache: Map<string, Province[]> | null = null;
let provinceIndexCache: Array<{ id: string; name: string; regionId: string; regionName: string; dailyCostValue: number | null; populationValue: number | null; safety: number | null }> | null = null;

// Performance optimizations for SQLite
db.pragma('journal_mode = WAL');           // Write-Ahead Logging for better concurrency
db.pragma('cache_size = -64000');          // 64MB cache (negative = KB)
db.pragma('synchronous = NORMAL');         // Balance between safety and speed
db.pragma('temp_store = MEMORY');          // Store temp tables in memory
db.pragma('mmap_size = 268435456');        // Memory-mapped I/O (256MB)
db.pragma('foreign_keys = ON');            // Enforce foreign key constraints 
db.pragma('busy_timeout = 3000');          // Avoid immediate "database is locked" errors

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

  // ====== 1. Transport: ระบบขนส่งรายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_transport (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      name TEXT NOT NULL,
      short_name TEXT,
      type TEXT NOT NULL,
      operator TEXT,
      description TEXT,
      warp_url TEXT,
      logo_text TEXT,
      color TEXT,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_transport_province ON province_transport(province_id);`);

  // ====== 2. Transport Routes: เส้นทางเดินทาง ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_routes (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      operator TEXT,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      via TEXT,
      departure_times TEXT,
      duration TEXT,
      base_fare INTEGER,
      frequency TEXT,
      terminal TEXT,
      notes TEXT,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_routes_province ON province_routes(province_id);`);

  // ====== 3. Local Food: อาหารท้องถิ่นรายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      province_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price_range TEXT,
      note TEXT,
      category TEXT DEFAULT 'local',
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_foods_province ON province_foods(province_id);`);

  // ====== 4. Accommodation: ที่พักรายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_accommodation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      province_id TEXT NOT NULL,
      tier TEXT NOT NULL,
      label TEXT NOT NULL,
      price_range TEXT,
      examples TEXT,
      booking_url TEXT,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_accom_province ON province_accommodation(province_id);`);

  // ====== 5. Danger Zones & Warnings: โซนอันตรายรายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_dangers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      province_id TEXT NOT NULL,
      label TEXT NOT NULL,
      severity TEXT DEFAULT 'medium',
      note TEXT,
      season TEXT,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_dangers_province ON province_dangers(province_id);`);

  // ====== 6. Knowledge Tips: ทิปส์ความรู้รายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_knowledge_tips (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tip_type TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_knowledge_tips_province ON province_knowledge_tips(province_id);`);

  // ====== 7. Supply Points: จุดเติมเสบียง/จุดบริการ ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_supply_points (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      type TEXT NOT NULL,
      label TEXT NOT NULL,
      area TEXT,
      note TEXT,
      open_hours TEXT,
      map_url TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_supply_points_province ON province_supply_points(province_id);`);

  // ====== 8. Emergency Contacts: เบอร์ฉุกเฉินเฉพาะจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_emergency_contacts (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      label TEXT NOT NULL,
      number TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_emergency_contacts_province ON province_emergency_contacts(province_id);`);

  // ====== 9. Planner Hints: ข้อมูลช่วยแพลนต้นทาง/ปลายทาง ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_planner_hints (
      province_id TEXT PRIMARY KEY,
      common_origins TEXT,
      common_destinations TEXT,
      transit_hubs TEXT,
      route_notes TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);

  // ====== 10. New Eco Entities: สิ่งแวดล้อมเฉพาะจังหวัดเพิ่มเติม ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS province_new_eco_entities (
      id TEXT PRIMARY KEY,
      province_id TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT,
      description TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY(province_id) REFERENCES provinces(id)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_new_eco_entities_province ON province_new_eco_entities(province_id);`);

  // ====== 11. Weather & AQI: ข้อมูลสภาพอากาศและค่าฝุ่นรายจังหวัด ======
  db.exec(`
    CREATE TABLE IF NOT EXISTS weather_aqi (
      province_id TEXT NOT NULL,
      date TEXT NOT NULL,
      temperature REAL,
      aqi INTEGER,
      updated_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (province_id, date)
    );
  `);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_weather_province_date ON weather_aqi(province_id, date);`);

  // Indexes creation moved after column migrations to ensure columns exist

  // Migrations: ensure numeric columns exist for legacy DBs
  ensureColumn('regions', 'population_value', 'INTEGER');
  ensureColumn('regions', 'area_value', 'REAL');
  ensureColumn('region_stats', 'dailyCost_value', 'INTEGER');
  ensureColumn('region_stats', 'monthlyCost_value', 'INTEGER');
  ensureColumn('provinces', 'population_value', 'INTEGER');
  ensureColumn('provinces', 'area_value', 'REAL');
  ensureColumn('provinces', 'dailyCost_value', 'INTEGER');
  ensureColumn('provinces', 'eco_ids', 'TEXT');
  ensureColumn('provinces', 'best_season', 'TEXT');

  backfillNumericColumns();
  
  // Cleanup legacy mock province IDs that were replaced
    const legacyIds = "('pte', 'bkk', 'ay', 'kan', 'sp', 'nbi', 'chon', 'ray', 'chan', 'trat')";
  
    // Disable FK enforcement for cleanup
    db.exec("PRAGMA foreign_keys = OFF");
  
    // Clean up ALL dependent tables in correct order (handle CASCADE manually)
    db.exec(`DELETE FROM weather_aqi WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_new_eco_entities WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_planner_hints WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_emergency_contacts WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_supply_points WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_knowledge_tips WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_dangers WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_accommodation WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_foods WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_routes WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM province_transport WHERE province_id IN ${legacyIds}`);
    db.exec(`DELETE FROM provinces WHERE id IN ${legacyIds}`);
  
    db.exec("PRAGMA foreign_keys = ON");

  // Create indexes for faster queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region ON provinces(region_id);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_stats_region ON region_stats(region_id);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_name ON provinces(name);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region_cost ON provinces(region_id, dailyCost_value);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region_population ON provinces(region_id, population_value);`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_provinces_region_safety ON provinces(region_id, safety);`);

  console.log('✓ Database ready at:', dbPath);
}

// ====== Weather & AQI persistent storage ======
export function saveWeatherAqi(records: { provinceId: string; date: string; temperature: number; aqi: number }[]) {
  const upsert = db.prepare(`
    INSERT INTO weather_aqi (province_id, date, temperature, aqi, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(province_id, date) DO UPDATE SET
      temperature = excluded.temperature,
      aqi = excluded.aqi,
      updated_at = datetime('now')
  `);
  const doUpsert = db.transaction(() => {
    for (const r of records) {
      upsert.run(r.provinceId, r.date, r.temperature, r.aqi);
    }
  });
  doUpsert();
  return records.length;
}

export function getWeatherAqi(provinceId?: string, date?: string): { provinceId: string; date: string; temperature: number; aqi: number }[] {
  let sql = 'SELECT province_id, date, temperature, aqi FROM weather_aqi';
  const params: string[] = [];
  const conditions: string[] = [];
  if (provinceId) { conditions.push('province_id = ?'); params.push(provinceId); }
  if (date) { conditions.push('date = ?'); params.push(date); }
  if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY date DESC';
  
  const rows = db.prepare(sql).all(...params) as { province_id: string; date: string; temperature: number; aqi: number }[];
  return rows.map(r => ({ provinceId: r.province_id, date: r.date, temperature: r.temperature, aqi: r.aqi }));
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
  eco_ids: string | null;
  best_season: string | null;
}

interface ProvinceTransportRow {
  id: string;
  province_id: string;
  name: string;
  short_name: string | null;
  type: string;
  operator: string | null;
  description: string | null;
  warp_url: string | null;
  logo_text: string | null;
  color: string | null;
}

interface ProvinceRouteRow {
  id: string;
  province_id: string;
  name: string;
  type: string;
  operator: string | null;
  origin: string;
  destination: string;
  via: string | null; // JSON
  departure_times: string | null; // JSON
  duration: string;
  base_fare: number;
  frequency: string | null;
  terminal: string | null;
  notes: string | null;
}

interface ProvinceFoodRow {
  province_id: string;
  name: string;
  price_range: string | null;
  note: string | null;
  category: string;
}

interface ProvinceAccommodationRow {
  province_id: string;
  tier: string;
  label: string;
  price_range: string | null;
  examples: string | null; // JSON
  booking_url: string | null;
}

interface ProvinceDangerRow {
  province_id: string;
  label: string;
  severity: string;
  note: string | null;
  season: string | null;
}

interface ProvinceKnowledgeTipRow {
  id: string;
  province_id: string;
  title: string;
  content: string;
  tip_type: string | null;
  sort_order: number;
}

interface ProvinceSupplyPointRow {
  id: string;
  province_id: string;
  type: string;
  label: string;
  area: string | null;
  note: string | null;
  open_hours: string | null;
  map_url: string | null;
  sort_order: number;
}

interface ProvinceEmergencyContactRow {
  id: string;
  province_id: string;
  label: string;
  number: string;
  sort_order: number;
}

interface ProvincePlannerHintsRow {
  province_id: string;
  common_origins: string | null;
  common_destinations: string | null;
  transit_hubs: string | null;
  route_notes: string | null;
}

interface ProvinceNewEcoEntityRow {
  id: string;
  province_id: string;
  entity_id: string;
  name: string;
  category: string;
  tags: string | null;
  description: string | null;
  sort_order: number;
}

interface ArchiveProvinceRow {
  id: string;
  name: string;
  regionId: string;
  image: string | null;
  dist: number;
  tam: number;
  population: string | null;
  populationValue: number | null;
  area: string | null;
  areaValue: number | null;
  dailyCost: string | null;
  dailyCostValue: number | null;
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
  
  const result: Region[] = regions.map((reg): Region => {
    const stats = statsMap.get(reg.id);
    const subProvinces = provincesMap.get(reg.id) || [];
    
    // Reconstruct the nested object structure expected by the frontend
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
      // Reconstruct summary object
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
  if (!regionSummaryCache) {
    regionSummaryCache = result.map((region) => ({ ...region, subProvinces: [] }));
  }
  const provinceMap = new Map<string, Province>();
  const provinceByRegion = new Map<string, Province[]>();
  for (const region of result) {
    provinceByRegion.set(region.id, region.subProvinces);
    for (const province of region.subProvinces) {
      provinceMap.set(province.id, province);
    }
  }
  provincesCache = provinceMap;
  provincesByRegionCache = provinceByRegion;
  return result;
}

export function getRegion(id: string): Region | undefined {
  if (regionsCache) return regionsCache.find(r => r.id === id);
  if (regionSummaryCache) return regionSummaryCache.find(r => r.id === id);

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

export function getProvincePortal(provinceId: string) {
  const province = db.prepare('SELECT * FROM provinces WHERE id = ?').get(provinceId) as ProvinceRow | undefined;
  if (!province) return null;

  const transport = db.prepare('SELECT * FROM province_transport WHERE province_id = ?').all(provinceId) as ProvinceTransportRow[];
  const routes = db.prepare('SELECT * FROM province_routes WHERE province_id = ?').all(provinceId) as ProvinceRouteRow[];
  const foods = db.prepare('SELECT * FROM province_foods WHERE province_id = ?').all(provinceId) as ProvinceFoodRow[];
  const accommodation = db.prepare('SELECT * FROM province_accommodation WHERE province_id = ?').all(provinceId) as ProvinceAccommodationRow[];
  const dangers = db.prepare('SELECT * FROM province_dangers WHERE province_id = ?').all(provinceId) as ProvinceDangerRow[];
  const knowledgeTips = db.prepare('SELECT * FROM province_knowledge_tips WHERE province_id = ? ORDER BY sort_order ASC').all(provinceId) as ProvinceKnowledgeTipRow[];
  const supplyPoints = db.prepare('SELECT * FROM province_supply_points WHERE province_id = ? ORDER BY sort_order ASC').all(provinceId) as ProvinceSupplyPointRow[];
  const emergencyContacts = db.prepare('SELECT * FROM province_emergency_contacts WHERE province_id = ? ORDER BY sort_order ASC').all(provinceId) as ProvinceEmergencyContactRow[];
  const plannerHints = db.prepare('SELECT * FROM province_planner_hints WHERE province_id = ?').get(provinceId) as ProvincePlannerHintsRow | undefined;
  const newEcoEntities = db.prepare('SELECT * FROM province_new_eco_entities WHERE province_id = ? ORDER BY sort_order ASC').all(provinceId) as ProvinceNewEcoEntityRow[];

  const parsedKnowledgeTips = knowledgeTips.map((tip) => ({
    title: tip.title,
    content: tip.content,
    type: tip.tip_type || 'other'
  }));

  const parsedSupplyPoints = supplyPoints.map((point) => ({
    type: point.type,
    label: point.label,
    area: point.area || '',
    note: point.note || '',
    openHours: point.open_hours || null,
    mapUrl: point.map_url || ''
  }));

  const parsedEmergencyContacts = emergencyContacts.map((contact) => ({
    label: contact.label,
    number: contact.number
  }));

  const parsedNewEcoEntities = newEcoEntities.map((entity) => ({
    id: entity.entity_id,
    name: entity.name,
    category: entity.category,
    tags: entity.tags ? JSON.parse(entity.tags) : [],
    desc: entity.description || ''
  }));

  const parsedPlannerHints = {
    commonOrigins: plannerHints?.common_origins ? JSON.parse(plannerHints.common_origins) : [],
    commonDestinations: plannerHints?.common_destinations ? JSON.parse(plannerHints.common_destinations) : [],
    transitHubs: plannerHints?.transit_hubs ? JSON.parse(plannerHints.transit_hubs) : [],
    routeNotes: plannerHints?.route_notes ? JSON.parse(plannerHints.route_notes) : []
  };

  const parsedFoods = foods.map(f => ({
    name: f.name,
    priceRange: f.price_range || '',
    note: f.note || '',
    category: f.category || 'local'
  }));

  return {
    provinceId: province.id,
    bestSeason: province.best_season,
    ecoIds: province.eco_ids ? JSON.parse(province.eco_ids) : [],
    // Map to frontend interface:
    transport: transport.map(t => ({
      name: t.name,
      shortName: t.short_name || '',
      type: t.type,
      description: t.description || '',
      warpUrl: t.warp_url || '',
      logoText: t.logo_text || '',
      color: t.color || '#fbbf24'
    })),
    transportRoutes: routes.map(r => ({
      id: r.id,
      name: r.name,
      type: r.type,
      operator: r.operator || 'บขส.',
      from: r.origin,
      to: r.destination,
      via: r.via ? JSON.parse(r.via) : [],
      departureTime: r.departure_times ? JSON.parse(r.departure_times) : [],
      departureTimes: r.departure_times ? JSON.parse(r.departure_times) : [],
      duration: r.duration,
      baseFare: r.base_fare,
      frequency: r.frequency || 'N/A',
      terminal: r.terminal || '',
      notes: r.notes || ''
    })),
    localFood: parsedFoods,
    localFoods: parsedFoods,
    accommodation: accommodation.map(a => ({
      tier: a.tier,
      label: a.label,
      priceRange: a.price_range || '',
      examples: a.examples ? JSON.parse(a.examples) : [],
      bookingUrl: a.booking_url || ''
    })),
    dangerZones: dangers.map(d => ({
      label: d.label,
      severity: d.severity,
      note: d.note || '',
      season: d.season || ''
    })),
    supply: parsedSupplyPoints,
    knowledge: parsedKnowledgeTips,
    tips: parsedKnowledgeTips,
    emergencyNumbers: parsedEmergencyContacts,
    plannerHints: parsedPlannerHints,
    newEcoEntities: parsedNewEcoEntities,
    eco: { animals: [], plants: [], terrain: '', climate: '' }
  };
}

export function getRegionSummaries(): Region[] {
  if (regionSummaryCache) return regionSummaryCache;

  const regions = db.prepare('SELECT * FROM regions').all() as RegionRow[];
  const allStats = db.prepare('SELECT * FROM region_stats').all() as RegionStatsRow[];

  const statsMap = new Map<string, RegionStatsRow>();
  for (const stat of allStats) {
    statsMap.set(stat.region_id, stat);
  }

  const summaries: Region[] = regions.map((reg): Region => {
    const stats = statsMap.get(reg.id);
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
  });

  regionSummaryCache = summaries;
  return summaries;
}

export function getProvincesByRegion(regionId: string): Province[] {
  if (provincesByRegionCache?.has(regionId)) {
    return provincesByRegionCache.get(regionId)!;
  }

  const rows = db.prepare('SELECT * FROM provinces WHERE region_id = ?').all(regionId) as ProvinceRow[];
  const provinces = rows.map((row) => ({
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
  })) as Province[];

  if (!provincesByRegionCache) {
    provincesByRegionCache = new Map<string, Province[]>();
  }
  provincesByRegionCache.set(regionId, provinces);
  if (!provincesCache) {
    provincesCache = new Map<string, Province>();
  }
  for (const province of provinces) {
    provincesCache.set(province.id, province);
  }
  return provinces;
}

export function getProvinceIndex(): Array<{ id: string; name: string; regionId: string; regionName: string; dailyCostValue: number | null; populationValue: number | null; safety: number | null }> {
  if (provinceIndexCache) return provinceIndexCache;

  const rows = db.prepare(`
    SELECT
      p.id as id,
      p.name as name,
      p.region_id as regionId,
      r.name as regionName,
      p.dailyCost_value as dailyCostValue,
      p.population_value as populationValue,
      p.safety as safety
    FROM provinces p
    JOIN regions r ON r.id = p.region_id
    ORDER BY p.name ASC
  `).all() as Array<{ id: string; name: string; regionId: string; regionName: string; dailyCostValue: number | null; populationValue: number | null; safety: number | null }>;

  provinceIndexCache = rows;
  return provinceIndexCache;
}

export function getArchiveProvinces(params: {
  regionIds?: string[];
  ids?: string[];
  sortBy?: string;
  offset?: number;
  limit?: number;
}) {
  const { regionIds, ids, sortBy = 'name', offset = 0, limit = 60 } = params;

  if (Array.isArray(ids) && ids.length === 0) {
    return { rows: [], total: 0 };
  }

  const where: string[] = [];
  const queryParams: Array<string | number> = [];

  if (ids && ids.length > 0) {
    where.push(`p.id IN (${ids.map(() => '?').join(',')})`);
    queryParams.push(...ids);
  }

  if (regionIds && regionIds.length > 0) {
    where.push(`p.region_id IN (${regionIds.map(() => '?').join(',')})`);
    queryParams.push(...regionIds);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
  const sortMap: Record<string, string> = {
    name: 'p.name COLLATE NOCASE ASC',
    'cost-high': 'COALESCE(p.dailyCost_value, 0) DESC',
    'cost-low': 'COALESCE(p.dailyCost_value, 0) ASC',
    'safety-high': 'COALESCE(p.safety, 0) DESC',
    'safety-low': 'COALESCE(p.safety, 0) ASC',
    'pop-high': 'COALESCE(p.population_value, 0) DESC',
    'pop-low': 'COALESCE(p.population_value, 0) ASC',
  };
  const orderBy = sortMap[sortBy] || sortMap.name;

  const countRow = db.prepare(`SELECT COUNT(*) as total FROM provinces p ${whereClause}`).get(...queryParams) as { total: number };
  const rows = db.prepare(`
    SELECT
      p.id as id,
      p.name as name,
      p.region_id as regionId,
      p.image as image,
      p.dist as dist,
      p.tam as tam,
      p.population as population,
      p.population_value as populationValue,
      p.area as area,
      p.area_value as areaValue,
      p.dailyCost as dailyCost,
      p.dailyCost_value as dailyCostValue,
      p.safety as safety
    FROM provinces p
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `).all(...queryParams, limit, offset) as ArchiveProvinceRow[];

  return {
    rows: rows.map((row) => ({
      id: row.id,
      name: row.name,
      regionId: row.regionId,
      image: row.image || '',
      dist: row.dist,
      tam: row.tam,
      population: row.population ?? undefined,
      area: row.area ?? undefined,
      dailyCost: row.dailyCost ?? undefined,
      safety: row.safety ?? undefined,
      populationValue: row.populationValue ?? undefined,
      areaValue: row.areaValue ?? undefined,
      dailyCostValue: row.dailyCostValue ?? undefined
    })),
    total: countRow.total
  };
}

export function seedDatabase(initialRegions: Region[]) {
    regionsCache = null;
    regionSummaryCache = null;
    provincesCache = null;
    provincesByRegionCache = null;
    provinceIndexCache = null;
    // Check main counts
    const regionCount = db.prepare('SELECT count(*) as count FROM regions').get() as { count: number };
    const provinceCount = db.prepare('SELECT count(*) as count FROM provinces').get() as { count: number };
    
    // Calculate expected province count from initialRegions
    const expectedProvinces = initialRegions.reduce((sum, r) => sum + r.subProvinces.length, 0);
    const expectedRegions = initialRegions.length;
    
    // Quick check to skip if everything looks populated (simple heuristic)
    if (regionCount.count >= expectedRegions && provinceCount.count >= expectedProvinces) {
        console.log(`✓ Database checks out (${regionCount.count} regions, ${provinceCount.count} provinces). Validating theme...`);
        // Keep static theme columns in sync for existing DBs.
        const updateTheme = db.prepare(`UPDATE regions SET color = ?, gradient = ? WHERE id = ?`);
        db.transaction(() => {
          for (const reg of initialRegions) {
            updateTheme.run(reg.color, reg.gradient || null, reg.id);
          }
        })();
        // REMOVED EARLY RETURN to ensure any new provinces are inserted via INSERT OR IGNORE
        // return;
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
    regionSummaryCache = null;
    provincesCache = null;
    provincesByRegionCache = null;
    provinceIndexCache = null;

    const clearAll = db.transaction(() => {
      db.exec('DELETE FROM weather_aqi;');
      db.exec('DELETE FROM province_new_eco_entities;');
      db.exec('DELETE FROM province_planner_hints;');
      db.exec('DELETE FROM province_emergency_contacts;');
      db.exec('DELETE FROM province_supply_points;');
      db.exec('DELETE FROM province_knowledge_tips;');
      db.exec('DELETE FROM province_dangers;');
      db.exec('DELETE FROM province_accommodation;');
      db.exec('DELETE FROM province_foods;');
      db.exec('DELETE FROM province_routes;');
      db.exec('DELETE FROM province_transport;');
      db.exec('DELETE FROM provinces;');
      db.exec('DELETE FROM region_stats;');
      db.exec('DELETE FROM regions;');
    });

    clearAll();
    
    // Call seedDatabase with cleared tables
    seedDatabase(initialRegions);
}

// Get database stats for debugging
export function getDatabaseStats() {
    const regionCount = db.prepare('SELECT count(*) as count FROM regions').get() as { count: number };
    const provinceCount = db.prepare('SELECT count(*) as count FROM provinces').get() as { count: number };
    const statsCount = db.prepare('SELECT count(*) as count FROM region_stats').get() as { count: number };
    const transportCount = db.prepare('SELECT count(*) as count FROM province_transport').get() as { count: number };
    const routeCount = db.prepare('SELECT count(*) as count FROM province_routes').get() as { count: number };
    const foodCount = db.prepare('SELECT count(*) as count FROM province_foods').get() as { count: number };
    const accomCount = db.prepare('SELECT count(*) as count FROM province_accommodation').get() as { count: number };
    const dangerCount = db.prepare('SELECT count(*) as count FROM province_dangers').get() as { count: number };
    const knowledgeTipCount = db.prepare('SELECT count(*) as count FROM province_knowledge_tips').get() as { count: number };
    const supplyPointCount = db.prepare('SELECT count(*) as count FROM province_supply_points').get() as { count: number };
    const emergencyContactCount = db.prepare('SELECT count(*) as count FROM province_emergency_contacts').get() as { count: number };
    const plannerHintsCount = db.prepare('SELECT count(*) as count FROM province_planner_hints').get() as { count: number };
    const newEcoEntityCount = db.prepare('SELECT count(*) as count FROM province_new_eco_entities').get() as { count: number };
    
    return {
        regions: regionCount.count,
        provinces: provinceCount.count,
        stats: statsCount.count,
        transport: transportCount.count,
        routes: routeCount.count,
        foods: foodCount.count,
        accommodation: accomCount.count,
        dangers: dangerCount.count,
        knowledgeTips: knowledgeTipCount.count,
        supplyPoints: supplyPointCount.count,
        emergencyContacts: emergencyContactCount.count,
        plannerHints: plannerHintsCount.count,
        newEcoEntities: newEcoEntityCount.count,
        dbPath: dbPath
    };
}

// ===== Province Portal Seed Data Types & Function =====
export interface PortalTransportSeed {
  name: string;
  shortName: string;
  type: string;
  description: string;
  warpUrl: string;
  logoText: string;
  color: string;
}

export interface PortalRouteSeed {
  name: string;
  type: string;
  operator: string;
  from: string;
  to: string;
  via: string[];
  departureTimes: string[];
  duration: string;
  baseFare: number;
  frequency: string;
  terminal: string;
  notes: string | null;
}

export interface PortalFoodSeed {
  name: string;
  priceRange: string;
  category: string;
  note: string | null;
}

export interface PortalAccommodationSeed {
  tier: string;
  label: string;
  priceRange: string;
  examples: string[];
  bookingUrl: string | null;
}

export interface PortalDangerSeed {
  label: string;
  severity: string;
  note: string;
  season: string | null;
}

export interface PortalMetadataSeed {
  climate?: string;
  terrain?: string;
  bestSeason?: string;
  emergencyContacts?: Array<{ label: string; number: string }>;
}

export interface ProvincePortalSeedData {
  transport?: PortalTransportSeed[];
  routes?: PortalRouteSeed[];
  localFoods?: PortalFoodSeed[];
  accommodation?: PortalAccommodationSeed[];
  dangerZones?: PortalDangerSeed[];
  ecoIds?: string[];
  newEcoEntities?: Array<{ id: string; name: string; category: string; tags: string[]; desc: string }>;
  knowledgeTips?: Array<{ title: string; content: string; type?: string }>;
  supplyPoints?: Array<{ type: string; label: string; area?: string | null; note?: string | null; openHours?: string | null; mapUrl?: string }>;
  plannerHints?: { commonOrigins?: string[]; commonDestinations?: string[]; transitHubs?: string[]; routeNotes?: string[] };
  metadata?: PortalMetadataSeed;
}

/**
 * Seed province portal data.
 * Base tables (transport/routes/foods/accommodation/dangers) are inserted once.
 * Auxiliary tables (knowledge/supply/emergency/planner/new-eco) are refreshed each run.
 */
export function seedProvincePortalData(data: Record<string, ProvincePortalSeedData>) {
  const insertTransport = db.prepare(`
    INSERT OR IGNORE INTO province_transport (id, province_id, name, short_name, type, description, warp_url, logo_text, color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertRoute = db.prepare(`
    INSERT OR IGNORE INTO province_routes (id, province_id, name, type, operator, origin, destination, via, departure_times, duration, base_fare, frequency, terminal, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertFood = db.prepare(`
    INSERT INTO province_foods (province_id, name, price_range, note, category)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertAccom = db.prepare(`
    INSERT INTO province_accommodation (province_id, tier, label, price_range, examples, booking_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertDanger = db.prepare(`
    INSERT INTO province_dangers (province_id, label, severity, note, season)
    VALUES (?, ?, ?, ?, ?)
  `);

  const replaceKnowledgeTip = db.prepare(`
    INSERT OR REPLACE INTO province_knowledge_tips (id, province_id, title, content, tip_type, sort_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const replaceSupplyPoint = db.prepare(`
    INSERT OR REPLACE INTO province_supply_points (id, province_id, type, label, area, note, open_hours, map_url, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const replaceEmergencyContact = db.prepare(`
    INSERT OR REPLACE INTO province_emergency_contacts (id, province_id, label, number, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  const upsertPlannerHints = db.prepare(`
    INSERT INTO province_planner_hints (province_id, common_origins, common_destinations, transit_hubs, route_notes, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(province_id) DO UPDATE SET
      common_origins = excluded.common_origins,
      common_destinations = excluded.common_destinations,
      transit_hubs = excluded.transit_hubs,
      route_notes = excluded.route_notes,
      updated_at = datetime('now')
  `);

  const replaceNewEcoEntity = db.prepare(`
    INSERT OR REPLACE INTO province_new_eco_entities (id, province_id, entity_id, name, category, tags, description, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const deleteKnowledgeTips = db.prepare('DELETE FROM province_knowledge_tips WHERE province_id = ?');
  const deleteSupplyPoints = db.prepare('DELETE FROM province_supply_points WHERE province_id = ?');
  const deleteEmergencyContacts = db.prepare('DELETE FROM province_emergency_contacts WHERE province_id = ?');
  const deleteNewEcoEntities = db.prepare('DELETE FROM province_new_eco_entities WHERE province_id = ?');

  const updateEcoAndSeason = db.prepare(`
    UPDATE provinces SET eco_ids = ?, best_season = ? WHERE id = ?
  `);

  const getProvinceEcoAndSeason = db.prepare('SELECT eco_ids, best_season FROM provinces WHERE id = ?');

  // Province name → id mapping (English name from deep research → province_id in DB)
  const nameToId: Record<string, string> = {
    'Khon Kaen': 'khonkaen',
    'Udon Thani': 'udonthani',
    'Nong Khai': 'nongkhai',
    'Nong Bua Lam Phu': 'nongbualamphu',
    'Loei': 'loei',
    'Sakon Nakhon': 'sakonnakhon',
    'Nakhon Phanom': 'nakhonphanom',
    'Mukdahan': 'mukdahan',
    'Kalasin': 'kalasin',
    'Bueng Kan': 'buengkan',
    // Part 4 - Isan lower
    'Nakhon Ratchasima': 'nakhonratchasima',
    'Buri Ram': 'buriram',
    'Surin': 'surin',
    'Si Sa Ket': 'sisaket',
    'Ubon Ratchathani': 'ubonratchathani',
    'Roi Et': 'roiet',
    'Maha Sarakham': 'mahasarakham',
    'Yasothon': 'yasothon',
    'Amnat Charoen': 'amnatcharoen',
    'Chaiyaphum': 'chaiyaphum',
    // Part 2 - North
    'Chiang Mai': 'chiangmai',
    'Chiang Rai': 'chiangrai',
    'Lampang': 'lampang',
    'Lamphun': 'lamphun',
    'Mae Hong Son': 'maehongson',
    'Nan': 'nan',
    'Phayao': 'phayao',
    'Phrae': 'phrae',
    'Uttaradit': 'uttaradit',
    'Sukhothai': 'sukhothai',
    'Tak': 'tak',
    'Kamphaeng Phet': 'kamphaengphet',
    'Phitsanulok': 'phitsanulok',
    'Phichit': 'phichit',
    'Phetchabun': 'phetchabun',
    'Nakhon Sawan': 'nakhonsawan',
    'Uthai Thani': 'uthaithani',
    // Part 1 - Central
    'Bangkok': 'bangkok',
    'Nonthaburi': 'nonthaburi',
    'Pathum Thani': 'pathumthani',
    'Samut Prakan': 'samutprakan',
    'Phra Nakhon Si Ayutthaya': 'ayutthaya',
    'Ayutthaya': 'ayutthaya', // Fallback for short name
    'Nakhon Pathom': 'nakhonpathom',
    'Samut Sakhon': 'samutsakhon',
    'Samut Songkhram': 'samutsongkhram',
    'Suphan Buri': 'suphanburi',
    'Sing Buri': 'singburi',
    'Ang Thong': 'angthong',
    'Lop Buri': 'lopburi',
    'Saraburi': 'saraburi',
    'Chai Nat': 'chainat',
    'Nakhon Nayok': 'nakhonnayok',
    // Part 5 - East + West
    'Chon Buri': 'chonburi',
    'Rayong': 'rayong',
    'Chanthaburi': 'chanthaburi',
    'Trat': 'trat',
    'Sa Kaeo': 'sakaeo',
    'Chachoengsao': 'chachoengsao',
    'Prachin Buri': 'prachinburi',
    'Kanchanaburi': 'kanchanaburi',
    'Ratchaburi': 'ratchaburi',
    'Phetchaburi': 'phetchaburi',
    'Prachuap Khiri Khan': 'prachuapkhirikhan',
    // Part 6 - South
    'Surat Thani': 'suratthani',
    'Phuket': 'phuket',
    'Krabi': 'krabi',
    'Phang Nga': 'phangnga',
    'Nakhon Si Thammarat': 'nakhonsithammarat',
    'Songkhla': 'songkhla',
    'Trang': 'trang',
    'Satun': 'satun',
    'Phatthalung': 'phatthalung',
    'Chumphon': 'chumphon',
    'Ranong': 'ranong',
    'Yala': 'yala',
    'Pattani': 'pattani',
    'Narathiwat': 'narathiwat',
  };

  let seeded = 0;
  let skipped = 0;
  let enriched = 0;

  const doSeed = db.transaction(() => {
    for (const [provinceName, portal] of Object.entries(data)) {
      // Support both display names ("Kamphaeng Phet") and pre-normalized IDs ("kamphaengphet")
      let provinceId = nameToId[provinceName];
      if (!provinceId) {
        // Try using the key directly as a province_id
        const directCheck = db.prepare('SELECT id FROM provinces WHERE id = ?').get(provinceName) as { id: string } | undefined;
        if (directCheck) {
          provinceId = directCheck.id;
        } else {
          console.warn(`⚠ Portal seed: unknown province "${provinceName}", skipping`);
          skipped++;
          continue;
        }
      }

      const transportSeeds = Array.isArray(portal.transport) ? portal.transport : [];
      const routeSeeds = Array.isArray(portal.routes) ? portal.routes : [];
      const foodSeeds = Array.isArray(portal.localFoods) ? portal.localFoods : [];
      const accommodationSeeds = Array.isArray(portal.accommodation) ? portal.accommodation : [];
      const dangerSeeds = Array.isArray(portal.dangerZones) ? portal.dangerZones : [];
      const metadata = portal.metadata;
      const hasBasePayload =
        transportSeeds.length > 0 ||
        routeSeeds.length > 0 ||
        foodSeeds.length > 0 ||
        accommodationSeeds.length > 0 ||
        dangerSeeds.length > 0;

      // Check if base portal data is already seeded.
      const existing = db.prepare('SELECT count(*) as c FROM province_transport WHERE province_id = ?').get(provinceId) as { c: number };
      if (existing.c > 0) {
        skipped++;
      } else if (hasBasePayload) {
        // 1. Transport
        transportSeeds.forEach((t, i) => {
          const id = `${provinceId}_t_${i}`;
          insertTransport.run(id, provinceId, t.name, t.shortName, t.type, t.description, t.warpUrl || null, t.logoText, t.color);
        });

        // 2. Routes
        routeSeeds.forEach((r, i) => {
          const id = `${provinceId}_r_${i}`;
          insertRoute.run(
            id, provinceId, r.name, r.type, r.operator, r.from, r.to,
            JSON.stringify(r.via), JSON.stringify(r.departureTimes),
            r.duration, r.baseFare, r.frequency, r.terminal, r.notes
          );
        });

        // 3. Local foods
        foodSeeds.forEach(f => {
          insertFood.run(provinceId, f.name, f.priceRange, f.note, f.category);
        });

        // 4. Accommodation
        accommodationSeeds.forEach(a => {
          insertAccom.run(provinceId, a.tier, a.label, a.priceRange, JSON.stringify(a.examples), a.bookingUrl);
        });

        // 5. Danger zones
        dangerSeeds.forEach(d => {
          insertDanger.run(provinceId, d.label, d.severity, d.note, d.season);
        });

        seeded++;
      } else {
        skipped++;
      }

      // 6. Update eco_ids and best_season on provinces table
      const hasEcoUpdate = Array.isArray(portal.ecoIds);
      const hasBestSeasonUpdate = typeof metadata?.bestSeason === 'string';
      if (hasEcoUpdate || hasBestSeasonUpdate) {
        const current = getProvinceEcoAndSeason.get(provinceId) as { eco_ids: string | null; best_season: string | null } | undefined;
        const nextEcoIds = hasEcoUpdate ? JSON.stringify(portal.ecoIds) : (current?.eco_ids ?? null);
        const nextBestSeason = hasBestSeasonUpdate
          ? (metadata?.bestSeason && metadata.bestSeason.trim() ? metadata.bestSeason : null)
          : (current?.best_season ?? null);
        updateEcoAndSeason.run(nextEcoIds, nextBestSeason, provinceId);
      }

      // 7. Province-specific emergency contacts
      if (Array.isArray(metadata?.emergencyContacts)) {
        deleteEmergencyContacts.run(provinceId);
        metadata.emergencyContacts.forEach((contact, i) => {
          const id = `${provinceId}_em_${i}`;
          replaceEmergencyContact.run(id, provinceId, contact.label, contact.number, i);
        });
      }

      // 8. Knowledge tips
      if (portal.knowledgeTips !== undefined) {
        deleteKnowledgeTips.run(provinceId);
        (portal.knowledgeTips || []).forEach((tip, i) => {
          const id = `${provinceId}_kt_${i}`;
          replaceKnowledgeTip.run(id, provinceId, tip.title, tip.content, tip.type || 'other', i);
        });
      }

      // 9. Supply points
      if (portal.supplyPoints !== undefined) {
        deleteSupplyPoints.run(provinceId);
        (portal.supplyPoints || []).forEach((point, i) => {
          const id = `${provinceId}_sp_${i}`;
          replaceSupplyPoint.run(
            id,
            provinceId,
            point.type,
            point.label,
            point.area || '',
            point.note || '',
            point.openHours || null,
            point.mapUrl || '',
            i
          );
        });
      }

      // 10. Planner hints
      if (portal.plannerHints !== undefined) {
        const planner = portal.plannerHints || {};
        upsertPlannerHints.run(
          provinceId,
          JSON.stringify(planner.commonOrigins || []),
          JSON.stringify(planner.commonDestinations || []),
          JSON.stringify(planner.transitHubs || []),
          JSON.stringify(planner.routeNotes || [])
        );
      }

      // 11. New eco entities
      if (portal.newEcoEntities !== undefined) {
        deleteNewEcoEntities.run(provinceId);
        (portal.newEcoEntities || []).forEach((eco, i) => {
          const id = `${provinceId}_eco_${i}`;
          replaceNewEcoEntity.run(
            id,
            provinceId,
            eco.id,
            eco.name,
            eco.category,
            JSON.stringify(eco.tags || []),
            eco.desc,
            i
          );
        });
      }

      enriched++;
    }
  });

  doSeed();
  console.log(`✓ Portal data seeded: ${seeded} provinces, ${skipped} skipped, ${enriched} enriched`);
}
