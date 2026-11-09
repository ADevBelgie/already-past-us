"""May 2027 estimate of the price-capability frontier (section 2, footnote s2-projection), and its test.

Run from anywhere:  python -I scripts/data/frontier_projection.py
Writes research/data/frontier_projection_backtest.json. scripts/data/build_frontier_snapshots.py loads this
file as a module and calls estimate() for the chart, so the chart and the test use the same method.

Method ("Our calculation", an estimate, not data)
1. The top score's straight-line trend. Fit a line to the record ECI score (best public model so far,
   research/data/raw/eci_scores.csv), sampled monthly over the last 24 months. No pause is assumed: the
   estimate starts from the trend line today (about 170.1), not from the last record (169.07, set in
   September 2026), and rises at the fitted rate (about 16.9 points a year).
2. Every price rides that trend. Each price is assumed to stay the same distance behind the top as
   today, so the best score at price p in six months is today's best score at 1.25 x p, plus half a
   year of the trend. The 1.25 factor moves each step slightly toward cheaper prices, on the view that
   new models keep arriving at lower prices. It is a judgement, not a fit: in the test it makes the
   estimate a little more optimistic than no shift (see "shift_comparison" in the output).
3. Prices keep falling. The same capability is assumed to get 17.2 times cheaper a year, the past
   year's rate at ECI 150 (s2-cheaper). Over six months that is the square root, about 4.15 times, so
   whatever costs 4.15 x p today costs p in May 2027. This is what carries the 160 level, now at $0.20,
   down to about 5 cents; no model has yet been listed below about 7 cents.
4. The estimate at each price is the higher of 2 and 3, never below today, and never above the top
   score's trend.
5. The range around it comes from the test below: the lower edge is the 25th percentile of past misses,
   the upper edge the smallest offset (in 0.5-point steps) that contained at least 70% of past outcomes.

Test. The frontier is rebuilt for every month from May 2025 to November 2026 from model release dates
(research/data/frontier_epoch.csv) and the snapshot list prices (research/data/frontier_snapshots.csv;
a model missing from a later snapshot counts as withdrawn from that date). From each month between
November 2025 and May 2026 the method estimates the frontier six months later at nine prices from
$0.20 to $100, and the estimate is compared with what happened. The rebuild matches all three snapshots
exactly. Windows overlap, so the 63 comparisons are worth about two independent half-years.
"""
import csv
import datetime as dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EPOCH_CSV = ROOT / "research" / "data" / "frontier_epoch.csv"
SNAP_CSV = ROOT / "research" / "data" / "frontier_snapshots.csv"
ECI_CSV = ROOT / "research" / "data" / "raw" / "eci_scores.csv"
OUT = ROOT / "research" / "data" / "frontier_projection_backtest.json"

SNAPS = ["2025-11-07", "2026-05-07", "2026-11-07"]
TODAY = "2026-11-07"
TARGET = "2027-05-07"
HORIZON = 6                  # months
TREND_SPAN = 24              # months of record scores in the trend fit
YEAR_PRICE_FALL = 17.2       # s2-cheaper: the past year's fall in price at ECI 150
SHIFT = 1.25                 # step 2 above
TEST_PRICES = [0.2, 0.3, 0.5, 1, 2, 4, 10, 30, 100]
MONTH = 30.44                # days

D = dt.date.fromisoformat
blend = lambda i, o: (3 * i + o) / 4


def months_between(a, b):
    return (b - a).days / MONTH


def load():
    snap_price = {}
    with SNAP_CSV.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            snap_price[(r["model"], r["snapshot"])] = float(r["blended"])
    models = []
    with EPOCH_CSV.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            models.append({
                "model": r["model"], "release": r["release_date"], "eci": float(r["capability_value"]),
                "price": blend(float(r["price_in_per_mtok"]), float(r["price_out_per_mtok"])),
            })
    records = []
    with ECI_CSV.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["eci"].strip() and r["date"].strip():
                records.append((D(r["date"]), float(r["eci"])))
    return models, snap_price, sorted(records)


MODELS, SNAP_PRICE, RECORDS = load()


def price_on(m, day):
    """List price of a model on a day (ISO string), or None if not released or already withdrawn."""
    if m["release"] > day:
        return None
    p = m["price"]
    for s in SNAPS:
        if m["release"] <= s <= day:
            if (m["model"], s) not in SNAP_PRICE:
                return None
            p = SNAP_PRICE[(m["model"], s)]
    return p


_avail = {}


def available(day):
    if day not in _avail:
        _avail[day] = [(p, m["eci"]) for m in MODELS if (p := price_on(m, day)) is not None]
    return _avail[day]


def frontier(day, price):
    """Best ECI at or below a blended price on a day, or None."""
    return max((e for p, e in available(day) if p <= price), default=None)


def top(day):
    return max((e for d, e in RECORDS if d <= day), default=None)


def trend(day):
    """Straight line through the monthly record score over TREND_SPAN months: (value on day, points a month)."""
    xs = list(range(-TREND_SPAN, 1))
    ys = [top(day + dt.timedelta(days=MONTH * k)) for k in xs]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    slope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return my - slope * mx, slope


def estimate(day, price, shift=SHIFT, horizon=HORIZON):
    """Central estimate of the best ECI at or below `price`, `horizon` months after `day` (ISO string)."""
    v0, rate = trend(D(day))
    ceiling = v0 + rate * horizon
    now = frontier(day, price)
    ride = frontier(day, price * shift)
    ride = ride + rate * horizon if ride is not None else None
    cheaper = frontier(day, price * YEAR_PRICE_FALL ** (horizon / 12))
    c = max((v for v in (now, ride, cheaper) if v is not None), default=None)
    if c is None:
        return None
    return max(now or c, min(c, ceiling))


def month_starts(first, last):
    out, d = [], D(first)
    while d <= D(last):
        out.append(d.isoformat())
        y, m = (d.year + (d.month == 12), d.month % 12 + 1)
        d = dt.date(y, m, 7)
    return out


def backtest(shift=SHIFT):
    days = month_starts("2025-05-07", TODAY)
    rows = []
    for i, day in enumerate(days):
        if day < "2025-11-07" or i + HORIZON >= len(days):
            continue
        later = days[i + HORIZON]
        for p in TEST_PRICES:
            now, actual = frontier(day, p), frontier(later, p)
            if now is None or actual is None:
                continue
            rows.append({"from": day, "to": later, "price": p, "today": now,
                         "estimate": round(estimate(day, p, shift), 2), "actual": actual})
    return rows


def summary(rows):
    miss = sorted(r["actual"] - r["estimate"] for r in rows)
    n = len(miss)
    cheap = [r["actual"] - r["estimate"] for r in rows if r["price"] < 2]
    pct = lambda q: miss[min(n - 1, int(q / 100 * n))]
    return {
        "comparisons": n,
        "mean_abs_miss": round(sum(map(abs, miss)) / n, 2),
        "bias_actual_minus_estimate": round(sum(miss) / n, 2),
        "bias_under_2_dollars": round(sum(cheap) / len(cheap), 2),
        "percentiles": {q: round(pct(q), 2) for q in (10, 25, 50, 75, 90, 95)},
    }


def coverage(rows, lo, hi):
    inside = sum(max(r["today"], r["estimate"] + lo) <= r["actual"] <= r["estimate"] + hi for r in rows)
    return inside / len(rows)


def band(rows):
    s = summary(rows)
    lo = s["percentiles"][25]
    hi = 0.5
    while coverage(rows, lo, hi) < 0.70:
        hi += 0.5
    return {"lower_offset": lo, "upper_offset": hi, "coverage": round(coverage(rows, lo, hi), 2)}


def main():
    rows = backtest()
    s = summary(rows)
    b = band(rows)
    shifts = {str(k): summary(backtest(k)) for k in (1.0, 1.25, 1.5, 2.0)}
    for snap in SNAPS:   # the rebuild must match the published snapshots exactly
        rows_s = [(SNAP_PRICE[k], next(m["eci"] for m in MODELS if m["model"] == k[0])) for k in SNAP_PRICE if k[1] == snap]
        for p in TEST_PRICES:
            assert max((e for q, e in rows_s if q <= p), default=None) == frontier(snap, p), (snap, p)
    v0, rate = trend(D(TODAY))
    out = {
        "generated_by": "scripts/data/frontier_projection.py",
        "method": "see the docstring of scripts/data/frontier_projection.py",
        "today": TODAY, "target": TARGET, "horizon_months": HORIZON,
        "top_trend": {"span_months": TREND_SPAN, "value_today": round(v0, 2),
                      "points_per_year": round(rate * 12, 2), "value_at_target": round(v0 + rate * HORIZON, 2),
                      "last_record": top(D(TODAY))},
        "year_price_fall": YEAR_PRICE_FALL, "shift": SHIFT,
        "test": s, "band": b, "shift_comparison": shifts, "comparisons": rows,
    }
    OUT.write_text(json.dumps(out, indent=1) + "\n", encoding="utf-8")
    print(f"top trend {v0:.2f} today, {rate * 12:.2f} points a year, {v0 + rate * HORIZON:.2f} in May 2027")
    print(f"test: {s['comparisons']} comparisons, mean miss {s['mean_abs_miss']}, bias {s['bias_actual_minus_estimate']:+}")
    print(f"band {b['lower_offset']:+} / {b['upper_offset']:+}, contained {b['coverage']:.0%} of past outcomes")
    for k, v in shifts.items():
        print(f"  shift {k}: mean miss {v['mean_abs_miss']}, bias {v['bias_actual_minus_estimate']:+}, under $2 {v['bias_under_2_dollars']:+}")
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
