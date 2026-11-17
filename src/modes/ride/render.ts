import type { GameEngine } from "./engine";
import { heightAt } from "./track";
const ink = "#2a2520",
  red = "#c84b31",
  blue = "#3a6ea5",
  paper = "#f7f6f1",
  gold = "#d4a843";
export function drawWorld(
  ctx: CanvasRenderingContext2D,
  e: GameEngine,
  alpha: number,
  time: number,
) {
  const w = e.canvas.clientWidth,
    h = e.canvas.clientHeight,
    dpr = e.canvas.width / w,
    z = e.zoom;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, w, h);
  const X = (x: number) => (x - e.camX) * z + w * 0.32,
    Y = (y: number) => h * 0.62 - (y - e.camY) * z;
  const line = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color = ink,
    width = 2,
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(X(x1), Y(y1));
    ctx.lineTo(X(x2), Y(y2));
    ctx.stroke();
  };
  const text = (s: string, x: number, y: number, size = 13, color = ink) => {
    ctx.fillStyle = color;
    ctx.font = `${size}px 'Special Elite',monospace`;
    ctx.fillText(s, X(x), Y(y));
  };
  const box = (
    x: number,
    y: number,
    bw: number,
    bh: number,
    color = ink,
    fill = paper,
  ) => {
    ctx.fillStyle = fill;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.7;
    ctx.fillRect(X(x), Y(y + bh), bw * z, bh * z);
    ctx.strokeRect(X(x), Y(y + bh), bw * z, bh * z);
  };
  ctx.strokeStyle = "#e4dfd3";
  ctx.lineWidth = 1;
  for (let yy = 30; yy < h; yy += 28) {
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.lineTo(w, yy);
    ctx.stroke();
  }
  const editor = e.status === "editor";
  if (editor) {
    ctx.strokeStyle = "#e1ddd1";
    for (let xx = Math.floor(e.camX - w / z); xx < e.camX + w / z; xx++) {
      line(xx, e.camY - h / z, xx, e.camY + h / z, "#e1ddd1", 1);
    }
    text(
      "DRAW YOUR OWN WAY THROUGH.",
      e.camX - (w * 0.26) / z,
      e.camY + (h * 0.45) / z,
      18,
    );
  } else {
    for (const section of e.track.sections) {
      if (X(section.end) < -200 || X(section.start) > w + 200) continue;
      const x = section.start + 9,
        y = heightAt(e.track.physics, x) ?? 0;
      text(section.name.toUpperCase(), section.start + 1, y + 6, 18, "#81786a");
      switch (section.theme) {
        case "workshop":
          box(x - 5, y + 1, 8, 3.4);
          line(x - 5, y + 1, x + 3, y + 1, ink, 4);
          line(x - 4, y + 1, x - 4, y + 0.1);
          line(x + 2, y + 1, x + 2, y + 0.1);
          box(x - 4, y + 1.4, 3, 1.7, blue);
          text("hello, world", x - 3.8, y + 2.1, 11, blue);
          box(x + 0.4, y + 1.2, 1, 0.9, red);
          text("START →", x - 7, y + 4.8, 18, red);
          break;
        case "database":
          for (let n = 0; n < 3; n++) {
            const xx = x + n * 3;
            box(xx, y + 1, 2.2, 1.4, blue);
            text(["SCAN", "JOIN", "PLAN"][n], xx + 0.2, y + 1.6, 12, blue);
            if (n < 2) line(xx + 2.2, y + 1.7, xx + 3, y + 1.7, blue);
          }
          text("find the better path", x, y + 4, 14);
          break;
        case "mountains":
          line(x - 8, y, x - 2, y + 4.8, "#aaa18f", 2);
          line(x - 2, y + 4.8, x + 5, y, "#aaa18f", 2);
          line(x + 1, y + 2.7, x + 5, y + 5.6, "#aaa18f");
          line(x + 5, y + 5.6, x + 12, y, "#aaa18f");
          text("RETRY ≠ GIVE UP", x - 1, y + 6.4, 14, red);
          break;
        case "bridge":
          for (let n = 0; n < 4; n++) {
            box(x - 4 + n * 3.2, y + 2.3, 2.6, 1.2, n === 2 ? red : blue);
            text(
              ["NEW", "VALID", "FILLED", "DONE"][n],
              x - 3.8 + n * 3.2,
              y + 2.8,
              11,
            );
            if (n < 3)
              line(x - 1.4 + n * 3.2, y + 2.8, x - 0.8 + n * 3.2, y + 2.8);
          }
          text("ORDER STATE / NOT REAL MONEY", x - 4, y + 4.7, 12);
          break;
        case "warehouse":
          for (let n = 0; n < 5; n++) {
            box(x - 4 + n * 2.5, y + 1.7, 1.8, 2.8, "#887d69", "#eee8d9");
            for (let j = 1; j < 3; j++)
              line(
                x - 4 + n * 2.5,
                y + 1.7 + j * 0.85,
                x - 2.2 + n * 2.5,
                y + 1.7 + j * 0.85,
                "#887d69",
              );
            text(
              String(n + 1).padStart(2, "0"),
              x - 3.7 + n * 2.5,
              y + 3.1,
              12,
            );
          }
          text("THE SHORTEST ROUTE IS NOT ALWAYS OBVIOUS", x - 4, y + 5.3, 11);
          break;
        case "quant":
          line(x - 5, y + 1.4, x + 8, y + 1.4, "#8a816d");
          line(x - 5, y + 1.4, x - 5, y + 5, "#8a816d");
          [1.9, 2.7, 2.2, 3.4, 3, 4.2, 3.5].forEach((v, n, a) => {
            if (n)
              line(
                x - 5 + (n - 1) * 1.8,
                y + a[n - 1],
                x - 5 + n * 1.8,
                y + v,
                blue,
                2,
              );
          });
          text("SIMULATED ≠ LIVE", x - 4, y + 5.5, 14, red);
          break;
        case "factory":
          for (let n = 0; n < 4; n++) {
            box(x - 4 + n * 3, y + 1.6, 2, 2.5);
            text(
              ["IN", "QUEUE", "WORK", "OUT"][n],
              x - 3.8 + n * 3,
              y + 2.6,
              11,
            );
            if (n < 3)
              line(x - 2 + n * 3, y + 2.8, x - 1 + n * 3, y + 2.8, blue, 3);
          }
          text("OBSERVE · RETRY · RECOVER", x - 4, y + 5.1, 14, blue);
          break;
        case "vision":
          box(x - 4, y + 1.4, 5, 3.5, blue);
          box(x - 3.1, y + 2.1, 1.2, 1.9, red);
          text("PPE?", x - 3, y + 4.4, 12, red);
          box(x + 3, y + 3.2, 1.4, 0.8);
          line(x + 3.7, y + 3.2, x + 3.7, y + 0.7);
          line(x + 3.7, y + 3.6, x + 1, y + 4, blue);
          text("VISION OUTPOST", x - 4, y + 5.6, 14);
          break;
        case "finish":
          line(e.track.finish, y, e.track.finish, y + 5.3, ink, 3);
          line(e.track.finish + 4, y, e.track.finish + 4, y + 5.3, ink, 3);
          box(e.track.finish, y + 4.2, 4, 1.1, ink, gold);
          text("YOU MADE IT", e.track.finish + 0.2, y + 4.6, 12);
          text("keep being curious.", x - 4, y + 3, 20, blue);
          break;
      }
    }
  }
  const physics = editor ? e.editor.document.physics : e.track.physics,
    scenery = editor ? e.editor.document.scenery : e.track.scenery;
  for (const s of scenery) line(s.a.x, s.a.y, s.b.x, s.b.y, "#8a9caa", 2);
  for (const s of physics) {
    if (
      Math.max(X(s.a.x), X(s.b.x)) < -10 ||
      Math.min(X(s.a.x), X(s.b.x)) > w + 10
    )
      continue;
    if (!editor) {
      ctx.fillStyle = "#e9e3d6";
      ctx.beginPath();
      ctx.moveTo(X(s.a.x), Y(s.a.y));
      ctx.lineTo(X(s.b.x), Y(s.b.y));
      ctx.lineTo(X(s.b.x), h);
      ctx.lineTo(X(s.a.x), h);
      ctx.closePath();
      ctx.fill();
      const lo = Math.min(s.a.x, s.b.x),
        hi = Math.max(s.a.x, s.b.x);
      for (let x = Math.ceil(lo); x < hi; x += 1.5) {
        const y = heightAt([s], x);
        if (y !== null) line(x, y - 0.2, x + 0.45, y - 0.7, "#c9beaa", 1);
      }
    }
    line(s.a.x, s.a.y, s.b.x, s.b.y, ink, 3);
  }
  if (editor && e.draft)
    line(
      e.draft.a.x,
      e.draft.a.y,
      e.draft.b.x,
      e.draft.b.y,
      e.editorTool === "scenery" ? blue : red,
      3,
    );
  if (!editor) {
    for (let i = 0; i < e.track.checkpoints.length; i++) {
      const cp = e.track.checkpoints[i];
      line(cp.x, cp.y, cp.x, cp.y + 2.7, "#756952");
      ctx.fillStyle = e.visited.has(i) ? "#477a54" : red;
      ctx.beginPath();
      ctx.moveTo(X(cp.x), Y(cp.y + 2.7));
      ctx.lineTo(X(cp.x + 1.1), Y(cp.y + 2.35));
      ctx.lineTo(X(cp.x), Y(cp.y + 2));
      ctx.fill();
    }
    e.track.stars.forEach((s, i) => {
      if (e.stars.has(i) || X(s.x) < -30 || X(s.x) > w + 30) return;
      ctx.beginPath();
      for (let n = 0; n < 10; n++) {
        const a = -Math.PI / 2 + (n * Math.PI) / 5,
          r = n % 2 ? 0.12 : 0.28,
          xx = X(s.x + Math.cos(a) * r),
          yy = Y(s.y + Math.sin(a) * r);
        if (n === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      }
      ctx.closePath();
      ctx.fillStyle = gold;
      ctx.strokeStyle = "#866619";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });
    const poses = e.bike.parts.map((p) => ({
      part: p,
      pose: e.bike.interpolated(
        p,
        e.status === "running" || e.status === "crashed" ? alpha : 1,
      ),
    }));
    // Every body, including both arms and legs, is drawn from its own solver pose.
    for (const { part: p, pose: q } of poses.filter(
      (v) => v.part.kind !== "frame",
    )) {
      ctx.save();
      ctx.translate(X(q.x), Y(q.y));
      ctx.rotate(-q.angle);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.fillStyle =
        p.kind === "head" ? "#ddc29b" : p.kind === "limb" ? blue : ink;
      if (p.kind === "wheel") {
        ctx.beginPath();
        ctx.arc(0, 0, 0.46 * z, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "#8a8173";
        ctx.lineWidth = 1;
        for (let k = 0; k < 8; k++) {
          const a = (k * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * 0.42 * z, Math.sin(a) * 0.42 * z);
          ctx.stroke();
        }
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, 7);
        ctx.fill();
      } else if (p.kind === "head") {
        ctx.beginPath();
        ctx.arc(0, 0, 0.205 * z, 0, 7);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = red;
        ctx.beginPath();
        ctx.arc(0, 0, 0.22 * z, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        const length = (p.length ?? 0.2) * z;
        ctx.lineWidth = p.kind === "limb" ? Math.max(4, z * 0.12) : 4;
        ctx.strokeStyle = p.kind === "limb" ? blue : ink;
        ctx.beginPath();
        ctx.moveTo(-length / 2, 0);
        ctx.lineTo(length / 2, 0);
        ctx.stroke();
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(-length / 2, 0, 2, 0, 7);
        ctx.fill();
      }
      ctx.restore();
    }
    const frame = poses.find((v) => v.part.kind === "frame");
    if (frame) {
      const q = frame.pose;
      ctx.save();
      ctx.translate(X(q.x), Y(q.y));
      ctx.rotate(-q.angle);
      ctx.strokeStyle = red;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      const f = (x: number, y: number) => [x * z, -y * z];
      ctx.beginPath();
      for (const [i, p] of [
        [-1.05, -0.39],
        [-0.42, 0.4],
        [0.04, -0.4],
        [0.66, 0.43],
        [-0.42, 0.4],
      ].entries()) {
        const a = f(p[0], p[1]);
        if (i === 0) ctx.moveTo(a[0], a[1]);
        else ctx.lineTo(a[0], a[1]);
      }
      const a = f(-1.05, -0.39);
      ctx.lineTo(a[0], a[1]);
      ctx.stroke();
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0.66 * z, -0.43 * z);
      ctx.lineTo(1.05 * z, 0.39 * z);
      ctx.moveTo(0.66 * z, -0.43 * z);
      ctx.lineTo(0.75 * z, -0.7 * z);
      ctx.lineTo(1 * z, -0.7 * z);
      ctx.moveTo(-0.42 * z, -0.4 * z);
      ctx.lineTo(-0.45 * z, -0.63 * z);
      ctx.moveTo(-0.7 * z, -0.63 * z);
      ctx.lineTo(-0.24 * z, -0.63 * z);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0.04 * z, 0.4 * z, 0.12 * z, 0, 7);
      ctx.stroke();
      ctx.restore();
    }
  }
  ctx.fillStyle = "#756b5b";
  ctx.font = "12px 'Special Elite',monospace";
  ctx.fillText(
    editor
      ? "Blue = scenery / Ink = collision"
      : `${Math.max(0, Math.round(e.bike.position.x))} m  ·  120 Hz physics`,
    16,
    h - 16,
  );
  void time;
}
