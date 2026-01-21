import React from 'react';
import { Globe, Map as MapIcon, Activity, Database, Settings, Menu } from 'lucide-react';

interface SidebarBtnProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarBtn = ({ icon, label, active, onClick }: SidebarBtnProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 relative group mb-2
      ${active ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}`}
    title={label}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</div>
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_10px_#06b6d4]"></div>}
  </button>
);

export const Sidebar = () => {
  return (
    <aside className="w-[72px] bg-[#0a0c10] border-r border-white/5 flex flex-col items-center py-6 z-[100] shrink-0 shadow-2xl absolute left-0 top-0 bottom-0 text-slate-100">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-8 cursor-pointer hover:scale-110 transition-transform">
        <Globe className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 w-full px-2 space-y-4">
        <SidebarBtn icon={<MapIcon size={20}/>} label="Map" active={true} />
        <SidebarBtn icon={<Activity size={20}/>} label="Stats" />
        <SidebarBtn icon={<Database size={20}/>} label="Data" />
        <SidebarBtn icon={<Settings size={20}/>} label="Config" />
      </div>

      <div className="mt-auto">
        <SidebarBtn icon={<Menu size={20}/>} label="Menu" />
      </div>
    </aside>
  );
};
