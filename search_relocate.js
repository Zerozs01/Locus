const fs = require('fs');

const file = 'c:/Users/beelink/Downloads/Code/University/Locus/src/renderer/src/pages/ProvinceTacticalPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the old Search Box at the top
const oldSearchRegex = /\s*\{\/\* Search Google Maps Overlay \*\/\}\r?\n\s*<div className="absolute top-4 left-\[64px\] z-\[1000\] flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-72 pointer-events-auto border border-slate-100 h-10">\r?\n\s*<input \r?\n\s*type="text" \r?\n\s*placeholder="Search Google Maps" \r?\n\s*className="flex-1 bg-transparent outline-none text-slate-800 text-sm placeholder-slate-500 w-full font-sans"\r?\n\s*\/>\r?\n\s*<Search size=\{16\} className="text-slate-500 mx-2" \/>\r?\n\s*<div className="w-px h-5 bg-slate-300 mx-1"><\/div>\r?\n\s*<Navigation size=\{16\} className="text-blue-500 ml-2" \/>\r?\n\s*<\/div>/m;

content = content.replace(oldSearchRegex, '');

// 2. Insert the new Search Box at the bottom-left, before the province info text
// We'll target the Province Info Overlay div
const provinceInfoStart = /<div className="absolute bottom-0 left-0 right-0 z-\[1000\] p-4 bg-gradient-to-t from-black\/90 via-black\/60 to-transparent">/;

const newSearchAndInfo = `<div className="absolute bottom-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none flex flex-col items-start gap-4">
          <div className="pointer-events-auto flex items-center bg-white rounded-full shadow-2xl px-4 py-2 w-72 border border-slate-200 h-10 transition-all hover:w-[320px] focus-within:w-[320px] group/search">
            <input 
              type="text" 
              placeholder="Search Google Maps" 
              className="flex-1 bg-transparent outline-none text-slate-800 text-sm placeholder-slate-500 w-full font-sans"
            />
            <Search size={16} className="text-slate-400 group-focus-within/search:text-cyan-600 mx-2 transition-colors" />
            <div className="w-px h-5 bg-slate-200 mx-1"></div>
            <Navigation size={16} className="text-blue-500 hover:scale-110 transition-transform cursor-pointer ml-1" />
          </div>

          <div className="flex flex-col">`;

content = content.replace(provinceInfoStart, newSearchAndInfo);

// Since we added a <div> to wrap the info, we need to balance the closing tags
// The original had </div><h1...
// We need to find the closing </div> of the "flex items-center gap-2 mb-2" and then finally the outer one.
// Actually, it's easier to just replace the whole block more carefully.

fs.writeFileSync(file, content);
