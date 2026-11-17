# Performance and accessibility — corrected composition

Date: 2026-11-17. Scope: the production bundle served locally at `/portfolio/`, Chrome 157 on Windows. These are not measurements of the unchanged public deployment or physical phones. This report supersedes the workshop's earlier 27-state/49-test/four-100-score report.

## Results

| Check | Historical workshop / earlier correction | Current correction |
| --- | --- | --- |
| Critical JS + CSS, gzip | 113,449 bytes in rejected workshop | **112,320 / 160,000 bytes**, budget passes |
| Initial resource transfer, excluding HTML | 217,702 bytes in workshop | **736,947 bytes**, including new illustration/font responses and overhead |
| Loaded-state axe | 27 states in workshop | **45 states, zero violations** |
| Browser page errors / HTTP failures | No comparable correction baseline | **0 / 0** in quality and visual audits |
| Horizontal document overflow | Lower paper occlusion found despite no document overflow | **0 px** at 1440, 390 and 360 px; small-paper occlusion separately fixed and screenshot-checked |
| Unit / physics | 15 tests | **15 pass** |
| E2E | 49 pass / 2 duplicate skips in workshop | **53 pass / 4 intentional skips / 0 failed / 0 flaky** |
| Strict types / build | Previously passed | Both pass on corrected source |
| Lint | 426 warnings / 0 errors | **429 warnings / 0 errors**, exit 0; not warning-free |
| Lighthouse desktop diagnostic | Historical workshop scores must not be reused | **Trace failed NO_NAVSTART**; performance/best-practices unavailable; partial accessibility 100 / SEO 100 |
| Lighthouse mobile | Historical trace failed | Not rerun for correction; no current mobile score |

Evidence: [browser-quality.json](browser-quality.json), [adaptation-visual.json](adaptation-visual.json), [e2e-results.json](e2e-results.json), [unit-results.json](unit-results.json), [adaptation-lint.txt](adaptation-lint.txt), [lighthouse-adaptation-desktop.json](lighthouse-adaptation-desktop.json).

The increase in total initial transfer is real: two original WebP illustrations and two complete local Amatic TTF files now load. The JS/CSS budget excludes those assets, so its passing result must not be described as a 112 KB total page. Game, demo, model and inference runtime remain absent from initial requests.

## Current local timings

The quality audit uses reduced motion. It therefore bypasses the normal 850 ms splash and phone recommendation gate and initializes the reel paused. These FCP/LCP values **do not measure the normal-motion time to useful interaction**. Normal-motion gate/reel/navigation behaviour is separately exercised by the visual audit and E2E.

| Emulated viewport | FCP / LCP (ms) | CLS | 120 RAF intervals: median / p95 / max (ms) |
| --- | --- | --- | --- |
| 1440×1000 | 466.805 / 466.805 | 0.005522 | 6.940 / 8.180 / 29.145 |
| 390×844 | 254.175 / 254.175 | 0 | 6.950 / 7.425 / 8.825 |
| 360×640 | 215.555 / 215.555 | 0 | 6.955 / 7.265 / 7.975 |

Single local, unthrottled host observations, not field performance, mobile-device FPS or a sustained stress test. RAF intervals are presentation cadence, not physics CPU execution time. Simulation stays fixed at 120 Hz independently.

The independent observer records LCP timing, not its element or subpart breakdown. Lighthouse trace failure means the current LCP element/subparts were not verified; the old workshop heading is not a valid substitute.

## Observed loading path and requests

HTML discovers entry JS, JSX runtime and CSS in parallel. The React page requests original illustrations and the local Amatic faces; game/experiments load only when entered. Normal motion then includes the intended reference-style entrance/gate, rather than an undocumented zero-delay claim.

Desktop request observations:

| Resource | Transfer bytes | Start / duration (ms) |
| --- | --- | --- |
| Entry JS | 89,061 | 17.900 / 30.880 |
| JSX runtime | 3,810 | 18.145 / 14.035 |
| Stylesheet | 20,349 | 18.230 / 23.330 |
| Character WebP | 196,666 | 82.775 / 5.045 |
| Process WebP | 117,676 | 82.865 / 4.630 |
| Amatic bold TTF | 156,480 | 89.630 / 82.230 |
| Amatic regular TTF | 151,924 | 89.750 / 84.940 |
| Favicon | 981 | 171.270 / 4.240 |

The ONNX SIMD runtime remains **14,848,852 raw bytes**, an on-demand cost, not a tiny asset. The neural demo JS is about 63.6 KB raw and the separate game about 239 KB raw. Browser fixture parity and actual inference are tested; other experiments accurately identify recorded/synthetic data. No backend or live homelab service is fabricated. The earlier Pages-like non-isolated inference probe is retained in [pages-compatibility.json](pages-compatibility.json); it is historical compatibility evidence, not a newly deployed check.

## Findings: severity, owner and outcome

| Severity / owner | Finding | Evidence / action |
| --- | --- | --- |
| major / fix-now | Nested wall/notebook focus, Escape and body-scroll state needed independent boundaries | Tests assert 12 Tabs, Shift+Tab, one-layer Escape, restored focus and retained wall/body lock |
| major / fix-now | Desktop homelab paper covered bicycle introduction | Narrowed into right column; final introduction, button and disclaimer opened and readable |
| major / fix-now | 360 px lower sheets covered résumé/disclaimer | Small-only offsets increased; final PNGs opened, résumé trial pointer click passes |
| minor / fix-now | Phone preview could reopen after outside interaction | E2E asserts cancel, delayed opening, gate persistence and separate touch lifecycle |
| minor / fix-now | Early capture readiness could show a grid rather than reference wall | Fresh navigation and opacity/media readiness; all six final reference walls visibly loaded |
| minor / needs-product-decision | New illustrations/complete TTFs increase initial transfer to 736,947 bytes | Honest total reported; optional licensed WOFF2/subsetting and below-fold lazy images could reduce it, but are not claimed implemented |
| minor / needs-product-decision | Real neural inference downloads a 14.85 MB runtime | Keep explicit model/demo context; consider a separate download confirmation if field data warrants it |
| minor / unverifiable | Lighthouse 12.8.2 trace collection failed NO_NAVSTART on Chrome 157 | Rerun on a compatible browser/toolchain or CI; no guessed performance score |
| minor / needs-backend-change | Local response sizes/timings do not establish Pages caching/compression/security headers | Inspect only after separately authorized publication |
| minor / unverifiable | 429 lint warnings remain | 415 vendor-runtime warning locations and 14 application locations; no rule disabled/vendor edits to reduce the count |
| minor / needs-product-decision | No-JS fallback is useful but not a complete portfolio | Identity, contact, GitHub and résumé work; full prerendering is not implemented |

## Accessibility checklist

### Keyboard and semantics

Semantic navigation and skip link; labelled category/reel/close controls; native nested dialogs with asserted focus cycling/restoration; back/forward history; named keyboard-pannable walls; actual experiment state changes; replay slider label and query-tree focus region; keyboard bicycle controls. Small-phone résumé pointer hit-testing is verified without following its external document link.

### Visual/media

The 57-state normal-motion archive and 48 current notebook/demo/game/editor captures were opened. Lower-sheet occlusion was repaired separately from overflow testing. The 45-state axe run covers loaded content, not only a hidden/splash page. Phone walls deliberately require internal pan; full technical explanations are available as notebook text. Automated results do not certify WCAG compliance or voice-control usability.

### Motion and input

Reduced motion skips the splash/recommendation, pauses the reel and disables decorative animation. Normal motion includes the brief splash, first-phone recommendation, stepped line jitter and controlled reel; play/pause/next controls are tested. Audio defaults muted and requires opt-in. Game input owners are independent; blur/pause/cancel/exit clear them. WebAudio node assertions prove creation/muting, not listening quality.

### Unverified external checks

Physical iOS/Android, Safari/Firefox, real screen readers and voice control, 200% browser zoom, exhaustive target-size review, sustained gameplay/battery behaviour and published network conditions. The game is not claimed to be fully playable nonvisually; all portfolio content is accessible without completing it. The old workshop's seven Lighthouse artwork-label warnings are historical, not presented as measured defects of the new composition.

## Reproduction

```sh
npm run build
npm run typecheck
npm run lint
npx vitest run tests --reporter=default --reporter=json --outputFile=docs/unit-results.json
npm run size
npm run test:e2e
```

With production preview on port 4183:

```sh
node scripts/visual-audit.mjs
node scripts/quality-audit.mjs
node scripts/create-review.mjs
```

Lighthouse diagnostic attempted after the prior complete regression had exited (not concurrently with it):

```sh
CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npx --yes lighthouse@12 http://127.0.0.1:4183/portfolio/ --only-categories=performance,accessibility,best-practices,seo --form-factor=desktop --screenEmulation.disabled --throttling-method=provided --disable-full-page-screenshot --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" --output=json --output-path=docs/lighthouse-adaptation-desktop.json --quiet
```

Exit 1: `NO_NAVSTART`. The diagnostic was local/unthrottled with screen emulation disabled; even a completed score would not have been a production benchmark. The subsequent CSS-only ≤380 px clearance fix does not change that desktop surface. Owned preview/audit processes are stopped at handoff; no QA route or injected harness is in dist.
