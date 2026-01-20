import { Region, Province } from '../data/regions';
import { Grid, MapPin, Map as MapIcon, Plane, FileText, Coins, Wallet, Utensils, Flower2, Landmark, Music, Shield } from 'lucide-react';
import { DetailCard } from './DetailCard';

interface RegionDashboardProps {
  regions: Region[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
  mapMode: 'region' | 'province';
  setMapMode: (mode: 'region' | 'province') => void;
  selectedProvince: Province | null;
  onSelectProvince: (prov: Province) => void;
}

export const RegionDashboard = ({ 
  regions, 
  selectedRegionId, 
  onSelectRegion, 
  mapMode, 
  setMapMode,
  selectedProvince,
  onSelectProvince 
}: RegionDashboardProps) => {

  return (
    <section className="flex-[3] bg-[#020305] relative overflow-hidden flex flex-col">
      {regions.map((reg) => {
        const isActive = selectedRegionId === reg.id;
        
        return (
          <div 
            key={reg.id} 
            onClick={() => onSelectRegion(reg.id)} 
            className={`
              relative transition-all duration-700 ease-out cursor-pointer overflow-hidden border-b border-white/5 
              ${isActive ? 'flex-[10]' : 'flex-[1] hover:flex-[1.2] opacity-50'}
            `}
          >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img src={reg.image} className={`w-full h-full object-cover transition-transform duration-[1.5s] ${isActive ? 'scale-105' : 'grayscale scale-100'}`} alt={reg.name} />
              <div className={`absolute inset-0 bg-gradient-to-r ${isActive ? `from-black via-black/95 to-black/50` : 'from-black/95 to-black/80'}`}></div>
            </div>

            <div className="absolute inset-0 px-8 pt-8 pb-2 flex flex-col h-full w-full">
               
               {/* Compact Header: Single Line */}
               <div className="flex justify-between items-center relative z-20 border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-baseline gap-3">
                     <h2 className={`font-black uppercase tracking-tighter leading-none transition-all duration-500 ${isActive ? 'text-5xl text-white' : 'text-3xl text-slate-400'}`}>{reg.name}</h2>
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
               <div className={`flex-1 overflow-y-auto mt-2 pr-2 transition-all duration-700 ${isActive && mapMode === 'region' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
                  <p className="text-slate-300 font-light leading-relaxed mb-6 max-w-2xl border-l-2 border-white/10 pl-4">{reg.desc}</p>
                  <div className="grid grid-cols-4 gap-4 pb-6">
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
                        <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2">
                           <Plane size={16} /> Travel Guide
                        </button>
                        <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-bold text-slate-300 transition-all flex items-center justify-center gap-2">
                           <FileText size={16} /> Download PDF
                        </button>
                     </div>
                  </div>
               </div>

               {/* PROVINCE GALLERY GRID (3 Columns) */}
               <div className={`flex-1 overflow-y-auto mt-2 pr-2 transition-all duration-700 ${isActive && mapMode === 'province' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
                  <div className="grid grid-cols-3 gap-4">
                    {reg.subProvinces.map((prov) => {
                       const isSelected = selectedProvince?.id === prov.id;
                       return (
                         <div key={prov.id} onClick={(e) => { e.stopPropagation(); onSelectProvince(prov); }} className={`bg-black/40 backdrop-blur-md border ${isSelected ? 'border-cyan-500' : 'border-white/10'} rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 cursor-pointer`}>
                            <div className="relative h-28 overflow-hidden">
                               <img src={prov.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={prov.name} />
                               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                               <div className="absolute bottom-2 left-2 right-2">
                                  <h3 className="text-lg font-bold text-white drop-shadow-md">{prov.name}</h3>
                               </div>
                            </div>
                            <div className="p-3">
                               <div className="flex justify-between text-[10px] text-slate-400 mb-3">
                                  <span className="flex items-center gap-1"><MapIcon size={10}/> {prov.dist} อ.</span>
                                  <span className="flex items-center gap-1"><Grid size={10}/> {prov.tam} ต.</span>
                               </div>
                               {isSelected && (
                                  <div className="animate-in slide-in-from-top-2 pt-2 border-t border-white/10">
                                     <div className="grid grid-cols-3 gap-2 mb-3">
                                        <div className="text-center"><div className="text-[8px] text-slate-500 uppercase">Peace</div><div className="text-xs font-bold text-emerald-400">{prov.serenity}/10</div></div>
                                        <div className="text-center"><div className="text-[8px] text-slate-500 uppercase">Fun</div><div className="text-xs font-bold text-purple-400">{prov.entertainment}/10</div></div>
                                        <div className="text-center"><div className="text-[8px] text-slate-500 uppercase">Relax</div><div className="text-xs font-bold text-cyan-400">{prov.relax}/10</div></div>
                                     </div>
                                     <button className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded transition-colors">
                                        View Details
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
