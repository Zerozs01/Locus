import { ElectronAPI } from '@electron-toolkit/preload'

interface DatabaseStats {
  regions: number
  provinces: number
  stats: number
  dbPath: string
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
        getProvincesByRegion: (id: string) => Promise<any[]>
        getProvinceIndex: () => Promise<Array<{ id: string; name: string; regionId: string; regionName: string; dailyCostValue?: number | null; populationValue?: number | null; safety?: number | null }>>
        getArchiveProvinces: (params: { regionIds?: string[]; ids?: string[]; sortBy?: string; offset?: number; limit?: number }) => Promise<{ rows: any[]; total: number }>
        getStats: () => Promise<DatabaseStats>
        forceReseed: () => Promise<DatabaseStats>
      }
      assets: {
        getImageCacheStats: () => Promise<{ fileCount: number; totalBytes: number; path: string }>
        clearImageCache: () => Promise<{ fileCount: number; totalBytes: number; path: string }>
      }
      config: {
        get: () => Promise<Record<string, string>>
        set: (values: Record<string, string>) => Promise<void>
      }
    }
  }
}
