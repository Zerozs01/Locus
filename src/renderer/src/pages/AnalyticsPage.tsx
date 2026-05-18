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
  Clock3,
  ExternalLink,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { regionTheme, type RegionId } from '../data/regionTheme';
import { fetchNews, isValidNewsUrl, openNewsLink, type ProvinceNewsSummary } from '../utils/news';
type Sentiment = 'positive' | 'mixed' | 'negative';
type RiskLevel = ProvinceNewsSummary['alertLevel'];

const riskTone = {
  green: {
    label: 'เสถียร',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300'
  },
  amber: {
    label: 'เฝ้าระวัง',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-300'
  },
  red: {
    label: 'เร่งประเมิน',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-300'
  }
} as const;

const sentimentTone = {
  positive: { label: 'แนวโน้มบวก', icon: <TrendingUp size={14} />, text: 'text-emerald-300' },
  mixed: { label: 'ผสม', icon: <TrendingDown size={14} />, text: 'text-amber-300' },
  negative: { label: 'กดดัน', icon: <ShieldAlert size={14} />, text: 'text-rose-300' }
} as const;

const formatTime = (iso: string) => {
  if (!iso) return 'ไม่ระบุเวลา';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 'ไม่ระบุเวลา';
  return d.toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });
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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<ProvinceNewsSummary['topStories'][0] | null>(null);

  const loadNews = async (force: boolean = false) => {
    setIsLoading(true);
    try {
      const data = await fetchNews(force);
      if (Array.isArray(data)) {
        if (data.length === 0) {
          setNewsSummaries([]);
        } else if ('topStories' in data[0]) {
          setNewsSummaries(data as ProvinceNewsSummary[]);
        } else {
          setNewsSummaries([]);
        }
      }
    } catch (error) {
      console.error('[Analytics] Load news failed', error);
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
        acc.avgRisk += (item.riskScore || 0);
        acc.coverage += (item.coverage || 0);
        const level = item.alertLevel as keyof typeof acc;
        if (acc[level] !== undefined) {
          (acc[level] as number) += 1;
        }
        return acc;
      },
      { total: 0, red: 0, amber: 0, green: 0, avgRisk: 0, coverage: 0 }
    );
    return {
      ...totals,
      avgRisk: totals.total > 0 ? Math.round((totals.avgRisk || 0) / totals.total) : 0,
      coverage: totals.total > 0 ? Math.round((totals.coverage || 0) / totals.total) : 0
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
            {/* <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center"> */}
              {/* <Radar size={24} className="text-white" /> */}
            {/* </div>ี */}
            <div>
              <h1 className="text-3xl font-semibold text-white">Provincial News </h1>
              <p className="text-sm text-slate-400">สรุปสถานการณ์รายจังหวัดเพื่อการประเมินและเฝ้าระวัง</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
              <Clock3 size={14} />
              {lastUpdated ? lastUpdated.toLocaleTimeString('th-TH') : '--:--'}
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === 'cards' ? 'bg-white/20 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  viewMode === 'compact' ? 'bg-white/20 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Compact
              </button>
            </div>
            <button
              onClick={() => loadNews(true)}
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
            accent="blue"
          />
          <SummaryCard
            icon={<AlertTriangle size={18} />}
            label="เร่งประเมิน"
            value={`${stats.red}`}
            hint="ระดับสีแดง"
            accent="purple-pink"
          />
          <SummaryCard
            icon={<CheckCircle2 size={18} />}
            label="เสถียร"
            value={`${stats.green}`}
            hint="ระดับสีเขียว"
            accent="green-yellow"
          />
          <SummaryCard
            icon={<Layers size={18} />}
            label="Coverage เฉลี่ย"
            value={`${stats.coverage}`}
            hint="แหล่งข่าว/จังหวัด"
            accent="yellow-orange"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b0f14]/90 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="ค้นหาข่าวรายจังหวัด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none transition-all"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all ${
                  isFilterMenuOpen || selectedRegions.length > 0 || riskFilter !== 'all'
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Filter size={20} />
                {(selectedRegions.length > 0 || riskFilter !== 'all') && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white shadow-lg">
                    {(selectedRegions.length + (riskFilter !== 'all' ? 1 : 0))}
                  </span>
                )}
              </button>

              {isFilterMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f14] p-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <div className="mb-4">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">ภูมิภาค</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(regionTheme).map(([regionId, theme]) => {
                          const isSelected = selectedRegions.includes(regionId as RegionId);
                          return (
                            <button
                              key={regionId}
                              onClick={() => toggleRegion(regionId as RegionId)}
                              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                                isSelected
                                  ? `${theme.bg} ${theme.text} ${theme.border}`
                                  : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20'
                              }`}
                            >
                              <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? theme.text.replace('text-', 'bg-') : 'bg-slate-600'}`} />
                              {theme.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">ระดับความเสี่ยง</div>
                      <div className="flex flex-wrap gap-2">
                        {(['all', 'green', 'amber', 'red'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setRiskFilter(level)}
                            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                              riskFilter === level
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                                : 'border-white/5 bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {level === 'all' ? 'ทั้งหมด' : riskTone[level].label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(selectedRegions.length > 0 || riskFilter !== 'all') && (
                      <button
                        onClick={() => {
                          setSelectedRegions([]);
                          setRiskFilter('all');
                        }}
                        className="mt-4 w-full rounded-xl border border-rose-500/20 bg-rose-500/10 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/20"
                      >
                        ล้างตัวกรองทั้งหมด
                      </button>
                    )}
                  </div>
                </>
              )}
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
              {filteredNews.map((province, idx) => (
                <ProvinceNewsCard 
                  key={`${province.id}-${idx}`} 
                  data={province} 
                  compact={viewMode === 'compact'} 
                  onViewNews={setSelectedNews}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-black text-white">สรุปข่าว: {selectedNews.title}</h3>
              <button onClick={() => setSelectedNews(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="text-xs text-slate-400 leading-relaxed">{selectedNews.summary || 'ไม่มีเนื้อหาสรุปสำหรับข่าวนี้'}</div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-500">{selectedNews.source} • {new Date(selectedNews.publishedAt).toLocaleDateString('th-TH')}</span>
                <button
                  onClick={() => openNewsLink(selectedNews.url, selectedNews.title)}
                  disabled={!isValidNewsUrl(selectedNews.url) && !selectedNews.title?.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-bold hover:bg-sky-500/30 transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-sky-500/20"
                >
                  อ่านข่าวฉบับเต็ม <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  accent: 'blue' | 'purple-pink' | 'green-yellow' | 'yellow-orange';
}

const SummaryCard = ({ icon, label, value, hint, accent }: SummaryCardProps) => {
  const accentMap = {
    blue: 'from-blue-600/25 to-blue-400/10 border-blue-500/30 text-blue-300',
    'purple-pink': 'from-purple-600/25 to-pink-500/20 border-purple-500/30 text-purple-300',
    'green-yellow': 'from-emerald-600/25 to-yellow-500/20 border-emerald-500/30 text-emerald-300',
    'yellow-orange': 'from-amber-500/30 to-orange-500/20 border-amber-500/30 text-amber-300'
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${accentMap[accent]} p-4 backdrop-blur shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}> 
      <div className="flex items-center gap-3">
        <div className={`rounded-xl bg-white/10 p-2 ${accent === 'blue' ? 'text-blue-200' : accent === 'purple-pink' ? 'text-pink-200' : accent === 'green-yellow' ? 'text-yellow-200' : 'text-orange-200'}`}>{icon}</div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">{label}</div>
          <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
          <div className="text-[11px] font-medium opacity-60">{hint}</div>
        </div>
      </div>
    </div>
  );
};

const ProvinceNewsCard = ({ data, compact, onViewNews }: { data: ProvinceNewsSummary; compact?: boolean; onViewNews?: (news: ProvinceNewsSummary['topStories'][0]) => void; }) => {
  const region = regionTheme[data.regionId] || { 
    bg: 'bg-slate-500/20', 
    text: 'text-slate-300', 
    border: 'border-white/10', 
    label: 'ทั่วไป' 
  };
  const sentiment = sentimentTone[data.sentiment] || { 
    label: 'เสถียร', 
    icon: <RefreshCw size={14} />, 
    text: 'text-slate-400' 
  };
  const risk = riskTone[data.alertLevel] || { 
    label: 'ปกติ', 
    bg: 'bg-white/5', 
    border: 'border-white/10', 
    text: 'text-slate-400' 
  };
  const riskWidth = `${Math.min(100, Math.max(0, data.riskScore))}%`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f14]/90 p-5 shadow-[0_22px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none" style={{ background: 'radial-gradient(circle at top, rgba(34,197,94,0.12), transparent 55%)' }} />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
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
        {data.signals?.map((signal) => (
          <span key={signal} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
            {signal}
          </span>
        )) || <span className="text-[10px] text-slate-600">ไม่มีสัญญาณเตือน</span>}
      </div>

      <div className="relative z-10 mt-5 space-y-3">
        {data.topStories?.slice(0, compact ? 1 : 2).map((story, i) => (
          <div key={`${story.id}-${i}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
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
              {(() => {
                const canOpen = isValidNewsUrl(story.url) || Boolean(story.title?.trim());
                return (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onViewNews) onViewNews(story);
                      }}
                      title="ดูข้อมูลข่าวในแอป"
                      className="rounded-full border border-sky-500/30 bg-sky-500/10 p-2 text-sky-400 hover:bg-sky-500/20 transition-all"
                    >
                      <Layers size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openNewsLink(story.url, story.title);
                      }}
                      disabled={!canOpen}
                      title={canOpen ? 'เปิดข่าวฉบับเต็ม' : 'ไม่มีลิงก์สำหรับข่าวนี้'}
                      className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
