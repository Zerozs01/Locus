import { app, shell, BrowserWindow, ipcMain, protocol, net } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase, getRegions, getRegion, getProvince, getRegionSummaries, getProvincesByRegion, getProvinceIndex, getArchiveProvinces, seedDatabase, forceReseedDatabase, getDatabaseStats } from './database/db'
import { initialRegions } from './database/initialData'
import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

protocol.registerSchemesAsPrivileged([
  { scheme: 'locus', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
])

const IMAGE_CACHE_MAX_BYTES = 512 * 1024 * 1024
const IMAGE_CACHE_SWEEP_INTERVAL_MS = 60 * 1000
const IMAGE_FAIL_TTL_MS = 10 * 60 * 1000
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
  
  // Example of parameter usage, though currently not heavily used by frontend yet
  ipcMain.handle('db:getProvince', (_, id) => {
     return getProvince(id);
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

  ipcMain.handle('assets:getImageCacheStats', () => {
     return getImageCacheStats();
  })

  ipcMain.handle('assets:clearImageCache', () => {
     return clearImageCache();
  })

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
