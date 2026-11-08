"""Build src/data/frontier_snapshots.json for the FrontierSnapshots chart.

Inputs (all under research/):
  data/frontier_snapshots.csv   one row per (snapshot, model available on that date), list price in effect then
  data/raw/eci_scores.csv       Epoch ECI file (7 Nov 2026 vintage), used only to attach credible intervals
  data/price_history.json       price checks per model at each snapshot date, used to word price_basis

Run from anywhere:  python -I scripts/data/build_frontier_snapshots.py

The script recomputes the manuscript's section 2 headline numbers from the CSV and stops with an
AssertionError if any of them disagree with the manuscript (footnotes s2-cheaper, s2-better, s2-top).
"""
import csv
import json
import re
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SNAP_CSV = ROOT / "research" / "data" / "frontier_snapshots.csv"
ECI_CSV = ROOT / "research" / "data" / "raw" / "eci_scores.csv"
PRICE_HISTORY = ROOT / "research" / "data" / "price_history.json"
OUT = ROOT / "src" / "data" / "frontier_snapshots.json"

SNAPSHOTS = [
    {"date": "2025-11-07", "key": "snap1", "label": "A year ago", "long": "7 Nov 2025"},
    {"date": "2026-05-07", "key": "snap2", "label": "Six months ago", "long": "7 May 2026"},
    {"date": "2026-11-07", "key": "snap3", "label": "Today", "long": "7 Nov 2026"},
]
ECI_TEST = 150.0   # "GPT-5 level" (s2-cheaper)
PRICE_TEST = 4.0   # "up to $4 per million tokens" (s2-better)


def to_bool(s):
    assert s in ("True", "False"), s
    return s == "True"


def load_ci():
    ci = {}
    with ECI_CSV.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            lo, hi = r["eci_ci_low"].strip(), r["eci_ci_high"].strip()
            rec = {
                "eci": float(r["eci"]),
                "lo": float(lo) if lo else None,
                "hi": float(hi) if hi else None,
                "date": r["date"],
            }
            for name in (r["Model"], r["Display name"]):
                ci.setdefault(name.strip(), rec)
    return ci


OVERRIDE = "price_history override"
# "$2/$12", optionally followed by one parenthetical qualifier such as "(introductory)".
CHECKED_PRICE = re.compile(r"^\$(\d+(?:\.\d+)?)/\$(\d+(?:\.\d+)?)(?:\s*\((.*)\))?$")


def load_price_history():
    with PRICE_HISTORY.open(encoding="utf-8") as f:
        return {m["model"]: m for m in json.load(f)["models"]}


def price_basis(r, history):
    """Word the price basis from what research/data/price_history.json says about this model."""
    basis = r["price_basis"]
    if basis == OVERRIDE or basis.startswith("third-party host price ("):
        return basis
    assert basis == "list price (unchanged per price_history or not checked)", (r["model"], basis)
    h = history.get(r["model"])
    if h is None:
        return "list price (not checked against price history)"
    # Prices recorded at every snapshot date up to this one, skipping dates before release.
    seen = []
    for s in SNAPSHOTS:
        if s["date"] > r["snapshot"]:
            break
        val = (h.get("price_" + s["date"].replace("-", "_")) or "").strip()
        if val == "not released":
            continue
        m = CHECKED_PRICE.match(val)
        seen.append(((float(m.group(1)), float(m.group(2))), m.group(3) or "") if m else (None, val))
    want = (float(r["price_in"]), float(r["price_out"]))
    if seen and seen[-1][0] == want:
        intro = "introductory" in seen[-1][1]
        if all(p == want for p, _ in seen):
            return ("introductory list price" if intro else "list price") + ", unchanged since launch (checked in price history)"
        return "list price after a price change (checked in price history)"
    if h.get("first_party"):
        return "list price (not confirmed in price history)"
    return "third-party host price (not confirmed in price history)"


def pareto(rows):
    """Models that give a strictly higher ECI than everything at or below their price."""
    out, best = [], float("-inf")
    for r in sorted(rows, key=lambda r: (r["blended"], -r["eci"])):
        if r["eci"] > best:
            out.append(r)
            best = r["eci"]
    return out


def main():
    ci = load_ci()
    history = load_price_history()
    models = []
    with SNAP_CSV.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            price_in, price_out, blended = float(r["price_in"]), float(r["price_out"]), float(r["blended"])
            # Blend check: (3 x input + output) / 4, as defined in s2-blend (CSV stores up to 4 dp).
            assert abs((3 * price_in + price_out) / 4 - blended) < 5e-4, (r["model"], r["snapshot"])
            assert r["release_date"] <= r["snapshot"], ("released after snapshot", r["model"], r["snapshot"])
            eci = float(r["eci"])
            c = ci.get(r["model"])
            if c is not None:
                assert abs(c["eci"] - eci) < 1e-9, ("ECI mismatch with eci_scores.csv", r["model"])
            models.append({
                "snapshot": r["snapshot"],
                "model": r["model"],
                "developer": r["developer"],
                "release_date": r["release_date"],
                "eci": eci,
                "eci_lo": c["lo"] if c else None,
                "eci_hi": c["hi"] if c else None,
                "price_in": price_in,
                "price_out": price_out,
                "blended": blended,
                "open_weights": to_bool(r["open_weights"]),
                "price_basis": price_basis(r, history),
                "source": "research/data/frontier_snapshots.csv; ECI and interval: research/data/raw/eci_scores.csv",
                "footnotes": ["s2-eci", "s2-blend", "s2-hist"],
                "frontier": False,
            })

    by_snap = {s["date"]: [m for m in models if m["snapshot"] == s["date"]] for s in SNAPSHOTS}
    assert set(by_snap) == {m["snapshot"] for m in models}, "unexpected snapshot dates in CSV"
    for date, rows in by_snap.items():
        names = [m["model"] for m in rows]
        assert len(names) == len(set(names)), ("duplicate model in snapshot", date)
        for m in pareto(rows):
            m["frontier"] = True

    # ---- Headline numbers, recomputed and checked against the manuscript ----------------------
    def cheapest_at(rows, threshold):
        ok = [m for m in rows if m["eci"] >= threshold]
        p = min(m["blended"] for m in ok)
        return p, sorted(m["model"] for m in ok if m["blended"] == p)

    def best_under(rows, cap):
        ok = [m for m in rows if m["blended"] <= cap]
        e = max(m["eci"] for m in ok)
        return e, [m for m in ok if m["eci"] == e][0]

    d1, d2, d3 = (s["date"] for s in SNAPSHOTS)
    cheaper = {d: cheapest_at(by_snap[d], ECI_TEST) for d in by_snap}
    assert cheaper[d1] == (3.4375, ["GPT-5"]), cheaper[d1]
    assert cheaper[d2] == (1.125, ["Gemini 3 Flash"]), cheaper[d2]
    assert cheaper[d3] == (0.2, ["Claude Haiku 5.5", "GPT-6 Luna"]), cheaper[d3]
    ratio = cheaper[d1][0] / cheaper[d3][0]
    assert round(ratio, 1) == 17.2 and round(ratio) == 17, ratio   # "about 17 times cheaper"
    # Body text quotes $3.44, $1.13 and $0.20.
    half_up = lambda v: str(Decimal(str(v)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
    assert [half_up(cheaper[d][0]) for d in (d1, d2, d3)] == ["3.44", "1.13", "0.20"]

    better = {d: best_under(by_snap[d], PRICE_TEST) for d in by_snap}
    assert (better[d1][0], better[d1][1]["model"]) == (150.0, "GPT-5"), better[d1]
    assert (better[d2][0], better[d2][1]["model"]) == (152.27, "Grok 4.20"), better[d2]
    assert (better[d3][0], better[d3][1]["model"]) == (168.94, "GPT-6.1 Sol"), better[d3]
    gem3 = next(m for m in by_snap[d2] if m["model"] == "Gemini 3 Flash")
    assert gem3["eci"] == 152.25  # the May "statistical tie"
    assert [round(better[d][0]) for d in (d1, d2, d3)] == [150, 152, 169]   # "150 ... about 152 ... 169"

    # Secondary checks from s2-better / s2-top (not plotted as headlines, but the chart shows these models).
    low = {d: best_under(by_snap[d], 0.25) for d in by_snap}
    assert [(low[d][0], low[d][1]["model"]) for d in (d1, d2, d3)] == [
        (140.22, "gpt-oss-120b"), (146.86, "DeepSeek-V4-Flash"), (160.22, "Claude Haiku 5.5")]
    top = {d: max(by_snap[d], key=lambda m: m["eci"]) for d in by_snap}
    assert [(top[d]["model"], top[d]["blended"]) for d in (d1, d2, d3)] == [
        ("GPT-5 Pro", 41.25), ("GPT-5.5 Pro", 67.5), ("GPT-6 Astra", 20.0)]
    assert best_under(by_snap[d2], 5.0)[0] == 156.24   # "$5 cap lifts May 2026 to 156.2"

    headlines = {
        "cheaper": [
            {"snapshot": d, "price": cheaper[d][0], "models": cheaper[d][1], "footnote": "s2-cheaper"}
            for d in (d1, d2, d3)
        ],
        "cheaper_ratio": round(ratio, 1),
        "better": [
            {"snapshot": d, "eci": better[d][0], "model": better[d][1]["model"],
             "price": better[d][1]["blended"], "footnote": "s2-better"}
            for d in (d1, d2, d3)
        ],
        "eci_test": ECI_TEST,
        "price_test": PRICE_TEST,
    }

    # Six-month projection to about 7 May 2027 (footnote s2-projection, "Our calculation", an estimate).
    # Each range runs from "nothing new arrives" (today's value) to "the past year's pace continues"
    # for half a year. Epoch's published rates (s2-epoch: ~13x a year at fixed accuracy, slowing to
    # ~4.7x for older levels; s6-eci: ~14 ECI points a year at the frontier) land inside both ranges.
    half = lambda year_factor: year_factor ** 0.5
    p_now, e_now = cheaper[d3][0], better[d3][0]
    e_year_gain = better[d3][0] - better[d1][0]                      # 18.94 points at <= $4 over the year
    projection = {
        "date": "2027-05-07",
        "label": "May 2027 (estimate)",
        "footnote": "s2-projection",
        "price_at_eci_test": {
            "high": p_now,                                           # no cheaper model arrives
            "low": round(p_now / half(ratio), 4),                    # past year's 17.2x pace continues
            "epoch_avg": round(p_now / half(13), 4),                 # Epoch ~13x a year
            "epoch_aged": round(p_now / half(4.7), 4),               # Epoch, levels eight quarters old
        },
        "eci_at_price_test": {
            "low": e_now,                                            # no better model at <= $4
            "high": round(e_now + e_year_gain / 2, 2),               # past year's pace at <= $4 continues
            "epoch_frontier": round(e_now + 14 / 2, 2),              # Epoch ~14 points a year
        },
    }
    pp, pe = projection["price_at_eci_test"], projection["eci_at_price_test"]
    assert (pp["low"], pp["epoch_avg"], pp["epoch_aged"]) == (0.0482, 0.0555, 0.0923), pp   # "about 5 cents"; 5.5 and 9 cents
    assert (pe["high"], pe["epoch_frontier"]) == (178.41, 175.94), pe
    headlines["projection"] = projection

    missing_ci = sorted({m["model"] for m in models if m["eci_lo"] is None})
    out = {
        "generated_by": "scripts/data/build_frontier_snapshots.py",
        "inputs": ["research/data/frontier_snapshots.csv", "research/data/raw/eci_scores.csv"],
        "eci_vintage": "2026-11-07",
        "blend": "(3 x input + output) / 4, USD per million tokens",
        "snapshots": SNAPSHOTS,
        "headlines": headlines,
        "models_without_interval": missing_ci,
        "models": models,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    counts = {d: len(r) for d, r in by_snap.items()}
    fr = {d: [m["model"] for m in sorted(r, key=lambda m: m["blended"]) if m["frontier"]] for d, r in by_snap.items()}
    print(f"wrote {OUT.relative_to(ROOT)}: {len(models)} rows {counts}")
    for d, names in fr.items():
        print(f"  frontier {d}: {', '.join(names)}")
    print(f"  cheaper: {[cheaper[d] for d in (d1, d2, d3)]} ratio {ratio:.4f}")
    print(f"  better:  {[(better[d][0], better[d][1]['model']) for d in (d1, d2, d3)]}")
    print(f"  no credible interval: {missing_ci}")
    bases = {}
    for m in models:
        bases[m["price_basis"]] = bases.get(m["price_basis"], 0) + 1
    for b, n in sorted(bases.items()):
        print(f"  price_basis {n:3}: {b}")
    print("headline checks: OK")


if __name__ == "__main__":
    main()
