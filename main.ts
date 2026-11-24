// Everyday Things, Two Lines, Longer Run (Node 22, standard library only):
// writes two lines — a vivid analogy explaining an echo to a ten-year-old,
// and why the analogy holds and where it breaks down — to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINES = [
  'An echo is like shouting hello into a deep well and hearing the well shout hello back at you a moment later.',
  'The comparison works because sound bounces off hard walls the way a ball bounces off a floor, but it leaves out that nobody is answering you: it is only your own voice, tired from the trip.',
];

// The sealed scorer only accepts 1–400 UTF-8 characters, not only whitespace,
// and the entry must be exactly two lines: fail loudly here instead of
// writing an entry the judge would never see.
const ENTRY = LINES.join('\n') + '\n';
if (LINES.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${LINES.length}`);
}
if (ENTRY.length < 1 || ENTRY.length > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-400 characters, got ${ENTRY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
