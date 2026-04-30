import fs from 'fs';
import path from 'path';
import https from 'https';

const envLocal = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const apiKeyMatch = envLocal.match(/VITE_GISTDA_API_KEY=(.+)/);
if (!apiKeyMatch) {
  console.error("No API key found in .env.local");
  process.exit(1);
}
const apiKey = apiKeyMatch[1].trim();

const url = 'https://api-gateway.gistda.or.th/api/2.0/resources/features/flood/7days?limit=1000';

https.get(url, {
  headers: {
    'apikey': apiKey,
    'API-Key': apiKey,
    'User-Agent': 'NodeJS Test'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Response Type:", typeof json);
      console.log("Is Array?", Array.isArray(json));
      if (json.type) console.log("GeoJSON Type:", json.type);
      console.log("Raw Response Length (bytes):", data.length);
      if (json.features) {
        console.log("Features Count:", json.features.length);
        console.log("Sample Feature Geometry Type:", json.features[0]?.geometry?.type);
        console.log("Sample Feature Coordinates (first few):", JSON.stringify(json.features[0]?.geometry?.coordinates).slice(0, 100) + '...');
        console.log("Sample Feature Properties:", json.features[0]?.properties);
        console.log("CRS:", json.crs);
      } else if (json.data && json.data.features) {
         console.log("It's nested in .data!");
      } else {
        console.log("Keys:", Object.keys(json));
        console.log("Sample:", JSON.stringify(json).slice(0, 500));
      }
    } catch (e) {
      console.log("Failed to parse JSON:", e.message);
      console.log("Raw output start:", data.slice(0, 200));
    }
  });
}).on('error', err => {
  console.error("Request failed:", err.message);
});
