import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Bot, 
  User, 
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
  BookOpen,
  X,
  Tag,
  Trash2,
  MessageSquarePlus,
  Clock3,
  Edit3,
  RotateCcw,
  CornerDownLeft,
  Settings,
  Lightbulb,
  Map,
  Compass,
  Bed,
  Utensils,
  Bus,
  Flame,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Navigation
} from 'lucide-react';
import { ChatContext, ChatMessage as Message, RecentChatSummary, Source, useIntelligenceChatStore } from '../services/intelligenceChatStore';
import { MarkdownLite } from '../components/MarkdownLite';
import { useChatTheme } from '../theme/useChatTheme';
import { useChatThemeStore } from '../services/chatThemeStore';
import { GradientProgressBar } from '../components/GradientProgressBar';
import { Menu } from 'lucide-react';
import { regionsData, type Region, type Province } from '../data/regions';
import { LocationSearchModal } from '../components/LocationSearchModal';

interface SuggestedQuery {
  text: string;
  icon: React.ReactNode;
}

// ==================== PROVINCE ACTION DETECTION ====================

interface DetectedProvince {
  name: string;
  id: string;
  regionId: string;
  regionName: string;
}

/** Build a flat lookup from all regions + provinces for fast text matching */
const buildProvinceLookup = (): { provinces: Array<{ name: string; nameLower: string; id: string; regionId: string; regionName: string }>; regions: Array<{ id: string; name: string; engName: string }> } => {
  const provinces: Array<{ name: string; nameLower: string; id: string; regionId: string; regionName: string }> = [];
  const regions: Array<{ id: string; name: string; engName: string }> = [];

  for (const region of regionsData) {
    regions.push({ id: region.id, name: region.name, engName: region.engName });
    for (const province of region.subProvinces) {
      provinces.push({
        name: province.name,
        nameLower: province.name.toLowerCase(),
        id: province.id,
        regionId: region.id,
        regionName: region.engName,
      });
    }
  }
  return { provinces, regions };
};

const PROVINCE_LOOKUP = buildProvinceLookup();

/** Thai to ID mapping for provinces to ensure detection works with Thai text */
const THAI_PROVINCE_MAP: Record<string, string> = {
  'กรุงเทพ': 'bangkok', 'กรุงเทพมหานคร': 'bangkok', 'กทม': 'bangkok',
  'นนทบุรี': 'nonthaburi', 'ปทุมธานี': 'pathumthani', 'สมุทรปราการ': 'samutprakan',
  'สมุทรสาคร': 'samutsakhon', 'สมุทรสงคราม': 'samutsongkhram', 'นครปฐม': 'nakhonpathom',
  'อยุธยา': 'ayutthaya', 'พระนครศรีอยุธยา': 'ayutthaya', 'สระบุรี': 'saraburi',
  'ลพบุรี': 'lopburi', 'สิงห์บุรี': 'singburi', 'ชัยนาท': 'chainat', 'อ่างทอง': 'angthong',
  'นครสวรรค์': 'nakhonsawan', 'อุทัยธานี': 'uthaithani', 'กำแพงเพชร': 'kamphaengphet',
  'พิจิตร': 'phichit', 'พิษณุโลก': 'phitsanulok', 'เพชรบูรณ์': 'phetchabun',
  'สุโขทัย': 'sukhothai', 'เชียงใหม่': 'chiangmai', 'เชียงราย': 'chiangrai',
  'ลำพูน': 'lamphun', 'ลำปาง': 'lampang', 'แพร่': 'phrae', 'น่าน': 'nan',
  'พะเยา': 'phayao', 'แม่ฮ่องสอน': 'maehongson', 'อุตรดิตถ์': 'uttaradit',
  'ชลบุรี': 'chonburi', 'ระยอง': 'rayong', 'จันทบุรี': 'chanthaburi', 'ตราด': 'trat',
  'ฉะเชิงเทรา': 'chachoengsao', 'ปราจีนบุรี': 'prachinburi', 'นครนายก': 'nakhonnayok',
  'สระแก้ว': 'sa-kaeo', 'ขอนแก้ว': 'khonkaen', 'นครราชสีมา': 'nakhonratchasima',
  'โคราช': 'nakhonratchasima', 'อุดรธานี': 'udonthani', 'อุบลราชธานี': 'ubonratchathani',
  'บุรีรัมย์': 'buriram', 'สุรินทร์': 'surin', 'ศรีสะเกษ': 'sisaket', 'ร้อยเอ็ด': 'roiet',
  'ชัยภูมิ': 'chaiyaphum', 'มหาสารคาม': 'mahasarakham', 'เลย': 'loei',
  'หนองคาย': 'nongkhai', 'บึงกาฬ': 'buengkan', 'สกลนคร': 'sakonnakhon',
  'นครพนม': 'nakhonphanom', 'กาฬสินธุ์': 'kalasin', 'มุกดาหาร': 'mukdahan',
  'ยโสธร': 'yasothon', 'อำนาจเจริญ': 'amnatcharoen', 'หนองบัวลำภู': 'nongbualamphu',
  'ภูเก็ต': 'phuket', 'สุราษฎร์ธานี': 'suratthani', 'กระบี่': 'krabi', 'พังงา': 'phangnga',
  'นครศรีธรรมราช': 'nakhonsithammarat', 'สงขลา': 'songkhla', 'หาดใหญ่': 'songkhla',
  'สตูล': 'satun', 'ตรัง': 'trang', 'พัทลุง': 'phatthalung', 'ยะลา': 'yala',
  'ปัตตานี': 'pattani', 'นราธิวาส': 'narathiwat', 'ระนอง': 'ranong', 'ชุมพร': 'chumphon',
  'ประจวบคีรีขันธ์': 'prachuapkhirikhan', 'เพชรบุรี': 'phetchaburi', 'กาญจนบุรี': 'kanchanaburi',
  'ราชบุรี': 'ratchaburi', 'ตาก': 'tak'
};

/** Scan AI response text and extract mentioned provinces */
const extractMentionedProvinces = (text: string): DetectedProvince[] => {
  const found: DetectedProvince[] = [];
  const seen = new Set<string>();

  // 1. Check Thai Map
  for (const [thaiName, id] of Object.entries(THAI_PROVINCE_MAP)) {
    if (text.includes(thaiName) && !seen.has(id)) {
      const p = PROVINCE_LOOKUP.provinces.find(p => p.id === id);
      if (p) {
        seen.add(id);
        found.push({ name: p.name, id: p.id, regionId: p.regionId, regionName: p.regionName });
      }
    }
  }

  // 2. Check English IDs as fallback
  for (const p of PROVINCE_LOOKUP.provinces) {
    const regex = new RegExp(`\\b${p.id}\\b`, 'i');
    if (regex.test(text) && !seen.has(p.id)) {
      seen.add(p.id);
      found.push({ name: p.name, id: p.id, regionId: p.regionId, regionName: p.regionName });
    }
  }
  return found;
};

/** Detect if a region is mentioned */
const extractMentionedRegions = (text: string): Array<{ id: string; name: string; engName: string }> => {
  const found: Array<{ id: string; name: string; engName: string }> = [];
  const seen = new Set<string>();

  for (const r of PROVINCE_LOOKUP.regions) {
    const escapedName = r.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedEngName = r.engName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\\b${r.id}\\b)|(${escapedName})|(\\b${escapedEngName}\\b)`, 'i');
    
    if (regex.test(text) && !seen.has(r.id)) {
      seen.add(r.id);
      found.push(r);
    }
  }
  return found;
};

// ==================== MAIN COMPONENT ====================

export const IntelligencePage = () => {
  const location = useLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [pendingRouteContext, setPendingRouteContext] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    messages,
    chatContext,
    isLoading,
    recentChats,
    activeConversationId,
    setChatContext,
    setActiveConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    clearChat,
    sendMessage,
    resubmitMessage,
    deleteMessage,
    addUploadedFile
  } = useIntelligenceChatStore(searchQuery);
  const { theme } = useChatThemeStore();
  const [inputText, setInputText] = useState('');
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const [activeContextId, setActiveContextId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editTextareaRef, setEditTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSentRef = useRef(false);

  // Auto-resize textarea to fit content (like ChatGPT/Gemini)
  const autoResizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const maxHeight = 300; // Larger max height
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, []);
  const activeContext = activeContextId ? messages.find((message) => message.id === activeContextId) || null : null;

  useChatTheme(theme);

  // Check for context passed via navigation state
  useEffect(() => {
    const state = location.state as {
      context?: ChatContext;
      routeContext?: any;
      prefillInput?: string;
      autoSendMessage?: string;
      autoSendSystemContext?: string;
    } | null;

    if (state?.context) {
      setChatContext(state.context);
    }

    if (state?.autoSendMessage && !autoSentRef.current) {
      autoSentRef.current = true;
      
      // If there is routeContext, we NEVER auto-send. We just stage it.
      if (state.routeContext) {
        setPendingRouteContext(state.routeContext);
        setInputText(state.autoSendMessage || 'วิเคราะห์เส้นทางและความปลอดภัยที่ฉันเลือกให้หน่อย');
      } else {
        // Only auto-send if there is no route context (normal province navigation)
        sendMessage(state.autoSendMessage, {
          systemContext: state.autoSendSystemContext,
          routeContext: state.routeContext,
        });
      }
    }

    if (state?.prefillInput && !state?.autoSendMessage) {
      setInputText(state.prefillInput);
    }

    if (state?.context || state?.prefillInput || state?.autoSendMessage || state?.routeContext) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state, sendMessage, setChatContext]);

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

  useEffect(() => {
    if (activeContextId && !messages.some((message) => message.id === activeContextId)) {
      setActiveContextId(null);
    }
  }, [activeContextId, messages]);

  useEffect(() => {
    autoResizeTextarea();
  }, [inputText, autoResizeTextarea]);

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
    addUploadedFile(file);
  };

    const handleSend = async () => {
    if (!inputText.trim() && !pendingRouteContext) return;
    if (isLoading) return;

    const options: any = {};
    if (chatContext) {
      options.location = {
        provinceName: chatContext.name,
        regionName: chatContext.regionName,
        lat: chatContext.lat,
        lng: chatContext.lng
      };
    }

    if (pendingRouteContext) {
      options.routeContext = pendingRouteContext;
    }

    sendMessage(inputText || 'วิเคราะห์ข้อมูลเส้นทางที่แนบมาให้หน่อย', options);
    setInputText('');
    setPendingRouteContext(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };


  const handleResend = (messageText: string) => {
    if (isLoading) return;
    sendMessage(messageText);
  };

  const handleLocationSearchConfirm = (routeContext: any) => {
    setPendingRouteContext(routeContext);
  };

  const handleStartEdit = (messageId: string, messageText: string) => {
    setEditingMessageId(messageId);
    setEditingText(messageText);
  };

  const handleConfirmEdit = () => {
    if (!editingMessageId || !editingText.trim() || isLoading) return;
    resubmitMessage(editingMessageId, editingText);
    setEditingMessageId(null);
    setEditingText('');
    setInputText('');
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId);
    if (activeContextId === messageId) {
      setActiveContextId(null);
    }
  };


  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingMessageId) {
        handleConfirmEdit();
      } else {
        handleSend();
      }
    }
    if (e.key === 'Escape' && editingMessageId) {
      handleCancelEdit();
    }
    
    // Command detection: #search
    if (e.key === 'Enter' && !e.shiftKey && inputText.trim().toLowerCase() === '#search') {
      e.preventDefault();
      setInputText('');
      setIsLocationModalOpen(true);
    }
  };


  // Auto-resize edit textarea
  const autoResizeEditTextarea = useCallback(() => {
    const el = editTextareaRef;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [editTextareaRef]);


  useEffect(() => {
    autoResizeEditTextarea();
  }, [editingText, autoResizeEditTextarea]);

  const handleSuggestedQuery = (query: string) => {
    setInputText(query);
  };

  return (
    <div className="flex-1 flex bg-[#050608] overflow-hidden">
      {/* Sidebar (Recent Chats) toggleable */}
      {showSidebar && (
        <div className="w-[280px] shrink-0 border-r border-white/5 bg-[#080a0f] flex flex-col">
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/5 shrink-0">
            <div>
              <h2 className="text-sm font-semibold text-white">Recent Chats</h2>
              <p className="text-[11px] text-slate-500">ประวัติจะอยู่ตรงนี้จนกว่าจะลบเอง</p>
            </div>
            <button
              onClick={() => {
                const newConversationId = createConversation();
                setActiveConversation(newConversationId);
                setActiveContextId(null);
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 hover:text-white hover:brightness-110"
              style={{
                borderColor: 'var(--chat-accent-soft-border)',
                backgroundColor: 'var(--chat-accent-soft)',
                color: 'var(--chat-accent-text)'
              }}
            >
              <MessageSquarePlus size={14} />
              New
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-3 pt-4 pb-2">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <Compass size={14} className="animate-pulse" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อแชตหรือเนื้อหา..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {recentChats.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-slate-500">
                ยังไม่มีบทสนทนา เริ่มพิมพ์คำถามแรกได้เลย
              </div>
            ) : (
              recentChats.map((chat, index) => (
                <RecentChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeConversationId}
                  indexFromBottom={recentChats.length - 1 - index}
                  onSelect={() => {
                    setActiveConversation(chat.id);
                    setActiveContextId(null);
                  }}
                  onDelete={() => {
                    const isDeletingActive = chat.id === activeConversationId;
                    deleteConversation(chat.id);
                    if (isDeletingActive) {
                      setActiveContextId(null);
                    }
                  }}
                  onRename={(newTitle) => {
                    renameConversation(chat.id, newTitle);
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* LEFT PANEL: CHAT */}
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
        onDragEnter={handleDrag}
      >
        {/* Chat Header */}
        {(() => {
          const activeChatIndex = recentChats.findIndex(c => c.id === activeConversationId);
          const headerTheme = activeChatIndex !== -1 
            ? CHAT_HISTORY_COLORS[(recentChats.length - 1 - activeChatIndex) % CHAT_HISTORY_COLORS.length]
            : null;
            
          return (
            <div 
              className={`h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0 transition-all duration-500 relative overflow-hidden ${!headerTheme ? 'bg-[#0a0c10]' : ''}`}
              style={headerTheme ? {
                '--chat-accent': headerTheme.accent,
                '--chat-md-h1': headerTheme.mdH,
                '--chat-md-strong': headerTheme.mdB,
                '--chat-md-list-strong': headerTheme.mdB,
                '--chat-btn': headerTheme.btn,
              } as React.CSSProperties : {}}
            >
              {/* Dynamic Gradient Background */}
              {headerTheme && (
                <div className={`absolute inset-0 bg-gradient-to-r ${headerTheme.headerGradient} opacity-50 transition-all duration-700`}></div>
              )}
              
              <div className="flex items-center gap-3 relative z-10">
                {/* Sidebar Toggle Button */}
                <button
                  onClick={() => setShowSidebar((v) => !v)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-transparent hover:bg-white/10 transition-transform"
                  title={showSidebar ? 'ซ่อน Recent Chats' : 'แสดง Recent Chats'}
                >
                  {showSidebar ? <PanelLeftClose size={20} className="text-slate-400" /> : <PanelLeftOpen size={20} className="text-slate-400" />}
                </button>
                <div>
                  <h1 className="text-lg font-bold text-white">Locus Agent</h1>
                  <p className="text-xs text-slate-500">Powered by LightRAG + Gemini</p>
                </div>
              </div>
                    <div className="flex items-center gap-3">
            {/* Context Badge */}
            {chatContext && (
                <div className="flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white/5" style={{ borderColor: 'rgba(var(--chat-accent-rgb, 14, 165, 233), 0.2)' }}>
                <Tag size={12} style={{ color: 'var(--chat-accent)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--chat-accent)' }}>{chatContext.name}</span>
                <button 
                  onClick={() => setChatContext(null)}
                  title="ลบ context"
                  className="ml-1 transition-colors hover:text-white"
                  style={{ color: 'var(--chat-accent)' }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/5" style={{ borderColor: 'rgba(var(--chat-accent-rgb, 14, 165, 233), 0.2)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--chat-accent)' }}></div>
              <span className="text-xs font-medium" style={{ color: 'var(--chat-accent)' }}>{isLoading ? 'Thinking...' : 'Online'}</span>
            </div>
          </div>
        </div>
          );
        })()}

        {/* Chat Messages */}
        <div 
          className={`flex-1 overflow-y-auto p-6 space-y-4 relative ${dragActive ? 'bg-cyan-500/5 border-2 border-dashed border-cyan-500/30' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={(() => {
            const activeChatIndex = recentChats.findIndex(c => c.id === activeConversationId);
            const theme = activeChatIndex !== -1 
              ? CHAT_HISTORY_COLORS[(recentChats.length - 1 - activeChatIndex) % CHAT_HISTORY_COLORS.length]
              : null;
            if (!theme) return {};
            return {
              '--chat-md-h1': theme.mdH,
              '--chat-md-h2': theme.mdH,
              '--chat-md-h3': theme.mdH,
              '--chat-md-strong': theme.mdB,
              '--chat-md-list-strong': theme.mdB,
              '--chat-md-link': theme.mdL,
              '--chat-md-bullet': theme.mdH,
              '--chat-btn': theme.btn,
              '--chat-accent': theme.accent,
            } as React.CSSProperties;
          })()}
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
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border bg-white/5" style={{ borderColor: 'rgba(var(--chat-accent-rgb, 6, 182, 212), 0.2)' }}>
                <Bot size={40} style={{ color: 'var(--chat-accent)' }} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Intel Room พร้อมใช้งาน</h2>
              <p className="text-slate-400 text-sm mb-8 max-w-md">
                ถามคำถามเกี่ยวกับข้อมูลจังหวัด วิเคราะห์ความปลอดภัย หรือวางแผนการเดินทาง
              </p>

              {recentChats.length > 0 && (
                <p className="mb-6 text-xs text-slate-500">
                  หรือเลือกบทสนทนาเก่าจาก `Recent Chats` ด้านซ้าย
                </p>
              )}
              
              {/* Suggested Queries */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {suggestedQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuery(query.text)}
                    className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-sm text-slate-300 transition-all group"
                  >
                    <div style={{ color: 'var(--chat-accent)' }}>{query.icon}</div>
                    <span className="line-clamp-2">{query.text}</span>
                    <ChevronRight size={14} className="ml-auto text-slate-600 group-hover:text-[var(--chat-accent)] transition-colors" />
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
              onViewContext={() => setActiveContextId(msg.id)}
              isActiveContext={activeContext?.id === msg.id}
              isLoading={isLoading}
              onResend={handleResend}
              onStartEdit={handleStartEdit}
              isEditing={editingMessageId === msg.id}
              editingText={editingText}
              onEditingTextChange={setEditingText}
              onConfirmEdit={handleConfirmEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={() => handleDeleteMessage(msg.id)}
              setEditTextareaRef={setEditTextareaRef}
            />
          ))}

          <div ref={messagesEndRef} className="h-24" />
        </div>

        {/* Input Area */}
        {/* Input Area - Premium AI Command Center */}
        <div className="p-6 mx-auto w-full max-w-4xl bg-gradient-to-t from-[#050608] pb-10 via-[#050608]/90 to-transparent sticky bottom-0 z-10">
          <div 
            className="relative flex flex-col gap-2 bg-[#11141b] border border-white/5 rounded-[2rem] p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transition-all focus-within:border-indigo-500/30 focus-within:ring-4 focus-within:ring-indigo-500/5 group"
          >
            <div className="flex items-end gap-3 px-4 pt-2">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={pendingRouteContext ? "ถามคำถามเกี่ยวกับเส้นทางที่แนบไว้..." : "ถามคำถาม หรือบอกให้ Locus ช่วยวางแผนให้..."}
                rows={1}
                style={{ maxHeight: "300px", minHeight: "44px", overflowY: "auto" }}
                className="w-full flex-1 bg-transparent border-none outline-none text-[16px] text-white placeholder:text-slate-600 resize-none py-3 leading-relaxed custom-scrollbar font-medium"
              />

              <div className="flex items-center gap-2 shrink-0 pb-2">
                <button
                  onClick={handleSend}
                  disabled={(!inputText.trim() && !pendingRouteContext) || isLoading}
                  className="w-10 h-10 flex items-center justify-center disabled:opacity-30 disabled:grayscale rounded-2xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                  }}
                  title="Send message"
                >
                  <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
                </button>
              </div>
            </div>

            {/* Accessory Bar */}
            <div className="flex items-center justify-between px-4 pb-2 border-t border-white/[0.02] pt-2 mt-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider"
                >
                  <MapPin size={14} />
                  Location
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider"
                >
                  <Upload size={14} />
                  Upload
                </button>
              </div>
              
              <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest hidden sm:block">
                Press Enter to send
              </div>
            </div>

            {/* Pending Context Badge - Floating inside input */}
            {pendingRouteContext && (
              <div className="absolute -top-16 left-4 right-4 flex justify-start pointer-events-none">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#11141b] backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-auto">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Navigation size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Route Context Active</span>
                    <span className="text-[11px] font-bold text-white">
                      {(pendingRouteContext.estimatedDistanceKm || 0).toFixed(1)} KM • {Math.round(pendingRouteContext.estimatedDurationMin || 0)} Min
                    </span>
                  </div>
                  <button 
                    onClick={() => setPendingRouteContext(null)}
                    className="ml-2 p-1.5 hover:bg-white/5 rounded-lg text-slate-600 hover:text-rose-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.csv,.txt,.json"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

            {/* RIGHT PANEL: CONTEXT CANVAS */}
      <div className="hidden">
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


      {/* QUICK LOCATION SEARCH MODAL */}
      <LocationSearchModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onConfirm={handleLocationSearchConfirm}
      />
    </div>
  );
};


        // ==================== SUB COMPONENTS ====================

interface MessageBubbleProps {
  message: Message;
  onViewContext: () => void;
  isActiveContext: boolean;
  isLoading: boolean;
  onResend: (text: string) => void;
  onStartEdit: (id: string, text: string) => void;
  isEditing: boolean;
  editingText: string;
  onEditingTextChange: (text: string) => void;
  onConfirmEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  setEditTextareaRef: (el: HTMLTextAreaElement | null) => void;
}

const MessageBubble = ({
  message,
  onViewContext,
  isActiveContext,
  isLoading,
  onResend,
  onStartEdit,
  isEditing,
  editingText,
  onEditingTextChange,
  onConfirmEdit,
  onCancelEdit,
  onDelete,
  setEditTextareaRef
}: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const isError = message.status === 'error';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find the user message that this bot message is responding to
  // (used for resend - we want to resend the user message that preceded this error)

  return (
    <div className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isEditing ? 'flex-col' : ''}`}>
      {/* Avatar */}
      {!isEditing && (
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
          style={{ 
            backgroundColor: isUser ? 'rgba(var(--chat-btn-rgb, 6, 182, 212), 0.15)' : 'rgba(var(--chat-accent-rgb, 6, 182, 212), 0.15)',
            borderColor: isUser ? 'var(--chat-btn)' : 'var(--chat-accent)',
          }}
        >
          {isUser 
            ? <User size={18} style={{ color: 'var(--chat-btn)' }} /> 
            : <Bot size={18} style={{ color: 'var(--chat-accent)' }} />}
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} w-full`}>
        {isEditing ? (
          /* ── Edit Mode ── */
          <div className="flex flex-col gap-2">
            {/* Edit input row */}
            <div className="flex items-center gap-2">
              <CornerDownLeft size={14} className="text-cyan-400 shrink-0" />
              <span className="text-xs text-cyan-400">แก้ไขข้อความ</span>
            </div>
            <div className="relative flex items-end gap-2 bg-[#1a1e26] border border-cyan-500/50 rounded-2xl px-4 py-2">
              <textarea
                ref={setEditTextareaRef}
                value={editingText}
                onChange={(e) => onEditingTextChange(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-white resize-none py-2 max-h-[200px] overflow-y-auto"
                rows={1}
                autoFocus
              />
              <div className="flex items-center gap-1 shrink-0 pb-1">
                <button
                  onClick={onCancelEdit}
                  className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs"
                  title="ยกเลิก (Esc)"
                >
                  <X size={14} />
                </button>
                <button
                  onClick={onConfirmEdit}
                  disabled={!editingText.trim() || isLoading}
                  className="p-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-lg text-white transition-colors"
                  title="ส่งข้อความใหม่ (Enter)"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">กด Enter เพื่อส่ง หรือ Esc เพื่อยกเลิก</p>
          </div>
        ) : (
          /* ── Normal / Error Bubble ── */
          <>
            <div className={`p-4 rounded-2xl shadow-xl transition-all duration-300 ${
              isUser 
                ? 'bg-[#f1f5f9] text-slate-900 font-medium rounded-tr-md scale-[1.01] origin-right shadow-white/5' 
                : `bg-white/5 border ${
                    isError
                      ? 'border-red-500/30'
                      : isActiveContext
                        ? 'border-cyan-500/50'
                        : 'border-white/5'
                  } rounded-tl-md`
            }`}>
              {/* Error banner */}
              {isError && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  <span className="shrink-0">⚠️</span>
                  <span>ส่งข้อความไปไม่ได้ ลองส่งใหม่หรือแก้ไขข้อความ</span>
                </div>
              )}

              {/* Message Text with Markdown-like formatting */}
              {isUser ? (
                <div style={{ 
                  '--chat-md-text': '#000000',
                  '--chat-md-strong': '#000000',
                  '--chat-md-list-strong': '#000000',
                  '--chat-md-h1': '#000000',
                  '--chat-md-h2': '#000000',
                  '--chat-md-h3': '#000000',
                  '--chat-md-bullet': '#333333',
                  '--chat-md-muted': '#444444'
                } as any}>
                  <MarkdownLite text={message.text} className="text-sm" />
                </div>
              ) : (
                <MarkdownLite text={message.text} className="text-sm" />
              )}

              {message.status === 'pending' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-cyan-400">
                  <RefreshCw size={12} className="animate-spin" />
                  <span>กำลังรอคำตอบอยู่เบื้องหลัง</span>
                </div>
              )}

              {/* Smart Action Buttons - only for bot messages that are complete */}
              {!isUser && message.status === 'complete' && !message.isSystem && (
                <SmartActionBar text={message.text} />
              )}

              {/* Sources */}
              {false && message.status !== 'pending' && message.sources && message.sources.length > 0 && (
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
            <div className={`flex items-center gap-1 mt-2 transition-opacity ${isError ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {/* User: edit + resend */}
              {isUser && (
                <>
                  <button
                    onClick={() => onStartEdit(message.id, message.text)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                    title="แก้ไขข้อความ"
                  >
                    <Edit3 size={12} />
                    แก้ไข
                  </button>
                  {(isError || message.status === 'pending') && (
                    <button
                      onClick={() => onResend(message.text)}
                      disabled={isLoading}
                      className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
                      title="ส่งใหม่"
                    >
                      <RotateCcw size={12} />
                      ส่งใหม่
                    </button>
                  )}
                </>
              )}
              {/* Bot: copy */}
              {!isUser && (
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Copy"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              )}
              {/* Delete button (for both) */}
              <button
                onClick={onDelete}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-auto"
                title="ลบข้อความนี้"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ==================== SMART ACTION BAR ====================

interface SmartActionBarProps {
  text: string;
}

const SmartActionBar = ({ text }: SmartActionBarProps) => {
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const provinces = useMemo(() => extractMentionedProvinces(text), [text]);
  const regions = useMemo(() => extractMentionedRegions(text), [text]);

  // If no provinces or regions detected, show generic actions only
  const hasProvinces = provinces.length > 0;
  const hasRegions = regions.length > 0;
  
  if (!hasProvinces && !hasRegions) return null;

  // Primary action logic
  const handlePrimaryAction = () => {
    console.log('[SmartActionBar] handlePrimaryAction triggered. Provinces:', provinces);
    if (provinces.length === 1) {
      const p = provinces[0];
      const targetUrl = `/province/${p.regionId}/${p.id}`;
      console.log(`[SmartActionBar] Navigating to: ${targetUrl}`);
      navigate(targetUrl);
    } else if (provinces.length > 1) {
      setShowSelector(true);
    } else if (regions.length > 0) {
      const r = regions[0];
      navigate(`/travel-guide/${r.id}`);
    }
  };

  return (
    <div className="mt-4 pt-3 border-t border-white/[0.06] relative">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePrimaryAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-black transition-all shadow-lg active:scale-[0.98] hover:scale-[1.02]"
          style={{ 
            backgroundColor: 'rgba(var(--chat-btn-rgb, 6, 182, 212), 0.1)', 
            border: '1px solid var(--chat-btn)',
            color: 'var(--chat-btn)',
          } as React.CSSProperties}
        >
          <Compass size={14} className="animate-pulse" style={{ color: 'var(--chat-btn)' }} />
          {provinces.length > 1 
            ? `View Mentioned Provinces (${provinces.length})` 
            : provinces.length === 1 
              ? `View ${provinces[0].name} Tactical Detail` 
              : 'Explore Regional Intelligence'}
        </button>
      </div>

      {/* Multi-Province Selector Popup */}
      {showSelector && (
        <>
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setShowSelector(false)} 
          />
          <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[101] animate-in slide-in-from-bottom-2 duration-200">
            <div className="p-3 border-b border-white/5 bg-white/[0.02]">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Province to View</h3>
            </div>
            <div className="max-h-48 overflow-y-auto p-1.5 custom-scrollbar">
              {provinces.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigate(`/province/${p.regionId}/${p.id}`);
                    setShowSelector(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-300 text-xs font-bold transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20">
                    <MapPin size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{p.name}</div>
                    <div className="text-[9px] text-slate-500 uppercase">{p.regionName}</div>
                  </div>
                  <ChevronRight size={12} className="text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
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

interface RecentChatItemProps {
  chat: RecentChatSummary
  isActive: boolean
  indexFromBottom: number
  onSelect: () => void
  onDelete: () => void
  onRename: (newTitle: string) => void
}

const CHAT_HISTORY_COLORS = [
  { 
    bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', iconBg: 'bg-green-500/20', 
    active: 'bg-green-500/20 border-green-500/50 shadow-green-500/10',
    headerGradient: 'from-green-600/40 via-green-500/20 to-green-600/30',
    mdH: '#22c55e', mdB: '#86efac', mdL: '#c084fc', btn: '#a855f7', accent: '#22c55e'
  }, // Green -> Purple Button
  { 
    bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', iconBg: 'bg-yellow-500/20', 
    active: 'bg-yellow-500/20 border-yellow-500/50 shadow-yellow-500/10',
    headerGradient: 'from-yellow-600/40 via-yellow-500/20 to-yellow-600/30',
    mdH: '#facc15', mdB: '#a16207', mdL: '#60a5fa', btn: '#3b82f6', accent: '#facc15'
  }, // Yellow -> Blue Button
  { 
    bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', iconBg: 'bg-orange-500/20', 
    active: 'bg-orange-500/20 border-orange-500/50 shadow-orange-500/10',
    headerGradient: 'from-orange-600/40 via-orange-500/20 to-orange-600/30',
    mdH: '#fb923c', mdB: '#ca8a04', mdL: '#4ade80', btn: '#22c55e', accent: '#fb923c'
  }, // Orange -> Green Button
  { 
    bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', iconBg: 'bg-rose-500/20', 
    active: 'bg-rose-500/20 border-rose-500/50 shadow-rose-500/10',
    headerGradient: 'from-rose-600/40 via-rose-500/20 to-rose-600/30',
    mdH: '#f87171', mdB: '#fb923c', mdL: '#facc15', btn: '#06b6d4', accent: '#f87171'
  }, // Red -> Cyan Button
  { 
    bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', iconBg: 'bg-purple-500/20', 
    active: 'bg-purple-500/20 border-purple-500/50 shadow-purple-500/10',
    headerGradient: 'from-purple-600/40 via-purple-500/20 to-purple-600/30',
    mdH: '#c084fc', mdB: '#f87171', mdL: '#fb923c', btn: '#facc15', accent: '#c084fc'
  }, // Purple -> Yellow Button
  { 
    bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', iconBg: 'bg-blue-500/20', 
    active: 'bg-blue-500/20 border-blue-500/50 shadow-blue-500/10',
    headerGradient: 'from-blue-600/40 via-blue-500/20 to-blue-600/30',
    mdH: '#60a5fa', mdB: '#c084fc', mdL: '#f87171', btn: '#fb923c', accent: '#60a5fa'
  }, // Blue -> Orange Button
];

const formatRelativeChatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short'
  }).format(date)
}

const RecentChatItem = ({ chat, isActive, indexFromBottom, onSelect, onDelete, onRename }: RecentChatItemProps) => {
  const colorTheme = CHAT_HISTORY_COLORS[indexFromBottom % CHAT_HISTORY_COLORS.length];
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleRenameConfirm = () => {
    if (editTitle.trim() && editTitle !== chat.title) {
      onRename(editTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameConfirm();
    } else if (e.key === 'Escape') {
      setEditTitle(chat.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group w-full rounded-2xl border p-3 transition-all duration-300 ${
        isActive
          ? `${colorTheme.active} shadow-lg scale-[1.02]`
          : `${colorTheme.bg} ${colorTheme.border} hover:scale-[1.01] hover:brightness-125`
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 rounded-xl p-2 transition-colors ${
            isActive ? colorTheme.iconBg + ' ' + colorTheme.text : 'bg-white/5 text-slate-400 group-hover:' + colorTheme.text
          }`}
        >
          <Clock3 size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <input
                  ref={inputRef}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleRenameConfirm}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-black/20 border-b border-cyan-500 text-sm font-semibold text-white focus:outline-none py-0.5"
                />
              ) : (
                <button onClick={onSelect} className="w-full text-left">
                  <div className={`truncate text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {chat.title}
                  </div>
                </button>
              )}
              <div className="mt-1 text-[11px] text-slate-500">{formatRelativeChatTime(chat.updatedAt)}</div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
              {!isEditing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
                  title="เปลี่ยนชื่อแชต"
                >
                  <Edit3 size={14} />
                </button>
              )}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-300"
                title="ลบบทสนทนานี้"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <button onClick={onSelect} className="w-full text-left">
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
              {chat.preview}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {chat.contextName && (
                <span className={`rounded-full border px-2 py-1 text-[10px] font-medium ${colorTheme.border} ${colorTheme.bg} ${colorTheme.text}`}>
                  {chat.contextName}
                </span>
              )}
              {chat.isPending && (
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300 animate-pulse">
                  Pending
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
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

// ==================== END OF FILE ====================

