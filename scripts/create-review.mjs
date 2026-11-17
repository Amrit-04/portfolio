import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const images = readdirSync('screenshots/final').filter(x => x.endsWith('.png')).sort();
const quality = JSON.parse(readFileSync('docs/browser-quality.json','utf8'));
const e2e = JSON.parse(readFileSync('docs/e2e-results.json','utf8'));
const stats = e2e.stats;
const violations = quality.flatMap(x => x.violations || []);
const errors = quality.flatMap(x => [...(x.errors || []), ...(x.bad || [])]);
const checks = quality.filter(x => x.state).length;
const title = name => name.replace(/\.png$/, '').replaceAll('-', ' ');
const gallery = (heading, list, open = false) => `<details ${open ? 'open' : ''}><summary>${heading} <small>${list.length} captures</small></summary><div class="gallery">${list.map(x => `<a class="shot" href="screenshots/final/${x}"><img loading="lazy" src="screenshots/final/${x}" alt="${escape(title(x))}"><span>${escape(title(x))}</span></a>`).join('')}</div></details>`;
const groups = [
  ['Portfolio — desktop', images.filter(x => x.startsWith('desktop-') && !/detail|demo|game|editor/.test(x)), true],
  ['Portfolio — phones', images.filter(x => /^(mobile|small)-/.test(x) && !/detail|demo|game|editor/.test(x))],
  ['Project notebooks and working experiments', images.filter(x => /detail|demo/.test(x))],
  ['Physical game and editor', images.filter(x => /game|editor/.test(x))],
];
writeFileSync('REVIEW.html', `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Engineering World — Local Review</title>
<style>
:root{color-scheme:light;font:16px/1.65 Arial,sans-serif;background:#f7f6f1;color:#2a2520}*{box-sizing:border-box}body{max-width:1220px;margin:auto;padding:36px 24px}h1{font-size:clamp(30px,5vw,58px);line-height:1.08;max-width:800px;letter-spacing:-1.5px}h2{font-size:24px;margin-top:42px}.eyebrow{font:12px monospace;letter-spacing:2px;color:#a83d29}a{color:#245b93;text-underline-offset:4px}a:focus-visible,summary:focus-visible{outline:3px solid #3a6ea5;outline-offset:5px}.intro{max-width:800px}.facts{display:flex;gap:28px;flex-wrap:wrap;border-block:1px solid #bcb6aa;padding:22px 0;margin:28px 0}.facts strong{display:block;font-size:30px}.facts span{font-size:13px}.note{padding:16px 20px;background:#f0ece3;border-left:3px solid #a83d29}code,pre{font:13px/1.6 monospace}pre{padding:20px;background:#f0ece3;overflow:auto}nav{display:flex;gap:22px;flex-wrap:wrap;margin:26px 0}summary{font-size:19px;cursor:pointer;padding:22px 0;border-top:1px solid #bcb6aa}summary small{font-size:12px;color:#6c665c;margin-left:15px}.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin-bottom:28px}.shot{display:block;color:inherit;text-decoration:none}.shot img{display:block;width:100%;height:235px;object-fit:contain;object-position:top;background:#e8e2d6;border:1px solid #bcb6aa}.shot span{display:block;margin-top:8px;font:12px/1.5 monospace}footer{margin:45px 0 0;padding-top:20px;border-top:1px solid #bcb6aa;color:#6c665c;font-size:13px}
</style>
<header><p class="eyebrow">LOCAL REVIEW / REBUILD.ENGINEERING-WORLD</p><h1>Amritesh’s Engineering World.</h1><p class="intro">An original illustrated portfolio, seven technical notebooks with working experiments, and a nine-section bicycle trail powered by an articulated physical rider. This file is an offline review index, not a deployment.</p></header>
<div class="facts"><div><strong>${stats.expected}</strong><span>browser tests passed</span></div><div><strong>${stats.unexpected}</strong><span>browser tests failed</span></div><div><strong>${checks}</strong><span>rendered accessibility states</span></div><div><strong>${violations.length}</strong><span>axe violations</span></div><div><strong>${images.length}</strong><span>archived screenshots</span></div></div>
<p class="note">Branch: <code>rebuild/engineering-world</code>. No push or production publication. ${stats.skipped} duplicate long-course cases are intentionally skipped; full traversal runs on desktop. Browser audit recorded ${errors.length} page errors / failed HTTP responses combined. These local checks do not replace physical-device or screen-reader testing. The audit report also records seven Lighthouse artwork-label warnings, a failed mobile Lighthouse trace, and retained lint warnings.</p>
<nav aria-label="Review resources"><a href="docs/DEVELOPMENT_REPORT.md">Development report</a><a href="docs/PERFORMANCE_ACCESSIBILITY.md">Performance & accessibility</a><a href="docs/ARCHITECTURE.md">Architecture</a><a href="docs/CONTENT_SOURCE_OF_TRUTH.md">Content sources</a><a href="docs/e2e-results.json">Raw E2E results</a><a href="docs/browser-quality.json">Raw browser audit</a></nav>
<h2>Run the production build locally</h2><p>From this repository, use Node 24 and npm. Install Chrome for Playwright if needed. The preview URL works only while the local server is running.</p><pre>npm ci
npm run build
npm run preview -- --port 4183 --strictPort</pre><p><a href="http://127.0.0.1:4183/portfolio/">Open local portfolio</a> · <a href="http://127.0.0.1:4183/portfolio/#/ride">Open local Engineering Trail</a></p>
<h2>Review the captures</h2><p>Open a capture to view it at its original resolution. Section images are viewport captures, not claims that a tall section fits into one screen. Notebook introductions and loaded experiments are separate views. Phone screenshots use emulated Chrome viewports.</p>
${groups.map(g => gallery(...g)).join('\n')}
<footer>Prepared from the local production build. Existing live site: <a href="https://amrit-04.github.io/portfolio/">amrit-04.github.io/portfolio</a> — unchanged by this work. All metrics are local observations or explicitly attributed project benchmarks; no simulated demo is represented as a production service.</footer></html>`);
console.log(`Created REVIEW.html with ${images.length} images, ${stats.expected} passing tests, ${checks} accessibility states.`);
if (stats.unexpected || violations.length || errors.length) throw new Error('Review evidence contains failures; do not describe this as a passing handoff.');
