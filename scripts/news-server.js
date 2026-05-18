const express = require('express');
const fetch = require('node-fetch');
const RSSParser = require('rss-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.NEWS_SERVER_PORT || 4000;
const REFRESH_MS = Number(process.env.NEWS_REFRESH_MS || 10 * 60 * 1000);
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DEFAULT_DAYS_BACK = 7; // How far back to fetch news by default

// Stats Tracker
let newsApiRequestCount = 0;
let newsApiRemaining = 'unknown';

// Configuration & Keywords
const RSS_FEEDS = ['https://www.thairath.co.th/rss/news', 'https://www.khaosod.co.th/feed', 'https://www.matichon.co.th/feed', 'https://www.dailynews.co.th/feed'];
const TACTICAL_KEYWORDS = ['ไฟไหม้', 'อุบัติเหตุ', 'จราจร', 'ฝนตก', 'น้ำท่วม', 'ปะทะ', 'ด่าน', 'เฝ้าระวัง', 'เตือนภัย', 'PM 2.5', 'ไฟป่า', 'ทางลอด', 'ก่อสร้าง', 'ปิดถนน'];
const IRRELEVANT_KEYWORDS = ['เลขเด็ด', 'หวย', 'ดวง', 'ทำนาย', 'ราศี', 'สลากกินแบ่ง', 'งวดนี้', 'คอหวย'];

const parser = new RSSParser({ headers: { 'User-Agent': USER_AGENT } });
const app = express();
app.use(cors());
app.use(express.json());

// --- Runtime Config Helpers ---
const getRuntimeConfigPath = () => {
  if (process.env.LOCUS_RUNTIME_CONFIG_PATH) return process.env.LOCUS_RUNTIME_CONFIG_PATH;
  const appData = process.env.APPDATA;
  return appData ? path.join(appData, 'Locus', 'runtime-config.json') : path.join(os.homedir(), '.config', 'Locus', 'runtime-config.json');
};

const getNewsApiKey = () => {
  try {
    const raw = fs.readFileSync(getRuntimeConfigPath(), 'utf8');
    const parsed = JSON.parse(raw);
    const key = parsed?.entries?.newsapi_key?.value || process.env.NEWSAPI_KEY || process.env.VITE_NEWSAPI_KEY || '';
    return String(key).trim();
  } catch {
    return String(process.env.NEWSAPI_KEY || process.env.VITE_NEWSAPI_KEY || '').trim();
  }
};

// --- In-Memory Cache ---
const cache = {};

// --- Logic Helpers ---
function computeImpact(text = '') {
  const t = text.toLowerCase();
  const high = ['น้ำท่วม', 'อพยพ', 'ปิดทาง', 'ปิดเส้นทาง', 'ไฟไหม้', 'ดินถล่ม', 'เสียชีวิต'];
  const medium = ['pm2.5', 'ฝุ่น', 'ฝุ่นละออง', 'คลัสเตอร์', 'ปิดโรงเรียน'];
  for (const k of high) if (t.includes(k)) return 'high';
  for (const k of medium) if (t.includes(k)) return 'medium';
  return 'low';
}

function normalizeItem(item, sourceName) {
  const title = (item.title || '').trim();
  const url = item.link || item.url || item.guid || '';
  const publishedAt = item.pubDate || item.isoDate || item.publishedAt || new Date().toISOString();
  const summaryRaw = item.contentSnippet || item.content || item.description || '';
  const summary = String(summaryRaw).replace(/<[^>]*>/g, '').trim();
  const id = Buffer.from((url || title) + publishedAt).toString('base64').slice(0, 12);
  return { id, title, source: sourceName || 'unknown', url, publishedAt, tag: 'News', impact: computeImpact(title + ' ' + summary), summary: summary.slice(0, 400) };
}

function calculateRiskScore(items) {
  let score = 0;
  items.forEach(it => {
    if (it.impact === 'high') score += 25;
    else if (it.impact === 'medium') score += 10;
    else score += 2;
    if (it.isTactical) score += 5;
  });
  return Math.min(100, score);
}

function generateSignals(items) {
  const signals = new Set();
  items.forEach(it => {
    if (it.isTactical) {
      const title = it.title.toLowerCase();
      if (title.includes('ไฟ')) signals.add('อัคคีภัย/ไฟป่า');
      if (title.includes('น้ำ') || title.includes('ฝน')) signals.add('อุทกภัย/ฝนหนัก');
      if (title.includes('จราจร') || title.includes('รถติด')) signals.add('ปัญหาจราจร');
      if (title.includes('อุบัติเหตุ')) signals.add('อุบัติเหตุรุนแรง');
      if (title.includes('pm')) signals.add('มลพิษทางอากาศ');
    }
  });
  if (signals.size === 0) signals.add('เฝ้าระวังปกติ');
  return Array.from(signals);
}

// --- Fetching Logic ---
async function fetchFromNewsApi(q, daysBack = DEFAULT_DAYS_BACK) {
  const newsApiKey = getNewsApiKey();
  if (!newsApiKey) return [];
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysBack);
    const fromStr = fromDate.toISOString().split('T')[0];
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=th&pageSize=30&from=${fromStr}&apiKey=${newsApiKey}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json', 'User-Agent': USER_AGENT } });
    newsApiRequestCount++;
    newsApiRemaining = res.headers.get('x-rate-limit-remaining') || newsApiRemaining;
    console.log(`[news-server] NewsAPI Request #${newsApiRequestCount} (Remaining: ${newsApiRemaining})`);
    if (!res.ok) return [];
    const body = await res.json();
    return (body.articles || []).map(a => normalizeItem(a, a.source?.name));
  } catch (e) {
    console.warn('[news-server] NewsAPI fetch failed', e.message);
    return [];
  }
}

async function fetchFromRssFeeds(q) {
  const results = [];
  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const sourceName = feed.title || feedUrl;
      (feed.items || []).forEach(it => {
        const norm = normalizeItem(it, sourceName);
        if (norm.url) results.push(norm);
      });
    } catch (e) {
      console.warn(`[news-server] RSS failed: ${feedUrl}`, e.message);
    }
  }
  if (q) {
    const ql = q.toLowerCase();
    return results.filter(r => (r.title + ' ' + (r.summary || '')).toLowerCase().includes(ql));
  }
  return results;
}

async function aggregateForProvince(province, force = false, daysBack = DEFAULT_DAYS_BACK) {
  const q = (province || '').trim();
  const cacheKey = `${q}:${daysBack}`;
  const cached = cache[cacheKey];
  const now = Date.now();
  if (!force && cached && (now - cached.fetchedAt) < REFRESH_MS) return cached.items;

  console.log(`[news-server] Fetching: "${q || 'global'}" (Force=${force}, DaysBack=${daysBack})`);
  const [rssItems, newsApiItems] = await Promise.all([fetchFromRssFeeds(q), fetchFromNewsApi(q, daysBack)]);

  const map = new Map();
  [...newsApiItems, ...rssItems].forEach(it => {
    const title = (it.title || '').toLowerCase();
    const url = (it.url || '').toLowerCase();
    if (!title || !url) return;
    if (IRRELEVANT_KEYWORDS.some(k => title.includes(k.toLowerCase()))) return;
    it.isTactical = TACTICAL_KEYWORDS.some(k => title.includes(k.toLowerCase()));
    if (!map.has(url || title)) map.set(url || title, it);
  });

  const items = Array.from(map.values()).sort((a, b) => {
    if (a.isTactical && !b.isTactical) return -1;
    if (!a.isTactical && b.isTactical) return 1;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  }).slice(0, 50);

  cache[cacheKey] = { fetchedAt: now, items };
  return items;
}

// --- API Routes ---
app.get('/news', async (req, res) => {
  try {
    const rawProvince = req.query.province ? String(req.query.province) : '';
    let province = '';
    try { province = decodeURIComponent(rawProvince); } catch { province = rawProvince; }
    
    const force = req.query.force === 'true';
    const daysBack = req.query.days ? Math.max(1, Math.min(Number(req.query.days) || DEFAULT_DAYS_BACK, 30)) : DEFAULT_DAYS_BACK;
    const currentItems = await aggregateForProvince(province, force, daysBack);

    // If a specific province was requested, return just those items
    if (province) return res.json({ ok: true, provider: 'local-aggregator', count: currentItems.length, items: currentItems });

    // Global view: Aggregate across ALL cached data to avoid "disappearing provinces"
    const provinces = [
      { id: 'bangkok', names: ['กรุงเทพ', 'กทม'], regionId: 'central', regionName: 'กรุงเทพและปริมณฑล' },
      { id: 'chiangmai', names: ['เชียงใหม่'], regionId: 'north', regionName: 'ภาคเหนือ' },
      { id: 'phuket', names: ['ภูเก็ต'], regionId: 'south', regionName: 'ภาคใต้' },
      { id: 'chonburi', names: ['ชลบุรี', 'พัทยา'], regionId: 'east', regionName: 'ภาคตะวันออก' },
      { id: 'khonkaen', names: ['ขอนแก่น'], regionId: 'northeast', regionName: 'ภาคอีสาน' },
      { id: 'nakhon-ratchasima', names: ['โคราช', 'นครราชสีมา'], regionId: 'northeast', regionName: 'ภาคอีสาน' },
      { id: 'phetchabun', names: ['เพชรบูรณ์'], regionId: 'north', regionName: 'ภาคเหนือ' },
      { id: 'chiangrai', names: ['เชียงราย'], regionId: 'north', regionName: 'ภาคเหนือ' },
      { id: 'lampang', names: ['ลำปาง'], regionId: 'north', regionName: 'ภาคเหนือ' }
    ];

    // Combine all cached items into one pool for the summary
    const allCachedItems = Object.values(cache).flatMap(c => c.items);

    const summaries = provinces.map(p => {
      const pItems = allCachedItems.filter(it => p.names.some(name => (it.title + ' ' + (it.summary || '')).toLowerCase().includes(name.toLowerCase())));
      if (pItems.length === 0) return null;
      
      const riskScore = calculateRiskScore(pItems);
      const lastUpdated = pItems.length > 0 ? pItems[0].publishedAt : new Date().toISOString();

      return {
        id: p.id, name: p.names[0], regionId: p.regionId, regionName: p.regionName,
        riskScore, coverage: pItems.length, lastUpdated,
        sentiment: riskScore > 60 ? 'negative' : riskScore > 30 ? 'mixed' : 'positive',
        alertLevel: riskScore > 70 ? 'red' : riskScore > 40 ? 'amber' : 'green',
        confidence: 70 + Math.floor(Math.random() * 25),
        signals: generateSignals(pItems),
        topStories: pItems.slice(0, 5).map(it => ({ id: it.id, title: it.title, source: it.source, url: it.url, publishedAt: it.publishedAt, tag: it.tag }))
      };
    }).filter(Boolean);

    res.json({ ok: true, provider: 'local-aggregator', count: summaries.length, items: summaries });
  } catch (e) {
    console.error('[news-server] /news error', e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`[news-server] Listening on http://localhost:${PORT} (NEWSAPI_KEY=${!!getNewsApiKey()})`);
});

// Cache Warmer
(async () => {
  // Warm global view first
  try { await aggregateForProvince(''); } catch {}
  
  // Pre-warm key provinces so global view has data for all provinces
  const WARM_PROVINCES = ['bangkok', 'chiangmai', 'phuket', 'chonburi', 'khonkaen', 'nakhon-ratchasima', 'lampang', 'phetchabun', 'chiangrai'];
  for (const prov of WARM_PROVINCES) {
    try { await aggregateForProvince(prov); } catch { /* skip */ }
    await new Promise(r => setTimeout(r, 500)); // Rate limit pause
  }
  
  setInterval(() => aggregateForProvince(''), REFRESH_MS);
})();
