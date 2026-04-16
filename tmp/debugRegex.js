const fs = require('fs');
const content = fs.readFileSync('src/main/database/portalSeed_central1.ts', 'utf-8');

let provName = "Bangkok";
let provChunkRegex = new RegExp(`("${provName}"\\s*:\\s*\\{[\\s\\S]*?\\n  \\}(?:,|\\n\\}))`, 'm');
let match = content.match(provChunkRegex);

if (match) {
  let subContent = match[0];
  console.log("Matched length:", subContent.length);
  console.log("Has ecoIds?", subContent.includes('"ecoIds"'));

  let newSubC = subContent.replace(/"ecoIds"\s*:\s*\[[\s\S]*?\],/m, 'ECO REPLACED');
  console.log("Did ecoIds replace work?", newSubC !== subContent);

  newSubC = newSubC.replace(/"newEcoEntities"\s*:\s*\[[\s\S]*?\],?/m, 'NEW ECO REPLACED');
  console.log("Did newEcoEntities replace work?", newSubC !== subContent);
} else {
  console.log("Regex failed to match province block.");
}
