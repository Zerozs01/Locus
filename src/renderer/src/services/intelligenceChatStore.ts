import { useSyncExternalStore } from 'react'
import { sendChatMessage, type ChatLocationPayload } from './n8nClient'

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

const loadInitialState = (): ChatStoreState => {
  if (typeof window === 'undefined') {
    return { conversations: [], activeConversationId: null }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ChatStoreState>
      const conversations = sortConversations(
        (parsed.conversations || []).map((conversation) => ({
          ...conversation,
          messages: withRecoveredPendingMessages(conversation.messages || []),
          chatContext: conversation.chatContext || null,
          lastContextKey: conversation.lastContextKey || null,
          title: conversation.title || deriveConversationTitle(conversation),
          createdAt: conversation.createdAt || new Date().toISOString(),
          updatedAt: conversation.updatedAt || conversation.createdAt || new Date().toISOString()
        }))
      )

      const activeConversationId = conversations.some((conversation) => conversation.id === parsed.activeConversationId)
        ? parsed.activeConversationId || null
        : conversations[0]?.id || null

      return { conversations, activeConversationId }
    }

    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      const legacyRaw = window.localStorage.getItem(legacyKey)
      if (!legacyRaw) continue

      const migrated = migrateLegacyState(JSON.parse(legacyRaw) as LegacyChatStoreState)
      window.localStorage.removeItem(legacyKey)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
      return migrated
    }

    return { conversations: [], activeConversationId: null }
  } catch {
    return { conversations: [], activeConversationId: null }
  }
}

let state = loadInitialState()

const persistState = () => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const emit = () => {
  persistState()
  listeners.forEach((listener) => listener())
}

const setState = (updater: (current: ChatStoreState) => ChatStoreState) => {
  state = updater(state)
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

    window.setTimeout(() => {
      updateConversation(conversationId, (conversation) => ({
        ...conversation,
        updatedAt: new Date().toISOString(),
        messages: conversation.messages.map((message) =>
          message.status === 'pending' && message.id.startsWith('file-analysis')
            ? {
                ...message,
                status: 'complete',
                contextType: 'text'
              }
            : message
        )
      }))
    }, 1000)
  },
  sendMessage(userText: string, options?: { systemContext?: string }) {
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

    void sendChatMessage(messageWithContext, undefined, undefined, locationPayload)
      .then((responseText) => {
        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id
              ? {
                  ...message,
                  text: responseText,
                  status: 'complete',
                  sources: createSources(),
                  contextType: determineContextType(trimmed),
                  contextData: generateMockContextData(trimmed)
                }
              : message
          )
        }))
      })
      .catch((error) => {
        const errorMessage =
          error instanceof Error ? error.message : 'ไม่สามารถเชื่อมต่อ Agent ได้ กรุณาตรวจสอบการเชื่อมต่อ n8n และ Ngrok'
        updateConversation(conversationId, (conversation) => ({
          ...conversation,
          updatedAt: new Date().toISOString(),
          messages: conversation.messages.map((message) =>
            message.id === pendingReply.id
              ? {
                  ...message,
                  text: `❌ ${errorMessage}`,
                  status: 'error'
                }
              : message
          )
        }))
      })
  }
}

export const useIntelligenceChatStore = () => {
  const snapshot = useSyncExternalStore(
    intelligenceChatStore.subscribe,
    intelligenceChatStore.getSnapshot,
    intelligenceChatStore.getSnapshot
  )

  const activeConversation = getActiveConversation(snapshot)
  const recentChats: RecentChatSummary[] = sortConversations(snapshot.conversations).map((conversation) => ({
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
    clearChat: intelligenceChatStore.clear,
    sendMessage: intelligenceChatStore.sendMessage,
    addUploadedFile: intelligenceChatStore.addUploadedFile
  }
}
