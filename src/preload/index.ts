import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// ─── Daily Cache for Trending Places ──────────────────────────────────────
let trendingPlacesCache: any = null;
let trendingPlacesCacheDate: string | null = null;

const getDayKey = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const isTrendingCacheValid = (): boolean => {
  const today = getDayKey();
  return trendingPlacesCacheDate === today && trendingPlacesCache !== null;
};

// ─── Custom APIs for renderer ──────────────────────────────────────────────
const api = {
  ping: (): void => ipcRenderer.send('ping'),
  db: {
    getRegions: () => ipcRenderer.invoke('db:getRegions'),
    getRegionSummaries: () => ipcRenderer.invoke('db:getRegionSummaries'),
    getRegion: (id: string) => ipcRenderer.invoke('db:getRegion', id),
    getProvince: (id: string) => ipcRenderer.invoke('db:getProvince', id),
    getProvincePortal: (id: string) => ipcRenderer.invoke('db:getProvincePortal', id),
    getProvincesByRegion: (id: string) => ipcRenderer.invoke('db:getProvincesByRegion', id),
    getProvinceIndex: () => ipcRenderer.invoke('db:getProvinceIndex'),
    getArchiveProvinces: (params: { regionIds?: string[]; ids?: string[]; sortBy?: string; offset?: number; limit?: number }) =>
      ipcRenderer.invoke('db:getArchiveProvinces', params),
    getStats: () => ipcRenderer.invoke('db:getStats'),
    forceReseed: () => ipcRenderer.invoke('db:forceReseed'),
    saveWeatherAqi: (records: { provinceId: string; date: string; temperature: number; aqi: number }[]) =>
      ipcRenderer.invoke('db:saveWeatherAqi', records),
    getWeatherAqi: (provinceId?: string, date?: string) =>
      ipcRenderer.invoke('db:getWeatherAqi', provinceId, date),
    getExplorePlaces: (category?: string, regionId?: string) =>
      ipcRenderer.invoke('db:getExplorePlaces', category, regionId),
    getExplorePlacesByCategories: (categories: string[]) =>
      ipcRenderer.invoke('db:getExplorePlacesByCategories', categories),
    getTrendingPlaces: async (limit?: number) => {
      // Use daily cache: check once per calendar day
      if (isTrendingCacheValid()) {
        console.log('💾 getTrendingPlaces: Using cache from', trendingPlacesCacheDate);
        return trendingPlacesCache;
      }
      
      console.log('🔄 getTrendingPlaces: Cache expired or first load, fetching from IPC');
      const result = await ipcRenderer.invoke('get-trending-places', limit);
      
      // Update cache
      trendingPlacesCache = result;
      trendingPlacesCacheDate = getDayKey();
      console.log('💾 getTrendingPlaces: Cached for', trendingPlacesCacheDate);
      
      return result;
    },
    getPopularProvinces: (regionId?: string, limit?: number) =>
      ipcRenderer.invoke('db:getPopularProvinces', regionId, limit),
    populateTestTrendingData: () =>
      ipcRenderer.invoke('db:populate-test-trending'),
    getNewsArchive: (provinceId?: string, limit?: number) =>
      ipcRenderer.invoke('db:getNewsArchive', provinceId, limit),
    saveNewsArchive: (items: any[]) =>
      ipcRenderer.invoke('db:saveNewsArchive', items)
  },
  shell: {
    openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url)
  },
  floodCache: {
    save: (provinceId: string, geoJsonData: object) =>
      ipcRenderer.invoke('db:saveFloodCache', provinceId, geoJsonData),
    get: (provinceId: string) =>
      ipcRenderer.invoke('db:getFloodCache', provinceId),
    isValid: (provinceId: string, maxAgeHours?: number) =>
      ipcRenderer.invoke('db:isFloodCacheValid', provinceId, maxAgeHours)
  },
  fuelPrices: {
    save: (prices: Array<{ fuelType: string; price: number; source?: string }>) =>
      ipcRenderer.invoke('db:saveFuelPrices', prices),
    get: () =>
      ipcRenderer.invoke('db:getFuelPrices'),
    isValid: (maxAgeHours?: number) =>
      ipcRenderer.invoke('db:isFuelPricesValid', maxAgeHours)
  },
  explorePlaces: {
    getAll: () =>
      ipcRenderer.invoke('db:getExplorePlaces'),
    getByCategories: (categories: string[]) =>
      ipcRenderer.invoke('db:getExplorePlacesByCategories', categories),
    scrapeSinglePlace: (id: number) =>
      ipcRenderer.invoke('db:scrape-single-place', id)
  },
  fetchBangchak: () =>
    ipcRenderer.invoke('fuel:getBangchakPrices'),
  assets: {
    getImageCacheStats: () => ipcRenderer.invoke('assets:getImageCacheStats'),
    clearImageCache: () => ipcRenderer.invoke('assets:clearImageCache')
  },
  config: {
    get: () => ipcRenderer.invoke('config:get'),
    set: (values: Record<string, string>) => ipcRenderer.invoke('config:set', values)
  },
  n8n: {
    health: (overrides?: { webhookUrl?: string; apiKey?: string }) => ipcRenderer.invoke('n8n:health', overrides),
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
    }) =>
      ipcRenderer.invoke('n8n:chat', payload)
  },
  map: {
    getRainRadarTileTemplate: () => ipcRenderer.invoke('map:getRainRadarTileTemplate'),
    searchEvChargers: (params: { lat: number; lng: number; distanceKm?: number; maxResults?: number; apiKey?: string }) =>
      ipcRenderer.invoke('map:searchEvChargers', params),
    fetchGistdaFeatures: (url: string, headers?: Record<string, string>) =>
      ipcRenderer.invoke('map:fetchGistdaFeatures', url, headers)
  },
  chat: {
    saveConversation: (id: string, title: string, context: any, lastContextKey: string | null) =>
      ipcRenderer.invoke('db:saveChatConversation', id, title, context, lastContextKey),
    getConversations: () =>
      ipcRenderer.invoke('db:getChatConversations'),
    getConversation: (id: string) =>
      ipcRenderer.invoke('db:getChatConversation', id),
    deleteConversation: (id: string) =>
      ipcRenderer.invoke('db:deleteChatConversation', id),
    saveMessage: (message: any) =>
      ipcRenderer.invoke('db:saveChatMessage', message),
    getMessages: (conversationId: string) =>
      ipcRenderer.invoke('db:getChatMessages', conversationId),
    deleteChatMessage: (messageId: string) =>
      ipcRenderer.invoke('db:deleteChatMessage', messageId)
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
