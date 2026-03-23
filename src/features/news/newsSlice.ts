import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from './newsService';
import type { Article } from '../../services/newsMapper';
import type { Category } from '../../utils/constants';

interface NewsState {
  articles: Article[];
  totalResults: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  totalResults: 0,
  status: 'idle',
  error: null,
};

export const loadNews = createAsyncThunk(
  'news/loadNews',
  async (
    params: { category?: Category; query?: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      return await fetchNews(params);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearArticles(state) {
      state.articles = [];
      state.totalResults = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadNews.fulfilled, (state, action: PayloadAction<{ articles: Article[]; totalResults: number }>) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearArticles } = newsSlice.actions;
export default newsSlice.reducer;