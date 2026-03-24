import axios, { AxiosResponse } from 'axios'

const DEFAULT_N8N_WEBHOOK_URL = 'http://localhost:5678'
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second
let hasWarnedMissingApiKey = false

const warnMissingApiKey = (): void => {
  if (hasWarnedMissingApiKey) return
  hasWarnedMissingApiKey = true
  console.warn('VITE_N8N_API_KEY is not configured and no runtime n8n_api_key is set. API calls may fail.')
}

const readLegacyConfig = (): Record<string, string> => {
  try {
    const savedKeys = localStorage.getItem('locus_api_keys')
    if (!savedKeys) return {}
    return JSON.parse(savedKeys) as Record<string, string>
  } catch {
    return {}
  }
}

const readRuntimeConfig = async (): Promise<Record<string, string>> => {
  if (typeof window === 'undefined') return {}

  if (window.api?.config?.get) {
    try {
      return await window.api.config.get()
    } catch {
      return readLegacyConfig()
    }
  }

  return readLegacyConfig()
}

const resolveWebhookUrl = async (): Promise<string> => {
  const config = await readRuntimeConfig()
  const configuredUrl = config.ngrok || import.meta.env.VITE_NGROK_URL || DEFAULT_N8N_WEBHOOK_URL
  return configuredUrl.replace(/\/+$/, '')
}

const resolveApiKey = async (): Promise<string> => {
  const config = await readRuntimeConfig()
  return config.n8n_api_key || import.meta.env.VITE_N8N_API_KEY || ''
}

const resolveAuthHeaders = async (): Promise<Record<string, string>> => {
  const apiKey = await resolveApiKey()
  if (!apiKey) {
    warnMissingApiKey()
    return {}
  }
  return { 'x-api-key': apiKey }
}

interface N8nOverrides {
  webhookUrl?: string
  apiKey?: string
}

const CHAT_SESSION_STORAGE_KEY = 'locus_chat_session_id'

const resolveSessionId = (explicitSessionId?: string): string => {
  if (explicitSessionId?.trim()) {
    return explicitSessionId.trim()
  }

  if (typeof window === 'undefined') {
    return `locus-session-${Date.now()}`
  }

  try {
    const existing = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY)
    if (existing?.trim()) {
      return existing.trim()
    }

    const generated = `locus-session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, generated)
    return generated
  } catch {
    return `locus-session-${Date.now()}`
  }
}

const withRetry = async <T>(
  fn: () => Promise<AxiosResponse<T>>,
  retries = MAX_RETRIES
): Promise<AxiosResponse<T>> => {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      // Do not retry on client errors except rate limit.
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status && status >= 400 && status < 500 && status !== 429) {
          throw error
        }
      }

      if (attempt < retries - 1) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt)
        console.log(`Retry attempt ${attempt + 1}/${retries - 1} after ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

export interface AnalyzeResponse {
  status: string
  location: string
  coordinates: string
  analysis: {
    geoguessr_meta: Array<{ label: string; value: string }>
    survival_intel: Array<{ label: string; value: string; color: string }>
    historical_lore: string
  }
}

export const analyzeLocation = async (imageFile: File): Promise<AnalyzeResponse> => {
  const webhookUrl = await resolveWebhookUrl()
  const authHeaders = await resolveAuthHeaders()
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await withRetry(() =>
      axios.post<AnalyzeResponse>(`${webhookUrl}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...authHeaders
        },
        timeout: 60000
      })
    )
    return response.data
  } catch (error) {
    console.error('Agent communication failed:', error)
    throw error
  }
}

export const pingAgent = async (overrides?: N8nOverrides): Promise<boolean> => {
  try {
    if (window.api?.n8n?.health) {
      const result = await window.api.n8n.health(overrides)
      return result.ok
    }

    const webhookUrl = await resolveWebhookUrl()
    const response = await axios.get(`${webhookUrl}/health`, { timeout: 5000 })
    return response.status === 200
  } catch {
    return false
  }
}

export interface ChatResponse {
  output: string
}

export const sendChatMessage = async (message: string, sessionId?: string, overrides?: N8nOverrides): Promise<string> => {
  const resolvedSessionId = resolveSessionId(sessionId)

  if (window.api?.n8n?.chat) {
    const response = await window.api.n8n.chat({
      message,
      sessionId: resolvedSessionId,
      ...overrides
    })

    if (!response.ok) {
      if (response.status === 401) throw new Error('Authentication failed: invalid API key.')
      if (response.status === 404) throw new Error('Agent endpoint not found (404).')
      const upstreamMessage =
        response.error ||
        (typeof response.data === 'object' && response.data && 'message' in response.data
          ? String((response.data as Record<string, unknown>).message)
          : undefined) ||
        (typeof response.text === 'string' ? response.text : undefined)
      throw new Error(upstreamMessage || `Agent Error: HTTP ${response.status}`)
    }

    const data = response.data
    if (typeof data === 'string') return data
    if (data && typeof data === 'object') {
      const record = data as Record<string, unknown>
      if (typeof record.output === 'string') return record.output
      if (typeof record.text === 'string') return record.text
    }
    if (typeof response.text === 'string' && response.text.trim().length > 0) {
      return response.text
    }
    return 'Received a response, but in an unexpected format.'
  }

  const webhookUrl = overrides?.webhookUrl || await resolveWebhookUrl()
  const authHeaders = overrides?.apiKey ? { 'x-api-key': overrides.apiKey } : await resolveAuthHeaders()

  try {
    const response = await withRetry(() =>
      axios.post(
        `${webhookUrl}/chat`,
        { message, sessionId: resolvedSessionId },
        {
          headers: authHeaders,
          timeout: 30000
        }
      )
    )

    if (response.data?.output) return response.data.output
    if (response.data?.text) return response.data.text
    if (typeof response.data === 'string') return response.data

    console.warn('Unexpected response format:', response.data)
    return 'Received a response, but in an unexpected format.'
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Chat Error:', error.message)
      if (error.response?.status === 401) throw new Error('Authentication failed: invalid API key.')
      if (error.response?.status === 404) throw new Error('Agent endpoint not found (404).')
      if (error.code === 'ERR_NETWORK') throw new Error('Network error: is n8n running and reachable?')
      if (error.code === 'ECONNABORTED') throw new Error('Request timed out. Please try again.')
      throw new Error(`Agent Error: ${error.response?.statusText || error.message}`)
    }
    throw error
  }
}

export const testChatAgent = async (message = 'healthcheck'): Promise<boolean> => {
  try {
    await sendChatMessage(message)
    return true
  } catch {
    return false
  }
}
