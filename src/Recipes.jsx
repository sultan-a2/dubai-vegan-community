import { useMemo, useState } from 'react'
import { PlantCursor } from './components/EditorialMotion.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { recipes, recipeCategories, recipeUrl } from './data/recipes.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const styles = [['editorial', 'Editorial'], ['notes', 'Kitchen notes'], ['shelf', 'Photo shelf']]

function styleFromUrl() {
  const value = new URLSearchParams(window.location.search).get('style')
  return styles.some(([key]) => key === value) ? value : 'editorial'
}

function StylePicker({ value, onChange }) {
  return <div className="recipe-style-picker wrap"><span>Page style</span><div role="group" aria-label="Choose recipe page style">{styles.map(([key, label]) => <button key={key} type="button" aria-pressed={value === key} onClick={() => onChange(key)}>{label}</button>)}</div></div>
}

function RecipeIndex({ style }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => recipes.filter((recipe) => (category === 'All' || recipe.category === category) && `${recipe.name} ${recipe.summary} ${recipe.ingredients.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category])
  return <>
    <section className="recipe-library-hero wrap"><div><h1>Recipes worth<br />making again.</h1><p>Four dishes from our community recipe book, from a warm crumble to Taline’s Armenian itch.</p><a className="recipe-hero-link" href="#browse-recipes">Browse the recipes ↓</a></div><div className="recipe-library-photo"><img src={asset('recipes/blueberry-crumble.jpg')} alt="Blueberry crumble ready to serve" /></div></section>
    <section className="recipe-library wrap" id="browse-recipes" aria-labelledby="browse-title"><div className="recipe-library-heading"><h2 id="browse-title">The recipe book.</h2><p>Find a dish, then open it for ingredients, directions and a PDF to keep.</p></div><div className="recipe-library-tools"><label>Search recipes<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try banana, tomato, bulgur…" /></label><div className="recipe-category-list" role="group" aria-label="Filter recipes by category">{recipeCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div><p className="recipe-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'recipe' : 'recipes'}</p>
      {filtered.length ? <div className="recipe-gallery">{filtered.map((recipe) => <article className="recipe-gallery-cell" key={recipe.slug}><a href={`${recipeUrl(recipe.slug)}&style=${style}`}><div className="recipe-card-visual"><img loading="lazy" src={asset(recipe.image)} alt="" /></div><div className="recipe-card-copy"><h3>{recipe.name}</h3><p>{recipe.summary}</p><span>{recipe.total} total · {recipe.category}</span></div></a><a className="recipe-card-pdf" href={`${import.meta.env.BASE_URL}recipes/${recipe.slug}.pdf`} download>Download PDF ↓</a></article>)}</div> : <div className="recipe-empty"><p>No recipes match that search.</p><button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Show all recipes</button></div>}
    </section>
  </>
}

function RecipeDetail({ recipe, style }) {
  const others = recipes.filter((item) => item.slug !== recipe.slug).slice(0, 2)
  return <article className="recipe-detail wrap">
    <nav className="recipe-breadcrumb" aria-label="Breadcrumb"><a href={`${import.meta.env.BASE_URL}recipes.html?style=${style}`}>All recipes</a><span aria-hidden="true">/</span><span>{recipe.name}</span></nav>
    <div className="recipe-detail-heading"><div><h1>{recipe.name}</h1><p>{recipe.summary}</p></div><div className="recipe-detail-meta"><span>Prep {recipe.prep}</span><span>{recipe.time}</span><span>Total {recipe.total}</span><span>Makes {recipe.yield}</span><small>Prep, total and portions are estimates.</small><a href={`${import.meta.env.BASE_URL}recipes/${recipe.slug}.pdf`} download>Download PDF ↓</a></div></div>
    <div className="recipe-detail-main">
      <div className="recipe-detail-photo"><img src={asset(recipe.image)} alt={recipe.imageAlt} /></div>
      <div className="recipe-sheet">
        <section className="recipe-ingredients" aria-labelledby="ingredients-title"><h2 id="ingredients-title">Ingredients</h2><ul>{recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>{recipe.note && <div className="recipe-source-note"><h3>Before you start</h3><p>{recipe.note}</p></div>}</section>
        <section className="recipe-method" aria-labelledby="method-title"><h2 id="method-title">Directions</h2><div>{recipe.method.map((step) => <p key={step}>{step}</p>)}</div></section>
      </div>
    </div>
    <div className="recipe-more"><h2>Make next.</h2><div>{others.map((item) => <a key={item.slug} href={`${recipeUrl(item.slug)}&style=${style}`}><img src={asset(item.image)} alt="" loading="lazy" /><span>{item.name}</span><span aria-hidden="true">→</span></a>)}</div></div>
  </article>
}

export default function Recipes() {
  const [style, setStyle] = useState(styleFromUrl)
  const slug = new URLSearchParams(window.location.search).get('recipe')
  const recipe = slug ? recipes.find((item) => item.slug === slug) : null
  const changeStyle = (next) => {
    setStyle(next)
    const url = new URL(window.location.href)
    url.searchParams.set('style', next)
    window.history.replaceState(null, '', url)
  }
  return <div className={`recipes-page recipe-style-${style}`}><PlantCursor /><a className="skip-link" href="#main">Skip to content</a><div id="top" aria-hidden="true" /><SiteHeader active="Recipes" /><StylePicker value={style} onChange={changeStyle} /><main id="main">{slug ? recipe ? <RecipeDetail recipe={recipe} style={style} /> : <div className="recipe-missing wrap"><h1>That recipe is not here.</h1><a href={`${import.meta.env.BASE_URL}recipes.html`}>Browse the recipe book</a></div> : <RecipeIndex style={style} />}</main><SiteFooter /></div>
}
