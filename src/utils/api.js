
export async function fetchRecipes(query) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}


export async function fetchCategories() {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
  const data = await res.json();
  return data.meals || [];
}


export async function fetchByCategory(category) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
}
