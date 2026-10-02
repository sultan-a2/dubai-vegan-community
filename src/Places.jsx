import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import './collection.css'
import { RevealFrame } from './components/EditorialMotion.jsx'
import { places, placesToConfirm } from './data/directory.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name

function FilterGroup({ label, options, value, onChange }) {
  return <div className="directory-filter-group" role="group" aria-label={label}><span>{label}</span><div>{options.map((option) => <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}</div></div>
}

export default function Places() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const visible = useMemo(() => places.filter((place) => {
    const matches = `${place.name} ${place.area} ${place.address} ${place.detail} ${place.cuisines.join(' ')} ${place.moods.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())
    return matches && (type === 'All' || place.type === type)
  }), [query, type])

  return <DirectoryLayout active="Places">
    <section className="directory-hero places-directory-hero wrap"><div><h1>Find your<br />kind of table.</h1><p>Fully vegan kitchens, vegetarian favourites and places that make room for plant based choices. Start with the food you feel like.</p><ArrowLink href="#browse-places">Explore the places</ArrowLink></div><RevealFrame className="directory-hero-photo"><img src={asset('community/shared-meal.jpg')} alt="Community members sharing a plant-based meal" /></RevealFrame></section>
    <section className="directory-collection wrap" id="browse-places" aria-labelledby="places-list-title"><div className="directory-collection-head"><h2 id="places-list-title">Around Dubai.</h2><p>A small, growing guide. Choose what matters to you and ask about any dish that is not clearly labelled vegan.</p></div><div className="places-directory-tools"><div className="directory-search"><label htmlFor="place-search">Find a place or cuisine</label><input id="place-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Indian, Jumeirah, comfort food…" /></div>
      <div className="directory-filters"><FilterGroup label="Dining type" options={['All', 'Vegan', 'Vegetarian', 'Vegan friendly']} value={type} onChange={setType} /></div></div>
      <p className="directory-result-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'place' : 'places'} to explore</p>
      {visible.length ? <div className="places-directory-grid">{visible.map((place) => <article key={place.name} className="places-directory-card">{place.image && <img className="places-directory-card-image" src={asset(place.image)} alt={place.imageAlt} loading="lazy" />}<span className="directory-card-meta">{place.area} · {place.type}</span><h3>{place.name}</h3><p>{place.detail}</p><p className="places-directory-address">{place.address}</p><div className="places-directory-actions"><a href={place.menuUrl} target="_blank" rel="noopener noreferrer">{place.menuLabel || 'View menu'} <span aria-hidden="true">↗</span></a>{place.locationUrl && <a href={place.locationUrl} target="_blank" rel="noopener noreferrer">Find location <span aria-hidden="true">↗</span></a>}</div></article>)}</div> : <div className="directory-empty"><p>Nothing in this starter list matches that search or dining type.</p><button type="button" onClick={() => { setQuery(''); setType('All') }}>Show all places</button></div>}
      <p className="directory-disclaimer">Menus and locations can change. “Vegetarian” and “vegan friendly” do not mean the entire menu is vegan. Check ingredients and preparation with the venue.</p>
    </section>
    <section className="collection-link-section wrap" aria-labelledby="suggestions-title"><h2 id="suggestions-title">Community suggestions to check</h2><p>These came from the community list. Their current vegan options still need confirmation.</p><div className="collection-link-list">{placesToConfirm.map((place) => <a key={place.name} href={place.url} target="_blank" rel="noopener noreferrer"><span>{place.name}<small>{place.note}</small></span><span aria-hidden="true">↗</span></a>)}</div></section>
  </DirectoryLayout>
}
