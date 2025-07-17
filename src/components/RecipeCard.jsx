export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-amber-600">{recipe.strMeal}</h3>
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Watch Tutorial
        </a>
      </div>
    </div>
  );
}
