// Скачивает CDN-ассеты Lovable (.asset.json) в dist, чтобы они работали на GitHub Pages.
import { readdirSync, statSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const ORIGIN = process.env.LOVABLE_ASSETS_ORIGIN ?? "https://vasyaifin.lovable.app";
const DIST = "dist";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

const pointers = walk("src");
if (!pointers.length) {
  console.log("No .asset.json pointers found");
  process.exit(0);
}

let failed = 0;
for (const file of pointers) {
  const { url } = JSON.parse(readFileSync(file, "utf8"));
  if (!url) continue;
  const target = join(DIST, url.replace(/^\//, ""));
  try {
    const res = await fetch(ORIGIN + url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buf);
    console.log(`OK  ${url} (${buf.length} bytes)`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${url}: ${err.message}`);
  }
}

if (failed) {
  console.error(`${failed} asset(s) failed to download`);
  process.exit(1);
}
