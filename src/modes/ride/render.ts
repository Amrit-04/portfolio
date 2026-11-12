// Free Rider HD Canvas Renderer: Paper world, ink terrain, non-colliding scenery lines,
// golden collectible stars, detailed bicycle with spring suspension, and animated stick rider.

import { GameEngine } from './engine';
import { Decoration } from './track';

const INK = '#2A2520';
const RED = '#C84B31';
const GOLD = '#D4A843';
const BLUE = '#3A6EA5';

function drawDecoration(ctx: CanvasRenderingContext2D, d: Decoration) {
  const { x, y } = d;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (d.kind) {
    case 'workbench': {
      ctx.strokeRect(x - 60, y - 52, 120, 8);
      ctx.beginPath();
      ctx.moveTo(x - 54, y - 44);
      ctx.lineTo(x - 54, y);
      ctx.moveTo(x + 54, y - 44);
      ctx.lineTo(x + 54, y);
      ctx.stroke();
      ctx.strokeRect(x - 40, y - 78, 34, 26); // monitor
      ctx.beginPath();
      ctx.moveTo(x - 23, y - 52);
      ctx.lineTo(x - 23, y - 44);
      ctx.stroke();
      break;
    }
    case 'db': {
      for (let i = 0; i < 3; i++) {
        const ox = x + i * 36;
        const oy = y;
        ctx.beginPath();
        ctx.ellipse(ox + 15, oy - 60, 15, 6, 0, 0, Math.PI * 2);
        ctx.moveTo(ox, oy - 60);
        ctx.lineTo(ox, oy - 25);
        ctx.ellipse(ox + 15, oy - 25, 15, 6, 0, Math.PI, 0, true);
        ctx.lineTo(ox + 30, oy - 60);
        ctx.stroke();
      }
      break;
    }
    case 'tower': {
      ctx.beginPath();
      ctx.moveTo(x - 24, y);
      ctx.lineTo(x - 6, y - 130);
      ctx.lineTo(x + 6, y - 130);
      ctx.lineTo(x + 24, y);
      ctx.moveTo(x - 16, y - 40);
      ctx.lineTo(x + 16, y - 40);
      ctx.moveTo(x - 12, y - 80);
      ctx.lineTo(x + 12, y - 80);
      ctx.moveTo(x - 16, y - 40);
      ctx.lineTo(x + 12, y - 80);
      ctx.moveTo(x - 12, y - 80);
      ctx.lineTo(x + 16, y - 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y - 138, 5, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case 'breaker': {
      ctx.strokeRect(x - 18, y - 44, 36, 44);
      ctx.beginPath();
      ctx.moveTo(x - 8, y);
      ctx.lineTo(x - 8, y - 30);
      ctx.lineTo(x + 8, y - 36);
      ctx.stroke();
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.arc(x, y - 36, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'bridge': {
      const w = d.w ?? 900;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 160);
      ctx.moveTo(x + w, y);
      ctx.lineTo(x + w, y + 160);
      ctx.stroke();
      break;
    }
    case 'shelf': {
      ctx.strokeRect(x - 30, y - 70, 60, 70);
      ctx.beginPath();
      ctx.moveTo(x - 30, y - 45);
      ctx.lineTo(x + 30, y - 45);
      ctx.moveTo(x - 30, y - 22);
      ctx.lineTo(x + 30, y - 22);
      ctx.stroke();
      break;
    }
    case 'chart': {
      ctx.strokeRect(x - 45, y - 80, 90, 60);
      ctx.beginPath();
      ctx.moveTo(x - 38, y - 30);
      ctx.lineTo(x - 20, y - 55);
      ctx.lineTo(x, y - 40);
      ctx.lineTo(x + 20, y - 70);
      ctx.lineTo(x + 38, y - 35);
      ctx.stroke();
      break;
    }
    case 'pipes': {
      ctx.beginPath();
      ctx.moveTo(x - 20, y);
      ctx.lineTo(x - 20, y - 80);
      ctx.lineTo(x + 60, y - 80);
      ctx.lineTo(x + 60, y);
      ctx.stroke();
      break;
    }
    case 'camera': {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 110);
      ctx.lineTo(x + 20, y - 110);
      ctx.stroke();
      ctx.strokeRect(x + 15, y - 120, 24, 16);
      break;
    }
    case 'flag': {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 110);
      ctx.stroke();
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(x, y - 110);
      ctx.lineTo(x + 44, y - 98);
      ctx.lineTo(x, y - 84);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'sign': {
      const w = Math.max(120, (d.text?.length ?? 6) * 8.5);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 64);
      ctx.stroke();
      ctx.strokeRect(x - w / 2, y - 88, w, 26);
      ctx.fillStyle = INK;
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.fillText(d.text ?? '', x, y - 71);
      ctx.textAlign = 'left';
      break;
    }
    case 'banner': {
      const w = 340;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, y - 150);
      ctx.lineTo(x - w / 2, y);
      ctx.moveTo(x + w / 2, y - 150);
      ctx.lineTo(x + w / 2, y);
      ctx.moveTo(x - w / 2, y - 150);
      ctx.lineTo(x + w / 2, y - 150);
      ctx.stroke();
      ctx.fillStyle = 'rgba(200,75,49,0.15)';
      ctx.fillRect(x - w / 2, y - 148, w, 34);
      ctx.strokeRect(x - w / 2, y - 148, w, 34);
      ctx.fillStyle = INK;
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.fillText(d.text ?? '', x, y - 126);
      ctx.textAlign = 'left';
      break;
    }
  }
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.fillStyle = GOLD;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a1 = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const a2 = a1 + Math.PI / 5;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const x2 = cx + Math.cos(a2) * (r * 0.45);
    const y2 = cy + Math.sin(a2) * (r * 0.45);
    if (i === 0) ctx.moveTo(x1, y1);
    else ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function drawWorld(ctx: CanvasRenderingContext2D, eng: GameEngine) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const scale = (ch / 760) * eng.zoom;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#FAF8F3';
  ctx.fillRect(0, 0, cw, ch);

  ctx.save();
  ctx.translate(cw * 0.38 - eng.camX * scale, ch * 0.5 - eng.camY * scale);
  ctx.scale(scale, scale);

  const viewLeft = eng.camX - cw / 2 / scale;
  const viewRight = eng.camX + (cw * 0.62) / scale;

  // 1. SECTION TITLES AS HAND-DRAWN MURAL CALLOUTS
  ctx.fillStyle = 'rgba(42,37,32,0.12)';
  ctx.font = "bold 56px 'Playfair Display', Georgia, serif";
  ctx.textAlign = 'center';
  for (const s of eng.track.sections) {
    if (s.startX + 700 > viewLeft && s.startX + 700 < viewRight) {
      ctx.fillText(s.name, s.startX + 700, 100);
    }
  }
  ctx.textAlign = 'left';

  // 2. NON-COLLIDING BACKGROUND SCENERY LINES (Free Rider HD aesthetic)
  for (const line of eng.track.scenery) {
    if (Math.max(line.x1, line.x2) < viewLeft - 60 || Math.min(line.x1, line.x2) > viewRight + 60) continue;
    ctx.strokeStyle = line.color || 'rgba(74,69,64,0.3)';
    ctx.lineWidth = line.width || 1.4;
    ctx.lineCap = 'round';
    if (line.dashed) ctx.setLineDash([6, 4]);
    else ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // 3. DISTANCE TICKS ALONG TRACK
  ctx.fillStyle = 'rgba(74,69,64,0.4)';
  ctx.font = "9px 'JetBrains Mono', monospace";
  for (let x = 0; x <= eng.track.length; x += 500) {
    if (x < viewLeft || x > viewRight) continue;
    const seg = eng.track.segments.find((s) => x >= Math.min(s.x1, s.x2) && x <= Math.max(s.x1, s.x2));
    if (seg) {
      const t = (x - seg.x1) / (seg.x2 - seg.x1 || 1);
      const gy = seg.y1 + (seg.y2 - seg.y1) * t;
      ctx.fillText(`${x / 10}m`, x, gy - 25);
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x, gy - 8);
      ctx.strokeStyle = 'rgba(74,69,64,0.35)';
      ctx.stroke();
    }
  }

  // 4. DECORATIONS (Workshop, database cylinders, towers, bridges)
  for (const d of eng.track.decorations) {
    if (d.x + 300 < viewLeft || d.x - 300 > viewRight) continue;
    drawDecoration(ctx, d);
  }

  // 5. COLLECTIBLE GOLDEN STARS
  for (const star of eng.track.stars) {
    if (star.collected) continue;
    if (star.x < viewLeft - 40 || star.x > viewRight + 40) continue;
    drawStar(ctx, star.x, star.y, 11);
  }

  // 6. CHECKPOINTS & BANNERS
  for (const cp of eng.track.checkpoints) {
    if (cp.x < viewLeft - 100 || cp.x > viewRight + 100) continue;
    const visited = eng.visited.has(cp.projectId);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(cp.x, cp.y);
    ctx.lineTo(cp.x, cp.y - 68);
    ctx.stroke();
    ctx.fillStyle = visited ? RED : '#FAF8F3';
    ctx.beginPath();
    ctx.moveTo(cp.x, cp.y - 68);
    ctx.lineTo(cp.x + 36, cp.y - 56);
    ctx.lineTo(cp.x, cp.y - 44);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = INK;
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.fillText(cp.label, cp.x + 6, cp.y - 78);
    ctx.textAlign = 'left';

    if (eng.activeCheckpoint?.projectId === cp.projectId) {
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cp.x, cp.y - 30, 48, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // 7. SOLID COLLISION TERRAIN LINES (Heavy Free Rider track stroke)
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3.6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (const s of eng.track.segments) {
    if (Math.max(s.x1, s.x2) < viewLeft - 50 || Math.min(s.x1, s.x2) > viewRight + 50) continue;
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
  }
  ctx.stroke();

  // Terrain under-hatching (classic Free Rider hand-drawn texture)
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(42,37,32,0.25)';
  ctx.beginPath();
  for (const s of eng.track.segments) {
    if (Math.max(s.x1, s.x2) < viewLeft - 50 || Math.min(s.x1, s.x2) > viewRight + 50) continue;
    const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
    const n = Math.floor(len / 16);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const hx = s.x1 + (s.x2 - s.x1) * t;
      const hy = s.y1 + (s.y2 - s.y1) * t;
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx - 8, hy + 10);
    }
  }
  ctx.stroke();

  // 8. PARTICLES & DUST TRAILS
  for (const p of eng.particles) {
    ctx.fillStyle = p.color || 'rgba(74,69,64,0.5)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5 * p.life * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 9. DRAFT LINE IN TRACK EDITOR (if active)
  if (eng.editorActive && eng.editorDraftLine) {
    ctx.strokeStyle = eng.editorTool === 'physics' ? RED : BLUE;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(eng.editorDraftLine.x1, eng.editorDraftLine.y1);
    ctx.lineTo(eng.editorDraftLine.x2, eng.editorDraftLine.y2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 10. FREE RIDER BICYCLE & ANIMATED RAGDOLL RIDER
  const { w1, w2, frame, head } = eng;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.6;

  // Wheels (Radius 14px)
  for (const w of [w1, w2]) {
    // Outer tire
    ctx.beginPath();
    ctx.arc(w.x, w.y, 14, 0, Math.PI * 2);
    ctx.stroke();
    // Inner rim
    ctx.beginPath();
    ctx.arc(w.x, w.y, 11, 0, Math.PI * 2);
    ctx.stroke();

    // 6 Rotating spokes
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = eng.wheelSpin + (i * Math.PI) / 3;
      ctx.moveTo(w.x - Math.cos(a) * 11, w.y - Math.sin(a) * 11);
      ctx.lineTo(w.x + Math.cos(a) * 11, w.y + Math.sin(a) * 11);
    }
    ctx.stroke();
    ctx.lineWidth = 2.6;
    // Hub center
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(w.x, w.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bicycle Diamond Frame
  ctx.lineWidth = 2.8;
  ctx.strokeStyle = RED;
  ctx.beginPath();
  ctx.moveTo(w1.x, w1.y);
  ctx.lineTo(frame.x, frame.y);
  ctx.lineTo(w2.x, w2.y);
  ctx.closePath();
  ctx.stroke();

  // Bottom Bracket Crank
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  const crankA = eng.wheelSpin * 0.8;
  const crankR = 7;
  const bx = frame.x;
  const by = frame.y;
  const p1x = bx + Math.cos(crankA) * crankR;
  const p1y = by + Math.sin(crankA) * crankR;
  const p2x = bx - Math.cos(crankA) * crankR;
  const p2y = by - Math.sin(crankA) * crankR;
  ctx.beginPath();
  ctx.moveTo(p1x, p1y);
  ctx.lineTo(p2x, p2y);
  ctx.stroke();

  // Handlebars & Stem
  const barX = frame.x + (w2.x - frame.x) * 0.78;
  const barY = frame.y + (w2.y - frame.y) * 0.78 - 9;
  ctx.beginPath();
  ctx.moveTo(w2.x, w2.y);
  ctx.lineTo(barX, barY);
  ctx.stroke();

  // Rider Torso, Arms & Legs
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  // Spine: Seat lug to Head
  ctx.moveTo(frame.x, frame.y - 4);
  ctx.lineTo(head.x, head.y);

  // Arms to Handlebars
  ctx.moveTo(head.x, head.y + 8);
  ctx.lineTo(barX, barY);

  // Pedaling Legs: Hip to Foot
  ctx.moveTo(frame.x, frame.y - 4);
  ctx.lineTo(p1x, p1y);
  ctx.stroke();

  // Helmet with visor
  ctx.beginPath();
  ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
  ctx.fillStyle = eng.crashed ? INK : RED;
  ctx.fill();
  ctx.stroke();

  if (!eng.crashed) {
    // Rider face & visor
    ctx.fillStyle = '#FAF8F3';
    ctx.beginPath();
    ctx.arc(head.x + 3, head.y - 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Cartoon crash stars circling head
    ctx.strokeStyle = RED;
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + eng.wheelSpin * 0.4;
      const sx = head.x + Math.cos(a) * 20;
      const sy = head.y + Math.sin(a) * 20;
      ctx.beginPath();
      ctx.moveTo(sx - 3, sy);
      ctx.lineTo(sx + 3, sy);
      ctx.moveTo(sx, sy - 3);
      ctx.lineTo(sx, sy + 3);
      ctx.stroke();
    }
  }

  ctx.restore();
}
