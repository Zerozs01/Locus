import { Activity } from 'lucide-react';

/**
 * Analytics Page - Placeholder for Phase 4
 * System health, token usage, and threat monitoring
 */
export const AnalyticsPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#050608]">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
          <Activity size={40} className="text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics & Status</h2>
        <p className="text-slate-400 max-w-md">
          System health monitoring, API status,
          <br />
          token usage tracking, and threat alerts.
          <br />
          <span className="text-amber-400">Coming in Phase 4</span>
        </p>
      </div>
    </div>
  );
};
