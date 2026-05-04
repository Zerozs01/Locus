import { useSyncExternalStore } from 'react'
import { sendChatMessage, type ChatLocationPayload, type RouteContext } from './n8nClient'
import { getFuelPricesWithRefresh } from './fuelPricesService'

export interface ChatContext {
  type: 'region' | 'province'
  name: string
  regionId?: string
  engName?: string
  city?: string
  country?: string
  lat?: number
  lng?: number
  provinces?: string[]
  stats?: {
    dailyCost?: string
  } | null
  safety?: number
}

export interface Source {
  id: string
  title: string
  type: 'document' | 'web' | 'database' | 'knowledge'
  url?: string
  snippet?: string
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: string
  sources?: Source[]
  contextType?: 'text' | 'graph' | 'map' | 'table'
  contextData?: unknown
  status?: 'complete' | 'pending' | 'error'
  isSystem?: boolean
}

export interface ChatConversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
  chatContext: ChatContext | null
  lastContextKey: string | null
}

export interface RecentChatSummary {
  id: string
  title: string
  preview: string
  updatedAt: string
  contextName: string | null
  isPending: boolean
}

interface ChatStoreState {
  conversations: ChatConversation[]
  activeConversationId: string | null
}

interface LegacyChatStoreState {
  messages?: ChatMessage[]
  chatContext?: ChatContext | null
  lastContextKey?: string | null
}

const STORAGE_KEY = 'locus_intelligence_chat_v3'
const LEGACY_STORAGE_KEYS = ['locus_intelligence_chat_v2']
const MAX_MESSAGES = 200
const listeners = new Set<() => void>()

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const withRecoveredPendingMessages = (messages: ChatMessage[] = []): ChatMessage[] =>
  messages.map((message) =>
    message.status === 'pending'
      ? {
          ...message,
          status: 'error',
          text: '⚠️ คำขอก่อนหน้าถูกยกเลิกเพราะแอปถูกรีโหลด กรุณาส่งใหม่อีกครั้ง'
        }
      : message
  )

const truncate = (text: string, maxLength = 42) => {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1)}…`
}

const deriveConversationTitle = (conversation: Pick<ChatConversation, 'messages' | 'chatContext'>, fallback?: string) => {
  const firstUserMessage = conversation.messages.find((message) => message.sender === 'user' && !message.isSystem)?.text
  if (firstUserMessage) return truncate(firstUserMessage)
  if (fallback?.trim()) return truncate(fallback)
  if (conversation.chatContext?.name) return truncate(conversation.chatContext.name)
  return 'Recent Chat'
}

const getContextKey = (context: ChatContext) => `${context.type}:${context.regionId || ''}:${context.name}:${context.engName || ''}`

const getLatestPreview = (messages: ChatMessage[]) => {
  const latestRelevantMessage = [...messages]
    .reverse()
    .find((message) => !message.isSystem && message.text.trim())

  return latestRelevantMessage ? truncate(latestRelevantMessage.text, 64) : 'ยังไม่มีข้อความในบทสนทนานี้'
}

const createConversationEntry = (context: ChatContext | null = null): ChatConversation => {
  const now = new Date().toISOString()
  return {
    id: createId('conversation'),
    title: context?.name ? truncate(context.name) : 'Recent Chat',
    createdAt: now,
    updatedAt: now,
    messages: [],
    chatContext: context,
    lastContextKey: context ? getContextKey(context) : null
  }
}

const sortConversations = (conversations: ChatConversation[]) =>
  [...conversations].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())

const migrateLegacyState = (legacyState: LegacyChatStoreState): ChatStoreState => {
  const messages = withRecoveredPendingMessages(legacyState.messages || [])
  if (messages.length === 0 && !legacyState.chatContext) {
    return { conversations: [], activeConversationId: null }
  }

  const conversation = createConversationEntry(legacyState.chatContext || null)
  conversation.messages = messages
  conversation.lastContextKey = legacyState.lastContextKey || (legacyState.chatContext ? getContextKey(legacyState.chatContext) : null)
  conversation.title = deriveConversationTitle(conversation)
  conversation.updatedAt = messages[messages.length - 1]?.timestamp || conversation.updatedAt

  return {
    conversations: [conversation],
    activeConversationId: conversation.id
  }
}

let state: ChatStoreState = { conversations: [], activeConversationId: null }
let isInitialized = false

const initStore = async () => {
  if (isInitialized || typeof window === 'undefined' || !window.api?.chat) return
  
  try {
    const dbConversations = await window.api.chat.getConversations()
    if (dbConversations && dbConversations.length > 0) {
      const conversationsWithMessages = await Promise.all(
        dbConversations.map(async (conv: any) => {
          const messages = await window.api.chat.getMessages(conv.id)
          return {
            ...conv,
            messages: withRecoveredPendingMessages(messages)
          }
        })
      )
      
      const sorted = sortConversations(conversationsWithMessages)
      state = {
        conversations: sorted,
        activeConversationId: sorted[0]?.id || null
      }
    } else {
      // Try migrating from legacy localStorage if SQLite is empty
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as ChatStoreState
        state = parsed
        // Save to SQLite
        for (const conv of parsed.conversations) {
          await window.api.chat.saveConversation(conv.id, conv.title, conv.chatContext, conv.lastContextKey)
          for (const msg of conv.messages) {
            await window.api.chat.saveMessage({ ...msg, conversationId: conv.id })
          }
        }
        // window.localStorage.removeItem(STORAGE_KEY) // Optional: keep as backup for now
      }
    }
  } catch (error) {
    console.error('[IntelligenceStore] Failed to init from SQLite:', error)
  } finally {
    isInitialized = true
    emit()
  }
}

// Start initialization
if (typeof window !== 'undefined') {
  initStore()
}

const persistState = async (updatedState: ChatStoreState) => {
  if (typeof window === 'undefined' || !window.api?.chat) return
  
  // In a real app, we might want to only save the changed parts.
  // For simplicity, we'll save the active conversation or newly added items.
}

const emit = () => {
  listeners.forEach((listener) => listener())
}

const setState = (updater: (current: ChatStoreState) => ChatStoreState) => {
  const nextState = updater(state)
  state = nextState
  emit()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => state

const getConversationById = (conversations: ChatConversation[], conversationId: string | null) =>
  conversationId ? conversations.find((conversation) => conversation.id === conversationId) || null : null

const getActiveConversation = (current: ChatStoreState) => getConversationById(current.conversations, current.activeConversationId)

const determineContextType = (query: string): 'text' | 'graph' | 'map' | 'table' => {
  const lowerQuery = query.toLowerCase()
  if (lowerQuery.includes('ความสัมพันธ์') || lowerQuery.includes('เชื่อมโยง') || lowerQuery.includes('network')) {
    return 'graph'
  }
  if (lowerQuery.includes('แผนที่') || lowerQuery.includes('ตำแหน่ง') || lowerQuery.includes('เส้นทาง') || lowerQuery.includes('จังหวัด')) {
    return 'map'
  }
  if (lowerQuery.includes('เปรียบเทียบ') || lowerQuery.includes('สถิติ') || lowerQuery.includes('ค่า')) {
    return 'table'
  }
  return 'text'
}

const generateMockContextData = (query: string): unknown => {
  const contextType = determineContextType(query)
  const baseEntities = ['เชียงใหม่', 'ภาคเหนือ', 'ท่องเที่ยว', 'ความปลอดภัย', 'ค่าครองชีพ']

  switch (contextType) {
    case 'graph':
      return { nodeCount: 12, edgeCount: 18, entities: baseEntities }
    case 'map':
      return { location: 'Northern Thailand', entities: baseEntities }
    case 'table':
      return {
        rows: [
          { label: 'Safety Index', value: '85%' },
          { label: 'Daily Cost', value: '฿350' },
          { label: 'Monthly Rent', value: '฿8,000' }
        ],
        entities: baseEntities
      }
    default:
      return {
        insights: ['วิเคราะห์จากข้อมูล 4 ภูมิภาค', 'ความปลอดภัยเฉลี่ย 84%', 'แนะนำช่วงเวลาท่องเที่ยว: พ.ย. - ก.พ.'],
        entities: baseEntities
      }
  }
}

const createSources = (): Source[] => [
  { id: '1', title: 'ข้อมูลจังหวัด - SQLite DB', type: 'database', snippet: 'Province statistics and safety data' },
  { id: '2', title: 'Tourism Authority of Thailand', type: 'web', url: 'https://www.tat.or.th', snippet: 'Official tourism information' }
]

const buildContextPrompt = (userText: string, chatContext: ChatContext | null) => {
  if (!chatContext) return userText

  const contextInfo = `[Context: ${chatContext.type === 'region' ? 'ภาค' : 'จังหวัด'} ${chatContext.name}${
    chatContext.provinces ? `, provinces: ${chatContext.provinces.join(', ')}` : ''
  }${
    chatContext.stats?.dailyCost ? `, daily cost: ${chatContext.stats.dailyCost}` : ''
  }${typeof chatContext.safety === 'number' ? `, safety: ${chatContext.safety}%` : ''}]`

  return `${contextInfo}\n\nUser question: ${userText}`
}

const buildLocationPayload = (chatContext: ChatContext | null): ChatLocationPayload | undefined => {
  if (!chatContext) return undefined

  const payload: ChatLocationPayload = {
    country: chatContext.country || 'TH'
  }

  if (chatContext.type === 'province') {
    const provinceName = chatContext.engName?.trim() || chatContext.name.trim()
    payload.provinceName = provinceName
    payload.city = chatContext.city?.trim() || provinceName
  } else {
    payload.regionName = chatContext.engName?.trim() || chatContext.name.trim()
  }

  if (typeof chatContext.lat === 'number') {
    payload.lat = chatContext.lat
  }

  if (typeof chatContext.lng === 'number') {
    payload.lng = chatContext.lng
  }

  return payload
}

const getFuelPricesPayload = async (): Promise<Record<string, number>> => {
  try {
    const prices = await getFuelPricesWithRefresh()
    const fuelObj: Record<string, number> = {}
    prices.forEach((p) => {
      fuelObj[p.fuelType] = p.price
    })
    return fuelObj
  } catch (e) {
    console.warn('[IntelligenceStore] Failed to fetch fuel prices for payload:', e)
    return {}
  }
}

const updateConversation = (conversationId: string, updater: (conversation: ChatConversation) => ChatConversation) => {
  setState((current) => ({
    ...current,
    conversations: sortConversations(
      current.conversations.map((conversation) => (conversation.id === conversationId ? updater(conversation) : conversation))
    )
  }))
}

const ensureConversation = (current: ChatStoreState, context: ChatContext | null = null) => {
  const activeConversation = getActiveConversation(current)
  if (activeConversation) {
    return {
      conversation: activeConversation,
      conversations: current.conversations,
      activeConversationId: current.activeConversationId
    }
  }

  const createdConversation = createConversationEntry(context)
  return {
    conversation: createdConversation,
    conversations: [createdConversation, ...current.conversations],
    activeConversationId: createdConversation.id
  }
}

export const intelligenceChatStore = {
  subscribe,
  getSnapshot,
  createConversation() {
    const conversation = createConversationEntry()
    setState((current) => ({
      conversations: sortConversations([conversation, ...current.conversations]),
      activeConversationId: conversation.id
    }))
    window.api.chat?.saveConversation(conversation.id, conversation.title, conversation.chatContext, conversation.lastContextKey)
    return conversation.id
  },
  setActiveConversation(conversationId: string) {
    setState((current) => ({
      ...current,
      activeConversationId: current.conversations.some((conversation) => conversation.id === conversationId) ? conversationId : current.activeConversationId
    }))
  },
  deleteConversation(conversationId: string) {
    setState((current) => {
      const remainingConversations = current.conversations.filter((conversation) => conversation.id !== conversationId)
      const activeConversationId =
        current.activeConversationId === conversationId
          ? remainingConversations[0]?.id || null
          : current.activeConversationId

      return {
        conversations: remainingConversations,
        activeConversationId
      }
    })
    window.api.chat?.deleteConversation(conversationId)
  },
  setChatContext(context: ChatContext | null) {
    if (!context) {
      const activeConversation = getActiveConversation(state)
      if (!activeConversation) return

      updateConversation(activeConversation.id, (conversation) => ({
        ...conversation,
        chatContext: null,
        lastContextKey: null,
        updatedAt: new Date().toISOString()
      }))
      return
    }

    const contextKey = getContextKey(context)
    let conversationId = ''

    setState((current) => {
      const ensured = ensureConversation(current, context)
      const currentConversation = ensured.conversation
      conversationId = currentConversation.id

      const shouldAppendContextMessage = currentConversation.lastContextKey !== contextKey
      const contextMessage: ChatMessage = {
        id: createId('context'),
        text: `🎯 Context loaded: **${context.name}** (${context.type === 'region' ? 'ภาค' : 'จังหวัด'})\n\nคุณสามารถถามคำถามเกี่ยวกับ${context.name}ได้เลย เช่น:\n• ข้อมูลค่าครองชีพ\n• แหล่งท่องเที่ยวแนะนำ\n• ความปลอดภัย\n• เส้นทางการเดินทาง`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        status: 'complete',
        isSystem: true
      }

      const nextConversation: ChatConversation = {
        ...currentConversation,
        chatContext: context,
        lastContextKey: contextKey,
        title: deriveConversationTitle(currentConversation, context.name),
        updatedAt: new Date().toISOString(),
        messages: shouldAppendContextMessage
          ? [...currentConversation.messages, contextMessage].slice(-MAX_MESSAGES)
          : currentConversation.messages
      }

      const remainingConversations = ensured.conversations.filter((conversation) => conversation.id !== conversationId)

      return {
        activeConversationId: ensured.activeConversationId,
        conversations: sortConversations([nextConversation, ...remainingConversations])
      }
    })

    return conversationId
  },
  clear() {
    const activeConversation = getActiveConversation(state)
    if (!activeConversation) return
    intelligenceChatStore.deleteConversation(activeConversation.id)
  },
  deleteMessage(messageId: string) {
    const activeConversation = getActiveConversation(state);
    if (!activeConversation) return;

    updateConversation(activeConversation.id, (conversation) => ({
      ...conversation,
      updatedAt: new Date().toISOString(),
      messages: conversation.messages.filter(m => m.id !== messageId)
    }));
    window.api.chat?.deleteChatMessage(messageId)
  },
  resubmitMessage(messageId: string, newText: string, routeContext?: RouteContext) {
    const trimmed = newText.trim();
    if (!trimmed) return;

    const activeConversation = getActiveConversation(state);
    if (!activeConversation) return;

    const messageIndex = activeConversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    const truncatedMessages = activeConversation.messages.slice(0, messageIndex);
    const conversationId = activeConversation.id;

    const userMessage: ChatMessage = {
      id: createId('user'),
      text: trimmed,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'complete'
    };

    const pendingReply: ChatMessage = {
      id: createId('bot'),
      text: 'กำลังวิเคราะห์...',
      sender: 'bot',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const messageWithContext = buildContextPrompt(trimmed, activeConversation.chatContext);
    const locationPayload = buildLocationPayload(activeConversation.chatContext);

    // Atomic: truncate history + append new user msg + pending bot in ONE setState
    setState((current) => ({
      ...current,
      conversations: sortConversations(
        current.conversations.map((conversation) =>
          conversation.id !== conversationId
            ? conversation
            : {
                ...conversation,
                updatedAt: new Date().toISOString(),
                messages: [...truncatedMessages, userMessage, pendingReply].slice(-MAX_MESSAGES)
              }
        )
      )
    }));

    (async () => {
      try {
        // Save user message to SQLite
        window.api.chat?.saveMessage({ ...userMessage, conversationId });
        window.api.chat?.saveMessage({ ...pendingReply, conversationId });

        const fuelPrices = await getFuelPricesPayload();
        const currentConv = getSnapshot().conversations.find(c => c.id === conversationId);
        const locPayload = buildLocationPayload(currentConv?.chatContext || null);
        const responseText = await sendChatMessage(
          messageWithContext, 
          undefined, 
          undefined, 
          locPayload, 
          fuelPrices,
          routeContext
        );

        const updatedBotMessage = { ...pendingReply, text: responseText, status: 'complete' as const };
        
        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id ? updatedBotMessage : message
          )
        }));

        window.api.chat?.saveMessage({ ...updatedBotMessage, conversationId });
        window.api.chat?.saveConversation(conversationId, currentConv?.title || 'Chat', currentConv?.chatContext || null, currentConv?.lastContextKey || null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'ไม่สามารถเชื่อมต่อ Agent ได้';
        const errorBotMessage = { ...pendingReply, text: `❌ ${errorMessage}`, status: 'error' as const };
        
        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id ? errorBotMessage : message
          )
        }));
        
        window.api.chat?.saveMessage({ ...errorBotMessage, conversationId });
      }
    })()
  },
  addUploadedFile(file: File) {
    let conversationId = ''

    setState((current) => {
      const ensured = ensureConversation(current)
      conversationId = ensured.conversation.id

      const fileMessage: ChatMessage = {
        id: createId('file'),
        text: `📎 Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        sender: 'user',
        timestamp: new Date().toISOString(),
        status: 'complete'
      }

      const placeholderMessage: ChatMessage = {
        id: createId('file-analysis'),
        text: `กำลังวิเคราะห์ไฟล์ "${file.name}"...\n\nฟีเจอร์นี้จะเชื่อมต่อกับ LightRAG เพื่อ:\n• Extract entities และ relationships\n• สร้าง Knowledge Graph\n• ค้นหาข้อมูลที่เกี่ยวข้อง`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      const updatedConversation: ChatConversation = {
        ...ensured.conversation,
        title: deriveConversationTitle(ensured.conversation, file.name),
        updatedAt: new Date().toISOString(),
        messages: [...ensured.conversation.messages, fileMessage, placeholderMessage].slice(-MAX_MESSAGES)
      }

      const remainingConversations = ensured.conversations.filter((conversation) => conversation.id !== conversationId)

      return {
        activeConversationId: ensured.activeConversationId,
        conversations: sortConversations([updatedConversation, ...remainingConversations])
      }
    })

    window.setTimeout(async () => {
      const conv = getSnapshot().conversations.find(c => c.id === conversationId)
      if (!conv) return

      const analyzedMessages = conv.messages.map((message) =>
        message.status === 'pending' && message.id.startsWith('file-analysis')
          ? {
              ...message,
              status: 'complete' as const,
              contextType: 'text' as const
            }
          : message
      )

      updateConversation(conversationId, (conversation) => ({
        ...conversation,
        updatedAt: new Date().toISOString(),
        messages: analyzedMessages
      }))

      // Persist analysis results
      const botMsg = analyzedMessages.find(m => m.id.startsWith('file-analysis'))
      if (botMsg) {
        window.api.chat?.saveMessage({ ...botMsg, conversationId })
      }
    }, 1000)
  },
  renameConversation(conversationId: string, newTitle: string) {
    const trimmed = newTitle.trim()
    if (!trimmed) return

    const truncatedTitle = truncate(trimmed)
    updateConversation(conversationId, (conversation) => ({
      ...conversation,
      title: truncatedTitle,
      updatedAt: new Date().toISOString()
    }))

    const conv = state.conversations.find(c => c.id === conversationId)
    if (conv) {
      window.api.chat?.saveConversation(conversationId, truncatedTitle, conv.chatContext, conv.lastContextKey)
    }
  },
  sendMessage(userText: string, options?: { systemContext?: string, routeContext?: RouteContext }) {
    const trimmed = userText.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: createId('user'),
      text: trimmed,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'complete'
    }

    const pendingReply: ChatMessage = {
      id: createId('bot'),
      text: 'กำลังวิเคราะห์...',
      sender: 'bot',
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    let conversationId = ''
    let messageWithContext = trimmed
    let locationPayload: ChatLocationPayload | undefined

    setState((current) => {
      const ensured = ensureConversation(current)
      const currentConversation = ensured.conversation
      conversationId = currentConversation.id
      messageWithContext = buildContextPrompt(trimmed, currentConversation.chatContext)
      if (options?.systemContext?.trim()) {
        messageWithContext = `${options.systemContext.trim()}\n\n${messageWithContext}`
      }
      locationPayload = buildLocationPayload(currentConversation.chatContext)

      const updatedConversation: ChatConversation = {
        ...currentConversation,
        title: deriveConversationTitle(currentConversation, trimmed),
        updatedAt: new Date().toISOString(),
        messages: [...currentConversation.messages, userMessage, pendingReply].slice(-MAX_MESSAGES)
      }

      const remainingConversations = ensured.conversations.filter((conversation) => conversation.id !== conversationId)

      return {
        activeConversationId: ensured.activeConversationId,
        conversations: sortConversations([updatedConversation, ...remainingConversations])
      }
    })

    const executeSend = async () => {
      try {
        // Save initial messages to SQLite
        window.api.chat?.saveMessage({ ...userMessage, conversationId });
        window.api.chat?.saveMessage({ ...pendingReply, conversationId });

        // Resolve all situational data BEFORE sending
        const fuelPrices = await getFuelPricesPayload();
        const currentConv = getSnapshot().conversations.find(c => c.id === conversationId);
        const locPayload = buildLocationPayload(currentConv?.chatContext || null);
        
        const responseText = await sendChatMessage(
          messageWithContext, 
          undefined, 
          undefined, 
          locPayload, 
          fuelPrices,
          options?.routeContext
        );
        
        const updatedBotMessage = {
          ...pendingReply,
          text: responseText,
          status: 'complete' as const,
          sources: createSources(),
          contextType: determineContextType(trimmed),
          contextData: generateMockContextData(trimmed)
        };

        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id ? updatedBotMessage : message
          )
        }))

        // Persist final state
        window.api.chat?.saveMessage({ ...updatedBotMessage, conversationId });
        window.api.chat?.saveConversation(conversationId, currentConv?.title || 'Chat', currentConv?.chatContext || null, currentConv?.lastContextKey || null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'ไม่สามารถเชื่อมต่อ Agent ได้ กรุณาตรวจสอบการเชื่อมต่อ n8n และ Ngrok'
        const errorBotMessage = {
          ...pendingReply,
          text: `❌ ${errorMessage}`,
          status: 'error' as const
        };

        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id ? errorBotMessage : message
          )
        }))

        window.api.chat?.saveMessage({ ...errorBotMessage, conversationId });
      }
    }

    void executeSend()
  }
}

export const useIntelligenceChatStore = (searchQuery = '') => {
  const snapshot = useSyncExternalStore(
    intelligenceChatStore.subscribe,
    intelligenceChatStore.getSnapshot,
    intelligenceChatStore.getSnapshot
  )

  const activeConversation = getActiveConversation(snapshot)
  const normalizedQuery = searchQuery.trim().toLowerCase()
  
  const recentChats: RecentChatSummary[] = sortConversations(snapshot.conversations)
    .filter((conversation) => 
      !normalizedQuery || 
      conversation.title.toLowerCase().includes(normalizedQuery) ||
      conversation.messages.some(m => m.text.toLowerCase().includes(normalizedQuery))
    )
    .map((conversation) => ({
      id: conversation.id,
      title: conversation.title,
      preview: getLatestPreview(conversation.messages),
      updatedAt: conversation.updatedAt,
      contextName: conversation.chatContext?.name || null,
      isPending: conversation.messages.some((message) => message.status === 'pending')
    }))

  return {
    messages: activeConversation?.messages || [],
    chatContext: activeConversation?.chatContext || null,
    activeConversationId: snapshot.activeConversationId,
    recentChats,
    hasActiveConversation: Boolean(activeConversation),
    isLoading: Boolean(activeConversation?.messages.some((message) => message.status === 'pending')),
    setChatContext: intelligenceChatStore.setChatContext,
    setActiveConversation: intelligenceChatStore.setActiveConversation,
    createConversation: intelligenceChatStore.createConversation,
    deleteConversation: intelligenceChatStore.deleteConversation,
    renameConversation: intelligenceChatStore.renameConversation,
    clearChat: intelligenceChatStore.clear,
    sendMessage: intelligenceChatStore.sendMessage,
    resubmitMessage: intelligenceChatStore.resubmitMessage,
    deleteMessage: intelligenceChatStore.deleteMessage,
    addUploadedFile: intelligenceChatStore.addUploadedFile
  }
}
