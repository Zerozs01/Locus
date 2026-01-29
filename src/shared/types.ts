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

export interface Province {
  name: string;
  id: string;
  dist: number;
  tam: number;
  serenity?: number;
  entertainment?: number;
  relax?: number;
  image: string;
  population?: string;
  area?: string;
  dailyCost?: string;
  safety?: number;
}

export interface RegionStats {
  dailyCost: string;
  monthlyCost: string;
  flora: string;
  food: string;
  attraction: string;
  nightlife: string;
}

export interface RegionSummary {
  provinces: number;
  area: string;
  pop: string;
}

export interface Region {
  id: string;
  name: string;
  engName: string;
  code: string;
  color: string;
  gradient?: string;
  image: string;
  summary: RegionSummary;
  stats: RegionStats;
  desc: string;
  subProvinces: Province[];
  safety: number;
}
