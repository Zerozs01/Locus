const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../documents/deepreserach/part2.3ภาคเหนือ.md');
if (!fs.existsSync(srcPath)) {
  console.error('File not found:', srcPath);
  process.exit(1);
}
const markdownContent = fs.readFileSync(srcPath, 'utf-8');

const jsonBlocks = [];
let currentIndex = 0;
while (true) {
  const startIndex = markdownContent.indexOf('```json', currentIndex);
  if (startIndex === -1) break;
  
  const endIndex = markdownContent.indexOf('```', startIndex + 7);
  if (endIndex === -1) break;
  
  let jsonString = markdownContent.substring(startIndex + 7, endIndex).trim();
  jsonBlocks.push(jsonString);
  currentIndex = endIndex + 3;
}

const parsedProvinces = [];
jsonBlocks.forEach(jsonString => {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      parsedProvinces.push(...data);
    } else {
      // It's an object with province names as keys
      for (const [key, val] of Object.entries(data)) {
        val.province = key;
        parsedProvinces.push(val);
      }
    }
  } catch (error) {
    console.error('Syntax error parsing block:', error.message);
  }
});

console.log('Found', parsedProvinces.length, 'provinces:', parsedProvinces.map(p => p.province).join(', '));

// Format for ts output
const outputLines = [
  "import { ProvincePortalData } from '../../types';",
  "",
  "export const northPart3: Record<string, ProvincePortalData> = {"
];

const nameToIdId = {
  'Kamphaeng Phet': 'kamphaengphet',
  'Phitsanulok': 'phitsanulok',
  'Phichit': 'phichit',
  'Phetchabun': 'phetchabun',
  'Nakhon Sawan': 'nakhonsawan',
  'Uthai Thani': 'uthaithani'
};

parsedProvinces.forEach(p => {
  const idValue = nameToIdId[p.province] || p.province.toLowerCase().replace(/[^a-z]/g, '');
  outputLines.push(`  '${idValue}': ${JSON.stringify(p, null, 4)},`);
});
outputLines.push("};");

fs.writeFileSync(path.join(__dirname, '../src/main/database/portalSeed_north3.ts'), outputLines.join('\n'), 'utf-8');
console.log('Wrote portalSeed_north3.ts');
