# R3 source check, group b (sections 2, 3, 5)

Checked 7 November 2026, against primary sources where they could be reached. About 30 searches and fetches. Editorial issues (numbering, word counts, tags, cross-links) are left out.

## Section 2: Cheaper and better

### Gemini 4 Argon "introductory" price: CORRECTED (the framing holds, but the citation needs to change)
- The Google pricing page (https://aistudio.google.com/docs/pricing) does **not** use the word "introductory". It lists the rates by date: input "$2.00 through November 30, 2026" and then "$4.00 starting December 1, 2026"; output "$10.00 through November 30, 2026" and then "$20.00 starting December 1, 2026"; context caching $0.10 then $0.20. Batch and Flex also double ($1/$5 to $2/$10). Priority goes from $3.60/$18 to $7.20/$36. Gemini 3.8 Flash and 3.6 Flash: $0.75 to $1.50 input and $3.75 to $7.50 output from 1 January 2027; caching $0.075 to $0.15; caching storage $0.50 to $1.00 per 1M tokens per hour.
- The "introductory" wording comes from Google's launch post: Koray Kavukcuoglu, 30 Sep 2026, https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/ . The post says "Argon will launch at an introductory price" ($2/$10). Its footnote says that after the introductory period expires, "the price of $4 per 1M input tokens and $20 per 1M output tokens will apply". The post gives no end date. The 1 Dec date comes only from the pricing page.
- Text guidance: keep "a launch price Google had announced as introductory". Cite the launch post for "introductory" and the pricing page for the dates and amounts. Do not give a reason for the change.

### Microsoft calendar-2026 capex and the big-four total: CONFIRMED
- Primary source: the Microsoft FY27 Q1 call transcript on Microsoft IR (28 Oct 2026), https://www.microsoft.com/en-us/investor/events/fy-2027/earnings-fy-2027-q1 . In her prepared remarks, Amy Hood said: "In Q2, we expect CapEx spend will be over $50 billion. Therefore, for the calendar year, spend should be approximately $170 billion due to the 3P capacity delays noted earlier." She also said: "we recognize the full principal value of finance leases in capex at the time of lease commencement". Q1 finance leases were $7.4B. Her sentence does not name the year, but "Q2" (Oct to Dec 2026) followed by "for the calendar year" means calendar 2026. That finance leases are included follows from Microsoft's definition of capex. She gave no fiscal-2027 total, so the InvestingLive headline "$170bn capex in fiscal 2027" is wrong.
- Alphabet: CFO in the Q3 2026 transcript, from Alphabet IR (https://s206.q4cdn.com/479360582/files/doc_events/2026/Oct/28/2026_Q3_Earnings_Transcript.pdf): "our full-year 2026 CapEx guidance range of $195-$205 billion remain unchanged", and capex is expected "to increase significantly in 2027".
- Meta: SEC Ex. 99.1 (https://www.sec.gov/Archives/edgar/data/0001326801/000162828026066700/meta-09302026xexhibit991.htm): "2026 capital expenditures, including principal payments on finance leases, to be in the range of $135-145 billion". Q3 capex was $34.91B.
- Amazon: CNBC, 29 Oct 2026 (secondary; Amazon's Ex. 99.1 was not checked): Amazon "continues to expect spending will reach $220 billion this year". Q3 capex $77.3B. Jassy: "spend meaningfully more in 2027".
- Sum: 170 + 195-205 + 220 + 135-145 = **$720-740B**. The arithmetic checks.
- Text guidance: the body stands. In the footnote, add the Microsoft IR transcript URL and the Alphabet transcript URL. The Alphabet 8-K exhibit has no guidance quote. Keep "bases are mixed". Amazon's basis (cash capex) comes from secondary sources.

### Google "32 billion tokens a minute": CORRECTED (small wording fix)
- The Alphabet Q3 2026 transcript says "Our first-party model APIs are now processing nearly 32 billion tokens per minute, 40% more than last quarter and more than four times what we processed a year ago."
- Text guidance: say "nearly 32 billion" (or "almost"), not "about". Cite the transcript as well as the 8-K exhibit; I did not re-check whether the exhibit says it.

### Historical list prices (Nov 2025 and May 2026 snapshots): PARTLY RESOLVED
- Gemini 3 Flash at launch (17 Dec 2025): $0.50/$3.00 per secondary aggregators (developersdigest.tech, modelcompare.dev). This matches the price the draft uses, so the May 2026 figure of $1.125 blended is consistent. Google's archived page was not reachable.
- Grok 4.20: docs.x.ai lists only the 0309 variants (reasoning, non-reasoning and multi-agent), all at $1.25/$2.50 under 200k tokens and $2.50/$5.00 at 200k or more. There is no launch date and no earlier price. The aggregators date the release to 10 March 2026, or 31 March (OpenRouter), not February. One gateway lists $2/$6. **Unresolved:** the price in force on 7 May 2026 and the release date. At $2/$6 (blended $3.00) it still sits below $4, so the "about 152" May figure is not affected.
- Sonnet 5 introductory price: not checked (out of budget).
- Text guidance: keep the existing caveat sentence ("We used today's list prices..."). Do not say "February 2026" for Grok 4.20 unless Epoch's date says so.

## Section 3: How fast, and is it speeding up?

### TH1.1 task counts ("5 of 228 above 16h"): CONFIRMED for the draft's framing; the 16h claim is unsupported
- METR, "Time Horizon 1.1", 29 Jan 2026, https://metr.org/blog/2026-01-29-time-horizon-1-1/ : "We increased our suite from 170 to 228 tasks." "We increased the number of long tasks (estimated to take humans 8 or more hours) from 14 to 31." "we measured human baseline times for only 5 of our 31 long (8h+) tasks." The appendix table lists "Tasks 8h+, human baselined" as 6 for TH1.0 and 5 for TH1.1.
- The post gives **no** count of tasks at 16h or more, and no total count of human-baselined tasks.
- Text guidance: keep "228 tasks, 31 of them 8h+, 5 of those human-baselined". Never use "5 of 228 above 16h". It conflates the two numbers.

### 80% horizon (~1.5h in the Frontier Risk Report vs ~70 min for Opus 4.6): RESOLVED; both are right, for different models
- METR Frontier Risk Report, 19 May 2026 (https://metr.org/blog/2026-05-19-frontier-risk-report/), Table 1, TH1.1, Feb to Mar 2026:
  - Public frontier 50%: "~12h [5h-61h]". Internal frontier 50%: "Likely* ≥16h". The most capable shared model's 50% point estimate was "between 16 and 20 hours".
  - Public frontier 80%: "~1.5h [50m-2h40m]". Internal frontier 80%: "Likely* ≥3h but <4h". The 80% point estimate was "between 3 and 4 hours".
- The report does not name the models. The METR data file (research/data/raw/metr_benchmark_results_1_1.yaml) matches them exactly. The public 50% figure is Claude Opus 4.6 (718.8 min, CI 316.7-3,633.8 min, i.e. 5.3-60.6h). The public 80% figure is **Gemini 3.1 Pro**, whose p80 is 89.8 min (CI 52.0-158.6 min, i.e. ~1.5h [52m-2h39m]). Opus 4.6's own p80 is 69.9 min. The internal 80% figure matches Mythos Preview (early) at 185.9 min, about 3.1h. So the "public frontier" leader differs between the 50% and 80% metrics. Matching models to figures is our inference, but the intervals line up to the minute.
- Text guidance: the body's "about 70 minutes for Opus 4.6 and about 3 hours for Mythos" is correct. In footnote s3-p80, replace "which does not match the file" with: "METR's Frontier Risk Report gives the public-frontier 80% horizon as ~1.5h [50m-2h40m]; this matches Gemini 3.1 Pro's 80% value in the data file (89.8 min, 52-159 min), which led on that metric even though Opus 4.6 led at 50%." Optionally add to the body: "the best public 80% figure then was about 1.5 hours (Gemini 3.1 Pro)."

### "The horizon is not how long the AI runs": CONFIRMED
- METR, "Clarifying limitations of time horizon", 22 Jan 2026, https://metr.org/notes/2026-01-22-time-horizon-limitations/ . A bolded heading reads: "Time horizon is not the length of time AIs can work independently". The next line: "Rather, it's the amount of serial human labor they can replace with a 50% success rate." Also: "A 50% time horizon of X hours does not mean we can delegate tasks under X hours to AIs."
- Text guidance: the footnote can quote the heading directly. No FAQ URL is needed.

### GPT-5.6 Sol (11.3h vs >270h): CONFIRMED
- METR, "Summary of METR's predeployment evaluation of GPT-5.6 Sol", 26 Jun 2026, https://metr.org/blog/2026-06-26-gpt-5-6-sol/ . With cheating scored as failure: "around 11.3hrs (95% CI: 5hrs - 40hrs)". With cheating scored as success: "the point estimate jumps beyond 270hrs" (no CI given). With cheating attempts discarded: "71hrs (95% CI: 13hrs - 11400hrs)". "we do not consider any of these numbers to represent a robust measurement of GPT-5.6 Sol's capabilities."
- Text guidance: the body and footnote are accurate. The chart builder can add 11.3h (5-40h) as a hand-entered annotation from this URL. Do not plot >270h as a point.

## Section 5: Why "human-level" is the wrong question

### Altman August 2025 "not a super useful term": CONFIRMED; primary URL found
- The CNBC transcript (primary): "First on CNBC: Transcript: OpenAI Sam Altman Speaks with CNBC's 'Squawk Box' Today", 8 Aug 2025, https://www.cnbc.com/2025/08/08/first-on-cnbc-transcript-openai-sam-altman-speaks-with-cnbcs-squawk-box-today.html . Asked by Andrew Ross Sorkin to define AGI, Altman replied: "I have many, so I think it's not a super useful term." It aired Friday 8 August 2025.
- The CNBC article: "Sam Altman now says AGI, or human-level AI, is 'not a super useful term' — and he's not alone", 11 Aug 2025, https://www.cnbc.com/2025/08/11/sam-altman-says-agi-is-a-pointless-term-experts-agree.html
- Text guidance: in footnote s5-altman, replace "aired early August 2025 ... the CNBC page itself not fetched" with "CNBC Squawk Box, 8 August 2025 (transcript)". Cite the transcript URL, then the TIME URL for the 2026 remark. Tag as Verified (a transcript of his own words).

### GDPval GPT-5.5 84.9%: CONFIRMED for 84.9% via a mirror; 68.2% UNRESOLVED
- openai.com/index/introducing-gpt-5-5/ and /en-US/ both return 403, and the Internet Archive was not reachable from this tool. mer.vin (23 Apr 2026, "Dedicated extraction post from OpenAI's Introducing GPT-5.5 page") reproduces the GDPval (wins or ties) row as: GPT-5.5 84.9%, GPT-5.4 83.0%, GPT-5.5 Pro 82.3%, GPT-5.4 Pro 82.0%, Claude Opus 4.7 80.3%, Gemini 3.1 Pro 67.3%. Search snippets of openai.com agree.
- The 68.2% outright-wins figure appears in only one secondary article; the mirror has no wins-only figure.
- Text guidance: keep "84.9% (OpenAI-reported)". Note that the reading came via a reproduction of OpenAI's table. Drop "(68.2% outright wins)" from the footnote unless it is confirmed on openai.com.

### GDPval paper: speed/cost figures CONFIRMED; the 47.6% context CORRECTED
- arXiv 2510.04374, Table 2 (OpenAI models only; "We were not able to obtain cost estimates for Claude, Gemini, and Grok"). For GPT-5: naive 90x faster and 474x cheaper; "Try 1x" 1.12x faster and 1.18x cheaper; "Try nx" 1.39x faster and 1.63x cheaper. The r1 counter-evidence ranges (1.1-1.4x, 1.2-1.6x) are simply the Try-1x to Try-nx span for GPT-5. They are not a separate finding.
- The paper's Try-1x definition: the expert samples the model once, reviews the output, and does the task manually if it falls short. That is "do it yourself", not "fix it".
- The 47.6% figure: "47.6% of deliverables by Claude Opus 4.1 were graded as better than (wins) or as good as (ties) the human deliverable". This is on the **220-task gold subset**, not the full 1,320 tasks (44 occupations, 9 sectors).
- Text guidance: the body should say "on the 220-task public subset, the best model in September 2025 (Claude Opus 4.1) was rated as good or better on 47.6%". In the expert note: "with a 'try once, review, and do it yourself if it falls short' workflow it was only about 1.12 times faster and 1.18 times cheaper (1.4 and 1.6 times if retried several times)". Optionally add that the naive cost ratio was 474x. Caution: OpenAI does not say whether GPT-5.5's 84.9% is on the same subset, so the 47.6% to 84.9% comparison is approximate.

### The Verge on the AGI clause; wording of the April 2026 amendment: CONFIRMED (Verge via secondary)
- The Microsoft post (primary), "The next phase of the Microsoft-OpenAI partnership", 27 Apr 2026: "Revenue share payments from OpenAI to Microsoft continue through 2030, independent of OpenAI's technology progress", "at the same percentage but subject to a total cap"; the licence to OpenAI IP runs "through 2032"; "Microsoft's license will now be non-exclusive". The post contains no "AGI", no "artificial general intelligence" and no "expert panel". This confirms the draft.
- Willison (https://simonwillison.net/2026/Apr/27/now-deceased-agi-clause/) quotes the same phrase, but from OpenAI's announcement. He hedges ("As far as I can tell") and links The Verge: https://www.theverge.com/ai-artificial-intelligence/918981/openai-microsoft-renegotiate-contract
- The Verge could not be fetched (the tool blocks the domain). Its headline, per several aggregators, is "Microsoft and OpenAI's famed AGI agreement is dead", 27 Apr 2026. A digest excerpt says the clause "has officially been dropped". The author was not established.
- Text guidance: cite The Verge by headline, date and URL, noting "via secondary excerpts". Add both URLs to sources.csv. "Simon Willison and The Verge read this as the end of the AGI clause" is fair.

## Not checked (out of budget)
Sonnet 5 introductory pricing; Amazon Ex. 99.1; Brockman's primary source; Amodei's 2026 essay; the AA v5 effort spread; METR's 5 Nov 2026 assessment figures (not in the brief).
