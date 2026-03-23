import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Article } from '../../services/newsMapper';

interface BookmarkState {
  items: Article[];
}

const loadFromStorage = (): Article[] => {
  try {
    const data = localStorage.getItem('bookmarks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Article[]) => {
  localStorage.setItem('bookmarks', JSON.stringify(items));
};

const initialState: BookmarkState = {
  items: loadFromStorage(),
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<Article>) {
      const exists = state.items.find((a) => a.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((a) => a.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(state.items);
    },
    clearBookmarks(state) {
      state.items = [];
      saveToStorage([]);
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;