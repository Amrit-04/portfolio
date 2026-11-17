import { readdirSync, readFileSync, writeFileSync } from "node:fs";
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const quality = JSON.parse(readFileSync("docs/browser-quality.json", "utf8"));
const tests = JSON.parse(readFileSync("docs/e2e-results.json", "utf8")).stats;
const visual = JSON.parse(readFileSync("docs/adaptation-visual.json", "utf8"));
const reference = JSON.parse(
  readFileSync("docs/reference-clone-audit.json", "utf8"),
);
const violations = quality.flatMap((x) => x.violations || []),
  errors = quality.flatMap((x) => [...(x.errors || []), ...(x.bad || [])]);
const categories = [
  "ai",
  "systems",
  "quant",
  "algorithms",
  "research",
  "playground",
];
const pairs = [
  ["home", "home"],
  ["about", "about"],
  ["work", "work"],
  ["links", "links"],
  ...categories.map((x, i) => [`wall-${i + 1}`, `wall-${x}`]),
  ["lightbox", "notebook"],
  ["signoff", "signoff"],
];
const img = (path, label) =>
  `<a href="${path}"><img loading="lazy" src="${path}" alt="${esc(label)}"><span>${esc(label)}</span></a>`;
const comparisons = ["desktop", "mobile"]
  .map(
    (device) =>
      `<section><h2>${device === "desktop" ? "Desktop · 1440 × 1000" : "Phone · 390 × 844"}</h2>${pairs.map(([a, b]) => `<details ${b === "work" || b === "about" ? "open" : ""}><summary>${esc(b.replaceAll("-", " "))}</summary><div class="pair">${img(`screenshots/reference-clone/${device}-${a}.png`, "Supplied reference · " + a)}${img(`screenshots/adaptation-final/${device}-${b}.png`, "Amritesh adaptation · " + b)}</div></details>`).join("")}</section>`,
  )
  .join("");
const additional = readdirSync("screenshots/adaptation-final").filter(
  (x) =>
    x.endsWith(".png") &&
    /small-|hover-|socials|gate|research-.*-paper|playground-.*-paper/.test(x),
);
const regression = readdirSync("screenshots/final").filter((x) =>
  /^(?:(?:desktop|mobile|small)-(?:detail-.+|demo-.+|editor|game-(?:ready|riding|paused|crash|airborne-gap|checkpoint))|laptop-game-crash|game-finish)\.png$/.test(
    x,
  ),
);
const geometry = [];
for (const [oldId, newId] of [
  ["home", "top"],
  ["about", "about"],
  ["work", "work"],
]) {
  const a = reference.viewports
    .find((x) => x.name === "desktop")
    .states.find((x) => x.state === "home")
    .sections.find((x) => x.id === oldId)?.rect;
  const b = visual.states
    .find((x) => x.name === "desktop" && x.state === "home")
    .sections.find((x) => x.id === newId)?.rect;
  if (a && b)
    geometry.push({
      section: newId,
      reference: { width: a.width, height: a.height },
      adaptation: { width: b.width, height: b.height },
      widthDifference: b.width - a.width,
      heightDifference: b.height - a.height,
    });
}
writeFileSync(
  "docs/composition-comparison.json",
  JSON.stringify(
    {
      date: new Date().toISOString(),
      geometry,
      note: "Outer boxes only, not a pixel-similarity score or user acceptance.",
    },
    null,
    2,
  ),
);
writeFileSync(
  "REVIEW.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Amritesh — Reference adaptation review</title><style>
*{box-sizing:border-box}body{font:16px/1.6 system-ui,sans-serif;background:#f2f4f4;color:#222;max-width:1440px;margin:auto;padding:36px 24px}h1{font-size:clamp(30px,5vw,60px);line-height:1.08;max-width:960px}h2{margin-top:48px}header p{max-width:960px}.note{padding:18px;border-left:3px solid #425869;background:#e5ebee}nav,.facts{display:flex;gap:24px;flex-wrap:wrap;margin:28px 0}.facts strong{font-size:30px;display:block}.facts span{font-size:13px}a{color:#215478}summary{cursor:pointer;padding:18px 0;border-top:1px solid #b9c0c3;font-weight:650}summary:focus-visible,a:focus-visible{outline:3px solid #357ab0;outline-offset:3px}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:0 0 28px}.pair img{width:100%;height:auto;display:block}.pair a,.gallery a{text-decoration:none;color:inherit;min-width:0}.pair span,.gallery span{display:block;font:12px/1.5 monospace;padding:8px 0;overflow-wrap:anywhere}.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}.gallery img{display:block;width:100%;height:260px;object-fit:contain;background:#e4e8e9}pre{padding:20px;background:#e5ebee;overflow:auto}table{border-collapse:collapse;width:100%;font-size:14px}td,th{padding:12px;border-bottom:1px solid #bbc2c5;text-align:left}footer{margin-top:50px;font-size:13px}@media(max-width:600px){body{padding:24px 14px}.pair{gap:8px}}
</style><header><p>LOCAL REVIEW / UNPUBLISHED FEATURE BRANCH</p><h1>The reference composition.<br>Amritesh’s own work.</h1><p>The rejected workshop has been replaced with the supplied site’s framed reel, illustrated biography, six ink boxes, overlapping walls, bracketed links and long sign-off. These are matched viewport captures of the unchanged local reference and the rebuilt production bundle.</p></header>
<p class="note">This is a review artifact, not production publication. The reference’s identity, client work, portrait, audio and proprietary lettering are not shipped in the portfolio. New artwork and OFL-licensed Amatic SC deliberately differ. The reel is an original project slideshow, not the creator’s video. Outer geometry checks are not a pixel-similarity score or proof of your visual acceptance.</p>
<div class="facts"><div><strong>${tests.expected}</strong><span>browser tests passed</span></div><div><strong>${tests.unexpected}</strong><span>failed</span></div><div><strong>${quality.filter((x) => x.state).length}</strong><span>axe states</span></div><div><strong>${violations.length}</strong><span>axe violations</span></div></div>
<nav><a href="docs/DEVELOPMENT_REPORT.md">Correction report</a><a href="docs/VISUAL_REVIEW.md">Visual findings</a><a href="docs/REFERENCE_ANALYSIS.md">Reference source map</a><a href="docs/PERFORMANCE_ACCESSIBILITY.md">Performance & accessibility</a><a href="docs/e2e-results.json">Raw tests</a><a href="docs/browser-quality.json">Raw browser audit</a></nav>
<h2>Measured composition</h2><table><thead><tr><th>Section</th><th>Reference width × height</th><th>Adaptation width × height</th></tr></thead><tbody>${geometry.map((x) => `<tr><td>${x.section}</td><td>${x.reference.width.toFixed(2)} × ${x.reference.height.toFixed(2)}</td><td>${x.adaptation.width.toFixed(2)} × ${x.adaptation.height.toFixed(2)}</td></tr>`).join("")}</tbody></table>
<p>Open any image at its native size. About and Work intentionally preserve the reference’s anchor alignment beneath its sticky navigation. The original animated reel can be on a different frame—or black during video startup—at capture time.</p>${comparisons}
<h2>Additional interaction and small-phone states</h2><div class="gallery">${additional.map((x) => img(`screenshots/adaptation-final/${x}`, x)).join("")}</div>
<details><summary>Preserved notebooks, real experiments, bicycle and editor</summary><div class="gallery">${regression.map((x) => img(`screenshots/final/${x}`, x)).join("")}</div></details>
<h2>Run the interactive production build locally</h2><pre>npm ci
npm run build
npm run preview -- --port 4183 --strictPort</pre><p><a href="http://127.0.0.1:4183/portfolio/">Open local portfolio</a> · <a href="http://127.0.0.1:4183/portfolio/#/ride">Open separate bicycle trail</a></p><footer>Branch rebuild/engineering-world. ${tests.skipped} viewport-specific duplicate tests intentionally skipped. ${errors.length} browser page errors / failed HTTP responses. No push, main rewrite or production deployment. Screenshots use desktop Chrome and emulated phone viewports; physical devices and assistive technology remain separate external checks. Existing production: <a href="https://amrit-04.github.io/portfolio/">amrit-04.github.io/portfolio</a>.</footer></html>`,
);
console.log({
  tests,
  axeStates: quality.filter((x) => x.state).length,
  violations: violations.length,
  errors: errors.length,
  geometry,
});
if (tests.unexpected || violations.length || errors.length)
  throw Error("Review evidence contains failures.");
