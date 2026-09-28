// Fails the build when pt/en/es message files diverge in keys or array lengths.
import { readFileSync } from 'node:fs';

const locales = ['pt', 'en', 'es'];
const trees = Object.fromEntries(
  locales.map((l) => [l, JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), 'utf8'))]),
);

function paths(node, prefix = '') {
  const out = new Set();
  if (Array.isArray(node)) {
    out.add(`${prefix}[${node.length}]`);
    return out;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      const p = prefix ? `${prefix}.${k}` : k;
      out.add(p);
      for (const child of paths(v, p)) out.add(child);
    }
  }
  return out;
}

const base = paths(trees.pt);
let failed = false;
for (const l of locales.slice(1)) {
  const other = paths(trees[l]);
  const missing = [...base].filter((p) => !other.has(p));
  const extra = [...other].filter((p) => !base.has(p));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`messages/${l}.json differs from pt.json`);
    for (const p of missing) console.error(`  missing: ${p}`);
    for (const p of extra) console.error(`  extra:   ${p}`);
  }
}
if (failed) process.exit(1);
console.log('messages: pt/en/es keys match');
