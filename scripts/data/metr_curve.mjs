// Builds src/data/metrCurve.json for the s3-metr-curve chart (MetrCurve.jsx).
// Usage (from the project root): node scripts/data/metr_curve.mjs
//
// Inputs (all local, nothing is fetched):
//   research/data/metr_points.json                       p50 / lo / hi / p80 / sota per model (MINUTES)
//   research/data/raw/metr_benchmark_results_1_1.yaml    METR's own file: cross-check + p80 95% intervals
// Units: METR's file stores horizons in MINUTES (GPT-4 p50 = 3.99 min, o3 = 119.7 min;
// see research/data/verification_local.txt and footnote s3-arc). We keep minutes throughout.
//
// Trend lines (footnote s3-doubling, "Our calculation"): ordinary least squares of
// log2(p50 minutes) on release date (days), SOTA points with p50 <= 16 h (960 min),
// split at 1 Jan 2024. The script asserts the manuscript's ~260 d and ~105 d.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const P = p => resolve(root, p)

const points = JSON.parse(readFileSync(P('research/data/metr_points.json'), 'utf8'))

// ── Minimal parser for the simple nested-mapping YAML METR publishes (no anchors, no flow) ──
function parseSimpleYaml(text) {
  const out = {}
  const stack = [{ indent: -1, obj: out }]
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue
    const indent = raw.length - raw.trimStart().length
    const line = raw.trim()
    if (line.startsWith('- ')) continue // scaffold lists: not needed
    const m = line.match(/^([^:]+):\s*(.*?)\s*(#.*)?$/)
    if (!m) continue
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop()
    const parent = stack[stack.length - 1].obj
    const [, key, val] = m
    if (val === '') {
      parent[key] = {}
      stack.push({ indent, obj: parent[key] })
    } else {
      const num = Number(val)
      parent[key] = val === 'true' ? true : val === 'false' ? false : Number.isFinite(num) && /^[-0-9.eE+]+$/.test(val) ? num : val
    }
  }
  return out
}
const yaml = parseSimpleYaml(readFileSync(P('research/data/raw/metr_benchmark_results_1_1.yaml'), 'utf8'))

// Display names (labels only; the values come from the files above).
const NAMES = {
  gpt2: 'GPT-2',
  davinci_002: 'GPT-3 (davinci-002)',
  gpt_3_5_turbo_instruct: 'GPT-3.5 Turbo Instruct',
  gpt_4: 'GPT-4',
  gpt_4_1106_inspect: 'GPT-4 (Nov 2023 update)',
  claude_3_opus_inspect: 'Claude 3 Opus',
  gpt_4_turbo_inspect: 'GPT-4 Turbo',
  gpt_4o_inspect: 'GPT-4o',
  claude_3_5_sonnet_20240620_inspect: 'Claude 3.5 Sonnet (June 2024)',
  o1_preview: 'o1-preview',
  claude_3_5_sonnet_20241022_inspect: 'Claude 3.5 Sonnet (Oct 2024)',
  o1_inspect: 'o1',
  claude_3_7_sonnet_inspect: 'Claude 3.7 Sonnet',
  o3_inspect: 'o3',
  claude_4_opus_inspect: 'Claude Opus 4',
  claude_4_1_opus_inspect: 'Claude Opus 4.1',
  gpt_5_2025_08_07_inspect: 'GPT-5',
  gemini_3_pro: 'Gemini 3 Pro',
  gpt_5_1_codex_max_inspect: 'GPT-5.1-Codex-Max',
  claude_opus_4_5_inspect: 'Claude Opus 4.5',
  gpt_5_2: 'GPT-5.2',
  claude_opus_4_6_inspect: 'Claude Opus 4.6',
  gpt_5_3_codex: 'GPT-5.3-Codex',
  gemini_3_1_pro: 'Gemini 3.1 Pro',
  gpt_5_4: 'GPT-5.4',
  claude_mythos_preview_early_inspect: 'Claude Mythos Preview (early)',
}
// Points the manuscript names in the s3 body get a direct label on the chart.
const LABELLED = new Set(['gpt_4', 'o3_inspect', 'gpt_5_2025_08_07_inspect', 'claude_opus_4_6_inspect', 'claude_mythos_preview_early_inspect'])
// Footnote that carries each point's p50 in the manuscript.
const p50Source = k =>
  k === 'claude_mythos_preview_early_inspect' ? 's3-mythos'
  : ['gpt_5_3_codex', 'gemini_3_1_pro', 'gpt_5_4'].includes(k) ? 's3-others'
  : 's3-arc'

const close = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b))
function assert(cond, msg) { if (!cond) { console.error('ASSERTION FAILED: ' + msg); process.exit(1) } }

const models = points.map(p => {
  const y = yaml.results?.[p.key]
  assert(y, `model ${p.key} missing from METR yaml`)
  const m = y.metrics
  assert(String(y.release_date) === p.date, `${p.key}: date ${p.date} vs yaml ${y.release_date}`)
  assert(m.is_sota === p.sota, `${p.key}: sota mismatch`)
  assert(close(m.p50_horizon_length.estimate, p.p50), `${p.key}: p50 mismatch`)
  assert(close(m.p50_horizon_length.ci_low, p.lo) && close(m.p50_horizon_length.ci_high, p.hi), `${p.key}: p50 CI mismatch`)
  assert(close(m.p80_horizon_length.estimate, p.p80), `${p.key}: p80 mismatch`)
  assert(NAMES[p.key], `no display name for ${p.key}`)
  return {
    key: p.key,
    name: NAMES[p.key],
    date: p.date,
    sota: p.sota,
    label: LABELLED.has(p.key),
    p50: p.p50, p50Lo: p.lo, p50Hi: p.hi,
    p80: p.p80, p80Lo: m.p80_horizon_length.ci_low, p80Hi: m.p80_horizon_length.ci_high,
    unit: 'minutes',
    source: p50Source(p.key),
    sourceP80: 's3-p80',
    file: 'research/data/metr_points.json; research/data/raw/metr_benchmark_results_1_1.yaml',
  }
})
assert(Object.keys(yaml.results).length === models.length, 'yaml has models not in metr_points.json')

// ── Manuscript spot checks (s3 body + footnotes s3-arc, s3-mythos, s3-p80, s3-others) ──
const by = Object.fromEntries(models.map(m => [m.key, m]))
const r1 = v => Math.round(v * 10) / 10
assert(r1(by.gpt_4.p50) === 4.0 && by.gpt_4.date === '2023-03-14', 'GPT-4 ~4 min, 14 Mar 2023')
assert(r1(by.o3_inspect.p50) === 119.7, 'o3 119.7 min')
assert(r1(by.gpt_5_2025_08_07_inspect.p50) === 203.0, 'GPT-5 203.0 min')
assert(r1(by.claude_opus_4_6_inspect.p50) === 718.8 && r1(by.claude_opus_4_6_inspect.p50Lo) === 316.7 && r1(by.claude_opus_4_6_inspect.p50Hi) === 3633.8, 'Opus 4.6 718.8 (316.7-3633.8) min')
assert(r1(by.claude_mythos_preview_early_inspect.p50) === 1044.8, 'Mythos 1044.8 min')
assert(r1(by.claude_opus_4_6_inspect.p80) === 69.9 && r1(by.claude_opus_4_6_inspect.p80Lo) === 27.0 && r1(by.claude_opus_4_6_inspect.p80Hi) === 170.4, 'Opus 4.6 p80 69.9 (27.0-170.4)')
assert(r1(by.claude_mythos_preview_early_inspect.p80) === 185.9 && r1(by.claude_mythos_preview_early_inspect.p80Lo) === 97.3 && r1(by.claude_mythos_preview_early_inspect.p80Hi) === 398.5, 'Mythos p80 185.9 (97.3-398.5)')
assert(r1(by.gpt_5_3_codex.p50) === 349.5 && r1(by.gemini_3_1_pro.p50) === 384.1 && r1(by.gpt_5_4.p50) === 341.7, 's3-others values')

// ── OLS refit (footnote s3-doubling) ──
const DAY = 86400000
const dayNum = iso => Date.parse(iso + 'T00:00:00Z') / DAY
const LIMIT_MIN = 16 * 60
function fit(fromIso, toIso) {
  const pts = models.filter(m => m.sota && m.p50 <= LIMIT_MIN && m.date >= fromIso && m.date < toIso)
  const xs = pts.map(m => dayNum(m.date)), ys = pts.map(m => Math.log2(m.p50))
  const n = pts.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n
  let sxy = 0, sxx = 0, syy = 0
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2 }
  const slope = sxy / sxx // log2 units per day
  const intercept = my - slope * mx
  const at = iso => 2 ** (intercept + slope * dayNum(iso))
  const first = pts[0].date, last = pts[pts.length - 1].date
  return {
    n, doublingDays: 1 / slope, r2: (sxy * sxy) / (sxx * syy),
    keys: pts.map(p => p.key),
    // Line drawn only across the span of the fitted points (no extrapolation).
    start: { date: first, minutes: at(first) },
    end: { date: last, minutes: at(last) },
    slopeLog2PerDay: slope, interceptLog2: intercept,
  }
}
const pre = fit('2019-01-01', '2024-01-01')
const post = fit('2024-01-01', '2100-01-01')
const from2023 = fit('2023-01-01', '2100-01-01')
const from2025 = fit('2025-01-01', '2100-01-01')
console.log(`pre-2024  n=${pre.n}  doubling ${pre.doublingDays.toFixed(1)} d  R2 ${pre.r2.toFixed(3)}`)
console.log(`2024+     n=${post.n}  doubling ${post.doublingDays.toFixed(1)} d  R2 ${post.r2.toFixed(3)}`)
console.log(`2023+     n=${from2023.n}  doubling ${from2023.doublingDays.toFixed(1)} d (METR file: ${yaml.doubling_time_in_days.from_2023_on.point_estimate})`)
console.log(`2025+     n=${from2025.n}  doubling ${from2025.doublingDays.toFixed(1)} d`)
assert(pre.n === 5 && Math.round(pre.doublingDays) === 260, `pre-2024 doubling should be ~260 d (n=5), got ${pre.doublingDays} (n=${pre.n})`)
assert(post.n === 12 && Math.round(post.doublingDays) === 105, `2024+ doubling should be ~105 d (n=12), got ${post.doublingDays} (n=${post.n})`)
assert(from2023.n === 14 && Math.abs(from2023.doublingDays - yaml.doubling_time_in_days.from_2023_on.point_estimate) < 0.5, '2023+ refit should reproduce METR 128.7 d')
assert(Math.round(from2025.doublingDays) === 121 && from2025.n === 7, '2025+ should be 121 d, n=7')
// s3-others ratios to the 2024+ line: 0.62, 0.62, 0.50
const ratio = k => by[k].p50 / 2 ** (post.interceptLog2 + post.slopeLog2PerDay * dayNum(by[k].date))
assert([ratio('gpt_5_3_codex'), ratio('gemini_3_1_pro'), ratio('gpt_5_4')].map(v => v.toFixed(2)).join() === '0.62,0.62,0.50', 's3-others ratios')

const out = {
  generated: 'node scripts/data/metr_curve.mjs',
  unit: 'minutes',
  notes: 'METR Time Horizon 1.1 data file (state 8 May 2026). p50/p80 = task length (skilled-human minutes) at 50%/80% success; lo/hi = 95% CI. Trend lines: our OLS of log2(p50) on date, SOTA points with p50 <= 16 h.',
  models,
  trends: {
    pre2024: { ...pre, label: 'before 2024', source: 's3-doubling' },
    from2024: { ...post, label: '2024 on', source: 's3-doubling' },
  },
  checks: { from2023Days: from2023.doublingDays, from2025Days: from2025.doublingDays, metrFrom2023Days: yaml.doubling_time_in_days.from_2023_on.point_estimate },
  reliabilityLimitMinutes: LIMIT_MIN, // s3-16h
  frozenDate: '2026-09-08', // s3-frozen
  // Hand-entered from METR's 26 Jun 2026 post (footnote s3-sol). NOT a robust measurement and
  // not part of any fit. Cheating scored as failure. Plotted at the release date given in s3-sol.
  sol: {
    name: 'GPT-5.6 Sol', date: '2026-07-09', evaluated: '2026-06', p50Hours: 11.3, loHours: 5, hiHours: 40,
    p50: 11.3 * 60, p50Lo: 5 * 60, p50Hi: 40 * 60, unit: 'minutes', source: 's3-sol',
  },
}
mkdirSync(P('src/data'), { recursive: true })
writeFileSync(P('src/data/metrCurve.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`wrote src/data/metrCurve.json (${models.length} models)`)
