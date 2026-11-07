# Already Past Us: proposal v2 (2026-11-07)

**Title:** Already Past Us
**Subtitle (pick one or adapt):**
- *AI is already beyond the best humans at some things, and still can't hold down a temp job. What the data says, and why "human-level" is the wrong question.*
- *It got cheaper and better faster than almost anyone forecast. Where it has overtaken us, where it hasn't, and what to watch now that AI is helping build AI.*

**Audience:** curious non-specialists. Brief mode is the default; an Expert layer sits one click deeper.
**Evidence base:** `research/` (start at `research/README.md`). Every number in the piece maps to a row in `research/sources.csv`.

## The argument in five sentences
1. Most people judge AI from free models and old impressions, and even professional forecasters gave what actually happened about 10% odds.
2. Measured like for like, AI got ~17x cheaper at the same capability in a year, and much better at the same price.
3. On narrow, checkable tasks it is now beyond the best humans: contest programming, research math, weather. Yet the best agent completes only ~1 in 5 real freelance jobs.
4. That unevenness is why "has it reached human level?" is the wrong question. Even the people selling AGI can't agree what it means.
5. The thing to watch now is AI speeding up AI research. It is measurable (METR: ~1.9x at Anthropic, using private data) but still human-steered, and the "models edit their own weights" story is not what it sounds like.

The title is literal, not hype: *already past us* in places most people never look, and *not past us* in plenty of others. Every section shows both.

## Outline

| # | Section | What the reader gets | Signature visual | Main evidence |
|---|---|---|---|---|
| 0 | **Opening** | Three facts side by side: AI beat every human team at the 2025 programming world finals (12/12 vs 11); an AI disproved a 1946 Erdős conjecture, vetted by leading mathematicians; the best AI agent still fails ~4 in 5 real freelance jobs. | Three stat cards | `r1-superhuman`, `r2-backlog_a` (RLI) |
| 1 | **The overtake you didn't see** | Why it doesn't feel this way: only ~18% of people pay for AI; the public rates AI worse than people at every task asked about; forecasters' 2022 odds for what happened averaged 9.7%. Then the counterweight: productivity studies are small or null (METR developer RCT, Danish data). | Forecast vs actual dumbbell chart | `r1-perception` |
| 2 | **Cheaper and better, measured fairly** | Same capability for less money, and more capability for the same money. Shown as the frontier 12 months ago, 6 months ago and today. Cost per task (Epoch ~13x/yr) as a second view. | **Three-snapshot frontier chart** (interactive: slide or toggle snapshots, hover models) | `r2-frontier_epoch`, `r2-frontier_aa`, `r1-cost` |
| 3 | **How fast, and is it speeding up?** | METR horizons from 4 minutes to ≥16 hours; the 2024 step-up; the ruler snapping above 16h; the private-data 1.9x finding and why it can't yet be checked from outside. | **METR curve** with the "can't measure here" band | `r1-metr`, `r2-metr_accel` |
| 4 | **The jagged map** | Domain by domain, from "far below humans" to "beyond the best humans", with each dot coloured by evidence quality (official / peer-reviewed / vendor-reported). | **Jagged-frontier dot plot** | `r1-superhuman`, `r2-backlog_b` |
| 5 | **Why "human-level" is the wrong question** | The AGI definitions disagree. The Microsoft–OpenAI AGI clause stopped mattering. "Welcome to the AGI era" (Brockman). Better yardsticks: task by task, human-relative. | Small table: four AGI definitions, four different tests | `r1-agi_metric` |
| 6 | **AI building AI** | A dashboard of 6–8 indicators: independent first (METR, Epoch), then lab self-reports (code share, internal task success, agent-workdays), clearly labelled. Formal thresholds not yet crossed; Anthropic's IPO filing says it "may imminently" be. | **RSI dashboard** (small multiples, "who measured this" tags) | `r2-rsi_series`, `r1-rsi` |
| 7 | **"Models are editing their own weights"?** | Myth vs reality: the four families of weight-modifying work, what the MIT result actually showed, the replications and the critics. | Four-family matrix (self/other × gradient/direct) | `r2-selfweights_landscape`, `r1-selfweights` |
| 8 | **Report card** | Grading the July brief in public: direction right, too conservative, three figures misdescribed. | Graded table | `r1-scorecard` |
| 9 | **What to watch** | 8–10 dated signposts with "last checked" stamps. Each marks what would show the overtake spreading, or stalling. | Signpost list + decay banner | all |

Target length: ~4,000 words in Brief mode, plus Expert notes.

## Design direction
- **Editorial, not dashboard.** Warm paper background, a serif display face, an ink palette with one accent colour (a burnt orange, as in the preview chart), and a real dark mode.
- **A source tag on every number:** *Verified*, *Vendor-reported*, *Estimate* or *Our calculation*, linking to the source. This is the provenance idea from Measurement, made readable.
- **Four signature charts** (sections 2, 3, 4, 6). Each must teach something; no decorative charts.
- **The decay banner returns.** It shows "data as of 7 Nov 2026" and ages visibly. This time it gets an actual update plan behind it.
- **Lessons from the review:** Brief mode is the default, every §-reference is a link, no prose about the model's internal calibration, real OG image and favicon, sources linked (never `url: null`).

## Before drafting
1. Download and parse two public files locally to re-verify the numbers that were only read through a fetch tool:
   - `epoch.ai/data/eci_scores.csv` (CC-BY)
   - `metr.org/assets/benchmark_results_1_1.yaml` (~16 KB)
2. Add historical list prices for each snapshot date (the preview uses today's prices).
3. Draft `already-past-us.md` as the source document, then build the site from it.
