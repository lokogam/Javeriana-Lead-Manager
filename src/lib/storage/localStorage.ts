import type { LeadEntity } from '../../features/leads/leadsTypes'
import type { ThemeMode } from '../../features/theme/themeTypes'

const LEADS_STORAGE_KEY = 'javeriana.leads.v1'
const THEME_STORAGE_KEY = 'javeriana.theme.v1'

type LeadsPayload = {
  version: 1
  leads: LeadEntity[]
}

function isLeadEntity(value: unknown): value is LeadEntity {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.phone === 'string' &&
    typeof candidate.interest === 'string' &&
    typeof candidate.createdAt === 'string'
  )
}

export function loadLeads(): LeadEntity[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as LeadsPayload

    if (!Array.isArray(parsed.leads)) {
      return []
    }

    return parsed.leads.filter(isLeadEntity)
  } catch (_error) {
    return []
  }
}

export function saveLeads(leads: LeadEntity[]): void {
  if (typeof window === 'undefined') {
    return
  }

  const payload: LeadsPayload = {
    version: 1,
    leads,
  }

  window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(payload))
}

export function loadThemePreference(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (value === 'light' || value === 'dark' || value === 'system') {
    return value
  }

  return null
}

export function saveThemePreference(mode: ThemeMode): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, mode)
}
