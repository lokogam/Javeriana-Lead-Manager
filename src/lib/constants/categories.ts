export const EVENT_CATEGORIES = [
  'Pregrado',
  'Posgrado',
  'Educacion Continua',
] as const

export const FILTER_CATEGORIES = ['Todos', ...EVENT_CATEGORIES] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]
export type FilterCategory = (typeof FILTER_CATEGORIES)[number]
