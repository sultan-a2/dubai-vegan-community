import { useMemo, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import SubmissionPanel from './components/SubmissionPanel.jsx'
import { products, productCategories, supermarkets } from './data/directory.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name

export default function Products() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const visible = useMemo(() => products.filter((product) => (category === 'All' || product.category === category) && `${product.brand} ${product.name} ${product.category} ${product.detail} ${product.retailer}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category])
  return <DirectoryLayout active="Products">
    <section className="collection wrap" id="browse-products" aria-labelledby="products-list-title">
      <div className="collection-heading"><h1 id="products-list-title">Products</h1><a className="collection-contribute" href="#submit">Suggest a product <span aria-hidden="true">↗</span></a></div>
      <div className="collection-layout">
        <aside className="collection-sidebar"><div className="collection-categories" role="group" aria-label="Filter products by category">{productCategories.map((item) => <button type="button" key={item} aria-pressed={item === category} onClick={() => setCategory(item)}><span>{item}</span><span>{item === 'All' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div></aside>
        <div className="collection-results"><div className="collection-tools"><label className="collection-search" htmlFor="product-search"><span className="sr-only">Search products</span><input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, brands, shops…" /></label><p aria-live="polite">{visible.length} {visible.length === 1 ? 'product' : 'products'}</p></div>
          {visible.length ? <div className="collection-grid">{visible.map((product) => <a className="collection-card" key={product.url} href={product.url} target="_blank" rel="noopener noreferrer"><div className="collection-image collection-packshot">{product.image ? <img src={asset(product.image)} alt="" loading="lazy" /> : <span className="collection-no-photo">Product photo not available</span>}</div><div className="collection-copy"><h2>{product.name} <span aria-hidden="true">↗</span></h2><p>{product.brand} · {product.detail}</p><small>{product.communityLink ? 'Community link · ' : 'Find at '}{product.retailer}</small></div></a>)}</div> : <div className="collection-empty"><p>No products match that search.</p><button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Show all products</button></div>}
          <p className="collection-note">Stock and ingredients can change. Check the retailer’s listing and pack before buying.</p>
        </div>
      </div>
    </section>
    <section className="collection-link-section wrap" aria-labelledby="shops-title"><h2 id="shops-title">Where to shop</h2><p>Supermarkets shared by the community. Search their current ranges and check delivery in your area.</p><div className="collection-link-list">{supermarkets.map((shop) => <a key={shop.name} href={shop.url} target="_blank" rel="noopener noreferrer"><span>{shop.name}{shop.note && <small>{shop.note}</small>}</span><span aria-hidden="true">↗</span></a>)}</div></section>
    <SubmissionPanel kind="Product" />
  </DirectoryLayout>
}
