import { memo, useMemo, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, Shield, Star, X, Info } from 'lucide-react';
import { evaluateBestSeason, toRadarData, type MonthScore, type SeasonEvaluation } from '../utils/bestSeason';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface TacticalSeasonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  regionId: string;
  regionName: string;
  /** Accent hex color from region theme */
  accentHex?: string;
  /** Live AQI to adjust current month */
  currentAqi?: number;
  /** Live temperature to adjust current month */
  currentTemp?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getCompositeColor = (composite: number): string => {
  if (composite >= 80) return '#22c55e';
  if (composite >= 70) return '#84cc16';
  if (composite >= 55) return '#f59e0b';
  if (composite >= 40) return '#f97316';
  return '#ef4444';
};

const getAxisColor = (value: number): string => {
  if (value >= 80) return '#22c55e';
  if (value >= 60) return '#84cc16';
  if (value >= 40) return '#f59e0b';
  return '#ef4444';
};

// ─── Component ──────────────────────────────────────────────────────────────────

export const TacticalSeasonPopup = memo(({
  isOpen,
  onClose,
  regionId,
  regionName,
  accentHex = '#06b6d4',
  currentAqi,
  currentTemp,
}: TacticalSeasonPopupProps) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
  const [showInfo, setShowInfo] = useState(false);
  const [activeMetricDetail, setActiveMetricDetail] = useState<'weather' | 'logistics' | 'quietness' | null>(null);

  const evaluation: SeasonEvaluation = useMemo(
    () => evaluateBestSeason(regionId, { currentAqi, currentTemp }),
    [regionId, currentAqi, currentTemp]
  );

  const selectedMonth: MonthScore = evaluation.months[selectedMonthIndex];
  const radarData = useMemo(() => toRadarData(selectedMonth), [selectedMonth]);

  const currentMonthIdx = new Date().getMonth();

  if (!isOpen) return null;

  const handlePrev = () => setSelectedMonthIndex((prev) => (prev - 1 + 12) % 12);
  const handleNext = () => setSelectedMonthIndex((prev) => (prev + 1) % 12);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.6)' }}
    >
      <div
        className="relative mx-4 max-h-[92vh] w-full max-w-[600px] overflow-hidden rounded-3xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, rgba(16, 18, 24, 0.99) 0%, rgba(8, 10, 14, 1) 100%)',
          borderColor: `${accentHex}22`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 60px ${accentHex}10`,
        }}
      >
        {/* Header */}
        <div
          className="relative border-b px-6 py-5"
          style={{ borderColor: `${accentHex}18` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: `${accentHex}88` }}>
                <Calendar size={12} />
                Tactical Season Analysis
              </div>
              <h2 className="mt-1 text-xl font-black text-white">{regionName}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowInfo(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:bg-white/10 hover:text-cyan-400"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                title="Data Sources & Logic"
              >
                <Info size={16} className="text-white/60 hover:text-current transition-colors" />
              </button>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:bg-white/10 hover:text-red-400"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <X size={16} className="text-white/60 hover:text-current transition-colors" />
              </button>
            </div>
          </div>

          {/* Recommended Season Badge */}
          <div
            className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2"
            style={{
              background: `linear-gradient(135deg, ${accentHex}08 0%, rgba(34,197,94,0.06) 100%)`,
              borderColor: 'rgba(34,197,94,0.2)',
            }}
          >
            <Star size={14} className="text-green-400" />
            <span className="text-xs font-semibold text-green-400">
              Recommended: {evaluation.seasonLabel}
            </span>
            <span className="ml-auto text-[10px] text-white/40">{evaluation.seasonLabelTh}</span>
          </div>
        </div>

        {/* Month Selector (scrollable pill bar) */}
        <div className="flex items-center gap-1 border-b px-4 py-3" style={{ borderColor: `${accentHex}10` }}>
          <button onClick={handlePrev} className="shrink-0 rounded-full p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <div className="flex flex-1 gap-1 overflow-x-auto scrollbar-hide">
            {evaluation.months.map((m, idx) => {
              const isSelected = idx === selectedMonthIndex;
              const isCurrent = idx === currentMonthIdx;
              const isRec = m.isRecommended;

              return (
                <button
                  key={m.month}
                  onClick={() => setSelectedMonthIndex(idx)}
                  className={`
                    relative shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all duration-200
                    ${isSelected
                      ? 'text-white shadow-lg'
                      : isRec
                        ? 'text-green-400/80 hover:text-green-300'
                        : 'text-white/40 hover:text-white/70'
                    }
                  `}
                  style={isSelected ? {
                    background: `linear-gradient(135deg, ${accentHex}40 0%, ${accentHex}20 100%)`,
                    boxShadow: `0 4px 12px ${accentHex}20`,
                  } : undefined}
                >
                  {MONTH_SHORT[idx]}
                  {isCurrent && (
                    <span
                      className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                      style={{ background: accentHex }}
                    />
                  )}
                  {isRec && !isSelected && (
                    <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-400" />
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={handleNext} className="shrink-0 rounded-full p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Radar Chart */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedMonth.monthName}</h3>
              <p className="text-[10px] text-white/40">3-Axis Tactical Assessment</p>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background: `${getCompositeColor(selectedMonth.composite)}18`,
                color: getCompositeColor(selectedMonth.composite),
                border: `1px solid ${getCompositeColor(selectedMonth.composite)}30`,
              }}
            >
              <Shield size={12} />
              {selectedMonth.composite}%
              {selectedMonth.isRecommended && (
                <Star size={10} className="ml-0.5" fill="currentColor" />
              )}
            </div>
          </div>

          {/* Metric Detail Overlay (Context-aware explanation) */}
          <div className="relative">
            <div className="mx-auto" style={{ height: 240, maxWidth: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8 }}
                  axisLine={false}
                  tickCount={5}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke={accentHex}
                  fill={accentHex}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  animationDuration={400}
                  animationEasing="ease-out"
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(12, 14, 18, 0.95)',
                    border: `1px solid ${accentHex}30`,
                    borderRadius: 8,
                    fontSize: 12,
                    color: '#fff',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4)`,
                  }}
                  formatter={(value: unknown) => [`${value}%`, 'Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {activeMetricDetail && (
            <div 
              className="absolute inset-0 z-10 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200"
              style={{ background: 'rgba(8, 10, 14, 0.85)', backdropFilter: 'blur(4px)' }}
            >
              <div 
                className="w-full rounded-2xl border p-5 shadow-2xl"
                style={{ 
                  background: 'linear-gradient(145deg, #161a22 0%, #0c0e14 100%)',
                  borderColor: `${accentHex}33`
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      {activeMetricDetail === 'weather' && <span className="text-lg">🌤</span>}
                      {activeMetricDetail === 'logistics' && <span className="text-lg">🛣️</span>}
                      {activeMetricDetail === 'quietness' && <span className="text-lg">🧘</span>}
                    </div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                      {activeMetricDetail === 'weather' && 'Weather Stability Detail'}
                      {activeMetricDetail === 'logistics' && 'Logistics Safety Detail'}
                      {activeMetricDetail === 'quietness' && 'Quietness Analysis'}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setActiveMetricDetail(null)}
                    className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X size={14} className="text-white/40" />
                  </button>
                </div>
                
                <div className="space-y-3 text-[11px] leading-relaxed text-white/70">
                  {activeMetricDetail === 'weather' && (
                    <>
                      <p>ประเมินจาก <span className="text-white font-bold">สถิติภูมิอากาศรายเดือน</span> ของ {regionName} โดยเน้นความถี่ของหย่อมความกดอากาศต่ำและปริมาณน้ำฝนสะสม</p>
                      <div className="rounded-lg bg-black/30 p-2 border border-white/5">
                        <span className="text-cyan-400 font-bold">Data Source:</span> Thai Meteorological Department (TMD)
                      </div>
                      <p className="opacity-80 italic">* ในเดือน {selectedMonth.monthName} นี้ คะแนน {selectedMonth.weatherStability}/100 สะท้อนถึง{selectedMonth.weatherStability > 70 ? 'ความมั่นคงทางอากาศสูง เหมาะแก่การเคลื่อนพล' : 'ความผันผวนของสภาพอากาศที่อาจส่งผลต่อทัศนวิสัย'}</p>
                    </>
                  )}
                  {activeMetricDetail === 'logistics' && (
                    <>
                      <p>วิเคราะห์ <span className="text-white font-bold">ความลื่นไหลของการจราจร</span> และสถิติอุบัติเหตุรายเดือน รวมถึงความหนาแน่นของรถยนต์บนทางหลวงสายหลัก</p>
                      <div className="rounded-lg bg-black/30 p-2 border border-white/5">
                        <span className="text-cyan-400 font-bold">Data Source:</span> Longdo Traffic & Road Safety Thailand (OTD)
                      </div>
                      <p className="opacity-80 italic">* ปัจจัยเสี่ยงหลักในเดือนนี้คือ {selectedMonth.logisticalSafety < 60 ? 'ช่วงเทศกาลหรือวันหยุดยาวที่มีปริมาณรถหนาแน่น' : 'เส้นทางส่วนใหญ่อยู่ในสภาวะปกติ ความเสี่ยงต่ำ'}</p>
                    </>
                  )}
                  {activeMetricDetail === 'quietness' && (
                    <>
                      <p>ประเมินจาก <span className="text-white font-bold">ความหนาแน่นของประชากรและนักท่องเที่ยว</span> โดยให้คะแนนสูงสุดในช่วง Shoulder Season เพื่อความคล่องตัวสูงสุด</p>
                      <div className="rounded-lg bg-black/30 p-2 border border-white/5">
                        <span className="text-cyan-400 font-bold">Data Source:</span> Tourism Authority of Thailand (TAT) Stats
                      </div>
                      <p className="opacity-80 italic">* เป้าหมายคือการหลีกเลี่ยงจุดปะทะและความแออัด เพื่อเพิ่มประสิทธิภาพในการเข้าถึงทรัพยากรในพื้นที่</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Axis Breakdown Cards */}
        <div className="grid grid-cols-3 gap-2 px-6 pb-2">
          {[
            { id: 'weather' as const, label: 'Weather', emoji: '🌤', value: selectedMonth.weatherStability },
            { id: 'logistics' as const, label: 'Logistics', emoji: '🛣️', value: selectedMonth.logisticalSafety },
            { id: 'quietness' as const, label: 'Quietness', emoji: '🧘', value: selectedMonth.quietness },
          ].map((item) => {
            const isActive = activeMetricDetail === item.id;
            return (
              <div
                key={item.label}
                onClick={() => setActiveMetricDetail(isActive ? null : item.id)}
                className={`relative cursor-pointer rounded-xl border p-3 text-center transition-all hover:scale-[1.02] active:scale-95 ${isActive ? 'ring-2 ring-inset' : ''}`}
                style={{
                  background: isActive 
                    ? `linear-gradient(180deg, ${accentHex}20 0%, ${accentHex}10 100%)`
                    : 'linear-gradient(180deg, rgba(20,22,28,0.95) 0%, rgba(12,14,18,0.98) 100%)',
                  borderColor: isActive ? accentHex : `${getAxisColor(item.value)}20`,
                  ringColor: accentHex,
                }}
              >
                <div className="absolute right-1.5 top-1.5 text-white/40 group-hover:text-white/80 transition-colors">
                  <Info size={10} />
                </div>
                <div className="text-lg">{item.emoji}</div>
                <div
                  className="mt-1 text-lg font-black"
                  style={{ color: getAxisColor(item.value) }}
                >
                  {item.value}
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wider text-white/40">
                  {item.label}
                </div>
                {/* Mini bar */}
                <div className="mx-auto mt-1.5 h-1 w-full max-w-[60px] overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, ${getAxisColor(item.value)} 0%, ${getAxisColor(item.value)}60 100%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly Timeline */}
        <div className="px-6 pb-5 pt-2">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Annual Timeline
          </p>
          <div className="flex gap-1">
            {evaluation.months.map((m, idx) => (
              <button
                key={m.month}
                onClick={() => setSelectedMonthIndex(idx)}
                className="group relative flex-1"
                title={`${m.monthName}: ${m.composite}%`}
              >
                <div
                  className="h-6 w-full rounded-sm transition-all duration-200 group-hover:brightness-125"
                  style={{
                    background: getCompositeColor(m.composite),
                    opacity: idx === selectedMonthIndex ? 1 : 0.3 + (m.composite / 100) * 0.5,
                    boxShadow: idx === selectedMonthIndex ? `0 0 8px ${getCompositeColor(m.composite)}60` : undefined,
                  }}
                />
                <span className={`
                  mt-0.5 block text-center text-[7px] font-bold
                  ${idx === selectedMonthIndex ? 'text-white' : 'text-white/25'}
                `}>
                  {MONTH_SHORT[idx].charAt(0)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Overlay */}
        {showInfo && (
          <div className="absolute inset-0 z-50 flex flex-col rounded-3xl bg-[#0a0c10]/95 backdrop-blur-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2 text-cyan-400">
                <Info size={18} />
                <h3 className="text-lg font-bold">แหล่งที่มาของข้อมูล & วิธีการประเมิน</h3>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={16} className="text-white/60" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-300 custom-scrollbar">
              <p className="mb-6 leading-relaxed">
                การประเมิน <strong>Tactical Season</strong> อ้างอิงจากข้อมูลสถิติย้อนหลัง (Historical Data) ของแต่ละภูมิภาค ผสานกับข้อมูล Real-time (ถ้ามี) โดยแบ่งเป็น 3 แกนหลัก:
              </p>
              
              <div className="space-y-5">
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-white">
                    <span className="text-lg">🌤</span> 1. Weather Stability (ความมั่นคงของสภาพอากาศ)
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    <strong>แหล่งข้อมูล:</strong> สถิติภูมิอากาศรายเดือนจากกรมอุตุนิยมวิทยา (อุณหภูมิ, ปริมาณน้ำฝน, โอกาสเกิดอุทกภัย)
                    <br /><strong>การปรับค่าสด:</strong> หากค่า PM2.5 (AQI) หรืออุณหภูมิปัจจุบันพุ่งสูงเกินเกณฑ์ ระบบจะทำการ Penalty (หักคะแนน) แบบ Real-time
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-white">
                    <span className="text-lg">🛣️</span> 2. Logistical Safety (ความปลอดภัยด้านโลจิสติกส์)
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    <strong>แหล่งข้อมูล:</strong> สถิติอุบัติเหตุช่วงเทศกาล, สภาพถนน, และความครอบคลุมของสถานพยาบาล
                    <br /><strong>หลักการ:</strong> แม้อากาศจะดี แต่หากเป็นช่วงเทศกาลที่สถิติอุบัติเหตุพุ่งสูง (เช่น 7 วันอันตราย ปีใหม่/สงกรานต์) คะแนนแกนนี้จะลดลง เพื่อสะท้อนความเสี่ยงในการเดินทางข้ามจังหวัด
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-white">
                    <span className="text-lg">🧘</span> 3. Quietness (ความเงียบสงบ / ไม่แออัด)
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    <strong>แหล่งข้อมูล:</strong> สถิติจำนวนนักท่องเที่ยวรายเดือน
                    <br /><strong>หลักการ:</strong> ให้คะแนนสูงในช่วง "Shoulder Season" (ช่วงรอยต่อฤดูกาล) ซึ่งอากาศยังพอรับได้และคนไม่พลุกพล่าน ช่วยหลีกเลี่ยง Tourist Trap และเพิ่มความคล่องตัวในการปฏิบัติงาน
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
