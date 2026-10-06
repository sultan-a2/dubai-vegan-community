import { useState } from 'react'

export default function CollectionFilters({ id, query, onQueryChange, placeholder, categories = [], selected = [], onToggle, onClear, items = [], visibleCount, noun, categoryLabel = 'Category', filtersLabel = 'Categories' }) {
  const [expanded, setExpanded] = useState(false)
  return <aside className="browse-sidebar">
    <label className="browse-search" htmlFor={`${id}-search`}><span className="sr-only">Search {noun}</span><span className="browse-search-symbol" aria-hidden="true" /><input id={`${id}-search`} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} /></label>
    {categories.length > 0 && <>
      <button className="browse-filter-toggle" type="button" aria-expanded={expanded} aria-controls={`${id}-categories`} onClick={() => setExpanded(!expanded)}>{filtersLabel}{selected.length > 0 && ` (${selected.length})`}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
      <div className={`browse-filter-panel${expanded ? ' is-open' : ''}`} id={`${id}-categories`}>
        <div className="browse-filter-heading"><h2>{categoryLabel}</h2><button type="button" onClick={onClear} disabled={!selected.length}>Clear</button></div>
        <fieldset><legend className="sr-only">Filter {noun} by category</legend>{categories.filter((category) => category !== 'All').map((category) => <label key={category}><input type="checkbox" checked={selected.includes(category)} onChange={() => onToggle(category)} /><span>{category}</span><small>{items.filter((item) => item.category === category).length}</small></label>)}</fieldset>
      </div>
    </>}
    <p className="browse-result-count" aria-live="polite">Showing <strong>{visibleCount}</strong> of <strong>{items.length}</strong> {noun}</p>
  </aside>
}
