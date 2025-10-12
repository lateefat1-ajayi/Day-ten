import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import About from './pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
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
          <Route path="favorites" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Favorites</h2><p>Your favorite recipes will appear here.</p></div>} />
          <Route path="meal-planner" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Meal Planner</h2><p>Plan your weekly meals here.</p></div>} />
          <Route path="shopping-list" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Shopping List</h2><p>Your shopping lists will appear here.</p></div>} />
          <Route path="profile" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Profile</h2><p>Manage your profile settings here.</p></div>} />
          <Route path="settings" element={<div className="p-6"><h2 className="text-2xl font-bold mb-4">Settings</h2><p>Configure your preferences here.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
