const fs = require('fs');

try {
  let raw = fs.readFileSync('documents/deepreserach/part1_ภาคกลาง.md', 'utf8');
  
  // Clean up markdown block quotes for json
  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    raw = raw.substring(firstBrace, lastBrace + 1);
  }
  
  const data = JSON.parse(raw);
  const keys = Object.keys(data);
  console.log(`Found ${keys.length} provinces in part 1: ${keys.join(', ')}`);

  const chunks = [];
  for (let i = 0; i < keys.length; i += 5) {
    chunks.push(keys.slice(i, i + 5));
  }

  let exportsText = '';

  chunks.forEach((chunk, index) => {
    const fileName = `src/main/database/portalSeed_central${index + 1}.ts`;
    let fileContent = `// Portal seed data: ภาคกลาง Part ${index + 1} (${chunk.length} จังหวัด)
// Source: documents/deepreserach/part1_ภาคกลาง.md
import type { ProvincePortalSeedData } from './db';

export const centralPart${index + 1}: Record<string, ProvincePortalSeedData> = {
`;

    chunk.forEach((key, kIndex) => {
      fileContent += `  "${key}": ${JSON.stringify(data[key], null, 2)}`;
      if (kIndex < chunk.length - 1) {
        fileContent += ',\n';
      } else {
        fileContent += '\n';
      }
    });

    fileContent += `};
`;

    fs.writeFileSync(fileName, fileContent, 'utf8');
    console.log(`Wrote ${fileName}`);
    
    // also add to exportsText
    exportsText += `import { centralPart${index + 1} } from './database/portalSeed_central${index + 1}';\n`;
  });

  console.log("Imports you need to add:");
  console.log(exportsText);
  console.log("Combine like this: { ..." + chunks.map((_, i) => `centralPart${i+1}`).join(", ...") + " }");
} catch (e) {
  console.error("Error occurred:", e.message);
  console.error(e.stack);
}
