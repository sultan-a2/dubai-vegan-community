import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`
const guide = `${import.meta.env.BASE_URL}guides/vegan-dubai-starter-guide.pdf`

const places = [
  { name: 'Top Vegan by Dobraw', area: 'Jumeirah Lakes Towers', type: 'Vegan', note: 'A fully vegan menu in JLT.', url: 'https://topvegan.ae/' },
  { name: 'Planet Terra', area: 'The Greens', type: 'Vegan', note: 'Vegan café in The Greens.', url: 'https://planetterra.life/' },
  { name: 'Wild & The Moon', area: 'Alserkal Avenue', type: 'Vegan', note: 'Vegan café at Alserkal Avenue.', url: 'https://www.wildandthemoon.ae/our-locations/' },
  { name: 'Moreish', area: 'Mankhool', type: 'Vegan options', note: 'Ask about the vegan options before ordering.', url: 'https://www.google.com/maps/search/?api=1&query=Moreish+Mankhool+Dubai' }
]
const paths = [
  { label: 'Restaurants', detail: 'Find your next vegan meal out', href: '#restaurants', image: 'bowl.jpg', caption: 'Places to eat across Dubai' },
  { label: 'Recipes', detail: 'Make something good at home', href: '#recipes', image: 'greens.jpg', caption: 'Everyday meals, familiar ingredients' },
  { label: 'Events', detail: 'See where people are meeting', href: '#events', image: 'lunch.jpg', caption: 'A reason to come together' },
  { label: 'Guides', detail: 'Keep the vegan Dubai starter PDF', href: '#guides', caption: 'A guide to take with you' },
  { label: 'Community', detail: 'Read and share real experiences', href: '#community', image: 'picnic.jpg', caption: 'People make this place' },
  { label: 'Businesses', detail: 'Grow the local vegan scene', href: '#businesses', image: 'cafe.jpg', caption: 'For independent local businesses' }
]
function Arrow() { return <span aria-hidden="true">↗</span> }

function App() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [activePath, setActivePath] = useState(0)
  const visiblePlaces = useMemo(() => places.filter((place) =>
    (filter === 'All' || place.type === filter) &&
    `${place.name} ${place.area}`.toLowerCase().includes(search.toLowerCase().trim())
  ), [filter, search])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const images = document.querySelectorAll('[data-parallax]')
    let frame = 0
    const update = () => {
      frame = 0
      for (const image of images) {
        const rect = image.parentElement.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue
        const distance = rect.top + rect.height / 2 - window.innerHeight / 2
        image.style.transform = `translate3d(0, ${Math.max(-16, Math.min(16, distance * -0.035))}px, 0)`
      }
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header" id="top">
      <nav className="nav-left" aria-label="Explore"><a href="#restaurants">Restaurants</a><a href="#recipes">Recipes</a><a href="#events">Events</a></nav>
      <a className="brand" href="#top" aria-label="Dubai Vegan Community home"><img src={asset('logo-mark.png')} alt="" /><span>Dubai Vegan<br />Community</span></a>
      <nav className="nav-right" aria-label="Community"><a href="#guides">Guides</a><a href="#community">Community</a><a href="#businesses">Businesses</a></nav>
    </header>

    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <h1 id="hero-title">Your guide to vegan Dubai.</h1>
        <div className="hero-pair">
          <div className="hero-image image-frame"><img src={asset('picnic.jpg')} alt="People sharing food together outdoors" data-parallax /></div>
          <div className="hero-copy"><p>Find a vegan restaurant near you, make dinner from familiar ingredients, or see where local groups are meeting. You do not need to call yourself vegan to use this guide.</p><a className="inline-link" href="#explore">Explore the guide <Arrow /></a></div>
        </div>
      </section>

      <section className="explore shell" id="explore" aria-labelledby="explore-title">
        <div className="section-head"><h2 id="explore-title">Where would you like to begin?</h2><p>Find dinner tonight, or take your time with the recipes and guides.</p></div>
        <div className="explore-layout">
          <div className="explore-preview" aria-hidden="true">
            <div className="explore-preview-art" key={paths[activePath].label}>
              {paths[activePath].image
                ? <img src={asset(paths[activePath].image)} alt="" />
                : <div className="explore-paper"><span>Dubai Vegan Community</span><strong>Getting started with vegan Dubai</strong><span>Restaurants · shopping · everyday meals</span></div>}
            </div>
            <div className="explore-caption"><strong>{paths[activePath].label}</strong><span>{paths[activePath].caption}</span></div>
          </div>
          <div className="path-list">{paths.map((path, index) => <a className={`path ${activePath === index ? 'is-active' : ''}`} href={path.href} key={path.label} onMouseEnter={() => setActivePath(index)} onFocus={() => setActivePath(index)}><span>{path.label}</span><span>{path.detail}</span><Arrow /></a>)}</div>
        </div>
      </section>

      <section className="restaurants shell section-space" id="restaurants" aria-labelledby="restaurants-title">
        <div className="section-head"><h2 id="restaurants-title">Find a vegan place to eat</h2><p>A short starting list, with links to current menus and locations. Check details before visiting.</p></div>
        <div className="restaurant-layout">
          <div className="restaurant-photo image-frame"><img src={asset('bowl.jpg')} alt="A bowl of vegetables, chickpeas and avocado" data-parallax /></div>
          <div className="restaurant-content">
            <div className="directory-tools"><label className="search-label"><span className="sr-only">Search restaurants by name or area</span><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search by name or area" /></label><div className="filter-buttons" role="group" aria-label="Restaurant type">{['All', 'Vegan', 'Vegan options'].map((type) => <button type="button" key={type} className={filter === type ? 'selected' : ''} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type}</button>)}</div></div>
            <div className="venue-list">{visiblePlaces.length ? visiblePlaces.map((place) => <article className="venue" key={place.name}><div><h3>{place.name}</h3><p>{place.area} · {place.type}</p><small>{place.note}</small></div><a href={place.url} target="_blank" rel="noopener noreferrer" aria-label={`Check ${place.name} details`}><Arrow /></a></article>) : <p className="empty">No places match that search. Try another area or type.</p>}</div>
          </div>
        </div>
      </section>

      <section className="recipes-band" id="recipes" aria-labelledby="recipes-title"><div className="shell recipes-layout"><div className="recipe-intro"><h2 id="recipes-title">Cook something vegan tonight</h2><p>Start with meals that use familiar ingredients. These recipes need no specialist products.</p><div className="recipe-image image-frame"><img src={asset('greens.jpg')} alt="Fresh vegetables prepared for a meal" data-parallax /></div></div><div className="recipe-list"><details><summary><span>Tomato and lentil pot</span><span aria-hidden="true">+</span></summary><div className="recipe-body"><p><strong>You need</strong> red lentils, onion, garlic, canned tomatoes, cumin, vegetable stock and lemon.</p><p><strong>Make it</strong> Soften the onion and garlic. Add cumin, lentils, tomatoes and stock. Simmer until the lentils are soft, then finish with lemon. Serve with rice or bread.</p></div></details><details><summary><span>Chickpea and tahini bowl</span><span aria-hidden="true">+</span></summary><div className="recipe-body"><p><strong>You need</strong> cooked chickpeas, cucumber, tomatoes, greens, tahini, lemon and rice.</p><p><strong>Make it</strong> Put warm rice and chickpeas in a bowl. Add chopped vegetables. Thin the tahini with lemon and water, then spoon it over the top.</p></div></details><p className="recipe-note">Check packaged ingredients if you avoid dairy, eggs or honey.</p></div></div></section>

      <section className="events shell section-space" id="events" aria-labelledby="events-title"><div className="section-head"><h2 id="events-title">Meet vegans in Dubai</h2><p>Browse current meetups while we prepare our own event calendar.</p></div><div className="events-layout"><div className="events-photo image-frame"><img src={asset('cafe.jpg')} alt="Friends bringing drinks together over a table" data-parallax /></div><div className="events-copy"><p>We will share Dubai Vegan Community events here once dates, venues and hosts are confirmed. Until then, these live searches are the quickest way to see what is happening nearby.</p><a className="rule-link" href="https://www.eventbrite.com/d/united-arab-emirates--dubai/vegan/" target="_blank" rel="noopener noreferrer">Vegan events on Eventbrite <Arrow /></a><a className="rule-link" href="https://www.meetup.com/find/?keywords=vegan&location=ae--Dubai" target="_blank" rel="noopener noreferrer">Vegan groups on Meetup <Arrow /></a></div></div></section>

      <section className="guides-band" id="guides" aria-labelledby="guides-title"><div className="shell guides-layout"><div><h2 id="guides-title">A vegan guide you can keep</h2><p>Our starter PDF covers eating out, shopping, simple meals and questions to ask when a menu is unclear. Save it for later or send it to a friend.</p><a className="solid-link" href={guide} download>Download the vegan Dubai starter guide ↓</a></div><div className="guide-preview" aria-hidden="true"><div className="guide-preview-inner"><span>Dubai Vegan Community</span><strong>Getting started<br />with vegan<br />Dubai</strong><span>Restaurants · shopping · everyday meals</span></div></div></div></section>

      <section className="community shell section-space" id="community" aria-labelledby="community-title"><div className="section-head"><h2 id="community-title">Vegan stories, in your own words</h2><p>Soon you will be able to share restaurant reviews, meal photos and your own story. We will ask permission before publishing any contribution.</p></div><div className="community-layout"><div className="community-image image-frame"><img src={asset('lunch.jpg')} alt="People sitting together at an outdoor meal" data-parallax /></div><div className="community-copy"><h3>Why did you go vegan?</h3><p>There is no single answer. We want to hear about the meals, decisions and people that shaped your journey, in your own words.</p><p>Restaurant reviews and meal photos are planned too. Submissions will be reviewed before they appear on the site.</p></div></div></section>

      <section className="business shell" id="businesses" aria-labelledby="business-title"><div><h2 id="business-title">For vegan and vegan-friendly businesses</h2><p>We want this guide to help people discover local restaurants and emerging vegan businesses. Listing applications and collaboration enquiries are opening soon.</p></div><div className="business-aside"><p>When applications open, bring your business name, location, menu or product, vegan details and contact information. Listings will be checked before publication.</p></div></section>
    </main>

    <footer className="footer"><div className="shell footer-inner"><a className="footer-brand" href="#top">Dubai Vegan<br />Community</a><nav aria-label="Footer navigation"><a href="#restaurants">Restaurants</a><a href="#recipes">Recipes</a><a href="#events">Events</a><a href="#guides">Guides</a><a href="#community">Community</a><a href={import.meta.env.BASE_URL}>Original site</a></nav><p>A guide for vegans and the vegan-curious in Dubai. Venue information can change; check directly before visiting.</p></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
