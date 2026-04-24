import type { ThemeMode } from '../../features/theme/themeTypes'

interface ApplyThemeOptions {
  animate?: boolean
  durationMs?: number
}

let transitionTimer: number | undefined

function enableThemeTransition(durationMs: number): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const root = document.documentElement
  root.classList.add('theme-switching')

  if (transitionTimer !== undefined) {
    window.clearTimeout(transitionTimer)
  }

  transitionTimer = window.setTimeout(() => {
    root.classList.remove('theme-switching')
  }, durationMs)
}

export function resolveThemeMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    if (typeof window === 'undefined') {
      return 'light'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return mode
}

export function applyThemeMode(mode: ThemeMode, options: ApplyThemeOptions = {}): 'light' | 'dark' {
  const resolved = resolveThemeMode(mode)
  const { animate = false, durationMs = 280 } = options

  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const shouldAnimate =
      animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldAnimate) {
      enableThemeTransition(durationMs)
      window.requestAnimationFrame(() => {
        document.documentElement.classList.toggle('dark', resolved === 'dark')
      })
    } else {
      document.documentElement.classList.toggle('dark', resolved === 'dark')
    }
  }

  return resolved
}
