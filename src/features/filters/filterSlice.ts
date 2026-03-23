import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../utils/constants';

interface FilterState {
  category: Category;
  query: string;
  page: number;
}

const initialState: FilterState = {
  category: 'general',
  query: '',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
      state.page = 1;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters(state) {
      state.category = 'general';
      state.query = '';
      state.page = 1;
    },
  },
});

export const { setCategory, setQuery, setPage, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;