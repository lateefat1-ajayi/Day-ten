
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return res.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      return res.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    const res = await authFetch(`${API_BASE_URL}/auth/me`);
    return res.json();
  },

  updateProfile: async (profileData) => {
    const res = await authFetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return res.json();
  },
};

// Recipes API
export const recipesAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE_URL}/recipes?${queryParams}`);
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
    return res.json();
  },

  create: async (recipeData) => {
    const res = await authFetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
    return res.json();
  },

  update: async (id, recipeData) => {
    const res = await authFetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await authFetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  like: async (id) => {
    const res = await authFetch(`${API_BASE_URL}/recipes/${id}/like`, {
      method: 'POST',
    });
    return res.json();
  },

  addComment: async (id, comment) => {
    const res = await authFetch(`${API_BASE_URL}/recipes/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text: comment }),
    });
    return res.json();
  },

  getUserRecipes: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/recipes/user/${userId}`);
    return res.json();
  },
};

// User features API
export const userAPI = {
  addToFavorites: async (recipeId) => {
    const res = await authFetch(`${API_BASE_URL}/users/favorites/${recipeId}`, {
      method: 'POST',
    });
    return res.json();
  },

  removeFromFavorites: async (recipeId) => {
    const res = await authFetch(`${API_BASE_URL}/users/favorites/${recipeId}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  getFavorites: async () => {
    const res = await authFetch(`${API_BASE_URL}/users/favorites`);
    return res.json();
  },

  addToMealPlan: async (date, recipeId) => {
    const res = await authFetch(`${API_BASE_URL}/users/meal-plan`, {
      method: 'POST',
      body: JSON.stringify({ date, recipeId }),
    });
    return res.json();
  },

  getMealPlan: async (startDate) => {
    const res = await authFetch(`${API_BASE_URL}/users/meal-plan/${startDate}`);
    return res.json();
  },

  createShoppingList: async (shoppingListData) => {
    const res = await authFetch(`${API_BASE_URL}/users/shopping-lists`, {
      method: 'POST',
      body: JSON.stringify(shoppingListData),
    });
    return res.json();
  },

  getShoppingLists: async () => {
    const res = await authFetch(`${API_BASE_URL}/users/shopping-lists`);
    return res.json();
  },

  updateShoppingListItem: async (listId, itemId, checked) => {
    const res = await authFetch(`${API_BASE_URL}/users/shopping-lists/${listId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ checked }),
    });
    return res.json();
  },

  generateShoppingList: async (startDate, endDate) => {
    const res = await authFetch(`${API_BASE_URL}/users/shopping-lists/generate`, {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
    });
    return res.json();
  },
};

// Legacy functions for backward compatibility (can be removed later)
export async function fetchRecipes(query) {
  const data = await recipesAPI.getAll({ search: query });
  return data.recipes || [];
}

export async function fetchCategories() {
  // This would need to be implemented in the backend
  return [
    { strCategory: 'Breakfast' },
    { strCategory: 'Lunch' },
    { strCategory: 'Dinner' },
    { strCategory: 'Dessert' },
    { strCategory: 'Snack' },
    { strCategory: 'Appetizer' },
    { strCategory: 'Side Dish' },
    { strCategory: 'Beverage' }
  ];
}

export async function fetchByCategory(category) {
  const data = await recipesAPI.getAll({ category });
  return data.recipes || [];
}
