import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import { CopyButton } from './components/MotionBits.jsx'
import { promotions } from './data/directory.js'

export default function Offers() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('search') || '')
  const [revealed, setRevealed] = useState(null)
  const visible = useMemo(() => promotions.filter((offer) => `${offer.title} ${offer.search} ${offer.offer}`.toLowerCase().includes(query.trim().toLowerCase())), [query])
  return <DirectoryLayout active="Offers">
    <section className="offers-directory-hero wrap"><div><h1>Good things,<br />worth sharing.</h1><p>A future home for community partner offers across food, movement and everyday vegan life.</p></div><p>These are design examples while we confirm partners. The sample codes below are inactive.</p></section>
    <section className="directory-collection wrap" aria-labelledby="offers-list-title"><div className="directory-collection-head"><h2 id="offers-list-title">The offers space.</h2><p>Search for a class, a trainer or a product. Real offers will carry confirmed terms and dates.</p></div><div className="directory-search"><label htmlFor="offer-search">Search offers</label><input id="offer-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try yoga, protein powder, fitness…" /></div><p className="directory-result-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'example' : 'examples'}</p>
      {visible.length ? <div className="offers-directory-list">{visible.map((offer) => <article key={offer.id}><div><span>{offer.title}</span><h3>{offer.offer}</h3><p>{offer.partner}</p></div><div className="offers-directory-action"><button type="button" aria-expanded={revealed === offer.id} onClick={() => setRevealed(revealed === offer.id ? null : offer.id)}>{revealed === offer.id ? offer.code : 'Show example code'}</button>{revealed === offer.id && <CopyButton value={offer.code} />}<small>{offer.terms}</small></div></article>)}</div> : <div className="directory-empty"><p>No example matches that search.</p><button type="button" onClick={() => setQuery('')}>Show all examples</button></div>}
      <p className="directory-disclaimer">No code here is active or usable. We will replace these previews with partner approved offers before launch.</p>
    </section>
  </DirectoryLayout>
}
