# Inspiration asset inventory

## Art-direction correction assets — 2026-11-17

- `public/fonts/AmaticSC-Regular.ttf`, `AmaticSC-Bold.ttf`: Google Fonts Amatic SC, Copyright 2015 The Amatic SC Project Authors, SIL OFL 1.1. Notice: `public/fonts/amatic-LICENSE.txt`; upstream https://github.com/google/fonts/tree/main/ofl/amaticsc. Replaces the reference's proprietary TFNibText rather than redistributing it.
- `src/assets/paper/character.webp` (196,366 bytes): original AI-assisted ink illustration, generated as `vibe_images/amrit-ink-character-v1_1794901160650_15b7713a.png` (768 × 1024). Brief: friendly fictional programmer with short tousled hair, dot eyes, long nose, light stubble, black shirt and waving hand inside a tall irregular ink panel; monochrome hand-inked appearance; no cap, glasses, copied character, workshop or photoreal portrait. Cropped at (78,4,693,1019); white converted to alpha with dark ink RGB(20,19,16). This is not a verified likeness of Amritesh.
- `src/assets/paper/process.webp` (117,376 bytes): original AI-assisted notebook-process illustration from `vibe_images/notebook-process-illustration-v1_1794901315424_574e389b.png` (1280 × 1024). Brief: monochrome ink/charcoal hand sketching a query tree and bicycle in a notebook, no face and no documentary-photo claim. Resized to 840 px width and encoded WebP at quality 87.
- `src/components/PaperArt.tsx`: newly authored frame polylines, arrows, filter primitives and project diagram SVG paths. No source portrait/signature/client-logo paths were copied.
- Reel: code-native slideshow of original project prints, not borrowed creator video. Sound: existing original WebAudio synthesis, muted by default. Texture: procedural SVG noise, not a copied paper scan.

Generation brief summaries above record intent, not verbatim full tool prompts. Original generation records remain in the session transcript. Both source PNGs were opened before extracting production WebPs. The output allowlist includes the two WebPs and licensed fonts, but excludes the supplied reference media, audio and proprietary font. Reference screenshots are local review evidence only, outside `public`/`dist`.

## Supplied clone inventory

Audited recursively on 2026-11-15 from `S:/website inspo`. 312 files. Dimensions are decoded from raster headers, not guessed. Video dimensions not probed; shown as —.

No general reuse licence accompanies the clone. Do not ship Tiago’s personal illustrations, handwriting font, voice, branding, or animation frames. Existing copied public/media and public/audio files are historical material and will be excluded from the rebuilt artifact. Original SVG artwork and synthesized sound replace them. Google-font assets are separately licensed upstream: Anton (OFL), Permanent Marker and Special Elite (Apache 2.0), with notices stored in public/fonts.

The five unmute files contain PNG data URLs, not audio. app.js rotates boil frames, then uses struck-through frames for the unmute affordance. index.html defers files 1–3 (BOIL) and 4–5 (STRUCK) until usable. Recreate the principle, not the raster letters.

| Path | Type | Bytes | Dimensions | Animated | Intended purpose | Reuse assessment |
|---|---|---:|---|---|---|---|
| `app.js` | .js | 182,562 | — | No | Reference implementation | Study only; no reuse licence supplied |
| `bake/hotspots.js` | .js | 7,652 | — | No | Reference implementation | Study only; no reuse licence supplied |
| `bake/wall-playground.webp` | .webp | 1,184,400 | 1307 × 8115 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `bake/wall-print.webp` | .webp | 892,546 | 1292 × 4508 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `fonts/anton-v27-1Ptgg87LROyAm3K8-C8QSw.woff2` | .woff2 | 8,680 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `fonts/anton-v27-1Ptgg87LROyAm3K9-C8QSw.woff2` | .woff2 | 31,356 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `fonts/anton-v27-1Ptgg87LROyAm3Kz-C8.woff2` | .woff2 | 18,612 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `fonts/google-fonts.css` | .css | 2,356 | — | No | Reference implementation | Study only; no reuse licence supplied |
| `fonts/permanent-marker-v16-Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cfw.woff2` | .woff2 | 29,564 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `fonts/special-elite-v20-XLYgIZbkc4JPUL5CVArUVL0ntn4OSEFt.woff2` | .woff2 | 25,196 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `fonts/special-elite-v20-XLYgIZbkc4JPUL5CVArUVL0ntnAOSA.woff2` | .woff2 | 53,296 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `index.html` | .html | 228,952 | — | No | Reference implementation | Study only; no reuse licence supplied |
| `media/about-award-winning-v3.png` | .png | 41,265 | 1001 × 229 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/about-inked-v19.webp` | .webp | 127,386 | 1900 × 1424 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/about-poet-line.png` | .png | 16,289 | 638 × 80 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-activobank.png` | .png | 22,851 | 480 × 139 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-benfica.png` | .png | 147,941 | 480 × 474 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-brisa.png` | .png | 46,657 | 480 × 401 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-edp.png` | .png | 30,475 | 296 × 432 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-meo.png` | .png | 26,020 | 480 × 282 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/activation-rtp.png` | .png | 22,041 | 480 × 374 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-apav.png` | .png | 28,060 | 480 × 480 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-betclic.png` | .png | 44,822 | 480 × 211 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-del-monte.png` | .png | 86,716 | 480 × 378 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-imagem1.png` | .png | 75,353 | 480 × 409 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-montepio.png` | .png | 27,419 | 414 × 177 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/digital-social-sumol.png` | .png | 76,808 | 480 × 327 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/print-ooh-agros.png` | .png | 79,680 | 480 × 480 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/print-ooh-betclic.png` | .png | 44,822 | 480 × 211 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/print-ooh-meta.png` | .png | 48,392 | 390 × 291 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/print-ooh-montepio.png` | .png | 27,419 | 414 × 177 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/print-ooh-oliveira-da-serra.png` | .png | 117,298 | 437 × 418 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/tv-ads-fula.png` | .png | 54,741 | 467 × 322 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/tv-ads-pisca-pisca.png` | .png | 54,893 | 480 × 448 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/tv-ads-sagres.png` | .png | 75,353 | 480 × 409 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/tv-ads-sumol.png` | .png | 76,808 | 480 × 327 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/bloom/tv-ads-vigor.png` | .png | 19,463 | 418 × 148 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/coded-with-claude.png` | .png | 18,664 | 736 × 77 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/correction.png` | .png | 9,699 | 209 × 53 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/cursor-arrow.png` | .png | 1,243 | 28 × 42 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/cursor-hand.png` | .png | 1,915 | 38 × 44 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/drawn-by-hand.png` | .png | 18,280 | 531 × 88 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/favicon-apple.png` | .png | 15,167 | 512 × 512 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/favicon.png` | .png | 15,203 | 512 × 512 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/fonts/nib-random.js` | .js | 2,648 | — | No | Reference implementation | Study only; no reuse licence supplied |
| `media/fonts/TFNibText-Regular.woff2` | .woff2 | 37,820 | — | No | Typography | TF Nib: proprietary/unknown; Google fonts: verify upstream licence |
| `media/gag-extended-v3.webp` | .webp | 20,644 | 616 × 2400 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gag-jimmy-line.png` | .png | 89,250 | 1600 × 286 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gag-jimmy.webp` | .webp | 26,210 | 660 × 730 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gag-sparks-even.png` | .png | 140,305 | 3338 × 1900 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gag-sparks-odd.png` | .png | 140,571 | 3338 × 1900 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-0.png` | .png | 2,602 | 118 × 282 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-1.png` | .png | 1,954 | 101 × 229 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-2.png` | .png | 2,100 | 106 × 237 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-3.png` | .png | 1,560 | 96 × 213 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-4.png` | .png | 1,752 | 100 × 232 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-5.png` | .png | 2,379 | 148 × 222 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gagr-6.png` | .png | 2,181 | 104 × 247 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-0.png` | .png | 2,718 | 152 × 215 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-1.png` | .png | 2,301 | 142 × 224 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-10.png` | .png | 2,229 | 114 × 262 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-2.png` | .png | 1,202 | 48 × 210 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-3.png` | .png | 1,889 | 108 × 233 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-4.png` | .png | 1,928 | 102 × 250 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-5.png` | .png | 3,225 | 181 × 266 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-6.png` | .png | 2,725 | 130 × 244 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-7.png` | .png | 2,649 | 127 × 255 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-8.png` | .png | 2,691 | 134 × 257 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gags-9.png` | .png | 2,440 | 123 × 275 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-arrow1.png` | .png | 20,932 | 687 × 175 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-arrow2.png` | .png | 15,824 | 687 × 175 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-arrow3.png` | .png | 16,201 | 687 × 175 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-arrow4.png` | .png | 21,704 | 687 × 175 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-arrow5.png` | .png | 22,957 | 687 × 175 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-frown.png` | .png | 20,449 | 322 × 269 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-idc.png` | .png | 30,737 | 666 × 185 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/gate-msg.png` | .png | 174,244 | 1051 × 918 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hey-dash.png` | .png | 531 | 49 × 26 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hey-dot.png` | .png | 199 | 16 × 15 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hey-e.png` | .png | 1,001 | 30 × 76 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hey-h.png` | .png | 1,170 | 38 × 75 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hey-y.png` | .png | 978 | 40 × 76 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hover-gallery/pg-gallery-1.webp` | .webp | 6,814 | 540 × 467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hover-gallery/pg-gallery-2.webp` | .webp | 26,570 | 686 × 592 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hover-gallery/pg-gallery-4.webp` | .webp | 25,186 | 920 × 814 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/hover-gallery/pg-gallery-9.webp` | .webp | 67,424 | 1096 × 1100 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/ink-strike-crisp.png` | .png | 10,038 | 1360 × 103 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/jim-sfx-click-1.m4a` | .m4a | 8,046 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/jim-sfx-click-2.m4a` | .m4a | 8,418 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/jim-sfx-click-3.m4a` | .m4a | 9,272 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/jim-sfx-click-4.m4a` | .m4a | 8,394 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/jim-sfx-idle.m4a` | .m4a | 12,769 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/jimmy-reel.mp4` | .mp4 | 21,359,637 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/link-email-l.png` | .png | 1,752 | 271 × 109 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-email-mid.png` | .png | 4,043 | 271 × 109 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-email-r.png` | .png | 1,602 | 271 × 109 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-sfx-email.m4a` | .m4a | 11,202 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/link-sfx-socials.m4a` | .m4a | 14,062 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/link-sfx-stuff.m4a` | .m4a | 8,876 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/link-socials-l.png` | .png | 1,931 | 262 × 126 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-socials-mid.png` | .png | 5,580 | 262 × 126 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-socials-r.png` | .png | 1,846 | 262 × 126 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-stuff-l.png` | .png | 2,004 | 255 × 141 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-stuff-mid.png` | .png | 4,830 | 255 × 141 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/link-stuff-r.png` | .png | 1,912 | 255 × 141 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/mistake.mp4` | .mp4 | 33,790 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/name-a1.png` | .png | 3,685 | 66 × 228 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-a2.png` | .png | 3,736 | 62 × 229 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-f.png` | .png | 2,171 | 52 × 230 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-g1.png` | .png | 3,003 | 49 × 210 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-g2.png` | .png | 3,181 | 57 × 228 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-o1.png` | .png | 3,026 | 43 × 222 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-o2.png` | .png | 3,096 | 42 × 230 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-o3.png` | .png | 2,949 | 44 × 208 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-r.png` | .png | 4,164 | 67 × 228 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-s.png` | .png | 2,950 | 63 × 226 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/name-ti.png` | .png | 3,620 | 114 × 230 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-about-active.png` | .png | 29,613 | 1110 × 628 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-about.png` | .png | 36,159 | 481 × 262 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-links-active.png` | .png | 30,172 | 1188 × 604 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-links.png` | .png | 34,638 | 495 × 256 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-sfx-about-swoosh.m4a` | .m4a | 11,020 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-sfx-about.m4a` | .m4a | 8,628 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-sfx-links-swoosh.m4a` | .m4a | 8,463 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-sfx-links.m4a` | .m4a | 10,858 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-sfx-work-swoosh.m4a` | .m4a | 8,795 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-sfx-work.m4a` | .m4a | 9,210 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/nav-work-active.png` | .png | 32,855 | 1319 × 661 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/nav-work.png` | .png | 43,176 | 549 × 258 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/ocasional.png` | .png | 138,929 | 1237 × 432 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/playground-hover-orig.jpg` | .jpg | 114,307 | 900 × 900 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/playground-smoke-trimmed.png` | .png | 22,531 | 900 × 835 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/portrait.jpg` | .jpg | 777,658 | 3152 × 2592 | Yes | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/poster.jpg` | .jpg | 49,068 | 1288 × 728 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/scrap-grain.png` | .png | 50,628 | 220 × 220 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/sig-tf.png` | .png | 16,045 | 800 × 684 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/tf-splash.png` | .png | 23,229 | 840 × 724 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/tornnote.webp` | .webp | 83,618 | 1344 × 896 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/video-frame-bold.png` | .png | 97,722 | 2400 × 1676 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/video-frame-hair.png` | .png | 93,973 | 2400 × 1676 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/video-frame-med.png` | .png | 95,144 | 2400 × 1676 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/video-frame-thin.png` | .png | 89,073 | 2400 × 1676 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/video-poster.jpg` | .jpg | 7,202 | 640 × 360 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/videogames-hover.webp` | .webp | 152,640 | 6180 × 300 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/activation/activobank/case.jpg` | .jpg | 1,411,812 | 1754 × 1240 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/activation/activobank/mustard.webp` | .webp | 140,486 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/activation/benfica-sagres/ninho-da-aguia.mp4` | .mp4 | 10,056,080 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/activation/brisa/case.jpg` | .jpg | 931,136 | 1754 × 1240 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/activation/edp/film.mp4` | .mp4 | 9,471,167 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/activation/free-now/key.webp` | .webp | 387,240 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/activation/free-now/ride-parade.mp4` | .mp4 | 20,402,152 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/activation/meo/sbsr.mp4` | .mp4 | 33,313,472 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/activation/montepio/superbrands.mp4` | .mp4 | 7,305,021 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/activation/rtp/film.mp4` | .mp4 | 28,425,202 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/a-ultima-palavra.mp4` | .mp4 | 2,368,097 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-1.jpg` | .jpg | 986,669 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-2.jpg` | .jpg | 678,393 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-3.jpg` | .jpg | 445,241 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-4.jpg` | .jpg | 633,139 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-5.jpg` | .jpg | 615,085 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-6.jpg` | .jpg | 1,101,181 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/print-7.jpg` | .jpg | 941,862 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/apav/site.mp4` | .mp4 | 21,879,313 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/audi/cockpit.mp4` | .mp4 | 3,803,606 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/betclic/apogee.mp4` | .mp4 | 14,651,560 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/betclic/bem-vindo-a-bordo.mp4` | .mp4 | 8,456,267 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/betclic/key.webp` | .webp | 1,280,900 | 2800 × 1575 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/betclic/testosterodds.mp4` | .mp4 | 4,747,593 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/del-monte/bunch-of-good-1.jpg` | .jpg | 174,517 | 600 × 849 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/del-monte/bunch-of-good-2.jpeg` | .jpeg | 140,488 | 600 × 762 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/del-monte/film.mp4` | .mp4 | 14,285,316 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/del-monte/key.webp` | .webp | 793,572 | 1920 × 6684 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/giving-tuesday/film.mp4` | .mp4 | 6,892,114 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/ipdj/film.mp4` | .mp4 | 13,891,070 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/ipdj/key.webp` | .webp | 134,902 | 1180 × 752 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/montepio/film.mp4` | .mp4 | 9,692,751 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/cerveja.jpg` | .jpg | 23,188 | 300 × 238 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/film-2.mp4` | .mp4 | 3,756,341 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/key-1.png` | .png | 5,226,712 | 2442 × 988 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/key-2.webp` | .webp | 425,094 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/key-3.webp` | .webp | 348,204 | 1920 × 1080 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/o-que-nos-vai-na-alma.mp4` | .mp4 | 6,385,356 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/portugal-pede.mp4` | .mp4 | 2,611,037 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sagres/selecionador.mp4` | .mp4 | 14,826,334 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/amigos-amigos.mp4` | .mp4 | 15,350,320 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/mal-males.mp4` | .mp4 | 209,093 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/os-falantes-decidem.mp4` | .mp4 | 11,987,307 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/so-ha-um-plural.mp4` | .mp4 | 14,205,661 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/sol-sois.mp4` | .mp4 | 182,471 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/sumois-ou-sumoles.mp4` | .mp4 | 14,788,291 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/team-sumois.mp4` | .mp4 | 6,342,482 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/sumol/votacao.jpg` | .jpg | 102,069 | 1170 × 1462 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/digital-social/tanqueray/film.mp4` | .mp4 | 5,896,462 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/digital-social/tanqueray/key.webp` | .webp | 209,188 | 1400 × 3260 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/comics/01.webp` | .webp | 386,556 | 2038 × 7394 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/comics/02.webp` | .webp | 33,612 | 526 × 421 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/comics/03.webp` | .webp | 30,770 | 486 × 426 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/comics/04.webp` | .webp | 65,006 | 600 × 1463 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/comics/05.webp` | .webp | 25,510 | 405 × 405 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/02.webp` | .webp | 116,626 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/03.webp` | .webp | 73,366 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/04.webp` | .webp | 73,130 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/05.webp` | .webp | 60,126 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/06.webp` | .webp | 64,700 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/07.webp` | .webp | 99,832 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/08.webp` | .webp | 95,374 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/09.webp` | .webp | 80,668 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/10.webp` | .webp | 93,438 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/11.webp` | .webp | 96,480 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/12.webp` | .webp | 32,730 | 549 × 696 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/13.webp` | .webp | 24,812 | 571 × 421 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/14.webp` | .webp | 31,906 | 528 × 538 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/15.webp` | .webp | 92,294 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/16.webp` | .webp | 55,860 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/drawings/17.webp` | .webp | 62,176 | 640 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/01.jpg` | .jpg | 652,944 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/02.jpg` | .jpg | 541,069 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/03.jpg` | .jpg | 558,368 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/04.jpg` | .jpg | 516,067 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/05.jpg` | .jpg | 683,085 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/06.jpg` | .jpg | 410,484 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/07.jpg` | .jpg | 459,889 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/08.jpg` | .jpg | 558,036 | 2200 × 1507 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/09.jpg` | .jpg | 504,604 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/10.jpg` | .jpg | 705,200 | 1850 × 1850 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/12.jpg` | .jpg | 642,228 | 2200 × 1467 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/13.jpg` | .jpg | 382,221 | 2200 × 1299 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/14.jpg` | .jpg | 538,412 | 2200 × 1410 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/15.jpg` | .jpg | 573,589 | 1467 × 2200 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/malditados/18.jpg` | .jpg | 1,170,962 | 1650 × 2200 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/01.jpg` | .jpg | 190,578 | 2048 × 1131 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/02.webp` | .webp | 160,008 | 960 × 842 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/03.jpg` | .jpg | 111,649 | 960 × 634 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/05.webp` | .webp | 126,052 | 1936 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/06.webp` | .webp | 87,356 | 960 × 794 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/07.webp` | .webp | 95,652 | 960 × 610 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/08.webp` | .webp | 121,470 | 2114 × 640 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/09.webp` | .webp | 81,382 | 686 × 960 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/10.webp` | .webp | 83,644 | 720 × 960 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/playground/pubsicologo/11.webp` | .webp | 148,272 | 940 × 960 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/betclic/key.png` | .png | 304,391 | 489 × 719 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/1.jpg` | .jpg | 300,752 | 1400 × 1085 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/2.jpg` | .jpg | 355,365 | 1400 × 1085 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/3.jpg` | .jpg | 1,329,065 | 1200 × 1765 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/4.jpg` | .jpg | 938,054 | 1200 × 1765 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/5.webp` | .webp | 579,520 | 2482 × 3509 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/crf/6.webp` | .webp | 2,585,304 | 3840 × 5891 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/fula/campanha-2024.jpg` | .jpg | 481,350 | 1350 × 1976 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/oliveira-da-serra/sem-rotulos.jpg` | .jpg | 479,180 | 1400 × 1980 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/2.jpg` | .jpg | 725,018 | 1200 × 1700 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/3.jpg` | .jpg | 245,081 | 600 × 850 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/4.jpg` | .jpg | 201,942 | 1036 × 1370 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/5.jpg` | .jpg | 322,055 | 600 × 849 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/frito-cozido-passado-verso.jpg` | .jpg | 249,493 | 1018 × 1400 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/frito-cozido-passado.jpg` | .jpg | 406,421 | 1011 × 1400 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/malpassado-bempassado-antepassado-verso.jpg` | .jpg | 466,545 | 987 × 1400 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/paleo-kitchen/malpassado-bempassado-antepassado.jpg` | .jpg | 278,878 | 1012 × 1400 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/sagres-00/inacreditavel.jpg` | .jpg | 114,280 | 674 × 1000 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/sovena/ods.jpg` | .jpg | 400,675 | 1363 × 1837 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-1.png` | .png | 3,903,130 | 1070 × 1576 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-2.png` | .png | 1,180,326 | 1074 × 1566 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-3.png` | .png | 3,464,585 | 988 × 1448 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-4.png` | .png | 1,018,067 | 984 × 1444 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-5.png` | .png | 1,027,481 | 990 × 1446 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-6.png` | .png | 825,461 | 1004 × 1432 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-7.png` | .png | 816,116 | 984 × 1442 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/ooh-8.png` | .png | 844,910 | 858 × 1220 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/social-1.png` | .png | 932,423 | 2553 × 945 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/social-2.jpg` | .jpg | 143,614 | 1080 × 1350 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/print-ooh/unsorted/social-3.jpeg` | .jpeg | 154,480 | 1080 × 1350 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/tv-ads/fula/bombom-30s.mp4` | .mp4 | 3,620,787 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/pisca-pisca/se-e-para-mudar.mp4` | .mp4 | 16,069,342 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres/2m-version-a.mp4` | .mp4 | 8,265,690 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres-00/beijo.mp4` | .mp4 | 1,367,985 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres-00/inacreditavel.mp4` | .mp4 | 8,069,278 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres-00/loop-1.mp4` | .mp4 | 1,408,364 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres-00/loop-2.mp4` | .mp4 | 1,379,194 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sagres-00/loop-3.mp4` | .mp4 | 1,385,028 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sumol/45s.mp4` | .mp4 | 7,489,127 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/sumol/estrada-com-amigos.mp4` | .mp4 | 6,475,991 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/vigor/caffe-latte.mp4` | .mp4 | 1,361,738 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/vigor/leite-chocolate.mp4` | .mp4 | 1,302,110 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/tv-ads/vigor/smoothie.mp4` | .mp4 | 1,229,643 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/videogame/night-is-grey/01.jpg` | .jpg | 464,164 | 1920 × 790 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/videogame/night-is-grey/02.mp4` | .mp4 | 9,557,022 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work/videogame/night-is-grey/03.jpg` | .jpg | 1,266,828 | 1487 × 2136 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work/videogame/night-is-grey/04.png` | .png | 1,400,803 | 2658 × 1286 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work-close-x-big.png` | .png | 19,605 | 240 × 240 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work-close-x.png` | .png | 15,578 | 240 × 240 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/work-sfx-activations.m4a` | .m4a | 18,302 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work-sfx-digital-social.m4a` | .m4a | 10,128 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work-sfx-playground.m4a` | .m4a | 32,068 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work-sfx-print.m4a` | .m4a | 8,546 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work-sfx-tv-ads.m4a` | .m4a | 9,704 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/work-sfx-videogames.m4a` | .m4a | 19,642 | — | Yes (time-based) | Video / tactile audio | Study only; no reuse licence supplied |
| `media/worklabel-activations.png` | .png | 91,646 | 843 × 892 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worklabel-digital.png` | .png | 128,102 | 735 × 1023 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worklabel-playground.png` | .png | 135,952 | 736 × 685 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worklabel-print.png` | .png | 127,034 | 597 × 1035 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worklabel-tv.png` | .png | 71,139 | 429 × 717 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worklabel-videogames.png` | .png | 130,809 | 760 × 810 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq1-empty.png` | .png | 16,677 | 420 × 392 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq2-empty.png` | .png | 16,395 | 392 × 392 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq3-empty.png` | .png | 17,675 | 420 × 420 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq4-empty.png` | .png | 17,212 | 392 × 448 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq5-empty.png` | .png | 17,887 | 420 × 448 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `media/worksq6-empty.png` | .png | 17,909 | 392 × 448 | No | Personal illustration / compositing layer | Study only; no reuse licence supplied |
| `unmute-frames-1.js` | .js | 142,679 | 342×85 | Yes, driven by app.js | Embedded PNG animation sequence: 5 frames; boiling UNMUTE lettering | Study only; no reuse licence supplied |
| `unmute-frames-2.js` | .js | 148,843 | 342×85 | Yes, driven by app.js | Embedded PNG animation sequence: 5 frames; boiling UNMUTE lettering | Study only; no reuse licence supplied |
| `unmute-frames-3.js` | .js | 131,421 | 342×85 | Yes, driven by app.js | Embedded PNG animation sequence: 4 frames; boiling UNMUTE lettering | Study only; no reuse licence supplied |
| `unmute-frames-4.js` | .js | 163,419 | 342×85 | Yes, driven by app.js | Embedded PNG animation sequence: 8 frames; struck-out UNMUTE | Study only; no reuse licence supplied |
| `unmute-frames-5.js` | .js | 138,759 | 342×85 | Yes, driven by app.js | Embedded PNG animation sequence: 6 frames; struck-out UNMUTE | Study only; no reuse licence supplied |