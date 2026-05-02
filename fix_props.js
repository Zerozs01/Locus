const fs = require('fs');
const content = fs.readFileSync('src/renderer/src/components/ProvinceMap.tsx', 'utf8');

// Add provinceId to the destructured props
const oldProps = "({ \r\n  provinceName, \r\n  lat,";
const newProps = "({ \r\n  provinceName,\r\n  provinceId,\r\n  lat,";

if (content.includes(oldProps)) {
  const newContent = content.replace(oldProps, newProps);
  fs.writeFileSync('src/renderer/src/components/ProvinceMap.tsx', newContent);
  console.log('SUCCESS: provinceId added to destructured props');
} else {
  console.log('ERROR: oldProps not found');
}
