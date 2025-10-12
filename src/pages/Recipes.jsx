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

  // Featured recipes for preview
  const featuredRecipes = [
    {
      idMeal: '1',
      strMeal: 'Chicken Tikka Masala',
      strMealThumb: 'https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Indian',
      difficulty: 'Medium',
      time: '45 min'
    },
    {
      idMeal: '2',
      strMeal: 'Spaghetti Carbonara',
      strMealThumb: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Italian',
      difficulty: 'Easy',
      time: '30 min'
    },
    {
      idMeal: '3',
      strMeal: 'Beef Stir Fry',
      strMealThumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Asian',
      difficulty: 'Easy',
      time: '25 min'
    },
    {
      idMeal: '4',
      strMeal: 'Chocolate Cake',
      strMealThumb: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Dessert',
      difficulty: 'Hard',
      time: '60 min'
    },
    {
      idMeal: '5',
      strMeal: 'Grilled Salmon',
      strMealThumb: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Seafood',
      difficulty: 'Medium',
      time: '35 min'
    },
    {
      idMeal: '6',
      strMeal: 'Vegetable Curry',
      strMealThumb: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      strYoutube: 'https://youtube.com',
      category: 'Vegetarian',
      difficulty: 'Easy',
      time: '40 min'
    }
  ];

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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-orange-800">Browse Recipes</h2>
        <p className="text-gray-600">Discover amazing recipes from around the world</p>
      </div>

      {/* Search + Filter Layout */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
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
          <div className="">
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
            className="text-sm text-red-600 underline hover:text-red-800 mt-4 transition"
          >
            Clear Filter & Search
          </button>
        )}
      </div>

      {/* Search Results */}
      {(searchTerm || selectedCategory) && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Search Results</h3>
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Featured Recipes */}
      {!searchTerm && !selectedCategory && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Featured Recipes</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.idMeal} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-orange-600">{recipe.strMeal}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>{recipe.category}</span>
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:underline"
                    >
                      Watch Tutorial
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
