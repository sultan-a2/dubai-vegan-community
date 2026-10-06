import { useEffect, useRef, useState } from 'react'
import SiteIcon from './SiteIcon.jsx'
import CommunityUpdates from './CommunityUpdates.jsx'

const base = import.meta.env.BASE_URL
const groups = [
  { label: 'Places', icon: 'food', links: [['All places', 'places.html'], ['Fully vegan kitchens', 'places.html?type=Vegan'], ['Bakeries & desserts', 'places.html?mood=Bakery%20%26%20desserts']] },
  { label: 'Recipes', icon: 'book', links: [['Recipes', 'recipes.html']] },
  { label: 'Products', icon: 'basket', links: [['Browse products', 'products.html'], ['Community offers', 'offers.html']] },
  { label: 'Events', icon: 'calendar', links: [['Upcoming events', 'events.html#upcoming'], ['Events calendar', 'events.html#calendar']] },
  { label: 'Guide', icon: 'book', links: [['Vegan living guides', 'guide.html'], ['Download the starter guide', 'guides/vegan-dubai-starter-guide.pdf']] },
]

export default function SiteHeader({ active }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const header = useRef(null)
  const close = () => { setOpenGroup(null); setMenuOpen(false) }
  useEffect(() => {
    const outside = (event) => { if (!header.current?.contains(event.target)) close() }
    const escape = (event) => {
      if (event.key !== 'Escape') return
      const button = header.current?.querySelector(`[data-group="${openGroup}"]`)
      if (openGroup) { setOpenGroup(null); button?.focus() }
      else { setMenuOpen(false); header.current?.querySelector('.menu-button')?.focus() }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [openGroup])
  return <><header className="site-header" ref={header}><div className="wrap header-inner">
    <a className="brand" href={base} aria-label="Dubai Vegan Community home"><img src={`${base}assets/logo.png`} alt="" /><span>Dubai Vegan<br />Community</span></a>
    <button className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => { setMenuOpen(!menuOpen); setOpenGroup(null) }}><span /><span /><span /></button>
    <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="main-nav" aria-label="Main navigation" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null) }}>
      {groups.map((group) => group.links.length === 1 ? <a className="nav-direct" key={group.label} href={base + group.links[0][1]} aria-current={active === group.label ? 'page' : undefined} onClick={close}>{group.label}</a> : <div className="nav-group" key={group.label}>
        <button type="button" className="nav-trigger" data-group={group.label} aria-expanded={openGroup === group.label} aria-controls={`nav-${group.label.toLowerCase()}`} aria-current={active === group.label ? 'page' : undefined} onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}>{group.label}<SiteIcon name="chevron" size={16} /></button>
        <div id={`nav-${group.label.toLowerCase()}`} className="nav-dropdown" hidden={openGroup !== group.label}>{group.links.map(([label, path]) => <a href={base + path} key={path} onClick={close}><SiteIcon name={group.icon} /><span>{label}</span></a>)}</div>
      </div>)}
      <a className="nav-story" href={`${base}about.html`} aria-current={active === 'Our story' ? 'page' : undefined}>Our story</a>
    </nav>
    <a className="header-cta" href={`${base}#join`}>Be part of it <SiteIcon name="arrow" size={18} /></a>
  </div></header><CommunityUpdates /></>
}
