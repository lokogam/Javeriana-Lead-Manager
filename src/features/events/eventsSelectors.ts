import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export const selectEventsState = (state: RootState) => state.events
export const selectEvents = (state: RootState) => state.events.items
export const selectEventsStatus = (state: RootState) => state.events.status
export const selectEventsError = (state: RootState) => state.events.error

export const selectFilteredEvents = createSelector(
  [(state: RootState) => state.events.items, (state: RootState) => state.filters],
  (events, filters) => {
    const normalizedTerm = filters.searchTerm.trim().toLowerCase()

    return events.filter((event) => {
      const matchesCategory = filters.category === 'Todos' || event.category === filters.category
      const matchesTerm = !normalizedTerm || event.name.toLowerCase().includes(normalizedTerm)

      return matchesCategory && matchesTerm
    })
  },
)
