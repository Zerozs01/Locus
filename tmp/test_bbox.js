const { app, session } = require('electron');

app.whenReady().then(async () => {
  const noProxySession = session.fromPartition('persist:no-proxy');
  noProxySession.setProxy({ proxyRules: 'direct://' });
  const headers = { 'apikey': 'Cp3KOUaMyLTRXeYARKQmA8kJg5ZmzSSNJJBraosKXcCpGVVBDp0iImuavaY9X73m', 'User-Agent': 'Mozilla/5.0' };
  
  // Khon Kaen bbox approx
  const bbox = '101.5,15.5,103.5,17.0';
  console.log('Fetching Khon Kaen bbox...');
  const start = Date.now();
  try {
    const res = await noProxySession.fetch(`https://api-gateway.gistda.or.th/api/2.0/resources/features/flood-freq?limit=500&bbox=${bbox}`, { headers });
    console.log(`Status: ${res.status} ${res.statusText} in ${Date.now()-start}ms`);
  } catch (err) {
    console.error('Error:', err);
  }
  
  // Bangkok bbox approx
  const bkkBbox = '100.3,13.5,100.9,13.9';
  console.log('Fetching Bangkok bbox...');
  const start2 = Date.now();
  try {
    const res = await noProxySession.fetch(`https://api-gateway.gistda.or.th/api/2.0/resources/features/flood-freq?limit=500&bbox=${bkkBbox}`, { headers });
    console.log(`Status: ${res.status} ${res.statusText} in ${Date.now()-start2}ms`);
  } catch (err) {
    console.error('Error:', err);
  }
  app.quit();
});
