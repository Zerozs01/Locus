const fs = require('fs');

const files = ['central1','central2','central3','north1','north2','isanUpper1','isanUpper2'];

files.forEach(f => {
  const raw = fs.readFileSync(`src/main/database/portalSeed_${f}.ts`, 'utf8');
  const lines = raw.split('\n');
  lines.forEach(l => {
    const m = l.match(/^  "([A-Z][^"]+)":/);
    if (m) console.log(`${f}: ${m[1]}`);
  });
});
