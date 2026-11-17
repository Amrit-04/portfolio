# Performance and accessibility verification

Date: 2026-11-17. Scope: the production build served locally at `/portfolio/`, not the unchanged public deployment. Chrome 157 on Windows; Lighthouse 12.8.2. Phone dimensions are emulated on the same computer, not measurements of physical phones.

## Results and evidence

| Check | Earlier observation | Final observation |
| --- | --- | --- |
| Critical JS + CSS, gzip | 113,514 bytes before final CSS correction | **113,449 / 160,000 bytes**, gate passes |
| Neural demo JS, raw | approximately 419 KB with general ONNX import | **63,567 bytes**; gzip 20,337 bytes |
| ONNX runtime WASM, raw | 29,520,971-byte JSEP runtime and redundant emitted assets | **14,848,852-byte** WASM-only runtime, loaded on demand; redundant runtime excluded |
| Game chunk | Deferred from first screen | 239,934 bytes raw / 56,678 bytes gzip |
| Portfolio initial resource transfers | No comparable baseline retained | **217,702 bytes**, excluding the HTML document; includes resource response overhead |
| Loaded-state axe audit | Contrast, unlabeled slider and inaccessible scroll region found | **27 states; 0 violations**, 0 page errors, 0 HTTP failures |
| Horizontal document overflow | Mobile title/canvas defects corrected during implementation | **0 px** at 1440, 390 and 360 CSS pixels |
| Lighthouse desktop-form-factor | First trace failed `NO_NAVSTART`; partial accessibility 96 / SEO 100 | Completed diagnostic run: performance **100**, accessibility **100**, best practices **100**, SEO **100**, with warnings below |
| Lighthouse mobile | No valid performance baseline | `NO_NAVSTART`: performance/best-practices unavailable; partial accessibility 100 / SEO 100 |

Raw evidence: [browser-quality.json](browser-quality.json), [e2e-results.json](e2e-results.json), [unit-results.json](unit-results.json), [lighthouse-desktop-final.json](lighthouse-desktop-final.json), [lighthouse-mobile-final.json](lighthouse-mobile-final.json). The earlier failed Lighthouse report is retained as [lighthouse-desktop.json](lighthouse-desktop.json).

**Lighthouse qualification:** the completed run used `--form-factor=desktop --screenEmulation.disabled --throttling-method=provided`. It used local unthrottled networking/CPU and retained Lighthouse's default mobile user-agent. It is a useful local diagnostic, not a standard throttled desktop benchmark or a claim of production performance. Category scores do not mean every informational or experimental audit passed. In particular, seven label warnings remain (see below). The mobile report is partial because trace collection failed; no mobile performance score is claimed.

## Measured timings

Independent PerformanceObserver measurements from the production browser audit:

| Viewport | FCP / LCP | CLS | 120 game RAF intervals: median / p95 / max |
| --- | --- | --- | --- |
| 1440 × 1000 | 351.06 / 351.06 ms | 0.001301 | 6.945 / 7.285 / 7.600 ms |
| 390 × 844 | 344.39 / 344.39 ms | 0 | 6.955 / 7.190 / 13.790 ms |
| 360 × 640 | 379.22 / 379.22 ms | 0 | 6.940 / 7.385 / 9.845 ms |

These are single local observations. RAF interval samples describe presentation cadence on this host, not CPU execution time, a sustained stress test, or mobile-device FPS. The physical simulation remains fixed at 120 Hz independent of rendering cadence.

Completed Lighthouse diagnostic: FCP/LCP 549.475 ms, TBT 0 ms, CLS 0.002885, Speed Index 360 ms. LCP was `section#top > div.hero-masthead > div > h1` (the Engineering World heading). Its breakdown was 19.409 ms TTFB and 530.066 ms render delay; no LCP image fetch. These measurements are distinct from the independent browser audit above.

## Critical path and payload

The observed path is HTML → entry JS, JSX runtime and stylesheet in parallel → locally hosted fonts → heading text. There is no boot animation, authentication gate or full-screen entrance opacity blocking the first useful screen.

| Resource | Transfer bytes in browser audit | Start / duration (ms) |
| --- | --- | --- |
| Entry JS | 95,922 | 16.335 / 24.880 |
| JSX runtime | 3,810 | 16.575 / 11.435 |
| Stylesheet | 14,617 | 16.640 / 12.445 |
| Favicon | 981 | 79.150 / 4.420 |
| Special Elite | 53,596 | 89.465 / 196.190 |
| Permanent Marker | 29,864 | 89.575 / 196.510 |
| Anton | 18,912 | 89.625 / 196.710 |

The game, seven experiments, ONNX model and 14.85 MB inference runtime are absent from initial resource requests. ONNX is still a substantial on-demand download; no attempt is made to pass it off as a small initial asset. Real model inference and fixture parity were re-tested after switching to the observed WASM-only package export. No server/backend calls or live homelab services are invented. A separate Pages-like header check removed COOP/COEP from the document; with `crossOriginIsolated: false`, real model inference and parity below 1e-4 passed for two changing fixtures, with no page errors ([raw result](pages-compatibility.json)).

## Findings resolved and verified

| Severity / owner | Finding and correction | Post-fix evidence |
| --- | --- | --- |
| major / fix-now | Tab could escape the native project dialog at the boundary; explicit forward/backward cycling added | E2E asserts 12 Tabs, Shift+Tab, Escape and focus return at all three test viewports |
| major / fix-now | Camera/bicycle SVG centres were hollow hit targets; transparent interactive rectangles added | Trusted Playwright clicks open the intended notebook/route, including back/forward history |
| major / fix-now | Crash retry re-entered the crashed guard recursively; replacement body now enters ready before play | Unit regression and physical-gap R-retry test pass with intact 21 joints |
| major / fix-now | A global `color: inherit` rule overrode dark-button label colours | Final desktop/phone demo PNGs opened; Evaluate risk, replay speed and Solve route labels readable |
| major / fix-now | Replay slider had no accessible name; query-tree scroll region had no keyboard focus | Label and focusable named region added; loaded-demo axe audit passes |
| minor / fix-now | Small red/formula annotations had inadequate contrast | Existing darker red reused; final loaded-state audit passes |
| minor / fix-now | Canvas resize left a stale buffer/ghosted scene | ResizeObserver synchronizes buffer and CSS dimensions; final ready/riding/pause/finish PNGs opened |
| minor / fix-now | Re-entered game sound label disagreed with retained sound setting | State initializes from the shared setting; real WebAudio context/oscillator assertions pass |
| minor / fix-now | Mobile notebook text joined words when decorative breaks were hidden | Final 390/360 notebook PNGs show normal word spacing |

## Deferred findings and qualifications

| Severity / owner | Evidence | Next step / decision |
| --- | --- | --- |
| major / unverifiable | Lighthouse reports 7 `label-content-name-mismatch` findings on exhibition artwork buttons. It treats visible internal SVG diagram text as a button label, while each button has `Explore <project title>` and the illustration subtree is aria-hidden. The separate 27-state axe run reports no violations. | Do not call this a clean WCAG certification. A voice-control/screen-reader review should decide whether to restructure diagram/caption semantics. Explicitly visible Open notebook controls provide an alternate path. No rule was disabled to hide the discrepancy. |
| minor / needs-product-decision | Lighthouse estimates 80 ms render-blocking CSS savings and 40 KiB unused entry JS; DOM is 1,109 elements | Initial byte budget is met. Keep the illustrated, readable first screen rather than adding a stylesheet-swap race or another redesign without a measured need. |
| minor / needs-product-decision | ONNX runtime remains 14.85 MB on demand | Real offline model execution is an intentional feature. Consider a clearly opt-in download screen only if field measurements justify it. |
| minor / unverifiable | Mobile Lighthouse 12.8.2 / Chrome 157 trace lacks navigation start | Repeat on a supported Chrome/Lighthouse pairing or CI; no simulated score substituted. |
| minor / needs-backend-change | Only local preview compression/timing was measured | After separately authorized deployment, inspect Pages caching/compression/security headers and rerun live measurements. |
| minor / needs-product-decision | With JavaScript disabled only useful identity/contact/GitHub/résumé fallback remains; full exhibition is client-rendered | Consider prerendering if complete no-JS browsing becomes a requirement. |
| minor / unverifiable | Lint: 426 warnings, 0 errors. 415 warning locations are copied ONNX runtime modules; 11 are retained portfolio/demo code. | Vendor files were not modified or ignored merely to lower the count. Review remaining hook/dependency warnings separately; this is not a warning-free claim. |

## Accessibility checklist

### Screen reader and keyboard

Semantic navigation, skip link, headings, labelled controls, dialog close/Escape/focus restoration, roving skill tabs and keyboard ride controls are exercised. Actual focus is asserted rather than inferred from keypress success. The query plan region is focusable and the replay slider named. Canvas game telemetry/control labels do not make a visual physics game fully nonvisual; all project content is independently available through portfolio notebooks. No physical screen-reader or voice-control session was available.

### Visual and media

74 final PNGs were opened, covering all desktop sections, seven desktop and phone notebook introductions and loaded experiments, small-phone representative notebook/demo, and game/editor states. Font hierarchy and paper/ink treatment remain coherent. Tall sections and notebooks intentionally scroll; the viewport captures do not claim all content fits in one screen. No document horizontal overflow was measured at 360, 390 or 1440 px. Contrast fixes were measured by axe; the old Lighthouse SVG-label discrepancy is not hidden by its 100 category score.

### Motion and readability

Reduced-motion mode is tested. No boot delay, automatic ambient audio, custom cursor or mandatory scrolling animation. Sound stays off until an explicit click; actual context/oscillator creation is observed using CDP. While muted, collecting a star creates no new audio node. Audio nodes are not proof of listening quality, and no listening-quality claim is made.

### Needs design input

Resolve the diagram-text versus button-name discrepancy with assistive-technology feedback, rather than stuffing all diagram prose into an oversized accessible name. Small SVG diagram labels are illustrative; full explanations and sourced metrics remain available as normal notebook text.

### Needs product decision

Full no-JS prerendering, an explicit large-model download gate, and a nonvisual alternative to gameplay are possible later extensions, not completed features.

### Unverifiable here

Physical iOS/Android interaction, Safari/Firefox compatibility, real screen reader/voice control, 200% browser zoom, comprehensive target-size audit, extended gameplay stress/battery behaviour, deployed network conditions and post-publication functionality. Chrome viewport emulation is not a substitute for these checks.

## Reproduction

```sh
npm ci
npm run typecheck
npm run lint
npx vitest run tests --reporter=default --reporter=json --outputFile=docs/unit-results.json
npm run build
npm run size
npx playwright install --with-deps chrome
npm run test:e2e
```

Observed final output: 15 unit/physics tests pass; typecheck exits 0; lint exits 0 with 426 warnings / 0 errors; size 113,449 / 160,000 gzip bytes; E2E **49 passed, 2 skipped, 0 failed, 0 flaky**, 163.045 seconds. The skips are duplicate laptop/mobile full-course traversals; all other tests run at all three E2E viewports.

For production screenshots and audit, start `npm run preview -- --port 4183 --strictPort` in a separate terminal, then:

```sh
node scripts/quality-audit.mjs
node scripts/visual-audit.mjs
```

Final combined command `npm run build && node scripts/quality-audit.mjs && npm run test:e2e && node scripts/visual-audit.mjs` exited 0. The audit waits for actual loaded experiment controls, including model inference, before capturing or scanning.

Lighthouse diagnostic command (Git Bash on this host):

```sh
CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" npx --yes lighthouse@12 http://127.0.0.1:4183/portfolio/ --only-categories=performance,accessibility,best-practices,seo --form-factor=desktop --screenEmulation.disabled --throttling-method=provided --disable-full-page-screenshot --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" --output=json --output-path=docs/lighthouse-desktop-final.json --quiet
```

Mobile used `--form-factor=mobile`, omitted `--screenEmulation.disabled`, and wrote `docs/lighthouse-mobile-final.json`; it exited 1 with the documented `NO_NAVSTART` failure. The owned preview is stopped at handoff. No test harness or mutated QA route is shipped.
