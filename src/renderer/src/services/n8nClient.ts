import axios from 'axios'

const N8N_WEBHOOK_URL = import.meta.env.VITE_NGROK_URL || 'http://localhost:5678'

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
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await axios.post<AnalyzeResponse>(`${N8N_WEBHOOK_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Agent communication failed:', error)
    throw error
  }
}

export const pingAgent = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${N8N_WEBHOOK_URL}/health`)
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
  try {
    const response = await axios.post(`${N8N_WEBHOOK_URL}/chat`, {
       message,
       sessionId // Optional: if n8n workflow handles memory by session ID
    });
    // Adjust based on actual n8n return structure, assuming { output: "text" } or just text
    return response.data.output || response.data.text || JSON.stringify(response.data); 
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};
