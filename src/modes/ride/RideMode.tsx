import { useEffect, useRef, useState } from "react";
import { GameEngine } from "./engine";
import type { GameView } from "./engine";
import type { EngineInput } from "./physics";
import { sfx } from "../../lib/sound";
type Control = keyof EngineInput;
const keys: Record<string, Control> = {
  ArrowUp: "accel",
  w: "accel",
  ArrowDown: "brake",
  s: "brake",
  ArrowLeft: "leanB",
  a: "leanB",
  ArrowRight: "leanF",
  d: "leanF",
};
const clock = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
export default function RideMode({
  onExit,
  openProject,
}: {
  onExit: () => void;
  openProject: (id: string) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    engine = useRef<GameEngine | null>(null),
    sources = useRef(new Map<string, Control>()),
    exit = useRef(onExit),
    file = useRef<HTMLInputElement>(null);
  useEffect(() => {
    exit.current = onExit;
  }, [onExit]);
  const [v, setView] = useState<GameView | null>(null),
    [muted, setMuted] = useState(() => sfx.muted),
    [error, setError] = useState(""),
    [tool, setTool] = useState<"physics" | "scenery" | "eraser">("physics");
  const sync = () => {
    const e = engine.current;
    if (!e) return;
    for (const k of ["accel", "brake", "leanB", "leanF"] as Control[])
      e.input[k] =
        e.status === "running" && [...sources.current.values()].includes(k);
  };
  const clear = () => {
    sources.current.clear();
    engine.current?.clearInput();
  };
  useEffect(() => {
    const e = new GameEngine(canvas.current!, (value) => {
      if (value.status !== "running") sources.current.clear();
      setView(value);
    });
    engine.current = e;
    const down = (ev: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) {
        clear();
        return;
      }
      const target = ev.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const key = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
      if (keys[key]) {
        ev.preventDefault();
        sources.current.set(`key:${key}`, keys[key]);
        sync();
      } else if (key === "Escape") {
        ev.preventDefault();
        exit.current();
      } else if (key === " ") {
        if (target.tagName === "BUTTON") return;
        ev.preventDefault();
        if (!ev.repeat) e.togglePause();
        clear();
      } else if (key === "r" && e.status !== "editor") {
        ev.preventDefault();
        if (!ev.repeat) e.respawn();
        clear();
      } else if (key === "Backspace" && e.status !== "editor") {
        ev.preventDefault();
        if (!ev.repeat) e.respawn(true);
        clear();
      }
    };
    const up = (ev: KeyboardEvent) => {
      const key = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
      sources.current.delete(`key:${key}`);
      sync();
    };
    const blur = () => {
      clear();
      e.pause();
    };
    const visibility = () => {
      if (document.hidden) blur();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      e.dispose();
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", visibility);
      engine.current = null;
    };
  }, []);
  const run = (action: (e: GameEngine) => void) => {
    try {
      setError("");
      if (engine.current) {
        clear();
        action(engine.current);
        engine.current.emit();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to change this track.",
      );
    }
  };
  const touch = (control: Control, label: string, key: string) => (
    <button
      className={`ride-key key-${control}`}
      aria-label={label}
      onPointerDown={(ev) => {
        ev.preventDefault();
        ev.currentTarget.setPointerCapture(ev.pointerId);
        sources.current.set(`pointer:${ev.pointerId}`, control);
        sync();
      }}
      onPointerUp={(ev) => {
        sources.current.delete(`pointer:${ev.pointerId}`);
        sync();
      }}
      onPointerCancel={(ev) => {
        sources.current.delete(`pointer:${ev.pointerId}`);
        sync();
      }}
      onLostPointerCapture={(ev) => {
        sources.current.delete(`pointer:${ev.pointerId}`);
        sync();
      }}
    >
      <span>{label}</span>
      <kbd>{key}</kbd>
    </button>
  );
  const e = engine.current,
    editing = v?.status === "editor",
    projectStops = v?.totalProjectStops ?? 0,
    overlay =
      v &&
      ["ready", "paused", "crashed", "checkpoint", "finished"].includes(
        v.status,
      );
  return (
    <main className="ride-app" data-testid="ride-mode">
      <header className="ride-header">
        <button onClick={onExit} className="ride-exit">
          ← Portfolio
        </button>
        <div className="ride-brand">
          THE ENGINEERING TRAIL
          <span>A hand-drawn ride through the things I build.</span>
        </div>
        <div className="ride-top-actions">
          <button
            aria-label={muted ? "Enable sound" : "Mute sound"}
            onClick={() => {
              const next = !muted;
              setMuted(next);
              sfx.setMuted(next);
              if (!next) sfx.click();
            }}
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
          <button
            onClick={() =>
              run((x) => (editing ? x.returnTrail() : x.openEditor()))
            }
          >
            {editing ? "Leave editor" : "Track editor"}
          </button>
        </div>
      </header>
      {!editing && v && (
        <div className="ride-hud">
          <div>
            <span className="label-mono">
              {String(v.section + 1).padStart(2, "0")} / 09
            </span>
            <strong data-testid="section-name">{v.sectionName}</strong>
          </div>
          <div className="ride-stats">
            <span>
              <b data-testid="ride-speed">{Math.round(v.speed)}</b> km/h
            </span>
            <span>
              ★{" "}
              <b data-testid="ride-stars">
                {v.stars}/{v.totalStars}
              </b>
            </span>
            <span data-testid="ride-clock">{clock(v.seconds)}</span>
            <button
              aria-label={v.status === "running" ? "Pause ride" : "Resume ride"}
              disabled={!["running", "paused"].includes(v.status)}
              onClick={() => run((x) => x.togglePause())}
            >
              {v.status === "running" ? "Pause" : "Resume"}
            </button>
          </div>
          <div
            className="ride-progress"
            role="progressbar"
            aria-label="Course progress"
            aria-valuenow={Math.round(v.progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i style={{ width: `${v.progress}%` }} />
          </div>
        </div>
      )}
      {editing && (
        <div className="editor-toolbar">
          <div className="editor-tools" aria-label="Drawing tools">
            {(["physics", "scenery", "eraser"] as const).map((t) => (
              <button
                key={t}
                aria-pressed={tool === t}
                onClick={() => {
                  setTool(t);
                  run((x) => {
                    x.editorTool = t;
                  });
                }}
              >
                {t === "physics"
                  ? "Collision line"
                  : t === "scenery"
                    ? "Scenery line"
                    : "Eraser"}
              </button>
            ))}
          </div>
          <button
            disabled={!v?.canUndo}
            onClick={() => run((x) => x.editor.undo())}
          >
            Undo
          </button>
          <button
            disabled={!v?.canRedo}
            onClick={() => run((x) => x.editor.redo())}
          >
            Redo
          </button>
          <button onClick={() => run((x) => x.editor.clear())}>Clear</button>
          <button onClick={() => file.current?.click()}>Import JSON</button>
          <button
            onClick={() =>
              run((x) => {
                const blob = new Blob([x.editor.export()], {
                    type: "application/json",
                  }),
                  url = URL.createObjectURL(blob),
                  a = document.createElement("a");
                a.href = url;
                a.download = "engineering-trail.json";
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              })
            }
          >
            Export JSON
          </button>
          <button
            className="editor-test"
            onClick={() => run((x) => x.testRide())}
          >
            Test ride →
          </button>
          <input
            ref={file}
            type="file"
            accept=".json,application/json"
            aria-label="Import track file"
            hidden
            onChange={async (ev) => {
              const f = ev.target.files?.[0];
              if (f) {
                if (f.size > 600000)
                  setError("Track files must be smaller than 600 KB.");
                else {
                  const text = await f.text();
                  run((x) => x.editor.import(text));
                }
              }
              ev.target.value = "";
            }}
          />
        </div>
      )}
      <div className="ride-stage">
        <canvas
          ref={canvas}
          aria-label={
            editing
              ? "Track drawing canvas. Drag to add a line."
              : "Bicycle game. Accelerate with W, lean with A and D, brake with S."
          }
          tabIndex={0}
          onPointerDown={(ev) => {
            if (!editing || !e) return;
            ev.currentTarget.setPointerCapture(ev.pointerId);
            const p = e.screenToWorld(ev.clientX, ev.clientY);
            if (tool === "eraser") run((x) => x.editor.erase(p.x, p.y));
            else e.draft = { a: p, b: p };
          }}
          onPointerMove={(ev) => {
            if (!editing || !e?.draft) return;
            e.draft.b = e.screenToWorld(ev.clientX, ev.clientY);
          }}
          onPointerUp={() => {
            if (!editing || !e?.draft) return;
            const line = e.draft;
            e.draft = null;
            if (tool !== "eraser") run((x) => x.editor.add(tool, line));
          }}
          onPointerCancel={() => {
            if (e) e.draft = null;
          }}
        >
          This game needs Canvas. The complete portfolio and project notebooks
          are available without playing.
        </canvas>
        {editing && (
          <div className="editor-pan">
            <button
              aria-label="Pan editor left"
              onClick={() =>
                run((x) => {
                  x.camX -= 8;
                })
              }
            >
              ←
            </button>
            <button
              aria-label="Pan editor right"
              onClick={() =>
                run((x) => {
                  x.camX += 8;
                })
              }
            >
              →
            </button>
            <button
              aria-label="Pan editor up"
              onClick={() =>
                run((x) => {
                  x.camY += 4;
                })
              }
            >
              ↑
            </button>
            <button
              aria-label="Pan editor down"
              onClick={() =>
                run((x) => {
                  x.camY -= 4;
                })
              }
            >
              ↓
            </button>
            <button
              aria-label="Zoom out"
              onClick={() =>
                run((x) => {
                  x.zoom = Math.max(12, x.zoom / 1.2);
                })
              }
            >
              −
            </button>
            <button
              aria-label="Zoom in"
              onClick={() =>
                run((x) => {
                  x.zoom = Math.min(80, x.zoom * 1.2);
                })
              }
            >
              +
            </button>
            <span data-testid="editor-count">
              {v?.lines} collision / {v?.scenery} scenery
            </span>
          </div>
        )}
        {overlay && (
          <section
            className={`ride-overlay status-${v.status}`}
            aria-label="Ride status"
            aria-live="polite"
          >
            {v.status === "ready" && (
              <>
                <span className="annotation">Take the scenic route.</span>
                <h1>IDEAS. IN MOTION.</h1>
                <p>
                  Nine places. Seven projects. Two wheels.
                  <br />
                  Ride the landscape of my engineering work.
                </p>
                <dl className="ride-instructions">
                  <div>
                    <dt>W / ↑</dt>
                    <dd>Pedal</dd>
                  </div>
                  <div>
                    <dt>S / ↓</dt>
                    <dd>Brake</dd>
                  </div>
                  <div>
                    <dt>A / ←</dt>
                    <dd>Lean back</dd>
                  </div>
                  <div>
                    <dt>D / →</dt>
                    <dd>Lean forward</dd>
                  </div>
                </dl>
                <p className="ride-hint">
                  Build speed before gaps. Make small lean corrections in the
                  air. Touch controls are below.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    run((x) => x.play());
                    canvas.current?.focus();
                  }}
                >
                  Start riding →
                </button>
                <small>
                  R restarts at a flag · Space pauses · Escape exits
                </small>
              </>
            )}
            {v.status === "paused" && (
              <>
                <span className="annotation">
                  A moment to catch your breath.
                </span>
                <h2>ON THE BRAKES.</h2>
                <p>Your position is saved. The clock is stopped.</p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    run((x) => x.play());
                    canvas.current?.focus();
                  }}
                >
                  Continue riding
                </button>
                <button onClick={() => run((x) => x.respawn())}>
                  Restart at checkpoint
                </button>
              </>
            )}
            {v.status === "crashed" && (
              <>
                <span className="annotation">
                  That’s engineering. Try again.
                </span>
                <h2>A ROUGH LANDING.</h2>
                <p>
                  {v.crashes} {v.crashes === 1 ? "crash" : "crashes"} · Your
                  collected stars are safe.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    run((x) => x.respawn());
                    canvas.current?.focus();
                  }}
                >
                  Retry checkpoint · R
                </button>
                {v.custom && (
                  <button onClick={() => run((x) => x.openEditor())}>
                    Back to drawing board
                  </button>
                )}
              </>
            )}
            {v.status === "checkpoint" && (
              <>
                <span className="annotation">
                  Project stop {v.checkpoint} / {projectStops}
                </span>
                <h2>PROJECT STOP</h2>
                <p>
                  {v.sectionName} is in the notebook. The ride is paused while
                  you read.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    const id = e?.track.checkpoints[v.checkpoint]?.project;
                    if (id) openProject(id);
                  }}
                >
                  Read project notebook
                </button>
                <button
                  onClick={() => {
                    run((x) => x.play());
                    canvas.current?.focus();
                  }}
                >
                  Continue riding →
                </button>
              </>
            )}
            {v.status === "finished" && (
              <>
                <span className="annotation">Curiosity got you here.</span>
                <h2>WHAT A RIDE.</h2>
                <div className="finish-stats">
                  <span>
                    <b>{clock(v.seconds)}</b>ride time
                  </span>
                  <span>
                    <b>
                      {v.stars}/{v.totalStars}
                    </b>
                    stars found
                  </span>
                  <span>
                    <b>{v.crashes}</b>crashes
                  </span>
                </div>
                <p>
                  {v.custom
                    ? "Your custom track is rideable. Keep experimenting."
                    : "Nine landscapes explored. There’s more to discover in the workshop."}
                </p>
                <button className="btn-primary" onClick={onExit}>
                  Back to the portfolio →
                </button>
                <button
                  onClick={() =>
                    run((x) => (x.custom ? x.openEditor() : x.respawn(true)))
                  }
                >
                  {v.custom ? "Back to editor" : "Ride again"}
                </button>
              </>
            )}
          </section>
        )}
      </div>
      {error && (
        <div role="alert" className="ride-error">
          {error}
          <button aria-label="Dismiss error" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}
      {editing ? (
        <footer className="editor-footer">
          Drag to draw · Erase by tapping a line · Undo restores deletions and
          clears · Drafts stay separate from the main trail.
        </footer>
      ) : (
        <footer className="ride-controls">
          <div className="control-pair">
            {touch("leanB", "Lean back", "A / ←")}
            {touch("leanF", "Lean forward", "D / →")}
          </div>
          <div className="ride-footer-actions">
            <button onClick={() => run((x) => x.respawn())}>
              Restart flag · R
            </button>
            {v?.custom ? (
              <button onClick={() => run((x) => x.openEditor())}>
                Back to editor
              </button>
            ) : (
              <button onClick={() => run((x) => x.respawn(true))}>
                Restart trail
              </button>
            )}
          </div>
          <div className="control-pair">
            {touch("brake", "Brake", "S / ↓")}
            {touch("accel", "Pedal", "W / ↑")}
          </div>
        </footer>
      )}
    </main>
  );
}
