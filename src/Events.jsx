import { useEffect, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import EventActions from './components/EventActions.jsx'
import SiteIcon from './components/SiteIcon.jsx'
import { events } from './data/events.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const eventImages = {
  'ripe-market': 'community/gathering-hall.jpg',
  'not-just-for-vegans': 'community/cafe-room.jpg',
  'organic-natural-expo': 'community/evening-dinner.jpg',
}

function firstCalendarMonth() {
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const next = events.find((event) => event.date && event.date >= today)
  const date = next?.date ? new Date(`${next.date.slice(0, 7)}-01T12:00:00`) : new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function EventsCalendar() {
  const [view, setView] = useState(firstCalendarMonth)
  const year = view.getFullYear()
  const month = view.getMonth()
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const rows = Array.from({ length: Math.ceil((offset + days) / 7) }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const day = week * 7 + weekday - offset + 1
      return day > 0 && day <= days ? day : null
    }),
  )
  const label = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(view)

  return <div className="events-calendar" id="calendar">
    <div className="events-calendar-head"><h3>{label}</h3><div><button type="button" aria-label="Previous month" onClick={() => setView(new Date(year, month - 1, 1))}>← <span>Previous</span></button><button type="button" aria-label="Next month" onClick={() => setView(new Date(year, month + 1, 1))}><span>Next</span> →</button></div></div>
    <table aria-label={`${label} events calendar`}><thead><tr>{weekdays.map((day) => <th scope="col" key={day}>{day}</th>)}</tr></thead><tbody>{rows.map((week, index) => <tr key={index}>{week.map((day, weekday) => {
      const iso = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ''
      const matches = events.filter((event) => event.date && event.date <= iso && (event.endDate || event.date) >= iso)
      return <td key={weekday} className={matches.length ? 'has-event' : ''}>{day && <><time dateTime={iso}>{day}</time>{matches.map((event) => <a href={`#${event.id}`} key={event.id} aria-label={`${event.title}, ${iso}`}><img src={asset(eventImages[event.id])} alt="" loading="lazy" /><span>{event.title}</span></a>)}</>}</td>
    })}</tr>)}</tbody></table>
    <p className="events-calendar-note">Tap a marked date for event details. Dates are added once confirmed by organisers.</p>
  </div>
}

function EventHero({ event, selected }) {
  return <section className="event-feature-hero"><div className="wrap">
    <h1>{selected ? event.title : 'Events & gatherings.'}</h1>
    {!selected && <p className="event-hero-intro">Good food and a reason to get together. Find what’s coming up around Dubai.</p>}
    <div className="event-feature-photo"><img src={asset(eventImages[event.id])} alt="Dubai Vegan Community members gathering around a table" fetchPriority="high" /><div className="event-feature-info">
      <h2>{selected ? 'Event details' : event.title}</h2><p><SiteIcon name="calendar" size={19} />{event.day} {event.month} 2026</p><p>{event.venue}</p><p className="event-feature-note">{event.note}</p>
      <EventActions event={event} organiser={selected} />
    </div></div>
    <p className="event-photo-note">Photo from our community gatherings, rather than this event.</p>
  </div></section>
}

export default function Events() {
  const selected = events.find((event) => event.id === new URLSearchParams(window.location.search).get('event'))
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])
  return <DirectoryLayout active="Events">
    <EventHero event={selected || events[0]} selected={Boolean(selected)} />
    {selected && <section className="event-reading wrap" id="event-details"><aside><a href={`${import.meta.env.BASE_URL}events.html`}>← Back to all events</a><div><h2>Before you go</h2><p>Check the organiser’s page for entry, ticket prices and any changes to the date or venue.</p><a href={selected.url} target="_blank" rel="noopener noreferrer">Open organiser’s page ↗</a></div></aside><div><h2>{selected.title}</h2><p>{selected.note}.</p><p>{selected.venue}. Listed for {selected.day} {selected.month} 2026.</p><p>This event is run by an independent organiser. Use their page for the latest details and to arrange your visit.</p>{!selected.date && <p>The displayed date is tentative. The organiser has shown conflicting dates, so confirm before making plans.</p>}</div></section>}
    <section className="event-card-section wrap" id="upcoming" aria-labelledby="upcoming-title"><div className="event-card-section-heading"><h2 id="upcoming-title">Coming up in Dubai</h2><p>Independent markets and expos with plant-based options. Confirm the details with their organisers.</p></div><div className="event-photo-grid">{events.map((event) => <article className="event-photo-card" id={event.id} key={event.id}><a href={`${import.meta.env.BASE_URL}events.html?event=${event.id}#event-details`} aria-label={event.title}><img src={asset(eventImages[event.id])} alt="A Dubai Vegan Community gathering" loading="lazy" /></a><div className="event-photo-card-body"><h3><a href={`${import.meta.env.BASE_URL}events.html?event=${event.id}#event-details`}>{event.title}<SiteIcon name="arrow" size={22} /></a></h3><p className="event-card-date"><SiteIcon name="calendar" size={18} />{event.day} {event.month} 2026</p><p>{event.venue}</p><p>{event.note}</p><EventActions event={event} /></div></article>)}</div><p className="event-section-note">The Not Just For Vegans date is tentative and is excluded from the confirmed calendar. Photos show our community, not the listed events.</p></section>
    <section className="events-page-calendar" aria-labelledby="events-calendar-title"><div className="wrap"><h2 id="events-calendar-title" className="events-calendar-title">Events calendar</h2><EventsCalendar /></div></section>
  </DirectoryLayout>
}
