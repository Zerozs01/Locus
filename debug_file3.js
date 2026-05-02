const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');
const searchStr = "const gistdaGeoJsonLayers: ProvinceDataLayer[] = ['floodRecurrent'];";
const start = content.indexOf(searchStr);
const slice = content.substring(start, start + 600);
// Find the if (map) { line
const mapIfIndex = slice.indexOf('if (map) {');
console.log('Lines after gistdaGeoJsonLayers:');
console.log(JSON.stringify(slice.substring(0, mapIfIndex + 200)));
