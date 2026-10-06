import { useMemo, useState } from 'react'
import { PlantCursor } from './components/EditorialMotion.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SubmissionPanel from './components/SubmissionPanel.jsx'
import { recipes, recipeCategories, recipeUrl } from './data/recipes.js'
import CollectionFilters from './CollectionFilters.jsx'
import './collection-refresh.css'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
function RecipeIndex() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState([])
  const toggleCategory = (category) => setCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])
  const filtered = useMemo(() => recipes.filter((recipe) => (!categories.length || categories.includes(recipe.category)) && `${recipe.name} ${recipe.summary} ${recipe.ingredients.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())), [query, categories])
  return <>
    <section className="browse-collection wrap" id="browse-recipes" aria-labelledby="browse-title">
      <div className="browse-heading"><div><h1 id="browse-title">Recipes</h1><p>Plant-based things to make, bake and share.</p></div><a className="browse-contribute" href="#submit">Share a recipe <span aria-hidden="true">↗</span></a></div>
      <div className="browse-layout">
        <CollectionFilters id="recipe" query={query} onQueryChange={setQuery} placeholder="Search recipes or ingredients…" categories={recipeCategories} selected={categories} onToggle={toggleCategory} onClear={() => setCategories([])} items={recipes} visibleCount={filtered.length} noun="recipes" />
        <div className="browse-results">
          {filtered.length ? <div className="browse-grid">{filtered.map((recipe) => <article className="browse-card" key={recipe.slug}><a className="browse-card-link" href={recipeUrl(recipe.slug)}><div className="browse-card-photo"><img loading="lazy" src={asset(recipe.image)} alt="" /></div><div className="browse-card-copy"><h2>{recipe.name} <span aria-hidden="true">↗</span></h2><p>{recipe.summary}</p><small>{recipe.total} total (estimate) · {recipe.category}</small></div></a><a className="browse-card-pdf" href={`${import.meta.env.BASE_URL}recipes/${recipe.slug}.pdf`} download>Download PDF <span aria-hidden="true">↓</span></a></article>)}</div> : <div className="browse-empty"><p>No recipes match that search.</p><button type="button" onClick={() => { setQuery(''); setCategories([]) }}>Show all recipes</button></div>}
        </div>
      </div>
    </section>
    <SubmissionPanel kind="Recipe" />
  </>
}
function RecipeDetail({ recipe }) {
  const others = recipes.filter((item) => item.slug !== recipe.slug).slice(0, 2)
  return <article className="recipe-detail wrap">
    <nav className="recipe-breadcrumb" aria-label="Breadcrumb"><a href={`${import.meta.env.BASE_URL}recipes.html`}>All recipes</a><span aria-hidden="true">/</span><span>{recipe.name}</span></nav>
    <div className="recipe-detail-heading"><div><h1>{recipe.name}</h1><p>{recipe.summary}</p></div><div className="recipe-detail-meta"><span>Prep {recipe.prep}</span><span>{recipe.time}</span><span>Total {recipe.total}</span><span>Makes {recipe.yield}</span><small>Prep, total and portions are estimates.</small><a href={`${import.meta.env.BASE_URL}recipes/${recipe.slug}.pdf`} download>Download PDF ↓</a></div></div>
    <div className="recipe-detail-main">
      <div className="recipe-detail-photo"><img src={asset(recipe.image)} alt={recipe.imageAlt} /></div>
      <div className="recipe-sheet">
        <section className="recipe-ingredients" aria-labelledby="ingredients-title"><h2 id="ingredients-title">Ingredients</h2><ul>{recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>{recipe.note && <div className="recipe-source-note"><h3>Before you start</h3><p>{recipe.note}</p></div>}</section>
        <section className="recipe-method" aria-labelledby="method-title"><h2 id="method-title">Directions</h2><div>{recipe.method.map((step) => <p key={step}>{step}</p>)}</div></section>
      </div>
    </div>
    <div className="recipe-more"><h2>Make next.</h2><div>{others.map((item) => <a key={item.slug} href={`${recipeUrl(item.slug)}`}><img src={asset(item.image)} alt="" loading="lazy" /><span>{item.name}</span><span aria-hidden="true">→</span></a>)}</div></div>
  </article>
}

export default function Recipes() {
  const slug = new URLSearchParams(window.location.search).get('recipe')
  const recipe = slug ? recipes.find((item) => item.slug === slug) : null
  return <div className="recipes-page"><PlantCursor /><a className="skip-link" href="#main">Skip to content</a><div id="top" aria-hidden="true" /><SiteHeader active="Recipes" /><main id="main">{slug ? recipe ? <RecipeDetail recipe={recipe} /> : <div className="recipe-missing wrap"><h1>That recipe is not here.</h1><a href={`${import.meta.env.BASE_URL}recipes.html`}>Browse the recipe book</a></div> : <RecipeIndex />}</main><SiteFooter /></div>
}
