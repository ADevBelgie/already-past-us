# Models editing weights: news of late Oct to early Nov 2026

Research round r1, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

The news from 2026-10-30 to 2026-11-07 does not show what the author's belief (4) suggests. Nothing published in that window shows a model editing its OWN weights. The story behind the "models edit their own weights" talk is MIT CSAIL's blog post "Sparks of Weight-Space Programming" (Takehi, Teoh, Zhang, Khattab, posted 2026-11-02). In it, OpenAI's GPT-6 Astra read and edited the weights of OTHER networks, and it did so without gradient descent. The headline result is real and checkable, since logs and the edited weights are public: Astra changed 131,072 weights (0.016%) of Qwen3.5-0.8B and MATH-500 rose from 7.9% to 48.1%. But the edit removed a "loop" direction, and Qwen's own model card already warns that this model is prone to thinking loops. Answers hitting the 32,768-token limit fell from 93.0% to 33.1%. So most of the gain is a repair that let existing ability show, not new knowledge. The authors say this themselves: the same approach could not improve Gemma 3 270M, which does not loop (6.8% to at most 7.7%). In the post, recursive self-improvement ("an LLM that can inspect, debug, and improve its own weights") is listed only under "What Comes Next". Critics argued the post bundles experiments with very different tool access. Matthew Honnibal noted the Qwen result used Python and up to 50 forward passes, not "just looking at weights". Sean Goedecke, as reported by R&D World, called it essentially steering, an existing technique. Simon Willison partly reproduced the no-tools weight-reading task with a local 27B open model, 3 of 4 games correct. Other news in the window was either not about weights or not self-directed. Anthropic's amended S-1 (2026-11-02, checked in the filing itself) says "we may imminently meet" its RSP threshold for "dramatically accelerated progress attributable to AI", and that over 90% of codebase contributions in September 2026 were written by Claude. That is AI speeding up human-supervised research, not models changing their own weights. Together AI's Compiler (2026-11-04) uses agents to rewrite GPU kernels, not weights. Trajectory ($45M, 2026-11-02) retrains customer models from human feedback. A 2026-11-05 arXiv preprint (WeightLoop) has GPT-6 Astra write a program that edits a separate predictor. The closest recent case of a model really updating its own weights came just before the window: Sakana/UC Berkeley's MASS (arXiv, October 2026) LoRA-fine-tunes Qwen3.6-27B on its own best multi-agent runs. Its gains were mixed: 1.2-1.6x score per output token on research benchmarks, but 0.94-0.96x on SWE-bench Verified and Terminal-Bench. Earlier work shows the same pattern: SEAL (June 2025) generates its own fine-tuning data and suffers forgetting, and the Darwin Gödel Machine (May 2025) rewrites its own code, not weights. The field's limits still hold: a NeurIPS 2026 paper finds about 1% recall of earlier facts after 20 sequential weight writes, and FutureSearch's median forecast for frontier models updating weights weekly is January 2033. Bottom line for the author: there is real and fast progress on AI-assisted AI R&D, and a genuinely new demo of LLMs editing other networks' weights. Saying "models are now editing their own weights" would be wrong, and is the kind of mis-described claim that hurt earlier pieces.

## Fact-check

The core MIT CSAIL findings hold up well against primary sources: the blog post, the exp8 and exp4 READMEs, the logs repo and both Hugging Face model cards. Every headline number and quote matched exactly, and so did the main point that no experiment edits the model's own weights. The S-1/A quotes match the EDGAR filing word for word. Corrections: (1) the Anthropic '90% of contributions' and '45x' figures were already in the original 2026-10-26 S-1, so they are not new in the window; (2) Together's 1.7x is against 'available open-source megakernels' at batch size 1, not 'hand-written' ones, and primary vendor posts exist and should replace the 403'd press release; (3) Goedecke's original post exists, and he did not literally call the fix 'steering'; (4) the 10, 25 and 50 pass Qwen runs used different edits, one run each, and 'IFEval strict prompt-level' is not stated in the source. Vendor-reported items (Anthropic code statistics, Together speedups, Trajectory valuation) are mostly labeled correctly. Several load-bearing claims in the summary have no supporting finding or URL and could not be verified because the shared web-search budget ran out mid-task: MASS, the NeurIPS 1% recall paper, the FutureSearch 2033 forecast, and the VentureBeat, Register and Gizmodo coverage. The user can send a follow-up to resume searching, or these should be removed or checked separately before publication. The overall conclusion is well supported: there is real AI-assisted R&D acceleration and a new demo of LLMs editing other networks' weights, but no evidence of models editing their own weights.

- **confirmed**: MIT CSAIL researchers posted 'Sparks of Weight-Space Programming' (GPT-6 Astra reads/writes weights without optimizer or gradient descent; 'very early' results)  
  → Posted November 2, 2026; Rikiya Takehi, Jayden Teoh, Alex Zhang, Omar Khattab, all MIT CSAIL; authors describe 'very early results'; says weight writing is not done via an optimizer or gradient descent  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  Checked on the post itself. It is a blog post with public logs (github.com/RikiyaT/lm_understand-logs). There are 8 numbered experiments plus an unnumbered Gemma 3 270M follow-up.
- **confirmed**: Astra edited Qwen3.5-0.8B: MATH-500 7.9->48.1, GSM8K 13.8->67.1, IFEval 21.0->62.3, GPQA-D 22.7->36.6, MMLU-Pro 40.3->45.5; 131,072 weights (0.016%), layers 15 & 19, 130,188 differ after bf16; 50 passes, 80 Python execs, 20.3 h incl. 4.7 h outage; 10/25 passes gave 12.3/14.1  
  → All numbers match the exp8 README: p50c edit = loop direction subtracted from 64 output columns of the MLP down_proj in layers 15 and 19 = 2x64x1,024 = 131,072 weights, 130,188 differ after bf16 rounding; 80 Python executions, 158 turns, 4 conversations, 20.3 h, 4.7 h outage at turn 154. 10 passes: 12.3, 25 passes: 14.1. 0.016% comes from the blog and model card, not the README.  
  Source: https://github.com/RikiyaT/lm_understand-logs/blob/main/exp8_math/README.md  
  Settings also confirmed: vLLM, thinking on, temp 0.6, top_p 0.95, top_k 20, presence penalty 1.5, 32,768 max tokens, 4 samples per MATH-500 problem. Codex CLI at 'max' effort with built-in tools disabled is confirmed in the repo README. Caveats to add: 'IFEval strict prompt-level' is not stated; the README only says 'official checkers'. The 10, 25 and 50 pass runs each made a DIFFERENT edit (rank-one removal across 30 matrices; zeroing head 7 of layer 15; the 128-column MLP edit), so 'with 10 or 25 passes' is not the same method on a smaller budget. One run per budget. The benchmark figure shows an interim unedited GPQA of 24.5; the final value is 22.7. These are the authors' own numbers. The independent rerun (51.0% MATH-500, 31.6% truncated) appears on the Hugging Face model card (duplicated from ML-Intern-lab) as well as in R&D World.
- **confirmed**: Gain is mainly a repair of known looping: truncation 93.0% -> 33.1%; Qwen model card warns 0.8B is prone to thinking loops  
  → Truncation at 32,768 tokens on MATH-500: 93.0% unedited -> 33.1% (p50c), 87.2% (p10c), 86.4% (p25c). Model card: 'Qwen3.5-0.8B is more prone to entering thinking loops compared to other Qwen3.5 models'  
  Source: https://huggingface.co/Qwen/Qwen3.5-0.8B  
  The blog itself cites the model card warning. 'Mainly a repair' is an interpretation, but the authors' own Gemma conclusion supports it. Supporting evidence not in the summary: Gemma 3 270M truncates only 8.5% of the time, versus 93% for unedited Qwen.
- **confirmed**: Gemma 3 270M: base 6.8%; 7.0/7.6/7.7/7.0 at 5/10/25/50 passes; authors conclude an edit can remove an obstacle but not add an ability  
  → Base 6.8%; 7.0% (5), 7.6% (10), 7.7% (25), 7.0% (50). Authors: 'Editing weights could remove an obstacle that hid an ability, but it could not add an ability the model lacked.'  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  Verbatim conclusion confirmed. The blog gives few harness details for this follow-up.
- **confirmed**: Other weight-space results: 4/4 games from 17,253 weights; car policy 171,664 weights, ~3.5% rewritten, 0/256 -> 1,024/1,024; MinAtar Breakout 517.4 vs 25.3, Seaquest 53.1 vs 88.9, Asterix 53.2 vs 55.2 (PPO 500M); sycophancy 0/4 from weights, 3/3 with attention  
  → All match. Car: 6,073 of 171,664 actor weights (3.54%); 0/256 before; 1,024/1,024 after. MinAtar baselines are PPO at 500M steps (PPO at 100M: 15.8 / 5.6 / 25.8).  
  Source: https://github.com/RikiyaT/lm_understand-logs/tree/main/exp4_fix_car  
  Not all of these are 'raw weights as text'. Exp 5 (MinAtar from scratch) gets game rules, source code and network layout, and no weights to read. Exp 7 sycophancy uses Python, numpy and an attention tool. The summary leaves out Exp 2 (diffusion shapes from 23,824 weights), Exp 3 (training language of 3/3 small LMs, using Python) and Exp 6 (Go, 1.48M weights, beat an equal-sized PPO net trained on 20M games with 50 passes). The '8 vs 10 experiments' discrepancy: there are 8 numbered experiments; Honnibal splits them into 7a, 7b and 8b.
- **confirmed**: No experiment had a model edit its own weights; recursive self-improvement only in 'What Comes Next'  
  → Every experiment edits or writes a different network. 'What Comes Next' contrasts today's RSI ('a model writing code that launches training jobs') with an LLM that can inspect and improve its own weights, presented as future work.  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  R&D World (2026-11-03) confirms that self-editing 'remains a proposed application'. I could NOT check the VentureBeat or The Register coverage, or the DEV Community and note.com mis-statements, because my search budget ran out. Treat those as unverified.
- **confirmed**: Honnibal: post misleading; raw-weights-only = 1, 2, 4; Python-based = 3, 6, 7a, 7b, 8, 8b; concedes models a year or two earlier would have failed  
  → Dated 2026-11-03. Raw-weights: 1 (17K), 2 (24K), 4 (172K). Python: 3, 6, 7a, 7b, 8, 8b. Exp 5 is in neither group (writes 20K weights from scratch). Concession: 'Figuring out how to do this productively is not nothing'; earlier models 'would have failed at all these tasks'.  
  Source: https://honnibal.dev/blog/astra-read-write-misleading  
  His concession covers all the tasks, not specifically the Qwen fix as 'ML-engineer-level work'. Change the wording slightly.
- **corrected**: Sean Goedecke argued the Qwen fix is an application of steering, an existing technique (relayed via R&D World; original not located)  
  → The original post exists: 'LLMs are not superhuman at reading and writing neural network weights' (2026-11-03). Goedecke says a smart human ML researcher could do every task. He says he would have tried steering-style contrastive analysis of looping vs non-looping texts, then trimmed the weights responsible, and that Astra did 'exactly this' (he compares it to Heretic abliteration). He does not literally label the fix 'steering'; that phrase is R&D World's paraphrase.  
  Source: https://www.seangoedecke.com/llms-are-not-superhuman-at-reading-and-writing-neural-network-weights/  
  Cite the primary post instead of relaying R&D World. Another usable line from it: 'the best way to update the weights of a model is to train it normally.'
- **confirmed**: Simon Willison partly reproduced the no-tools game-ID task with Qwen 3.8 27B (Q4_K_M, 17GB, LM Studio): Pong, Breakout correct; Pac-Man as Pac-Man-style grid (72%); Freeway wrong; ~46-65 min per run  
  → 2026-11-03. Pac-Man 72% (46m12s), Pong 75% (1h4m54s), Breakout/Arkanoid 88% (52m25s), Freeway wrong (guessed a Pac-Man-like grid game; no time given). Says an experienced human 'with a notepad and a pencil could get there' and that some commentary overreaches.  
  Source: https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/  
  '3 of 4' is fair if Pac-Man counts as correct. The 46-65 minute range covers only the three runs with reported times. Anecdotal, n=1 per game.
- **confirmed**: WeightLoop (arXiv:2611.07319, 2026-11-05): GPT-6 Astra writes a reusable parameter-editing program that updates a deployed predictor; targeted edits beat random in 7 of 8 endpoint-budget settings; 5 pages  
  → Submitted 5 Nov 2026, cs.LG; Mengran Li ... Stan Z. Li; 5 pages, 2 figures, 3 tables; 'GPT-6 Astra inspects a task specification and the model implementation'; improved mean ranking utility in 'seven of eight endpoint-budget settings' in offline replay; the editor stays fixed  
  Source: https://arxiv.org/abs/2611.07319  
  Checked at abstract level only. It is not self-modification. Offline replay, not live deployment. Not peer reviewed.
- **confirmed**: Anthropic S-1/A (2026-11-02): 'may imminently meet' RSP 'dramatically accelerated progress attributable to AI'; no current model designated as exceeding; does not expect to safely let Claude autonomously build successors; language not in the original 2026-10-26 S-1  
  → Verbatim quotes confirmed in the S-1/A, filed November 2, 2026. Also: 'we do not anticipate being able to safely use Claude to fully autonomously design and build successive generations of frontier models without meaningful human supervision or understanding' and 'we are considering updates to our Responsible Scaling Policy to keep humans in control of frontier model development'. The filing calls the area 'recursive self-improvement'.  
  Source: https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm  
  I checked the original S-1 (filed 2026-10-26) directly. It contains neither 'imminently' nor 'fully autonomously design', which confirms independently of Gizmodo that this is new language. 'In the past not identified ... until after it has occurred' also confirmed.
- **corrected**: Anthropic S-1/A: over 90% of codebase contributions in September 2026 written by Claude; per-engineer daily code volume Q3 2026 over 45x the 2024 average  
  → Wording confirmed in the S-1/A, but both statistics were already in the ORIGINAL S-1 filed 2026-10-26. They are not new on 2026-11-02 and come from before the briefing window. 'Increasingly perform our research, including our safety research' is confirmed in the S-1/A.  
  Source: https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm  
  Vendor-reported and unaudited. 'Contributions' and code volume are undefined activity measures. Date them to the 2026-10-26 S-1.
- **corrected**: Together AI launched Together Compiler (2026-11-04), framed as a step toward recursive self-improvement; up to 1.7x vs hand-written megakernels on Llama 1B; limited beta  
  → Primary blog dated 2026-11-04. It optimizes inference-engine code and configuration (kernels, parallelism), not weights. 1.7x is versus 'available open-source megakernels' on Llama 1B at batch size 1, not 'hand-written' ones. It also claims up to 2.6x TPS on InferenceX AgentX. The RSI framing ('The RSI loop is here for OSS models!') and the limited beta for outside customers appear in the companion Polymorphic Inference post.  
  Source: https://www.together.ai/blog/together-compiler-continual-compilation-for-ai-inference  
  The researcher relied on search snippets of a press release that returned 403. Primary vendor posts are available: together.ai/blog/together-compiler-continual-compilation-for-ai-inference and together.ai/blog/polymorphic-inference. All numbers are vendor-reported.
- **confirmed**: Trajectory raised $45M Series A at $300M led by Sequoia; 18 employees; customers Harvey, Rogo, Decagon, Mercor, Nvidia; continual learning; no benchmarks  
  → TechCrunch 2026-11-02: $45M Series A, $300M valuation, Sequoia lead (with Nvidia, Bessemer, Bain Capital Ventures); 18 people; customers as listed; retrains open models from collected feedback; co-founder Michael Elabd says keeping humans in training is safer than autonomous self-improvement; no benchmarks  
  Source: https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/  
  Funding and valuation are company-reported via press.

### Missed evidence

- Sean Goedecke's original critique, which the researcher could not find: https://www.seangoedecke.com/llms-are-not-superhuman-at-reading-and-writing-neural-network-weights/ (2026-11-03). Cite it directly; it compares the method to Heretic abliteration and does not literally say 'steering'.
- The S-1/A also says 'we do not anticipate being able to safely use Claude to fully autonomously design and build successive generations of frontier models without meaningful human supervision' and that Anthropic is 'considering updates to our Responsible Scaling Policy to keep humans in control'. A side-by-side check against the original S-1 (https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm) shows this text and the 'imminently' text are new, while the 90% and 45x statistics were already in the 2026-10-26 filing.
- The exp8 README (https://github.com/RikiyaT/lm_understand-logs/blob/main/exp8_math/README.md) shows the three budgets produced three different edits: rank-one removal across 30 matrices, zeroing one attention head, and the 128-column MLP edit. The headline result is a single run, so there is no variance estimate. Gemma 3 270M truncates only 8.5% of the time versus 93% for Qwen, which strongly backs the 'repair, not new capability' framing.
- Independent rerun on the edited model's Hugging Face card (https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming): 51.0% MATH-500 over 2,000 generations, 31.6% hitting the token limit. This is primary-ish and better than citing R&D World.
- The summary leaves out experiments 2 (diffusion shapes), 3 (LM language ID, 3/3) and 6 (Go, 1.48M weights, beating an equal-sized PPO net trained on 20M games with 50 passes). Exp 5 (MinAtar from scratch) uses no weights as input, so it does not belong under 'reading raw weights'.
- Together's primary posts: https://www.together.ai/blog/together-compiler-continual-compilation-for-ai-inference and https://www.together.ai/blog/polymorphic-inference (the RSI-loop framing and limited beta are here).
- NOT VERIFIED, search budget exhausted: Sakana/UC Berkeley MASS (Qwen3.6-27B LoRA, 1.2-1.6x and 0.94-0.96x), the NeurIPS 2026 '~1% recall after 20 sequential writes' paper, FutureSearch's January 2033 median forecast, the VentureBeat and The Register coverage, the Gizmodo report, and the DEV Community and note.com mis-statements. These carry load in the summary but have no URLs in the findings and need independent checking before publication. SEAL (arXiv 2506.10943, June 2025, notes catastrophic forgetting) and the Darwin Godel Machine (arXiv 2505.22954, May 2025, self-modifies agent code, not weights) match what I already know.

## Findings

- **MIT CSAIL researchers posted 'Sparks of Weight-Space Programming', claiming frontier LLMs (GPT-6 Astra) can natively read and write neural network weights without an optimizer or gradient descent; they call results 'very early'.**  
  Posted 2026-11-02; authors Rikiya Takehi, Jayden Teoh, Alex Zhang, Omar Khattab (MIT CSAIL); non-peer-reviewed blog post with public logs (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming: LLMs can natively read & write neural network weights](https://rikiyat.github.io/blog/weight-space-programming/)  
  Not peer reviewed and not an arXiv paper at time of posting. Logs: https://github.com/RikiyaT/lm_understand-logs ; edited model: https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming
- **Headline result: GPT-6 Astra edited Qwen3.5-0.8B (a DIFFERENT model, not itself) and raised its math benchmark scores.**  
  MATH-500 7.9% -> 48.1%; GSM8K 13.8% -> 67.1%; IFEval (strict prompt-level) 21.0% -> 62.3%; GPQA Diamond 22.7 -> 36.6; MMLU-Pro 40.3 -> 45.5. Edit = subtract one 'loop' direction from 64 output columns in each of two MLP tensors (layers 15 and 19) = 131,072 weights (~0.016%); 130,188 differ after bf16 rounding. Best run used a 50-forward-pass budget, 80 Python executions, 20.3 h wall clock (incl. 4.7 h outage). With 10 or 25 passes: MATH-500 only 12.3% / 14.1%. (2026-11-02). Confidence: high, source type: primary  
  [lm_understand-logs, exp8_math README](https://github.com/RikiyaT/lm_understand-logs/blob/main/exp8_math/README.md)  
  Evaluated with vLLM, thinking on, temp 0.6, presence penalty 1.5, 32,768-token limit, 4 samples per MATH-500 problem. One run per budget, so variance unknown. Astra accessed via Codex CLI at 'max' reasoning effort, Codex's own tools disabled; CPU Python kernel; gradient training forbidden. Authors' own result; an independent Hugging Face rerun (akhaliq) reportedly got 51.0% MATH-500, per R&D World.
- **The Qwen gain is mainly a repair of a known looping failure, not added capability: answers hitting the token limit fell sharply, and Qwen's own model card already warns about thinking loops.**  
  MATH-500 answers cut off at the token limit: 93.0% (base) -> 33.1% (edited). Qwen model card: Qwen3.5-0.8B 'is more prone to entering thinking loops compared to other Qwen3.5 models' (2026-11-02 (logs); model card undated). Confidence: high, source type: primary  
  [Qwen/Qwen3.5-0.8B model card (Hugging Face) + exp8 README](https://huggingface.co/Qwen/Qwen3.5-0.8B)  
  The README itself notes accuracy gains may partly reflect shorter outputs, and does not separate the two effects. Best framing for a lay reader: 'unblocking', not 'teaching'.
- **The same method failed on a model that does not loop. The authors conclude a weight edit can remove an obstacle hiding an ability but cannot add one the model lacks.**  
  Gemma 3 270M MATH-500: base 6.8%; 7.0% / 7.6% / 7.7% / 7.0% with 5/10/25/50 passes (no established gain) (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)  
  Authors' stated limitation, the strongest counterpoint from inside the work.
- **Other weight-space results on small networks: reading raw weights as text and writing networks from scratch.**  
  Named the game from 17,253 raw weights: 4/4. Fixed a failing car-on-ramp policy (171,664 weights) by rewriting ~3.5%: 0/256 -> 1,024/1,024 success. Wrote MinAtar networks from scratch in one reply: Breakout 517.4 vs 25.3 (PPO 500M steps); Seaquest 53.1 vs 88.9; Asterix 53.2 vs 55.2. Sycophancy detection from weights alone: 0/4; 3/3 once given attention patterns. (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)  
  Bounded toy environments; outlets disagree on whether there were 8 or 10 experiments (Honnibal counts sub-experiments 7a/7b/8b).
- **No experiment had a model edit its own weights; recursive self-improvement appears only as a future direction.**  
  'What Comes Next' lists 'Recursive self-improvement': 'An LLM that can inspect, debug, and improve its own weights' (proposal, not result) (2026-11-02). Confidence: high, source type: reputable_press  
  [Sparks of Weight-Space Programming; R&D World; VentureBeat; The Register](https://www.rdworldonline.com/mit-team-says-gpt-6-astra-can-fix-an-ai-model-by-editing-its-weights-critics-say-the-method-was-standard-ml-engineering/)  
  All major coverage (R&D World 2026-11-03, VentureBeat 2026-11-02, The Register 2026-11-03) agrees self-editing was not shown. Some secondary blogs (e.g., a DEV Community post titled 'LLMs Are Rewriting Their Own Neural Weights', a note.com explainer) misstate this.
- **Matthew Honnibal argued the post is misleading because it bundles experiments with different tool access under one 'reads raw weights' claim.**  
  Raw-weights-only experiments: 1, 2, 4 (networks of 17K-172K weights). Python-based: 3, 6, 7a, 7b, 8, 8b. Concedes the Qwen fix is real ML-engineer-level work that models 'a year or two' earlier would have failed. (2026-11-03). Confidence: high, source type: blog_or_social  
  [Honnibal: the 'Astra reads and writes weights' post is misleading](https://honnibal.dev/blog/astra-read-write-misleading)  
  Named expert critic (spaCy creator). Fair and balanced critique, useful as counterweight.
- **Sean Goedecke argued the Qwen math fix is an application of steering, an existing technique, done via Python analysis a human ML engineer would write.**  
  Qualitative critique (2026-11-03). Confidence: medium, source type: reputable_press  
  [R&D World: MIT team says GPT-6 Astra can improve other AI models by editing their weights. Critics say...](https://www.rdworldonline.com/mit-team-says-gpt-6-astra-can-fix-an-ai-model-by-editing-its-weights-critics-say-the-method-was-standard-ml-engineering/)  
  Could not locate Goedecke's original post; relayed via R&D World.
- **Simon Willison partly reproduced the no-tools weight-reading task with an open model on a laptop.**  
  Qwen 3.8 27B (17GB Q4_K_M, LM Studio): Pong, Breakout correct; Pac-Man guessed as Pac-Man-style gridworld (72%); Freeway wrong. Each run took ~46-65 minutes. (2026-11-03). Confidence: high, source type: blog_or_social  
  [Simon Willison: Qwen can interpret model weights](https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/)  
  Anecdotal. Willison says a skilled human with pencil and paper could probably do similar, and that some commentary overreaches.
- **Follow-up preprint WeightLoop has GPT-6 Astra write a reusable parameter-editing program that updates a deployed predictor from experimental feedback.**  
  Targeted edits beat random edits on mean ranking utility in 7 of 8 endpoint-budget settings (offline replay); 5-page paper (2026-11-05). Confidence: medium, source type: preprint  
  [WeightLoop: Weight-Space Programming with Experimental Feedback (arXiv:2611.07319)](https://arxiv.org/abs/2611.07319)  
  Editor LLM stays fixed; it edits a separate predictor, so this is not self-modification. Only abstract read.
- **Anthropic's amended IPO filing says it may imminently meet its RSP threshold for AI-accelerated progress, but no current model exceeds it, and it does not expect to safely let Claude autonomously build successors.**  
  Verbatim: 'our internal estimates and our expectations regarding future models, rather than our current models, indicate that we may imminently meet our Responsible Scaling Policy's definition of "dramatically accelerated progress attributable to AI."' Also: 'We have not designated any of our current models as exceeding this threshold.' (2026-11-02). Confidence: high, source type: primary  
  [Anthropic, PBC Form S-1/A (SEC EDGAR)](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm)  
  Checked against the filing text. The filing also says Anthropic has 'in the past not identified' significant acceleration until after it occurred. It is about AI speeding up human-supervised R&D, NOT weight self-editing. An S-1 is a legal risk disclosure, partly marketing. Per Gizmodo, the language was not in the original S-1 of 2026-10-26.
- **Anthropic reports Claude writes the vast majority of its code.**  
  'over 90% of the contributions to our codebase in September 2026 were written by Claude'; per-engineer daily code volume in Q3 2026 'over 45 times' the 2024 average (2026-11-02). Confidence: high, source type: vendor_reported  
  [Anthropic, PBC Form S-1/A (SEC EDGAR)](https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm)  
  Confirmed in filing text. 'Contributions' and code volume are not measures of research value. The filing also says models 'increasingly perform our research, including our safety research'.
- **Together AI launched Together Compiler, which it frames as a first step toward recursive self-improvement for inference.**  
  Agents rewrite GPU kernels for served open models; vendor claims up to 1.7x speed vs hand-written megakernels on Llama 1B; limited beta (2026-11-04). Confidence: medium, source type: vendor_reported  
  [Together AI Launches Together Compiler (press release via AIwire/HPCwire, Yahoo Finance)](https://www.hpcwire.com/aiwire/2026/11/04/together-ai-launches-together-compiler-for-continual-optimization-of-open-source-ai-models/)  
  Optimizes inference code, NOT model weights. Press release page returned 403; details from search summaries of press coverage (Forbes, 2026-11-04, also 403).
- **Trajectory raised $45M for a 'continual learning' post-training platform that retrains customers' open-source models from user feedback.**  
  $45M Series A at $300M valuation led by Sequoia; 18 employees; customers incl. Harvey, Rogo, Decagon, Mercor, Nvidia; no benchmarks (2026-11-02). Confidence: high, source type: reputable_press  
  [TechCrunch: Trajectory raises $45M to make AI model training accessible to nontechnical experts](https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/)  
  Human-in-the-loop retraining, explicitly pitched as safer than autonomous self-improvement. Not self-modification.
- **Closest recent example of a model genuinely updating its own weights: Sakana AI/UC Berkeley MASS fine-tunes the same model on its own best multi-agent runs.**  
  Qwen3.6-27B, LoRA, two rounds. Score-per-output-token vs base: MLR-Bench 1.60x, DSBench 1.35x, ScienceAgentBench 1.20x, AstaBench E2E-Hard 1.28x, Terminal-Bench 2.0 0.96x, SWE-bench Verified 0.94x. Held-out synthetic win rate vs base: 53.9% (round 1), 69.9% (round 2), only 3 test tasks. (2026-10 (arXiv 2610.12176)). Confidence: high, source type: preprint  
  [MASS: Recursive Self-Improvement through Multi-Agent Self-Supervision](https://pub.sakana.ai/mass/)  
  Just before the window. Metric is efficiency (score per token), not raw accuracy. Judged by GPT-5.5 and Claude Opus 4.8. Gains do not transfer to software engineering. Authors warn shared evaluator blind spots could compound.
- **Background: MIT SEAL (Self-Adapting Language Models) trains a model via RL to generate its own fine-tuning data ('self-edits') and apply them via LoRA gradient updates.**  
  SQuAD no-context knowledge incorporation: base 32.7%, train on passage 33.5%, self-generated synthetic data 39.7%, GPT-4.1 synthetic 46.3%, SEAL 47.0%. Few-shot ARC subset: ICL 0%, TTT+self-edit without RL 20%, SEAL 72.5%, oracle 100%. Each self-edit evaluation takes ~30-45 s; performance on earlier tasks 'gradually declines as the number of edits increases'. (2025-06-12 (v1); 2025-09-18 (v2)). Confidence: high, source type: preprint  
  [Self-Adapting Language Models (arXiv:2506.10943)](https://arxiv.org/abs/2506.10943)  
  The real 'model updates its own weights' result is over a year old, on small models and narrow tasks.
- **Background: Darwin Gödel Machine self-improves by rewriting its own agent CODE, not its weights.**  
  SWE-bench 20.0% -> 50.0%; Polyglot 14.2% -> 30.7% (2025-05-29 (v1); v3 2026-03-12). Confidence: high, source type: preprint  
  [Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents (arXiv:2505.22954)](https://arxiv.org/abs/2505.22954)  
  Underlying foundation model frozen. Useful contrast between code/scaffold self-improvement and weight self-improvement.
- **Background: SIA updates both an agent's harness and its model weights in one self-improvement loop.**  
  vs prior SOTA: LawBench +25.1%; GPU kernels 12.4% faster (1,017 vs 1,161 µs); scRNA denoising +20.4% (2026-05-26). Confidence: medium, source type: preprint  
  [SIA: Self Improving AI with Harness & Weight Updates (arXiv:2605.27276)](https://arxiv.org/abs/2605.27276)  
  Narrow domains; 'first to update both' is the authors' claim; weight-update method not detailed in abstract.
- **Background: In-Cell Learning writes new knowledge into the rounding cells of 4-bit quantized weights, so the shipped file stays bitwise unchanged.**  
  Writes 83-99% of a real-fact corpus; answers 78-88% of selected PopQA questions the released model misses; >=92.8% retention after six-task write-rehearse-consolidate cycle (two 8B runs); Qwen3 and Gemma 1.7B-32B (2026-08-21 (v1), v3 2026-08-31). Confidence: medium, source type: preprint  
  [In-Cell Learning: Language Models That Update Their Own Weights in Sequence Without Changing the File They Ship (arXiv:2608.20873)](https://arxiv.org/abs/2608.20873)  
  Despite the title, updates are a staged knowledge-writing procedure, not autonomous self-directed edits. Only abstract read.
- **Background: Google Research's Nested Learning / 'Hope' architecture is a proof of concept for a self-modifying memory with multi-frequency updates, aimed at continual learning.**  
  Company-reported lower perplexity and higher accuracy than Titans, Samba, Mamba2, Transformers on LM and common-sense tasks (2025-11-07). Confidence: medium, source type: primary  
  [Google Research: Introducing Nested Learning: A new ML paradigm for continual learning](https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning)  
  NeurIPS 2025 paper. Memory modules update at test time; not a deployed product.
- **Catastrophic forgetting remains the main barrier to models continually writing facts into their weights.**  
  After 20 sequential writes and merges: ~1% recall of earlier facts with repeated statements; ~46% with 24 varied restatements per fact; facts persist in log-probabilities (2026 (NeurIPS 2026)). Confidence: medium, source type: peer_reviewed  
  [Can a Language Model Continually Learn Facts in its Weights? (O'Neill, Kirkby, Liu, Psenka)](https://neurips.cc/virtual/2026/loc/sydney/170538)  
  Qwen3; SFT and distillation, with LoRA or full fine-tuning.
- **Forecasters expect frontier labs to keep weights mostly static for years.**  
  Median for a frontier model sustaining a weekly weight-update cadence: Jan 2033 (80% CI ~Jun 2028 to Jan 2044). 'Context and memory only, no weight change' as mid-2027 regime: 75%. Median share of 2026 frontier training compute from deployment data: 1%. (2026-08-14 (updated 2026-10-16)). Confidence: medium, source type: secondary_aggregator  
  [FutureSearch: When Will AI Have Continual Learning? (forecast on Dwarkesh Patel essay)](https://futuresearch.ai/dwarkesh-continual-learning-forecast/)  
  A search-engine summary said the median was 'never'. The page itself says Jan 2033, so use the page.
- **GPT-6 Astra, the model used, is OpenAI's top GPT-6 model, launched as a limited preview.**  
  Unveiled 2026-09-03; API id gpt-6-astra; reported 1,050,000-token context; $10/$50 per M input/output tokens (dev community post) (2026-09-03). Confidence: medium, source type: reputable_press  
  [CNBC: OpenAI announces rollout of GPT-6 Astra model; Axios](https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html)  
  Wikipedia gives general availability as 2026-09-04. Brockman told Axios he personally believes OpenAI has reached AGI. Details beyond the launch date are not verified against OpenAI primary pages.

## Counter-evidence

- Self-modification was NOT demonstrated: in every Weight-Space Programming experiment, GPT-6 Astra edited a different, much smaller model (Qwen3.5-0.8B, Gemma 3 270M, toy policy networks). Self-editing is listed only as future work.
- The headline sixfold MATH-500 gain mostly comes from fixing a looping failure that Qwen's model card already documents. Answers cut off at the token limit fell from 93.0% to 33.1%, and on a model that does not loop (Gemma 3 270M) there was no gain (6.8% to at most 7.7%).
- With smaller budgets (10 or 25 forward passes), MATH-500 rose only to 12.3% / 14.1%. The big jump appeared in one run at 50 passes over 20 hours, and run-to-run variance is unknown.
- Honnibal: only 3 experiments used raw weights alone, all on 17K-172K-weight networks. The Qwen result needed Python and running the model. Goedecke: it is essentially steering, an existing technique.
- Willison: a skilled human with pencil and paper could probably get similar weight-reading answers. Some commentary on the work outruns the evidence.
- Anthropic's S-1/A says no current model exceeds its AI R&D threshold, and that it does not expect to safely let Claude 'fully autonomously design and build successive generations of frontier models without meaningful human supervision'.
- MASS, the closest genuine self-weight-update loop, did not improve software-engineering benchmarks: SWE-bench Verified 0.94x and Terminal-Bench 2.0 0.96x score per token vs base. It relies on self-judgment, which could reinforce shared flaws.
- Catastrophic forgetting still bites: ~1% recall of earlier facts after 20 sequential weight writes (NeurIPS 2026). SEAL also degrades as edits accumulate.
- Forecasters (FutureSearch) put the median for frontier models updating weights weekly at Jan 2033, and give 75% to 'context and memory only, no weight change' in mid-2027.
- The 'RSI' products launched this week (Together Compiler) optimize GPU kernels, not models, and their numbers are vendor-reported.
- Credibility trap: several aggregator and blog headlines (e.g., 'LLMs Are Rewriting Their Own Neural Weights') misstate the MIT work. Citing them would repeat the author's past mistakes.

## Surprises

- An LLM changed 0.016% of a small model's weights by reasoning about them, with no training, and the small model went from 7.9% to 48.1% on a math test. The trick was mostly stopping it from talking in circles.
- GPT-6 Astra wrote a working Breakout-playing neural network as text in a single reply, scoring 517.4 vs 25.3 for a network trained with RL for 500 million steps. It lost to that baseline on Seaquest.
- A 27B open model on a laptop could identify which video game a network was trained on just from its raw weights (3 of 4), though each try took about an hour.
- Anthropic's IPO filing, a legal risk document, says the company 'may imminently' cross its own threshold for AI dramatically accelerating AI progress. It also admits it has in the past only noticed accelerations after they happened.
- Over 90% of contributions to Anthropic's codebase in September 2026 were written by Claude, per the S-1/A.
- Even the best 'learn new facts into the weights' methods can collapse to ~1% recall of earlier facts after 20 rounds of updates. Today's chatbots mostly 'learn' through memory and context, not by changing weights.
- Despite all the RSI talk, forecasters' median for a frontier model updating its weights weekly is 2033.

## Chart ideas

- Qwen3.5-0.8B before/after weight edit, grouped bars of MATH-500, GSM8K, IFEval, GPQA Diamond, MMLU-Pro at unedited / 10 / 25 / 50 forward passes. Data: https://github.com/RikiyaT/lm_understand-logs/blob/main/exp8_math/README.md
- Paired chart for honesty: MATH-500 accuracy vs share of answers hitting the token limit (93.0% -> 33.1%), showing the gain is mostly loop removal. Same README.
- Contrast chart: Qwen (loops) 7.9 -> 48.1 vs Gemma 3 270M (no loops) 6.8 -> 7.0/7.6/7.7/7.0. Source: rikiyat.github.io blog.
- MinAtar from-scratch networks: Astra vs PPO-100M vs PPO-500M on Breakout / Seaquest / Asterix (517.4/53.1/53.2 vs 15.8/5.6/25.8 vs 25.3/88.9/55.2). Blog; use a log scale or annotate, since Breakout dominates.
- MASS score-per-token ratios by benchmark (1.60, 1.35, 1.28, 1.20, 0.96, 0.94) with a 1.0x reference line, showing uneven transfer. Source: https://pub.sakana.ai/mass/
- Forgetting curve: fact recall after 20 sequential writes, ~1% (repeated statements) vs ~46% (varied restatements). Source: NeurIPS 2026 paper page.
- Taxonomy diagram (not data chart): what actually changes in each 'self-improvement' system. Weights edited by another model (WSP), own weights via gradient on self-generated data (SEAL, MASS), own code/scaffold (Darwin Gödel Machine, SIA harness), inference kernels (Together Compiler), context/memory only (most products).
- Timeline 2025-05 to 2026-11: DGM (May 2025), SEAL (Jun 2025), Nested Learning (Nov 2025), SIA (May 2026), In-Cell Learning (Aug 2026), MASS (Oct 2026), WSP (2 Nov 2026), Anthropic S-1/A (2 Nov 2026), WeightLoop (5 Nov 2026).

## Open questions

- Did any frontier lab (OpenAI, Google DeepMind, Anthropic, Meta, xAI) announce a deployed model that updates its own weights between 2026-10-30 and 2026-11-07? I found none despite multiple searches, but lab blogs were not exhaustively crawled.
- Has anyone independently reproduced the 50-pass Qwen MATH-500 result beyond the reported akhaliq rerun (51.0%)? That rerun is only relayed by R&D World; I did not find its primary post.
- Sean Goedecke's original critique could not be located; it is quoted only via R&D World.
- Together Compiler's primary announcement and Forbes coverage returned 403. The 1.7x figure and the 'Polymorphic Inference' framing come from search summaries of press coverage and are vendor claims.
- Is 'Sparks of Weight-Space Programming' going to appear as a peer-reviewed or arXiv paper, and what benchmark/harness the authors say they are building?
- WeightLoop and In-Cell Learning: only abstracts were read. Whether either involves a model editing itself needs the full text.
- No primary OpenAI page was read to confirm GPT-6 Astra specs (context window, pricing). Press dates (2026-09-03 vs Wikipedia's 2026-09-04 for public availability) differ slightly.
- Anthropic's RSP v3.4 exact definition of the AI R&D threshold (Gizmodo paraphrases it as roughly double the baseline rate of improvement). Check https://www.anthropic.com/responsible-scaling-policy before quoting it.
- Whether SEAL was published at a peer-reviewed venue; the arXiv page lists none.
