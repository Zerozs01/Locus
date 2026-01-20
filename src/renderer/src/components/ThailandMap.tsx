import { Province } from '../data/regions';
import React from 'react';

interface ThailandMapProps {
  activeId: string | null;
  onSelectRegion: (id: string) => void;
  viewMode: string;
  selectedProvince: Province | null;
  onSelectProvince: (prov: Province) => void;
}

const provinceDots: Record<string, Record<string, { cx: number; cy: number }>> = {
  north: { 
    cm: {cx: 55, cy: 35}, cr: {cx: 70, cy: 20}, nan: {cx: 90, cy: 40}, 
    phr: {cx: 80, cy: 50}, mhs: {cx: 40, cy: 30}, lp: {cx: 55, cy: 45}
  },
  northeast: { 
    kk: {cx: 130, cy: 75}, nr: {cx: 120, cy: 95}, ub: {cx: 160, cy: 90}, 
    ud: {cx: 130, cy: 60}, br: {cx: 135, cy: 100}, sr: {cx: 145, cy: 100}
  },
  central: { 
    bkk: {cx: 85, cy: 135}, ay: {cx: 85, cy: 120}, kan: {cx: 60, cy: 125}, 
    sp: {cx: 90, cy: 140}, nbi: {cx: 85, cy: 130}, pte: {cx: 85, cy: 125}
  },
  south: { 
    pkt: {cx: 50, cy: 220}, srt: {cx: 65, cy: 200}, hy: {cx: 80, cy: 260}, 
    kb: {cx: 55, cy: 225}, pna: {cx: 55, cy: 210}, trg: {cx: 70, cy: 240}
  }
};

const regionsDataList = [
  { 
    id: 'north', label: 'NORTH', labelX: 65, labelY: 45, zoomX: 65, zoomY: 45,
    d: "M 50 15 Q 70 5 90 20 L 100 55 L 100 70 L 55 80 L 30 50 Z", 
    color: "fill-rose-500", glow: "drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]"
  },
  { 
    id: 'northeast', label: 'ISAN', labelX: 135, labelY: 90, zoomX: 135, zoomY: 90,
    d: "M 100 70 L 150 60 L 175 75 L 170 120 L 120 120 L 100 70 Z", 
    color: "fill-emerald-500", glow: "drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
  },
  { 
    id: 'central', label: 'CENTRAL', labelX: 80, labelY: 105, zoomX: 80, zoomY: 105,
    d: "M 55 80 L 100 70 L 100 80 L 120 120 L 100 150 L 65 130 Z", 
    color: "fill-cyan-500", glow: "drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
  },
  { 
    id: 'south', label: 'SOUTH', labelX: 70, labelY: 200, zoomX: 70, zoomY: 200,
    d: "M 65 130 L 100 150 L 90 190 Q 100 240 95 245 L 65 285 L 45 180 Z", 
    color: "fill-blue-500", glow: "drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
  }
];

export const ThailandMap = ({ 
  activeId, 
  onSelectRegion, 
  viewMode, 
  selectedProvince
}: ThailandMapProps) => {

  const getTransform = () => {
    if (activeId && viewMode === 'province') {
       if (selectedProvince && provinceDots[activeId] && provinceDots[activeId][selectedProvince.id]) {
          const dot = provinceDots[activeId][selectedProvince.id];
          return `translate(${110 - dot.cx * 2.5}, ${150 - dot.cy * 2.5}) scale(2.5)`;
       }
       const reg = regionsDataList.find(r => r.id === activeId);
       if (reg) {
          return `translate(${110 - reg.zoomX * 1.8}, ${150 - reg.zoomY * 1.8}) scale(1.8)`;
       }
    }
    return `translate(0, 0) scale(1)`;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <div className="w-[450px] h-[450px] border border-cyan-500/30 rounded-full animate-[spin_30s_linear_infinite]"></div>
         <div className="absolute w-[600px] h-[1px] bg-cyan-500/20 rotate-45"></div>
      </div>

      <svg viewBox="0 0 220 300" className="w-full h-full max-h-[85vh] drop-shadow-2xl filter overflow-visible z-10 transition-transform duration-1000 ease-in-out pointer-events-auto">
        <g style={{ transform: getTransform(), transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)', transformOrigin: 'center' }}>
          {regionsDataList.map((reg) => {
            const isActive = activeId === reg.id;
            const isProvinceView = viewMode === 'province';
            const isDimmed = isProvinceView && !isActive; 

            return (
              <g key={reg.id} onClick={() => onSelectRegion(reg.id)} className="cursor-pointer">
                <path
                  d={reg.d}
                  className={`
                    transition-all duration-500 ease-out stroke-[0.5] vector-effect-non-scaling-stroke
                    ${isActive 
                      ? `${reg.color} stroke-white ${reg.glow} opacity-100` 
                      : `fill-slate-800/60 stroke-white/10 hover:fill-slate-700 hover:stroke-white/30 ${isDimmed ? 'opacity-30' : 'opacity-100'}`
                    }
                  `}
                />
                
                <text 
                  x={reg.labelX} y={reg.labelY} 
                  className={`
                    text-[8px] font-black pointer-events-none transition-all duration-500
                    ${isActive ? 'fill-white scale-110' : 'fill-white/40 scale-100'}
                    ${isDimmed ? 'opacity-0' : 'opacity-100'}
                  `}
                  textAnchor="middle"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center', textShadow: isActive ? '0 0 10px rgba(0,0,0,0.5)' : 'none' }}
                >
                  {reg.label}
                </text>
              </g>
            );
          })}
          
          {/* Active Province Dot */}
          {viewMode === 'province' && activeId && selectedProvince && provinceDots[activeId] && provinceDots[activeId][selectedProvince.id] && (
             <g>
               <circle cx={provinceDots[activeId][selectedProvince.id].cx} cy={provinceDots[activeId][selectedProvince.id].cy} r="15" className="fill-cyan-500/20 animate-ping" />
               <circle cx={provinceDots[activeId][selectedProvince.id].cx} cy={provinceDots[activeId][selectedProvince.id].cy} r="3" className="fill-cyan-400 stroke-2 stroke-black" />
               <text 
                 x={provinceDots[activeId][selectedProvince.id].cx} 
                 y={provinceDots[activeId][selectedProvince.id].cy - 8} 
                 className="text-[3px] fill-white font-bold uppercase" 
                 textAnchor="middle"
                 style={{ textShadow: '0 0 4px black' }}
               >
                 {selectedProvince.name}
               </text>
             </g>
          )}
        </g>
      </svg>
    </div>
  );
};
