import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`

const places = [
  { name: 'Dobro Top Vegan', area: 'Jumeirah Lakes Towers', image: 'dobro.jpg', alt: 'Colorful vegetable plate', query: 'Dobro Top Vegan JLT Dubai' },
  { name: 'Planet Terra', area: 'The Greens', image: 'terra.jpg', alt: 'People raising drinks around a table', query: 'Planet Terra The Greens Dubai' },
  { name: 'Moreish', area: 'Al Barsha', image: 'moreish.jpg', alt: 'Prepared vegetable dish', query: 'Moreish Al Barsha Dubai' }
]

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = document.querySelectorAll('[data-parallax]')
    let frame = 0
    const move = () => {
      frame = 0
      for (const item of items) {
        const rect = item.parentElement.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue
        const shift = Math.max(-18, Math.min(18, (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.055))
        item.style.transform = `translate3d(0, ${shift}px, 0)`
      }
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(move) }
    move()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <>
    <a className="skip" href="#places">Skip to places</a>
    <header className="site-header" id="top">
      <a className="brand" href="#top"><img src={asset('logo-mark.png')} alt="" /><span>Dubai Vegan<br />Community</span></a>
      <nav aria-label="Main navigation"><a href="#places">Find a place</a><a href="#start">Start here</a><a href="#meet">Meet people</a></nav>
      <a className="original-link" href={import.meta.env.BASE_URL}>View original <Arrow diagonal /></a>
    </header>

    <main>
      <section className="cover-stage" aria-labelledby="cover-title">
        <div className="cover">
          <div className="cover-topline"><span>Dubai Vegan Community</span><span>A guide to eating and gathering in Dubai</span></div>
          <h1 id="cover-title">GOOD FOOD.<br />GOOD COMPANY.</h1>
          <div className="cover-deck"><p>Find somewhere to eat.</p><p>Bring someone along.</p><p>Stay for the people.</p></div>
          <div className="cover-photo"><img src={asset('picnic.jpg')} alt="A group sharing food at an outdoor picnic" data-parallax /></div>
          <div className="cover-bottom"><p>For vegans, the curious, and anyone who wants a seat at the table.</p><a href="#places">Look around <Arrow diagonal /></a></div>
        </div>
      </section>

      <section className="welcome section-wrap" aria-labelledby="welcome-title">
        <p className="side-note">Dubai, UAE<br />Open to everyone</p>
        <div>
          <h2 id="welcome-title">A city to eat through, together.</h2>
          <p>Looking for a plant-based dinner in Dubai? Starting with one meal? Just want to meet people who get it? Start with a place. The rest can happen around the table.</p>
        </div>
      </section>

      <section className="places section-wrap" id="places" aria-labelledby="places-title">
        <div className="section-heading"><h2 id="places-title">Somewhere to start</h2><p>Three places from the existing guide. Check menus and opening hours before you go.</p></div>
        <div className="places-layout">
          <div className="place-list" role="list">
            {places.map((place, index) => <div className={`place-row ${selected === index ? 'active' : ''}`} role="listitem" key={place.name} onMouseEnter={() => setSelected(index)}>
              <button type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`Preview ${place.name}`}><span><strong>{place.name}</strong><small>{place.area}</small></span><span aria-hidden="true">{selected === index ? '−' : '+'}</span></button>
              {selected === index && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`} target="_blank" rel="noopener noreferrer">Find it on Maps <Arrow diagonal /></a>}
            </div>)}
          </div>
          <div className="place-image" key={places[selected].image}><img src={asset(places[selected].image)} alt={places[selected].alt} /></div>
        </div>
      </section>

      <section className="interlude" aria-labelledby="interlude-title">
        <div className="interlude-photo"><img src={asset('community-table.png')} alt="Illustration of people sharing plant-based dishes at a table" data-parallax /></div>
        <div className="interlude-card"><h2 id="interlude-title">Come as you are.</h2><p>You do not need a perfect pantry or a label. A good meal is enough of a reason to begin.</p><a href="#start">Start with the basics <Arrow /></a></div>
      </section>

      <section className="start section-wrap" id="start" aria-labelledby="start-title">
        <div className="section-heading"><h2 id="start-title">New to plant-based Dubai?</h2><p>A few useful moves for your first week.</p></div>
        <div className="start-grid">
          <article><h3>Eating out</h3><p>Search the dish, not only the restaurant. Ask about stock, sauces, dairy and eggs when the menu is unclear.</p></article>
          <article><h3>Shopping</h3><p>Start with meals you already like. Lentils, rice, vegetables, bread and spices go a long way without a specialist aisle.</p></article>
          <article><h3>Going with friends</h3><p>Pick a place with options everyone can enjoy. The point is to share a table, not turn dinner into a debate.</p></article>
        </div>
      </section>

      <section className="meet section-wrap" id="meet" aria-labelledby="meet-title">
        <div className="meet-art"><img src={asset('field.jpg')} alt="Yellow flowers in a sunlit field" data-parallax /></div>
        <div className="meet-copy"><h2 id="meet-title">Find your people.</h2><p>We are not publishing an event calendar until dates and hosts are confirmed. These live searches are a practical way to see what is happening around Dubai now.</p><div className="meet-links"><a href="https://www.eventbrite.com/d/united-arab-emirates--dubai/vegan/" target="_blank" rel="noopener noreferrer">Search vegan events on Eventbrite <Arrow diagonal /></a><a href="https://www.meetup.com/find/?keywords=vegan&location=ae--Dubai" target="_blank" rel="noopener noreferrer">Search vegan meetups <Arrow diagonal /></a></div></div>
      </section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="brand" href="#top"><img src={asset('logo-mark.png')} alt="" /><span>Dubai Vegan<br />Community</span></a><nav aria-label="Footer navigation"><a href="#places">Places</a><a href="#start">Start here</a><a href="#meet">Meet people</a><a href={import.meta.env.BASE_URL}>Original site</a></nav><a className="back-top" href="#top">Back to top ↑</a></div><p className="footer-wordmark">The table is open.</p><p className="footer-note">A concept edition of Dubai Vegan Community. Venue details and external listings can change; check before visiting.</p></footer>
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
