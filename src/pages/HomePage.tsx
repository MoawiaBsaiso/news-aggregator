import { useRef } from 'react';
import { useNews } from '../hooks/useNews';
import { useFilters } from '../hooks/useFilters';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';
import HeroAnimation from '../components/HeroAnimation';

const HomePage = () => {
  const { articles, status, error, totalResults } = useNews();
  const { page, setPage } = useFilters();
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(totalResults / DEFAULT_PAGE_SIZE);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-950">
            <HeroAnimation />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 w-fit">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm">Live News Feed</span>
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">
              World News,
              <br />
              <span className="text-blue-400">One Place.</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-md">
              Aggregating top headlines from trusted sources around the globe —
              search, filter, and save what matters to you.
            </p>

            <div className="flex gap-4">
              <button
                onClick={scrollToGrid}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
              >
                Explore News
              </button>
              
              <a
                href="https://github.com/MoawiaBsaiso/news-aggregator"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:border-gray-400 transition"
              >
                View Source
              </a>
            </div>
          </div>

          {/* Right — Globe */}
          {/* Right — Globe */}
          <div className="h-[420px] w-full overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
</div>

        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToGrid}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ── NEWS GRID SECTION ── */}
      <section ref={gridRef} className="relative max-w-7xl mx-auto px-4 py-12">
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
      </section>
    </main>
  );
};

export default HomePage;