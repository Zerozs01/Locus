const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');

const oldCode = `if (map && provinceId) {
          // Use pv_idn for province-specific filtering to avoid 502 errors from large bbox
          fetchUrl = fetchUrl.split('?')[0] + \`?limit=500&pv_idn=\${provinceId}\`;
        } else if (map) {
          const bounds = map.getBounds();
          const bbox = \`\${bounds.getWest()},\${bounds.getSouth()},\${bounds.getEast()},\${bounds.getNorth()}\`;
          fetchUrl += \`&bbox=\${bbox}\`;
        }`;

const newCode = `if (map) {
          const bounds = map.getBounds();
          const bbox = \`\${bounds.getWest()},\${bounds.getSouth()},\${bounds.getEast()},\${bounds.getNorth()}\`;
          fetchUrl += \`&bbox=\${bbox}\`;
        }`;

if (content.includes(oldCode)) {
  const newContent = content.replace(oldCode, newCode);
  fs.writeFileSync('src/renderer/src/components/ProvinceMap.tsx', newContent);
  console.log('SUCCESS: Reverted to bbox-only approach');
} else {
  console.log('ERROR: oldCode not found');
}
