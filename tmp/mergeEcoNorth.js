/**
 * mergeEcoNorth.js
 * Parse ecology_data_north(17).md → inject ecoIds + newEcoEntities into portalSeed_north*.ts
 */
const fs = require('fs');
const path = require('path');

// === 1. Read & merge the multi-JSON blocks from the source MD ===
const mdPath = path.resolve(__dirname, '../documents/deepreserach/Ecology_data/ecology_data_north(17).md');
const raw = fs.readFileSync(mdPath, 'utf-8');

// The file has multiple JSON blocks concatenated (}{), fix by wrapping as array
const fixed = '[' + raw.replace(/\r\n/g, '\n').replace(/\}\s*\{/g, '},\n{') + ']';
let blocks;
try {
  blocks = JSON.parse(fixed);
} catch (e) {
  console.error('❌ JSON parse error:', e.message);
  process.exit(1);
}

// Merge all blocks into one object
const allData = {};
for (const block of blocks) {
  Object.assign(allData, block);
}

console.log(`✅ Parsed ${Object.keys(allData).length} provinces from ecology data`);

// === 2. Convert new schema → old schema ===
// Old schema:
//   ecoIds: string[]  (on provinces table)
//   newEcoEntities: { id, name, category, tags: string[], desc }[]
//
// New schema has: tags: { riskLevel, frequency, interaction }, attributes, context, description
// We convert:
//   - ecoIds = array of entity ids
//   - newEcoEntities = mapped to old format with tags array derived from new tags+attributes

function convertTags(entity) {
  const tags = [];
  const t = entity.tags || {};
  const a = entity.attributes || {};

  // From riskLevel
  if (t.riskLevel === 'high') tags.push('danger');
  if (t.riskLevel === 'low' && t.interaction === 'safe') tags.push('common');

  // From frequency
  if (t.frequency === 'rare') tags.push('rare');
  if (t.frequency === 'common' || t.frequency === 'everywhere') tags.push('common');

  // From interaction
  if (t.interaction === 'dangerous') { if (!tags.includes('danger')) tags.push('danger'); }
  if (t.interaction === 'caution') { if (!tags.includes('danger')) tags.push('danger'); }

  // From attributes
  if (a.edible) tags.push('edible');
  if (a.medicinal) tags.push('medicinal');
  if (a.poisonous) tags.push('danger');
  if (a.protected) tags.push('protected');

  // From context.season
  const seasons = entity.context?.season || [];
  const allYear = seasons.some(s => s === 'ทุกฤดู');
  if (!allYear && seasons.length > 0) tags.push('seasonal');

  // From category hazard → extreme
  if (entity.category === 'hazard') {
    if (!tags.includes('danger')) tags.push('danger');
    tags.push('extreme');
  }

  // Deduplicate
  return [...new Set(tags)];
}

// Map category: hazard → climate (old schema doesn't have hazard)
function mapCategory(cat) {
  if (cat === 'hazard') return 'climate';
  return cat;
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
      desc: e.description || ''
    }))
  };
}

// === 3. Inject into portalSeed_north*.ts files ===
const seedFiles = [
  { file: 'portalSeed_north1.ts', varName: 'northPart1' },
  { file: 'portalSeed_north2.ts', varName: 'northPart2' },
  { file: 'portalSeed_north3.ts', varName: 'northPart3' },
];

const dbDir = path.resolve(__dirname, '../src/main/database');

// Name → ID mapping (same as in db.ts)
const nameToId = {
  'Chiang Mai': 'chiangmai', 'Chiang Rai': 'chiangrai',
  'Lampang': 'lampang', 'Lamphun': 'lamphun',
  'Mae Hong Son': 'maehongson', 'Nan': 'nan',
  'Phayao': 'phayao', 'Phrae': 'phrae',
  'Uttaradit': 'uttaradit', 'Sukhothai': 'sukhothai',
  'Tak': 'tak', 'Kamphaeng Phet': 'kamphaengphet',
  'Phitsanulok': 'phitsanulok', 'Phichit': 'phichit',
  'Phetchabun': 'phetchabun', 'Nakhon Sawan': 'nakhonsawan',
  'Uthai Thani': 'uthaithani',
};

let totalUpdated = 0;
const notFound = [];

for (const { file } of seedFiles) {
  const filePath = path.join(dbDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [provName, ecoData] of Object.entries(converted)) {
    // Check if this province exists in this file
    const provKey = `"${provName}"`;
    if (!content.includes(provKey)) continue;

    // Update ecoIds
    const ecoIdsJson = JSON.stringify(ecoData.ecoIds, null, 8);
    // Find existing ecoIds for this province and replace
    const ecoIdsRegex = new RegExp(
      `("${provName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"ecoIds":\\s*\\[)[^\\]]*\\]`,
      'm'
    );
    if (ecoIdsRegex.test(content)) {
      content = content.replace(ecoIdsRegex, (match, prefix) => {
        const idsArray = ecoData.ecoIds.map(id => `\n            "${id}"`).join(',');
        return `${prefix}${idsArray}\n        ]`;
      });
      changed = true;
    }

    // Update newEcoEntities
    const entitiesJson = JSON.stringify(ecoData.newEcoEntities, null, 8)
      .replace(/\n/g, '\n        ');

    const ecoEntRegex = new RegExp(
      `("${provName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"newEcoEntities":\\s*\\[)[^\\]]*\\]`,
      'm'
    );
    if (ecoEntRegex.test(content)) {
      content = content.replace(ecoEntRegex, (match, prefix) => {
        if (ecoData.newEcoEntities.length === 0) return `${prefix}]`;
        const itemsStr = ecoData.newEcoEntities.map(e =>
          `\n            { id: "${e.id}", name: "${e.name}", category: "${e.category}", tags: ${JSON.stringify(e.tags)}, desc: "${e.desc.replace(/"/g, '\\"')}" }`
        ).join(',');
        return `${prefix}${itemsStr}\n        ]`;
      });
      changed = true;
    }

    if (changed) {
      totalUpdated++;
      console.log(`  ✅ Updated ${provName} in ${file}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  💾 Saved ${file}`);
  }
}

// Check for provinces not found
for (const provName of Object.keys(converted)) {
  let found = false;
  for (const { file } of seedFiles) {
    const filePath = path.join(dbDir, file);
    if (!fs.existsSync(filePath)) continue;
    const c = fs.readFileSync(filePath, 'utf-8');
    if (c.includes(`"${provName}"`)) { found = true; break; }
  }
  if (!found) notFound.push(provName);
}

console.log(`\n📊 Summary:`);
console.log(`   Total provinces in ecology data: ${Object.keys(converted).length}`);
console.log(`   Updated in seed files: ${totalUpdated}`);
if (notFound.length > 0) {
  console.log(`   ⚠ Not found in seed files: ${notFound.join(', ')}`);
}
console.log(`\n✅ Done!`);
