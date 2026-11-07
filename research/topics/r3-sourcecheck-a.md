# r3 source check, group a (sections 0, 1, 4)

Checked 2026-11-07. Pure editorial issues (word counts, section links, tag punctuation, chart data files, Gowers line, press-tag policy) are skipped.

## Section 0

### ICPC 2025: 12/12 vs best human team 11 (primary source). Status: CORRECTED (source found, attribution tightened)
- The primary OpenAI source is a post on X by Mostafa Rohaninejad (OpenAI), 17 Sep 2025: https://twitter.com/mostafarohani/status/1968361152741826849 . It says the system's first answer was correct on 11 of 12 problems, that the hardest problem took nine submissions, and that "the best human team achieved 11/12". Read via Simon Willison's quote and link (https://simonwillison.net/2025/Sep/17/icpc/), because x.com cannot be fetched. Press quotes OpenAI as saying it "officially competed in the onsite AI track", submitting to the "ICPC World Finals Local Judge".
- No OpenAI blog post and no ICPC statement on OpenAI's result was found. worldfinals.icpc.global/2025/openai.html shows no result text. The Internet Archive is blocked for this tool.
- Guidance: cite the Rohaninejad post as the primary source and keep the Vendor-reported tag. "11 on the first submission" should read "first answer correct on 11".

### ICPC "did not validate the system, processes, or underlying model". Status: CORRECTED
- The wording comes from **Google DeepMind's** Gemini ICPC post (17 Sep 2025), and it is about **Gemini**, not OpenAI. The post says: "The ICPC global has confirmed that our submitted solutions are complete and accepted. It is important to note that their review does not extend to validating our system, processes, or underlying model."
- The same post gives the 2nd-place figure as hypothetical: "would be ranked in 2nd place overall, if compared with the university teams". It does not use the words "experimental track". It says Gemini competed remotely, under ICPC rules and with organiser guidance, starting 10 minutes after the human contestants.
- Guidance: in the s0 expert note and the s0-icpc footnote, attach the "confirmed accepted / did not validate" language to Gemini (as DeepMind reports it). For OpenAI, say only that OpenAI says it submitted to ICPC's local judge, and that no ICPC statement on its result was found. Replace "separate experimental track" with "a separate AI track".

### RLI launch paper arXiv 2510.26787. Status: CONFIRMED
- Mazeika, Gatti, Menghini et al. (47 authors), "Remote Labor Index: Measuring AI Automation of Remote Work", submitted 30 Oct 2025. The abstract says "the highest-performing agent achieving an automation rate of 2.5%". It does not name the agent or give the project count. Manus and the 240 projects come from the leaderboard and paper body, which were not re-read.
- Guidance: add https://arxiv.org/abs/2510.26787 to sources.csv.

## Section 1

### Reuters Institute 2026: 18% paid access. Status: CONFIRMED
- Primary page: "Generative AI and News Report 2026", published 29 Oct 2026, YouGov fieldwork 14 Aug to 28 Sep, about 2,000 per country, nine countries (AR, AU, DK, FI, FR, JP, NO, UK, US). It says 10% pay themselves and 9% get access through work or school, and "Together, 18% now have access to paid-for AI systems." It is non-probability, with quotas set to be nationally representative.

### Reuters Institute: agent use 39% vs 11%. Status: CORRECTED
- The report says "39% of those with paid access ... saying they have used an AI agent, compared with 11% of those who only use free versions". That sentence does **not** say "for a real task". The "real task" wording belongs to other figures: 14% of all respondents (real task) and 13% (experiment only), and 32% of daily users vs 6%. The window is the last week. The report also says 50% of daily users with paid access vs 21% of daily free users.
- Guidance: "11% of free-only users had used an AI agent in the past week, against 39% of those with paid access." Drop "for a real task" from this sentence and from footnote s1-paid.

### "Free versions are often not the latest models". Status: CORRECTED
- The report says most users are "relying on free-to-access versions ... and have therefore likely not come into contact with the latest, more capable model versions."
- Guidance: "The Reuters Institute says most people, relying on free versions, have likely not used the latest, most capable models."

### OpenAI ~50M paying of ~900M weekly users (Feb 2026). Status: CONFIRMED
- OpenAI, "Scaling AI for everyone" (the $110B funding post, 27 Feb 2026): https://openai.com/index/scaling-ai-for-everyone/ . It returned 403 to the fetcher, so the wording was read from the search index: "more than 900M weekly active users, and we now have more than 50 million consumer subscribers". A later OpenAI post ($122B round) repeats both figures, and a later OpenAI page says more than one billion weekly users.
- Guidance: cite OpenAI's post as the primary source, with TechCrunch as secondary. Say "consumer subscribers" (OpenAI separately reports about 9M paying business users). Optionally note that OpenAI now reports over 1 billion weekly users.

### IMO 2025: primary Google DeepMind post. Status: CONFIRMED
- "Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad", 21 Jul 2025: https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/ (the /discover/blog/ path also works). It gives 35/42, five of six problems solved perfectly, and "officially graded and certified by IMO coordinators using the same criteria as for student solutions". The post also carries the IMO's caveat that its review does not extend to validating the system or model.
- Guidance: replace the Willison citation with this URL.

## Section 4

### GPQA Diamond: Epoch page, top Epoch-run score, expert baseline. Status: PARTLY CONFIRMED, top score UNRESOLVED
- Exact page: https://epoch.ai/benchmarks/gpqa-diamond . Its only score is Grok 4 (grok-4-0709) at 87% ±2%, Epoch-run in July 2025 on 198 questions × 8 samples. The page notes that "xAI compensated us for this evaluation." The page's human baseline is OpenAI's figure: PhD experts "scored 69.7%" on Diamond. Random guessing is 25%.
- The current top Epoch-run score could not be read. The hub table and dashboard pages do not render the leaderboard, and the data is only in a ZIP (benchmark_data.zip, updated 7 Nov 2026), which was not downloaded. Aggregators claim 94–96%, but that is unverified.
- The 81.3% Diamond expert figure was not verified (the arXiv PDF could not be parsed). It is not used.
- Guidance: say "In Epoch AI's testing, Grok 4 scored 87% (July 2025)" and drop the unverified "–90%". Consider using the same-set human comparison: PhD experts scored 69.7% on the Diamond set (OpenAI's measurement, cited by Epoch). That removes the cross-set problem in the expert note. Optionally note that xAI paid for the Grok 4 evaluation.

### Epoch robotics (Feb 2026). Status: CORRECTED (trash bag), others confirmed
- Rivière and Denain, Epoch AI, 10 Feb 2026. The page says "Robots are typically 3–10× slower than humans" and, for household tasks, "two to ten times slower". On kitchens: "no single robot has shown integration across all three" subtasks (load the dishwasher and run it; clean and store items; clear surface debris). Reliable deployment is in inspection and warehouse picking.
- Trash bag: "**Neither robot** has demonstrated removing a bag from an indoor bin". This refers to the two robots shown attempting the task, Tesla Optimus and Loki Robotics' wheeled robot, not to all robots.
- Guidance: "No robot has yet been shown doing every part of cleaning a kitchen, and the robots shown handling trash bags had not yet removed one from an indoor bin."

### Waymo 2026 freeway pause/recall. Status: CONFIRMED (event happened)
- NHTSA recall 26E035000 (primary, NHTSA recalls API). Report received 13 Jun 2026, 3,871 units, 5th-generation ADS software. The car could enter a closed freeway construction zone and keep driving at speed. Remedy: software update from 16 Jun 2026, and "Waymo resumed freeway operations on June 25, 2026."
- TechCrunch (18 Jun 2026) reports at least 13 incidents and that Waymo pulled its robotaxis from all freeways on 19 May 2026.
- Guidance: keep Waymo on the map, but add to the expert note: "In May–June 2026 Waymo paused freeway service for about five weeks and issued a software recall (NHTSA 26E035) after its cars drove into closed freeway work zones." The safety data covers miles through June 2026, which includes the pause.

### Pakistan RCT: vignettes or real patients. Status: CONFIRMED (vignettes)
- The preprint abstract (Qazi IA et al., medRxiv 10.1101/2025.06.06.25329104, 6 Jun 2025, read via Europe PMC) says physicians reviewed "up to 6 clinical vignettes" in a 75-minute session. 60 were randomised and 58 completed. The Nature Health page redirects to login. The ClinicalTrials.gov record NCT06774612 says only "clinical cases".
- The preprint gives 38% for doctor+LLM beating the median LLM-alone score, while the draft uses 31.4% from the published paper. Keep the published figure.
- Guidance: replace "diagnostic cases" with "written clinical cases (vignettes), not real patients".

### NHC 2025 verification report wording. Status: UNRESOLVED (exact wording)
- The full PDF (Verification_2025.pdf, 85 pp., Cangialosi, Martinez, Reinhart and Papin, March 2026) is over 10 MB and could not be fetched. NHC's own "2025 NHC Verification Report Preview" (Cangialosi, Martinez, Papin) was read. It says 2025 was the first season NHC used AI models in real-time operations and that "the Google DeepMind (shown as GDMI ...) was very useful". It also notes that some AI systems "were not consistently available on a timely basis". A search-engine summary of the full report says official forecasts beat most models, but GDMI showed slightly better results at some forecast periods.
- "Slightly outperformed ... 12–72 h" and the East Pacific "48–120 h" claims are still known only through press (WIS-TV and WRDW, Gray TV) and a CIRA summary.
- Guidance: do not put "slightly outperformed" in quotation marks. Safe wording: "NHC's review of 2025 found Google DeepMind's model did slightly better than the official Atlantic track forecasts at some lead times, and better in the East Pacific (as reported in coverage of the report)." Alternatively, cite the preview's "very useful" until someone reads the PDF tables.

### IMO 2026 human count and perfect scores. Status: UNRESOLVED (official table not reached)
- The imo-official.org year pages for 2026 returned "page does not exist" to the fetcher. AFP (France 24, 23 Jul 2026) says 666 contestants and 7 full marks, citing the official scoreboard. A Shanghai High School International Division page names three Chinese perfect scorers (Leyan Deng, Che Liu, Bolun Zhang), which fits 7 overall. No source contradicting 7 was found.
- Guidance: keep "seven human contestants also got full marks", attributed to AFP's reading of the official results. Avoid giving a total contestant count, or write "about 670".

## Incidental
- WebFetch auto-saved two PDFs to the tool-results cache (GPQA paper, NHC preview). Nothing was downloaded deliberately.
