import { Brain } from 'lucide-react';

/**
 * Intelligence Page - Placeholder for Phase 2
 * AI Agent Full Mode with LightRAG integration
 */
export const IntelligencePage = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#050608]">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
          <Brain size={40} className="text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Locus Intelligence</h2>
        <p className="text-slate-400 max-w-md">
          Full AI workspace with Knowledge Graph visualization,
          <br />
          file analysis, and source citations.
          <br />
          <span className="text-cyan-400">Coming in Phase 2</span>
        </p>
      </div>
    </div>
  );
};
