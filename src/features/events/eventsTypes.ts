import type { EventCategory } from '../../lib/constants/categories'

export type EventModality = 'Presencial' | 'Virtual' | 'Hibrido'

export interface EventItem {
  id: string
  name: string
  category: EventCategory
  date: string
  modality: EventModality
  summary: string
  seats: number
}

export interface EventsState {
  items: EventItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  lastUpdated: string | null
}
