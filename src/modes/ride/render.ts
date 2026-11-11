// Canvas renderer: paper world, ink terrain, hand-drawn landmarks, stick rider.

import { GameEngine } from './engine';
import { Decoration } from './track';

const INK = '#2A2520';
const RED = '#C84B31';

function wobble(x: number): number {
  return Math.sin(x * 12.9898) * 43758.5453 % 1;
}

function drawDecoration(ctx: CanvasRenderingContext2D, d: Decoration) {
  const { x, y } = d;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
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
      // coffee
      ctx.beginPath();
      ctx.moveTo(x + 26, y - 62);
      ctx.lineTo(x + 30, y - 52);
      ctx.lineTo(x + 40, y - 52);
      ctx.lineTo(x + 44, y - 62);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'db': {
      for (let i = 0; i < 3; i++) {
        const ox = x + i * 40;
        const oy = y;
        ctx.beginPath();
        ctx.ellipse(ox + 15, oy - 66, 16, 6, 0, 0, Math.PI * 2);
        ctx.moveTo(ox - 1, oy - 66);
        ctx.lineTo(ox - 1, oy - 30);
        ctx.ellipse(ox + 15, oy - 30, 16, 6, 0, Math.PI, 0, true);
        ctx.lineTo(ox + 31, oy - 66);
        ctx.stroke();
        const oy2 = oy - 10;
        ctx.beginPath();
        ctx.ellipse(ox + 15, oy2 - 56, 16, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
    }
    case 'tower': {
      ctx.beginPath();
      ctx.moveTo(x - 26, y);
      ctx.lineTo(x - 6, y - 130);
      ctx.lineTo(x + 6, y - 130);
      ctx.lineTo(x + 26, y);
      ctx.moveTo(x - 18, y - 40);
      ctx.lineTo(x + 18, y - 40);
      ctx.moveTo(x - 12, y - 80);
      ctx.lineTo(x + 12, y - 80);
      ctx.moveTo(x - 18, y - 40);
      ctx.lineTo(x + 12, y - 80);
      ctx.moveTo(x - 12, y - 80);
      ctx.lineTo(x + 18, y - 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y - 138, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y - 143);
      ctx.lineTo(x, y - 158);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y - 150 - i * 3);
        ctx.lineTo(x + 10 + i * 4, y - 156 - i * 5);
        ctx.stroke();
      }
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
      ctx.arc(x + 10, y - 36, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'bridge': {
      const w = d.w ?? 1000;
      ctx.lineWidth = 1.4;
      for (let i = 0; i <= w; i += 60) {
        ctx.beginPath();
        ctx.moveTo(x + i, y - 26);
        ctx.lineTo(x + i + 30, y - 4);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + w, y - 30);
      ctx.stroke();
      break;
    }
    case 'shelf': {
      ctx.strokeRect(x - 34, y - 96, 68, 96);
      for (let r = 0; r < 3; r++) {
        ctx.beginPath();
        ctx.moveTo(x - 34, y - 30 - r * 26);
        ctx.lineTo(x + 34, y - 30 - r * 26);
        ctx.stroke();
        for (let c = 0; c < 3; c++) {
          ctx.strokeRect(x - 28 + c * 22, y - 52 - r * 26, 16, 18);
        }
      }
      break;
    }
    case 'chart': {
      ctx.beginPath();
      let py = y - 60;
      ctx.moveTo(x - 50, py);
      const moves = [8, -14, 10, -22, 6, -10, 14, -8];
      for (let i = 0; i < 8; i++) {
        py += moves[i] * 0.9;
        ctx.lineTo(x - 50 + (i + 1) * 14, py);
      }
      ctx.stroke();
      ctx.lineWidth = 1.3;
      for (let i = 0; i < 6; i++) {
        const cx2 = x - 44 + i * 18;
        const up = wobble(x + i) > 0;
        const h = 16 + (i % 3) * 8;
        ctx.beginPath();
        ctx.moveTo(cx2, y - 40 - (up ? h : 0));
        ctx.lineTo(cx2, y - 40 + (up ? 0 : h));
        ctx.stroke();
        ctx.strokeRect(cx2 - 4, y - 44 - (up ? h : 6), 8, 14);
      }
      break;
    }
    case 'pipes': {
      ctx.strokeRect(x - 40, y - 90, 80, 56);
      ctx.beginPath();
      ctx.moveTo(x - 40, y - 74);
      ctx.lineTo(x + 40, y - 74);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(x - 20 + i * 20, y - 62, 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x - 24, y - 34);
      ctx.lineTo(x - 24, y - 10);
      ctx.moveTo(x + 24, y - 34);
      ctx.lineTo(x + 24, y - 10);
      ctx.stroke();
      break;
    }
    case 'camera': {
      ctx.beginPath();
      ctx.moveTo(x - 22, y);
      ctx.lineTo(x, y - 110);
      ctx.lineTo(x + 22, y);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeRect(x - 12, y - 128, 24, 14);
      ctx.beginPath();
      ctx.moveTo(x - 12, y - 121);
      ctx.lineTo(x - 34, y - 112);
      ctx.stroke();
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(x - 34, y - 112);
      ctx.lineTo(x - 60, y - 60);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }
    case 'flag': {
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 90);
      ctx.stroke();
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(x, y - 90);
      ctx.lineTo(x + 44, y - 78);
      ctx.lineTo(x, y - 64);
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
      ctx.font = "bold 10px 'JetBrains Mono'";
      ctx.textAlign = 'center';
      ctx.fillText(d.text ?? '', x, y - 71);
      ctx.textAlign = 'left';
      break;
    }
    case 'banner': {
      const w = 320;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - w / 2, y - 150);
      ctx.lineTo(x - w / 2, y);
      ctx.moveTo(x + w / 2, y - 150);
      ctx.lineTo(x + w / 2, y);
      ctx.moveTo(x - w / 2, y - 150);
      ctx.lineTo(x + w / 2, y - 150);
      ctx.stroke();
      ctx.fillStyle = 'rgba(217,56,30,0.14)';
      ctx.fillRect(x - w / 2, y - 148, w, 34);
      ctx.strokeRect(x - w / 2, y - 148, w, 34);
      ctx.fillStyle = INK;
      ctx.font = "bold 14px 'JetBrains Mono'";
      ctx.textAlign = 'center';
      ctx.fillText(d.text ?? '', x, y - 126);
      ctx.textAlign = 'left';
      break;
    }
  }
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

  // Clean Free Rider minimalist line-art aesthetic — no dense blueprint grid

  // section title painted on the world with organic artistic lettering
  ctx.fillStyle = 'rgba(42,37,32,0.11)';
  ctx.font = "italic 52px 'Playfair Display', Georgia, serif";
  ctx.textAlign = 'center';
  for (const s of eng.track.sections) {
    if (s.startX + 900 > viewLeft && s.startX + 900 < viewRight) {
      ctx.fillText(`${s.name}`, s.startX + 900, 120);
    }
  }
  ctx.textAlign = 'left';

  // distance ticks
  ctx.fillStyle = 'rgba(26,26,26,0.4)';
  ctx.font = "9px 'JetBrains Mono'";
  for (let x = 0; x <= eng.track.length; x += 500) {
    if (x < viewLeft || x > viewRight) continue;
    const seg = eng.track.segments.find((s) => x >= Math.min(s.x1, s.x2) && x <= Math.max(s.x1, s.x2));
    if (seg) {
      const t = (x - seg.x1) / (seg.x2 - seg.x1 || 1);
      const gy = seg.y1 + (seg.y2 - seg.y1) * t;
      ctx.fillText(`${x / 10}m`, x, gy - 30);
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x, gy - 10);
      ctx.strokeStyle = 'rgba(26,26,26,0.4)';
      ctx.stroke();
    }
  }

  // decorations
  for (const d of eng.track.decorations) {
    if (d.x + 260 < viewLeft || d.x - 260 > viewRight) continue;
    drawDecoration(ctx, d);
  }

  // checkpoints
  for (const cp of eng.track.checkpoints) {
    if (cp.x < viewLeft - 100 || cp.x > viewRight + 100) continue;
    const visited = eng.visited.has(cp.projectId);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cp.x, cp.y);
    ctx.lineTo(cp.x, cp.y - 66);
    ctx.stroke();
    ctx.fillStyle = visited ? RED : '#FAF8F3';
    ctx.beginPath();
    ctx.moveTo(cp.x, cp.y - 66);
    ctx.lineTo(cp.x + 34, cp.y - 56);
    ctx.lineTo(cp.x, cp.y - 44);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = "bold 10px 'JetBrains Mono'";
    ctx.textAlign = 'center';
    ctx.fillText(cp.label, cp.x + 6, cp.y - 78);
    ctx.textAlign = 'left';
    if (eng.activeCheckpoint?.projectId === cp.projectId) {
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cp.x, cp.y - 30, 46, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // terrain
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (const s of eng.track.segments) {
    if (s.x2 < viewLeft - 50 || s.x1 > viewRight + 50) continue;
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
  }
  ctx.stroke();

  // hatch below terrain
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(26,26,26,0.35)';
  ctx.beginPath();
  for (const s of eng.track.segments) {
    if (s.x2 < viewLeft - 50 || s.x1 > viewRight + 50) continue;
    const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
    const n = Math.floor(len / 14);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const hx = s.x1 + (s.x2 - s.x1) * t;
      const hy = s.y1 + (s.y2 - s.y1) * t;
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx - 7, hy + 9);
    }
  }
  ctx.stroke();

  // particles
  ctx.fillStyle = 'rgba(26,26,26,0.5)';
  for (const p of eng.particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2 * p.life * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // bike
  const { w1, w2, frame, head } = eng;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.4;
  for (const w of [w1, w2]) {
    ctx.beginPath();
    ctx.arc(w.x, w.y, 13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = eng.wheelSpin + (i * Math.PI) / 2;
      ctx.moveTo(w.x - Math.cos(a) * 11, w.y - Math.sin(a) * 11);
      ctx.lineTo(w.x + Math.cos(a) * 11, w.y + Math.sin(a) * 11);
    }
    ctx.stroke();
    ctx.lineWidth = 2.4;
  }

  // frame
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(w1.x, w1.y);
  ctx.lineTo(frame.x, frame.y);
  ctx.lineTo(w2.x, w2.y);
  ctx.closePath();
  ctx.stroke();

  // rider
  const barX = frame.x + (w2.x - frame.x) * 0.75;
  const barY = frame.y + (w2.y - frame.y) * 0.75 - 8;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(frame.x, frame.y);
  ctx.lineTo(head.x, head.y);
  ctx.moveTo(head.x, head.y + 8);
  ctx.lineTo(barX, barY);
  ctx.moveTo(frame.x, frame.y);
  ctx.lineTo(frame.x - 6, frame.y - 14);
  ctx.moveTo(frame.x - 6, frame.y - 14);
  ctx.lineTo(w1.x + 4, w1.y - 6);
  ctx.stroke();
  // helmet
  ctx.beginPath();
  ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = eng.crashed ? INK : RED;
  ctx.fill();
  ctx.stroke();
  if (!eng.crashed) {
    ctx.fillStyle = '#FAF8F3';
    ctx.beginPath();
    ctx.arc(head.x + 3, head.y - 2, 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // crash stars
    ctx.strokeStyle = RED;
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + eng.wheelSpin * 0.5;
      ctx.beginPath();
      ctx.moveTo(head.x + Math.cos(a) * 16, head.y + Math.sin(a) * 16);
      ctx.lineTo(head.x + Math.cos(a) * 24, head.y + Math.sin(a) * 24);
      ctx.stroke();
    }
  }

  ctx.restore();
}
