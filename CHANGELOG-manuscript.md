# Manuscript changelog: final edit, 7 November 2026

Source: four review passes (factcheck s0–s3, s4–s6, s7–s9; style critic). I checked every finding against the research files or the manuscript before applying it. "Modified" means the finding was valid but I changed its proposed wording. Backup of the pre-edit file: scratchpad `already-past-us.backup.md`.

Post-edit mechanical check (python -I): all footnote references are defined, each definition appears once and is used, there are no unused definitions, anchors are unique, every `(#id)` link resolves, and every `[section N](#sN)` label matches its anchor. Passed.

## Applied: fact-check findings (33)

1. s0 RLI growth: applied, modified. "About eight times lower" became "grown about eight and a half times in a year". The proposed "one-eighth as high (21.25 is 8.5 times 2.5)" read awkwardly.
2. s2-epoch footnote: applied. "Figure 7: 12.6 times" became "about 13 times per year". r1-cost.md confirms Fig. 7 is the GPQA alternative-averaging range.
3. s2-hist Grok 4.20 price: applied. price_history.json rates the May price low confidence, with a cut possibly around 30 April 2026.
4. s3 "Likely ≥16h": applied. The body now says this is METR's estimate for the leading internal model, not a verdict on Mythos by name.
5. s4 IMO expert note: applied. AI-agent grading is now credited to one secondary report, and Axiom's Lean check to Axiom itself (r2-backlog_b.md).
6. s4 GenCast expert note: applied. The unsourced "ECMWF noted" was replaced with a neutral statement (r1-superhuman.md fact-check).
7. s6-princeton footnote: applied. The papers were rejected by the original authors (r3-sourcecheck-c.md).
8. s4 NHC expert note: applied. "Did better still" became "also beat the official forecasts in the East Pacific" (r2-backlog_b.md: beat OFCL at 48–120 h).
9. s4-rli footnote: applied. "Statistical tie" became "one project apart; no confidence intervals published".
10. s5 GDPval: applied. "Nobody outside OpenAI has checked" became "we found no independent check".
11. s5 table, Levels of AGI: applied. "Emerging" is now labelled Level 1 of 5, and the stray comma was dropped.
12. s6 S-1/A: applied. Restored the filing's "expectations for future models" qualifier, merged with the date fix (style finding 37).
13. s6 Google threshold expert note: applied. Now "two-hour limit per task", per the safety report wording.
14. s6 conclusion: applied. "Measured" became "estimated from the lab's own, partly redacted data", matching the Estimate tag.
15. s7 "Nobody has yet shown": applied. Now "We found no public demonstration…". The chart label also changed to "none found in public work".
16. s7 forgetting result: applied. Both conditions are now in the body (about 1% with repeated statements, about 46% with varied restatements).
17. s9 threshold signpost: applied. It now names GPT-6 Astra and Gemini 4 Argon, because GPT-6.1 Sol and Terra are newer and r1-rsi.md did not check Sol's addendum.
18. s8 "four largest cloud firms": applied. The firms are now named (same as style finding 4).
19. s8 "tasks top out near 16 hours": applied. Now "METR says it cannot measure reliably above 16 hours".
20. s8 59.1% row: applied, merged with style finding 52. GPT-5.4 is a March 2026 model, the ~46% was Gemini 3.1 Pro (February 2026), and with no posting dates the ten-week trend cannot be checked. Release dates from verification_local.txt were added to footnote s8-scale.
21. s8 "merely ambitious": applied in the table and in footnote s8-arc3. The exact wording is now "from implausible toward merely ambitious" (r1-scorecard.md).
22. s8-yearh footnote: applied. The 3-month case became mid-2028 at about 3.5 months, from our 105-day 2024+ refit in verification_local.txt. Arithmetic re-checked: 6.88–7.51 doublings × 3.45 months.
23. s7 Gemma conclusion: applied. The authors' conclusion is now limited to this experiment.
24. s7-qwen footnote, run details: applied. Added one run per budget, the three different edits (r1-selfweights.md: rank-one/30 matrices, head in layer 15, MLP), and 20.3 h with a 4.7 h outage.
25. s7-qwen footnote, Hugging Face rerun: applied. Added 31.6% truncation, akhaliq built the export, its own sampling settings, and that it does not re-derive the edit (r2-selfweights_landscape.md).
26. s7-loops footnote: applied. Added 87.2% and 86.4% truncation for the 10- and 25-pass runs.
27. s7-qwen 0.016% provenance: applied. The share comes from the blog and model card, not our arithmetic (r1-selfweights.md).
28. s7-honnibal footnote: applied. Added his quote "Every experiment involving a real language model uses Python."
29. s7-self footnote, SEAL caveats: applied. Added the forgetting quote and the GPT-4.1 synthetic-data comparison (58.2 vs 59.4; 46.4 vs 49.2).
30. s7-self footnote, MASS benchmarks: applied. Named the four benchmarks.
31. s9 Canaries: applied. The source is now the August 2026 study revision, and the gap is measured against less-exposed peers.
32. s9 Danish payroll data: applied, merged with style finding 55. Now "METR's redesigned developer trial (no results date announced) and any update to the Danish study". This keeps footnote s9-work's Humlum citation in use.
33. s9 ARC signpost: applied. The 4 December date is now labelled as the compute-limited competition results, with the frontier score given for comparison (r3-sourcecheck-c.md §12).

## Applied: style-critic findings (56)

1. s4 GenCast main text: applied, modified. Added "That comparison is with another computer model, not with human forecasters."
2. s8 grade for "tens of %": applied. Now "Direction right; not the same measure".
3. s3 "29 points vs 15": applied. Noted that this is Anthropic's own scale and cannot be compared with Epoch's 14 points a year.
4. s8 Meta not a cloud firm: applied (duplicate of fact-check 18).
5. s8 "Scale rebuilt" SWE-bench Pro: applied. r1-scorecard.md marks Scale's 22 September release as not confirmed. The row now says "cleaned-up version… posted in October 2026" (arXiv 16 October).
6. s4 Pakistan trial: applied. The primary result (71.4% vs 42.6%) is now in the main text.
7. s4 closing contradiction: applied. Now "Most dots…" with driving named as the exception.
8. s1 "1 in 18": applied. Now "about 6%", and the footnote is trimmed to match.
9. s1 METR first mention: applied. Added "an independent AI research group".
10. s3 duplicate METR introduction: applied.
11. s1 superforecasters: applied. Defined on first use.
12. s2 ECI and benchmark: applied. Epoch AI is introduced, benchmark is defined, and "higher is better, no maximum" is added (supported by footnote s2-eci).
13. s2 input/output tokens: applied. Replaced with plain wording.
14. s0 AI agent: applied. Defined on first use.
15. s5 GDPval provenance: applied. The main text now says OpenAI built the test.
16. s2 hist bullet: applied. Recast as a caveat ("Prices change…"), with no self-reassurance.
17. s2 AA cross-check expert note: applied, modified. The internal preference argument is gone, but the caveat that the figure rests on one deprecated open model's host price stays, because it is a real limitation.
18. s3 "Then the ruler snapped": applied. I also changed "On that ruler" to "On that measure" and the expert note's "this ruler" to "this index". s2's "one ruler" became "one scale" in finding 12. One "ruler" remains in s5.
19. s6 "its ruler ran out": applied.
20. s9 "new METR ruler": applied. Now "task set".
21. s3 "instrument ran out…": applied.
22. s3 repeated "no convincing bottlenecks" quote: applied. Cut from s3; it remains in s6 and s9.
23. s1 heading "The overtake you did not see": applied. Now "Progress most people have not seen".
24. s9 "overtake" and "dated checks": applied. I also replaced "overtake" in s9 item 8 and in the closing paragraph with "AI's lead".
25. s1 "The public verdict follows": applied, modified. Now "Public opinion has been slow to shift." The proposed "lags too" clashed with the "too" in the next paragraph.
26. s1 Danish sentence: applied. It now says what was measured.
27. s1 paragraph order: applied. The "too high" paragraph now follows the FRI paragraph and opens "Not every forecast was too low.", and the chart moved after both.
28. s0 unit distance conjecture: applied. Added a plain explanation.
29. s0 ICPC/IOI sentence: applied, modified. Now "we found no ICPC statement on it" instead of the universal "ICPC has published no statement". IOI is identified as a contest for secondary-school students. The duplicate sentence in the s0 expert note was removed.
30. s0 "These facts don't fit on one line": applied. Cut.
31. Frontmatter "temp job": applied. Now "still fails most real freelance projects".
32. s2 "not getting more expensive either": applied.
33. s2 Argon signpost: applied. Added "Some prices are going up."
34. s2 "thinking included": applied. Replaced with a plain description.
35. s3 heading question: applied. The s7 heading had the same pattern and is now 'What "models editing their own weights" means'.
36. s3 date: applied. Now "5 November 2026".
37. s6 date: applied. Now "2 November 2026" (merged with fact-check 12).
38. s7 date: applied. Now "early November 2026".
39. s4 IMO tier: applied. Renamed "Level with the best, if confirmed" and moved after the forecasting paragraph.
40. s4 puzzle-games phrasing: applied.
41. s4 Waymo recall in main text: applied. The expert-note sentence was trimmed to avoid repetition and now carries the 3,871-vehicle recall from footnote s4-waymo-recall.
42. s4 redundant section 0 link after the Erdős disproof: applied. Link removed.
43. s4 RLI link label: applied. Now "see the opening".
44. s5 RLI link label: applied. Now "see the opening".
45. s4 "sets that question aside": applied. Now "argues for asking it one task at a time".
46. s5 "measures human-relative": applied.
47. s5 Willison and The Verge: applied. Both are identified.
48. s6 "3 times faster": applied. It now says the code got faster.
49. s6 "compute wall": applied.
50. s7 "The limits are still there": applied.
51. s7 Qwen3.5-0.8B: applied. Now "a far smaller open model, Alibaba's Qwen3.5-0.8B, with about 0.8 billion weights".
52. s8 59.1% explanation: applied, merged with fact-check 20.
53. s8 "about 129 days": applied. Now "about 4 months since 2023, about 3½ months since 2024", and footnote s8-metr now cites the 105-day 2024+ refit.
54. s8 closing paragraph: applied, modified. I deleted the paragraph instead of adopting the proposed replacement. The replacement was methodology prose, which STYLE.md bans, and the opening paragraph of s8 already makes the point.
55. s9 Danish payroll data: applied, merged with fact-check 32.
56. Sources "published alongside it": applied. Replaced with "[link to add before launch]", which must be filled in before publication.

## Rejected (0)

None. Every finding checked out against the research files or the manuscript. Where the proposed text was awkward, conflicted with another finding or broke STYLE.md, I applied a modified version, as noted above.

## Carried forward

- Brief word count rose from 4,406 to 4,718 (same counter, excluding footnotes, expert notes, chart comments and the Sources section). Per section: s0 303, s1 478, s2 524, s3 521, s4 532, s5 522, s6 603, s7 453, s8 359, s9 420. Several sections are now further over budget, and trimming is still needed.
- The Sources section needs the real datasets link (placeholder inserted).
- All earlier editor issues remain open: Epoch's current GPQA top score; the NHC PDF tables; the official IMO 2026 table; the OpenAI pages to check in a browser (6 Sep post, GDPval 84.9%, 50M/900M); secondary-only sources; Sonnet 5 and gpt-oss-120b prices; chart datasets still to build; the date of the 10 July brief; tagging calls; rendering section links inside footnotes; arXiv 2607.11020's venue and the un-refetched STaR/ROME details. The 0.016% item is resolved: it is now attributed to the blog and model card.

## Browser checks (7 November 2026, after the final edit)
Four primary pages that blocked the agents' fetcher were read in a browser and confirmed the manuscript's figures:
- OpenAI, "Introducing GPT-5.5": GDPval wins or ties 84.9% (footnote s5-gdpval now cites the page directly).
- OpenAI, "Research acceleration: The view inside OpenAI": 3.1 agent-workdays per human workday by mid-August; over half of successful 4-8 hour tasks involved one or more interventions (s6-openai).
- OpenAI, "Scaling AI for everyone": more than 900M weekly active users and more than 50 million consumer subscribers (s1-openai).
- IMO 2026 official individual results: 666 contestants, 7 with 42/42 (s4-imo).
- Epoch's GPQA Diamond page confirms Grok 4 at 87% (±2%) and the 69.7% PhD-expert baseline; it shows no current top score in text, so s4 stays as written.
Still unread: the full NHC 2025 verification PDF (s4-nhc rests on press coverage plus NHC's preview).
