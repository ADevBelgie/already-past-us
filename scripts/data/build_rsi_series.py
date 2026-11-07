"""Build the data for the s6 "AI building AI" dashboard (src/charts/RsiDashboard.jsx).

Run from anywhere:   python -I scripts/data/build_rsi_series.py

Inputs (all under research/):
  data/rsi_series.csv            research series (cleaned here, see CLEANING below)
  data/metr_points.json          METR Time Horizon 1.1 points (minutes)
  data/raw/eci_scores.csv        Epoch ECI scores, downloaded 7 Nov 2026
  manuscript footnotes [^s6-*] / [^s3-*] in already-past-us.md for values the CSV lacks

Outputs:
  src/data/rsi_series.json       chart data
  public/data/rsi_series.csv     cleaned CSV, linked from the manuscript as a download

CLEANING (per the s6 chart placeholder and r2/r3 fact checks):
  - Microsoft 2025-04-29 row dropped (unverified offhand remark; different measure).
  - OpenAI 2026-06 "crossover" value of 1 dropped as a number; replaced by an upper bound
    ("below 1 before June 2026"), which the s6-openai footnote confirms on OpenAI's page.
  - Anthropic training-code speedup for Opus 4.5 taken from the primary system card
    (16.53x, s6-speedup), not the secondary aggregator's 17.
  - Company code-share statements split into per-company indicators (never one line).
  - Rows not cited anywhere in the manuscript (MLE-bench, open-ended task success,
    research-judgment win rate) are not carried into the public file.
Every output row carries the manuscript footnote id that supports it.
"""
import csv
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
R = lambda *p: os.path.join(ROOT, *p)

MANUSCRIPT = R('already-past-us.md')


def read_footnotes():
    notes = {}
    with open(MANUSCRIPT, encoding='utf-8') as f:
        for line in f:
            if line.startswith('[^s') and ']:' in line:
                key = line[2:line.index(']:')]
                notes[key] = line
    return notes


FN = read_footnotes()


def need(fid, *snippets):
    """Fail loudly if the footnote does not contain the text a value is taken from."""
    text = FN.get(fid)
    if text is None:
        sys.exit(f'footnote {fid} missing from manuscript')
    for s in snippets:
        if s not in text:
            sys.exit(f'footnote {fid} no longer contains {s!r}; re-check the value')


def research_rows():
    with open(R('research', 'data', 'rsi_series.csv'), encoding='utf-8', newline='') as f:
        return list(csv.DictReader(f))


SRC = research_rows()


def src_value(indicator_start, date):
    hits = [r for r in SRC if r['indicator'].startswith(indicator_start) and r['date'] == date]
    if len(hits) != 1:
        sys.exit(f'expected one research row for {indicator_start!r} {date}, got {len(hits)}')
    return float(hits[0]['value']), hits[0]


rows = []


def num(v):
    """Keep values exactly as sourced; drop a trailing .0 only (25.0 -> 25)."""
    return int(v) if isinstance(v, float) and v.is_integer() else v


def add(**kw):
    base = dict(tier='', panel='', indicator='', unit='', measured_by='', tag='', kind='point',
                date='', date_label='', value=None, bound='', ci_low=None, ci_high=None,
                label='', footnote='', url='', in_chart=True, note='')
    base.update(kw)
    for k in ('value', 'ci_low', 'ci_high'):
        base[k] = num(base[k])
    rows.append(base)


# ── Tier A: independent ──────────────────────────────────────────────────────
# METR 50% time horizon, frontier running max of METR's state-of-the-art points, from GPT-4 on.
need('s6-metr', 'about 4 minutes', '17.4 hours', 'unreliable')
with open(R('research', 'data', 'metr_points.json'), encoding='utf-8') as f:
    metr = json.load(f)
best = -1
METR_NAMES = {
    'gpt_4': 'GPT-4', 'gpt_4_1106_inspect': 'GPT-4 (Nov 2023 update)', 'gpt_4o_inspect': 'GPT-4o',
    'claude_3_5_sonnet_20240620_inspect': 'Claude 3.5 Sonnet (Jun 2024)', 'o1_preview': 'o1-preview',
    'claude_3_5_sonnet_20241022_inspect': 'Claude 3.5 Sonnet (Oct 2024)', 'o1_inspect': 'o1',
    'claude_3_7_sonnet_inspect': 'Claude 3.7 Sonnet', 'o3_inspect': 'o3', 'gpt_5_2025_08_07_inspect': 'GPT-5',
    'gemini_3_pro': 'Gemini 3 Pro', 'claude_opus_4_5_inspect': 'Claude Opus 4.5', 'gpt_5_2': 'GPT-5.2',
    'claude_opus_4_6_inspect': 'Claude Opus 4.6', 'claude_mythos_preview_early_inspect': 'Claude Mythos Preview (early)',
}
for p in sorted(metr, key=lambda p: p['date']):
    if not p['sota'] or p['date'] < '2023-03-14':
        continue
    if p['p50'] > best:
        best = p['p50']
        add(tier='A', panel='metr', indicator='METR 50% time horizon, frontier (running max)', unit='minutes',
            measured_by='Independent (METR)', tag='verified', date=p['date'], value=round(p['p50'], 2),
            ci_low=round(p['lo'], 1), ci_high=round(p['hi'], 1), label=METR_NAMES.get(p['key'], p['key']),
            footnote='s6-metr', url='https://metr.org/assets/benchmark_results_1_1.yaml')
assert rows[0]['label'] == 'GPT-4' and round(rows[0]['value']) == 4
assert rows[-1]['label'].startswith('Claude Mythos') and round(rows[-1]['value'] / 60, 1) == 17.4
need('s6-metr', 'Likely ≥16h')
rows[-1]['note'] = 'Above 16 hours, where METR says measurements are unreliable; METR summarises it as "Likely ≥16h"'
add(tier='A', panel='metr', kind='reference', indicator='METR reliability limit', unit='minutes',
    measured_by='Independent (METR)', tag='verified', value=960, label='Measurements above 16 hours are unreliable',
    footnote='s6-metr', url='https://metr.org/time-horizons/')

# Epoch ECI frontier: running max of Epoch's public scores from GPT-4 (Mar 2023) on.
need('s6-eci', '14 points a year', '169.07', '3 September 2026')
with open(R('research', 'data', 'raw', 'eci_scores.csv'), encoding='utf-8', newline='') as f:
    eci = [r for r in csv.DictReader(f) if r['eci'] and r['date']]
by_date = {}
for r in eci:
    v = float(r['eci'])
    if r['date'] not in by_date or v > float(by_date[r['date']]['eci']):
        by_date[r['date']] = r
MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def eci_date_note(name, d):
    """Epoch's display name sometimes carries a month that differs from its release date column."""
    for i, mon in enumerate(MONTHS):
        tag = f'({mon} '
        if tag in name:
            yr = name.split(tag)[1][:4]
            if (yr, f'{i + 1:02d}') != (d[:4], d[5:7]):
                return f'Plotted at the release date Epoch lists, {d}'
    return ''


best = -1
for d in sorted(by_date):
    r = by_date[d]
    v = float(r['eci'])
    if v > best:
        best = v
        if d >= '2023-03-14':
            add(tier='A', panel='eci', indicator='Epoch Capabilities Index (ECI), frontier running max',
                unit='ECI points', measured_by='Independent (Epoch AI)', tag='verified', date=d, value=v,
                ci_low=float(r['eci_ci_low']) if r['eci_ci_low'] else None,
                ci_high=float(r['eci_ci_high']) if r['eci_ci_high'] else None,
                label=r['Display name'], footnote='s6-eci', url='https://epoch.ai/data/eci_scores.csv',
                note=eci_date_note(r['Display name'], d))
eci_rows = [x for x in rows if x['panel'] == 'eci']
assert eci_rows[-1]['label'] == 'GPT-6 Astra' and eci_rows[-1]['value'] == 169.07
# Cross-check against the research CSV's ECI rows: every value there must match the raw file.
for r in SRC:
    if r['indicator'].startswith('Epoch Capabilities Index'):
        if r['date'] in by_date and abs(float(by_date[r['date']]['eci']) - float(r['value'])) > 0.005:
            sys.exit(f'ECI mismatch on {r["date"]}: research CSV {r["value"]} vs raw {by_date[r["date"]]["eci"]}')

# ── Tier B: independent analysis of private lab data ────────────────────────
need('s6-accel', '1.9x', '95% CI 1.5–2.8x', '1.4x across all developers')
add(tier='B', panel='accel', kind='interval', indicator='Pace of capability gains after 7 Oct 2025, multiple of earlier pace',
    unit='x earlier pace', measured_by='Independent analysis (METR) of private Anthropic data', tag='estimate',
    date='2026-11-05', date_label='Assessment published 5 Nov 2026', value=1.9, ci_low=1.5, ci_high=2.8,
    label="Anthropic's models", footnote='s6-accel',
    url='https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/',
    note='Anthropic redacted a majority of the evidence METR found most informative')
add(tier='B', panel='accel', indicator='Pace of capability gains after 7 Oct 2025, multiple of earlier pace',
    unit='x earlier pace', measured_by='Independent analysis (METR) of private Anthropic data', tag='estimate',
    date='2026-11-05', date_label='Assessment published 5 Nov 2026', value=1.4, label="All developers' models",
    footnote='s6-accel', url='https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/',
    note='No interval given in the sources used here')
add(tier='B', panel='accel', kind='reference', indicator='Earlier pace', unit='x earlier pace',
    measured_by='Independent analysis (METR) of private Anthropic data', tag='estimate', value=1,
    label='Same pace as before Oct 2025', footnote='s6-accel',
    url='https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/')

# ── Tier C: lab self-reports (one indicator per company) ────────────────────
need('s6-google', 'more than a quarter', 'nearly half', '75% of all new code', 'up from 50% last fall')
G = 'Google: share of new code AI-generated and approved by engineers'
GURL = {
    '2024-10-29': 'https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2024/',
    '2025-10-09': 'https://blog.google/products/google-cloud/gemini-enterprise-sundar-pichai',
    '2026-04-22': 'https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/',
}
for d, bound, lab in [('2024-10-29', 'gt', '"more than a quarter"'),
                      ('2025-10-09', 'approx', '"nearly half" (restated in Apr 2026 as 50%)'),
                      ('2026-04-22', '', '75%')]:
    v, _ = src_value('Share of new code AI-generated', d)
    add(tier='C', panel='google', indicator=G, unit='percent', measured_by='Lab (Google), self-reported',
        tag='vendor', date=d, value=v, bound=bound, label=lab, footnote='s6-google', url=GURL[d])

need('s6-anthro-code', 'more than 80% of code merged', 'May 2026', 'over 90% of the contributions to our codebase in September 2026')
v, _ = src_value('Share of new code AI-generated', '2026-05')
add(tier='C', panel='anthro-code', indicator='Anthropic: share of merged code written by Claude', unit='percent',
    measured_by='Lab (Anthropic), self-reported', tag='vendor', date='2026-05', date_label='May 2026', value=v,
    bound='gt', label='Merged code', footnote='s6-anthro-code',
    url='https://www.anthropic.com/institute/recursive-self-improvement')
add(tier='C', panel='anthro-code', indicator='Anthropic: share of contributions to codebase written by Claude (S-1)',
    unit='percent', measured_by='Lab (Anthropic), IPO filing', tag='vendor', date='2026-09', date_label='September 2026',
    value=90, bound='gt', label='Contributions to codebase (S-1)', footnote='s6-anthro-code',
    url='https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm',
    note='Different, undefined measure from "merged code"; not joined')

need('s6-speedup', 'about 3x', 'Opus 4.5 16.53x', 'Opus 4.6 34x', 'Mythos Preview 51.91x', 'about 4x for a skilled human')
SP = 'Anthropic: LLM-training code optimisation speedup (internal test)'
v, _ = src_value('Anthropic LLM-training code', '2025-05-22')
assert v == 3
for d, val, lab, bound, url in [
    ('2025-05-22', 3, 'Claude Opus 4', 'approx', 'https://www.anthropic.com/institute/recursive-self-improvement'),
    ('2025-11-24', 16.53, 'Claude Opus 4.5', '', 'https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf'),
    ('2026-02-05', 34, 'Claude Opus 4.6', '', 'https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf'),
    ('2026-04-07', 51.91, 'Claude Mythos Preview', '', 'https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf'),
]:
    add(tier='C', panel='speedup', indicator=SP, unit='x speedup', measured_by='Lab (Anthropic), self-reported',
        tag='vendor', date=d, value=val, bound=bound, label=lab, footnote='s6-speedup', url=url,
        note='Test suite saturated; runs that gamed the timer excluded' if val == 51.91 else '')
add(tier='C', panel='speedup', kind='reference', indicator=SP, unit='x speedup',
    measured_by='Lab (Anthropic), self-reported', tag='vendor', value=4,
    label='Skilled human in 4-8 hours', footnote='s6-speedup',
    url='https://www.anthropic.com/institute/recursive-self-improvement')

need('s6-openai', '3.1 agent-workdays', 'below human labour before June', 'not productivity')
v, _ = src_value('OpenAI agent-workdays', '2026-08-15')
OA = 'OpenAI: agent-workdays per human workday, research organisation'
add(tier='C', panel='openai', kind='bound', indicator=OA, unit='ratio', measured_by='Lab (OpenAI), self-reported',
    tag='vendor', date='', date_label='Before June 2026', value=1, bound='lt', label='Below 1',
    footnote='s6-openai', url='https://openai.com/index/research-acceleration-view-inside-openai/',
    note='Upper bound, not a measured value')
add(tier='C', panel='openai', indicator=OA, unit='ratio', measured_by='Lab (OpenAI), self-reported', tag='vendor',
    date='2026-08-15', date_label='Mid-August 2026', value=v, label='3.1', footnote='s6-openai',
    url='https://openai.com/index/research-acceleration-view-inside-openai/',
    note='Total runtime of agents running in parallel, not quality')
add(tier='C', panel='openai', kind='reference', indicator=OA, unit='ratio', measured_by='Lab (OpenAI), self-reported',
    tag='vendor', value=1, label='Agent runtime equals human working time', footnote='s6-openai',
    url='https://openai.com/index/research-acceleration-view-inside-openai/')

# ── Threshold strip ──────────────────────────────────────────────────────────
need('s6-openai-th', 'Astra does not reach our High threshold')
add(tier='T', panel='thresholds', kind='status', indicator='OpenAI Preparedness: AI self-improvement',
    measured_by='Lab (OpenAI), system card', tag='vendor', date='2026-09-03', date_label='3 Sep 2026',
    label='GPT-6 Astra', footnote='s6-openai-th', url='https://deploymentsafety.openai.com/gpt-6-astra',
    note='Below "High"; no numeric threshold given')
need('s6-google-th', 'CCL not reached')
add(tier='T', panel='thresholds', kind='status', indicator='Google Frontier Safety: ML R&D acceleration and automation, level 1',
    measured_by='Lab (Google DeepMind), model card', tag='vendor', date='2026-10-13', date_label='13 Oct 2026',
    label='Gemini 4 Argon', footnote='s6-google-th', url='https://deepmind.google/models/model-cards/gemini-4-argon/',
    note='Not reached')
need('s6-cobench', 'Claude Opus 5.5 scores 55.8%', 'at least 85%')
add(tier='T', panel='thresholds', indicator='Anthropic CoBench 2.1 score (internal research-engineering test)',
    unit='percent', measured_by='Lab (Anthropic), system card', tag='vendor', date='2026-09-22', date_label='22 Sep 2026',
    value=55.8, label='Claude Opus 5.5', footnote='s6-cobench', url='https://www.anthropic.com/claude-opus-5-5-system-card')
add(tier='T', panel='thresholds', kind='reference', indicator='Anthropic CoBench staff-replacement line', unit='percent',
    measured_by='Lab (Anthropic), system card', tag='vendor', value=85, bound='gte',
    label='At least 85%: model able to fully substitute for research staff', footnote='s6-cobench',
    url='https://www.anthropic.com/claude-opus-5-5-system-card', note='Set on the prior version of the test')
need('s6-s1', 'may imminently meet', 'We have not designated any of our current models as exceeding this threshold')
add(tier='T', panel='thresholds', kind='status', indicator="Anthropic RSP AI R&D threshold (S-1/A risk disclosure)",
    measured_by='Lab (Anthropic), IPO filing', tag='vendor', date='2026-11-02', date_label='2 Nov 2026',
    label='Future models', footnote='s6-s1',
    url='https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm',
    note='"may imminently meet" the threshold; no current model designated as exceeding it')

# ── Manuscript-backed series kept in the download but not drawn ─────────────
need('s3-accel', '+15 → +29 AECI points a year', '+17 → +24 points a year')
for d, v, lab, period in [('2025-10-07', 15, 'Anthropic models', 'Before 7 Oct 2025'),
                          ('2026-10-29', 29, 'Anthropic models', 'After 7 Oct 2025'),
                          ('2025-10-07', 17, 'All frontier developers', 'Before 7 Oct 2025'),
                          ('2026-10-29', 24, 'All frontier developers', 'After 7 Oct 2025')]:
    match = [r for r in SRC if r['indicator'].startswith('AECI') and r['date'] == d and float(r['value']) == v]
    assert len(match) == 1, (d, v)
    add(tier='B', panel='', indicator="AECI growth rate (Anthropic's internal index; not Epoch's ECI scale)",
        unit='AECI points per year', measured_by='Independent analysis (METR) of private Anthropic data',
        tag='estimate', date='', date_label=period, value=v, label=lab, footnote='s3-accel',
        url='https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/', in_chart=False)
need('s6-polls', 'about 1.2x', 'about 12x', 'median of about 4x')
for d, v, lab in [('2025-01', 1.2, 'Slack poll (Claude 3.7 Sonnet)'),
                  ('2026-10', 12, 'Slack poll (internal Model 4)'),
                  ('2026-03', 4, 'Survey of 130 research staff, median (different instrument)')]:
    sv, _ = src_value('Anthropic staff self-reported', d)
    assert sv == v
    add(tier='C', panel='', indicator='Anthropic staff self-reported AI uplift', unit='x uplift',
        measured_by='Lab (Anthropic) staff self-report, published by METR', tag='estimate', date=d, value=v,
        label=lab, footnote='s6-polls', url='https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/',
        in_chart=False)
need('s6-prs', '7.5% in April to 11.9% in September 2026')
for d, v in [('2026-04', 7.5), ('2026-09', 11.9)]:
    sv, _ = src_value('Google fully delegated pull requests', d)
    assert sv == v
    add(tier='C', panel='', indicator='Google: fully delegated pull requests', unit='percent',
        measured_by='Lab (Google DeepMind), safety report', tag='vendor', date=d, value=v, label='Gemini 4 safety report',
        footnote='s6-prs', url='https://storage.googleapis.com/deepmind-media/gemini/gemini_4_safety_report.pdf',
        in_chart=False)

# Excluded on purpose (documented, not written): Microsoft 2025-04-29; OpenAI 2026-06 value 1.
assert not any(r['date'] == '2025-04-29' for r in rows)

# ── Write ────────────────────────────────────────────────────────────────────
out = {
    'generated_by': 'scripts/data/build_rsi_series.py',
    'as_of': '2026-11-07',
    'rows': rows,
}
os.makedirs(R('src', 'data'), exist_ok=True)
with open(R('src', 'data', 'rsi_series.json'), 'w', encoding='utf-8', newline='\n') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
    f.write('\n')

cols = ['indicator', 'unit', 'measured_by', 'tag', 'kind', 'date', 'date_label', 'value', 'bound', 'ci_low',
        'ci_high', 'label', 'note', 'in_chart', 'footnote', 'url']
TAGS = {'verified': 'Verified', 'vendor': 'Vendor-reported', 'estimate': 'Estimate', 'calc': 'Our calculation'}
BOUND = {'gt': 'more than', 'gte': 'at least', 'lt': 'less than', 'approx': 'about', '': ''}
os.makedirs(R('public', 'data'), exist_ok=True)
with open(R('public', 'data', 'rsi_series.csv'), 'w', encoding='utf-8', newline='') as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    for r in rows:
        rec = {c: r.get(c) for c in cols}
        rec['tag'] = TAGS[r['tag']]
        rec['bound'] = BOUND[r['bound']]
        rec['in_chart'] = 'yes' if r['in_chart'] else 'no'
        rec = {k: ('' if v is None else v) for k, v in rec.items()}
        w.writerow(rec)

print(f'wrote {len(rows)} rows ({sum(r["in_chart"] for r in rows)} drawn) to src/data/rsi_series.json and public/data/rsi_series.csv')
