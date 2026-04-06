import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Navigation2, Search, ExternalLink, MapPin,
  CloudRain, Thermometer, Wind, Utensils,
  Lightbulb, AlertTriangle, Landmark, Fuel, BanknoteIcon,
  Bath, Pill, Hotel, Phone, MessageSquare, MapPinned, X,
  LocateFixed
} from 'lucide-react';
import { regionTheme, type RegionId } from '../../data/regionTheme';
import { toRgba } from '../../utils/color';
import { getProvincePortal, getCurrentSeason } from './data/portalData';
import { regionBriefs } from './data/regionBriefs';
import { calculateTripCost, budgetLabels, type BudgetTier } from './data/regionExpenses';
import { ThailandMap } from '../../components/ThailandMap';

// ====== Province data per region ======
const provincesByRegion: Record<string, string[]> = {
  north: ['Chiang Mai','Chiang Rai','Lampang','Lamphun','Mae Hong Son','Nan','Phayao','Phrae','Uttaradit'],
  northeast: ['Amnat Charoen','Bueng Kan','Buri Ram','Chaiyaphum','Kalasin','Khon Kaen','Loei','Maha Sarakham','Mukdahan','Nakhon Phanom','Nakhon Ratchasima','Nong Bua Lam Phu','Nong Khai','Roi Et','Sakon Nakhon','Si Sa Ket','Surin','Ubon Ratchathani','Udon Thani','Yasothon'],
  central: ['Ang Thong','Bangkok Metropolis','Chai Nat','Kamphaeng Phet','Lop Buri','Nakhon Nayok','Nakhon Pathom','Nakhon Sawan','Nonthaburi','Pathum Thani','Phetchabun','Phichit','Phitsanulok','Phra Nakhon Si Ayutthaya','Samut Prakan','Samut Sakhon','Samut Songkhram','Saraburi','Sing Buri','Sukhothai','Suphan Buri','Uthai Thani'],
  west: ['Kanchanaburi','Phetchaburi','Prachuap Khiri Khan','Ratchaburi','Tak'],
  east: ['Chachoengsao','Chanthaburi','Chon Buri','Prachin Buri','Rayong','Sa Kaeo','Trat'],
  south: ['Chumphon','Krabi','Nakhon Si Thammarat','Narathiwat','Pattani','Phangnga','Phatthalung','Phuket','Ranong','Satun','Songkhla','Surat Thani','Trang','Yala'],
};

// Province → Region reverse lookup
const provinceToRegion: Record<string, string> = {};
Object.entries(provincesByRegion).forEach(([regionId, provs]) => {
  provs.forEach(p => { provinceToRegion[p] = regionId; });
});

const defaultProvincePerRegion: Record<string, string> = {
  north: 'Chiang Mai', northeast: 'Khon Kaen', central: 'Bangkok Metropolis',
  west: 'Kanchanaburi', east: 'Chon Buri', south: 'Phuket',
};

const provinceThaiNames: Record<string, string> = {
  'Bangkok Metropolis':'กรุงเทพมหานคร','Chiang Mai':'เชียงใหม่','Chiang Rai':'เชียงราย',
  'Lampang':'ลำปาง','Lamphun':'ลำพูน','Mae Hong Son':'แม่ฮ่องสอน','Nan':'น่าน',
  'Phayao':'พะเยา','Phrae':'แพร่','Uttaradit':'อุตรดิตถ์',
  'Khon Kaen':'ขอนแก่น','Nakhon Ratchasima':'นครราชสีมา','Udon Thani':'อุดรธานี',
  'Ubon Ratchathani':'อุบลราชธานี','Buri Ram':'บุรีรัมย์','Surin':'สุรินทร์',
  'Kanchanaburi':'กาญจนบุรี','Ratchaburi':'ราชบุรี','Tak':'ตาก',
  'Phetchaburi':'เพชรบุรี','Prachuap Khiri Khan':'ประจวบคีรีขันธ์',
  'Chon Buri':'ชลบุรี','Rayong':'ระยอง','Chanthaburi':'จันทบุรี','Trat':'ตราด',
  'Phuket':'ภูเก็ต','Surat Thani':'สุราษฎร์ธานี','Songkhla':'สงขลา','Krabi':'กระบี่',
  'Nakhon Pathom':'นครปฐม','Nonthaburi':'นนทบุรี','Pathum Thani':'ปทุมธานี',
  'Samut Prakan':'สมุทรปราการ','Phra Nakhon Si Ayutthaya':'พระนครศรีอยุธยา',
  'Amnat Charoen':'อำนาจเจริญ','Bueng Kan':'บึงกาฬ','Chaiyaphum':'ชัยภูมิ',
  'Kalasin':'กาฬสินธุ์','Loei':'เลย','Maha Sarakham':'มหาสารคาม',
  'Mukdahan':'มุกดาหาร','Nakhon Phanom':'นครพนม','Nong Bua Lam Phu':'หนองบัวลำภู',
  'Nong Khai':'หนองคาย','Roi Et':'ร้อยเอ็ด','Sakon Nakhon':'สกลนคร',
  'Si Sa Ket':'ศรีสะเกษ','Yasothon':'ยโสธร',
  'Ang Thong':'อ่างทอง','Chai Nat':'ชัยนาท','Kamphaeng Phet':'กำแพงเพชร',
  'Lop Buri':'ลพบุรี','Nakhon Nayok':'นครนายก','Nakhon Sawan':'นครสวรรค์',
  'Phetchabun':'เพชรบูรณ์','Phichit':'พิจิตร','Phitsanulok':'พิษณุโลก',
  'Samut Sakhon':'สมุทรสาคร','Samut Songkhram':'สมุทรสงคราม',
  'Saraburi':'สระบุรี','Sing Buri':'สิงห์บุรี','Sukhothai':'สุโขทัย',
  'Suphan Buri':'สุพรรณบุรี','Uthai Thani':'อุทัยธานี',
  'Chachoengsao':'ฉะเชิงเทรา','Prachin Buri':'ปราจีนบุรี','Sa Kaeo':'สระแก้ว',
  'Chumphon':'ชุมพร','Nakhon Si Thammarat':'นครศรีธรรมราช','Narathiwat':'นราธิวาส',
  'Pattani':'ปัตตานี','Phangnga':'พังงา','Phatthalung':'พัทลุง','Ranong':'ระนอง',
  'Satun':'สตูล','Trang':'ตรัง','Yala':'ยะลา',
};

export function TravelGuidePage() {
  const { regionId: paramRegionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  const [activeRegion, setActiveRegion] = useState<string>(paramRegionId || 'central');
  const region = regionTheme[activeRegion as RegionId] || regionTheme.central;
  const brief = regionBriefs[activeRegion as RegionId] || regionBriefs.central;
  const accent = region.accentHex;
  const tone0 = region.toneRamp[0];
  const tone1 = region.toneRamp[1];
  const season = getCurrentSeason();

  // Province
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>(defaultProvincePerRegion[paramRegionId || 'central'] || '');
  const displayName = provinceThaiNames[selectedProvinceName] || selectedProvinceName;

  // Transport tab
  const [activeTransportTab, setActiveTransportTab] = useState('');

  // Search popup
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  // Trip
  const [tripDays, setTripDays] = useState(3);
  const [tripBudget, setTripBudget] = useState<BudgetTier>('mid');

  // Portal data
  const portal = useMemo(() => {
    const pName = displayName.toLowerCase();
    return getProvincePortal(pName === 'กรุงเทพมหานคร' ? 'bangkok' : pName);
  }, [displayName]);

  const costResult = useMemo(() =>
    calculateTripCost(activeRegion as RegionId, tripBudget, tripDays, 1, 0),
    [activeRegion, tripBudget, tripDays]
  );

  // Transport tabs
  const transportTabs = portal.transport.tabs;
  const currentTab = activeTransportTab || transportTabs[0]?.id || '';
  const currentTabCompanies = currentTab === '__others'
    ? (portal.transport.others || [])
    : (portal.transport.companies[currentTab] || []);

  // Province list for dropdown
  const currentProvinces = provincesByRegion[activeRegion] || [];

  // ====== Handlers ======
  const switchToRegion = useCallback((regionId: string, province?: string) => {
    setActiveRegion(regionId);
    setSelectedProvinceName(province || defaultProvincePerRegion[regionId] || '');
    setActiveTransportTab('');
    navigate(`/travel-guide/${regionId}`, { replace: true });
  }, [navigate]);

  const handleMapSelectRegion = useCallback((id: string) => {
    switchToRegion(id);
  }, [switchToRegion]);

  const handleMapSelectProvince = useCallback((name: string) => {
    // If province is in a different region, switch region too
    const provRegion = provinceToRegion[name];
    if (provRegion && provRegion !== activeRegion) {
      switchToRegion(provRegion, name);
    } else {
      setSelectedProvinceName(name);
      setActiveTransportTab('');
    }
  }, [activeRegion, switchToRegion]);

  const handleProvinceDropdown = (provName: string) => {
    setSelectedProvinceName(provName);
    setActiveTransportTab('');
  };

  const warp = (url: string) => {
    if (!url) return;
    if ((window as any).api?.shell?.openExternal) {
      (window as any).api.shell.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  if (!region) {
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

  return (
    <div className="h-full w-full flex-1 min-w-0 flex flex-col bg-[#020305] overflow-hidden">

      {/* ===== HEADER — Region gradient banner ===== */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ background: `linear-gradient(90deg, ${tone0}, ${tone1}, ${accent}88, transparent 85%)` }}>
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all shrink-0">
          <ArrowLeft size={18} />
        </button>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/15 backdrop-blur">
          <Navigation2 size={20} className="text-white" />
        </div>
        <h1 className="text-lg font-black text-white tracking-tight mr-1 shrink-0">Travel Guide</h1>

        {/* Region dropdown */}
        <select value={activeRegion} onChange={(e) => switchToRegion(e.target.value)}
          className="bg-black/30 backdrop-blur border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[120px] cursor-pointer">
          {Object.entries(regionTheme).map(([id, r]) => (
            <option key={id} value={id} className="bg-[#0f1115] text-white">{r.label}</option>
          ))}
        </select>

        {/* Province dropdown — lists all provinces in active region */}
        <select value={selectedProvinceName} onChange={(e) => handleProvinceDropdown(e.target.value)}
          className="bg-black/30 backdrop-blur border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none min-w-[160px] cursor-pointer">
          {currentProvinces.map(p => (
            <option key={p} value={p} className="bg-[#0f1115] text-white">{provinceThaiNames[p] || p}</option>
          ))}
        </select>

        {/* Search */}
        <button onClick={() => setShowSearchPopup(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 backdrop-blur border border-white/20 text-sm text-white/70 hover:text-white hover:bg-black/40 transition-all flex-1 max-w-[260px] justify-start">
          <Search size={16} />
          <span className="truncate">{destText || 'ค้นหาสถานที่ / คำนวณค่าเดินทาง...'}</span>
        </button>

        {/* Season */}
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur border border-white/20 shrink-0">
          <CloudRain size={14} className="text-white/70" />
          <div className="text-xs"><div className="font-bold text-white">{season.label}</div><div className="text-white/50">{season.range}</div></div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: MAP */}
        <div className="w-[300px] shrink-0 border-r flex flex-col" style={{ borderColor: toRgba(accent, 0.1), background: '#050608' }}>
          <div className="flex-1 relative">
            <ThailandMap
              activeId={activeRegion}
              onSelectRegion={handleMapSelectRegion}
              viewMode="province"
              selectedProvince={{ name: selectedProvinceName, id: selectedProvinceName } as any}
              onSelectProvince={() => {}}
              onSelectProvinceByName={handleMapSelectProvince}
            />
          </div>
          <div className="p-3 space-y-1.5 border-t" style={{ borderColor: toRgba(accent, 0.1) }}>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
              <Wind size={13} className="text-cyan-400 shrink-0" />
              <span className="text-[11px] text-slate-400">AQI:</span>
              <span className={`text-sm font-bold ${brief.avgAqi <= 50 ? 'text-emerald-400' : brief.avgAqi <= 100 ? 'text-amber-400' : 'text-red-400'}`}>{brief.avgAqi}</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
              <Thermometer size={13} className="text-amber-400 shrink-0" />
              <span className="text-[11px] text-slate-300 truncate">{brief.climate}</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">ภูมิประเทศ</div>
              <div className="text-[11px] text-slate-300">{brief.terrain}</div>
            </div>
          </div>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">

          {/* ROW 1: Province + Transport Tabs + Cards */}
          <div className="rounded-xl border p-4" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-white">{displayName}</h2>
              <div className="flex gap-1 flex-wrap">
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

            {/* Company cards for active tab */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {currentTabCompanies.map((co, i) => (
                <div key={i} className="rounded-lg border p-3 flex items-center gap-2.5 group hover:border-opacity-80 transition-all"
                  style={{ borderColor: `${co.color}25`, background: `${co.color}08` }}>
                  {/* Logo area — image placeholder or text logo */}
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black shrink-0"
                    style={{ background: `${co.color}18`, color: co.color }}>
                    {co.logoText}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{co.shortName}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-2">{co.description}</div>
                  </div>
                  {/* Warp button */}
                  {co.warpUrl && (
                    <button onClick={() => warp(co.warpUrl)}
                      className="w-8 h-8 rounded-md flex items-center justify-center bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all shrink-0"
                      title={`เปิดเว็บ ${co.shortName}`}>
                      <ExternalLink size={14} />
                    </button>
                  )}
                </div>
              ))}
              {currentTabCompanies.length === 0 && (
                <div className="col-span-full text-center py-6 text-slate-500 text-sm">ไม่มีข้อมูลในหมวดนี้</div>
              )}
            </div>
          </div>

          {/* ROW 2: Environment, Food, Knowledge, Dangers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <DashCard title="Environment" icon={<CloudRain size={14} />} accent={accent}>
              <ul className="space-y-1 text-xs text-slate-300">
                {portal.environment.animals.map((a, i) => <li key={i}>• 🐾 {a}</li>)}
                {portal.environment.plants.map((p, i) => <li key={i}>• 🌱 {p}</li>)}
                <li>• 🌍 {portal.environment.terrain}</li>
                <li>• ☁️ {portal.environment.climate}</li>
              </ul>
            </DashCard>
            <DashCard title="อาหารท้องถิ่น" icon={<Utensils size={14} />} accent={accent}>
              <ul className="space-y-1 text-xs text-slate-300">
                {portal.localFoods.map((f, i) => (
                  <li key={i} className="flex justify-between"><span>• {f.name}</span><span className="text-slate-500 shrink-0 ml-1">{f.priceRange}</span></li>
                ))}
              </ul>
            </DashCard>
            <DashCard title="Knowledge / Tips" icon={<Lightbulb size={14} />} accent={accent}>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {portal.knowledge.map((k, i) => (
                  <li key={i}><div className="font-bold text-white text-[11px]">{k.title}</div><div className="text-slate-400">{k.content}</div></li>
                ))}
              </ul>
            </DashCard>
            <DashCard title="จุดเสี่ยง/อันตราย" icon={<AlertTriangle size={14} />} accent="#ef4444">
              {portal.dangerZones.length > 0 ? (
                <ul className="space-y-1.5 text-xs">
                  {portal.dangerZones.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${d.severity === 'high' ? 'bg-red-500' : d.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <div><span className="text-white font-bold">{d.label}</span><span className="text-slate-400"> — {d.note}</span></div>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-xs text-slate-500">ไม่มีข้อมูล</p>}
            </DashCard>
          </div>

          {/* ROW 3: Supply, Accommodation, Destination */}
          <div className="grid grid-cols-3 gap-3">
            <DashCard title="Supply" icon={<Landmark size={14} />} accent={accent}>
              <div className="grid grid-cols-2 gap-1.5">
                {portal.supply.map((s, i) => {
                  const sIcon = s.type === 'bank' ? <BanknoteIcon size={13} /> : s.type === 'gas' ? <Fuel size={13} /> : s.type === 'toilet' ? <Bath size={13} /> : <Pill size={13} />;
                  return (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-slate-400">{sIcon}</span>
                      <div className="min-w-0"><div className="text-[11px] font-bold text-white truncate">{s.label}</div><div className="text-[10px] text-slate-500 truncate">{s.note}</div></div>
                    </div>
                  );
                })}
              </div>
            </DashCard>
            <DashCard title="ที่พัก" icon={<Hotel size={14} />} accent={accent}>
              <div className="space-y-1.5">
                {portal.accommodation.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 group cursor-pointer hover:bg-white/[0.08] transition-colors"
                    onClick={() => a.bookingUrl && warp(a.bookingUrl)}>
                    <div><div className="text-[11px] font-bold text-white">{a.label}</div><div className="text-[10px] text-slate-500">{a.priceRange}</div></div>
                    {a.bookingUrl && <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors" />}
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Destination + Cost */}
            <div className="rounded-xl border p-3 flex flex-col" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{ color: accent }} /><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ปลายทาง</span>
              </div>
              {destText ? (
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-black text-white">{destText}</div>
                  {costResult && (
                    <>
                      <div className="text-lg font-black" style={{ color: accent }}>฿{costResult.totalPerPerson.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">{budgetLabels[tripBudget]} • {tripDays} วัน</div>
                      <div className="flex gap-1">
                        {(['budget','mid','luxury'] as BudgetTier[]).map(t => (
                          <button key={t} onClick={() => setTripBudget(t)}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${tripBudget === t ? 'text-black' : 'text-slate-400 bg-white/5'}`}
                            style={tripBudget === t ? { background: accent } : {}}>{budgetLabels[t]}</button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowSearchPopup(true)} className="flex-1 flex items-center justify-center text-slate-500 text-xs hover:text-white transition-colors cursor-pointer">
                  <Search size={14} className="mr-1" /> กดเพื่อค้นหาปลายทาง
                </button>
              )}
              <button onClick={() => navigate('/intelligence')} className="mt-2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:brightness-110" style={{ background: accent }}>
                <MessageSquare size={14} /> Chat with AI
              </button>
            </div>
          </div>

          {/* Emergency */}
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

      {/* ===== SEARCH POPUP ===== */}
      {showSearchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSearchPopup(false)}>
          <div className="w-full max-w-lg rounded-2xl border p-6 space-y-4" style={{ borderColor: toRgba(accent, 0.2), background: '#0f1115' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2"><MapPinned size={20} style={{ color: accent }} /> คำนวณการเดินทาง</h3>
              <button onClick={() => setShowSearchPopup(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500 mb-1.5 block">ต้นทาง</label>
              <div className="flex gap-2">
                <button onClick={() => { setUseCurrentLocation(true); setOriginText(''); }}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold border transition-all shrink-0 ${useCurrentLocation ? 'text-black' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
                  style={useCurrentLocation ? { background: accent, borderColor: accent } : {}}>
                  <LocateFixed size={14} /> ตำแหน่งปัจจุบัน
                </button>
                <input type="text" value={originText} onChange={e => { setOriginText(e.target.value); setUseCurrentLocation(false); }}
                  placeholder="หรือพิมพ์ชื่อสถานที่..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-500 mb-1.5 block">ปลายทาง</label>
              <input type="text" value={destText} onChange={e => setDestText(e.target.value)}
                placeholder="พิมพ์จังหวัด, สถานที่, สถานี..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs uppercase tracking-wider text-slate-500 mb-1.5 block">จำนวนวัน</label>
                <input type="number" min={1} max={30} value={tripDays} onChange={e => setTripDays(Math.max(1,Number(e.target.value)))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none" />
              </div>
              <div className="flex-1">
                <label className="text-xs uppercase tracking-wider text-slate-500 mb-1.5 block">ระดับงบ</label>
                <div className="flex rounded-lg border border-white/10 overflow-hidden">
                  {(['budget','mid','luxury'] as BudgetTier[]).map(t => (
                    <button key={t} onClick={() => setTripBudget(t)}
                      className={`flex-1 px-2 py-2.5 text-xs font-bold transition-all ${tripBudget === t ? 'text-black' : 'text-slate-400 bg-white/5 hover:text-white'}`}
                      style={tripBudget === t ? { background: accent } : {}}>{budgetLabels[t]}</button>
                  ))}
                </div>
              </div>
            </div>
            {destText && costResult && (
              <div className="rounded-xl border p-4 flex items-center justify-between" style={{ borderColor: toRgba(accent, 0.2), background: toRgba(accent, 0.05) }}>
                <div>
                  <div className="text-xs text-slate-400">ค่าใช้จ่ายโดยประมาณ</div>
                  <div className="text-2xl font-black" style={{ color: accent }}>฿{costResult.totalPerPerson.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500">{budgetLabels[tripBudget]} • {tripDays} วัน • ต่อคน</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">ต่อวัน</div>
                  <div className="text-lg font-bold text-white">฿{costResult.perDay.toLocaleString()}</div>
                </div>
              </div>
            )}
            <button onClick={() => setShowSearchPopup(false)} className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110" style={{ background: accent }}>ตกลง</button>
          </div>
        </div>
      )}
    </div>
  );
}

function DashCard({ title, icon, accent, children }: { title: string; icon: React.ReactNode; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-3 flex flex-col" style={{ borderColor: toRgba(accent, 0.12), background: 'rgba(15,17,21,0.8)' }}>
      <div className="flex items-center gap-2 mb-2"><span style={{ color: accent }}>{icon}</span><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span></div>
      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[180px]">{children}</div>
    </div>
  );
}
