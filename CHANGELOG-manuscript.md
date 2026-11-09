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

## Expert-note labels (8 November 2026)
Every expert note now carries a short label (`> **Expert note: Label.** ...`) shown in its folded summary, so Brief-mode readers can see what each note covers. In three notes the opening phrase became the label ("How the frontier is built", "Each better yardstick has limits", "Two smaller slips"); all other note text is unchanged. The section 6 label was reworded after review to match what the note says about the labs' thresholds.

## Third external review (8 November 2026)
Twelve findings from a third external review, each checked against the research files before applying. All applied; none rejected.

1. s1 closing: "AI has moved faster than nearly anyone predicted" became "AI has mostly moved faster than forecasters predicted". The old wording overclaimed two paragraphs after the SWE-bench Verified and biosecurity forecasts came in too high.
2. s9 closing: "false for most paid work" became "not yet true for most real freelance work". The Remote Labor Index measures freelance projects, not all paid work, and the score is rising.
3. s0-rli footnote: added that the leaderboard scores are graded by human evaluators comparing each AI deliverable with the human freelancer's work, not by an AI judge, and that section 5's 2.3 to 2.9 times inflation applies to AI judges. Support: r1-agi_metric.md describes the index as "judged by humans" and gives the leaderboard figures as "human-judged" against CAIS's LLM judge. The research does not say the graders were trained, so the footnote does not claim it.
4. s1 "about 6%": new footnote s1-share, tagged Our calculation (50 million ÷ 900 million = 5.6%, noting both inputs are "more than" figures). The "(our division)" arithmetic was removed from s1-openai so its Vendor-reported tag covers only OpenAI's own figures. s1-openai stays cited on the same sentence.
5. s6-labour retagged Estimate → Vendor-reported. Both s6-labour and s3-april are statements Anthropic made to METR, recorded in METR's Frontier Risk Report (r1-metr.md and r1-rsi.md quote both as Anthropic's), so neither is METR's own estimate and both now carry the same tag.
6. s1 expert note: "together, 18% have paid access" gained "(some have both)", since 10% + 9% is more than 18%.
7. s8-yearh footnote: "a 7-month doubling" became "the July brief's 7-month doubling (METR's widely cited historical rate)", per r1-scorecard.md (the brief's anchor used a 7-month doubling; METR's historical rate was about 7 months).
8. s4: "Ahead of trained people, with caveats" became "Ahead of trained or typical people, with caveats", because Waymo's comparison is with average drivers. In the jagged map data the step's label is now "Ahead of trained or typical people" (the chart's column name) and its heading check uses the new s4 heading.
9. s4: GenCast moved out of "Beyond the best humans" into its own paragraph, "Beyond the best non-AI method", keeping its footnote and the sentence that the comparison is with another computer model. In the jagged map data the GenCast row now has tier_label "Beyond the best non-AI method" and vs_machine: true (all other rows false) and stays in the rightmost column; the build script checks its footnote sits under the new heading and that vs_machine agrees with compared_group. The s4 chart placeholder now mentions the distinct marker. The s4 expert note adds detail (older, lower-resolution ENS) rather than repeating the moved text, so it is unchanged.
10. s0 opening: (a) the main text now says the ICPC 12/12 is OpenAI's own account and that, by Google DeepMind's account, its entry solved 10 and would have placed second and ICPC confirmed its answers as accepted (s0-gemini, now cited in the body; Vendor-reported, so the sentence is attributed to DeepMind like the OpenAI one). The s0 expert note was trimmed so it no longer repeats the 10 of 12 and second-place facts; it keeps the remote start, the limits of ICPC's review, the 139 teams and the problem no university team solved. (b) The three fact paragraphs under the stat cards were tightened and the roadmap links shortened. Every s0 footnote is still cited in the body and no fact was dropped. Brief body: 303 → 261 words (about 14% fewer; about 20% fewer before the new DeepMind sentence). The 40% target was not reached without dropping facts that the review asked to keep.
11. StatCards subtitle: the design-note wording became a reader-facing line, "Two results where AI is past the best humans, each with the fact that limits it, and one where it is not, with its growth since launch." The RLI card ends with growth, not a limit, so the line says so.
12. This entry.

Checks: node scripts/data/build_jagged_map.mjs, node scripts/check-manuscript.mjs and npm run build.

Review of these edits: the DeepMind sentence first stated ICPC's acceptance as fact, though the only source is DeepMind's own post; it now reads "Google DeepMind says its entry solved 10 and would have placed second, and that ICPC confirmed its answers as accepted." The tightened Remote Labor Index sentence gained "of them" ("on about 21% of them"), which the cut had dropped.

## Frontier chart: open-weight models still hosted (8 November 2026)
Reader report: DeepSeek-V4-Flash sat on the May 2026 frontier above and to the left of today's line, although the model is still available. Cause: DeepSeek retired its own endpoint and the snapshot only used first-party prices, so the model dropped out of the November 2026 snapshot. Fix: for open-weight models the maker no longer serves, use the cheapest reputable host's price (DeepInfra $0.09/$0.18 for V4-Flash; $0.26/$0.38 for V3.2), as already done for gpt-oss-120b. Footnotes s2-blend and s2-hist updated. Headline figures unchanged.

## Section 7 restructured for a general reader (8 November 2026)
Author's report: section 7 assumed readers had followed the November 2026 news, explained weights only in a passing clause, never said why a model editing itself would matter, and carried insider detail (model names, method names, a round-up of three bloggers' reactions). No facts, numbers, dates or footnote definitions changed; every s7 footnote is still cited.

1. Heading: 'What "models editing their own weights" means' became "Can an AI change itself?" (anchor `#s7` and number unchanged).
2. New opening: weights explained in plain words (a very large set of numbers learned in training that hold what a model knows and how it behaves), and why self-editing matters: it would be the most direct form of the AI-building-AI loop in section 6.
3. The four kinds of AI-driven weight change now come first, as the answer, in plain words. Method names left the brief body: SEAL and MASS became "research systems from MIT (2025) and Sakana AI with UC Berkeley (October 2026)"; ROME and MEMIT became "algorithms that write facts straight into a model", in use since 2022; "such as Text-to-LoRA" was dropped from the weight-generator line; the Darwin Gödel Machine left the code-rewriting line, which now reads "rewrite their own code, or code used to train them" because the remaining example, AlphaEvolve, improved code used to train the Gemini models behind it rather than its own code. The "no public demonstration" sentence and the chart placeholder follow the list.
4. The MIT CSAIL result follows as "the latest claim", with all its figures and caveats kept. Qwen3.5-0.8B became "a far smaller, freely available model with under a billion weights" and Gemma 3 270M "a second tiny model without that problem"; both names now open the expert note "How solid the weight-editing results are". "What is new is that an AI worked out the edit" moved here from the direct-edit line, adding that the edit was to another model, not Astra itself.
5. The Willison, Goedecke and Honnibal round-up moved into that expert note, merged with the existing Honnibal tally; footnote references unchanged.
6. The expert note "Limits of the self-training work" now names SEAL and MASS itself, since the body no longer does. New expert note "The other methods by name" maps Text-to-LoRA, ROME and MEMIT, and the Darwin Gödel Machine to the plain descriptions (cites s7-gen, s7-edit, s7-code; s7-code is now cited only here).
7. Ending kept: the forgetting result (tightened, same figures), no publicly known frontier chatbot updating its weights from use, FutureSearch's January 2033 median, and the closing headline, now "A more accurate headline than November's: ...".
8. Brief word count for s7: 453 to 443 (same counter as "Carried forward"); still over the 430 target. Review fixes also restored the scope word in "the authors conclude that here, editing could remove an obstacle", replaced "preprint" with "unreviewed ... study", and made the Gemma sentence say "editing gave no real gain" instead of an unclear "it".
9. Weights matrix: title now "In public work, models change their own weights only by training on material they wrote; every direct edit we found was to another model"; subtitle unchanged ("examples of AI changing model weights" was considered and rejected, since the chart's ROME and MEMIT entry is labelled "Algorithms, not AI models"). In scripts/data/build-weights-matrix.mjs, the evidence passages that quoted the old s7 wording now quote the new wording; the cell and entry text shown in the chart is unchanged (checked by diffing src/data/weightsMatrix.json with the evidence fields removed).
10. Other sections: no other section, footnote or the Sources section referred to the old s7 title or framing, so nothing else changed.

Checks: node scripts/data/build-weights-matrix.mjs, node scripts/check-manuscript.mjs and npm run build.

## Brief mode: sources folded into each section (8 November 2026)

Reader feedback: the numbered source chips in the running text help readers who know the provenance tags, not the general readers the Brief is for. In Brief mode the chips are now hidden in the text and in figure bodies (figure source lines and data tables keep them); sources stay in the folded "Sources for this section" list. Each entry in that list now starts with the claim it backs, quoted from the text at its first reference (built by `claimFor` in scripts/manuscript-plugin.mjs). Expert mode is unchanged. No manuscript text changed.

## Review comment: "fails" means working alone (8 November 2026)

Reader comment on the subtitle: say that the freelance result is for AI working fully on its own. The Remote Labor Index scores an agent's own deliverable against the human freelancer's, with no human help, so the subtitle, the s0 summary sentence, the s0 stat card and the s4 "Below humans" line now say "on its own"; the page description in index.html matches the subtitle.

## Review comment: opening stat-card subtitle (8 November 2026)

Reader comment: the subtitle of the opening cards read badly. "Two results where AI is past the best humans, each with the fact that limits it, and one where it is not, with its growth since launch" is now "Two results where AI has beaten the best humans, and one where it still falls well short. Each card ends with the catch, or with how fast it is changing."

## Review comment: ICPC card label (8 November 2026)

Not every reader knows the acronym, so the first stat card's label now leads with what the contest is: "World finals of the top university programming contest (ICPC), 2025" (was "ICPC 2025 world finals, the top university programming contest").

## Review comment: IOI counter-fact as a share (8 November 2026)

The ICPC card's "But" line and the matching s0 sentence now say "the top 1.5% of human contestants (5 of 330) still beat OpenAI's entry" at IOI 2025 (was "five of 330 human contestants beat OpenAI's entry"). 5 ÷ 330 = 1.52%; the card computes it from s0-cards.json.

## Review comment: Erdős card, "built on" rather than "checked" (8 November 2026)

Reader comment: that the disproof was checked is implied by including it; say that mathematicians have built on it. Card body: "Mathematicians have since built on it, and improved on the AI's construction within weeks" (sources s0-erdos, s0-erdos-context); its list header now reads "Nine mathematicians published a simpler version"; its "But" line keeps only OpenAI's false October 2025 claim. The s0 sentence now reads "Mathematicians have since built on it: nine, including Noga Alon and Tim Gowers, published a simpler version, and humans improved on the AI's construction within weeks. In October 2025, though, OpenAI had wrongly claimed…".

## Review comment: Erdős "But" line about capability, not OpenAI (8 November 2026)

Reader comment: OpenAI's false October 2025 claim says more about OpenAI than about what AI can do. The Erdős card's "But" line is now "Within weeks, humans found a better construction than the AI's", and the card body ends "Mathematicians have since built on it". The s0 sentence drops the October 2025 claim and ends "…and within weeks humans found a better construction than the AI's." The October 2025 episode stays documented in footnote s0-erdos-context and in the card data table.

## Review comment: "improved on the AI's construction" (8 November 2026)

Wording preference: the Erdős card's "But" line and the s0 sentence now say "within weeks, humans improved on the AI's construction" (was "found a better construction than the AI's").

## Review comment: freelance card's growth line (8 November 2026)

"Since launch: Up from 2.5% in October 2025, about 8.5 times higher in a year" is now "October 2025: Just 2.5%, when the index launched. The best score has grown about 8.5 times since."

## Review comment: freelance growth as a percentage (8 November 2026)

The card's growth line now reads "The best score has grown by 750% in 12 months" (computed from s0-cards.json as (8.5 − 1) × 100). Footnote s0-rli-growth adds "an increase of 750% in about 12 months (30 October 2025 to 7 November 2026)".

## Review comment: ICPC caveat out of the Brief text (8 November 2026)

"We found no ICPC statement on it" was too much detail for the Brief's opening paragraph; "OpenAI says" already marks the claim as the company's own. The caveat moved into the s0 expert note ("…submitted its answers to the World Finals local judge; we found no ICPC statement on its result") and stays in the stat cards' caveat line and in footnote s0-icpc.

## Review comment: shorter DeepMind ICPC sentence (8 November 2026)

The s0 sentence is now "Google DeepMind says its entry solved 10." Its second place and ICPC's acceptance of its answers moved into the s0 expert note ("DeepMind says ICPC confirmed its answers as accepted, but that review did not extend to validating its system or model; DeepMind says it would have placed second, by its own comparison with the 139 university teams…").

## Review comment: no mathematicians' names in the Brief text (8 November 2026)

The s0 sentence no longer names Noga Alon and Tim Gowers: "nine of them published a simpler version", with "published a simpler version" linking to the paper (arXiv:2605.20695) so the credit is visible without the source list. All nine authors stay named in footnote s0-erdos and on the Erdős stat card.

## Review comment: s0 summary sentence reworded (8 November 2026)

"So AI is past the best humans at some narrow tasks with an answer key, and, working on its own, still fails about four in five real freelance jobs" is now two sentences: "So AI already beats the best humans at some narrow tasks that have a clear right answer. Yet working on its own, it still fails about four in five real freelance jobs."

## Review comment: drop the tag sentence from s0 (8 November 2026)

Removed "Every number carries a tag saying who measured it." from the end of the s0 summary paragraph; the hero legend above already says it.

## Review comment: s1 opening sentence (8 November 2026)

"Most people meet AI through a free app." is now "Most people only use the free versions of AI apps."

## Review comment: s1 Reuters sentence reworded (8 November 2026)

"In a nine-country survey published by the Reuters Institute in October 2026, about 18% of people had any paid access to an AI tool" is now "A Reuters Institute survey across nine countries, published in October 2026, found that only about 18% of people use a paid AI tool, either paying themselves or through work or school" (the report: 10% pay themselves, 9% through work or school, 18% together).

## Review comment: s1 OpenAI subscriber sentence reworded (8 November 2026)

"OpenAI's own figures from February 2026 point the same way: more than 50 million consumer subscribers out of more than 900 million weekly ChatGPT users, or about 6%" is now "OpenAI's own figures from February 2026 tell the same story: of more than 900 million people using ChatGPT each week, only about 6% (over 50 million) pay for a subscription."

## Review comment: s1 agent-use sentence shortened (8 November 2026)

"Free users also do less: 11% of free-only users had used an AI agent in the past week, against 39% of those with paid access" is now "Paying users also do more: 39% had used an AI agent in the past week, against 11% of free users."

## Review comment: s1 Gallup sentence reworded (8 November 2026)

"…Americans rated AI worse than people at every task they were asked about, as they had in 2023" is now "…Americans still rated AI worse than people at every task on the list, just as in 2023."

## Review comment: s1 Gallup change sentence reworded (8 November 2026)

'The gap is closing slowly: the share saying "worse" fell by 5 to 7 points for driving, financial advice and medical advice' is now "Views are shifting only a little: for driving, financial advice and medical advice, 5 to 7 points fewer people now say AI does worse."

## Review comment: s1 Gallup change sentence, second pass (8 November 2026)

"…5 to 7 points fewer people now say AI does worse" mixed points and people; now "Views are shifting only a little: on driving, financial advice and medical advice, the share of people saying AI does worse fell by just 5 to 7 points."

## Review comment: Gallup shifts as "went from X to Y" (8 November 2026)

The s1 sentence now gives levels instead of point changes: "the share saying AI does worse went from 68% to 61% for driving, from 62% to 57% for medical advice and from 49% to 43% for financial advice." The article text gives only the changes; the levels come from the data file behind the article's own chart (Datawrapper fcHj9, dataset.csv, read 8 November 2026), now cited in footnote s1-gallup. They agree with the article's 7/6/5-point drops.

## Review comment: s1 forecasters paragraph shortened (8 November 2026)

Rewritten from 107 to 81 words: "Forecasters were too cautious as well. In 2022 the Forecasting Research Institute (FRI) asked top forecasters and AI experts about four AI tests. On average, they gave what actually happened only a 10% to 25% chance. They expected AI to win gold at the International Mathematical Olympiad (IMO) around 2030 to 2035; it did in July 2025. A newer FRI panel expected about 14% on a hard coding-contest test by the end of 2026; the best AI had 53.8% by May." The exact 9.7% (superforecasters) and 24.6% (experts) and the definition of superforecasters moved to the s1 expert note; the definition was also added at the s4 "Level with the best" line, which no longer follows a Brief-mode definition.

## Review comment: drop the 10%-25% sentence from the Brief (8 November 2026)

"On average, they gave what actually happened only a 10% to 25% chance" was wordy for the Brief and is gone; the paragraph now reads "In 2022 the Forecasting Research Institute (FRI) asked top forecasters and AI experts about AI milestones, including when AI would win gold at the International Mathematical Olympiad (IMO). They expected around 2030 to 2035; it happened in July 2025." The 9.7% and 24.6% averages, with footnote s1-xpt, now live in the s1 expert note.

## Review comment: when the LEAP panel forecast (8 November 2026)

The s1 sentence now dates the forecast: "A newer FRI panel, asked in late 2025, expected about 14% on a hard coding-contest test by the end of 2026; the best AI had 53.8% by May 2026." FRI's footnote 11 gives the elicitation window as November–December 2025 for LiveCodeBench Pro (June–August 2025 for FrontierMath); added to footnote s1-leap.

## Review comment: date the AI Digest survey (8 November 2026)

"A 2025 survey of 421 forecasters expected 88% … by year end" is now "A survey of 421 forecasters, taken from late November 2024 to January 2025, expected 88% … by the end of 2025". AI Digest's May 2025 update gives the window as 30 November 2024 to 20 January 2025; added to footnote s1-aidigest.

## Review comment: s1 "Not every forecast was too low" made Brief-level (8 November 2026)

Reader comment: too in-depth for the Brief. The paragraph is now "Not every forecast was too low. Forecasters overestimated some things too, such as scores on a well-known coding test in 2025 and how much AI would help students with biosecurity tasks. FRI also notes that its method spots forecasts that were too low more easily than ones that were too high." The specifics (survey size and dates, 88% vs 80.9% on SWE-bench Verified, 16–40% vs 5.2% biosecurity uplift, and why FRI's method leans toward underestimates) moved unchanged into a new s1 expert note, "Forecasts that came in too high". The forecast-vs-actual chart right below still shows the numbers.

## Review comment: forecast chart title (8 November 2026)

The s1 forecast-vs-actual chart title is now "Most of these forecasts underestimated AI progress, but not all of them" (was "…came in below the outcome, but not all of them").

## Review comment: forecast chart subtitle (8 November 2026)

Shortened to "What forecasters predicted for seven AI questions, and what happened. Most rows are test scores; the biosecurity row is the share of students who finished the tasks with AI help." The still-open question no longer needs a mention here: the chart labels it "Not yet resolved (measured in hours)".

## Review comment: forecast chart, one forecast dot and an explicit gap (8 November 2026)

Rows with several forecaster groups (FRI's experts and superforecasters; the three biosecurity groups) drew one dot per group plus a range bar, so the size of the miss was hard to read. Each row now has one forecast dot (where groups differed, the forecast closest to the outcome, i.e. the smallest miss) and the outcome label states the gap: "53.8% · +40 points", "5.2% · −11 points", "3.1 h · −0.3 h". The legend explains both. Every group's forecast is still listed in the row tooltip and the data table.

## Review comment: forecast chart caveat (8 November 2026)

Shortened to "These are selected questions. Forecasts that were too low show up sooner than ones that were too high, and the AI Digest forecasters leaned optimistic." The full explanation is in the s1 expert note "Forecasts that came in too high" and footnote s1-xpt.

## Review comment: why a 2025 trial in late 2026 (8 November 2026)

Reader question: is a 2025 trial still the best evidence? It is the most-cited randomised measurement; METR's late-2025 follow-up (published February 2026) is newer but inconclusive, and the redesigned study has no results date. The paragraph now says so: it opens "Faster progress on tests has not yet clearly shown up as faster work. The best-known measurement comes from METR…", dates the first trial "early-2025", and says "A larger follow-up in late 2025, with newer tools, pointed toward a speedup, but METR calls the result 'an unreliable signal' and is redesigning the study."

## Review comment: forecast chart says when each forecast was made (8 November 2026)

Each row's second line now reads "Asked <when> · for <deadline>" (e.g. "Asked Nov–Dec 2025 · for end-2026", "Asked Nov 2024–Jan 2025 · for end-2025", "Asked Apr–May 2026 · for end-2026"), and the plain-English name ("Hard contest coding") replaces the benchmark name on the row, which stays in the tooltip and data table. The dates are added in scripts/data/build_forecast_vs_actual.py, which checks each against the footnote that states it: s1-leap (now also dating the METR question, April–May 2026), s1-aidigest (30 November 2024 to 20 January 2025) and s1-bio (now noting FRI asked in mid-2025).

## Review comment: date the Danish study (8 November 2026)

"In Denmark, official records of workers' earnings and hours rule out AI chatbots changing either by more than 2% in the two years after ChatGPT launched" is now "A Danish study of official pay and hours records from 2023 and 2024, before today's models, rules out AI chatbots changing either by more than 2%." The period is the one the s1 expert note already gives (data cover 2023–24).

## Review comment: s2 "like with like" (8 November 2026)

"…only means something if you compare like with like" is now "…only means something if you compare AI models of the same quality."

## Review comment: s2 two tests, shorter (8 November 2026)

"We use two tests. Cheaper means the same capability for less money. Better means more capability for the same money." is now "We use two tests: the same capability for less money (cheaper), and more capability for the same money (better)."

## Review comment: GPT-5 release date (8 November 2026)

s2 now says "GPT-5 (released August 2025) sits at 150"; release date 7 August 2025, as in research/data/frontier_epoch.csv.

## Review comment: say why the chart is not cost per task (8 November 2026)

The "A second view: cost per task" paragraph under the s2 chart now says cost per task would be the better measure, and why the chart cannot use it: no source measured it the same way across the year; Artificial Analysis changed its test several times in 2026, its tasks now use far more tokens (median 35k to 59k output tokens per task, v4.3 to v5, per its v5 announcement, added to footnote s2-aa-versions), and its current version does not score most late-2025 models such as GPT-5. Epoch's measurement follows as "the closest long-run evidence". Checked while editing: the v5 announcement does not itself say per-task costs are incomparable across versions (a research note had claimed it did); the footnote keeps that as our inference.

## Review comment: recent evidence on AI and real work (8 November 2026)

Reader comment: with no recent data, the work paragraph had a big hole. A research workflow searched four angles (trials, labour data, company rollouts, macro) and checked 24 candidates against their primary sources; I re-checked the two used in the Brief. The s1 paragraph now adds: "Newer evidence, from 2026, points to gains, but small or narrow ones. At one software company, developers who started using AI coding tools finished about 12% more code changes, in records running to April 2026; it was not a controlled experiment, and more code is not the same as more useful work. In mid-2026, executives at nearly 9,000 firms in seven countries estimated that AI had added about 0.2% a year to their productivity growth over the past three years." New footnotes: s1-2xmandate (arXiv 2607.01904, Verified), s1-firms (NBER w34836, Estimate), and, in the expert note "Limits of the work and usage studies", s1-msft (Microsoft's own rollout study, Vendor-reported), s1-boe (Bank of England, November 2026, Estimate) and s1-stlfed (St. Louis Fed, self-reported time saved, Verified). Left out of the Brief: vendor-run or lab trials (Google patent-drafting RCT, Figma), studies with 2024 data (Alibaba, Google IDE, online retail, AI scribes), and employment studies (Stanford/ADP, Census, NBER w35796), which measure jobs rather than speed.

## Review comment: shorter cost-per-task paragraph (8 November 2026)

The s2 "A second view: cost per task" paragraph is cut to three sentences: "Price per token ignores how many tokens a model uses to reach an answer, so cost per task would be a better measure. No source has tracked it consistently for these models over the whole year. The closest is Epoch AI, which finds that the cost of answering a test question at a fixed accuracy falls about 13 times a year." The Artificial Analysis details and Epoch's method moved into a new s2 expert note, "Why not cost per task".

## Review comment: section 2 tightened for the Brief (8 November 2026)

Whole-section pass on s2's Brief text (526 to 458 words) and the frontier chart's title, subtitle and caveat. No figures, dates or footnotes changed; each paragraph keeps its claims, in fewer and plainer sentences (e.g. the three-step "same capability, less money" sentence is now one: "$3.44 … in November 2025 (GPT-5 itself), $1.13 in May 2026 (Gemini 3 Flash) and $0.20 today (GPT-6 Luna or Claude Haiku 5.5): about 17 times cheaper in a year"). The ±2-3 point credible-interval detail left the chart caveat; it stays in the "How the frontier is built" expert note.

## Review comment: s3 time-horizon definition reworked (8 November 2026)

The s3 opening now reads: "The most-quoted measure of AI progress is METR's 'time horizon': how long a software task can be, measured in a skilled person's working time, before an AI agent fails at it more often than it succeeds. A 2-hour horizon means the AI completes about half of the tasks that take a person two hours. It measures how hard the tasks are, not how long the AI works." The procedural description ("take a set of tasks, time them, find the length…") gave way to a definition plus a worked example.

## Review comment: what "falls 13 times a year" means (8 November 2026)

"…the cost of answering a test question at a fixed accuracy, which falls about 13 times a year" is now "…which tracks what it costs to answer a test question at a fixed level of accuracy: each year, that cost drops to about a thirteenth of what it was."

## Section 2 tightening: fixes from the fidelity check (8 November 2026)

An adversarial check of the s2 tightening found one change in meaning and several looser claims; all fixed. Restored: the scope of Google's 32 billion tokens a minute ("through the services it sells to developers", i.e. first-party model APIs); "cheapest" in the chart title; Argon's starting prices and the attribution of "introductory" to Google; "list" prices and "not today's"; "for these models" in the cost-per-task claim; "no maximum" on the ECI; the ±2-3 point reason for the chart's noise threshold and the 3:1 blend in the chart subtitle. Reworded: the Pro-tier sentence no longer implies OpenAI raised Pro prices (one Pro model replaced another; prices did not change); long sentences were split; "effort setting", "snapshot" and "log scale" are explained in plain words.

## Review comment: s2 caveat list heading (8 November 2026)

"What these numbers leave out:" is now "Why price per token is an incomplete comparison:".

## Review comment: shorter Gemini price-rise sentence (8 November 2026)

Now one sentence: "Some prices are rising: Google will double the price of Gemini 4 Argon on 1 December 2026, ending what it called an introductory price, and of two cheaper Gemini Flash models on 1 January 2027." The exact before-and-after prices stay in footnote s2-argon.

## Review comment: the total bill, and what capital spending pays for (8 November 2026)

The s2 closing paragraph now says what the $720-740 billion buys and that it is not all AI inference or training: "…expect to spend about $720-740 billion in 2026 on data centres, chips and other equipment. That pays for training new AI models, for running them for users (what the prices above cover), and for the rest of their businesses." The Google token figure is shortened to "more than four times as many tokens as a year ago" (the 32 billion a minute stays in the footnote). Footnote s2-capex adds that capex covers non-AI cloud and, for Amazon, logistics, and that none of the four reports the AI share or the training/inference split.

## Review comment: Jevons paradox expert note (8 November 2026)

New s2 expert note, "Cheaper units, bigger bill: the Jevons paradox": names the pattern (Jevons, 1865, on coal and steam engines), quotes Satya Nadella invoking it in January 2025 (new footnote s2-jevons, Vendor-reported), and says the briefing's figures fit the pattern but do not prove it: token volume up more than four times while the price of fixed capability fell about 17 times, so spending on those tokens could have fallen; no public figure gives total spending on AI use; buyers move to newer models; capex is a bet on future demand.

## Brief pass over sections 3-9 and Sources (8 November 2026)

At the editor's request, the review rules from sections 0-2 were applied to the rest: one editor agent per section proposed exact replacements, a second agent checked each against the footnotes, expert notes and data scripts (fixing or rejecting 6 edits), and 83 edits were applied. Brief prose: s3 528 to 486 words, s4 551 to 523, s5 543 to 486, s6 607 to 592, s7 449 to 448, s8 396 to 437, s9 423 to 489, Sources 199 to 133. s8 and s9 grew because jargon got plain glosses and evidence got dates. Details moved out of the Brief went into expert notes, including four new ones: "Beyond the public curve" (s3), "Robots in Epoch AI's review" (s4), "Signpost details" (s9) and a method note in Sources. Chart titles, subtitles and caveats were tightened in MetrCurve, JaggedMap, RsiDashboard, WeightsMatrix and SignpostStamp; build-weights-matrix.mjs was updated to the new s7 wording and weightsMatrix.json regenerated (all passages verified). All other data scripts reproduce their outputs unchanged. Footnotes: 141, none lost.

## 2026-11-08 — s4 opening sentence (review comment)
- Replaced the saw-blade metaphor with a plain, shorter sentence: "Tested against people, AI is beyond the best humans at some tasks and far below them at others."

## 2026-11-08 — s4 "answer key" (review comment)
- Jagged-map chart title and the matching s4 sentence: "with an answer key" became "with one clear right answer".

## 2026-11-08 — s4 weather heading (review comment)
- "Beyond the best non-AI method" became "Improving on the best known algorithms" in the s4 text and the jagged-map tier label (build_jagged_map.mjs, jagged_map.json regenerated).

## 2026-11-08 — s3 Brief cut roughly in half (review comment)
- Brief prose 486 → 246 words. Kept: what the time horizon measures, 4 min (GPT-4) → 12 h (Opus 4.6), the 2024 speed-up (8½ → 3½ months), the 16-hour limit and the frozen leaderboard, and METR's 1.9x with its range, the 1.1x low end and the redaction caveat.
- Moved to expert notes, unchanged: the 2-hour example, o3/GPT-5/Mythos points, the 80% figures (new note "What the horizon means, and more data points"); the Epoch single-speed-up sentence (refit note); task-suite counts, 16% cheating, Sol 11 h / 270 h ("Beyond the public curve"); internal-data scope, AECI and the 1.4x figure ("What METR's 1.9x rests on"); the 80% attribution and Anthropic's spring 2026 statement (new note "Why the speed-up, and Anthropic's spring view"). All 16 footnotes still referenced.
- Drafted by three independent agents, judged, then checked for fidelity and rules; one fix applied ("1.1" → "1.1 times").

## 2026-11-08 — s4 "Ahead of trained or typical people" paragraph (review comment)
- Brief paragraph cut to one headline per example (GPQA, Pakistan trial, Waymo); kept Waymo's 95% and the freeway pause. The exact figures (about 70% vs 87%, 71.4% / 42.6% / 82.9%, 270 million miles through June 2026) moved unchanged into the expert note "What the right-hand dots compare against".
- Closing paragraph: "this saw blade" became "this uneven picture", following the earlier removal of the saw-blade metaphor.

## 2026-11-08 — s4 forecasting: name the system (review comment)
- "the best AI forecasters" → "the best AI forecaster", plus a plain sentence that it is Cassi, a system that searches the web and combines several models, not a single model.
- Footnote s4-forecast: adds FRI's description of Cassi (multi-stage pipeline, retrieval, ensemble of models, a final LLM; underlying models not named). Checked against the FRI post on 8 Nov 2026.

## 2026-11-08 — s4 closing paragraph wording (review comment)
- "Most dots on the right / on the left" became "Most tasks where AI is superior / where it is behind".

## 2026-11-08 — s5 GDPval sentence (review comment)
- Brief keeps the two GDPval figures (47.6% in September 2025; 84.9% for GPT-5.5 in April 2026). "220 public tasks" and the caveat that OpenAI did not say whether the April score used the same tasks moved to the expert note "Each better yardstick has limits".

## 2026-11-08 — s5 closing sentence made concrete (review comment)
- Replaced "Comparing AI with people is still useful, as long as each comparison is reported on its own, not folded into one finish line." with a concrete example from the "Definition of AGI" scores (GPT-5: 57% overall; 10/10 maths, 0/10 long-term memory storage; footnote s5-hendrycks) and a pointer to the section 4 map.

## 2026-11-08 — s4 IMO 2026 paragraph researched and shortened (review comment)
- Research (8 Nov 2026): no IMO 2026 AI result has been confirmed by the IMO or an independent party. imo-official.org has no statement on AI entries; MathArena has no IMO 2026 evaluation.
- Correction: our footnote said only Xiaohongshu claimed IMO grading. Huawei also claims it, and its announcement quotes a congratulation from IMO President Gregor Dolinar that the IMO has not published. NVIDIA also says official IMO graders gave its Nemotron 3 Ultra system 30/42. Anthropic's Claude Opus 5 system card reports 42/42 on its own grading.
- Brief: "Huawei, Xiaohongshu and others reported perfect scores of 42 out of 42 for their AI. The IMO has confirmed none of them. Even if true, it is a tie: 7 of the 666 students also got full marks."
- Expert note "Caveats on the test-score comparisons" and footnote s4-imo updated with the above; jagged-map row text updated to match.

## 2026-11-08 — s6 dashboard: explain the log scale (review comment)
- METR panel of the s6 dashboard: "Log scale." became "Each step up the scale multiplies the length, so a straight line means it keeps doubling at a steady pace."

## 2026-11-08 — s6 dashboard: what METR's 1.9x measures (review comment)
- METR panel description now says the figure is the speed-up in Anthropic's progress after October 2025, not a direct measure of AI's help, and adds METR's guess that perhaps 80% of the speed-up comes from AI, with high uncertainty (footnotes s6-accel, s3-attrib).

## 2026-11-08 — s6 training-code speedup: say what is sped up (review comment)
- Dashboard panel and the s6 Brief sentence now explain the test: the model is given slow AI-training code and asked to make it run faster; the score is how many times faster it runs afterwards (skilled person: about 4 times in four to eight hours; footnote s6-speedup).

## 2026-11-08 — s6 dashboard: what OpenAI's agent-workdays mean (review comment)
- OpenAI panel description now explains the ratio in plain words (agent running time, summed across agents running at once, per 8-hour human workday; 3.1 ≈ 25 agent-hours per human day) and says it measures time, not the share of work done by AI (footnote s6-openai).

## 2026-11-08 — s6 thresholds: AI already speeds up work (review comment)
- s6 Brief: the thresholds sentence now says AI is already speeding up the labs' work, and that the thresholds are for a much bigger speed-up (Anthropic's: a doubling of its normal rate of progress, footnote s6-rsp). Dashboard strip heading reworded to match.

## 2026-11-08 — s2 six-month estimate (review comment)
- New Brief paragraph "Six months from now?" and footnote s2-projection (Our calculation): by about May 2027, GPT-5-level AI between about 5 cents (past year's pace continues) and 20 cents (nothing cheaper arrives); best score at $4 or less between 169 and about 178. Epoch AI's published rates (13x a year, slowing to 4.7x for older levels; 14 ECI points a year) fall inside both ranges.
- Chart: a fifth view, "May 2027 (estimate)", shows today's frontier plus two hatched ranges (never a fourth line), with its own caveat, legend item and readout rows. Numbers computed and asserted in scripts/data/build_frontier_snapshots.py (headlines.projection).
- Method from a research workflow (trend fit, published forecasts, adversarial review); dropped from the agents' proposal: an unverified 90% interval for Epoch's 14-points rate, and a claim that big labs never cut list prices.

## 2026-11-08 — s6 Princeton study: name the models (review comment)
- Brief: "AI agents, mainly Claude Opus 4.8, did all the engineering". Footnote s6-princeton now quotes the paper (arXiv 2607.27191v2): Claude Opus 4.8 (extra-high reasoning) on OpenClaw for both experiments; a robustness rerun with GPT-5.6 Sol on Codex reproduced the failures. Checked 8 Nov 2026.

## 2026-11-08 — s6 open-weight labs (two review comments)
- New self-report bullet "Labs that release open models": MiniMax (80% of newly committed code, Feb 2026), Alibaba (33 automated self-improvement cycles on Qwen3.8-Max, Sep 2026), Mistral's CEO to the French National Assembly (May 2026); plus Epoch's estimate that open models trail closed ones by about four months (May 2026). Footnotes s6-open-claims, s6-open-gap.
- Thresholds paragraph: "each lab" → "each of the three big closed labs"; added that only Meta among open-model labs has an AI R&D threshold (and withheld Muse Spark's weights), and FLI (July 2026) found no safety framework at DeepSeek, Z.ai, Alibaba or Mistral. Footnote s6-open-th.
- From a research workflow with per-source verification (46 verified, 6 rejected); the unofficial DeepSeek transcript is mentioned in the footnote but not used.

## 2026-11-08 — s7 four-kinds list shortened (review comment)
- Each kind now starts with a short name (training on its own output, weight generators, direct edits, code rewriting) and one plain clause. The "research systems from 2025 and October 2026" detail stays in the expert note (SEAL, MASS). build-weights-matrix.mjs passages updated; weightsMatrix.json regenerated.

## 2026-11-08 — s8 summary sentence (review comment)
- "The direction held. Where we put numbers on the future, we were too cautious. We also described three of our own headline figures wrongly." → "It is playing out as we described, but our numbers and estimates were too conservative." (the three misdescribed figures are covered below the table).

## 2026-11-08 — s8 report card: takeaways in Brief, full table in an expert note (review comment)
- Brief now lists six short takeaways (tests wear out faster; ARC-AGI-3 beyond our range; task-length doubling held but is uncheckable; AI research speed-up, different measure; spending did not slow; three of our figures misdescribed).
- The full eight-row table moved unchanged into a new expert note, "The full report card" (tables render inside notes; checked at desktop and 375px).

## 2026-11-08 — s9 intro sentence explained (review comment)
- "Eight checks would show whether AI's lead is spreading beyond tests or stalling." now explains what the checks are and what the "Spreading" and "Stalling" labels in each item mean.

## 2026-11-08 — s9: ARC Prize competition check moved out of the Brief list (review comment)
- The 4 December 2026 ARC Prize competition item (one benchmark, compute-limited entries) moved unchanged into the "Signpost details" expert note; the Brief list now has seven checks, renumbered, and the intro says "seven".

## 2026-11-08 — s9 forecast item reframed (review comment)
- The 31 December 2026 METR-forecast check no longer frames a shortfall as the outcome to watch: if the 2024-on trend held, newer models would be far past 3.4 hours, so the questions are by how much and whether METR measures them at all. Footnote s9-leap adds our calculation (about 5x in eight months, roughly 15 hours, assuming the 80% horizon doubles as fast as the 50% one).

## 2026-11-08 — s7 Brief cut by about 70% (review comment)
- Brief prose 428 → about 130 words: what weights are; no public case of a model directly editing its own weights; the one narrow real form (training on its own output); the November MIT claim (Astra edited another, smaller model; 8% → 48%, mostly a repair); no frontier chatbot learns as people use it; FutureSearch's January 2033 median.
- Everything else moved unchanged into expert notes: "Four kinds of work on changing models" (new, holds the four-kinds list), "The November post, and what is still hard" (new), plus the existing notes. All 15 s7 footnotes and all 43 weights-matrix passages still present (script re-run OK).
- Drafted by three agents, judged, checked for fidelity and rules; one fix applied (gloss "frontier (most capable)").

## 2026-11-08 — s9 forecast item shortened (review comment)
- Brief item cut to three short sentences (forecast 3.4 hours, last measurement 3.1 hours in April, trend points far past, METR stopped updating). The full wording (80% of tasks, when forecasters were asked, link to section 1) moved to the "Signpost details" expert note.

## 2026-11-08 — s9 price item: trend, not a predicted reversal (review comment)
- "Spreading: cheaper still. Stalling: other companies copying Google's price rise" → what the past year's pace implies (about 5 cents by May 2027, section 2's estimate, footnote s2-projection) and that staying near 20 cents would mean the fall has slowed.

## 2026-11-08 — s9 Remote Labor Index check: explicit expectation (review comment)
- Item now gives the past year's change (2.5% → about 21%), what the same pace implies (about 30% by May 2027; our calculation in s9-rli, steady points per year), and what would count as a speed-up (well above 30%) or a slowdown (still near 21%). Replaces the "one in three" / "flat into mid-2027" thresholds.
- s9 intro now says each check gives what to expect if the trend continues and what would mean speeding up or slowing down; the last "Spreading/Stalling" labels (young-worker jobs item) rewritten in plain words to match.

## 2026-11-08 — s9 METR task-set item shortened (review comment)
- "METR's public measure of task length stops at models from April 2026. New tasks, or a second AI company sharing its data, would show outsiders whether progress is speeding up, as METR found inside Anthropic."

## 2026-11-08 — s9 threshold item: self-reports need confirmation across labs (review comment)
- Item now says a lab's own declaration is hard to check, and that similar speed-ups at other labs, including Chinese and European ones (about four months behind, Epoch; footnote s6-open-gap), would be more telling. The three revisions and the OpenAI/Google ratings moved to the "Signpost details" expert note.

## 2026-11-08 — s9 young-workers item: trend and expectation (review comment)
- Reworded; now states the trend (gap 15% at the July 2025 vintage → about 19% with data to June 2026), what the same pace implies (about 21% in data for December 2026; our calculation added to s9-canaries) and what would count as faster or fading.

## 2026-11-08 — s4 cost of AI vs experts (owner request)
- New short Brief paragraph "What about cost?": in GDPval, AI's raw output cost about 470 times less than an expert's, but only about 1.2 times less once an expert checked it and redid what fell short (footnote s5-gdpval, Table 2).
- New expert note "The cost comparison in detail": speed and cost under raw, try-once and try-n workflows; OpenAI models only; one-shot tasks; September 2025 figures.

## 2026-11-08 — s4 map: "A year ago / 6 months ago / Today" buttons (owner request)
- Research workflow (12 rows x 2 dates, each placement and source checked by a second agent; 7 entries corrected by the checker) placed every row as it stood on 7 Nov 2025 and 7 May 2026, using only evidence published by then; predecessor tests stand in where today's test did not exist (Humanoid Olympics for robots, ARC-AGI-3 preview, IMO 2025, a 2024 US diagnosis trial, AlphaEvolve for research maths).
- New expert note "The map 6 and 12 months ago" and 15 new footnotes (s4-h-*), each tagged and dated. Data in research/data/jagged_history.json; build_jagged_map.mjs checks every number against the footnotes and that no evidence postdates its view.
- JaggedMap.jsx: date buttons; past views show that date's dot, a dashed circle where the row stands today, the dated details in the card, and their own caveat; legend adds Estimate and "Where it stands today" in past views. Checked at desktop and 375px, no console errors.

## 2026-11-08 — s0 ICPC vs IOI made explicit (review comment)
- The opening paragraph and the ICPC card's "But" line now say the IOI is a different contest (for secondary-school students), so "5 of 330 beat OpenAI" no longer reads as contradicting "12 of 12 at ICPC".

## 2026-11-08 — s0 RLI card: "8.5 times" instead of "750%" (review comment)
- Card line now reads "Just 2.5% when the index launched. In 12 months the best score grew about 8.5 times, to 21%." (same figures as footnote s0-rli-growth; a 750% increase is 8.5 times the starting value).

## 2026-11-09 — s9 forecast item names the 80% success rate (review comment)
- "Forecasters expected AI to reach 3.4 hours on METR's task-length measure (at an 80% success rate) by the end of 2026." The 3.4 and 3.1 hours are both 80% horizons (footnote s9-leap).

## 2026-11-09 — Three fact fixes (review): GPQA row, 1.9x vs the doubling threshold, open models
- **s4 science-questions row no longer goes backwards.** Today is now Gemini 4 Argon, 96% in Epoch AI's testing (run started 13 October 2026; several other 2026 models within error), replacing Grok 4's 87% (July 2025). Grok 4's 87% moves to the 12-months-ago view (new footnote s4-h-gpqa-2025, which carries the xAI-compensation note), so the row reads 87% → 95% → 96%. Footnote s4-gpqa-ai rewritten (it had said 94–96% figures were not used); Brief sentence dated "In tests run in October 2026". build_jagged_map.mjs now fails if a past view is marked "same as today" while today's evidence postdates it, or if a past view rests on newer evidence than today's row.
- **s6: how METR's 1.9x relates to Anthropic's threshold.** The threshold is now described as progress twice as fast as the fastest pace seen without significant AI help, plausibly driven by automated research (RSP v3.4 pp. 9–10, footnotes 8–9, quoted in s6-rsp). New Brief sentence: METR's 1.9 times is a related but looser measure (Anthropic's own pace from 2024 to October 2025, all causes), though METR guesses most of the speed-up comes from AI and thinks the threshold may already have been crossed. Expert note gives the baseline and attribution differences, METR's "do not pay special attention to the thresholds", the 1.4x all-developer figure and the review's "overstated" / "plausible" / "lean toward" wording (new footnote s6-metr-review).
- **s6 and s9 item 6: open models.** Epoch's four-month gap is open-weight vs closed models (window 1 January–28 May 2026), not Chinese or European labs; the s6 bullet and s9 item now say so, and that the best open model on every day of 2026 was Chinese (our check of Epoch's eci_scores.csv, added to s6-open-gap with the three 2026 Mistral models, 5–10 ECI points behind). The "only Meta" sentence is replaced: OpenAI (gpt-oss), Google (Gemma) and Meta also release open models and have similar written thresholds; Meta released Muse Spark Open's weights on 15 October 2026, so "Meta kept its newest model's weights closed" was out of date. FLI's July 2026 index: "no published safety framework" at DeepSeek, Z.ai, Alibaba and Mistral; Moonshot (Kimi, the best open models for much of 2026) and MiniMax were not rated. s6-open-th rewritten with the gpt-oss card, Gemma 4 report, Meta framework v2.1 and the Muse Spark Open release.
- Checked by two research-and-verify passes (sources re-fetched) and a final two-lens check of the applied diff.

## 2026-11-09 — s2 May 2027 estimate covers the whole price range (owner request)
- **Method replaced.** The old estimate gave two ranges, at ECI 150 and at $4, each from "nothing new" to "the past year's pace continues". The new estimate covers every price: the top score follows its straight two-year trend from where the trend line is today (no pause: 170.1, 16.9 points a year, 178.5 by May 2027); each price stays as far behind the top as today (today's best score at 1.25 × the price, plus half a year of trend); and the same capability keeps getting 17.2 times cheaper a year. Method and test in new `scripts/data/frontier_projection.py`, results in `research/data/frontier_projection_backtest.json`; `build_frontier_snapshots.py` uses the same code and asserts the published numbers.
- **Tested on past data.** Frontier rebuilt month by month from May 2025 (matches all three snapshots); six-month estimates from November 2025 to May 2026 at nine prices: 63 comparisons, average miss 3.7 points, 1.3 points too high on average. Likely range 5.6 below to 5.5 above the estimate; it held 71% of past outcomes.
- **Numbers.** GPT-5 level still about 5 cents ($0.048). Best score at $4 or less about 177 (likely 172–183), down from "about 178" as the top of the old range. New: $0.16 to $0.96 would buy about 168.7, roughly today's top score.
- **Brief.** "Six months from now?" paragraph rewritten around the new estimate and its assumptions. s9 item 3 now says "on our estimate" instead of "if the past year's pace continues".
- **Expert.** New expert note "How the May 2027 estimate is made"; footnote s2-projection rewritten with the method, test, range and the Epoch comparison rates.
- **Chart.** The "May 2027 (estimate)" view now shows a dashed step line and a hatched likely range across all prices, starting at about 5 cents, with markers and labels at ECI 150 and $4; legend, readout, caveat and screen-reader summary updated. research/README.md has the method, the test and the alternatives tried.

## 2026-11-09 — Reviewer feedback: caveats, projection tags, map axis, wording, repetition
- **Caveats surfaced in the Brief.** s5: OpenAI's 84.9% for GPT-5.5 is its own figure, "maybe not on the same tasks; we found no outside check". s4 cost: dated and fair, "In OpenAI's September 2025 test ... GPT-5 ... about 470 times less ... only about 1.2 to 1.6 times cheaper, depending on how many tries it got first", no public test of newer models; the cost note adds o3 and GPT-4o and the paper's limits (footnote s5-gdpval, arXiv 2510.04374 Table 2). s6: METR's no-bottlenecks view now says METR "is not confident" in it; s9 note and s9-accel use METR's own words ("so we are not confident in our current assessment") instead of "low confidence", which METR does not say.
- **Projections tagged as ours.** The s9 estimates (about 15 hours, about 30% by May 2027, about 21% for December 2026) moved out of the source footnotes into new Our calculation footnotes s9-leap-proj, s9-rli-proj and s9-canaries-proj, as with s1-share.
- **Map axis.** "Ahead of trained or typical people" now sits left of "Level with the best" (beating trained or typical people is a weaker result than matching the best), so no row moves left over time; IMO goes from 2025 gold (ahead of most contestants) to 2026's unconfirmed tie with the best. s4 paragraphs reordered to match; the "right-hand dots" wording replaced. build_jagged_map.mjs now fails if a row moves left across the three views. The IMO row is "Math olympiad (IMO)" in every view, with the year in each value. The 2025 IMO gold (s1-imo-2025, s4-h-imo2025) is now Verified: IMO coordinators graded it and the IMO President confirmed the score.
- **Wording.** s2: the top model's price "went up, then down". s8: the October 2026 coding test is described as repaired (flawed tasks fixed or dropped, loopholes closed); s8-swev2 adds the hardened protocol. s8: doubling "every 3½ to 4 months", matching s3. s1 Gallup: "worse than a person" was the most common answer for every task, not always a majority (financial advice: 42% same + 15% better = 57%; footnote gives the split). s9: "seven things to check ... some by a set date, others monthly or at any time". s4: one clause links 2025 gold to the 2026 claims. Hero, footer and the Sources paragraph no longer say every number is visibly tagged in Brief mode.
- **Repetition.** METR's 1.9x is told in full only in s3; s6 states it once (in the threshold comparison), s8 and s9 refer back. The time horizon is defined in s3 only; s5 and s6 refer back. s4 introduces GDPval with a link to s5.
- Final check fixes: the 2025 IMO Verified tag now rests on Reuters' independent report that "IMO judges certified the results" (s1-imo-2025, s4-h-imo2025), and the s1 note no longer frames that grading as the lab's claim; the s4 IMO paragraph leads with 2026 and adds 2025 as the contrast ("not yet level with the best: 26 students scored higher"); in past views the IMO row is compared with "most IMO contestants" (trained people), and the map's "Trained experts" group is now "Trained people"; the map caveat is position-free again (covers the hurricane dot); the Sources paragraph says footnotes are listed where first cited; s5's time-horizon back-reference says what it measures; Gallup's financial-advice "worse" led by one point.
- Map note "The map 6 and 12 months ago": one sentence flags the year-ago research-math dot (AlphaEvolve, vendor-reported, a search for better constructions) as the most debatable placement and says why it stays at "Beyond the best humans".

## 2026-11-09 — Brief trimmed for length (owner request; draft by Argon, reviewed)
- Brief down from about 4,480 to about 3,700 words (hero: 20 → 17 min read). Detail moved into expert notes, not deleted; every footnote is still cited.
- s1: opening keeps Reuters 18% (now "the Institute concludes") and OpenAI's 6%; the 39% vs 11% agent-use figure moves to the work-studies note. Gallup's "not always a majority" detail stays in the footnote. Work studies rewritten: the careful studies are old by AI standards (METR early-2025 tools: 19% slower, felt 20% faster; Danish 2023-24 records: under 2%); no reliable controlled study of newer models since (METR's late-2025 follow-up pointed toward a speedup but METR calls it unreliable); the newest evidence is self-reported (firms, 0.2% a year). The one-company 12% study moves to the note.
- s2: "Six months from now?" leads with the results. "Cost per task" and the three price-per-token caveats merged; the bullets move to the "Why not cost per task" note. Gemini 4 Argon's price rise leaves the Brief (still in "How the frontier is built").
- s4: hurricane lines merged; "What about cost?" moves to the note, now "Cost when a human checks the work".
- s5: one sentence on GDPval cost (GPT-5 only 1.2 to 1.6 times cheaper once an expert checks the work); the Remote Labor Index reference keeps its result ("where the best agent still fails most").
- s6: 836 → about 500 words. Threshold detail (Anthropic's definition, METR's 1.9x comparison, OpenAI and Google ratings, the 56% vs 85% test) moves to "The labs' AI R&D thresholds and self-reports"; the Brief keeps one sentence, citing s6-rsp, s6-openai-th and s6-google-th. Open-model safety frameworks get their own note. The 3x → 52x speedup test moves to "Speedup test and bottleneck caveats". Alibaba "over a month" now matches its footnote.
- s9: items 1 and 5 (both METR) merged, so six items; item 5 drops the repeated four-month gap; item 6 shortened. Intro now "Check back on these six over the coming months to see whether the trends hold.", which no longer promises a faster/slower signal for every item.

## 2026-11-09 — s0 Erdős card: duplicate "But" line removed (review comment)
- The card repeated "Within weeks, humans improved on the AI's construction", which the sentence just above the cards already says (same footnote, s0-erdos-context). The card now has no "But" line; the ICPC and freelance cards keep theirs. Chart comment updated to match.

## 2026-11-09 — s2 cost per task: "a thirteenth" reworded (review comment)
- A reader took "drops to about a thirteenth each year" as "1/13 cheaper". Now: "falls about 13-fold each year: what cost $13 costs about $1 a year later." Same figure and source (s2-epoch, about 47% a quarter).

## 2026-11-09 — s3 1.9x: "as before" now names the baseline (review comment)
- A reader asked "compared to what before?". s3 now says Anthropic's models improved about 1.9 times as fast as they had from early 2024 to then, "roughly two years of the earlier progress in one year"; the s8 table row says the same. s3-accel adds the baseline (snapshots from Claude 3 Opus, early 2024) and METR's "two years of historical progress" quote, checked on METR's page.

## 2026-11-09 — s4 "Beyond the best humans" opener shortened (review comment)
- "The opening's two results sit at the far right: the 2025 programming world finals, on OpenAI's own report, and the Erdős disproof." became "The programming finals, on OpenAI's own report, and the Erdős disproof ([see the opening](#s0))." The OpenAI-reported qualifier stays.

## 2026-11-09 — s9 closing line rephrased (review comment)
- "If only the scores move, the title stays true where it is true now, and no further." became "If only the scores move, AI stays ahead only on the kinds of tasks where it already is."

## 2026-11-09 — Link-preview image redrawn from current data (owner request)
- public/og.png was hand-drawn on 8 November and had gone stale: its Today line lacked the DeepSeek-V4-Flash step ($0.11, ECI 146.86). scripts/og/render-og.mjs + og.html now draw it from src/data/frontier_snapshots.json; the build stamps og.png's hash into the og:image URL so Discord and others refetch it. Footer line and meta descriptions now say "sourced and tagged", matching the hero.
