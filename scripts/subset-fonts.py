"""Builds the self-hosted fonts in public/fonts and the matching src/fonts.css.

Each face ships as ONE woff2 that covers exactly the code points in scripts/font-codepoints.txt
(regenerate that list with `node scripts/font-codepoints.mjs` after `npm run build`).

    python -I scripts/subset-fonts.py [project-root]

Needs fontTools and brotli (python -m pip install --user fonttools brotli). The copies in public/fonts and
src/fonts.css are committed, so the site build does not depend on this script; run it after bumping a
fontsource package or when font-codepoints.txt gains a character.

Sources are the fontsource packages in node_modules (devDependencies). Fontsource only ships the faces
pre-split by script ("latin", "latin-ext", "greek", ...), so for each face the script takes the "latin" file
as the base and grafts in, from the face's other subset files, the glyphs for any listed code point the
base lacks (e.g. U+0151 "o with double acute" in "Erdos" comes from latin-ext). All subset files of a face
are cut from the same upstream font with real glyph names (post format 2), so grafted composites reuse
the base's own component glyphs by name. A grafted composite inherits the pair kerning of its first
component (ohungarumlaut kerns like o). For the variable Newsreader the glyph's gvar deltas are copied
too and HVAR is rebuilt from gvar. The result is then subset with fontTools.subset to the code point list.

Faces: Newsreader roman and italic (variable, wght 200..800 and opsz 6..72 axes kept), IBM Plex Sans
400/500/600, IBM Plex Mono 400/500. Code points no source file has (none of the fontsource subsets carry
arrows or math operators such as U+2265) are reported and fall back to the next font in the CSS stack.
"""

import copy
import os
import site
import sys

# -I drops the user site-packages, where `pip install --user` puts fontTools; add it back explicitly
# (the current directory and the script's directory stay off sys.path).
_user_site = site.getusersitepackages()
if os.path.isdir(_user_site) and _user_site not in sys.path:
    sys.path.append(_user_site)

from fontTools import subset  # noqa: E402
from fontTools.ttLib import TTFont  # noqa: E402
from fontTools.varLib.hvar import add_HVAR  # noqa: E402

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
NM = os.path.join(ROOT, 'node_modules')
OUT = os.path.join(ROOT, 'public', 'fonts')
CSS = os.path.join(ROOT, 'src', 'fonts.css')
CODEPOINTS = os.path.join(ROOT, 'scripts', 'font-codepoints.txt')

NEWSREADER = os.path.join(NM, '@fontsource-variable', 'newsreader')
PLEX_SANS = os.path.join(NM, '@fontsource', 'ibm-plex-sans')
PLEX_MONO = os.path.join(NM, '@fontsource', 'ibm-plex-mono')

# (output file, family, css style, css weight, package dir, fontsource file pattern with {s} = subset)
FACES = [
    ('newsreader-roman.woff2', 'Newsreader', 'normal', '200 800', NEWSREADER, 'newsreader-{s}-opsz-normal.woff2'),
    ('newsreader-italic.woff2', 'Newsreader', 'italic', '200 800', NEWSREADER, 'newsreader-{s}-opsz-italic.woff2'),
    ('ibm-plex-sans-400.woff2', 'IBM Plex Sans', 'normal', '400', PLEX_SANS, 'ibm-plex-sans-{s}-400-normal.woff2'),
    ('ibm-plex-sans-500.woff2', 'IBM Plex Sans', 'normal', '500', PLEX_SANS, 'ibm-plex-sans-{s}-500-normal.woff2'),
    ('ibm-plex-sans-600.woff2', 'IBM Plex Sans', 'normal', '600', PLEX_SANS, 'ibm-plex-sans-{s}-600-normal.woff2'),
    ('ibm-plex-mono-400.woff2', 'IBM Plex Mono', 'normal', '400', PLEX_MONO, 'ibm-plex-mono-{s}-400-normal.woff2'),
    ('ibm-plex-mono-500.woff2', 'IBM Plex Mono', 'normal', '500', PLEX_MONO, 'ibm-plex-mono-{s}-500-normal.woff2'),
]
# Donor subsets, tried in this order for code points the latin base lacks.
DONORS = ['latin-ext', 'greek', 'cyrillic', 'cyrillic-ext', 'vietnamese']
LICENSES = [(NEWSREADER, 'OFL-Newsreader.txt'), (PLEX_SANS, 'OFL-IBM-Plex-Sans.txt'), (PLEX_MONO, 'OFL-IBM-Plex-Mono.txt')]
# Layout features kept: fontTools' defaults (kern, liga, ccmp, locl, mark, mkmk, rvrn, frac, ...) plus the
# numeral features the CSS can ask for (font-variant-numeric: tabular-nums etc.).
EXTRA_FEATURES = ['tnum', 'pnum', 'lnum', 'onum']
PRELOAD = ['newsreader-roman.woff2', 'ibm-plex-sans-400.woff2']  # keep in sync with index.html


def read_codepoints():
    """All listed code points, and the subset found in the site itself (not just in the fixed base set)."""
    cps, used = set(), set()
    with open(CODEPOINTS, encoding='utf-8') as f:
        for line in f:
            if line.startswith('U+'):
                fields = line.rstrip('\n').split('\t')
                cp = int(fields[0][2:], 16)
                cps.add(cp)
                if fields[-1] != 'base':
                    used.add(cp)
    return cps, used


def unicode_cmaps(font):
    return [t for t in font['cmap'].tables if t.isUnicode()]


def pair_pos_subtables(font):
    if 'GPOS' not in font:
        return
    for lookup in font['GPOS'].table.LookupList.Lookup:
        for st in lookup.SubTable:
            if lookup.LookupType == 9:
                if st.ExtensionLookupType != 2:
                    continue
                st = st.ExtSubTable
            elif lookup.LookupType != 2:
                continue
            yield st


def inherit_kerning(font, src, new):
    """Give glyph `new` the pair kerning of glyph `src` (both as first and as second glyph)."""
    for st in pair_pos_subtables(font):
        cov = st.Coverage.glyphs
        if st.Format == 1:
            if src in cov:
                cov.append(new)
                st.PairSet.append(copy.deepcopy(st.PairSet[cov.index(src)]))
            for ps in st.PairSet:
                rec = next((r for r in ps.PairValueRecord if r.SecondGlyph == src), None)
                if rec is not None:
                    r2 = copy.deepcopy(rec)
                    r2.SecondGlyph = new
                    ps.PairValueRecord.append(r2)
        elif st.Format == 2:
            if src in cov:
                cov.append(new)
                st.ClassDef1.classDefs[new] = st.ClassDef1.classDefs.get(src, 0)
            if src in st.ClassDef2.classDefs:
                st.ClassDef2.classDefs[new] = st.ClassDef2.classDefs[src]


def graft(base, donor, cp):
    """Copy the glyph for code point cp (with any components base lacks) from donor into base."""
    bglyf, dglyf = base['glyf'], donor['glyf']
    order = base.getGlyphOrder()
    have = set(order)
    added = []

    def add(name):
        if name in have:
            return
        g = dglyf[name]
        if g.isComposite():
            for c in g.getComponentNames(dglyf):
                add(c)
        have.add(name)
        added.append(name)
        order.append(name)
        bglyf[name] = copy.deepcopy(g)
        base['hmtx'].metrics[name] = donor['hmtx'].metrics[name]
        if 'gvar' in base:
            base['gvar'].variations[name] = copy.deepcopy(donor['gvar'].variations.get(name, []))
        gdef = base['GDEF'].table if 'GDEF' in base else None
        if gdef is not None and gdef.GlyphClassDef is not None:
            dg = donor['GDEF'].table.GlyphClassDef if 'GDEF' in donor else None
            gdef.GlyphClassDef.classDefs[name] = (dg.classDefs.get(name) if dg else None) or 1

    name = donor.getBestCmap()[cp]
    add(name)
    base.setGlyphOrder(order)
    for t in unicode_cmaps(base):
        if cp <= 0xFFFF or t.format in (12, 13):
            t.cmap[cp] = name
    # Precomposed letters kern like their base letter.
    g = dglyf[name]
    if name in added and g.isComposite():
        first = g.components[0].glyphName
        if first in have and first not in added:
            inherit_kerning(base, first, name)
    return added


def check_same_design_space(base, donor):
    if ('fvar' in base) != ('fvar' in donor):
        raise SystemExit('base and donor disagree on being variable')
    if 'fvar' in base:
        ax = lambda f: [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in f['fvar'].axes]
        if ax(base) != ax(donor):
            raise SystemExit('fvar axes differ between base and donor')
        av = lambda f: f['avar'].segments if 'avar' in f else None
        if av(base) != av(donor):
            raise SystemExit('avar differs between base and donor')


def merge_maxp_hinting(base, donor):
    bm, dm = base['maxp'], donor['maxp']
    for k in ('maxZones', 'maxTwilightPoints', 'maxStorage', 'maxFunctionDefs', 'maxInstructionDefs',
              'maxStackElements', 'maxSizeOfInstructions'):
        if hasattr(bm, k) and hasattr(dm, k):
            setattr(bm, k, max(getattr(bm, k), getattr(dm, k)))


def ranges(cps):
    out, cps = [], sorted(cps)
    i = 0
    while i < len(cps):
        j = i
        while j + 1 < len(cps) and cps[j + 1] == cps[j] + 1:
            j += 1
        a, b = cps[i], cps[j]
        out.append(f'U+{a:04X}' if a == b else f'U+{a:04X}-{b:04X}')
        i = j + 1
    return ','.join(out)


def build_face(out_name, pkg, pattern, wanted):
    files = os.path.join(pkg, 'files')
    base = TTFont(os.path.join(files, pattern.format(s='latin')))
    for tag in base.keys():  # decompile everything before the glyph order changes
        if tag != 'GlyphOrder':
            base[tag]
    base_cmap = base.getBestCmap()
    grafted, donors = [], {}
    for cp in sorted(wanted - set(base_cmap)):
        for s in DONORS:
            path = os.path.join(files, pattern.format(s=s))
            if not os.path.exists(path):
                continue
            if s not in donors:
                donors[s] = TTFont(path)
                check_same_design_space(base, donors[s])
                merge_maxp_hinting(base, donors[s])
            if cp in donors[s].getBestCmap():
                graft(base, donors[s], cp)
                grafted.append((cp, s))
                break
    if grafted and 'HVAR' in base:
        add_HVAR(base)

    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = list(subset.Options().layout_features) + EXTRA_FEATURES
    opts.notdef_outline = True
    opts.name_IDs = ['*']
    opts.name_languages = ['*']
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=wanted)
    sub.subset(base)
    out = os.path.join(OUT, out_name)
    base.flavor = 'woff2'
    base.recalcTimestamp = False  # keep the source's head.modified so reruns are byte-identical
    base.save(out)
    covered = set(TTFont(out).getBestCmap())
    return covered, grafted


def main():
    wanted, used = read_codepoints()
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(('.woff2', '.txt')):
            os.remove(os.path.join(OUT, f))

    rules, total = [], 0
    for out_name, family, style, weight, pkg, pattern in FACES:
        covered, grafted = build_face(out_name, pkg, pattern, wanted)
        size = os.path.getsize(os.path.join(OUT, out_name))
        total += size
        g = ' '.join(f'U+{cp:04X}<-{s}' for cp, s in grafted) or 'none'
        # Only characters the site uses are worth reporting; base-set gaps (e.g. U+2028) are expected.
        missing = ' '.join(f'U+{cp:04X}' for cp in sorted(used - covered)) or 'none'
        print(f'{out_name:26} {size:7d} B  {len(covered)} code points; grafted {g}; '
              f'site characters not in any source file (fallback font): {missing}')
        rules.append((family, style, weight, out_name, ranges(covered)))
    for pkg, name in LICENSES:
        with open(os.path.join(pkg, 'LICENSE'), 'rb') as src, open(os.path.join(OUT, name), 'wb') as dst:
            dst.write(src.read())
    print(f'total {total} B in {len(FACES)} files; licenses copied')

    css = [
        '/* Self-hosted fonts. GENERATED by scripts/subset-fonts.py (python -I scripts/subset-fonts.py); edit that script, not this file.',
        '   One woff2 per face in public/fonts, subset to the code points in scripts/font-codepoints.txt',
        '   (fontsource latin plus the few extra characters the page uses, e.g. the "ő" in Erdős), so a page view',
        '   never fetches a second file per face. unicode-range lists exactly what each file covers; anything else',
        '   falls through to the next font in the stack.',
        '   Family names match --font-serif / --font-sans / --font-mono in styles.css.',
        f'   index.html preloads {" and ".join(PRELOAD)}; keep those paths in sync. */',
        '',
        '/* Newsreader: variable, axes wght 200..800 and opsz 6..72 (optical sizing via font-optical-sizing: auto). */',
    ]
    for i, (family, style, weight, out_name, urange) in enumerate(rules):
        if i == 2:
            css += ['', '/* IBM Plex Sans 400 / 500 / 600 */']
        if i == 5:
            css += ['', '/* IBM Plex Mono 400 / 500 */']
        css += [
            '@font-face {',
            f"  font-family: '{family}';",
            f'  font-style: {style};',
            '  font-display: swap;',
            f'  font-weight: {weight};',
            f"  src: url(/fonts/{out_name}) format('woff2');",
            f'  unicode-range: {urange};',
            '}',
        ]
    with open(CSS, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(css) + '\n')
    print('wrote src/fonts.css')


if __name__ == '__main__':
    main()
