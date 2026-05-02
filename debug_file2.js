const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');
const searchStr = "const gistdaGeoJsonLayers: ProvinceDataLayer[] = ['floodRecurrent'];";
const start = content.indexOf(searchStr);
if (start === -1) {
  console.log('NOT FOUND');
} else {
  // Show hex of first 50 chars after the match
  const slice = content.substring(start, start + 200);
  console.log('String representation:');
  console.log(JSON.stringify(slice));
}
