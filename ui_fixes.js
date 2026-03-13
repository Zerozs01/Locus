const fs = require('fs');

const mapFile = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/components/ProvinceMap.tsx';
let mapContent = fs.readFileSync(mapFile, 'utf8');
mapContent = mapContent.replace(/zoomControl:\s*true,/, 'zoomControl: false,');
fs.writeFileSync(mapFile, mapContent);

const tacticalFile = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let tacticalContent = fs.readFileSync(tacticalFile, 'utf8');

const oldQuickStatsRegex = /\s*\{\/\* Quick Stats Bar \*\/\}\r?\n\s*<div className="flex-shrink-0 p-4 bg-\[#0a0c10\] border-b border-white\/10">\r?\n\s*<div className="flex items-center gap-4">\r?\n\s*<QuickBadge icon=\{<Thermometer size=\{16\} \/>\} value=\{provinceData\.weather\.temp\} label=\{provinceData\.weather\.condition\} color="amber" \/>\r?\n\s*<QuickBadge icon=\{<Shield size=\{16\} \/>\} value=\{\`\$\{provinceData\.safetyIndex\}%\`\} label="Safe" color="emerald" \/>\r?\n\s*<QuickBadge icon=\{<Wallet size=\{16\} \/>\} value=\{provinceData\.dailyCost\} label="\/day" color="cyan" \/>\r?\n\s*<\/div>\r?\n\s*<\/div>/m;

tacticalContent = tacticalContent.replace(oldQuickStatsRegex, '\n        {/* Quick Stats Bar moved to ExploreTab */}');

const exploreTabRegex = /const ExploreTab = \(\{ data, onFlyTo \}: \{ data: ProvinceData; onFlyTo\?: FlyToHandler \}\) => \(\r?\n\s+<div className="space-y-4">\r?\n\s+\{\/\* Popular Activities - FIRST \*\/\}/m;

const newExploreTab = `const ExploreTab = ({ data, onFlyTo }: { data: ProvinceData; onFlyTo?: FlyToHandler }) => (
  <div className="space-y-4">
    {/* Quick Stats Bar */}
    <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-white/5 to-transparent p-4 rounded-xl border border-white/10 shadow-lg">
      <QuickBadge icon={<Thermometer size={16} />} value={data.weather.temp} label={data.weather.condition} color="amber" />
      <div className="hidden sm:block w-px h-8 bg-white/10"></div>
      <QuickBadge icon={<Shield size={16} />} value={\`\${data.safetyIndex}%\`} label="Safe" color="emerald" />
      <div className="hidden sm:block w-px h-8 bg-white/10"></div>
      <QuickBadge icon={<Wallet size={16} />} value={data.dailyCost} label="/day" color="cyan" />
    </div>

    {/* Popular Activities - FIRST */}`;

tacticalContent = tacticalContent.replace(exploreTabRegex, newExploreTab);

// Clean up weird back button issue (just check structure in app)
const backBtnRegex = /<button \r?\n\s*onClick=\{([^}]+)\}\r?\n\s*className="absolute top-4 left-4 z-\[1000\] flex items-center gap-2 px-3 py-2 bg-black\/70 hover:bg-black\/90 backdrop-blur-sm rounded-lg border border-white\/10 text-white transition-all group"\r?\n\s*>\r?\n\s*<ArrowLeft[^>]+>\r?\n\s*<span[^>]+>Back to Radar<\/span>\r?\n\s*<\/button>/m;

// We can make the back button cleaner
const newBackBtn = `<button 
          onClick={$1}
          className="absolute top-4 left-4 z-[1000] flex items-center justify-center w-10 h-10 bg-black/50 hover:bg-cyan-600 backdrop-blur-md rounded-full border border-white/20 text-white transition-all shadow-lg group pointer-events-auto"
          title="Back to Radar"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>`;

tacticalContent = tacticalContent.replace(backBtnRegex, newBackBtn);

fs.writeFileSync(tacticalFile, tacticalContent);
