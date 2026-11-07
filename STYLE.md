# Style guide: Already Past Us

## Reader
A curious, smart non-specialist: a manager, a teacher, a policy aide, a parent who uses ChatGPT's free tier. They know what ChatGPT is. They do not know what a benchmark, a token or a "time horizon" is until we explain it in one plain sentence.

## Voice
- Plain, concrete, calm. Short sentences. One idea per paragraph.
- Show both sides in every section. The title is literal: AI is past us in some places and not in others.
- Use concrete comparisons, such as "the 2025 programming world finals", "a task that takes a skilled person a full working day" or "the price of a coffee per million words".
- Say what we don't know, plainly.

## Banned
- Coined jargon and capitalised concept names ("the Action Moat", "the Silence", "Barbell Economy"). If an existing term is needed (benchmark, time horizon), define it once.
- "It's not X, it's Y" / "X isn't just A. It's B." reversals. Triads used for rhythm. Bolded slogans. Rhetorical questions as section openers.
- Heavy em-dash asides: at most one per paragraph.
- Hype words: revolutionary, unprecedented, game-changer, staggering, explosion, superintelligence (unless quoting).
- Hedges that say nothing: "arguably", "it could be said".
- Prose about our own methodology's internal calibration.

## Numbers and sources
- Every number gets a footnote. Footnote ids are unique and prefixed with the section number, e.g. `[^s2-cheaper]`.
- Each footnote starts with exactly one provenance tag in bold, then the source title, date and URL:
  - **Verified**: an independent organisation measured it (METR, Epoch, ARC Prize verified, Scale leaderboard, peer-reviewed paper, government data).
  - **Vendor-reported**: the company that makes the model says so.
  - **Estimate**: a forecast or modelled estimate by a named party.
  - **Our calculation**: we computed it from cited data; say from what.
- Round sensibly for a broad reader ("about 17 times cheaper"), keeping exact values in the footnote.
- Never present vendor-reported numbers as independent. Never use a number whose fact-check verdict is "unsupported". Use the corrected value where the verdict is "corrected".
- Dates: write "November 2026", not "Q4". Give "as of" dates for leaderboard numbers.

## Format
- Markdown. `##` for the section heading, `###` sparingly.
- Brief text is the main body. Optional "Expert note" blocks go in `> **Expert note:** ...` blockquotes and are hidden by default on the site.
- Chart placeholders: `<!-- CHART: id | one-line description | data file -->`.
