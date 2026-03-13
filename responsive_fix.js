const fs = require('fs');

const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change default width
content = content.replace(/useState\(450\)/, 'useState(500)');

// 2. Change min sidebar width
content = content.replace(/const minWidth = 350;/, 'const minWidth = 400;');

// 3. Improve tab bar to avoid window controls
const targetTabBarRegex = /\{\/\* Tab Navigation \*\/\}\r?\n\s*<div className="flex-shrink-0 border-b border-white\/10 bg-\[#08090c\]">\r?\n\s*<div className="flex">/m;

const newTabBar = `{/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-white/10 bg-[#08090c] pt-2 pr-[140px] xl:pr-[120px]">
          <div className="flex overflow-x-auto min-h-[50px] items-end" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>`;

content = content.replace(targetTabBarRegex, newTabBar);

fs.writeFileSync(file, content);
