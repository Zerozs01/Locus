const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/main/database/portalSeed_north3.ts');
let content = fs.readFileSync(file, 'utf-8');

const provinces = ['kamphaengphet', 'phitsanulok', 'phichit', 'phetchabun', 'nakhonsawan', 'uthaithani'];
let fixed = 0;

for (const prov of provinces) {
  const provStart = content.indexOf(`"${prov}": {`);
  if (provStart === -1) continue;

  const metadataStart = content.indexOf(`"metadata": {`, provStart);
  if (metadataStart === -1) continue;

  const section = content.slice(provStart, metadataStart);
  
  // Regex to remove the FIRST occurrence of "ecoIds" and "newEcoEntities" in this section
  let cleanSection = section.replace(/\s*"ecoIds":\s*\[[\s\S]*?\],/m, '');
  cleanSection = cleanSection.replace(/\s*"newEcoEntities":\s*\[\s*\],?/m, '');

  content = content.slice(0, provStart) + cleanSection + content.slice(metadataStart);
  fixed++;
}

fs.writeFileSync(file, content, 'utf-8');
console.log(`✅ Fixed duplicate keys for ${fixed} provinces in portalSeed_north3.ts`);
