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
  Tag,
  Trash2,
  MessageSquarePlus,
  Clock3,
  Edit3,
  RotateCcw,
  CornerDownLeft,
  Settings
} from 'lucide-react';
import { ChatContext, ChatMessage as Message, RecentChatSummary, Source, useIntelligenceChatStore } from '../services/intelligenceChatStore';
import { MarkdownLite } from '../components/MarkdownLite';
import { useChatTheme } from '../theme/useChatTheme';
import { useChatThemeStore } from '../services/chatThemeStore';

interface SuggestedQuery {
  text: string;
  icon: React.ReactNode;
}

// ==================== MAIN COMPONENT ====================

export const IntelligencePage = () => {
  const location = useLocation();
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
    clearChat,
    sendMessage,
    addUploadedFile
  } = useIntelligenceChatStore();
  const { theme } = useChatThemeStore();
  const [inputText, setInputText] = useState('');
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const [activeContextId, setActiveContextId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editTextareaRef, setEditTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  const [showPaletteSettings, setShowPaletteSettings] = useState(false);
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
      prefillInput?: string;
      autoSendMessage?: string;
      autoSendSystemContext?: string;
    } | null;

    if (state?.context) {
      setChatContext(state.context);
    }

    if (state?.autoSendMessage && !autoSentRef.current) {
      autoSentRef.current = true;
      sendMessage(state.autoSendMessage, {
        systemContext: state.autoSendSystemContext,
      });
      setInputText('');
    }

    if (state?.prefillInput) {
      setInputText(state.prefillInput);
    }

    if (state?.context || state?.prefillInput || state?.autoSendMessage) {
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
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  };


  const handleResend = (messageText: string) => {
    if (isLoading) return;
    sendMessage(messageText);
  };

  const handleStartEdit = (messageId: string, messageText: string) => {
    setEditingMessageId(messageId);
    setEditingText(messageText);
  };

  const handleConfirmEdit = () => {
    if (!editingMessageId || !editingText.trim() || isLoading) return;
    sendMessage(editingText);
    setEditingMessageId(null);
    setEditingText('');
    setInputText('');
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
      <div className="w-[280px] shrink-0 border-r border-white/5 bg-[#080a0f] flex flex-col">
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent Chats</h2>
            <p className="text-[11px] text-slate-500">ประวัติจะอยู่ตรงนี้จนกว่าจะลบเอง</p>
          </div>
          <button
            onClick={() => {
              const newConversationId = createConversation();
              setActiveConversation(newConversationId);
              setActiveContextId(null);
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

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {recentChats.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-slate-500">
              ยังไม่มีบทสนทนา เริ่มพิมพ์คำถามแรกได้เลย
            </div>
          ) : (
            recentChats.map((chat) => (
              <RecentChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeConversationId}
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
              />
            ))
          )}
        </div>
      </div>

      {/* LEFT PANEL: CHAT */}
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
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
            {/* Palette Settings Button */}
            <button
              onClick={() => setShowPaletteSettings(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              title="ตั้งค่าสีแชต"
            >
              <Settings size={12} />
              สีแชต
            </button>
            {/* Context Badge */}
            {chatContext && (
                <div className="flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: 'var(--chat-accent-soft-border)', backgroundColor: 'var(--chat-accent-soft)' }}>
                <Tag size={12} style={{ color: 'var(--chat-md-list-strong)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--chat-md-list-strong)' }}>{chatContext.name}</span>
                <button 
                  onClick={() => setChatContext(null)}
                  title="ลบ context"
                  className="ml-1 transition-colors hover:text-white"
                  style={{ color: 'var(--chat-md-list-strong)' }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-medium">{isLoading ? 'Thinking...' : 'Online'}</span>
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
              setEditTextareaRef={setEditTextareaRef}
            />
          ))}

          <div ref={messagesEndRef} className="h-24" />
        </div>

        {/* Input Area */}
                <div className="p-4 mx-auto w-full max-w-4xl bg-gradient-to-t from-[#0a0c10] pb-8 via-[#0a0c10] to-transparent sticky bottom-0 z-10">
          <div className="relative flex items-end gap-3 bg-[#15181e] border border-white/10 rounded-3xl px-6 py-2 pb-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/30 transition-all">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ถามคำถาม หรือบอกให้ Locus ช่วยวางแผนให้..."
              rows={1}
              style={{ maxHeight: "300px", minHeight: "32px", overflowY: "auto" }}
              className="w-full flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-slate-500 resize-none py-2.5 leading-relaxed custom-scrollbar"
            />
            <div className="flex items-center gap-2 shrink-0 pb-1">
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

      {/* CHAT PALETTE SETTINGS MODAL */}
      {showPaletteSettings && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[80vh] bg-[#0a0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-bold text-white">ตั้งค่าสีแชต</h2>
                <p className="text-xs text-slate-500">ปรับสีของคำตอบแชตแบบสดๆ ได้เลย</p>
              </div>
              <button
                onClick={() => setShowPaletteSettings(false)}
                className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Chat Accent Section */}
                <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4">
                  <h3 className="text-sm font-semibold text-white mb-4">Chat Accent</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'accentPrimary', label: 'Primary Accent' },
                      { key: 'accentPrimaryHover', label: 'Primary Hover' },
                      { key: 'accentText', label: 'Accent Text' },
                      { key: 'accentSoft', label: 'Soft Surface' },
                      { key: 'accentSoftBorder', label: 'Soft Border' },
                      { key: 'recentActiveBg', label: 'Recent Active BG' },
                      { key: 'recentActiveBorder', label: 'Recent Active Border' },
                      { key: 'recentActiveShadow', label: 'Recent Active Shadow' },
                    ].map((field) => (
                      <PaletteColorField
                        key={field.key}
                        label={field.label}
                        value={theme[field.key as keyof typeof theme]}
                        onChange={(val) => {
                          const { patchTheme } = useChatThemeStore.getState();
                          patchTheme({ [field.key]: val } as any);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Markdown Hierarchy Section */}
                <div className="bg-[#0f1115] rounded-xl border border-white/5 p-4">
                  <h3 className="text-sm font-semibold text-white mb-4">Markdown Hierarchy</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'markdownHeading1', label: '# Heading 1' },
                      { key: 'markdownHeading2', label: '## Heading 2' },
                      { key: 'markdownHeading3', label: '### Heading 3' },
                      { key: 'markdownListStrong', label: 'Bullet Strong' },
                      { key: 'markdownStrong', label: 'Default Strong' },
                      { key: 'markdownText', label: 'Body Text' },
                      { key: 'markdownMuted', label: 'Muted Text' },
                      { key: 'markdownItalic', label: 'Italic Text' },
                      { key: 'markdownCodeText', label: 'Inline Code Text' },
                      { key: 'markdownCodeBg', label: 'Inline Code BG' },
                      { key: 'markdownBullet', label: 'Bullet Marker' },
                      { key: 'markdownDivider', label: 'Divider' },
                    ].map((field) => (
                      <PaletteColorField
                        key={field.key}
                        label={field.label}
                        value={theme[field.key as keyof typeof theme]}
                        onChange={(val) => {
                          const { patchTheme } = useChatThemeStore.getState();
                          patchTheme({ [field.key]: val } as any);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
              <button
                onClick={() => {
                  const { resetTheme } = useChatThemeStore.getState();
                  resetTheme();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-slate-300 transition-colors"
              >
                <RotateCcw size={14} />
                Reset Colors
              </button>
              <button
                onClick={() => setShowPaletteSettings(false)}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-sm font-bold text-white transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== PALETTE COLOR FIELD ====================
const PaletteColorField = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-lg border border-white/10 shrink-0 cursor-pointer"
        style={{ background: value }}
        title={value}
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-400 truncate">{label}</div>
        <div className="flex items-center gap-1">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-6 h-6 rounded border border-white/10 bg-transparent cursor-pointer p-0"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-[#0b0d11] border border-white/10 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
          />
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
  isLoading: boolean;
  onResend: (text: string) => void;
  onStartEdit: (id: string, text: string) => void;
  isEditing: boolean;
  editingText: string;
  onEditingTextChange: (text: string) => void;
  onConfirmEdit: () => void;
  onCancelEdit: () => void;
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
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          isUser 
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
            : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
        }`}>
          {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-cyan-400" />}
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
            <div className={`p-4 rounded-2xl ${
              isUser 
                ? 'bg-cyan-600/10 border border-cyan-500/20 rounded-tr-md' 
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
              <MarkdownLite text={message.text} className="text-sm" />

              {message.status === 'pending' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-cyan-400">
                  <RefreshCw size={12} className="animate-spin" />
                  <span>กำลังรอคำตอบอยู่เบื้องหลัง</span>
                </div>
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
            </div>
          </>
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

interface RecentChatItemProps {
  chat: RecentChatSummary
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

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

const RecentChatItem = ({ chat, isActive, onSelect, onDelete }: RecentChatItemProps) => (
  <div
    className={`group w-full rounded-2xl border p-3 transition-all ${
      isActive
        ? ''
        : 'border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]'
    }`}
    style={
      isActive
        ? {
            borderColor: 'var(--chat-recent-active-border)',
            backgroundColor: 'var(--chat-recent-active-bg)',
            boxShadow: 'var(--chat-recent-active-shadow)'
          }
        : undefined
    }
  >
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 rounded-xl p-2 ${isActive ? '' : 'bg-white/5 text-slate-400'}`}
        style={
          isActive
            ? {
                backgroundColor: 'var(--chat-recent-active-icon-bg)',
                color: 'var(--chat-recent-active-icon-text)'
              }
            : undefined
        }
      >
        <Clock3 size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onSelect} className="min-w-0 flex-1 text-left">
            <div className={`truncate text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>{chat.title}</div>
            <div className="mt-1 text-[11px] text-slate-500">{formatRelativeChatTime(chat.updatedAt)}</div>
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="rounded-lg p-1.5 text-slate-500 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
            title="ลบบทสนทนานี้"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <button onClick={onSelect} className="w-full text-left">
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">{chat.preview}</p>
          <div className="mt-3 flex items-center gap-2">
            {chat.contextName && (
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-[10px] font-medium text-purple-300">
                {chat.contextName}
              </span>
            )}
            {chat.isPending && (
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300">
                Pending
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  </div>
)

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

