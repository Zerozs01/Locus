const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');
const oldCode = `const gistdaGeoJsonLayers: ProvinceDataLayer[] = ['floodRecurrent'];\r\n      \r\n      if (gistdaGeoJsonLayers.includes(layerId)) {\r\n        let fetchUrl = mapLayerUrls[layerId as keyof typeof mapLayerUrls];\r\n        if (map) {\r\n          const bounds = map.getBounds();\r\n          const bbox = \`\${bounds.getWest()},\${bounds.getSouth()},\${bounds.getEast()},\${bounds.getNorth()}\`;\r\n          fetchUrl += \`&bbox=\${bbox}\`;\r\n        }`;
const newCode = `const gistdaGeoJsonLayers: ProvinceDataLayer[] = ['floodRecurrent'];\r\n      \r\n      if (gistdaGeoJsonLayers.includes(layerId)) {\r\n        let fetchUrl = mapLayerUrls[layerId as keyof typeof mapLayerUrls];\r\n        if (map && provinceId) {\r\n          // Use pv_idn for province-specific filtering to avoid 502 errors from large bbox\r\n          fetchUrl = fetchUrl.split('?')[0] + \`?limit=500&pv_idn=\${provinceId}\`;\r\n        } else if (map) {\r\n          const bounds = map.getBounds();\r\n          const bbox = \`\${bounds.getWest()},\${bounds.getSouth()},\${bounds.getEast()},\${bounds.getNorth()}\`;\r\n          fetchUrl += \`&bbox=\${bbox}\`;\r\n        }`;

if (content.includes(oldCode)) {
  const newContent = content.replace(oldCode, newCode);
  fs.writeFileSync('src/renderer/src/components/ProvinceMap.tsx', newContent);
  console.log('SUCCESS: Code replaced');
} else {
  console.log('ERROR: oldCode not found');
  // Try to find the actual code
  const idx = content.indexOf("if (map) {");
  console.log('if (map) found at:', idx);
  if (idx !== -1) {
    console.log(JSON.stringify(content.substring(idx - 100, idx + 300)));
  }
}
