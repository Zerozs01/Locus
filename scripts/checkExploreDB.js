const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

function resolveDbPath() {
  if (process.env.LOCUS_DB_PATH) return path.resolve(process.env.LOCUS_DB_PATH);
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  return path.join(appData, 'locus', 'locus.db');
}

const dbPath = resolveDbPath();
console.log('Using DB:', dbPath);
let db;
try {
  db = new Database(dbPath, { readonly: true });
} catch (e) {
  console.error('Failed to open DB:', e && e.message);
  process.exit(2);
}

try {
  const total = db.prepare('SELECT COUNT(*) as c FROM explore_places').get().c;
  const withThumb = db.prepare('SELECT COUNT(*) as c FROM explore_places WHERE thumbnail_url IS NOT NULL AND thumbnail_url != ""').get().c;
  const withRating = db.prepare('SELECT COUNT(*) as c FROM explore_places WHERE rating IS NOT NULL').get().c;
  const sample = db.prepare('SELECT id, title, location_name, thumbnail_url, full_image_url, rating FROM explore_places ORDER BY id LIMIT 8').all();

  console.log('Total explore_places:', total);
  console.log('With thumbnail_url:', withThumb);
  console.log('With rating:', withRating);
  console.log('\nSample rows (first 8):');
  sample.forEach(r => {
    console.log('-', r.id, r.title, '|', r.location_name, '| rating=', r.rating, '| thumb=', !!r.thumbnail_url);
  });
} catch (err) {
  console.error('Query failed:', err && err.message);
  process.exit(3);
} finally {
  db.close();
}

process.exit(0);
