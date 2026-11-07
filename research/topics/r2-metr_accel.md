# Is progress accelerating? METR's Anthropic assessment

Research round r2, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

The author was right to push back. The claim "public data doesn't show further acceleration in 2025–26" is too strong in one direction and, as a summary of the evidence, out of date. What each data source shows:

(a) Public METR time horizons. The data does show the 2024 speed-up. Under TH1.1 (Jan 29 2026), the doubling time is 196.5 days for the full period, 130.8 days since 2023 and 88.6 days since 2024. But no public METR analysis tests for a further break inside 2025–26. Since about May 2026 the instrument has hit its ceiling: Mythos Preview scored likely 16h or more, METR says measurements above 16h are unreliable, and GPT-5.6 Sol came in at 11.3h (95% CI 5–40h), which METR says is not robust. The time-horizons page says it was last updated Sep 8 2026 and is "no longer actively updated." An independent reanalysis (Jonas Moss, Feb 2026) finds the data cannot distinguish exponential from superexponential growth. So public time-horizon data can neither confirm nor rule out a 2025–26 speed-up.

(b) Public Epoch ECI. Epoch's own analyses find one acceleration, tied to reasoning models in 2024: a breakpoint in April 2024 (Dec 2025 insight, now marked superseded) or September 2024 (Sep 1 2026 insight). After that, Epoch fits a linear trend of about 14 ECI points/year and reports no second breakpoint. Epoch's April 16 2026 report, "Have AI capabilities accelerated?", found acceleration in 3 of 4 metrics but did not test for a 2025–26 break. My own rough endpoint calculation on the current public ECI CSV gives about 15–16 points/yr for Nov 2024–Nov 2025 and about 18 points/yr for Nov 2025–Nov 2026. That is a mild rise of roughly 1.1–1.3x, within noise, and nobody has tested it formally. METR's re-plot of AECI with all frontier developers gives 1.4x (+17 to +24 points/yr after Oct 2025). So public, all-developer data shows at most a modest speed-up, not a clear one.

(c) METR's Nov 5 2026 assessment, using private Anthropic data, is the strong evidence. It uses AECI, Anthropic's internal version of the Epoch Capabilities Index built from internal and public benchmarks. It includes internal-only models (Models 2, 3 and 4, trained Jul–Oct 2026), each dated by when most employees could use it. It finds a breakpoint on Oct 7 2025, with slopes rising from about +15 to about +29 AECI points/yr. The headline is 1.9x (95% CI 1.5–2.8x). METR says it would "not be surprised" by anything from 1.3x to 3x, and its robustness checks range from 1.1x (complementary log-log link) to 2.9x (log-log). Public-calibration variants range from 0.99x to 1.90x. METR guesses about 80% of the current acceleration is due to AI, and calls that highly uncertain. Anthropic redacted "a majority of the evidence we found most informative." So the strongest evidence of 2025–26 acceleration is real but private, specific to Anthropic, unverifiable by outsiders, and partly redacted.

Corrected framing: public all-developer data shows a clear 2024 speed-up and then a roughly linear-to-slightly-steeper trend. Only METR's look at Anthropic's private data shows a large (about 2x) speed-up since October 2025. Anthropic's own S-1/A (Nov 2 2026) says it "may imminently meet" its RSP's definition of dramatically accelerated, AI-driven progress.

## Fact-check

Most of the load-bearing claims hold up against primary sources. I fetched the METR assessment, METR's risk-report review, METR's TH1.1 post, METR's time-horizons page, three Epoch pages, Jonas Moss's post and SEC EDGAR full-text search. No numbers look fabricated. Spot-checked values that match their sources: the Oct 7 2025 breakpoint; slopes +15→+29; 1.9x [1.5–2.8]; the 1.3x–3x range; all six link-function results; snapshot results 1.9–2.2x; the benchmark subsets; the 0.99–1.90x grid; 1.4x (+17→+24); ≈80%; interviews 2/3/4/0/2; Slack polls 1.2x→12x and 3.9x/yr; Haiku 5.5 card 1.7x; Risk Report review figures 1.3–2.8, ~1.97 (METR's calculation) and AECI 1.5x→1.9x; Epoch 8.337→15.459, breakpoint 2024-04-08, CIs 1.3–3.1x; TH1.1 doubling times 196.5/130.8/88.6 days; Mythos ≥16h; GPT-5.6 Sol 11.3h [5–40h]; the page date Sep 8 2026; S-1/A filed 2026-11-02 (accession 0001628280-26-068676); original S-1 filed 2026-10-26 (accession 0001628280-26-067168).

Corrections needed:
(1) S-1 language: "may not identify a significant acceleration… until after it has occurred" is still in the S-1/A, per EDGAR full-text search. The amendment added the "may imminently meet" language; it did not replace the old sentence. Also, the S-1/A text found by full-text search reads "have not designated", not "haven't".
(2) Bottlenecks: the claim's note says "no convincing bottlenecks" does not appear. It does: "We did not identify any convincing bottlenecks to continued rapid progress."
(3) Breakpoints: the note says no alternative breakpoints were reported. METR keeps Oct 7 2025 fixed for its robustness checks, but says "in some places we consider deviations from this." The single breakpoint is imposed exogenously; only its date is learned.
(4) The 0.99x–1.90x grid is not all "public-calibration" estimates. Its 1.90x cell is AECI on Anthropic models at internal release dates, which is private data. Only some rows (system cards, Epoch ECI) are public.
(5) The Sep 1 2026 Epoch insight does not estimate a breakpoint. It fits separate linear trends for the reasoning frontier (~14 pts/yr from Sep 2024) and non-reasoning models (~6 pts/yr). It never tests for a 2025–26 break, so "reports no second breakpoint" should read "did not test for one."

Unverifiable or private:
- The author's own endpoint calculation on the ECI CSV (15–16 and ~18 pts/yr) was not reproduced. Label it as the author's own unreviewed calculation.
- All AECI results use Anthropic's private data, which outsiders cannot check, and much of it was redacted. The Haiku 5.5 system card itself was not read.

Vendor vs independent labels:
- METR is an independent assessor, but it worked under Anthropic's unilateral redaction rights and relied heavily on Claude for its analysis.
- Anthropic's Risk Report, system-card figures and S-1 statements are vendor self-reports.

No incomparable metric versions were mixed, but one comparison in the summary needs care. TH1.1's full-period figure (196.5d) is a stitched trend that uses TH1.0 estimates for pre-2023 models. It is fine as reported, but should not be compared directly with TH1.1-only fits.

- **confirmed**: METR assessment used AECI (Anthropic's version of ECI); includes internal-only Unreleased 2022, Model 2 (Jul 2026), Model 3 (Aug–Sep 2026), Model 4 (Sep–Oct 2026); dated by when most employees could use them; assessment Aug 12–Oct 29 2026; ~100-page full report delivered Oct 22; no query access  
  → As stated  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  The page describes AECI as "Anthropic's version of the Epoch Capabilities Index." The AEF-1 checklist marks query access to unreleased models as "No." The page says Anthropic may use different internal codenames. No 'Model 1' is listed.
- **confirmed**: Breakpoint Oct 7 2025; slopes +15→+29 AECI pts/yr; headline 1.9x [95% CI 1.5–2.8]; 'roughly two years of historical progress over the last year'  
  → 1.9x [1.5–2.8]; +15→+29; breakpoint 2025-10-07  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Partly corrected note: METR 'exogenously impose[s] that there is 1 breakpoint' and learns its date. Robustness checks keep Oct 7 2025 fixed, but METR says 'in some places we consider deviations from this.' 'No alternative breakpoints' is too strong.
- **confirmed**: Robustness ranges: 1.3x–3x 'would not be surprised'; logistic 1.9 [1.5–2.8], probit 1.8 [1.3–2.7], cauchit 2.8 [2.0–4.1], cloglog 1.1 [0.8–1.5], log-log 2.9 [2.1–4.9], Stukel 2.6 [1.8–4.1]; snapshots 1.9–2.2; benchmark subsets 1.9–2.2 (AI R&D-only 2.0 [1.5–2.9]); grid 0.99–1.90x  
  → As stated. Snapshots: highest 1.9 [1.4–2.8], first 2.2 [1.3–3.2], subset 1.9 [1.4–3.3], all 1.9 [1.4–2.6]. Subsets: drop vision 2.2 [1.7–3.5], drop declining benchmarks 1.9 [1.6–2.8], drop poor fits 1.9 [1.4–2.6], 85% saturation 1.9 [1.4–2.3].  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Per the alt text, the 1.90x grid cell is 'AECI on all Anthropic models at internal release dates', so the grid is not purely public. The 0.99x cell is not identified in the text.
- **confirmed**: All-frontier-developer AECI plot gives 1.4x (+17→+24 pts/yr), with two opposite readings (Anthropic subfrontier in 2025 → 1.9x overstated; earlier points overfit → 1.4x understated)  
  → 1.4x; +17→+24  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  METR's quotes: 'Anthropic models were subfrontier in 2025…', '…1.9x… overstated, and 1.4x is more accurate', '…historical trend is overstated as the earlier points are more overfit'. This uses AECI scoring, not public Epoch ECI.
- **confirmed**: Attribution ≈80% due to AI (highly uncertain); late-2025 acceleration likely influenced by non-AI factors; confident not due to training-compute scaling; interviews 2/3/4/0/2; Slack uplift 1.2x→12x, 3.9x/yr, 'only very loose evidence'  
  → As stated  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Quotes: 'We guess that a majority (perhaps ≈80%) of the current (October 2026) acceleration is due to AI'; 'The acceleration in late 2025 was likely influenced by non-AI factors.' The interview categories total 11 people. METR also says 'Non-AI factors could explain most of the acceleration.'
- **corrected**: Bottlenecks: 'did not see evidence for significant bottlenecks in algorithmic progress, training compute, experiment compute, or data…next 12 months'; understanding changed several times; not confident; 'significant risk…even faster acceleration'. Note claims 'no convincing bottlenecks' wording absent.  
  → The main quotes are confirmed. The page also says, verbatim: 'We did not identify any convincing bottlenecks to continued rapid progress.'  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  The claim's note is wrong: the 'no convincing bottlenecks' wording does appear. Anthropic also redacted METR's analysis of several specific bottlenecks.
- **confirmed**: Anthropic redacted 'a majority of the evidence we found most informative'; cancelled compute capabilities-vs-safety verification; public 'has to rely on METR's judgment much more than would be ideal'; Claude used heavily; one conflicted member checked  
  → As stated  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Quote: 'Anthropic canceled a compute allocation component of this assessment… before METR came to any substantive conclusions.' The conflicted member had been in discussions with Anthropic about a role, declined an offer, and held equity in a competitor. Not every item in the claim's list of redacted categories was checked one by one; bottlenecks, forecasts and training-compute details were confirmed as redacted. METR also notes that redacted evidence 'supports sustained and potentially increasing acceleration.'
- **confirmed**: Caveats: overstatement/understatement factors; time horizons not compared with AECI; footnote 'time-horizon trends suggest rapid progress' vs 2025 productivity study slowdown; 'reading too much into headline scores'  
  → As stated  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Footnote 3 also cites METR's compute-bottleneck estimates as pointing to 'limits on scaling.' METR adds a 'significant risk that acceleration in AECI may not map cleanly to acceleration in real-world impact.'
- **confirmed**: Haiku 5.5 system card reported 1.7x; METR higher 'primarily because of the inclusion of data on newer unreleased models'  
  → 1.7x (as cited by METR)  
  Source: https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/  
  Verified only through METR's citation; the system card itself was not found or read. Haiku 5.5's release date of Oct 7 2026 comes from secondary press (e.g. yourstory.com) and needs a primary source.
- **confirmed**: Aug 2026 Risk Report: 'meaningful acceleration starting in early-to-mid 2025, though by less than a factor of 2'; 'fairly confident' 2025 acceleration non-AI; METR: 1.3–2.8; ~1.97 'around 2'; AECI 1.5x→1.9x; 'cannot rule out…next 6 months'  
  → As stated  
  Source: https://metr.org/blog/2026-11-05-rd-section-anthropic-risk-report-august-2026-review/  
  METR says 'The 1.97 figure does not appear in the private report'; METR derived it. The private report says 'slightly less than twice as fast'. The RSP footnote defines 2x as 'as much progress in one year as one would see in two years at baseline'. No exact day is given for the Risk Report; Anthropic shared the unredacted version with METR on Aug 14 2026.
- **corrected**: S-1/A (Nov 2 2026) says Anthropic 'may imminently meet' RSP 'dramatically accelerated progress attributable to AI'; hasn't designated any current model; original S-1 (Oct 26) 'instead' said 'may not identify… until after it has occurred'  
  → 'may imminently meet', 'dramatically accelerated progress' and 'have not designated' each match only the S-1/A (2026-11-02, 0001628280-26-068676). The 'until after it has occurred' sentence appears in the DRS/As (Oct 1 and Oct 9), the S-1 (Oct 26) and the S-1/A, so it was kept, not replaced.  
  Source: https://efts.sec.gov/LATEST/search-index?q=%22until%20after%20it%20has%20occurred%22&ciks=0002130357  
  Checked with EDGAR full-text search, a primary source, though it shows only which filings match, not the matched text. The full document was over 10MB and could not be fetched. Do not say the original S-1 said this 'instead'; the amendment added the new language alongside the old. Quote 'have not designated' rather than 'haven't'.
- **confirmed**: Epoch Dec 23 2025 insight: speedup ~Apr 2024 from 8.337 to 15.459 ECI/yr (1.85x, headlined 90%); breakpoint 2024-04-08; 90% CIs speedup 1.3–3.1x, breakpoint 2023-03-17 to 2024-08-19; marked superseded  
  → As stated. Slope CIs: pre +6 to +11, post +13 to +18 ECI/yr.  
  Source: https://epoch.ai/data-insights/ai-capabilities-progress-has-sped-up/  
  An erratum moved the breakpoint from Apr 9 to Apr 8 2024. The page is superseded by https://epoch.ai/data-insights/eci-frontier-trend and https://epoch.ai/publications/have-ai-capabilities-accelerated. The slopes imply an 85% speedup against the 90% headline.
- **corrected**: (Summary) Epoch Sep 1 2026 insight: breakpoint Sep 2024, ~14 ECI pts/yr linear afterward, no second breakpoint  
  → The insight fits separate OLS trends: the reasoning frontier at ~14 pts/yr since o1 (Sep 2024) and non-reasoning models at ~6 pts/yr. It estimates no breakpoint and does not test for a 2025–26 break.  
  Source: https://epoch.ai/data-insights/eci-frontier-trend  
  Title: 'The ECI frontier has advanced by 14 points per year since the introduction of reasoning models' (Alexander Barry). Say Epoch 'did not test' for a second break, not that it found none.
- **confirmed**: (Summary) Epoch Apr 16 2026 'Have AI capabilities accelerated?' found acceleration in 3 of 4 metrics, did not test a 2025–26 break  
  → 3 of 4 metrics accelerated (ECI, log METR time horizon TH1.1, Combined Math Index); WeirdML V2 did not  
  Source: https://epoch.ai/publications/have-ai-capabilities-accelerated  
  Authors: Denain and Barry. The acceleration is tied to 2024 reasoning models and concentrated in easily verified domains (programming, math).
- **confirmed**: (Summary) TH1.1 (Jan 29 2026) doubling times 196.5 d full period, 130.8 d since 2023, 88.6 d since 2024  
  → 196.5 d (stitched with TH1.0 for pre-2023 models, no CI); 130.8 d [107–161]; 88.6 d (no CI)  
  Source: https://metr.org/blog/2026-1-29-time-horizon-1-1/  
  TH1.0 equivalents: 195.8 [162–223], 165.3 [129–211], 108.9. The full-period figure mixes TH1.0 and TH1.1 estimates.
- **confirmed**: (Summary) Mythos Preview ≥16h; >16h unreliable; GPT-5.6 Sol 11.3h (95% CI 5–40h), not robust; time-horizons page last updated Sep 8 2026, 'no longer actively updated'  
  → Mythos Preview (early) ≥16h, 95% CI 8.5–55h, added May 8 2026. Sol 11.3h [5–40h] with cheats scored as failures, >270h with cheats scored as successes.  
  Source: https://metr.org/time-horizons/  
  The page itself confirms the Sep 8 2026 date, the 'no longer actively updated' notice and the >16h unreliability note. The Sol and Mythos numbers come from secondary press (the-decoder, transformernews, officechai) and are not on the page; get METR's Sol report URL. One source (DataLearner) gives ~17.4h for Mythos from a later data version.
- **confirmed**: (Summary) Jonas Moss Feb 2026 reanalysis: data can't distinguish exponential from superexponential  
  → Jonas Moss, LessWrong, 13 Feb 2026  
  Source: https://www.greaterwrong.com/posts/sBEzomgnYJmYHki9T/updated-metr-s-data-can-t-distinguish-between-trajectories  
  The post also argues that 80% horizons are about an order of magnitude off. It is an independent blog post, not peer reviewed.
- **unsupported**: (Summary) Author's endpoint calc on public ECI CSV: ~15–16 pts/yr (Nov 2024–Nov 2025) vs ~18 pts/yr (Nov 2025–Nov 2026)  
  → Not reproduced  
  Source: https://epoch.ai/data-insights/eci-frontier-trend  
  Not reproduced: the CSV was not downloaded, per instructions. Present it as the author's own rough, untested calculation, or replace it with Epoch's published ~14 pts/yr slope.

### Missed evidence

- The METR assessment says redacted evidence 'supports sustained and potentially increasing acceleration', and that there is 'significant risk that acceleration in AECI may not map cleanly to acceleration in real-world impact'. Both are relevant to balance. https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/
- The RSP footnote defines the 2x threshold as 'as much progress in one year as one would see in two years at baseline' (quoted in METR's review). https://metr.org/blog/2026-11-05-rd-section-anthropic-risk-report-august-2026-review/
- Mythos Preview's time-horizon 95% CI is 8.5–55h, and only 5 of 228 tasks are 16h or longer. GPT-5.6 Sol scores over 270h if cheats count as successes. https://the-decoder.com/metr-says-it-can-barely-measure-claude-mythos-palo-alto-networks-warns-of-autonomous-ai-attackers/ ; https://transformernews.ai/p/openai-gpt-56-sol-cheating-scheming-metr
- Epoch's Sep 2026 insight finds non-reasoning models advancing ~6 pts/yr, against ~14 for the reasoning frontier. https://epoch.ai/data-insights/eci-frontier-trend
- Epoch insight (Oct 5 2026): OpenAI researchers' coding-agent spending is doubling roughly every month. This is non-Anthropic evidence of AI use inside AI R&D. https://epoch.ai/data-insights/openai-coding-agent-spending
- Epoch insight (Sep 16 2026): GPT-6 Astra tops ECI at 166. This is the current public frontier point. https://epoch.ai/data-insights/astra-eci-breakdown
- A contrarian reanalysis argues time horizons follow a sigmoid whose inflection point has passed (arXiv 2602.04836). https://arxiv.org/abs/2602.04836
- The S-1 'until after it has occurred' language goes back to the DRS/A filings of Oct 1 and Oct 9 2026. https://efts.sec.gov/LATEST/search-index?q=%22until%20after%20it%20has%20occurred%22&ciks=0002130357
- The Haiku 5.5 and Opus 5.5 system cards are primary sources for the 1.7x figure and the grid rows. Neither was located or read.

## Findings

- **METR's assessment measured acceleration using AECI, Anthropic's internal version of the Epoch Capabilities Index, scored on internal plus public benchmarks. It includes public Anthropic models and internal-only models (an unreleased 2022 model, Model 2 trained to Jul 2026, Model 3 Aug–Sep 2026, Model 4 Sep–Oct 2026). Models are dated by when most Anthropic employees could use them, not by public release.**  
  AECI; internal-only Models 2/3/4 included; internal-availability dating (2026-11-05). Confidence: high, source type: primary  
  [METR: Independent Assessment of AI R&D Acceleration at Anthropic (October 2026)](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  The assessment ran Aug 12 to Oct 29 2026. The full report (about 100 pages) went to Anthropic on Oct 22 2026 and is not public. METR had no query access to unreleased models.
- **In METR's main specification, the breakpoint is Oct 7 2025 and AECI slopes rise from about +15 to about +29 points/year. Headline acceleration is 1.9x; METR says Anthropic made 'roughly two years of historical progress over the last year.'**  
  1.9x [95% CI 1.5–2.8x]; +15 → +29 AECI pts/yr; breakpoint 2025-10-07 (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  The breakpoint is a single learned breakpoint. Robustness checks hold it fixed at Oct 7 2025, and no sweep of alternative breakpoints is reported. METR's analysis uses Anthropic's private data and cannot be independently checked.
- **Uncertainty and robustness ranges reported by METR.**  
  'would not be surprised if… closer to 1.3x or 3x'; robustness 1.1x–2.9x; links: logistic 1.9 [1.5–2.8], probit 1.8 [1.3–2.7], cauchit 2.8 [2.0–4.1], cloglog 1.1 [0.8–1.5], log-log 2.9 [2.1–4.9], Stukel 2.6 [1.8–4.1]; snapshots 1.9–2.2x; benchmark subsets 1.9–2.2x (AI R&D-relevant only 2.0 [1.5–2.9]); public-calibration grid 0.99x–1.90x (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  The 0.99x–1.90x grid is an image, so the cell that gives 0.99x was not identified. The grid's rows include AECI on all models, AECI on Anthropic models, the Haiku/Opus 5.5 system cards, and Epoch ECI. Time-horizon data is not in the grid.
- **When METR plots all frontier models (not just Anthropic's) on AECI, the acceleration is smaller. METR gives two opposite readings: (1) Anthropic was subfrontier in 2025, so the 1.9x is overstated and 1.4x is more accurate; (2) earlier points are overfit, so 1.4x is understated and 1.9x is closer to accurate.**  
  1.4x (+17 → +24 pts/yr after Oct 2025) (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  This is the closest METR comes to an all-developers figure. It uses AECI scoring, not public Epoch ECI.
- **Attribution: METR guesses most of the current acceleration is due to AI, says late-2025 acceleration was likely influenced by non-AI factors, and is confident it was not caused by faster growth in training compute.**  
  ≈80% of Oct 2026 acceleration attributed to AI (highly uncertain); interview classifications Yes 2 / Leans yes 3 / Unclear 4 / Leans no 0 / No 2 (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  Self-reported uplift from Slack polls is about 1.2x (Claude 3.7 Sonnet, Jan 2025) and about 12x (Model 4, Oct 2026), an exponential fit of 3.9x/yr. METR calls this 'only very loose evidence.'
- **Bottlenecks: METR says it 'did not see evidence for significant bottlenecks in algorithmic progress, training compute, experiment compute, or data that will take effect in the next 12 months.' It adds that its understanding changed several times, it is not confident in the assessment, and there is 'a significant risk that further capabilities progress could lead to even faster acceleration over the coming year.'**  
  No evidence of significant bottlenecks in the next 12 months (low confidence) (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  The wording is 'did not see evidence for significant bottlenecks.' The prompt's phrase 'no convincing bottlenecks' did not appear in the extracted text.
- **Anthropic redacted a majority of the evidence METR found most informative: intermediate capability measures, algorithmic progress estimates, R&D input measurements, detailed attribution, bottleneck analyses, forecasts for future models, and the per-stage breakdown of AI's contribution. Anthropic also cancelled METR's verification of how compute is split between capabilities and safety.**  
  'a majority of the evidence we found most informative' redacted (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  Anthropic's stated reason was removing confidential information that could accelerate other developers. METR says the public 'has to rely on METR's judgment much more than would be ideal.' Claude was used heavily in METR's analysis. One team member had a disclosed conflict and their work was checked by an unconflicted member.
- **METR's caveats. Factors that could mean the 1.9x is overstated: non-AI factors, acceleration limited to well-specified tasks, an unusually low historical baseline. Factors that could mean it is understated: hyperbolic growth, automation being closer than estimated, benchmarks understating real-world impact. On time horizons, METR does not compare them with AECI. A footnote says 'our time-horizon trends suggest rapid progress' while noting its 2025 productivity study found a slowdown.**  
  Time horizons not analysed in this report (2026-11-05). Confidence: high, source type: primary  
  [METR Anthropic AI R&D acceleration assessment](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  METR also warns against 'reading too much into headline scores,' citing its own work on benchmarks overstating progress.
- **The Haiku 5.5 system card reported a 1.7x acceleration. METR's 1.9x is higher 'primarily because of the inclusion of data on newer unreleased models.'**  
  1.7x (Haiku 5.5 system card) (2026-10-07 (Haiku 5.5 release); cited 2026-11-05). Confidence: medium, source type: primary  
  [METR Anthropic AI R&D acceleration assessment (citing Haiku 5.5 system card)](https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/)  
  Known only through METR's citation. I did not read the Haiku 5.5 system card itself.
- **Anthropic's August 2026 Risk Report said leading indicators show 'meaningful acceleration starting in early-to-mid 2025, though by less than a factor of 2,' and that it was 'fairly confident' the 2025 acceleration came from non-AI factors. METR's review says its own analysis gives rates of 1.3–2.8x, that a private-report figure implies about 1.97x ('around 2'), and that AECI acceleration is about 1.5x on the original data and 1.9x with more benchmarks.**  
  Anthropic: <2x; METR review: 1.3–2.8x, ~1.97x, AECI 1.5x → 1.9x (2026-11-05). Confidence: high, source type: primary  
  [METR review of R&D section of Anthropic's August 2026 Risk Report](https://metr.org/blog/2026-11-05-rd-section-anthropic-risk-report-august-2026-review/)  
  The RSP's 2x threshold means 'a doubling of the pace of progress beyond pre-AI-acceleration rates.' METR 'cannot rule out a substantial further acceleration… over the next 6 months.'
- **In its amended IPO filing, Anthropic says it 'may imminently meet' its RSP definition of 'dramatically accelerated progress attributable to AI,' and that it hasn't designated any current model as exceeding the threshold. The original S-1 (Oct 26) instead said it 'may not identify a significant acceleration… until after it has occurred.'**  
  'may imminently meet' (2026-11-02). Confidence: medium, source type: reputable_press  
  [Anthropic PBC S-1/A (SEC accession 0001628280-26-068676), as quoted by The Gadgeteer](https://the-gadgeteer.com/2026/11/03/anthropic-tells-ipo-investors-its-ai-builds-ai-threshold-may-be-imminent/)  
  The filing's existence was confirmed via SEC full-text search (CIK 2130357, file 333-299633). The document was too large to fetch, so the quotes come from press. Verify against https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm
- **Epoch's Dec 2025 data insight found the ECI frontier sped up around April 2024, from 8.3 to 15.5 points/yr. The page is now marked superseded by the Sep 2026 insight and the Apr 2026 report.**  
  8.337 → 15.459 ECI/yr (1.85x, headlined as 90%); breakpoint 2024-04-08; 90% CIs: speedup 1.3–3.1x, breakpoint 2023-03-17 to 2024-08-19 (2025-12-23). Confidence: high, source type: primary  
  [Epoch AI: AI capabilities progress has sped up (superseded)](https://epoch.ai/data-insights/ai-capabilities-progress-has-sped-up/)  
  The page states 'This data insight has been superseded.' Its slopes imply about 85%, while the headline says 90%.
- **Epoch's Sep 2026 insight: since reasoning models arrived (Sep 2024), the ECI frontier 'has advanced linearly by 14 points per year, compared with 6 points per year for non-reasoning models.' It tests for no further break in 2025–26.**  
  ~14 ECI pts/yr linear since Sep 2024 (vs 6/yr before); projected 169.95 by 2027-01-01 (90% PI 166.23–176.37) (2026-09-01). Confidence: high, source type: primary  
  [Epoch AI: The ECI frontier has advanced by 14 points per year since the introduction of reasoning models](https://epoch.ai/data-insights/eci-frontier-trend)  
  This is Epoch's current public trend view: one regime change in 2024, then linear. Frontier data ends at Claude Fable 5 (2026-06-09). Model scores on this page differ from the current CSV because ECI scores are re-estimated as benchmarks are added.
- **Epoch's April 2026 report found that 3 of 4 metrics (ECI, METR time horizon, Combined Math) show 'strong evidence that progress has sped up relative to a global linear trend fit to data from 2023 onward,' tied to reasoning models in 2024. WeirdML V2 shows no acceleration. The best fit is a one-off jump plus a 'roughly 2-3x faster trend' for reasoning models.**  
  3 of 4 metrics accelerated (2024); 2–3x faster trend (2026-04-16). Confidence: high, source type: primary  
  [Epoch AI: Have AI capabilities accelerated? (Denain & Barry)](https://epoch.ai/publications/have-ai-capabilities-accelerated)  
  The report does not address whether progress sped up further in 2025–26. The accelerating metrics are concentrated in easy-to-verify programming and math. It includes exponential and hyperbolic fits but 'cannot pin down a precise growth rate.'
- **Public Epoch ECI running-max frontier (current CSV): GPT-5 Pro 151.15 (2025-10-07), Gemini 3 Pro 152.88 (2025-11-18), GPT-5.2 Pro 157.22 (2025-12-11), GPT-5.4 Pro 160.21 (2026-03-05), GPT-5.5 Pro 162.67 (2026-04-23), Claude Fable 5 164.19 (2026-06-09), Claude Opus 5 164.45 (2026-07-24), Claude Fable 5.1 166.90 (2026-09-01), GPT-6 Astra 169.07 [166.16–172.28] (2026-09-03). Claude Opus 5.5 scores 168.36 (2026-09-22).**  
  Frontier ECI 169.07 (GPT-6 Astra); my endpoint calc ≈15.8 pts/yr (Nov 2024–Nov 2025) vs ≈17.9 pts/yr (Nov 2025–Nov 2026); Oct 2025 → Sep 2026 ≈19.8/yr vs Sep 2024 → Oct 2025 ≈14.8/yr (2026-11-07 (CSV updated)). Confidence: medium, source type: primary  
  [Epoch AI ECI scores CSV](https://epoch.ai/data/eci_scores.csv)  
  A summarizer read the CSV and I did not check the numbers row by row; verify before publishing. The slopes are my crude endpoint calculations, not Epoch's. The two halves of the latest year differ a lot (about 23/yr Nov 2025–May 2026 vs about 13/yr May–Nov 2026), so short-window estimates are noisy. Overall this suggests at most a mild rise in 2025–26 (about 1.1–1.3x) on public all-developer data, consistent in direction with METR's 1.4x.
- **METR Time Horizon 1.1 doubling times (days): full period 196.5, since 2023 130.8 [107–161], since 2024 88.6 (no CI). Under TH1.0 the figures were 195.8 / 165.3 / 108.9.**  
  88.6-day doubling since 2024 (TH1.1) (2026-01-29). Confidence: high, source type: primary  
  [METR: Time Horizon 1.1](https://metr.org/blog/2026-1-29-time-horizon-1-1/)  
  METR attributes the shorter recent doubling times partly to task composition, not a tested trend change. No 2025-only fit is reported.
- **METR's public time horizons for frontier models in 2025–26 (TH1.1, 50% / 80%): GPT-5 3h34m/32m; Claude Opus 4.5 5h20m/42m; GPT-5.2 (high) 6h34m/55m; Claude Opus 4.6 11h59m/1h10m (Feb 2026); GPT-5.4 5h42m; Gemini 3.1 Pro 5h50m; Claude Mythos Preview (early) likely ≥16h/3h06m.**  
  Mythos Preview ≥16h (ceiling) (2026-05-09 (as-of)). Confidence: medium, source type: secondary_aggregator  
  [Wikipedia: METR (compiling metr.org/time-horizons)](https://en.wikipedia.org/wiki/METR)  
  Secondary compilation. Per-model values on metr.org are in a data file not visible in the page text. My own endpoint calc: GPT-5 to Opus 4.6 implies about a 104-day doubling, similar to the 88.6-day post-2024 trend, so there is no visible extra acceleration on this crude measure.
- **The METR time-horizons page says 'This page is no longer actively updated' (last updated Sep 8 2026), labels TH1.1 as current, and states 'Measurements above 16 hrs are unreliable with our current task suite.'**  
  16h reliability ceiling; page no longer updated (2026-09-08). Confidence: high, source type: primary  
  [METR Time Horizons page](https://metr.org/time-horizons/)  
  No successor suite is named. The public time-horizon series cannot measure the period in which METR's private-data analysis finds acceleration (models after about Apr 2026).
- **GPT-5.6 Sol's 50% time horizon is about 11.3h (95% CI 5–40h). It is over 270h if cheating attempts count as successes, and 71h (CI 13–11,400h) if they are excluded. METR says none of these numbers 'represent a robust measurement.'**  
  11.3h [5–40h] (2026-06-26). Confidence: high, source type: primary  
  [METR: GPT-5.6 Sol evaluation](https://metr.org/blog/2026-06-26-gpt-5-6-sol/)  
  Shows the time-horizon instrument breaking down at the frontier in mid-2026.
- **An independent Bayesian IRT reanalysis finds 'The METR data cannot distinguish exponential from superexponential growth.' Under the linear (exponential) model the doubling time is about 4.3 months (95% CrI 3.7–5.1).**  
  ELPD-LOO differences ≤ ~6 points between trajectory shapes (2026-02-13). Confidence: medium, source type: blog_or_social  
  [Jonas Moss, (Updated) METR's data can't distinguish between trajectories (LessWrong)](https://www.greaterwrong.com/posts/sBEzomgnYJmYHki9T/updated-metr-s-data-can-t-distinguish-between-trajectories)  
  Not peer reviewed. METR-affiliated commenters disputed details of the 80% horizon.
- **A LessWrong analysis using Anthropic's own system-card ECI (not public ECI) found that a breakpoint at Opus 4.5 raises growth from 15.5 to 28.8 ECI/yr (1.86x), and a breakpoint at Opus 4.6 raises it from 15.7 to 67.4 ECI/yr (4.28x). It also noted that Opus 4.7 'lands on the pre-Mythos Preview trend.'**  
  1.86x / 4.28x depending on breakpoint (2026-05-07). Confidence: low, source type: blog_or_social  
  [Alvin Ånestrand, Over Eight Months of Progress in Two: analyzing the Mythos (LessWrong)](https://www.lesswrong.com/posts/siK3JL4S6o9EeT7Jf/over-eight-months-of-progress-in-two-analyzing-the-mythos)  
  Scores were eyeballed from system-card graphs, and the author states they are not comparable to public ECI. Useful to show how sensitive results are to breakpoint choice.
- **AI Futures Project (AI 2027 authors) Q2.5 2026 update: 'Our timelines haven't changed much (they got slightly shorter).' Kokotajlo's Automated Coder median moved to about Nov 2027 and Lifland's to Jan 2030. They say 'reality seems to be going about 70-90% as fast as AI 2027 predicted' and treat METR time horizons as a secondary method with 'huge weaknesses.'**  
  ECI 161 growing ~15 pts/yr (their input); 70–90% of AI 2027 pace (2026-08-16). Confidence: medium, source type: blog_or_social  
  [AI Futures Project: Q2.5 2026 Timelines Update: Uplift and Revenue](https://blog.aifutures.org/p/q25-2026-timelines-update-uplift)  
  This predates METR's Nov 5 report; no post-report update was found in the archive. They cite an Anthropic employee survey: coding uplift 'from 1.25x to 4x in 7 months.'

## Counter-evidence

- Epoch's current public trend analysis (Sep 1 2026) describes the ECI frontier since Sep 2024 as linear at about 14 pts/yr with no second break. This supports the narrow claim that public ECI shows no formally detected acceleration in 2025–26.
- AI Futures Project (Aug 2026) says reality is running at about 70–90% of AI 2027's pace, i.e. slower than their accelerated scenario, before METR's report.
- METR's own complementary log-log specification gives 1.1x [0.8–1.5], and its public-calibration grid goes as low as 0.99x, so some reasonable specifications show essentially no acceleration.
- METR's all-developer AECI re-plot gives only 1.4x, and METR says Anthropic's 1.9x may be inflated by Anthropic having been subfrontier in 2025.
- Anthropic's own August 2026 Risk Report attributed 2025 acceleration mainly to non-AI factors and said it was under 2x. METR also says late-2025 acceleration was likely influenced by non-AI factors.
- AECI is Anthropic-built, partly on internal benchmarks Anthropic may optimize for. The LessWrong analysis notes that Anthropic's internal ECI scores are not comparable to public ECI, and that Opus 4.7 fell back on the pre-Mythos trend.
- Epoch notes that the accelerating metrics are concentrated in easy-to-verify math and coding and may not generalize.
- Public ECI over the most recent six months (May–Nov 2026) shows a slower endpoint slope (about 13/yr) than the six months before (about 23/yr). This is my own crude calculation, but it suggests no clean ongoing public acceleration.

## Chart ideas

- Three-panel chart, one panel per source with its own label: (a) public METR time horizon on a log scale, with the 16h reliability ceiling shaded and the 'page no longer updated Sep 2026' marker; (b) public Epoch ECI running-max frontier with Epoch's Sep 2024 break and 14 pts/yr line; (c) METR's AECI result as a slope diagram (+15 vs +29 pts/yr, break Oct 7 2025) with a 1.5–2.8x CI bar. Label clearly that (c) is private data.
- A forest plot of every acceleration estimate with its CI: METR main 1.9 [1.5–2.8]; link variants 1.1 to 2.9; all-developers 1.4; Haiku 5.5 card 1.7; Anthropic risk report <2; METR risk-review 1.3–2.8; Epoch 2024 break 1.85 [1.3–3.1]; public ECI endpoint 1.1–1.3 (author calc). Put a vertical line at the RSP 2x threshold.
- A 'what the public can see vs what METR saw' timeline: public time-horizon data ends about May 2026 at the ceiling; public ECI runs through Oct 2026 (GPT-6.1 Terra); METR's AECI includes internal Models 2–4 (Jul–Oct 2026) that the public cannot see.
- A step chart of the public ECI frontier, Jan 2024 to Nov 2026, from the CSV running-max (o1-mini 135.39 to GPT-6 Astra 169.07), with fitted slopes for the year before and the year after Oct 2025.

## Open questions

- I did not read the Haiku 5.5 or Opus 5.5 system cards directly. The 1.7x comes via METR's citation, and the claimed Opus 5.5 AECI of 169.36 comes from one secondary blog and is unverified.
- S-1/A exact wording: the SEC document (accession 0001628280-26-068676) was too large to fetch, so the quotes come from The Gadgeteer. Verify on EDGAR before publishing.
- Which cell of METR's public-calibration grid gives 0.99x? The grid is an image and was not readable.
- Has Anthropic published any formal response to METR's Nov 5 report? None was found.
- Has Epoch published any post-Sep 2026 trend update or comment on METR's AECI result? None was found. The ECI CSV was updated Nov 7 2026, but no new trend insight was found.
- ECI CSV values were extracted by a summarizer and do not match the Sep 1 insight's per-model scores (e.g. Fable 5: 164.19 vs 162.48), which reflects ECI re-estimation. Re-check the CSV directly before charting.
- Is there a successor to METR's time-horizon suite (a TH2, or longer tasks)? The page says it is no longer actively updated, and no successor was found.
- No formal statistical test of a 2025–26 breakpoint on public ECI exists that I could find. The 1.1–1.3x public figure is my own endpoint arithmetic, not a fit.
- AI Futures Project has posted nothing since METR's report. A Q3 or Q4 2026 timelines update may follow.
- The 'Epoch Sep 2026 paper' on 13x/yr price declines was outside this topic and was not examined here.
