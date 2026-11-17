# Supplied-reference analysis

Updated 2026-11-17 for the critical art-direction correction. This supersedes the earlier workshop interpretation. The controlling specification is the actual supplied clone at `S:/website inspo`, not a generic paper-and-ink mood board.

## Inspection and source evidence

The clone was served unchanged at `http://127.0.0.1:4190/`. Its 228,952-byte HTML, 182,562-byte app script, CSS, media, five lettering-frame payloads and fonts were inspected. The original 312-file inventory is retained in ASSET_INVENTORY.md and reference-clone-files.json. Live reference: https://tiagofragoso.com.

`reference-clone-audit.json` records exact viewport geometry and browser state. `screenshots/reference-clone` holds desktop 1440 × 1000 and phone 390 × 844 captures: arrival, biography, category grid, links, six walls, nested lightbox, hover states, sign-off and phone recommendation gate. Each wall is opened from a fresh page load because sequential openings left the clone's lazy-image observer stale. This is a capture correction, not a modification to the reference. Deferred offscreen images without `src` are not reported as failed HTTP requests.

## Composition specification and adaptation

| Source composition | Measured source behaviour | Adaptation |
| --- | --- | --- |
| Sticky bracketed navigation | 114 px desktop / 76 px phone; three links; irregular lettering | Same height, order, spacing framework and active underline; selectable Amatic SC text |
| Large irregular reel frame | Section width 86%, maximum 1320 px; aspect ratio 1.432; phone width 92% | Same outer geometry and letterbox; original project slideshow with pause, next, fullscreen and opt-in sound |
| Illustrated biography sheet | Width 86% × 1.07 on desktop, 100% on phone; aspect ratio 1.3343; tall character left, prose right | Original fictional programmer illustration, Amritesh's name and supported introduction, correction/torn-note sequence |
| Six irregular boxes | Three columns/two rows; phone two columns/three rows; rotations −2.4°, 1.8°, −1.1°, 2.6°, −2°, 1.4° | AI/ML, backend systems, finance, algorithms, research and playground in the same positions; no seven-card exhibition |
| Sticker/preview interactions | First four category hover blooms; last two previews; mobile first-tap preview | Original technical print artwork in those interaction roles; touch cancellation and delayed opening |
| Print walls | Cream sheet up to 1180 px / 95vw and 92vh; overlapping independently rotated pieces | Separate portrait, wide-landscape, research-banner and playground compositions; prints open actual notebooks |
| Nested lightbox | Darker second backdrop, scale/opacity entrance | Native project notebook dialog above wall; real experiments, source links and readable long-form content |
| Links/process/signature | Bracketed email/socials/more; tilted process picture; credit and signature | Canonical links, original process illustration, AY mark, long line and clickable sign-off |
| First phone visit | Desktop recommendation with continue action | Dismissible session-scoped recommendation; no gate in reduced-motion mode |

Source wall coordinate examples (fractions of wall width): TV begins x .0599, y −.0112, width .8951, rotation −4°; activation begins .0599, −.0112, .8315, 1°; games begins −.0084, −.0112, .9991, 0°. These inform the corresponding systems, finance and research opening pieces. Portrait wall coordinates inform AI and algorithms. Own content is shorter than the reference's client archive; the number and later arrangement of pieces deliberately differ.

## Motion and texture

The clone's paper controls yield RGB(242,244,244), with subtle noise alpha .0112; the navigation is slightly lighter. Three displacement-filter frames use seeds 5/27/51 and roughly six frames per second. Navigation has a stepped .72 s idle cycle. Wall entry combines translateY(28px), scale(.97), rotate(−.6deg), .32 s cubic-bezier(.22,.9,.31,1) and .28 s opacity. The lightbox has a .22 s scale/opacity transition. Phone walls are 180% of their viewport with a short pan hint. The biography's strike, correction and torn note run in sequence, with a slower reverse. These timings and layering were reconstructed in the adaptation, with reduced-motion and explicit playback controls.

## Rights and deliberate differences

The supplied files do not establish a general redistribution licence for the creator's artwork, personal photographs, client work, voice/audio or TFNibText font. They remain local reference material; they are not included in the prepared production output. The biography character and process image are newly generated illustrations, not photographs of Amritesh or claims of his hand-drawing. SVG paths and diagram artwork are original. OFL-licensed Amatic SC replaces proprietary lettering, so individual letterforms and text widths are not identical. The reel is a project slideshow, not the reference video. Deep technical notebooks replace image-only lightboxes. These differences are explicit, not disguised as pixel-perfect reproduction.

## Other references and production boundary

Free Rider HD returned HTTP 403 in Chrome, so its live gameplay was not inspected. The separate retained bicycle was validated from physical controls, contact geometry and articulated-body tests, not a fabricated reference session.

Existing production at https://amrit-04.github.io/portfolio/ remains the preserved `953f58b` version. The new composition is local and unpublished. `REVIEW.html` pairs the actual captured states; outer-box measurements do not establish perceptual equivalence or user acceptance.
