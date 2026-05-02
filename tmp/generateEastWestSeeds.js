const fs = require('fs');

try {
  let raw = fs.readFileSync('documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md', 'utf8');
  
  // Clean up markdown block quotes for json
  const firstBrace = raw.indexOf('{');
  const lastBrace = raw.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    raw = raw.substring(firstBrace, lastBrace + 1);
  }
  
  let data;
  try {
     data = JSON.parse(raw);
  } catch(e) {
     const posMatch = e.message.match(/position (\d+)/);
     if (posMatch) {
         const pos = parseInt(posMatch[1], 10);
         console.error("Syntax error around:");
         console.error(raw.substring(Math.max(0, pos - 50), Math.min(raw.length, pos + 50)));
     }
     throw e;
  }

  const keys = Object.keys(data).filter(k => k !== 'executiveSummary');
  console.log(`Found ${keys.length} provinces in part 5: ${keys.join(', ')}`);

  const chunks = [];
  for (let i = 0; i < keys.length; i += 5) {
    chunks.push(keys.slice(i, i + 5));
  }

  let exportsText = '';

  chunks.forEach((chunk, index) => {
    const fileName = `src/main/database/portalSeed_eastWest${index + 1}.ts`;
    let fileContent = `// Portal seed data: ภาคตะวันออก+ตะวันตก Part ${index + 1} (${chunk.length} จังหวัด)
// Source: documents/deepreserach/part5_ภาคตะวันออก+ตะวันตก.md
import type { ProvincePortalSeedData } from './db';

export const eastWest${index + 1}: Record<string, ProvincePortalSeedData> = {
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
    exportsText += `import { eastWest${index + 1} } from './database/portalSeed_eastWest${index + 1}';\n`;
  });

  console.log("Imports you need to add:");
  console.log(exportsText);
  console.log("Combine like this: { ..." + chunks.map((_, i) => `eastWest${i+1}`).join(", ...") + " }");
} catch (e) {
  console.error("Error occurred:", e.message);
}
