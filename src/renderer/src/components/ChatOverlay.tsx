import { X, Send } from 'lucide-react';

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatOverlay = ({ isOpen, onClose }: ChatOverlayProps) => {
  return (
    <aside className={`fixed right-0 top-0 bottom-0 bg-[#080a0f] border-l border-white/10 transition-transform duration-500 z-[100] w-[400px] shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#050608] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Locus AI</span>
        </div>
        <button onClick={onClose}><X size={18} className="text-slate-500 hover:text-white"/></button>
      </div>
      
      <div className="flex-1 p-6">
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-sm text-slate-300">
          Command Center พร้อมใช้งาน! (//ω//)
        </div>
      </div>
      
      <div className="p-4 border-t border-white/5 bg-[#050608]">
        <div className="flex gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
          <input className="flex-1 bg-transparent border-none outline-none text-sm text-white px-2" placeholder="Send command..." />
          <button className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors">
            <Send size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
