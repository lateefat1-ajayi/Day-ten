# 🚀 Quick Setup Guide

## Backend Setup (Required for Login/Dashboard)

The login issue is because the backend server isn't running. Here's how to fix it:

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the `server` directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dishcovery
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system. If you don't have MongoDB installed:
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

### 4. Start the Backend Server
```bash
cd server
npm run dev
```

You should see:
```
Connected to MongoDB
Server is running on port 5000
```

### 5. Test the Backend
Open your browser and go to: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "healthy",
  "message": "Dishcovery API is running!",
  "timestamp": "2025-01-25T..."
}
```

## Frontend Setup

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

## 🎯 Testing the App

1. **Open**: `http://localhost:5173`
2. **Register**: Create a new account
3. **Login**: Sign in with your credentials
4. **Dashboard**: You should be redirected to `/dashboard`

## 🔧 Troubleshooting

### Login Not Working?
- Check if backend is running on port 5000
- Check browser console for errors
- Verify MongoDB is running
- Check if `.env` file exists in `server` directory

### Theme Issues?
- The theme system now detects your system preference
- Use the toggle switch in the navbar to switch themes
- Clear localStorage if theme gets stuck

### Footer Still Black?
- The footer now supports dark mode properly
- Try switching themes to see the difference

## 📱 Features Available

✅ **Authentication**: Register, Login, Logout  
✅ **Theme System**: Light/Dark mode with system detection  
✅ **Modern Navbar**: Glassmorphism design with gradients  
✅ **Favorites**: Save and manage favorite recipes  
✅ **Meal Planning**: Plan weekly meals  
✅ **Shopping Lists**: Create and manage shopping lists  
✅ **Responsive Design**: Works on all devices  

## 🎨 New Navbar Features

- **Glassmorphism Effect**: Semi-transparent with backdrop blur
- **Gradient Buttons**: Beautiful orange-to-yellow gradients
- **User Avatar**: Shows user's initial in a gradient circle
- **Hover Effects**: Smooth transitions and hover states
- **Mobile Optimized**: Beautiful mobile menu with backdrop blur

The app is now ready to use! Make sure both frontend and backend are running for full functionality.
