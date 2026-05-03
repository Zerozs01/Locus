import { ElectronAPI } from '@electron-toolkit/preload'

interface DatabaseStats {
  regions: number
  provinces: number
  stats: number
  dbPath: string
}

interface ExplorePlace {
  id: number
  title: string
  locationName: string | null
  category: string | null
  iconName: string | null
  regionId: string | null
  provinceId: string | null
  tags: string[] | null
  thumbnailUrl: string | null
  fullImageUrl: string | null
  description: string | null
  rating: number | null
  reviewCount: number | null
  reviewCountWeek: number | null
  lastReviewAt: string | null
  checkinCount: number | null
  openingHours: string | null
  sourceUrl: string | null
  updatedAt: string | null
}

interface TrendingPlace extends ExplorePlace {
  trendingScore: number
  recencyGrowth: number
  isTrending: boolean
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      ping: () => void
      db: {
        getRegions: () => Promise<any[]>
        getRegionSummaries: () => Promise<any[]>
        getRegion: (id: string) => Promise<any>
        getProvince: (id: string) => Promise<any>
        getProvincePortal: (id: string) => Promise<any>
        getProvincesByRegion: (id: string) => Promise<any[]>
        getProvinceIndex: () => Promise<Array<{ id: string; name: string; regionId: string; regionName: string; dailyCostValue?: number | null; populationValue?: number | null; safety?: number | null }>>
        getArchiveProvinces: (params: { regionIds?: string[]; ids?: string[]; sortBy?: string; offset?: number; limit?: number }) => Promise<{ rows: any[]; total: number }>
        getStats: () => Promise<DatabaseStats>
        forceReseed: () => Promise<DatabaseStats>
        saveWeatherAqi: (records: { provinceId: string; date: string; temperature: number; aqi: number }[]) => Promise<number>
        getWeatherAqi: (provinceId?: string, date?: string) => Promise<Array<{ provinceId: string; date: string; temperature: number; aqi: number }>>
        getExplorePlaces: (category?: string, regionId?: string) => Promise<ExplorePlace[]>
        getExplorePlacesByCategories: (categories: string[]) => Promise<ExplorePlace[]>
        getTrendingPlaces: (limit?: number) => Promise<TrendingPlace[]>
        getPopularProvinces: (regionId?: string, limit?: number) => Promise<Array<{ provinceId: string; provinceName: string; regionId: string; visitorCount: number; popularityFactors?: string; lastUpdated?: string }>>
      }
      floodCache: {
        save: (provinceId: string, geoJsonData: object) => Promise<void>
        get: (provinceId: string) => Promise<{ data: object; fetchedAt: string } | null>
        isValid: (provinceId: string, maxAgeHours?: number) => Promise<boolean>
      }
      fuelPrices: {
        save: (prices: Array<{ fuelType: string; price: number; source?: string }>) => Promise<void>
        get: () => Promise<Array<{ fuelType: string; price: number; source: string; fetchedAt: string }>>
        isValid: (maxAgeHours?: number) => Promise<boolean>
      }
      explorePlaces: {
        getAll: () => Promise<ExplorePlace[]>
        getByCategories: (categories: string[]) => Promise<ExplorePlace[]>
      }
      fetchBangchak: () => Promise<{ ok: boolean; data?: string; status?: number; error?: string }>
      assets: {
        getImageCacheStats: () => Promise<{ fileCount: number; totalBytes: number; path: string }>
        clearImageCache: () => Promise<{ fileCount: number; totalBytes: number; path: string }>
      }
      config: {
        get: () => Promise<Record<string, string>>
        set: (values: Record<string, string>) => Promise<void>
      }
      n8n: {
        health: (overrides?: { webhookUrl?: string; apiKey?: string }) => Promise<{ ok: boolean; status: number; error?: string }>
        chat: (payload: {
          message: string
          sessionId?: string
          provinceName?: string
          city?: string
          regionName?: string
          country?: string
          lat?: number
          lng?: number
          webhookUrl?: string
          apiKey?: string
        }) => Promise<{ ok: boolean; status: number; data?: unknown; text?: string; error?: string }>
      }
      map: {
        getRainRadarTileTemplate: () => Promise<string | null>
        searchEvChargers: (params: { lat: number; lng: number; distanceKm?: number; maxResults?: number; apiKey?: string }) => Promise<Array<{ lat: number; lng: number; title: string; subtitle: string }>>
        fetchGistdaFeatures: (url: string, headers?: Record<string, string>) => Promise<{ ok: boolean; data?: any; status?: number; error?: string }>
      }
    }
  }
}
