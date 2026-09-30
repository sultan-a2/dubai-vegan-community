import { useEffect, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { GLOBAL_VERTEBRATES_PER_SECOND } from './impactConstants'

function estimatedToday(now: number) {
  const date = new Date(now)
  const midnightUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return Math.floor(((now - midnightUtc) / 1000) * GLOBAL_VERTEBRATES_PER_SECOND)
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
      <div className="impact-strip-copy"><h2>The number<br />that keeps<br />moving.</h2><p>Behind every choice is a world that does not pause.</p></div>
      <div className="impact-strip-measure"><NumberFlow className="impact-strip-number" value={estimate} format={{ useGrouping: true }} animated={false} aria-label={`${estimate.toLocaleString()} estimated vertebrates killed for food worldwide since midnight UTC`} /><p>Estimated vertebrates killed for food worldwide since midnight UTC.</p></div>
    </div>
    <p className="wrap impact-strip-note">Modelled from a 2018 global production average. This is not a live observation or a count of animals saved by our community. <a href="https://animalcharityevaluators.org/research/reports/dietary-impacts/effects-of-diet-choices/" target="_blank" rel="noopener noreferrer">Source: Animal Charity Evaluators</a></p>
  </div>
}
