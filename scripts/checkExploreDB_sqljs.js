const fs = require('fs');
const path = require('path');
const os = require('os');
const initSqlJs = require('sql.js');

function resolveDbPath() {
  if (process.env.LOCUS_DB_PATH) return path.resolve(process.env.LOCUS_DB_PATH);
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  return path.join(appData, 'locus', 'locus.db');
}

(async () => {
  const dbPath = resolveDbPath();
  console.log('Using DB:', dbPath);
  if (!fs.existsSync(dbPath)) {
    console.error('DB not found');
    process.exit(2);
  }

  const filebuffer = fs.readFileSync(dbPath);
  const SQL = await initSqlJs({ locateFile: file => require('path').join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm') });
  const u8 = new Uint8Array(filebuffer);
  const db = new SQL.Database(u8);

  try {
    const total = db.exec("SELECT COUNT(*) as c FROM explore_places");
    const withThumb = db.exec("SELECT COUNT(*) as c FROM explore_places WHERE thumbnail_url IS NOT NULL AND thumbnail_url != ''");
    const withRating = db.exec("SELECT COUNT(*) as c FROM explore_places WHERE rating IS NOT NULL");
    const sample = db.exec("SELECT id, title, location_name, thumbnail_url, full_image_url, rating FROM explore_places ORDER BY id LIMIT 8");

    const getCount = (res) => (res && res[0] && res[0].values && res[0].values[0] && res[0].values[0][0]) || 0;

    console.log('Total explore_places:', getCount(total));
    console.log('With thumbnail_url:', getCount(withThumb));
    console.log('With rating:', getCount(withRating));

    console.log('\nSample rows (first 8):');
    if (sample && sample[0] && sample[0].values) {
      const cols = sample[0].columns;
      sample[0].values.forEach(row => {
        const obj = {};
        cols.forEach((c,i) => obj[c]=row[i]);
        console.log('-', obj.id, obj.title, '|', obj.location_name, '| rating=', obj.rating, '| thumb=', !!obj.thumbnail_url);
      });
    } else {
      console.log('  (no sample rows)');
    }
  } catch (e) {
    console.error('Query error', e && e.message);
    process.exit(3);
  }
})();
