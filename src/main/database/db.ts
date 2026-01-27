import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

const dbPath = path.join(app.getPath('userData'), 'locus.db');

// Initialize Database (verbose mode disabled for cleaner terminal)
const db = new Database(dbPath);
db.pragma('journal_mode = WAL'); 
db.pragma('cache_size = -64000'); 

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
      FOREIGN KEY(region_id) REFERENCES regions(id)
    );
  `);

  console.log('✓ Database ready at:', dbPath);
}

export function getRegions() {
  const regions = db.prepare('SELECT * FROM regions').all();
  
  return regions.map((reg: any) => {
    const stats = db.prepare('SELECT * FROM region_stats WHERE region_id = ?').get(reg.id);
    const subProvinces = db.prepare('SELECT * FROM provinces WHERE region_id = ?').all(reg.id);
    
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
      stats: stats,
      subProvinces: subProvinces
    };
  });
}

export function getProvince(id: string) {
    return db.prepare('SELECT * FROM provinces WHERE id = ?').get(id);
}

export function seedDatabase(initialRegions: any[]) {
    const count = db.prepare('SELECT count(*) as count FROM regions').get() as { count: number };
    if (count.count > 0) {
        console.log('✓ Database already seeded, skipping...');
        return; 
    }

    console.log('⏳ Seeding Database...');
    const insertRegion = db.prepare(`
        INSERT INTO regions (id, name, engName, code, desc, color, gradient, image, safety, population, area, province_count)
        VALUES (@id, @name, @engName, @code, @desc, @color, @gradient, @image, @safety, @population, @area, @province_count)
    `);

    const insertStats = db.prepare(`
        INSERT INTO region_stats (region_id, dailyCost, monthlyCost, food, flora, attraction, nightlife)
        VALUES (@region_id, @dailyCost, @monthlyCost, @food, @flora, @attraction, @nightlife)
    `);

    const insertProvince = db.prepare(`
        INSERT INTO provinces (id, region_id, name, image, dist, tam, serenity, entertainment, relax)
        VALUES (@id, @region_id, @name, @image, @dist, @tam, @serenity, @entertainment, @relax)
    `);

    const insertMany = db.transaction((regions: any[]) => {
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
                // Map from summary object
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
                    serenity: prov.serenity,
                    entertainment: prov.entertainment,
                    relax: prov.relax
                });
            }
        }
    });

    insertMany(initialRegions);
    console.log('✓ Seeding Complete! (' + initialRegions.length + ' regions)');
}
