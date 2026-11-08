"""Build research/data/frontier_snapshots.csv: one row per (snapshot date, model available on that date).

Usage: python -I scripts/data/make_frontier_snapshots.py research/data/frontier_epoch.csv research/data/frontier_snapshots.csv

Price rule, per snapshot date:
- the model maker's first-party list price in effect on that date (research/data/price_history.json);
- for an open-weight model its maker does not (or no longer) serve, the cheapest reputable third-party
  host's standard-tier price, checked on the host's own page (HOST below);
- closed models that were retired or shut down by that date are left out.
scripts/data/build_frontier_snapshots.py then checks every headline figure against this file.
"""
import csv, re, sys

sys.stdout.reconfigure(encoding='utf-8')
src, out = sys.argv[1], sys.argv[2]
rows = list(csv.DictReader(open(src, encoding='utf-8')))
S = ['2025-11-07', '2026-05-07', '2026-11-07']
bl = lambda i, o: (3 * i + o) / 4

# Snapshot-specific first-party overrides from price_history.json. None = not available that day.
OVR = {
    ('Grok 4 Fast', '2026-11-07'): None,            # retired 2026-05-15
    ('Gemini 3 Pro', '2026-05-07'): None,           # shut down 2026-03-09
    ('Gemini 3 Pro', '2026-11-07'): None,
    ('Grok 4.20', '2026-05-07'): (2, 6),            # launch API price; cut date unknown (low confidence)
    ('Kimi K2.5', '2026-05-07'): (0.60, 3.00),      # first-party
    ('Kimi K2.5', '2026-11-07'): (0.60, 3.00),      # deprecated, availability uncertain
    ('Qwen3.5 397B-A17B', '2026-05-07'): (0.60, 3.60),
    ('Qwen3.5 397B-A17B', '2026-11-07'): (0.60, 3.60),
    ('gpt-oss-120b', '2026-11-07'): (0.037, 0.17),  # no first-party API; DeepInfra
}
# Open-weight models whose maker no longer serves them: cheapest reputable host, checked 2026-11-08.
HOST = {
    # DeepSeek retired its own V4-Flash endpoint (the name now routes to V4.1-Flash-1017), but the
    # original checkpoint is still served by many hosts. https://deepinfra.com/deepseek-ai/DeepSeek-V4-Flash
    ('DeepSeek-V4-Flash', '2026-11-07'): (0.09, 0.18, 'third-party host price (DeepInfra, checked 8 Nov 2026)'),
    # Undiscounted fp8 price (AtlasCloud via OpenRouter; DeepInfra lists the same, fp4). A 28%-discounted
    # GMICloud listing ($0.2088/$0.3096) looked temporary and is not used. https://deepinfra.com/deepseek-ai/DeepSeek-V3.2
    ('DeepSeek-V3.2', '2026-11-07'): (0.26, 0.38, 'third-party host price (AtlasCloud/DeepInfra, checked 8 Nov 2026)'),
}
retired_kw = re.compile(r'retired|deprecat|no longer|shut down', re.I)

outrows = []
for s in S:
    for r in rows:
        if r['release_date'] > s:
            continue
        k = (r['model'], s)
        if k in HOST:
            pi, po, basis = HOST[k]
        elif k in OVR:
            if OVR[k] is None:
                continue
            pi, po = OVR[k]
            basis = 'price_history override'
        else:
            if s == '2026-11-07' and retired_kw.search(r['notes']):
                continue
            pi, po = float(r['price_in_per_mtok']), float(r['price_out_per_mtok'])
            basis = 'list price (unchanged per price_history or not checked)'
        outrows.append(dict(snapshot=s, model=r['model'], developer=r['developer'], release_date=r['release_date'],
                            eci=float(r['capability_value']), price_in=pi, price_out=po, blended=round(bl(pi, po), 4),
                            open_weights=r['open_weights'], price_basis=basis))

with open(out, 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(outrows[0].keys()))
    w.writeheader()
    w.writerows(outrows)

for s in S:
    a = [r for r in outrows if r['snapshot'] == s]
    c150 = min((r for r in a if r['eci'] >= 150), key=lambda r: r['blended'])
    b4 = max((r for r in a if r['blended'] <= 4), key=lambda r: r['eci'])
    b025 = max((r for r in a if r['blended'] <= 0.25), key=lambda r: r['eci'])
    top = max(a, key=lambda r: r['eci'])
    fr, best = [], -1
    for r in sorted(a, key=lambda r: (r['blended'], -r['eci'])):
        if r['eci'] > best:
            fr.append(r)
            best = r['eci']
    print(f"\n{s}: n={len(a)}\n cheapest ECI>=150: {c150['model']} ${c150['blended']}\n best <=$4: {b4['model']} {b4['eci']} (${b4['blended']})"
          f"\n best <=$0.25: {b025['model']} {b025['eci']} (${b025['blended']})\n top: {top['model']} {top['eci']} ${top['blended']}"
          f"\n frontier: " + '; '.join(f"{r['model']} {r['eci']}@{r['blended']}" for r in fr))

# A model that is still obtainable must not make today's frontier fall below an earlier one.
def best_at(snapshot, price):
    return max((r['eci'] for r in outrows if r['snapshot'] == snapshot and r['blended'] <= price), default=None)
for i in range(1, len(S)):
    for r in (x for x in outrows if x['snapshot'] == S[i - 1]):
        still = [x for x in outrows if x['snapshot'] == S[i] and x['model'] == r['model']]
        if still and still[0]['blended'] <= r['blended']:
            assert best_at(S[i], r['blended']) >= r['eci'], ('frontier regressed', r['model'], S[i])
