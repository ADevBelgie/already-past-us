# Is "AGI" a useful yardstick?

Research round r1, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

The evidence supports the author's belief (3), that "AGI = human-level" is a weak yardstick, but the reason is more specific than "it doesn't matter." The term has no stable definition. The major definitions measure different things: OpenAI's charter uses economic output, DeepMind's Levels of AGI uses percentiles of skilled humans, Hendrycks et al. use psychometric cognitive breadth, and ARC uses learning efficiency. Legally, the word has also lost its meaning. The October 2025 Microsoft–OpenAI deal made an independent expert panel responsible for verifying any AGI declaration. The April 27, 2026 amendment then made OpenAI's revenue-share payments "independent of OpenAI's technology progress" through 2030, which Simon Willison and The Verge read as killing the AGI clause. Insiders' statements are inconsistent too. Altman called AGI "not a super useful term" in August 2025, then told TIME in August 2026 that OpenAI would have an internal system he would call AGI by year-end. Brockman said in September 2026 at the GPT-6 Astra launch that it is "not unreasonable" to feel the AGI era has begun. Karpathy (October 2025) said AGI is "a decade away," and Amodei avoids the term as carrying "sci-fi baggage and hype."

The 'jagged' pattern runs through all the data. Hendrycks et al. score GPT-5 at 57%: 10/10 in reading-writing and math, but 0 in long-term memory storage. GPT-6 Astra beat the human action-efficiency baseline on 96% of ARC-AGI-3 levels under a special harness, yet scores 62.7% under ARC's standard harness. Astra also does worse than its predecessor on Artificial Analysis's GDPval-AA work tasks. The better yardsticks are continuous and task-anchored. On METR time horizons, the top 50% horizon is an early Claude Mythos Preview at about 17.4 hours, with a 95% CI of 8.5–55 hours, and METR warns that anything above 16 hours is unreliable on its current suite. GDPval wins-or-ties versus experts went from 47.6% for Claude Opus 4.1 in September 2025 to about 85% for GPT-5.5 per OpenAI (vendor-reported). The Remote Labor Index top automation rate went from 2.5% to 21.25% for Opus 5.5. Epoch's ECI is about 166 for Astra as of September 2026. Economic measures such as Anthropic's observed exposure show a large gap between capability and use: in Computer & Math, about 94% of tasks are theoretically feasible but only about 33% are actually covered. They also show no detectable rise in unemployment so far.

For beliefs (1) and (2), the counterevidence is that the strongest "real work" measures still show AI fully automating only about one in five paid freelance projects. Several benchmarks are saturating, so they can no longer measure the frontier. Many headline numbers are vendor-reported or depend on the harness used. One caveat for the piece: nearly every alternative yardstick (GDPval, RLI, METR, ARC) still uses human performance as its reference point. The better framing is "human-relative, task by task," not "no humans in the yardstick."

## Fact-check

The findings hold up well against primary sources. I fetched and confirmed these exactly: the Microsoft blog posts from October 2025 and April 2026, Willison's post, the Levels of AGI table and version history, Hendrycks Table 1, the ARC Prize Astra post and leaderboard, the TIME article, the CNBC article, the Karpathy transcript, the Amodei essay, METR's v1.1 YAML and page, and the METR limitations note. I found nothing that looks fabricated. Corrections needed: (1) the BCG 7% is of individual-contributor-level consultants, and I could not verify the about 84% baseline or the Organization Science DOI; (2) the 96% ARC action-efficiency figure is the Provider Adapter at MAX effort, while 99.9% is at HIGH; (3) METR's doubling-time fit excludes the Mythos point (p50 above 16h); (4) Altman's CNBC remark aired before the Aug 11, 2025 article date. Still unverified, and to be held back or attributed carefully: the Brockman 'AGI era' quote (primary source not reachable), the CNBC 20% rate, the Feb 2026 joint statement, the ARC-AGI-3 launch-week scores and Chollet's figures. The bigger gap is the economic figures in the summary (GDPval 85%, RLI 21.25%, ECI 166, GDPval-AA, Anthropic exposure 94%/33%), which were never submitted for checking. Several are vendor-reported and must be sourced or labeled before publishing. The leaderboard also shows newer models (GPT-6.1 Sol, Gemini 4 Argon) that the briefing ignores.

- **confirmed**: OpenAI's charter defines AGI by economic output  
  → "highly autonomous systems that outperform humans at most economically valuable work"; Charter dated April 9, 2018  
  Source: https://openai.com/charter/  
  openai.com returned 403 to my fetch. The wording and date are the long-standing, widely reproduced charter text, and Willison's history post also traces OpenAI's AGI language. The definition is not quantified anywhere. Low risk.
- **confirmed**: The October 2025 Microsoft–OpenAI deal moved AGI verification to an independent expert panel  
  → The declaration "will now be verified by an independent expert panel". Model/product IP runs through 2032 and includes post-AGI models, with safety guardrails. Research IP lasts until the panel verifies AGI "or through 2030, whichever is first". The revenue share continues "until the expert panel verifies AGI", with payments spread over a longer period.  
  Source: https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/  
  Fetched the primary post and the wording matches. The framing that 'the board could make the call alone' before this is interpretation, not quoted from the post; attribute it or soften it. The post adds that payments are spread over a longer period, which the researcher omitted.
- **confirmed**: The April 27, 2026 amendment made OpenAI's payments to Microsoft independent of AGI; commentators read this as the end of the AGI clause  
  → License to OpenAI IP for models and products through 2032, now non-exclusive. Microsoft no longer pays OpenAI a revenue share. OpenAI's payments continue through 2030 "independent of OpenAI's technology progress", at the same percentage, subject to a total cap (amount not disclosed). The post does not mention AGI or the panel.  
  Source: https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/  
  Primary post fetched. Willison's post 'Tracking the history of the now-deceased OpenAI Microsoft AGI clause' (Apr 27, 2026) confirms the 'dead' reading and cites The Verge. Not verified: the CNBC 20% rate (anonymous source), the February 27, 2026 joint statement, and The Verge piece itself. Present the 20% figure as unconfirmed.
- **confirmed**: 2024 reporting tied the contractual AGI trigger to about $100B in profit  
  → About $100B in profits, reported by The Information and summarized by TechCrunch on 2024-12-26  
  Source: https://techcrunch.com/2024/12/26/microsoft-and-openai-have-a-financial-definition-of-agi-report/  
  Second-hand reporting of a private contract that neither company ever confirmed, as the researcher says. It should be labeled 'reported'.
- **confirmed**: DeepMind's Levels of AGI: performance x generality matrix; narrow superhuman AI exists; general AI is at 'Emerging'  
  → L1 Emerging = equal to or somewhat better than an unskilled human. L2 Competent = at least 50th percentile of skilled adults. L3 Expert = at least 90th. L4 Exceptional (formerly Virtuoso) = at least 99th. L5 Superhuman = outperforms 100% of humans. Narrow L5: AlphaFold, AlphaZero, Stockfish. General L1: ChatGPT, Bard, Llama 2, Gemini. v1 2023-11-04; v5 2025-09-24; ICML 2024.  
  Source: https://arxiv.org/html/2311.02462v5  
  Checked against the v5 HTML table and the arXiv version history. Thresholds and examples match. The 'Emerging' placement is the authors' assessment at the time of writing (2023, restated in v5), not a measurement.
- **confirmed**: Hendrycks et al. AGI score: GPT-4 27%, GPT-5 57%, with the stated per-domain profile  
  → GPT-4: K8 RW6 M4 R0 WM2 MS0 MR4 V0 A0 S3 = 27%. GPT-5: K9 RW10 M10 R7 WM4 MS0 MR4 V4 A6 S3 = 57%. GPT-5 was tested in 'Auto' mode. Definition: "AGI is an AI that can match or exceed the cognitive versatility and proficiency of a well-educated adult."  
  Source: https://arxiv.org/html/2510.18212v3  
  Table 1 re-fetched from the v3 HTML and all values match. This is a preprint (not peer reviewed), and the scores are the authors' own assessment against their own battery. I did not check the claim that agiranker.com shows 2026 scores around 80; leave it out.
- **confirmed**: ARC-AGI-3: GPT-6 Astra scored 62.7% (Standard) and 99.9% (Provider Adapter); ARC Prize declined to call it AGI  
  → Standard harness, max effort: 62.7% at $26,098 (17.5% at low effort). Provider Adapter, high effort: 99.9% at $18,817 (max effort: 98.6% at $17,332). Fewer actions than the human baseline on 96.0% of levels, 51.7% fewer on average, under the Provider Adapter at max effort. Humans were paid $115 per 90-minute session plus $5 per completed game, about $12.78 per attempted game. Quote: "we are not claiming that it is AGI". Post by Greg Kamradt, 2026-09-03.  
  Source: https://arcprize.org/blog/astra  
  Primary post fetched. Specify that the 96% action-efficiency figure is the Provider Adapter at MAX effort, while the 99.9% score is at HIGH effort. The leaderboard confirms ARC-AGI-2 at 95.0% and ARC-AGI-1 at 98.5%, but 98.5% is a six-way tie, so ARC-AGI-1 is fully saturated. Not verified: the launch-week scores (Gemini 3.1 Pro 0.37%, GPT-5.4 0.26%, Opus 4.6 0.25%), Chollet's '66%' tweet, the '2x faster' remark and 'ARC-AGI-4 in Q1 2027'. All are secondary; don't publish them without a primary source. ARC's own costs for Astra are listed as $26.1K across all three benchmarks, so cost-per-benchmark comparisons from the leaderboard are unreliable.
- **confirmed**: Altman: 'not a super useful term' (Aug 2025), then predicted an internal AGI system by year-end (TIME, Aug 26, 2026)  
  → CNBC Squawk Box: "I think it's not a super useful term". The interview aired the week before CNBC's article dated 2025-08-11. TIME, 'Inside OpenAI's Reboot' (Alex Heath, 2026-08-26): "not quite yet" at AGI, and an internal system he would call AGI by year-end (TIME's paraphrase). Mark Chen: "80% of the way".  
  Source: https://time.com/article/2026/08/26/openai-sam-altman-interview/  
  Both sources fetched. Minor date fix: the interview aired around the GPT-5 launch in early August 2025, and 2025-08-11 is the article date. The year-end prediction must be presented as TIME's paraphrase, not as a direct quote. Agree on dropping the Lex Fridman quote.
- **unsupported**: Brockman at the GPT-6 Astra launch: "not unreasonable to feel that we are now in the AGI era"  
  → Not independently verified  
  Source: https://www.fastcompany.com/91607269/openai-says-the-agi-era-has-begun-ai-researchers-arent-so-sure  
  Fast Company returned 403 to my fetch, the OpenAI primary page also returned 403 for the researcher, and my search budget ran out before I could find another source. The exact quote and the 'mission concept, not contractual trigger' framing come only from secondary sources. Do not quote verbatim until it is checked against the OpenAI launch post or a video/transcript.
- **confirmed**: Karpathy: economic definition of AGI; 'a decade away'  
  → "AGI was a system you could go to that can do any economically valuable task at human performance or better"; "this is more accurately described as the decade of agents"; "they just don't work"; chapter 'AGI will blend into 2% GDP growth'. Dwarkesh Podcast, 2025-10-17.  
  Source: https://www.dwarkesh.com/p/andrej-karpathy  
  All quotes are in the transcript. 'A decade away' is the episode title's phrasing; he frames it as the decade of agents.
- **confirmed**: Amodei avoids 'AGI' because of its 'sci-fi baggage and hype'  
  → Footnote: AGI is "an imprecise term" that has "gathered a lot of sci-fi baggage and hype". Powerful AI is "smarter than a Nobel Prize winner across most relevant fields". Also uses "country of geniuses in a datacenter". Essay dated October 2024.  
  Source: https://www.darioamodei.com/essay/machines-of-loving-grace  
  Confirmed in the 2024 essay. The claim that the 2026 'Adolescence of Technology' essay repeats this was not checked by the researcher or by me.
- **corrected**: BCG 'jagged frontier' experiment numbers  
  → 758 consultants, about 7% of BCG's individual-contributor-level consultants (not of all its consultants). 12.2% more tasks completed, 25.1% faster, more than 40% higher quality. On the outside-frontier task, AI users were 19 percentage points less likely to produce correct solutions.  
  Source: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321  
  SSRN, HBS and INFORMS all returned 403 to me. The figures match the well-known abstract, but the abstract says the 7% is of individual-contributor-level consultants. I could not confirm the about 84% no-AI baseline (it comes from the paper body) or the Organization Science DOI 10.1287/orsc.2025.21838. Cite it as the HBS working paper 24-013 unless the journal version is confirmed.
- **confirmed**: METR 50% time horizon: Mythos Preview (early) at about 17.4h with a 95% CI of 8.5–55h, plus the other model values and doubling times  
  → Mythos Preview (early, released 2026-04-07): p50 1044.78 min (508.88–3304.26), p80 185.91 min. Opus 4.6: 718.81 min (316.69–3633.79). Gemini 3.1 Pro: 384.15. GPT-5.4: 341.74. GPT-5: 203.01. GPT-4: 3.99. Doubling time since 2023: 128.74 days (CI 104.43–158.01); all-time, stitched: 187.78 days.  
  Source: https://metr.org/assets/benchmark_results_1_1.yaml  
  YAML fetched and the values match exactly. The page confirms "Measurements above 16 hrs are unreliable with our current task suite", that it is "no longer actively updated" (last updated 2026-09-08), and that Mythos was added 2026-05-08. The YAML notes that the doubling-time fit EXCLUDES points with p50 above 16 h, so Mythos is not in the trend estimate; say so. I could not verify '5 of 228 tasks at 16h or more' or the system card's 34.4h figure. The page FAQ's GPT-5 'around 2 hours and 17 minutes' does differ from the v1.1 value of 203 min, so the warning about mixing suite versions is right.
- **confirmed**: METR's January 2026 note: time horizons are not delegation thresholds and do not generalize across domains  
  → Error bars historically about 2x in each direction, wider for newer models (Opus 4.5: about 4h49m, CI 1h49m–20h25m). Visual computer-use horizons are 40–100x lower than math/software. A 50% horizon is not a delegation threshold, and some tasks need 98% or higher reliability. Doubling the horizon does not double automation.  
  Source: https://metr.org/notes/2026-01-22-time-horizon-limitations/  
  Primary note fetched (Thomas Kwa, 2026-01-22). One precision fix: the note says visual computer use is 40–100x lower than math AND software/research tasks, which have similar horizons to each other.

### Missed evidence

- The ARC Prize leaderboard (https://arcprize.org/leaderboard) shows models newer than Astra: GPT-6.1 Sol at 52.7% on ARC-AGI-3 Standard ($7.6K) and Gemini 4 Argon at 49.8% ($5.8K). Claude Opus 5.5 and Claude Fable 5 also hit 98.5% on ARC-AGI-1, a six-way tie. The briefing should note that Astra is not the only frontier reference point, that cheaper models are close behind, and that ARC-AGI-1 is fully saturated.
- METR's time-horizon page is frozen (no longer actively updated as of 2026-09-08, https://metr.org/time-horizons/). Its doubling-time fit excludes any point with p50 above 16 h (benchmark_results_1_1.yaml), so the headline trend no longer covers the frontier. The briefing should say METR's continuous yardstick has itself saturated, which supports the 'end of measurement' theme.
- Claims in the research summary that were never put in the findings list, so neither the researcher nor I verified them: GDPval at about 85% for GPT-5.5 (vendor), GDPval at 47.6% for Opus 4.1, Remote Labor Index rising from 2.5% to 21.25% for Opus 5.5, Epoch ECI of about 166 for Astra, Astra's regression on Artificial Analysis's GDPval-AA, and Anthropic's observed-exposure figures (94% feasible vs 33% covered, no rise in unemployment). They are load-bearing for the summary's conclusions and need primary sources (openai.com GDPval paper, scale.com/leaderboard/rli, epoch.ai ECI, artificialanalysis.ai, Anthropic Economic Index) before publication.
- I could not check the Feb 27, 2026 Microsoft–OpenAI joint statement ("definition remains the same") or the CNBC 20% revenue-share figure. Find the primary statement or drop it.
- My web search budget ran out after the first query, so all checks above rely on direct fetches of primary pages. The Brockman quote, the launch-week ARC-AGI-3 scores and the Chollet tweet still need a dedicated search.

## Findings

- **OpenAI's charter defines AGI by economic output, not by cognition.**  
  "highly autonomous systems that outperform humans at most economically valuable work" (Charter published 2018-04-09; still live 2026). Confidence: high, source type: primary  
  [OpenAI Charter](https://openai.com/charter/)  
  The charter's wording, confirmed via search snippets of openai.com/charter. 'Most economically valuable work' is never put into numbers.
- **The October 2025 Microsoft–OpenAI agreement moved AGI verification to an independent expert panel. Before that, OpenAI's board could make the call alone.**  
  "Once AGI is declared by OpenAI, that declaration will now be verified by an independent expert panel." Microsoft's model/product IP rights run through 2032 and include post-AGI models. Research IP rights last until the panel verifies AGI or through 2030, whichever comes first. The revenue share stays in place until the panel verifies AGI. (2025-10-28). Confidence: high, source type: primary  
  [The next chapter of the Microsoft–OpenAI partnership (Microsoft Official Blog)](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/)  
  Wording fetched directly from Microsoft's post. No public source names the panel's members, its selection process, or its criteria.
- **In April 2026 the companies amended the deal so OpenAI's payments to Microsoft no longer depend on AGI, which commentators read as the end of the AGI clause.**  
  Microsoft's license to OpenAI IP runs through 2032 and becomes non-exclusive. Microsoft stops paying OpenAI a revenue share. OpenAI's payments to Microsoft continue through 2030, "independent of OpenAI's technology progress," at the same percentage but subject to a total cap. CNBC cites an anonymous source for a 20% rate. (2026-04-27). Confidence: high, source type: primary  
  [The next phase of the Microsoft-OpenAI partnership (Microsoft blog); CNBC; Simon Willison](https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/)  
  Microsoft's April 2026 post does not mention AGI or the expert panel at all. Calling the clause "dead" is interpretation by Simon Willison (simonwillison.net/2026/Apr/27/now-deceased-agi-clause/) and The Verge. CNBC: Microsoft "no longer has to decide how it responds" if OpenAI says it has reached AGI. A February 27, 2026 joint statement had said the contractual AGI definition 'remains the same'. Whether the panel survives the amendment is unclear.
- **In 2024, reporting said the contractual AGI trigger was tied to profit, not capability.**  
  AGI threshold reportedly about $100B in profits for OpenAI's earliest investors (2024-12-26). Confidence: medium, source type: reputable_press  
  [TechCrunch, summarizing The Information](https://techcrunch.com/2024/12/26/microsoft-and-openai-have-a-financial-definition-of-agi-report/)  
  Second-hand report of a private contract. Never confirmed by either company.
- **DeepMind's 'Levels of AGI' rates systems on performance (percentiles of skilled adults) crossed with generality (narrow vs. general). Under it, narrow superhuman AI already exists and general AI was 'Emerging' as of 2023.**  
  Level 1 Emerging means equal to or somewhat better than an unskilled human. Level 2 Competent is at least the 50th percentile of skilled adults, Level 3 Expert at least the 90th, Level 4 Virtuoso/'Exceptional' at least the 99th, and Level 5 Superhuman beats 100% of humans. Narrow Level 5 examples: AlphaFold, AlphaZero, Stockfish. General Level 1 examples: ChatGPT, Bard, Llama 2, Gemini. (v1 2023-11-04; ICML 2024; v5 2025-09-24 renamed Level 4 'Exceptional'). Confidence: high, source type: peer_reviewed  
  [Morris et al., Levels of AGI for Operationalizing Progress on the Path to AGI (arXiv 2311.02462)](https://arxiv.org/abs/2311.02462)  
  Version history and rename checked on arXiv. The level thresholds and examples come from summaries of the paper's table; check the PDF table before quoting. Even this framework is human-relative, built on percentiles of skilled humans.
- **Hendrycks et al. score AGI as a percentage across ten equally weighted psychometric domains. GPT-4 scores 27% and GPT-5 scores 57%.**  
  GPT-4 = 27%, GPT-5 = 57%. GPT-5 per domain, out of 10 each: General Knowledge 9, Reading/Writing 10, Math 10, On-the-spot Reasoning 7, Working Memory 4, Long-term Memory Storage 0, Long-term Memory Retrieval 4, Visual 4, Auditory 6, Speed 3. GPT-4: K 8, RW 6, M 4, R 0, WM 2, MS 0, MR 4, V 0, A 0, S 3. GPT-5 was tested in 'Auto' mode. (arXiv v1 2025-10-21; v3 2025-12-03). Confidence: high, source type: preprint  
  [Hendrycks et al., A Definition of AGI (arXiv 2510.18212)](https://arxiv.org/html/2510.18212v3)  
  Table 1 fetched from the arXiv HTML. 33 authors. AGI is defined as matching 'the cognitive versatility and proficiency of a well-educated adult' (Cattell-Horn-Carroll theory). The authors themselves advise reporting the cognitive profile, not only the single number. The official sites (agidefinition.ai and agidefinition.safe.ai) list only GPT-4 and GPT-5, with no 2026 model scores. agiranker.com shows scores around 80 but is not affiliated.
- **ARC Prize defines AGI as human-level learning efficiency. GPT-6 Astra nearly solved ARC-AGI-3 with a provider-specific harness, but ARC Prize explicitly declined to call it AGI.**  
  ARC-AGI-3 Semi-Private: 62.7% with the Standard harness (max effort, about $26K total) and 99.9% with OpenAI's Provider Adapter harness (high effort, about $18.8K total). Astra used fewer actions than the human baseline on 96.0% of levels, 51.7% fewer per level on average. Humans were paid about $12.78 per attempted game. Frontier models at the March 25, 2026 launch scored under 1%: Gemini 3.1 Pro 0.37%, GPT-5.4 0.26%, Opus 4.6 0.25%. (2026-09-03 (launch-week numbers from 2026-03-25)). Confidence: high, source type: official_leaderboard  
  [ARC Prize blog: OpenAI's GPT-6 Astra on ARC-AGI-3 (Greg Kamradt)](https://arcprize.org/blog/astra)  
  The post says "we are not claiming that it is AGI." ARC's definition: "AGI is a system that can match the learning efficiency of humans" (arcprize.org/arc-agi). Chollet tweeted 66% on the standard harness, versus 62.7% in the table. He also said progress came about 2x faster than he expected, and that ARC-AGI-4 is due Q1 2027. Launch-week scores are from secondary coverage. The leaderboard also shows ARC-AGI-2 at 95.0% (Astra) and ARC-AGI-1 at 98.5%, so both are close to saturated.
- **Altman said in August 2025 that AGI is 'not a super useful term,' then in August 2026 predicted OpenAI would have an internal system he would call AGI by year-end.**  
  Aug 2025, CNBC Squawk Box: "I think it's not a super useful term." Aug 26, 2026, TIME: OpenAI is "not quite yet" at AGI, and by year-end will have an internal system he would call AGI (TIME's paraphrase). Mark Chen: OpenAI is "80% of the way" there. (2025-08-11 (CNBC); 2026-08-26 (TIME)). Confidence: high, source type: reputable_press  
  [TIME, 'Inside OpenAI's Reboot'; CNBC via secondary reproductions](https://time.com/article/2026/08/26/openai-sam-altman-interview/)  
  The TIME article was fetched and quotes checked. I did not fetch the original CNBC article; the quote is consistent across Fortune and other reproductions. A claimed March 2026 Lex Fridman quote, "I think we've achieved AGI," is unverified; don't use it.
- **At the GPT-6 Astra launch, OpenAI's president suggested the 'AGI era' had begun, while describing AGI as a mission concept rather than a contractual trigger.**  
  Brockman: "not unreasonable to feel that we are now in the AGI era" (2026-09-03). Confidence: medium, source type: reputable_press  
  [Secondary coverage (Betanews, Sify, Fast Company headline 'OpenAI says the AGI era has begun. AI researchers aren't so sure')](https://www.fastcompany.com/91607269/openai-says-the-agi-era-has-begun-ai-researchers-arent-so-sure)  
  The primary OpenAI page (openai.com/index/gpt-6-astra/) returned 403 and could not be checked. The exact quote and the 'mission concept' framing come only from secondary sources, so verify before quoting.
- **Karpathy's definition of AGI is economic, and he said AGI is about a decade away.**  
  "AGI was a system you could go to that can do any economically valuable task at human performance or better." Also: "this is more accurately described as the decade of agents" and "they just don't work." Chapter title: 'AGI will blend into 2% GDP growth.' (2025-10-17). Confidence: high, source type: primary  
  [Dwarkesh Podcast: Andrej Karpathy — AGI is still a decade away](https://www.dwarkesh.com/p/andrej-karpathy)  
  Quotes taken from the transcript.
- **Amodei avoids the term AGI and uses 'powerful AI' / 'a country of geniuses in a datacenter' instead.**  
  AGI is "an imprecise term that has gathered a lot of sci-fi baggage and hype" (footnote). Powerful AI is "smarter than a Nobel Prize winner across most relevant fields." (2024-10 (Machines of Loving Grace); reiterated in 'The Adolescence of Technology' (2026)). Confidence: high, source type: primary  
  [Dario Amodei, Machines of Loving Grace](https://www.darioamodei.com/essay/machines-of-loving-grace)  
  Quotes taken from the essay. The 2026 essay was not fetched.
- **Hassabis describes current systems as 'jagged intelligences' that lack continual learning, long-term planning and consistent reasoning, and his stated AGI timeline has moved during 2026.**  
  Feb 2026 (India AI Impact Summit): AGI maybe 5–8 years away. Around May 2026 (Axios): about 2030. Oct 2026 (WSJ, per Techmeme): 2–3 years. (2026-02 to 2026-10). Confidence: low, source type: secondary_aggregator  
  [Storyboard18 and other secondary coverage](https://www.storyboard18.com/brand-makers/google-deepmind-ceo-says-agi-not-here-yet-calls-current-ai-jagged-intelligence-90028.htm)  
  No primary transcript checked, and the WSJ 2–3 year figure is unconfirmed. Use only as illustration with hedging, or find the primary source.
- **The 'jagged frontier' field experiment at BCG: GPT-4 helped strongly on tasks inside its capability and hurt on a task just outside it.**  
  758 consultants (about 7% of BCG's consultant workforce). Inside the frontier: 12.2% more tasks completed, 25.1% faster, more than 40% higher quality. Outside-frontier task: AI users were 19 percentage points less likely to get it right; the no-AI baseline was about 84% correct. (HBS working paper 2023-09; Organization Science version (DOI 10.1287/orsc.2025.21838)). Confidence: medium, source type: peer_reviewed  
  [Dell'Acqua, McFowland, Mollick, Lifshitz-Assaf, Kellogg, Rajendran, Krayer, Candelon, Lakhani — Navigating the Jagged Technological Frontier](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321)  
  SSRN and HBS pages returned 403. The numbers are consistent across several secondary summaries and match the well-known abstract, but check the abstract before publishing. Limits: one firm, GPT-4 (2023), consulting tasks only.
- **METR's 50% time horizon has risen from minutes to more than half a working day. The top 2026 measurement is beyond what METR says it can measure reliably.**  
  Time Horizon 1.1, 50% horizon (95% CI): Claude Mythos Preview (early, released 2026-04-07) 1,044.8 min ≈ 17.4 h (508.9–3,304.3 min ≈ 8.5–55 h); 80% horizon 185.9 min ≈ 3.1 h. Claude Opus 4.6: 718.8 min ≈ 12.0 h (316.7–3,633.8). Gemini 3.1 Pro: 384.1 min ≈ 6.4 h. GPT-5.4: 341.7 min ≈ 5.7 h. GPT-5: 203 min ≈ 3.4 h. GPT-4 (2023): 4.0 min. Doubling time since 2023 about 129 days (CI about 104–158); about 188 days across all time. (Mythos added 2026-05-08; page no longer actively updated as of 2026-09-08). Confidence: high, source type: primary  
  [METR Time Horizons page and benchmark_results_1_1.yaml](https://metr.org/time-horizons/)  
  METR: "Measurements above 16 hrs are unreliable with our current task suite." The suite has only 5 tasks of 16 h or more out of 228. The GPT-5 value on v1.1 (about 3.4 h) differs from the page text's 'around 2 hours and 17 minutes', which is likely the v1.0 figure; don't mix suite versions. Models released after May 2026 (Opus 4.8, Fable 5, Astra, Opus 5.5) are not measured. Anthropic's Mythos system card reported an imputed 34.4 h; that is a vendor figure, not METR's.
- **METR itself warns that time horizons are not a delegation threshold and do not generalize across domains.**  
  Error bars about 2x in each direction. Visual computer-use horizons are 40–100x lower than math. A 50% horizon does not mean tasks under that length can be delegated, since some need 98%+ reliability. Doubling the horizon does not double automation. (2026-01-22). Confidence: high, source type: primary  
  [METR, Clarifying limitations of time horizon](https://metr.org/notes/2026-01-22-time-horizon-limitations/)  
  Essential caveat for a general audience.
- **In the original GDPval, the best model's deliverables were judged as good as or better than industry experts' in under half of tasks.**  
  1,320 tasks, 44 occupations, 9 sectors; experts average 14 years' experience; 220-task gold subset. Claude Opus 4.1: 47.6% wins or ties. GPT-5 (high): 39.0% wins. o3: 35.2%. GPT-4o: 12.5% wins. Blinded pairwise grading by occupation experts. Naive GPT-5 speed and cost ratios were about 90x and 474x, but with a 'try once, then fix it yourself' workflow only about 1.12x faster and 1.18x cheaper. (2025-10-05 (arXiv v1; announced 2025-09-25)). Confidence: high, source type: preprint  
  [GDPval: Evaluating AI Model Performance on Real-World Economically Valuable Tasks (arXiv 2510.04374)](https://arxiv.org/html/2510.04374)  
  Paper's own limitations: tasks are one-shot and precisely specified, not interactive, with no tacit knowledge or physical work. The automated grader agrees with humans 66% of the time, versus 71% between human raters.
- **OpenAI reports a GDPval wins-or-ties rate of about 85% for GPT-5.5.**  
  GPT-5.5 84.9% wins or ties vs. professionals across 44 occupations. In the same table: GPT-5.4 83.0%, GPT-5.5 Pro 82.3%, Claude Opus 4.7 80.3%, Gemini 3.1 Pro 67.3%. (2026-04-23 (GPT-5.5 release, per secondary)). Confidence: medium, source type: vendor_reported  
  [OpenAI, Introducing GPT-5.5 (via search excerpt)](https://openai.com/index/introducing-gpt-5-5/)  
  The page returned 403 and the numbers come from a search-result summary, so recheck the table. Vendor-run eval with no independent replication found. No GDPval figure was found for GPT-6 Astra in OpenAI's launch materials.
- **On Artificial Analysis's independent GDPval-AA, GPT-6 Astra scored lower than its predecessor: a newer 'smarter' model was worse at simulated professional work.**  
  Astra about 45 Elo points below GPT-5.6 Sol on GDPval-AA v2, attributed to fewer agent turns (24 vs. 45). Intelligence Index: Astra (max) 53, tied with Claude Fable 5.1 and 6 points above GPT-5.6 Sol. Terminal-Bench v4.0: Astra 59%, Fable 5.1 52%, GPT-5.6 Sol 40%. (2026-09-09). Confidence: high, source type: secondary_aggregator  
  [Artificial Analysis, Benchmarking GPT-6 Astra](https://artificialanalysis.ai/articles/benchmarking-gpt-6-astra)  
  Independent third-party evaluator. GDPval-AA uses an LLM grader and Elo, so it is not comparable with OpenAI's expert-graded GDPval.
- **The Remote Labor Index (real paid freelance projects judged by humans) shows rapid growth from a low base. Even the best agent fails most projects.**  
  Automation rate = share of projects scored 2 or 3 (as good as or better than a human professional's deliverable). Current leaderboard: Opus 5.5 21.25%, GPT-6 Astra 20.83%, Fable 5.1 17.92%, Gemini Argon 4 17.08%, Fable 5 15.83%, Opus 4.8 8.33%, GPT-5.5 (Codex) 6.25%, GPT-5.2 2.50%, GPT-5 1.67%. Best at launch: 2.5% (Manus). (Leaderboard accessed 2026-11-07 (no dates on page); RLI launched 2025-10). Confidence: high, source type: official_leaderboard  
  [Scale Labs Remote Labor Index leaderboard](https://labs.scale.com/leaderboard/rli)  
  Run jointly by Scale and CAIS. The leaderboard shows no per-entry dates.
- **CAIS's July 2026 RLI update found that automated LLM judges overstate how well the newest models do on real work by about 2.3–2.9x.**  
  Fable 5 15.8%, Opus 4.8 8.3%, GPT-5.5 6.25% (human-judged). LLM judge: GPT-5.5 17.9% vs. 6.25% human-judged (2.9x); Opus 4.8 18.8% vs. 8.33% (2.3x). The judge still ranks models correctly (Spearman ρ = 0.90). RLI pass rates do not fall as human completion time rises, so time-horizon analysis does not fit RLI. No Fable 5 deliverable would be accepted as finished professional work. (2026-07-01). Confidence: high, source type: primary  
  [CAIS, A Significant Increase in Digital Labor Automation](https://safe.ai/blog/significant-increase-in-digital-labor-automation)  
  Strong evidence that LLM-graded 'economic value' evals can mislead.
- **The Epoch Capabilities Index (ECI) combines many benchmarks into one open-ended scale. The top models are statistically tied, and scores shift as results come in.**  
  Scale anchored at Claude 3.5 Sonnet = 130 and GPT-5 = 150; no maximum. As of 2026-09-13: GPT-6 Astra 166.31 (90% CI 163.00–171.88), Claude Fable 5.1 164.47, GPT-5.6 Sol 161.81, Kimi K3 157.63. Astra launched at 169.23 and fell to 166.31 as more results arrived. Math-ECI: Astra 169.83 vs. Fable 5.1 165.73. SWE-ECI: Fable 5.1 167.44 vs. Astra 163.58. (2026-09-16). Confidence: high, source type: primary  
  [Epoch AI, GPT-6 Astra leads on math benchmarks, but not on software engineering; Epoch ECI page](https://epoch.ai/data-insights/astra-eci-breakdown)  
  Later October 2026 figures (Opus 5.5 168.83 vs. Astra 168.81; Astra 169.1) appear only in secondary and prediction-market sources and could not be checked. The live leaderboard didn't render; the CSV was updated Nov 4 and Nov 7, 2026.
- **Anthropic's 'observed exposure' measure finds actual AI use is far below what is theoretically feasible, and finds no systematic rise in unemployment among exposed workers.**  
  Computer & Math: about 94% of tasks theoretically feasible for LLMs vs. about 33% actually covered by Claude. Office & Admin: about 90% feasible. Computer programmers 75% coverage, data entry keyers 67%. About 30% of workers have zero coverage. No significant unemployment increase for highly exposed workers since late 2022. Job-finding rate for 22–25 year-olds in exposed occupations is down about 14% relative to 2022, barely significant. BLS projects about 0.6 percentage points less growth per 10-point increase in coverage. (2026-03-05). Confidence: high, source type: primary  
  [Anthropic, Labor market impacts of AI: A new measure (Massenkoff & McCrory)](https://www.anthropic.com/research/labor-market-impacts)  
  Based on usage of one vendor's platform (Claude), so it understates total AI use. Fully automated use gets full weight and augmentative use half weight.
- **Anthropic Economic Index 'Learning curves' report: usage is spreading out and the earlier '49% of jobs' figure barely changed.**  
  The top 10 O*NET tasks fell from 24% to 19% of Claude.ai conversations (Nov 2025 to Feb 2026). About 49% of jobs have at least 25% of tasks performed using Claude (Nov 2025 report; 'barely changed'). Average wage-value of tasks fell from $49.3 to $47.9 per hour. In the Jan 2026 report on Claude.ai, augmentation was 52% vs. automation 45%. (2026-03-24 (sample 2026-02-05 to 02-12)). Confidence: medium, source type: primary  
  [Anthropic Economic Index report: Learning curves](https://www.anthropic.com/research/economic-index-march-2026-report)  
  The 52/45 split comes from secondary summaries of the January 2026 report and was not checked on Anthropic's page. The economic-index hub says 'last updated June 26, 2026', but the newer edition's contents were not retrieved.
- **Anthropic research suggests robots could technically do most physical tasks but are cost-competitive for very few, a reminder that 'can do' and 'economically does' are different yardsticks.**  
  About three-quarters of physical tasks technically doable; cost-competitive for 0.3% (2026-09-30). Confidence: medium, source type: primary  
  [Anthropic, What work can robots do?](https://www.anthropic.com/research)  
  Headline read from Anthropic's research index page only; the article itself was not fetched.
- **OpenAI introduced 'LifeVal', an everyday-errands benchmark, and its own chart shows gains flattening.**  
  GPT-5.2 49.3%, GPT-5.4 73.0%, GPT-5.6 80.0%, GPT-6 Astra 80.6% (xhigh; unweighted average reward) (2026-11-02). Confidence: low, source type: secondary_aggregator  
  [Secondary coverage (aiweekly, DailyMech, FourWeekMBA)](https://dailymech.com/articles/openai-lifeval-everyday-tasks-benchmark.html)  
  Only OpenAI models are scored, and the task set and grading are reportedly unreleased. Vendor-made benchmark with no independent check. Usable as an example of labs creating their own yardsticks, not as evidence of capability.

## Counter-evidence

- Against 'AGI is useless as a yardstick': Hendrycks et al. and DeepMind's Levels of AGI both turn 'human-level' into measurable profiles, and the authors themselves say to report the domain profile. Human-relative measurement can work if it is broken down by domain. The real problem is the single yes/no label, not human comparison as such.
- Almost every proposed 'better' yardstick still uses humans as the reference point: GDPval (expert deliverables), RLI (professional freelancers), METR (human completion time), ARC-AGI-3 (human action efficiency). The defensible claim is 'human-level is useful task by task but misleading as one finish line.'
- Against belief (1) on speed: on the most realistic work benchmark (RLI), the best agent completes about 21% of paid projects at acceptable quality, and CAIS says no Fable 5 deliverable would be accepted as finished professional work.
- GPT-6 Astra scored about 45 Elo lower than GPT-5.6 Sol on GDPval-AA v2 and lower on presentation quality. Newer frontier models do not get better at everything.
- OpenAI's own LifeVal chart shows gains slowing: 73.0 to 80.0 to 80.6.
- Anthropic finds no systematic rise in unemployment among highly exposed workers since late 2022, and actual coverage is about 33% vs. about 94% feasible in Computer & Math. Capability is running well ahead of economic impact.
- On belief (1) and METR: the top time horizon (Mythos early, about 17.4 h) has a 95% CI of about 8.5–55 h, and METR says values above 16 h are unreliable. The fastest-looking recent points are the least certain. METR's page stopped active updates in September 2026, and post-May models are unmeasured.
- LLM-graded benchmarks overstate real-work performance on the newest models by about 2.3–2.9x (CAIS RLI analysis). Vendor-reported GDPval numbers like 84.9% for GPT-5.5 should be treated with care.
- ARC-AGI-3 results depend heavily on the harness: 62.7% standard vs. 99.9% with OpenAI's adapter, so a scaffolding choice can make a model look superhuman or not. ARC Prize and Chollet explicitly decline to call Astra AGI.
- Against belief (2): models still score 0 on long-term memory storage in Hendrycks et al. (GPT-5), and METR finds visual computer-use horizons 40–100x shorter than math. Superhuman performance is narrow and patchy.
- The GDPval paper's own speed and cost analysis: naive gains of about 90x faster and 474x cheaper shrink to about 1.1–1.4x faster and 1.2–1.6x cheaper once human review and fixing are counted.

## Surprises

- The contractual AGI trigger between Microsoft and OpenAI, once reportedly tied to about $100B in profits and later to an expert panel, was in effect dropped in April 2026: OpenAI's payments to Microsoft now run through 2030 'independent of OpenAI's technology progress.'
- OpenAI's CEO called AGI 'not a super useful term' in August 2025, then a year later predicted an internal system he would 'call AGI' by the end of 2026.
- ARC-AGI-3 went from under 1% for every frontier model at launch (March 2026) to 62.7% standard and 99.9% with a custom harness six months later. Under that harness, Astra used fewer moves than humans on 96% of levels, yet the benchmark's creators still say it isn't AGI.
- In the Hendrycks AGI score, GPT-5 gets a perfect 10/10 on math and on reading and writing but 0/10 on forming new long-term memories, the same as GPT-4.
- METR's best AI agent can, half the time, finish software tasks that take a skilled human about 17 hours, but METR's own test suite has only 5 tasks that long, so it can barely measure this.
- A newer flagship (GPT-6 Astra) scored worse than its predecessor on an independent test of professional work deliverables.
- AI judges grading AI work overstated the newest models' real freelance success by nearly 3x compared with human graders.
- Anthropic estimates robots could technically do about three-quarters of physical tasks but are cost-competitive for only 0.3%.

## Chart ideas

- METR 50% time horizon over time, log scale: GPT-2 (2019) 0.05 min to GPT-4 (2023) 4 min to GPT-5 (2025) 203 min to Claude Mythos Preview early (2026-04) 1,045 min, with 95% CI bars and a shaded 'unreliable above 16 h' band. Mark v1.0 points separately. Data: metr.org/assets/benchmark_results_1_1.yaml.
- Remote Labor Index automation rate by model/date: 2.5% at launch (Oct 2025), 4.17% (Opus 4.6 Cowork), 8.33% (Opus 4.8), 15.83% (Fable 5), 21.25% (Opus 5.5), with the remaining about 79% shown as 'not yet automated'. Data: labs.scale.com/leaderboard/rli and safe.ai blog (July 1, 2026).
- Radar or small-multiple bars of the Hendrycks AGI profile, GPT-4 vs. GPT-5, across 10 domains, showing jaggedness (math 10, memory storage 0). Data: arXiv 2510.18212 Table 1.
- Theoretical vs. observed AI exposure by occupational category, e.g. Computer & Math 94% vs. 33%. Data: anthropic.com/research/labor-market-impacts (full category values are in the figure; fetch the data files).
- ARC-AGI-3 harness gap: launch scores (<1%) vs. Astra standard 62.7% vs. Astra adapter 99.9%, labeled with cost. Data: arcprize.org/blog/astra and the leaderboard.
- Human-graded vs. LLM-graded RLI rates for GPT-5.5 (6.25% vs. 17.9%) and Opus 4.8 (8.33% vs. 18.8%) as a 'measurement inflates' chart. Data: safe.ai blog July 2026.
- Timeline of AGI definitions and contract changes: 2018 charter; Nov 2023 Levels of AGI; Dec 2024 $100B profit report; Aug 2025 Altman 'not useful'; Oct 2025 expert panel and Hendrycks definition; Apr 2026 clause dropped; Aug 2026 Altman 'AGI by year end'; Sep 2026 Astra 'AGI era'. Sources as cited.
- GDPval wins-or-ties trajectory: GPT-4o 12.5% (wins only) and Claude Opus 4.1 47.6% (Sept 2025, paper) to GPT-5.5 84.9% (OpenAI, Apr 2026, vendor-reported). Label vendor vs. paper values clearly, and note that wins-only and wins-or-ties are not directly comparable.

## Open questions

- Did the expert-panel AGI verification mechanism survive the April 27, 2026 amendment? Microsoft's post is silent. Check OpenAI's page openai.com/index/next-phase-of-microsoft-partnership/ (it returned 403 here) and The Verge article.
- Exact wording of OpenAI's GPT-6 Astra launch claims about the 'AGI era' and Brockman's quote. openai.com returned 403, so only secondary sources were seen.
- Exact GDPval scores for GPT-5.2, GPT-5.4, GPT-5.5 and GPT-5.6. The GPT-5.5 table (84.9%) came via a search summary. I could not check other versions: the search budget ran out before I could look up GPT-5.2's reported 70.9%.
- Have Hendrycks et al. or CAIS published AGI-definition scores for any 2026 model? None were found on agidefinition.ai or the arXiv versions (latest v3, Dec 3, 2025).
- Dell'Acqua et al. exact numbers should be checked against the abstract or the Organization Science version. SSRN and HBS returned 403.
- Current ECI leader as of November 2026. Epoch's live leaderboard didn't render, and the October figures (Opus 5.5 vs. Astra about 168.8) are unverified.
- METR time horizons for models after May 2026 (Opus 4.8, Fable 5/5.1, GPT-5.6, Astra, Opus 5.5): METR's page stopped active updates. Has METR released a new task suite (TH 2.0) or a Frontier Risk Report update? The May 19, 2026 Frontier Risk Report figures (about 12 h public frontier) were seen only via mirrors.
- Hassabis's 2026 statements (WSJ '2–3 years', a July 2026 essay definition) still need primary sources.
- Contents of the June 26, 2026 Anthropic Economic Index edition ('Cadences'?) were not retrieved.
- Note: the web search budget ran out partway through, so remaining checks relied on direct page fetches. RSI and weight-editing news (belief 4) was outside this topic and not researched here.
