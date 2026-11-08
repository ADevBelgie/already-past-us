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
