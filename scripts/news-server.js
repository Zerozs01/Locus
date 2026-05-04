const express = require('express');
const fetch = require('node-fetch');
const RSSParser = require('rss-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.NEWS_SERVER_PORT || 4000;
const REFRESH_MS = Number(process.env.NEWS_REFRESH_MS || 10 * 60 * 1000); // 10m default

// Default RSS feeds (can be customized via environment or directly editing this file)
const RSS_FEEDS = process.env.NEWS_RSS_FEEDS
  ? process.env.NEWS_RSS_FEEDS.split(',')
  : [
      'https://www.bangkokpost.com/feed',
      'https://www.khaosod.co.th/feed/',
      'https://www.thairath.co.th/rss',
      'https://www.matichon.co.th/rss',
    ];

const parser = new RSSParser();
const app = express();
app.use(cors());
app.use(express.json());

const getRuntimeConfigPath = () => {
  if (process.env.LOCUS_RUNTIME_CONFIG_PATH) {
    return process.env.LOCUS_RUNTIME_CONFIG_PATH;
  }

  const appData = process.env.APPDATA;
  if (appData) {
    return path.join(appData, 'Locus', 'runtime-config.json');
  }

  return path.join(os.homedir(), '.config', 'Locus', 'runtime-config.json');
};

const readRuntimeConfig = () => {
  try {
    const raw = fs.readFileSync(getRuntimeConfigPath(), 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.entries && typeof parsed.entries === 'object') {
      const entries = parsed.entries;
      const result = {};
      for (const [key, entry] of Object.entries(entries)) {
        if (entry && typeof entry === 'object' && typeof entry.value === 'string') {
          result[key] = String(entry.value || '').trim();
        }
      }
      return result;
    }
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const getNewsApiKey = () => {
  const runtimeConfig = readRuntimeConfig();
  return String(process.env.NEWSAPI_KEY || process.env.VITE_NEWSAPI_KEY || runtimeConfig.newsapi_key || '').trim();
};

// In-memory cache per-province
const cache = {};

function computeImpact(text = '') {
  const t = text.toLowerCase();
  const high = ['น้ำท่วม', 'อพยพ', 'ปิดทาง', 'ปิดเส้นทาง', 'ยกเลิก', 'ระงับ', 'ไฟไหม้', 'ดินถล่ม', 'เสียชีวิต', 'บาดเจ็บ'];
  const medium = ['pm2.5', 'ฝุ่น', 'ฝุ่นละออง', 'pm2', 'ป่วย', 'คลัสเตอร์', 'ปิดโรงเรียน'];
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
  return {
    id,
    title,
    source: sourceName || (item.source && item.source.name) || 'unknown',
    url,
    publishedAt,
    tag: 'general',
    impact: computeImpact(title + ' ' + summary),
    summary: summary.slice(0, 400),
  };
}

async function fetchFromNewsApi(q) {
  const newsApiKey = getNewsApiKey();
  if (!newsApiKey) return [];
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=th&pageSize=30&apiKey=${newsApiKey}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const body = await res.json();
    const items = Array.isArray(body.articles) ? body.articles : [];
    return items.map((a) => normalizeItem(a, a.source && a.source.name));
  } catch (e) {
    console.warn('[news-server] NewsAPI fetch failed', e && e.message);
    return [];
  }
}

async function fetchFromRssFeeds(q) {
  const results = [];
  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const sourceName = feed.title || feedUrl;
      (feed.items || []).forEach((it) => {
        const norm = normalizeItem(it, sourceName);
        results.push(norm);
      });
    } catch (e) {
      console.warn('[news-server] RSS parse failed', feedUrl, e && e.message);
    }
  }
  // filter by q if provided
  if (q) {
    const ql = q.toLowerCase();
    return results.filter(r => (r.title + ' ' + r.summary + ' ' + r.source).toLowerCase().includes(ql));
  }
  return results;
}

async function aggregateForProvince(province) {
  const q = (province || '').trim();
  const cached = cache[q];
  const now = Date.now();
  if (cached && (now - cached.fetchedAt) < REFRESH_MS) {
    return cached.items;
  }

  const [rssItems, newsApiItems] = await Promise.all([
    fetchFromRssFeeds(q),
    fetchFromNewsApi(q)
  ]);

  // merge and dedupe by url
  const map = new Map();
  [...newsApiItems, ...rssItems].forEach((it) => {
    const key = (it.url || it.title).toLowerCase();
    if (!map.has(key)) map.set(key, it);
  });

  const items = Array.from(map.values()).sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 50);
  cache[q] = { fetchedAt: now, items };
  return items;
}

app.get('/news', async (req, res) => {
  try {
    const province = req.query.province ? String(req.query.province) : '';
    const items = await aggregateForProvince(province);
    res.json({ ok: true, provider: 'local-aggregator', count: items.length, items });
  } catch (e) {
    console.error('[news-server] /news error', e && e.stack || e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  const hasKey = !!getNewsApiKey();
  console.log(`[news-server] Listening on http://localhost:${PORT}  (NEWSAPI_KEY=${hasKey})`);
});

// Periodic refresh of empty query to warm cache
(async () => {
  try {
    await aggregateForProvince('');
  } catch {}
  setInterval(() => { aggregateForProvince(''); }, REFRESH_MS);
})();
