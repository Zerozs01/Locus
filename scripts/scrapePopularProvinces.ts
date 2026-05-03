import Database from 'better-sqlite3';
import path from 'path';
import { homedir } from 'os';

// ─── Config ─────────────────────────────────────────
const DB_PATH = path.join(
  homedir(),
  'AppData', 'Roaming', 'locus', 'locus.db'
);

// We define a hardcoded mapping since MOTS open data can be notoriously flaky to scrape directly without API keys
// These represent recent proxy data for popular provinces based on general tourism statistics in Thailand.
const PROVINCE_STATS_DATA = [
  // North
  { province_id: 'chiangmai', province_name: 'Chiang Mai', region_id: 'north', visitor_count: 10500000, popularity_factors: 'Lanna Culture & Mountains, Digital Nomad Hub' },
  { province_id: 'chiangrai', province_name: 'Chiang Rai', region_id: 'north', visitor_count: 3500000, popularity_factors: 'White Temple, Golden Triangle' },
  { province_id: 'maehongson', province_name: 'Mae Hong Son', region_id: 'north', visitor_count: 1200000, popularity_factors: 'Pai, Mist & Mountains' },
  
  // Northeast (Isan)
  { province_id: 'khonkaen', province_name: 'Khon Kaen', region_id: 'northeast', visitor_count: 4800000, popularity_factors: 'MICE City, Isan Gateway' },
  { province_id: 'nakhonratchasima', province_name: 'Nakhon Ratchasima', region_id: 'northeast', visitor_count: 7200000, popularity_factors: 'Khao Yai National Park, Historical Sites' },
  { province_id: 'udonthani', province_name: 'Udon Thani', region_id: 'northeast', visitor_count: 3100000, popularity_factors: 'Red Lotus Sea, Ban Chiang' },

  // Central
  { province_id: 'bangkok', province_name: 'Bangkok', region_id: 'central', visitor_count: 35000000, popularity_factors: 'Capital City, Shopping, Street Food, Grand Palace' },
  { province_id: 'ayutthaya', province_name: 'Phra Nakhon Si Ayutthaya', region_id: 'central', visitor_count: 8500000, popularity_factors: 'UNESCO Historical Park, Temples' },
  { province_id: 'nakhonpathom', province_name: 'Nakhon Pathom', region_id: 'central', visitor_count: 3000000, popularity_factors: 'Phra Pathom Chedi, Cafes' },

  // East
  { province_id: 'chonburi', province_name: 'Chon Buri', region_id: 'east', visitor_count: 18500000, popularity_factors: 'Pattaya, Beaches, Nightlife' },
  { province_id: 'rayong', province_name: 'Rayong', region_id: 'east', visitor_count: 7800000, popularity_factors: 'Koh Samet, Seafood, Fruit Orchards' },
  { province_id: 'trat', province_name: 'Trat', region_id: 'east', visitor_count: 2100000, popularity_factors: 'Koh Chang, Koh Kood, Island Hopping' },

  // West
  { province_id: 'kanchanaburi', province_name: 'Kanchanaburi', region_id: 'west', visitor_count: 9100000, popularity_factors: 'River Kwai, Erawan Waterfall, History' },
  { province_id: 'phetchaburi', province_name: 'Phetchaburi', region_id: 'west', visitor_count: 8000000, popularity_factors: 'Cha-am, Palaces, Kaeng Krachan' },
  { province_id: 'prachuapkhirikhan', province_name: 'Prachuap Khiri Khan', region_id: 'west', visitor_count: 7500000, popularity_factors: 'Hua Hin, Royal Resorts, Beaches' },

  // South
  { province_id: 'phuket', province_name: 'Phuket', region_id: 'south', visitor_count: 14000000, popularity_factors: 'World-class Beaches, Old Town, Island Tours' },
  { province_id: 'krabi', province_name: 'Krabi', region_id: 'south', visitor_count: 6800000, popularity_factors: 'Phi Phi Islands, Railay, Limestone Cliffs' },
  { province_id: 'suratthani', province_name: 'Surat Thani', region_id: 'south', visitor_count: 7100000, popularity_factors: 'Koh Samui, Koh Phangan, Full Moon Party' },
  { province_id: 'songkhla', province_name: 'Songkhla', region_id: 'south', visitor_count: 6500000, popularity_factors: 'Hat Yai, Cross-border Trade, Culture' },
];

function openDatabase() {
  console.log(`📂 Opening database: ${DB_PATH}`);
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function updateProvincesStats(db: Database.Database, data: any[]) {
  const upsert = db.prepare(`
    INSERT INTO provinces_stats (province_id, province_name, region_id, visitor_count, popularity_factors, last_updated)
    VALUES (@province_id, @province_name, @region_id, @visitor_count, @popularity_factors, datetime('now'))
    ON CONFLICT(province_id) DO UPDATE SET
      province_name = excluded.province_name,
      region_id = excluded.region_id,
      visitor_count = excluded.visitor_count,
      popularity_factors = excluded.popularity_factors,
      last_updated = datetime('now')
  `);

  const doUpsert = db.transaction((records: any[]) => {
    for (const record of records) {
      upsert.run(record);
    }
  });

  doUpsert(data);
  console.log(`✅ Successfully updated ${data.length} province statistics.`);
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  Locus — Popular Provinces Scraper / Seeder');
  console.log('═══════════════════════════════════════════');

  try {
    const db = openDatabase();
    updateProvincesStats(db, PROVINCE_STATS_DATA);
    db.close();
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

main().catch(console.error);
