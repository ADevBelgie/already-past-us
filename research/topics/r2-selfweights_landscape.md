# Weight-editing landscape and replications

Research round r2, compiled 2026-11-07. Each finding shows its confidence and source type. Fact-checker verdicts are listed first. **A "corrected" or "unsupported" verdict overrides the finding.**

## Summary

Yes, a lot of people have tried this. "AI modifying weights" covers four quite different kinds of work, and how far each has got depends on the kind. (1) Gradient-based self-training, where the model writes its own training data or rewards and an optimizer then updates its own weights. This is the most developed and is SELF-directed: STaR (2022), Self-Rewarding LMs (Meta, ICML 2024), SEAL (MIT, Jun 2025), and Sakana/UC Berkeley MASS (arXiv 2610.12176, 8 Oct 2026, two LoRA cycles on Qwen3.6-27B). (2) Learned weight generators, where a network trained to output adapters for OTHER models does the writing: Sakana Text-to-LoRA (ICML 2025) and Drag-and-Drop LLMs (Jun 2025). (3) Direct edits to an OTHER model's weights. The older form is algorithmic model editing (ROME/MEMIT, 2022, which scale to thousands of facts) and steering/abliteration tools (Heretic, an automated optimizer, not an LLM). The new form is an LLM authoring the edits: MIT CSAIL's 'Sparks of Weight-Space Programming' (Takehi, Teoh, Zhang, Khattab; blog post, 2 Nov 2026, not peer-reviewed). (4) Code-level self-modification, which changes the agent's scaffolding rather than its weights: Gödel Agent (ACL 2025), Darwin Gödel Machine (SWE-bench 20.0% to 50.0%), and AlphaEvolve. AlphaEvolve did speed up a kernel used in Gemini training, cutting training time by about 1%. That is an indirect loop, not weight editing.

The MIT post checks out against its primary source. GPT-6 Astra edited 131,072 weights (0.016%) of Qwen3.5-0.8B, and MATH-500 went from 7.9% to 48.1%. A Hugging Face rerun from the logs got 51.0%. Two caveats matter. First, the edit was in another, much smaller model, not Astra itself. Second, it removed a looping failure (93% of base answers hit the 32k-token limit), so it did not add a new skill. On Gemma 3 270M the same approach produced essentially no gain (6.8% to about 7.0–7.7%). Honnibal counts only 3 of the roughly 10 experiments as raw-weight-only; all experiments on real language models used Python and/or forward passes. The authors explicitly do not claim recursive self-improvement.

Reactions since 2 Nov:
- Simon Willison (3 Nov) partly reproduced the weight-reading experiment with Qwen 3.8 27B on his laptop: 3 of 4 games identified, about 45–65 minutes per run.
- Sean Goedecke (3 Nov) argues it is not superhuman: a competent ML researcher would take the same steps, much like Heretic-style steering.
- Matthew Honnibal (3 Nov) calls the presentation misleading because it mixes raw-weight and tool-assisted experiments.
- Alex Krentsel (Google Research) reproduced the from-scratch Breakout network task and found it works only in the newest models: GPT-6 Astra about 22x the PPO baseline, Opus 5.5 about 20x, GPT-5.5 and Opus 4.8 near zero.
- A Zhihu reconstruction from the released logs found most of the gain came from fixing loops: 576 of 579 repaired answers had been truncated.

I could not find 'WeightLoop (arXiv 2026-11-05)' in two searches. Treat it as unverified or possibly non-existent.

Limits literature:
- The '~1% recall after 20 sequential writes' figure is real. It comes from arXiv 2607.11020 (O'Neill et al., Jul 2026, revised Oct 2026): 1% when each write uses repeated statements, 46% with varied examples. Its NeurIPS 2026 venue is NOT verified (no venue on the arXiv page). Do not say 'NeurIPS'.
- The FutureSearch forecast is verified: a frontier model sustaining a weekly weight-update cadence, median Jan 2033 (range Jun 2028–Jan 2044), page updated 16 Oct 2026. Secondary snippets render this confusingly as 'never'.

Deployment: no public evidence that any frontier chat or reasoning model updates its weights from live use. The best-documented production example is Cursor Tab (small model, online RL, new checkpoints every 1.5–2 h, Sep 2025).

Bottom line for the briefing: 'models now edit their own weights' is still false as a headline. The accurate version: 'frontier models can now, with tools, diagnose and patch small models' weights the way a skilled researcher would, and models have long been able to train themselves on self-generated data through ordinary gradient descent.'

## Fact-check

The main claims hold up against primary sources. The MIT post's numbers are exact: 131,072 weights (0.016%); MATH-500 7.9 to 48.1; GSM8K, IFEval and token-limit figures; Gemma 6.8 to 7.0-7.7; the MinAtar scores. So are the HF rerun (51.0%), Willison, Goedecke, SEAL, MASS, O'Neill, FutureSearch, Cursor, DGM, AlphaEvolve and the venue claims. The summary's caution about NeurIPS and WeightLoop was right.

Corrections needed:
1. Honnibal counts 2 write-from-zero rows (Exps 5 and 6), not 1. Exp 5 was also tool-free, so 4 of 10 rows used no tools, not 3.
2. Kinetix PPO failed in 0 of 256 episodes, while Astra's edit succeeded in 1,024 of 1,024. The baselines use different episode counts, and Kinetix is an edit (Exp 4), not writing from scratch.
3. Goedecke's phrase is 'smart human ML researcher', not 'competent'.
4. The HF 'independent' rerun re-evaluates the released checkpoint with different sampling settings. akhaliq also built that checkpoint export, and the rerun does not re-derive the edit. The 5.0% base figure comes from only 25 problems and should not be set against 7.9%.

Secondary-only items, not verified against originals:
- Krentsel's cross-generation multipliers (OfficeChai describing an X chart, no sample sizes). Astra's 22x differs from MIT's own 20.4x.
- The Zhihu figures (576/579, 1,152 held-out, 10.6 to 60.4) come via Latent Space only. The logs README has no 1,152-problem held-out set.
Label both as secondary and unreplicated, and do not chart them as precise.

Context to add:
- MASS gains are per output token, with no gains on SWE-bench Verified or Terminal-Bench.
- SEAL loses to GPT-4.1 synthetic data in its continued-pretraining settings.

The bottom-line framing ('not editing their own weights; with tools, patch small other models like a skilled researcher') is supported.

- **confirmed**: MIT CSAIL 'Sparks of Weight-Space Programming' (2 Nov 2026): GPT-6 Astra edited Qwen3.5-0.8B weights with no gradient descent, using a Python kernel and up to 50 forward passes; it edited 131,072 weights (0.016%). MATH-500 7.9%->48.1%, GSM8K 13.8%->67.1%, IFEval 21.0%->62.3%, token-limit hits 93%->33.1% (limit 32,768).  
  → All numbers match the primary post. Authors are Rikiya Takehi*, Jayden Teoh*, Alex Zhang and Omar Khattab (MIT CSAIL), dated 2 Nov 2026. The Qwen kernel had no GPU and allowed 10, 25 or 50 forward passes. Token-limit hits stayed at 87.2% with 10 passes and 86.4% with 25 passes. The BibTeX calls it a 'Blog post'.  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  Lab-reported, not peer-reviewed. The model being edited is a different, much smaller model, not Astra. The logs repo exists (github.com/RikiyaT/lm_understand-logs, CC BY 4.0) and says Astra ran through the Codex CLI at high, xhigh or max reasoning effort.
- **confirmed**: Gemma 3 270M: Astra's edits did not improve math (MATH-500 6.8% base vs ~7.0-7.7% edited); 'could not add an ability the model lacked'  
  → Base 6.8%. Edited: 7.0% (5 passes), 7.6% (10), 7.7% (25), 7.0% (50). Gemma's base token-limit hit rate was 8.5%, with an 8,192-token limit, so it had no looping problem to remove.  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  The quote is verbatim. Note that Gemma had a different token limit (8,192 vs Qwen's 32,768).
- **corrected**: From-scratch writing (no tools): MinAtar Breakout 517.4 vs PPO 15.8 (100M)/25.3 (500M); Seaquest 53.1 vs 5.6/88.9; Asterix 53.2 vs 25.8/55.2; Kinetix 0%->100% over 1,024 episodes, changing 3.5% of 171,664 weights  
  → The MinAtar numbers are exact. Kinetix: the PPO network succeeded in 0 of 256 episodes, and Astra's edit succeeded in 1,024 of 1,024. The 0% and 100% come from different episode counts.  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  Kinetix is a one-shot edit of an existing PPO network (Exp 4), not writing from scratch, so it should not sit under a 'from scratch' heading. Astra beats PPO-500M only on Breakout (about 20.4x). Breakout 'no tools, one reply' is correct for Exp 5.
- **confirmed**: The authors do not claim recursive self-improvement; results 'very early', capabilities 'still limited'  
  → The post calls them 'very early results' and capabilities 'still limited, specifically due to inefficiencies in context length and harnesses'. It treats models editing their own weights as a future possibility.  
  Source: https://rikiyat.github.io/blog/weight-space-programming/  
  When quoting 'still limited', keep the rest of the clause: the authors blame harness and context length, not a lack of capability.
- **confirmed**: Hugging Face rerun (akhaliq, ML Intern on HF Jobs): MATH-500 51.0% (500x4, H200), 31.6% token-limit; base smoke test 5.0% (25 problems); edit = 64 down_proj columns in MLP layers 15 and 19, only two tensors differ  
  → 51.0% and 31.6% on 500 problems x 4 samples (2,000 generations, about 43.4M tokens, 51 min, H200, vLLM). The base smoke test scored 5.0% on 25 problems, with 95% hitting the limit. Only the tensors layers.15/19.mlp.down_proj.weight differ. Dated 2 Nov 2026.  
  Source: https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming  
  Two caveats on calling it 'independent'. First, the card says akhaliq built the checkpoint itself (a multimodal export 'duplicated from' ML-Intern-lab) as well as the rerun. Second, it used its own sampling settings (presence_penalty 1.5, temp 0.6). So it independently re-evaluates the released weights but does not re-derive the edit. The 5.0% base figure comes from only 25 problems and is noisy, so it should not be compared directly with 7.9%.
- **unsupported**: Zhihu reconstruction: 576 of 579 repaired answers had hit the 32K limit; held-out 1,152 problems 10.6%->60.4%  
  → Latent Space AINews (header 3 Nov 2026, byline 4 Nov) attributes these figures to x.com/ZhihuFrontier/status/2117541464158921136, along with the quote 'Most of the gain is existing reasoning that can now finish' and the 6x projection subtraction on the top 64 neurons.  
  Source: https://latent.space/p/ainews-behind-latent-space-kill-my-saas-jev-ai-in-2026-aiei-shanghai/  
  Only a secondary source shows the figures accurately. The X thread was not fetched. The logs README gives no 1,152-problem held-out set (its only count is 1,125 audited turns). Attribute the numbers to the Zhihu thread via Latent Space, not to MIT.
- **confirmed**: Simon Willison (3 Nov) partially reproduced the 'which game' weight-reading experiment with Qwen 3.8 27B Q4_K_M (~17GB) on his laptop: 3 of 4 (Pac-Man 46m, Pong 1h05m, Breakout 52m); Freeway failed  
  → Pac-Man 46m12s (72% confidence), Pong 1h4m54s (75%), Breakout 52m25s (88%). Freeway was misidentified as a Pac-Man-like grid game. Run in LM Studio with no tools. He did not edit any weights.  
  Source: https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/  
  Both quotes are verbatim: 'a sufficiently experienced human being armed with a notepad and a pencil could get there' and 'not ready to declare that the age of source code is over'. These are single anecdotal runs.
- **confirmed**: Sean Goedecke (3 Nov): not superhuman; a competent ML researcher would take the same steps; Heretic steering/abliteration analogy; L2-norm heatmap in 3 lines of Python; 'very impressed'; Qwen looped rather than being bad at math  
  → He writes 'a smart human ML researcher could perform all of these tasks', 'This is basically the Heretic abliteration playbook', 'a heatmap in three lines of Python' and 'To be clear, I am very impressed!'. On Qwen: 'not bad at mathematics in a pure capabilities sense', it got stuck in loops.  
  Source: https://www.seangoedecke.com/llms-are-not-superhuman-at-reading-and-writing-neural-network-weights/  
  His word is 'smart human ML researcher', not 'competent'. Quote it exactly.
- **corrected**: Matthew Honnibal (3 Nov): of 10 rows, 3 raw-weights-only (exps 1, 2, 4); 6 used Python, 4 of which ran the network; 1 wrote weights from zero; every real-LM experiment used Python  
  → Honnibal's tally has two read-raw-weights-only rows (Exps 1, 2) and one read-and-write raw weights row (Exp 4). Six rows used Python (3, 6, 7a, 7b, 8, 8b), four of which ran the network (6, 7b, 8, 8b). TWO rows wrote weights from zero (Exps 5 and 6; Exp 6 overlaps with the Python rows). Quote: 'Every experiment involving a real language model uses Python.'  
  Source: https://honnibal.dev/blog/astra-read-write-misleading  
  '1 wrote weights from zero' is wrong; it is 2. Exp 5 (Breakout from scratch) also used no tools, so 4 of 10 rows were tool-free, not 3. The briefing summary's 'only 3 of roughly 10 raw-weight-only' understates this. Exact title: "The 'Astra can read and write weights to improve Qwen' post is misleading". Concessions confirmed: 'not nothing' and 'AI models of a year or two ago would have failed at all these tasks'.
- **unsupported**: Alex Krentsel (Google Research) reproduced Exp 5 across generations: GPT-5 to 5.5 and Opus 4.5 to 4.8 near zero; Opus 5 barely above baseline; GPT-5.6 Sol ~2-3x; GPT-6.1 Sol 18x; Opus 5.5 20x; GPT-6 Astra 22x the PPO-500M baseline  
  → OfficeChai (3 Nov 2026) reports these figures as relative to a 1x PPO-500M baseline, with Opus 5 'inches just above the baseline'. It describes Krentsel as a senior researcher at Google Research and a UC Berkeley PhD student. No sample sizes are given.  
  Source: https://officechai.com/ai/ability-for-weight-space-programming-has-appeared-only-in-latest-models-says-google-researcher-alex-krentsel-who-reproduced-results/  
  This is press describing a chart in an X post (x.com/AlexKrentsel/status/2117376683724660898) that was not checked against the original. It is a single unreviewed rerun with no variance reported. Astra's 22x differs slightly from MIT's own 517.4/25.3 = 20.4x, so these are separate runs. Do not chart them as exact.
- **confirmed**: Other reactions: paul_cal (no competent baselines, bug-fixing not RSI); dbreunig ('essentially meaningless'); Reddit small-transformer 75.69%->76.03%; hand-written 100K-param citation classifier reportedly beat a trained one; Latent Space 'overly favorable light' but replications make retraction unwarranted  
  → Latent Space reports all of these. Reddit: child-parent link recall 75.69->76.03, precision 89.09->89.49, and most other offline edits caused regressions. The classifier was by x.com/jacsebl, written with 'Fable' and highlighted by Legora's CTO. Latent Space also calls the work a 'big wakeup moment'.  
  Source: https://latent.space/p/ainews-behind-latent-space-kill-my-saas-jev-ai-in-2026-aiei-shanghai/  
  Confirmed only as a fair account of the aggregator. The underlying X and Reddit posts were not fetched. The Reddit gain (+0.34pt) is tiny, and the commenter called the process a diagnostic rig. Do not present it as a successful replication.
- **confirmed**: SEAL (MIT): self-edits applied via SFT gradient updates to its own weights with RL; Qwen2.5-7B SQuAD no-context base 32.7, passage-only 33.5, GPT-4.1 synthetic 46.3, SEAL 47.0; ARC Llama-3.2-1B ICL 0, TTT w/o RL 20, SEAL 72.5; forgetting quote  
  → Single-passage (n=1, LoRA) numbers match exactly. The ARC model is Llama-3.2-1B-Instruct, and Oracle TTT scores 100. arXiv v1 is 12 Jun 2025 and v2 is 18 Sep 2025. The forgetting quote is verbatim.  
  Source: https://arxiv.org/html/2506.10943v2  
  Missed context. In the continued-pretraining settings SEAL is BELOW GPT-4.1 synthetic data (58.2 vs 59.4 at n=200; 46.4 vs 49.2 at n=2067). The paper was presented at NeurIPS 2025 (nips.cc/virtual/2025/poster/118690), which the arXiv page does not show.
- **confirmed**: (Summary) Sakana/UC Berkeley MASS, arXiv 2610.12176, 8 Oct 2026, two LoRA cycles on Qwen3.6-27B  
  → 'Recursive Self-Improvement through Multi-Agent Self-Supervision', Lee, Xu, Seely, Lee, Sojoudi, Zaharia, Tang (UC Berkeley and Sakana AI). Submitted 8 Oct 2026. LoRA rank 64, two cycles L0->L1->L2, on Qwen3.6-27B.  
  Source: https://arxiv.org/html/2610.12176v1  
  Important caveat. The headline gain is 1.2-1.6x score PER OUTPUT TOKEN (efficiency) on MLR-Bench, ScienceAgentBench, DSBench and AstaBench, not absolute score. Terminal-Bench 2.0 and SWE-bench Verified were flat or slightly lower. It is a preprint.
- **confirmed**: (Summary) O'Neill et al. arXiv 2607.11020: ~1% recall after 20 sequential writes with repeated statements, 46% with varied examples; Jul 2026, revised Oct 2026; no venue  
  → 'Can a Language Model Learn Facts Continually in Its Weights?', O'Neill, Kirkby, Liu, Psenka. v1 13 Jul 2026, v3 5 Oct 2026. About 1% with repeated statements vs about 46% with varied examples (24 restatements). No venue is listed.  
  Source: https://arxiv.org/abs/2607.11020  
  Correct not to say NeurIPS.
- **confirmed**: (Summary) FutureSearch: frontier model sustaining weekly weight-update cadence, median Jan 2033 (Jun 2028-Jan 2044), updated 16 Oct 2026  
  → Median Jan 2033. The outer values Jun 2028 and Jan 2044 are unlabeled (probably 10th/90th percentiles). Middle 50% is Jan 2030-Jan 2037. Published 14 Aug 2026, updated 16 Oct 2026.  
  Source: https://futuresearch.ai/dwarkesh-continual-learning-forecast/  
  A search-engine summary wrongly said 'about 0.1 probability, never'. The 'never' belongs to a different row (per-customer updates merged into a shared base). Present the range as 'outer range', not as an exact 80% CI, unless it is confirmed. This is a forecast, not data.
- **confirmed**: (Summary) Cursor Tab online RL, new checkpoints every 1.5-2 h, Sep 2025  
  → 'Improving Cursor Tab with online RL', 12 Sep 2025: '1.5 to 2 hours to roll out a checkpoint and collect the data for the next step'. Results: 21% fewer suggestions and a 28% higher accept rate.  
  Source: https://cursor.com/blog/tab-rl  
  Vendor-reported.
- **confirmed**: (Summary) Darwin Gödel Machine SWE-bench 20.0% to 50.0%; Gödel Agent ACL 2025; AlphaEvolve cut Gemini training time ~1%  
  → DGM: SWE-bench 20.0->50.0 and Polyglot 14.2->30.7 (arXiv 2505.22954, v1 29 May 2025, v3 12 Mar 2026). Gödel Agent: arXiv comment says 'ACL 2025 main'. AlphaEvolve (DeepMind blog, 14 May 2025): a 23% kernel speedup gave a 1% reduction in Gemini training time; it also recovers 0.7% of Google's compute through Borg.  
  Source: https://arxiv.org/abs/2505.22954  
  The DGM SWE-bench figure is on a subset of SWE-bench Verified in the paper, so check before comparing with leaderboard numbers. AlphaEvolve's 1% is vendor-reported.
- **confirmed**: (Summary) Text-to-LoRA ICML 2025; Drag-and-Drop LLMs Jun 2025; Self-Rewarding LMs ICML 2024; MEMIT scales to thousands of facts  
  → T2L (arXiv 2506.06105) says 'Accepted at ICML 2025'. DnD (arXiv 2506.16406, 19 Jun 2025) lists no venue and claims up to 30% gains and 12,000x lower overhead (author-reported). Self-Rewarding (arXiv 2401.10020) comment says 'ICML 2024'. MEMIT abstract: 'thousands of associations for GPT-J (6B) and GPT-NeoX (20B)'.  
  Source: https://arxiv.org/abs/2506.06105  
  The arXiv page for Self-Rewarding lists no affiliations, though Meta is well known. MEMIT's arXiv page shows no venue (it was published at ICLR 2023).
- **unsupported**: (Summary) 'WeightLoop (arXiv 2026-11-05)' not found  
  → A further search also found no paper by that name.  
  Source: https://arxiv.org/  
  Treat it as non-existent or fabricated. Do not cite it.

### Missed evidence

- SEAL appeared at NeurIPS 2025 (https://nips.cc/virtual/2025/poster/118690). In its continued-pretraining settings it underperforms GPT-4.1-generated data (Table 2, https://arxiv.org/html/2506.10943v2).
- MASS gains are per output token (efficiency), and there were no gains on SWE-bench Verified or Terminal-Bench 2.0 (https://arxiv.org/html/2610.12176v1). The summary's 'self-directed' framing should carry this caveat.
- Follow-up to SEAL where the model writes its own self-edit templates. It does not beat the best human-designed strategy and shows exploration collapse (Cheong et al., arXiv 2601.14532, Jan 2026): https://arxiv.org/abs/2601.14532
- Google 'Transmuting prompts into weights' (Mazzawi et al., arXiv 2510.08734, v3 Jun 2026) turns prompts into reusable weight edits and links this to steering vectors: https://arxiv.org/abs/2510.08734
- Other reproductions and threads that Latent Space cites but were not checked: NielsRogge HF reproduction https://x.com/NielsRogge/status/2117541532827848972 ; kimmonismus cross-generation replication https://x.com/kimmonismus/status/2117535870173474880 ; ravfogel https://x.com/ravfogel/status/2117642301442752692 ; yoonholeee https://x.com/yoonholeee/status/2117674630815388108
- MIT logs README: 1,125 turns audited as tool-free. Code-enabled experiments (3, 6, 7, 8) ran in a no-network sandbox, and Astra ran through the Codex CLI at high/xhigh/max reasoning effort (https://github.com/RikiyaT/lm_understand-logs). This is useful provenance for the briefing.
- An AI-2027 tracker entry also finds no disclosed frontier daily or weekly weight updates: https://ai2027-tracker.com/predictions/agent-2-online-learning/
- Sakana's Transformer-squared (self-adaptive LLMs, 2025) is a further example of a model adapting its own weights at inference and is not in the landscape list (URL not verified here).

## Findings

- **MIT CSAIL 'Sparks of Weight-Space Programming': GPT-6 Astra edited Qwen3.5-0.8B weights directly (no gradient descent), with a Python kernel and up to 50 forward passes; it edited 131,072 weights (0.016%)**  
  MATH-500 7.9% -> 48.1%; GSM8K 13.8% -> 67.1%; IFEval 21.0% -> 62.3%; answers hitting 32,768-token limit 93% -> 33.1% (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming (Takehi, Teoh, Zhang, Khattab, MIT CSAIL)](https://rikiyat.github.io/blog/weight-space-programming/)  
  Blog-style technical report, not peer-reviewed. Edit target is ANOTHER model (OTHER axis), not Astra itself. At 10 or 25 forward passes the loops 'barely went away'. Logs: github.com/RikiyaT/lm_understand-logs
- **Same post: on Gemma 3 270M (which did not have the looping pathology), Astra's edits did not improve math**  
  MATH-500 6.8% base vs ~7.0–7.7% edited (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)  
  Authors say editing 'could not add an ability the model lacked'. Key counterpoint to the 'model got smarter' framing.
- **Same post: from-scratch weight writing and other experiments (no tools, one reply)**  
  MinAtar Breakout 517.4 vs PPO 15.8 (100M steps) / 25.3 (500M); Seaquest 53.1 vs 5.6/88.9; Asterix 53.2 vs 25.8/55.2; Kinetix policy fix 0% -> 100% success over 1,024 episodes changing 3.5% of 171,664 weights (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)  
  It beats PPO-500M only on Breakout (Honnibal notes this too). Networks are tiny (~17K–1.5M weights).
- **The authors do not claim recursive self-improvement**  
  RSI listed only as a future possibility (2026-11-02). Confidence: high, source type: primary  
  [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)  
  They describe the results as 'very early' and capabilities as 'still limited'.
- **Independent rerun of the edited Qwen3.5-0.8B checkpoint by Hugging Face (akhaliq, ML Intern on HF Jobs)**  
  MATH-500 51.0% (500 problems x 4 samples, H200), 31.6% hitting token limit; base smoke test 5.0% (25 problems) (2026-11-02). Confidence: high, source type: primary  
  [RikiyaT/Qwen3.5-0.8B-weight-space-programming model card](https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming)  
  Confirms the checkpoint's benchmark gain. It reran the evaluation of the released checkpoint; it did not independently re-derive the edit. Edit = subtracting a loop direction from 64 down_proj output columns in MLP layers 15 and 19; only two tensors differ.
- **Zhihu reconstruction from the released logs: the gain is almost entirely loop removal**  
  576 of 579 repaired answers had originally hit the 32K limit; held-out 1,152 problems 10.6% -> 60.4% (2026-11-03). Confidence: medium, source type: secondary_aggregator  
  [Latent Space AINews (citing ZhihuFrontier thread)](https://latent.space/p/ainews-behind-latent-space-kill-my-saas-jev-ai-in-2026-aiei-shanghai/)  
  Original is an X thread (x.com/ZhihuFrontier/status/2117541464158921136), not fetched. Latent Space: 'Most of the gain is existing reasoning that can now finish.'
- **Simon Willison partially reproduced the 'which game' weight-reading experiment with Qwen 3.8 27B (Q4_K_M, ~17GB) on his laptop**  
  3 of 4 games identified (Pac-Man 46m, Pong 1h05m, Breakout 52m); Freeway failed (2026-11-03). Confidence: high, source type: blog_or_social  
  [Qwen 3.8 27B on my laptop can interpret model weights, too](https://simonwillison.net/2026/Nov/3/qwen-can-interpret-model-weights/)  
  Anecdotal single runs. He reproduced reading, not editing. He thinks a patient human could do the same and is 'not ready to declare that the age of source code is over'.
- **Sean Goedecke: LLMs are not superhuman at reading and writing weights**  
  Argues a competent ML researcher would take the same steps (contrast pairs, attribute weights, trim, test); compares to Heretic steering/abliteration; game ID solvable with an L2-norm heatmap in 3 lines of Python (2026-11-03). Confidence: high, source type: blog_or_social  
  [LLMs are not superhuman at reading and writing neural network weights](https://www.seangoedecke.com/llms-are-not-superhuman-at-reading-and-writing-neural-network-weights/)  
  Concedes the results are real and 'very impressed'. Says the Qwen model wasn't bad at math, it looped.
- **Matthew Honnibal: the Astra post is misleading because it conflates raw-weight reading with tool-assisted editing**  
  Of 10 table rows: 3 raw-weights-only (exps 1, 2, 4); 6 used Python, of which 4 also ran the network; 1 wrote weights from zero; every real-LM experiment used Python (2026-11-03). Confidence: high, source type: blog_or_social  
  [The 'Astra can read and write weights' post is misleading](https://honnibal.dev/blog/astra-read-write-misleading)  
  Concedes it is a real capability that models from a year or two earlier lacked, and that it 'is not nothing'.
- **Alex Krentsel (Google Research) reproduced Experiment 5 (write a ~20K-weight Breakout network in one reply) across model generations**  
  GPT-5 to GPT-5.5 and Opus 4.5 to 4.8 near zero; Opus 5 barely above baseline; GPT-5.6 Sol ~2-3x; GPT-6.1 Sol 18x; Opus 5.5 20x; GPT-6 Astra 22x the PPO-500M baseline (2026-11-03). Confidence: medium, source type: reputable_press  
  [OfficeChai: ability for weight-space programming has appeared only in latest models](https://officechai.com/ai/ability-for-weight-space-programming-has-appeared-only-in-latest-models-says-google-researcher-alex-krentsel-who-reproduced-results/)  
  Secondary report of an X thread. No sample sizes or variance. Krentsel says self-editing of frontier-scale weights is not feasible yet. Consistent with MIT's 517.4/25.3 ≈ 20x.
- **Other community reactions: overclaiming critiques and small-scale replications**  
  paul_cal: no competent baselines, bug-fixing not RSI; dbreunig: fitting weights to a benchmark 'essentially meaningless'; Reddit small-transformer replication 75.69% -> 76.03%; a user's hand-written 100K-param citation classifier reportedly beat a trained one (2026-11-03). Confidence: medium, source type: secondary_aggregator  
  [Latent Space AINews](https://latent.space/p/ainews-behind-latent-space-kill-my-saas-jev-ai-in-2026-aiei-shanghai/)  
  Latent Space: claims 'presented in overly favorable light' but replications make retraction unwarranted.
- **SEAL (Self-Adapting LMs, MIT): the model generates its own fine-tuning data/directives ('self-edits'), which are applied by gradient updates to ITS OWN weights, with RL rewarding useful self-edits**  
  Knowledge incorporation (Qwen2.5-7B, SQuAD no-context): base 32.7%, passage-only 33.5%, GPT-4.1 synthetic 46.3%, SEAL 47.0%; few-shot ARC (Llama-3.2-1B): ICL 0%, TTT without RL 20%, SEAL 72.5% (2025-06-12 (v2 2025-09-18)). Confidence: high, source type: preprint  
  [Self-Adapting Language Models (Zweiger, Pari, Guo, Akyürek, Kim, Agrawal)](https://arxiv.org/abs/2506.10943)  
  SELF + gradient. Paper says 'performance on earlier tasks gradually declines as the number of edits increases' (catastrophic forgetting). Small models.
- **MASS (Sakana AI + UC Berkeley): one model proposes, runs and self-evaluates multi-agent workflows, then is fine-tuned on its own best trajectories**  
  Qwen3.6-27B, two cycles, 1.2–1.6x performance per output token on four open-ended benchmarks (2026-10-08). Confidence: high, source type: preprint  
  [Recursive Self-Improvement through Multi-Agent Self-Supervision (Lee, Xu, Seely, Lee, Sojoudi, Zaharia, Tang)](https://arxiv.org/abs/2610.12176)  
  SELF + gradient (LoRA SFT). Secondary coverage (aiweekly) reports held-out win rate vs base 53.9% -> 69.9% and round-2 scores 0.96x/0.94x of base on Terminal-Bench 2.0/SWE-bench Verified, i.e. no transfer to coding. Those figures are not in the abstract; check the paper body.
- **Self-Rewarding Language Models (Meta): the model judges its own outputs to produce rewards for iterative DPO on itself**  
  Llama 2 70B after 3 iterations outperforms Claude 2, Gemini Pro and GPT-4 0613 on AlpacaEval 2.0 (2024-01-18). Confidence: high, source type: peer_reviewed  
  [Self-Rewarding Language Models (Yuan et al.)](https://arxiv.org/abs/2401.10020)  
  ICML 2024. SELF + gradient.
- **STaR: the model bootstraps reasoning by fine-tuning on its own correct rationales**  
  Early self-training method (2022) (2022-03). Confidence: medium, source type: peer_reviewed  
  [STaR: Bootstrapping Reasoning With Reasoning (Zelikman et al.)](https://arxiv.org/abs/2203.14465)  
  Not re-fetched this run; details from prior knowledge. NeurIPS 2022.
- **Text-to-LoRA (Sakana AI): a hypernetwork generates LoRA adapters for an LLM from a natural-language task description in one forward pass**  
  Trained on 9 LoRA adapters; matches task-specific adapters on their test sets; zero-shot to unseen tasks (2025-06-06). Confidence: high, source type: peer_reviewed  
  [Text-to-LoRA: Instant Transformer Adaption (Charakorn, Cetin, Tang, Lange)](https://arxiv.org/abs/2506.06105)  
  ICML 2025. OTHER + learned weight generator.
- **Drag-and-Drop LLMs: a prompt-conditioned parameter generator maps unlabeled prompts to LoRA weights**  
  Up to 12,000x lower overhead than full fine-tuning; up to 30% average gains over strongest trained LoRAs on unseen benchmarks; parameters in seconds (2025-06-19). Confidence: high, source type: preprint  
  [Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights (Liang et al.)](https://arxiv.org/abs/2506.16406)  
  Self-reported in abstract. OTHER + learned weight generator.
- **MEMIT: direct algorithmic (closed-form) edits of transformer MLP weights to insert facts**  
  Scales to 'thousands of associations' on GPT-J (6B) and GPT-NeoX (20B) (2022-10-13). Confidence: high, source type: preprint  
  [Mass-Editing Memory in a Transformer (Meng, Sen Sharma, Andonian, Belinkov, Bau)](https://arxiv.org/abs/2210.07229)  
  OTHER + direct edit by algorithm, not by an LLM. Successor to ROME (arXiv 2202.05262, NeurIPS 2022; not re-fetched). Published at ICLR 2023 (not shown on arXiv page).
- **Sequential locate-then-edit methods collapse after a few hundred edits; batch editing handles tens of thousands**  
  'catastrophic forgetting and model collapse after only a few hundred edits' (2026). Confidence: high, source type: peer_reviewed  
  [Rethinking Sequential Locate-Then-Edit: Optimality and Stability (Liu et al.), NeurIPS 2026 poster](https://neurips.cc/virtual/2026/poster/149983)  
  This is the verified NeurIPS 2026 sequential-editing paper. It is NOT the source of the '1% after 20 writes' figure.
- **Heretic: automatic removal of refusals or other behaviours by directional ablation of weights, tuned by an Optuna TPE optimizer that minimizes refusals and KL divergence**  
  One command; ~30–40 min for Qwen3-4B-Instruct-2507 on an RTX 3090; no headline refusal/KL numbers on README (2025–2026 (ongoing)). Confidence: high, source type: primary  
  [p-e-w/heretic GitHub](https://github.com/p-e-w/heretic)  
  OTHER + direct edit by optimizer (no LLM reasoning). Goedecke cites it as the human-equivalent method to Astra's Qwen fix.
- **Darwin Gödel Machine: an agent rewrites its own code (scaffolding, tools) through open-ended evolution, with no weight changes**  
  SWE-bench 20.0% -> 50.0%; Polyglot 14.2% -> 30.7% (2025-05-29 (v3 2026-03-12)). Confidence: high, source type: preprint  
  [Darwin Godel Machine (Zhang, Hu, Lu, Lange, Clune)](https://arxiv.org/abs/2505.22954)  
  SELF + code-level. Foundation model weights frozen.
- **Gödel Agent: an agent dynamically modifies its own logic and code via LLM prompting**  
  No numbers in abstract (2024-10-06 (v4 2025-05-31)). Confidence: high, source type: peer_reviewed  
  [Gödel Agent (Yin et al.)](https://arxiv.org/abs/2410.04444)  
  ACL 2025 main. SELF + code-level.
- **AlphaEvolve improved infrastructure used to train the LLMs that power it (indirect loop, not weight editing)**  
  Gemini matmul kernel 23% faster -> ~1% less Gemini training time; ~0.7% of Google fleet compute recovered; FlashAttention up to 32.5% faster; 4x4 complex matmul in 48 multiplications (2025-05-14). Confidence: high, source type: vendor_reported  
  [AlphaEvolve: A Gemini-powered coding agent (Google DeepMind blog)](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)  
  SELF (indirect) + code-level.
- **Limits: sequential fact writes into weights forget heavily (the '~1% after 20 sequential writes' figure)**  
  After 20 sequential writes and merges: 1% of earlier facts answered correctly with repeated-statement writes; 46% with varied examples (2026-07-13 (v3 2026-10-05)). Confidence: high, source type: preprint  
  [Can a Language Model Learn Facts Continually in Its Weights? (O'Neill, Kirkby, Liu, Psenka)](https://arxiv.org/abs/2607.11020)  
  Number VERIFIED; 'NeurIPS 2026' venue NOT verified (no venue on arXiv page). Model: Qwen3. Say 'a July 2026 preprint', not 'NeurIPS'.
- **FutureSearch forecast: a frontier model sustains a weekly weight-update cadence**  
  Median Jan 2033 (range Jun 2028 – Jan 2044; other listed dates Jan 2030, Jan 2037) (2026-08-14 (updated 2026-10-16)). Confidence: high, source type: secondary_aggregator  
  [FutureSearch: Dwarkesh continual learning forecast](https://futuresearch.ai/dwarkesh-continual-learning-forecast/)  
  VERIFIED. A forecast, not data. Also: mid-2027 regime 75% 'memory only (no weight change)', 2% per-customer weekly weight forks; lab merging per-customer updates into shared base median Jan 2035.
- **No publicly known frontier chat/reasoning model updates its weights from live sessions; the documented production example is narrow**  
  Cursor Tab: online RL, new checkpoint rollout/data cycle every ~1.5–2 hours; 21% fewer suggestions, 28% higher accept rate (2025-09-12). Confidence: high, source type: vendor_reported  
  [Cursor blog: Improving Cursor Tab with online RL](https://cursor.com/blog/tab-rl)  
  Gradient updates driven by user data, run by the company, not the model editing itself. The 'no frontier model' claim comes from a FutureSearch evidence sheet surfaced via search (not fetched directly).

## Counter-evidence

- Gemma 3 270M result in the MIT post: no math gain (6.8% to ~7.0–7.7%). Editing removed an obstacle in Qwen and did not add capability.
- The Qwen base model was pathological: 93% of MATH-500 answers hit the 32k-token limit, and the Zhihu reconstruction finds 576 of 579 repaired answers were previously truncated. The 'sixfold math gain' headline overstates this.
- Honnibal: only 3 of ~10 experiments used raw weights alone; all real-LM experiments used Python and/or forward passes. So 'natively reading weights' was not shown on real language models.
- Goedecke: the Qwen fix follows a standard steering/abliteration recipe (contrast pairs, find direction, ablate) that tools like Heretic already automate without an LLM.
- Krentsel: self-editing of frontier-scale weights is not feasible yet; the demo networks are ~20K weights versus hundreds of billions.
- A Reddit small-transformer replication found only a tiny gain (75.69% to 76.03%).
- Willison's laptop reproduction was single, slow runs (45–65 min each) with one failure (Freeway) and some misdescribed board sizes (8x8 vs 10x10).
- The forgetting literature: sequential weight writes collapse fast (1% retention after 20 writes with repeated statements, arXiv 2607.11020), and locate-then-edit methods collapse after a few hundred edits (NeurIPS 2026). This limits 'self-editing in deployment'.
- SEAL's own paper acknowledges declining performance on earlier tasks as self-edits accumulate.
- MASS gains did not transfer to coding (reported 0.96x/0.94x of base on Terminal-Bench 2.0/SWE-bench Verified, via secondary coverage), and only two rounds were run.
- Search-snippet conflict: one FutureSearch snippet rendered the weekly-cadence forecast as 'never', but the page itself shows a median of Jan 2033.

## Chart ideas

- Landscape matrix: rows = mechanism (gradient self-training / learned weight generator / direct edits / code-level self-modification), columns = SELF vs OTHER. Each cell lists named efforts with year and a 'how far' badge (research toy / benchmark gain / shipped). The MIT result sits in 'direct edits, OTHER', and the empty 'direct edits, SELF' cell is itself the story.
- Cross-generation bar chart from Krentsel's reproduction: Breakout network written in one reply, as a multiple of PPO-500M (GPT-5.5/Opus 4.8 near 0, Opus 5 ~1x, GPT-5.6 Sol ~2-3x, GPT-6.1 Sol 18x, Opus 5.5 20x, GPT-6 Astra 22x). Label as a secondary report of a single reproduction.
- What the 'sixfold math' really was: paired bars for Qwen3.5-0.8B MATH-500 (7.9% to 48.1%, HF rerun 51.0%), with a second series for % of answers truncated at 32k tokens (93% to 33.1%). Add Gemma 3 270M (6.8% to ~7%) as the control.
- Forgetting curve: retention of earlier facts versus number of sequential writes (1 to 20), two lines ending at 1% (repeated statements) and 46% (varied examples), from arXiv 2607.11020. Use the endpoints only unless intermediate points are read from the paper's figure.
- Timeline 2022–2026 of 'models changing models': ROME/MEMIT 2022, STaR 2022, Self-Rewarding 2024, Gödel Agent Oct 2024, AlphaEvolve May 2025, DGM May 2025, SEAL/T2L/DnD Jun 2025, Cursor Tab online RL Sep 2025, MASS Oct 2026, Weight-Space Programming Nov 2026, colour-coded by SELF/OTHER.
- Forecast strip: FutureSearch distribution for 'frontier model sustains weekly weight-update cadence' (p10 ~2030, median Jan 2033, p90 ~2037, range to 2044) against today's reality (memory-only, 75% for mid-2027).

## Open questions

- 'WeightLoop' (claimed arXiv 2026-11-05): not found in two searches. Unverified; possibly misnamed or non-existent. Do not cite without an arXiv ID.
- 'NeurIPS 2026' attribution of the ~1%-after-20-writes result: the number is verified in arXiv 2607.11020, but no venue is listed. Check the NeurIPS 2026 accepted-papers list before saying NeurIPS.
- MASS secondary figures (win rate 53.9% to 69.9%; 0.96x/0.94x on Terminal-Bench/SWE-bench) are not in the abstract. Verify in the paper body or the Sakana blog.
- Krentsel's exact multiples (22x vs 20x) come from press summaries of an X thread and a chart; the original thread was not read. No variance or sample size reported.
- Zhihu log reconstruction (10.6% to 60.4% on 1,152 held-out problems) is known only via Latent Space; the original thread was not read.
- Shopify daily retraining loop from production failures (reported 2026-08-05 via a FutureSearch evidence sheet): not verified against a primary Shopify source.
- Has any lab publicly shipped a frontier model that updates its weights from deployment? No evidence found, but searches were limited (about 15). Check recent OpenAI/Anthropic/Google/Thinking Machines release notes directly.
- Has anyone tried LLM-authored direct edits to the editing model's OWN weights (the SELF + direct-edit cell)? Nothing found; the MIT authors list it only as a future direction.
- STaR, ROME, hypernetworks (Ha et al. 2016), neural functionals / weight-space learning, test-time training (TTT, Titans) and Google's 'Transmuting prompts into weights' (arXiv 2510.08734) were not re-fetched this run. Verify the dates and numbers before including them in charts.
