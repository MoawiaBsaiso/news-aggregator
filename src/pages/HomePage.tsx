import { useNews } from '../hooks/useNews';
import { useFilters } from '../hooks/useFilters';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

const HomePage = () => {
  const { articles, status, error, totalResults } = useNews();
  const { page, setPage } = useFilters();

  const totalPages = Math.ceil(totalResults / DEFAULT_PAGE_SIZE);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <SearchBar />
        <CategoryFilter />
      </div>

      {status === 'loading' && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center py-20 text-red-500">
          <p className="text-lg font-semibold">Something went wrong</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      )}

      {status === 'succeeded' && articles.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No articles found</p>
        </div>
      )}

      {status === 'succeeded' && articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
              >
                ← Prev
              </button>
              <span className="px-4 py-2 text-sm text-gray-500">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-40 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default HomePage;