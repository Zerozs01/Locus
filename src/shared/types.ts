// Shared Types and Interfaces for Locus Application

export interface GeoguessrMeta {
  label: string
  value: string
}

export interface SurvivalIntel {
  label: string
  value: string
  color: string
}

export interface AnalysisResult {
  status: 'success' | 'error' | 'pending'
  location: string
  coordinates: string
  analysis: {
    geoguessr_meta: GeoguessrMeta[]
    survival_intel: SurvivalIntel[]
    historical_lore: string
  }
}

export interface ExplorationLog {
  id: string
  timestamp: Date
  location: string
  coordinates: string
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Critical'
  analysisResult: AnalysisResult
  imageUrl?: string
}

export interface AppConfig {
  ngrokUrl: string
  firebaseProjectId: string
  geminiApiKey?: string
}
