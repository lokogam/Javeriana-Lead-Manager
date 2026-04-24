import { createSlice } from '@reduxjs/toolkit'
import { fetchEvents } from './eventsThunks'
import type { EventsState } from './eventsTypes'

const initialState: EventsState = {
  items: [],
  status: 'idle',
  error: null,
  lastUpdated: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Error inesperado al cargar eventos.'
      })
  },
})

export default eventsSlice.reducer
