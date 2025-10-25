import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI, recipesAPI } from '../utils/api';

export default function MealPlanner() {
  const { isAuthenticated } = useAuth();
  const [mealPlan, setMealPlan] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (isAuthenticated) {
      loadMealPlan();
      loadRecipes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadMealPlan = async () => {
    try {
      const startDate = getWeekStart(selectedDate);
      const data = await userAPI.getMealPlan(startDate);
      setMealPlan(data);
    } catch (err) {
      setError('Failed to load meal plan');
      console.error('Error loading meal plan:', err);
    }
  };

  const loadRecipes = async () => {
    try {
      const data = await recipesAPI.getAll({ limit: 50 });
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error('Error loading recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
  };

  const addMealToPlan = async (dayIndex, recipeId) => {
    try {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + dayIndex);
      
      await userAPI.addToMealPlan(date.toISOString().split('T')[0], recipeId);
      loadMealPlan(); // Reload meal plan
    } catch (err) {
      console.error('Error adding meal to plan:', err);
    }
  };

  const removeMealFromPlan = async (dayIndex, recipeId) => {
    try {
      // This would need to be implemented in the backend
      console.log('Remove meal from plan:', dayIndex, recipeId);
    } catch (err) {
      console.error('Error removing meal from plan:', err);
    }
  };

  const getMealsForDay = (dayIndex) => {
    const dayDate = new Date(selectedDate);
    dayDate.setDate(dayDate.getDate() + dayIndex);
    const dayString = dayDate.toISOString().split('T')[0];
    
    const dayPlan = mealPlan.find(plan => 
      plan.date === dayString
    );
    
    return dayPlan ? dayPlan.recipes : [];
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Please sign in to access meal planning
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in to plan your meals.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Meal Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Plan your weekly meals and organize your cooking schedule
          </p>
          
          {/* Week Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Week starting:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              onClick={loadMealPlan}
              className="px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Meal Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {days.map((day, dayIndex) => {
            const dayMeals = getMealsForDay(dayIndex);
            
            return (
              <div key={day} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{day}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="p-4">
                  {dayMeals.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">No meals planned</p>
                      <button
                        onClick={() => setShowRecipeModal(true)}
                        className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
                      >
                        Add Recipe
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {dayMeals.map((recipe) => (
                        <div key={recipe._id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {recipe.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {recipe.prepTime + recipe.cookTime} min
                            </p>
                          </div>
                          <button
                            onClick={() => removeMealFromPlan(dayIndex, recipe._id)}
                            className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowRecipeModal(true)}
                        className="w-full text-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium py-1"
                      >
                        + Add Recipe
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recipe Selection Modal */}
        {showRecipeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Select Recipe
                </h3>
                <button
                  onClick={() => setShowRecipeModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                {recipes.map((recipe) => (
                  <div key={recipe._id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{recipe.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {recipe.prepTime + recipe.cookTime} min • {recipe.difficulty}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // This would need to know which day was selected
                        setShowRecipeModal(false);
                      }}
                      className="ml-4 px-3 py-1 bg-orange-600 dark:bg-orange-500 text-white rounded text-sm hover:bg-orange-700 dark:hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
