from pathlib import Path
from PIL import Image,ImageDraw
import re,base64,io
root=Path('S:/website inspo')
rows=[]; thumbs=[]
for p in sorted(root.rglob('*')):
 if not p.is_file():continue
 ext=p.suffix.lower(); dims='—';anim='No';purpose='Reference implementation';reuse='Study only; no reuse licence supplied'
 if ext in ['.png','.webp','.jpg','.jpeg','.gif']:
  im=Image.open(p);dims=f'{im.width} × {im.height}';anim='Yes' if getattr(im,'is_animated',False) else 'No';purpose='Personal illustration / compositing layer'
  if len(thumbs)<30 and any(w in p.name for w in ['wall','about-inked','frame','torn','gag-jimmy','scrap','work-']):
   im=im.convert('RGBA');im.thumbnail((210,145));thumbs.append((p.name,im.copy()))
 elif ext in ['.woff','.woff2','.ttf']:purpose='Typography';reuse='TF Nib: proprietary/unknown; Google fonts: verify upstream licence'
 elif ext in ['.mp4','.webm','.m4a','.mp3']:purpose='Video / tactile audio';anim='Yes (time-based)'
 if p.name.startswith('unmute-frames'):
  text=p.read_text(encoding='utf8');frames=re.findall(r'data:image/png;base64,([A-Za-z0-9+/=]+)',text)
  sizes=[]
  for f in frames:
   im=Image.open(io.BytesIO(base64.b64decode(f)));sizes.append(f'{im.width}×{im.height}')
  purpose=f'Embedded PNG animation sequence: {len(frames)} frames; '+('struck-out UNMUTE' if p.stem[-1] in '45' else 'boiling UNMUTE lettering');dims=', '.join(sorted(set(sizes)));anim='Yes, driven by app.js'
 rows.append(f'| `{p.relative_to(root).as_posix()}` | {ext} | {p.stat().st_size:,} | {dims} | {anim} | {purpose} | {reuse} |')
out='# Inspiration asset inventory\n\nAudited recursively on 2026-11-15 from `S:/website inspo`. '+str(len(rows))+' files. Dimensions are decoded from raster headers, not guessed. Video dimensions not probed; shown as —.\n\nNo general reuse licence accompanies the clone. Do not ship Tiago’s personal illustrations, handwriting font, voice, branding, or animation frames. Existing copied public/media and public/audio files are historical material and will be excluded from the rebuilt artifact. Original SVG artwork and synthesized sound replace them. Google-font assets are separately licensed upstream: Anton (OFL), Permanent Marker and Special Elite (Apache 2.0), with notices stored in public/fonts.\n\nThe five unmute files contain PNG data URLs, not audio. app.js rotates boil frames, then uses struck-through frames for the unmute affordance. index.html defers files 1–3 (BOIL) and 4–5 (STRUCK) until usable. Recreate the principle, not the raster letters.\n\n| Path | Type | Bytes | Dimensions | Animated | Intended purpose | Reuse assessment |\n|---|---|---:|---|---|---|---|\n'+'\n'.join(rows)
Path('docs/ASSET_INVENTORY.md').write_text(out,encoding='utf8')
sheet=Image.new('RGB',(900,((len(thumbs)+3)//4)*190),'#f7f6f1');d=ImageDraw.Draw(sheet)
for i,(name,im) in enumerate(thumbs):
 x=(i%4)*225;y=(i//4)*190;sheet.paste(im,(x,y),im);d.text((x+3,y+150),name[:30],fill='#2a2520')
sheet.save('screenshots/references/asset-contact-sheet.jpg')
for name in ['anton','marker','elite']:
 p=Path(f'docs/{name}-license.b64')
 if p.exists() and p.stat().st_size:
  Path(f'public/fonts/{name}-LICENSE.txt').write_bytes(base64.b64decode(p.read_text()));p.unlink()
for name in ['research','physics']:
 p=Path(f'{name}-readme.b64')
 if p.exists():Path(f'docs/{name}-source.txt').write_bytes(base64.b64decode(p.read_text()));p.unlink()
print(f'Inventoried {len(rows)} files; contact sheet {len(thumbs)} images; decoded licence and source files.')
