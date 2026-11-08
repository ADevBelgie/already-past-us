"""Build src/data/forecast_vs_actual.json for the s1-forecast-dumbbell chart.

Run from anywhere:  python -I scripts/data/build_forecast_vs_actual.py

Every number is pulled by regex from the research files or the manuscript footnotes; nothing is
typed in by hand. The script stops with an error if a pattern no longer matches, if a fact-check
verdict for a value is not "confirmed", or if the research file and the manuscript footnote
disagree on a value.

Inputs
- research/topics/r1-perception.md  (fact-check block: verdict lines "- **confirmed**: <claim>"
  followed by "-> <checked value>")
- already-past-us.md                (footnotes s1-leap, s1-aidigest, s1-bio, s1-xpt)
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / 'research' / 'topics' / 'r1-perception.md'
MANUSCRIPT = ROOT / 'already-past-us.md'
OUT = ROOT / 'src' / 'data' / 'forecast_vs_actual.json'

FRI_URL = 'https://forecastingresearch.org/research/ai-progress-accuracy-update'
AID_URL = 'https://theaidigest.org/2025-forecast-results'
NUM = r'(\d+(?:\.\d+)?)'


def num(s):
    v = float(s)
    return int(v) if v.is_integer() else v


def grab(pattern, text, where):
    m = re.search(pattern, text)
    if not m:
        raise SystemExit(f'pattern not found in {where}: {pattern}')
    return [num(g) for g in m.groups()]


research = RESEARCH.read_text(encoding='utf-8')
manuscript = MANUSCRIPT.read_text(encoding='utf-8')


def footnote(fid):
    m = re.search(rf'^\[\^{re.escape(fid)}\]:\s*(.*)$', manuscript, re.M)
    if not m:
        raise SystemExit(f'footnote {fid} not found in manuscript')
    return m.group(1)


def factcheck(claim_start):
    """Return (verdict, claim, checked) for the fact-check entry whose claim starts with claim_start."""
    m = re.search(
        rf'^- \*\*(\w+)\*\*: ({re.escape(claim_start)}[^\n]*)\n\s*→ ([^\n]*)', research, re.M
    )
    if not m:
        raise SystemExit(f'fact-check entry not found: {claim_start}')
    verdict, claim, checked = m.groups()
    if verdict != 'confirmed':
        raise SystemExit(f'fact-check verdict for "{claim_start}" is {verdict}, not confirmed')
    return claim, checked


def asked(fid, pattern, label):
    """When a forecast was made: `label`, provided footnote `fid` still says so (regex `pattern`)."""
    if not re.search(pattern, footnote(fid)):
        raise SystemExit(f'footnote {fid} no longer dates the forecast: {pattern}')
    return label


def agree(name, a, b):
    if a != b:
        raise SystemExit(f'{name}: research {a} != manuscript footnote {b}')


# ---- Research file (fact-checked values) ---------------------------------------------------
_, leap = factcheck('LEAP: FrontierMath')
fm_leap = grab(rf'FrontierMath: {NUM}% / {NUM}% forecast vs {NUM}% \(unadjusted\)', leap, 'r1 LEAP check')
lcb = grab(rf'LiveCodeBench Pro Hard: {NUM}% / {NUM}% forecast vs {NUM}% SOTA in May 2026', leap, 'r1 LEAP check')

_, metr_chk = factcheck('METR 80% time horizon')
metr = grab(rf'Experts {NUM} h, superforecasters {NUM} h', metr_chk, 'r1 METR check')

aid_claim, aid_chk = factcheck('AI Digest 2025 survey')
if not aid_chk.startswith('All values match'):
    raise SystemExit('AI Digest check no longer says "All values match"')
aid_n = grab(rf'\({NUM} forecasters\)', aid_claim, 'r1 AI Digest claim')[0]
swe = grab(rf'SWE-Bench Verified {NUM}% forecast vs {NUM}%', aid_claim, 'r1 AI Digest claim')
cyb = grab(rf'Cybench {NUM}% vs {NUM}%', aid_claim, 'r1 AI Digest claim')
osw = grab(rf'OSWorld {NUM}% vs {NUM}%', aid_claim, 'r1 AI Digest claim')
fm_aid = grab(rf'FrontierMath {NUM}% vs {NUM}%', aid_claim, 'r1 AI Digest claim')

_, bio_chk = factcheck('Biorisk uplift')
bio = grab(rf'{NUM}% / {NUM}% / {NUM}% predicted vs {NUM}% actual', bio_chk, 'r1 bio check')
bio_exp, bio_vir, bio_sup, bio_act = bio

# ---- Manuscript footnotes (must agree) -----------------------------------------------------
fn_leap = footnote('s1-leap')
agree('LiveCodeBench', lcb, grab(
    rf'LiveCodeBench Pro \(Hard\) by end-2026: forecast {NUM}% \(experts\), {NUM}% \(superforecasters\); state of the art {NUM}% by May 2026',
    fn_leap, 's1-leap'))
metr_fn = grab(
    rf'METR 80% time horizon by end-2026: forecast {NUM} hours \(experts\), {NUM} hours \(superforecasters\), against about {NUM} hours as of May 2026',
    fn_leap, 's1-leap')
agree('METR forecast', metr, metr_fn[:2])
metr_actual = metr_fn[2]

fn_aid = footnote('s1-aidigest')
agree('AI Digest n', aid_n, grab(rf'{NUM} self-selected forecasters', fn_aid, 's1-aidigest')[0])
agree('SWE-bench', swe, grab(rf'SWE-bench Verified: forecast {NUM}%, actual {NUM}%', fn_aid, 's1-aidigest'))
agree('Cybench', cyb, grab(rf'Cybench \({NUM}% vs {NUM}%\)', fn_aid, 's1-aidigest'))
agree('OSWorld', osw, grab(rf'OSWorld \({NUM}% vs {NUM}%\)', fn_aid, 's1-aidigest'))
agree('FrontierMath (AI Digest)', fm_aid, grab(rf'FrontierMath \({NUM}% vs {NUM}%\)', fn_aid, 's1-aidigest'))
agree('FrontierMath (LEAP)', fm_leap, grab(
    rf'FrontierMath \(Tiers 1.3\) by end-2025: forecast {NUM}% \(experts\), {NUM}% \(superforecasters\); best score {NUM}%, unadjusted',
    fn_leap, 's1-leap'))


def tag(fid):
    m = re.match(r'\*\*([^*]+?)\.?\*\*', footnote(fid))
    if not m:
        raise SystemExit(f'footnote {fid} has no provenance tag')
    return m.group(1).rstrip('.')

fn_bio = footnote('s1-bio')
agree('bio', [bio_sup, bio_exp, bio_vir, bio_act], grab(
    rf'superforecasters {NUM}%, biosecurity experts {NUM}%, virologists {NUM}%\. Actual in a mid-2025 randomised trial: {NUM}%',
    fn_bio, 's1-bio'))

if 'biased toward detecting underestimation' not in footnote('s1-xpt'):
    raise SystemExit('s1-xpt no longer carries the FRI bias caveat')


# ---- Rows ----------------------------------------------------------------------------------
def direction(forecasts, actual):
    vals = [f['value'] for f in forecasts]
    if actual > max(vals):
        return 'above'
    if actual < min(vals):
        return 'below'
    return 'within'


R1 = 'research/topics/r1-perception.md (fact-check: confirmed)'

rows = [
    {
        'id': 'livecodebench-pro-hard',
        'label': 'LiveCodeBench Pro (Hard)',
        'what': 'Hard contest coding problems solved',
        'panel': 'FRI LEAP panel',
        'deadline': 'by end-2026',
        'forecasts': [
            {'group': 'Experts', 'value': lcb[0]},
            {'group': 'Superforecasters', 'value': lcb[1]},
        ],
        'actual': lcb[2],
        'actualNote': 'Best score by May 2026',
        'asOf': 'May 2026',
        'status': 'Not formally resolved until end-2026',
        'footnote': 's1-leap',
        'research': R1,
        'url': FRI_URL,
    },
    {
        'id': 'cybench',
        'label': 'Cybench',
        'what': 'Cybersecurity tasks solved',
        'panel': f'AI Digest survey ({aid_n} forecasters)',
        'deadline': 'by end-2025',
        'forecasts': [{'group': 'Survey forecast', 'value': cyb[0]}],
        'actual': cyb[1],
        'actualNote': 'Best score in 2025',
        'status': 'Resolved',
        'footnote': 's1-aidigest',
        'research': R1,
        'url': AID_URL,
    },
    {
        'id': 'frontiermath-leap',
        'label': 'FrontierMath',
        'what': 'Very hard maths problems solved (Tiers 1-3)',
        'panel': 'FRI LEAP panel',
        'deadline': 'by end-2025',
        'forecasts': [
            {'group': 'Experts', 'value': fm_leap[0]},
            {'group': 'Superforecasters', 'value': fm_leap[1]},
        ],
        'actual': fm_leap[2],
        'actualNote': 'Best score, unadjusted',
        'status': 'Resolved. Epoch later found errors in about 42% of the problems; FrontierMath is funded by OpenAI',
        'footnote': 's1-leap',
        'research': R1,
        'url': FRI_URL,
    },
    {
        'id': 'osworld',
        'label': 'OSWorld',
        'what': 'Everyday computer tasks completed',
        'panel': f'AI Digest survey ({aid_n} forecasters)',
        'deadline': 'by end-2025',
        'forecasts': [{'group': 'Survey forecast', 'value': osw[0]}],
        'actual': osw[1],
        'actualNote': 'Best score in 2025',
        'status': 'Resolved',
        'footnote': 's1-aidigest',
        'research': R1,
        'url': AID_URL,
    },
    {
        'id': 'frontiermath-aidigest',
        'label': 'FrontierMath',
        'what': 'Very hard maths problems solved',
        'panel': f'AI Digest survey ({aid_n} forecasters)',
        'deadline': 'by end-2025',
        'forecasts': [{'group': 'Survey forecast', 'value': fm_aid[0]}],
        'actual': fm_aid[1],
        'actualNote': 'Best score in 2025',
        'status': 'Resolved',
        'footnote': 's1-aidigest',
        'research': R1,
        'url': AID_URL,
    },
    {
        'id': 'swe-bench-verified',
        'label': 'SWE-bench Verified',
        'what': 'Real software bugs fixed',
        'panel': f'AI Digest survey ({aid_n} forecasters)',
        'deadline': 'by end-2025',
        'forecasts': [{'group': 'Survey forecast', 'value': swe[0]}],
        'actual': swe[1],
        'actualNote': 'Best score in 2025',
        'status': 'Resolved',
        'footnote': 's1-aidigest',
        'research': R1,
        'url': AID_URL,
    },
    {
        'id': 'bio-uplift',
        'label': 'Biosecurity test tasks',
        'what': 'Science students who completed all three tasks with AI help',
        'panel': 'FRI (three forecaster groups)',
        'deadline': 'mid-2025 trial',
        'forecasts': [
            {'group': 'Superforecasters', 'value': bio_sup},
            {'group': 'Biosecurity experts', 'value': bio_exp},
            {'group': 'Virologists', 'value': bio_vir},
        ],
        'actual': bio_act,
        'actualNote': 'Mid-2025 randomised trial',
        'status': f'Resolved. All three forecaster groups are shown; they ranged from {min(bio_sup, bio_exp, bio_vir)}% to {max(bio_sup, bio_exp, bio_vir)}%',
        'footnote': 's1-bio',
        'research': R1,
        'url': FRI_URL,
    },
]
NEAR_TIE = 1  # percentage points
for r in rows:
    r['unit'] = '%'
    r['direction'] = direction(r['forecasts'], r['actual'])
    r['tag'] = tag(r['footnote'])
    nearest_gap = min(abs(r['actual'] - f['value']) for f in r['forecasts'])
    r['nearTie'] = r['direction'] != 'within' and nearest_gap <= NEAR_TIE
    if r['nearTie']:
        r['note'] = f'within {NEAR_TIE} point of the forecast'

unresolved = [
    {
        'id': 'metr-80-horizon',
        'label': 'METR 80% time horizon',
        'what': 'Length of software task, in hours of skilled human work, that AI completes with 80% success',
        'panel': 'FRI LEAP panel',
        'deadline': 'by end-2026',
        'unit': 'h',
        'forecasts': [
            {'group': 'Experts', 'value': metr[0]},
            {'group': 'Superforecasters', 'value': metr[1]},
        ],
        'actual': metr_actual,
        'actualNote': 'Approximate; latest measurement, as of May 2026',
        'asOf': 'May 2026',
        'status': 'Unresolved; resolves at end-2026',
        'direction': 'unresolved',
        'footnote': 's1-leap',
        'tag': tag('s1-leap'),
        'research': R1,
        'url': FRI_URL,
    }
]

# When each forecast was made, checked against the footnote that dates it.
ASKED = {
    'livecodebench-pro-hard': asked('s1-leap', r'LiveCodeBench Pro forecasts in November–December 2025', 'Nov–Dec 2025'),
    'frontiermath-leap': asked('s1-leap', r'FrontierMath forecasts were elicited in June–August 2025', 'Jun–Aug 2025'),
    'metr-80-horizon': asked('s1-leap', r'METR time-horizon question was asked in April–May 2026', 'Apr–May 2026'),
    'bio-uplift': asked('s1-bio', r'asked for these predictions in mid-2025', 'mid-2025'),
}
for rid in ('cybench', 'osworld', 'frontiermath-aidigest', 'swe-bench-verified'):
    ASKED[rid] = asked('s1-aidigest', r'open from 30 November 2024 to 20 January 2025', 'Nov 2024–Jan 2025')
for r in rows + unresolved:
    if r['id'] not in ASKED:
        raise SystemExit(f"no forecast date for row {r['id']}")
    r['asked'] = ASKED[r['id']]

out = {
    'id': 's1-forecast-dumbbell',
    'built_by': 'scripts/data/build_forecast_vs_actual.py',
    'inputs': ['research/topics/r1-perception.md', 'already-past-us.md (footnotes s1-leap, s1-aidigest, s1-bio, s1-xpt)'],
    'notes': ['s1-xpt', 's1-leap', 's1-aidigest', 's1-bio'],
    'caveat_source': 's1-xpt',
    'rows': rows,
    'unresolved': unresolved,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
for r in rows + unresolved:
    if not r.get('footnote'):
        raise SystemExit(f"row {r['id']} has no footnote")
print(f'wrote {OUT.relative_to(ROOT)}: {len(rows)} rows + {len(unresolved)} unresolved')
for r in rows + unresolved:
    print(f"  {r['id']:24} forecast {[f['value'] for f in r['forecasts']]} actual {r['actual']}{r['unit']} -> {r['direction']} [{r['tag']}]{' near tie' if r.get('nearTie') else ''}")
