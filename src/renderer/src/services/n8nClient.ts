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
