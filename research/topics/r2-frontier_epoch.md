# Price-capability frontier: Epoch data

Research round r2, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

Epoch AI covers this well enough to use one metric. Its Epoch Capabilities Index (ECI) CSV (https://epoch.ai/data/eci_scores.csv, updated 2026-11-07, CC-BY) gives an ECI score, a credible interval and a release date for about 150 models released between 2025-01 and 2026-11. Every major lab is in it: OpenAI, Anthropic, Google, xAI, Meta, DeepSeek, Alibaba/Qwen, Moonshot, Mistral, Zhipu, MiniMax, Nvidia and others. The scale is fixed so that Claude 3.5 Sonnet = 130 and GPT-5 = 150. Epoch's model pages (epoch.ai/models/<slug>) list input and output prices per 1M tokens for many models but not all. I filled the gaps from official pricing pages: OpenAI, Anthropic, Google AI Studio, xAI, DeepSeek and Z.ai. That gives 75 models with an ECI score and a price.

Rough frontier result on per-token list prices, blended 3:1 input:output:
- Cheaper at equal capability. The cheapest model at ECI ≥150 (GPT-5 level) went from about $3.44/Mtok (GPT-5, Nov 2025) to $1.125 (Gemini 3 Flash, May 2026) to $0.20 (Claude Haiku 5.5 or GPT-6 Luna, Nov 2026). That is about 17x in 12 months.
- Better at equal price. At ≤$4 blended, the best ECI went from 150.0 (GPT-5) to about 152.3 (Gemini 3 Flash or Grok 4.20) to 168.9 (GPT-6.1 Sol at exactly $4.00). At ≤$0.25 it went from 140.2 (gpt-oss-120b) to 146.9 (DeepSeek-V4-Flash) to 160.2 (Haiku 5.5).
- Top of the range. The most capable model available cost $41.25 blended in Nov 2025 (GPT-5 Pro, ECI 151.2) and $67.50 in May 2026 (GPT-5.5 Pro, ECI 162.7). Today the top is GPT-6 Astra at $20 (ECI 169.1). The "best AI is getting more expensive" claim therefore depends on which date you pick and on the Pro tiers.
- Gemini 4 Argon's price does double on 2026-12-01, from $2/$10 to $4/$20, per Google's pricing page.

Epoch's 'The plunging price of thought' (Emberson and Roodman, 2026-09-22) measures cost per question at fixed accuracy, not per-token price. It finds a 47%/quarter decline (13x/yr) across five benchmarks, 66.3%/quarter at SOTA debut, and 32.4%/quarter two years later. It reports no standard errors. Its per-model cost-per-question data is public (github.com/droodman/inference-cost).

Caveats to keep in view:
- Per-token list prices ignore token usage. Reasoning effort varies, and Claude 4.7+ uses a new tokenizer that produces about 30% more tokens for the same text.
- Several current list prices differ from the price on the snapshot date: o3's 80% cut in June 2025, Sonnet 5's intro price made permanent, GPT-5.6 Sol's promo running to Nov 30, and Gemini's Dec 1 and Jan 1 increases.
- Some prices on Epoch's model pages look like third-party or averaged host prices (e.g. DeepSeek-V3.2 at $0.289/$1.029) and differ from the official ones.
- All numbers came through a fetch-and-summarise tool. The author should download the ECI CSV directly and spot-check before publishing.

## Metric choice

The capability metric is the Epoch Capabilities Index (ECI), taken from one vintage of https://epoch.ai/data/eci_scores.csv (updated 2026-11-07). It covers about 150 models released since 2025-01 from every major lab on one linear scale (Claude 3.5 Sonnet = 130, GPT-5 = 150). Because it combines many benchmarks, it does not saturate across the Nov 2025 to Nov 2026 window the way GPQA would; GPQA is about 90%+ for top models now. Use the same CSV vintage for all three snapshots, so the 12-months-ago chart is a retrospective on today's consistent scale.

Price is the first-party list price per 1M tokens (standard tier, short context, peak, no caching or batch), blended 3:1 input:output: (3×input + output)/4. It comes from official pricing pages where available, otherwise from Epoch model pages, and the source is flagged per model.

The more rigorous alternative is cost per question at fixed accuracy, from Epoch's 'plunging price of thought' data (GPQA Diamond, FrontierMath). It accounts for reasoning-token use and tokenizer differences, but it covers fewer models. Use it as a cross-check or second panel.

A model counts as available at a snapshot if its release date (Epoch's 'date' field) is on or before the snapshot date. Ideally use the price in force on that date (see open_questions). The data_points use today's list prices unless noted.

## Fact-check

The load-bearing numbers hold. All 25 data-point ECI values and dates match the live eci_scores.csv (253 rows, 150 from 2025 onward), and every blended 3:1 price recomputes correctly. Spot-checked list prices match the official OpenAI, Anthropic, Google, xAI, DeepSeek and Z.ai pages. Epoch's 47%/q, 13x/yr, 66.3% and 32.4% figures, the games and math ranges, and the 725x example are confirmed, as are the Figure 2 values.

Corrections and flags:
(1) Epoch itself misdates o3 to 2025-01-31, which is o3-mini's date; o3 was released 2025-04-16. Do not repeat that date.
(2) GPT-5 Pro and GPT-5.2 Pro prices are on OpenAI's own page; cite them first-party.
(3) Epoch per-token prices for DeepSeek-V3.2, Kimi K2.5/K2.6, gpt-oss-120b and DeepSeek-V4 name no source and look like third-party prices. Label them, or replace them with official prices.
(4) Gemini 4 Argon is coded 'Limited access'.
(5) Haiku 5.5's per-token price understates cost by about 30% (new tokenizer). Use GPT-6 Luna, also $0.20 at ECI 156.68, as the cleaner Nov 2026 endpoint.
(6) The equal-price and top-of-range results are sensitive to thresholds and to overlapping CIs. GPT-6.1 Sol sits exactly at $4. GPT-6.1 Terra ($2) is statistically tied with the top model. On this data, 'the best AI is getting more expensive' is true only Nov 2025 to May 2026 via the Pro tiers, and is false today; Epoch's paper does not make that claim.
(7) Mixing per-token list prices (the chart) with Epoch's per-question cost (13x/yr) mixes two metrics; keep them on separate charts.

All CSV reads went through a fetch summariser. Download the CSV and verify it locally before publishing.

- **confirmed**: ECI rolls many benchmarks into one general-capability scale. Absolute values mean nothing on their own. Anchors: Claude 3.5 Sonnet = 130, GPT-5 = 150; linear; no maximum; last updated 2026-11-07 (Cyber ECI 2026-11-04).  
  → Anchors 130 (Claude 3.5 Sonnet) and 150 (GPT-5). The page says 'The ECI scale is linear', 'there is no maximum achievable ECI' and 'Absolute ECI values are meaningless by themselves'. Anchors 'may be revisited'. Model scores, benchmark difficulty and slopes updated Nov 7, 2026; Cyber ECI Nov 4, 2026. CC-BY.  
  Source: https://epoch.ai/benchmarks/eci  
  The page also says ECI values are not linearly related to benchmark accuracy. The downloads listed are eci_scores.csv, eci_benchmarks.csv, edi_scores.csv and cyber/processed_data_for_eci.csv. Keep one dated vintage of the CSV for all three snapshots.
- **confirmed**: The ECI CSV has about 150 models released 2025-01-01 or later, with CIs. Top 7 today: GPT-6 Astra 169.07 (166.16–172.28, 2026-09-03), GPT-6.1 Sol 168.94 (2026-09-29), Claude Opus 5.5 168.36 (2026-09-22), GPT-6.1 Terra 167.82 (2026-10-26), Claude Fable 5.1 166.90, Gemini 4 Argon 166.45, Claude Sonnet 5.5 166.24.  
  → 253 data rows in total; 150 have a date on or after 2025-01-01. All top-7 values and dates match: Fable 5.1 2026-09-01, Argon 2026-09-30, Sonnet 5.5 2026-09-28. Ranks 8–10 are Claude Opus 5 164.45, Claude Fable 5 164.19 and GPT-6 Sol 164.06. The header is as described.  
  Source: https://epoch.ai/data/eci_scores.csv  
  Read through a fetch summariser again, so download and parse it locally before publishing. Gemini 4 Argon is coded 'Limited access' / 'Other', not 'API access', so it may not count as a generally available frontier point. The top four CIs overlap almost completely (e.g. Astra 166.16–172.28 vs 6.1 Sol 165.97–172.19), so do not call any one model 'the best'. Model pages say 'of 237 tracked models', which differs from the CSV's 253 rows (probably versions or unranked rows).
- **confirmed**: The price of a fixed performance level fell 47% per quarter (13x per year) across five benchmarks since 2023. Games 39–43%/q (7–10x/yr), math 50–52%/q (16–19x/yr), alternative averaging 42.9–58.0%/q.  
  → About 47%/quarter, about 13x/yr (Figure 7 caption: 47.0%/q = 12.6x/yr). Games 'about 39–43% per quarter (7–10× per year)'; math '50–52% per quarter (16–19× per year)'. Alternative grid averaging gives 42.9–58.0%/q. Model-free per-benchmark rates: AIME 47.1, Chess 43.0, FrontierMath T1–3 53.1, GPQA 47.0, Mystery Game 44.0. Box-Tidwell model (Table 1): 50.0 / 43.4 / 52.4 / 49.3 / 38.7.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Authors Luke Emberson and David Roodman, published 2026-09-22. The 2026-09-23 update added the Demirer, Fradkin and Tadelis (2026) citation and a limitations caveat. The metric is cost per question on a cost-accuracy Pareto frontier (CAISI token-budget simulation), not per-token price. No standard errors are reported.
- **confirmed**: The decline is 66.3%/quarter (about 75x/yr) at SOTA debut and 32.4%/quarter (about 4.7x/yr) eight quarters later.  
  → Table 2: SOTA 66.3%, then 58.3, 51.8, 46.6, 42.4, 39.1, 36.4, 34.2, and 32.4% at 8 quarters. At SOTA by benchmark: AIME 83.3, Chess 41.8, FrontierMath 63.6, GPQA 80.7, Mystery 35.9.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  The 'about 75x/yr' figure is the author's annualisation: 0.337^4 gives about 77x. The rate itself decays every quarter, so annualising the at-debut rate overstates it. Say '66% per quarter at debut' instead. Epoch describes a launch premium ('AI companies can briefly charge a premium'). It does NOT say frontier prices are rising; its only rising-price claim is about inputs (chips, power, labour). The per-benchmark spread is wide (Mystery 35.9% vs AIME 83.3%).
- **confirmed**: 725-fold drop: o3 about $0.30/question vs GPT-5.6 Luna $0.0004 on GPQA Diamond at the 75% level, in under 18 months.  
  → Figure 2 CSV: o3 (high) $0.298906 (acc 0.7576) vs GPT-5.6 Luna (low) $0.000412 (acc 0.7525), ratio 725.5. Footnote: '75%' means 75% of the way from the 25% guessing rate to perfect, i.e. 81.25% raw. (Note that the CSV 'acc' values of about 0.75 look like the rescaled measure.)  
  Source: https://raw.githubusercontent.com/droodman/inference-cost/main/output/slides/Figure%202.csv  
  MISDATING in Epoch's own source: both the article and the CSV date o3 to 2025-01-31, which is o3-mini's release date. The CSV also dates o3 (low) on Chess and o3 (medium) on FrontierMath to 2025-01-31. o3 was released 2025-04-16, as the ECI CSV says. With the correct date the gap is about 14.8 months, not about 17.3, so 'under 18 months' still holds. Cite the 725x but do not repeat the Jan 31 date.
- **confirmed**: Figure 2 CSV (40 rows) gives the cost-record steps, e.g. the GPQA 75% chain o3 → Gemini 2.5 Pro $0.012932 → DeepSeek-V3.2 $0.008821 → Qwen3.5 397B $0.007102 → Qwen 3.5 Flash $0.0021805 → MiniMax-M3 $0.001213 → GPT-5.6 Luna $0.000412, and FrontierMath 75% GPT-5.4 (xhigh) $2.152405 → GPT-5.6 Luna (max) $0.218951.  
  → 40 rows; every value and date matches. There is also an extra GPQA row: 'Gemini 2.5 Pro (Jun 2025)' dated 2025-03-25 at $0.089116, before the 2025-06-05 $0.012932 row.  
  Source: https://raw.githubusercontent.com/droodman/inference-cost/main/output/slides/Figure%202.csv  
  The 2025-03-25 row is labelled with the June model but carries the March release date. ECI dates Gemini 2.5 Pro (Mar 2025) to 2025-03-31, so Epoch's sources disagree by about 6 days. The model label is 'Qwen3.5 397B-A17B', and Qwen 3.5 Flash is 'hosted 35B-A3B'. These rows are records only, not every model.
- **confirmed**: Epoch model pages list per-1M prices with no named source, some blank, and some look like host averages (e.g. DeepSeek-V3.2 $0.289/$1.029, Kimi K2.5 $0.551/$2.825).  
  → DeepSeek-V3.2 page: $0.289/$1.029. Its provider note links DeepSeek's Dec 1, 2025 API news post, yet secondary aggregators give the direct-API price as about $0.28/$0.42 (non-thinking). Spot-checks found blank prices on Muse Spark Open and Beam 1.0. Other Epoch prices: Kimi K2.6 $0.95/$4; DeepSeek-V4-Pro $1.15/$2.60; DeepSeek-V4-Flash $0.14/$0.28; Qwen 3.8 27B $0.425/$2.55; Inkling-Small $0.50/$1.20; gpt-oss-120b $0.10/$0.55. None names a price source.  
  Source: https://epoch.ai/models/deepseek-v3-2  
  I did not re-open the six blank pages listed (Kimi K2 Thinking, Muse Spark, Muse Wonder, Grok 4.20, Mistral Large 4, Opus 4.1). Kimi K2.5's official price per secondary sources is about $0.60 in / $2.50–3.00 out, not $0.551/$2.825. The official DeepSeek-V3.2 rate is only confirmed via aggregators (DeepSeek no longer lists V3.2), so treat it as unverified.
- **confirmed**: Google doubles Gemini 4 Argon on Dec 1, 2026 ($2→$4 in, $10→$20 out); Gemini 3.8 Flash and 3.6 Flash go $0.75→$1.50 in and $3.75→$7.50 out on Jan 1, 2027.  
  → As stated. Also: gemini-2.5-pro routes to 3.8 Flash and gemini-2.5-flash routes to 3.5 Flash-Lite from Dec 1, 2026. 3.5 Flash-Lite costs $0.30/$2.50. Gemini 3 Flash (Preview) is still listed at $0.50/$3.00 and called 'legacy'. Gemini 3.1 Pro Preview costs $2/$12 (≤200K).  
  Source: https://aistudio.google.com/docs/pricing  
  These are paid-tier Standard rates. The page is 103K characters and the last 3.5K were not read. ECI codes Gemini 4 Argon as 'Limited access', which is worth stating next to the price-doubling line.
- **confirmed**: Anthropic list prices, and Claude 4.7+ uses a new tokenizer producing about 30% more tokens.  
  → Opus 5.5 $4/$20; Sonnet 5.5 $2/$10; Haiku 5.5 $0.10/$0.50 for prompts up to 100,000 tokens and $0.50/$2.50 above; Fable 5/5.1 $10/$50; Opus 4.5/4.6/4.7/4.8/5 $5/$25; Sonnet 5 $2/$10 (footnote: the intro price 'is now the standard price', and the Sep 1, 2026 increase to $3/$15 'will not occur'); Sonnet 4.5/4.6 $3/$15; Haiku 4.5 $1/$5; Opus 4/4.1 $15/$75. Opus 4.1 is retired except on Google Cloud and Bedrock. The tokenizer produces 'approximately 30% more tokens for the same text' for Claude 4.7 and later models and Mythos Preview.  
  Source: https://platform.claude.com/docs/en/about-claude/pricing  
  The page also lists Claude Mythos 5 / 5.1 (limited availability) at $10/$50, which is not in the summary. Because of the tokenizer, Haiku 5.5's effective blended price is about $0.26 on old-tokenizer text, not $0.20.
- **corrected**: OpenAI list prices (standard, short context), with GPT-5 Pro and GPT-5.2 Pro prices taken from Epoch pages.  
  → All listed prices match. Correction: gpt-5-pro ($15/$120), gpt-5.2-pro ($21/$168) and gpt-5.4-pro ($30/$180) ARE on OpenAI's own pricing page, so cite them as first-party. o4-mini is not listed. The gpt-5.6-sol $4/$20 promo runs until Nov 30, 2026, and no post-promo price is stated. gpt-5.5/5.5-pro/5.4/5.4-pro rates apply to contexts under 272K.  
  Source: https://developers.openai.com/api/docs/pricing  
  o3 launched at $10/$40 and was cut about 80% to $2/$8 on 2025-06-10 (Simon Willison, VentureBeat). Use $10/$40 for any snapshot before June 2025.
- **confirmed**: xAI, DeepSeek and Z.ai list prices.  
  → xAI: grok-4.5/4.6/4.7 $2/$6 (<200K; $4/$12 at ≥200K); grok-4.3 and grok-4.20-0309 $1.25/$2.50 (<200K). Grok 4 and Grok 4 Fast are not listed. DeepSeek: the model name is 'deepseek-flash' (version DeepSeek-V4.1-Flash-1017), cache-miss input $0.30 peak / $0.15 off-peak, output $1.20 / $0.60. deepseek-v4-pro (V4-Pro-0813) costs $1.32/$3.96 peak and $0.66/$1.98 off-peak. Z.ai: GLM-5.1/5.2/5.3 $1.4/$4.4; GLM-5.3-Flash $0.15/$0.50; GLM-5 $1/$3.2; GLM-4.7 $0.6/$2.2.  
  Source: https://api-docs.deepseek.com/quick_start/pricing/  
  DeepSeek peak hours are only 01:00–04:00 and 06:00–10:00 UTC on weekdays, so most hours are off-peak. Say which rate you use. Z.ai cached-input storage is 'Limited-time Free' with no end date. xAI: https://docs.x.ai/docs/models ; Z.ai: https://docs.z.ai/guides/overview/pricing
- **confirmed**: Open-weight models trail frontier closed models by about 4 months / 8 ECI points since January 2026.  
  → 'lagged frontier closed models by an average of four months', with an average ECI gap of 8 points, since January 2026. Published 2026-05-29 by Jack Edwards and Luke Emberson.  
  Source: https://epoch.ai/data-insights/open-closed-eci-gap  
  The figure is as of May 2026. It has not been re-checked against the Nov 2026 CSV.
- **confirmed**: Cheaper at equal capability: cheapest ECI ≥150 went $3.44 (GPT-5, Nov 2025) → $1.125 (Gemini 3 Flash, May 2026) → $0.20 (Haiku 5.5 / GPT-6 Luna, Nov 2026), about 17x in 12 months.  
  → The arithmetic holds with the known prices: 3.4375/0.20 = 17.2x. May 2026 alternatives at ECI ≥150 cost more: Grok 4.20 and Grok 4.3 Beta $1.5625, DeepSeek-V4-Pro $1.51 (Epoch price), Kimi K2.6 $1.71, GLM-5.1 $2.15. Nov 2026: GPT-6 Luna (156.68) and Haiku 5.5 (160.22) are both $0.20; GLM-5.3-Flash (153.64) is $0.2375; DeepSeek V4.1 Flash 1017 (159.31) is $0.2625 off-peak or $0.525 peak.  
  Source: https://epoch.ai/data/eci_scores.csv  
  Fragilities: (1) At the Nov 2025 snapshot only GPT-5 (the 150 anchor, no CI) and GPT-5 Pro clear the bar, so the start point is the anchor by definition. (2) Open-weight models with no price could be cheaper than $0.20 via third-party hosts: Muse Spark Open 155.42, Beam 1.0 150.78, Qwen 3.8 27B 152.73 ($0.425/$2.55 on Epoch, not cheaper). (3) Haiku 5.5's tokenizer makes it about $0.26 effective, so GPT-6 Luna is the cleaner endpoint. (4) Muse Spark (153.1, Apr 2026) has no price.
- **confirmed**: Better at equal price: at ≤$4 the best ECI went 150.0 → about 152.3 → 168.9 (GPT-6.1 Sol at exactly $4.00); at ≤$0.25 it went 140.2 (gpt-oss-120b) → 146.9 (DeepSeek-V4-Flash) → 160.2 (Haiku 5.5).  
  → Matches the CSV and the prices: Gemini 3 Flash 152.25 ($1.125), Grok 4.20 152.27 ($1.5625), GPT-6.1 Sol 168.94 ($4.00), DeepSeek-V4-Flash 146.86 ($0.175 on Epoch), Haiku 5.5 160.22 ($0.20), gpt-oss-120b 140.22 ($0.2125, third-party price).  
  Source: https://epoch.ai/data/eci_scores.csv  
  The thresholds bite at their edges. GPT-6.1 Sol sits exactly at $4.00; a strict '<$4' gives GPT-6.1 Terra 167.82 at $2.00, which is statistically indistinguishable. Gemini 3.1 Pro (156.24) is just over the line at $4.50 in May 2026; at a $5 cap the May value jumps to 156.2. Muse Spark 153.1 has no price. The ≤$0.25 Nov 2025 point relies on a third-party gpt-oss price. Show the thresholds as a sensitivity check, not single numbers.
- **confirmed**: Top of range: most capable model cost $41.25 blended in Nov 2025 (GPT-5 Pro, 151.2), $67.50 in May 2026 (GPT-5.5 Pro, 162.7), and $20 today (GPT-6 Astra, 169.1).  
  → GPT-5 Pro 151.15 at $15/$120 → $41.25. GPT-5.5 Pro 162.67 at $30/$180 → $67.50. GPT-6 Astra 169.07 at $10/$50 → $20.00.  
  Source: https://developers.openai.com/api/docs/pricing  
  Top-model CIs overlap (Astra vs 6.1 Sol vs Opus 5.5), and the cheapest model statistically tied with Astra is GPT-6.1 Terra at $2.00. So 'the best AI is getting more expensive' is NOT supported on this dataset today. It holds only Nov 2025 → May 2026 via the Pro tiers. Epoch's article does not claim it either.

### Missed evidence

- Claude Mythos 5 / 5.1 (limited availability) is on Anthropic's price page at $10/$50 but not in the summary; check whether ECI scores it. https://platform.claude.com/docs/en/about-claude/pricing
- OpenAI lists gpt-5-pro, gpt-5.2-pro and gpt-5.4-pro ($30/$180, ECI 160.21) on its own pricing page; cite first-party, not Epoch. https://developers.openai.com/api/docs/pricing
- o3 was cut 80% on 2025-06-10 ($10/$40 → $2/$8), so snapshot prices before then differ. https://simonwillison.net/2025/Jun/10/o3-price-drop/
- Epoch dates o3 to 2025-01-31 in the price-of-thought article and the Figure 2 CSV, which is o3-mini's date; the ECI CSV says 2025-04-16. https://raw.githubusercontent.com/droodman/inference-cost/main/output/slides/Figure%202.csv
- Gemini 4 Argon is 'Limited access' / 'Other' in the ECI CSV, which affects whether it counts as an available frontier point. https://epoch.ai/data/eci_scores.csv
- Gemini 3.1 Pro (ECI 156.24, $2/$12 = $4.50 blended) sits just over the $4 threshold for the May 2026 snapshot. https://aistudio.google.com/docs/pricing
- Open-weight models with no price could undercut $0.20 at ECI ≥150 via third-party hosts: Muse Spark Open (155.42), Beam 1.0 (150.78). https://epoch.ai/models/muse-spark-open
- DeepSeek peak/off-peak structure: peak is only 7 weekday hours (UTC), so off-peak is arguably the typical price. The model name is 'deepseek-flash'. https://api-docs.deepseek.com/quick_start/pricing/
- Epoch's interactive per-task cost plots, which could support a per-task version of the chart. https://droodman.github.io/inference-cost/
- Epoch's price-of-thought article says the launch premium erodes but does NOT say frontier prices are rising; the only rising prices it mentions are input costs (chips, power, labour). https://epoch.ai/publications/the-plunging-price-of-thought
- Official Kimi K2.5 price is about $0.60 in / $2.50–3.00 out per secondary sources, versus Epoch's $0.551/$2.825; the official platform.moonshot.ai table was not verified.

## Findings

- **ECI rolls many benchmarks into one general-capability scale that stays usable after individual benchmarks saturate. Absolute values have no meaning; only comparisons do.**  
  Anchors: Claude 3.5 Sonnet = 130, GPT-5 = 150; linear, no maximum. Last updated 2026-11-07 (Cyber ECI 2026-11-04). (2026-11-07). Confidence: high, source type: official_leaderboard  
  [Epoch Capabilities Index (Epoch AI Benchmarking Hub)](https://epoch.ai/benchmarks/eci)  
  Data downloads: https://epoch.ai/data/eci_scores.csv (scores, CIs, dates, accessibility), https://epoch.ai/data/eci_benchmarks.csv, https://epoch.ai/data/edi_scores.csv. Epoch says the anchors may be revisited, so use one dated vintage of the CSV for all three snapshots.
- **The ECI CSV has a score with a credible interval and a release date for about 150 models released 2025-01-01 or later, covering all major labs.**  
  Top today: GPT-6 Astra 169.07 (CI 166.16–172.28, 2026-09-03); GPT-6.1 Sol 168.94 (2026-09-29); Claude Opus 5.5 168.36 (2026-09-22); GPT-6.1 Terra 167.82 (2026-10-26); Claude Fable 5.1 166.90; Gemini 4 Argon 166.45; Claude Sonnet 5.5 166.24 (2026-11-07). Confidence: medium, source type: official_leaderboard  
  [Epoch AI eci_scores.csv](https://epoch.ai/data/eci_scores.csv)  
  Read through WebFetch's summariser, not parsed locally. The model pages agree on the rounded values (e.g. GPT-6.1 Sol shows 169; Kimi K2.6 shows 152 vs 151.56 in the CSV). Columns: Model, Display name, eci, eci_ci_low, eci_ci_high, date, Organization, Country, Model accessibility, Accessibility group, model_versions. Download and verify before publishing.
- **Price of a fixed performance level fell 47% per quarter (13x per year) on average across five benchmarks since 2023.**  
  47%/quarter = 13x/yr. Games 39–43%/q (7–10x/yr); math 50–52%/q (16–19x/yr); other averaging choices give 42.9–58.0%/q. (2026-09-22). Confidence: high, source type: primary  
  [The plunging price of thought (Emberson & Roodman, Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Benchmarks: AIME (OTIS Mock), Chess Puzzles, FrontierMath T1-3, GPQA Diamond, Mystery Game Puzzles. The cost is cost per question at fixed accuracy along a cost-accuracy Pareto frontier (CAISI method, using token budgets from transcripts), not per-token list price. No standard errors are reported ('reasonable but rough'). Updated 2026-09-23 to add a caveat and a citation.
- **The decline is fastest right after a capability level is first reached and slows later.**  
  66.3%/quarter (about 75x/yr) at SOTA debut; 32.4%/quarter (about 4.7x/yr) eight quarters later (2026-09-22). Confidence: high, source type: primary  
  [The plunging price of thought, Table 2](https://epoch.ai/publications/the-plunging-price-of-thought)  
  This bears directly on the 'best AI gets more expensive' point. New SOTA levels carry a premium that erodes as competitors catch up.
- **725-fold drop example: o3 vs GPT-5.6 Luna on GPQA Diamond.**  
  o3 about $0.30/question vs GPT-5.6 Luna $0.0004/question at the same score (75% level; raw 81.25% per footnote) in under 18 months (2026-09-22). Confidence: medium, source type: primary  
  [The plunging price of thought](https://epoch.ai/publications/the-plunging-price-of-thought)  
  $0.30/$0.0004 = 750x, not 725x; the gap is probably rounding (the Figure 2 CSV has o3 (high) at $0.298906 and GPT-5.6 Luna (low) at $0.000412, which gives 725x). The page dates o3 to 2025-01-31, which is o3-mini's release date; the ECI CSV dates o3 to 2025-04-16. Quote the example with care.
- **Epoch's Figure 2 data gives per-model cost per question at fixed accuracy levels.**  
  GPQA 75% frontier: o3 (high) $0.298906 → Gemini 2.5 Pro $0.012932 (2025-06-05) → DeepSeek-V3.2 $0.008821 (2025-12-01) → Qwen3.5 397B $0.007102 (2026-02-13) → Qwen 3.5 Flash $0.0021805 (2026-02-25) → MiniMax-M3 $0.001213 (2026-06-01) → GPT-5.6 Luna (low) $0.000412 (2026-07-09). FrontierMath 75%: GPT-5.4 (xhigh) $2.152405 (2026-03-05) → GPT-5.6 Luna (max) $0.218951 (2026-07-09). (2026-09-22). Confidence: medium, source type: primary  
  [droodman/inference-cost, output/slides/Figure 2.csv](https://raw.githubusercontent.com/droodman/inference-cost/main/output/slides/Figure%202.csv)  
  40 rows. These are cost-record steps only, not every model. Some dates look odd, e.g. 'Gemini 2.5 Pro (Jun 2025)' dated 2025-03-25. The repo also has data/cost_truncated_curves.csv, analysis_data.dta and output/tables/record_timelines.html (cost records at 25% and 75% with equivalent ECI). These would allow a per-task-cost version of the chart.
- **Epoch's per-model pages list input and output prices per 1M tokens, but some fields are blank and the price source is not named.**  
  Blank ('—') for Kimi K2 Thinking, Muse Spark, Muse Wonder, Grok 4.20, Mistral Large 4, Claude Opus 4.1 (2026-11-07). Confidence: medium, source type: secondary_aggregator  
  [Epoch AI model pages (e.g. /models/gpt-6-1-sol)](https://epoch.ai/models/gpt-6-1-sol)  
  Some values look like third-party or averaged host prices rather than first-party list prices: DeepSeek-V3.2 $0.289/$1.029; Kimi K2.5 $0.551/$2.825; Qwen3.7-Max $1.475/$4.425; DeepSeek V4.1 Flash $0.15/$0.60, which equals DeepSeek's official off-peak rate (peak is $0.30/$1.20).
- **Google is doubling Gemini 4 Argon prices on Dec 1, 2026, with Flash increases following Jan 1, 2027.**  
  Gemini 4 Argon $2.00→$4.00 in, $10.00→$20.00 out (Dec 1, 2026); Gemini 3.8 Flash and 3.6 Flash $0.75→$1.50 in, $3.75→$7.50 out (Jan 1, 2027) (2026-11-07). Confidence: high, source type: primary  
  [Gemini API pricing (Google AI Studio docs)](https://aistudio.google.com/docs/pricing)  
  Gemini 2.5 Pro is deprecated and its requests route to Gemini 3.8 Flash on Dec 1. Gemini 2.5 Flash routes to 3.5 Flash-Lite. Gemini 3 Pro, 3.5 Flash and 3.7 Flash are no longer listed; their prices come from Epoch model pages.
- **Anthropic list prices; Claude 4.7+ uses a new tokenizer, so per-token prices are not directly comparable.**  
  Opus 5.5 $4/$20; Sonnet 5.5 $2/$10; Haiku 5.5 $0.10/$0.50 (prompts ≤100K tokens; $0.50/$2.50 above); Fable 5/5.1 $10/$50; Opus 4.5–5 $5/$25; Sonnet 5 $2/$10 (intro price made standard; the planned Sep 1 rise to $3/$15 was cancelled); Sonnet 4.5/4.6 $3/$15; Haiku 4.5 $1/$5; Opus 4/4.1 $15/$75. The new tokenizer produces 'approximately 30% more tokens for the same text'. (2026-11-07). Confidence: high, source type: primary  
  [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing)  
  The tokenizer change means Claude 4.7+ per-token prices understate cost by about 30% relative to older Claude models. A per-task cost avoids this.
- **OpenAI list prices (standard tier, short context).**  
  gpt-6-astra $10/$50; gpt-6.1-sol $2/$10; gpt-6.1-terra $1/$5; gpt-6-sol $2/$10; gpt-6-luna $0.10/$0.50; gpt-5.6-sol $4/$20 (promotional until 2026-11-30); gpt-5.6-terra $2/$12; gpt-5.6-luna $0.20/$1.20; gpt-5.5 $5/$30; gpt-5.5-pro $30/$180; gpt-5.4 $2.50/$15; gpt-5.4-mini $0.75/$4.50; gpt-5.4-nano $0.20/$1.25; gpt-5.2 $1.75/$14; gpt-5.1 and gpt-5 $1.25/$10; gpt-5-mini $0.25/$2; gpt-5-nano $0.05/$0.40; o3 $2/$8; gpt-4.1 $2/$8 (2026-11-07). Confidence: high, source type: primary  
  [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)  
  o4-mini is no longer listed; Epoch's page gives $1.10/$4.40. GPT-5 Pro $15/$120 and GPT-5.2 Pro $21/$168 also come from Epoch pages. GPT-5.6 Sol's post-promo price is not stated.
- **xAI, DeepSeek and Z.ai list prices.**  
  xAI: grok-4.5/4.6/4.7 $2/$6 (<200K); grok-4.3 and grok-4.20-0309 $1.25/$2.50. DeepSeek: V4.1-Flash-1017 peak $0.30/$1.20, off-peak $0.15/$0.60; V4-Pro-0813 peak $1.32/$3.96, off-peak $0.66/$1.98. Z.ai: GLM-5.1/5.2/5.3 $1.4/$4.4; GLM-5.3-Flash $0.15/$0.50; GLM-5 $1/$3.2; GLM-4.7 $0.6/$2.2 (2026-11-07). Confidence: high, source type: primary  
  [xAI models docs; DeepSeek pricing; Z.ai pricing](https://docs.x.ai/docs/models)  
  DeepSeek: https://api-docs.deepseek.com/quick_start/pricing/ ; Z.ai: https://docs.z.ai/guides/overview/pricing. xAI no longer lists Grok 4 or Grok 4 Fast (Epoch pages give $3/$15 and $0.20/$0.50). The Kimi and Alibaba official pricing tables did not render.
- **Open-weight models trail frontier closed models by about 4 months on ECI.**  
  About 4 months / 8 ECI points since January 2026 (2026-05-29). Confidence: high, source type: primary  
  [Open models lag state-of-the-art closed models by 4 months (Epoch data insight)](https://epoch.ai/data-insights/open-closed-eci-gap)  
  Useful for colouring open vs closed points on the frontier chart.
- **Epoch's earlier per-token analysis found price declines at fixed performance of 9x–900x per year depending on threshold.**  
  9x–900x/yr; GPT-4-level GPQA Diamond about 40x/yr (2025-03-12). Confidence: high, source type: primary  
  [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends)  
  Uses USD per 1M tokens and excludes reasoning models. The blend ratio was not visible in the fetched text. Superseded in method by 'plunging price of thought'. Data: https://epoch.ai/data/charts/llm-inference-price-trends/other_models_data.csv (371 rows, single blended price column).
- **A competing estimate, Gundlach et al. (MIT FutureTech, 'The Price of Progress'), finds slower declines.**  
  5–10x per year (algorithmic improvements about 3x) (2026-03). Confidence: medium, source type: secondary_aggregator  
  [Cited in Epoch 'plunging price of thought'; secondary summaries](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Cite as a range: 5–10x/yr (MIT) vs 13x/yr (Epoch). I did not fetch the MIT paper itself.

## Data points
76 models; also in `data/frontier_epoch.csv`.

## Counter-evidence

- Per-token list price is not cost per task. Reasoning models spend very different token counts, and Claude 4.7+ uses a tokenizer that makes about 30% more tokens. A per-token frontier can therefore overstate or understate real cost changes. Epoch's own 13x/yr figure uses cost per question, and its 2025 per-token analysis excluded reasoning models.
- The 'best AI getting more expensive' claim depends on the dates chosen. The most capable available model cost $41.25 blended in Nov 2025 (GPT-5 Pro) and $67.50 in May 2026 (GPT-5.5 Pro), but today's top ECI model (GPT-6 Astra, 169.07) is $20 blended. GPT-6.1 Sol reaches 168.94 at $4 blended. Gemini 4 Argon's Dec 1 doubling ($2/$10 to $4/$20) is real, but it is one model.
- Several current list prices are not the prices in force on a snapshot date. o3 launched at $10/$40 and was cut to $2/$8 in June 2025 (from memory, not re-verified here). Sonnet 5 launched on intro pricing. GPT-5.6 Sol is on promo until 2026-11-30. Gemini prices rise Dec 1 and Jan 1. Some older models are retired or no longer listed.
- Epoch's 725x example: $0.30/$0.0004 = 750x, and the page dates o3 to 2025-01-31, which is o3-mini's date (ECI CSV: o3 = 2025-04-16). The Figure 2 CSV values ($0.298906 / $0.000412) do give about 725x.
- The ECI scores are today's vintage. Epoch refits ECI as models and benchmarks are added, so 'the chart as it looked 12 months ago' drawn with today's scores is a retrospective on a consistent scale, not what Epoch showed then. Older vintages may differ.
- Some Epoch model-page prices look like third-party host or averaged prices (DeepSeek-V3.2 $0.289/$1.029; Kimi K2.5 $0.551/$2.825; V4.1 Flash at the official off-peak rate) rather than first-party peak list prices.
- Epoch reports no standard errors on the 47%/quarter estimate, warns about benchmark contamination ('benchmaxxing'), and notes that the frontier assumes users always switch to the cheapest model.

## Chart ideas

- Three-panel (or animated) step chart: x = blended $/Mtok (log scale), y = ECI. Each panel draws the Pareto frontier (max ECI at or below each price) using only models released on or before 2025-11-07, 2026-05-07 and 2026-11-07. Overlay the earlier frontiers as faded lines on the latest panel so the upward and leftward shift is visible.
- Equal-capability readout: a horizontal line at ECI 150 (GPT-5 level) with the cheapest model crossing it in each snapshot: $3.44 (GPT-5) → $1.125 (Gemini 3 Flash) → $0.20 (Claude Haiku 5.5 / GPT-6 Luna), about 17x in 12 months on per-token price.
- Equal-price readout: vertical lines at $0.25 and $4 blended with the best ECI at or below each. $0.25: 140.2 → 146.9 → 160.2. $4: 150.0 → about 152.3 → 168.9.
- A per-task version of the same chart using Epoch's GPQA Diamond and FrontierMath cost-per-question data (droodman/inference-cost). This is the cleanest apples-to-apples cost measure, and the GPQA-75% steps fall from $0.30 to $0.0004 per question.
- Marker colour by open vs closed weights (Epoch gap: about 4 months / 8 ECI), and marker labels for lab. Show ECI credible intervals as vertical whiskers so readers see that differences of about 2 points are within noise.
- Top-of-market strip: price of the highest-ECI available model at each snapshot ($41.25 → $67.50 → $20), with the Gemini 4 Argon Dec 1 price doubling annotated.

## Open questions

- Kimi official prices: the platform.kimi.ai tables did not render. Epoch gives K3 $3/$15, K2.6 $0.95/$4 and K2.5 $0.551/$2.825. K2 Thinking (ECI 145.51, released 2025-11-06, i.e. inside the 12-month snapshot) has no price on Epoch and still needs one.
- Prices for Meta Muse Spark / Spark 1.1–1.3 / Wonder / Spark Open, Mistral Large 4 and Medium 3.5, Qwen 3.6/3.7-Plus/3.8 27B, GPT-5.4 Pro, Inkling, Beam 1.0, Nemotron 3 Ultra and Gemma 4. They are not on Epoch's pages or were not fetched.
- Grok 4.20 had no Epoch price. xAI currently lists grok-4.20-0309 at $1.25/$2.50, but the Feb 17, 2026 launch price was not verified.
- Historical price as of each snapshot date for models whose prices changed: o3, Gemini 2.5, DeepSeek versions, Sonnet 5, GPT-5.6 Sol promo. The Wayback Machine snapshots of official pricing pages would settle this.
- GPT-5.6 Sol's price after the promo ends on 2026-11-30 is not stated on the OpenAI page.
- Prices for DeepSeek-V3.2-Exp (ECI 144.41, 2025-09-29) and Qwen3-Max (142.5, 2025-09-24) at the Nov 2025 snapshot. From memory they were about $0.28/$0.42 and $1.2/$6, but neither was verified, so both are left out of data_points.
- Whether to use peak or off-peak DeepSeek prices, and short-context or long-context tiers (Haiku 5.5 ≤100K vs >100K; Gemini ≤200K). The dataset uses short-context first-party prices, but Epoch's V4.1 Flash price is the off-peak rate.
- Whether Epoch's model-page price field is first-party list price or a host average. Epoch does not say, and the data-dictionary page was not checked.
- All ECI values passed through a summarising fetch tool. The author should download eci_scores.csv (CC-BY) and verify every value, plus open-weight status from its 'Accessibility group' column, before publishing.
