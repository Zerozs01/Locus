const fs = require('fs');
const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const js = await fetch('https://disaster.gistda.or.th/_next/static/chunks/5893-fac62f925e7b29dd.js');
  // the js contains a minified js object like: s={openapi:"3.0.3",info:{title:"ข้อมูลภัยพิบัติน้ำท่วม",...
  // Let's write the whole file to a text file, and then we can grep it locally.
  fs.writeFileSync('5893.js', js);
  console.log('Saved 5893.js');
}
run();
