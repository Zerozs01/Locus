import React from 'react';
import { X, Building2, Waves, Mountain, Ship, Plus, Plane, PhoneCall, AlertTriangle, MapPin, ChevronRight } from 'lucide-react';
import { Province } from '../../../shared/types';

interface ProvinceReconPopupProps {
  province: Province;
  onClose: () => void;
  onEnterDetail?: (id: string) => void;
}

/**
 * ProvinceReconPopup Component (Refactored)
 * A tactical, high-contrast intelligence popup for quick province assessment.
 */
const ProvinceReconPopup: React.FC<ProvinceReconPopupProps> = ({ province, onClose, onEnterDetail }) => {
  
  const getTerrainIcon = (terrain?: string) => {
    switch (terrain) {
      case 'Urban': return <Building2 size={16} className="text-blue-400" />;
      case 'River Basin': return <Waves size={16} className="text-cyan-400" />;
      case 'Mountainous': return <Mountain size={16} className="text-emerald-400" />;
      case 'Coastal': return <Ship size={16} className="text-indigo-400" />;
      default: return <MapPin size={16} className="text-slate-400" />;
    }
  };

  const isThreatClear = province.activeThreat === 'CLEAR';

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[340px] bg-[#020617] border border-slate-700/50 rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tactical Header Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-transparent opacity-80" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all border border-slate-700/30"
        >
          <X size={14} />
        </button>

        <div className="p-6">
          {/* Title Section */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase">Strategic Recon</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-3">{province.name}</h2>
            
            {/* Tactical Tags - Enhanced Pill UI */}
            <div className="flex flex-wrap gap-1.5">
              {province.tacticalTags && province.tacticalTags.length > 0 ? (
                province.tacticalTags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-slate-800/80 text-cyan-400/90 border border-cyan-500/20 rounded"
                  >
                    [{tag}]
                  </span>
                ))
              ) : (
                <div className="text-[9px] text-slate-600 font-medium italic">Intel Pending...</div>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {getTerrainIcon(province.terrain)}
                <span>Terrain</span>
              </div>
              <div className="text-sm font-bold text-slate-200 font-mono tracking-tight">{province.terrain || 'N/A'}</div>
            </div>
            
            <div className={`p-3 rounded-xl bg-slate-900/50 border ${isThreatClear ? 'border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' : 'border-rose-500/20 shadow-[0_0_15px_-5px_rgba(244,63,94,0.3)]'}`}>
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <AlertTriangle size={14} className={isThreatClear ? 'text-emerald-400' : 'text-rose-400'} />
                <span>Active Threat</span>
              </div>
              <div className={`text-sm font-black font-mono ${isThreatClear ? 'text-emerald-400' : 'text-rose-400'}`}>
                {province.activeThreat || 'UNKNOWN'}
              </div>
            </div>
          </div>

          {/* Infrastructure Section */}
          <div className="space-y-2 mb-6">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              Infrastructure Nodes
            </h4>
            
            <div className="flex items-center justify-between px-3 py-2.5 bg-slate-900/30 rounded-lg border border-slate-800/40 group hover:border-slate-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-rose-500/10 rounded-md">
                  <Plus size={14} className="text-rose-400" />
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-tight">Medical Hubs</span>
              </div>
              <span className="text-sm font-mono font-black text-white">
                {String(province.infrastructure?.medicalHubs ?? '--').padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5 bg-slate-900/30 rounded-lg border border-slate-800/40 group hover:border-slate-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-500/10 rounded-md">
                  <Plane size={14} className="text-blue-400" />
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-tight">Transport Nodes</span>
              </div>
              <span className="text-sm font-mono font-black text-white">
                {String(province.infrastructure?.transportNodes ?? '--').padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Emergency Comms */}
          <div className="mb-6">
            <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <PhoneCall size={16} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-[9px] font-black text-indigo-400/80 uppercase tracking-widest leading-none mb-1">Emergency Frequency</div>
                <div className="text-xs text-indigo-100 font-mono font-bold tracking-wider">{province.emergencyContact || 'SIGNAL_LOST'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <button 
          onClick={() => onEnterDetail?.(province.id)}
          className="w-full py-4 bg-slate-900/80 border-t border-slate-800/50 flex items-center justify-center gap-2 group hover:bg-slate-800 transition-all"
        >
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">
            Access Full Intelligence
          </span>
          <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default ProvinceReconPopup;
