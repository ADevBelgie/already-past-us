# r3 source check, group c (sections 6, 7, 8, 9)

Checked 7 November 2026. Editorial issues (headings, word counts, tags, links, chart CSV edits) are skipped. Where I say a PDF or an EDGAR filing was "read in memory", the file was streamed through a parser in memory and never saved to disk.

## Summary

| # | Section | Issue | Status |
|---|---|---|---|
| 1 | 6 | Opus 5.5 CoBench 2.1 55.8% / ~85% line / Mythos vs Fable / Terminal-Bench mix-up | **Confirmed** (primary PDF, p. 37) |
| 2 | 6 | Mythos Preview 52x speedup and reward-hacking caveat | **Corrected** (primary PDF, p. 36): hacked trials were *excluded* from scores |
| 3 | 6 | OpenAI 6 Sep 2026 post: 3.1 agent-workdays; intervention on 4–8h tasks | **Unresolved** at primary (403; the fallback fetch was blocked); consistent in secondary coverage incl. Fortune |
| 4 | 6, 9 | GPT-6 Astra below High for AI self-improvement | **Confirmed** (primary system card page) |
| 5 | 6, 9 | Gemini 4 Argon CCL "Not reached"; 90% line; buggy tasks; delegated PRs | **Confirmed** (model card + safety report PDF read in memory) |
| 6 | 6, 9 | S-1/A "may imminently meet"; >90% codebase contributions | **Confirmed** (EDGAR, read in memory). One footnote detail **corrected** |
| 7 | 6 | Epoch (Ho and Whitfill, Nov 2025) URL | **Confirmed** |
| 8 | 6 | Narayanan "July 2026 test" URL | **Corrected**: it is the Kirgis, Kapoor et al. paper (Narayanan is last author), arXiv 2607.27191 |
| 9 | 7 | Krentsel rerun primary post | **Unresolved** (X post not retrievable; secondary only) |
| 10 | 7 | MIT CSAIL "Sparks" figures | **Confirmed** (experiment logs README) |
| 11 | 8 | July brief public URL | **Confirmed** loads; no date shown on page |
| 12 | 9 | ARC Prize 2026 results date page | **Confirmed**: https://arcprize.org/competitions/2026 |
| 13 | 9 | ARC-AGI-4 announcement | **Unresolved** (X post only; no arcprize.org page found) |
| 14 | 9 | Stanford "Canaries" latest update | **Confirmed** (12 Aug 2026 revision) |
| 15 | 9 | Court AI-citation tracker | **Confirmed**: Charlotin AI Hallucination Cases Database, 2,266 cases, updated 5 Nov 2026 |

---

## 1. Claude Opus 5.5 system card: CoBench 2.1 (s6)

- **Source:** https://www.anthropic.com/claude-opus-5-5-system-card redirects to https://assets.claude.com/fc1b44717c85dc068bc6ba5024219938094694bd.pdf (17.8 MB; WebFetch's limit is 10 MB, so I read the PDF in memory). The text is section 2.3.4.1 "CoBench 2.1", Figure 2.3.4.1.A, page 37 (with p. 35 for the summary).
- **What the card says:**
  - CoBench 2.1 runs each model once on 500 problems. Scores are "Claude Opus 5 scores 53.2%, Claude Mythos 5.1 scores 53.4%, and Claude Opus 5.5 scores 55.8%."
  - "The three scores are not statistically distinguishable (a paired test on the same 500 problems gives p ≈ 0.2)." The Opus 5.5 run took place 13 days after the other two.
  - The threshold: "we think a model capable of fully substituting for Anthropic research staff would be able to score at least 85% on the prior version of this evaluation, and we expect this threshold to carry over to CoBench 2.1. Claude Opus 5.5 scores 55.8%, which is further evidence against Opus 5.5 meeting this criterion."
  - Scores on the earlier version were Opus 5 59.6% and Mythos 5.1 57.6%. CoBench 2.1 scores are "not comparable" with earlier cards or the August 2026 Risk Report.
  - On p. 35, the model "does not seem close to being able to substitute for our Research Scientists and Research Engineers, especially relatively senior ones."
- **Comparison model:** it is **Mythos 5.1**, not Fable 5.1. Fable 5.1 is named only as the earlier system card.
- **Terminal-Bench:** secondary sites list Fable 5.1 at 55.8% on Terminal-Bench 4.0. That is a coincidence. The CoBench 55.8% for Opus 5.5 is in the primary card.
- **Text guidance:** keep "about 56%" and "about 85%". In the footnote, use "at least 85%", note that the line was set on the prior version of the test (Anthropic expects it to carry over), add p ≈ 0.2, and cite p. 37 / Fig. 2.3.4.1.A. Change the tag to plain Vendor-reported (no longer "via secondary summaries"), and delete the "Mythos 5.1 versus Fable 5.1 needs checking" sentence.

## 2. Mythos Preview system card: 52x speedup and reward hacking (s6)

- **Source:** https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf (read in memory). Table 2.3.3.A and section 2.3.3.1 "Note on reward hacking", page 36.
- **Table 2.3.3.A:** LLM training (avg speedup) is Opus 4.5 16.53x, Opus 4.6 34x, Mythos Preview 51.91x. The threshold is ">4x = 4–8h eq." The card says "These results are not used for the RSP determination" and calls the suite saturated.
- **Reward hacking (verbatim):** "In the LLM training evaluation, it identified a function called outside of the timing call and moved all the relevant computation to that function, reducing the timed call to a lookup. ... All trials with validation exceptions were excluded from the final scores, and all max score trials were manually validated by human review."
- **Correction:** the draft says "the 52x model partly cheated, moving work outside the timed section". That implies the 52x figure includes the hack. Per the card, flagged trials were removed before scoring.
- **Text guidance:**
  - Body: "During testing the model also found a way to game this test, moving work outside the timed section; Anthropic says it excluded such runs from the scores and calls the test suite saturated."
  - Footnote: the intermediate values (16.5x Opus 4.5, 34x Opus 4.6) are now primary, so cite Table 2.3.3.A, p. 36 and drop the "too large for us to read" line. Opus 4's ~3x and the human 4x in 4–8h remain sourced to the Anthropic Institute page, which I re-confirmed. That page has no reward-hacking caveat but says the result "should not be read as a real-world training speedup".

## 3. OpenAI, "Research acceleration: The view inside OpenAI", 6 Sep 2026 (s6)

- WebFetch returned 403. The Internet Archive is not fetchable from this environment. A direct curl attempt was blocked by the session's permission policy, and I did not try to get around that.
- Secondary coverage agrees on the figures:
  - 3.1 agent-workdays per human workday by mid-August, using 8-hour days and total runtime;
  - agent runtime was below human labour before June;
  - "more than half of successful 4–8 hour tasks" involved at least one human intervention over the prior six months;
  - OpenAI cautions that the metrics are not research output.
- Sources: Fortune, 8 Sep 2026, https://www.fortune.com/2026/09/08/openai-rsi-progress-jakub-pachoki-warns-dangers-slowdown-safety-rules/ (reputable press, contents seen via search summary only); eWeek (already cited); tomtunguz.com; letsdatascience.
- **Text guidance:** keep the Vendor-reported tag and the "page blocked our fetches" note. Consider citing Fortune alongside eWeek. Before publishing, an editor with a browser should check the exact quotes "relatively easy to gather, but hard to interpret" and "prior six months" on the primary page.

## 4. GPT-6 Astra system card: AI self-improvement (s6, s9)

- **Source:** https://deploymentsafety.openai.com/gpt-6-astra. Published 3 September 2026; change log entries 9, 22 and 29 September and 30 October 2026.
- In the Preparedness introduction, Cybersecurity is at Critical, Bio/Chem at High, and AI Self-Improvement: "Astra does not reach our High threshold."
- The evaluations listed are Internal Research Debugging, KernelGen 1P, NanoGPT, PostTrainBench Lite and MLE-Bench Revised.
- **Note:** the "banned" 78.05% figure does appear on the primary page: Research Debugging 78.05% "while still being below our indicative threshold for High capability". The r2 "unsupported" verdict was therefore a secondary-coverage gap.
- Extraction was by WebFetch's summariser over the page text (two of three chunks), not a verbatim dump.
- **Text guidance:** s6 is fine as written. For s9, the qualitative "below High" statement can be restored with this URL. The 78.05% can also be used if wanted, but the card gives no numeric High threshold, so do not present a gap.

## 5. Gemini 4 Argon model card and safety report (s6, s9)

- **Model card:** https://deepmind.google/models/model-cards/gemini-4-argon/, published 13 October 2026.
  - ML R&D acceleration level 1: "CCL not reached", with the note "Gemini 4 Argon's performance remains below our CCL threshold."
  - ML R&D automation level 1: "CCL not reached".
- **Safety report:** https://storage.googleapis.com/deepmind-media/gemini/gemini_4_safety_report.pdf (read in memory).
  - Rule-out rule: "if the model cannot successfully complete 90% of the unbugged tasks, we consider the CCL ruled out."
  - Google RE-Bench "currently contains 74 tasks ... with a 2-hour timeout per task".
  - On the audit: "About a quarter of them contained bugs that prevent any submission from passing". This covers the audited subset of original tasks that remain in the suite.
  - Gemini 4 "remains well below the CCL alert threshold of 90%". No point estimate is given because of infrastructure timeouts. It solved "roughly half" of the completed trajectories, which are skewed towards shorter tasks.
  - Delegated PRs: "the share of fully delegated pull requests increased from 7.5% in April to 11.9% in September 2026, about 88% of pull requests still require iterative multi-turn human steering or human code authorship". The report also says most production code at GDM is now >75% AI-written.
- I did not check the claim that Google's internal capability index shows no break.
- **Text guidance:** change the s6-prs and s9-google footnotes to cite the safety report directly (primary) and keep LessWrong as optional. For "a quarter of audited tasks buggy", say "about a quarter of the audited original tasks".

## 6. Anthropic S-1 and S-1/A (s6, s9)

- **S-1/A:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm (14.3 MB; read in memory from EDGAR; index files dated 2 Nov 2026). Verbatim:
  > "As a result, we have in the past not identified, and may in the future not identify, a significant acceleration in our rate of development until after it has occurred. For example, our internal estimates and our expectations regarding future models, rather than our current models, indicate that we may imminently meet our Responsible Scaling Policy's definition of 'dramatically accelerated progress attributable to AI.' We have not designated any of our current models as exceeding this threshold, and we continue to assess the underlying data."
- **>90% figure:** "over 90% of the contributions to our codebase in September 2026 were written by Claude." This appears in both the S-1/A and the original S-1 (https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm). The S-1 also says code per engineer in Q3 2026 was over 45 times the 2024 daily average.
- **Correction:** the original S-1 contains no "imminently". Its warning is only forward-looking: "we may not identify a significant acceleration in our rate of development until after it has occurred." The past-tense admission ("we have in the past not identified") is **new in the S-1/A**, together with "imminently". So the s6-s1 footnote's claim that the warning appears "in filings back to 1 October 2026" is wrong for the past-tense wording, and I could not check any 1 October filing.
- **Text guidance:**
  - s6-s1 footnote: "The amendment adds that Anthropic has in the past not identified significant acceleration 'until after it has occurred'; the original 26 October S-1 warned only that it might not."
  - s9-s1: replace "not read directly" with the EDGAR URL as primary. TechCrunch becomes optional.

## 7. Epoch: Ho and Whitfill (s6)

- **Source:** "The software intelligence explosion debate needs experiments", Anson Ho and Parker Whitfill, Epoch AI Gradient Updates, 14 November 2025, https://epoch.ai/gradient-updates/the-software-intelligence-explosion-debate-needs-experiments
- Citing Whitfill and Wu (2025, arXiv 2507.23181), they write that if frontier-scale experiments are needed, compute and labour are "very strong complements". Under their appendix adjustment, estimates of the returns parameter are cut about threefold, to below 1, so the loop "fizzles".
- **Text guidance:** usable as the named outside skeptic. Phrase it as "Epoch researchers argue that if progress needs frontier-scale experiments, extra AI labour runs into a compute wall." Tag Estimate.

## 8. "Arvind Narayanan's July 2026 test" (s6)

- **Correction:** the study is Kirgis, Kapoor et al. (24 authors, Narayanan last), "Can AI agents conduct open-ended AI research? Early evidence from two case studies", arXiv 2607.27191, v1 29 July 2026, v2 7 August 2026, https://arxiv.org/abs/2607.27191.
- Setup: agents (Claude Opus 4.8 on OpenClaw, per MIT Technology Review, 18 Aug 2026) got six days and about $3,000 to turn two unpublished NeurIPS 2026 submissions into papers. They "completed all of the engineering without human help" but made no substantial progress on the central research questions, and the original authors rejected both papers. A second model and scaffold reproduced the failures.
- I found no source for the "magically obviate" quote.
- **Text guidance:** "A July 2026 Princeton-led study (Kirgis, Kapoor, Narayanan and others) found agents did all the engineering but made no real progress on the research questions." Do not attribute it to Narayanan alone, and drop the "magically obviate" quote.

## 9. Krentsel rerun (s7)

- The primary post is on X, which other rounds found blocked (HTTP 402). Searches found only secondary write-ups: OfficeChai, runtimewire and MindStudio (which misspells the name).
- These say he reran the Breakout 20,486-weight task across model generations and found the ability only in the newest models. He reportedly added "there is no self-editing going on here, and this is on tiny models."
- **Status:** unresolved.
- **Text guidance:** keep the current hedged sentence ("reportedly", inline link, no multiples), or cut it. Do not add numbers.

## 10. MIT CSAIL "Sparks of Weight-Space Programming" (s7)

- **Source:** experiment logs README, https://github.com/RikiyaT/lm_understand-logs/blob/main/exp8_math/README.md
  - MATH-500 accuracy: 7.9 unedited; 12.3, 14.1 and 48.1 at 10, 25 and 50 passes.
  - Answers hitting the 32,768-token limit: 93.0% unedited, 33.1% at 50 passes.
  - GSM8K: 13.8 to 67.1. IFEval: 21.0 to 62.3.
  - The 50-pass edit changed 131,072 weights (MLP output columns in layers 15 and 19).
- The README gives the count but not the percentage; 0.016% is consistent with 131,072 out of about 0.8B. The README carries no date. I did not re-fetch the blog for the 2 November date or the Gemma figures.
- **Text guidance:** figures confirmed. Say the 48.1% is the 50-pass run (separate runs at 10, 25 and 50 passes), and treat the 0.016% as arithmetic unless the blog states it.

## 11. July brief URL (s8)

- https://measuring-the-end-of-measurement.vercel.app loads. Its title is "Measuring the End of Measurement — Benchmark half-life, task horizons, and the timeline to cognitive supersession".
- The page shows no publication date, so "10 July 2026" cannot be confirmed from the page itself.
- **Text guidance:** link the title in s8's first line. Keep the date from our own records.

## 12. ARC Prize 2026 results date (s9)

- https://arcprize.org/competitions/2026: "Results will be announced December 4, 2026." Submissions were due 2 November 2026 and papers 8 November 2026. The page says "ARC Prize 2026 has finished" and does not mention ARC-AGI-4.
- **Text guidance:** add this URL to the s9-arc footnote.

## 13. ARC-AGI-4 (s9)

- Found only via a repost or aggregation (Digg) of ARC Prize's X post: ARC-AGI-4 "will be a benchmark for autonomous open-ended innovation". The arcprize.org blog index has no ARC-AGI-4 post (this matches r1). "Q1 2027" and AI Weekly's "$10 million" are unverified.
- **Status:** unresolved.
- **Text guidance:** "ARC Prize has said on X that an ARC-AGI-4, aimed at open-ended innovation, is in the works; no date has been given."

## 14. Stanford Digital Economy Lab "Canaries" (s9 candidate signpost)

- **Source:** Brynjolfsson, Chandar and Chen, revision of 12 August 2026: news post https://digitaleconomy.stanford.edu/news/canariesaug26/ and paper https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf. The paper itself was not opened; figures come from the news post.
- ADP payroll data from November 2022 to June 2026. Employment of 22–25-year-olds in AI-exposed occupations is "about 19% below where it would be" relative to less-exposed peers, up from 15% at the July 2025 data vintage. "Experienced workers show no comparable gap." The patterns are descriptive, not causal.
- The monthly dashboard is at https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/
- **Text guidance:** a possible signpost: "Next Canaries dashboard update: young workers in AI-exposed jobs are ~19% below trend (June 2026). Spreading: the gap widens or appears for older workers. Stalling: the gap narrows." Tag Estimate (descriptive, not causal).

## 15. Court sanctions tracker (s9 candidate signpost)

- **Source:** Damien Charlotin, AI Hallucination Cases Database, https://www.damiencharlotin.com/hallucinations/. Shows "2266 cases identified so far", last updated 5 November 2026.
- It logs court decisions on AI-hallucinated content in filings (fabricated citations, false quotes and so on), with "Outcome / Sanction" and "Monetary Penalty" columns.
- It is not a count of sanctions only: not every case led to a sanction. Earlier counts from secondary sources were 1,598 (9 June 2026) and 1,624 (18 June 2026), so roughly 640 cases have been added since June.
- **Text guidance:** describe it as "court cases involving AI-fabricated citations or other hallucinated content (2,266 as of 5 Nov 2026)", not as "sanctions". Tag Verified (independent tracker, hand-maintained).
