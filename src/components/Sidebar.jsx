import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Browse Recipes', path: '/dashboard/recipes', icon: '🍳' },
    { name: 'Favorites', path: '/dashboard/favorites', icon: '❤️' },
    { name: 'Meal Planner', path: '/dashboard/meal-planner', icon: '📅' },
    { name: 'Shopping List', path: '/dashboard/shopping-list', icon: '🛒' },
    { name: 'Profile', path: '/dashboard/profile', icon: '👤' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-56 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 h-20 flex items-center">
            <Link to="/" className="text-lg font-bold text-orange-800">
              Dishcovery
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(item.path) 
                    ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className="mr-2 text-base">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* User section */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-orange-600">L</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">Lateefat</p>
                <p className="text-xs text-gray-500 truncate">lateefat@example.com</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                // Simulate sign out - in real app this would clear auth state
                alert('Signing out...');
                window.location.href = '/';
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
