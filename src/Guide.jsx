import DirectoryLayout from './components/DirectoryLayout.jsx'
import ArrowLink from './components/ArrowLink.jsx'
import { GradientWaveText } from './components/MotionBits.jsx'

const asset = (name) => import.meta.env.BASE_URL + 'assets/' + name
const guidePdf = import.meta.env.BASE_URL + 'guides/vegan-dubai-starter-guide.pdf'

const chapters = [
  { title: 'Your first week, made easier.', copy: 'Begin with meals you already like. A few dependable ingredients and one nearby place to eat can take the pressure off your first week.', image: 'community/cafe-table.jpg', alt: 'Friends sharing food at a café' },
  { title: 'Eating out with confidence.', copy: 'A quick question about sauces, stock, dairy or eggs can make an unfamiliar menu easier to navigate. Our places guide is another good starting point.', image: 'community/cafe-wide.jpg', alt: 'Community members eating together at a café', link: 'places.html', linkText: 'Find a place' },
  { title: 'A better way to read labels.', copy: 'Look beyond the front of the pack. Ingredients can differ between flavours and change over time, so check the exact product you are holding.', image: 'community/conversation.jpg', alt: 'Community members looking at a phone together', link: 'products.html', linkText: 'Explore products' },
  { title: 'Nutrition worth planning.', copy: 'A varied vegan diet needs a reliable source of vitamin B12. For personal nutrition needs, speak with a qualified clinician or dietitian.', image: 'community/evening-dinner.jpg', alt: 'Community members sharing a meal', link: 'https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet/', linkText: 'Read the NHS vegan diet guide', external: true },
]

export default function Guide() {
  return <DirectoryLayout active="Guide">
    <section className="guide-hero wrap"><div><h1>Living vegan,<br />your way.</h1><p>Useful starting points for the everyday questions. Take what helps, then find your own rhythm.</p><ArrowLink href={guidePdf} download>Keep the starter PDF</ArrowLink></div><div className="guide-hero-image"><img src={asset('community/table-group.jpg')} alt="Dubai Vegan Community members at a shared table" /><span><GradientWaveText>Good questions deserve useful answers.</GradientWaveText></span></div></section>
    <section className="guide-chapters wrap" aria-label="Vegan living guides">{chapters.map((chapter) => <article className="guide-chapter" key={chapter.title}><img src={asset(chapter.image)} alt={chapter.alt} loading="lazy" /><div><h2>{chapter.title}</h2><p>{chapter.copy}</p>{chapter.link && <ArrowLink href={chapter.external ? chapter.link : import.meta.env.BASE_URL + chapter.link} {...(chapter.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{chapter.linkText}</ArrowLink>}</div></article>)}</section>
  </DirectoryLayout>
}
