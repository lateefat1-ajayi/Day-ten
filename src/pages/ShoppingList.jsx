import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../utils/api';

export default function ShoppingList() {
  const { isAuthenticated } = useAuth();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListItems, setNewListItems] = useState([{ name: '', quantity: '' }]);

  useEffect(() => {
    if (isAuthenticated) {
      loadShoppingLists();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadShoppingLists = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getShoppingLists();
      setShoppingLists(data);
    } catch (err) {
      setError('Failed to load shopping lists');
      console.error('Error loading shopping lists:', err);
    } finally {
      setLoading(false);
    }
  };

  const createShoppingList = async () => {
    try {
      const items = newListItems.filter(item => item.name.trim() !== '');
      if (items.length === 0) {
        alert('Please add at least one item');
        return;
      }

      await userAPI.createShoppingList({
        name: newListName,
        items: items
      });

      setNewListName('');
      setNewListItems([{ name: '', quantity: '' }]);
      setShowCreateModal(false);
      loadShoppingLists();
    } catch (err) {
      console.error('Error creating shopping list:', err);
    }
  };

  const toggleItemChecked = async (listId, itemId, checked) => {
    try {
      await userAPI.updateShoppingListItem(listId, itemId, checked);
      loadShoppingLists(); // Reload to get updated state
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const addNewItem = () => {
    setNewListItems([...newListItems, { name: '', quantity: '' }]);
  };

  const updateNewItem = (index, field, value) => {
    const updated = [...newListItems];
    updated[index][field] = value;
    setNewListItems(updated);
  };

  const removeNewItem = (index) => {
    if (newListItems.length > 1) {
      setNewListItems(newListItems.filter((_, i) => i !== index));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Please sign in to access shopping lists
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in to manage your shopping lists.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Shopping Lists
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your grocery shopping with custom lists
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>New List</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Shopping Lists */}
        {shoppingLists.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No shopping lists yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first shopping list to get started!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
            >
              Create Shopping List
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {shoppingLists.map((list) => (
              <div key={list._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {list.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(list.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {list.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) => toggleItemChecked(list._id, item._id, e.target.checked)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <div className="flex-1">
                          <span className={`text-gray-900 dark:text-gray-100 ${item.checked ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                            {item.name}
                          </span>
                          {item.quantity && (
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                              ({item.quantity})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create List Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Create Shopping List
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    List Name
                  </label>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter list name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Items
                  </label>
                  <div className="space-y-2">
                    {newListItems.map((item, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateNewItem(index, 'name', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Item name"
                        />
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => updateNewItem(index, 'quantity', e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Qty"
                        />
                        {newListItems.length > 1 && (
                          <button
                            onClick={() => removeNewItem(index)}
                            className="px-2 py-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addNewItem}
                    className="mt-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createShoppingList}
                    className="px-4 py-2 bg-orange-600 dark:bg-orange-500 text-white rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
                  >
                    Create List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
