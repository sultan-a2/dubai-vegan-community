import ArrowLink from './ArrowLink.jsx'

const base = import.meta.env.BASE_URL

export default function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-main"><nav aria-label="Footer navigation"><a href={`${base}about.html`}>Our story</a><a href={`${base}places.html`}>Places to eat</a><a href={`${base}recipes.html`}>Recipes</a><a href={`${base}products.html`}>Vegan products</a><a href={`${base}events.html`}>Gatherings</a><a href={`${base}offers.html`}>Offers</a><a href={`${base}guide.html`}>Vegan guide</a></nav><div className="footer-note"><img src={`${base}assets/logo.png`} alt="" /><p>Good food. Good company. A little more care in how we live.</p><ArrowLink href="#top" direction="up">Back to top</ArrowLink></div></div><a className="footer-wordmark wrap" href="#top" aria-label="Dubai Vegan Community, back to top"><span>Dubai Vegan</span><span>Community<span className="footer-leaf" aria-hidden="true">✳</span></span></a><div className="wrap footer-bottom"><span>© 2026 Dubai Vegan Community</span><span>Made for the curious</span></div></footer>
}
