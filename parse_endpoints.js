const spec = require('fs').readFileSync('flood_api_spec_full.txt', 'utf8');
// Find all paths
const pathMatches = spec.match(/"\/(?:features|water)[^"]+"/g) || [];
const unique = [...new Set(pathMatches)];
console.log('Available endpoints:');
unique.forEach(p => console.log(p));
