import { useState } from 'react'

const base = import.meta.env.BASE_URL
const links = [['Places', 'places.html'], ['Recipes', 'recipes.html'], ['Products', 'products.html'], ['Events', 'events.html'], ['Guide', 'guide.html'], ['Our story', 'about.html']]

export default function SiteHeader({ active }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className="site-header"><div className="wrap header-inner">
    <a className="brand" href={base} aria-label="Dubai Vegan Community home"><img src={`${base}assets/logo.png`} alt="" /><span>Dubai Vegan<br />Community</span></a>
    <button className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
    <nav className={'main-nav' + (menuOpen ? ' open' : '')} id="main-nav" aria-label="Main navigation">{links.map(([label, path]) => <a key={path} href={`${base}${path}`} aria-current={label === active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
    <a className="header-cta" href={`${base}#join`}>Be part of it</a>
  </div></header>
}
