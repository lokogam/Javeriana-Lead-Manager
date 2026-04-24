import type { RootState } from '../../app/store'
import { selectFilteredEvents } from './eventsSelectors'

const baseState: RootState = {
  events: {
    items: [
      {
        id: '1',
        name: 'Ingenieria de Software',
        category: 'Pregrado',
        date: '2026-05-12',
        modality: 'Presencial',
        summary: 'Programa de software',
        seats: 40,
      },
      {
        id: '2',
        name: 'Maestria en Ciencia de Datos',
        category: 'Posgrado',
        date: '2026-05-20',
        modality: 'Virtual',
        summary: 'Programa de ciencia de datos',
        seats: 20,
      },
    ],
    status: 'succeeded',
    error: null,
    lastUpdated: null,
  },
  filters: {
    searchTerm: '',
    category: 'Todos',
  },
  leads: {
    items: [],
    isHydrated: true,
  },
  theme: {
    mode: 'system',
  },
}

describe('eventsSelectors', () => {
  it('filtra por categoria', () => {
    const result = selectFilteredEvents({
      ...baseState,
      filters: { searchTerm: '', category: 'Posgrado' },
    })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Maestria en Ciencia de Datos')
  })

  it('filtra por nombre ignorando mayusculas', () => {
    const result = selectFilteredEvents({
      ...baseState,
      filters: { searchTerm: 'software', category: 'Todos' },
    })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('retorna vacio cuando no hay coincidencias', () => {
    const result = selectFilteredEvents({
      ...baseState,
      filters: { searchTerm: 'medicina', category: 'Pregrado' },
    })

    expect(result).toEqual([])
  })
})
