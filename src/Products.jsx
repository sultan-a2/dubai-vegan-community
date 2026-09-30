import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import { RevealFrame } from './components/EditorialMotion.jsx'
import { products } from './data/directory.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const categories = ['All', 'Everyday', 'Chilled', 'Meals', 'Treats']

export default function Products() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const visible = useMemo(() => products.filter((product) => (category === 'All' || product.category === category) && `${product.name} ${product.detail} ${product.retailer}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category])

  return <DirectoryLayout active="Products">
    <section className="directory-hero product-directory-hero wrap"><div><h1>Meet the<br />vegan shelf.</h1><p>Useful finds for a regular shop, listed by UAE retailers. A little less searching, a little more time to make dinner.</p><ArrowLink href="#browse-products">Browse the shelf</ArrowLink></div><RevealFrame className="directory-hero-photo"><img src={asset('community/shared-meal.jpg')} alt="Community members sharing a plant-based meal" /></RevealFrame></section>
    <section className="directory-collection wrap" id="browse-products" aria-labelledby="products-list-title"><div className="directory-collection-head"><h2 id="products-list-title">The shelf notes.</h2><p>Everyday staples, fridge finds, easy meals and treats. Product links open the retailer’s current listing.</p></div><div className="product-directory-tools"><div className="directory-search"><label htmlFor="product-search">Search products</label><input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try oat, yoghurt, chocolate…" /></div><div className="product-category-filters" role="group" aria-label="Filter products by category">{categories.map((item) => <button type="button" key={item} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}</div></div><p className="directory-result-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'find' : 'finds'} to explore</p>
      {visible.length ? <div className="product-directory-grid">{visible.map((product) => <a className="product-directory-card" key={product.name} href={product.url} target="_blank" rel="noopener noreferrer"><span className="product-directory-photo"><img src={asset(product.image)} alt="" loading="lazy" /></span><span className="product-directory-copy"><span>{product.category}</span><h3>{product.name}</h3><p>{product.detail}</p><span className="product-directory-retailer">Listed at {product.retailer}</span></span></a>)}</div> : <div className="directory-empty"><p>No product matches that search yet.</p><button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Show all finds</button></div>}
      <p className="directory-disclaimer">Stock, ingredients and product variants can change. Check the exact retailer listing and pack before buying.</p>
    </section>
  </DirectoryLayout>
}
