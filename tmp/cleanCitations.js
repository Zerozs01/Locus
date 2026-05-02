const fs = require('fs');
const path = require('path');

const mdDir = path.join(__dirname, '../documents/deepreserach/KnowledgeTips');
const seedDir = path.join(__dirname, '../src/main/database');

const citationRegex = /【[^】]*?】/g;

function cleanDir(dirPath, ext) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith(ext));
  let count = 0;
  files.forEach(f => {
    const fullPath = path.join(dirPath, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (citationRegex.test(content)) {
      const newContent = content.replace(citationRegex, '');
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`Cleaned citations in ${f}`);
      count++;
    }
  });
  console.log(`Finished cleaning ${count} files in ${path.basename(dirPath)}`);
}

cleanDir(mdDir, '.md');
cleanDir(seedDir, '.ts');
