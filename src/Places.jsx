import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import CollectionFilters from './CollectionFilters.jsx'
import SiteIcon from './components/SiteIcon.jsx'
import { places, placesToConfirm } from './data/directory.js'
import './collection-refresh.css'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const items = places.map((place) => ({ ...place, category: place.type }))
const types = ['Vegan', 'Vegetarian', 'Vegan friendly']
const moods = [...new Set(places.flatMap((place) => place.moods))]

export default function Places() {
  const params = new URLSearchParams(window.location.search)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(() => types.includes(params.get('type')) ? [params.get('type')] : [])
  const [mood, setMood] = useState(() => moods.includes(params.get('mood')) ? params.get('mood') : '')
  const visible = useMemo(() => items.filter((place) => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    const text = `${place.name} ${place.area} ${place.address} ${place.detail} ${place.cuisines.join(' ')} ${place.moods.join(' ')}`.toLowerCase()
    return words.every((word) => text.includes(word)) && (!selected.length || selected.includes(place.type)) && (!mood || place.moods.includes(mood))
  }), [query, selected, mood])
  const clear = () => { setQuery(''); setSelected([]); setMood('') }
  const toggle = (type) => setSelected((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type])

  return <div className="browse-page places-page"><DirectoryLayout active="Places">
    <section className="places-page-banner"><div className="wrap"><h1>Find your kind<br />of table.</h1><p>Vegan kitchens, neighbourhood favourites and something sweet. Find a place that fits what you feel like.</p><img src={asset('community/shared-meal.jpg')} alt="Community members sharing a plant-based meal" /></div></section>
    <section className="browse-collection wrap" id="browse-places" aria-labelledby="places-list-title">
      <div className="browse-heading"><div><h2 id="places-list-title">Places to eat in Dubai</h2><p>Browse the directory. Check each venue’s current menu before you go.</p></div></div>
      <div className="browse-layout">
        <div className="places-sidebar"><CollectionFilters id="place" query={query} onQueryChange={setQuery} placeholder="Search places or cuisines…" categories={types} categoryLabel="Dining type" filtersLabel="Dining type" selected={selected} onToggle={toggle} onClear={() => setSelected([])} items={items} visibleCount={visible.length} noun="places" />
          <div className="places-mood"><label htmlFor="place-mood">What are you in the mood for?</label><select id="place-mood" value={mood} onChange={(event) => setMood(event.target.value)}><option value="">Anything</option>{moods.map((option) => <option key={option}>{option}</option>)}</select></div>
        </div>
        <div className="browse-results">{visible.length ? <div className="browse-grid places-photo-grid">{visible.map((place) => <article className="browse-card place-photo-card" key={place.name}>
          <a className="browse-card-photo" href={place.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${place.name}`}><img src={asset(place.image)} alt={place.imageAlt} loading="lazy" /></a>
          <div className="browse-card-copy"><h3><a href={place.url} target="_blank" rel="noopener noreferrer">{place.name}<SiteIcon name="arrow" size={23} /></a></h3><p className="place-card-location">{place.area} · {place.type}</p><p>{place.detail}</p><div className="place-card-actions"><a href={place.menuUrl} target="_blank" rel="noopener noreferrer">{place.menuLabel || 'View menu'}<SiteIcon name="arrow" size={16} /></a>{place.locationUrl && <a href={place.locationUrl} target="_blank" rel="noopener noreferrer">Location<SiteIcon name="arrow" size={16} /></a>}</div></div>
        </article>)}</div> : <div className="browse-empty"><p>No places match those filters.</p><button type="button" onClick={clear}>Show all places</button></div>}
        <p className="browse-note">“Vegetarian” and “vegan friendly” describe places with vegan options, not a fully vegan menu. Check ingredients and preparation with the venue.</p></div>
      </div>
    </section>
    <section className="place-suggestions wrap" aria-labelledby="suggestions-title"><h2 id="suggestions-title">Suggested by the community</h2><p>More places on our list. Their current vegan menus still need checking.</p><div className="suggestions-photo-grid">{placesToConfirm.map((place) => <a href={place.url} key={place.name} target="_blank" rel="noopener noreferrer" className="suggestion-photo-card">{place.image ? <img src={asset(place.image)} alt={place.imageAlt} loading="lazy" /> : <div className="suggestion-photo-pending">Photo to be confirmed</div>}<div><h3>{place.name}<SiteIcon name="arrow" size={18} /></h3><p>{place.note}</p></div></a>)}</div></section>
  </DirectoryLayout></div>
}
