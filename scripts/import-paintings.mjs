#!/usr/bin/env node
/**
 * Imports paintings from Google Drive → public/paintings/
 *
 * Selection rules (per base name group):
 *   1. Prefer *_retouch-min.jpg  (pre-optimised retouched version)
 *   2. Else prefer *_retouch.jpg
 *   3. Else any plain .jpg/.jpeg/.png
 *   4. Skip *_original.* and *.jp2 files always
 *
 * After copying, run:  npm run sync-paintings
 *
 * Usage:
 *   node scripts/import-paintings.mjs            # dry run (shows what would be copied)
 *   node scripts/import-paintings.mjs --apply    # actually copy files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEST = path.join(ROOT, "public", "paintings");
const GDRIVE_SRC =
  "/Users/stephanye/Library/CloudStorage/GoogleDrive-ye.stephan@gmail.com/My Drive/arlenye/paintings";

const APPLY = process.argv.includes("--apply");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** Convert "My Nice File_retouch-min.jpg" → "my-nice-file.jpg" */
function slugify(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));
  const slug = base
    .replace(/_retouch-min$/i, "")
    .replace(/_retouch$/i, "")
    .replace(/\s*copy$/i, "")
    .replace(/[-_\s]+/g, "-")
    .replace(/[^a-z0-9\-åäöüéàèìòùñ]/gi, "")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
  return slug + ext;
}

/** Rank a filename — lower is better */
function rank(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes("_retouch-min")) return 0;
  if (lower.includes("_retouch")) return 1;
  return 2;
}

/** Recursively collect all image files under a directory */
function collectImages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

// --- Collect & filter ---
const allImages = collectImages(GDRIVE_SRC);

// Skip originals and jp2s
const candidates = allImages.filter((f) => {
  const lower = f.toLowerCase();
  return !lower.includes("_original") && !lower.endsWith(".jp2");
});

// Group by slugified dest name, pick best rank per group
const groups = new Map();
for (const src of candidates) {
  const slug = slugify(path.basename(src));
  const existing = groups.get(slug);
  if (!existing || rank(path.basename(src)) < rank(path.basename(existing))) {
    groups.set(slug, src);
  }
}

// --- Report / Apply ---
if (!APPLY) {
  console.log(`Dry run — ${groups.size} file(s) would be copied to public/paintings/\n`);
  console.log("Pass --apply to actually copy.\n");
}

let copied = 0;
let skipped = 0;

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

for (const [slug, src] of [...groups.entries()].sort()) {
  const dest = path.join(DEST, slug);
  const exists = fs.existsSync(dest);

  if (exists) {
    console.log(`  skip  ${slug}  (already exists)`);
    skipped++;
    continue;
  }

  const relSrc = src.replace(GDRIVE_SRC + "/", "");
  console.log(`  ${APPLY ? "copy" : "would copy"}  ${relSrc}  →  ${slug}`);

  if (APPLY) {
    fs.copyFileSync(src, dest);
    copied++;
  }
}

console.log(
  `\n${APPLY ? `Done — ${copied} copied, ${skipped} skipped.` : `(dry run — run with --apply to copy)`}`
);
if (APPLY && copied > 0) {
  console.log(`\nNext: run  npm run sync-paintings  to register them.`);
}
