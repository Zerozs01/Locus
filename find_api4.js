const fs = require('fs');
const js = fs.readFileSync('5893.js', 'utf-8');

// The file contains things like: let n={openapi:"3.0.3"...},a={openapi:"3.0.3"...},s={openapi:"3.0.3",info:{title:"ข้อมูลภัยพิบัติน้ำท่วม" ... }}
// We can find the start of s={openapi:"3.0.3"
let start = js.indexOf('s={openapi:"3.0.3",info:{title:"\\u0E02\\u0E49\\u0E2D\\u0E21\\u0E39\\u0E25\\u0E20\\u0E31\\u0E22\\u0E1E\\u0E34\\u0E1A\\u0E31\\u0E15\\u0E34\\u0E19\\u0E49\\u0E33\\u0E17\\u0E48\\u0E27\\u0E21"');
if (start === -1) {
  // try direct thai chars
  start = js.indexOf('s={openapi:"3.0.3",info:{title:"ข้อมูลภัยพิบัติน้ำท่วม"');
}

if (start === -1) {
  console.log("Could not find start");
  process.exit(1);
}

// now we want to extract the json structure.
// it's a javascript object.
let end = js.indexOf('}},p={', start);
if (end === -1) end = js.indexOf('}}', start) + 2;

let objStr = js.slice(start + 2, end); // remove "s="
// write it out so we can inspect
fs.writeFileSync('flood_api_spec.txt', objStr);
console.log('Saved flood_api_spec.txt');
