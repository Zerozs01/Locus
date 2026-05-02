const fs = require('fs');
const path = require('path');

const mdPath = path.resolve(__dirname, '../documents/deepreserach/Ecology_data/isan_upper_round3_ecology.json');
const raw = fs.readFileSync(mdPath, 'utf-8');
const allData = JSON.parse(raw);

function convertTags(entity) {
  const tags = [];
  const t = entity.tags || {};
  const a = entity.attributes || {};
  if (t.riskLevel === 'high') tags.push('danger');
  if (t.riskLevel === 'low' && t.interaction === 'safe') tags.push('common');
  if (t.frequency === 'rare') tags.push('rare');
  if (t.frequency === 'common' || t.frequency === 'everywhere') tags.push('common');
  if (t.interaction === 'dangerous' && !tags.includes('danger')) tags.push('danger');
  if (t.interaction === 'caution' && !tags.includes('danger')) tags.push('danger');
  if (a.edible) tags.push('edible');
  if (a.medicinal) tags.push('medicinal');
  if (a.poisonous) tags.push('danger');
  if (a.protected) tags.push('protected');
  const seasons = entity.context?.season || [];
  if (!seasons.some(s => s === 'ทุกฤดู') && seasons.length > 0) tags.push('seasonal');
  if (entity.category === 'hazard') {
    if (!tags.includes('danger')) tags.push('danger');
    tags.push('extreme');
  }
  return [...new Set(tags)];
}

function mapCategory(cat) {
  return cat === 'hazard' ? 'climate' : cat;
}

const converted = {};
for (const [provName, provData] of Object.entries(allData)) {
  const entities = provData.ecoEntities || [];
  converted[provName] = {
    ecoIds: entities.map(e => e.id),
    newEcoEntities: entities.map(e => ({
      id: e.id,
      name: e.name,
      category: mapCategory(e.category),
      tags: convertTags(e),
      desc: (e.description || '').replace(/"/g, '\\"')
    }))
  };
}

const seedFiles = [
  'portalSeed_isanUpper1.ts',
  'portalSeed_isanUpper2.ts'
];
const dbDir = path.resolve(__dirname, '../src/main/database');

for (const file of seedFiles) {
  const filePath = path.join(dbDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [provName, ecoData] of Object.entries(converted)) {
    const searchKeys = [`"${provName}"`, `"${provName.toLowerCase().replace(/ /g, '')}"`];
    let provStart = -1;
    
    for (const key of searchKeys) {
      provStart = content.indexOf(`${key}: {`);
      if (provStart !== -1) break;
      provStart = content.indexOf(`${key} : {`);
      if (provStart !== -1) break;
    }

    if (provStart === -1) continue;

    // Use \n    " to match the start of the next province, or \n}; for the end of file
    let nextProvStart = content.indexOf(`\n    "`, provStart + 10);
    if (nextProvStart === -1) {
      nextProvStart = content.indexOf(`\n};`, provStart);
    }
    if (nextProvStart === -1) nextProvStart = content.length;

    let subContent = content.slice(provStart, nextProvStart);
    
    const idsArray = ecoData.ecoIds.map(id => `\n            "${id}"`).join(',');
    const ecoIdsCode = `"ecoIds": [${idsArray}\n        ]`;

    let entitiesCode = `"newEcoEntities": []`;
    if (ecoData.newEcoEntities.length > 0) {
      const itemsStr = ecoData.newEcoEntities.map(e => 
        `\n            { id: "${e.id}", name: "${e.name}", category: "${e.category}", tags: ${JSON.stringify(e.tags)}, desc: "${e.desc}" }`
      ).join(',');
      entitiesCode = `"newEcoEntities": [${itemsStr}\n        ]`;
    }

    let newSubContent = subContent.replace(/"ecoIds"\s*:\s*\[[\s\S]*?\],/m, ecoIdsCode + ',');
    newSubContent = newSubContent.replace(/"newEcoEntities"\s*:\s*\[[\s\S]*?\],?/m, entitiesCode + ',');

    if (subContent !== newSubContent) {
      content = content.slice(0, provStart) + newSubContent + content.slice(nextProvStart);
      changed = true;
      console.log(`  ✅ Updated ${provName} in ${file}`);
    } else {
      console.log(`  ⚠ Could not replace blocks for ${provName} in ${file}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  💾 Saved ${file}`);
  }
}
