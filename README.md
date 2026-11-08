# Already Past Us

A data briefing on where AI has overtaken the best humans, where it hasn't, and why "human-level" is the wrong question. Data as of 7 November 2026. Successor to *Measuring the End of Measurement* (July 2026).

## How it fits together

- `already-past-us.md` is the single source of the text. The site renders it directly: sections, footnotes, expert notes and tables all come from this file. Edit the text there, not in components.
- The markdown is compiled at build time, not in the browser: `scripts/manuscript-plugin.mjs` (a Vite plugin) parses the file with `src/lib/manuscript.js` and remark, and serves the result as `virtual:manuscript`; `src/components/Md.jsx` turns that compact tree into React elements. The plugin also serves and emits the raw file at `/already-past-us.md`.
- The production page is pre-rendered: `npm run build` renders `src/entry-server.jsx` to HTML and writes it into `dist/index.html`, and `src/main.jsx` hydrates it. The first render must therefore not read the URL, `localStorage`, media queries or the clock; components read those in `useEffect` after mount (see `useDaysSince` in `src/lib/dates.js`).
- Charts follow the same rule (contract at the top of `src/charts/kit.jsx`): `<Figure>` renders at a fixed first width (`SSR_WIDE` = 960px for wide figures, `SSR_NARROW` = 640px otherwise) and switches to the measured width after mount; chart SVGs carry a viewBox (`svgSize(width, height)`) so they scale to fit until then, and reserve their hydrated height in CSS so hydration does not move the page; layout that changes with width goes in CSS container queries on `.figure__body` (container name `figure`); tooltips use `usePinnableTip()` so hover, focus and tap behave the same everywhere.
- Footnotes start with a provenance tag (`**Verified.**`, `**Vendor-reported.**`, `**Estimate.**` or `**Our calculation.**`). On the site each reference becomes a numbered chip coloured by its tag, with a popover; each section ends with a collapsible list of its sources.
- `<!-- CHART: id | description | data -->` lines mark where charts go. `src/charts/registry.js` maps each id to a component (or `null` when the text or table carries it).
- Expert notes (`> **Expert note: Short label.** ...`) are folded in Brief mode and open in Expert mode (`?mode=expert`). The label is required: plain text in sentence case (no `*`, markdown or footnote refs, since it is shown as-is), at most 60 characters and unique within its section. `npm run check` enforces this.
- The decay banner and the section 9 stamp age visibly from the data date in `src/lib/dates.js`.

## Folders

| Path | What |
|---|---|
| `already-past-us.md` | The manuscript (source of truth) |
| `src/` | React site: `App.jsx`, `components/`, `charts/` (one file per chart + `kit.jsx`), `data/` (chart data, generated) |
| `scripts/check-manuscript.mjs` | Build gate: footnote integrity, tags, anchors, chart ids |
| `scripts/check-chart.mjs` | Compiles one chart in isolation |
| `scripts/manuscript-plugin.mjs` | Build-time manuscript compiler (`virtual:manuscript`) |
| `scripts/build.mjs` | `npm run build` after the manuscript check: client and SSR builds with one shared build stamp, then pre-render and its check |
| `scripts/prerender.mjs`, `scripts/check-prerender.mjs` | Write the server-rendered HTML into `dist/index.html`, then check it holds every section |
| `scripts/data/` | Reproducible scripts that build `src/data/*` from `research/` |
| `public/data/` | Downloadable datasets linked from "Sources and method" |
| `research/` | All research, fact-checks and raw data (start at `research/README.md`) |
| `drafts/` | Section drafts and their open issues |
| `STYLE.md`, `PROPOSAL.md` | Voice rules and the original plan |
| `CHANGELOG-manuscript.md` | Every fact-check and edit applied to the manuscript |

## Commands

```bash
npm install
npm run dev      # http://localhost:5181
npm run check    # manuscript integrity
npm run build    # check, client build, SSR build, pre-render into dist/index.html, pre-render check
```

Review copy for wording feedback: after `npm run build`, `node scripts/review/make-review-page.mjs` writes `review/already-past-us-review.html` (gitignored), the pre-rendered Brief with inlined CSS and fonts and a "Comment on selection" button. It is published as a private claude.ai artifact with the `comments` capability; comments are read back from there.

## Updating the data

1. Edit the figure and its footnote in `already-past-us.md`; keep the provenance tag honest.
2. If a chart uses it, update the research file and re-run the matching script in `scripts/data/`.
3. Move `DATA_AS_OF` in `src/lib/dates.js` and the front-matter date together.
4. `npm run build` must pass before deploying.
