import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  FileText,
  Link2,
  Network,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RefreshCw,
  Upload,
  ChevronRight,
  MapPin,
  ExternalLink,
  Lightbulb,
  BookOpen,
  X,
  Tag
} from 'lucide-react';
import { sendChatMessage } from '../services/n8nClient';

// ==================== TYPES ====================

interface ChatContext {
  type: 'region' | 'province';
  name: string;
  regionId?: string;
  engName?: string;
  provinces?: string[];
  stats?: any;
  safety?: number;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sources?: Source[];
  contextType?: 'text' | 'graph' | 'map' | 'table';
  contextData?: any;
}

interface Source {
  id: string;
  title: string;
  type: 'document' | 'web' | 'database' | 'knowledge';
  url?: string;
  snippet?: string;
}

interface SuggestedQuery {
  text: string;
  icon: React.ReactNode;
}

// ==================== MAIN COMPONENT ====================

export const IntelligencePage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const [activeContext, setActiveContext] = useState<Message | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for context passed via navigation state
  useEffect(() => {
    const state = location.state as { context?: ChatContext } | null;
    if (state?.context) {
      setChatContext(state.context);
      // Auto-generate a welcome message based on context
      const contextMsg: Message = {
        id: 'context-' + Date.now(),
        text: `🎯 Context loaded: **${state.context.name}** (${state.context.type === 'region' ? 'ภาค' : 'จังหวัด'})\n\nคุณสามารถถามคำถามเกี่ยวกับ${state.context.name}ได้เลย เช่น:\n• ข้อมูลค่าครองชีพ\n• แหล่งท่องเที่ยวแนะนำ\n• ความปลอดภัย\n• เส้นทางการเดินทาง`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([contextMsg]);
    }
  }, [location.state]);

  // Suggested queries for empty state
  const suggestedQueries: SuggestedQuery[] = chatContext ? [
    { text: `วิเคราะห์ความปลอดภัยของ${chatContext.name}`, icon: <MapPin size={14} /> },
    { text: `แนะนำที่เที่ยวใน${chatContext.name}`, icon: <Lightbulb size={14} /> },
    { text: `ค่าครองชีพเฉลี่ยของ${chatContext.name}เป็นอย่างไร`, icon: <BookOpen size={14} /> },
    { text: `เส้นทางการเดินทางไป${chatContext.name}`, icon: <Network size={14} /> },
  ] : [
    { text: 'วิเคราะห์ความปลอดภัยของจังหวัดเชียงใหม่', icon: <MapPin size={14} /> },
    { text: 'เปรียบเทียบค่าครองชีพ ภาคเหนือ vs ภาคใต้', icon: <Lightbulb size={14} /> },
    { text: 'วางแผนเที่ยวภูเก็ต 3 วัน เน้นโซนปลอดภัย', icon: <BookOpen size={14} /> },
    { text: 'แสดงความสัมพันธ์แหล่งท่องเที่ยวกับโครงสร้างพื้นฐาน', icon: <Network size={14} /> },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle file drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    // TODO: Implement file analysis with LightRAG
    const fileMsg: Message = {
      id: Date.now().toString(),
      text: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fileMsg]);
    
    // Simulate AI response for file analysis
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `กำลังวิเคราะห์ไฟล์ "${file.name}"...\n\nฟีเจอร์นี้จะเชื่อมต่อกับ LightRAG เพื่อ:\n• Extract entities และ relationships\n• สร้าง Knowledge Graph\n• ค้นหาข้อมูลที่เกี่ยวข้อง`,
        sender: 'bot',
        timestamp: new Date(),
        contextType: 'text'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    // Build message with context if available
    let messageWithContext = inputText;
    if (chatContext) {
      const contextInfo = `[Context: ${chatContext.type === 'region' ? 'ภาค' : 'จังหวัด'} ${chatContext.name}${chatContext.provinces ? `, provinces: ${chatContext.provinces.join(', ')}` : ''}${chatContext.stats ? `, daily cost: ${chatContext.stats.dailyCost}, safety: ${chatContext.safety}%` : ''}]`;
      messageWithContext = `${contextInfo}\n\nUser question: ${inputText}`;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(messageWithContext);
      
      // Generate mock sources (in production, these come from LightRAG)
      const mockSources: Source[] = [
        { id: '1', title: 'ข้อมูลจังหวัด - SQLite DB', type: 'database', snippet: 'Province statistics and safety data' },
        { id: '2', title: 'Tourism Authority of Thailand', type: 'web', url: 'https://www.tat.or.th', snippet: 'Official tourism information' },
      ];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        sources: mockSources,
        contextType: determineContextType(userMsg.text),
        contextData: generateMockContextData(userMsg.text)
      };
      
      setMessages(prev => [...prev, botMsg]);
      setActiveContext(botMsg);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: '❌ ไม่สามารถเชื่อมต่อ Agent ได้ กรุณาตรวจสอบการเชื่อมต่อ n8n และ Ngrok',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInputText(query);
  };

  return (
    <div className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* LEFT PANEL: CHAT */}
      <div 
        className={`flex flex-col transition-all duration-300 ${isCanvasExpanded ? 'w-[400px]' : 'flex-1'}`}
        onDragEnter={handleDrag}
      >
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0c10] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Locus Intelligence</h1>
              <p className="text-xs text-slate-500">Powered by LightRAG + Gemini</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Context Badge */}
            {chatContext && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
                <Tag size={12} className="text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">{chatContext.name}</span>
                <button 
                  onClick={() => setChatContext(null)}
                  title="ลบ context"
                  className="ml-1 text-purple-400 hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          className={`flex-1 overflow-y-auto p-6 space-y-4 relative ${dragActive ? 'bg-cyan-500/5 border-2 border-dashed border-cyan-500/30' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Drop Zone Overlay */}
          {dragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050608]/80 z-10">
              <div className="text-center">
                <Upload size={48} className="text-cyan-400 mx-auto mb-4" />
                <p className="text-white font-medium">Drop file to analyze</p>
                <p className="text-sm text-slate-400">PDF, CSV, TXT supported</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <Bot size={40} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Intel Room พร้อมใช้งาน</h2>
              <p className="text-slate-400 text-sm mb-8 max-w-md">
                ถามคำถามเกี่ยวกับข้อมูลจังหวัด วิเคราะห์ความปลอดภัย หรือวางแผนการเดินทาง
              </p>
              
              {/* Suggested Queries */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {suggestedQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuery(query.text)}
                    className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-sm text-slate-300 transition-all group"
                  >
                    <div className="text-cyan-400">{query.icon}</div>
                    <span className="line-clamp-2">{query.text}</span>
                    <ChevronRight size={14} className="ml-auto text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onViewContext={() => setActiveContext(msg)}
              isActiveContext={activeContext?.id === msg.id}
            />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                <Bot size={20} className="text-cyan-400" />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-md p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw size={14} className="text-cyan-400 animate-spin" />
                  <span className="text-sm text-slate-400">กำลังวิเคราะห์...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0a0c10]">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ถามคำถาม หรือลากไฟล์มาวิเคราะห์..."
              rows={1}
              className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 pr-24 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 resize-none transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Upload file"
              >
                <Upload size={18} />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                title="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.csv,.txt,.json"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
            title="Upload file for analysis"
          />
        </div>
      </div>

      {/* RIGHT PANEL: CONTEXT CANVAS */}
      <div className={`border-l border-white/5 bg-[#0a0c10] flex flex-col transition-all duration-300 ${isCanvasExpanded ? 'flex-1' : 'w-[450px]'}`}>
        {/* Canvas Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <Network size={18} className="text-cyan-400" />
            <span className="text-sm font-medium text-white">Context Canvas</span>
          </div>
          <button
            onClick={() => setIsCanvasExpanded(!isCanvasExpanded)}
            className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isCanvasExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeContext ? (
            <ContextCanvas context={activeContext} />
          ) : (
            <EmptyCanvas />
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== SUB COMPONENTS ====================

interface MessageBubbleProps {
  message: Message;
  onViewContext: () => void;
  isActiveContext: boolean;
}

const MessageBubble = ({ message, onViewContext, isActiveContext }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
          : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
      }`}>
        {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-cyan-400" />}
      </div>

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`p-4 rounded-2xl ${
          isUser 
            ? 'bg-cyan-600/10 border border-cyan-500/20 rounded-tr-md' 
            : `bg-white/5 border ${isActiveContext ? 'border-cyan-500/50' : 'border-white/5'} rounded-tl-md`
        }`}>
          {/* Message Text with Markdown-like formatting */}
          <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
            {message.text}
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <Link2 size={12} />
                <span>Sources</span>
              </div>
              <div className="space-y-1">
                {message.sources.map((source) => (
                  <SourceBadge key={source.id} source={source} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Copy"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
            {message.contextType && (
              <button
                onClick={onViewContext}
                className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg transition-colors ${
                  isActiveContext 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-slate-500 hover:text-white hover:bg-white/10'
                }`}
              >
                <Network size={12} />
                View Context
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SourceBadge = ({ source }: { source: Source }) => {
  const icons = {
    document: <FileText size={12} />,
    web: <ExternalLink size={12} />,
    database: <Network size={12} />,
    knowledge: <Sparkles size={12} />,
  };

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors group"
    >
      <span className="text-cyan-400">{icons[source.type]}</span>
      <span className="text-slate-300 group-hover:text-white truncate flex-1">{source.title}</span>
      {source.url && <ExternalLink size={10} className="text-slate-500" />}
    </a>
  );
};

const ContextCanvas = ({ context }: { context: Message }) => {
  return (
    <div className="space-y-4">
      {/* Context Type Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {context.contextType === 'graph' && <Network size={16} className="text-purple-400" />}
          {context.contextType === 'map' && <MapPin size={16} className="text-emerald-400" />}
          {context.contextType === 'table' && <FileText size={16} className="text-amber-400" />}
          {context.contextType === 'text' && <BookOpen size={16} className="text-cyan-400" />}
          <span className="text-sm font-medium text-white capitalize">{context.contextType} View</span>
        </div>
      </div>

      {/* Context Visualization */}
      {context.contextType === 'graph' && <KnowledgeGraphPreview data={context.contextData} />}
      {context.contextType === 'map' && <MapPreview data={context.contextData} />}
      {context.contextType === 'table' && <TablePreview data={context.contextData} />}
      {context.contextType === 'text' && <TextAnalysisPreview data={context.contextData} />}

      {/* Related Entities */}
      {context.contextData?.entities && (
        <div className="mt-6">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Related Entities</h3>
          <div className="flex flex-wrap gap-2">
            {context.contextData.entities.map((entity: string, idx: number) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 hover:border-cyan-500/30 cursor-pointer transition-colors"
              >
                {entity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const KnowledgeGraphPreview = ({ data }: { data: any }) => (
  <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4 h-[300px] flex items-center justify-center relative overflow-hidden">
    {/* Mock Graph Visualization */}
    <div className="absolute inset-0 opacity-30">
      <svg className="w-full h-full">
        {/* Mock nodes and edges */}
        <circle cx="50%" cy="30%" r="20" fill="#06b6d4" opacity="0.5" />
        <circle cx="30%" cy="60%" r="15" fill="#8b5cf6" opacity="0.5" />
        <circle cx="70%" cy="60%" r="15" fill="#10b981" opacity="0.5" />
        <circle cx="50%" cy="80%" r="12" fill="#f59e0b" opacity="0.5" />
        <line x1="50%" y1="30%" x2="30%" y2="60%" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
        <line x1="50%" y1="30%" x2="70%" y2="60%" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
        <line x1="30%" y1="60%" x2="50%" y2="80%" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <line x1="70%" y1="60%" x2="50%" y2="80%" stroke="#10b981" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
    <div className="text-center z-10">
      <Network size={32} className="text-purple-400 mx-auto mb-3" />
      <p className="text-sm text-white font-medium">Knowledge Graph</p>
      <p className="text-xs text-slate-500 mt-1">{data?.nodeCount || 4} nodes • {data?.edgeCount || 4} relationships</p>
    </div>
  </div>
);

const MapPreview = ({ data }: { data: any }) => (
  <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4 h-[300px] flex items-center justify-center">
    <div className="text-center">
      <MapPin size={32} className="text-emerald-400 mx-auto mb-3" />
      <p className="text-sm text-white font-medium">Location Map</p>
      <p className="text-xs text-slate-500 mt-1">{data?.location || 'Thailand'}</p>
    </div>
  </div>
);

const TablePreview = ({ data }: { data: any }) => (
  <div className="bg-[#0f1115] rounded-xl border border-white/5 overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10">
          <th className="text-left p-3 text-slate-400 font-medium">Metric</th>
          <th className="text-right p-3 text-slate-400 font-medium">Value</th>
        </tr>
      </thead>
      <tbody>
        {(data?.rows || [
          { label: 'Safety Index', value: '85%' },
          { label: 'Cost of Living', value: '฿15,000/mo' },
          { label: 'Population', value: '1.2M' },
        ]).map((row: any, idx: number) => (
          <tr key={idx} className="border-b border-white/5 last:border-0">
            <td className="p-3 text-slate-300">{row.label}</td>
            <td className="p-3 text-right text-white font-medium">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TextAnalysisPreview = ({ data }: { data: any }) => (
  <div className="space-y-4">
    <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4">
      <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Key Insights</h4>
      <ul className="space-y-2">
        {(data?.insights || [
          'ข้อมูลถูกดึงจาก Local Database',
          'วิเคราะห์ด้วย LightRAG Graph',
          'อ้างอิงจาก 3 แหล่งข้อมูล'
        ]).map((insight: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
            <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
            {insight}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const EmptyCanvas = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8">
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
      <Network size={28} className="text-slate-600" />
    </div>
    <h3 className="text-sm font-medium text-slate-400 mb-2">Context Canvas</h3>
    <p className="text-xs text-slate-500 max-w-[200px]">
      เลือกข้อความจาก AI เพื่อดู Knowledge Graph, แผนที่ หรือข้อมูลเชิงลึก
    </p>
  </div>
);

// ==================== HELPER FUNCTIONS ====================

function determineContextType(query: string): 'text' | 'graph' | 'map' | 'table' {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes('ความสัมพันธ์') || lowerQuery.includes('เชื่อมโยง') || lowerQuery.includes('network')) {
    return 'graph';
  }
  if (lowerQuery.includes('แผนที่') || lowerQuery.includes('ตำแหน่ง') || lowerQuery.includes('เส้นทาง') || lowerQuery.includes('จังหวัด')) {
    return 'map';
  }
  if (lowerQuery.includes('เปรียบเทียบ') || lowerQuery.includes('สถิติ') || lowerQuery.includes('ค่า')) {
    return 'table';
  }
  return 'text';
}

function generateMockContextData(query: string): any {
  const contextType = determineContextType(query);
  
  const baseEntities = ['เชียงใหม่', 'ภาคเหนือ', 'ท่องเที่ยว', 'ความปลอดภัย', 'ค่าครองชีพ'];
  
  switch (contextType) {
    case 'graph':
      return { nodeCount: 12, edgeCount: 18, entities: baseEntities };
    case 'map':
      return { location: 'Northern Thailand', entities: baseEntities };
    case 'table':
      return { 
        rows: [
          { label: 'Safety Index', value: '85%' },
          { label: 'Daily Cost', value: '฿350' },
          { label: 'Monthly Rent', value: '฿8,000' },
        ],
        entities: baseEntities 
      };
    default:
      return { 
        insights: [
          'วิเคราะห์จากข้อมูล 4 ภูมิภาค',
          'ความปลอดภัยเฉลี่ย 84%',
          'แนะนำช่วงเวลาท่องเที่ยว: พ.ย. - ก.พ.'
        ],
        entities: baseEntities 
      };
  }
}
