const { app, session } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
  const noProxySession = session.fromPartition('persist:no-proxy');
  noProxySession.setProxy({ proxyRules: 'direct://' });
  try {
    const res = await noProxySession.fetch('https://api-gateway.gistda.or.th/api/2.0/resources/features/flood-freq?limit=1', {
      headers: { 'apikey': 'Cp3KOUaMyLTRXeYARKQmA8kJg5ZmzSSNJJBraosKXcCpGVVBDp0iImuavaY9X73m', 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.text();
    fs.writeFileSync('C:\\App\\Electron\\Locus\\tmp\\gistda_flood.json', data);
  } catch (err) {
    fs.writeFileSync('C:\\App\\Electron\\Locus\\tmp\\gistda_flood.json', err.stack || err.message);
  }
  app.quit();
});
