# Project state

Current milestone: **local implementation, verification and review artifact complete**. No publication authorized.
Branch: `rebuild/engineering-world`.
Latest implementation commit: `79e2a7acacc5c7e0523c3eae344911e1b6ae360b`.
Preserved base: `953f58b501c449884ce142bb467a5da6f778a164`. This state file accompanies the subsequent documentation/evidence commit; its final SHA is available through `git rev-parse HEAD` and the handoff response.

## Completed features

- Discovery: repository cloned/fetched, production and references inspected, 312 supplied files inventoried, canonical sources and local font licences checked.
- Original illustrated workshop, seven-project exhibition, full notebooks and working demos; About, skill toolboard, research, honest homelab, learning notes and contact.
- Physical Planck bicycle with independent wheel motors/suspension, crank and articulated rider (19 world bodies / 21 joints intact), crash/ragdoll, checkpoints, 20 stars and nine-section trail with four real gaps.
- Independent collision/scenery editor, erase, undo/redo/clear, validated JSON import/export, pan/zoom and isolated test ride; canonical trail cannot be corrupted by editor operations.
- Keyboard/multi-touch lifecycle, pause, native notebook focus boundaries, browser history and muted-by-default original synthesized sound.
- Strict TypeScript, lazy game/experiments, WASM-only real inference, `/portfolio/` build and provenance allowlist, feature-branch validation with main-only deployment guard.
- Requested discovery/design/architecture documentation, final development/performance/visual reports and raw test evidence.
- Portable `REVIEW.html` verified in Chrome: 74 images loaded, all 4 galleries opened, no missing local links/page errors, zero phone overflow; desktop/phone review PNGs opened.
- Pages-like non-isolated document verified: `crossOriginIsolated: false`, real ONNX inference and <1e-4 parity, changing fixture predictions, zero page errors.

## Final verification

Last successful production build: **2026-11-17** (local).

- Typecheck: pass. Lint: exit 0, **426 warnings / 0 errors**; not warning-free. Vendor runtime files account for 415 warning locations, retained portfolio/demo code for 11.
- Unit/physics: **15 passed**. Deterministic physical course: 3,094 steps / 25.775 simulated seconds / max airborne 0.5833 seconds / no crash.
- E2E: **49 passed, 2 skipped, 0 failed, 0 flaky**. Duplicate laptop/mobile long-course tests intentionally skipped; every other test runs at three viewports.
- Complete browser trail used only real control inputs; final screenshot shows 20/20 stars / 0 crashes. Impossible custom gap genuinely crashed; R restored 21 joints and cleared input.
- Loaded-state axe: **27 states / 0 violations**; 0 page errors, 0 HTTP failures. Document overflow 0 px at 1440, 390 and 360 px.
- Size gate: **113,449 / 160,000 gzip bytes** critical JS + CSS. Game/ONNX deferred; runtime 14.85 MB on demand.
- **74 final PNGs opened**: all sections, all desktop/phone notebooks and demos, small-phone sample, ready/riding/pause/editor, three crashes, checkpoint, airborne gap and finish. See `docs/VISUAL_REVIEW.md`.
- Desktop-form-factor Lighthouse diagnostic completed (four 100 scores), but local/unthrottled with screen emulation disabled and default mobile UA; not a standardized production benchmark. Seven diagram-label warnings remain disclosed. Mobile trace failed `NO_NAVSTART`; no mobile performance score.

Earlier focus escape, hollow SVG hit targets, recursive crash retry, labels/contrast, mobile word-spacing, canvas resize and dark demo-button defects were repaired and reverified. The sound test selector was corrected to include the visible arrow; audio assertions retained. No final E2E failure remains.

## Design decisions

Paper/ink, restrained red/blue, original SVG/canvas art and locally licensed fonts. No unlicensed reference art/audio in production output. Existing historical assets/history retained. Source-attributed native benchmarks are separate from browser simulations. No fabricated live homelab, completed C++ engine or unverified assistant claims.

## Known limitations and remaining external checks

Free Rider reference returned HTTP 403; reference gameplay not inspected. Publisher-independent author-list verification and new résumé page-render review were unavailable. Physical phones, Safari/Firefox, screen readers/voice control, 200% zoom, extended stress/battery testing and deployed network conditions remain unverified. Seven Lighthouse SVG-label findings disagree with the separate axe run; no WCAG certification is claimed. No-JS fallback provides useful identity/contact/GitHub/résumé, not the entire exhibition.

See `docs/PERFORMANCE_ACCESSIBILITY.md` for severity/owner and exact metrics. These are disclosed review limitations, not fabricated passes.

## Deployment and next steps

Remote fetched again at final review. Local `main` / `origin/main` remain `953f58b501c449884ce142bb467a5da6f778a164`. Latest observed successful public workflow is run 43688798002 at that SHA. All previous remote branches retained.

No push, production deployment, remote branch deletion or history rewrite performed. The existing public URL remains https://amrit-04.github.io/portfolio/; the rebuild is **not live**.

Use `REVIEW.html` for the portable gallery/report index. Run `npm run preview -- --port 4183 --strictPort` after building for the local interactive preview. Owned preview processes are stopped at handoff. Any publication must receive separate explicit authorization, then be followed by deployed-SHA, public-browser and mobile verification.
