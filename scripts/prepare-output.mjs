import { readdir, rm, copyFile } from "node:fs/promises";
// Filter only Vite's generated output. Historical source assets remain untouched.
const allowed = new Set([
  "assets",
  "data",
  "models",
  "resumes",
  "fonts",
  "index.html",
  "favicon.svg",
  "ort-wasm-simd-threaded.mjs",
  "ort-wasm-simd-threaded.wasm",
]);
for (const entry of await readdir("dist"))
  if (!allowed.has(entry))
    await rm(`dist/${entry}`, { recursive: true, force: true });
const fonts = new Set([
  "anton-v27-1Ptgg87LROyAm3Kz-C8.woff2",
  "permanent-marker-v16-Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cfw.woff2",
  "special-elite-v20-XLYgIZbkc4JPUL5CVArUVL0ntnAOSA.woff2",
  "anton-LICENSE.txt",
  "marker-LICENSE.txt",
  "elite-LICENSE.txt",
]);
for (const entry of await readdir("dist/fonts"))
  if (!fonts.has(entry)) await rm(`dist/fonts/${entry}`);
await copyFile("dist/index.html", "dist/404.html");
console.log(
  "Output checked: approved assets only; historical reference media/audio excluded.",
);
