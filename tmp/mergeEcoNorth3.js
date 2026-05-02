/**
 * mergeEcoNorth3.js
 * Inject ecoIds + newEcoEntities into portalSeed_north3.ts
 * for the 6 provinces that use normalized keys (kamphaengphet, phitsanulok, etc.)
 */
const fs = require('fs');
const path = require('path');

// === 1. Read & merge the multi-JSON blocks from the source MD ===
const mdPath = path.resolve(__dirname, '../documents/deepreserach/Ecology_data/ecology_data_north(17).md');
const raw = fs.readFileSync(mdPath, 'utf-8');
const fixed = '[' + raw.replace(/\r\n/g, '\n').replace(/\}\s*\{/g, '},\n{') + ']';
const blocks = JSON.parse(fixed);
const allData = {};
for (const block of blocks) Object.assign(allData, block);

// Convert tags helper
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

// Name → normalized ID mapping for north3
const nameToNormalizedId = {
  'Kamphaeng Phet': 'kamphaengphet',
  'Phitsanulok': 'phitsanulok',
  'Phichit': 'phichit',
  'Phetchabun': 'phetchabun',
  'Nakhon Sawan': 'nakhonsawan',
  'Uthai Thani': 'uthaithani',
};

const filePath = path.resolve(__dirname, '../src/main/database/portalSeed_north3.ts');
let content = fs.readFileSync(filePath, 'utf-8');
let updatedCount = 0;

for (const [provName, normalizedId] of Object.entries(nameToNormalizedId)) {
  const provData = allData[provName];
  if (!provData) {
    console.warn(`⚠ Not found in ecology data: ${provName}`);
    continue;
  }

  const entities = provData.ecoEntities || [];
  const ecoIds = entities.map(e => e.id);
  const newEcoEntities = entities.map(e => ({
    id: e.id,
    name: e.name,
    category: mapCategory(e.category),
    tags: convertTags(e),
    desc: (e.description || '').replace(/"/g, '\\"')
  }));

  // Build TypeScript code for ecoIds
  const ecoIdsTs = ecoIds.map(id => `            "${id}"`).join(',\n');

  // Build TypeScript code for newEcoEntities
  const entitiesTs = newEcoEntities.map(e =>
    `            { id: "${e.id}", name: "${e.name}", category: "${e.category}", tags: ${JSON.stringify(e.tags)}, desc: "${e.desc}" }`
  ).join(',\n');

  // Find the closing of the province's plannerHints (last field before closing })
  // Pattern: find "normalizedId": { ... plannerHints: { ... } }
  // We need to add ecoIds and newEcoEntities before the province closing brace

  // Strategy: find the last `}` that closes plannerHints for this province
  // and insert the new fields after it
  
  const keyPattern = `"${normalizedId}"`;
  const keyIndex = content.indexOf(keyPattern);
  if (keyIndex === -1) {
    console.warn(`⚠ Key "${normalizedId}" not found in portalSeed_north3.ts`);
    continue;
  }

  // Find the next province or end of object
  // Look for the closing of this province's object
  // Strategy: Find "plannerHints" that comes after this province
  const afterKey = content.indexOf('"plannerHints"', keyIndex);
  if (afterKey === -1) {
    console.warn(`⚠ plannerHints not found for "${normalizedId}"`);
    continue;
  }

  // Find the closing brace of plannerHints object
  // Start from plannerHints, count braces
  let braceCount = 0;
  let closingIndex = -1;
  for (let i = content.indexOf('{', afterKey); i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    console.warn(`⚠ Could not find plannerHints closing brace for "${normalizedId}"`);
    continue;
  }

  // Insert after the plannerHints closing brace
  const insertPoint = closingIndex + 1;
  const insertCode = `,
        "ecoIds": [
${ecoIdsTs}
        ],
        "newEcoEntities": [
${entitiesTs}
        ]`;

  content = content.slice(0, insertPoint) + insertCode + content.slice(insertPoint);
  updatedCount++;
  console.log(`  ✅ Injected eco data for ${provName} (${normalizedId})`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n💾 Saved portalSeed_north3.ts`);
console.log(`📊 Updated ${updatedCount} provinces`);
