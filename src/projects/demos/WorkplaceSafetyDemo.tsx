import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ShieldAlert, Eraser, Play, Pause } from 'lucide-react';

interface Person {
  id: number;
  t: number;
  speed: number;
  yBase: number;
  ppe: { hardhat: boolean; vest: boolean; mask: boolean };
  lastAlert: number;
}

const CLASSES = [
  ['Hardhat', 'ok'], ['Mask', 'ok'], ['Safety Vest', 'ok'], ['NO-Hardhat', 'violation'],
  ['NO-Mask', 'violation'], ['NO-Safety Vest', 'violation'], ['Person', 'general'],
  ['Safety Cone', 'perimeter'], ['Machinery', 'hazard'], ['Vehicle', 'equipment'],
] as const;

function pointInPoly(px: number, py: number, poly: { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = true;
  }
  return inside;
}

export default function WorkplaceSafetyDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [poly, setPoly] = useState<{ x: number; y: number }[]>([]);
  const [drawing, setDrawing] = useState(true);
  const [running, setRunning] = useState(true);
  const [events, setEvents] = useState<string[]>(['SimpleTracker initialized — 3 synthetic workers on the floor.']);
  const [alerts, setAlerts] = useState(0);
  const stateRef = useRef({ poly, drawing, running, alerts });
  stateRef.current = { poly, drawing, running, alerts };

  useEffect(() => {
    const people: Person[] = [
      { id: 0, t: 0, speed: 0.0035, yBase: 0.62, ppe: { hardhat: true, vest: true, mask: true }, lastAlert: 0 },
      { id: 1, t: 2.1, speed: 0.0048, yBase: 0.5, ppe: { hardhat: false, vest: true, mask: false }, lastAlert: 0 },
      { id: 2, t: 4.4, speed: 0.0029, yBase: 0.78, ppe: { hardhat: true, vest: false, mask: true }, lastAlert: 0 },
    ];
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const VW = 480;
    const VH = 300;
    canvas.width = VW * dpr;
    canvas.height = VH * dpr;

    const pushEvent = (line: string) => setEvents((prev) => [line, ...prev].slice(0, 6));

    const draw = () => {
      const { poly: P, drawing: D, running: R } = stateRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#F4F1EA';
      ctx.fillRect(0, 0, VW, VH);
      // floor grid
      ctx.strokeStyle = 'rgba(26,26,26,0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < VW; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, VH);
        ctx.stroke();
      }
      for (let y = 0; y < VH; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(VW, y);
        ctx.stroke();
      }
      // machinery
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(392, 40, 70, 120);
      ctx.strokeRect(404, 60, 46, 30);
      ctx.strokeRect(404, 104, 46, 40);
      ctx.font = "8px 'JetBrains Mono'";
      ctx.fillStyle = '#1A1A1A';
      ctx.fillText('MACHINE', 398, 34);

      if (P.length > 1) {
        ctx.strokeStyle = '#D9381E';
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(P[0].x * VW, P[0].y * VH);
        P.forEach((p) => ctx.lineTo(p.x * VW, p.y * VH));
        if (!D) ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(217,56,30,0.08)';
        if (!D && P.length > 2) {
          ctx.beginPath();
          ctx.moveTo(P[0].x * VW, P[0].y * VH);
          P.forEach((p) => ctx.lineTo(p.x * VW, p.y * VH));
          ctx.closePath();
          ctx.fill();
        }
        P.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x * VW, p.y * VH, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#D9381E';
          ctx.fill();
        });
      }

      if (R) t += 1;
      people.forEach((p) => {
        if (R) p.t += p.speed * 16;
        const x = 0.12 + 0.72 * (0.5 + 0.5 * Math.sin(p.t));
        const y = p.yBase;
        const footInside = P.length > 2 && !D && pointInPoly(x, y, P);
        if (footInside && R && t - p.lastAlert > 120) {
          p.lastAlert = t;
          setAlerts((a) => a + 1);
          pushEvent(`[t=${Math.floor(t / 60)}s] INTRUSION — worker ${p.id} foot-point inside restricted zone (cooldown 2.0s)`);
        }
        const col = footInside ? '#D9381E' : '#18528C';
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.8;
        const cx = x * VW;
        const cy = y * VH;
        const s = 1 + (y - 0.4) * 1.4;
        // hardhat
        ctx.beginPath();
        ctx.arc(cx, cy - 34 * s, 8 * s, Math.PI, 0);
        if (p.ppe.hardhat) {
          ctx.fillStyle = footInside ? '#D9381E' : '#18528C';
          ctx.fill();
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy - 28 * s, 7 * s, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 21 * s);
        ctx.lineTo(cx, cy - 2 * s);
        ctx.moveTo(cx, cy - 16 * s);
        ctx.lineTo(cx - 9 * s, cy - 6 * s);
        ctx.moveTo(cx, cy - 16 * s);
        ctx.lineTo(cx + 9 * s, cy - 6 * s);
        ctx.moveTo(cx, cy - 2 * s);
        ctx.lineTo(cx - 6 * s, cy + 10 * s);
        ctx.moveTo(cx, cy - 2 * s);
        ctx.lineTo(cx + 6 * s, cy + 10 * s);
        ctx.stroke();
        // bbox
        ctx.strokeStyle = col;
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 14 * s, cy - 46 * s, 28 * s, 60 * s);
        ctx.setLineDash([]);
        ctx.fillStyle = col;
        ctx.fillText(`person ${p.id}${p.ppe.hardhat ? '' : ' NO-HARDHAT'}`, cx - 14 * s, cy - 50 * s);
        // ground contact probe
        ctx.fillStyle = footInside ? '#D9381E' : '#33312E';
        ctx.fillRect(cx - 1.5, cy + 10 * s - 1.5, 3, 3);
      });

      ctx.fillStyle = '#8A8680';
      ctx.fillText('CAM 02 — 12.4 fps (synthetic)', 8, VH - 8);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const canvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!stateRef.current.drawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const y = ((e.clientY - rect.top) / rect.height);
    setPoly((p) => [...p, { x, y }]);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Geofencing + tracking logic demonstration — synthetic scene</p>
          <p className="text-sm text-ink2 mt-1">
            Normalized polygon coordinates, foot-point probing, 2.0 s alert cooldown. Not live YOLO inference.
          </p>
        </div>
        <a
          href="https://ieeexplore.ieee.org/document/11518869"
          target="_blank"
          rel="noreferrer"
          className="btn-outline !py-2 !px-3"
          data-testid="wsv-ieee-link"
        >
          <ExternalLink className="w-3.5 h-3.5" /> IEEE Xplore
        </a>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDrawing(!drawing)}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 ${drawing ? 'border-red text-red bg-paper2 shadow-hard-sm' : 'border-ink/40 text-ink2'}`}
              data-testid="wsv-draw-toggle"
            >
              {drawing ? (poly.length > 2 ? 'close zone (click done)' : 'drawing: click points') : 'zone locked'}
            </button>
            <button
              onClick={() => {
                setPoly([]);
                setDrawing(true);
              }}
              className="font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] border-ink/40 text-ink2 px-3 py-1.5 flex items-center gap-1.5"
              data-testid="wsv-clear"
            >
              <Eraser className="w-3.5 h-3.5" /> clear zone
            </button>
            <button onClick={() => setRunning(!running)} className="font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] border-ink/40 text-ink2 px-3 py-1.5 flex items-center gap-1.5" data-testid="wsv-play">
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {running ? 'pause workers' : 'resume workers'}
            </button>
            <span className="font-mono text-xs ml-auto self-center">alerts: <b className="text-red">{alerts}</b></span>
          </div>

          <canvas
            ref={canvasRef}
            onClick={canvasClick}
            className="w-full border-[1.5px] border-ink shadow-hard-sm cursor-crosshair"
            style={{ aspectRatio: '480/300' }}
            data-testid="wsv-canvas"
          />
          <p className="annotation text-lg text-ink3">
            draw a restricted zone over the floor, lock it, and watch the foot-point probe flag intrusions
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-ink text-paper p-3 font-mono text-[11px] max-h-40 overflow-y-auto" data-testid="wsv-event-log">
            <p className="text-paper/60 border-b border-paper/20 pb-1 mb-1.5 uppercase text-[9px] tracking-[0.18em]">temporal tracking events</p>
            {events.map((e, i) => (
              <p key={i} className="leading-relaxed text-paper/90">&gt; {e}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {CLASSES.map(([c, kind]) => (
              <span
                key={c}
                className={`font-mono text-[9px] uppercase px-1.5 py-1 border ${
                  kind === 'ok' ? 'border-blue text-blue' : kind === 'violation' ? 'border-red text-red' : 'border-ink/40 text-ink2'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="frame-red bg-paper2/50 p-3 text-[11px] leading-relaxed text-ink2 flex items-start gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
            Logic demo with synthetic people. The published system runs dual YOLO models on edge hardware — this page
            demonstrates the geofencing, probing and cooldown logic only.
          </div>
        </div>
      </div>
    </div>
  );
}
