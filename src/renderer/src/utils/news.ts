
import { type RegionId } from '../data/regionTheme';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: string;
  impact: 'low' | 'medium' | 'high';
  summary?: string;
}

export interface ProvinceNewsSummary {
  id: string;
  name: string;
  regionId: RegionId;
  regionName: string;
  riskScore: number;
  sentiment: 'positive' | 'mixed' | 'negative';
  alertLevel: 'green' | 'amber' | 'red';
  coverage: number;
  confidence: number;
  signals: string[];
  topStories: NewsItem[];
  lastUpdated: string;
}

const CACHE_KEY = 'locus_news_cache';
const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours

const REGION_LABELS: Record<RegionId, string> = {
  central: 'ภาคกลาง',
  north: 'ภาคเหนือ',
  northeast: 'ภาคตะวันออกเฉียงเหนือ',
  west: 'ภาคตะวันตก',
  east: 'ภาคตะวันออก',
  south: 'ภาคใต้'
};

const DEFAULT_MOCK_NEWS: ProvinceNewsSummary[] = [
  {
    id: 'bangkok',
    name: 'Bangkok',
    regionId: 'central',
    regionName: 'ภาคกลาง',
    riskScore: 68,
    sentiment: 'mixed',
    alertLevel: 'amber',
    coverage: 42,
    confidence: 86,
    signals: ['การจราจรหนาแน่น', 'เศรษฐกิจย่านกลางเมือง', 'เฝ้าระวังความปลอดภัย'],
    lastUpdated: new Date().toISOString(),
    topStories: [
      {
        id: 'bkk-1',
        title: 'ศูนย์กลางธุรกิจเร่งปรับมาตรการรับมือฝนตกหนักและจราจรสะสม',
        source: 'Locus News',
        url: 'https://news.google.com',
        publishedAt: new Date().toISOString(),
        tag: 'โครงสร้างพื้นฐาน',
        impact: 'medium',
        summary: 'เน้นการจัดการจราจรในพื้นที่เศรษฐกิจสำคัญ'
      }
    ]
  },
  {
    id: 'chiangmai',
    name: 'Chiang Mai',
    regionId: 'north',
    regionName: 'ภาคเหนือ',
    riskScore: 52,
    sentiment: 'positive',
    alertLevel: 'green',
    coverage: 21,
    confidence: 81,
    signals: ['คุณภาพอากาศดีขึ้น', 'ท่องเที่ยวเชิงวัฒนธรรม'],
    lastUpdated: new Date().toISOString(),
    topStories: [
      {
        id: 'cm-1',
        title: 'เทศบาลเปิดแผนจัดการหมอกควันเชิงรุกก่อนฤดูแล้ง',
        source: 'Locus News',
        url: 'https://news.google.com',
        publishedAt: new Date().toISOString(),
        tag: 'สิ่งแวดล้อม',
        impact: 'low',
        summary: 'เตรียมความพร้อมอุปกรณ์และบุคลากรเฝ้าระวัง'
      }
    ]
  }
];

interface NewsCache {
  lastFetched: number;
  data: ProvinceNewsSummary[] | NewsItem[];
}

interface NewsArchiveRow {
  id: string;
  province_id: string | null;
  title: string;
  source: string | null;
  url: string | null;
  published_at: string | null;
  summary: string | null;
  tag: string | null;
  is_tactical: number | null;
}

interface ProvinceMeta {
  id: string;
  name: string;
  regionId: RegionId;
  regionName: string;
}

const normalizeText = (value: string) => String(value || '').toLowerCase().trim().replace(/\s+/g, ' ');

const normalizeHttpUrl = (value: string) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('//')) return `https:${raw}`;
  if (/^[\w.-]+\.[a-z]{2,}(?:[\/\?#]|$)/i.test(raw)) return `https://${raw}`;
  return raw;
};

const buildNewsSearchUrl = (query: string) => {
  const normalized = String(query || '').trim();
  if (!normalized) return '';
  return `https://news.google.com/search?q=${encodeURIComponent(normalized)}`;
};

const buildCacheKey = (provinceName?: string) => {
  if (!provinceName) return CACHE_KEY;
  const normalized = normalizeText(provinceName).replace(/\s+/g, '-');
  return normalized ? `${CACHE_KEY}:${normalized}` : CACHE_KEY;
};

const titleCaseFromId = (value: string) => {
  const text = String(value || '').trim().replace(/[_-]+/g, ' ');
  if (!text) return 'จังหวัดไม่ระบุ';
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const resolveProvinceMeta = (provinceId: string, provinceIndex: Array<{ id: string; name: string; regionId?: string; regionName?: string }>): ProvinceMeta => {
  const normalizedId = normalizeText(provinceId);
  const matched = provinceIndex.find((row) => normalizeText(row.id) === normalizedId || normalizeText(row.name) === normalizedId);
  const regionId = (matched?.regionId as RegionId) || 'central';
  const regionName = matched?.regionName || REGION_LABELS[regionId] || REGION_LABELS.central;

  return {
    id: matched?.id || provinceId,
    name: matched?.name || titleCaseFromId(provinceId),
    regionId,
    regionName
  };
};

const mapArchiveRowToNewsItem = (row: NewsArchiveRow): NewsItem => ({
  id: row.id,
  title: row.title,
  source: row.source || 'Locus Archive',
  url: normalizeHttpUrl(row.url || ''),
  publishedAt: row.published_at || new Date().toISOString(),
  tag: row.tag || 'News',
  impact: row.is_tactical ? 'medium' : 'low',
  summary: row.summary || undefined
});

const normalizeStory = (story: any): NewsItem => ({
  ...story,
  url: normalizeHttpUrl(story?.url || story?.link || story?.sourceUrl || story?.href || '')
});

const normalizeNewsPayload = (data: any[]) => {
  if (!Array.isArray(data) || data.length === 0) return data;
  if (data[0]?.topStories) {
    return data.map((summary) => ({
      ...summary,
      topStories: Array.isArray(summary.topStories) ? summary.topStories.map(normalizeStory) : []
    }));
  }
  return data.map(normalizeStory);
};

const groupFlatNewsIntoSummaries = async (flatNews: NewsItem[]): Promise<ProvinceNewsSummary[]> => {
  const provinceIndex = window.api?.db?.getProvinceIndex ? await window.api.db.getProvinceIndex().catch(() => []) : [];
  const safeProvinceIndex = Array.isArray(provinceIndex) ? provinceIndex : [];
  
  const grouped = new Map<string, NewsItem[]>();
  for (const item of flatNews) {
    const provinceId = String((item as any).province_id || (item as any).provinceId || (item as any).province || 'unknown').trim() || 'unknown';
    const list = grouped.get(provinceId) || [];
    list.push(item);
    grouped.set(provinceId, list);
  }

  const summaries = Array.from(grouped.entries()).map(([provinceId, provinceRows]) => {
    const meta = resolveProvinceMeta(provinceId, safeProvinceIndex);
    const topStories = provinceRows
      .slice()
      .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      .slice(0, 5);
    const riskScore = computeArchiveRiskScore(topStories);
    const coverage = Math.min(100, provinceRows.length * 18);
    const sentiment = riskScore >= 70 ? 'negative' : riskScore >= 40 ? 'mixed' : 'positive';
    const alertLevel = riskScore >= 70 ? 'red' : riskScore >= 40 ? 'amber' : 'green';

    return {
      id: meta.id,
      name: meta.name,
      regionId: meta.regionId,
      regionName: meta.regionName,
      riskScore,
      sentiment,
      alertLevel,
      coverage,
      confidence: Math.max(60, Math.min(95, 70 + Math.min(20, provinceRows.length * 2))),
      signals: provinceRows.length > 0 ? ['ข่าวล่าสุดจาก API'] : ['ไม่มีสัญญาณเพิ่มเติม'],
      topStories,
      lastUpdated: provinceRows[0]?.publishedAt || new Date().toISOString()
    } satisfies ProvinceNewsSummary;
  });

  return summaries.sort((a, b) => b.riskScore - a.riskScore);
};

const normalizeCachedPayload = (data: ProvinceNewsSummary[] | NewsItem[]) => {
  if (!Array.isArray(data)) return data;
  return normalizeNewsPayload(data as any[]);
};

const computeArchiveRiskScore = (items: NewsItem[]) => {
  if (items.length === 0) return 0;
  const score = items.reduce((acc, item) => {
    if (item.impact === 'high') return acc + 25;
    if (item.impact === 'medium') return acc + 10;
    return acc + 2;
  }, 0);
  return Math.min(100, score);
};

const buildArchiveFallback = async (provinceName?: string): Promise<ProvinceNewsSummary[] | NewsItem[]> => {
  if (!window.api?.db?.getNewsArchive) return [];

  const [archiveRows, provinceIndex] = await Promise.all([
    window.api.db.getNewsArchive(undefined, 200), // Get more items for fallback/merge
    window.api.db.getProvinceIndex ? window.api.db.getProvinceIndex().catch(() => []) : []
  ]);

  if (!Array.isArray(archiveRows) || archiveRows.length === 0) return [];

  const rows = archiveRows as NewsArchiveRow[];
  const safeProvinceIndex = Array.isArray(provinceIndex) ? provinceIndex : [];
  const query = normalizeText(provinceName || '');

  if (query) {
    const matchedProvince = safeProvinceIndex.find((row) => {
      const candidates = [row.id, row.name, titleCaseFromId(row.id)];
      return candidates.some((candidate) => {
        const normalizedCandidate = normalizeText(candidate);
        return normalizedCandidate === query || normalizedCandidate.includes(query) || query.includes(normalizedCandidate);
      });
    });

    if (matchedProvince) {
      const archiveItems = rows
        .filter((row) => normalizeText(row.province_id || '') === normalizeText(matchedProvince.id))
        .map(mapArchiveRowToNewsItem);

      if (archiveItems.length > 0) return archiveItems;
    }

    const archiveItems = rows.map(mapArchiveRowToNewsItem);
    const filtered = filterNews(archiveItems, provinceName);
    if (filtered.length > 0) return filtered;
  }

  const grouped = new Map<string, NewsArchiveRow[]>();
  for (const row of rows) {
    const provinceId = String(row.province_id || 'unknown').trim() || 'unknown';
    const list = grouped.get(provinceId) || [];
    list.push(row);
    grouped.set(provinceId, list);
  }

  const summaries = Array.from(grouped.entries()).map(([provinceId, provinceRows]) => {
    const meta = resolveProvinceMeta(provinceId, safeProvinceIndex);
    const topStories = provinceRows
      .slice()
      .sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))
      .slice(0, 5)
      .map(mapArchiveRowToNewsItem);
    const riskScore = computeArchiveRiskScore(topStories);
    const coverage = Math.min(100, provinceRows.length * 18);
    const sentiment = riskScore >= 70 ? 'negative' : riskScore >= 40 ? 'mixed' : 'positive';
    const alertLevel = riskScore >= 70 ? 'red' : riskScore >= 40 ? 'amber' : 'green';

    return {
      id: meta.id,
      name: meta.name,
      regionId: meta.regionId,
      regionName: meta.regionName,
      riskScore,
      sentiment,
      alertLevel,
      coverage,
      confidence: Math.max(60, Math.min(95, 70 + Math.min(20, provinceRows.length * 2))),
      signals: provinceRows.length > 0 ? ['ข่าวจากคลัง SQLite'] : ['ไม่มีสัญญาณเพิ่มเติม'],
      topStories,
      lastUpdated: provinceRows[0]?.published_at || new Date().toISOString()
    } satisfies ProvinceNewsSummary;
  });

  return summaries.sort((a, b) => b.riskScore - a.riskScore);
};

export const resolveNewsEndpoint = async (): Promise<string> => {
  if (window.api?.config?.get) {
    try {
      const config = await window.api.config.get();
      if (config.news_api_url) {
        const rawEndpoint = String(config.news_api_url).trim();
        if (!rawEndpoint) return '';
        try {
          const endpointUrl = new URL(rawEndpoint, window.location.href);
          if (endpointUrl.pathname === '/' || endpointUrl.pathname === '') {
            endpointUrl.pathname = '/news';
          }
          return endpointUrl.toString();
        } catch {
          return rawEndpoint.replace(/\/?$/, '/news');
        }
      }
    } catch {
      return '';
    }
  }
  const fallbackEndpoint = (import.meta as any).env?.VITE_NEWS_API_URL || '';
  if (!fallbackEndpoint) return '';
  try {
    const endpointUrl = new URL(fallbackEndpoint, window.location.href);
    if (endpointUrl.pathname === '/' || endpointUrl.pathname === '') {
      endpointUrl.pathname = '/news';
    }
    return endpointUrl.toString();
  } catch {
    return fallbackEndpoint.replace(/\/?$/, '/news');
  }
};

export const fetchNews = async (force: boolean = false, provinceName?: string): Promise<ProvinceNewsSummary[] | NewsItem[]> => {
  const now = Date.now();

  const readCache = (cacheKey: string) => {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    try {
      return JSON.parse(cached) as NewsCache;
    } catch (error) {
      console.warn('[News] Cache parse failed', error);
      return null;
    }
  };

  const isCacheFresh = (cache: NewsCache) => now - cache.lastFetched < CACHE_TIME;
  
  if (!force) {
    if (provinceName) {
      const provinceCache = readCache(buildCacheKey(provinceName));
      if (provinceCache && isCacheFresh(provinceCache)) {
        console.log('[News] Using cached news data (province)');
        return normalizeCachedPayload(provinceCache.data) as NewsItem[];
      }

      const globalCache = readCache(CACHE_KEY);
      if (globalCache && isCacheFresh(globalCache)) {
        console.log('[News] Using cached news data (global)');
        return filterNews(normalizeCachedPayload(globalCache.data) as ProvinceNewsSummary[], provinceName);
      }
    } else {
      const globalCache = readCache(CACHE_KEY);
      if (globalCache && isCacheFresh(globalCache)) {
        console.log('[News] Using cached news data');
        return filterNews(normalizeCachedPayload(globalCache.data) as ProvinceNewsSummary[], provinceName);
      }
    }
  }

  const trySQLiteFallback = async () => {
    try {
      const archived = await buildArchiveFallback(provinceName);
      if (Array.isArray(archived) && archived.length > 0) {
        console.log('[News] Using SQLite archive fallback');
      }
      return archived;
    } catch (error) {
      console.warn('[News] SQLite archive fallback failed', error);
      return [];
    }
  };

  const endpoint = await resolveNewsEndpoint();
  if (!endpoint) {
    const archived = await trySQLiteFallback();
    if (archived.length > 0) return archived;
    const cached = readCache(provinceName ? buildCacheKey(provinceName) : CACHE_KEY);
    if (cached) {
      if (provinceName) {
        return normalizeCachedPayload(cached.data) as NewsItem[];
      }
      return filterNews(normalizeCachedPayload(cached.data) as ProvinceNewsSummary[], provinceName);
    }
    return filterNews(DEFAULT_MOCK_NEWS, provinceName);
  }

  try {
    // Request 7 days of news by default (matches server's DEFAULT_DAYS_BACK)
    const daysParam = 'days=7';
    let requestUrl = provinceName 
      ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}province=${encodeURIComponent(provinceName)}&${daysParam}`
      : `${endpoint}${endpoint.includes('?') ? '&' : '?'}${daysParam}`;
    
    if (force) {
      requestUrl += `&force=true`;
    }

    console.log(`[News] Fetching from ${requestUrl}...`);
    const response = await fetch(requestUrl, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to load news');
    const payload = await response.json();

    let newsData: any[] = [];
    if (Array.isArray(payload)) {
      newsData = payload;
    } else if (payload && typeof payload === 'object' && Array.isArray((payload as any).items)) {
      newsData = (payload as any).items;
    }

    // Always fetch archive to merge with live results for persistence
    const archiveResult = await buildArchiveFallback(provinceName);
    const archiveItems = Array.isArray(archiveResult) ? archiveResult : [];

    if (newsData.length > 0 || archiveItems.length > 0) {
      const normalizedNewsData = normalizeNewsPayload(newsData);
      const isSummaryPayload = Boolean(normalizedNewsData[0]?.topStories);

      // 1. Save live data to SQLite Archive for persistence
      try {
        const storiesToArchive = normalizedNewsData.flatMap((entry: any) => {
          if (Array.isArray(entry?.topStories)) {
            return entry.topStories.map((story: any) => ({
              id: story.id,
              province_id: entry.id,
              title: story.title,
              source: story.source,
              url: normalizeHttpUrl(story.url),
              published_at: story.publishedAt,
              summary: story.summary || '',
              tag: story.tag || 'News',
              is_tactical: entry.riskScore > 50 ? 1 : 0
            }));
          }

          const provinceId = String(entry?.province_id || entry?.provinceId || provinceName || entry?.province || 'global');
          const fallbackId = entry?.id || entry?.url || entry?.link || `${provinceId}-${entry?.title || 'news'}`;
          const publishedAt = entry?.publishedAt || entry?.published_at || entry?.published || new Date().toISOString();
          const impact = String(entry?.impact || '').toLowerCase();
          const isTactical = typeof entry?.is_tactical === 'number'
            ? entry.is_tactical
            : entry?.isTactical
              ? 1
              : impact === 'high'
                ? 1
                : 0;

          return [{
            id: String(fallbackId),
            province_id: provinceId,
            title: entry?.title || 'ข่าวล่าสุด',
            source: entry?.source || entry?.provider || 'News',
            url: normalizeHttpUrl(entry?.url || entry?.link || entry?.sourceUrl || ''),
            published_at: publishedAt,
            summary: entry?.summary || entry?.description || '',
            tag: entry?.tag || entry?.category || 'News',
            is_tactical: isTactical
          }];
        });
        
        if (storiesToArchive.length > 0 && (window as any).api?.db?.saveNewsArchive) {
          const result = await (window as any).api.db.saveNewsArchive(storiesToArchive);
          console.log(`[News] Archived ${result.count} stories to SQLite`);
        }
      } catch (err) {
        console.warn('[News] Failed to archive news to DB', err);
      }

      // 2. Merge Live + Archive
      let mergedPayload: ProvinceNewsSummary[] | NewsItem[] = [];

      if (provinceName) {
        // Flat list of items for a specific province
        const liveItems = isSummaryPayload 
          ? (filterNews(normalizedNewsData, provinceName) as NewsItem[])
          : (normalizedNewsData as NewsItem[]);
        
        const archiveItemsFlat = archiveItems as NewsItem[];
        
        // Dedup by URL
        const seenUrls = new Set<string>();
        mergedPayload = [...liveItems, ...archiveItemsFlat].filter(item => {
          const url = normalizeHttpUrl(item.url);
          if (!url || seenUrls.has(url)) return false;
          seenUrls.add(url);
          return true;
        }).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).slice(0, 50);
      } else {
        // List of summaries for global view
        const liveSummaries = isSummaryPayload 
          ? (normalizedNewsData as ProvinceNewsSummary[])
          : await groupFlatNewsIntoSummaries(normalizedNewsData as NewsItem[]);
        
        const archiveSummaries = archiveItems as ProvinceNewsSummary[];
        
        // Merge summaries by province ID
        const summariesMap = new Map<string, ProvinceNewsSummary>();
        
        // Archive first as base
        archiveSummaries.forEach(s => summariesMap.set(s.id, s));
        
        // Live overrides/adds
        liveSummaries.forEach(s => {
          const existing = summariesMap.get(s.id);
          if (existing) {
            // Merge top stories and dedup
            const seenUrls = new Set<string>();
            const allStories = [...s.topStories, ...existing.topStories].filter(st => {
              const url = normalizeHttpUrl(st.url);
              if (!url || seenUrls.has(url)) return false;
              seenUrls.add(url);
              return true;
            }).slice(0, 10);
            
            summariesMap.set(s.id, {
              ...existing,
              ...s,
              topStories: allStories,
              coverage: Math.max(s.coverage, existing.coverage)
            });
          } else {
            summariesMap.set(s.id, s);
          }
        });
        
        mergedPayload = Array.from(summariesMap.values()).sort((a, b) => b.riskScore - a.riskScore);
      }

      const cacheKey = provinceName ? buildCacheKey(provinceName) : CACHE_KEY;
      const cache: NewsCache = {
        lastFetched: now,
        data: mergedPayload
      };
      localStorage.setItem(cacheKey, JSON.stringify(cache));
      return mergedPayload;
    }
  } catch (error) {
    console.warn('[News] Fetch failed, falling back to archive or cache', error);
    const archived = await trySQLiteFallback();
    if (archived.length > 0) return archived;
    const cached = readCache(provinceName ? buildCacheKey(provinceName) : CACHE_KEY);
    if (cached) {
      if (provinceName) return normalizeCachedPayload(cached.data) as NewsItem[];
      return filterNews(normalizeCachedPayload(cached.data) as ProvinceNewsSummary[], provinceName);
    }
  }

  // Final fallback to mock data
  return filterNews(DEFAULT_MOCK_NEWS, provinceName);
};

const PROVINCE_NAME_MAP: Record<string, string[]> = {
  'bangkok': ['bangkok', 'กรุงเทพ', 'กรุงเทพมหานคร', 'กทม', 'bangkok metropolis'],
  'chiangmai': ['chiang mai', 'chiangmai', 'เชียงใหม่'],
  'phuket': ['phuket', 'ภูเก็ต'],
  'chonburi': ['chonburi', 'ชลบุรี'],
};

const filterNews = (data: any[], provinceName?: string): ProvinceNewsSummary[] | NewsItem[] => {
  if (!data || !Array.isArray(data)) return [];
  if (!provinceName) return data;
  
  const searchName = provinceName.toLowerCase().trim();
  
  // Safe search for province summary or items
  const provinceData = data.find(p => {
    if (!p) return false;
    const pId = (p.id || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();
    
    // Direct match
    if (pId === searchName || pName === searchName) return true;
    
    // Map match
    for (const [canonical, aliases] of Object.entries(PROVINCE_NAME_MAP)) {
      if (aliases.includes(searchName)) {
        if (pId === canonical || pName === canonical) return true;
      }
    }
    
    return false;
  });
  
  if (provinceData && Array.isArray(provinceData.topStories)) {
    return provinceData.topStories;
  }
  
  // If it's a flat list of items, filter them by title/summary
  if (data.length > 0 && !data[0].topStories) {
    return data.filter(it => 
      (it.title || '').toLowerCase().includes(searchName) || 
      (it.summary || '').toLowerCase().includes(searchName)
    );
  }

  return [];
};

export const openNewsLink = (url: string, fallbackTitle?: string) => {
  const normalized = normalizeHttpUrl(url);
  const fallbackQuery = String(fallbackTitle || '').trim();

  console.log('[News] Attempting to open link:', { original: url, normalized, fallbackQuery });

  const openExternal = (candidate: string): boolean => {
    if (!candidate || candidate === '#' || candidate === 'about:blank') {
      console.warn('[News] Invalid candidate URL:', candidate);
      return false;
    }
    
    try {
      const parsedUrl = new URL(candidate);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        console.warn('[News] Unsupported protocol:', parsedUrl.protocol);
        return false;
      }

      console.log('[News] Opening external URL:', candidate);
      
      // Prioritize shell.openExternal for Electron environment
      if ((window as any).api?.shell?.openExternal) {
        (window as any).api.shell.openExternal(candidate);
        return true;
      }
      
      // Fallback to standard window.open for web/browser environment
      window.open(candidate, '_blank', 'noopener,noreferrer');
      return true;
    } catch (e) {
      console.error('[News] URL parsing failed for:', candidate, e);
      return false;
    }
  };

  if (!openExternal(normalized)) {
    if (fallbackQuery) {
      console.log('[News] Falling back to search for title:', fallbackQuery);
      const searchUrl = buildNewsSearchUrl(fallbackQuery);
      openExternal(searchUrl);
    } else {
      console.warn('[News] No URL and no fallback title available.');
    }
  }
};

export const isValidNewsUrl = (url: string) => {
  if (!url || url === '#' || url === 'about:blank') return false;
  try {
    const normalized = normalizeHttpUrl(url);
    if (!normalized) return false;
    const parsed = new URL(normalized);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};
