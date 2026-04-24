import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LeadEntity, LeadsState } from './leadsTypes'

const initialState: LeadsState = {
  items: [],
  isHydrated: false,
}

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    hydrateLeads: (state, action: PayloadAction<LeadEntity[]>) => {
      state.items = action.payload
      state.isHydrated = true
    },
    addLead: (state, action: PayloadAction<LeadEntity>) => {
      state.items.unshift(action.payload)
    },
  },
})

export const { hydrateLeads, addLead } = leadsSlice.actions
export default leadsSlice.reducer
