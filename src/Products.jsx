import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import SubmissionPanel from './components/SubmissionPanel.jsx'
import { products, productCategories, supermarkets } from './data/directory.js'
import CollectionFilters from './CollectionFilters.jsx'
import './collection-refresh.css'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name

export default function Products() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState([])
  const toggleCategory = (category) => setCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])
  const visible = useMemo(() => products.filter((product) => (!categories.length || categories.includes(product.category)) && `${product.brand} ${product.name} ${product.category} ${product.detail} ${product.retailer}`.toLowerCase().includes(query.trim().toLowerCase())), [query, categories])
  return <div className="browse-page"><DirectoryLayout active="Products">
    <section className="browse-collection wrap" id="browse-products" aria-labelledby="products-list-title">
      <div className="browse-heading"><div><h1 id="products-list-title">Products</h1><p>Everyday vegan finds, shared by the community.</p></div><a className="browse-contribute" href="#submit">Suggest a product <span aria-hidden="true">↗</span></a></div>
      <div className="browse-layout">
        <CollectionFilters id="product" query={query} onQueryChange={setQuery} placeholder="Search products, brands, shops…" categories={productCategories} selected={categories} onToggle={toggleCategory} onClear={() => setCategories([])} items={products} visibleCount={visible.length} noun="products" />
        <div className="browse-results">
          {visible.length ? <div className="browse-grid">{visible.map((product) => <article className="browse-card" key={product.url}><a className="browse-card-link" href={product.url} target="_blank" rel="noopener noreferrer"><div className="browse-card-photo browse-packshot">{product.image ? <img src={asset(product.image)} alt="" loading="lazy" /> : <span className="browse-photo-missing">Product photo not available</span>}</div><div className="browse-card-copy"><h2>{product.name} <span aria-hidden="true">↗</span></h2><p>{product.brand} · {product.detail}</p><small>{product.communityLink ? 'Community link · ' : 'Find at '}{product.retailer}</small></div></a></article>)}</div> : <div className="browse-empty"><p>No products match that search.</p><button type="button" onClick={() => { setQuery(''); setCategories([]) }}>Show all products</button></div>}
          <p className="browse-note">Stock and ingredients can change. Check the retailer’s listing and pack before buying.</p>
        </div>
      </div>
    </section>
    <section className="browse-shops wrap" aria-labelledby="shops-title"><h2 id="shops-title">Where to shop</h2><p>Supermarkets shared by the community. Search their current ranges and check delivery in your area.</p><div className="browse-shop-list">{supermarkets.map((shop) => <a key={shop.name} href={shop.url} target="_blank" rel="noopener noreferrer"><span>{shop.name}{shop.note && <small>{shop.note}</small>}</span><span aria-hidden="true">↗</span></a>)}</div></section>
    <SubmissionPanel kind="Product" />
  </DirectoryLayout></div>
}
