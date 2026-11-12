import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ExternalLink, ShieldAlert, Eraser, Play, Pause, CheckCircle2, Lock } from 'lucide-react';

interface Person {
  id: number;
  t: number;
  speed: number;
  yBase: number;
  ppe: { hardhat: boolean; vest: boolean; mask: boolean };
  lastAlert: number;
  wasInside: boolean;
}

const CLASSES = [
  ['Hardhat', 'ok'],
  ['Mask', 'ok'],
  ['Safety Vest', 'ok'],
  ['NO-Hardhat', 'violation'],
  ['NO-Mask', 'violation'],
  ['NO-Safety Vest', 'violation'],
  ['Person', 'general'],
  ['Safety Cone', 'perimeter'],
  ['Machinery', 'hazard'],
  ['Vehicle', 'equipment'],
] as const;

// Ray-casting point-in-polygon algorithm with normalized coordinates [0, 1]
function pointInPoly(px: number, py: number, poly: { x: number; y: number }[]): boolean {
  if (poly.length < 3) return false;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x,
      yi = poly[i].y,
      xj = poly[j].x,
      yj = poly[j].y;
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

const DEFAULT_ZONE: { x: number; y: number }[] = [
  { x: 0.58, y: 0.35 },
  { x: 0.92, y: 0.35 },
  { x: 0.92, y: 0.85 },
  { x: 0.58, y: 0.85 },
];

export default function WorkplaceSafetyDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [poly, setPoly] = useState<{ x: number; y: number }[]>(DEFAULT_ZONE);
  const [drawing, setDrawing] = useState(false);
  const [running, setRunning] = useState(true);
  const [events, setEvents] = useState<string[]>([
    'System initialized — 3 synthetic workers on warehouse floor.',
    'Hazard zone active: [Machine Area East].',
  ]);
  const [alerts, setAlerts] = useState(0);

  const stateRef = useRef({ poly, drawing, running, alerts });
  stateRef.current = { poly, drawing, running, alerts };

  const pushEvent = useCallback((line: string) => {
    setEvents((prev) => [line, ...prev].slice(0, 12));
  }, []);

  useEffect(() => {
    const people: Person[] = [
      { id: 0, t: 0, speed: 0.0035, yBase: 0.62, ppe: { hardhat: true, vest: true, mask: true }, lastAlert: 0, wasInside: false },
      { id: 1, t: 2.1, speed: 0.0048, yBase: 0.5, ppe: { hardhat: false, vest: true, mask: false }, lastAlert: 0, wasInside: false },
      { id: 2, t: 4.4, speed: 0.0029, yBase: 0.78, ppe: { hardhat: true, vest: false, mask: true }, lastAlert: 0, wasInside: false },
    ];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let frameCount = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const VW = 480;
    const VH = 300;
    canvas.width = VW * dpr;
    canvas.height = VH * dpr;

    const draw = () => {
      const { poly: P, drawing: D, running: R } = stateRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Background paper canvas
      ctx.fillStyle = '#F4F1EA';
      ctx.fillRect(0, 0, VW, VH);

      // Floor grid markings
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

      // Industrial machinery schematic
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(390, 40, 75, 130);
      ctx.strokeRect(402, 60, 50, 35);
      ctx.strokeRect(402, 110, 50, 45);
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = '#1A1A1A';
      ctx.fillText('HEAVY DRILL CNC', 392, 34);

      // Draw active restricted zone polygon
      if (P.length > 1) {
        ctx.strokeStyle = D ? '#D9381E' : '#C84B31';
        ctx.lineWidth = 1.8;
        ctx.setLineDash(D ? [6, 4] : []);
        ctx.beginPath();
        ctx.moveTo(P[0].x * VW, P[0].y * VH);
        for (let i = 1; i < P.length; i++) {
          ctx.lineTo(P[i].x * VW, P[i].y * VH);
        }
        if (!D && P.length > 2) ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);

        // Translucent polygon hatch fill
        if (!D && P.length > 2) {
          ctx.fillStyle = 'rgba(217,56,30,0.12)';
          ctx.beginPath();
          ctx.moveTo(P[0].x * VW, P[0].y * VH);
          for (let i = 1; i < P.length; i++) {
            ctx.lineTo(P[i].x * VW, P[i].y * VH);
          }
          ctx.closePath();
          ctx.fill();
        }

        // Vertices
        P.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x * VW, p.y * VH, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#D9381E';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      if (R) frameCount += 1;

      // Synthetic worker movement and foot-point probing
      people.forEach((p) => {
        if (R) p.t += p.speed * 16;
        const x = 0.12 + 0.76 * (0.5 + 0.5 * Math.sin(p.t));
        const y = p.yBase;

        // Probe worker ground foot contact point
        const footInside = P.length > 2 && !D && pointInPoly(x, y, P);

        if (footInside) {
          if (!p.wasInside) {
            p.wasInside = true;
          }
          // Cooldown check: 120 frames at 60fps = 2.0s cooldown
          if (R && frameCount - p.lastAlert > 120) {
            p.lastAlert = frameCount;
            setAlerts((a) => a + 1);
            pushEvent(
              `[t=${(frameCount / 60).toFixed(1)}s] INTRUSION: Worker #${p.id} entered restricted zone (foot at ${x.toFixed(2)}, ${y.toFixed(2)})`
            );
          }
        } else if (p.wasInside) {
          p.wasInside = false;
          pushEvent(`[t=${(frameCount / 60).toFixed(1)}s] CLEAR: Worker #${p.id} exited restricted zone`);
        }

        const col = footInside ? '#D9381E' : '#18528C';
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.8;
        const cx = x * VW;
        const cy = y * VH;
        const s = 1 + (y - 0.4) * 1.4;

        // Hardhat drawing
        ctx.beginPath();
        ctx.arc(cx, cy - 34 * s, 8 * s, Math.PI, 0);
        if (p.ppe.hardhat) {
          ctx.fillStyle = col;
          ctx.fill();
        }
        ctx.stroke();

        // Head & body stick figure
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

        // Bounding box
        ctx.strokeStyle = col;
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - 14 * s, cy - 46 * s, 28 * s, 60 * s);
        ctx.setLineDash([]);
        ctx.fillStyle = col;
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillText(
          `person #${p.id}${p.ppe.hardhat ? '' : ' [NO-HARDHAT]'}`,
          cx - 14 * s,
          cy - 50 * s
        );

        // Ground contact probe dot
        ctx.fillStyle = footInside ? '#D9381E' : '#33312E';
        ctx.fillRect(cx - 2, cy + 10 * s - 2, 4, 4);
      });

      // Camera HUD stamp
      ctx.fillStyle = '#8A8680';
      ctx.font = "8.5px 'JetBrains Mono', monospace";
      ctx.fillText(
        `CAM 02 — 30.0 fps (synthetic stream) · ${P.length > 2 && !D ? 'ZONE ARMED' : 'ZONE EDITING'}`,
        8,
        VH - 8
      );

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [pushEvent]);

  const canvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!stateRef.current.drawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setPoly((prev) => [...prev, { x, y }]);
  };

  const clearZone = () => {
    setPoly([]);
    setDrawing(true);
    pushEvent('Restricted zone cleared. Click on the canvas to draw new polygon vertices.');
  };

  const lockZone = () => {
    if (poly.length >= 3) {
      setDrawing(false);
      pushEvent(`Restricted zone locked with ${poly.length} vertices. Intrusion detection active.`);
    } else {
      pushEvent('Polygon requires at least 3 vertices before locking.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-dashed border-ink/40 pb-4">
        <div>
          <p className="label-mono text-red">Spatial Geofencing + Temporal Tracking Logic — Synthetic Simulation</p>
          <p className="text-sm text-ink2 mt-1">
            Normalized polygon projection, foot-point ground probe, 2.0s intrusion cooldown. Dual YOLO inference runs on edge hardware in the published system.
          </p>
        </div>
        <a
          href="https://ieeexplore.ieee.org/document/11518869"
          target="_blank"
          rel="noreferrer"
          className="btn-outline !py-1.5 !px-3 font-mono text-xs flex items-center gap-1.5"
          data-testid="wsv-ieee-link"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>IEEE Xplore Paper</span>
        </a>
      </div>

      <div className="grid md:grid-cols-[1fr_270px] gap-5">
        <div className="space-y-3">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {drawing ? (
              <button
                onClick={lockZone}
                className={`font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] px-3 py-1.5 flex items-center gap-1.5 ${
                  poly.length >= 3
                    ? 'border-blue bg-blue/10 text-blue font-bold cursor-pointer'
                    : 'border-ink/30 text-ink3 cursor-not-allowed'
                }`}
                disabled={poly.length < 3}
                data-testid="wsv-draw-toggle"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Zone ({poly.length} pts)</span>
              </button>
            ) : (
              <button
                onClick={() => setDrawing(true)}
                className="font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] border-ink px-3 py-1.5 bg-paper2 text-ink flex items-center gap-1.5 cursor-pointer"
                data-testid="wsv-draw-toggle"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue" />
                <span>Zone Locked (Click to Edit)</span>
              </button>
            )}

            <button
              onClick={clearZone}
              className="font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] border-ink/40 text-ink2 px-3 py-1.5 flex items-center gap-1.5 hover:border-ink cursor-pointer"
              data-testid="wsv-clear"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Clear Zone</span>
            </button>

            <button
              onClick={() => setRunning(!running)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] border-[1.5px] border-ink/40 text-ink2 px-3 py-1.5 flex items-center gap-1.5 hover:border-ink cursor-pointer"
              data-testid="wsv-play"
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-accent" />}
              <span>{running ? 'Pause Workers' : 'Resume Workers'}</span>
            </button>

            <span className="font-mono text-xs ml-auto self-center">
              Intrusions: <b className="text-red font-bold">{alerts}</b>
            </span>
          </div>

          {/* Interactive Canvas */}
          <canvas
            ref={canvasRef}
            onClick={canvasClick}
            className="w-full border-[1.5px] border-ink shadow-hard-sm cursor-crosshair rounded-xs"
            style={{ aspectRatio: '480/300' }}
            data-testid="wsv-canvas"
          />
          <p className="annotation text-base text-ink3">
            {drawing
              ? 'Click points on the canvas to trace a restricted zone boundary, then click "Lock Zone".'
              : 'Zone is active. Foot-point probing detects when a worker crosses the boundary line.'}
          </p>
        </div>

        {/* Side Audit Log & Class Legend */}
        <div className="space-y-4">
          <div className="bg-ink text-paper p-3 font-mono text-[11px] max-h-48 overflow-y-auto rounded-xs shadow-hard-sm" data-testid="wsv-event-log">
            <p className="text-paper/60 border-b border-paper/20 pb-1 mb-1.5 uppercase text-[9px] tracking-[0.18em]">
              Temporal Event Stream
            </p>
            {events.map((e, i) => (
              <p key={i} className="leading-relaxed text-paper/90">&gt; {e}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {CLASSES.map(([c, kind]) => (
              <span
                key={c}
                className={`font-mono text-[9px] uppercase px-1.5 py-1 border rounded-xs ${
                  kind === 'ok'
                    ? 'border-blue text-blue'
                    : kind === 'violation'
                    ? 'border-red text-red font-bold'
                    : 'border-ink/40 text-ink2'
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="frame-red bg-paper2/50 p-3 text-[11px] leading-relaxed text-ink2 flex items-start gap-2 shadow-hard-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
            <p>
              Logic demonstration with synthetic actors. The published system uses dual YOLO models on NVIDIA edge
              hardware; this browser demo demonstrates polygon point-in-polygon probing and alert cooldown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
