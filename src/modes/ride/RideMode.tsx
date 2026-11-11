import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameEngine, EngineInput } from './engine';
import { Checkpoint } from './track';
import { getProjectById } from '../../data/projects';
import { sfx } from '../../lib/sound';
import { X, RotateCcw, Pause as PauseIcon, Volume2, VolumeX, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, Play, Flag, Sparkles } from 'lucide-react';

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

      {/* Clean Minimal Free Rider HUD Top Bar */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-3 p-3 md:p-4 pointer-events-none z-10">
        {/* Section & Progress Capsule */}
        <div
          className="bg-paper/95 backdrop-blur-md rounded-2xl border border-ink3/30 px-4 py-2.5 shadow-sm pointer-events-auto"
          data-testid="hud-section"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="font-sans text-xs font-semibold text-ink">
              {section.num} — {section.name}
            </p>
          </div>
          <div className="w-36 md:w-48 h-1.5 bg-paper2 rounded-full overflow-hidden border border-ink3/20 mt-2">
            <div
              className="h-full bg-accent transition-[width] duration-200 rounded-full"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
          <p className="font-mono text-[10px] text-ink3 mt-1" data-testid="hud-progress">
            {progress.pct.toFixed(0)}% · {progress.meters}m
          </p>
        </div>

        {/* Minimal Control Pill */}
        <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto bg-paper/95 backdrop-blur-md rounded-full border border-ink3/30 p-1.5 shadow-sm">
          <button
            className="px-3 py-1.5 rounded-full hover:bg-paper2 text-xs font-sans font-medium text-ink flex items-center gap-1.5 transition-colors"
            onClick={() => engineRef.current?.respawn(true)}
            data-testid="hud-restart-btn"
            title="Restart at last checkpoint (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            className="px-3 py-1.5 rounded-full hover:bg-paper2 text-xs font-sans font-medium text-ink flex items-center gap-1.5 transition-colors"
            onClick={togglePause}
            data-testid="hud-pause-btn"
            title="Pause game (Space)"
          >
            <PauseIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{paused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            className="w-8 h-8 rounded-full hover:bg-paper2 flex items-center justify-center text-ink transition-colors"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            data-testid="hud-mute-btn"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            className="btn-ink !py-1.5 !px-3.5 text-xs rounded-full flex items-center gap-1.5"
            onClick={onExit}
            aria-label="Exit to portfolio"
            data-testid="hud-exit-btn"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Exit to portfolio</span>
          </button>
        </div>
      </div>

      {/* Control hints (desktop) */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur-sm rounded-full border border-ink3/30 px-5 py-2 shadow-sm font-sans text-xs text-ink2 hidden md:block pointer-events-none z-10"
          >
            W / Up accelerate · S / Down brake · A/D lean · R restart · Space pause · Esc exit
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile touch controls */}
      <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-end md:hidden z-20 pointer-events-none" data-testid="touch-controls">
        <div className="flex gap-2.5 pointer-events-auto">
          <button
            className="w-14 h-14 rounded-2xl bg-paper/90 backdrop-blur-sm border border-ink3/40 shadow-md flex items-center justify-center text-ink active:scale-95"
            {...hold('leanB')}
            data-testid="touch-lean-b"
            aria-label="Lean backwards"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            className="w-14 h-14 rounded-2xl bg-paper/90 backdrop-blur-sm border border-ink3/40 shadow-md flex items-center justify-center text-ink active:scale-95"
            {...hold('leanF')}
            data-testid="touch-lean-f"
            aria-label="Lean forwards"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2.5 pointer-events-auto">
          <button
            className="w-14 h-14 rounded-2xl bg-paper/90 backdrop-blur-sm border border-ink3/40 shadow-md flex items-center justify-center text-ink active:scale-95"
            {...hold('brake')}
            data-testid="touch-brake"
            aria-label="Brake"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
          <button
            className="w-16 h-16 rounded-2xl bg-accent text-paper shadow-md flex items-center justify-center active:scale-95"
            {...hold('accel')}
            data-testid="touch-accel"
            aria-label="Accelerate"
          >
            <ChevronUp className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Checkpoint card */}
      <AnimatePresence>
        {cp && (
          <motion.div
            key={cp.projectId}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="absolute left-3 md:left-6 bottom-36 md:bottom-6 max-w-[320px] md:max-w-sm bg-paper rounded-2xl border-2 border-ink3/30 p-5 shadow-lg z-20 postcard"
            data-testid="checkpoint-card"
          >
            <p className="text-xs font-semibold text-accent flex items-center gap-1.5 font-sans">
              <Flag className="w-3.5 h-3.5" /> Checkpoint Reached
            </p>
            {cp.projectId === 'workshop' && (
              <>
                <h3 className="font-serif text-2xl font-semibold leading-tight mt-1 text-ink">The Workshop</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed font-sans">
                  The beginning of the engineering track — 8 continuous sections, one per project. Ride right to begin.
                </p>
              </>
            )}
            {cp.projectId === 'finish' && (
              <>
                <h3 className="font-serif text-2xl font-semibold leading-tight mt-1 text-ink">End of the Track</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed font-sans">
                  You rode through every engineering project. Return to the portfolio to inspect any in detail.
                </p>
              </>
            )}
            {project && (
              <>
                <h3 className="font-serif text-2xl font-semibold leading-tight mt-1 text-ink">{project.title}</h3>
                <p className="text-xs text-ink2 mt-1.5 leading-relaxed font-sans">{project.tagline}</p>
              </>
            )}
            <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-ink3/20">
              {project && (
                <>
                  <button
                    className="btn-ink !py-1.5 !px-3 text-xs"
                    onClick={() => openCpNotebook(project.id)}
                    data-testid="cp-open-notebook"
                  >
                    Open notebook
                  </button>
                  <button
                    className="btn-outline !py-1.5 !px-3 text-xs"
                    onClick={() => onExit()}
                    data-testid="cp-portfolio-jump"
                  >
                    See in portfolio
                  </button>
                </>
              )}
              <button
                className="btn-red !py-1.5 !px-3 text-xs flex items-center gap-1"
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

      {/* Pause overlay */}
      <AnimatePresence>
        {paused && !crashed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/30 backdrop-blur-xs flex items-center justify-center z-30"
            data-testid="pause-overlay"
          >
            <div className="bg-paper rounded-3xl border border-ink3/30 p-8 text-center shadow-xl max-w-xs w-full mx-4">
              <span className="sticker text-xs text-accent">Game Paused</span>
              <h3 className="font-serif text-3xl font-semibold mt-2 text-ink">Catch your breath.</h3>
              <p className="text-xs text-ink2 mt-2 font-sans">
                Take a pause or return to the illustrated portfolio exhibition.
              </p>
              <div className="mt-6 space-y-2.5">
                <button
                  className="btn-ink w-full text-xs flex items-center justify-center gap-1.5"
                  onClick={togglePause}
                  data-testid="pause-resume-btn"
                >
                  <Play className="w-4 h-4" /> Resume riding
                </button>
                <button
                  className="btn-outline w-full text-xs"
                  onClick={onExit}
                  data-testid="pause-exit-btn"
                >
                  Exit to portfolio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crash toast */}
      <AnimatePresence>
        {crashed && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-accent text-paper px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-md z-20"
            data-testid="crash-toast"
          >
            CRASHED — respawning at last checkpoint…
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finish overlay */}
      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-paper rounded-2xl border border-ink3/30 px-6 py-4 text-center shadow-lg z-20"
            data-testid="finish-banner"
          >
            <span className="sticker text-xs text-accent">Track Complete</span>
            <p className="font-serif text-2xl font-semibold mt-1 text-ink">Every project visited!</p>
            <button className="btn-ink mt-3 !py-1.5 !px-4 text-xs" onClick={onExit} data-testid="finish-exit-btn">
              Back to portfolio
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-sans text-xs text-ink3 animate-pulse">Rolling out the track…</p>
        </div>
      )}
    </motion.div>
  );
}
