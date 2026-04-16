const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../documents/deepreserach/KnowledgeTips/knowledgeTips_North(17).md');
let mdContent = fs.readFileSync(mdPath, 'utf8');

const scriptSource = fs.readFileSync(path.join(__dirname, 'mergeNorthMissing10.js'), 'utf8');
const objStart = scriptSource.indexOf('const tipsData = {') + 'const tipsData = {'.length - 1;
const objEnd = scriptSource.indexOf('};\n\nconst seedDir =');
const objStr = scriptSource.substring(objStart, objEnd + 1);

const targetStr = `  "Phichit": {
    "knowledgeTips": [],
    "supplyPoints": [],
    "plannerHints": {"commonOrigins": [], "commonDestinations": [], "transitHubs": [], "routeNotes": []}
  },
  "Phetchabun": {
    "knowledgeTips": [],
    "supplyPoints": [],
    "plannerHints": {"commonOrigins": [], "commonDestinations": [], "transitHubs": [], "routeNotes": []}
  },
  "Nakhon Sawan": {
    "knowledgeTips": [],
    "supplyPoints": [],
    "plannerHints": {"commonOrigins": [], "commonDestinations": [], "transitHubs": [], "routeNotes": []}
  },
  "Uthai Thani": {
    "knowledgeTips": [],
    "supplyPoints": [],
    "plannerHints": {"commonOrigins": [], "commonDestinations": [], "transitHubs": [], "routeNotes": []}
  }
}`;

if (mdContent.includes(targetStr)) {
  const innerContent = objStr.trim().substring(1, objStr.trim().length - 1).trim();
  mdContent = mdContent.replace(targetStr, innerContent + '\n}');
  fs.writeFileSync(mdPath, mdContent, 'utf8');
  console.log('Fixed markdown file successfully!');
} else {
  console.log('Could not find target string in Markdown.');
}
