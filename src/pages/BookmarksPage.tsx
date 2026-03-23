import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';

const BookmarksPage = () => {
  const { bookmarks, clearBookmarks } = useBookmarks();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bookmarks ({bookmarks.length})
        </h1>
        {bookmarks.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="text-sm text-red-500 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No bookmarks yet</p>
          <p className="text-sm mt-2">Save articles from the home page</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BookmarksPage;