import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { toggleTheme } from '../features/ui/uiSlice';

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">Theme</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Currently: {theme === 'light' ? 'Light' : 'Dark'} mode
          </p>
        </div>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </main>
  );
};

export default SettingsPage;