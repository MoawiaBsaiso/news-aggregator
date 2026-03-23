import { CATEGORIES } from '../../utils/constants';
import type { Category } from '../../utils/constants';
import { useFilters } from '../../hooks/useFilters';

const CategoryFilter = () => {
  const { category, setCategory } = useFilters();

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat as Category)}
          className={`px-4 py-1.5 rounded-full text-sm capitalize transition
            ${category === cat
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;