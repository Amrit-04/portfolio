# Reference-led portfolio adaptation — development report

Prepared 2026-11-17. **Local feature-branch work, not published.** This report supersedes the earlier workshop handoff. That implementation passed functional tests but misunderstood the user's art direction; those test results did not make it acceptable.

## What changed

The supplied Tiago Fragoso clone at `S:/website inspo` was run unchanged and treated as the composition specification. Its actual source, layout, assets, animations and interactions were inspected. The portfolio now follows the reference's bracketed navigation, large framed reel, illustrated biography, six uneven ink category boxes, overlapping print walls, nested detail layer, bracketed links/process artwork and long sign-off. There is no workshop, dashboard, toolboard or seven-card exhibition on the portfolio route.

The category labels are AI & Vision, Systems, Quant, Algorithms, Research and Playground. The first four reveal original project prints; Research contains the publication, CV and skills; Playground contains the separate bicycle entry, honest homelab notes and experiments. The first four boxes have hover stickers and the last two have previews. Phone touch previews, first-visit recommendation, wall panning and reduced-motion behaviour are implemented. History restores walls and the separate ride route.

The portable [REVIEW.html](../REVIEW.html) pairs reference/adaptation states at identical viewport sizes. [REFERENCE_ANALYSIS.md](REFERENCE_ANALYSIS.md) records measured source geometry and motion; [VISUAL_REVIEW.md](VISUAL_REVIEW.md) records observations and differences. No pixel-equivalence score or user acceptance is claimed.

## Deliberate substitutions and provenance

The reference's personal identity, commissioned projects, portrait, proprietary TFNibText font and recordings are not shipped. New AI-assisted fictional-character and process illustrations were generated and converted to WebP. They are not photographs, verified likenesses or claimed hand drawings by Amritesh. Original SVG project prints, ink frames and marks complement them. Amatic SC is locally hosted under OFL 1.1 with the upstream licence. The project reel is an original slideshow, not the reference's cinematic video. Letterforms, imagery, print density and inner content therefore remain visibly different.

The build allowlist excludes historical reference media/audio and unused runtime/font assets without deleting user source files. The supplied clone was not edited. Reference screenshots are local review evidence outside public/dist, not portfolio assets. Full provenance is in [ASSET_INVENTORY.md](ASSET_INVENTORY.md).

## Architecture and content

React 19, strict TypeScript, Vite 8 and the existing Tailwind-compatible demos remain. `PortfolioMode.tsx` owns page composition/history; `PaperWalls.tsx` owns category walls and native dialogs; `PaperArt.tsx` supplies original SVG/frame helpers; `paper-portfolio.css` holds reference-led geometry and motion. `src/data/projects.ts` remains canonical. Nested notebooks lock body scrolling, cycle focus, close one layer with Escape and return focus. Demos and the game are lazy modules. There is no shipped QA harness or mutable teleport interface.

All seven notebooks retain problems, contributions, source-attributed measurements, decisions, limitations and working experiments:

| Project | Verified experiment | Boundary |
| --- | --- | --- |
| Neural Query Optimizer | ONNX WASM inference, changing fixtures, Python parity below 1e-4 | Native source benchmarks are not browser timings |
| LLM Reliability Control Plane | Trace filtering and waterfall selection | Recorded sample explorer, not live ingestion |
| Fault-Tolerant ML Telemetry | Replay, playback time, 27 tuning configurations, chaos view | Recorded data, not a running Kafka cluster |
| Tradeflow | Risk rules, order transitions, fills and accounting | Client state machine, no real orders |
| Moneyball | Seeded compound-Poisson simulation and changing risk output | Simulation, not live trading or a CUDA service |
| Warehouse Routing | Obstacle-aware A* and open-path route optimization/reset | JavaScript demo, not a rerun of native benchmarks |
| Workplace Safety | Synthetic actors, geofence probing, logs and pause | No camera/YOLO inference in browser |

Research is the IEEE RMKMATE 2026 Workplace Safety paper, Xplore record 11518869. SimpleTracker/centroid tracking is identified accurately. Homelab notes separate evidenced project tools from unconfirmed service interests; no live status or private endpoints are fabricated. C++20/CMake foundations are distinguished from orbital/Vulkan/CUDA ambitions. Identity, résumé, source, email and social links remain canonical. See [CONTENT_SOURCE_OF_TRUTH.md](CONTENT_SOURCE_OF_TRUTH.md).

## Separate physical bicycle and editor

The portfolio correction did not replace the game with an animation. Planck simulates independent wheels/suspension, chassis, motorized crank and articulated torso/head/limbs: 19 world bodies and 21 intact joints. Rear-wheel traction drives motion, wheel motors brake, lean applies physical torque, and impacts release five attachments for ragdoll motion.

The engine steps at 120 Hz with a bounded accumulator and interpolated rendering; React HUD updates are capped at 10 Hz. Keyboard and pointer sources are independent and clear on pause/blur/cancel/exit. Checkpoint notebooks pause simulation; retry constructs an intact rider. Sound remains opt-in.

Nine sections, 20 stars, checkpoints and the x=286 finish remain. Gaps at 80–83, 112–115, 188–191 and 249–253 metres are absent from both visible terrain and collision. The isolated editor supports collision/scenery layers, erase, undo/redo/clear, pan/zoom, validated JSON import/export and test rides. Editor operations do not mutate the canonical track. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Verification

The correction's complete regression suite records **53 browser tests passed, four intentional viewport-specific skips, zero failures and zero flaky cases**. Fifteen unit/physics tests pass. Strict typecheck and production build pass. Lint exits 0 with **429 warnings, zero errors**; it is not warning-free. No tests were weakened or vendor warnings hidden.

The loaded-state browser audit covers **45 axe states with zero violations**, plus page/HTTP errors, overflow, resources and game timing. The normal-motion visual audit captures 57 states at 1440×1000, 390×844 and 360×640. All seven desktop/phone notebook/demo views and separate game/editor states were also opened. Exact raw results, timing limitations and reproduction commands are in [PERFORMANCE_ACCESSIBILITY.md](PERFORMANCE_ACCESSIBILITY.md).

Corrections made from rendered evidence include thinner/less jagged frames, navigation spacing, source-specific landscape walls, a wide research opening print, a narrower desktop homelab column, and extra lower-sheet clearance at 360 px so the résumé link and homelab disclaimer are not covered. Small-phone résumé pointer hit-testing is an audit assertion. The reference capture script waits for real open-sheet opacity and ready image/video media, rather than treating a successful screenshot call as proof of a loaded wall.

The deterministic physical course still completes in 3,094 steps / 25.775 simulated seconds, maximum airborne time 0.5833 seconds, without a crash. Browser traversal uses actual controls, reaches all nine sections, opens checkpoint notebooks and finishes with 20/20 stars. Separate impossible-gap and retry tests verify real falling and restoration of 21 joints.

## Limitations

Lighthouse 12.8.2 / Chrome 157 trace collection failed `NO_NAVSTART` on the corrected page; no current Lighthouse performance score is claimed. Earlier four-100 workshop diagnostics are historical, not evidence for this adaptation. Physical phones, Safari/Firefox, actual screen-reader/voice-control use, extended stress/battery behaviour and deployed conditions remain unverified. Automated axe results are not WCAG certification.

The reference Free Rider site returned HTTP 403, so its tuning was not measured. Publisher-independent author-list verification and a newly rendered résumé page-layout review remain unavailable. Native project benchmarks are source-attributed, not rerun. No-JS fallback provides identity/contact/GitHub/résumé, not every interactive notebook. The editor persists through explicit export/import, not cloud storage.

Phone print walls intentionally extend wider than the viewport and can be panned internally, as in the reference; screenshots can crop a print's edges. Technical notebooks use readable normal text rather than reproducing an image-only lightbox. These are disclosed content/accessibility adaptations, not claims that every inner layout is identical.

## Review and reproduction

```sh
npm ci
npm run build
npm run typecheck
npm run lint
npm test
npm run size
npm run test:e2e
npm run preview -- --port 4183 --strictPort
```

With that preview running, execute `node scripts/visual-audit.mjs`, `node scripts/quality-audit.mjs` and `node scripts/create-review.mjs`. The application URL is `http://127.0.0.1:4183/portfolio/`; the game is `#/ride`. Reference recapture additionally requires the unchanged clone served on port 4190. `REVIEW.html` itself opens locally without a server, using relative evidence links. `node scripts/verify-review.mjs` verified 129 loaded images, 25 opened galleries, 135 resolved local links and zero page errors/overflow at desktop and phone widths. Its ten overview/pair captures were opened.

## Git and publication boundary

Branch: `rebuild/engineering-world`. Preserved base: `953f58b501c449884ce142bb467a5da6f778a164`. Previous local implementation/evidence commits remain in history; this correction is a new local commit, whose SHA is provided in the handoff and by `git rev-parse HEAD`.

No push, main overwrite, force push, branch deletion or production publication was performed. Existing production remains https://amrit-04.github.io/portfolio/ and is not this rebuilt version. Owned preview/audit processes are stopped at handoff. Any later publication requires separate authorization and then deployed-SHA/public-browser verification.
