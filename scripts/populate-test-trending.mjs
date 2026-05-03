#!/usr/bin/env node
import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const dbPath = join(homedir(), 'AppData', 'Roaming', 'locus', 'locus.db');
console.log('🔧 Opening database at:', dbPath);

const db = new Database(dbPath);
const sql = readFileSync(join(process.cwd(), 'populate_test_trending.sql'), 'utf-8');

console.log('📝 Executing SQL script...\n');
try {
  const statements = sql.split(';').filter(s => s.trim());
  for (const stmt of statements) {
    if (stmt.trim()) {
      console.log(`  Executing: ${stmt.substring(0, 60)}...`);
      db.exec(stmt);
    }
  }
  
  // Verify
  const result = db.prepare('SELECT COUNT(*) as count, AVG(review_count) as avg_reviews FROM explore_places WHERE review_count IS NOT NULL').get();
  console.log('\n✅ Success!');
  console.log(`  Places with review data: ${result.count}`);
  console.log(`  Average reviews: ${Math.round(result.avg_reviews)}`);
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
} finally {
  db.close();
}
