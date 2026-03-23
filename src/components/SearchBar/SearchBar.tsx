import { useState } from 'react';
import { useFilters } from '../../hooks/useFilters';

const SearchBar = () => {
  const { query, setQuery } = useFilters();
  const [input, setInput] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search news..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;