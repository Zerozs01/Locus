const { app } = require('electron');
const DB = require('better-sqlite3');
const path = require('path');

app.whenReady().then(() => {
  try {
    const dbPath = path.join(app.getPath('userData'), 'locus.db');
    const db = new DB(dbPath);
    const row = db.prepare("SELECT name FROM provinces LIMIT 5").all();
    console.log(row);
  } catch(e) {
    console.error(e);
  }
  app.quit();
});
