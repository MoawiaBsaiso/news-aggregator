import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { toggleBookmark, clearBookmarks } from '../features/bookmarks/bookmarkSlice';
import type { Article } from '../services/newsMapper';

export const useBookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.bookmarks);

  const isBookmarked = (id: string) => items.some((a) => a.id === id);

  return {
    bookmarks: items,
    isBookmarked,
    toggleBookmark: (article: Article) => dispatch(toggleBookmark(article)),
    clearBookmarks: () => dispatch(clearBookmarks()),
  };
};