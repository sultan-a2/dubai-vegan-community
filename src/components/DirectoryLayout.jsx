import { PlantCursor } from './EditorialMotion.jsx'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'

export default function DirectoryLayout({ active, children }) {
  return <>
    <PlantCursor />
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" aria-hidden="true" />
    <SiteHeader active={active} />
    <main id="main">{children}</main>
    <SiteFooter />
  </>
}
