const fs = require('fs');

const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// QuickBadge Component Update
content = content.replace(
  /<div className=\{\`flex items-center gap-2 px-3 py-2 rounded-lg border \$\{colors\[color\]\}\`\}>/,
  '<div className={`flex items-center gap-2 px-3 py-2 rounded-lg border whitespace-nowrap flex-shrink-0 ${colors[color]}`}>'
);

fs.writeFileSync(file, content);
