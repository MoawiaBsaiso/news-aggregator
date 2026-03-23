import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;