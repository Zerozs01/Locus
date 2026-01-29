import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

/**
 * Root Layout - Wraps all pages with Sidebar
 * Chat functionality moved to Intelligence page
 */
export const RootLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020305] text-slate-100 font-sans">
      {/* SIDEBAR - Always visible */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex overflow-hidden relative pl-[72px]">
        {/* Window Drag Region for Electron */}
        <div className="absolute top-0 left-0 right-0 h-8 z-[9999] titlebar-drag" />
        
        {/* Page Content via Router */}
        <Outlet />
      </main>
    </div>
  );
};
