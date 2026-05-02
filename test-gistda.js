const API_KEY = 'Cp3KOUaMyLTRXeYARKQmA8kJg5ZmzSSNJJBraosKXcCpGVVBDp0iImuavaY9X73m';
const BASE_URL = 'https://api-gateway.gistda.or.th/api/2.0/resources';

async function testGistda() {
  const url = `${BASE_URL}/features/flood-freq?limit=2`;
  console.log(`Testing: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'API-Key': API_KEY,
        'apikey': API_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error(`Fetch failed: ${err.message}`);
  }
}

testGistda();
