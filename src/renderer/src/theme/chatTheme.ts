import type { CSSProperties } from 'react'

export interface ChatColorTheme {
  accentPrimary: string
  accentPrimaryHover: string
  accentSoft: string
  accentSoftBorder: string
  accentText: string
  recentActiveBg: string
  recentActiveBorder: string
  recentActiveShadow: string
  recentActiveIconBg: string
  recentActiveIconText: string
  markdownText: string
  markdownMuted: string
  markdownHeading1: string
  markdownHeading2: string
  markdownHeading3: string
  markdownStrong: string
  markdownListStrong: string
  markdownItalic: string
  markdownCodeText: string
  markdownCodeBg: string
  markdownBullet: string
  markdownDivider: string
}

export const defaultChatColorTheme: ChatColorTheme = {
  accentPrimary: '#0891b2',
  accentPrimaryHover: '#06b6d4',
  accentSoft: 'rgba(8, 145, 178, 0.14)',
  accentSoftBorder: 'rgba(34, 211, 238, 0.28)',
  accentText: '#7dd3fc',
  recentActiveBg: 'rgba(8, 50, 70, 0.5)',
  recentActiveBorder: 'rgba(34, 211, 238, 0.34)',
  recentActiveShadow: '0 0 0 1px rgba(34, 211, 238, 0.08)',
  recentActiveIconBg: 'rgba(8, 145, 178, 0.16)',
  recentActiveIconText: '#67e8f9',
  markdownText: '#f8fafc',
  markdownMuted: '#94a3b8',
  markdownHeading1: '#3b82f6',
  markdownHeading2: '#38bdf8',
  markdownHeading3: '#7dd3fc',
  markdownStrong: '#ffffff',
  markdownListStrong: '#c084fc',
  markdownItalic: '#e2e8f0',
  markdownCodeText: '#93c5fd',
  markdownCodeBg: 'rgba(96, 165, 250, 0.14)',
  markdownBullet: '#e2e8f0',
  markdownDivider: 'rgba(148, 163, 184, 0.18)'
}

export const resolveChatColorTheme = (overrides?: Partial<ChatColorTheme>): ChatColorTheme => ({
  ...defaultChatColorTheme,
  ...(overrides ?? {})
})

// Single source of truth for chat palette. Update this object to recolor chat markdown globally.
export const activeChatColorTheme: ChatColorTheme = resolveChatColorTheme({})

type ChatThemeCssVars = CSSProperties & Record<string, string>

export const getChatThemeVars = (theme: ChatColorTheme = defaultChatColorTheme): ChatThemeCssVars => ({
  '--chat-accent-primary': theme.accentPrimary,
  '--chat-accent-primary-hover': theme.accentPrimaryHover,
  '--chat-accent-soft': theme.accentSoft,
  '--chat-accent-soft-border': theme.accentSoftBorder,
  '--chat-accent-text': theme.accentText,
  '--chat-recent-active-bg': theme.recentActiveBg,
  '--chat-recent-active-border': theme.recentActiveBorder,
  '--chat-recent-active-shadow': theme.recentActiveShadow,
  '--chat-recent-active-icon-bg': theme.recentActiveIconBg,
  '--chat-recent-active-icon-text': theme.recentActiveIconText,
  '--chat-md-text': theme.markdownText,
  '--chat-md-muted': theme.markdownMuted,
  '--chat-md-h1': theme.markdownHeading1,
  '--chat-md-h2': theme.markdownHeading2,
  '--chat-md-h3': theme.markdownHeading3,
  '--chat-md-strong': theme.markdownStrong,
  '--chat-md-list-strong': theme.markdownListStrong,
  '--chat-md-italic': theme.markdownItalic,
  '--chat-md-code-text': theme.markdownCodeText,
  '--chat-md-code-bg': theme.markdownCodeBg,
  '--chat-md-bullet': theme.markdownBullet,
  '--chat-md-divider': theme.markdownDivider
})
