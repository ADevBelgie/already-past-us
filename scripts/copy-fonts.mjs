// Copies the self-hosted WOFF2 files from the fontsource packages (devDependencies) into public/fonts.
// Run after bumping a font package: node scripts/copy-fonts.mjs. The copies are committed, so the build
// does not depend on this script; src/fonts.css holds the matching @font-face rules.
// Only the Latin and Latin-ext subsets ship, and only the faces the CSS uses:
//   Newsreader: one variable file per style with both the wght (200..800) and opsz (6..72) axes,
//     so font-optical-sizing: auto keeps working and the 400/500/600 weights all come from one file.
//   IBM Plex Sans 400/500/600 and IBM Plex Mono 400/500, roman only (static files).
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'fonts')
const pkg = (name) => join(root, 'node_modules', name)

const SUBSETS = ['latin', 'latin-ext']
const files = [
  ...SUBSETS.flatMap((s) => ['normal', 'italic'].map((st) => ['@fontsource-variable/newsreader', `newsreader-${s}-opsz-${st}.woff2`])),
  ...SUBSETS.flatMap((s) => [400, 500, 600].map((w) => ['@fontsource/ibm-plex-sans', `ibm-plex-sans-${s}-${w}-normal.woff2`])),
  ...SUBSETS.flatMap((s) => [400, 500].map((w) => ['@fontsource/ibm-plex-mono', `ibm-plex-mono-${s}-${w}-normal.woff2`])),
]
const licenses = [
  ['@fontsource-variable/newsreader', 'OFL-Newsreader.txt'],
  ['@fontsource/ibm-plex-sans', 'OFL-IBM-Plex-Sans.txt'],
  ['@fontsource/ibm-plex-mono', 'OFL-IBM-Plex-Mono.txt'],
]

mkdirSync(out, { recursive: true })
for (const f of readdirSync(out)) if (/\.(woff2|txt)$/.test(f)) rmSync(join(out, f))
for (const [name, file] of files) copyFileSync(join(pkg(name), 'files', file), join(out, file))
for (const [name, file] of licenses) copyFileSync(join(pkg(name), 'LICENSE'), join(out, file))
console.log(`copied ${files.length} font files and ${licenses.length} licenses to public/fonts`)
