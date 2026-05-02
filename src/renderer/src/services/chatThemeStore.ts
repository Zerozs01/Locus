import { useSyncExternalStore } from 'react'
import { ChatColorTheme, defaultChatColorTheme, resolveChatColorTheme } from '../theme/chatTheme'

interface ChatThemeStoreState {
  theme: ChatColorTheme
}

const STORAGE_KEY = 'locus_chat_color_theme_v1'
const listeners = new Set<() => void>()

const loadInitialThemeState = (): ChatThemeStoreState => {
  if (typeof window === 'undefined') {
    return { theme: defaultChatColorTheme }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { theme: defaultChatColorTheme }

    const parsed = JSON.parse(raw) as Partial<ChatColorTheme>
    return { theme: resolveChatColorTheme(parsed) }
  } catch {
    return { theme: defaultChatColorTheme }
  }
}

let state: ChatThemeStoreState = loadInitialThemeState()

const persistState = () => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.theme))
}

const emit = () => {
  persistState()
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => state

const patchTheme = (partialTheme: Partial<ChatColorTheme>) => {
  state = {
    theme: resolveChatColorTheme({
      ...state.theme,
      ...partialTheme
    })
  }
  emit()
}

const resetTheme = () => {
  state = { theme: defaultChatColorTheme }
  emit()
}

export const useChatThemeStore = () => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return {
    theme: snapshot.theme,
    patchTheme,
    resetTheme
  }
}
