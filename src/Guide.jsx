import { useEffect, useRef, useState } from 'react'
import DirectoryLayout from './components/DirectoryLayout.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import SiteIcon from './components/SiteIcon.jsx'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const guidePdf = import.meta.env.BASE_URL + 'guides/vegan-dubai-starter-guide.pdf'

const chapters = [
  { title: 'Your first week, made easier.', copy: 'Begin with meals you already like. A few dependable ingredients and one nearby place to eat can take the pressure off your first week.', image: 'community/cafe-table.jpg', alt: 'Friends sharing food at a café' },
  { title: 'Eating out with confidence.', copy: 'A quick question about sauces, stock, dairy or eggs can make an unfamiliar menu easier to navigate. Our places guide is another good starting point.', image: 'community/cafe-wide.jpg', alt: 'Community members eating together at a café', link: 'places.html', linkText: 'Find a place' },
  { title: 'A better way to read labels.', copy: 'Look beyond the front of the pack. Ingredients can differ between flavours and change over time, so check the exact product you are holding.', image: 'community/conversation.jpg', alt: 'Community members looking at a phone together', link: 'products.html', linkText: 'Explore products' },
  { title: 'Nutrition worth planning.', copy: 'A varied vegan diet needs a reliable source of vitamin B12. For personal nutrition needs, speak with a qualified clinician or dietitian.', image: 'community/evening-dinner.jpg', alt: 'Community members sharing a meal', link: 'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet/', linkText: 'Read the NHS vegan diet guide', external: true },
]

const topics = ['Getting started', 'Eating out', 'Shopping', 'Nutrition']
const slugs = ['getting-started', 'eating-out', 'reading-labels', 'nutrition']
const sections = [
  [{ heading: 'Start with the familiar', text: 'Think about meals you already enjoy and which ingredients you would need to change. Start with a small selection of meals you know how to make.' }, { heading: 'Keep a few dependable options', text: 'Choose ingredients you know how to use and a nearby place where you can eat. Having an option for a busy evening makes everyday decisions easier.' }],
  [{ heading: 'Ask about the ingredients', text: 'If the menu does not make a dish clear, ask the restaurant about its sauces, stock, dairy and eggs. A dish name alone may not tell you everything that goes into it.' }, { heading: 'Find a place before you go', text: 'Use the places guide to explore menus and locations. Check the current menu and confirm details that matter to you directly with the venue.' }],
  [{ heading: 'Check the exact pack', text: 'Read the ingredients on the product you are buying, even if you have bought that brand before. Different flavours and versions can have different ingredients.' }, { heading: 'Use the directory as a starting point', text: 'Our product collection can help you find things to look for. Check the current pack and retailer details before buying; a listing cannot replace the information on the product itself.' }],
  [{ heading: 'Make room for nutrition planning', text: 'Use the NHS vegan diet guide as a starting point for understanding what a balanced vegan diet involves, including a reliable source of vitamin B12.' }, { heading: 'Get advice for your own needs', text: 'General reading cannot assess your personal nutrition needs. A qualified clinician or dietitian can help you work through questions about your diet and circumstances.' }],
]
const currentArticle = () => new URLSearchParams(window.location.search).get('article') || ''

export default function Guide() {
  const [slug, setSlug] = useState(currentArticle)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const heading = useRef(null)
  const navigated = useRef(false)
  const index = slugs.indexOf(slug)
  const chapter = chapters[index]
  useEffect(() => {
    const onPopState = () => { navigated.current = true; setSlug(currentArticle()) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => {
    if (navigated.current) { heading.current?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }) }
  }, [slug])
  const navigate = (event, value) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const url = new URL(window.location.href)
    if (value) url.searchParams.set('article', value)
    else url.searchParams.delete('article')
    window.history.pushState({}, '', url)
    navigated.current = true
    setSlug(value)
  }
  const articleUrl = (value) => `${import.meta.env.BASE_URL}guide.html${value ? `?article=${value}` : ''}`
  const clear = () => { setQuery(''); setSelected([]) }
  const visible = chapters.map((item, i) => ({ ...item, slug: slugs[i], category: topics[i] })).filter((item) => (!selected.length || selected.includes(item.category)) && `${item.title} ${item.copy} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <DirectoryLayout active="Guide">
    {chapter ? <div className="guide-article-layout wrap">
      <aside className="guide-article-sidebar" aria-label="Guide resources"><a className="guide-back" href={articleUrl('')} onClick={(event) => navigate(event, '')}>← All guides</a><div className="guide-resource-panel"><h2>Keep a copy for later.</h2><p>The starter PDF brings the everyday essentials together.</p><ArrowLink href={guidePdf} download>Download the PDF</ArrowLink></div><nav className="guide-article-nav" aria-label="More guides"><h2>More useful reading</h2>{chapters.map((item, i) => i !== index && <a key={item.title} href={articleUrl(slugs[i])} onClick={(event) => navigate(event, slugs[i])}>{item.title}</a>)}</nav></aside>
      <article className="guide-article"><h1 ref={heading} tabIndex={-1}>{chapter.title}</h1><p className="guide-article-intro">{chapter.copy}</p><img className="guide-article-photo" src={asset(chapter.image)} alt={chapter.alt} />{sections[index].map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<ArrowLink href={chapter.external ? chapter.link : import.meta.env.BASE_URL + (chapter.link || 'recipes.html')} {...(chapter.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{chapter.linkText || 'Browse recipes'}</ArrowLink></article>
    </div> : <><header className="guide-page-heading wrap"><h1 ref={heading} tabIndex={-1}>Living vegan,<br />your way.</h1><p>Useful starting points for the everyday questions. Take what helps, then find your own rhythm.</p></header>
      <section className="guide-listing wrap" aria-label="Vegan living guides"><aside className="guide-filter-sidebar"><label className="guide-search"><SiteIcon name="search" size={22} /><input type="search" aria-label="Search guides" placeholder="Search guides…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="guide-category-heading"><h2>Category</h2><button type="button" onClick={clear}>Clear</button></div><fieldset className="guide-categories"><legend className="sr-only">Filter guides by category</legend>{topics.map((category) => <label key={category}><input type="checkbox" checked={selected.includes(category)} onChange={() => setSelected((values) => values.includes(category) ? values.filter((value) => value !== category) : [...values, category])} /><span>{category}</span></label>)}</fieldset><p className="guide-results" role="status">Showing {visible.length} of {chapters.length} guides</p><a className="guide-pdf-link" href={guidePdf} download>Download the starter PDF <span aria-hidden="true">↗</span></a></aside><div className="guide-card-grid">{visible.map((item) => <article className="guide-list-card" key={item.slug}><a href={articleUrl(item.slug)} onClick={(event) => navigate(event, item.slug)}><img src={asset(item.image)} alt={item.alt} loading="lazy" /><div><h2>{item.title}</h2><p>{item.copy}</p><span className="guide-card-action">Read guide <span aria-hidden="true">↗</span></span></div></a></article>)}{!visible.length && <div className="guide-empty"><h2>No guides found.</h2><p>Try another search or clear the category filters.</p><button type="button" onClick={clear}>Clear filters</button></div>}</div></section></>}
  </DirectoryLayout>
}
