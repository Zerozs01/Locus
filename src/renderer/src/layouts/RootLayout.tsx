import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { ChatOverlay } from '../components/ChatOverlay';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

/**
 * Root Layout - Wraps all pages with Sidebar and Chat
 */
export const RootLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      {/* Chat Overlay - Available on all pages */}
      <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Chat FAB Button */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="fixed bottom-8 right-8 z-50 bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-110 active:scale-95"
          title="Open Locus AI Chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};
