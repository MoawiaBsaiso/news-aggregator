import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { loadNews } from '../features/news/newsSlice';

export const useNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status, error, totalResults } = useSelector(
    (state: RootState) => state.news
  );
  const { category, query, page } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    dispatch(loadNews({ category, query, page }));
  }, [dispatch, category, query, page]);

  return { articles, status, error, totalResults };
};