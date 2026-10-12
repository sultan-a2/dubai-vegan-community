import recipeData from './recipes.json'

export const recipes = recipeData
export const recipeCategories = ['Starters', 'Mains', 'Desserts', 'Baking']
export const recipeUrl = (slug) => `${import.meta.env.BASE_URL}recipes.html?recipe=${encodeURIComponent(slug)}`
