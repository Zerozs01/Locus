const { app, session } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
  const noProxySession = session.fromPartition('persist:no-proxy');
  noProxySession.setProxy({ proxyRules: 'direct://' });
  try {
    const res = await noProxySession.fetch('https://api-gateway.gistda.or.th/api/2.0/resources/maps/flood-freq/wms?service=WMS&request=GetCapabilities', {
      headers: { 'apikey': 'Cp3KOUaMyLTRXeYARKQmA8kJg5ZmzSSNJJBraosKXcCpGVVBDp0iImuavaY9X73m', 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.text();
    fs.writeFileSync('C:\\App\\Electron\\Locus\\tmp\\gistda_wms.xml', data);
  } catch (err) {
    fs.writeFileSync('C:\\App\\Electron\\Locus\\tmp\\gistda_wms.xml', err.stack || err.message);
  }
  app.quit();
});
