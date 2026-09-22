import { useEffect, useMemo, useState } from 'react'
import AccordionGallery from './components/AccordionGallery.jsx'
import GlassSurface from './components/GlassSurface.jsx'
import MagicBento from './components/MagicBento.jsx'
import PulseHeart from './components/PulseHeart.jsx'
import ScrollStack, { ScrollStackItem } from './components/ScrollStack.jsx'

const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`

const places = [
  {
    diet: 'vegan',
    label: 'Dobro Top Vegan',
    detail: 'JLT · Fully vegan',
    alt: 'A vegetable salad at Dobro Top Vegan',
    image: asset('dobro.jpg'),
    link: 'https://www.google.com/maps/search/?api=1&query=Dobro+Top+Vegan+JLT+Dubai'
  },
  {
    diet: 'vegan',
    label: 'Planet Terra',
    detail: 'The Greens · Fully vegan',
    alt: 'Hands raising glasses at Planet Terra',
    image: asset('terra.jpg'),
    link: 'https://www.google.com/maps/search/?api=1&query=Planet+Terra+The+Greens+Dubai'
  },
  {
    diet: 'friendly',
    label: 'Moreish',
    detail: 'Al Barsha · Vegan-friendly',
    alt: 'A vegetable plate at Moreish',
    image: asset('moreish.jpg'),
    link: 'https://www.google.com/maps/search/?api=1&query=Moreish+Al+Barsha+Dubai'
  }
]

const stories = [
  {
    image: 'story-1.jpg',
    title: 'Why finding other vegans changed everything'
  },
  {
    image: 'story-2.jpg',
    title: 'What it takes to build a plant-based kitchen in Dubai'
  },
  {
    image: 'story-3.jpg',
    title: 'The meals that made the transition feel possible'
  }
]

const filters = [
  ['all', 'All places'],
  ['vegan', 'Fully vegan'],
  ['friendly', 'Vegan-friendly'],
  ['new', 'New to the guide']
]

function Plant() {
  return (
    <svg viewBox="0 0 148 210" width="148" height="210">
      <path d="M78 202C74 174 68 152 76 124C84 96 74 74 82 46C86 32 80 22 84 12" fill="none" stroke="#432F2A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M76 158C58 154 36 164 26 148C24 134 42 122 62 132C70 136 74 146 76 158Z" fill="#FBF6EC" stroke="#432F2A" strokeWidth="1.45" />
      <path d="M74 154C62 146 46 144 34 148" fill="none" stroke="#432F2A" strokeLinecap="round" />
      <path d="M80 122C102 110 128 116 136 98C138 84 120 72 102 82C92 88 82 104 80 122Z" fill="#F4E7C8" stroke="#432F2A" strokeWidth="1.45" />
      <path d="M82 118C98 110 116 108 126 100" fill="none" stroke="#432F2A" strokeLinecap="round" />
      <path d="M74 96C52 82 34 64 44 44C58 36 76 58 80 80C82 88 78 92 74 96Z" fill="#E4F0C2" stroke="#432F2A" strokeWidth="1.45" />
      <path d="M72 90C60 78 50 66 52 54" fill="none" stroke="#432F2A" strokeLinecap="round" />
      <path d="M84 62C100 42 122 36 130 22C116 18 98 34 90 52C88 58 86 62 84 62Z" fill="#FBF6EC" stroke="#432F2A" strokeWidth="1.45" />
      <circle cx="86" cy="14" r="4" fill="#88A33B" stroke="#432F2A" strokeWidth="1.2" />
    </svg>
  )
}

export default function App() {
  const [diet, setDiet] = useState('all')
  const [query, setQuery] = useState('')

  const visiblePlaces = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return places.filter((place) => {
      const kind = diet === 'all' || place.diet === diet
      const text = `${place.label} ${place.detail}`.toLowerCase().includes(needle)
      return kind && text
    })
  }, [diet, query])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const layers = [...document.querySelectorAll('[data-speed]')]
    let frame = 0

    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const el of layers) {
        const slot = el.closest('[data-slot]')
        if (!slot) continue
        const rect = slot.getBoundingClientRect()
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) continue
        const fromCenter = (rect.top + rect.height / 2 - mid) / window.innerHeight
        const speed = Number(el.dataset.speed)
        const compact = window.innerWidth < 800 ? 0.4 : 1
        const max = Number(el.dataset.max || 24) * compact
        const shift = Math.max(-max, Math.min(max, fromCenter * speed))
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`
      }
    }

    const request = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <a className="skip" href="#places">Skip to the guide</a>

      <div className="site-nav">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={0}
          displace={0}
          distortionScale={0}
          blur={0}
          backgroundOpacity={0.62}
          saturation={1.15}
          className="site-nav-glass"
        >
          <header className="header">
            <a className="brand" href="#top">
              <img src={asset('logo-mark.png')} alt="" width="52" height="52" />
              <span>Dubai Vegan Community</span>
            </a>
            <nav className="nav" aria-label="Page">
              <a href="#places">Places</a>
              <a href="#events">Events</a>
              <a href="#stories">Stories</a>
              <a href="#guides">Guides</a>
            </nav>
            <div className="header-action">
              <a className="button" href="#list">List your business</a>
            </div>
          </header>
        </GlassSurface>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">Where good food &<br />good people meet.</h1>
          <div className="rule" aria-hidden="true" />
          <p className="dek">A generous guide to eating, gathering and living vegan in Dubai. Made by the community, for anyone curious enough to join the table.</p>

          <div className="collage">
            <div className="slot slot-side" data-slot>
              <div className="shot" data-speed="36" data-max="18">
                <img src={asset('coffee.jpg')} alt="Coffee on a shared table" width="480" height="600" data-speed="18" data-max="22" />
              </div>
            </div>
            <div className="slot slot-center" data-slot>
              <div className="shot shot-center" data-speed="12" data-max="10">
                <img src={asset('picnic.jpg')} alt="People gathered for a picnic" width="1360" height="840" data-speed="8" data-max="16" />
              </div>
              <div className="plant" data-speed="52" data-max="34" aria-hidden="true">
                <Plant />
              </div>
            </div>
            <div className="slot slot-side" data-slot>
              <div className="shot" data-speed="-30" data-max="18">
                <img src={asset('garden.jpg')} alt="A bowl of greens" width="480" height="600" data-speed="-16" data-max="22" />
              </div>
            </div>
          </div>

          <div className="hero-links">
            <p className="mark"><span className="dot" aria-hidden="true" />Independent. Inclusive. Always hungry.</p>
            <a className="text-link" href="#places">Explore the directory →</a>
          </div>
        </section>

        <section className="directory" id="places" aria-labelledby="places-title">
          <div className="split intro">
            <h2 id="places-title">Eat well,<br />all over Dubai.</h2>
            <p>Vegan and vegan-friendly places we would actually send a friend.</p>
          </div>

          <div className="tools">
            <label className="search">
              <span className="search-field">
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <circle cx="9" cy="9" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13 13.5L16.5 17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  id="search"
                  type="search"
                  placeholder="Search by place, area or craving"
                  autoComplete="off"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </span>
              <span className="search-label">Search</span>
            </label>
            <div className="filters scroll-fade-x" role="group" aria-label="Filter places">
              {filters.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={diet === id ? 'pill is-on' : 'pill'}
                  aria-pressed={diet === id}
                  onClick={() => setDiet(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {visiblePlaces.length ? (
            <AccordionGallery
              key={`${diet}:${query}`}
              className="places"
              items={visiblePlaces}
              defaultIndex={Math.min(1, visiblePlaces.length - 1)}
              accentColor="#88A33B"
              overlayColor="#1B4436"
              textColor="#F9E4C5"
              grayscale
              showLabels
              height={460}
              gap={16}
              radius={12}
              expandRatio={0.52}
              trigger="hover"
            />
          ) : (
            <p className="empty">Nothing in the guide matches that yet.</p>
          )}

          <p className="browse"><a className="text-link" href="#places">Browse the full guide →</a></p>
        </section>

        <section className="events" id="events" aria-labelledby="events-title">
          <div className="split intro">
            <h2 id="events-title">What's on this month</h2>
            <p>Markets, potlucks, and the occasional film night. Come even if you are new.</p>
          </div>

          <div className="bento">
            <article className="feature">
              <div className="shot feature-photo" data-slot>
                <img src={asset('lunch.jpg')} alt="The community lunch table" width="800" height="912" data-speed="20" data-max="24" />
              </div>
              <div className="feature-copy">
                <div>
                  <p className="date"><span>26</span> September<br />Saturday</p>
                  <h3>Lunch tastes better with company.</h3>
                  <p>Come alone or bring a friend. Vegan or simply curious, you are welcome.</p>
                </div>
                <div>
                  <p className="when">1:00 PM<br />Dobro Top Vegan, Dubai</p>
                  <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Dobro+Top+Vegan+JLT+Dubai" target="_blank" rel="noopener">Save your seat →</a>
                </div>
              </div>
            </article>

            <a className="gathering" href="https://www.google.com/maps/search/?api=1&query=Ripe+Market+Alserkal+Avenue+Dubai" target="_blank" rel="noopener">
              <p className="mini-date"><span>27</span> Sep</p>
              <span className="gathering-copy">
                <strong>Ripe Market, Alserkal</strong>
                <span>Saturday, 10–4 · Free</span>
              </span>
              <span className="shot gathering-photo" data-slot>
                <img src={asset('market.jpg')} alt="" width="280" height="440" data-speed="16" data-max="14" />
              </span>
            </a>

            <article className="gathering">
              <p className="mini-date"><span>3</span> Oct</p>
              <span className="gathering-copy">
                <strong>Leftover iftar potluck</strong>
                <span>Jumeirah · Bring a dish</span>
              </span>
              <span className="shot gathering-photo" data-slot>
                <img src={asset('potluck.jpg')} alt="" width="280" height="440" data-speed="-12" data-max="14" />
              </span>
            </article>
          </div>
        </section>

        <section className="starter" id="guides" aria-labelledby="guides-title">
          <div className="shot starter-photo" data-slot>
            <img src={asset('starter.jpg')} alt="Friends eating outdoors" width="1280" height="960" data-speed="18" data-max="22" />
          </div>
          <div className="starter-copy">
            <h2 id="guides-title">You do not need to be perfect to begin.</h2>
            <p>A practical Dubai guide for eating out, shopping, and the questions that come up when you are just starting.</p>
            <a className="text-link" href="#guides">Read the starter guide →</a>
            <p className="feeling">One meal can be<br />a beginning.</p>
          </div>
        </section>

        <section className="stories" id="stories" aria-labelledby="stories-title">
          <div className="stories-intro">
            <h2 id="stories-title">People,<br />not perfection.</h2>
            <p>Meet the people changing their habits, feeding their neighbours, and making the city easier to eat in.</p>
            <div className="shot stories-photo" data-slot>
              <img src={asset('stories.jpg')} alt="The community around a table" width="1120" height="680" data-speed="16" data-max="20" />
            </div>
          </div>
          <ScrollStack
            className="story-stack"
            useWindowScroll
            itemDistance={28}
            itemScale={0.02}
            baseScale={0.94}
            blurAmount={0}
            rotationAmount={0}
          >
            {stories.map((story) => (
              <ScrollStackItem key={story.title}>
                <article className="story">
                  <img src={asset(story.image)} alt="" width="96" height="72" />
                  <h3>{story.title}</h3>
                  <PulseHeart
                    count={0}
                    likedColor="#88A33B"
                    idleColor="#1B4436"
                    pillColor="#1B4436"
                    textColor="#F9E4C5"
                    label={`Like ${story.title}`}
                  />
                </article>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>

        <section className="take-part" aria-labelledby="take-part-title">
          <h2 id="take-part-title">Take part</h2>
          <MagicBento
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            glowColor="136, 163, 59"
          />
        </section>

        <section className="business" id="list" aria-labelledby="list-title">
          <h2 id="list-title">Put your business on the community map.</h2>
          <div>
            <p>Apply for a verified listing or propose an event collaboration.</p>
            <a className="button button-line" href="#list">Start an application ↗</a>
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-links">
          <a className="brand brand-light" href="#top">
            <img src={asset('logo-mark.png')} alt="" width="52" height="52" />
            <span>Dubai Vegan Community</span>
          </a>
          <div className="footer-cols">
            <nav aria-label="Footer">
              <a href="#places">Places</a>
              <a href="#events">Events</a>
              <a href="#stories">Stories</a>
              <a href="#guides">Guides</a>
            </nav>
            <nav aria-label="Community">
              <a href="#list">List your business</a>
              <a id="instagram" href="#footer">Instagram</a>
              <a id="contact" href="#footer">Contact</a>
            </nav>
          </div>
          <a className="to-top" href="#top">Back to top ↑</a>
        </div>
        <p className="wordmark">dubai vegan community</p>
        <p className="legal">© 2026 Dubai Vegan Community</p>
      </footer>
    </>
  )
}
