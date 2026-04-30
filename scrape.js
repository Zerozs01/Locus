const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.goto('https://disaster.gistda.or.th/services/open-api', { waitUntil: 'networkidle2' });
  const text = await page.evaluate(() => document.body.innerText);
  const fs = require('fs');
  fs.writeFileSync('doc_output.txt', text);
  await browser.close();
})();
