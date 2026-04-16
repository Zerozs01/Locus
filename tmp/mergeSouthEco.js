const fs = require('fs');
const path = require('path');

const mdPath = path.resolve(__dirname, '../documents/deepreserach/Ecology_data/south_ecology.json');
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
  'portalSeed_south1.ts',
  'portalSeed_south2.ts',
  'portalSeed_south3.ts'
];
const dbDir = path.resolve(__dirname, '../src/main/database');

for (const file of seedFiles) {
  const filePath = path.join(dbDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [provName, ecoData] of Object.entries(converted)) {
    let nameAlias = provName;

    const searchKeys = [provName, provName.toLowerCase().replace(/ /g, ''), nameAlias, nameAlias.toLowerCase().replace(/ /g, '')];
    
    let subContent = null;

    for (const key of searchKeys) {
      const idx = content.indexOf(`"${key}": {`);
      if (idx !== -1) {
        let endIdx = content.indexOf(`\n    },\n    "`, idx);
        if (endIdx === -1) endIdx = content.indexOf(`\n  },\n  "`, idx);
        if (endIdx === -1) endIdx = content.indexOf(`\n};`, idx);
        if (endIdx === -1) endIdx = content.length;
        
        subContent = content.substring(idx, endIdx);
        break;
      }
    }

    if (!subContent) {
      continue;
    }
    
    let indent = '    ';
    if (subContent.includes('\n        "ecoIds"')) indent = '        ';
    else if (subContent.includes('\n    "ecoIds"')) indent = '    ';
    else if (subContent.includes('\n  "ecoIds"')) indent = '  ';

    const idsArray = ecoData.ecoIds.map(id => `\n${indent}${indent}"${id}"`).join(',');
    const ecoIdsCode = `"ecoIds": [${idsArray}\n${indent}],\n${indent}"newEcoEntities": [`;

    let entitiesCode = ``;
    if (ecoData.newEcoEntities.length > 0) {
      const itemsStr = ecoData.newEcoEntities.map(e => 
        `\n${indent}${indent}{ id: "${e.id}", name: "${e.name}", category: "${e.category}", tags: ${JSON.stringify(e.tags)}, desc: "${e.desc}" }`
      ).join(',');
      entitiesCode = `${itemsStr}\n${indent}],\n${indent}`;
    } else {
      entitiesCode = `],\n${indent}`;
    }

    let newSubContent = subContent.replace(/"ecoIds"\s*:\s*\[[\s\S]*?(?="metadata"|"knowledgeTips"|"supplyPoints"|"plannerHints")/m, ecoIdsCode + entitiesCode);

    if (subContent !== newSubContent) {
      content = content.replace(subContent, newSubContent);
      changed = true;
      console.log(`  ✅ Injected ${provName} into ${file}`);
    } else {
      console.log(`  ⚠ Could not replace blocks for ${provName} in ${file}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  💾 Saved ${file}`);
  }
}
