import { EVENT_CATEGORIES, type EventCategory } from '../constants/categories'
import type { EventItem, EventModality } from '../../features/events/eventsTypes'

interface RawEventItem {
  id: string
  name: string
  category: string
  date: string
  modality: string
  summary: string
  seats: number
}

function normalizeCategory(value: string): EventCategory {
  if (value === 'Pregrado' || value === 'Posgrado' || value === 'Educacion Continua') {
    return value
  }

  return EVENT_CATEGORIES[0]
}

function normalizeModality(value: string): EventModality {
  if (value === 'Presencial' || value === 'Virtual' || value === 'Hibrido') {
    return value
  }

  return 'Presencial'
}

function toEventItem(raw: RawEventItem): EventItem {
  return {
    id: String(raw.id),
    name: raw.name,
    category: normalizeCategory(raw.category),
    date: raw.date,
    modality: normalizeModality(raw.modality),
    summary: raw.summary,
    seats: Number.isFinite(raw.seats) ? raw.seats : 0,
  }
}

export async function fetchEventsApi(): Promise<EventItem[]> {
  const baseUrl = import.meta.env.BASE_URL
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const eventsUrl = `${normalizedBaseUrl}api/events.json`

  const response = await fetch(eventsUrl, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('No fue posible cargar la oferta academica.')
  }

  const payload = (await response.json()) as RawEventItem[]

  if (!Array.isArray(payload)) {
    throw new Error('La respuesta de eventos tiene un formato invalido.')
  }

  return payload.map(toEventItem)
}
