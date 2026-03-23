import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { setCategory, setQuery, setPage, resetFilters } from '../features/filters/filterSlice';
import type { Category } from '../utils/constants';

export const useFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);

  return {
    ...filters,
    setCategory: (cat: Category) => dispatch(setCategory(cat)),
    setQuery: (q: string) => dispatch(setQuery(q)),
    setPage: (p: number) => dispatch(setPage(p)),
    resetFilters: () => dispatch(resetFilters()),
  };
};