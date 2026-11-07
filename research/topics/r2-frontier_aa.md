# Price-capability frontier: Artificial Analysis and others

Research round r2, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

Main conclusion: the Artificial Analysis (AA) Intelligence Index can't be the one consistent metric for the three snapshots (2025-11-07, 2026-05-07, 2026-11-07). The index went through v3.0 (Sep 2025), v4.0 (Jan 2026), v4.1 to v4.3.2 (Jun to Oct 2026), v5.0 (27 Oct 2026) and v5.0.1 (Nov 2026). AA's methodology page says scores are only comparable within a version. Today the live AA pages show only v5.0.1, which covers roughly Mar 2026 onward. GPT-5, Gemini 3 Pro, Claude Opus 4.5, GPT-5.2 and DeepSeek V3.2 all show 'N/A'. I could not fetch archived AA leaderboards because web.archive.org is blocked for the fetch tool.

The best consistent capability scale I found is Epoch AI's Capabilities Index (ECI). Epoch's CSV (updated 2026-11-07) scores every model from GPT-4.1/o3-era 2025 releases through GPT-6.1 Terra (2026-10-26) on one statistically stitched scale, with 95% confidence intervals. I paired ECI with list input/output prices taken from each model's AA page. I computed my own blended price at a 3:1 input:output ratio. AA's displayed 'blended' figure now uses a 7:2:1 cache-hit:input:output ratio, so I did not use it.

Result: 55 models from OpenAI, Anthropic, Google, xAI, DeepSeek, Moonshot, Zhipu/Z.ai and Alibaba. Meta and Mistral models have ECI scores, but I fetched no prices for them.

Rough frontier read-out from this data (my own calculation; check before publishing):
- **Equal capability:** in Nov 2025, GPT-5 scored ECI 150.0 at $3.44 blended. By May 2026, Gemini 3 Flash scored 152.25 at $1.125. By Nov 2026, DeepSeek V4 Flash 0731 scored 154.34 at $0.175 (open weights). That is about 20x cheaper per token in 12 months.
- **Equal price (at or under about $3.50 blended):** the best score rose from 150.0 (GPT-5, Nov 2025) to 152.25 (Gemini 3 Flash, May 2026) to 167.82 (GPT-6.1 Terra at $2.00, Nov 2026).
- **Cheapest tier:** Claude Haiku 5.5 ($0.10/$0.50 per million tokens, ECI 160.22) now beats GPT-5.5 from April 2026 (ECI 160.04 at $11.25 blended).
- **Top of the market:** the top price point is still high. GPT-6 Astra is $10/$50 per million tokens (ECI 169.07), and Claude Fable 5 is $10/$50.

Big caveat: per-token prices leave out how many tokens each model uses. AA's per-task cost figures show cost varying 10x or more between reasoning settings of the same model (Claude Opus 5.5: $0.98 at low effort, $10.04 at max). So per-token Pareto charts should be labelled 'list price', or cross-checked with AA cost-per-task inside v5 only.

Existing analyses to cite:
- **Epoch, 'The plunging price of thought' (Emberson & Roodman, 2026-09-22):** cost to reach a fixed score falls 47% per quarter, about 13x per year. The method counts reasoning tokens. Its interactive site has 'isocost' (best accuracy at a fixed budget over time) and 'pareto_frontier' (one staircase per half-year) figures, which is essentially the chart the author wants.
- **Gundlach et al., arXiv 2511.23455:** price at a fixed benchmark score falls 5 to 10x per year at the frontier, while the price of running frontier models rises 3 to 18x per year.
- **AA articles:** the v4.3 announcement, the v5 announcement, 'GPT-6 Sol and Luna push the cost efficiency frontier' and the 2026-07-17 frontier article.

LMArena (now arena.ai) gives a second single-scale option. Its text Elo is recomputed for all 419 models (snapshot 2026-11-06). But it measures user preference, not capability, and its listed prices often disagree with AA (often exactly half).

## Metric choice

I recommend the Epoch Capabilities Index (ECI, epoch.ai/data/eci_scores.csv, updated 2026-11-07) as the single capability metric, not the AA Intelligence Index.

Why not the AA index: it changed version at least five times inside the window (v3.0 Sep 2025, v4.0 Jan 2026, v4.1 Jun 2026, v4.2/4.3 Sep 2026, v5.0 27 Oct 2026, v5.0.1 Nov 2026). The current v5.0.1 does not score 2025 models; GPT-5, Gemini 3 Pro, Claude Opus 4.5 and GPT-5.2 all show N/A. Stable AA sub-benchmarks also fail. GPQA Diamond was dropped from the index in v4.2 and is saturated (about 96%). HLE was dropped in v5.0.

Why ECI: it puts every model from early 2025 to late Oct 2026 on one recomputed scale (GPT-5 = 150 anchor), with 95% confidence intervals, so 'equal capability' and 'better' are defined consistently across all three snapshots. LMArena/arena.ai text Elo is the only other single-scale option, but it measures preference.

Cost: I used each model's list price per million input and output tokens from its Artificial Analysis model page, for the first-party API or the median across providers for open models. I blended these myself at 3:1 input:output: (3 × input + output) / 4. I did not use AA's displayed 'blended' price, which now uses a 7:2:1 cache-hit:input:output ratio.

AA cost to run the index (which includes reasoning tokens) would be preferable, but it exists only within an index version. Under v5 it covers only about Mar 2026 onward, so it can serve as a robustness check for the Nov 2026 snapshot only.

Label the chart 'list price per token', and add the caveat that real cost per task also depends on tokens used (10x or more variation by effort level).

## Fact-check

The core dataset is solid. All 25 ECI scores, credible intervals and dates match Epoch's eci_scores.csv exactly (files dated Nov 7, 2026). The 14 spot-checked prices match AA's pages or articles, and 12 release dates agree between Epoch and AA. The AA version history, leaderboard, v5 announcement and July 2026 article numbers are accurate. The Epoch 13x/yr figure (47%/quarter 'since 2023', 22 Sep 2026) and the Gundlach et al. 5–10x/yr and 3–18x/yr figures are confirmed. The 7:2:1 blend definition is confirmed and checks out arithmetically. Problems to fix before publishing: (1) AA's methodology page does NOT state that index scores are comparable only within a version; this is our own inference. The v5 article likewise does not say per-task costs are incomparable across versions. (2) Epoch's 725x example says o3 was released 31 Jan 2025, but o3 came out 16 Apr 2025 (per Epoch's own CSV and AA), so the 'under 18 months' span and the baseline model conflict. Don't quote it as-is. (3) May 2026 equal-price frontier: Grok 4.20 (152.27, $1.56 blended) ties Gemini 3 Flash, so report about 152 as a tie. (4) 'Haiku 5.5 beats GPT-5.5' is inside the intervals; say 'matches'. (5) Use Fable 5.1, not the deprecated Fable 5, for Nov 2026. (6) The ~20x equal-capability figure rests on DeepSeek V4 Flash 0731's median third-party price on a deprecated model; give GPT-6 Luna or Haiku 5.5 at $0.20 (about 17x) as a closed-model cross-check, and label the mixed price bases. (7) 'Google doubling Gemini prices on 1 Dec' applies only to Gemini 4 Argon; Flash models follow on 1 Jan 2027. (8) Epoch calls its ranges 'credible intervals' with no stated level, so do not call them 95% CIs. (9) Gemini 4 Carbon (the AA #1) is not in ECI or Google's pricing page and is preliminary on Arena; treat it as provisional. None of the figures look invented. The misdating, if any, is in the Epoch article itself.

- **corrected**: AA Intelligence Index version history: v3.0 (2 Sep–Dec 2025), v4.0 (Jan–Jun 2026), v4.1 (Jun–Aug 2026, cost metrics include cache hit rates), v4.2 (Sep 2026, GPQA removed), v4.3 (Sep 2026), v4.3.2 (Sep–Oct 2026), v5.0 (Oct 2026), v5.0.1 (Nov 2026, CritPt v2 regraded)  
  → The versions and dates are right, but some details are wrong or missing. (1) The list skips two sub-versions: v4.1.1 (Aug–Sep 2026; new graders, GPT-5.6 Luna replacing GPT-4o and others) and v4.3.1 (Sep 2026). (2) v4.1 also removed IFBench, replaced Terminal-Bench Hard with Terminal-Bench 2.1, and replaced τ²-Bench with τ³-Banking. (3) In v5.0, HLE-Diamond replaces HLE, and CritPt is replaced by CritPt v2 (Hard Subset); it is not removed. (4) v4.2 also added AA-Briefcase and GDP.pdf. (5) The claim that 'AA's methodology page says scores are only comparable within a version' is NOT on the page. The page says this only for individual components (AA-LCR v1.1, AA-Omniscience v1.1). Treating index versions as incomparable is a sound inference, but it is not a quote.  
  Source: https://artificialanalysis.ai/methodology/intelligence-benchmarking  
  Read from the page's version-history table (offset 100000). The fetched text has no definition of 'blended price'; the 7:2:1 wording comes from the model pages.
- **corrected**: AA v5.0.1 model pages show N/A Intelligence Index and N/A cost per task for 2025 models (GPT-5, Gemini 3 Pro, Opus 4.5 etc.); releases page shows v5 scores only from ~Mar 2026 onward  
  → GPT-5, Claude Opus 4.5 and Gemini 3 Flash show N/A, confirmed. The 'from ~Mar 2026 onward' part needs correcting. The oldest scored models are small March 2026 releases (Mistral Small 4, Nemotron 3 Nano 4B). Spring-2026 frontier models are still N/A: GPT-5.5 (released 2026-04-23) is N/A, and Gemini 3.1 Pro Preview and GPT-5.5 Pro show '—'. Pages for deprecated models often say 'No publicly available API' (e.g. DeepSeek V4 Flash 0731, Claude Fable 5). Coverage seems to depend on current API availability or deprecation status, not on release date.  
  Source: https://artificialanalysis.ai/models/releases  
  Only pages for GPT-5, Opus 4.5, Gemini 3 Flash and GPT-5.5 were checked; Gemini 3 Pro and DeepSeek V3.2 were not. The main point stands: the live AA site cannot score the Nov 2025 snapshot.
- **confirmed**: AA leaderboard top: Gemini 4 Carbon (high) 60 $7.76; Opus 5.5 (max) 59 $10.04; Gemini 4 Carbon (medium) 58 $6.59; Opus 5.5 (xhigh) 57 $6.05; GPT-6 Astra (max) 57 $6.24; Astra (xhigh) 55 $3.66; GPT-6.1 Sol (max) 55 $1.27; Sonnet 5.5 (max) 55 $10.02  
  → All values match. Missing from the list: GPT-6 Astra (high) 55 at $3.24, which ranks above GPT-6.1 Sol (max).  
  Source: https://artificialanalysis.ai/leaderboards/models  
  The page shows no version number. Gemini 4 Carbon is absent from the v5 announcement (27 Oct), from Epoch's ECI CSV, and from Google's pricing page, and Arena flags it 'Preliminary'. It is likely a very recent release with limited availability, so treat it as provisional. The individual model pages confirm Astra (max) 57/$6.24, 6.1 Sol 55/$1.27 and Terra 51/$0.96.
- **corrected**: AA v5 announcement: median output tokens/task 35k (v4.3) to 59k (v5); per-task costs not comparable across versions; Opus 5.5 $0.98 low (35) vs $10.04 max (58); GPT-6.1 Sol within 4 points at ~1/8 cost  
  → Dated 27 Oct 2026. The 35k→59k figure is confirmed ('about two-thirds' rise). Opus 5.5 is confirmed at low 35 for $0.98 and max 58 for $10.04. GPT-6.1 Sol (max) is 55 at $1.27, 'within 4 points … at about an eighth of the cost per task', also confirmed. The fetch found NO explicit sentence saying per-task costs are incomparable across versions. The article simply reports costs only within v5. Also, v5 removed 'GDPval-AA v2.1, SciCode, AA-LCR v1.1', and HLE-Diamond replaces HLE.  
  Source: https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5  
  Present the 'not comparable across versions' point as our own inference from the 35k→59k token rise, not as AA's words. Opus 5.5 (max) is 58 in the announcement and 59 on today's leaderboard. The v5.0.1 CritPt regrade is a plausible explanation but has not been verified.
- **confirmed**: AA 17 Jul 2026 article: six labs above 50 (two in early June); Fable 5 (max) 60 $2.75; GPT-5.6 Sol (max) 59 $1.04; Kimi K3 57 $0.94 ($3/$15, released 2026-07-16); Opus 4.8 (max) 56 $1.80; Grok 4.5 (high) 54 $0.31; GPT-5.6 Luna (max) 51 $0.21; GLM-5.2 (max) 51 $0.32  
  → All values match. The article also lists GPT-5.6 Terra at 55 and Muse Spark 1.1 (xhigh) at 51 for $0.26. The six labs are Anthropic, OpenAI, Moonshot, SpaceXAI, Z AI and Meta; the summary's list leaves Meta out.  
  Source: https://artificialanalysis.ai/articles/four-frontier-launches-in-eight-days-six-labs-now-field-a-model-above-50-on-the-artificial-analysis-intelligence-index  
  The article gives no version number. 'v4.1' is inferred from the version history (v4.1 ran Jun–Aug 2026), which is reasonable. Conflict: the 22 Sep AA GPT-6 article puts GPT-5.6 Sol (max) at $1.99 per task and Luna at $0.18, against $1.04 and $0.21 here. This is probably a version change (v4.1→v4.3), which again shows per-task cost is version-bound.
- **corrected**: ECI: composite of over 50 benchmarks, calibrated Claude 3.5 Sonnet=130 and GPT-5=150; CSV updated 2026-11-07; top GPT-6 Astra 169.07 (CI 166.16–172.28); 95% CIs  
  → Confirmed: 'over 50 distinct benchmarks', the anchors 3.5 Sonnet=130 and GPT-5=150, files updated Nov. 7, 2026, and GPT-6 Astra at 169.07 [166.16, 172.28]. Correction: Epoch calls these 'credible intervals' and the page does not give the level, so do not call them '95% confidence intervals' without checking. The page also does not say ECI uses each model's best reported setting; that is an assumption.  
  Source: https://epoch.ai/benchmarks/eci  
  The top 4 (Astra 169.07, 6.1 Sol 168.94, Opus 5.5 168.36, Terra 167.82) overlap within their intervals, so they are a statistical tie. The method fits logistic difficulty and slope curves per benchmark.
- **confirmed**: Epoch 'Plunging price of thought': 47%/quarter (~13x/yr) over ~3 years; 66%/q (75x/yr) for just-SOTA, 32%/q (4.7x/yr) two years later; math 50–52%/q, games 39–43%/q; five benchmarks; reasoning tokens counted via budgets from transcripts  
  → 'The cost of achieving a given level of AI performance has fallen about 47% per quarter since 2023, or 13× per year.' The other rates, the five benchmarks (AIME OTIS Mock, Chess Puzzles, FrontierMath T1–3, GPQA Diamond, Mystery Game Puzzles) and the CAISI transcript-budget method are all as stated. By Emberson & Roodman, dated 22 Sep 2026 and updated 23 Sep 2026, which added a Demirer, Fradkin & Tadelis (2026) citation and a Limitations caveat that the 'price of thought' is ambiguous.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Supports 'Epoch, Sep 2026, ~13x per year'. This is the cost of the cheapest way to reach a fixed accuracy, not the trend in list prices.
- **conflicting_sources**: Epoch 725x example: 75% (scaled; raw 81.25%) GPQA Diamond for ~$0.30/question with o3; GPT-5.6 Luna matched at ~$0.0004 'just under 18 months later'  
  → The article does say this: 'On January 31, 2025, OpenAI released … o3', costing 30 cents per question for an estimated 75% score, with GPT-5.6 Luna at $0.0004 ('a 725-fold drop … in under 18 months'). But o3 was released 16 Apr 2025 according to Epoch's own eci_scores.csv and AA's o3 page. 31 Jan 2025 is the o3-mini release date. From 16 Apr 2025 to Luna on 9 Jul 2026 is about 15 months, not 'just under 18'. From 31 Jan 2025 it is about 17.3 months, which fits o3-mini. So the article contains an internal date/model error, and we cannot tell whether the $0.30 baseline is o3 or o3-mini.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Do not quote '725x in under 18 months, starting from o3' as fact. Either cite only the 13x/yr trend, or write 'Epoch estimates ~725x' and note the date inconsistency. Possibly ask Epoch.
- **confirmed**: droodman.github.io/inference-cost has isocost, isoaccuracy, pareto_frontier.png (one staircase per half-year), record timelines at 25%/75% with equivalent ECI  
  → Confirmed. The page lists isocost_ (accuracy vs date at fixed budget), isoaccuracy_ (cost vs date at fixed accuracy), pareto_frontier.png ('empirical staircase, one curve per half-year'), record_timelines.png and record_timelines.html (25%/75% with equivalent ECI), plus staircase_check.html/.csv (model-free decline rates) and rate_comparison.html.  
  Source: https://droodman.github.io/inference-cost  
  The page names no benchmarks and gives no numbers. staircase_check.csv may be the best machine-readable source for a half-yearly frontier chart.
- **confirmed**: Gundlach, Lynch, Mertens & Thompson arXiv 2511.23455: 5–10x/yr cheaper at fixed score; ~3x/yr algorithmic efficiency; frontier price rising 3–18x/yr  
  → Title: 'The Price of Progress: Price Performance and the Future of AI'. v1 28 Nov 2025, v2 23 Mar 2026. Abstract: 'around 5× to 10× per year'; algorithmic efficiency 'around 3× per year'; frontier price rising 'between 3× to 18× per year'.  
  Source: https://arxiv.org/abs/2511.23455  
  Only the abstract was checked; the data sources (AA and Epoch) were not confirmed from the abstract.
- **confirmed**: arena.ai Text leaderboard: 419 models, 9,140,146 votes, 2026-11-06; Gemini 4 Carbon (High) 1526±9 prelim; Argon 1523; Muse Wonder (Max) 1513; Opus 5.5 (High) 1505; Gemini 2.5 Pro 1445; GPT-5 (High) 1435; GPT-4.1 1415; Haiku 4.5 1414; Arena prices conflict with AA  
  → All values match (Argon ±6, Muse Wonder ±7, Opus 5.5 ±6; #5 is Claude Fable 5 (High) at 1504±4). Arena lists GPT-5 at $0.63/$5, Sonnet 4.6 at $1.50/$7.50, Gemini 3.1 Pro Preview at $1/$6 and GPT-5.2 at $0.88/$7, all exactly half the list prices. These may be batch-tier prices, but that is a hypothesis.  
  Source: https://arena.ai/leaderboard/text  
  Style control appears under 'Adjustments', but the page does not say whether it is the default. Do not use Arena prices.
- **confirmed**: AA model pages define blended price as 7:2:1 cache-hit:input:output (GPT-5 $1.34; Opus 4.5 $3.85; Gemini 3 Pro $1.74)  
  → GPT-5: 'For a blended rate (7:2:1 cache hit/input/output ratio), this is $1.34'. Opus 4.5: $3.85. Both are consistent with a 90% cache discount: (7×0.125+2×1.25+10)/10=1.3375 and (7×0.5+2×5+25)/10=3.85.  
  Source: https://artificialanalysis.ai/models/claude-opus-4-5  
  The Gemini 3 Pro $1.74 figure was not checked. 'Replaces the older 3:1 convention' was not verified from the methodology page, though it fits the v4.1 cost-metric change. Using a self-computed 3:1 blend for all models is the right choice, but label it as such.
- **confirmed**: Frontier read-out, equal capability: Nov 2025 GPT-5 ECI 150 at $3.44 → May 2026 Gemini 3 Flash 152.25 at $1.125 → Nov 2026 DeepSeek V4 Flash 0731 154.34 at $0.175; ~20x cheaper in 12 months  
  → The arithmetic holds (3.4375/0.175 = 19.6x). No cheaper ECI≥150 model was found in the spot-checks. May 2026 alternatives: Grok 4.20 (152.27, $1.25/$2.50 → $1.56), Kimi K2.6 (151.56, $0.95/$4 → $1.71), GLM-5.1 (150.67, $1.19/$3.74 → $1.83). Nov 2026 alternatives: GPT-6 Luna (156.68, $0.20), Haiku 5.5 (160.22, $0.20), GLM-5.3-Flash (153.64, $0.15/$0.50 → $0.2375), Gemini 3.8 Flash (158.63, $1.50), Qwen3.8 27B (152.73, $1.125).  
  Source: https://artificialanalysis.ai/models/deepseek-v4-flash  
  Caveats: (1) The DeepSeek V4 Flash 0731 price ($0.14/$0.28) is the median across third-party providers, while the others are first-party API prices, so the price bases are mixed. (2) AA marks V4 Flash 0731 deprecated and its index as 'No publicly available API'. (3) Gemini 3 Flash was released 2025-12-17 and is a 'Preview' model, now deprecated. (4) GPT-6 Luna at $0.20 gives a closed-model figure of about 17x, which is less dependent on one open-weights host price. (5) DeepSeek V4.1 Flash 1017 (ECI 159.31) was not priced.
- **corrected**: Equal price (≤~$3.50 blended): best ECI 150.0 (GPT-5, Nov 2025) → 152.25 (Gemini 3 Flash, May 2026) → 167.82 (GPT-6.1 Terra $2.00, Nov 2026)  
  → For May 2026, Grok 4.20 (ECI 152.27, AA price $1.25/$2.50 → $1.56 blended) is marginally above Gemini 3 Flash (152.25); the two are a statistical tie. Meta's Muse Spark (153.1, 2026-04-08) had no public API price. Gemini 3.1 Pro (156.24) is $2/$12 → $4.50, so it misses the cutoff, as does GPT-5.2 (154.42, $4.81). The Nov 2025 (GPT-5) and Nov 2026 (Terra, $1/$5) points are confirmed. Gemini 4 Argon ($2/$10 → $4.00) and GPT-6.1 Sol ($4.00) fall just above $3.50.  
  Source: https://epoch.ai/data/eci_scores.csv  
  The $3.50 cutoff is arbitrary. At $4.00 the Nov 2026 winner becomes GPT-6.1 Sol (168.94) and the May 2026 winner is unchanged. Grok mapping issue: ECI dates 'Grok 4.20' to 2026-02-17, but AA's page is 'Grok 4.20 0309 v2', released 2026-04-07. Report the May figure as '~152 (Gemini 3 Flash / Grok 4.20, tied)'.
- **corrected**: Claude Haiku 5.5 ($0.10/$0.50, ECI 160.22) now beats GPT-5.5 (ECI 160.04 at $11.25)  
  → The prices are confirmed: Haiku 5.5 (Max) at $0.10/$0.50, released 2026-10-07, AA v5 score 36, $0.41 per task; GPT-5.5 at $5/$30. But 160.22 vs 160.04 is well inside both credible intervals ([158.04, 162.57] vs [158.05, 162.19]). Say 'matches', not 'beats'. On a 3:1 blend that is $0.20 vs $11.25, about 56x cheaper per token in about 5.5 months.  
  Source: https://artificialanalysis.ai/models/claude-haiku-5-5  
  Token use per task may differ, so this is a list-price comparison only.
- **corrected**: Top of market: GPT-6 Astra $10/$50 (ECI 169.07); Claude Fable 5 $10/$50  
  → GPT-6 Astra (Max) at $10/$50 is confirmed, with AA v5 57 and $6.24 per task. Claude Fable 5 at $10/$50 is confirmed, but AA marks it deprecated and superseded by Claude Fable 5.1 (ECI 166.9, released 2026-09-01). Use Fable 5.1 for a Nov 2026 snapshot; its price was not verified.  
  Source: https://artificialanalysis.ai/models/gpt-6-astra  
  AA's Fable 5 page is titled 'Claude Fable 5 (Max, Opus 4.8 Fallback)', so the AA setup for it is unusual.
- **confirmed**: Data points: ECI scores for all 25 listed models  
  → All 25 ECI values, CIs and dates match eci_scores.csv exactly. Examples: GPT-5 nano 139.17 [137.15, 140.98]; o3 146.99 (2025-04-16); GPT-5.4 Mini 149.34; GPT-6.1 Terra 167.82 (2026-10-26); Claude Opus 5 164.45 (2026-07-24); Fable 5 164.19 (2026-06-09).  
  Source: https://epoch.ai/data/eci_scores.csv  
  gpt-oss-120b is open weights (unrestricted), confirmed. Gemini 3 Flash and Gemini 3 Pro are dated 2025-12-17 and 2025-11-18, both after the Nov 2025 snapshot.
- **confirmed**: Data points: prices (spot-checked GPT-5, o3, GPT-5.5, GPT-5.6 Luna, GPT-5.6 Sol, GPT-6 Astra, GPT-6 Luna, GPT-6.1 Sol, GPT-6.1 Terra, Opus 4.5, Haiku 5.5, Fable 5, Gemini 3 Flash, DeepSeek V4 Flash 0731)  
  → AA pages confirm: GPT-5 $1.25/$10; o3 $2/$8; GPT-5.5 $5/$30; GPT-6 Astra $10/$50; GPT-6 Luna $0.10/$0.50 (v5 28, $0.15 per task); GPT-6.1 Sol $2/$10; GPT-6.1 Terra $1/$5; Opus 4.5 $5/$25; Haiku 5.5 $0.10/$0.50; Fable 5 $10/$50; Gemini 3 Flash $0.50/$3; DeepSeek V4 Flash 0731 $0.14/$0.28 (median across providers). The AA 22 Sep 2026 article, seen via search snippet, confirms GPT-5.6 Sol at $4/$20 and GPT-5.6 Luna at $0.20/$1.20.  
  Source: https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier  
  Mixed price bases: most prices are first-party API prices, but DeepSeek V4 Flash, gpt-oss-120b and GLM-5.1 are medians across providers. Label open-weights prices as such. The o3 launch price of $10/$40 and the June 2025 cut were not verified in this run (the AA page shows no price history).
- **confirmed**: Data points: release dates  
  → The ECI CSV and AA agree for GPT-5 (2025-08-07), o3 (2025-04-16), GPT-5.5 (2026-04-23), GPT-6 Astra (2026-09-03), GPT-6 Luna (2026-09-22), GPT-6.1 Sol (2026-09-29), GPT-6.1 Terra (2026-10-26), Opus 4.5 (2025-11-24), Haiku 5.5 (2026-10-07), Fable 5 (2026-06-09), Gemini 3 Flash (2025-12-17) and DeepSeek V4 Flash 0731 (2026-07-31).  
  Source: https://epoch.ai/data/eci_scores.csv  
  Small disagreements outside the 25 data points: GLM-5.3-Flash (ECI 2026-08-20 vs AA 2026-08-26), DeepSeek V4.1 Flash (2026-09-09 vs 2026-09-10), Grok 4.20 (ECI 2026-02-17 vs AA page 'Grok 4.20 0309 v2', 2026-04-07). Name the source of each date used.
- **corrected**: (User-text claim, related) 'Google is doubling its Gemini prices on 1 Dec'  
  → Google's pricing page shows only Gemini 4 Argon doubling on 1 Dec 2026 (standard tier, $2.00→$4.00 input and $10.00→$20.00 output). Gemini 3.8 Flash and 3.6 Flash double on 1 Jan 2027 ($0.75/$3.75 → $1.50/$7.50). Gemini 3.1 Pro Preview and 3 Flash Preview have no scheduled change.  
  Source: https://aistudio.google.com/docs/pricing  
  Rewrite as 'Google is doubling the price of its top Gemini 4 Argon model on 1 Dec, with Flash models following on 1 Jan'. Gemini 4 Carbon pricing was not found on the page, which was truncated.

### Missed evidence

- GPT-6 Sol (ECI 164.06, released 2026-09-22): list price $2/$10, down from $4/$20 for GPT-5.6 Sol. AA says GPT-6 Sol and Luna roughly halve cost per task and 'capture a significant portion of the cost-efficiency Pareto frontier'. The best direct evidence that prices fall at constant capability: https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier (22 Sep 2026)
- AA 'GPT-5.6 intelligence vs cost across Sol, Terra, Luna' (13 Jul 2026), a within-family cost/intelligence comparison: https://artificialanalysis.ai/articles/gpt-5-6-intelligence-vs-cost-across-sol-terra-luna
- Google official pricing page, showing the Gemini 4 Argon doubling on 1 Dec 2026 and the Flash doubling on 1 Jan 2027: https://aistudio.google.com/docs/pricing
- Grok 4.20 (ECI 152.27; AA $1.25/$2.50) ties Gemini 3 Flash on the May 2026 equal-price frontier and is missing from the data points: https://artificialanalysis.ai/models/grok-4-20
- Gemini 3.8 Flash (ECI 158.63, $0.75/$3.75, 2026-09-02) and GLM-5.3-Flash (ECI 153.64, $0.15/$0.50) are relevant to the Nov 2026 cheap tier: https://aistudio.google.com/docs/pricing ; https://artificialanalysis.ai/models/glm-5-3-flash
- Claude Fable 5.1 (ECI 166.9, 2026-09-01) supersedes the deprecated Fable 5 for the Nov 2026 snapshot. Its price was not verified. Claude Sonnet 5.5 (ECI 166.24) is unpriced in the dataset.
- Epoch's model-free staircase decline rates and the half-yearly Pareto staircase data on the Roodman companion site (staircase_check.csv, rate_comparison.html, pareto_frontier.png): https://droodman.github.io/inference-cost
- Demirer, Fradkin & Tadelis (2026), another estimate of AI price declines, cited in Epoch's 23 Sep 2026 update; URL not retrieved.
- Gemini 3.5 Flash (ECI 155.24, released 2026-05-19, 12 days after the May snapshot) reportedly came with a ~3x price rise over 3 Flash (third-party claim, unverified: https://tokenkarma.app/blog/gemini-3-5-flash-price-hike-2026/). It is relevant to 'cheaper vs more expensive' and to snapshot timing.
- DeepSeek V4.1 Flash 1017 (ECI 159.31, open weights, 2026-10-17) is the current DeepSeek Flash; its AA price was not fetched. It may change the Nov 2026 equal-capability point.

## Findings

- **AA Intelligence Index version history across the window: v3.0 (2 Sep 2025 to Dec 2025), v4.0 (Jan 2026 to Jun 2026; added GDPval-AA, AA-Omniscience, CritPt; removed MMLU-Pro, LiveCodeBench, AIME 2025), v4.1 (Jun to Aug 2026; cost metrics now include cache hit rates), v4.2 (Sep 2026; GPQA Diamond removed), v4.3 (Sep 2026), v4.3.2 (Sep to Oct 2026), v5.0 (Oct 2026; HLE, SciCode, AA-LCR, GDPval-AA removed; HLE-Diamond, Terminal-Bench-Science and FrontierCode 2.0 added), v5.0.1 (Nov 2026; CritPt v2 regraded).**  
  Five or more index versions within Nov 2025 to Nov 2026 (2026-11-07). Confidence: high, source type: primary  
  [Artificial Analysis Intelligence Benchmarking Methodology: Version History](https://artificialanalysis.ai/methodology/intelligence-benchmarking)  
  Read via a fetch-tool summary of the page's second half (offset 100000). Because the index changed this often, raw AA index scores from different dates cannot go on one chart.
- **AA's current (v5.0.1) model pages show no Intelligence Index score for 2025 models such as GPT-5, GPT-5.2, Gemini 3 Pro, Claude Opus 4.5 and DeepSeek V3.2. Their 'cost per Intelligence Index task' is also N/A. The AA 'releases' page shows v5 scores only for models from about Mar 2026 onward.**  
  N/A for 2025 models (2026-11-07). Confidence: high, source type: primary  
  [Artificial Analysis model pages (e.g. /models/gpt-5, /models/gemini-3-pro, /models/claude-opus-4-5)](https://artificialanalysis.ai/models/gpt-5)  
  So the live AA site cannot supply one AA index score for both the Nov-2025 and Nov-2026 snapshots. Historical AA snapshots would need the Wayback Machine, which the fetch tool could not reach.
- **Current AA v5.0.1 leaderboard, top entries: Gemini 4 Carbon (high) 60 at $7.76 per task; Claude Opus 5.5 (max) 59 at $10.04; Gemini 4 Carbon (medium) 58 at $6.59; Claude Opus 5.5 (xhigh) 57 at $6.05; GPT-6 Astra (max) 57 at $6.24; GPT-6 Astra (xhigh) 55 at $3.66; GPT-6.1 Sol (max) 55 at $1.27; Claude Sonnet 5.5 (max) 55 at $10.02.**  
  Top score 60 (Gemini 4 Carbon high) (2026-11-07). Confidence: medium, source type: official_leaderboard  
  [Artificial Analysis LLM Leaderboard](https://artificialanalysis.ai/leaderboards/models)  
  Cost per task = AA's measured cost per Intelligence Index task (actual tokens used, including reasoning, times price). The v5 announcement lists Opus 5.5 (max) at 58, against 59 on the leaderboard. The difference is probably the v5.0.1 CritPt regrade.
- **The AA v5 announcement says median output tokens per Intelligence Index task rose from 35k (v4.3) to 59k (v5). It warns that per-task costs are not comparable across index versions. Claude Opus 5.5 costs $0.98 per task at low effort (score 35) and $10.04 at max (score 58). GPT-6.1 Sol scores within 4 points of Opus 5.5 (max) at about one eighth of the cost per task.**  
  Median 35k to 59k output tokens per task (2026-10-27). Confidence: high, source type: primary  
  [Announcing Artificial Analysis Intelligence Index v5](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5)  
  Supports using per-token list price only with a caveat. Reasoning-effort settings change cost per task by about 10x.
- **AA article of 17 Jul 2026: six labs have a model above 50 on the AA Index (two in early June). Scores and cost per task: Claude Fable 5 (max) 60 at $2.75; GPT-5.6 Sol (max) 59 at $1.04; Kimi K3 57 at $0.94 ($3/$15 per million tokens, released 2026-07-16); Claude Opus 4.8 (max) 56 at $1.80; Grok 4.5 (high) 54 at $0.31; GPT-5.6 Luna (max) 51 at $0.21; GLM-5.2 (max) 51 at $0.32.**  
  Six labs above 50 (v4.x index) (2026-07-17). Confidence: medium, source type: primary  
  [Four frontier launches in eight days: six labs now field a model above 50 on the AA Intelligence Index](https://artificialanalysis.ai/articles/four-frontier-launches-in-eight-days-six-labs-now-field-a-model-above-50-on-the-artificial-analysis-intelligence-index)  
  The scores are on v4.1, which was live in July 2026, and cannot be compared with v5 scores. The article includes a 'frontier since late 2022' chart and an intelligence-vs-cost chart (images only). Fable 5 at 60 (v4.1) and Opus 5.5 at 59 (v5) are not comparable.
- **AA v4.3 announcement: GPT-6 Astra (max) and Claude Fable 5.1 (max) both scored 53, but Astra's average cost per task was about 57% lower. GLM-5.3-Flash and GPT-5.6 Terra (max) both scored 42, with GLM-5.3-Flash at 18% of the cost per task.**  
  Same score, about 57% and 82% lower cost (2026-09). Confidence: low, source type: primary  
  [Announcing the Artificial Analysis Intelligence Index v4.3](https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-3)  
  Seen only in a web-search summary; I did not fetch the page. Verify before citing.
- **AA article on GPT-6 Sol and Luna: index scores stay level with GPT-5.6, while price roughly halves. GPT-6 Sol (max) costs about $1.06 per task against $1.99 for GPT-5.6 Sol (max).**  
  About 47% lower cost per task at equal score (2026-09). Confidence: low, source type: primary  
  [GPT-6 Sol and Luna push the cost efficiency frontier](https://artificialanalysis.ai/articles/gpt-6-sol-and-luna-push-the-cost-efficiency-frontier)  
  Search summary only. The summary also said the GPT-6 Sol model page shows $2.47 per task, which conflicts with $1.06. That may be a different index version or setting; unresolved.
- **Epoch Capabilities Index (ECI) is a composite of 'over 50 distinct benchmarks', stitched statistically onto one scale. It is calibrated so that Claude 3.5 Sonnet = 130 and GPT-5 = 150. Model scores CSV updated 2026-11-07.**  
  GPT-5 = 150 (anchor); top today GPT-6 Astra 169.07 (CI 166.16 to 172.28) (2026-11-07). Confidence: high, source type: official_leaderboard  
  [Epoch AI Capabilities Index (ECI) and eci_scores.csv](https://epoch.ai/data/eci_scores.csv)  
  One consistent scale for the whole window, with CIs of about ±2 to 3 points. Differences under about 3 points are not significant. ECI rates each model, usually at its best reported setting, not per effort level. Overview page: https://epoch.ai/benchmarks/eci
- **Epoch 'The plunging price of thought': cost to reach a fixed performance level falls 47% per quarter (about 13x per year) on average over about 3 years, across five benchmarks (AIME OTIS Mock, Chess Puzzles, FrontierMath T1-3, GPQA Diamond, Mystery Game Puzzles). The decline is 66% per quarter (75x per year) for a level that has just become state of the art, and 32% per quarter (4.7x per year) two years later. Math 50 to 52% per quarter; games 39 to 43% per quarter. Reasoning tokens are counted via per-question token budgets taken from transcripts.**  
  13x per year (47% per quarter) (2026-09-22). Confidence: high, source type: primary  
  [The plunging price of thought (Emberson & Roodman, Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Matches the author's '13x per year (Epoch, Sep 2026)'. It measures the cost frontier, not the price of the newest model. An accuracy-at-budget frontier is in the appendix. Updated 2026-09-23 with a caveat. Code and data: github.com/droodman/inference-cost.
- **Epoch's 725-fold example: a GPQA Diamond score of 75% (scaled from the 25% guessing floor; raw 81.25%) cost about $0.30 per question with o3. GPT-5.6 Luna matched it for about $0.0004 per question just under 18 months later.**  
  725x in under 18 months (2026-09-22). Confidence: medium, source type: primary  
  [The plunging price of thought](https://epoch.ai/publications/the-plunging-price-of-thought)  
  The fetch summary dated the o3 release to 31 Jan 2025, but o3 came out 16 Apr 2025 (o3-mini was 31 Jan 2025). GPT-5.6 Luna was released 2026-07-09, about 17 months after 31 Jan 2025, so the starting model may be o3-mini. Check the original before quoting.
- **The interactive companion site has 'isocost' plates (best accuracy at a fixed per-question budget over time), 'isoaccuracy' plates (cost at a fixed accuracy over time), a 'pareto_frontier.png' (one staircase per half-year) and record timelines at 25% and 75% with equivalent ECI.**  
  Existing chart of the Pareto frontier per half-year (2026-09). Confidence: medium, source type: primary  
  [inference-cost interactive overlay (David Roodman)](https://droodman.github.io/inference-cost)  
  This is the closest existing published version of the '6 and 12 months ago vs today' frontier chart. Useful to cite or cross-check. No numbers were readable from the page text.
- **Gundlach, Lynch, Mertens & Thompson: price to reach a given benchmark score fell about 5 to 10x per year for frontier models. Algorithmic efficiency is about 3x per year after controlling for hardware and competition. The price of running frontier models is rising about 3 to 18x per year. Data from Artificial Analysis and Epoch AI.**  
  5 to 10x per year cheaper at fixed capability; 3 to 18x per year more expensive at the frontier (2025-11-28 (v2 2026-03-23)). Confidence: high, source type: preprint  
  [The Price of Progress: Price Performance and the Future of AI (arXiv 2511.23455)](https://arxiv.org/abs/2511.23455)  
  Research-paper support for 'cheaper at equal capability, but the best AI costs more'. Abstract only was read.
- **arena.ai (formerly LMArena) Text leaderboard: one Bradley-Terry scale across 419 models and 9,140,146 votes. Top: Gemini 4 Carbon (High) 1526 ±9 (preliminary); Gemini 4 Argon (High) 1523; Muse Wonder (Max) 1513; Claude Opus 5.5 (High) 1505. Older models remain listed: Gemini 2.5 Pro 1445, GPT-5 (High) 1435, GPT-4.1 1415, Claude Haiku 4.5 1414.**  
  Score range about 1411 to 1526 across 2025 to 2026 models (2026-11-06). Confidence: medium, source type: official_leaderboard  
  [Text Arena Overall Leaderboard](https://arena.ai/leaderboard/text)  
  A second single-scale option, but it measures human preference, not capability; style control is listed as an adjustment. Arena's price columns often conflict with AA and official list prices. Examples: GPT-5 $0.63/$5 vs $1.25/$10; Claude Sonnet 4.6 $1.50/$7.50 vs $3/$15; Gemini 3.1 Pro $1/$6 vs $2/$12. Do not use Arena prices.
- **AA model pages now define 'blended price' with a 7:2:1 cache-hit:input:output ratio (e.g. GPT-5 blended $1.34; Claude Opus 4.5 $3.85; Gemini 3 Pro $1.74). This replaces the older 3:1 input:output convention.**  
  7:2:1 blend (2026-11-07). Confidence: medium, source type: primary  
  [Artificial Analysis model pages](https://artificialanalysis.ai/models/claude-opus-4-5)  
  So AA 'blended' numbers from Nov 2025 and Nov 2026 may use different formulas. I computed 3:1 blends myself from AA's input/output list prices.
- **Third-party report that AA data shows the cost of a given intelligence level falling from $1.22 per task (Feb 2026) to $0.022, a 56x drop in under 6 months.**  
  56x in under 6 months (2026). Confidence: low, source type: blog_or_social  
  [Costo de IA cae 56x en 6 meses (ecosistemastartup.com)](https://ecosistemastartup.com/?p=100422)  
  Secondhand; no primary AA source found. Such a figure would span index versions. Do not use without the primary source.

## Data points
53 models; also in `data/frontier_aa.csv`.

## Counter-evidence

- The frontier's top price point is rising, not falling. GPT-6 Astra and Claude Fable 5 / 5.1 list at $10/$50 per million tokens (AA pages). The most expensive model 12 months ago, among those priced here, was Claude Opus 4.5 at $5/$25. GPT-5 Pro was $15/$120 but is unverified here. AA v5 cost per task for top models ranges from $1.27 (GPT-6.1 Sol max) to $13.04 (Claude Fable 5.1 max), more than 13x apart. AA's v5 article says every model uses more output tokens per task than under v4.3 (median 35k to 59k).
- Per-token prices understate cost differences. AA v5 shows the same model's cost per task varying about 10x by effort level: Claude Opus 5.5 at $0.98 (low, score 35) vs $10.04 (max, score 58); Claude Haiku 5.5 at $0.04 to $0.41. A per-token Pareto chart can make reasoning-heavy models look cheaper than they are in use.
- ECI scores a model at its best reported configuration, not at the setting a given price implies. Pairing ECI with list per-token price is a hybrid. The CIs are about ±2 to 3 points, so many 'frontier' rankings near the top are not statistically separable: GPT-6 Astra 169.07, GPT-6.1 Sol 168.94, Claude Opus 5.5 168.36.
- ECI scores are recomputed when Epoch adds benchmarks. Today's ECI for a 2025 model may differ from what Epoch published in Nov 2025. The chart therefore shows each past frontier re-measured on today's scale, not 'as it looked then'.
- Release dates conflict across sources. GLM-5.3: ECI 2026-08-14 vs AA 2026-08-18. GLM-5.3-Flash: ECI 2026-08-20 vs AA 2026-08-26. Grok 4.3: ECI 'Grok 4.3 Beta' 2026-04-17 vs AA 2026-04-30. Qwen3.5-397B: ECI 2026-02-13 vs AA 2026-02-16. Grok 4: ECI 2025-07-09 vs AA 2025-07-10. Gemini 2.5 Pro has several dated versions.
- Some names cover several versions with different prices. The AA 'deepseek-v4-flash' page resolves to the 0731 version at $0.14/$0.28, while Arena lists DeepSeek-V4-Flash at $0.30/$1.20; ECI scores the April version 146.86 and the 0731 version 154.34. The AA 'deepseek-v4-pro' page resolves to the 0813 version.
- Arena (arena.ai) Elo is a different picture. There, Gemini 4 Carbon and Muse Wonder lead, while ECI puts GPT-6 Astra and GPT-6.1 Sol on top and AA v5 puts Gemini 4 Carbon (60) on top. Which model is 'best' depends on the metric.

## Chart ideas

- Three-panel (or overlaid, colour-coded) Pareto staircase. X axis: log blended list price, $/M tokens at 3:1. Y axis: ECI. One step-curve each for 2025-11-07, 2026-05-07 and 2026-11-07, built only from models released on or before each date. Frontier from this dataset: Nov 2025 GPT-5 nano (139.17, $0.14) to gpt-oss-120b (140.22, $0.26) to Grok 4 Fast (144.33, $0.275) to GPT-5 mini (146.08, $0.69) to GPT-5 (150.0, $3.44). May 2026 Grok 4 Fast to DeepSeek V3.2 (146.22, $0.315) to Gemini 3 Flash (152.25, $1.125) to Gemini 3.1 Pro (156.24, $4.50) to GPT-5.4 (157.82, $5.63) to GPT-5.5 (160.04, $11.25). Nov 2026 DeepSeek V4 Flash 0731 (154.34, $0.175) to Claude Haiku 5.5 (160.22, $0.20) to GPT-6.1 Terra (167.82, $2.00) to GPT-6.1 Sol (168.94, $4.00) to GPT-6 Astra (169.07, $20).
- Two annotated arrows on the same chart. Horizontal ('cheaper at equal capability'): ECI about 150 to 154 fell from $3.44 (GPT-5, Nov 2025) to $0.175 (DeepSeek V4 Flash 0731, Nov 2026), about 20x. Vertical ('better at equal price'): at or under about $3.50 blended, the best ECI rose from 150.0 to 167.82.
- Time-lapse or animated version of the same chart. Grey out models not yet released at each snapshot; label which lab sits on the frontier.
- Robustness inset: the same Nov 2026 frontier with AA v5 cost per Intelligence Index task as the cost axis. This shows how reasoning-token usage changes the picture; v5 covers only the current snapshot.
- Companion line chart: list output price of each lab's most expensive flagship over time, e.g. Claude Opus 4.5 $25/M to Claude Fable 5 $50/M; GPT-5 $10/M to GPT-6 Astra $50/M. This illustrates 'the best AI is getting more expensive'.
- Cross-check the staircase against Epoch/Roodman's pareto_frontier.png and isocost plates (droodman.github.io/inference-cost) on GPQA Diamond / FrontierMath.

## Open questions

- Historical AA leaderboards (as on 2025-11-07 and 2026-05-07) could not be retrieved; web.archive.org is blocked for the fetch tool. If 'as AA showed it at the time' charts are wanted, fetch Wayback snapshots manually. Remember that each snapshot is on a different index version (v3.0, v4.0, v5.0.1).
- Prices for GPT-5 Pro, GPT-5.2 Pro, GPT-5.4 Pro, GPT-5.5 Pro, o3-pro, Claude Opus 4.1, Gemini 2.5 Flash-Lite, Grok 4.5/4.6/4.7, Grok 4.20, Qwen3.8 Max, Muse Spark/Wonder (Meta), Mistral Large 4 / Medium 3.5, Llama 4 and MiniMax-M3 were not fetched from AA. They are needed to complete the top and bottom of each staircase; the Pro models matter for the high end of the Nov 2025 and May 2026 frontiers.
- Qwen3-Max (2025-09-23): the AA page says 'No publicly available API' pricing. Alibaba Cloud's own price would be needed.
- Price changes after launch are not captured; I used current AA list prices. o3 was cut from $10/$40 to $2/$8 in June 2025 (from my own knowledge, not fetched), so $2/$8 applies to all three snapshots. The author's claim that Google doubles Gemini prices on 1 Dec 2026 was not verified here. If true, it falls after the 2026-11-07 snapshot.
- Is ECI computed at each model's highest reasoning setting? This determines which price or effort level should be paired with the score. Check Epoch's ECI methodology page.
- The Epoch 725x example's starting model and date: the fetch summary says o3, released 31 Jan 2025, which conflicts with o3's 16 Apr 2025 release (o3-mini was 31 Jan). Check the original.
- Conflicting AA cost-per-task values for GPT-6 Sol ($1.06 in an article vs $2.47 on a model page, per a search summary). Not verified directly.
- Kimi K3 open-weights status: Arena lists a 'Kimi K3 license'; the AA v5 article says Kimi K3.1 Pro weights are not yet released. Confirm K3's licence.
- Vals.ai, Scale SEAL and OpenRouter were not successfully checked. The OpenRouter /api/v1/models fetch returned anomalous content with no pricing fields. They could serve as secondary cross-checks.
- Gemini 4 Carbon (AA v5 #1, Oct 2026) and Kimi K3.1 Pro have no ECI score in the CSV extract and no fetched price, so they are missing from the Nov 2026 frontier.
- The secondhand '56x in 6 months' AA-based claim ($1.22 to $0.022 per task) has no primary source located.
- All values were read through a fetch tool that summarises pages with a small model. Spot-check key numbers against the raw pages and CSV before publishing: ECI scores, prices and release dates.
