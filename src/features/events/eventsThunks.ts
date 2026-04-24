import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchEventsApi } from '../../lib/api/eventsApi'
import type { EventItem } from './eventsTypes'

export const fetchEvents = createAsyncThunk<EventItem[], void, { rejectValue: string }>(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchEventsApi()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'No fue posible cargar la oferta academica.'
      return rejectWithValue(message)
    }
  },
)
