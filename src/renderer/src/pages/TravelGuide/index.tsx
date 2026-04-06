import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer, Wind, Utensils,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, Pill, Hotel, Phone, MessageSquare
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason, type TransportCompany } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { calculateTripCost, budgetLabels, type BudgetTier } from './data/regionExpenses';

export function TravelGuidePage() {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  const region = regionId ? regionTheme[regionId as RegionId] : null;
  const brief = regionId ? regionBriefs[regionId as RegionId] : null;
  const accent = region?.accentHex || '#3b82f6';
  const season = getCurrentSeason();

  // State
  const [selectedProvince, setSelectedProvince] = useState('');
  const [destination, setDestination] = useState('');
  const [activeTransportTab, setActiveTransportTab] = useState('');
  const [tripDays] = useState(3);
  const [tripBudget, setTripBudget] = useState<BudgetTier>('mid');

  // Derived
  const portal = useMemo(() => getProvincePortal(selectedProvince || ''), [selectedProvince]);
  const costResult = useMemo(() => {
    if (!regionId) return null;
    return calculateTripCost(regionId as RegionId, tripBudget, tripDays, 1, 0);
  }, [regionId, tripBudget, tripDays]);

  // Set default transport tab
  const transportTabs = portal.transport.tabs;
  const currentTab = activeTransportTab || transportTabs[0]?.id || '';

  if (!region || !regionId || !brief) {
    return (
      <div className="h-full flex items-center justify-center bg-[#020305]">
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-4 text-slate-500" />
          <p className="text-slate-400 text-lg">ไม่พบข้อมูลภาค</p>
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">กลับหน้าหลัก</button>
        </div>
      </div>
    );
  }

  // ====== Open external URL ======
  const warp = (url: string) => {
    if (!url) return;
    if ((window as any).api?.shell?.openExternal) {
      (window as any).api.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden">

      {/* ===== TOP BAR ===== */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: toRgba(accent, 0.15), background: `linear-gradient(90deg, ${toRgba(accent, 0.08)}, transparent)` }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: accent }}>
          <Navigation2 size={20} className="text-white" />
        </div>
        <h1 className="text-lg font-black text-white tracking-tight mr-2 shrink-0">Travel Guide</h1>

        {/* Dropdowns */}
        <select value={regionId} onChange={(e) => navigate(`/travel-guide/${e.target.value}`)}
          className="bg-white/5 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[140px]"
          style={{ borderColor: toRgba(accent, 0.3) }}>
          {Object.entries(regionTheme).map(([id, r]) => (
            <option key={id} value={id} className="bg-[#0f1115] text-white">{r.label}</option>
          ))}
        </select>

        <select value={selectedProvince} onChange={(e) => { setSelectedProvince(e.target.value); setActiveTransportTab(''); }}
          className="bg-white/5 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[160px]"
          style={{ borderColor: toRgba(accent, 0.3) }}>
          <option value="" className="bg-[#0f1115]">จังหวัด (ทั้งภาค)</option>
          <option value="bangkok" className="bg-[#0f1115]">กรุงเทพมหานคร</option>
        </select>

        <div className="relative flex-1 max-w-[240px]">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)}
            placeholder="สถานที่จะไป..."
            className="w-full bg-white/5 border rounded-lg py-2 pl-8 pr-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            style={{ borderColor: toRgba(accent, 0.2) }} />
        </div>

        {/* Season */}
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg border shrink-0" style={{ borderColor: toRgba(accent, 0.2), background: toRgba(accent, 0.05) }}>
          <CloudRain size={14} style={{ color: accent }} />
          <div className="text-xs">
            <div className="font-bold text-white">Now: {season.label}</div>
            <div className="text-slate-400">{season.range}</div>
          </div>
        </div>
      </div>

      {/* ===== BODY: MAP + DASHBOARD ===== */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: MAP AREA */}
        <div className="w-[340px] shrink-0 border-r flex flex-col" style={{ borderColor: toRgba(accent, 0.08), background: toRgba(accent, 0.02) }}>
          {/* Map placeholder */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: toRgba(accent, 0.2) }}>
                <span className="text-6xl">🗺️</span>
              </div>
              <p className="text-sm font-bold" style={{ color: accent }}>{region.label}</p>
              <p className="text-xs text-slate-500">{region.engLabel} Region</p>
            </div>
          </div>

          {/* Bottom info */}
          <div className="p-3 space-y-2 border-t" style={{ borderColor: toRgba(accent, 0.08) }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <Wind size={14} className="text-cyan-400" />
              <span className="text-xs text-slate-400">AQI:</span>
              <span className={`text-sm font-bold ${brief.avgAqi <= 50 ? 'text-emerald-400' : brief.avgAqi <= 100 ? 'text-amber-400' : 'text-red-400'}`}>{brief.avgAqi}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <Thermometer size={14} className="text-amber-400" />
              <span className="text-xs text-slate-300">{brief.climate}</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">ภูมิประเทศ</div>
              <div className="text-xs text-slate-300">{brief.terrain}</div>
            </div>
          </div>
        </div>

        {/* RIGHT: DASHBOARD GRID */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">

          {/* ROW 1: Province + Transport */}
          <div className="rounded-xl border p-4" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-white">{selectedProvince ? selectedProvince.charAt(0).toUpperCase() + selectedProvince.slice(1) : region.label}</h2>
              <div className="flex gap-1">
                {transportTabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTransportTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === tab.id ? 'text-black' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}
                    style={currentTab === tab.id ? { background: accent } : {}}>
                    {tab.label}
                  </button>
                ))}
                {portal.transport.others && portal.transport.others.length > 0 && (
                  <button onClick={() => setActiveTransportTab('__others')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentTab === '__others' ? 'text-black' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}
                    style={currentTab === '__others' ? { background: accent } : {}}>
                    อื่นๆที่เกี่ยวข้อง
                  </button>
                )}
              </div>
            </div>

            {/* Transport company cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {(currentTab === '__others' ? portal.transport.others || [] : portal.transport.companies[currentTab] || []).map((co, i) => (
                <CompanyCard key={i} company={co} onWarp={warp} />
              ))}
              {((currentTab === '__others' ? portal.transport.others : portal.transport.companies[currentTab]) || []).length === 0 && (
                <div className="col-span-full text-center py-6 text-slate-500 text-sm">ไม่มีข้อมูลในหมวดนี้</div>
              )}
            </div>
          </div>

          {/* ROW 2: Environment, Food, Knowledge, Dangers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Environment */}
            <DashCard title="Environment" icon={<CloudRain size={14} />} accent={accent}>
              <ul className="space-y-1 text-xs text-slate-300">
                {portal.environment.animals.map((a, i) => <li key={i}>• 🐾 {a}</li>)}
                {portal.environment.plants.map((p, i) => <li key={i}>• 🌱 {p}</li>)}
                <li>• 🌍 {portal.environment.terrain}</li>
                <li>• ☁️ {portal.environment.climate}</li>
              </ul>
            </DashCard>

            {/* Local Food */}
            <DashCard title="อาหารท้องถิ่น" icon={<Utensils size={14} />} accent={accent}>
              <ul className="space-y-1 text-xs text-slate-300">
                {portal.localFoods.map((f, i) => (
                  <li key={i} className="flex justify-between">
                    <span>• {f.name}</span>
                    <span className="text-slate-500 shrink-0 ml-1">{f.priceRange}</span>
                  </li>
                ))}
              </ul>
            </DashCard>

            {/* Knowledge */}
            <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent}>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {portal.knowledge.map((k, i) => (
                  <li key={i}>
                    <div className="font-bold text-white text-[11px]">{k.title}</div>
                    <div className="text-slate-400">{k.content}</div>
                  </li>
                ))}
              </ul>
            </DashCard>

            {/* Danger Zones */}
            <DashCard title="จุดเสี่ยง/อันตราย" icon={<AlertTriangle size={14} />} accent="#ef4444">
              {portal.dangerZones.length > 0 ? (
                <ul className="space-y-1.5 text-xs">
                  {portal.dangerZones.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${d.severity === 'high' ? 'bg-red-500' : d.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <div>
                        <span className="text-white font-bold">{d.label}</span>
                        <span className="text-slate-400"> — {d.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">ไม่มีข้อมูล</p>
              )}
            </DashCard>
          </div>

          {/* ROW 3: Supply, Accommodation, Destination Calculator */}
          <div className="grid grid-cols-3 gap-3">
            {/* Supply */}
            <DashCard title="Supply" icon={<Landmark size={14} />} accent={accent}>
              <div className="grid grid-cols-2 gap-1.5">
                {portal.supply.map((s, i) => {
                  const sIcon = s.type === 'bank' ? <BanknoteIcon size={13} /> : s.type === 'gas' ? <Fuel size={13} /> : s.type === 'toilet' ? <Bath size={13} /> : <Pill size={13} />;
                  return (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-400">{sIcon}</span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-white truncate">{s.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{s.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashCard>

            {/* Accommodation */}
            <DashCard title="ที่พัก" icon={<Hotel size={14} />} accent={accent}>
              <div className="space-y-1.5">
                {portal.accommodation.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 group cursor-pointer hover:bg-white/8 transition-colors"
                    onClick={() => a.bookingUrl && warp(a.bookingUrl)}>
                    <div>
                      <div className="text-[11px] font-bold text-white">{a.label}</div>
                      <div className="text-[10px] text-slate-500">{a.priceRange}</div>
                    </div>
                    {a.bookingUrl && <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors" />}
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Destination Calculator + Chat with AI */}
            <div className="rounded-xl border p-3 flex flex-col" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{ color: accent }} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ปลายทาง</span>
              </div>

              {destination ? (
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-black text-white">{destination}</div>
                  {costResult && (
                    <>
                      <div className="text-lg font-black" style={{ color: accent }}>
                        ฿{costResult.totalPerPerson.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">ค่าใช้จ่ายโดยประมาณ ({budgetLabels[tripBudget]}, {tripDays} วัน)</div>
                      <div className="flex gap-1">
                        {(['budget', 'mid', 'luxury'] as BudgetTier[]).map(t => (
                          <button key={t} onClick={() => setTripBudget(t)}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${tripBudget === t ? 'text-black' : 'text-slate-400 bg-white/5'}`}
                            style={tripBudget === t ? { background: accent } : {}}>
                            {budgetLabels[t]}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">พิมพ์สถานที่ด้านบน</div>
              )}

              {/* Chat with AI */}
              <button onClick={() => navigate('/intelligence')}
                className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:brightness-110"
                style={{ background: accent }}>
                <MessageSquare size={14} /> Chat with AI
              </button>
            </div>
          </div>

          {/* ROW 4: Emergency */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5">
            <Phone size={14} className="text-red-400 shrink-0" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wider shrink-0">ฉุกเฉิน</span>
            {portal.emergencyNumbers.map((c, i) => (
              <span key={i} className="text-xs text-slate-300">
                <span className="text-slate-500">{c.label}:</span> <span className="font-bold text-white">{c.number}</span>
                {i < portal.emergencyNumbers.length - 1 && <span className="text-slate-600 mx-1">|</span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ====== Sub-components ======

function CompanyCard({ company, onWarp }: { company: TransportCompany; onWarp: (url: string) => void }) {
  return (
    <div className="rounded-lg border p-3 flex flex-col gap-2 group hover:border-opacity-60 transition-all cursor-pointer"
      style={{ borderColor: `${company.color}22`, background: `${company.color}08` }}
      onClick={() => onWarp(company.warpUrl)}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black" style={{ background: `${company.color}20`, color: company.color }}>
          {company.logoText}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-white truncate">{company.shortName}</div>
          <div className="text-[10px] text-slate-500 truncate">{company.description}</div>
        </div>
      </div>
      {company.warpUrl && (
        <div className="flex items-center gap-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: company.color }}>
          <ExternalLink size={10} /> เปิดเว็บทางการ
        </div>
      )}
    </div>
  );
}

function DashCard({ title, icon, accent, children }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-3 flex flex-col" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: accent }}>{icon}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[180px]">{children}</div>
    </div>
  );
}
