# Dishcovery - Full Stack Recipe Management App

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dishcovery
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root**
   ```bash
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🎯 Features Implemented

### ✅ Backend Features
- **User Authentication**: JWT-based login/register system
- **Recipe Management**: Full CRUD operations for recipes
- **Database Models**: User, Recipe with proper relationships
- **API Endpoints**: RESTful API with proper error handling
- **Security**: Password hashing, input validation, CORS

### ✅ Frontend Features
- **Authentication Context**: Global state management for user auth
- **Updated Login/Register**: Real authentication integration
- **API Integration**: Complete API client with error handling
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### 🚧 Next Steps (Advanced Features)
- Recipe creation form
- Favorites system
- Meal planning interface
- Shopping list generation
- Recipe search and filtering
- User profile management
- Recipe comments and likes

## 📁 Project Structure

```
dishcovery/
├── server/                 # Backend API
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   └── utils/            # Utility functions
└── README.md
```

## 🔧 Development Commands

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Portfolio Highlights

This project demonstrates:
- **Full-stack development** with Node.js/Express and React
- **Database design** with MongoDB and Mongoose
- **Authentication & authorization** with JWT
- **RESTful API design** with proper error handling
- **Modern React patterns** with hooks and context
- **Responsive UI design** with Tailwind CSS
- **Code organization** and best practices

## 🚀 Deployment Ready

The app is structured for easy deployment:
- Backend can be deployed to Heroku, Railway, or DigitalOcean
- Frontend can be deployed to Vercel, Netlify, or GitHub Pages
- Database can use MongoDB Atlas for production

## 📝 Next Development Phase

Ready to implement:
1. Recipe creation and editing forms
2. Advanced search and filtering
3. User favorites and meal planning
4. Shopping list generation
5. Recipe sharing and social features
6. Image upload for recipes
7. Recipe rating and review system
