import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      ping: () => void
      db: {
        getRegions: () => Promise<any[]>
        getProvince: (id: string) => Promise<any>
      }
    }
  }
}
