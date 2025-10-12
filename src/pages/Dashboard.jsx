export default function Dashboard() {
  const stats = [
    { name: 'Total Recipes', value: '247', change: '+12%', changeType: 'positive' },
    { name: 'Favorites', value: '89', change: '+8%', changeType: 'positive' },
    { name: 'Meals Planned', value: '156', change: '+23%', changeType: 'positive' },
    { name: 'Shopping Lists', value: '34', change: '-2%', changeType: 'negative' }
  ];

  const recentRecipes = [
    { name: 'Chicken Tikka Masala', category: 'Indian', time: '45 min', difficulty: 'Medium' },
    { name: 'Spaghetti Carbonara', category: 'Italian', time: '30 min', difficulty: 'Easy' },
    { name: 'Beef Stir Fry', category: 'Asian', time: '25 min', difficulty: 'Easy' },
    { name: 'Chocolate Cake', category: 'Dessert', time: '60 min', difficulty: 'Hard' }
  ];

  const quickActions = [
    { name: 'Add Recipe', icon: '➕', color: 'bg-orange-500' },
    { name: 'Plan Meal', icon: '📅', color: 'bg-yellow-500' },
    { name: 'Shopping List', icon: '🛒', color: 'bg-red-500' },
    { name: 'Browse Recipes', icon: '🔍', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Lateefat! 👋</h2>
        <p className="text-orange-100">Ready to discover some amazing recipes today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.name}
              className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm font-medium">{action.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Recipes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Recipes</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            View all
          </button>
        </div>
        <div className="space-y-3">
          {recentRecipes.map((recipe, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                <p className="text-sm text-gray-500">{recipe.category} • {recipe.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Meal Plan Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">This Week's Meal Plan</h3>
          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            Edit plan
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">{day}</div>
              <div className="bg-orange-50 rounded-lg p-2 text-xs text-orange-700">
                {index % 3 === 0 ? 'Pasta' : index % 3 === 1 ? 'Salad' : 'Soup'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
