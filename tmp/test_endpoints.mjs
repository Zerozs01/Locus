import fs from 'fs';
import path from 'path';
import https from 'https';

const envLocal = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const apiKeyMatch = envLocal.match(/VITE_GISTDA_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

const endpoints = [
  '/features/fire/24hr',
  '/features/fire/7days',
  '/features/fire/30days',
  '/features/fire-freq',
  '/features/drought/7days',
  '/features/drought/30days',
  '/features/drought-freq',
  '/features/pm25',
  '/features/pm25/24hr',
  '/features/hotspot/24hr',
  '/features/hotspot/7days',
  '/features/hotspot/30days'
];

async function checkEndpoint(endpoint) {
  return new Promise((resolve) => {
    const url = `https://api-gateway.gistda.or.th/api/2.0/resources${endpoint}?limit=1`;
    https.get(url, { headers: { 'apikey': apiKey, 'API-Key': apiKey } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`[${res.statusCode}] ${endpoint} -> Features: ${json.features?.length ?? 'None'}`);
          }
        } catch {
        }
        resolve();
      });
    }).on('error', () => resolve());
  });
}

async function run() {
  for (const ep of endpoints) {
    await checkEndpoint(ep);
  }
}
run();
