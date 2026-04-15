import { app, shell, BrowserWindow, ipcMain, protocol, net } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase, getRegions, getRegion, getProvince, getRegionSummaries, getProvincesByRegion, getProvinceIndex, getArchiveProvinces, seedDatabase, forceReseedDatabase, getDatabaseStats, getProvincePortal, seedProvincePortalData, saveWeatherAqi, getWeatherAqi } from './database/db'
import { initialRegions } from './database/initialData'
import { isanUpper1 } from './database/portalSeed_isanUpper1'
import { isanUpper2 } from './database/portalSeed_isanUpper2'
import { isanLower1 } from './database/portalSeed_isanLower1'
import { isanLower2 } from './database/portalSeed_isanLower2'
import { eastWest1 } from './database/portalSeed_eastWest1'
import { eastWest2 } from './database/portalSeed_eastWest2'
import { eastWest3 } from './database/portalSeed_eastWest3'
import { southPart1 } from './database/portalSeed_south1'
import { southPart2 } from './database/portalSeed_south2'
import { southPart3 } from './database/portalSeed_south3'
import { centralPart1 } from './database/portalSeed_central1'
import { centralPart2 } from './database/portalSeed_central2'
import { centralPart3 } from './database/portalSeed_central3'
import { northPart1 } from './database/portalSeed_north1'
import { northPart2 } from './database/portalSeed_north2'
import { northPart3 } from './database/portalSeed_north3'
import { readRuntimeConfig, writeRuntimeConfig } from './config/runtimeConfig'
import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

protocol.registerSchemesAsPrivileged([
  { scheme: 'locus', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
])

const IMAGE_CACHE_MAX_BYTES = 512 * 1024 * 1024
const IMAGE_CACHE_SWEEP_INTERVAL_MS = 60 * 1000
const IMAGE_FAIL_TTL_MS = 10 * 60 * 1000
const DEFAULT_N8N_WEBHOOK_URL = 'http://localhost:5678'
let lastCacheSweepAt = 0
let cacheSweepInFlight = false
const failedImageCache = new Map<string, number>()

const imageCacheDir = () => path.join(app.getPath('userData'), 'image-cache')
const imageMimeByExt: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif'
}

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value)
const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f1115"/>
      <stop offset="1" stop-color="#1a1d24"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="400" cy="300" r="90" fill="#111827" stroke="#1f2937" stroke-width="2"/>
  <path d="M360 290h80m-80 30h80" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
</svg>`
const fallbackBuffer = Buffer.from(fallbackSvg)

const buildFallbackResponse = () => {
  return new Response(fallbackBuffer, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, max-age=86400'
    }
  })
}

const parseRangeHeader = (rangeHeader: string | null, size: number) => {
  if (!rangeHeader) return null
  const match = rangeHeader.match(/bytes=(\d*)-(\d*)/)
  if (!match) return null
  const startRaw = match[1]
  const endRaw = match[2]
  let start = startRaw ? parseInt(startRaw, 10) : NaN
  let end = endRaw ? parseInt(endRaw, 10) : NaN

  if (Number.isNaN(start)) {
    if (Number.isNaN(end)) return null
    const suffixLength = end
    if (suffixLength <= 0) return null
    start = Math.max(size - suffixLength, 0)
    end = size - 1
  } else {
    if (Number.isNaN(end) || end >= size) {
      end = size - 1
    }
  }

  if (start < 0 || start > end || start >= size) return null
  return { start, end }
}

const getCacheFiles = async () => {
  const dir = imageCacheDir()
  const files = await fs.readdir(dir).catch(() => [])
  const stats = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file)
      try {
        const fileStat = await fs.stat(filePath)
        return {
          path: filePath,
          size: fileStat.size,
          atimeMs: fileStat.atimeMs,
          mtimeMs: fileStat.mtimeMs
        }
      } catch {
        return null
      }
    })
  )
  return stats.filter(Boolean) as Array<{ path: string; size: number; atimeMs: number; mtimeMs: number }>
}

const enforceCacheLimit = async () => {
  if (cacheSweepInFlight) return
  const now = Date.now()
  if (now - lastCacheSweepAt < IMAGE_CACHE_SWEEP_INTERVAL_MS) return
  cacheSweepInFlight = true
  lastCacheSweepAt = now

  try {
    const files = await getCacheFiles()
    let totalSize = files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize <= IMAGE_CACHE_MAX_BYTES) return

    const sorted = [...files].sort((a, b) => (a.atimeMs || a.mtimeMs) - (b.atimeMs || b.mtimeMs))
    for (const file of sorted) {
      if (totalSize <= IMAGE_CACHE_MAX_BYTES) break
      try {
        await fs.unlink(file.path)
        totalSize -= file.size
      } catch {
        continue
      }
    }
  } finally {
    cacheSweepInFlight = false
  }
}

const getImageCacheStats = async () => {
  const files = await getCacheFiles()
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0)
  return {
    fileCount: files.length,
    totalBytes,
    path: imageCacheDir()
  }
}

const clearImageCache = async () => {
  const dir = imageCacheDir()
  await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  await fs.mkdir(dir, { recursive: true })
  return getImageCacheStats()
}

type N8nOverrides = {
  webhookUrl?: string
  apiKey?: string
}

type N8nChatPayload = {
  message: string
  sessionId?: string
  provinceName?: string
  city?: string
  regionName?: string
  country?: string
  lat?: number
  lng?: number
} & N8nOverrides

const resolveN8nConfig = async (overrides?: N8nOverrides) => {
  const config = await readRuntimeConfig()
  const webhookUrl = (overrides?.webhookUrl || config.ngrok || process.env.VITE_NGROK_URL || DEFAULT_N8N_WEBHOOK_URL).replace(/\/+$/, '')
  const apiKey = overrides?.apiKey || config.n8n_api_key || process.env.VITE_N8N_API_KEY || ''
  return { webhookUrl, apiKey }
}

const buildN8nHeaders = (apiKey?: string, contentType?: string) => {
  const headers: Record<string, string> = {}
  if (contentType) {
    headers['content-type'] = contentType
  }
  if (apiKey) {
    headers['x-api-key'] = apiKey
  }
  return headers
}

const buildN8nEndpointCandidates = (webhookUrl: string, endpoint: string) => {
  const normalizedBase = webhookUrl.replace(/\/+$/, '')
  const normalizedEndpoint = endpoint.replace(/^\/+/, '')
  const strippedBase = normalizedBase.replace(/\/(webhook|webhook-test)(\/.*)?$/, '')
  const directWebhookCandidate = /\/(webhook|webhook-test)(\/|$)/.test(normalizedBase)
    ? `${normalizedBase}/${normalizedEndpoint}`.replace(/\/+$/, '')
    : `${strippedBase}/webhook/${normalizedEndpoint}`
  const rootCandidate = `${strippedBase}/${normalizedEndpoint}`

  return Array.from(
    new Set([
      directWebhookCandidate,
      rootCandidate
    ])
  )
}

const parseN8nResponse = async (response: Response) => {
  const rawText = await response.text()
  const contentType = response.headers.get('content-type') || ''
  const looksJson = contentType.includes('application/json')

  if (looksJson && rawText) {
    try {
      return {
        status: response.status,
        ok: response.ok,
        data: JSON.parse(rawText) as unknown,
        text: rawText
      }
    } catch {
      // Fall through to plain text if upstream sends malformed JSON.
    }
  }

  return {
    status: response.status,
    ok: response.ok,
    data: rawText,
    text: rawText
  }
}

const pingN8nHealth = async (overrides?: N8nOverrides) => {
  const { webhookUrl, apiKey } = await resolveN8nConfig(overrides)
  const candidates = buildN8nEndpointCandidates(webhookUrl, 'health')
  let lastStatus = 0

  for (const url of candidates) {
    const response = await net.fetch(url, {
      method: 'GET',
      headers: buildN8nHeaders(apiKey)
    })

    lastStatus = response.status
    if (response.ok || response.status !== 404) {
      return {
        ok: response.ok,
        status: response.status
      }
    }
  }

  return {
    ok: false,
    status: lastStatus || 404
  }
}

const postN8nChat = async (payload: N8nChatPayload) => {
  const { webhookUrl, apiKey } = await resolveN8nConfig(payload)
  const candidates = buildN8nEndpointCandidates(webhookUrl, 'chat')
  let lastResponse: Awaited<ReturnType<typeof parseN8nResponse>> | null = null

  for (const url of candidates) {
    const response = await net.fetch(url, {
      method: 'POST',
      headers: buildN8nHeaders(apiKey, 'application/json'),
      body: JSON.stringify({
        message: payload.message,
        sessionId: payload.sessionId,
        provinceName: payload.provinceName,
        city: payload.city,
        regionName: payload.regionName,
        country: payload.country,
        lat: payload.lat,
        lng: payload.lng
      })
    })

    const parsed = await parseN8nResponse(response)
    lastResponse = parsed
    if (parsed.ok || parsed.status !== 404) {
      return parsed
    }
  }

  return (
    lastResponse || {
      ok: false,
      status: 404,
      error: 'n8n chat endpoint not found'
    }
  )
}

const registerImageProtocol = async () => {
  await fs.mkdir(imageCacheDir(), { recursive: true })
  protocol.handle('locus', async (request) => {
    try {
      const url = new URL(request.url)
      if (url.hostname !== 'image') {
        return buildFallbackResponse()
      }
      const sourceUrl = url.searchParams.get('url')
      if (!sourceUrl || !isHttpUrl(sourceUrl)) {
        return buildFallbackResponse()
      }

      const sourcePath = new URL(sourceUrl).pathname
      const ext = path.extname(sourcePath) || '.img'
      const hash = createHash('sha1').update(sourceUrl).digest('hex')
      const cachedPath = path.join(imageCacheDir(), `${hash}${ext}`)
      const fallbackType = imageMimeByExt[ext.toLowerCase()] || 'application/octet-stream'
      const rangeHeader = request.headers.get('range')
      const failedAt = failedImageCache.get(sourceUrl)
      if (failedAt && Date.now() - failedAt < IMAGE_FAIL_TTL_MS) {
        return buildFallbackResponse()
      }

      try {
        const stat = await fs.stat(cachedPath)
        const range = parseRangeHeader(rangeHeader, stat.size)
        fs.utimes(cachedPath, new Date(), new Date()).catch(() => {})

        if (rangeHeader && !range) {
          return new Response('', {
            status: 416,
            headers: {
              'content-range': `bytes */${stat.size}`
            }
          })
        }

        if (range) {
          const length = range.end - range.start + 1
          const handle = await fs.open(cachedPath, 'r')
          const buffer = Buffer.alloc(length)
          await handle.read(buffer, 0, length, range.start)
          await handle.close()
          return new Response(buffer, {
            status: 206,
            headers: {
              'content-type': fallbackType,
              'content-length': length.toString(),
              'content-range': `bytes ${range.start}-${range.end}/${stat.size}`,
              'accept-ranges': 'bytes',
              'cache-control': 'public, max-age=31536000, immutable'
            }
          })
        }

        const data = await fs.readFile(cachedPath)
        return new Response(data, {
          headers: {
            'content-type': fallbackType,
            'content-length': stat.size.toString(),
            'accept-ranges': 'bytes',
            'cache-control': 'public, max-age=31536000, immutable'
          }
        })
      } catch {
        const response = await net.fetch(sourceUrl, rangeHeader ? { headers: { Range: rangeHeader } } : undefined)
        if (!response.ok) {
          if (response.status === 404) {
            failedImageCache.set(sourceUrl, Date.now())
          }
          return buildFallbackResponse()
        }
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const contentType = response.headers.get('content-type') || fallbackType

        if (!rangeHeader) {
          await fs.writeFile(cachedPath, buffer)
          enforceCacheLimit().catch(() => {})
          return new Response(buffer, {
            headers: {
              'content-type': contentType,
              'content-length': buffer.length.toString(),
              'accept-ranges': 'bytes',
              'cache-control': 'public, max-age=31536000, immutable'
            }
          })
        }

        const rangeValue = response.headers.get('content-range')
        const headers: Record<string, string> = {
          'content-type': contentType,
          'content-length': buffer.length.toString(),
          'accept-ranges': 'bytes',
          'cache-control': 'public, max-age=31536000, immutable'
        }
        if (rangeValue) {
          headers['content-range'] = rangeValue
        }
        return new Response(buffer, {
          status: response.status,
          headers
        })
      }
    } catch (error) {
      console.error('Image protocol error:', error)
      return buildFallbackResponse()
    }
  })
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0a0a0b',
      symbolColor: '#fbbf24',
      height: 40
    },
    backgroundColor: '#0a0a0b',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false, // Required for @electron-toolkit/preload compatibility
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the renderer
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.locus.app')

  // Initialize and Seed Database
  initDatabase()
  seedDatabase(initialRegions)
  seedProvincePortalData({ ...isanUpper1, ...isanUpper2, ...isanLower1, ...isanLower2, ...eastWest1, ...eastWest2, ...eastWest3, ...southPart1, ...southPart2, ...southPart3, ...centralPart1, ...centralPart2, ...centralPart3, ...northPart1, ...northPart2, ...northPart3 })
  await registerImageProtocol().catch((error) => console.error('Failed to register image protocol:', error))

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC handlers
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('db:getRegions', () => {
     return getRegions();
  })

  ipcMain.handle('db:getRegionSummaries', () => {
     return getRegionSummaries();
  })

  ipcMain.handle('db:getRegion', (_, id) => {
     return getRegion(id);
  })

  ipcMain.handle('db:getProvince', (_, id) => {
     return getProvince(id);
  })

  ipcMain.handle('db:getProvincePortal', (_, id) => {
     return getProvincePortal(id);
  })

  ipcMain.handle('db:getProvincesByRegion', (_, id) => {
     return getProvincesByRegion(id);
  })

  ipcMain.handle('db:getProvinceIndex', () => {
     return getProvinceIndex();
  })
  ipcMain.handle('db:getArchiveProvinces', (_, params) => {
     return getArchiveProvinces(params);
  })

  // Database debug/maintenance handlers
  ipcMain.handle('db:getStats', () => {
     return getDatabaseStats();
  })

  ipcMain.handle('db:forceReseed', () => {
     forceReseedDatabase(initialRegions);
     return getDatabaseStats();
  })

  ipcMain.handle('db:saveWeatherAqi', (_, records: { provinceId: string; date: string; temperature: number; aqi: number }[]) => {
     return saveWeatherAqi(records);
  })

  ipcMain.handle('db:getWeatherAqi', (_, provinceId?: string, date?: string) => {
     return getWeatherAqi(provinceId, date);
  })

  ipcMain.handle('assets:getImageCacheStats', () => {
     return getImageCacheStats();
  })

  ipcMain.handle('assets:clearImageCache', () => {
     return clearImageCache();
  })

  ipcMain.handle('config:get', () => {
    return readRuntimeConfig()
  })

  ipcMain.handle('config:set', (_, values: Record<string, unknown>) => {
    return writeRuntimeConfig(values)
  })

  ipcMain.handle('n8n:health', async (_, overrides?: N8nOverrides) => {
    try {
      return await pingN8nHealth(overrides)
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  })

  ipcMain.handle(
    'n8n:chat',
    async (_, payload: N8nChatPayload) => {
      try {
        return await postN8nChat(payload)
      } catch (error) {
        return {
          ok: false,
          status: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }
  )

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
