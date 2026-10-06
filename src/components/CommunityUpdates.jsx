import SiteIcon from './SiteIcon.jsx'

const base = import.meta.env.BASE_URL
const updates = [
  { icon: 'calendar', text: 'The Ripe Market · 10 October', href: 'events.html#ripe-market' },
  { icon: 'food', text: 'Find your next favourite table', href: 'places.html' },
  { icon: 'calendar', text: 'See what’s coming up · Events & gatherings', href: 'events.html#upcoming' },
  { icon: 'book', text: 'New to vegan living? Start here', href: 'guide.html' },
]
export default function CommunityUpdates() {
  return <aside className="community-updates" aria-label="Events and community updates">
    <div className="updates-window"><div className="updates-track">{[false, true].map((duplicate) => <div className="updates-set" key={String(duplicate)} aria-hidden={duplicate || undefined}>{updates.map((item) => <a href={base + item.href} key={item.text} tabIndex={duplicate ? -1 : undefined}><SiteIcon name={item.icon} size={20} /><span>{item.text}</span><span className="update-divider" aria-hidden="true">/</span></a>)}</div>)}</div></div>
  </aside>
}
