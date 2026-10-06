import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import { CopyButton } from './components/MotionBits.jsx'
import { promotions } from './data/directory.js'
import CollectionFilters from './CollectionFilters.jsx'
import './collection-refresh.css'

export default function Offers() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('search') || '')
  const [revealed, setRevealed] = useState(null)
  const visible = useMemo(() => promotions.filter((offer) => `${offer.title} ${offer.search} ${offer.offer}`.toLowerCase().includes(query.trim().toLowerCase())), [query])
  return <div className="browse-page"><DirectoryLayout active="Offers">
    <section className="browse-collection wrap" aria-labelledby="offers-list-title">
      <div className="browse-heading"><div><h1 id="offers-list-title">Community offers</h1><p>A preview of future partner offers. These examples and their codes are inactive.</p></div></div>
      <div className="browse-layout">
        <CollectionFilters id="offer" query={query} onQueryChange={setQuery} placeholder="Search offers…" items={promotions} visibleCount={visible.length} noun="examples" />
        <div className="browse-results">
          {visible.length ? <div className="browse-grid">{visible.map((offer) => <article className="browse-card browse-offer-card" key={offer.id}><div><h2>{offer.offer}</h2><p>{offer.title} · {offer.partner}</p></div><div className="browse-offer-action"><button type="button" aria-expanded={revealed === offer.id} onClick={() => setRevealed(revealed === offer.id ? null : offer.id)}>{revealed === offer.id ? offer.code : 'Show example code'}</button>{revealed === offer.id && <CopyButton value={offer.code} />}<small>{offer.terms}</small></div></article>)}</div> : <div className="browse-empty"><p>No example matches that search.</p><button type="button" onClick={() => setQuery('')}>Show all examples</button></div>}
          <p className="browse-note">No code here is active or usable. We will replace these previews with partner approved offers before launch.</p>
        </div>
      </div>
    </section>
  </DirectoryLayout></div>
}
