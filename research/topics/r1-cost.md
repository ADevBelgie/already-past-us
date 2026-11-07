# Cost of AI over time

Research round r1, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

The evidence strongly supports "AI is getting cheaper" when cheaper means the price of a fixed level of capability. Every independent series finds declines of an order of magnitude or more per year. Epoch AI's newest and most careful estimate ("The plunging price of thought", 22 Sep 2026) measures cost per question, reasoning tokens included, on the cheapest model that reaches each score. It finds about 47% per quarter, roughly 13x per year, since 2023. The decline is about 75x per year right after a score first becomes state of the art and slows to about 4.7x per year two years later. Older or narrower estimates agree in direction but not in size: a16z found about 10x per year (per token, MMLU, 2024), Epoch 2025 found 9x to 900x per year by task, and Gundlach et al. (MIT, 2025/26) found 5x to 10x per year, of which only about 3x per year is algorithmic efficiency and about 1.43x per year is hardware. Hardware price-performance improves far more slowly: about 30% per year, doubling roughly every 2 years. That means most of the price collapse comes from better models and distillation, not chips. ARC Prize shows the same pattern on a harder test. The same 87.5% ARC-AGI-1 score was about $4,560 per task in Dec 2024 (o3-preview, 1,024 samples) and is reported at about $0.30 in Aug 2026, though the 2026 figure comes from a secondary source. The counter-trends are real and should sit in the piece, not a footnote. Gundlach et al. find the cost of reaching record performance is rising 3x to 18x per year. Artificial Analysis says the top Intelligence Index score rose from 21 to 58 in a year at about 11x the cost per task. Reasoning-model outputs have grown about 5x per year in length (Epoch). Per-token list prices at the very top have stayed around $10 in and $50 out per million tokens, and Pro tiers go up to $30/$180. Google is doubling Gemini 4 Argon API prices on 1 Dec 2026 and Flash prices on 1 Jan 2027. Big Tech 2026 capex is about $720-750B and rising further in 2027. DRAM prices roughly doubled in 2026. Data-centre electricity rose 17% in 2025 to 485 TWh (IEA). For the author's belief (1), the fair framing is: a given capability gets about 10x cheaper every year, but frontier capability and total AI spending are getting more expensive. Unit cost and total cost are moving in opposite directions. Note: the web-search budget ran out during the run, so some 2026 figures (the AI Index 2026 inference chapter, ARC Prize's 2026 cost-per-task tweets, Microsoft's calendar-year capex) could not be checked against primary pages and are flagged.

## Fact-check

The core Epoch 2026 numbers check out against the primary page: 47%/quarter, about 13x/yr, 75x/yr at SOTA debut to 4.7x/yr two years later, the 725x o3 example, and the historical comparisons. So do the AI Index 2025, Epoch 2025, Epoch hardware, a16z, Gundlach et al., ARC Prize 2024 o3-preview and ARC Prize 2025 figures. Needed corrections: the o3 GPQA '75%' is above-chance (raw 81.25%); Gundlach's 1.43x hardware figure is derived from a cited 30%/yr, not stated; 'every series finds an order of magnitude or more' is overstated. The biggest problem is the headline-friendly ARC-AGI-1 claim of '$4,560 to $0.30, 15,200x'. Its 2026 endpoint comes only from r40.io and conflicts with the live ARC Prize leaderboard: Grok 4.6 shows 87.5% but Cost $5.6K, and DeepSeek V4 Flash scores differ. The 2024 endpoint is itself a repriced (o3-pro) estimate. Keep it out of the piece, or label it unverified secondary. Google's Gemini price doublings and the IEA 17% growth are confirmed from primary pages, but 485 TWh is not stated by the IEA. DRAM, capex totals, top-tier list prices and the Artificial Analysis 21-to-58 claim remain unverified because the search budget ran out.

- **confirmed**: Cost of a fixed level of AI performance falls about 47% per quarter (about 13x per year) since 2023, measured as cost per question on the cheapest model reaching each score, reasoning tokens included  
  → 47% per quarter, about 13x per year, over roughly 3 years from 2023. Model-free per-benchmark rates (Table 1): AIME 47.1%, Chess 43.0%, FrontierMath T1-3 53.1%, GPQA-D 47.0%, Mystery Game Puzzles 44.0%. Alternative averaging on GPQA-D gives 42.9% (about 9.4x/yr) to 58.0% (about 32.1x/yr). The key takeaways give math 50-52%/q (16-19x/yr) and game puzzles 39-43%/q (7-10x/yr).  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Emberson & Roodman, published 22 Sep 2026, updated 23 Sep 2026. The update added a caveat that the 'price of thought' is a more ambiguous concept than other technologies' prices. The authors report no standard errors and call these 'reasonable but rough measurements'. Say that in the piece. The 42.9-58.0% range comes from GPQA Diamond (Fig. 7), not the 5-benchmark average. The 38.7% lower bound for Mystery Game Puzzles was not visible to me.
- **confirmed**: Decline is steepest at SOTA debut (66%/q, about 75x/yr) and slows to 32%/q (about 4.7x/yr) two years later  
  → 66% per quarter (75x/yr) at SOTA debut; 32% per quarter (4.7x/yr) two years later; average of the 5 primary benchmarks  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Matches the page. The researcher is right not to quote 75x as a general rate.
- **corrected**: o3's GPQA Diamond performance (about 75%) went from about 30 cents per question to $0.0004, about 725x in under 18 months (o3 Jan 2025 -> GPT-5.6 Luna)  
  → $0.30 -> $0.0004 per question, 725-fold, in just under 18 months. But the 75% is measured above the random-guess floor; o3's raw GPQA Diamond score is 81.25%.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  The numbers are right, but the score definition needs fixing: write '81% raw (75% above chance)', not 'about 75%'. It is a single illustrative pair, not a trend.
- **confirmed**: LLM inference price declines (about 13x/yr) are far faster than electricity 1.05x, Li-ion 1.16x, compute 1.51x, DNA sequencing 1.84x per year  
  → Electricity (US residential 1892-1973) 1.05x/yr; Li-ion (1991-2024) 1.16x/yr; compute (1940-2001) 1.51x/yr; DNA sequencing (2001-25) 1.84x/yr. Epoch expresses the gaps in log points: LLM inference is 54x, 18x, 6x and 4x faster respectively.  
  Source: https://epoch.ai/publications/the-plunging-price-of-thought  
  Epoch's update explicitly says the comparison is imperfect because the 'price of thought' chains together several services. Don't present '54x faster' as a ratio of price factors; it is a log-point comparison.
- **confirmed**: Epoch 2025: price to reach fixed benchmark scores fell 9x-900x/yr across 6 benchmarks; GPT-4-level GPQA Diamond about 40x/yr; metric is lowest USD per 1M tokens  
  → 9x to 900x per year depending on milestone; 6 benchmarks (MMLU, GPQA Diamond, MATH-500, MATH lvl 5, HumanEval, LMSys Arena Elo); GPT-4 GPQA level fell 40x/yr; published 12 Mar 2025 by Cottier, Snodin, Owen, Adamczewski  
  Source: https://epoch.ai/data-insights/llm-inference-price-trends  
  The AI Index 2025, which uses this Epoch data, says price is a 3:1 weighted average of input and output token prices. The 'median 50x/yr, 200x/yr after Jan 2024' snippet was NOT found on the page text I read, so leave it out. Per-token metric: it ignores rising tokens per task.
- **confirmed**: AI Index 2025: GPT-3.5-level (64.8 MMLU) inference cost fell >280x, $20/M (Nov 2022) -> $0.07/M (Oct 2024, Gemini-1.5-Flash-8B); GPQA>50% from $15/M (May 2024) -> $0.12/M (Dec 2024, Phi-4)  
  → $20.00 -> $0.07 per M tokens, more than 280-fold; GPQA >50% $15 -> $0.12 (Phi-4). Price is a 3:1 weighted input:output average.  
  Source: https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf  
  Verified from the PDF text. The report says both 'approximately 18 months' (takeaways) and 'approximately 1.5 years' (body), but Nov 2022-Oct 2024 is about 23 months. The researcher's correction to 'about two years' is right. This is the 2025 edition.
- **confirmed**: AI Index 2025 (citing Epoch): 16-bit performance +43%/yr (doubling 1.9 yrs); fixed-performance hardware cost -30%/yr; energy efficiency +40%/yr; H100 22 billion FLOP/s per $ (1.7x A100, 16.9x P100); B100 2.5 TFLOP/s/W vs P100 74 GFLOP/s/W (33.8x)  
  → All figures as stated  
  Source: https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf  
  Verified in the PDF text. A 30%/yr cost decline is about 1.43x/yr price-performance, doubling roughly every 1.9 years.
- **confirmed**: Epoch 2023: ML GPU FLOP/$ (FP32) doubles every 2.1 yrs (90% CI 1.6-2.91), general GPUs 2.5 yrs; +0.14 OOM/yr; energy efficiency doubling 3.0 yrs; FP16 tensor about 8x, INT8 about 13x over FP32  
  → As stated; 0.14 OOM/yr (CI 0.10-0.18); energy-efficiency doubling 3.0 yrs for ML GPUs (CI 2.7-3.3), 2.7 yrs for general GPUs; H100 reaches about 15x (FP16) and about 30x (INT8)  
  Source: https://epoch.ai/blog/trends-in-machine-learning-hardware  
  Hobbhahn, Heim, Aydos, 9 Nov 2023. The dataset page says it was updated 6 Nov 2026 but gives no new headline trend. This is an old FP32 trend; the AI Index's 30%/yr figure is the more current one to cite.
- **confirmed**: a16z LLMflation: equivalent-performance LLM cost falls about 10x/yr; MMLU 42 $60/M (GPT-3, Nov 2021) -> $0.06/M (Llama 3.2 3B, Together.ai), 1,000x in 3 years; MMLU 83 about 62x since Mar 2023  
  → As stated. Price is the average of input and output when they differ. The sample covers only OpenAI, Anthropic and Llama models on third-party hosts.  
  Source: https://a16z.com/llmflation-llm-inference-cost/  
  Guido Appenzeller, 12 Nov 2024. Investor blog, not peer reviewed; the author calls the method 'far from perfect'. Note that a16z uses a simple input/output average while the AI Index uses a 3:1 weighting, so the series are not strictly comparable. The o1 $60/M output-price remark is confirmed.
- **corrected**: MIT FutureTech (Gundlach et al.): fixed-performance price falls 5-10x/yr (GPQA-D 5.3x, AIME 11.7x, SWE-bench 4.7x with wide CI); algorithmic about 3x/yr (3.2-3.7x); hardware about 1.43x/yr; frontier cost rising 3-18x/yr  
  → Pareto rates with 90% CIs: GPQA-D 5.315x [2.449-11.534], AIME 11.664x [5.250-25.911], SWE-bench Verified 4.675x [0.680-32.156]. Algorithmic about 3x (Table 2, open-weight hardware-adjusted: GPQA 3.221x, AIME 3.276x). Hardware: the paper cites Rahman (2024) for a 30%/yr cost decline; 1.43x is derived, not stated. Frontier: the price of running the best-performing model is rising 3-18x/yr.  
  Source: https://arxiv.org/html/2511.23455v2  
  v1 28 Nov 2025, v2 23 Mar 2026; data window Apr 2024-Nov 2025 (Artificial Analysis snapshots). The paper does not present '3.2-3.7x' as its algorithmic range; say 'about 3x'. Attribute 1.43x/yr to Rahman/Epoch, not to this paper. The frontier metric is the cost of running the top model, not strictly the 'cost to reach record performance'. The 'roughly half of GPQA progress tied to inference spending' claim is confirmed (about 48%). The '33-18x' typo is confirmed.
- **confirmed**: ARC-AGI-1 o3-preview Dec 2024: semi-private 75.7% at $26/task (6 samples), 87.5% at about $4,560/task (1,024 samples); public 82.8% at $167, 91.5% at $1,900  
  → Semi-private: 75.7% $26/task, $2,680 total; 87.5% $4,560/task, $456,000 total, 5.7B tokens. Public: 82.8% $167; 91.5% $1,900.  
  Source: https://arcprize.org/blog/oai-o3-pub-breakthrough  
  Footnotes confirm the restatements: 24 Mar 2025 to o1-pro pricing, 10 Dec 2025 to o3-pro $80/M. The $4,560 is a restated figure based on o3-pro pricing, not what OpenAI actually paid. The prose's '$27 per task' does not match the table's $26.
- **confirmed**: ARC Prize 2025 results: Opus 4.5 (Thinking 64k) 37.6% at $2.20/task; Gemini 3 Pro 31% at $0.81 -> Poetiq 54% at about $31; NVARC 24.03% at $0.20; Gemini 3 Pro 96 vs Deep Think 138,000 reasoning tokens  
  → As stated; Poetiq is given as $31/task in one place and $30 in another; token comparison is on task #4cd1b7b2; published 5 Dec 2025  
  Source: https://arcprize.org/blog/arc-prize-2025-results-analysis  
  The 31% to 54% step costs about 38x more per task. Fine as a cost-for-score illustration.
- **conflicting_sources**: Same 87.5% ARC-AGI-1 score fell from about $4,560/task (Dec 2024) to about $0.30/task (Grok 4.6 medium, Aug 2026), about 15,200x; DeepSeek V4 Flash 89.0% at $0.02 (AGI-1), 61.4% at $0.04 (AGI-2); Gemini 3.7 Flash 84.6% at $0.25 (AGI-2); Fable 5.1 90.0% at $4.49 (AGI-2)  
  → r40.io (posted 6 Sep 2026) gives these figures. The live ARC Prize leaderboard (accessed 7 Nov 2026) shows Grok 4.6 at 87.5% ARC-AGI-1 but lists its Cost as $5.6K, not $0.30, with no effort setting visible. It shows DeepSeek V4 Flash at 94.5% / 72.9%, not 89.0% / 61.4%. Gemini 3.7 Flash 95.5% / 84.6% matches but has no cost listed. Fable 5.1 97.5% / 90.0% matches but has no cost listed.  
  Source: https://arcprize.org/leaderboard  
  Do not publish the 15,200x headline as verified. The $0.30 endpoint and the 'medium effort' label could not be found on arcprize.org. The leaderboard's unlabelled Cost column for Grok 4.6 ($5.6K) contradicts it, unless that column is a total for a different benchmark (likely). The DeepSeek V4 Flash scores differ, possibly a different effort setting or an updated run. The 2024 endpoint is also a restated o3-pro-priced figure, so the comparison mixes repricings. The blog cites no tweets, so the X-post figures ($26 -> $0.01, $13.62 -> $0.08) remain unverified. Use it only as 'a secondary analysis reports...', or replace it with a figure read directly from ARC Prize.
- **corrected**: ARC Prize leaderboard: ARC-AGI-2 GPT-6 Astra 95.0%, GPT-6.1 Sol 94.2%, Opus 5.5 93.3%, Gemini 4 Argon 91.3%; several at 98.5% on ARC-AGI-1; ARC-AGI-3 Standard Astra 62.7%, Sol 52.7%, Argon 49.8% (provider adapter 96-99.9%); costs $26.1K, $7.6K, $5.8K, $4.4K  
  → Scores confirmed: Astra 98.5/95.0/62.7 (adapter 99.9%); Sol 98.5/94.2/52.7 (96.4%); Opus 5.5 98.5/93.3 (no ARC-AGI-3 score shown); Argon 98.5/91.3/49.8 (97.5%). Costs: Astra $26.1K, Sol $7.6K, Argon $5.8K. I could not find a $4.4K entry; Opus 5.5 shows no cost.  
  Source: https://arcprize.org/leaderboard  
  The Cost column is undefined on the page; no footnote or methodology is visible. Agree: do not quote these as per-task costs. Drop or source the $4.4K figure. The leaderboard renders via JS and my fetch was truncated, so re-check visually before publishing.

### Missed evidence

- Summary-level overstatement: 'Every independent series finds declines of an order of magnitude or more per year' is false. Gundlach et al. find GPQA-D 5.3x/yr and SWE-bench 4.7x/yr (CI includes about 0.7x), and Epoch 2026 finds about 4.7x/yr two years after SOTA. Reword to 'roughly 5x to 15x+ per year' (https://arxiv.org/html/2511.23455v2).
- Google price doubling verified on the primary page. Gemini 4 Argon goes from $2.00 to $4.00 input and $10.00 to $20.00 output per 1M tokens (thinking tokens included) on 1 Dec 2026, with Batch, Flex and Priority also doubling. Gemini 3.8 Flash and 3.6 Flash go from $0.75 to $1.50 input and $3.75 to $7.50 output on 1 Jan 2027. Gemini 2.5 Flash requests reroute to 3.5 Flash-Lite on 1 Dec 2026. Even after doubling, Argon ($4/$20) sits below the '$10/$50 at the top' framing, so name the models behind that framing (https://aistudio.google.com/docs/pricing).
- IEA press release (16 Apr 2026) confirms data-centre electricity demand rose 17% in 2025, with AI-focused data centres growing faster, against 3% for global demand. It does NOT give 485 TWh. That number looks derived (415 TWh in 2024 x 1.17), so cite it as derived or find the report table. The same release says capex of five large tech companies exceeded $400B in 2025 and is set to rise a further 75% in 2026 (about $700B), a primary anchor for the $720-750B capex claim (https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions).
- Epoch output-length claim confirmed with detail: reasoning models' outputs grow about 5x/yr (90% CI roughly 2-13x), non-reasoning about 2.2x/yr; published 17 Apr 2025 by Emberson, Cottier, You, Adamczewski, Denain. The wide CI should be stated (https://epoch.ai/data-insights/output-length).
- Artificial Analysis '21 to 58 at about 11x cost' could not be verified. The homepage shows Intelligence Index v5.0.1 (9 evals), with Gemini 4 Carbon as #1 since 28 Oct. Score comparisons across index versions are not like-for-like, so check that both endpoints use the same index version (https://artificialanalysis.ai/).
- Not verified at all: DRAM prices 'roughly doubled in 2026', Big Tech 2026 capex of $720-750B, the $10/$50 and $30/$180 top-tier list prices, and AI Index 2026 inference figures. My web-search budget was exhausted (WebSearch was unavailable for this turn, so checks used direct page fetches only). Run a follow-up search before publishing.
- The AI Index 2025 and Epoch 2025 inference-price series use a 3:1 input:output weighted price, while a16z uses a simple average. Mention this when comparing the '10x/yr' and '9-900x/yr' figures (https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf).

## Findings

- **Cost of a fixed level of AI performance falls about 47% per quarter (about 13x per year) since 2023, measured as cost per question on the cheapest model or configuration reaching each score, reasoning tokens included**  
  47%/quarter ≈ 13x/year (simple average across 5 primary benchmarks; alternative averaging 42.9-58.0%/quarter). Math 50-52%/q (16-19x/yr); game puzzles 39-43%/q (7-10x/yr); secret Mystery Game Puzzles 38.7-44%/q (2026-09-22 (updated 2026-09-23)). Confidence: high, source type: primary  
  [The plunging price of thought (Emberson & Roodman, Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Best current headline figure because it counts tokens used per task, not just per-token price. Primary benchmarks: AIME (OTIS Mock), Chess Puzzles, FrontierMath T1-3, GPQA Diamond, Mystery Game Puzzles. Caveats from the authors: benchmaxxing, benchmark scores are not useful work, users don't always pick the cheapest model, only about 3 years of data.
- **The price decline is steepest right after a capability first becomes state of the art, then slows**  
  66%/quarter (≈75x/yr) at SOTA debut, falling to 32%/quarter (≈4.7x/yr) two years later; average of 5 primary benchmarks (2026-09-22). Confidence: high, source type: primary  
  [The plunging price of thought (Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Important nuance: 'X gets cheaper' is fastest early, so quoting the 75x figure as a general rate would overstate it.
- **Example: o3's GPQA Diamond performance (about 75%) went from about 30 cents per question to $0.0004 per question**  
  ≈725-fold drop in under 18 months (o3, Jan 2025 → GPT-5.6 Luna) (2026-09-22). Confidence: medium, source type: primary  
  [The plunging price of thought (Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Single illustrative pair chosen by Epoch, not a trend estimate.
- **LLM inference is getting cheaper far faster than other technologies did**  
  Average annual price-decline factors: electricity (US residential 1892-1973) ≈1.05x/yr; Li-ion batteries (1991-2024) ≈1.16x/yr; compute (1940-2001) ≈1.51x/yr; DNA sequencing (2001-25) ≈1.84x/yr; LLM inference ≈13x/yr (2026-09-22). Confidence: medium, source type: primary  
  [The plunging price of thought (Epoch AI)](https://epoch.ai/publications/the-plunging-price-of-thought)  
  Epoch itself calls the comparison partly 'apples and oranges' because the 'price of thought' bundles many services.
- **Epoch's 2025 estimate: the price to reach a fixed benchmark score fell at very different rates depending on the task**  
  9x to 900x per year across milestones on 6 benchmarks; GPT-4-level GPQA Diamond fell ≈40x/yr. Metric: lowest USD per 1M tokens among models at or above each threshold (2025-03-12). Confidence: high, source type: primary  
  [LLM inference prices have fallen rapidly but unequally across tasks (Cottier, Snodin, Owen, Adamczewski; Epoch AI)](https://epoch.ai/data-insights/llm-inference-price-trends)  
  Per-token metric, so it ignores rising tokens per task. Epoch warns that the fastest drops were in the most recent year and may not persist. A secondary search snippet quotes 'median 50x/yr, 200x/yr after Jan 2024'; I could not confirm that on the page excerpt I read, so don't use it without checking.
- **Stanford AI Index 2025: the inference cost of a model scoring at GPT-3.5 level (64.8% MMLU) fell more than 280-fold**  
  $20.00 per 1M tokens (Nov 2022) → $0.07 per 1M tokens (Oct 2024, Gemini-1.5-Flash-8B). Also: GPQA >50% models fell from $15/M (May 2024) to $0.12/M (Dec 2024, Phi-4) (2025-04 (AI Index 2025, Chapter 1)). Confidence: high, source type: primary  
  [Artificial Intelligence Index Report 2025, Chapter 1: Research and Development](https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf)  
  Verified from the PDF text. Watch for an error in the report itself: it calls Nov 2022-Oct 2024 'approximately 18 months' / '1.5 years', but that is about 23 months. Say 'about two years'. This is a 2025-edition figure that many sites wrongly attribute to the 2026 Index.
- **AI Index 2025 (citing Epoch): ML hardware performance and efficiency trends**  
  16-bit peak performance +43%/yr (doubling every 1.9 yrs); cost of fixed hardware performance −30%/yr; energy efficiency +40%/yr; H100 ≈22 billion FLOP/s per $ (≈1.7x A100, 16.9x P100); B100 2.5 TFLOP/s per W vs P100 74 GFLOP/s per W (33.8x) (2025-04). Confidence: high, source type: primary  
  [AI Index Report 2025, Chapter 1](https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf)  
  Verified from the PDF text. Hardware improves about 1.4x per year, which is tiny next to the 10x+ per year price decline at fixed capability.
- **Epoch hardware trend: price-performance of ML GPUs doubles about every 2.1 years**  
  FLOP/$ (FP32) doubling 2.1 yrs for ML GPUs (90% CI 1.6-2.91), 2.5 yrs for general GPUs; +0.14 OOM/yr (10x every ≈7 yrs). Energy efficiency doubling ≈3.0 yrs. Lower precision adds ≈8x (FP16 tensor) to ≈13x (INT8) over FP32 (2023-11-09). Confidence: high, source type: primary  
  [Trends in Machine Learning Hardware (Hobbhahn, Heim, Aydos; Epoch AI)](https://epoch.ai/blog/trends-in-machine-learning-hardware)  
  Older publication. Epoch's hardware database was updated 6 Nov 2026 (https://epoch.ai/data/machine-learning-hardware) but the page lists no new headline trend number.
- **a16z 'LLMflation': for an LLM of equivalent performance, cost falls about 10x per year**  
  MMLU 42 level: $60/M tokens (GPT-3, Nov 2021) → $0.06/M (Llama 3.2 3B on Together.ai, late 2024) ≈1,000x in 3 years. MMLU 83 level: ≈62x cheaper since Mar 2023. Price = average of input and output (2024-11-12). Confidence: medium, source type: vendor_reported  
  [Welcome to LLMflation – LLM inference cost is going down fast (Guido Appenzeller, a16z)](https://a16z.com/llmflation-llm-inference-cost/)  
  Investor blog, not peer reviewed, though the method is transparent. The author flags MMLU contamination. It also notes that o1 output tokens cost $60/M, the same as GPT-3 at launch, an early sign that frontier prices don't fall.
- **MIT FutureTech paper: price at fixed performance falls 5-10x per year, about 3x of which is algorithmic efficiency, while the cost of frontier performance is RISING 3-18x per year**  
  Fixed-performance decline (Pareto): GPQA-D ≈5.3x/yr (CI 2.4-11.5), AIME ≈11.7x/yr (5.3-25.9), SWE-bench Verified ≈4.7x/yr (CI 0.7-32, consistent with zero). Algorithmic ≈3x/yr (3.2-3.7x). Hardware ≈1.43x/yr. Frontier cost to reach record performance +3x to +18x/yr (2025-11-28 (v1); 2026-03-23 (v2)). Confidence: high, source type: preprint  
  [The Price of Progress: Price Performance and the Future of AI (Gundlach, Lynch, Mertens, Thompson)](https://arxiv.org/abs/2511.23455)  
  Window is Apr 2024-Nov 2025. For GPQA-D, roughly half of measured progress is associated with higher inference spending. The v2 HTML has an apparent typo ('33-18x'), so use the abstract's 3-18x.
- **ARC-AGI-1: o3-preview's December 2024 results were extremely expensive per task**  
  Semi-private: 75.7% at $26/task (6 samples); 87.5% at ≈$4,560/task (1,024 samples). Public: 82.8% at $167/task; 91.5% at $1,900/task (2024-12-20 (costs restated 2025-03-24 and 2025-12-10)). Confidence: high, source type: primary  
  [OpenAI o3 Breakthrough High Score on ARC-AGI-Pub (ARC Prize)](https://arcprize.org/blog/oai-o3-pub-breakthrough)  
  The costs were restated twice (o1-pro pricing, then o3-pro pricing at $80/M). The prose says $27 and the table says $26. The tested o3-preview is not the released o3.
- **ARC Prize 2025: frontier commercial and competition cost per task on ARC-AGI-2**  
  Claude Opus 4.5 (Thinking 64k) 37.6% at $2.20/task; Gemini 3 Pro 31% at $0.81 → 54% at ≈$31 with Poetiq refinement; Kaggle winner NVARC 24.03% (private) at $0.20/task; Gemini 3 Pro used 96 reasoning tokens vs Gemini 3 Deep Think 138,000 on the same task (2025-12-05). Confidence: high, source type: official_leaderboard  
  [ARC Prize 2025 Results and Analysis](https://arcprize.org/blog/arc-prize-2025-results-analysis)  
  Good evidence that harnesses and extra thinking buy score with cost: going from 31% to 54% cost about 38x more per task.
- **The same ARC-AGI-1 score (87.5%) fell from about $4,560 per task to about $0.30 in roughly 20 months**  
  ≈15,200x cheaper (o3-preview low-efficiency, Dec 2024 → Grok 4.6 medium effort, Aug 2026, same semi-private set). Other 2026 entries: DeepSeek V4 Flash 89.0% at $0.02/task (ARC-AGI-1), 61.4% at $0.04 (ARC-AGI-2); Gemini 3.7 Flash 84.6% at $0.25 (ARC-AGI-2); Claude Fable 5.1 90.0% at $4.49 (ARC-AGI-2) (2026 (blog, figures Jul-Sep 2026)). Confidence: medium, source type: secondary_aggregator  
  [The Same 87.5% on ARC-AGI-1 Cost $4,560 in 2024 and 30 Cents in 2026 (r40.io)](https://r40.io/blog/arc-agi-verified-cost-per-task-price-step/)  
  The 2024 endpoint is verified on ARC Prize. The 2026 endpoints come from this secondary blog. A search snippet of an ARC Prize X post gives Fable 5.1 at $3.12/task, not $4.49, so the sources conflict. Another ARC Prize X post (snippet only, X returned HTTP 402) says the cost to reach 75% on ARC-AGI-1 fell 99.95% over 19 months ($26 → $0.01, DeepSeek V4 Flash) and the cost to reach 75% on ARC-AGI-2 fell 99.44% in 6 months ($13.62 Gemini 3 Deep Think → $0.08 Dots3-Note Preview). Verify on arcprize.org before publishing.
- **The ARC Prize leaderboard shows ARC-AGI-1 and ARC-AGI-2 near saturation at the top, with ARC-AGI-3 (interactive) far from solved**  
  ARC-AGI-2: GPT-6 Astra 95.0%, GPT-6.1 Sol 94.2%, Claude Opus 5.5 93.3%, Gemini 4 Argon 91.3%. ARC-AGI-1: several at 98.5%. ARC-AGI-3 Standard: GPT-6 Astra 62.7%, GPT-6.1 Sol 52.7%, Gemini 4 Argon 49.8% (Provider-adapter harness: 96-99.9%). Listed 'Cost': $26.1K (Astra), $7.6K, $5.8K, $4.4K (accessed 2026-11-07). Confidence: medium, source type: official_leaderboard  
  [ARC Prize Leaderboard](https://arcprize.org/leaderboard)  
  The cost column header just says 'Cost'. The same $ figure repeats across benchmarks, and a secondary source says GPT-6 Astra's ARC-AGI-3 Standard run cost $26,098 in total, so these are probably ARC-AGI-3 run totals, NOT per-task costs. Do not quote them as per-task.
- **Artificial Analysis: once an Intelligence Index score is reached, its cost per task falls fast, but the best score costs more than a year ago**  
  Score 30: $2.49/task (Claude Sonnet 4.6 max effort, Feb 2026) → $0.03 (GPT-6 Luna high) = 86x cheaper. Score 50: 18x cheaper. Top score rose 21 → 58 in a year at ≈11x the cost (Claude Opus 5.5 ≈$5.98/task). Half-life of cost after first reach: 197 days (score 10), 169 (20), 65 (30), 42 (40), 41 (50) (≈2026-10-20). Confidence: medium, source type: blog_or_social  
  [Artificial Analysis post on X (status 2112582116651466965)](https://x.com/ArtificialAnlys/status/2112582116651466965)  
  Read via search snippet only (X blocks fetching). The underlying chart is at https://artificialanalysis.ai/trends but the page exposed no numbers. Other sources give Opus 5.5 at $10.04/task on v5.0 max effort, so the figures depend on index version and effort setting.
- **Reasoning models' answers are getting much longer every year, which offsets per-token price cuts**  
  Output length growth: reasoning models 5x/yr (90% CI 2-13), non-reasoning 2.2x/yr (2.0-2.6); GPQA Diamond reasoning 10x/yr. Reasoning models produce ≈8x more tokens than non-reasoning (2025-04-17). Confidence: high, source type: primary  
  [LLM responses to benchmark questions are getting longer over time (Epoch AI)](https://epoch.ai/data-insights/output-length)  
  From early 2025. Not updated for 2026 in what I read.
- **Current (Nov 2026) OpenAI API list prices: flagship vs small**  
  Per 1M tokens in/out: gpt-6-astra $10/$50; gpt-6.1-sol $2/$10; gpt-6.1-terra $1/$5; gpt-6-luna $0.10/$0.50; gpt-5-nano $0.05/$0.40; gpt-5.5-pro $30/$180; o3-pro $20/$80; gpt-4o-mini $0.15/$0.60 (accessed 2026-11-07). Confidence: high, source type: primary  
  [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)  
  GPT-5.6 Sol ($4/$20) is on promotional pricing until 30 Nov 2026. At the output-price level, frontier and small models differ by about 100x.
- **Current Anthropic API list prices: top tier holds at $10/$50 while small models got about 10x cheaper**  
  Per MTok in/out: Claude Fable 5.1 / Mythos 5.1 $10/$50; Opus 5.5 $4/$20 (down from Opus 5 $5/$25, Opus 4/4.1 $15/$75); Sonnet 5.5 $2/$10 (Sonnet 4.x $3/$15); Haiku 5.5 $0.10/$0.50 for prompts up to 100k tokens (Haiku 4.5 $1/$5) (accessed 2026-11-07). Confidence: high, source type: primary  
  [Claude API pricing (Anthropic docs)](https://platform.claude.com/docs/en/about-claude/pricing)  
  Haiku 5.5 rises to $0.50/$2.50 above 100k-token prompts. The batch tier halves prices.
- **Google is RAISING Gemini API prices: the flagship doubles on 1 Dec 2026 and Flash models double on 1 Jan 2027**  
  Gemini 4 Argon $2/$10 → $4/$20 per 1M tokens (1 Dec 2026); Gemini 3.8/3.6 Flash $0.75/$3.75 → $1.50/$7.50 (1 Jan 2027); Robotics ER 2 $1/$5 → $2/$10. Cheapest text model: Gemini 2.5 Flash-Lite $0.10/$0.40 (accessed 2026-11-07). Confidence: high, source type: primary  
  [Gemini Developer API pricing](https://aistudio.google.com/docs/pricing)  
  Strong counterexample to 'prices only fall'. The current prices were introductory. Secondary coverage (e.g. actuia.com) confirms the doubling. Gemini 2.5 Pro was deprecated and routes to 3.8 Flash on 1 Dec 2026.
- **Alphabet holds 2026 capex at $195-205B and expects capex above $300B in 2027; its API token volume is up more than 4x year on year**  
  Q3 2026 capex (purchases of property & equipment) $51.355B; 2026 guide $195-205B; 2027 'significant increase', >$300B per CNBC; first-party model APIs ≈32 billion tokens per minute, >4x a year ago; Q3 free cash flow ≈ −$9.07B (CNBC) (2026-10-28). Confidence: high, source type: primary  
  [Alphabet Q3 2026 earnings release (SEC 8-K Ex. 99.1) + CNBC](https://www.sec.gov/Archives/edgar/data/0001652044/000165204426000080/googexhibit991q32026.htm)  
  The token-volume quote and capex number come from the SEC exhibit. The >$300B 2027 figure is CNBC's (https://www.cnbc.com/2026/10/28/alphabet-googl-earnings-q3-2026.html). The CFO quote only says 'increase significantly'.
- **Combined 2026 capex of Amazon, Microsoft, Alphabet and Meta is about $720-750B, up about 78% from about $410B in 2025**  
  Amazon ≈$220B cash capex (raised from $200B in July, blamed on memory costs; held Oct 29); Alphabet $195-205B; Meta $135-145B incl. finance leases (narrowed Oct 21 2026); Microsoft FQ1'27 capex+finance leases $45.2B, FQ2 guide >$50B, '$170B for all of calendar 2027' per CNBC (2026-10-21 to 2026-10-29). Confidence: medium, source type: reputable_press  
  [CNBC Q3 2026 earnings coverage (Amazon, Microsoft, Alphabet) + Meta Q3 2026 8-K](https://www.cnbc.com/2026/10/29/amazon-amzn-q3-earnings-report-2026.html)  
  Individual figures are solid. The aggregate depends on definitions (cash vs incl. finance leases; Microsoft's fiscal year runs Jul-Jun). An earlier CNBC piece (Jul 28) cited Microsoft at $190B for FY. The Microsoft '$170B calendar 2027' wording is odd; verify. Meta SEC exhibit: https://www.sec.gov/Archives/edgar/data/0001326801/000162828026066700/meta-09302026xexhibit991.htm
- **Data-centre electricity use rose 17% in 2025 and is projected to roughly double by 2030; energy-system bottlenecks are binding**  
  485 TWh (2025) → ≈950 TWh (2030), ≈3% of global electricity; AI-focused data centres +50% in 2025, tripling 2025-2030; gas-turbine orders +70% in 2025; HBM shortage through at least 2027 (2026 (IEA, 'Key Questions on Energy and AI')). Confidence: high, source type: primary  
  [Key Questions on Energy and AI – Executive summary (IEA)](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)  
  The page shows no exact publication date. A secondary snippet splits 2025 into 155 TWh AI-focused / 330 TWh other; I did not see that on the page. Earlier IEA (2024) talk of '1,000 TWh by 2026' is superseded; don't use it.
- **Memory prices roughly doubled in 2026 on AI demand, pushing up hardware costs**  
  TrendForce: conventional DRAM contract prices +90-95% QoQ in Q1 2026, a further +58-63% projected for Q2; Gartner: +130% YoY DRAM for 2026; SK Hynix HBM/DRAM/NAND sold out through 2026 (2026 (H1)). Confidence: medium, source type: secondary_aggregator  
  [Astute Group summary of TrendForce data](https://www.astutegroup.com/news/memory-shortages/ai-driven-hbm-demand-continues-to-distort-global-memory-allocation-and-server-supply/)  
  Primary is TrendForce, which I didn't access directly. Amazon's CEO publicly blamed memory costs for its $20B capex raise (CNBC/Yahoo), which corroborates the direction.
- **H100 GPU rental prices have fallen a lot since 2024 but bounced in 2026**  
  Silicon Data H100 index $2.97/GPU-hr (5 Nov 2026, +5.7% w/w); SemiAnalysis 1-yr contract index $1.70 → $2.35 (+38%) Oct 2025-Mar 2026; early-2024 on-demand >$7/hr; Nebius on-demand $3.85 → $4.50 (1 Oct 2026) (2026-11-05). Confidence: low, source type: vendor_reported  
  [Silicon Data H100 Rental Price Index](https://www.silicondata.com/products/silicon-index/h100)  
  Index methods differ (spot vs on-demand vs contract), and the figures come from search snippets. Use only as rough context.

## Counter-evidence

- The cost of frontier capability is rising. Gundlach et al. (MIT, arXiv 2511.23455) find the cost to reach record performance on GPQA-D, SWE-bench Verified and AIME rising 3-18x per year. For GPQA-D, roughly half of measured progress is associated with higher inference spending.
- Artificial Analysis (Oct 2026): the top Intelligence Index score rose 21 → 58 in a year at roughly 11x the cost per task. The best AI has got more expensive, even though old capability levels got 18-86x cheaper.
- Frontier per-token list prices are flat, not falling. Claude Fable 5.1 and GPT-6 Astra are both $10 in / $50 out per million tokens. Pro tiers (GPT-5.5 Pro $30/$180) cost more than GPT-4's 2023 launch price. a16z noted in 2024 that o1 output cost the same $60/M as GPT-3 at launch.
- Google is doubling Gemini 4 Argon API prices on 1 Dec 2026 ($2/$10 → $4/$20) and Gemini 3.8/3.6 Flash prices on 1 Jan 2027. Introductory prices are not a durable floor.
- Tokens per task are growing. Epoch measured reasoning-model output length growing about 5x per year (CI 2-13x) with about 8x more tokens than non-reasoning models. On one ARC task, Gemini 3 Deep Think used 138,000 reasoning tokens vs 96 for Gemini 3 Pro. Per-token savings partly get eaten by longer thinking.
- Epoch's own caveats: real users don't consistently pick the cheapest model, so realized savings are smaller. Benchmark scores are not useful work. The rate slows to about 4.7x per year two years after a capability debuts. On secret, contamination-resistant puzzles the decline is slower (38.7-44%/quarter).
- On SWE-bench Verified, the fixed-performance price-decline estimate (4.7x/yr) has a CI of 0.7-32x and is statistically consistent with no decline (Gundlach et al.). That is the most economically relevant benchmark and the weakest evidence.
- Hardware is improving only about 30-40% per year (price-performance doubling about 2 years), far slower than model prices. Memory costs roughly doubled in 2026 (TrendForce/Gartner), and Amazon raised capex $20B citing memory. H100 rental indexes rose about 38% between Oct 2025 and Mar 2026.
- Total spending is soaring. Big-4 2026 capex is about $720-750B (≈+78% y/y), and Alphabet signalled more than $300B for 2027. Alphabet, Amazon and Meta reported negative quarterly or trailing free cash flow in Q3 2026. Cheaper units are not making AI cheaper in aggregate.
- Energy: data-centre electricity +17% in 2025 to 485 TWh, AI-focused +50%, projected about 950 TWh by 2030 (IEA). The IEA flags grid-connection, transformer, gas-turbine and HBM bottlenecks.

## Surprises

- The same ARC-AGI-1 score (87.5%) that cost about $4,560 per task in December 2024 is reported at about $0.30 per task in August 2026, about 15,000x cheaper in under two years (2026 endpoint from a secondary source).
- Epoch estimates AI's price of a fixed capability falls about 13x per year. That is roughly 6x faster (in log terms) than computer price-performance fell in 1940-2001 and about 54x faster than electricity prices did.
- Chips are only about 30-40% better per dollar each year. Most of the price collapse comes from smarter, smaller models, not hardware.
- Google is doubling the API price of its flagship Gemini model on 1 December 2026, and its Flash models in January 2027.
- The best AI isn't getting cheaper. Artificial Analysis found the top-scoring model now costs about 11x more per task than the top model a year earlier, while old capability levels got 18-86x cheaper.
- Google's model APIs process nearly 32 billion tokens every minute, more than 4x a year earlier.
- The famous '280x cheaper' Stanford figure is from the 2025 AI Index, not 2026. The report itself calls the roughly 23-month window '18 months'.
- Reasoning models' answers are getting about 5x longer every year, so a per-token price cut can disappear in a longer chain of thought.

## Chart ideas

- Log-scale 'two lines' chart: cost per task at a FIXED score (Artificial Analysis thresholds or Epoch 'plunging price of thought' cost frontier) falling, versus cost per task of the TOP-scoring model rising (Artificial Analysis: 21→58 at ≈11x cost; Gundlach et al. Fig. 9). Data: epoch.ai/publications/the-plunging-price-of-thought, artificialanalysis.ai/trends, arxiv.org/abs/2511.23455
- Annual price-decline factor bar chart (log): electricity 1.05x, Li-ion batteries 1.16x, compute 1.51x, DNA sequencing 1.84x, AI hardware ≈1.4x (30%/yr), LLM inference at fixed performance ≈13x. Data: Epoch plunging-price-of-thought comparison table + AI Index 2025 Ch.1
- ARC-AGI cost per task (log scale) for the same score over time: o3-preview Dec 2024 87.5% $4,560 → Grok 4.6 Aug 2026 $0.30; 75% $26 → $0.01. Data: arcprize.org/blog/oai-o3-pub-breakthrough + ARC Prize verified results (re-verify 2026 points on arcprize.org)
- Decomposition bar: of the ≈5-10x/yr fixed-performance price decline, ≈3x/yr is algorithmic efficiency and ≈1.43x/yr is hardware; the remainder is competition/margins. Data: Gundlach et al. Table 2
- Current API price ladder (output $/M tokens, log scale): GPT-5.5 Pro $180, Fable 5.1 / GPT-6 Astra $50, Opus 5.5 $20, Gemini 4 Argon $10→$20, GPT-6 Luna / Haiku 5.5 $0.50, gpt-5-nano / Gemini 2.5 Flash-Lite $0.40. Data: official pricing pages accessed 2026-11-07
- Epoch decline rate by 'age' of capability: 66%/q at SOTA → 32%/q after 2 years. Data: Epoch plunging price of thought
- Big-4 hyperscaler capex 2025 (~$410B) vs 2026 (~$720-750B) by company, with Alphabet's 2027 >$300B signal. Data: company Q3 2026 8-Ks / CNBC
- Data-centre electricity 2025 485 TWh → 2030 ≈950 TWh, with the AI-focused share tripling. Data: IEA Key Questions on Energy and AI
- Output tokens per answer over time, reasoning vs non-reasoning (5x/yr vs 2.2x/yr). Data: epoch.ai/data-insights/output-length

## Open questions

- Search budget exhausted mid-run (200-search limit): the following could not be checked against primary pages and need a follow-up pass.
- Does the Stanford AI Index 2026 (released ~13 Apr 2026) contain an updated inference-cost-at-fixed-capability series? I could not access the 2026 PDF (a guessed URL returned 404). Secondary sites mostly repeat the 2025 figure.
- ARC Prize 2026 cost-per-task figures (DeepSeek V4 Flash $0.01-0.02, Grok 4.6 $0.30, Gemini 3.7 Flash $0.25, Fable 5.1 $3.12 vs $4.49) come from secondary blogs or X snippets. They need confirming on arcprize.org model pages. X returned HTTP 402.
- What does the 'Cost' column on arcprize.org/leaderboard represent ($26.1K etc.)? Most likely ARC-AGI-3 total run cost, not per-task. This needs confirming before any use.
- Microsoft's capex guidance basis: CNBC says '$170 billion for all of calendar 2027', which may be a misstatement (calendar 2026?). Verify against the FQ1 FY27 transcript.
- Epoch 2025 blog's reported median (≈50x/yr, rising to 200x/yr after Jan 2024) appears in secondary summaries but was not visible in the page excerpt I read.
- There is no 2026 primary update of Epoch's output-length (tokens-per-answer) growth, so whether the 5x/yr trend continued is unknown.
- There is no direct measure of total enterprise or consumer spend on inference in 2026 (e.g. OpenRouter token volumes, lab revenues), which would show whether falling unit prices are outweighed by volume (Jevons effect). Only Google's ~32B tokens/min (>4x y/y) was found.
- IEA 2025 AI-focused vs non-AI split (155/330 TWh) appears only in a secondary snippet.
- TrendForce DRAM figures and GPU rental indexes came via secondary aggregators. Primary TrendForce / SemiAnalysis data was not accessed.
