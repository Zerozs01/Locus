const fs = require('fs');
const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure Quick Stats Bar is responsive but doesn't wrap weirdly
content = content.replace(
  /className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-white\/5 to-transparent p-4 rounded-xl border border-white\/10 shadow-lg"/, 
  'className="flex items-center justify-between gap-2 overflow-x-auto bg-gradient-to-br from-white/5 to-transparent p-4 rounded-xl border border-white/10 shadow-lg" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}'
);

fs.writeFileSync(file, content);
