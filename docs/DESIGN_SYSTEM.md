# Reference-led composition specification

Updated 2026-11-17. This is the implementation map for the supplied Tiago clone, not a newly invented design system. The rejected workshop masthead, tabletop navigation, shelves and seven-project card arrangement are no longer the portfolio's composition. Historical unused components are retained without being imported by the portfolio route.

## Page and typography

Pale cool paper RGB(242,244,244), near-black ink, very subtle procedural grain, seams and occasional muted print colours. Sticky three-link bracketed navigation. The page sequence is framed reel → illustrated biography → six ink category boxes → bracketed links and process illustration → long sign-off. Desktop section widths, ratios, whitespace, grid gaps and rotations follow the measured clone. Phone layout retains the miniature biography composition and two-column category grid rather than converting them to new cards.

Amatic SC Regular/Bold is locally hosted under OFL 1.1 for tall handwritten display text. It substitutes for unlicensed TFNibText; it does not reproduce that font's exact glyphs. System sans/monospace and retained locally licensed fonts support readable notebook prose, code and game controls. Main text remains HTML, not rasterized copy.

## Artwork and walls

Original lightly irregular SVG frames use thin non-scaling strokes and restrained coordinate variation, not large sawtooth outlines. A newly generated fictional programmer occupies the biography's left illustration slot. A new monochrome notebook-process illustration occupies the tilted links picture. Neither is a documentary photograph or a portrait-likeness claim.

The six categories occupy the source grid positions: AI/ML, backend systems, quantitative finance, algorithms, research and playground. First four offer original sticker previews; last two show animated miniature content. Portrait wall pieces are used for AI/algorithms; systems and finance use measured broad overlapping print placements. Research opens with a wide publication banner and then publication/CV/skills sheets. Playground uses a large bicycle drawing and overlapping homelab/experiment sheets. Later piece counts and detailed art differ to fit truthful personal content instead of copying a commercial archive.

## Interaction and motion

Stepped ink/navigation motion, short opening splash, .32 s wall drop, .22 s notebook entrance, biography correction/torn note, first-phone-visit recommendation, and the long sign-off follow the reference's interaction roles. The reel is a 4.2 s original project slideshow, not a borrowed video. Pause/play, next, fullscreen and mute controls are available. It pauses offscreen, on hidden tabs and behind walls. Audio is original synthesized sound and off until opt-in.

Reduced motion removes decorative movement, skips the entrance/recommendation gate, and initializes the reel paused. Touch preview cancels when the visitor touches elsewhere. Phone walls intentionally pan internally at 180% width; the document itself must not overflow horizontally. Wall scroll regions are focusable. Native nested dialogs trap focus, close one layer at a time with Escape and restore the correct trigger.

## Separate game and readable content

The physical trail remains a separate lazy `#/ride` route reached from Playground. Its cool-paper styling echoes the portfolio; its original rolling course has one deliberate jump and clearly marked project stops. Physics, editor, sound and input lifecycle are not replaced with decorative animation. The full seven notebooks and real experiments remain available above the category walls. Research includes the IEEE record, résumé and canonical education/skills. Homelab copy distinguishes repository-supported experiments from unconfirmed live services.

## Verification boundary

Matched desktop and phone captures are in REVIEW.html. Build/test success is not visual acceptance. The font, character, reel media, print artwork, later wall density and technical notebook interiors intentionally differ from the source. Physical-device, screen-reader, voice-control and cross-browser review are separate checks; no comprehensive WCAG certification or exact pixel match is claimed.
