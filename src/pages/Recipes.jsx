import { useState } from 'react';
import { fetchByCategory, fetchRecipes } from '../utils/api';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch {
      setError('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    if (!category) return;

    setLoading(true);
    setError('');
    try {
      const results = await fetchByCategory(category);
      setRecipes(results);
    } catch {
      setError('Failed to fetch category meals.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setRecipes([]);
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pb-32">
      <h2 className="text-3xl font-bold mb-4 text-center text-amber-600">Search for Recipes</h2>

      {/* Search + Filter Layout */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            onSearch={(query) => {
              setSearchTerm(query);
              handleSearch(query);
              setSelectedCategory('');
            }}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <div className="w-full md:w-64">
          <CategoryFilter
            onSelectCategory={handleCategorySelect}
            value={selectedCategory}
          />
        </div>
      </div>

      {/* Clear Filters */}
      {(searchTerm || selectedCategory) && (
        <button
          onClick={handleClearFilters}
          className="text-sm text-red-600 underline hover:text-red-800 mb-4 transition"
        >
          Clear Filter & Search
        </button>
      )}

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
