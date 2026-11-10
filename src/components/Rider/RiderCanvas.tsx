import React, { useRef, useEffect, useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS, RoleLensKey } from '../../data/projects';
import { Volume2, VolumeX, RotateCcw, ArrowLeft, AlertCircle } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned?: boolean;
}

interface Stick {
  p0: Point;
  p1: Point;
  length: number;
}

export const RiderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setMode, activeLens, openModal, visitedPits, markPitVisited } = usePortfolioStore();

  const [respawnBanner, setRespawnBanner] = useState<boolean>(false);
  const [activeSignpost, setActiveSignpost] = useState<string | null>(null);

  const keysRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'KeyR') {
        respawnBike();
      }
      if (e.code === 'KeyM') {
        setMode('blueprint');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Sorted projects by active lens
  const currentLensKey: RoleLensKey = activeLens === 'general' ? 'aiml' : activeLens;
  const sortedProjects = [...PROJECTS].sort((a, b) => a.lensRank[currentLensKey] - b.lensRank[currentLensKey]);

  // Track generation: segments and project pits
  const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const checkpoints: { x: number; y: number; projectId: string; title: string }[] = [];

  let curX = 0;
  let curY = 300;

  // Initial runway
  segments.push({ x1: curX - 400, y1: curY, x2: curX + 600, y2: curY });
  curX += 600;

  sortedProjects.forEach((proj, idx) => {
    // Lead-in hill
    segments.push({ x1: curX, y1: curY, x2: curX + 250, y2: curY - 50 });
    curX += 250;
    curY -= 50;

    // Signpost & Pit checkpoint
    checkpoints.push({ x: curX + 100, y: curY + 20, projectId: proj.id, title: proj.title });

    // Pit drop
    segments.push({ x1: curX, y1: curY, x2: curX + 150, y2: curY + 80 });
    segments.push({ x1: curX + 150, y1: curY + 80, x2: curX + 300, y2: curY + 80 });
    segments.push({ x1: curX + 300, y1: curY + 80, x2: curX + 450, y2: curY });
    curX += 450;

    // Runway / jump ramp
    segments.push({ x1: curX, y1: curY, x2: curX + 300, y2: curY + (idx % 2 === 0 ? -40 : 40) });
    curX += 300;
    curY += (idx % 2 === 0 ? -40 : 40);
  });

  // End runway
  segments.push({ x1: curX, y1: curY, x2: curX + 1000, y2: curY });

  // Bike Verlet Physics model
  const bikeRef = useRef<{
    w1: Point; // rear wheel
    w2: Point; // front wheel
    frame: Point; // center frame
    head: Point; // rider head
    sticks: Stick[];
    angle: number;
    facingRight: boolean;
    crashed: boolean;
  }>({
    w1: { x: 50, y: 280, oldX: 50, oldY: 280 },
    w2: { x: 95, y: 280, oldX: 95, oldY: 280 },
    frame: { x: 72, y: 260, oldX: 72, oldY: 260 },
    head: { x: 72, y: 240, oldX: 72, oldY: 240 },
    sticks: [],
    angle: 0,
    facingRight: true,
    crashed: false,
  });

  const respawnBike = (checkpointX = 50, checkpointY = 270) => {
    const b = bikeRef.current;
    b.w1 = { x: checkpointX, y: checkpointY, oldX: checkpointX, oldY: checkpointY };
    b.w2 = { x: checkpointX + 45, y: checkpointY, oldX: checkpointX + 45, oldY: checkpointY };
    b.frame = { x: checkpointX + 22, y: checkpointY - 20, oldX: checkpointX + 22, oldY: checkpointY - 20 };
    b.head = { x: checkpointX + 22, y: checkpointY - 40, oldX: checkpointX + 22, oldY: checkpointY - 40 };
    b.crashed = false;
    setRespawnBanner(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let cameraX = 72;
    let cameraY = 260;

    const gravity = 0.28;
    const friction = 0.99;
    const wheelRadius = 14;

    const loop = () => {
      const b = bikeRef.current;
      const keys = keysRef.current;

      // Handle rider controls
      if (!b.crashed) {
        if (keys['ArrowRight'] || keys['KeyD']) {
          // Accelerate wheels forward
          const speed = b.facingRight ? 0.6 : -0.6;
          b.w1.x += speed;
          b.w2.x += speed;
        }
        if (keys['ArrowLeft'] || keys['KeyA']) {
          // Brake / reverse
          const speed = b.facingRight ? -0.4 : 0.4;
          b.w1.x += speed;
          b.w2.x += speed;
        }
        if (keys['ArrowUp'] || keys['KeyW']) {
          // Lean back / pitch
          b.frame.y -= 0.3;
          b.w2.y += 0.3;
        }
        if (keys['ArrowDown'] || keys['KeyS']) {
          // Lean forward / crouch
          b.frame.y += 0.3;
          b.w1.y += 0.3;
        }
        if (keys['Space']) {
          // Flip direction
          b.facingRight = !b.facingRight;
          keys['Space'] = false; // toggle once
        }
      }

      // Verlet Integration on all points
      const points = [b.w1, b.w2, b.frame, b.head];
      points.forEach(p => {
        const vx = (p.x - p.oldX) * friction;
        const vy = (p.y - p.oldY) * friction + gravity;
        p.oldX = p.x;
        p.oldY = p.y;
        p.x += vx;
        p.y += vy;
      });

      // Rigid distance constraints (chassis stability)
      const satisfyDistance = (p0: Point, p1: Point, targetDist: number) => {
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const dist = Math.hypot(dx, dy) || targetDist;
        const diff = (targetDist - dist) / dist;
        const offsetX = dx * diff * 0.5;
        const offsetY = dy * diff * 0.5;
        p0.x -= offsetX;
        p0.y -= offsetY;
        p1.x += offsetX;
        p1.y += offsetY;
      };

      // 4 physics relaxation substeps
      for (let step = 0; step < 4; step++) {
        satisfyDistance(b.w1, b.w2, 45);
        satisfyDistance(b.w1, b.frame, 32);
        satisfyDistance(b.w2, b.frame, 32);
        satisfyDistance(b.frame, b.head, 25);

        // Segment collision detection against terrain
        [b.w1, b.w2].forEach(w => {
          segments.forEach(seg => {
            const dx = seg.x2 - seg.x1;
            const dy = seg.y2 - seg.y1;
            const l2 = dx * dx + dy * dy;
            if (l2 === 0) return;
            const t = Math.max(0, Math.min(1, ((w.x - seg.x1) * dx + (w.y - seg.y1) * dy) / l2));
            const projX = seg.x1 + t * dx;
            const projY = seg.y1 + t * dy;
            const dist = Math.hypot(w.x - projX, w.y - projY);

            if (dist < wheelRadius) {
              const nx = (w.x - projX) / (dist || 1);
              const ny = (w.y - projY) / (dist || 1);
              w.x = projX + nx * wheelRadius;
              w.y = projY + ny * wheelRadius;
            }
          });
        });

        // Head crash collision
        segments.forEach(seg => {
          const dx = seg.x2 - seg.x1;
          const dy = seg.y2 - seg.y1;
          const l2 = dx * dx + dy * dy;
          if (l2 === 0) return;
          const t = Math.max(0, Math.min(1, ((b.head.x - seg.x1) * dx + (b.head.y - seg.y1) * dy) / l2));
          const projX = seg.x1 + t * dx;
          const projY = seg.y1 + t * dy;
          const dist = Math.hypot(b.head.x - projX, b.head.y - projY);

          if (dist < 10 && !b.crashed) {
            b.crashed = true;
            setRespawnBanner(true);
          }
        });
      }

      // Checkpoint and Pit detection
      checkpoints.forEach(cp => {
        const dist = Math.hypot(b.frame.x - cp.x, b.frame.y - cp.y);
        if (dist < 45) {
          setActiveSignpost(cp.title);
          // Falling into pit triggers modal
          if (b.frame.y > cp.y + 30 && !visitedPits.has(cp.projectId)) {
            markPitVisited(cp.projectId);
            openModal(cp.projectId);
          }
        }
      });

      // Smooth camera lerp
      cameraX += (b.frame.x - cameraX) * 0.1;
      cameraY += (b.frame.y - cameraY) * 0.1;

      // Rendering
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2 - cameraX, canvas.height / 2 - cameraY);

      // Draw 20px architectural grid lines
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.12)';
      ctx.lineWidth = 1;
      const startGridX = Math.floor((cameraX - canvas.width) / 20) * 20;
      const endGridX = Math.ceil((cameraX + canvas.width) / 20) * 20;
      const startGridY = Math.floor((cameraY - canvas.height) / 20) * 20;
      const endGridY = Math.ceil((cameraY + canvas.height) / 20) * 20;

      ctx.beginPath();
      for (let x = startGridX; x <= endGridX; x += 20) {
        ctx.moveTo(x, startGridY);
        ctx.lineTo(x, endGridY);
      }
      for (let y = startGridY; y <= endGridY; y += 20) {
        ctx.moveTo(startGridX, y);
        ctx.lineTo(endGridX, y);
      }
      ctx.stroke();

      // Draw Terrain Segments (Sketchy architectural lines)
      ctx.strokeStyle = '#1e1e1e';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      segments.forEach(seg => {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.stroke();

      // Draw Signposts & Checkpoints
      checkpoints.forEach(cp => {
        // Post
        ctx.fillStyle = '#64748b';
        ctx.fillRect(cp.x - 2, cp.y - 60, 4, 60);

        // Signboard
        ctx.fillStyle = '#10b981';
        ctx.fillRect(cp.x - 60, cp.y - 85, 120, 25);
        ctx.strokeStyle = '#1e1e1e';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cp.x - 60, cp.y - 85, 120, 25);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(cp.title.slice(0, 18), cp.x, cp.y - 70);

        // Pit vortex marker
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(cp.x - 30, cp.y + 10, 60, 50);
        ctx.setLineDash([]);
      });

      // Draw Bike Wheels
      ctx.lineWidth = 2.5;
      [b.w1, b.w2].forEach(w => {
        ctx.strokeStyle = '#1e1e1e';
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(w.x, w.y, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Spokes
        ctx.beginPath();
        ctx.moveTo(w.x - wheelRadius, w.y);
        ctx.lineTo(w.x + wheelRadius, w.y);
        ctx.moveTo(w.x, w.y - wheelRadius);
        ctx.lineTo(w.x, w.y + wheelRadius);
        ctx.stroke();
      });

      // Draw Frame & Chassis
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(b.w1.x, b.w1.y);
      ctx.lineTo(b.frame.x, b.frame.y);
      ctx.lineTo(b.w2.x, b.w2.y);
      ctx.lineTo(b.w1.x, b.w1.y);
      ctx.stroke();

      // Draw Ragdoll Rider
      ctx.strokeStyle = '#1e1e1e';
      ctx.lineWidth = 2;
      // Spine
      ctx.beginPath();
      ctx.moveTo(b.frame.x, b.frame.y);
      ctx.lineTo(b.head.x, b.head.y);
      ctx.stroke();

      // Head
      ctx.fillStyle = b.crashed ? '#ef4444' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(b.head.x, b.head.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [sortedProjects, visitedPits]);

  return (
    <div className="relative w-full h-screen bg-[#f8f9fa] dark:bg-[#0f141c] overflow-hidden select-none">
      {/* Top HUD Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setMode('blueprint')}
            className="px-3 py-1.5 bg-white dark:bg-slate-900 sketch-border text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Blueprint View</span>
          </button>
          <div className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black sketch-border text-xs font-mono font-bold">
            Rider Mode (Free Rider Physics)
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto font-mono text-xs">
          <button
            onClick={() => respawnBike()}
            className="px-3 py-1.5 bg-white dark:bg-slate-900 sketch-border font-bold flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Respawn (R)</span>
          </button>
        </div>
      </div>

      {/* Signpost Alert HUD */}
      {activeSignpost && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-emerald-500 text-white px-4 py-1.5 rounded sketch-border text-xs font-mono font-bold animate-pulse">
          APPROACHING: {activeSignpost} (Drop into pit for Deep Dive)
        </div>
      )}

      {/* Respawn Banner */}
      {respawnBanner && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-xs">
          <div className="p-6 bg-white dark:bg-slate-900 sketch-border text-center space-y-3 max-w-sm">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="font-bold text-base font-mono">CRASHED! Head impact detected.</h3>
            <p className="text-xs text-slate-500 font-mono">
              Press <strong>R</strong> to respawn at runway.
            </p>
            <button
              onClick={() => respawnBike()}
              className="px-4 py-2 bg-emerald-600 text-white font-mono text-xs font-bold rounded sketch-border w-full"
            >
              Respawn (R)
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-full h-full block"
      />

      {/* Bottom Instructions HUD */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none text-xs font-mono bg-white/90 dark:bg-slate-900/90 p-3 sketch-border space-y-1">
        <div className="font-bold text-slate-700 dark:text-slate-300">CONTROLS:</div>
        <div className="text-[11px] text-slate-500">
          • <strong>WASD / Arrows:</strong> Drive & Pitch (W/Up = Lean Back, S/Down = Crouch)
          <br />
          • <strong>Space:</strong> Flip Direction | <strong>R:</strong> Respawn | <strong>M:</strong> Blueprint View
          <br />
          • Fall into project pits to launch interactive live demos!
        </div>
      </div>
    </div>
  );
};
