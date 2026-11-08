# Research: Already Past Us (Nov 2026)

This folder holds everything gathered for the next briefing. Compiled 2026-11-07 across two rounds. Each topic had one researcher and one independent fact-checker; round 2 also had two backlog fact-checkers.

## How to read this folder

| Path | What it is |
|---|---|
| `topics/r1-*.md` | Round 1, eight topics: METR horizons, cost, superhuman domains, perception gap, the AGI yardstick, RSI, the weight-editing news, and the scorecard for the July brief |
| `topics/r2-*.md` | Round 2: the price/capability frontier (Epoch and Artificial Analysis), METR's Anthropic acceleration report, RSI time series, the weight-editing landscape, and two backlog verifications |
| `sources.csv` | Every cited URL (327 unique), with source type, topic and an example claim |
| `data/frontier_epoch.csv` | 76 models with release date, Epoch Capabilities Index (ECI) score, list prices and a 3:1 blended price |
| `data/frontier_aa.csv` | 53 models: ECI paired with prices from Artificial Analysis (a cross-check) |
| `data/rsi_series.csv` | Dated points for 12 "AI improving AI" indicators, each marked as independently measured or lab-reported |
| `data/frontier_preview.png` | Rough preview of the three-snapshot frontier chart |
| `data/r1_research_data.json`, `data/r2_research_data.json` | Full raw outputs, including every fact-check verdict |
| `dossier.md` | Round 1 as one long file (the same content as `topics/r1-*`) |
| `background/earlier-sites-review.md` | Review notes on the five earlier sites (kept local, not in the repo) |

**Rule:** in the topic files, a fact-checker's verdict of *corrected*, *unsupported* or *conflicting* overrides the researcher's finding. Every figure was read through a fetch tool, not parsed locally. Before publishing, download the key files (`epoch.ai/data/eci_scores.csv`, METR's `benchmark_results_1_1.yaml`) and recheck them.

## Key conclusions after round 2

### 1. Cheaper and better, measured like for like (`r2-frontier_*`)
- **Metric:** use the Epoch Capabilities Index. It puts about 150 models from 2025-26 on one scale (GPT-5 = 150). The Artificial Analysis index **can't** be used, because it changed version roughly ten times this year and no longer scores 2025 models.
- **Same capability, cheaper:** the cheapest GPT-5-level model (ECI ≥150) cost $3.44 per million tokens in Nov 2025, $1.13 in May 2026 (Gemini 3 Flash) and $0.20 now (GPT-6 Luna or Claude Haiku 5.5). That is **about 17x cheaper in a year** at list price.
- **Same price, better:** at ≤$4 blended, the best ECI went 150.0 → ~152 (a tie between Gemini 3 Flash and Grok 4.20) → 168.9 (GPT-6.1 Sol). At ≤$0.25 it went 140.2 → 146.9 → 160.2.
- **Correction to my earlier claim that "the best AI is getting more expensive":** on this data, that was true only from Nov 2025 to May 2026, and only through the Pro tiers ($41 to $67.50 blended). It is false today: the top model, GPT-6 Astra, is $20 blended. The finding that frontier performance costs 3-18x more each year (Gundlach et al.) uses a different measure. Google's "doubling" applies only to Gemini 4 Argon and ends a launch price that was announced as introductory.
- **Caveats:**
  - Per-token prices ignore how many tokens a model uses. Artificial Analysis shows a 10x cost spread between the effort settings of a single model.
  - Claude 4.7+ uses about 30% more tokens for the same text.
  - The preview uses today's list prices for every snapshot. Historical prices still need adding (e.g. o3 was $10/$40 before June 2025).
- **Cost per task:** Epoch's "plunging price of thought" (cost per question at fixed accuracy, ~13x per year) is a separate measure. Show it on its own chart. Its data is public at github.com/droodman/inference-cost.

### 2. Is progress accelerating? (`r2-metr_accel`)
My earlier line, "public data doesn't show it speeding up again", was incomplete. Corrected framing:
- **Public METR time horizons:** clear speed-up in 2024 (doubling 196 → 131 → 89 days as the fit window narrows). This data can't confirm or rule out a further 2025-26 speed-up: the suite saturates above 16h, GPT-5.6 Sol's score isn't robust, and the page has been frozen since 8 Sep.
- **Public Epoch ECI:** one acceleration, with reasoning models in 2024. After that the trend is roughly linear at ~14 points/yr. Epoch didn't test for a second break.
- **METR's 5 Nov 2026 report, built on private Anthropic data:** this is the strong evidence. A breakpoint on 7 Oct 2025 takes Anthropic from about +15 to about +29 points/yr: **1.9x** (95% CI 1.5-2.8x; robustness checks 1.1-2.9x). Across all developers the figure is **1.4x**. About 80% is guessed to come from AI itself. METR found "no convincing bottlenecks" for the next 12 months. Anthropic redacted most of the evidence METR found most informative.

### 3. Measuring RSI progress (`r2-rsi_series`, `data/rsi_series.csv`)
There are 12 indicators with 3+ dated points, in three tiers:
- **Independent:** METR time horizons, Epoch ECI, MLE-bench. MLE-bench is only semi-independent and its leaderboard is frozen.
- **Independent analysis of lab data:** METR on Anthropic.
- **Lab self-reports:**
  - share of code written by AI: Google 25% (Oct 2024) → 75% (Apr 2026); Anthropic >80% (May 2026)
  - Anthropic's internal open-ended task success: ~26% → 76% → 91%
  - Anthropic training-optimisation speedups: 3x → 52x
  - OpenAI agent-workdays per human workday: 3.1 by mid-Aug 2026

**Don't** draw one line through different companies' code-share metrics, or join the different poll instruments into one series. One claim, GPT-6 Astra's "Research Debugging 78.05%", couldn't be found anywhere; treat it as fabricated.

### 4. Has anyone else tried weight editing? (`r2-selfweights_landscape`)
Yes, in four separate families:
1. **Gradient self-training on self-generated data:** the model really does update its *own* weights. STaR, Self-Rewarding LMs, SEAL (2025), MASS (Oct 2026).
2. **Learned weight generators:** Text-to-LoRA, Drag-and-Drop LLMs.
3. **Direct edits to another model's weights:** ROME/MEMIT, abliteration, and now LLM-written edits (MIT, 2 Nov).
4. **Code-level self-modification:** Darwin Gödel Machine, AlphaEvolve.

Since 2 Nov:
- Willison partly reproduced the MIT work.
- Goedecke and Honnibal criticised it.
- Krentsel's rerun found it works only on the newest models. This comes via secondary coverage of an X chart.
- A Zhihu reconstruction says 576 of 579 fixed answers had been truncated. This comes via Latent Space.
- "WeightLoop", a citation from round 1, **does not exist**.

The ~1% recall after 20 sequential writes result is real (arXiv 2607.11020), but its NeurIPS venue is unverified. FutureSearch puts its median for weekly weight updates at Jan 2033. No frontier chat model updates its weights from live use.

### 5. Backlog, now resolved (`r2-backlog_a`, `r2-backlog_b`)
**Confirmed:**
- Big-four 2026 capex: **~$720-740B**. The bases are mixed (finance leases vs cash).
- Brockman: "Welcome to the AGI era." The longer line is a paraphrase.
- OpenAI research-intern metrics (vendor-reported, via secondary coverage).
- Opus 5.5 CoBench 55.8% vs a ~85% line (from secondary summaries).
- RLI: 21.25% top, a statistical tie with Astra at 20.83%; it was 2.5% at launch.
- GDPval: GPT-5.5 84.9% (vendor-reported).
- Pakistan RCT: the 11.5 pp result is an exploratory secondary analysis.
- ARC-AGI-1: $4,560 → $0.30 per task at 87.5%. The o3 cost is a retroactive estimate.
- Epoch: 13x per year.

**Corrected:**
- Huang's "AGI has arrived" post wasn't tied to the 99.9% score.
- NHC's official report says the DeepMind hurricane model "slightly outperformed" official track forecasts.

**Unsupported, drop:**
- IMO "officially graded". This rests only on Xiaohongshu's own statement.
- ARC-AGI-2 ~90% at $0.44.
- Artificial Analysis "21 → 58 at 11x".

## Local verification (2026-11-07)
Two files were downloaded into `data/raw/` and parsed locally. Results are in `data/verification_local.txt`.
- **`eci_scores.csv`** (Epoch, 253 rows, 150 from 2025 on): all 76 rows of `frontier_epoch.csv` match exactly (score and date). `frontier_aa.csv` has 8 small issues: different release dates from AA, and models named differently or missing from ECI. **Use `frontier_epoch.csv` as the primary dataset.**
- **`metr_benchmark_results_1_1.yaml`** (METR TH1.1): the per-model p50 and p80 values match the research. Our own OLS refit on SOTA points ≤16h gives doubling times of 260 days (2019–2023), 129 (2023+), 105 (2024+) and 121 (2025+). The file's own stated values are 187.8 days all-time stitched and 128.7 days from 2023 (CI 104–158). Per-model points are in `data/metr_points.json`.

## Historical prices (2026-11-07, round 3)
`data/price_history.json` holds the first-party list price in effect on each snapshot date (2025-11-07, 2026-05-07, 2026-11-07) for the 25 frontier models, with sources and confidence. OpenAI and Anthropic prices have not changed since launch. Changes that matter: Grok 4 Fast retired 2026-05-15; Gemini 3 Pro Preview shut down 2026-03-09; Grok 4.20 launched at $2/$6 and was cut to $1.25/$2.50 (date unknown); DeepSeek-V4-Flash launched at $0.14/$0.28, gained peak pricing 2026-08-16 and is now retired; Gemini 4 Argon's $2/$10 is introductory until 2026-11-30.

`data/frontier_snapshots.csv` is the chart dataset: one row per (snapshot, model available on that date) with the price in effect then. Recomputed headlines, **unchanged** by the historical adjustment:
- Cheapest at ECI ≥150: GPT-5 $3.44 → Gemini 3 Flash $1.125 → GPT-6 Luna / Claude Haiku 5.5 $0.20 (about 17x in 12 months).
- Best ECI at ≤$4 blended: GPT-5 150.0 → Grok 4.20 152.27 at its $2/$6 launch price ($3.00 blended; Gemini 3 Flash 152.25 is a tie) → GPT-6.1 Sol 168.94.
- Best ECI at ≤$0.25: gpt-oss-120b 140.2 (host price unverified; GPT-5 nano 139.2 otherwise) → DeepSeek-V4-Flash 146.9 → Claude Haiku 5.5 160.2.
- Top model: GPT-5 Pro 151.15 at $41.25 → GPT-5.5 Pro 162.67 at $67.50 → GPT-6 Astra 169.07 at $20.

## Open-weight host prices (2026-11-08)
DeepSeek retired its own DeepSeek-V4-Flash endpoint, so the first version of the November 2026 snapshot dropped the model and the low end of "today's" frontier fell below May's, even though the open-weight model is still widely hosted. The rule is now: first-party list price when the maker serves the model; otherwise, for open-weight models, the cheapest reputable host's standard-tier price checked on the host's own page (as already done for gpt-oss-120b). Checked and independently verified on 2026-11-08: DeepSeek-V4-Flash at DeepInfra $0.09/$0.18 (FP8; $0.1125 blended), DeepSeek-V3.2 at $0.26/$0.38 (AtlasCloud fp8 via OpenRouter; DeepInfra same price, fp4). `scripts/data/make_frontier_snapshots.py` now builds `data/frontier_snapshots.csv` and asserts that no still-available model makes a later frontier fall below an earlier one. Headline figures are unchanged.
