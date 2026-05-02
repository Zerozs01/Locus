const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../documents/deepreserach/KnowledgeTips/knowledgeTips_South (14).md');
const mdContent = fs.readFileSync(mdPath, 'utf8').trim();

let tipsData = {};
const jsonBlocks = [...mdContent.matchAll(/```json\n([\s\S]+?)\n```/g)];

if (jsonBlocks.length > 0) {
  jsonBlocks.forEach(match => {
    try {
       const data = JSON.parse(match[1]);
       Object.assign(tipsData, data);
    } catch(e) {
       console.error("Error parsing JSON block:", e.message);
    }
  });
} else {
  try {
     const data = JSON.parse(mdContent);
     Object.assign(tipsData, data);
  } catch(e) {
     console.error("Error parsing raw JSON:", e.message);
  }
}

const seedDir = path.join(__dirname, '../src/main/database');
const files = fs.readdirSync(seedDir).filter(f => f.startsWith('portalSeed_') && f.endsWith('.ts'));

let allSeededIds = [];

files.forEach(f => {
  const filePath = path.join(seedDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Record<string')) return; 
  
  const objStart = content.indexOf('{', content.indexOf('Record<string'));
  if (objStart === -1) return;
  const objEnd = content.lastIndexOf(';');
  let objStr = content.substring(objStart, objEnd);
  if (objStr.trim() === '') return;

  try {
    const data = (new Function('return ' + objStr))();
    let changed = false;
    
    // Normalize string for comparison
    const norm = (str) => str.toLowerCase().replace(/[\s-]/g, '');

    for (const pId of Object.keys(data)) {
        allSeededIds.push(pId);
    }
    
    for (const [pName, pTips] of Object.entries(tipsData)) {
      let actualId = Object.keys(data).find(k => norm(k) === norm(pName));
      if (actualId) {
        
        const hasTipsToUpdate = pTips.knowledgeTips && pTips.knowledgeTips.length > 0;
        const hasSupplyToUpdate = pTips.supplyPoints && pTips.supplyPoints.length > 0;
        const hasHintsToUpdate = pTips.plannerHints && Object.keys(pTips.plannerHints).length > 0 && pTips.plannerHints.commonOrigins && pTips.plannerHints.commonOrigins.length > 0;
        
        if (hasTipsToUpdate) { data[actualId].knowledgeTips = pTips.knowledgeTips; changed = true; }
        if (hasSupplyToUpdate) { data[actualId].supplyPoints = pTips.supplyPoints; changed = true; }
        if (hasHintsToUpdate) { data[actualId].plannerHints = pTips.plannerHints; changed = true; }
      }
    }
    
    if (changed) {
      const newHead = content.substring(0, objStart);
      const newContent = newHead + JSON.stringify(data, null, 4) + ';\n';
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Successfully updated properties in ' + f);
    }
  } catch (e) {
    console.error('Error rewriting ' + f + ': ' + e.message);
  }
});

console.log('--- Completeness check ---');

const initialDataPath = path.join(seedDir, 'initialData.ts');
const initialDataContent = fs.readFileSync(initialDataPath, 'utf8');
const expectedNamesMatch = [...initialDataContent.matchAll(/name:\s*"([A-Za-z\s]+)"/g)].map(m => m[1]);

const norm = (str) => str.toLowerCase().replace(/[\s-]/g, '');
const normalizedExpectedNames = expectedNamesMatch.map(norm).filter(n => !['ภาคเหนือ','ภาคอีสาน','ภาคกลาง','ภาคตะวันตก','ภาคตะวันออก','ภาคใต้'].includes(n) && n !== 'bangkokmetropolis' && n !== 'phranakhonsiayutthaya'); // handle known mismatches
normalizedExpectedNames.push('bangkok', 'ayutthaya');

const normalizedSeededIds = allSeededIds.map(norm);
const missingIds = normalizedExpectedNames.filter(n => !normalizedSeededIds.includes(n));

console.log(`Total expected provinces: ${normalizedExpectedNames.length}`);
console.log(`Total seeded provinces found in portalSeed_*.ts files: ${normalizedSeededIds.length}`);

if (missingIds.length > 0) {
  console.log(`❌ Missing provinces entirely from the seed: \n${missingIds.join(', ')}`);
} else {
  console.log(`✅ All ${normalizedExpectedNames.length} provinces are seeded!`);
}

let provFeaturesMissing = [];
files.forEach(f => {
    const filePath = path.join(seedDir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const objStart = content.indexOf('{', content.indexOf('Record<string'));
    if (objStart === -1) return;
    const objEnd = content.lastIndexOf(';');
    let objStr = content.substring(objStart, objEnd);
    if (objStr.trim() === '') return;
  
    try {
      const data = (new Function('return ' + objStr))();
      for (const pId of Object.keys(data)) {
        const pData = data[pId];
        let missingFields = [];
        if (!pData.transport || pData.transport.length === 0) missingFields.push('transport');
        if (!pData.localFoods || pData.localFoods.length === 0) missingFields.push('localFoods');
        if (!pData.knowledgeTips || pData.knowledgeTips.length === 0) missingFields.push('knowledgeTips');
        if (!pData.supplyPoints || pData.supplyPoints.length === 0) missingFields.push('supplyPoints');
        if (!pData.plannerHints || (Object.keys(pData.plannerHints || {}).length === 0)) missingFields.push('plannerHints');
        
        if (missingFields.length > 0) {
          provFeaturesMissing.push(`${pId} -> missing: ${missingFields.join(', ')}`);
        }
      }
    } catch(e) {}
});

if(provFeaturesMissing.length > 0) {
    console.log(`⚠️ Provinces with incomplete fields:\n` + provFeaturesMissing.join('\n'));
} else {
    console.log(`✅ All provinces have 100% complete core data fields.`);
}
