import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../features/events/eventsSlice'
import filtersReducer from '../features/filters/filtersSlice'
import leadsReducer from '../features/leads/leadsSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    filters: filtersReducer,
    leads: leadsReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
