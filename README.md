# Already Past Us

A data briefing on where AI has overtaken the best humans, where it hasn't, and why "human-level" is the wrong question. Data as of 7 November 2026. Successor to *Measuring the End of Measurement* (July 2026).

## How it fits together

- `already-past-us.md` is the single source of the text. The site renders it directly: sections, footnotes, expert notes and tables all come from this file. Edit the text there, not in components.
- Footnotes start with a provenance tag (`**Verified.**`, `**Vendor-reported.**`, `**Estimate.**` or `**Our calculation.**`). On the site each reference becomes a numbered chip coloured by its tag, with a popover; each section ends with a collapsible list of its sources.
- `<!-- CHART: id | description | data -->` lines mark where charts go. `src/charts/registry.js` maps each id to a component (or `null` when the text or table carries it).
- Expert notes (`> **Expert note:** ...`) are folded in Brief mode and open in Expert mode (`?mode=expert`).
- The decay banner and the section 9 stamp age visibly from the data date in `src/lib/dates.js`.

## Folders

| Path | What |
|---|---|
| `already-past-us.md` | The manuscript (source of truth) |
| `src/` | React site: `App.jsx`, `components/`, `charts/` (one file per chart + `kit.jsx`), `data/` (chart data, generated) |
| `scripts/check-manuscript.mjs` | Build gate: footnote integrity, tags, anchors, chart ids |
| `scripts/check-chart.mjs` | Compiles one chart in isolation |
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
npm run build    # check + production build to dist/
```

## Updating the data

1. Edit the figure and its footnote in `already-past-us.md`; keep the provenance tag honest.
2. If a chart uses it, update the research file and re-run the matching script in `scripts/data/`.
3. Move `DATA_AS_OF` in `src/lib/dates.js` and the front-matter date together.
4. `npm run build` must pass before deploying.
