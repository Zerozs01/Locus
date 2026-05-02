const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');

// Find the current code
const searchStr = "if (map && provinceId) {";
const idx = content.indexOf(searchStr);
if (idx === -1) {
  console.log('NOT FOUND');
} else {
  console.log(JSON.stringify(content.substring(idx, idx + 400)));
}
