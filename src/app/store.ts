import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import filterReducer from '../features/filters/filterSlice';
import bookmarkReducer from '../features/bookmarks/bookmarkSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    filters: filterReducer,
    bookmarks: bookmarkReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;