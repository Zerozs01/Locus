const fs = require('fs');

const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Search overlay
const backBtnRegex = /<button \r?\n\s*onClick=\{[^}]+\}\r?\n\s*className="absolute top-4 left-4 z-\[1000\] flex items-center justify-center w-10 h-10 bg-black\/50 hover:bg-cyan-600 backdrop-blur-md rounded-full border border-white\/20 text-white transition-all shadow-lg group pointer-events-auto"\r?\n\s*title="Back to Radar"\r?\n\s*>\r?\n\s*<ArrowLeft size=\{20\} className="group-hover:-translate-x-0\.5 transition-transform" \/>\r?\n\s*<\/button>/m;

const searchBar = `$&\n
        {/* Search Google Maps Overlay */}
        <div className="absolute top-4 left-[64px] z-[1000] flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-72 pointer-events-auto border border-slate-100 h-10">
          <input 
            type="text" 
            placeholder="Search Google Maps" 
            className="flex-1 bg-transparent outline-none text-slate-800 text-sm placeholder-slate-500 w-full font-sans"
          />
          <Search size={16} className="text-slate-500 mx-2" />
          <div className="w-px h-5 bg-slate-300 mx-1"></div>
          <Navigation size={16} className="text-blue-500 ml-2" />
        </div>`;
content = content.replace(backBtnRegex, searchBar);

// Add Search import
content = content.replace(/Crosshair\r?\n\} from 'lucide-react';/, "Crosshair,\n  Search\n} from 'lucide-react';");

// 2. Hide stay/food from tabs mapping
content = content.replace(/\{tabs\.map\(\(tab\) => \(/g, "{tabs.filter(t => t.id !== 'stay' && t.id !== 'eat').map((tab) => (");

// 3. Update activeTab rendering 
content = content.replace(/<ExploreTab data=\{provinceData\} onFlyTo=\{handleFlyToLocation\} \/>/g, "<ExploreTab data={provinceData} onFlyTo={handleFlyToLocation} onNavigateTab={setActiveTab} />");
content = content.replace(/<StayTab data=\{provinceData\} onFlyTo=\{handleFlyToLocation\} \/>/g, "<StayTab data={provinceData} onFlyTo={handleFlyToLocation} onNavigateTab={setActiveTab} />");
content = content.replace(/<EatTab data=\{provinceData\} onFlyTo=\{handleFlyToLocation\} \/>/g, "<EatTab data={provinceData} onFlyTo={handleFlyToLocation} onNavigateTab={setActiveTab} />");

// 4. Modify ExploreTab to include the buttons
const exploreDefRegex = /const ExploreTab = \(\{ data, onFlyTo \}: \{ data: ProvinceData; onFlyTo\?: FlyToHandler \}\) => \(/;
content = content.replace(exploreDefRegex, "const ExploreTab = ({ data, onFlyTo, onNavigateTab }: { data: ProvinceData; onFlyTo?: FlyToHandler; onNavigateTab?: (t:string)=>void }) => (");

const exploreStatsRegex = /(<QuickBadge icon=\{<Wallet size=\{16\} \/>\} value=\{data\.dailyCost\} label="\/day" color="cyan" \/>\r?\n\s*<\/div>)/;
const subNavBtns = `$1\n
    {/* Stay & Eat Sub-navigation Buttons */}
    <div className="grid grid-cols-2 gap-3 mt-4">
      <button 
        onClick={() => onNavigateTab ? onNavigateTab('stay') : null}
        className="flex items-center justify-between p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all group"
      >
        <div className="flex items-center gap-2">
          <Bed size={18} className="text-violet-400" />
          <span className="font-semibold text-white">Find Hotels</span>
        </div>
        <ChevronRight size={16} className="text-violet-400 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <button 
        onClick={() => onNavigateTab ? onNavigateTab('eat') : null}
        className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all group"
      >
        <div className="flex items-center gap-2">
          <Utensils size={18} className="text-amber-400" />
          <span className="font-semibold text-white">Find Food</span>
        </div>
        <ChevronRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>`;
content = content.replace(exploreStatsRegex, subNavBtns);

// 5. Modify StayTab missing 'onNavigateTab' and 'Back button'
const stayDefRegex = /const StayTab = \(\{ data, onFlyTo \}: \{ data: ProvinceData; onFlyTo\?: FlyToHandler \}\) => \(\r?\n\s*<div className="space-y-4">/;
const newStayDef = `const StayTab = ({ data, onFlyTo, onNavigateTab }: { data: ProvinceData; onFlyTo?: FlyToHandler; onNavigateTab?: (t:string)=>void }) => (
  <div className="space-y-4">
    <button 
      onClick={() => onNavigateTab ? onNavigateTab('explore') : null}
      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium -ml-1 py-1"
    >
      <ArrowLeft size={16} />
      Back to Explore
    </button>`;
content = content.replace(stayDefRegex, newStayDef);

// 6. Modify EatTab missing 'onNavigateTab' and 'Back button'
const eatDefRegex = /const EatTab = \(\{ data, onFlyTo \}: \{ data: ProvinceData; onFlyTo\?: FlyToHandler \}\) => \(\r?\n\s*<div className="space-y-4">/;
const newEatDef = `const EatTab = ({ data, onFlyTo, onNavigateTab }: { data: ProvinceData; onFlyTo?: FlyToHandler; onNavigateTab?: (t:string)=>void }) => (
  <div className="space-y-4">
    <button 
      onClick={() => onNavigateTab ? onNavigateTab('explore') : null}
      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium -ml-1 py-1"
    >
      <ArrowLeft size={16} />
      Back to Explore
    </button>`;
content = content.replace(eatDefRegex, newEatDef);

fs.writeFileSync(file, content);
