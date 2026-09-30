import recipeData from './recipes.json'

export const recipes = recipeData
export const recipeCategories = ['All', ...new Set(recipes.map((recipe) => recipe.category))]
export const recipeUrl = (slug) => `${import.meta.env.BASE_URL}recipes.html?recipe=${encodeURIComponent(slug)}`
