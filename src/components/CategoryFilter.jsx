import { useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api';


export default function CategoryFilter({ onSelectCategory, value }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    load();
  }, []);

  return (
    <div className="mb-6 relative z-10">
      <label className="block mb-2 text-lg font-medium">Filter by Category</label>
      <select
        value={value}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="w-64 px-3 py-2 border mr-10  border-amber-500 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-amber-600"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
