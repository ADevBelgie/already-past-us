# Perception gap

Research round r1, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

The evidence shows a measurable, two-sided perception gap. On the 'people underestimate AI' side: forecasters have repeatedly been too conservative. FRI's Sept 2026 accuracy review finds that in 2022, superforecasters gave the outcomes that actually happened on MATH, MMLU, QuALITY and IMO gold an average probability of 9.7%, and domain experts gave 24.6%. Experts expected IMO gold around 2030 and superforecasters around 2035; it happened in July 2025. LEAP panelists expected 14% on LiveCodeBench Pro Hard by end-2026, and the actual score was 53.8% by May 2026. Revenue forecasts were too low by 2-5x. The public remains skeptical of current ability. In Bentley-Gallup (May 2026), Americans still rate AI worse than people on every task asked about. In Economist/YouGov (May-June 2026), 43% say AI reasons worse than humans and 17% say better; a July 2026 YouGov poll was roughly evenly split, 33% better vs 29% worse. Most people use free tiers. Reuters Institute (Oct 2026, 9 countries) finds about 18% have any paid access and that free-only users use agents far less: 11% vs 39%. OpenAI's own figures (50M paying subscribers vs 900M weekly users in Feb 2026) imply about 5-6% pay. Anthropic's Oct 2026 survey (its own staff vs the US public, so not neutral) shows an extreme insider-outsider split: 91% vs 39% expect Nobel-level discovery by 2030. Public mood is souring even as use grows: Pew finds 52% more concerned than excited (June 2026), and Gallup finds 39% say AI does more harm than good, up from 31%. The counterevidence is real and should get equal space. METR's 2025 RCT found experienced developers were 19% slower with AI while believing they were 20% faster. Its 2026 follow-up gave -18% and -4% time changes, with confidence intervals crossing zero, and METR itself calls the data unreliable. The Danish administrative-data study rules out earnings or hours effects larger than 2%. On the Remote Labor Index, the best agent was judged at least as good as a human on only 2.5% of freelance projects at launch, and the best is about 21% now. Forecasters also overestimated some things: SWE-Bench Verified in 2025, LLM biorisk uplift (predicted 16-40% vs actual 5.2%), robotaxi share, and Hinton's 2016 radiologist prediction. AI-washing is now a recurring enforcement category (SEC: Delphia, Global Predictions, Presto; SEC and DOJ: Nate). For the author's beliefs: belief 1 (the trend is faster than expected) is well supported on benchmarks and revenue. Belief 2 (more superhuman than people realize) is supported as a perception gap, but measured real-world productivity effects are still small or uncertain. FRI also warns that its method is biased toward detecting underestimation.

## Fact-check

The core numbers check out. Every figure taken from FRI, AI Digest, METR (2025 and 2026), the Remote Labor Index, Anthropic, Bentley-Gallup and both YouGov polls matches its primary source exactly, and nothing looks fabricated. The real problems are framing and completeness. (1) The revenue 'misses' rest on FRI's 'likely' current values, built from press reports of vendor run rates (Anthropic $100B via Axios, OpenAI $40B via Bloomberg), and the questions resolve at end-2026; the omitted superforecaster forecast of $90B shrinks the combined-run-rate gap to about 1.6x. (2) The Danish study has been revised and retitled. Its 2% bound is measured from ChatGPT's launch, not from adoption, and the researcher's note that '1% is a misstatement' is probably wrong, since 1% was likely the original version's bound. Sample sizes and the 3% time saving went unverified. (3) The summary lists robotaxi share as an overestimate, but it is unresolved and only the experts were high. Hinton's prediction has no source. (4) The RLI top two differ by one project and have no CI. (5) The Bentley-Gallup 39% harm figure equals the 2023 level (40%), so it is a rebound, not a record. The search budget ran out after one search, so the Reuters Institute, OpenAI subscriber, Pew and most SEC/DOJ claims in the summary still need checking before publication. The overall thesis (benchmarks and revenue beat forecasts; productivity effects small or uncertain; FRI's method is biased toward finding underestimation) is fairly supported by the verified sources.

- **confirmed**: XPT 2022: average probability assigned to the observed outcomes on MATH, MMLU, QuALITY and IMO Gold was 9.7% for superforecasters and 24.6% for domain experts  
  → Superforecasters 9.7%, domain experts 24.6%. These are average implied probabilities for the observed resolution values on the four XPT benchmarks (forecasts made mid-2022). FRI published on 2026-09-22.  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  Matches the primary source. FRI says outright that its methodology is biased toward finding underestimates, and that it analyses medians, which can hide more accurate subsets. The page does not say explicitly that all four questions have formally resolved.
- **confirmed**: IMO gold: expert median forecast 2030, superforecasters 2035, achieved July 2025; implied probability of the outcome 8.6% (experts) and 2.3% (superforecasters)  
  → Expert median 2030, superforecaster median 2035, achieved July 2025. Implied probabilities 8.6% (experts) and 2.3% (superforecasters), per FRI footnote 5.  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  Exact match. The July 2025 gold-level results came from the labs themselves (OpenAI and Google DeepMind), so the resolution event is vendor-announced. That is widely accepted, but worth noting.
- **confirmed**: LEAP: FrontierMath T1-3 end-2025 forecast 31% (experts) / 30% (superforecasters) vs 40.7% actual; LiveCodeBench Pro Hard end-2026 forecast 14% / 12% vs 53.8% SOTA by May 2026; open-weight 20% vs 22.7%  
  → FrontierMath: 31% / 30% forecast vs 40.7% (unadjusted). LiveCodeBench Pro Hard: 14% / 12% forecast vs 53.8% SOTA in May 2026. Open-weight question: 20% forecast median vs 22.7% resolution.  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  Matches. Two caveats. LiveCodeBench Pro resolves at end-2026, so it is not formally resolved, although the forecast is already exceeded. The 40.7% FrontierMath score predates Epoch's finding that about 42% of problems contained errors. Note also that FrontierMath is funded by OpenAI, which has privileged access to it.
- **confirmed**: METR 80% time horizon end-2026 forecast 3.4 h (experts) / 3.5 h (superforecasters); Claude Mythos Preview about 3.1 h by May 8, 2026  
  → 80% horizon (not 50%). Experts 3.4 h, superforecasters 3.5 h. Mythos Preview about 3 h 6 min, added May 8, 2026.  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  Correct as of FRI's Sept 2026 writeup. METR's time-horizons page still lists May 8, 2026 as its latest model addition, so I could not get a newer measurement. The briefing should say the figure is 'as of May 2026' and that this question is still unresolved.
- **corrected**: Revenue/adoption: AI-company ARR end-2026 forecast $20B (experts) / $25B (superforecasters) vs about $100B; Anthropic+OpenAI run rate forecast $70B vs about $140B; US gen-AI-assisted work hours 2025 forecast 4% vs 5.7%  
  → ARR: experts $20B, economists $16B, superforecasters $25B; FRI's 'likely' current value is $100B. Combined Anthropic+OpenAI run rate: experts $70B, superforecasters $90B; 'likely' value $140B (OpenAI $40B per Bloomberg, Aug 13, 2026 + Anthropic $100B per Axios, Sept 18, 2026). Work hours: experts 4%, superforecasters 3.6%, resolved 5.7%. The question's 2% baseline was later revised to 3.35%.  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  The numbers are right but incomplete. The superforecaster $90B figure and the economists' $16B are omitted. FRI calls the revenue values 'likely', not resolved, and they come from press reports of vendor run rates, so they are vendor-reported. The $100B 'AI-focused company' value is sourced only to an Axios report on Anthropic's revenue. On work hours, part of the miss is probably forecasters anchoring on a baseline that was later revised up.
- **confirmed**: AI Digest 2025 survey (421 forecasters): SWE-Bench Verified 88% forecast vs 80.9%; Cybench 62% vs 82%; OSWorld 60% vs 66.3%; FrontierMath 40% vs 40.7%; frontier-lab revenue $16B vs $30.4B; 'most important problem' 2% vs 0.625%  
  → All values match. Published Jan 16, 2026 by Anson Ho (Epoch AI), with the AI Futures Project. Revenue covers OpenAI, Anthropic and xAI.  
  Source: https://theaidigest.org/2025-forecast-results  
  The sample is self-selected (73% claim AI experience; half expect HLMI by 2030), so it is not a neutral forecaster pool. RE-Bench was also close (1.1 forecast vs 1.13 actual). The revenue question had the lowest 80% CI coverage (57.7%).
- **confirmed**: Biorisk uplift: biosecurity experts 22.5%, virologists 40%, superforecasters 16.2% predicted vs 5.2% actual  
  → 22.5% / 40% / 16.2% predicted vs 5.2% actual (mid-2025 RCT, STEM undergrads completing all three tasks).  
  Source: https://forecastingresearch.org/research/ai-progress-accuracy-update  
  Exact match. The summary's range '16-40%' is correct.
- **confirmed**: METR 2025 RCT: 16 developers, 246 tasks, 19% slower (95% CI +2% to +39%); forecast 24% speedup, believed 20% afterward  
  → 16 developers, 246 issues, 19% longer with AI, 24% expected speedup, 20% believed speedup afterward. Tools were mainly Cursor Pro with Claude 3.5/3.7 Sonnet. The page is marked 'out of date'.  
  Source: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/  
  The +2% to +39% CI is not on the 2025 page, which says clustered SEs are forthcoming. It does appear in METR's Feb 24, 2026 post, as the researcher noted.
- **confirmed**: METR late-2025 follow-up: 57 developers (10 returning, 47 new), 143 repos, 800+ tasks, $50/h; returning -18% (CI -38% to +9%), new -4% (CI -15% to +9%); 30-50% withheld tasks; METR calls the signal unreliable  
  → All figures match the Feb 24, 2026 post. METR calls the data 'an unreliable signal' and 'only very weak evidence for the size of this increase'.  
  Source: https://metr.org/blog/2026-02-24-uplift-update/  
  Correct, and correctly framed. On the self-report survey the researcher flagged: the page instead features a separate METR survey of 349 technical workers with a median self-reported 1.4-2x change in value of work. The '3x' figure is not on METR's page, so it should stay out.
- **corrected**: Danish admin data (Humlum & Vestergaard, NBER WP 33777): null earnings/hours effects; CIs rule out effects >2% two years after adoption; about 3% time savings; about 25,000 workers, 7,000 workplaces, 11 occupations  
  → NBER w33777 (issued May 2025, revised March 2026) is now titled 'Still Waters, Rapid Currents: Early Labor Market Transformation under Generative AI'. It reports precise null effects on earnings and recorded hours and rules out effects 'larger than 2% two years after the launch of ChatGPT'.  
  Source: https://www.nber.org/papers/w33777  
  Four problems. (1) The bound is defined relative to ChatGPT's launch, not 'after adoption'. (2) The paper has been retitled and revised, so the briefing should cite the current version. (3) The original 2025 'Small Labor Market Effects' abstract, from memory, stated a 1% bound, so 'secondary sources misstate it as 1%' is probably wrong: 1% was likely the earlier version's figure. (4) I could not verify the sample sizes or the 3% time-savings figure: the BFI PDF did not extract and the NBER abstract omits them. The revised abstract also adds findings on task reorganisation and occupational mobility that the researcher left out.
- **confirmed**: Remote Labor Index: best agent 2.5% at launch; current top Opus 5.5 21.25%, GPT 6 Astra 20.83%, Fable 5.1 17.92%  
  → Top three: Opus 5.5 21.25%, GPT 6 Astra 20.83%, Fable 5.1 17.92%. Gemini Argon 4 (marked NEW) 17.08%. Manus was top at 2.5% at launch.  
  Source: https://labs.scale.com/leaderboard/rli  
  Matches. The leaderboard states there is no CI for Automation Rate and gives no snapshot date. With about 240 projects, a step of about 0.42 pp is one project, so the top two (21.25 vs 20.83) differ by a single project. Do not rank them. Scale AI is a commercial data vendor and co-runs the benchmark.
- **confirmed**: Anthropic expectations gap: 91% staff vs 39% public expect Nobel-level discovery by 2030; never-able at most 2% vs 19-40%; own work by 2030 75% vs 28%; GDP 2030 17.1% vs 5.4%  
  → All numbers match. Published Oct 16, 2026. Public sample: Morning Consult opt-in panel, N=10,980, Aug 11-23, 2026, weighted. Staff: N=1,334, Aug 9-12, 2026, unweighted. Re-field Sept 17-24 (N=7,613): Nobel 44%, GDP 5.6%.  
  Source: https://www.anthropic.com/research/ai-expectations-gap  
  Vendor-produced, correctly labeled. Further caveats: the 28% is US workers (employed respondents), not all adults. Only half the public sample was asked about 2030. Answer formats differed (public fixed ranges vs staff slider), so the comparisons are not like for like. The re-field moved the Nobel figure 5 points in a month, which suggests instability.
- **confirmed**: Bentley-Gallup: AI rated worse than people on every task (2023 and 2026); 'worse' down 7/6/5 pts (driving, financial, medical); homework 'AI better' 26% to 29%; harm 39% vs 31% (2025); good 9%  
  → Matches. Published July 28, 2026; fielded May 4-11, 2026; N=3,270 Gallup Panel; MOE ±2.4. 'Equal harm and good' is 52%. 'More harm than good' was 40% in 2023.  
  Source: https://news.gallup.com/poll/712751/americans-cool-toward.aspx  
  Add context: harm was 40% in 2023, so 39% is a rebound to the 2023 level, not a new high. The article does not state the baseline year for the point changes, though 2023 is implied. Hiring recommendations were essentially unchanged.
- **confirmed**: Economist/YouGov May 29-Jun 1, 2026: AI reasoning worse 43%, same 21%, better 17%. YouGov Jul 16-20, 2026 (N=1,110): better 33%, worse 29%, same 25%; facts 44/18; complex reasoning 33/28; creativity 25/37  
  → All figures match. The July poll was published Aug 1, 2026 (N=1,110 US adult citizens, MOE about ±4.0). The Economist poll item covers AI's 'thinking and reasoning abilities' compared with humans; N is not given in the article.  
  Source: https://yougov.com/en-us/articles/55289-do-americans-think-ai-is-smarter-than-donald-trump  
  The researcher is right that the two polls use different wording (humans in general vs 'the average person'), so the summary should not imply a shift from 43% worse to 29% worse. About 19% of the Economist sample did not answer or was unsure.

### Missed evidence

- Verification limits: the shared web-search budget ran out after one search. Everything above was checked by fetching known primary URLs directly. Several summary-level claims could not be re-verified and should be confirmed before publication: Reuters Institute Oct 2026 (18% paid access; agent use 11% vs 39%), OpenAI's Feb 2026 figures (50M paying vs 900M weekly users), Pew June 2026 (52% more concerned than excited), and the SEC/DOJ Presto and Nate actions. Of the SEC claims, only the Delphia/Global Predictions release (2024-36, Mar 18, 2024, $400K total penalties) was confirmed.
- FRI lists additional overestimates the summary omits. XPT software/information-services GDP share: forecast 3.6% (experts) / 3.45% (superforecasters) vs 3.25% actual. US electricity share for AI and AI-companionship use (2027) are possible overestimates. https://forecastingresearch.org/research/ai-progress-accuracy-update
- The robotaxi share is an unresolved 2027 question: expert median 7.3% vs an LLM projection of 2.5% and a superforecaster median of 2%. FRI says the expert figure 'looks very likely' to be an overestimate, so the summary should not present it as a resolved miss. Superforecasters were roughly on target here, so 'forecasters overestimated' applies to experts only. https://forecastingresearch.org/research/ai-progress-accuracy-update
- Hinton's 2016 radiologist prediction is not in the FRI source and has no citation in the findings. Add a primary source, such as the 2016 talk video, or drop it.
- FRI's ARR values come from press reports of vendor run rates (Axios on Anthropic, Bloomberg on OpenAI). The headline 'revenue forecasts were too low by 2-5x' therefore compares forecasts with unaudited vendor figures, not resolved values.
- NBER w33777 has been revised (March 2026) and retitled 'Still Waters, Rapid Currents'. The revised abstract adds evidence of task reorganisation and occupational upgrading among adopters. Cite the current version: https://www.nber.org/papers/w33777
- METR has a separate survey of 349 technical workers reporting a median self-reported 1.4-2x change in the value of their work. That is better primary evidence for the self-report side of the perception gap than the unverified '3x' figure from secondary blogs. https://metr.org/blog/2026-02-24-uplift-update/
- AI Digest's forecaster pool was self-selected and AI-optimistic: half expect HLMI by 2030. Revenue had the worst calibration (57.7% of 80% CIs contained the true value), which strengthens the underestimation-on-revenue point. https://theaidigest.org/2025-forecast-results

## Findings

- **Forecasters in the 2022 Existential Risk Persuasion Tournament (XPT) gave low probabilities to the benchmark outcomes that actually occurred**  
  Average probability assigned to observed outcomes on MATH, MMLU, QuALITY and IMO Gold: superforecasters 9.7%, domain experts 24.6% (2026-09-22 (forecasts made mid-2022)). Confidence: high, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (Forecasting Research Institute)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  FRI itself notes that its method is biased toward finding underestimation, because overestimates can only be confirmed after resolution dates pass.
- **IMO gold-level performance arrived years ahead of the median forecasts**  
  Experts' median forecast: 2030. Superforecasters': 2035. Achieved July 2025. Implied probability of the actual outcome: 8.6% (experts), 2.3% (superforecasters) (2026-09-22). Confidence: high, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (FRI)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  XPT forecasts were made in 2022.
- **LEAP panel forecasts on frontier coding and math benchmarks were too low**  
  FrontierMath Tiers 1-3, end of 2025: experts forecast 31%, superforecasters 30%, actual 40.7%. LiveCodeBench Pro (Hard), end of 2026: experts 14%, superforecasters 12%, actual state of the art 53.8% by May 2026 (2026-09-22). Confidence: high, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (FRI)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  The FrontierMath score is unadjusted; FRI notes that Epoch later found errors in about 42% of problems. Forecasts for open-weight models were close (20% forecast vs 22.7% actual).
- **The LEAP forecast for the METR time horizon is not yet clearly beaten**  
  METR 80%-success time horizon, end of 2026: experts forecast 3.4 h, superforecasters 3.5 h. Claude Mythos Preview reached about 3.1 h by May 8, 2026 (2026-09-22). Confidence: medium, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (FRI)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  Still on track and unresolved, not a clear miss. Useful as a check against claims that every forecast is blown past.
- **Revenue and adoption forecasts were far too low**  
  Revenue of AI-focused companies (ARR), end of 2026: experts forecast $20B, superforecasters $25B; current value cited about $100B. Anthropic + OpenAI combined run rate: experts forecast $70B; about $140B cited. US work hours assisted by generative AI in 2025: experts forecast 4%; actual 5.7% (2026-09-22). Confidence: medium, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (FRI)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  The 'current' revenue values are run rates reported by companies and relayed by FRI, i.e. vendor-reported.
- **In AI Digest's 2025 forecasting survey, forecasters were roughly right on most benchmarks but low on revenue, and high on SWE-Bench**  
  421 forecasters. SWE-Bench Verified: forecast 88%, actual 80.9% (too high). Cybench: forecast 62%, actual 82%. OSWorld: forecast 60%, actual 66.3%. FrontierMath: forecast 40%, actual 40.7%. Frontier-lab annualized revenue: forecast $16B, actual $30.4B (2026-01-16). Confidence: high, source type: primary  
  [How well did forecasters predict 2025 AI progress? (AI Digest / Epoch AI, Anson Ho)](https://theaidigest.org/2025-forecast-results)  
  Mixed picture: not uniformly too conservative. Forecasters also overestimated public concern about AI as the 'most important problem' (forecast 2%, actual 0.625%).
- **Expert forecasts for AI biorisk uplift were too high**  
  Predicted share of STEM undergrads completing 3 biorisk tasks with LLM help: biosecurity experts 22.5%, virologists 40%, superforecasters 16.2%. Actual: 5.2% (2026-09-22 (RCT mid-2025)). Confidence: high, source type: primary  
  [How Accurate Have AI Progress Forecasts Been So Far? (FRI)](https://forecastingresearch.org/research/ai-progress-accuracy-update)  
  Counterevidence: a case where experts overestimated what AI enables in the real world.
- **METR's 2025 randomized trial found AI slowed experienced developers while they believed it sped them up**  
  16 developers, 246 tasks. Tasks took 19% longer with AI allowed (95% CI +2% to +39%). Developers forecast a 24% speedup beforehand and still believed in a 20% speedup afterward (2025-07-10). Confidence: high, source type: primary  
  [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (METR)](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)  
  Tools were mainly Cursor Pro with Claude 3.5/3.7 Sonnet. METR now marks the page as out of date. The CI is from METR's Feb 2026 post.
- **METR's late-2025 follow-up points toward speedup, but METR says it is unreliable**  
  57 developers (10 returning, 47 new), 143 repositories, 800+ tasks, pay $50/h (was $150/h). Time change with AI: returning developers -18% (CI -38% to +9%); new developers -4% (CI -15% to +9%). 30-50% of developers withheld tasks they did not want to do without AI (2026-02-24). Confidence: high, source type: primary  
  [We are Changing our Developer Productivity Experiment Design (METR)](https://metr.org/blog/2026-02-24-uplift-update/)  
  METR says the new data 'gives us an unreliable signal' and is 'only very weak evidence' for the size of the increase. Selection bias likely pushes the speedup estimate down. A METR self-report survey with a 3x median speedup appears only in secondary blogs; not verified.
- **Danish administrative data show no detectable earnings or hours effects from AI chatbots**  
  Null effects on earnings and recorded hours. CIs rule out effects larger than 2% two years after adoption. Average time savings about 3%. About 25,000 workers, 7,000 workplaces, 11 occupations (2025-05 (NBER WP 33777)). Confidence: high, source type: preprint  
  [Large Language Models, Small Labor Market Effects (Humlum & Vestergaard)](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf)  
  Data cover 2023-24, so models are older. Some secondary sources misstate the bound as 1%.
- **AI agents can complete only a minority of real paid freelance projects at human-acceptable quality**  
  Automation rate (share of projects where the AI deliverable is judged at least as good as the human one): best agent 2.5% at launch (Oct 2025). Current leaderboard top: Opus 5.5 at 21.25%, GPT 6 Astra 20.83%, Fable 5.1 17.92% (2025-10 launch; leaderboard read 2026-11-07). Confidence: medium, source type: official_leaderboard  
  [Remote Labor Index (Scale AI / Center for AI Safety) leaderboard](https://labs.scale.com/leaderboard/rli)  
  The leaderboard shows no CI and no update date. The paper is arXiv 2510.26787. Cuts both ways: rapid relative growth (about 8x in a year) but about 79% of projects still fail.
- **Insiders at an AI lab expect far more capability than the US public**  
  Nobel-level discovery feasible by 2030: 91% of Anthropic staff vs 39% of US adults. 'AI never able to do task': at most 2% of staff vs 19-40% of adults. Share of own work AI can do by 2030: staff average 75% vs US workers 28%. Model-implied 2030 GDP growth (median): public 5.4%, staff 17.1% (2026-10-16). Confidence: medium, source type: vendor_reported  
  [The AI expectations gap (Anthropic)](https://www.anthropic.com/research/ai-expectations-gap)  
  Public sample: Morning Consult opt-in panel, N=10,980, Aug 11-23 2026, weighted. Staff poll: N=1,334, internal, unweighted. The lab has an interest in the result; staff may be biased upward. A re-field of 7,613 adults gave 44% on the Nobel question.
- **Most Americans think AI performs worse than people at common tasks, though the gap is narrowing**  
  AI rated worse than people on every task asked in both 2023 and 2026. 'Worse' share down 7 pts (driving), 6 (financial advice), 5 (medical advice). 'AI better' for homework rose from 26% to 29%. 'More harm than good': 39% (2026) vs 31% (2025). 'More good than harm': 9% (2026-07-28 (fielded May 4-11, 2026)). Confidence: high, source type: primary  
  [Americans Cool Toward AI (Bentley University-Gallup)](https://news.gallup.com/poll/712751/americans-cool-toward.aspx)  
  N=3,270, probability-based Gallup Panel, MOE ±2.4. The article does not list the full per-task percentages.
- **Americans are split or skeptical on whether AI currently thinks better than people**  
  Economist/YouGov, May 29-Jun 1, 2026: AI reasoning worse than humans 43%, same 21%, better 17%. YouGov, Jul 16-20, 2026 (N=1,110): AI thinks better than the average person 33%, worse 29%, same 25%. Facts: 44% better / 18% worse. Complex reasoning: 33% / 28%. Creativity: 25% / 37% (2026-06 and 2026-08-01). Confidence: medium, source type: primary  
  [YouGov: Economist/YouGov poll; 'Do Americans think AI is smarter than Donald Trump?'](https://yougov.com/en-us/articles/55289-do-americans-think-ai-is-smarter-than-donald-trump)  
  The two polls use different wording, so they are not directly comparable. Economist poll URL: https://yougov.com/en-us/articles/54888-more-expect-artificial-intelligence-ai-affect-economy-negatively-than-positively-americans-split-how-ai-will-impact-their-lives-may-29-june-1-2026-economist-yougov-poll
- **Most AI users in nine countries rely on free tiers, and free users rarely use agents**  
  10% pay for AI themselves, 9% via work or school, 18% with any paid access. Agent used for a real task in the last week: 39% of paid vs 11% of free-only users (daily users: 50% vs 21%). Weekly generative-AI use (six countries): 51% in 2026 vs 34% in 2025. Daily: 28% vs 16% (2025) and 7% (2024). Weekly use by tool: ChatGPT 34%, Gemini 24%, Copilot 11%, Claude 7% (2026-10-29 (fieldwork Aug 14-Sep 28, 2026)). Confidence: high, source type: primary  
  [Generative AI and News Report 2026 (Reuters Institute, Oxford; YouGov fieldwork)](https://reutersinstitute.politics.ox.ac.uk/generative-ai-and-news-report-2026-standalone-tools-information-infrastructure)  
  About 2,000 per country, non-probability online sample. 10+9 does not equal 18 because of overlap. The report states that most users rely on free versions that are likely not the latest models. Literacy questions on AI's limitations were answered correctly only 60% of the time.
- **The paying share of ChatGPT users is small**  
  900M weekly active users and 50M paying subscribers (about 5.6%) (2026-02-27). Confidence: high, source type: vendor_reported  
  [ChatGPT reaches 900M weekly active users (TechCrunch, reporting an OpenAI blog post)](https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users)  
  Later 1B (Aug 2026) and 1.2B (DevDay, Sep 29 2026) figures come mostly via secondary sources. The 1.2B may cover all OpenAI products. No updated subscriber count found.
- **US public concern about AI is at or near record highs and rising among young adults**  
  More concerned than excited: 52% (2026), 50% (2025), 51% (2024), 52% (2023), 37% (2021). More excited: 9%. Ages 18-29 more concerned: 55% (2026) vs 39% (2024). Expect fewer jobs in the next 20 years: 71% (2026) vs 64% (2024) (2026-08-18 (fielded June 22-28, 2026)). Confidence: high, source type: primary  
  [Young adults in the U.S. are increasingly wary of AI (Pew Research Center)](https://www.pewresearch.org/short-reads/2026/08/18/young-adults-in-the-us-are-increasingly-wary-of-ai-concerned-it-will-take-jobs/)  
  N=3,488, American Trends Panel (probability-based).
- **AI experts and the US public diverge sharply on AI's impact**  
  Positive impact on the US over the next 20 years: experts 56% vs public 17%. More concerned than excited: public 51% vs experts 15%. Jobs positive: experts 73% vs public 23%. Economy: 69% vs 21%. Medical care: 84% vs 44% (2025-04-03 (public survey Aug 12-18, 2024, N=5,410; experts Aug 14-Oct 31, 2024, N=1,013)). Confidence: high, source type: primary  
  [How the U.S. Public and AI Experts View Artificial Intelligence (Pew); also cited in the 2026 AI Index public opinion chapter](https://www.pewresearch.org/internet/2025/04/03/how-the-us-public-and-ai-experts-view-artificial-intelligence/)  
  Expert responses are unweighted. The data are from 2024 and are being recycled into 2026 reports, including the AI Index.
- **Global attitudes: slight rise in perceived benefits alongside rising nervousness**  
  Share saying AI products offer more benefits than drawbacks: 55% (2024) to 59% (2025). 'Nervous': 52%. US trust in its own government to regulate AI: 31% (lowest), global average 54%. 58% of employees worldwide use AI at work semiregularly or regularly (2026-04-13). Confidence: medium, source type: primary  
  [AI Index 2026, Chapter 9: Public Opinion (Stanford HAI)](https://hai.stanford.edu/ai-index/2026-ai-index-report/public-opinion)  
  The chapter page doesn't name Ipsos; secondary coverage attributes the global numbers to Ipsos. Singapore's figure is inconsistent within the source (81% in text vs 91% in chart).
- **Most Americans use AI-enabled products without recognizing them as AI**  
  Nearly all use AI-enabled products (maps, streaming, weather, assistants), but about two-thirds don't realize it. N≈4,000 US adults (2025-01). Confidence: medium, source type: primary  
  [Americans Use AI in Everyday Products Without Realizing It (Gallup-Telescope)](https://news.gallup.com/poll/654905/americans-everyday-products-without-realizing.aspx)  
  Figures taken from the search summary and Axios coverage; the Gallup page was not fetched directly.
- **Expert timelines for human-level AI shortened sharply between survey rounds**  
  AI Impacts 2023 survey (2,778 authors): 50% chance of HLMI by 2047, vs 2060 in the 2022 survey. Full automation of labor: 2116 (vs 2164) (2024-01 (arXiv 2401.02843)). Confidence: high, source type: preprint  
  [Thousands of AI Authors on the Future of AI (Grace et al., AI Impacts)](https://arxiv.org/abs/2401.02843)  
  No 2025 or 2026 edition found. The 69-year gap between the HLMI and full-automation framings is itself evidence that the AGI framing is ill-defined, which supports belief 3. Response rate about 15%.
- **ChatGPT use is mostly non-work**  
  About 700M weekly users and about 18B messages per week by July 2025. Non-work share of messages rose from 53% to more than 70% (2025-09 (NBER WP 34255)). Confidence: medium, source type: preprint  
  [How People Use ChatGPT (Chatterji et al., OpenAI/NBER)](https://www.nber.org/papers/w34255)  
  Co-authored by OpenAI staff. Figures from the abstract and secondary coverage.
- **AI-washing has become a regulatory enforcement category**  
  SEC: Delphia ($225k penalty) and Global Predictions ($175k), Mar 2024. Presto Automation, Jan 2025 (first public company). SEC and DOJ charged Nate Inc. founder Albert Saniger in Apr 2025 for falsely claiming AI processed transactions. FTC: Operation AI Comply (Sep 2024); Air AI settlement Mar 2026 ($50k) (2024-2026). Confidence: medium, source type: secondary_aggregator  
  [Global Investigations Review 2026; DLA Piper (Feb 2026)](https://globalinvestigationsreview.com/review/the-investigations-review-of-the-americas/2026/article/us-enforcement-agencies-intensify-scrutiny-of-ai-washing)  
  Sources conflict on FTC case counts since 2025. The FTC rescinded the Rytr order in Dec 2025. Verify against SEC press releases before citing.
- **Open-weight models trail the closed frontier by a few months**  
  About 4 months on average since Jan 2026 on the Epoch Capabilities Index (about 8 ECI points); an earlier estimate was 3 months (2026). Confidence: medium, source type: primary  
  [Open models lag state-of-the-art closed models by 4 months (Epoch AI)](https://epoch.ai/data-insights/open-closed-eci-gap)  
  Not a free-tier vs paid-tier comparison; no direct Epoch analysis of the free-tier gap was found.

## Counter-evidence

- METR's 2025 RCT: experienced developers were 19% slower with AI (95% CI +2% to +39%) while believing they were 20% faster. Self-assessed AI value can be badly wrong in the optimistic direction.
- METR's 2026 follow-up is inconclusive (CIs cross zero), and METR explicitly calls it an unreliable signal. There is still no clean measured speedup from METR.
- The Danish administrative data (Humlum & Vestergaard 2025) rule out earnings or hours effects larger than 2%, with about 3% average time savings.
- Remote Labor Index: even the best agent today is judged at least as good as a human on only about 21% of real freelance projects (2.5% at launch in Oct 2025).
- Forecasters overestimated SWE-Bench Verified for 2025 (88% forecast vs 80.9% actual), LLM bio-uplift (16-40% forecast vs 5.2% actual), and US robotaxi share for 2027 (expert forecast 7.3% vs trend about 2.5%).
- The LEAP METR time-horizon forecast for end-2026 (3.4 h at 80% success) is not yet beaten as of May 2026 (about 3.1 h), so not every forecast is being blown past.
- Hinton's 2016 prediction that radiologists would be obsolete within 5 years failed; radiologist demand and pay rose (Mayo radiology staff reportedly up about 55%; average pay about $571k per Fortune).
- FRI notes its own accuracy review is structurally biased toward detecting underestimation.
- Measured public skepticism isn't only ignorance. Gallup and SCSP find that more knowledge and use of AI are not associated with more positive sentiment.
- Reuters Institute: only 21% of users say they use AI because its information is more reliable than other sources. Pew: about half of those who get news from chatbots see inaccurate news.
- Some FrontierMath results are muddied by benchmark errors (Epoch found errors in about 42% of problems, per FRI), which complicates 'faster than predicted' claims.
- AI-washing enforcement cases show real overclaiming in the market, including a startup (Nate) allegedly using humans behind claimed AI.

## Surprises

- Superforecasters in 2022 gave the benchmark outcomes that actually happened by 2025 an average probability of just 9.7%, and they put IMO gold around 2035. It happened in July 2025.
- Developers in METR's 2025 trial were measured 19% slower with AI but believed they were 20% faster.
- In METR's 2026 follow-up, 30-50% of developers refused to submit some tasks because they didn't want to do them without AI, and that wrecked the experiment.
- Only about 1 in 18 weekly ChatGPT users paid as of Feb 2026 (50M of 900M). Across nine countries, only 18% of people have any paid AI access, so most people judge AI from free models.
- Paid users were about 3.5x as likely as free-only users to have used an AI agent for a real task in the past week (39% vs 11%).
- 91% of Anthropic staff, but only 39% of US adults, expect AI capable of Nobel-level discovery by 2030. 19-40% of the public say AI will never be able to do a given professional task.
- Young Americans have flipped. 55% of 18-29s are now more concerned than excited about AI (Pew 2026), up from 31% in 2021, and 47% say AI does more harm than good (Gallup 2026).
- AI experts in the 2023 AI Impacts survey put HLMI at 2047 but full automation of labor at 2116, a 69-year gap that comes purely from how the question is worded.
- Forecasters underestimated frontier-lab revenue by about 2x in 2025 (forecast $16B vs actual $30.4B), and end-2026 ARR forecasts ($20-25B) are about 4-5x below current reported values.
- About two-thirds of Americans use AI-enabled products without realizing they are AI (Gallup, Jan 2025).

## Chart ideas

- Forecast vs actual dumbbell chart: LEAP/XPT/AI Digest forecasts vs outcomes for FrontierMath (31% vs 40.7%), LiveCodeBench Pro Hard (14% vs 53.8%), Cybench (62% vs 82%), SWE-Bench Verified (88% vs 80.9%, an overestimate), bio-uplift (22.5% vs 5.2%, an overestimate), lab revenue ($16B vs $30.4B). Data: FRI accuracy update and AI Digest 2025 results.
- Timeline: years predicted vs actual for IMO gold (experts 2030, superforecasters 2035, actual 2025) and VCT virologist-level (experts 2030, superforecasters 2034, actual 2025). Data: FRI.
- Pew 'more concerned than excited' line, 2021-2026, overall and for ages 18-29 (37/38/52/51/50/52 overall; 31/29/42/39/47/55 for 18-29). Data: Pew Aug 18, 2026 short read.
- METR perception vs reality bar chart: forecast +24% speed, perceived +20%, measured -19% (slower). Add the 2026 follow-up estimates with wide CIs. Data: METR July 2025 and Feb 2026 posts.
- Paid vs free stacked bar: 18% paid access vs about 82% none (Reuters 2026), with agent use 39% vs 11% for paid vs free-only users. Data: Reuters Institute 2026.
- Insider vs public expectation bars: Nobel-level discovery by 2030 (91% vs 39%); share of own work AI can do by 2030 (75% vs 28%). Data: Anthropic AI expectations gap (label clearly as vendor research).
- Expert vs public optimism (Pew 2024 data): jobs 73 vs 23, economy 69 vs 21, medical care 84 vs 44, US overall 56 vs 17. Data: Pew Apr 2025 / AI Index 2026 ch.9.
- Remote Labor Index automation rate over time: 2.5% (Oct 2025) to about 21% (Nov 2026). Data: Scale RLI leaderboard (no CIs).
- Reuters six-country weekly generative-AI use, 2024-2026 (18%, 34%, 51%) and daily use (7%, 16%, 28%). Data: Reuters Institute 2025/2026 reports.

## Open questions

- No 2025 or 2026 edition of the AI Impacts researcher survey was found; latest is the 2023 survey (published Jan 2024).
- No primary data directly comparing capability perceptions of free vs paid users. The Reuters 2026 report breaks out agent use by paid status but not, as far as read, perception or limitation scores.
- METR's 2026 developer self-report survey (reported median 3x speedup, 349 workers) was only seen in secondary blogs; not verified on METR's site.
- The exact ChatGPT WAU after Feb 2026 is uncertain (1B in Aug 2026; 1.2B at DevDay possibly all OpenAI products). No updated paid-subscriber count found.
- The Bentley-Gallup article did not list per-task 2023 vs 2026 percentages; the full Gallup report would be needed.
- The Metaculus AGI community forecast's current value conflicts across secondary trackers (Jan 2033 vs Sep 2030); check Metaculus question 5121 directly.
- The Pew Apr 2025 'jobs 73% vs 23%' expert-public figure is confirmed via the AI Index 2026 chapter page but was not checked on Pew's own page.
- The MIT NANDA '95% of genAI pilots see no return' claim (Aug 2025) has disputed methodology and inconsistent sample sizes; the primary report wasn't accessed. Treat it with caution or omit.
- FTC AI-washing case counts since 2025 conflict between sources.
- The OpenAI Navier-Stokes Millennium Prize claim is described by FRI as not fully confirmed.
- No 2025-2026 Ipsos AI Monitor primary page was fetched; the global benefits/nervous figures come from the AI Index chapter, which doesn't name its source on that page.
