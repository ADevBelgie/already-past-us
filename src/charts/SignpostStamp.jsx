import { DATA_AS_OF_LABEL, decayTier, useDaysSince } from '../lib/dates.js'

/** Section 9: a "last checked" stamp that visibly ages, above the list of signposts. */
export default function SignpostStamp() {
  const days = useDaysSince()
  const tier = decayTier(days)
  return (
    <div className={`stamp stamp--${tier}`} role="note">
      <span className="stamp__dot" aria-hidden="true" />
      <span>
        Last checked <strong>{DATA_AS_OF_LABEL}</strong>
        {days > 0 && <> · {days} {days === 1 ? 'day' : 'days'} ago</>}
        {tier === 'warn' && <>. Some of these dates may have passed; check each source.</>}
        {tier === 'alarm' && <>. Most of these signposts have likely resolved; read this list as a record.</>}
      </span>
    </div>
  )
}
