import { X, Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useIntelligenceChatStore } from '../services/intelligenceChatStore';
import { useChatThemeStore } from '../services/chatThemeStore';
import { MarkdownLite } from './MarkdownLite';
import { useChatTheme } from '../theme/useChatTheme';

export interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatOverlay = ({ isOpen, onClose }: ChatOverlayProps) => {
  const { messages, isLoading, sendMessage } = useIntelligenceChatStore();
  const { theme } = useChatThemeStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useChatTheme(theme);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <aside className={`fixed right-0 top-0 bottom-0 bg-[#080a0f] border-l border-white/10 transition-transform duration-500 z-[100] w-[400px] shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#050608] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Locus AI</span>
        </div>
        <button onClick={onClose} title="Close chat overlay"><X size={18} className="text-slate-500 hover:text-white"/></button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'text-white' : ''}`}
              style={
                msg.sender === 'user'
                  ? { backgroundColor: 'var(--chat-accent-primary)' }
                  : {
                      backgroundColor: 'var(--chat-accent-soft)',
                      color: 'var(--chat-accent-text)'
                    }
              }
            >
              {msg.sender === 'user' ? <User size={14} className="text-white" /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-cyan-600/10 border border-cyan-500/20 text-cyan-100' 
                : `${msg.status === 'error' ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/5'} text-slate-300`
            }`}
              style={
                msg.sender === 'user'
                  ? {
                      backgroundColor: 'var(--chat-accent-soft)',
                      borderColor: 'var(--chat-accent-soft-border)',
                      color: 'var(--chat-md-text)'
                    }
                  : undefined
              }
            >
              <MarkdownLite text={msg.text} className="text-sm" />
              {msg.status === 'pending' && (
                <div className="mt-2 text-xs" style={{ color: 'var(--chat-accent-text)' }}>กำลังรอคำตอบอยู่เบื้องหลัง...</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/5 bg-[#050608]">
        <div className="flex gap-2 bg-white/5 p-2 rounded-lg border border-white/5 focus-within:border-cyan-500/50 transition-colors">
          <input 
            className="flex-1 bg-transparent border-none outline-none text-sm text-white px-2 placeholder:text-slate-600" 
            placeholder="Send command..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            title="Send message"
            className={`p-2 rounded transition-colors ${isLoading ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'text-white hover:brightness-110'}`}
            style={isLoading ? undefined : { backgroundColor: 'var(--chat-accent-primary)' }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
