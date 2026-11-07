"""Build src/data/s0-cards.json for the StatCards chart (placeholder s0-cards).

Every value is read from the manuscript's s0 footnotes (already-past-us.md), and each
regex must match, so a change to a footnote breaks this script instead of silently
leaving stale numbers on the page. The two derived counts (51 and 189 of 240 projects)
and the 8.5x ratio are computed here from those footnote values.

Run from the project root:  python -I scripts/data/build_s0_cards.py
"""
import json
import re
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MS = ROOT / "already-past-us.md"
OUT = ROOT / "src" / "data" / "s0-cards.json"

text = MS.read_text(encoding="utf-8")
footnotes = {}
for line in text.splitlines():
    m = re.match(r"^\[\^(s0-[\w-]+)\]:\s*(.*)$", line)
    if m:
        footnotes[m.group(1)] = m.group(2)


def grab(fn_id, pattern, cast=str):
    body = footnotes[fn_id]
    m = re.search(pattern, body)
    if not m:
        raise SystemExit(f"pattern not found in [^{fn_id}]: {pattern}")
    return cast(m.group(1))


def tag(fn_id):
    return grab(fn_id, r"^\*\*(Verified|Vendor-reported|Estimate|Our calculation)\.\*\*")


# Card 1: ICPC 2025 world finals (vendor-reported) and IOI 2025 counter-fact.
icpc_ai = grab("s0-icpc", r"(\d+) of 12 problems solved", int)
icpc_total = 12
icpc_human = grab("s0-icpc", r"the best human team achieved (\d+)/12", int)
ioi_beaten_by = grab("s0-ioi", r"above all but (\d+) of \d+ human contestants", int)
ioi_field = grab("s0-ioi", r"above all but \d+ of (\d+) human contestants", int)

# Card 2: Erdos unit-distance disproof, checked by nine named mathematicians.
authors_raw = grab("s0-erdos", r"^\*\*Verified\.\*\*\s*(.+?), \"Remarks on the disproof")
authors = [a.strip() for a in re.split(r",\s*|\s+and\s+", authors_raw) if a.strip()]
erdos_year = 1946  # in the manuscript body: "Paul Erdős's 1946 'unit distance' conjecture"
assert "Paul Erdős's 1946 \"unit distance\" conjecture" in text, "1946 not found in the s0 body"
erdos_preprint = grab("s0-erdos", r"(arXiv:\d{4}\.\d{5})")
erdos_date = grab("s0-erdos", r"arXiv:\d{4}\.\d{5}, (\d+ \w+ \d{4})")
erdos_false_claims = grab("s0-erdos-context", r"GPT-5 had solved (\d+) Erd", int)

# Card 3: Remote Labor Index.
rli_best = grab("s0-rli", r"Claude Opus 5\.5 (\d+\.\d+)%", Fraction)
rli_projects = grab("s0-rli", r"share of the (\d+) projects", int)
rli_accessed = grab("s0-rli", r"accessed (\d+ \w+ \d{4})")
rli_launch = grab("s0-rli-growth", r"Best score at launch (\d+\.\d+)%", Fraction)
# The launch score is cited in the "Our calculation" footnote s0-rli-growth (s0-rli does not
# contain it), so its record carries that footnote's tag.
assert "abstract reports \"the highest-performing agent achieving an automation rate of 2.5%\"" in footnotes["s0-rli-growth"]
rli_ratio = rli_best / rli_launch
assert grab("s0-rli-growth", r"= (\d+\.\d+)", Fraction) == rli_ratio
rli_matched = rli_best * rli_projects / 100
assert rli_matched.denominator == 1, "21.25% of 240 must be a whole number of projects"
rli_matched = int(rli_matched)
# The 51-of-240 count is stated (as our arithmetic) inside the Verified footnote s0-rli.
assert f"that is {rli_matched} of the {rli_projects} projects (our arithmetic)" in footnotes["s0-rli"],     "s0-rli no longer states the matched-projects arithmetic"

records = [
    {"card": "icpc", "metric": "ai_solved", "label": "OpenAI system, problems solved", "value": icpc_ai, "of": icpc_total, "tag": tag("s0-icpc"), "source": "s0-icpc"},
    {"card": "icpc", "metric": "best_human_solved", "label": "Best human team, problems solved", "value": icpc_human, "of": icpc_total, "tag": tag("s0-icpc"), "source": "s0-icpc"},
    {"card": "icpc", "metric": "ioi_humans_ahead", "label": "IOI 2025: human contestants who beat OpenAI's entry", "value": ioi_beaten_by, "of": ioi_field, "tag": tag("s0-ioi"), "source": "s0-ioi"},
    {"card": "erdos", "metric": "conjecture_year", "label": "Year of Erdős's unit-distance conjecture", "value": erdos_year, "tag": tag("s0-erdos"), "source": "s0-erdos"},
    {"card": "erdos", "metric": "checkers", "label": "Mathematicians who checked and published a simplified version", "value": len(authors), "names": authors, "preprint": erdos_preprint, "date": erdos_date, "tag": tag("s0-erdos"), "source": "s0-erdos"},
    {"card": "erdos", "metric": "false_claim_oct_2025", "label": "Erdős problems OpenAI wrongly said GPT-5 solved (Oct 2025)", "value": erdos_false_claims, "tag": tag("s0-erdos-context"), "source": "s0-erdos-context"},
    {"card": "rli", "metric": "best_rate_pct", "label": "Best agent automation rate, as of " + rli_accessed, "value": float(rli_best), "tag": tag("s0-rli"), "source": "s0-rli"},
    {"card": "rli", "metric": "projects", "label": "Real paid freelance projects in the index", "value": rli_projects, "tag": tag("s0-rli"), "source": "s0-rli"},
    {"card": "rli", "metric": "projects_matched", "label": "Projects judged as good as a human's (21.25% of 240)", "value": rli_matched, "of": rli_projects, "tag": tag("s0-rli"), "source": "s0-rli"},
    {"card": "rli", "metric": "projects_not_matched", "label": "Projects not judged as good as a human's (240 - 51)", "value": rli_projects - rli_matched, "of": rli_projects, "tag": tag("s0-rli"), "source": "s0-rli"},
    {"card": "rli", "metric": "launch_rate_pct", "label": "Best automation rate at launch, October 2025", "value": float(rli_launch), "tag": tag("s0-rli-growth"), "source": "s0-rli-growth"},
    {"card": "rli", "metric": "growth_ratio", "label": "Growth since launch (21.25 / 2.50)", "value": float(rli_ratio), "tag": tag("s0-rli-growth"), "source": "s0-rli-growth"},
]

assert len(authors) == 9, authors
assert (icpc_ai, icpc_human, ioi_beaten_by, rli_projects, rli_matched) == (12, 11, 5, 240, 51)

out = {
    "generated_by": "scripts/data/build_s0_cards.py",
    "source_file": "already-past-us.md (s0 footnotes)",
    "rli_accessed": rli_accessed,
    "records": records,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} ({len(records)} records)")
