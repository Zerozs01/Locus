import { Database } from 'lucide-react';

/**
 * Geo-Archive Page - Placeholder for Phase 3
 * Gallery & Comparison view for all provinces
 */
export const GeoArchivePage = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#050608]">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
          <Database size={40} className="text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Geo-Archive</h2>
        <p className="text-slate-400 max-w-md">
          Province gallery with smart filters and comparison mode.
          <br />
          <span className="text-purple-400">Coming in Phase 3</span>
        </p>
      </div>
    </div>
  );
};
