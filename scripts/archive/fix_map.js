const fs = require('fs');
const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/components/ProvinceMap.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Resize markers
content = content.replace(/width: 36px/g, 'width: 26px');
content = content.replace(/height: 36px/g, 'height: 26px');
content = content.replace(/width="18"/g, 'width="14"');
content = content.replace(/height="18"/g, 'height="14"');
content = content.replace(/border: 3px/g, 'border: 2px');
content = content.replace(/\[36,\s*36\]/g, '[26, 26]');
content = content.replace(/\[18,\s*36\]/g, '[13, 26]');

// 2. Change visibleFilters default to empty Set
content = content.replace(/new Set\(\['attraction',\s*'restaurant',\s*'hotel',\s*'hospital',\s*'transport'\]\)/, 'new Set<string>()');

// 3. Replace Legend with Filter Pills (we match from Map Legend to the end of its div)
const legendRegex = /\{\/\* Map Legend \(Filter Toggle\) \*\/\}[\s\S]*?<\/div>\r?\n\s*<\/div>/;
const newPillsUI = `{/* Map Filter Pills */}
      <div 
        className="absolute top-4 right-4 z-[1000] flex gap-2 max-w-[calc(100%-80px)] overflow-x-auto pointer-events-auto p-1 items-start"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <FilterPill color="#14b8a6" label="Attractions" icon="🎯" type="attraction" isActive={visibleFilters.has('attraction')} onToggle={() => toggleFilter('attraction')} />
        <FilterPill color="#f59e0b" label="Restaurants" icon="🍜" type="restaurant" isActive={visibleFilters.has('restaurant')} onToggle={() => toggleFilter('restaurant')} />
        <FilterPill color="#8b5cf6" label="Hotels" icon="🏨" type="hotel" isActive={visibleFilters.has('hotel')} onToggle={() => toggleFilter('hotel')} />
        <FilterPill color="#ef4444" label="Hospitals" icon="🏥" type="hospital" isActive={visibleFilters.has('hospital')} onToggle={() => toggleFilter('hospital')} />
        <FilterPill color="#3b82f6" label="Transport" icon="🚌" type="transport" isActive={visibleFilters.has('transport')} onToggle={() => toggleFilter('transport')} />
      </div>`;
content = content.replace(legendRegex, newPillsUI);

// 4. Replace LegendItem component at bottom with FilterPill Component
const legendItemRegex = /\/\/\s*Legend Item Component[\s\S]*?(?=export default ProvinceMap;)/;
const newFilterPillComp = `// Map Filter Pill Component
const FilterPill = ({ color, label, icon, isActive, onToggle }: { color: string; label: string; icon: string; isActive: boolean; onToggle: () => void; type?: string }) => (
  <button 
    onClick={onToggle}
    className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all shadow-md border whitespace-nowrap \${
      isActive 
        ? 'bg-white text-slate-800' 
        : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'
    }\`}
    style={{ borderColor: isActive ? color : undefined, borderWidth: isActive ? '2px' : '1px' }}
  >
    <span style={{ fontSize: '14px' }}>{icon}</span>
    <span>{label}</span>
  </button>
);

`;
content = content.replace(legendItemRegex, newFilterPillComp);

// Adding a custom style to hide scrollbar
const styleRegex = /<style>\{\`/;
if (content.match(styleRegex)) {
  content = content.replace(styleRegex, `<style>{\`
        /* Hide scrollbar for FilterPills */
        div::-webkit-scrollbar {
          display: none;
        }
`);
}

fs.writeFileSync(file, content);
