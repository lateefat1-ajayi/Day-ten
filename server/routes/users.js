const express = require('express');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

const router = express.Router();

// Add recipe to favorites
router.post('/favorites/:recipeId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (!user.favoriteRecipes.includes(req.params.recipeId)) {
      user.favoriteRecipes.push(req.params.recipeId);
      await user.save();
    }

    res.json({ message: 'Recipe added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove recipe from favorites
router.delete('/favorites/:recipeId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favoriteRecipes = user.favoriteRecipes.filter(
      id => id.toString() !== req.params.recipeId
    );
    await user.save();

    res.json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's favorite recipes
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'favoriteRecipes',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    });

    res.json(user.favoriteRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add meal to meal plan
router.post('/meal-plan', auth, async (req, res) => {
  try {
    const { date, recipeId } = req.body;
    const user = await User.findById(req.userId);

    // Find existing meal plan for the date
    let mealPlan = user.mealPlans.find(plan => 
      plan.date.toDateString() === new Date(date).toDateString()
    );

    if (mealPlan) {
      if (!mealPlan.recipes.includes(recipeId)) {
        mealPlan.recipes.push(recipeId);
      }
    } else {
      user.mealPlans.push({
        date: new Date(date),
        recipes: [recipeId]
      });
    }

    await user.save();
    res.json({ message: 'Meal added to plan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get meal plan for a specific week
router.get('/meal-plan/:startDate', auth, async (req, res) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const user = await User.findById(req.userId).populate({
      path: 'mealPlans.recipes',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    });

    const weekMealPlan = user.mealPlans.filter(plan => 
      plan.date >= startDate && plan.date < endDate
    );

    res.json(weekMealPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create shopping list
router.post('/shopping-lists', auth, async (req, res) => {
  try {
    const { name, items } = req.body;
    const user = await User.findById(req.userId);

    const shoppingList = {
      name,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        checked: false
      }))
    };

    user.shoppingLists.push(shoppingList);
    await user.save();

    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get shopping lists
router.get('/shopping-lists', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.shoppingLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update shopping list item
router.put('/shopping-lists/:listId/items/:itemId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = user.shoppingLists.id(req.params.listId);
    
    if (!list) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }

    const item = list.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.checked = req.body.checked;
    await user.save();

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate shopping list from meal plan
router.post('/shopping-lists/generate', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const user = await User.findById(req.userId).populate('mealPlans.recipes');

    const mealPlans = user.mealPlans.filter(plan => 
      plan.date >= new Date(startDate) && plan.date <= new Date(endDate)
    );

    const allRecipes = mealPlans.flatMap(plan => plan.recipes);
    const ingredientsMap = new Map();

    allRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase();
        if (ingredientsMap.has(key)) {
          const existing = ingredientsMap.get(key);
          existing.quantity = `${existing.quantity} + ${ingredient.quantity}`;
        } else {
          ingredientsMap.set(key, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
          });
        }
      });
    });

    const shoppingList = {
      name: `Meal Plan Shopping List - ${new Date(startDate).toLocaleDateString()}`,
      items: Array.from(ingredientsMap.values()).map(item => ({
        name: item.name,
        quantity: item.quantity,
        checked: false
      }))
    };

    user.shoppingLists.push(shoppingList);
    await user.save();

    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
