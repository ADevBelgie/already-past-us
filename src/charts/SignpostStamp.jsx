import { useContext } from 'react'
import { FootnoteContext } from '../components/Footnotes.jsx'
import { DATA_AS_OF_LABEL, decayTier, useDaysSince } from '../lib/dates.js'

/**
 * Section 9: a stamp above the list of signposts. It says when the signposts were written (their
 * wording is fixed from that day and visibly ages), when one was last updated, and how many are
 * open, claimed or resolved. The counts and the last-update date are compiled from the manuscript
 * (scripts/manuscript-plugin.mjs), so adding an update there is the only step.
 */
export default function SignpostStamp() {
  const days = useDaysSince()
  const tier = decayTier(days)
  const { signposts } = useContext(FootnoteContext)
  const counts = signposts?.counts
  return (
    <div className={`stamp stamp--${tier}`} role="note">
      <span className="stamp__dot" aria-hidden="true" />
      <span>
        Written <strong>{DATA_AS_OF_LABEL}</strong>
        {days > 0 && <> · {days} {days === 1 ? 'day' : 'days'} ago</>}
        {signposts?.lastUpdate && <> · Last update <strong>{signposts.lastUpdate}</strong></>}
        {tier === 'warn' && <>. Some of these dates may have passed. Check each source.</>}
        {tier === 'alarm' && <>. Most of these checks have likely been settled. Read this list as a record.</>}
        {counts && (
          <span className="stamp__tally">
            {counts.open} open · {counts.claimed} claimed, not confirmed · {counts.resolved} resolved
          </span>
        )}
      </span>
    </div>
  )
}
