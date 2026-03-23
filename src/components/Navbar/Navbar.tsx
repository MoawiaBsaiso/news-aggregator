import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { toggleTheme } from '../../features/ui/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const { items } = useSelector((state: RootState) => state.bookmarks);
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'font-bold border-b-2 border-blue-500' : '';

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        NewsAgg
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className={`text-sm ${isActive('/')}`}>Home</Link>
        <Link to="/bookmarks" className={`text-sm ${isActive('/bookmarks')} relative`}>
          Bookmarks
          {items.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
        <Link to="/settings" className={`text-sm ${isActive('/settings')}`}>Settings</Link>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;