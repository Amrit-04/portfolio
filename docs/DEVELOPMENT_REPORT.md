# Amritesh's Engineering World — development report

Prepared 2026-11-17. **Local rebuild delivered for review; not published.** The application, tests and production artifact are complete within the local verification scope below. External/reference, assistive-technology and mobile Lighthouse limitations are explicitly retained; production acceptance remains gated on separate deployment authorization.

## 1. What was built

A complete two-mode portfolio: an original illustrated engineering workshop and seven-project exhibition, plus a nine-section physical bicycle trail. Visitors can browse technical notebooks and run real interactive experiments without playing the game. The game offers a separate route through the same work, checkpoints, stars, crashes, retry and a two-layer track editor.

Open [the portable review index](../REVIEW.html) for screenshots, evidence and local build instructions. The build output is `dist/` (generated, Git-ignored); the review index and its relative screenshot/document links work without an application server. The interactive application requires a server.

## 2. Final visual decisions

Warm paper, dark ink, red handwritten annotations and restrained blue/green/gold accents. Locally hosted Anton headings, Permanent Marker annotations and Special Elite technical labels complement readable body text. Original workshop objects invite exploration rather than decorating a generic dashboard. Seven differentiated installations introduce the projects; a native paper folio contains deeper technical detail. The same line work, paper and annotation language continues into the game and editor.

Tiago Fragoso informed illustrated storytelling, tactile borders and spatial discovery, not copied identity or art. No unlicensed TF Nib font, copied personal illustrations, unmute recordings, forced boot sequence or cursor gimmick ships. Reference research and prototype screenshots preceded the final implementation. The final phase repaired specific defects rather than redesigning accepted sections.

## 3. Architecture

React 19 + strict TypeScript + Vite, with Tailwind-compatible demo styling. `src/data/projects.ts` remains the canonical seven-project data source. `PortfolioMode` composes the illustrated sections; `ProjectDetail` is a native modal with explicit keyboard boundaries and restored focus. Seven demo components and `RideMode` are lazy-loaded, using stable module-scope component references.

The ride implementation is divided into `physics.ts`, `track.ts`, `editor.ts`, `engine.ts` and `render.ts`. React handles menus/HUD; the engine owns simulation, camera, input and canvas drawing. HUD updates are capped at 10 Hz, not driven every physics frame. A read-only canvas telemetry attribute supports behavioural assertions; there is no mutable test hook, teleport command or shipped harness.

See [ARCHITECTURE.md](ARCHITECTURE.md) for lifecycle, input ownership, rendering, model loading and output policy.

## 4. Assets reused and created

The existing project-specific SVG installation artwork, canonical project fixtures, ONNX model and résumé were retained. The workshop, orbital curiosity illustration, trail scenery, bicycle/rider rendering and original synthesized sound are new work. Three local font licence files were added. The supplied reference folder was recursively inventoried (312 files); five unmute-frame scripts contained PNGs, not audio.

Historical repository reference media/audio are preserved in source/history but excluded from generated production output using an explicit allowlist. The build also excludes unused font variants and duplicated ONNX runtimes. No user-created reference files were deleted. See [ASSET_INVENTORY.md](ASSET_INVENTORY.md) and [REFERENCE_ANALYSIS.md](REFERENCE_ANALYSIS.md).

## 5. Portfolio features and content accuracy

The hero's bookshelf, laptop, notebook, camera, server and bicycle have meaningful destinations. About, skill drawers with keyboard tabs, IEEE research, an honest self-hosting interests map, engineering learning notes, social links, canonical email and résumé are implemented. Browser history and route re-entry remain usable.

Each project notebook contains the problem, contribution, source-linked measurements, flow, decisions/trade-offs, limitations and an interactive experiment:

| Project | Browser behaviour verified | Honesty boundary |
| --- | --- | --- |
| Neural Database Query Optimizer | Real ONNX WASM inference, different fixtures, parity below 1e-4 | Native CPU measurements are separate from browser timing; fallback is labelled |
| LLM Reliability Control Plane | Trace waterfall, filtering and re-selection | Replay/explanation, not a hosted live ingestion service; informal source measurements labelled |
| Fault-Tolerant ML Telemetry | Sample playback, replay time, all 27 tuning configurations and chaos view | Recorded samples, not a live Kafka/Postgres deployment |
| Tradeflow | Risk checks, order-state transitions, partial/full fills and accounting | Browser state-machine demonstration, not a live exchange |
| Moneyball | Merton compound-Poisson simulation and changing risk output | Simulation/offline research, not trading advice or a live GPU endpoint |
| Warehouse Routing | Obstacle-aware A* and open-path Held–Karp route solve/reset | Browser JavaScript demonstration, not a claimed native C++ benchmark |
| Workplace Safety | Synthetic actors, geofence/foot-point probing, logs and pause | Algorithm demonstration, not live camera/model inference |

Workplace Safety uses SimpleTracker/centroid tracking, not ByteTrack. Research title and publication were corroborated from repository material; publisher-independent author-list verification remains a limitation. The C++ physics project is described as C++20/CMake foundations with orbital/Vulkan/CUDA ambitions, not a completed engine. Unverified assistant claims were omitted. Homelab entries are interests, not fabricated current service status or private endpoints. Source map: [CONTENT_SOURCE_OF_TRUTH.md](CONTENT_SOURCE_OF_TRUTH.md).

## 6. Bicycle physics

Planck rigid-body simulation with gravity, independent wheel suspension joints, chassis, crank and articulated torso/head/limbs. The intact default world has 19 bodies (including terrain) and 21 joints. Rear-wheel motor torque produces propulsion through contact; braking acts on wheel joints. Lean and airborne torque control affect the physical body, not a forward-position animation.

A fixed 1/120-second step, bounded real-time accumulator, transform interpolation and smoothed camera separate simulation from display refresh. Collision contacts/falls trigger crashes outside the locked physics step. Five attachment joints are released for a physical ragdoll; retry rebuilds an intact rider at the checkpoint. Default reset creates a fresh track and clears progress. The simulation continues for crash motion while paused/notebook states freeze gameplay.

Keyboard and multi-pointer inputs have independent ownership. W/Up pedals, S/Down brakes, A/Left leans back, D/Right leans forward, R restarts at the flag, Backspace restarts the trail, Space pauses, Escape exits. Blur, pointer cancellation/lost capture, pause, modal and exit clear input; simultaneous touch holds do not cancel each other.

## 7. Track and editor

Nine authored sections run from the workshop through seven project landscapes to the final ridge. Four real gaps occur at x=80–83, 112–115, 188–191 and 249–253 metres. Rendered terrain and collision polylines share the same disconnected definition. There is no invisible bridge across a jump. Twenty stars use physical proximity; notebook checkpoints pause the ride and the finish requires reaching x=286.

The independent editor supports collision/scenery layers, erase, undo/redo/clear, pan/zoom, JSON import/export and isolated test riding. Import and drawn geometry validate finite coordinates, ±2,000 m bounds, segment lengths and layer limits. Exports use actual browser downloads; imports use the native file picker. Edits, failed imports and test rides do not mutate the canonical trail.

## 8. Functional test results

Final production command:

```sh
npm run build && node scripts/quality-audit.mjs && npm run test:e2e && node scripts/visual-audit.mjs
```

Exit 0. The final matrix recorded **49 passed, 2 skipped, 0 failed, 0 flaky** in 163.045 seconds. The two intentional skips are laptop/mobile duplicates of the long full-trail test; all other cases run at desktop 1440×900, laptop 1366×768 and mobile 390×844. Reports are in [e2e-results.json](e2e-results.json) and [unit-results.json](unit-results.json).

Typecheck passes. Lint exits 0 with **426 warnings, 0 errors** (415 warning locations in copied ONNX runtime files; 11 in retained portfolio/demo code). No rules were disabled and no vendor code was edited to manufacture a warning-free result. **15 unit/physics tests** pass across two files. Production build and the 160,000-byte critical gzip budget pass.

Actual assertions include model inference/parity; all seven demo effects; modal focus/Escape; trusted SVG hotspots/history; source/contact/résumé base paths; no-JS fallback; physical wheel displacement/braking; pause/reset/re-entry; real WebAudio opt-in and muted star behaviour; multi-touch cancellation; real editor file round-trips; actual gap crash and restored 21-joint rider; complete trail, all nine sections, checkpoint-paused notebook and finish.

The deterministic physics course completed in 3,094 steps (25.775 simulated seconds), reached x=286.026 and recorded 0.5833 seconds maximum airborne time without crashing. The final browser finish capture shows **20/20 stars and 0 crashes**. Input control, not state mutation or teleportation, produced traversal. A separate impossible-gap fixture verifies real falling/crash/retry.

Earlier failures were not concealed: modal focus escape, hollow SVG hit targets and recursive crash retry were genuine defects and repaired. A subsequent sound test timeout was an incorrect exact label (`Start riding` versus `Start riding →`); the selector was corrected without removing audio assertions. Loaded visual inspection found the dark-button colour override missed by axe, which was removed and the complete suite rerun.

## 9. Responsive and visual validation

**74 final PNGs were opened and inspected.** The archive includes every desktop section, all seven desktop/phone notebook introductions and loaded demos, 360-pixel representative notebook/demo, ready/riding/paused/editor at three sizes, desktop/laptop/phone crashes, checkpoint, actual airborne gap and finish. A full desktop capture documents the page's overall hierarchy. [VISUAL_REVIEW.md](VISUAL_REVIEW.md) records the inspection scope and observations.

No document horizontal overflow was measured at 1440×1000, 390×844 or 360×640. Final desktop/phone controls are readable; phone folios intentionally scroll, preserve title/source/metric hierarchy and leave close controls available. The game canvas buffer matches its CSS size, and four touch controls plus restart actions remain visible. These are Chrome-emulated sizes, not hardware device testing.

## 10. Performance and accessibility

Critical JS + CSS: **113,449 gzip bytes / 160,000 budget**. Game and experiments are deferred; the neural demo JS shrank from approximately 419 KB to 63,567 bytes by using the observed WASM-only ONNX export. The runtime is still a substantial 14.85 MB on-demand download, not an initial-page asset.

The production browser audit scanned **27 loaded states with 0 axe violations**, 0 page errors and 0 failed HTTP responses. Local LCP was 351 ms desktop, 344 ms phone and 379 ms small-phone; local CLS was 0.001301/0/0. These are single unthrottled host observations.

A desktop-form-factor Lighthouse diagnostic completed with four 100 category scores, but was local/unthrottled, screen emulation disabled and inherited a mobile user-agent. It also reports seven SVG diagram-label mismatches despite the category score; these remain disclosed, not claimed fixed. Mobile Lighthouse failed trace collection with `NO_NAVSTART`; no mobile performance score is claimed. [PERFORMANCE_ACCESSIBILITY.md](PERFORMANCE_ACCESSIBILITY.md) contains raw numbers, findings, severity/owner, commands and unverified checks.

## 11. Known limitations

- Free Rider HD returned HTTP 403; its live reference gameplay could not be inspected. The delivered bicycle behaviour is validated independently, not claimed to be a measured reproduction of that game's tuning.
- Seven Lighthouse artwork-label warnings disagree with the separate loaded-state axe result. Voice-control/screen-reader review is still needed; a 100 score is not WCAG certification.
- No physical phone, Safari/Firefox, real screen reader, 200% browser zoom, extended battery/stress test or production network verification. Mobile Lighthouse trace metrics are unavailable.
- The résumé was text-checked with pypdf; a dedicated PDF image renderer was unavailable. The local served PDF response and resume links are verified, but its page layout was not newly certified.
- Homelab service state and unfinished research ambitions remain explicitly unconfirmed. Native project benchmarks are attributed source claims, not rerun by this portfolio rebuild.
- No-JS visitors receive useful identity/contact/GitHub/résumé fallback rather than the complete interactive exhibition. The editor saves through explicit export/import, not a cloud account.
- The public site has not been replaced. Live acceptance checks must follow separately authorized deployment.

## 12. Build and review instructions

Use Node 24 and npm from the repository root:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run size
npx playwright install --with-deps chrome
npm run test:e2e
npm run preview -- --port 4183 --strictPort
```

While that preview is running:

```sh
node scripts/quality-audit.mjs
node scripts/visual-audit.mjs
node scripts/create-review.mjs
```

The preview is the real production output, not Vite development mode. Preserve `/portfolio/` in the URL. Generated `404.html` supports the Pages fallback. ONNX model/runtime, fonts/licences, resume, fixture data and allowed assets are present; historical reference media/audio are excluded. No temporary QA harness is shipped. An additional browser check removed the local cross-origin-isolation headers from the document: `crossOriginIsolated` was false, real ONNX inference still ran, both fixture predictions changed (-0.0207 → -0.0188), and parity remained `Verified < 1e-4` with no page errors. See [pages-compatibility.json](pages-compatibility.json).

## 13. Git branch and commits

Repository: https://github.com/Amrit-04/portfolio

Branch: `rebuild/engineering-world`, based on `953f58b501c449884ce142bb467a5da6f778a164`. The remote was fetched again at handoff; `main` and all prior remote branches remain intact. Reviewed local implementation commit: **`79e2a7acacc5c7e0523c3eae344911e1b6ae360b`** (`feat: rebuild engineering world with verified notebooks and physical trail`). This report accompanies a subsequent evidence/documentation commit; its final SHA is supplied in the handoff response and can always be obtained with `git rev-parse HEAD`.

No force push, remote branch deletion, history rewrite, production configuration change or push occurred. The workflow validates main/rebuild pushes and main PRs, and only uploads/deploys Pages from non-PR `refs/heads/main`. It requires dependency installation, typecheck, lint, units, build, byte budget, Chrome installation and E2E before deployment. A feature-branch/manual run on this branch cannot enter the deployment job.

## 14. Local preview and review artifact

[REVIEW.html](../REVIEW.html) is the durable local review artifact. The interactive preview is `http://127.0.0.1:4183/portfolio/` and the game is `http://127.0.0.1:4183/portfolio/#/ride`, **only while the preview command is running**. Owned test/preview processes are stopped at delivery. No hosted preview URL was created or promised.

## 15. Production status

Existing production URL: https://amrit-04.github.io/portfolio/ — **unchanged by this work**. The latest observed successful production workflow remains [run 43688798002](https://github.com/Amrit-04/portfolio/actions/runs/43688798002), main commit `953f58b501c449884ce142bb467a5da6f778a164`.

This is not a claim that the rebuilt application is live. After explicit authorization: review the intended commit, rerun checks, choose the merge/publication operation, inspect Actions/deployed SHA, open the public site, test both modes and mobile interactions, and capture production evidence. None of those publication operations was performed here.
