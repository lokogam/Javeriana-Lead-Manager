import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FilterCategory } from '../../lib/constants/categories'

export interface FiltersState {
  searchTerm: string
  category: FilterCategory
}

const initialState: FiltersState = {
  searchTerm: '',
  category: 'Todos',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setCategory: (state, action: PayloadAction<FilterCategory>) => {
      state.category = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ''
      state.category = 'Todos'
    },
  },
})

export const { setSearchTerm, setCategory, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
