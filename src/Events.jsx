import { useEffect, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import { events } from './data/events.js'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const ticketPrice = 75
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

function BookingPreview() {
  const [stage, setStage] = useState('details')
  const [tickets, setTickets] = useState(1)

  return <section className="booking-preview" id="booking-preview" aria-labelledby="booking-title"><div className="wrap booking-preview-inner">
    <div className="booking-preview-intro"><h2 id="booking-title">Booking a community workshop</h2><p>This is the planned booking flow for events hosted by Dubai Vegan Community. The listed events above are run by other organisers, so book those through their links.</p></div>
    <div className="booking-card"><div className="booking-card-image"><img src={asset('community/shared-meal.jpg')} alt="Community members sharing a plant-based meal" loading="lazy" /></div><div className="booking-card-body">
      <h3>Plant-based cooking together</h3><p className="booking-card-meta">Workshop concept · Date and venue to be announced · AED {ticketPrice} per person</p>
      {stage === 'details' && <><p>Spend a relaxed morning making a simple meal with other curious cooks.</p><form onSubmit={(event) => { event.preventDefault(); setStage('checkout') }}><label>Your name<input name="name" required autoComplete="off" placeholder="Your name" /></label><label>Email for confirmation<input name="email" type="email" required autoComplete="off" placeholder="you@example.com" /></label><label>Places<select value={tickets} onChange={(event) => setTickets(Number(event.target.value))}><option value="1">1 place</option><option value="2">2 places</option><option value="3">3 places</option><option value="4">4 places</option></select></label><div className="booking-total"><span>Total</span><strong>AED {ticketPrice * tickets}</strong></div><button className="booking-primary" type="submit">Continue to checkout <span aria-hidden="true">→</span></button></form><p className="booking-availability">Bookings for this workshop are not open yet.</p></>}
      {stage === 'checkout' && <div className="booking-checkout"><p className="booking-checkout-title">Checkout</p><p>{tickets} {tickets === 1 ? 'place' : 'places'} · AED {ticketPrice * tickets}</p><div className="booking-pay-panel"><strong>Ziina payment</strong><span>Card · Apple Pay · Google Pay</span></div><p>Online payment is not connected yet. No place has been reserved and no payment has been taken.</p><button className="booking-back" type="button" onClick={() => setStage('details')}>Back to event details</button></div>}
    </div></div>
  </div></section>
}

export default function Events() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return <DirectoryLayout active="Events">
    <section className="events-page-hero wrap"><div><h1>Events for vegans in Dubai</h1><p>Find vegan and vegan-friendly markets and expos. See the date and location below, then use the organiser’s link for entry, tickets or registration.</p><ArrowLink href="#upcoming">See upcoming events</ArrowLink></div><img src={asset('community/long-table.jpg')} alt="Dubai Vegan Community members dining together" /></section>
    <section className="events-page-list wrap" id="upcoming" aria-labelledby="upcoming-title"><div className="events-page-list-head"><h2 id="upcoming-title">Upcoming events</h2><p>These events are run by independent organisers. Open their pages to confirm details and how to attend. The photos show our community gatherings, not the listed events.</p></div><div className="events-page-items">{events.map((event) => <article id={event.id} key={event.id}><div className="events-page-date"><strong className={event.endDate ? 'date-range' : ''}>{event.day}</strong><span>{event.month} 2026</span></div><img className="events-page-thumb" src={asset(eventImages[event.id])} alt="" loading="lazy" /><div className="events-page-detail"><h3>{event.title}</h3><p>{event.venue}</p><p>{event.note}</p><ArrowLink href={event.url} target="_blank" rel="noopener noreferrer">How to attend</ArrowLink></div></article>)}</div><p className="events-page-caveat">The Not Just For Vegans organiser shows conflicting dates. Its 11 October listing is tentative, so it is not marked on the calendar. Confirm with the organiser before making plans.</p></section>
    <section className="events-page-calendar" aria-labelledby="events-calendar-title"><div className="wrap"><h2 id="events-calendar-title" className="events-calendar-title">Events calendar</h2><EventsCalendar /></div></section>
    <BookingPreview />
  </DirectoryLayout>
}
