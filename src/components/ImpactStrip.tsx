import { useEffect, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { GLOBAL_LAND_ANIMALS_PER_SECOND } from './impactConstants'

function estimatedToday(now: number) {
  const date = new Date(now)
  const midnightUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return Math.floor(((now - midnightUtc) / 1000) * GLOBAL_LAND_ANIMALS_PER_SECOND)
}

export default function ImpactStrip() {
  const [estimate, setEstimate] = useState(() => estimatedToday(Date.now()))

  useEffect(() => {
    const update = () => setEstimate(estimatedToday(Date.now()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return <div className="impact-strip">
    <div className="wrap impact-strip-inner">
      <div className="impact-strip-copy"><h2>The number<br />that keeps<br />moving.</h2><p>A worldwide estimate based on the 2024 annual average.</p></div>
      <div className="impact-strip-measure"><NumberFlow className="impact-strip-number" value={estimate} format={{ useGrouping: true }} animated={false} aria-label={`${estimate.toLocaleString()} estimated land animals slaughtered for meat worldwide since midnight UTC`} /><p>Estimated land animals slaughtered for meat worldwide since midnight UTC.</p></div>
    </div>
    <p className="wrap impact-strip-note">Modelled from 2024 global land-animal slaughter data; it is not a live count. Fish and other uncounted deaths are excluded. <a href="https://ourworldindata.org/grapher/land-animals-slaughtered-for-meat" target="_blank" rel="noopener noreferrer">Source: FAO via Our World in Data</a></p>
  </div>
}
