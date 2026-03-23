import type { Article } from '../../services/newsMapper';
import { useBookmarks } from '../../hooks/useBookmarks';

interface Props {
  article: Article;
}

const NewsCard = ({ article }: Props) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="relative">
        <img
  src={article.imageUrl}
  alt={article.title}
  className="w-full h-48 object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent && !parent.querySelector('.img-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'img-placeholder w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center';
      placeholder.innerHTML = '<span style="font-size:2rem">📰</span>';
      parent.insertBefore(placeholder, target);
    }
  }}
/>
        <button
          onClick={() => toggleBookmark(article)}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow hover:scale-110 transition"
        >
          {bookmarked ? '🔖' : '🏷️'}
        </button>
        <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {article.source}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-3 flex-1">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline"
          >
            Read more 
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;