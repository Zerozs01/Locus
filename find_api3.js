const fs = require('fs');
const js = fs.readFileSync('5893.js', 'utf-8');
const match = js.match(/.{0,100}flood_30days.{0,200}/g);
if (match) {
  match.forEach(m => console.log(m));
} else {
  console.log("No match");
}
