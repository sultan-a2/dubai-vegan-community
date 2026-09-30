import { ParallaxImage, Signature } from './components/MotionBits.jsx'
import { PlantCursor, ScrollFillText, RevealFrame } from './components/EditorialMotion.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name

const chapters = [
  { title: 'A way of seeing.', image: 'community/kind-group.jpg', alt: 'Community group beside a Be Kind to All Kinds sign', text: 'Veganism begins with a simple idea: animals are more than ingredients or materials. It asks us to avoid their exploitation as far as possible and practicable. Food is often the first place that idea becomes visible.', source: 'The Vegan Society', url: 'https://www.vegansociety.com/go-vegan/definition-veganism' },
  { title: 'The next meal.', image: 'community/friends-brunch.jpg', alt: 'Friends sharing a meal together', text: 'No grand reinvention is required to try. A familiar lentil curry, a bowl of noodles, a place with a fully vegan menu: one useful choice makes the next one easier.' },
  { title: 'A lighter footprint.', image: 'community/cycling.jpg', alt: 'Community cycling group outdoors', text: 'In a large UK study, vegan diets had substantially lower average greenhouse gas emissions, land use and water use than high-meat diets. That is a group comparison, not a guarantee for any one person in Dubai.', source: 'Scarborough et al., Nature Food (2023)', url: 'https://www.nature.com/articles/s43016-023-00795-w' },
  { title: 'Made with people.', image: 'community/table-selfie.jpg', alt: 'Community members around a restaurant table', text: 'Here in Dubai, a good guide should make it easier to find food, ask questions and meet others. This community is still growing. Its best stories will come from the people who choose to share them.' },
]

export default function About() {
  return <>
    <PlantCursor />
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" aria-hidden="true" />
    <SiteHeader active="Our story" />
    <main id="main">
      <section className="about-hero wrap"><h1>It starts with<br /><span>a question.</span></h1><div className="about-hero-side"><p>What if we made a little more room for animals, the planet and each other in everyday life?</p><Signature text="come as you are" /></div><ParallaxImage className="about-hero-image" src={asset('community/dinner-table.jpg')} alt="Community members sharing dinner around a table" /></section>
      <section className="about-statement wrap"><ScrollFillText>Being vegan is a way to practise care, one ordinary decision at a time.</ScrollFillText></section>
      <section className="about-timeline wrap" aria-label="What vegan living means"><div className="about-path" aria-hidden="true"><svg viewBox="0 0 80 1240" preserveAspectRatio="none"><path d="M40 0C80 115 4 182 40 310S77 483 40 620 4 791 40 930 78 1080 40 1240" /></svg></div>{chapters.map((chapter, index) => <article className={`about-chapter about-chapter-${index + 1}`} key={chapter.title}><RevealFrame className="about-chapter-image"><ParallaxImage src={asset(chapter.image)} alt={chapter.alt} /></RevealFrame><div className="about-chapter-copy"><h2>{chapter.title}</h2><p>{chapter.text}</p>{chapter.source && <ArrowLink href={chapter.url} target="_blank" rel="noopener noreferrer">Read: {chapter.source}</ArrowLink>}</div></article>)}</section>
      <section className="about-pause"><div className="wrap"><img className="about-garden-art" src={asset('community/friends-three.jpg')} alt="Three friends sitting together at a café" loading="lazy" /><div className="about-pause-copy"><h2>There is no perfect starting point.</h2><p>Try one meal. Ask one question. Find one person to share a table with.</p></div></div></section>
      <section className="about-close wrap"><h2>We’ll meet you<br />where you are.</h2><div className="about-close-copy"><p>Start with a meal, find a place you like, or come along to a gathering. Take what helps and go at your own pace.</p><ArrowLink href={`${import.meta.env.BASE_URL}guide.html`}>Explore the guide</ArrowLink></div></section>
    </main>
    <SiteFooter />
  </>
}
