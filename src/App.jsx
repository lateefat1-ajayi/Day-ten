import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import About from './pages/About';
import Favorites from './pages/Favorites';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with navbar */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
              </>
            } />
            
            {/* Auth routes without navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard routes with sidebar layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="recipes" element={<Recipes />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="meal-planner" element={<MealPlanner />} />
            <Route path="shopping-list" element={<ShoppingList />} />
              <Route path="profile" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Profile</h2><p>Manage your profile settings here.</p></div>} />
              <Route path="settings" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Settings</h2><p>Configure your preferences here.</p></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}