const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');
const searchStr = "const gistdaGeoJsonLayers: ProvinceDataLayer[] = ['floodRecurrent'];";
const start = content.indexOf(searchStr);
if (start === -1) {
  console.log('NOT FOUND');
} else {
  console.log('FOUND at', start);
  console.log(content.substring(start, start + 600));
}
