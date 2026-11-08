import { useEffect, useState } from 'react'

// The briefing's data date and its visible ageing ("decay"), shared by the banner and section 9.
export const DATA_AS_OF = '2026-11-07'
export const DATA_AS_OF_LABEL = '7 November 2026'

export function daysSince(iso = DATA_AS_OF, now = Date.now()) {
  return Math.max(0, Math.floor((now - Date.parse(iso + 'T00:00:00Z')) / 86400000))
}

// Leaderboards move every few weeks; after ~3 months many figures here will be stale,
// after ~8 months treat leaderboard numbers as historical.
export function decayTier(days) {
  if (days >= 240) return 'alarm'
  if (days >= 90) return 'warn'
  return 'calm'
}

/**
 * Days since the data date, for rendering. It is 0 on the first render (which must match the
 * pre-rendered HTML, built on another day) and becomes the real value right after mount.
 */
export function useDaysSince() {
  const [days, setDays] = useState(0)
  useEffect(() => { setDays(daysSince()) }, [])
  return days
}
