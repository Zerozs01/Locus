
const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

// Path to locus.db in userData
// On Windows: %APPDATA%\locus\locus.db or similar
// Actually, in db.ts it uses app.getPath('userData')
const dbPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Locus', 'locus.db');

try {
  const db = new Database(dbPath, { readonly: true });
  
  console.log('--- Regions ---');
  const regions = db.prepare('SELECT id, name FROM regions').all();
  console.log(regions);

  console.log('\n--- West Provinces ---');
  const westProvinces = db.prepare('SELECT id, name FROM provinces WHERE region_id = "west"').all();
  console.log(westProvinces);

  console.log('\n--- Phetchaburi Check ---');
  const phet = db.prepare('SELECT * FROM provinces WHERE id = "phetchaburi"').get();
  console.log(phet ? 'Found' : 'Not Found');

  db.close();
} catch (e) {
  console.error('Error opening DB:', e.message);
  console.log('Trying alternative path...');
  // Try another possible path if needed
}
