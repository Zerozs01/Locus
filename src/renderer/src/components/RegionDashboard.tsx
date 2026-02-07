import { Region, Province } from '../data/regions';
import { Grid, MapPin, Map as MapIcon, MessageSquare, Coins, Wallet, Utensils, Flower2, Landmark, Music, Shield, ExternalLink, Bus } from 'lucide-react';
import { DetailCard } from './DetailCard';
import { RegionalIntelBar, ClimateStatProps, MobilityStatProps, StabilityStatProps } from './RegionalIntelBar';
import { CachedImage } from './CachedImage';
import { useNavigate } from 'react-router-dom';
import { useMemo, useRef, useEffect } from 'react';
import { regionTheme, type RegionId } from '../data/regionTheme';

// Display names for provinces with long official names (GeoJSON names → Display names)
const provinceDisplayNames: Record<string, string> = {
  'Bangkok Metropolis': 'Bangkok',
  'Phra Nakhon Si Ayutthaya': 'Ayutthaya',
  'Prachuap Khiri Khan': 'Prachuap K.K.',
  'Nakhon Ratchasima': 'Korat',
  'Nong Bua Lam Phu': 'Nong Bua L.P.',
  'Nakhon Si Thammarat': 'Nakhon S.T.',
};

const getDisplayName = (name: string) => provinceDisplayNames[name] || name;

const getRegionTheme = (regionId: string) => regionTheme[regionId as RegionId] || regionTheme.central;

const climateByRegion: Record<string, ClimateStatProps> = {
  north: { value: '24.8°C', trend: '-0.6°C (7d)', tone: 'cool' },
  northeast: { value: '32.6°C', trend: '+0.9°C (7d)', tone: 'warm' },
  central: { value: '34.1°C', trend: '+1.2°C (7d)', tone: 'hot' },
  south: { value: '30.4°C', trend: '+0.3°C (7d)', tone: 'warm' },
  west: { value: '31.2°C', trend: '+0.5°C (7d)', tone: 'warm' },
  east: { value: '32.8°C', trend: '+0.8°C (7d)', tone: 'warm' },
};

const mobilityByRegion: Record<string, MobilityStatProps> = {
  north: { state: 'ไหลเวียนปกติ', subtitle: 'ตามฤดูกาล', tone: 'normal' },
  northeast: { state: 'ไหลเวียนปกติ', subtitle: 'เกษตรกรรม', tone: 'normal' },
  central: { state: 'หนาแน่น', subtitle: 'ศูนย์กลางเมือง', tone: 'congested' },
  south: { state: 'พีคตามฤดูกาล', subtitle: 'ท่องเที่ยว', tone: 'seasonal' },
  west: { state: 'ไหลเวียนปกติ', subtitle: 'การค้าชายแดน', tone: 'normal' },
  east: { state: 'พีคตามฤดูกาล', subtitle: 'อุตสาหกรรม/ท่าเรือ', tone: 'seasonal' },
};

const getStabilityProps = (safetyScore?: number): StabilityStatProps => {
  const score = typeof safetyScore === 'number' && Number.isFinite(safetyScore) ? safetyScore : 80;
  if (score >= 88) return { value: `${score}%`, label: 'เสถียร', tone: 'stable' };
  if (score >= 80) return { value: `${score}%`, label: 'เฝ้าระวัง', tone: 'watch' };
  return { value: `${score}%`, label: 'ผันผวน', tone: 'volatile' };
};

export interface RegionDashboardProps {
  regions: Region[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
  mapMode: 'region' | 'province';
  setMapMode: (mode: 'region' | 'province') => void;
  selectedProvince: Province | null;
  onSelectProvince: (prov: Province) => void;
  onViewProvinceDetail?: (regionId: string, provinceId: string) => void;
  onOpenChat?: (context: { type: 'region' | 'province'; name: string; data: any }) => void;
  loadingProvinceRegionId?: string | null;
}

export const RegionDashboard = ({ 
  regions, 
  selectedRegionId, 
  onSelectRegion, 
  mapMode, 
  setMapMode,
  selectedProvince,
  onSelectProvince,
  onViewProvinceDetail,
  onOpenChat,
  loadingProvinceRegionId
}: RegionDashboardProps) => {
  const navigate = useNavigate();
  const provinceListRef = useRef<HTMLDivElement | null>(null);
  const provinceCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const sortedProvincesByRegion = useMemo(() => {
    const map = new Map<string, Province[]>();
    for (const reg of regions) {
      map.set(reg.id, [...reg.subProvinces].sort((a, b) => a.name.localeCompare(b.name)));
    }
    return map;
  }, [regions]);

  useEffect(() => {
    if (mapMode !== 'province' || !selectedProvince) return;
    const target = provinceCardRefs.current.get(selectedProvince.id);
    if (!target || !provinceListRef.current) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [mapMode, selectedProvince?.id, selectedRegionId, regions]);

  return (
    <section className="flex-[3] bg-[#020305] relative overflow-hidden flex flex-col">
      {regions.map((reg) => {
        const isActive = selectedRegionId === reg.id;
        const climate = climateByRegion[reg.id] || climateByRegion.central;
        const mobility = mobilityByRegion[reg.id] || mobilityByRegion.central;
        const stability = getStabilityProps(reg.safety);
        
        const theme = getRegionTheme(reg.id);
        const hoverStyle = { border: theme.hoverBorder, glow: theme.hoverGlow, text: theme.textHover };
        
        return (
          <div 
            key={reg.id} 
            onClick={() => onSelectRegion(reg.id)} 
            className={`
              group relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-l-4 border-l-transparent border-b border-white/5
              ${isActive ? 'flex-[10] border-l-transparent' : `flex-[1] hover:flex-[1.2] opacity-60 hover:opacity-100 ${hoverStyle.border} ${hoverStyle.glow} hover:shadow-lg`}
            `}
          >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
              <CachedImage loading="lazy" decoding="async" src={reg.image} className={`w-full h-full object-cover transition-transform duration-[1.5s] ${isActive ? 'scale-105' : 'grayscale scale-100 opacity-30'}`} alt={reg.name} />
              <div className={`absolute inset-0 ${isActive ? 'bg-gradient-to-r from-black via-black/95 to-black/50' : 'bg-black/80 hover:bg-black/60 transition-colors'}`}></div>
            </div>

            <div className="absolute inset-0 px-6 pt-6 pb-2 flex flex-col h-full w-full">
               
               {/* Compact Header: Single Line */}
               <div className="flex justify-between items-center relative z-20 border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-baseline gap-3">
                     <h2 className={`font-black uppercase tracking-tighter leading-none transition-all duration-300 ${isActive ? 'text-5xl text-white' : `text-3xl text-slate-400 ${hoverStyle.text}`}`}>{reg.name}</h2>
                     {isActive && (
                       <>
                         <span className="text-xl font-light text-slate-400 tracking-wider uppercase border-l border-white/20 pl-3">{reg.engName}</span>
                         <span className={`text-sm font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 ${reg.color}`}>{reg.code}</span>
                       </>
                     )}
                  </div>
                  {isActive && (
                     <button onClick={(e) => { e.stopPropagation(); setMapMode(mapMode === 'region' ? 'province' : 'region'); }} className={`px-4 py-2 rounded-full border flex items-center gap-2 text-xs font-bold transition-all z-50 ${mapMode === 'province' ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-white/10 border-white/10 text-slate-300 hover:bg-white/20'}`}>
                       {mapMode === 'province' ? <Grid size={14}/> : <MapPin size={14}/>} {mapMode === 'province' ? 'Region Stats' : 'View Provinces'}
                     </button>
                  )}
               </div>

               {/* REGION STATS VIEW (Default) */}
               <div className={`flex-1 overflow-y-auto mt-1 pr-2 transition-all duration-700 ${isActive && mapMode === 'region' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
                  <p className="text-slate-300 font-light leading-relaxed mb-4 max-w-2xl border-l-2 border-white/10 pl-4">{reg.desc}</p>
                  <div className="grid grid-cols-4 gap-3 pb-3">
                     <DetailCard icon={<Coins />} label="Daily Cost" value={reg.stats.dailyCost} sub="Avg/Person" bgClass={reg.gradient} textClass="text-emerald-300" />
                     <DetailCard icon={<Wallet />} label="Monthly" value={reg.stats.monthlyCost} sub="Living Cost" bgClass={reg.gradient} textClass="text-emerald-300" />
                     <DetailCard icon={<Utensils />} label="Signature Food" value={reg.stats.food} sub="Must Try" bgClass={reg.gradient} textClass="text-orange-300" />
                     <DetailCard icon={<Flower2 />} label="Flora" value={reg.stats.flora} sub="Native Plant" bgClass={reg.gradient} textClass="text-rose-300" />
                     <DetailCard icon={<Landmark />} label="Attraction" value={reg.stats.attraction} sub="Top Rated" bgClass={reg.gradient} textClass="text-cyan-300" />
                     <DetailCard icon={<Music />} label="Nightlife" value={reg.stats.nightlife} sub="Hot Zone" bgClass={reg.gradient} textClass="text-purple-300" />
                     <DetailCard icon={<Shield />} label="Safety Index" value={`${reg.safety}%`} sub="Status" bgClass={reg.gradient} textClass={reg.color} />
                  </div>
                  
                  {/* Description & Buttons at Bottom */}
                  <div className="mt-auto">
                     <div className="flex gap-4 pt-4 border-t border-white/10">
                        <button 
                           onClick={(e) => { 
                              e.stopPropagation(); 
                              navigate(`/travel-guide/${reg.id}`);
                           }}
                           className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
                        >
                           <Bus size={16} /> Travel Guide
                        </button>
                        <button 
                           onClick={(e) => { 
                              e.stopPropagation(); 
                              if (onOpenChat) {
                                 onOpenChat({ 
                                    type: 'region', 
                                    name: reg.name, 
                                    data: { 
                                       regionId: reg.id,
                                       regionName: reg.name,
                                       engName: reg.engName,
                                       provinces: reg.subProvinces.map(p => p.name),
                                       stats: reg.stats,
                                       safety: reg.safety
                                    }
                                 });
                              } else {
                                 navigate('/intelligence', { 
                                    state: { 
                                       context: {
                                          type: 'region',
                                          name: reg.name,
                                          regionId: reg.id,
                                          engName: reg.engName,
                                          provinces: reg.subProvinces.map(p => p.name),
                                          stats: reg.stats,
                                          safety: reg.safety
                                       }
                                    }
                                 });
                              }
                           }}
                           className={`flex-1 py-3 ${theme.chatBg} ${theme.chatHover} border ${theme.chatBorder} rounded-xl text-sm font-bold ${theme.chatText} transition-all flex items-center justify-center gap-2`}
                        >
                           <MessageSquare size={16} /> Chat with AI
                        </button>
                     </div>
                     <RegionalIntelBar climate={climate} stability={stability} mobility={mobility} />
                  </div>
               </div>

               {/* PROVINCE GALLERY GRID (3 Columns) - Sorted A-Z with Scroll */}
               <div
                 ref={isActive ? provinceListRef : undefined}
                 className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar mt-2 pr-1 transition-all duration-700 ${isActive && mapMode === 'province' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full h-full'}`}
                 style={{ maxHeight: 'calc(100% - 80px)' }}
               >
                  <div className="grid grid-cols-3 gap-4 pb-7">
                    {isActive && reg.subProvinces.length === 0 && loadingProvinceRegionId === reg.id ? (
                      <div className="col-span-3 text-center text-sm text-slate-500 py-10">
                        กำลังโหลดจังหวัด...
                      </div>
                    ) : (sortedProvincesByRegion.get(reg.id) || reg.subProvinces).map((prov) => {
                       const isSelected = selectedProvince?.id === prov.id;
                        return (
                         <div
                           key={prov.id}
                           ref={(el) => {
                             if (el) {
                               provinceCardRefs.current.set(prov.id, el);
                             } else {
                               provinceCardRefs.current.delete(prov.id);
                             }
                           }}
                           onClick={(e) => {
                             e.stopPropagation();
                             onSelectProvince(prov);
                           }}
                           className={`bg-[#0f1115] border ${isSelected ? 'border-cyan-500' : 'border-white/10'} rounded-xl overflow-hidden group transition-all duration-300 hover:border-cyan-500/50 cursor-pointer`}
                         >
                            <div className="relative h-28 overflow-hidden">
                               <CachedImage loading="lazy" decoding="async" src={prov.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={getDisplayName(prov.name)} />
                               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                               <div className="absolute bottom-2 left-2 right-2">
                                  <h3 className="text-lg font-bold text-white drop-shadow-md">{getDisplayName(prov.name)}</h3>
                               </div>
                            </div>
                            <div className="p-3">
                               <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-2">
                                  <span className="flex items-center gap-1"><MapIcon size={10}/> {prov.dist} อำเภอ</span>
                                  <span className="flex items-center gap-1"><Grid size={10}/> {prov.tam} ตำบล</span>
                                  <span className="flex items-center gap-1">💰 {prov.dailyCost || '300 ฿'}</span>
                                  <span className="flex items-center gap-1">🛡️ {prov.safety || 80}%</span>
                               </div>
                               {isSelected && (
                                  <div className="animate-in slide-in-from-top-2 pt-2 border-t border-white/10">
                                     <button 
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          if (onViewProvinceDetail && selectedRegionId) {
                                            onViewProvinceDetail(selectedRegionId, prov.id);
                                          }
                                        }}
                                        className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 group"
                                     >
                                        View Details
                                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                     </button>
                                  </div>
                               )}
                            </div>
                         </div>
                       );
                    })}
                  </div>
               </div>

            </div>
          </div>
        );
      })}
    </section>
  );
};
