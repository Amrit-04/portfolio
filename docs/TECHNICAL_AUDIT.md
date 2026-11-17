# Technical audit

Existing React/Vite/Tailwind app, hash-based portfolio/ride switch, lazy demos with ErrorBoundary. public/data contains recorded benchmark fixtures; ONNX model and WASM are heavy but lazy-loaded. Existing seven demos contain working algorithm implementations worth retaining. Project details lack focus trapping/restoration; mobile section navigation is missing. Lenis and broad stop-motion effects are unnecessary for the new experience.

Old engine.ts simulates rear/front/frame/head points with custom Verlet constraints at 120 Hz. Rider limbs are rendered, not independently simulated. Editor adds to the default track arrays and undo only records additions. Redo/import/export are absent. This violates articulated-rider and isolation requirements; replace the engine rather than patch its four-point model.

Build already sets /portfolio/. Hard-coded media URLs and external Google font CSS remain. Copied reference images/audio lack documented rights. New build will exclude historical copied media/audio, serve locally licensed font files, preserve models/data/resumes and synthesized audio.

Existing deploy workflow: push main plus unrestricted workflow_dispatch; build-only gate and Node20. Add branch guard to deploy, CI checks on feature branches, Node24, types/lint/unit/E2E/build. No production push or settings change.

Baseline: npm ci 0 vulnerabilities; build passes; lint 432 warnings, 0 errors. Most warnings include React compiler eligibility, unused imports and source style. Existing E2E has several visibility-only assertions; preserve demo tests and add real state/outcome assertions, physics tests, editor round-trip, input lifecycle and responsive screenshots.
