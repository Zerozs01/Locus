const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

function resolveDbPath() {
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  return path.join(appData, 'locus', 'locus.db');
}

const dbPath = resolveDbPath();
console.log('Checking database:', dbPath);

const db = new Database(dbPath);

try {
  const regions = db.prepare('SELECT region_id, COUNT(*) as count FROM explore_places GROUP BY region_id').all();
  console.log('Places per region:');
  console.table(regions);

  const centralCount = db.prepare("SELECT COUNT(*) as count FROM explore_places WHERE region_id = 'central'").get().count;
  console.log('Central region count:', centralCount);
  
  if (centralCount > 0) {
    const examples = db.prepare("SELECT title, location_name FROM explore_places WHERE region_id = 'central' LIMIT 5").all();
    console.log('Examples for Central:');
    console.table(examples);
  }

} catch (err) {
  console.error('Error checking database:', err.message);
} finally {
  db.close();
}
