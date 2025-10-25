# Dishcovery Backend API

A comprehensive recipe management API built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Recipe Management**: Create, read, update, delete recipes
- **Recipe Discovery**: Search, filter by category, cuisine, difficulty
- **Favorites System**: Save and manage favorite recipes
- **Meal Planning**: Plan weekly meals and generate shopping lists
- **Comments & Likes**: Social features for recipe interaction
- **User Profiles**: Manage user information and preferences

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **File Upload**: Multer (for recipe images)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Recipes
- `GET /api/recipes` - Get all public recipes (with pagination and filters)
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe (authenticated)
- `PUT /api/recipes/:id` - Update recipe (author only)
- `DELETE /api/recipes/:id` - Delete recipe (author only)
- `POST /api/recipes/:id/like` - Like/unlike recipe
- `POST /api/recipes/:id/comments` - Add comment to recipe
- `GET /api/recipes/user/:userId` - Get user's recipes

### User Features
- `POST /api/users/favorites/:recipeId` - Add to favorites
- `DELETE /api/users/favorites/:recipeId` - Remove from favorites
- `GET /api/users/favorites` - Get user's favorite recipes
- `POST /api/users/meal-plan` - Add meal to meal plan
- `GET /api/users/meal-plan/:startDate` - Get weekly meal plan
- `POST /api/users/shopping-lists` - Create shopping list
- `GET /api/users/shopping-lists` - Get shopping lists
- `PUT /api/users/shopping-lists/:listId/items/:itemId` - Update shopping list item
- `POST /api/users/shopping-lists/generate` - Generate shopping list from meal plan

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dishcovery
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system

4. **Run the Server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## Database Schema

### User Model
- Personal information (name, email, password)
- Avatar and bio
- Favorite recipes
- Meal plans
- Shopping lists

### Recipe Model
- Basic info (title, description, image)
- Timing (prep time, cook time, servings)
- Difficulty and categorization
- Ingredients and instructions
- Nutrition information
- Social features (likes, comments)
- Author and privacy settings

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in JSON format.

## Development

- Use `npm run dev` for development with auto-restart
- Use `npm start` for production
- The API includes comprehensive error handling and validation
