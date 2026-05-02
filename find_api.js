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
  const html = await fetch('https://disaster.gistda.or.th/services/open-api');
  const jsFiles = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  for (let file of jsFiles) {
    if (!file.startsWith('http')) {
      file = 'https://disaster.gistda.or.th' + file;
    }
    const js = await fetch(file);
    if (js.includes('flood_30days') || js.includes('swagger') || js.includes('openapi')) {
      console.log('Found in', file);
      const matches = [...js.matchAll(/.{0,50}(flood_30days|openapi|swagger).{0,50}/gi)];
      for (const m of matches) {
        console.log(m[0]);
      }
    }
  }
}
run();
