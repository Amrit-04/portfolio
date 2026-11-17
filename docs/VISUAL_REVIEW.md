# Final visual review

Date: 2026-11-17. Source: local production build at `/portfolio/`. **All 74 PNGs in `screenshots/final/` were opened with the image-reading tool**, not merely generated. The portable [review gallery](../REVIEW.html) links each original-resolution image.

| Group | Files / count | Inspection observations |
| --- | --- | --- |
| Desktop portfolio | `desktop-{hero,work,about,skills,research,homelab,notebook,contact,full}.png` / 9 | Original workshop objects, strong condensed heading, paper exhibition plates and restrained annotation system form one coherent page. Full-page image confirms section sequence/spacing. Contact, research source and honest homelab copy are present. |
| Phone portfolio | `mobile-` and `small-` versions of the eight sections above (without full) / 16 | At 390 and 360 px, titles wrap without horizontal clipping, diagrams/skills/homelab adapt to narrow columns, contact remains readable. Final notebook words have normal spacing after removing hidden decorative breaks. Tall content intentionally continues below each viewport. |
| Notebook introductions | `desktop-detail-<id>`, `mobile-detail-<id>` for all seven projects, plus `small-detail-neural-query-optimizer` and `desktop-detail` / 16 | Source/experiment actions, notebook titles, metrics and contribution hierarchy are readable. Phone metric columns wrap rather than overflow. Close control remains at the top of the native folio. |
| Loaded experiments | `desktop-demo-<id>` and `mobile-demo-<id>` for all seven projects, plus `small-demo-neural-query-optimizer` / 15 | Captures contain loaded controls, not an Opening experiment fallback. Real inference/parity output, trace waterfall, sample charts, order state machine, risk histogram, route grid and synthetic vision scene are visible. Dark-button labels on replay, risk and route actions are readable after removing the overriding global colour rule. |
| Opening/ride/pause/editor | `desktop-`, `mobile-`, `small-` × `game-ready`, `game-riding`, `game-paused`, `editor` / 12 | Paper/grid canvas and real rider remain coherent with the portfolio. Buffer resizing has no stale ghost scene. Ready/pause cards fit at all three heights. Touch controls and restart remain visible. Editor toolbar wraps on phones and drawing space remains usable. Native canvas focus borders are intentional. |
| Physical milestones | `desktop-game-airborne-gap`, `desktop-game-checkpoint`, `game-finish`, and desktop/laptop/mobile `game-crash` / 6 | Airborne image shows the real terrain opening. Checkpoint shows paused notebook choice. Final capture shows 20/20 stars and 0 crashes. Separate custom-gap crash captures show actual failure/retry UI. These images accompany physical telemetry assertions; the images alone are not proof of simulation. |

Total: 9 + 16 + 16 + 15 + 12 + 6 = **74**.

The separate local review index was also opened and captured at desktop and phone sizes (`docs/review-desktop.png`, `docs/review-mobile.png`; both images inspected). Its 74 images loaded, all four gallery toggles opened through browser clicks, every local link resolved, and phone overflow/page-error counts were zero. See [review-validation.json](review-validation.json).

## Specific defects caught and corrected

The original small-screen hero annotation overlap, joined notebook words, stale canvas buffer after HUD resizing, and invisible text on dark demo buttons were corrected and recaptured. Automated tests did not catch the last button-colour defect; opening loaded experiment images did. No further redesign was performed after those specific corrections.

The physics tests and E2E assertions separately establish that visual gaps are collision gaps, the wheels propel/brake through contact, the rider has articulated joints, the custom-gap fall crashes, retry restores the intact rider, and actual key input reaches the finish. The image archive does not substitute for that evidence.

## Limits

These are Chrome-emulated viewports on Windows. No physical-phone, Safari/Firefox or screen-reader visual claim is made. Small SVG diagram text is illustrative and has normal-text explanations in each notebook. A viewport screenshot crops scrolling content by design; this is not evidence that every long notebook or section fits in one screen. Remaining Lighthouse diagram-label warnings and unavailable mobile trace metrics are detailed in [PERFORMANCE_ACCESSIBILITY.md](PERFORMANCE_ACCESSIBILITY.md).
