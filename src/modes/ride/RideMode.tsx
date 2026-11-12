import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameEngine, EngineInput } from './engine';
import { Checkpoint } from './track';
import { getProjectById } from '../../data/projects';
import { sfx } from '../../lib/sound';
import {
  X,
  RotateCcw,
  Pause as PauseIcon,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Play,
  Flag,
  Pencil,
  Brush,
  Eraser,
  Undo2,
  Trash2,
  Star,
} from 'lucide-react';

interface Props {
  onExit: () => void;
  openProject: (id: string) => void;
}

export default function RideMode({ onExit, openProject }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [section, setSection] = useState({ name: 'THE WORKSHOP', num: '00' });
  const [progress, setProgress] = useState({ pct: 0, meters: 0 });
  const [stars, setStars] = useState({ collected: 0, total: 20 });
  const [paused, setPaused] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cp, setCp] = useState<Checkpoint | null>(null);
  const [muted, setMuted] = useState(() => localStorage.getItem('ay-sound-muted') !== 'false');
  const [hintVisible, setHintVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Track Editor state
  const [editorMode, setEditorMode] = useState(false);
  const [editorTool, setEditorTool] = useState<'physics' | 'scenery' | 'eraser'>('physics');
  const lastDrawPt = useRef<{ x: number; y: number } | null>(null);
  const isDrawing = useRef(false);

  const pausedRef = useRef(false);
  pausedRef.current = paused;
  const editorModeRef = useRef(false);
  editorModeRef.current = editorMode;

  useEffect(() => {
    sfx.setMuted(muted);
    localStorage.setItem('ay-sound-muted', String(muted));
  }, [muted]);

  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 7000);
    return () => clearTimeout(t);
  }, []);

  const togglePause = useCallback(() => {
    if (editorModeRef.current) return;
    setPaused((p) => {
      const next = !p;
      if (next) engineRef.current?.pause();
      else engineRef.current?.resume();
      return next;
    });
  }, []);

  const toggleEditor = useCallback(() => {
    setEditorMode((prev) => {
      const next = !prev;
      editorModeRef.current = next;
      if (engineRef.current) {
        engineRef.current.editorActive = next;
        engineRef.current.editorTool = editorTool;
        if (next) {
          engineRef.current.pause();
        } else {
          engineRef.current.resume();
        }
      }
      return next;
    });
  }, [editorTool]);

  const selectTool = (tool: 'physics' | 'scenery' | 'eraser') => {
    setEditorTool(tool);
    if (engineRef.current) {
      engineRef.current.editorTool = tool;
    }
  };

  const openCpNotebook = useCallback(
    (id: string) => {
      engineRef.current?.pause();
      openProject(id);
    },
    [openProject]
  );

  useEffect(() => {
    const onModalCloseResume = () => {
      if (!editorModeRef.current) engineRef.current?.resume();
    };
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
      onStarCollect: (collected, total) => setStars({ collected, total }),
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
    if (paused || editorMode) {
      input.accel = input.brake = input.leanB = input.leanF = false;
    }
  }, [paused, editorMode]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const eng = engineRef.current;
      if (!eng) return;

      // Editor shortcuts
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') {
        eng.undo();
        e.preventDefault();
        return;
      }
      if (e.code === 'KeyE' && !e.ctrlKey && !e.metaKey) {
        toggleEditor();
        e.preventDefault();
        return;
      }

      if (editorModeRef.current) return;

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
      if (!eng || editorModeRef.current) return;
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
    const resetInputs = () => {
      const eng = engineRef.current;
      if (eng) {
        eng.input.accel = false;
        eng.input.brake = false;
        eng.input.leanB = false;
        eng.input.leanF = false;
      }
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', resetInputs);
    window.addEventListener('pointerup', resetInputs);
    window.addEventListener('pointercancel', resetInputs);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', resetInputs);
      window.removeEventListener('pointerup', resetInputs);
      window.removeEventListener('pointercancel', resetInputs);
    };
  }, [togglePause, toggleEditor, onExit]);

  // Editor drawing interactions
  const handleEditorPointerDown = (e: React.PointerEvent) => {
    if (!engineRef.current || !editorMode) return;
    const eng = engineRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const [wx, wy] = eng.screenToWorld(sx, sy);

    if (editorTool === 'eraser') {
      eng.eraseAt(wx, wy);
      isDrawing.current = true;
    } else {
      isDrawing.current = true;
      lastDrawPt.current = { x: wx, y: wy };
    }
  };

  const handleEditorPointerMove = (e: React.PointerEvent) => {
    if (!engineRef.current || !editorMode || !isDrawing.current) return;
    const eng = engineRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const [wx, wy] = eng.screenToWorld(sx, sy);

    if (editorTool === 'eraser') {
      eng.eraseAt(wx, wy);
    } else if (lastDrawPt.current) {
      const dist = Math.hypot(wx - lastDrawPt.current.x, wy - lastDrawPt.current.y);
      if (dist >= 18) {
        if (editorTool === 'physics') {
          eng.addCustomSegment({
            x1: lastDrawPt.current.x,
            y1: lastDrawPt.current.y,
            x2: wx,
            y2: wy,
          });
        } else {
          eng.addCustomScenery({
            x1: lastDrawPt.current.x,
            y1: lastDrawPt.current.y,
            x2: wx,
            y2: wy,
          });
        }
        lastDrawPt.current = { x: wx, y: wy };
        eng.editorDraftLine = null;
      } else {
        eng.editorDraftLine = {
          x1: lastDrawPt.current.x,
          y1: lastDrawPt.current.y,
          x2: wx,
          y2: wy,
        };
      }
    }
  };

  const handleEditorPointerUp = (e: React.PointerEvent) => {
    if (!engineRef.current || !editorMode || !isDrawing.current) return;
    const eng = engineRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && lastDrawPt.current && editorTool !== 'eraser') {
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const [wx, wy] = eng.screenToWorld(sx, sy);
      const dist = Math.hypot(wx - lastDrawPt.current.x, wy - lastDrawPt.current.y);
      if (dist >= 6) {
        if (editorTool === 'physics') {
          eng.addCustomSegment({
            x1: lastDrawPt.current.x,
            y1: lastDrawPt.current.y,
            x2: wx,
            y2: wy,
          });
        } else {
          eng.addCustomScenery({
            x1: lastDrawPt.current.x,
            y1: lastDrawPt.current.y,
            x2: wx,
            y2: wy,
          });
        }
      }
    }
    isDrawing.current = false;
    lastDrawPt.current = null;
    eng.editorDraftLine = null;
  };

  const hold = (key: keyof EngineInput) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      if (engineRef.current && !pausedRef.current && !editorModeRef.current) engineRef.current.input[key] = true;
    },
    onPointerUp: () => {
      if (engineRef.current) engineRef.current.input[key] = false;
    },
    onPointerLeave: () => {
      if (engineRef.current) engineRef.current.input[key] = false;
    },
    onPointerCancel: () => {
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
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${editorMode ? 'cursor-crosshair' : 'cursor-default'}`}
        data-testid="ride-canvas"
        onPointerDown={handleEditorPointerDown}
        onPointerMove={handleEditorPointerMove}
        onPointerUp={handleEditorPointerUp}
        onPointerCancel={handleEditorPointerUp}
      />

      {/* Free Rider HUD Top Bar */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-3 p-3 md:p-4 pointer-events-none z-10">
        {/* Section, Progress & Collectible Stars Capsule */}
        <div
          className="bg-paper/95 backdrop-blur-md rounded-2xl border border-ink3/30 px-3.5 md:px-4 py-2.5 shadow-sm pointer-events-auto flex items-center gap-3.5"
          data-testid="hud-section"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="font-sans text-xs font-semibold text-ink">
                {section.num} — {section.name}
              </p>
            </div>
            <div className="w-28 sm:w-36 md:w-44 h-1.5 bg-paper2 rounded-full overflow-hidden border border-ink3/20 mt-1.5">
              <div
                className="h-full bg-accent transition-[width] duration-200 rounded-full"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
            <p className="font-mono text-[10px] text-ink3 mt-1" data-testid="hud-progress">
              {progress.pct.toFixed(0)}% · {progress.meters}m
            </p>
          </div>

          {/* Golden Star Counter */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-300 rounded-xl shadow-xs"
            title="Collectible Golden Stars"
            data-testid="hud-stars"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-mono text-xs font-bold text-amber-900">
              {stars.collected}/{stars.total}
            </span>
          </div>
        </div>

        {/* HUD Control Pill */}
        <div className="flex items-center gap-1 md:gap-1.5 pointer-events-auto bg-paper/95 backdrop-blur-md rounded-full border border-ink3/30 p-1.5 shadow-sm">
          {/* Track Editor Toggle */}
          <button
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium flex items-center gap-1.5 transition-all ${
              editorMode
                ? 'bg-ink text-paper shadow-xs font-semibold'
                : 'hover:bg-paper2 text-ink'
            }`}
            onClick={toggleEditor}
            data-testid="hud-editor-btn"
            title="Toggle Track Editor (E)"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{editorMode ? 'Riding' : 'Editor'}</span>
          </button>

          <button
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-paper2 text-xs font-sans font-medium text-ink flex items-center gap-1.5 transition-colors"
            onClick={() => engineRef.current?.respawn(true)}
            data-testid="hud-restart-btn"
            title="Restart at last checkpoint (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Restart</span>
          </button>

          <button
            className="px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-paper2 text-xs font-sans font-medium text-ink flex items-center gap-1.5 transition-colors"
            onClick={togglePause}
            data-testid="hud-pause-btn"
            title="Pause game (Space)"
          >
            <PauseIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{paused ? 'Resume' : 'Pause'}</span>
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
            className="btn-ink !py-1.5 !px-3 text-xs rounded-full flex items-center gap-1.5"
            onClick={onExit}
            aria-label="Exit to portfolio"
            data-testid="hud-exit-btn"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* Floating Track Editor Toolbar */}
      <AnimatePresence>
        {editorMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-paper/95 backdrop-blur-md rounded-2xl border-2 border-ink shadow-xl p-2 z-30 flex items-center gap-2 max-w-[95vw] overflow-x-auto pointer-events-auto"
            data-testid="track-editor-toolbar"
          >
            <div className="flex items-center gap-1 border-r border-ink3/30 pr-2">
              <button
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  editorTool === 'physics'
                    ? 'bg-ink text-paper shadow-xs'
                    : 'hover:bg-paper2 text-ink'
                }`}
                onClick={() => selectTool('physics')}
                data-testid="editor-tool-physics"
                title="Solid Physics Line (Bikes ride and collide on this)"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Solid Terrain</span>
              </button>

              <button
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  editorTool === 'scenery'
                    ? 'bg-accent2 text-paper shadow-xs'
                    : 'hover:bg-paper2 text-ink'
                }`}
                onClick={() => selectTool('scenery')}
                data-testid="editor-tool-scenery"
                title="Scenery Line (Decorative, non-colliding)"
              >
                <Brush className="w-3.5 h-3.5" />
                <span>Scenery</span>
              </button>

              <button
                className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  editorTool === 'eraser'
                    ? 'bg-accent text-paper shadow-xs'
                    : 'hover:bg-paper2 text-ink'
                }`}
                onClick={() => selectTool('eraser')}
                data-testid="editor-tool-eraser"
                title="Eraser (Click or drag to delete lines)"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-ink3/30 pr-2">
              <button
                className="px-2.5 py-1.5 rounded-xl hover:bg-paper2 font-sans text-xs font-medium text-ink flex items-center gap-1 transition-colors"
                onClick={() => engineRef.current?.undo()}
                data-testid="editor-tool-undo"
                title="Undo last line (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Undo</span>
              </button>

              <button
                className="px-2.5 py-1.5 rounded-xl hover:bg-red-50 text-accent font-sans text-xs font-medium flex items-center gap-1 transition-colors"
                onClick={() => engineRef.current?.clearCustomTrack()}
                data-testid="editor-tool-clear"
                title="Reset track to original"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Reset</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="px-2.5 py-1.5 rounded-xl hover:bg-paper2 font-sans text-xs text-ink3 hover:text-ink transition-colors"
                onClick={() => {
                  if (engineRef.current) {
                    engineRef.current.camX = engineRef.current.track.startX;
                    engineRef.current.camY = engineRef.current.track.startY;
                  }
                }}
                title="Center camera on start ramp"
              >
                To Start
              </button>
              <button
                className="px-2.5 py-1.5 rounded-xl hover:bg-paper2 font-sans text-xs text-ink3 hover:text-ink transition-colors"
                onClick={() => {
                  if (engineRef.current) {
                    engineRef.current.camX = engineRef.current.frame.x;
                    engineRef.current.camY = engineRef.current.frame.y - 42;
                  }
                }}
                title="Center camera on bicycle"
              >
                To Bike
              </button>
              <button
                className="btn-ink !py-1.5 !px-3 text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
                onClick={toggleEditor}
                data-testid="editor-tool-ride"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test Ride!</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control hints (desktop) */}
      <AnimatePresence>
        {hintVisible && !editorMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur-sm rounded-full border border-ink3/30 px-5 py-2 shadow-sm font-sans text-xs text-ink2 hidden md:block pointer-events-none z-10"
          >
            W / Up accelerate · S / Down brake · A/D lean · R restart · E editor · Space pause · Esc exit
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile touch controls */}
      {!editorMode && (
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
      )}

      {/* Checkpoint card */}
      <AnimatePresence>
        {cp && !editorMode && (
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
        {paused && !editorMode && (
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
        {crashed && !editorMode && (
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
