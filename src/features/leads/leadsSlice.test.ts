import reducer, { addLead, hydrateLeads } from './leadsSlice'

describe('leadsSlice', () => {
  it('hidrata leads desde persistencia', () => {
    const state = reducer(undefined, hydrateLeads([{ id: '1', fullName: 'Ana Ruiz', email: 'ana@mail.com', phone: '', interest: 'Evento', createdAt: '2026-01-01' }]))

    expect(state.isHydrated).toBe(true)
    expect(state.items).toHaveLength(1)
  })

  it('agrega leads al inicio de la lista', () => {
    const initial = reducer(undefined, hydrateLeads([]))

    const next = reducer(
      initial,
      addLead({
        id: '2',
        fullName: 'Carlos Perez',
        email: 'carlos@mail.com',
        phone: '3001234567',
        interest: 'Maestria',
        createdAt: '2026-01-02',
      }),
    )

    expect(next.items[0].id).toBe('2')
    expect(next.items).toHaveLength(1)
  })
})
