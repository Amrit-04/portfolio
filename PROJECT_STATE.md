# Project state

Milestone: **reference-led art-direction correction implemented and locally verified; ready for visual review, not published**. The rejected workshop is no longer the portfolio route. User acceptance of visual fidelity is not assumed.

Branch: `rebuild/engineering-world` (historical name). Preserved `main` / `origin/main`: `953f58b501c449884ce142bb467a5da6f778a164`. Earlier implementation/evidence commits remain in history. This file accompanies a new correction commit; use `git rev-parse HEAD` or the handoff response for its final SHA.

## Current experience

The unchanged supplied Tiago clone was run locally and its source, measured geometry and interactions inspected. The portfolio follows its bracketed navigation, framed reel, character/prose biography, six uneven ink category boxes, overlapping print walls, nested detail layer, links/process illustration and long sign-off. Amritesh's truthful content and original artwork replace the creator's identity and work. OFL Amatic SC replaces the proprietary font; an original project slideshow replaces the creator video. Letterforms, artwork, wall density and notebook interiors visibly differ.

Seven source-supported notebooks and real demos remain. Research, CV/skills, honest homelab interests and experiments live in the reference-led walls. Canonical résumé/contact links, keyboard focus, browser history, phone gate/touch previews, internal wall pan and reduced motion are retained.

The separate `#/ride` game preserves the Planck bicycle: 19 bodies / 21 joints, wheel propulsion and braking, suspension, articulated rider, physical crash/ragdoll, checkpoints, 20 stars, nine sections and four real gaps. Its isolated collision/scenery editor supports erase, undo/redo, validated import/export and test rides without mutating the canonical trail.

## Final local verification — 2026-11-17

- Production build and strict TypeScript: pass. Lint: exit 0, **429 warnings / 0 errors** (415 vendor and 14 application locations); not warning-free.
- Unit/physics: **15 passed**. Deterministic full course: 3,094 steps / 25.775 simulated seconds / maximum airborne time 0.5833 seconds / no crash.
- E2E: **53 passed, 4 intentional viewport-specific skips, 0 failed, 0 flaky**. Real controls finish the full trail with 20/20 stars; impossible-gap and retry assertions verify physical falling and restoration.
- Loaded-state axe: **45 states / 0 violations**, no page/HTTP errors. Normal-motion visual audit: **57 captures**, no document overflow at 1440, 390 or 360 px. Small-phone résumé pointer hit-testing passes.
- Critical JS + CSS: **112,320 / 160,000 gzip bytes**. This is not total page transfer: the measured initial resource transfer was **736,947 bytes**, excluding HTML and including response overhead. Game and ONNX remain deferred; the WASM runtime is 14.85 MB raw on demand.
- Current archives opened: 24 matched reference/adaptation states, all 57 adaptation captures and 48 current notebook/demo/game/editor captures. Final 360 px captures show the résumé link and full homelab disclaimer unobstructed.
- Portable `REVIEW.html` browser verification: **129 images loaded, 25 galleries opened, 135 local links resolved, 0 page errors and 0 overflow** at desktop and phone sizes. Its two overview and eight side-by-side pair screenshots were opened. Raw result: `docs/review-verification.json`.
- Current Lighthouse attempt failed **NO_NAVSTART**; no current performance score is claimed. Old workshop scores are historical and not reused.

## Evidence and limits

Start with [REVIEW.html](REVIEW.html). Details: [visual findings](docs/VISUAL_REVIEW.md), [development report](docs/DEVELOPMENT_REPORT.md), [performance/accessibility](docs/PERFORMANCE_ACCESSIBILITY.md), [reference analysis](docs/REFERENCE_ANALYSIS.md) and [asset provenance](docs/ASSET_INVENTORY.md). Outer-box geometry agrees to rounding for the measured main sections; it is not a pixel-similarity or acceptance score.

Reference identity, client artwork, recordings and proprietary font are excluded from the build. Local reference screenshots are review evidence, not production assets. Original generated PNGs and production WebPs are preserved. Prototype screenshots and initial audit JSON remain local and untracked; the current review selects final evidence explicitly. No unrelated source files were removed.

Physical phones, Safari/Firefox, actual screen readers/voice control, 200% zoom, extended stress/battery and deployed network conditions remain unverified. Free Rider reference access returned HTTP 403. Publisher-independent author-list verification and a newly rendered résumé layout review remain unavailable. Native benchmarks are attributed to sources, not rerun. No-JS fallback provides identity/contact/GitHub/résumé, not the full interactive portfolio. Phone walls intentionally pan internally; notebooks use readable text rather than an image-only lightbox.

## Local use and publication boundary

```sh
npm ci
npm run build
npm run preview -- --port 4183 --strictPort
```

Then open `http://127.0.0.1:4183/portfolio/`. The portable review opens without a server. Reproduce its verification with `node scripts/verify-review.mjs`.

Remote state was fetched during final review; main and previous branches were preserved. No push, production deployment, history rewrite or remote branch deletion was performed. This correction is **not live** at https://amrit-04.github.io/portfolio/. Owned clone/preview processes were stopped; the build contains no QA harness. Publication requires separate explicit authorization followed by deployed-SHA and public-browser verification.
