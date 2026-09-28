#!/usr/bin/env node
/**
 * Copies Blind Board prospects into src/data/flipcards.json for <FlipCard>.
 *
 *   node scripts/flipcards.mjs ../nba_draft/app/public/data/prospects.json 2018_jalen_brunson ...
 *
 * Only the ids you name are copied, and only the fields the card shows — the
 * site never carries the full Blind Board dataset. Re-running merges: existing
 * ids are refreshed, others kept.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const [src, ...ids] = process.argv.slice(2);
if (!src || ids.length === 0) {
  console.error('usage: node scripts/flipcards.mjs <prospects.json> <id> [id ...]');
  process.exit(1);
}

const FIELDS = [
  'id', 'name', 'college', 'draftYear', 'draftPick', 'draftAgeLabel', 'photoFilename',
  'height', 'weight', 'wingspanInches',
  'ppg', 'fgm', 'fga', 'fgPct', 'threePM', 'threePA', 'threePPct', 'ftm', 'fta', 'ftPct',
  'trb', 'apg', 'spg', 'bpg', 'tov', 'collegeBPM', 'sosRank',
  'careerWS', 'nbaGames', 'nbaYears',
];

const all = JSON.parse(readFileSync(src, 'utf8'));
const out = fileURLToPath(new URL('../src/data/flipcards.json', import.meta.url));
const cards = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};

for (const id of ids) {
  const p = all.find((x) => x.id === id);
  if (!p) {
    console.error(`not found: ${id}`);
    process.exit(1);
  }
  cards[id] = Object.fromEntries(FIELDS.map((f) => [f, p[f] ?? null]));
  console.log(`✓ ${id} — ${p.name}`);
}

writeFileSync(out, JSON.stringify(cards, null, 2) + '\n');
