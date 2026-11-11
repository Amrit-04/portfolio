import React, { useRef, useEffect, useState, useCallback } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PROJECTS, RoleLensKey } from '../../data/projects';
import { soundEffects } from '../../lib/soundEffects';
import { 
  ArrowLeft, RotateCcw, Volume2, VolumeX, Pause, Play, 
  Terminal, BookOpen, AlertCircle, CheckCircle2
} from 'lucide-react';

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned?: boolean;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type?: 'ground' | 'bridge' | 'ramp' | 'hazard';
}

interface SectorCheckpoint {
  x: number;
  y: number;
  sectorIndex: number;
  sectorName: string;
  projectId: string;
  title: string;
  tagline: string;
  metricSnippet: string;
}

export const RiderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { 
    setMode, activeLens, openModal, markPitVisited,
    isSoundMuted, toggleSound, targetRideSector, setTargetRideSector
  } = usePortfolioStore();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [respawnBanner, setRespawnBanner] = useState<boolean>(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState<SectorCheckpoint | null>(null);
  const [currentSectorName, setCurrentSectorName] = useState<string>('START: THE WORKSHOP');
  const [speedKmh, setSpeedKmh] = useState<number>(0);
  const [distanceMeters, setDistanceMeters] = useState<number>(0);
  const [lastCheckpointPos, setLastCheckpointPos] = useState<{ x: number; y: number }>({ x: 80, y: 270 });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lastChimeCheckpointRef = useRef<string | null>(null);

  // Sorted projects by active lens
  const currentLensKey: RoleLensKey = activeLens === 'general' ? 'aiml' : activeLens;
  const sortedProjects = [...PROJECTS].sort((a, b) => a.lensRank[currentLensKey] - b.lensRank[currentLensKey]);

  // 1. Generate Continuous 7-Sector Engineering Track
  const segmentsRef = useRef<Segment[]>([]);
  const checkpointsRef = useRef<SectorCheckpoint[]>([]);

  useEffect(() => {
    const segs: Segment[] = [];
    const cps: SectorCheckpoint[] = [];

    let curX = -200;
    let curY = 320;

    // SECTOR 0: The Workshop (Runway)
    segs.push({ x1: curX, y1: curY, x2: curX + 700, y2: curY, type: 'ground' });
    curX += 700;

    // SECTORS 1 TO 7 (One per Project)
    sortedProjects.forEach((proj, idx) => {
      const sectorNum = idx + 1;
      let sectorName = '';
      
      switch (proj.id) {
        case 'neural-query-optimizer':
          sectorName = 'SECTOR 1: DATABASE TERRAIN (GNN PLAN TREES)';
          break;
        case 'llm-reliability-control-plane':
          sectorName = 'SECTOR 2: RELIABILITY MOUNTAINS (WAL & TRACES)';
          break;
        case 'tradeflow':
          sectorName = 'SECTOR 3: TRADEFLOW BRIDGE (113ns OMS)';
          break;
        case 'warehouse-routing':
          sectorName = 'SECTOR 4: WAREHOUSE RUN (HELD-KARP TSP)';
          break;
        case 'moneyball':
          sectorName = 'SECTOR 5: QUANTITATIVE VALLEY (HMM REGIMES)';
          break;
        case 'telemetry-pipeline':
          sectorName = 'SECTOR 6: TELEMETRY FACTORY (12 PARTITIONS)';
          break;
        case 'workplace-safety':
          sectorName = 'SECTOR 7: SAFETY OUTPOST (IEEE GEOFENCE)';
          break;
        default:
          sectorName = `SECTOR ${sectorNum}: ${proj.title.toUpperCase()}`;
      }

      // Checkpoint coordinates
      const cpX = curX + 160;
      const cpY = curY;
      cps.push({
        x: cpX,
        y: cpY,
        sectorIndex: idx,
        sectorName,
        projectId: proj.id,
        title: proj.title,
        tagline: proj.tagline,
        metricSnippet: proj.metrics[0] ? `${proj.metrics[0].label}: ${proj.metrics[0].value}` : ''
      });

      // Distinct Terrain Topography per Project Sector:
      if (proj.id === 'neural-query-optimizer') {
        // Branching paths (upper index scan vs lower seq scan)
        segs.push({ x1: curX, y1: curY, x2: curX + 200, y2: curY, type: 'ground' });
        // Upper branch ramp
        segs.push({ x1: curX + 200, y1: curY, x2: curX + 450, y2: curY - 70, type: 'ramp' });
        segs.push({ x1: curX + 450, y1: curY - 70, x2: curX + 750, y2: curY - 70, type: 'ground' });
        segs.push({ x1: curX + 750, y1: curY - 70, x2: curX + 950, y2: curY, type: 'ramp' });

        // Lower valley path
        segs.push({ x1: curX + 200, y1: curY, x2: curX + 500, y2: curY + 60, type: 'ground' });
        segs.push({ x1: curX + 500, y1: curY + 60, x2: curX + 700, y2: curY + 60, type: 'ground' });
        segs.push({ x1: curX + 700, y1: curY + 60, x2: curX + 950, y2: curY, type: 'ground' });
        curX += 950;

      } else if (proj.id === 'llm-reliability-control-plane') {
        // Steep mountain peak & suspension bridge
        segs.push({ x1: curX, y1: curY, x2: curX + 300, y2: curY - 110, type: 'ramp' });
        curY -= 110;
        // Suspension bridge
        segs.push({ x1: curX + 300, y1: curY, x2: curX + 650, y2: curY + 10, type: 'bridge' });
        curX += 650;
        curY += 10;
        // Downhill ramp
        segs.push({ x1: curX, y1: curY, x2: curX + 350, y2: curY + 100, type: 'ramp' });
        curX += 350;
        curY += 100;

      } else if (proj.id === 'tradeflow') {
        // High-speed speedway and mechanical drops
        segs.push({ x1: curX, y1: curY, x2: curX + 250, y2: curY + 40, type: 'ground' });
        curX += 250;
        curY += 40;
        segs.push({ x1: curX, y1: curY, x2: curX + 400, y2: curY - 30, type: 'ramp' });
        curX += 400;
        curY -= 30;
        segs.push({ x1: curX, y1: curY, x2: curX + 300, y2: curY, type: 'ground' });
        curX += 300;

      } else if (proj.id === 'warehouse-routing') {
        // Warehouse shelves & ramps
        segs.push({ x1: curX, y1: curY, x2: curX + 150, y2: curY, type: 'ground' });
        segs.push({ x1: curX + 150, y1: curY, x2: curX + 350, y2: curY - 60, type: 'ramp' });
        segs.push({ x1: curX + 350, y1: curY - 60, x2: curX + 600, y2: curY - 60, type: 'ground' });
        segs.push({ x1: curX + 600, y1: curY - 60, x2: curX + 800, y2: curY, type: 'ramp' });
        curX += 800;

      } else if (proj.id === 'moneyball') {
        // Gaussian bell-curve hill and volatility peaks
        segs.push({ x1: curX, y1: curY, x2: curX + 200, y2: curY - 80, type: 'ramp' });
        segs.push({ x1: curX + 200, y1: curY - 80, x2: curX + 400, y2: curY - 80, type: 'ground' });
        segs.push({ x1: curX + 400, y1: curY - 80, x2: curX + 600, y2: curY + 50, type: 'ramp' });
        segs.push({ x1: curX + 600, y1: curY + 50, x2: curX + 850, y2: curY, type: 'ground' });
        curX += 850;

      } else if (proj.id === 'telemetry-pipeline') {
        // Pipeline conduit with multiple platforms
        segs.push({ x1: curX, y1: curY, x2: curX + 300, y2: curY, type: 'ground' });
        segs.push({ x1: curX + 300, y1: curY, x2: curX + 450, y2: curY - 45, type: 'ramp' });
        segs.push({ x1: curX + 450, y1: curY - 45, x2: curX + 750, y2: curY - 45, type: 'ground' });
        segs.push({ x1: curX + 750, y1: curY - 45, x2: curX + 900, y2: curY, type: 'ramp' });
        curX += 900;

      } else {
        // Workplace Safety Outpost
        segs.push({ x1: curX, y1: curY, x2: curX + 350, y2: curY - 30, type: 'ramp' });
        curY -= 30;
        segs.push({ x1: curX + 350, y1: curY, x2: curX + 700, y2: curY, type: 'ground' });
        curX += 700;
      }
    });

    // Final finish runway
    segs.push({ x1: curX, y1: curY, x2: curX + 1500, y2: curY, type: 'ground' });

    segmentsRef.current = segs;
    checkpointsRef.current = cps;
  }, [sortedProjects]);

  // 2. Bike Verlet Physics Model
  const bikeRef = useRef<{
    w1: Point; // rear wheel
    w2: Point; // front wheel
    frame: Point; // bottom bracket / frame
    head: Point; // rider head
    facingRight: boolean;
    crashed: boolean;
    angularVelocity: number;
  }>({
    w1: { x: 80, y: 300, oldX: 80, oldY: 300 },
    w2: { x: 125, y: 300, oldX: 125, oldY: 300 },
    frame: { x: 102, y: 280, oldX: 102, oldY: 280 },
    head: { x: 102, y: 255, oldX: 102, oldY: 255 },
    facingRight: true,
    crashed: false,
    angularVelocity: 0,
  });

  const respawnBike = useCallback((x = lastCheckpointPos.x, y = lastCheckpointPos.y) => {
    soundEffects.playUiTap(isSoundMuted);
    const b = bikeRef.current;
    b.w1 = { x, y: y - 14, oldX: x, oldY: y - 14 };
    b.w2 = { x: x + 45, y: y - 14, oldX: x + 45, oldY: y - 14 };
    b.frame = { x: x + 22, y: y - 34, oldX: x + 22, oldY: y - 34 };
    b.head = { x: x + 22, y: y - 56, oldX: x + 22, oldY: y - 56 };
    b.facingRight = true;
    b.crashed = false;
    b.angularVelocity = 0;
    setRespawnBanner(false);
  }, [lastCheckpointPos, isSoundMuted]);

  // Handle jump to sector if initiated from blueprint
  useEffect(() => {
    if (targetRideSector !== null && checkpointsRef.current[targetRideSector]) {
      const cp = checkpointsRef.current[targetRideSector];
      setLastCheckpointPos({ x: cp.x - 100, y: cp.y });
      respawnBike(cp.x - 100, cp.y);
      setTargetRideSector(null);
    }
  }, [targetRideSector, respawnBike, setTargetRideSector]);

  // 3. Desktop Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyR') {
        respawnBike();
      }
      if (e.code === 'Escape') {
        setMode('blueprint');
      }
      if (e.code === 'Space') {
        setIsPaused(p => !p);
      }
      if (e.code === 'KeyE' && activeCheckpoint) {
        openModal(activeCheckpoint.projectId);
      }
      if (e.code === 'Enter' && activeCheckpoint) {
        openModal(activeCheckpoint.projectId);
      }
      if (e.code === 'KeyV') {
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
  }, [activeCheckpoint, openModal, respawnBike, setMode]);

  // 4. Fixed-Timestep Physics & Render Loop (60 FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animId: number;
    let cameraX = 100;
    let cameraY = 280;

    const gravity = 0.32;
    const friction = 0.988;
    const wheelRadius = 14;

    const loop = () => {
      if (!isPaused) {
        const b = bikeRef.current;
        const keys = keysRef.current;

        // Sound & pedal clicks
        if (!b.crashed && (keys['ArrowUp'] || keys['KeyW'] || keys['ArrowRight'] || keys['KeyD'])) {
          if (Math.random() < 0.15) {
            soundEffects.playPedalClick(isSoundMuted);
          }
        }

        // Rider controls (Free Rider HD mapping)
        if (!b.crashed) {
          // Accelerate forward (Up / W)
          if (keys['ArrowUp'] || keys['KeyW']) {
            const speed = b.facingRight ? 0.85 : -0.85;
            b.w1.x += speed;
            b.w2.x += speed * 0.9;
          }
          // Brake / Reverse (Down / S)
          if (keys['ArrowDown'] || keys['KeyS']) {
            const speed = b.facingRight ? -0.5 : 0.5;
            b.w1.x += speed;
            b.w2.x += speed;
          }
          // Lean Left / Back (Left / A)
          if (keys['ArrowLeft'] || keys['KeyA']) {
            b.head.x -= 0.35;
            b.head.y -= 0.25;
            b.frame.x -= 0.25;
            b.w2.y -= 0.3;
            b.w1.y += 0.3;
          }
          // Lean Right / Forward (Right / D)
          if (keys['ArrowRight'] || keys['KeyD']) {
            b.head.x += 0.35;
            b.head.y += 0.25;
            b.frame.x += 0.25;
            b.w2.y += 0.3;
            b.w1.y -= 0.3;
          }
        }

        // Verlet integration on points
        const points = [b.w1, b.w2, b.frame, b.head];
        points.forEach(p => {
          const vx = (p.x - p.oldX) * friction;
          const vy = (p.y - p.oldY) * friction + gravity;
          p.oldX = p.x;
          p.oldY = p.y;
          p.x += vx;
          p.y += vy;
        });

        // Rigid Distance Constraints (Bike chassis & rider geometry)
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

        const segments = segmentsRef.current;

        // 5 Physics relaxation substeps
        for (let step = 0; step < 5; step++) {
          satisfyDistance(b.w1, b.w2, 45); // axle distance
          satisfyDistance(b.w1, b.frame, 32); // chainstay
          satisfyDistance(b.w2, b.frame, 32); // downtube
          satisfyDistance(b.frame, b.head, 28); // rider torso

          // Terrain Segment Collision (Wheels)
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

                // Friction & landing sound
                const vy = w.y - w.oldY;
                if (vy > 4 && step === 0) {
                  soundEffects.playLanding(isSoundMuted, vy / 4);
                }
              }
            });
          });

          // Head Crash Collision (Head impact detection)
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
              soundEffects.playCrash(isSoundMuted);
              setRespawnBanner(true);
            }
          });
        }

        // Checkpoint Proximity Detection
        const checkpoints = checkpointsRef.current;
        let inCheckpointProximity: SectorCheckpoint | null = null;

        checkpoints.forEach(cp => {
          const dist = Math.hypot(b.frame.x - cp.x, b.frame.y - cp.y);
          if (dist < 90) {
            inCheckpointProximity = cp;
            setLastCheckpointPos({ x: cp.x, y: cp.y });

            // Harmonious checkpoint chime on first entry
            if (lastChimeCheckpointRef.current !== cp.projectId) {
              lastChimeCheckpointRef.current = cp.projectId;
              soundEffects.playCheckpoint(isSoundMuted);
              markPitVisited(cp.projectId);
            }
          }
        });

        setActiveCheckpoint(inCheckpointProximity);

        // Update HUD metrics
        const speed = Math.hypot(b.w1.x - b.w1.oldX, b.w1.y - b.w1.oldY) * 3.6 * 4; // km/h proxy
        setSpeedKmh(Math.round(speed));
        setDistanceMeters(Math.max(0, Math.round((b.frame.x - 80) / 10)));

        if (inCheckpointProximity) {
          setCurrentSectorName((inCheckpointProximity as SectorCheckpoint).sectorName);
        }

        // Smooth camera lerp tracking rider
        const targetCamX = b.frame.x + (b.facingRight ? 120 : -120);
        const targetCamY = b.frame.y - 40;
        cameraX += (targetCamX - cameraX) * 0.08;
        cameraY += (targetCamY - cameraY) * 0.08;
      }

      // 5. Canvas Drawing (Hand-Drawn Free Rider Line Art)
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2 - cameraX, h / 2 - cameraY);

      // Subtle 20px drafting background grid
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.08)';
      ctx.lineWidth = 1;
      const startGridX = Math.floor((cameraX - w) / 20) * 20;
      const endGridX = Math.ceil((cameraX + w) / 20) * 20;
      const startGridY = Math.floor((cameraY - h) / 20) * 20;
      const endGridY = Math.ceil((cameraY + h) / 20) * 20;

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

      // Draw Hand-Drawn Track Segments
      const segments = segmentsRef.current;
      ctx.strokeStyle = '#11141a';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      segments.forEach(seg => {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.stroke();

      // Crosshatch shading beneath ground track lines
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      segments.forEach(seg => {
        const dx = seg.x2 - seg.x1;
        const dy = seg.y2 - seg.y1;
        const len = Math.hypot(dx, dy);
        const steps = Math.floor(len / 10);
        for (let i = 0; i <= steps; i++) {
          const t = i / (steps || 1);
          const px = seg.x1 + t * dx;
          const py = seg.y1 + t * dy;
          ctx.moveTo(px, py);
          ctx.lineTo(px - 6, py + 12);
        }
      });
      ctx.stroke();

      // Draw Checkpoints & Visual Landmarks
      const checkpoints = checkpointsRef.current;
      checkpoints.forEach(cp => {
        // Checkpoint Mast
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cp.x, cp.y);
        ctx.lineTo(cp.x, cp.y - 75);
        ctx.stroke();

        // Checkpoint Flag / Signboard
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.roundRect(cp.x, cp.y - 75, 110, 24, 3);
        ctx.fill();

        ctx.strokeStyle = '#11141a';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(cp.title.slice(0, 16), cp.x + 8, cp.y - 59);

        // Ground checkpoint light beam
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cp.x - 30, cp.y);
        ctx.lineTo(cp.x + 30, cp.y);
        ctx.lineTo(cp.x + 50, cp.y - 120);
        ctx.lineTo(cp.x - 50, cp.y - 120);
        ctx.closePath();
        ctx.fill();
      });

      // Draw Bike & Rider
      const b = bikeRef.current;

      // Rear Wheel
      ctx.lineWidth = 2.5;
      [b.w1, b.w2].forEach((w) => {
        ctx.strokeStyle = '#11141a';
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.arc(w.x, w.y, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Spokes with rotation indication
        const angle = (w.x - w.oldX) * 0.2;
        ctx.beginPath();
        ctx.moveTo(w.x - Math.cos(angle) * wheelRadius, w.y - Math.sin(angle) * wheelRadius);
        ctx.lineTo(w.x + Math.cos(angle) * wheelRadius, w.y + Math.sin(angle) * wheelRadius);
        ctx.moveTo(w.x - Math.sin(angle) * wheelRadius, w.y + Math.cos(angle) * wheelRadius);
        ctx.lineTo(w.x + Math.sin(angle) * wheelRadius, w.y - Math.cos(angle) * wheelRadius);
        ctx.stroke();
      });

      // Bike Frame (Triangular Chassis)
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(b.w1.x, b.w1.y);
      ctx.lineTo(b.frame.x, b.frame.y);
      ctx.lineTo(b.w2.x, b.w2.y);
      ctx.lineTo(b.w1.x, b.w1.y);
      ctx.stroke();

      // Handlebars
      ctx.strokeStyle = '#11141a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(b.w2.x, b.w2.y);
      ctx.lineTo(b.frame.x + 12, b.frame.y - 12);
      ctx.lineTo(b.frame.x + 16, b.frame.y - 15);
      ctx.stroke();

      // Ragdoll Rider (Stickman)
      // Torso
      ctx.beginPath();
      ctx.moveTo(b.frame.x, b.frame.y);
      ctx.lineTo(b.head.x, b.head.y);
      ctx.stroke();

      // Arms to handlebar
      ctx.beginPath();
      ctx.moveTo(b.head.x, b.head.y + 8);
      ctx.lineTo(b.frame.x + 14, b.frame.y - 12);
      ctx.stroke();

      // Legs to pedals
      ctx.beginPath();
      ctx.moveTo(b.frame.x, b.frame.y);
      ctx.lineTo(b.w1.x + 10, b.w1.y - 8);
      ctx.stroke();

      // Rider Head
      ctx.fillStyle = b.crashed ? '#ef4444' : '#f59e0b';
      ctx.strokeStyle = '#11141a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(b.head.x, b.head.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPaused, isSoundMuted, markPitVisited]);

  // Touch control helper for mobile
  const handleTouch = (key: string, pressed: boolean) => {
    keysRef.current[key] = pressed;
  };

  return (
    <div className="relative w-full h-screen bg-[#faf8f5] dark:bg-[#0f131a] overflow-hidden select-none touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* TOP DRAFTING HUD */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              soundEffects.playUiTap(isSoundMuted);
              setMode('blueprint');
            }}
            className="px-3.5 py-1.5 bg-white dark:bg-slate-900 sketch-border text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Blueprint View (Esc)</span>
          </button>

          <div className="px-3 py-1 bg-slate-950 text-white dark:bg-white dark:text-black sketch-border text-xs font-mono font-bold">
            Rider Mode (Free Rider Physics)
          </div>
        </div>

        {/* Telemetry Stats: Speed & Distance */}
        <div className="flex items-center gap-3 font-mono text-xs pointer-events-auto">
          <div className="p-1.5 px-3 bg-white dark:bg-slate-900 sketch-border flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block">SPEED</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{speedKmh} km/h</span>
            </div>
            <div className="border-l border-slate-300 dark:border-slate-700 pl-3">
              <span className="text-[10px] text-slate-400 block">DISTANCE</span>
              <span className="font-bold">{distanceMeters} m</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playUiTap(isSoundMuted);
              setIsPaused(p => !p);
            }}
            className="p-2 bg-white dark:bg-slate-900 sketch-border hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Pause/Resume (Space)"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => respawnBike()}
            className="p-2 bg-white dark:bg-slate-900 sketch-border hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Respawn from Checkpoint (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              soundEffects.playUiTap(isSoundMuted);
              toggleSound();
            }}
            className="p-2 bg-white dark:bg-slate-900 sketch-border hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* CURRENT SECTOR BANNER (Top Center) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 sketch-border text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 tracking-wider">
          {currentSectorName}
        </span>
      </div>

      {/* FLOATING PROJECT CHECKPOINT INTERACTION CARD */}
      {activeCheckpoint && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 pointer-events-auto animate-in slide-in-from-bottom duration-150">
          <div className="p-4 bg-white dark:bg-slate-900 sketch-border-accent space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-mono text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                  CHECKPOINT REACHED // {activeCheckpoint.projectId.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">press [E] or [Enter]</span>
            </div>

            <div>
              <h3 className="font-editorial text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {activeCheckpoint.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-display mt-0.5 line-clamp-1">
                {activeCheckpoint.tagline}
              </p>
              {activeCheckpoint.metricSnippet && (
                <div className="mt-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                  * {activeCheckpoint.metricSnippet}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => {
                  soundEffects.playUiTap(isSoundMuted);
                  openModal(activeCheckpoint.projectId);
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch In-Browser Demo</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playUiTap(isSoundMuted);
                  openModal(activeCheckpoint.projectId);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-mono text-xs font-bold rounded sketch-border flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Inspect Blueprint</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playUiTap(isSoundMuted);
                  setMode('blueprint');
                }}
                className="px-2.5 py-1.5 text-slate-500 hover:text-black dark:hover:text-white font-mono text-xs"
              >
                View in Portfolio (V)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEAD IMPACT CRASH DIALOG */}
      {respawnBanner && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-xs">
          <div className="p-6 bg-white dark:bg-slate-900 sketch-border text-center space-y-4 max-w-sm animate-in zoom-in-95">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-editorial text-xl font-bold">CRASHED! Head Impact Detected.</h3>
              <p className="text-xs text-slate-500 font-mono">
                Press <strong>R</strong> or click below to respawn at the latest checkpoint.
              </p>
            </div>
            <button
              onClick={() => respawnBike()}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded sketch-border w-full flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Respawn (R)</span>
            </button>
          </div>
        </div>
      )}

      {/* MOBILE ON-SCREEN TOUCH CONTROLS */}
      <div className="sm:hidden absolute bottom-4 left-4 right-4 flex justify-between items-center z-30 pointer-events-auto">
        {/* Left Cluster: Leaning */}
        <div className="flex gap-2">
          <button
            onTouchStart={() => handleTouch('ArrowLeft', true)}
            onTouchEnd={() => handleTouch('ArrowLeft', false)}
            onMouseDown={() => handleTouch('ArrowLeft', true)}
            onMouseUp={() => handleTouch('ArrowLeft', false)}
            className="w-14 h-14 bg-white/90 dark:bg-slate-800/90 sketch-border font-mono font-bold text-sm active:bg-slate-200"
          >
            ← Lean
          </button>
          <button
            onTouchStart={() => handleTouch('ArrowRight', true)}
            onTouchEnd={() => handleTouch('ArrowRight', false)}
            onMouseDown={() => handleTouch('ArrowRight', true)}
            onMouseUp={() => handleTouch('ArrowRight', false)}
            className="w-14 h-14 bg-white/90 dark:bg-slate-800/90 sketch-border font-mono font-bold text-sm active:bg-slate-200"
          >
            Lean →
          </button>
        </div>

        {/* Right Cluster: Pedal & Brake */}
        <div className="flex gap-2">
          <button
            onTouchStart={() => handleTouch('ArrowDown', true)}
            onTouchEnd={() => handleTouch('ArrowDown', false)}
            onMouseDown={() => handleTouch('ArrowDown', true)}
            onMouseUp={() => handleTouch('ArrowDown', false)}
            className="w-14 h-14 bg-rose-100/90 dark:bg-rose-950/90 sketch-border font-mono font-bold text-sm text-rose-700 active:bg-rose-200"
          >
            Brake
          </button>
          <button
            onTouchStart={() => handleTouch('ArrowUp', true)}
            onTouchEnd={() => handleTouch('ArrowUp', false)}
            onMouseDown={() => handleTouch('ArrowUp', true)}
            onMouseUp={() => handleTouch('ArrowUp', false)}
            className="w-14 h-14 bg-emerald-600/90 text-white sketch-border-accent font-mono font-bold text-sm active:bg-emerald-700"
          >
            Pedal ↑
          </button>
        </div>
      </div>

      {/* BOTTOM DESKTOP CONTROLS HINT (Hidden on mobile) */}
      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-white/80 dark:bg-slate-900/80 sketch-border text-[11px] font-mono text-slate-500 gap-4 pointer-events-none">
        <span><strong>W / ↑</strong>: Accelerate</span>
        <span><strong>S / ↓</strong>: Brake</span>
        <span><strong>A / ←</strong>: Lean Left</span>
        <span><strong>D / →</strong>: Lean Right</span>
        <span><strong>R</strong>: Respawn</span>
        <span><strong>Space</strong>: Pause</span>
        <span><strong>Esc</strong>: Exit</span>
      </div>
    </div>
  );
};
