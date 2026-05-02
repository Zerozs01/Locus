const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');

// Find the location after geoJsonLayer is created and add cache save
const oldCode = `}).addTo(map);
                  externalDataLayerRefs.current.push(geoJsonLayer);
                } else {`;

const newCode = `}).addTo(map);
                  externalDataLayerRefs.current.push(geoJsonLayer);
                  // Cache the flood data for faster subsequent loads
                  window.api?.floodCache?.save(provinceId, data);
                } else {`;

if (content.includes(oldCode)) {
  const newContent = content.replace(oldCode, newCode);
  fs.writeFileSync('src/renderer/src/components/ProvinceMap.tsx', newContent);
  console.log('SUCCESS: Added cache save after successful flood data fetch');
} else {
  console.log('ERROR: oldCode not found');
}
