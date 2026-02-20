import { app, safeStorage } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'

interface StoredEntry {
  value: string
  encrypted: boolean
}

interface StoredConfig {
  version: number
  entries: Record<string, StoredEntry>
}

const CONFIG_FILE_NAME = 'runtime-config.json'
const CONFIG_VERSION = 1

const sensitiveKeys = new Set([
  'n8n_api_key',
  'gemini',
  'openrouter',
  'supabase_key',
  'openweather',
  'google_maps'
])

const getConfigPath = () => path.join(app.getPath('userData'), CONFIG_FILE_NAME)

const canEncrypt = () => safeStorage.isEncryptionAvailable()

const encodeValue = (key: string, value: string): StoredEntry => {
  if (!value) {
    return { value: '', encrypted: false }
  }

  const shouldEncrypt = sensitiveKeys.has(key) && canEncrypt()
  if (!shouldEncrypt) {
    return { value, encrypted: false }
  }

  return {
    value: safeStorage.encryptString(value).toString('base64'),
    encrypted: true
  }
}

const decodeValue = (entry: StoredEntry): string => {
  if (!entry) return ''
  if (!entry.encrypted) return entry.value || ''

  if (!canEncrypt()) {
    return ''
  }

  try {
    return safeStorage.decryptString(Buffer.from(entry.value, 'base64'))
  } catch {
    return ''
  }
}

const normalizeInput = (input: Record<string, unknown>) => {
  const result: Record<string, string> = {}
  for (const [key, rawValue] of Object.entries(input || {})) {
    if (typeof rawValue === 'string') {
      result[key] = rawValue.trim()
    } else if (rawValue == null) {
      result[key] = ''
    } else {
      result[key] = String(rawValue).trim()
    }
  }
  return result
}

export const readRuntimeConfig = async (): Promise<Record<string, string>> => {
  try {
    const raw = await fs.readFile(getConfigPath(), 'utf8')
    const parsed = JSON.parse(raw) as Partial<StoredConfig> | Record<string, unknown>

    if ('entries' in parsed && parsed.entries && typeof parsed.entries === 'object') {
      const entries = parsed.entries as Record<string, StoredEntry>
      const result: Record<string, string> = {}
      for (const [key, entry] of Object.entries(entries)) {
        result[key] = decodeValue(entry)
      }
      return result
    }

    // Backward compatibility for any plain JSON object format.
    return normalizeInput(parsed as Record<string, unknown>)
  } catch {
    return {}
  }
}

export const writeRuntimeConfig = async (input: Record<string, unknown>): Promise<void> => {
  const normalized = normalizeInput(input)
  const entries: Record<string, StoredEntry> = {}

  for (const [key, value] of Object.entries(normalized)) {
    entries[key] = encodeValue(key, value)
  }

  const payload: StoredConfig = {
    version: CONFIG_VERSION,
    entries
  }

  await fs.writeFile(getConfigPath(), JSON.stringify(payload, null, 2), 'utf8')
}
