import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameEngine, EngineInput } from './engine';
import { Checkpoint } from './track';
import { getProjectById } from '../../data/projects';
import { sfx } from '../../lib/sound';
import { X, RotateCcw, Pause as PauseIcon, Volume2, VolumeX, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, Play, Flag } from 'lucide-react';

interface Props {
  onExit: () => void;
  openProject: (id: string) => void;
}

export default function RideMode({ onExit, openProject }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [section, setSection] = useState({ name: 'THE WORKSHOP', num: '00' });
  const [progress, setProgress] = useState({ pct: 0, meters: 0 });
  const [paused, setPaused] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cp, setCp] = useState<Checkpoint | null>(null);
  const [muted, setMuted] = useState(() => localStorage.getItem('ay-sound-muted') !== 'false');
  const [hintVisible, setHintVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    sfx.setMuted(muted);
    localStorage.setItem('ay-sound-muted', String(muted));
  }, [muted]);

  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 7000);
    return () => clearTimeout(t);
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      const next = !p;
      if (next) engineRef.current?.pause();
      else engineRef.current?.resume();
      return next;
    });
  }, []);

  const openCpNotebook = useCallback(
    (id: string) => {
      engineRef.current?.pause();
      openProject(id);
      // resume when modal closes is handled by user pressing play again;
      // also auto-resume after modal closes:
    },
    [openProject]
  );

  useEffect(() => {
    const onModalCloseResume = () => engineRef.current?.resume();
    window.addEventListener('ay-resume-ride', onModalCloseResume);
    return () => window.removeEventListener('ay-resume-ride', onModalCloseResume);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const eng = new GameEngine(canvasRef.current, {
      onSection: (name, num) => setSection((s) => (s.name === name ? s : { name, num })),
      onProgress: (pct, meters) =>
        setProgress((p) => (Math.abs(p.pct - pct) > 0.4 ? { pct, meters } : p)),
      onCheckpoint: (c) => setCp(c),
      onCheckpointLeave: () => setCp(null),
      onCrash: () => setCrashed(true),
      onRespawn: () => setCrashed(false),
      onFinish: () => {
        setFinished(true);
      },
      requestPause: () => setPaused(true),
    });
    engineRef.current = eng;
    setReady(true);
    return () => {
      eng.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const input = engineRef.current?.input as EngineInput | undefined;
    if (!input) return;
    if (paused) {
      input.accel = input.brake = input.leanB = input.leanF = false;
    }
  }, [paused]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const eng = engineRef.current;
      if (!eng) return;
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          if (!pausedRef.current) eng.input.accel = true;
          e.preventDefault();
          break;
        case 'KeyS':
        case 'ArrowDown':
          if (!pausedRef.current) eng.input.brake = true;
          e.preventDefault();
          break;
        case 'KeyA':
        case 'ArrowLeft':
          if (!pausedRef.current) eng.input.leanB = true;
          e.preventDefault();
          break;
        case 'KeyD':
        case 'ArrowRight':
          if (!pausedRef.current) eng.input.leanF = true;
          e.preventDefault();
          break;
        case 'KeyR':
          eng.respawn(true);
          break;
        case 'Space':
          togglePause();
          e.preventDefault();
          break;
        case 'Escape':
          onExit();
          break;
      }
    };
    const up = (e: KeyboardEvent) => {
      const eng = engineRef.current;
      if (!eng) return;
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          eng.input.accel = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          eng.input.brake = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          eng.input.leanB = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          eng.input.leanF = false;
          break;
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [togglePause, onExit]);

  const hold = (key: keyof EngineInput) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      if (engineRef.current && !pausedRef.current) engineRef.current.input[key] = true;
    },
    onPointerUp: () => {
      if (engineRef.current) engineRef.current.input[key] = false;
    },
    onPointerLeave: () => {
      if (engineRef.current) engineRef.current.input[key] = false;
    },
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  const project = cp ? getProjectById(cp.projectId) : null;

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-paper select-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="ride-mode"
      style={{ touchAction: 'none' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" data-testid="ride-canvas" />

      {/* HUD top */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-3 p-3 md:p-4 pointer-events-none">
        <div className="frame-sm bg-paper px-3 py-2 shadow-hard-sm pointer-events-auto" data-testid="hud-section">
          <p className="label-mono text-ink3 text-[9px]">section</p>
          <p className="font-mono text-xs font-bold">
            {section.num} — {section.name}
          </p>
          <div className="w-36 md:w-52 h-1.5 bg-paper2 border border-ink/40 mt-1.5">
            <div className="h-full bg-red transition-[width] duration-200" style={{ width: `${progress.pct}%` }} />
          </div>
          <p className="font-mono text-[9px] text-ink3 mt-1" data-testid="hud-progress">
            {progress.pct.toFixed(0)}% · {progress.meters}m
          </p>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto">
          <button className="frame-sm bg-paper px-2.5 py-2 shadow-hard-sm font-mono text-[10px] font-bold flex items-center gap-1.5" onClick={() => engineRef.current?.respawn(true)} data-testid="hud-restart-btn">
            <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Restart</span> R
          </button>
          <button className="frame-sm bg-paper px-2.5 py-2 shadow-hard-sm font-mono text-[10px] font-bold flex items-center gap-1.5" onClick={togglePause} data-testid="hud-pause-btn">
            <PauseIcon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Pause</span>
          </button>
          <button
            className="frame-sm bg-paper px-2.5 py-2 shadow-hard-sm font-mono text-[10px] font-bold"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            data-testid="hud-mute-btn"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button className="frame-sm bg-ink text-paper px-2.5 md:px-3 py-2 shadow-hard-sm font-mono text-[10px] font-bold flex items-center gap-1.5" onClick={onExit} aria-label="Exit to portfolio" data-testid="hud-exit-btn">
            <X className="w-3.5 h-3.5" /> <span className="hidden md:inline">Exit to portfolio</span>
          </button>
        </div>
      </div>

      {/* control hints (desktop) */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 frame-sm bg-paper px-4 py-2 shadow-hard-sm font-mono text-[10px] text-ink2 hidden md:block pointer-events-none"
          >
            W accelerate · S brake · A/D lean · R restart · Space pause · Esc exit
          </motion.div>
        )}
      </AnimatePresence>

      {/* touch controls */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-end md:hidden" data-testid="touch-controls">
        <div className="flex gap-3">
          <button className="w-16 h-16 frame bg-paper shadow-hard-sm flex items-center justify-center font-mono text-xs font-bold" {...hold('leanB')} data-testid="touch-lean-b" aria-label="Lean backwards">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="w-16 h-16 frame bg-paper shadow-hard-sm flex items-center justify-center" {...hold('leanF')} data-testid="touch-lean-f" aria-label="Lean forwards">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-3">
          <button className="w-16 h-16 frame bg-paper shadow-hard-sm flex items-center justify-center" {...hold('brake')} data-testid="touch-brake" aria-label="Brake">
            <ChevronDown className="w-6 h-6" />
          </button>
          <button className="w-20 h-20 frame bg-ink text-paper shadow-hard-sm flex items-center justify-center" {...hold('accel')} data-testid="touch-accel" aria-label="Accelerate">
            <ChevronUp className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* checkpoint card */}
      <AnimatePresence>
        {cp && (
          <motion.div
            key={cp.projectId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="absolute left-3 md:left-4 bottom-40 md:bottom-6 max-w-[320px] md:max-w-sm frame bg-paper p-4 shadow-hard tape"
            data-testid="checkpoint-card"
          >
            <p className="label-mono text-red flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5" /> checkpoint reached
            </p>
            {cp.projectId === 'workshop' && (
              <>
                <h3 className="font-serif text-2xl leading-tight mt-1">The Workshop</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed">
                  This is the start of the engineering track — 8 sections, one per project. Ride right to begin.
                </p>
              </>
            )}
            {cp.projectId === 'finish' && (
              <>
                <h3 className="font-serif text-2xl leading-tight mt-1">End of the track</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed">
                  You rode the whole engineering journey. Every checkpoint you passed lives in the portfolio.
                </p>
              </>
            )}
            {project && (
              <>
                <h3 className="font-serif text-2xl leading-tight mt-1">{project.title}</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed">{project.tagline}</p>
              </>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {project && (
                <>
                  <button className="btn-ink !py-2 !px-3" onClick={() => openCpNotebook(project.id)} data-testid="cp-open-notebook">
                    Open notebook
                  </button>
                  <button
                    className="btn-outline !py-2 !px-3"
                    onClick={() => {
                      onExit();
                    }}
                    data-testid="cp-portfolio-jump"
                  >
                    See in portfolio
                  </button>
                </>
              )}
              <button
                className="btn-red !py-2 !px-3"
                onClick={() => {
                  setCp(null);
                  engineRef.current?.resume();
                }}
                data-testid="cp-resume-riding"
              >
                <Play className="w-3.5 h-3.5" /> Keep riding
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* pause overlay */}
      <AnimatePresence>
        {paused && !crashed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/45 flex items-center justify-center"
            data-testid="pause-overlay"
          >
            <div className="frame bg-paper p-8 text-center shadow-hard-lg max-w-xs w-full mx-4">
              <p className="label-mono text-red">paused</p>
              <h3 className="font-serif text-4xl mt-2">Catch your breath.</h3>
              <div className="mt-6 space-y-2.5">
                <button className="btn-ink w-full" onClick={togglePause} data-testid="pause-resume-btn">
                  <Play className="w-4 h-4" /> Resume riding
                </button>
                <button className="btn-outline w-full" onClick={onExit} data-testid="pause-exit-btn">
                  Exit to portfolio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* crash toast */}
      <AnimatePresence>
        {crashed && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 frame-sm bg-ink text-paper px-4 py-2 font-mono text-xs font-bold shadow-hard-sm"
            data-testid="crash-toast"
          >
            CRASHED — respawning at last checkpoint…
          </motion.div>
        )}
      </AnimatePresence>

      {/* finish overlay */}
      <AnimatePresence>
        {finished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-24 left-1/2 -translate-x-1/2 frame bg-paper px-6 py-4 text-center shadow-hard" data-testid="finish-banner">
            <p className="label-mono text-red">track complete</p>
            <p className="font-serif text-2xl mt-1">Every project, visited.</p>
            <button className="btn-ink mt-3 !py-2" onClick={onExit} data-testid="finish-exit-btn">
              Back to portfolio
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="label-mono animate-pulse">Rolling out the track…</p>
        </div>
      )}
    </motion.div>
  );
}
