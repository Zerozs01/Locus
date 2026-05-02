const fs = require('fs');
const js = fs.readFileSync('5893.js', 'utf-8');

let start = js.indexOf('s={openapi:"3.0.3",info:{title:"\\u0E02\\u0E49\\u0E2D\\u0E21\\u0E39\\u0E25\\u0E20\\u0E31\\u0E22\\u0E1E\\u0E34\\u0E1A\\u0E31\\u0E15\\u0E34\\u0E19\\u0E49\\u0E33\\u0E17\\u0E48\\u0E27\\u0E21"');
if (start === -1) {
  start = js.indexOf('s={openapi:"3.0.3",info:{title:"ข้อมูลภัยพิบัติน้ำท่วม"');
}

let objStr = js.slice(start, start + 25000); 
fs.writeFileSync('flood_api_spec_full.txt', objStr);
console.log('Saved flood_api_spec_full.txt');
