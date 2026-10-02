import { useEffect, useMemo, useState } from 'react'
import { GradientWaveText } from './components/MotionBits.jsx'
import ImpactQuiz from './components/ImpactQuiz.tsx'
import ImpactStrip from './components/ImpactStrip.tsx'
import { PlantCursor, RevealFrame } from './components/EditorialMotion.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SubmissionPanel from './components/SubmissionPanel.jsx'
import { recipes, recipeUrl } from './data/recipes.js'
import { places, homepagePlaces, products, promotions } from './data/directory.js'
import { events } from './data/events.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name

const searchItems = [
  ...places.map((place) => ({ title: place.name, label: 'Place', detail: `${place.area} · ${place.type} · ${place.cuisines.join(', ')}`, href: place.url, external: true, searchable: `${place.name} ${place.area} ${place.type} ${place.moods.join(' ')} ${place.cuisines.join(' ')} ${place.detail} food restaurant` })),
  ...products.map((product) => ({ title: `${product.brand} ${product.name}`, label: 'Product', detail: product.detail, href: product.url, external: true, searchable: `${product.brand} ${product.name} ${product.detail} product vegan` })),
  ...promotions.map((promotion) => ({ title: promotion.title, label: 'Sample offer', detail: promotion.offer, href: `${import.meta.env.BASE_URL}offers.html?search=${encodeURIComponent(promotion.title)}`, external: false, searchable: `${promotion.title} ${promotion.search} promotion offer promo code` })),
]
export default function App() {
  useEffect(() => {
    // Vite mounts the anchor target after the browser's initial hash jump.
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])
  const [search, setSearch] = useState('')
  const searchResults = useMemo(() => {
    const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return words.length ? searchItems.filter((item) => words.every((word) => item.searchable.toLowerCase().includes(word))) : []
  }, [search])
  return <>
    <PlantCursor />
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" aria-hidden="true" />
    <SiteHeader />

    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-composition"><div className="hero-copy"><h1 id="hero-title">Your guide to vegan Dubai.</h1><p>Find places to eat, events to attend, recipes to make, and products sold in the UAE.</p><ArrowLink href="#explore">Explore the site</ArrowLink></div><div className="hero-photo"><img src={asset('community/kind-wide.jpg')} alt="Dubai Vegan Community members gathered indoors" fetchPriority="high" /></div></div>
      </section>

      <section className="intro-band" id="explore"><div className="wrap"><div className="intro-grid"><div className="intro-content"><h2>Find your way in.</h2><p>Whatever brought you here, there’s a good place to start.</p><nav className="explore-shortcuts" aria-label="Explore the site"><a href={`${import.meta.env.BASE_URL}places.html`}><img src={asset(places[0].image)} alt="" loading="lazy" /><span><strong>Places</strong><small>Eat out in Dubai</small></span><span aria-hidden="true">↗</span></a><a href={`${import.meta.env.BASE_URL}events.html`}><img src={asset('community/gathering-hall.jpg')} alt="" loading="lazy" /><span><strong>Events</strong><small>Find dates and locations</small></span><span aria-hidden="true">↗</span></a><a href={`${import.meta.env.BASE_URL}recipes.html`}><img src={asset(recipes[0].image)} alt="" loading="lazy" /><span><strong>Recipes</strong><small>Cook something good</small></span><span aria-hidden="true">↗</span></a><a href={`${import.meta.env.BASE_URL}products.html`}><img src={asset(products[0].image)} alt="" loading="lazy" /><span><strong>Products</strong><small>Find it in the UAE</small></span><span aria-hidden="true">↗</span></a></nav></div><RevealFrame className="intro-photo"><img src={asset('community/kind-group.jpg')} alt="Dubai Vegan Community members together at a gathering" loading="lazy" /><span className="intro-photo-words"><GradientWaveText>Come as you are.</GradientWaveText></span></RevealFrame></div>
        <div className="community-search"><label htmlFor="community-search">Looking for something specific?</label><div className="community-search-body"><div className="search-field"><input id="community-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try Indian food or oat drink…" autoComplete="off" /></div><div className="search-suggestions" aria-label="Suggested searches">{['Indian food', 'Oat drink', 'Yoga teacher'].map((term) => <button type="button" key={term} onClick={() => setSearch(term)}>{term}</button>)}</div></div>
          {search.trim() && <div className="search-results" aria-live="polite"><p>{searchResults.length ? `${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for “${search.trim()}”` : `Nothing matched “${search.trim()}” yet. Try a broader term.`}</p>{searchResults.map((item) => <a key={item.label + item.title} href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span>{item.label}</span><strong>{item.title}</strong><small>{item.detail}</small></a>)}</div>}</div>
      </div></section>

      <section className="places-showcase" id="places" aria-labelledby="places-title"><div className="wrap"><div className="places-showcase-head"><h2 id="places-title">A good place<br />to begin is<br />around a table.</h2><p>From fully vegan kitchens to familiar places with thoughtful options. Find somewhere that fits tonight.</p></div><div className="places-showcase-body"><RevealFrame className="places-showcase-photo"><img src={asset(places[0].image)} alt={places[0].imageAlt} loading="lazy" /><span className="place-photo-words"><GradientWaveText>Find your table.</GradientWaveText></span></RevealFrame><div className="places-showcase-list">{homepagePlaces.map((place) => <a href={place.url} target="_blank" rel="noopener noreferrer" key={place.name} className={place.image ? undefined : "place-without-photo"}>{place.image && <img src={asset(place.image)} alt="" loading="lazy" />}<span>{place.area} · {place.type}</span><strong>{place.name}</strong><small>{place.detail}</small></a>)}</div></div><div className="places-showcase-bottom"><p>Menus change. Check a place’s current vegan options before visiting.</p><ArrowLink href={`${import.meta.env.BASE_URL}places.html`}>Explore all places</ArrowLink></div></div></section>

      <section className="recipe-section recipe-teaser" id="recipes" aria-labelledby="recipes-title"><div className="wrap"><div className="recipe-teaser-head"><div><h2 id="recipes-title">Good things<br />start at home.</h2><p>Simple meals for ordinary days. Open the recipe book when you want to make something.</p></div><ArrowLink href={`${import.meta.env.BASE_URL}recipes.html`}>Browse all recipes</ArrowLink></div><div className="recipe-teaser-grid">{recipes.slice(0, 3).map((item) => <RevealFrame className="recipe-teaser-card" key={item.slug}><a href={recipeUrl(item.slug)}><img loading="lazy" src={asset(item.image)} alt={item.imageAlt} /><h3>{item.name}</h3><p>{item.summary}</p><span>{item.total} total · {item.category}</span></a></RevealFrame>)}</div></div></section>

      <section className="products-showcase" id="products" aria-labelledby="products-title"><div className="wrap"><div className="products-showcase-head"><div><h2 id="products-title">Vegan products in the UAE</h2><p>Find plant-based groceries listed by UAE retailers, from oat drinks and yoghurt to easy dinners.</p></div><RevealFrame className="products-showcase-image"><img src={asset('community/shared-meal.jpg')} alt="A shared plant-based meal with community members" loading="lazy" /></RevealFrame></div><div className="products-showcase-grid">{products.slice(0, 3).map((product) => <a href={product.url} target="_blank" rel="noopener noreferrer" key={product.url}><span className="product-photo"><img src={asset(product.image)} alt="" loading="lazy" /></span><span className="product-card-copy"><span>{product.brand}</span><strong>{product.name}</strong><small>{product.detail} · Listed at {product.retailer}</small></span></a>)}</div><div className="products-showcase-bottom"><p>Stock and ingredients can change. Check the retailer’s current listing.</p><ArrowLink href={`${import.meta.env.BASE_URL}products.html`}>Browse all products</ArrowLink></div></div></section>

      <section className="events-section" id="events" aria-labelledby="events-title"><div className="wrap"><div className="events-compact"><div className="events-intro"><h2 id="events-title">Events in Dubai</h2><p>Markets and expos with vegan or plant-based options. See the dates, locations and how to attend.</p><ArrowLink href={`${import.meta.env.BASE_URL}events.html`}>View all events</ArrowLink></div><div className="event-list">{events.map((event) => <a className="event-spotlight" href={`${import.meta.env.BASE_URL}events.html#${event.id}`} key={event.id}><span className="event-date">{event.day} {event.month.slice(0, 3)} <small>2026</small></span><span><strong>{event.title}</strong><small>{event.venue}</small><small>{event.note}</small></span><span aria-hidden="true">→</span></a>)}</div></div></div></section>

      <section className="living-section" id="begin" aria-labelledby="begin-title"><div className="wrap living-home"><div className="living-home-copy"><h2 id="begin-title">Living vegan,<br />your way.</h2><p>Food, labels, eating out and the questions that come after. Take what helps.</p><ArrowLink href={`${import.meta.env.BASE_URL}guide.html`}>Explore the guide</ArrowLink></div><a href={`${import.meta.env.BASE_URL}guide.html`} className="living-banner"><img src={asset('community/cafe-room.jpg')} alt="Community members enjoying a meal together" loading="lazy" /><span className="living-banner-words"><GradientWaveText>Good questions deserve useful answers.</GradientWaveText></span></a></div></section>

      <section className="impact-section" id="impact" aria-label="Vegan impact estimates"><ImpactStrip /><ImpactQuiz /></section>

      <div id="join"><SubmissionPanel kind="Community" /></div>
    </main>
    <SiteFooter />
  </>
}
