import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: (): void => ipcRenderer.send('ping'),
  db: {
    getRegions: () => ipcRenderer.invoke('db:getRegions'),
    getProvince: (id: string) => ipcRenderer.invoke('db:getProvince', id),
    getStats: () => ipcRenderer.invoke('db:getStats'),
    forceReseed: () => ipcRenderer.invoke('db:forceReseed')
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
