import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ThailandMap } from './components/ThailandMap';
import { RegionDashboard } from './components/RegionDashboard';
import { ChatOverlay } from './components/ChatOverlay';
import { Region, Province } from './data/regions';
import { Search, MessageSquare, Users, Maximize, Building } from 'lucide-react';

const App = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('central');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mapMode, setMapMode] = useState<'region' | 'province'>('region');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  useEffect(() => {
    // Fetch initial data from SQLite
    const fetchData = async () => {
      try {
        if (window.api && window.api.db) {
          const data = await window.api.db.getRegions();
          setRegions(data);
          console.log('Data loaded from DB:', data);
        } else {
             // Fallback for development if window.api is incomplete (e.g. browser preview)
             console.warn('DB API not found, likely running in browser mode without backend.');
             // You could import the static data here as fallback if desired
        }
      } catch (error) {
        console.error('Failed to load regions:', error);
      }
    };

    fetchData();
  }, []);

  const activeData = regions.find(r => r.id === selectedRegionId);

  const handleRegionSelect = (id: string) => {
    setSelectedRegionId(id);
    setSelectedProvince(null);
  };

  const handleProvinceSelect = (prov: Province) => {
    setSelectedProvince(prov);
    setMapMode('province');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020305] text-slate-100 font-sans">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex overflow-hidden relative pl-[72px]">
        

        {/* Window Drag Region */}
        <div className="absolute top-0 left-0 right-0 h-8 z-[9999] titlebar-drag" />

        {/* LEFT: RADAR MAP */}
        <section className="flex-[2] relative bg-[#050608] flex flex-col border-r border-white/5 z-10 overflow-hidden">
          

          <div className="flex-1 relative flex items-center justify-center ">
             <ThailandMap 
               activeId={selectedRegionId} 
               onSelectRegion={handleRegionSelect} 
               viewMode={mapMode} 
               selectedProvince={selectedProvince} 
               onSelectProvince={handleProvinceSelect} 
             />
          </div>

          {/* SUMMARY STATS: Vertical Stack on Right Edge of Left Panel */}
          {activeData && (
            <div className="absolute bottom-28 right-8 z-30 flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-500 items-end">
              
              <div className="flex items-center gap-3 bg-[#0f1115] p-2 pr-4 pl-2 rounded-l-xl border-r-2 border-yellow-500 shadow-md pointer-events-auto hover:-translate-x-2 transition-transform cursor-default group min-w-[140px] justify-between">
                 <div className="bg-yellow-500 p-1.5 rounded-lg shadow-lg text-black"><Users size={16} /></div>
                 <div className="text-right">
                    <div className="text-lg font-black text-white leading-none">{activeData.summary.pop}</div>
                    <div className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider">Population</div>
                 </div>
              </div>

              <div className="flex items-center gap-3 bg-[#0f1115] p-2 pr-4 pl-2 rounded-l-xl border-r-2 border-orange-500 shadow-md pointer-events-auto hover:-translate-x-2 transition-transform cursor-default group min-w-[140px] justify-between">
                 <div className="bg-orange-500 p-1.5 rounded-lg shadow-lg text-white"><Maximize size={16} /></div>
                 <div className="text-right">
                    <div className="text-lg font-black text-white leading-none">{activeData.summary.area}</div>
                    <div className="text-[9px] font-bold text-orange-400 uppercase tracking-wider">Area km²</div>
                 </div>
              </div>

              <div className="flex items-center gap-3 bg-[#0f1115] p-2 pr-4 pl-2 rounded-l-xl border-r-2 border-amber-700 shadow-md pointer-events-auto hover:-translate-x-2 transition-transform cursor-default group min-w-[140px] justify-between">
                 <div className="bg-amber-700 p-1.5 rounded-lg shadow-lg text-white"><Building size={16} /></div>
                 <div className="text-right">
                    <div className="text-lg font-black text-white leading-none">{activeData.summary.provinces}</div>
                    <div className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Provinces</div>
                 </div>
              </div>
            </div>
          )}

          {/* SEARCH BAR */}
          <div className="absolute bottom-8 left-8 right-8 z-30">
            <div className="relative group w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rounded-xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-[#0f1115] border border-white/10 rounded-xl flex items-center p-3.5 shadow-xl focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all w-full">
                <Search className="text-slate-400 ml-2 mr-3 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500 font-medium"
                  placeholder={mapMode === 'province' ? "Search province..." : "Search region..."}
                />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: DASHBOARD */}
        <RegionDashboard 
          regions={regions}
          selectedRegionId={selectedRegionId} 
          onSelectRegion={handleRegionSelect}
          mapMode={mapMode}
          setMapMode={setMapMode}
          selectedProvince={selectedProvince}
          onSelectProvince={handleProvinceSelect}
        />

      </main>

      {/* Chat Overlay */}
      <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="fixed bottom-8 right-8 z-50 bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-110 active:scale-95"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
