import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export const selectLeadsState = (state: RootState) => state.leads
export const selectLeads = (state: RootState) => state.leads.items
export const selectLeadsHydrated = (state: RootState) => state.leads.isHydrated

export const selectLeadCount = createSelector([selectLeads], (leads) => leads.length)
