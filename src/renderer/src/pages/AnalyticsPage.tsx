import { useEffect, useMemo, useState } from 'react';
import {
  Radar,
  Newspaper,
  Search,
  RefreshCw,
  MapPin,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  ExternalLink,
  Layers,
  SlidersHorizontal,
  Clock3
} from 'lucide-react';
import { regionTheme, type RegionId } from '../data/regionTheme';

type RiskLevel = 'green' | 'amber' | 'red';
type Sentiment = 'positive' | 'mixed' | 'negative';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  tag: string;
  impact: 'low' | 'medium' | 'high';
}

interface ProvinceNewsSummary {
  id: string;
  name: string;
  regionId: RegionId;
  regionName: string;
  riskScore: number;
  sentiment: Sentiment;
  alertLevel: RiskLevel;
  coverage: number;
  confidence: number;
  signals: string[];
  topStories: NewsItem[];
  lastUpdated: string;
}

const MOCK_NEWS: ProvinceNewsSummary[] = [
  {
    id: 'bangkok',
    name: 'Bangkok',
    regionId: 'central',
    regionName: regionTheme.central.label,
    riskScore: 68,
    sentiment: 'mixed',
    alertLevel: 'amber',
    coverage: 42,
    confidence: 86,
    signals: ['交通หนาแน่น', 'เศรษฐกิจย่านกลางเมือง', 'มาตรการความปลอดภัยอีเวนต์ใหญ่'],
    lastUpdated: '2026-04-07T09:40:00.000Z',
    topStories: [
      {
        id: 'bkk-1',
        title: 'ศูนย์กลางธุรกิจเร่งปรับมาตรการรับมือฝนตกหนักและจราจรสะสม',
        source: 'Bangkok Insight',
        url: 'https://news.example.com/bkk/1',
        publishedAt: '2026-04-07T08:10:00.000Z',
        tag: 'โครงสร้างพื้นฐาน',
        impact: 'medium'
      },
      {
        id: 'bkk-2',
        title: 'ตลาดท่องเที่ยวกลับมาคึกคัก แต่ยังต้องเฝ้าระวังเหตุฉุกเฉินในพื้นที่แออัด',
        source: 'Tourism Daily',
        url: 'https://news.example.com/bkk/2',
        publishedAt: '2026-04-07T06:30:00.000Z',
        tag: 'การท่องเที่ยว',
        impact: 'high'
      }
    ]
  },
  {
    id: 'chiangmai',
    name: 'Chiang Mai',
    regionId: 'north',
    regionName: regionTheme.north.label,
    riskScore: 52,
    sentiment: 'positive',
    alertLevel: 'green',
    coverage: 21,
    confidence: 81,
    signals: ['คุณภาพอากาศดีขึ้น', 'ท่องเที่ยวเชิงวัฒนธรรม', 'โครงการชุมชนปลอดภัย'],
    lastUpdated: '2026-04-07T09:20:00.000Z',
    topStories: [
      {
        id: 'cm-1',
        title: 'เทศบาลเปิดแผนจัดการหมอกควันเชิงรุกก่อนฤดูแล้ง',
        source: 'Northern News',
        url: 'https://news.example.com/cm/1',
        publishedAt: '2026-04-07T07:15:00.000Z',
        tag: 'สิ่งแวดล้อม',
        impact: 'low'
      },
      {
        id: 'cm-2',
        title: 'ชุมชนท่องเที่ยวรับนักเดินทางเพิ่มขึ้นจากกิจกรรมวัฒนธรรมฤดูร้อน',
        source: 'Culture Wire',
        url: 'https://news.example.com/cm/2',
        publishedAt: '2026-04-07T05:40:00.000Z',
        tag: 'การท่องเที่ยว',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'chonburi',
    name: 'Chonburi',
    regionId: 'east',
    regionName: regionTheme.east.label,
    riskScore: 61,
    sentiment: 'mixed',
    alertLevel: 'amber',
    coverage: 27,
    confidence: 78,
    signals: ['โลจิสติกส์ท่าเรือ', 'การจ้างงานอุตสาหกรรม', 'ความเสี่ยงอุบัติเหตุทางถนน'],
    lastUpdated: '2026-04-07T08:55:00.000Z',
    topStories: [
      {
        id: 'cb-1',
        title: 'ท่าเรือแหลมฉบังขยายระบบตรวจสอบความปลอดภัยสินค้า',
        source: 'Eastern Economic',
        url: 'https://news.example.com/cb/1',
        publishedAt: '2026-04-07T06:50:00.000Z',
        tag: 'เศรษฐกิจ',
        impact: 'medium'
      },
      {
        id: 'cb-2',
        title: 'หน่วยงานท้องถิ่นเข้มงวดมาตรการจราจรช่วงวันหยุดยาว',
        source: 'Road Safety Watch',
        url: 'https://news.example.com/cb/2',
        publishedAt: '2026-04-07T04:20:00.000Z',
        tag: 'ความปลอดภัยสาธารณะ',
        impact: 'high'
      }
    ]
  },
  {
    id: 'khonkaen',
    name: 'Khon Kaen',
    regionId: 'northeast',
    regionName: regionTheme.northeast.label,
    riskScore: 58,
    sentiment: 'mixed',
    alertLevel: 'amber',
    coverage: 19,
    confidence: 74,
    signals: ['โครงข่ายรถไฟรางคู่', 'ราคาสินค้าเกษตร', 'แผนรับมือฝนทิ้งช่วง'],
    lastUpdated: '2026-04-07T08:30:00.000Z',
    topStories: [
      {
        id: 'kk-1',
        title: 'ศูนย์กลางโลจิสติกส์อีสานเตรียมแผนรองรับการขนส่งฤดูกาลใหม่',
        source: 'Isan Focus',
        url: 'https://news.example.com/kk/1',
        publishedAt: '2026-04-07T05:55:00.000Z',
        tag: 'โครงสร้างพื้นฐาน',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'phuket',
    name: 'Phuket',
    regionId: 'south',
    regionName: regionTheme.south.label,
    riskScore: 63,
    sentiment: 'positive',
    alertLevel: 'amber',
    coverage: 24,
    confidence: 82,
    signals: ['อุตสาหกรรมท่องเที่ยว', 'การจราจรชายฝั่ง', 'การจัดการน้ำเสีย'],
    lastUpdated: '2026-04-07T09:10:00.000Z',
    topStories: [
      {
        id: 'pk-1',
        title: 'เทศบาลเร่งมาตรการควบคุมการท่องเที่ยวเชิงคุณภาพในพื้นที่ชายฝั่ง',
        source: 'Southern Pulse',
        url: 'https://news.example.com/pk/1',
        publishedAt: '2026-04-07T07:20:00.000Z',
        tag: 'การท่องเที่ยว',
        impact: 'high'
      },
      {
        id: 'pk-2',
        title: 'ชุมชนร่วมเฝ้าระวังคุณภาพน้ำและชายหาดในช่วงฤดูฝน',
        source: 'Coastal Watch',
        url: 'https://news.example.com/pk/2',
        publishedAt: '2026-04-07T05:00:00.000Z',
        tag: 'สิ่งแวดล้อม',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'songkhla',
    name: 'Songkhla',
    regionId: 'south',
    regionName: regionTheme.south.label,
    riskScore: 74,
    sentiment: 'negative',
    alertLevel: 'red',
    coverage: 18,
    confidence: 77,
    signals: ['ความปลอดภัยชายแดน', 'การเดินทางกลางคืน', 'เฝ้าระวังเหตุฉุกเฉิน'],
    lastUpdated: '2026-04-07T08:15:00.000Z',
    topStories: [
      {
        id: 'sk-1',
        title: 'เพิ่มกำลังดูแลความปลอดภัยจุดผ่านแดนและเส้นทางหลัก',
        source: 'Deep South Report',
        url: 'https://news.example.com/sk/1',
        publishedAt: '2026-04-07T06:10:00.000Z',
        tag: 'ความปลอดภัยสาธารณะ',
        impact: 'high'
      }
    ]
  },
  {
    id: 'kanchanaburi',
    name: 'Kanchanaburi',
    regionId: 'west',
    regionName: regionTheme.west.label,
    riskScore: 49,
    sentiment: 'positive',
    alertLevel: 'green',
    coverage: 15,
    confidence: 73,
    signals: ['ท่องเที่ยวธรรมชาติ', 'โครงการชุมชนปลอดภัย', 'ฟื้นตัวเศรษฐกิจท้องถิ่น'],
    lastUpdated: '2026-04-07T07:50:00.000Z',
    topStories: [
      {
        id: 'kn-1',
        title: 'ชุมชนท่องเที่ยวปรับเส้นทางใหม่เพื่อรองรับนักเดินทางฤดูร้อน',
        source: 'Western Lens',
        url: 'https://news.example.com/kn/1',
        publishedAt: '2026-04-07T05:20:00.000Z',
        tag: 'การท่องเที่ยว',
        impact: 'low'
      }
    ]
  }
];

const riskTone = {
  green: {
    label: 'เสถียร',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300'
  },
  amber: {
    label: 'เฝ้าระวัง',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    text: 'text-amber-300'
  },
  red: {
    label: 'เร่งประเมิน',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
    text: 'text-rose-300'
  }
} as const;

const sentimentTone = {
  positive: { label: 'แนวโน้มบวก', icon: <TrendingUp size={14} />, text: 'text-emerald-300' },
  mixed: { label: 'ผสม', icon: <TrendingDown size={14} />, text: 'text-amber-300' },
  negative: { label: 'กดดัน', icon: <ShieldAlert size={14} />, text: 'text-rose-300' }
} as const;

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });

const resolveNewsEndpoint = async (): Promise<string> => {
  if (window.api?.config?.get) {
    try {
      const config = await window.api.config.get();
      if (config.news_api_url) return String(config.news_api_url);
    } catch {
      return '';
    }
  }
  return import.meta.env.VITE_NEWS_API_URL || '';
};

const fetchNewsFromApi = async (): Promise<ProvinceNewsSummary[] | null> => {
  const endpoint = await resolveNewsEndpoint();
  if (!endpoint) return null;

  // Prepared for external API, fallback to mock when endpoint is missing or fails.
  const response = await fetch(endpoint, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to load news');
  return (await response.json()) as ProvinceNewsSummary[];
};

/**
 * Analytics Page - Provincial news briefing for assessment
 */
export const AnalyticsPage = () => {
  const [newsSummaries, setNewsSummaries] = useState<ProvinceNewsSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<RegionId[]>([]);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const apiNews = await fetchNewsFromApi();
      setNewsSummaries(apiNews ?? MOCK_NEWS);
    } catch (error) {
      console.warn('Falling back to mock news data:', error);
      setNewsSummaries(MOCK_NEWS);
    } finally {
      setLastUpdated(new Date());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return newsSummaries
      .filter((item) => (selectedRegions.length ? selectedRegions.includes(item.regionId) : true))
      .filter((item) => (riskFilter === 'all' ? true : item.alertLevel === riskFilter))
      .filter((item) => (!query ? true : item.name.toLowerCase().includes(query)))
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [newsSummaries, searchQuery, selectedRegions, riskFilter]);

  const stats = useMemo(() => {
    if (!newsSummaries.length) {
      return { total: 0, red: 0, amber: 0, green: 0, avgRisk: 0, coverage: 0 };
    }
    const totals = newsSummaries.reduce(
      (acc, item) => {
        acc.total += 1;
        acc.avgRisk += item.riskScore;
        acc.coverage += item.coverage;
        acc[item.alertLevel] += 1;
        return acc;
      },
      { total: 0, red: 0, amber: 0, green: 0, avgRisk: 0, coverage: 0 }
    );
    return {
      ...totals,
      avgRisk: Math.round(totals.avgRisk / totals.total),
      coverage: Math.round(totals.coverage / totals.total)
    };
  }, [newsSummaries]);

  const toggleRegion = (regionId: RegionId) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]
    );
  };

  return (
    <div className="flex-1 bg-[#040507] overflow-y-auto">
      <div
        className="relative mx-auto max-w-7xl px-6 pb-10 pt-10"
        style={{ fontFamily: '"Sora", "Space Grotesk", sans-serif' }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[90px]" />
          <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px]" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
              <Radar size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">Provincial News Briefing</h1>
              <p className="text-sm text-slate-400">สรุปสถานการณ์รายจังหวัดเพื่อการประเมินและเฝ้าระวัง</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
              <Clock3 size={14} />
              {lastUpdated ? lastUpdated.toLocaleTimeString('th-TH') : '--:--'}
            </div>
            <button
              onClick={loadNews}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              รีเฟรช
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Newspaper size={18} />}
            label="จังหวัดที่มีข่าว"
            value={`${stats.total}`}
            hint="ชุดข่าวล่าสุด"
            accent="emerald"
          />
          <SummaryCard
            icon={<AlertTriangle size={18} />}
            label="เร่งประเมิน"
            value={`${stats.red}`}
            hint="ระดับสีแดง"
            accent="rose"
          />
          <SummaryCard
            icon={<CheckCircle2 size={18} />}
            label="เสถียร"
            value={`${stats.green}`}
            hint="ระดับสีเขียว"
            accent="teal"
          />
          <SummaryCard
            icon={<Layers size={18} />}
            label="Coverage เฉลี่ย"
            value={`${stats.coverage}`}
            hint="แหล่งข่าว/จังหวัด"
            accent="amber"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b0f14]/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="ค้นหาจังหวัด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Filter size={14} className="text-slate-500" />
              {Object.entries(regionTheme).map(([regionId, theme]) => (
                <button
                  key={regionId}
                  onClick={() => toggleRegion(regionId as RegionId)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    selectedRegions.includes(regionId as RegionId)
                      ? `${theme.bg} ${theme.text} ${theme.border}`
                      : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
              {(['all', 'green', 'amber', 'red'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setRiskFilter(level)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    riskFilter === level
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {level === 'all' ? 'ทั้งหมด' : riskTone[level].label}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  viewMode === 'cards' ? 'bg-white/15 text-white' : 'text-slate-400'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  viewMode === 'compact' ? 'bg-white/15 text-white' : 'text-slate-400'
                }`}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-slate-400">
              <RefreshCw size={18} className="mr-2 animate-spin" />
              กำลังโหลดสรุปข่าว...
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-slate-400">
              <SlidersHorizontal size={20} className="mb-3" />
              ไม่พบผลลัพธ์ตามตัวกรอง
            </div>
          ) : (
            <div className={viewMode === 'cards' ? 'grid gap-6 md:grid-cols-2' : 'space-y-4'}>
              {filteredNews.map((province) => (
                <ProvinceNewsCard key={province.id} data={province} compact={viewMode === 'compact'} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  accent: 'emerald' | 'rose' | 'teal' | 'amber';
}

const SummaryCard = ({ icon, label, value, hint, accent }: SummaryCardProps) => {
  const accentMap = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300',
    teal: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300'
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${accentMap[accent]} p-4 backdrop-blur`}> 
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-2">{icon}</div>
        <div>
          <div className="text-xs uppercase text-slate-400">{label}</div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
      </div>
    </div>
  );
};

const ProvinceNewsCard = ({ data, compact }: { data: ProvinceNewsSummary; compact?: boolean }) => {
  const region = regionTheme[data.regionId];
  const sentiment = sentimentTone[data.sentiment];
  const risk = riskTone[data.alertLevel];
  const riskWidth = `${Math.min(100, Math.max(0, data.riskScore))}%`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f14]/90 p-5 shadow-[0_22px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100" style={{ background: 'radial-gradient(circle at top, rgba(34,197,94,0.12), transparent 55%)' }} />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{data.name}</h3>
            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${region.bg} ${region.text} ${region.border}`}>
              {data.regionName}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={12} />Coverage {data.coverage} แหล่ง</span>
            <span className="flex items-center gap-1"><Clock3 size={12} />{formatTime(data.lastUpdated)}</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${risk.bg} ${risk.border} ${risk.text}`}>
          {risk.label}
        </div>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Risk Index</span>
          <span className="text-white font-semibold">{data.riskScore}</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500"
            style={{ width: riskWidth }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
        <div className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 ${sentiment.text}`}>
          {sentiment.icon}
          {sentiment.label}
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
          Confidence {data.confidence}%
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.signals.map((signal) => (
          <span key={signal} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
            {signal}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {data.topStories.slice(0, compact ? 1 : 2).map((story) => (
          <div key={story.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{story.title}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span>{story.source}</span>
                  <span>•</span>
                  <span>{story.tag}</span>
                  <span>•</span>
                  <span>{formatTime(story.publishedAt)}</span>
                </div>
              </div>
              <a
                href={story.url}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
