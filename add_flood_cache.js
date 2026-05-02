// Migration script to add flood_cache table
const fs = require('fs');
const content = fs.readFileSync('src/main/database/db.ts', 'utf8');

// The flood cache table creation SQL (add after weather_aqi table)
const floodTableSQL = `db.exec(\`
  CREATE TABLE IF NOT EXISTS flood_cache (
    province_id TEXT NOT NULL,
    data TEXT NOT NULL,
    fetched_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (province_id)
  );
\`);`;

// Check if table already exists
if (content.includes('flood_cache')) {
  console.log('flood_cache table already exists');
} else {
  // Find where weather_aqi table ends (after the index creation)
  const weatherAqiIndex = "db.exec(\`CREATE INDEX IF NOT EXISTS idx_weather_province_date ON weather_aqi(province_id, date);\`\`);";  
  const idx = content.indexOf(weatherAqiIndex);
  if (idx === -1) {
    console.log('Could not find weather_aqi index location');
  } else {
    console.log('Found at:', idx);
    console.log(content.substring(idx, idx + 200));
  }
}
