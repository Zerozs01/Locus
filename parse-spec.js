const fs = require('fs');
const specStr = fs.readFileSync('flood_api_spec.txt', 'utf8');
const pathsMatch = specStr.match(/\/features\/[^"'{,}]+/g) || [];
const pathsUnique = [...new Set(pathsMatch)];
console.log('Feature Paths:', pathsUnique);
