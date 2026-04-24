import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setThemeMode } from '../../features/theme/themeSlice'
import type { ThemeMode } from '../../features/theme/themeTypes'

const THEME_OPTIONS: Array<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'system', label: 'Sistema' },
]

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-line bg-card/80 p-1"
      aria-label="Selector de tema"
      role="group"
    >
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => dispatch(setThemeMode(option.value))}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            option.value === mode
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:bg-primary/10 hover:text-primary'
          }`}
          aria-pressed={option.value === mode}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
