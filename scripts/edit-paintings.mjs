#!/usr/bin/env node
/**
 * Interactive terminal UI for editing painting metadata in data/paintings.yaml
 *
 * - Lists all paintings and lets you select which to edit
 * - Shows current values as defaults (press Enter to keep)
 * - Saves to YAML after every entry
 *
 * Usage:
 *   pnpm edit-paintings
 */

import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin, stdout } from "process";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const YAML_FILE = path.join(ROOT, "data", "paintings.yaml");

const FIELDS = [
  { key: "title",      label: "Title",      required: true  },
  { key: "year",       label: "Year",       required: false },
  { key: "series",     label: "Series",     required: false },
  { key: "dimensions", label: "Dimensions", required: false },
  { key: "medium",     label: "Medium",     required: false },
];

// ── colours ────────────────────────────────────────────────────────────────

const RESET  = "\x1b[0m";
const BOLD   = "\x1b[1m";
const DIM    = "\x1b[2m";
const CYAN   = "\x1b[36m";
const YELLOW = "\x1b[33m";
const GREEN  = "\x1b[32m";
const RED    = "\x1b[31m";

// ── helpers ────────────────────────────────────────────────────────────────

function saveYaml(entries) {
  const header = `# Paintings metadata
# Edit freely — run \`pnpm sync-paintings\` after saving to regenerate paintings.ts
#
# Fields:
#   filename:   (required) matches the file in public/paintings/
#   title:      (required) display title
#   year:       (optional) e.g. 2023
#   series:     (optional) groups paintings in the gallery filter
#   dimensions: (optional) e.g. "30 × 40 cm"
#   medium:     (optional) e.g. "Watercolour on paper"\n\n`;
  fs.writeFileSync(YAML_FILE, header + yaml.dump(entries, { lineWidth: 120 }));
}

function hasMissing(entry) {
  return FIELDS.some((f) => entry[f.key] === undefined || entry[f.key] === null || entry[f.key] === "");
}

function statusBadge(entry) {
  const missing = FIELDS.filter(
    (f) => entry[f.key] === undefined || entry[f.key] === null || entry[f.key] === ""
  );
  if (missing.length === 0) return `${GREEN}complete${RESET}`;
  const names = missing.map((f) => f.key).join(", ");
  return `${YELLOW}missing: ${names}${RESET}`;
}

// ── checkbox selector (arrow keys + space + enter) ─────────────────────────

function renderList(entries, cursor, selected) {
  stdout.write("\x1b[2J\x1b[H"); // clear screen
  stdout.write(`${BOLD}Select paintings to edit${RESET}\n`);
  stdout.write(`${DIM}↑/↓ navigate  space toggle  a select all  n deselect all  enter confirm${RESET}\n\n`);

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const check = selected.has(i) ? `${GREEN}◉${RESET}` : `${DIM}○${RESET}`;
    const arrow = i === cursor ? `${CYAN}›${RESET}` : " ";
    const name  = i === cursor ? `${BOLD}${e.filename}${RESET}` : e.filename;
    stdout.write(`  ${arrow} ${check}  ${name}  ${DIM}${e.title || ""}${RESET}  ${statusBadge(e)}\n`);
  }

  stdout.write(`\n  ${DIM}${selected.size} selected${RESET}\n`);
}

function selectPaintings(entries) {
  return new Promise((resolve) => {
    const selected = new Set(
      entries.map((e, i) => hasMissing(e) ? i : -1).filter((i) => i >= 0)
    );
    let cursor = 0;

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    renderList(entries, cursor, selected);

    stdin.on("data", function handler(key) {
      if (key === "\u0003") { // ctrl+c
        stdin.setRawMode(false);
        stdin.removeListener("data", handler);
        process.exit(0);
      }

      if (key === "\u001b[A" || key === "k") { // up
        cursor = (cursor - 1 + entries.length) % entries.length;
      } else if (key === "\u001b[B" || key === "j") { // down
        cursor = (cursor + 1) % entries.length;
      } else if (key === " ") { // space — toggle
        if (selected.has(cursor)) selected.delete(cursor);
        else selected.add(cursor);
      } else if (key === "a") { // select all
        for (let i = 0; i < entries.length; i++) selected.add(i);
      } else if (key === "n") { // deselect all
        selected.clear();
      } else if (key === "\r") { // enter — confirm
        stdin.setRawMode(false);
        stdin.removeListener("data", handler);
        stdout.write("\x1b[2J\x1b[H");
        resolve([...selected].sort((a, b) => a - b).map((i) => entries[i]));
        return;
      }

      renderList(entries, cursor, selected);
    });
  });
}

// ── main ───────────────────────────────────────────────────────────────────

let entries = yaml.load(fs.readFileSync(YAML_FILE, "utf-8")) || [];

const toEdit = await selectPaintings(entries);

if (toEdit.length === 0) {
  console.log(`\n${DIM}Nothing selected. Exiting.${RESET}\n`);
  process.exit(0);
}

const rl = readline.createInterface({ input: stdin, output: stdout });

console.log(`${BOLD}Editing ${toEdit.length} painting(s)${RESET}`);
console.log(`${DIM}Press Enter to keep current value. Type a value to update. Type - to clear.${RESET}\n`);

for (let i = 0; i < toEdit.length; i++) {
  const entry = toEdit[i];
  const idx = entries.indexOf(entry);

  console.log(`${BOLD}${CYAN}[${i + 1}/${toEdit.length}] ${entry.filename}${RESET}`);

  for (const field of FIELDS) {
    const current = entry[field.key];
    const display =
      current !== undefined && current !== null && current !== ""
        ? `${DIM}(${current})${RESET} `
        : field.required
        ? `${RED}(required)${RESET} `
        : `${DIM}(empty)${RESET} `;

    const raw = await rl.question(`  ${YELLOW}${field.label}${RESET} ${display}› `);
    const value = raw.trim();

    if (value === "-") {
      delete entries[idx][field.key];
    } else if (value !== "") {
      entries[idx][field.key] = field.key === "year" ? Number(value) || value : value;
    }
  }

  saveYaml(entries);
  console.log(`  ${GREEN}✓ saved${RESET}\n`);
}

rl.close();
console.log(`${BOLD}${GREEN}Done!${RESET} Run ${CYAN}pnpm sync-paintings${RESET} to regenerate paintings.ts.\n`);
