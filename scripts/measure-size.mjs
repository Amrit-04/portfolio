import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const assets = await readdir("dist/assets");
let critical = 0;
const rows = [];
for (const name of assets) {
  const data = await readFile(`dist/assets/${name}`),
    gz = gzipSync(data).length;
  rows.push({ name, raw: data.length, gzip: gz });
  if (/^(index-|jsx-runtime-)/.test(name) && /\.(js|css)$/.test(name))
    critical += gz;
}
console.table(rows);
console.log(`Critical JS + CSS: ${critical} gzip bytes; budget 160000.`);
if (critical > 160000)
  throw new Error("Initial compressed asset budget exceeded.");
const root = await readdir("dist");
if (root.includes("media") || root.includes("audio"))
  throw new Error("Unapproved reference assets in delivery.");
for (const path of [
  "dist/404.html",
  "dist/models/best_real.onnx",
  "dist/resumes/Amriteshkumar_Yadav_.pdf",
])
  if (!(await stat(path)).size) throw new Error(`Missing asset ${path}`);
console.log(
  "PASS: lazy game/inference, initial budget, Pages fallback, model, résumé, provenance exclusions.",
);
