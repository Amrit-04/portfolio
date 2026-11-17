# Reference adaptation — visual review

Date: 2026-11-17. This replaces the earlier workshop review. Passing tests and the former 74-image gallery were not evidence of compliance with the corrected brief.

## Method and scope

The supplied clone at `S:/website inspo` was served unchanged on port 4190. The actual production build was served at `/portfolio/` on port 4183, not through a development server or injected bypass. Reference/adaptation comparisons use identical 1440×1000 and 390×844 CSS viewports. The adaptation also has 360×640 small-phone checks. Chrome phone emulation is not physical-device testing.

Reference capture follows the real navigation, phone gate, category walls and nested lightbox. Each wall starts from a fresh navigation; capture waits for both backdrop/sheet opacity and loaded image or video media. Earlier stale-observer and premature screenshots were replaced. All six final desktop/phone wall captures show their actual contents. The desktop reference home capture has a black video-startup frame; the phone home has a playing frame. The cloned media were not edited to conceal this.

The normal-motion adaptation archive contains **57 screenshots**: desktop home/about/work/links, six hovers, six walls, notebook, social dialog, sign-off and five lower information sheets; phone gate, home/about/work/links, six walls, notebook, social dialog, sign-off and five lower sheets; small-phone gate, main sections, research/playground walls, five lower sheets, social dialog and sign-off. The archive was opened, not merely generated.

The separate current regression gallery includes 48 captures: all seven desktop/phone notebook introductions and loaded demos, one small-phone notebook/demo, ready/riding/paused/editor at three sizes, three crash views, an airborne gap, checkpoint and finish. These were opened. Historical `desktop-detail.png` and old workshop section images remain outside the current gallery. Images are selected explicitly by the review generator, not indiscriminately from the mixed historical folder.

## Composition observations

| State | Source composition retained | Visible adaptation/difference |
| --- | --- | --- |
| Home | Three centered bracketed links, broad paper margins, large irregular reel frame, letterboxing and unmute arrow | Original project slideshow replaces client video; Amatic SC differs from proprietary lettering |
| About | Tall ink character at left, oversized handwritten identity/prose at right, correction and torn-note treatment | New fictional character, Amritesh biography and engineering copy; illustration texture and line breaks differ |
| Work | Six sparse uneven ink boxes, 3×2 desktop and 2×3 phone, original rotations/spacing direction | Own category names and drawings; not a seven-card technical dashboard |
| First four walls | Cream sheet and ink close control; overlapping portrait or taped landscape media with reference-derived coordinates | Original project diagrams/prints, different image palette, content count and later-sheet density |
| Research | Very wide opening print followed by a long vertical wall | Own publication, CV and skills; readable text requires more vertical room than image-only artwork |
| Playground | Large left feature and narrow top-right sheet on desktop | Bicycle introduction, honest homelab copy and experiment links replace creator material |
| Nested layer | Darker backdrop, independent close/focus layer | A readable technical notebook with real demo instead of an image-only lightbox |
| Links | Bracketed email/social/stuff row, tilted monochrome process art, credit and signature | Generated illustration, truthful AI-assisted credit and AY mark, not the creator's photo/claim/signature |
| Sign-off | Long ink line, centered thanks, clickable cartoon and short aside | Original small character and engineering-specific asides |

The About and Work anchors intentionally retain the reference's alignment beneath the sticky navigation; some top content is behind the bar at that exact anchor state in both versions. Normal scrolling reveals it. Phone walls intentionally extend to 180% internal width with horizontal pan, so screenshots crop print edges. This is not document-level horizontal overflow, nor a claim that every print fits one phone screen.

## Defects corrected from opened captures

1. The first rebuilt frames were too jagged/heavy. Jitter amplitude and stroke treatment were reduced; navigation width/spacing and links/signature offsets were adjusted against the clone.
2. Repeated generic walls did not reflect the source's distinct media formats. Systems and Quant use wide taped opening prints; Research uses a nearly full-width banner.
3. The desktop homelab sheet covered the bicycle introduction. It now occupies the reference-like 31.74% right column; the introduction, Ride button and disclaimer are visible.
4. At 360 px the skills sheet covered the résumé link and the experiments sheet covered the homelab disclaimer. A small-screen-only increase in lower-sheet offsets corrected both. The final CV screenshot shows the entire résumé link; the final homelab screenshot shows the full disclaimer through “unconfirmed.” A trial pointer click asserts that the résumé is hittable, without navigating to the PDF.
5. Reference screenshots previously captured a closed grid or unloaded media despite successful calls. The media/opacity readiness assertions now reject those states. The final archive's loaded walls were opened.

## Notebook, demo and game observations

Notebook titles, source links and metrics remain readable on cream paper. Phone notebooks scroll vertically; close controls remain visible. Loaded demos show real controls/results, with readable risk/replay/route buttons and no error pages. Small neural-demo content scrolls inside its named region rather than forcing document overflow.

The game is visibly separate. Ready/pause/crash panels, four touch controls and editor import/export/test-ride controls are available at 390 and 360 px. Rider/wheel poses change; the airborne capture shows a real terrain break, and the crash captures show detached ragdoll motion. Those images alone do not prove simulation: unit and browser assertions independently verify it. The finish capture shows 20/20 stars and zero crashes.

## Evidence and limits

[REVIEW.html](../REVIEW.html) provides 24 matched state pairs, additional lower-sheet/interaction/small-phone images and the current regression gallery. [composition-comparison.json](composition-comparison.json) records outer-section dimensions only, not a pixel-similarity metric. [adaptation-visual.json](adaptation-visual.json), [reference-clone-audit.json](reference-clone-audit.json) and [browser-quality.json](browser-quality.json) record actual browser state.

The rendered review was verified with `node scripts/verify-review.mjs` at 1440×1000 and 390×844: all 129 images loaded, all 25 galleries opened, 135 local links resolved, zero page errors and zero document overflow at both sizes. Two overview and eight side-by-side pair screenshots in `screenshots/review-final/` were opened. The overview remains readable on a phone; the About/Work comparisons expose retained geometry alongside the different letterforms, and Research/Playground expose the less image-dense technical content. Raw results: [review-verification.json](review-verification.json).

The main hierarchy and reference interaction style were reproduced, but artwork, font shapes, slideshow media, technical notebook interiors and some inner-wall density visibly differ. No claim is made of pixel identity, creator endorsement, a licensed copy of proprietary assets, or the user's visual acceptance. Static captures also do not prove exact animation phase synchronization. Physical devices and assistive-technology checks remain external work, as detailed in the performance report.
