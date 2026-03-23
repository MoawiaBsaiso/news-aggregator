import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;