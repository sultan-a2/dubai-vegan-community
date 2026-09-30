/**
 * Models for an editorial explainer, not live observations or individual outcomes.
 * FAO-derived 2024 data: about 87.9 billion land animals slaughtered for meat worldwide.
 * https://ourworldindata.org/grapher/land-animals-slaughtered-for-meat
 */
export const GLOBAL_LAND_ANIMALS_PER_YEAR = 87_900_000_000
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60
export const GLOBAL_LAND_ANIMALS_PER_SECOND = GLOBAL_LAND_ANIMALS_PER_YEAR / SECONDS_PER_YEAR

/** ACE's 2018 global production model: rough vertebrates spared per plant-based person-year. */
export const ANIMALS_PER_YEAR = 105

/** Scarborough et al., Nature Food 2023: UK high-meat vs vegan diet-group averages.
 * 10.24 - 2.47 kg CO₂e/day ≈ 2.8 t/year; water difference 480 L/day ≈ 175,000 L/year.
 * https://www.nature.com/articles/s43016-023-00795-w
 */
export const CO2E_TONNES_PER_YEAR = 2.8
export const WATER_LITRES_PER_YEAR = 175_000

export const FREQUENCIES = [
  { id: 'full', label: 'Full plant-based', multiplier: 1 },
  { id: 'three', label: '3× a week', multiplier: 3 / 7 },
  { id: 'one', label: '1× a week', multiplier: 1 / 7 },
] as const

export const DURATIONS = [1, 5, 10] as const
