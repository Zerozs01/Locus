import { useEffect } from 'react'
import { ChatColorTheme, getChatThemeVars } from './chatTheme'

const CHAT_VAR_KEYS = [
  '--chat-accent-primary',
  '--chat-accent-primary-hover',
  '--chat-accent-soft',
  '--chat-accent-soft-border',
  '--chat-accent-text',
  '--chat-recent-active-bg',
  '--chat-recent-active-border',
  '--chat-recent-active-shadow',
  '--chat-recent-active-icon-bg',
  '--chat-recent-active-icon-text',
  '--chat-md-text',
  '--chat-md-muted',
  '--chat-md-h1',
  '--chat-md-h2',
  '--chat-md-h3',
  '--chat-md-strong',
  '--chat-md-list-strong',
  '--chat-md-italic',
  '--chat-md-code-text',
  '--chat-md-code-bg',
  '--chat-md-bullet',
  '--chat-md-divider'
] as const

export const useChatTheme = (theme: ChatColorTheme) => {
  useEffect(() => {
    const root = document.documentElement
    const vars = getChatThemeVars(theme)

    CHAT_VAR_KEYS.forEach((key) => {
      const value = vars[key]
      if (value) {
        root.style.setProperty(key, value)
      }
    })

    return () => {
      CHAT_VAR_KEYS.forEach((key) => {
        root.style.removeProperty(key)
      })
    }
  }, [theme])
}
