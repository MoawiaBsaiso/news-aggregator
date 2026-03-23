import { useLocation, useNavigate } from 'react-router-dom';
import type { Article } from '../services/newsMapper';
import { useBookmarks } from '../hooks/useBookmarks';

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as Article | undefined;
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!article) {
    navigate('/');
    return null;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-500 hover:underline mb-6 block"
      >
        ← Back
      </button>

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {article.source}
        </span>
        <button
          onClick={() => toggleBookmark(article)}
          className="text-sm text-gray-500 hover:text-blue-500 transition"
        >
          {isBookmarked(article.id) ? '🔖 Saved' : '🏷️ Save'}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {article.title}
      </h1>

      <p className="text-sm text-gray-400 mb-6">
        By {article.author} · {new Date(article.publishedAt).toLocaleDateString()}
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
        {article.content || article.description}
      </p>

        <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Read full article
      </a>
    </main>
  );
};

export default ArticlePage;