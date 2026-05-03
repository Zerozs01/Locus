import { memo, useState } from 'react';
import { Shield, X, Info, Activity, Globe, Users } from 'lucide-react';
import { SafetyResult } from '../utils/safetyLevel';

interface ThreatMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
  safetyData?: SafetyResult & { 
    provinceResults?: Array<{ 
      name: string; 
      score: number; 
      layers: { surfaceRisk: number; networkRisk: number; coreRisk: number } 
    }> 
  };
  accentHex?: string;
}

export const ThreatMatrixModal = memo(({
  isOpen,
  onClose,
  regionName,
  safetyData,
  accentHex = '#06b6d4'
}: ThreatMatrixModalProps) => {
  if (!isOpen) return null;

  const layers = safetyData?.layers || { surfaceRisk: 0, networkRisk: 0, coreRisk: 0 };
  const provinceResults = safetyData?.provinceResults || [];

  const [activeSourceDetail, setActiveSourceDetail] = useState<string | null>(null);

  const sourceInfo: Record<string, { title: string, sources: string[], description: string }> = {
    surface: {
      title: 'Layer 1: Surface Risk Sources',
      sources: ['AQICN API', 'OpenWeather (PM2.5/Temp)', 'TMD Historical Storm Data'],
      description: 'วิเคราะห์สภาพแวดล้อมปัจจุบันผ่าน API ตรวจสอบคุณภาพอากาศแบบ Real-time และอุณหภูมิสะสม ผสมผสานกับสถิติการเกิดอุทกภัยและวาตภัยย้อนหลัง 10 ปี'
    },
    network: {
      title: 'Layer 2: Network Risk Sources',
      sources: ['ThaiRoads.org (สถิติอุบัติเหตุ)', 'HOS-GIS (พิกัดโรงพยาบาล)', 'Longdo Traffic'],
      description: 'ประเมินความปลอดภัยในการเดินทางโดยอิงจากจุดเสี่ยงอุบัติเหตุสะสม, ระยะห่างจากสถานพยาบาลระดับ A-C และสภาพพื้นผิวถนนจากข้อมูลกรมทางหลวง'
    },
    core: {
      title: 'Layer 3: Core Risk Sources',
      sources: ['National Statistics Office (NSO)', 'Royal Thai Police Stats', 'Conflict Monitoring Hub'],
      description: 'วิเคราะห์ความเสี่ยงเชิงสังคมจากสถิติอาชญากรรมรายจังหวัด, ความหนาแน่นของประชากรต่อตารางกิโลเมตร และดัชนีความเสี่ยงในพื้นที่เฝ้าระวังพิเศษ'
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ 
          background: 'linear-gradient(180deg, #0f1218 0%, #080a0f 100%)',
          borderColor: `${accentHex}33`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${accentHex}10`
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <div className="flex items-center gap-4">
            <div 
              className="flex h-12 w-12 items-center justify-center rounded-2xl border"
              style={{ background: `${accentHex}15`, borderColor: `${accentHex}40` }}
            >
              <Shield size={24} style={{ color: accentHex }} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Threat Matrix Analysis</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest">{regionName} • Strategic Risk Assessment</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="custom-scrollbar max-h-[80vh] overflow-y-auto p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left Column: Summary & Methodology */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Score Card */}
              <div 
                className="rounded-3xl border p-6 text-center"
                style={{ 
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.05)'
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Regional Safety Score</div>
                <div className="text-6xl font-black mb-1" style={{ color: accentHex }}>
                  {safetyData?.score ?? 0}%
                </div>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{ 
                    background: `${accentHex}20`, 
                    color: accentHex,
                    border: `1px solid ${accentHex}30`
                  }}
                >
                  Status: {safetyData?.statusLabel || 'Stable'}
                </div>
              </div>

              {/* Layer Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Methodology Layers (Risk %)</h3>
                  <button className="text-white/20 hover:text-white/60 transition-colors">
                    <Info size={12} />
                  </button>
                </div>
                
                {/* Layer 1 */}
                <div className="space-y-3">
                  <div 
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${activeSourceDetail === 'surface' ? 'bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/20' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}
                    onClick={() => setActiveSourceDetail(activeSourceDetail === 'surface' ? null : 'surface')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Layer 1: Surface Risk (30%)</span>
                        <Info size={10} className={activeSourceDetail === 'surface' ? 'text-cyan-400' : 'text-white/20'} />
                      </div>
                      <span className="text-xs font-bold text-white">{layers.surfaceRisk}/100</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-1000" style={{ width: `${layers.surfaceRisk}%` }} />
                    </div>
                    <p className="mt-2 text-[9px] text-white/40 leading-relaxed italic truncate">PM2.5, Heat index, Flood/Storm probability.</p>
                  </div>

                  {activeSourceDetail === 'surface' && (
                    <div className="animate-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/[0.03] border border-cyan-500/20 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{sourceInfo.surface.title}</h4>
                        <X size={14} className="text-white/30 cursor-pointer" onClick={() => setActiveSourceDetail(null)} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[11px] leading-relaxed text-white/60">{sourceInfo.surface.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {sourceInfo.surface.sources.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-white/50 border border-white/5 font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Layer 2 */}
                <div className="space-y-3">
                  <div 
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${activeSourceDetail === 'network' ? 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}
                    onClick={() => setActiveSourceDetail(activeSourceDetail === 'network' ? null : 'network')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Layer 2: Network Risk (40%)</span>
                        <Info size={10} className={activeSourceDetail === 'network' ? 'text-amber-400' : 'text-white/20'} />
                      </div>
                      <span className="text-xs font-bold text-white">{layers.networkRisk}/100</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${layers.networkRisk}%` }} />
                    </div>
                    <p className="mt-2 text-[9px] text-white/40 leading-relaxed italic truncate">Traffic accidents, Hospital reach, Road conditions.</p>
                  </div>

                  {activeSourceDetail === 'network' && (
                    <div className="animate-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/[0.03] border border-amber-500/20 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{sourceInfo.network.title}</h4>
                        <X size={14} className="text-white/30 cursor-pointer" onClick={() => setActiveSourceDetail(null)} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[11px] leading-relaxed text-white/60">{sourceInfo.network.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {sourceInfo.network.sources.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-white/50 border border-white/5 font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Layer 3 */}
                <div className="space-y-3">
                  <div 
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${activeSourceDetail === 'core' ? 'bg-rose-500/10 border-rose-500/30 ring-1 ring-rose-500/20' : 'bg-white/5 border-white/5 hover:bg-white/[0.08]'}`}
                    onClick={() => setActiveSourceDetail(activeSourceDetail === 'core' ? null : 'core')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Layer 3: Core Risk (30%)</span>
                        <Info size={10} className={activeSourceDetail === 'core' ? 'text-rose-400' : 'text-white/20'} />
                      </div>
                      <span className="text-xs font-bold text-white">{layers.coreRisk}/100</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 transition-all duration-1000" style={{ width: `${layers.coreRisk}%` }} />
                    </div>
                    <p className="mt-2 text-[9px] text-white/40 leading-relaxed italic truncate">Crime rates, Crowd density, Conflict zones.</p>
                  </div>

                  {activeSourceDetail === 'core' && (
                    <div className="animate-in slide-in-from-top-2 duration-300 rounded-2xl bg-white/[0.03] border border-rose-500/20 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{sourceInfo.core.title}</h4>
                        <X size={14} className="text-white/30 cursor-pointer" onClick={() => setActiveSourceDetail(null)} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[11px] leading-relaxed text-white/60">{sourceInfo.core.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {sourceInfo.core.sources.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-white/50 border border-white/5 font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 p-4 border border-white/5 flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Info size={12} className="text-white/60" />
                </div>
                <div className="text-[9px] leading-relaxed text-white/40 italic">
                  Formula: 100 - (S×0.3 + N×0.4 + C×0.3)
                </div>
              </div>
            </div>

            {/* Right Column: Province Breakdown */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Provincial Data Breakdown (Risk Index)</h3>
                <div className="flex items-center gap-1 text-[9px] text-white/20">
                  <span>Sorted by Regional Context</span>
                  <Info size={10} />
                </div>
              </div>
              
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 uppercase tracking-wider text-white/40">
                      <th className="px-5 py-3 font-bold">Province</th>
                      <th className="px-5 py-3 font-bold text-center">Surface</th>
                      <th className="px-5 py-3 font-bold text-center">Network</th>
                      <th className="px-5 py-3 font-bold text-center">Core</th>
                      <th className="px-5 py-3 font-bold text-right">Final</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {provinceResults.map((p, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 py-3 font-bold text-white">{p.name}</td>
                        <td className="px-5 py-3 text-center text-cyan-400/80">{p.layers.surfaceRisk}</td>
                        <td className="px-5 py-3 text-center text-amber-400/80">{p.layers.networkRisk}</td>
                        <td className="px-5 py-3 text-center text-rose-400/80">{p.layers.coreRisk}</td>
                        <td className="px-5 py-3 text-right">
                          <span className="font-black" style={{ color: p.score >= 80 ? '#22c55e' : p.score >= 50 ? '#f59e0b' : '#ef4444' }}>
                            {p.score}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {provinceResults.length === 0 && (
                <div className="py-10 text-center text-white/20 italic">No provincial data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
