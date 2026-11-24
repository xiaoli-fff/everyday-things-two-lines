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

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1-400
// characters, not only whitespace, and exactly two lines, each one sentence.
// validateEntry checks each of those items separately so a failure names
// the gate item that was missed instead of a bare character count.
function validateEntry(lines: string[], maxChars: number): string {
  if (lines.length !== 2) {
    throw new Error(`gate failed: entry must be exactly two lines, got ${lines.length}`);
  }
  for (const [i, line] of lines.entries()) {
    const n = i + 1;
    if (line.trim().length === 0) {
      throw new Error(`gate failed: line ${n} must not be empty`);
    }
    if (line.includes('\n') || line.includes('\r')) {
      throw new Error(`gate failed: line ${n} must not contain a line break`);
    }
    // One sentence: ends with a full stop and contains no other full stop.
    if (!line.endsWith('.') || line.slice(0, -1).includes('.')) {
      throw new Error(`gate failed: line ${n} must be exactly one sentence ending with '.'`);
    }
  }
  const entry = lines.join('\n') + '\n';
  const chars = [...entry].length;
  if (chars < 1 || chars > maxChars) {
    throw new Error(`gate failed: entry must be 1-${maxChars} characters, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error('gate failed: entry must not be only whitespace');
  }
  return entry;
}

const ENTRY = validateEntry(LINES, 400);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
