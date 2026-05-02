const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../documents/deepreserach/KnowledgeTips/knowledgeTips_Central (15).md');
let mdContent = fs.readFileSync(mdPath, 'utf8');

const jsonMatch = mdContent.match(/```json\n([\s\S]*?)\n```/);
let jsonStr = jsonMatch[1].replace(/【[^】]*?】/g, '');
let tipsData = JSON.parse(jsonStr);

const normalize = (str) => str.toLowerCase().replace(/[\s-]/g, '');

const seedDir = path.join(__dirname, '../src/main/database');
const files = ['portalSeed_central1.ts', 'portalSeed_central2.ts', 'portalSeed_central3.ts'];

let populatedProvinces = new Set();
let allDbProvinces = [];

files.forEach(f => {
  const fullPath = path.join(seedDir, f);
  if (!fs.existsSync(fullPath)) return;
  
  let tsContent = fs.readFileSync(fullPath, 'utf8');
  let updatedContent = tsContent;

  const getKeysRegex = /^  "([^"]+)":\s*\{/gm;
  let m;
  let fileProvinces = [];
  while ((m = getKeysRegex.exec(tsContent)) !== null) {
    if (m[1] !== 'metadata') {
      allDbProvinces.push(m[1]);
      fileProvinces.push(m[1]);
    }
  }

  fileProvinces.forEach(dbProv => {
    let dataToInject = null;
    for (const [mdProv, mdData] of Object.entries(tipsData)) {
      if (normalize(mdProv) === normalize(dbProv) || normalize(dbProv).includes(normalize(mdProv))) {
        dataToInject = mdData;
        populatedProvinces.add(dbProv);
        break;
      }
    }

    if (dataToInject) {
      const provBlockStart = updatedContent.indexOf(`"${dbProv}": {`);
      if (provBlockStart !== -1) {
        // Just find "metadata" in the current file after provBlockStart, and up to the next province
        let metaIdx = updatedContent.indexOf('"metadata":', provBlockStart);
        if (metaIdx !== -1) {
          // Check if it already has knowledgeTips before metaIdx
          let textBeforeMeta = updatedContent.substring(provBlockStart, metaIdx);
          if (!textBeforeMeta.includes('"knowledgeTips"')) {
            const newTips = JSON.stringify(dataToInject.knowledgeTips || [], null, 2).split('\n').map(l=>'    '+l).join('\n').trim();
            const newSupply = JSON.stringify(dataToInject.supplyPoints || [], null, 2).split('\n').map(l=>'    '+l).join('\n').trim();
            const newHints = JSON.stringify(dataToInject.plannerHints || {}, null, 2).split('\n').map(l=>'    '+l).join('\n').trim();
            
            const insertStr = `  "knowledgeTips": ${newTips},\n  "supplyPoints": ${newSupply},\n  "plannerHints": ${newHints},\n  `;
            
            updatedContent = updatedContent.substring(0, metaIdx) + insertStr + updatedContent.substring(metaIdx);
          }
        }
      }
    }
  });

  if (updatedContent !== tsContent) {
    fs.writeFileSync(fullPath, updatedContent, 'utf8');
    console.log(`Updated ${f}`);
  }
});

console.log("\n--- AUDIT CENTRAL ---");
let missingFromMd = allDbProvinces.filter(p => !populatedProvinces.has(p));
if (missingFromMd.length > 0) {
  console.log("❌ Missing data for these provinces in the Markdown:");
  missingFromMd.forEach(p => console.log(`  - ${p}`));
} else {
  console.log("✅ All Central provinces successfully matched and updated!");
}
