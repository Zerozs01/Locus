import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Map, Newspaper, Settings, MessageSquare, CalendarDays } from 'lucide-react';
import { ResourceInventory } from './ResourceInventory';
import logo from '../../../../src/Image/Locus_logo.png';

interface SidebarBtnProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarBtn = ({ icon, label, active, onClick }: SidebarBtnProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-300 relative group mb-2 overflow-hidden
      ${active 
        ? 'text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20' 
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border border-transparent'}`}
    title={label}
  >
    {active && (
      <>
        {/* Subtle Gray/Slate Gradient Base */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-600/40 via-slate-700/40 to-slate-800/60"
        />
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      </>
    )}
    
    <div className={`relative z-10 transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
      {icon}
    </div>

    {/* Subtle Inner Glow */}
    {active && (
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    )}
  </button>
);

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showInventory, setShowInventory] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <aside className="w-[72px] bg-[#0a0c10] border-r border-white/5 flex flex-col items-center py-6 z-[100] shrink-0 shadow-2xl absolute left-0 top-0 bottom-0 text-slate-100">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')}
          className="w-14 h-10  flex items-center justify-center mb-7 cursor-pointer hover:scale-110 transition-transform"
          title="Locus Home"
        >
          <img src={logo} className="w-13 h-13 object-contain" alt="Locus Logo" />
        </div>

        {/* Navigation */}
        <div className="flex-1 w-full px-2 space-y-4">

          <SidebarBtn 
            icon={<Map size={20}/>} 
            label="Thai Map" 
            active={isActive('/map')}
            onClick={() => navigate('/map')}
          />
          <SidebarBtn 
            icon={<MessageSquare size={20}/>} 
            label="Agent" 
            active={isActive('/intelligence')}
            onClick={() => navigate('/intelligence')}
          />
          <SidebarBtn 
            icon={<Newspaper size={20}/>} 
            label="News" 
            active={isActive('/analytics')}
            onClick={() => navigate('/analytics')}
          />
          <SidebarBtn 
            icon={<CalendarDays size={20}/>} 
            label="Travel Plans" 
            active={isActive('/travel-plans')}
            onClick={() => navigate('/travel-plans')}
          />
          {/* Directions & Resource Inventory - DISABLED for demo */}
          {/* <SidebarBtn 
            icon={<Navigation size={20}/>} 
            label="Directions" 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('locus-trigger-routing'));
            }}
          /> */}

          {/* Divider */}
          <div className="border-t border-white/5 my-2" />

          {/* Resource Inventory */}
          {/* <SidebarBtn 
            icon={<Package size={20}/>} 
            label="Resource Inventory" 
            active={showInventory}
            onClick={() => setShowInventory(prev => !prev)}
          /> */}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto w-full px-2">
          <SidebarBtn 
            icon={<Settings size={20}/>} 
            label="Settings" 
            active={isActive('/settings')}
            onClick={() => navigate('/settings')}
          />
        </div>
      </aside>

      {/* Resource Inventory Overlay */}
      <ResourceInventory 
        isOpen={showInventory} 
        onClose={() => setShowInventory(false)} 
      />
    </>
  );
};
