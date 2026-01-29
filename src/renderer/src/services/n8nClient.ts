import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const N8N_WEBHOOK_URL = import.meta.env.VITE_NGROK_URL || 'http://localhost:5678'
const N8N_API_KEY = import.meta.env.VITE_N8N_API_KEY

// Retry configuration
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

// Validate API key is configured
const validateApiKey = (): void => {
  if (!N8N_API_KEY) {
    console.warn('⚠️ VITE_N8N_API_KEY is not configured. API calls may fail.')
  }
}

// Retry helper with exponential backoff
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
      
      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status && status >= 400 && status < 500 && status !== 429) {
          throw error
        }
      }
      
      // Wait before retry with exponential backoff
      if (attempt < retries - 1) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt)
        console.log(`🔄 Retry attempt ${attempt + 1}/${retries - 1} after ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
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
  validateApiKey()
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await withRetry(() => 
      axios.post<AnalyzeResponse>(`${N8N_WEBHOOK_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': N8N_API_KEY || ''
        },
        timeout: 60000 // 60 second timeout for image analysis
      })
    )
    return response.data
  } catch (error) {
    console.error('Agent communication failed:', error)
    throw error
  }
}

export const pingAgent = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${N8N_WEBHOOK_URL}/health`, {
      timeout: 5000 // 5 second timeout for health check
    })
    return response.status === 200
  } catch {
    return false
  }
}

export interface ChatResponse {
  output: string;
  // Add other fields if n8n returns more context
}

export const sendChatMessage = async (message: string, sessionId?: string): Promise<string> => {
  validateApiKey()
  try {
    const response = await withRetry(() => 
      axios.post(`${N8N_WEBHOOK_URL}/chat`, {
         message,
         sessionId // Optional: if n8n workflow handles memory by session ID
      }, {
        headers: {
          'x-api-key': N8N_API_KEY || ''
        },
        timeout: 30000 // 30 second timeout for chat
      })
    );
    
    // Standard response handling - avoid exposing raw JSON to users
    if (response.data?.output) return response.data.output;
    if (response.data?.text) return response.data.text;
    if (typeof response.data === 'string') return response.data;
    
    // Fallback: return user-friendly message instead of raw JSON
    console.warn('Unexpected response format:', response.data);
    return 'ได้รับการตอบกลับแล้ว แต่รูปแบบข้อมูลไม่ตรงตามที่คาดไว้';
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Chat Error:", error.message);
        if (error.response?.status === 401) throw new Error("การยืนยันตัวตนล้มเหลว: API Key ไม่ถูกต้อง");
        if (error.response?.status === 404) throw new Error("ไม่พบ Agent endpoint (404)");
        if (error.code === 'ERR_NETWORK') throw new Error("เครือข่ายขัดข้อง: n8n ทำงานอยู่หรือไม่?");
        if (error.code === 'ECONNABORTED') throw new Error("หมดเวลาการเชื่อมต่อ: กรุณาลองใหม่อีกครั้ง");
        throw new Error(`Agent Error: ${error.response?.statusText || error.message}`);
    }
    throw error;
  }
};
