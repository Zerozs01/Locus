
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
  data: ProvinceNewsSummary[];
}

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
  
  if (!force) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const cache: NewsCache = JSON.parse(cached);
        if (now - cache.lastFetched < CACHE_TIME) {
          console.log('[News] Using cached news data');
          return filterNews(cache.data, provinceName);
        }
      } catch (e) {
        console.warn('[News] Cache parse failed', e);
      }
    }
  }

  const endpoint = await resolveNewsEndpoint();
  if (!endpoint) return [];

  try {
    const requestUrl = provinceName 
      ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}province=${encodeURIComponent(provinceName)}`
      : endpoint;

    console.log(`[News] Fetching from ${requestUrl}...`);
    const response = await fetch(requestUrl, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to load news');
    const payload = await response.json();

    let newsData: ProvinceNewsSummary[] = [];

    if (Array.isArray(payload)) {
      newsData = payload;
    } else if (payload && typeof payload === 'object' && Array.isArray((payload as any).items)) {
      newsData = (payload as any).items;
    }

    if (newsData.length > 0) {
      const cache: NewsCache = {
        lastFetched: now,
        data: newsData
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      return filterNews(newsData, provinceName);
    }
  } catch (error) {
    console.warn('[News] Fetch failed, falling back to cache or mock', error);
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return filterNews(JSON.parse(cached).data, provinceName);
      } catch {
        // Continue to mock
      }
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

const filterNews = (data: ProvinceNewsSummary[], provinceName?: string): ProvinceNewsSummary[] | NewsItem[] => {
  if (!provinceName) return data;
  
  const searchName = provinceName.toLowerCase().trim();
  
  const provinceData = data.find(p => {
    const pId = p.id.toLowerCase();
    const pName = p.name.toLowerCase();
    
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
  
  return provinceData ? provinceData.topStories : [];
};

export const openNewsLink = (url: string) => {
  if (!url || url === '#' || url === 'about:blank' || url.trim() === '') {
    console.warn(`[News] Invalid or empty URL provided: "${url}"`);
    return;
  }
  
  if (window.api?.openExternal) {
    window.api.openExternal(url);
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
