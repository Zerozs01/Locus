import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: (): void => ipcRenderer.send('ping'),
  db: {
    getRegions: () => ipcRenderer.invoke('db:getRegions'),
    getRegionSummaries: () => ipcRenderer.invoke('db:getRegionSummaries'),
    getRegion: (id: string) => ipcRenderer.invoke('db:getRegion', id),
    getProvince: (id: string) => ipcRenderer.invoke('db:getProvince', id),
    getProvincesByRegion: (id: string) => ipcRenderer.invoke('db:getProvincesByRegion', id),
    getProvinceIndex: () => ipcRenderer.invoke('db:getProvinceIndex'),
    getArchiveProvinces: (params: { regionIds?: string[]; ids?: string[]; sortBy?: string; offset?: number; limit?: number }) =>
      ipcRenderer.invoke('db:getArchiveProvinces', params),
    getStats: () => ipcRenderer.invoke('db:getStats'),
    forceReseed: () => ipcRenderer.invoke('db:forceReseed')
  },
  assets: {
    getImageCacheStats: () => ipcRenderer.invoke('assets:getImageCacheStats'),
    clearImageCache: () => ipcRenderer.invoke('assets:clearImageCache')
  },
  config: {
    get: () => ipcRenderer.invoke('config:get'),
    set: (values: Record<string, string>) => ipcRenderer.invoke('config:set', values)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
