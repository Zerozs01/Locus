const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');

// Find the exact sequence
const idx = content.indexOf('({ \r\n  provinceName,');
console.log('Exact match at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(content.substring(idx, idx + 100)));
}
