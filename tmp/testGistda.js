const { net, session } = require('electron');

async function testFetch() {
  const noProxySession = session.fromPartition('persist:no-proxy');
  noProxySession.setProxy({ proxyRules: 'direct://' });
  
  const headers = {
    'apikey': 'Cp3KOUaMyLTRXeYARKQmA8kJg5ZmzSSNJJBraosKXcCpGVVBDp0iImuavaY9X73m',
    'User-Agent': 'Mozilla/5.0'
  };

  try {
    const res = await noProxySession.fetch('https://api-gateway.gistda.or.th/api/2.0/resources/features/flood-freq?limit=1', { headers });
    const text = await res.text();
    require('fs').writeFileSync('C:\\App\\Electron\\Locus\\tmp\\gistda_test.json', text);
    console.log('Success!');
  } catch (err) {
    console.error('Error:', err);
  }
}

testFetch();
