import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    onSearch(term.trim());
    setTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search recipes (e.g., pasta, chicken)..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-100 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl transition"
      >
        Search
      </button>
    </form>
  );
}
