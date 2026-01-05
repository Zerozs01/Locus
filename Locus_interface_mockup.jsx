import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Map as MapIcon, 
  Camera, 
  History, 
  Settings, 
  Cloud, 
  AlertTriangle, 
  Navigation, 
  Info,
  Maximize2,
  Zap,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';

// --- Mock Data ---
const MOCK_ANALYSIS = {
  status: "success",
  location: "Prypiat, Ukraine (Simulated)",
  coordinates: "51.4045° N, 30.0542° E",
  analysis: {
    geoguessr_meta: [
      { label: "Bollard", value: "White with red reflector (Type 4)" },
      { label: "Road Lines", value: "Solid white edge, dashed center" },
      { label: "Vegetation", value: "Deciduous forest, Betula pendula detected" }
    ],
    survival_intel: [
      { label: "Threat Level", value: "Moderate (Radiation/Structural)", color: "text-orange-400" },
      { label: "Shelter Potential", value: "High (Concrete Structures)", color: "text-green-400" },
      { label: "Water Source", value: "Pripyat River (Contaminated - Filters required)", color: "text-blue-400" }
    ],
    historical_lore: "Founded in 1970 to serve the Chernobyl Nuclear Power Plant. Abandoned in 1986. Current status: Zone of Alienation."
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartScan = () => {
    setIsScanning(true);
    setHasResult(false);
    // Simulate API delay
    setTimeout(() => {
      setIsScanning(false);
      setHasResult(true);
    }, 3000);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0b] text-zinc-300 font-mono overflow-hidden select-none">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-20 border-r border-zinc-800 flex flex-col items-center py-6 space-y-8 bg-[#0d0d0f]">
        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 mb-4">
          <Zap size={28} strokeWidth={2.5} />
        </div>
        
        <NavButton icon={<Camera size={22} />} active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} label="SCAN" />
        <NavButton icon={<MapIcon size={22} />} active={activeTab === 'map'} onClick={() => setActiveTab('map')} label="MAP" />
        <NavButton icon={<History size={22} />} active={activeTab === 'history'} onClick={() => setActiveTab('history')} label="LOGS" />
        <NavButton icon={<Database size={22} />} active={activeTab === 'sync'} onClick={() => setActiveTab('sync')} label="SYNC" />
        
        <div className="flex-grow" />
        
        <NavButton icon={<Settings size={22} />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="SET" />
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#0d0d0f]/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs tracking-[0.3em] text-zinc-500">PROJECT</span>
            <span className="text-xl font-bold tracking-tighter text-white">TERAN</span>
            <div className="h-4 w-[1px] bg-zinc-700 mx-2" />
            <span className="text-xs text-amber-500/80 animate-pulse uppercase">Tactical AI Active</span>
          </div>
          
          <div className="flex items-center space-x-6 text-[10px]">
            <StatusIndicator label="SYSTEM" status="OPTIMAL" color="bg-green-500" />
            <StatusIndicator label="NETWORK" status="NGROK-TUNNEL" color="bg-blue-500" />
            <StatusIndicator label="FIREBASE" status="SYNCED" color="bg-green-500" />
            <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 text-zinc-400">
              {currentTime}
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'scan' && (
            <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
              
              {/* Left Side: Upload & Vision */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <section className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  
                  {/* Image Display Area */}
                  <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center relative">
                    {!hasResult && !isScanning ? (
                      <div className="text-center z-20 space-y-4">
                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto border border-zinc-700 group-hover:scale-110 transition-transform cursor-pointer">
                          <Camera size={32} className="text-zinc-500" />
                        </div>
                        <p className="text-sm text-zinc-400">Drag imagery here or <span className="text-amber-500 cursor-pointer">browse file</span></p>
                      </div>
                    ) : (
                      <img 
                        src="https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=2070&auto=format&fit=crop" 
                        alt="Scanned Area"
                        className={`w-full h-full object-cover transition-all duration-1000 ${isScanning ? 'blur-sm grayscale' : 'grayscale-0'}`}
                      />
                    )}
                    
                    {isScanning && (
                      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
                        <div className="w-full h-[2px] bg-amber-500/50 absolute animate-scan-line shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                        <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-amber-500/30 rounded-lg flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-amber-500 text-sm font-bold tracking-widest uppercase">Analyzing Geospatial Data...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 z-20 flex space-x-4">
                    <button 
                      onClick={handleStartScan}
                      disabled={isScanning}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-700 text-black px-6 py-2.5 rounded-lg font-bold text-xs flex items-center space-x-2 transition-colors"
                    >
                      <Zap size={16} fill="black" />
                      <span>INITIALIZE AGENT</span>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg font-bold text-xs backdrop-blur-md border border-white/10 transition-colors">
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </section>

                {/* Agent Insight Log */}
                <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-zinc-500 mb-4 flex items-center">
                    <History size={14} className="mr-2" /> AGENT COGNITIVE LOG
                  </h3>
                  <div className="space-y-3 font-sans text-sm">
                    <LogItem time="T-00:01" msg="Neural network initialized. Listening on port 5678." color="text-zinc-500" />
                    <LogItem time="T-00:02" msg="Visual input received. Extracting environmental features..." color="text-zinc-400" />
                    {hasResult && (
                      <>
                        <LogItem time="T-00:03" msg="Patterns match Pripyat, Northern Ukraine (98.4% confidence)." color="text-amber-400" />
                        <LogItem time="T-00:04" msg="Situational awareness: Structural risk detected in proximity." color="text-red-400" />
                      </>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Side: Data Panels */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                
                {/* Meta Clues Panel */}
                <DataCard title="GEOGUESSR META" icon={<Search size={16} />}>
                  {hasResult ? (
                    <div className="space-y-4">
                      {MOCK_ANALYSIS.analysis.geoguessr_meta.map((item, idx) => (
                        <div key={idx} className="flex flex-col space-y-1">
                          <span className="text-[10px] text-zinc-500 uppercase">{item.label}</span>
                          <span className="text-sm text-zinc-200 border-l-2 border-amber-500/50 pl-3">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Placeholder text="Waiting for image analysis..." />
                  )}
                </DataCard>

                {/* Survival Intelligence */}
                <DataCard title="SITUATIONAL AWARENESS" icon={<Shield size={16} />}>
                  {hasResult ? (
                    <div className="grid grid-cols-1 gap-4">
                      {MOCK_ANALYSIS.analysis.survival_intel.map((item, idx) => (
                        <div key={idx} className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 flex justify-between items-center">
                          <span className="text-xs text-zinc-400 uppercase">{item.label}</span>
                          <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Placeholder text="Tactical assessment pending..." />
                  )}
                </DataCard>

                {/* Cultural Context / Lore */}
                <DataCard title="LORE & CONTEXT" icon={<Info size={16} />}>
                  {hasResult ? (
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {MOCK_ANALYSIS.analysis.historical_lore}
                    </p>
                  ) : (
                    <Placeholder text="Background intel required..." />
                  )}
                </DataCard>

                {/* Action Footer */}
                <div className="flex space-x-3">
                   <button className="flex-grow bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-500 py-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all">
                      <Cloud className="mr-2" size={16} /> SYNC TO FIRESTORE
                   </button>
                   <button className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl border border-zinc-700">
                      <Navigation size={18} />
                   </button>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="h-full w-full bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               <div className="text-center">
                 <MapIcon size={64} className="mx-auto mb-4 text-zinc-700" />
                 <h2 className="text-xl font-bold text-zinc-500">TACTICAL MAP VIEW</h2>
                 <p className="text-sm text-zinc-600 mt-2">Integrating Leaflet.js / Mapbox API in Phase 2</p>
               </div>
               
               {/* Map Overlay Elements */}
               <div className="absolute top-6 right-6 space-y-2">
                 <MapTool label="SAT" />
                 <MapTool label="TER" active />
                 <MapTool label="POI" />
               </div>
            </div>
          )}

        </div>
        
        {/* Footer Bar */}
        <footer className="h-10 border-t border-zinc-800 bg-[#0d0d0f] flex items-center justify-between px-8 text-[10px] text-zinc-600">
          <div className="flex space-x-4">
            <span>LAT: {hasResult ? "51.4045" : "---"}</span>
            <span>LONG: {hasResult ? "30.0542" : "---"}</span>
            <span>ALT: 122M</span>
          </div>
          <div>CPE311 - AI LAB AGENT SYSTEM v1.0.4-BETA</div>
        </footer>
      </main>

      {/* Global Style for scanning animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan 2s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

// --- Sub-Components ---

const NavButton = ({ icon, active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all group ${active ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-400'}`}
  >
    <div className={`p-3 rounded-xl transition-all ${active ? 'bg-amber-500/10' : 'bg-transparent group-hover:bg-zinc-800/50'}`}>
      {icon}
    </div>
    <span className="text-[8px] font-bold tracking-widest">{label}</span>
  </button>
);

const StatusIndicator = ({ label, status, color }) => (
  <div className="flex items-center space-x-2">
    <span className="text-zinc-600">{label}:</span>
    <span className="text-zinc-300 font-bold">{status}</span>
    <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
  </div>
);

const DataCard = ({ title, icon, children }) => (
  <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 shadow-xl">
    <div className="flex items-center space-x-2 mb-4">
      <div className="p-1.5 bg-zinc-800 rounded-md text-zinc-400">
        {icon}
      </div>
      <h3 className="text-[10px] font-black tracking-[0.2em] text-zinc-500">{title}</h3>
    </div>
    {children}
  </div>
);

const Placeholder = ({ text }) => (
  <div className="py-6 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
    <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse mb-2" />
    <span className="text-[10px] text-zinc-600 italic">{text}</span>
  </div>
);

const LogItem = ({ time, msg, color }) => (
  <div className="flex space-x-3 items-start leading-tight">
    <span className="text-zinc-600 shrink-0 font-bold tracking-tighter">{time}</span>
    <span className={color}>{msg}</span>
  </div>
);

const MapTool = ({ label, active }) => (
  <div className={`w-10 h-10 flex items-center justify-center rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${active ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700'}`}>
    {label}
  </div>
);

export default App;