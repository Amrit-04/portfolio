# Architecture

## Runtime and boundaries

React 19, strict TypeScript and Vite 8; existing Tailwind utilities remain for the seven project demos. Canonical content lives in `src/data/projects.ts`. `PortfolioMode.tsx` composes the supplied reference's reel, illustrated biography, six-category grid, links and sign-off. `PaperWalls.tsx` owns category composition and native wall/social dialogs; `PaperArt.tsx` supplies original SVGs and frame/filter helpers; `paper-portfolio.css` contains the measured reference geometry and motion. The old Workshop component is not imported by the portfolio route. Normal motion includes an 850 ms splash and a dismissible first-phone-visit recommendation; reduced motion skips these and initializes the reel paused.

`App` uses the hash `#/ride` for the lazy game route. `PortfolioMode` maps `#wall-*` history entries to category walls and ordinary anchors to page sections, listens for popstate/hashchange, and restores the correct route after back/forward. Wall dialogs lock body scrolling and cycle focus; nested `ProjectDetail` restores the prior locked overflow and its print trigger when closing. The native `ProjectDetail` dialog is shared by category walls and game checkpoints. It locks document scrolling, cycles Tab/Shift+Tab within current visible controls, handles Escape and restores trigger focus. Closing a checkpoint notebook does not silently resume physics.

Demos are module-scope React.lazy entries. ONNX imports the WASM-only package export with its documented external-runtime condition. The model and 14.85 MB SIMD WASM runtime are fetched only on opening that notebook. Other demos remain local simulations or recorded-sample explorers, explicitly labelled. No cloud AI service or real trading endpoint is called.

## Physics decision

Planck 1.5.1 (Box2D, MIT) was selected over a bespoke Verlet solver or another WASM runtime. It supplies wheel/revolute joints, suspension, motors, contact solving and continuous collision without an extra boot fetch. Rapier would add WASM initialization; reliable drivetrain/contact constraints would make a custom solver substantially harder to validate.

`physics.ts` owns a world under gravity (0, -16), stepped at 1/120 second. It has 19 bodies including terrain and 21 joints while intact: independent circular wheels, a rigid chassis, motorized crank, torso/head, upper/lower arms and legs, hands and feet. All limbs render from their own interpolated body transforms. The rear wheel motor provides drive torque; both wheel motors provide braking. The crank follows wheel speed while pedalling. Lean uses bounded chassis torque and rider hip posture, including limited air control. No setter translates the bicycle forward.

Wheel suspension uses 10 Hz / 0.9 damping. Self collision is disabled within the articulated bicycle; terrain contact remains physical. Bullet bodies and exact static Edge terrain fixtures reduce tunnelling. Head/torso impact is recorded during contact callbacks; attachment destruction occurs after stepping, releasing five attachment joints into a ragdoll. A fall below -12 m also crashes. Respawn builds a new intact world and explicitly exits the crashed state before playback, avoiding retry recursion.

## Fixed-step engine and lifecycle

`engine.ts` owns world, status, input, checkpoint, collectible set, clock, camera and editor. RAF accumulates at most 0.1 seconds per frame (at most 12 physical steps), and drawing interpolates previous/current physical poses. React receives HUD snapshots at no more than 10 Hz, never physical-frame state. Camera smoothing is independent of physics. ResizeObserver keeps canvas buffer and CSS geometry synchronized after HUD/editor layout changes.

Statuses: ready, running, paused, crashed, checkpoint, finished and editor. Pause and notebooks freeze physics and the timer; crashed status continues ragdoll steps but not the run clock. Blur/hidden tab/pause/exit/cancel clear inputs. Keyboard aliases and pointer IDs use independent source entries, so releasing one touch does not cancel a different held control. Effect cleanup removes listeners, ResizeObserver and RAF. Read-only canvas `data-telemetry` supports diagnostics and browser assertions; there is no shipped mutation hook or QA route.

Audio uses original short WebAudio oscillator/gain envelopes, muted by default. AudioContext is created only after opt-in. The UI mirrors the shared mute setting on route re-entry.

## Track and editor

`track.ts` returns a fresh nine-section authored course: Workshop, Database, Reliability, Tradeflow, Warehouse, Quantitative, Telemetry, Vision and Victory. Finish is x=286 m. Twenty physical stars and eight later flags lead through the exhibition. The four gaps are 80–83, 112–115, 188–191 and 249–253 m. Rendering and collision use the exact same disconnected segment list. There are no invisible bridges.

`editor.ts` owns an independent version-1 JSON document with collision and scenery arrays. Validation caps each layer at 2,000 lines, finite coordinates at ±2,000 m, and line lengths at 0.05 m minimum. The UI caps imported files at 600 KB. Addition and import both validate coordinate bounds. Snapshot undo/redo restores additions, erasures and clear operations, with 100 retained edits. A test ride clones the document and constructs a separate world; returning to the trail reconstructs canonical data. Drafts are session-local; use export for persistence.

## Build and delivery safety

Vite base is `/portfolio/`. Local fonts include their upstream licences. `prepare-output.mjs` filters generated `dist` to assets/data/model/résumé/approved fonts/WASM and copies the entry to `404.html`. Historical unlicensed reference media/audio remain untouched in source history but cannot enter the prepared artifact. There is no external font request.

Feature branches/PRs run installation, strict types, lint, unit physics, build, size and real Chrome E2E. Pages upload and deploy require `refs/heads/main` and a non-PR event. No workflow or deployment was triggered remotely by this work. Production publication remains a separate authorized operation.

## Verification layers

- `tests/physics.test.ts`: traction, motor/brake response, no contact/no propulsion, independent bodies/joints, ragdoll, exact gaps, full course via physical controls, editor validity/history/isolation.
- `tests/engine.test.ts`: fixed-rate/clamped stepping, pause/time/input, physical star/checkpoint passage, crash respawn, clone restoration and cleanup.
- `e2e/portfolio.spec.ts`: all seven demo state transitions, actual ONNX execution and Python parity.
- `e2e/ride.spec.ts`: real keyboard and multi-pointer inputs, file picker/download, crash/retry, full trail/checkpoint notebooks/finish and WebAudio opt-in.
- `e2e/accessibility.spec.ts`: nested focus trap/return, keyboard category selection, wall/ride history, canonical contact, reduced motion, real reel controls, scrollspy, wall keyboard panning, phone gate/touch-preview lifecycle, base-path résumé and no-JS fallback.
- `scripts/quality-audit.mjs`: fully loaded demo/portfolio/game/editor axe checks, browser errors, resources, local LCP/CLS observations, frame sampling and desktop/phone images.
- `scripts/visual-audit.mjs`: all portfolio sections and overflow matrix; images opened manually after capture.

Final outcomes and environment limitations are recorded in the development and performance reports; test source alone is not a claim of passing.
