import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase, getRegions, getProvince, seedDatabase, forceReseedDatabase, getDatabaseStats } from './database/db'
import { initialRegions } from './database/initialData'

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

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.locus.app')

  // Initialize and Seed Database
  initDatabase()
  seedDatabase(initialRegions)

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC handlers
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('db:getRegions', () => {
     return getRegions();
  })
  
  // Example of parameter usage, though currently not heavily used by frontend yet
  ipcMain.handle('db:getProvince', (_, id) => {
     return getProvince(id);
  })

  // Database debug/maintenance handlers
  ipcMain.handle('db:getStats', () => {
     return getDatabaseStats();
  })

  ipcMain.handle('db:forceReseed', () => {
     forceReseedDatabase(initialRegions);
     return getDatabaseStats();
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
