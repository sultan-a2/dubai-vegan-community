import { useState } from 'react'
import NumberFlow from '@number-flow/react'
import { ANIMALS_PER_YEAR, CO2E_TONNES_PER_YEAR, DURATIONS, FREQUENCIES, WATER_LITRES_PER_YEAR } from './impactConstants'

type FrequencyId = typeof FREQUENCIES[number]['id']
export default function ImpactQuiz() {
  const [frequency, setFrequency] = useState<FrequencyId>('full')
  const [duration, setDuration] = useState(1)
  const [customYears, setCustomYears] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [step, setStep] = useState<'frequency' | 'duration' | 'results'>('frequency')
  const selectedYears = isCustom ? Number(customYears) : duration
  const validYears = Number.isInteger(selectedYears) && selectedYears >= 1 && selectedYears <= 120
  const multiplier = FREQUENCIES.find((item) => item.id === frequency)!.multiplier * (validYears ? selectedYears : 0)
  const daysPerWeek = frequency === 'full' ? 7 : frequency === 'three' ? 3 : 1

  return <section className="impact-quiz wrap" aria-labelledby="impact-quiz-title">
    <div className="impact-quiz-intro">
      <h2 id="impact-quiz-title">Explore the impact of eating plant-based.</h2>
      <p>Choose how often you would eat plant-based to see a rough estimate based on published diet comparisons.</p>
    </div>
    <div className="impact-quiz-panel">
      {step === 'frequency' && <>
        <fieldset><legend>How often would you eat plant-based?</legend><div className="impact-options">{FREQUENCIES.map((item) => <button type="button" key={item.id} className={frequency === item.id ? 'selected' : ''} aria-pressed={frequency === item.id} onClick={() => setFrequency(item.id)}>{item.label}</button>)}</div></fieldset>
        <div className="impact-week" role="img" aria-label={`${daysPerWeek} of 7 days plant-based each week`}><span aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} className={index < daysPerWeek ? 'filled' : ''} />)}</span><small aria-hidden="true">{daysPerWeek === 7 ? 'Every day' : `${daysPerWeek} ${daysPerWeek === 1 ? 'day' : 'days'} in a week`}</small></div>
        <button type="button" className="impact-next" onClick={() => setStep('duration')}>Continue</button>
      </>}
      {step === 'duration' && <>
        <fieldset><legend>For how long?</legend><div className="impact-options">{DURATIONS.map((years) => <button type="button" key={years} className={!isCustom && duration === years ? 'selected' : ''} aria-pressed={!isCustom && duration === years} onClick={() => { setDuration(years); setIsCustom(false) }}>{years} {years === 1 ? 'year' : 'years'}</button>)}<button type="button" className={isCustom ? 'selected' : ''} aria-pressed={isCustom} onClick={() => setIsCustom(true)}>Choose years</button></div>{isCustom && <label className="impact-custom-years">Number of years<input type="number" min="1" max="120" step="1" inputMode="numeric" value={customYears} onChange={(event) => setCustomYears(event.target.value)} aria-describedby="impact-years-help" autoFocus /><small id="impact-years-help">Enter a whole number from 1 to 120.</small></label>}</fieldset>
        <div className="impact-quiz-actions"><button type="button" className="impact-back" onClick={() => setStep('frequency')}>Back</button><button type="button" className="impact-next" disabled={!validYears} onClick={() => setStep('results')}>See my impact</button></div>
      </>}
      {step === 'results' && <>
        <div className="impact-result-heading"><p>Modelled estimate for {FREQUENCIES.find((item) => item.id === frequency)?.label.toLowerCase()} over {selectedYears} {selectedYears === 1 ? 'year' : 'years'}</p><button type="button" onClick={() => setStep('frequency')}>Change choices</button></div>
        <div className="impact-result-grid">
          <div><NumberFlow value={Math.round(ANIMALS_PER_YEAR * multiplier)} /><span>vertebrates potentially spared</span></div>
          <div><NumberFlow value={Number((CO2E_TONNES_PER_YEAR * multiplier).toFixed(1))} format={{ maximumFractionDigits: 1 }} /><span>tonnes of CO₂e difference</span></div>
          <div><NumberFlow value={Math.round(WATER_LITRES_PER_YEAR * multiplier)} format={{ useGrouping: true }} /><span>litres of water difference</span></div>
        </div>
      </>}
    </div>
    <p className="impact-source-note">A rough guide, not a personal tally. It scales published yearly comparisons by your chosen days and years. Real diets vary. Sources: <a href="https://animalcharityevaluators.org/research/reports/dietary-impacts/effects-of-diet-choices/" target="_blank" rel="noopener noreferrer">Animal Charity Evaluators</a> and <a href="https://www.nature.com/articles/s43016-023-00795-w" target="_blank" rel="noopener noreferrer">Scarborough et al. (2023)</a>.</p>
  </section>
}
