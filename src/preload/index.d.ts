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
        getProvince: (id: string) => Promise<any>
        getStats: () => Promise<DatabaseStats>
        forceReseed: () => Promise<DatabaseStats>
      }
    }
  }
}
