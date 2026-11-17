import { Suspense, useEffect, useRef } from "react";
import type { ProjectDefinition } from "../../data/projects";
import { demos } from "../../projects/demos";
import { ErrorBoundary } from "../../components/ErrorBoundary";
const flows: Record<string, string[]> = {
  "onnx-gnn": ["EXPLAIN plan", "Graph features", "PlanGCN", "Rank candidates"],
  "trace-explorer": ["OTLP", "CRC-32 WAL", "Parquet", "DuckDB"],
  "pipeline-replay": [
    "Go gateway",
    "Kafka",
    "Consumer / DLQ",
    "Postgres + Redis",
  ],
  "oms-fsm": ["FIX 4.2", "Risk rules", "Order FSM", "Outbox / Kafka"],
  "hmm-risk": ["Market data", "Walk-forward CV", "HMM regimes", "Tail risk"],
  "spatial-wasm": [
    "Pick locations",
    "A* paths",
    "Held-Karp / 2-opt",
    "Open tour",
  ],
  "case-study": [
    "FrameGrabber",
    "PPE + person models",
    "Tracking / zones",
    "Alerts",
  ],
};
const demoNotes: Record<string, string> = {
  "onnx-gnn":
    "Actual ONNX model inference in your browser. Native CPU benchmark timings above are separate measurements.",
  "trace-explorer":
    "Interactive sample traces. This is a local trace explorer, not a connection to a running production gateway.",
  "pipeline-replay":
    "Playback of recorded benchmark samples, with interpolation between samples. No Kafka cluster runs in this browser.",
  "oms-fsm":
    "Client-side port of the order-state and risk logic. No real orders are submitted.",
  "hmm-risk":
    "Seeded browser simulation, not investment advice or live performance. Native CUDA timings are not browser timings.",
  "spatial-wasm":
    "Interactive JavaScript routing sandbox. Native C++ performance above comes from the linked benchmark, not this browser.",
  "case-study":
    "Spatial geofencing simulation using moving points. This demo does not run a camera or YOLO model.",
};
export function ProjectDetail({
  project,
  onClose,
}: {
  project: ProjectDefinition | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  if (!project) return null;
  const Demo = project.demoType ? demos[project.demoType] : null;
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const items = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (item) => item.tabIndex >= 0 && item.getClientRects().length > 0,
        );
        const first = items[0],
          last = items.at(-1);
        if (!first || !last) {
          e.preventDefault();
          return;
        }
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === e.currentTarget)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="folio-title"
      data-testid="project-detail-modal"
    >
      <article className="folio">
        <header className="folio-header">
          <span className="eyebrow">FIELD NOTE / {project.id}</span>
          <button
            autoFocus
            aria-label="Close notebook"
            onClick={onClose}
            data-testid="close-notebook-btn"
          >
            ×
          </button>
        </header>
        <div className="folio-body">
          <p className="eyebrow">AMRITESH'S ENGINEERING NOTEBOOK</p>
          <h2 id="folio-title" className="folio-title">
            {project.title}
          </h2>
          <p className="folio-sub">{project.tagline}</p>
          <div className="folio-tabs">
            <a href={project.links.repo} target="_blank" rel="noreferrer">
              Source repository ↗
            </a>
            {project.links.paper && (
              <a href={project.links.paper} target="_blank" rel="noreferrer">
                Publication ↗
              </a>
            )}
            <a
              href="#project-experiment"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("project-experiment")
                  ?.scrollIntoView({ behavior: "instant" });
              }}
            >
              Jump to experiment ↓
            </a>
          </div>
          <div className="folio-layout">
            <aside className="folio-meta">
              <section>
                <h3>TOOLS & MATERIALS</h3>
                <div className="folio-tags">
                  {project.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </section>
              <section>
                <h3>MEASUREMENTS & SOURCES</h3>
                {project.metrics.map((m) => (
                  <div className="folio-metric" key={m.label}>
                    <b>{m.value}</b>
                    <p>{m.label}</p>
                    <p>{m.benchmarkContext}</p>
                    {m.isInformal && (
                      <p>
                        <strong>Informal development measurement</strong>
                      </p>
                    )}
                    <a href={m.sourceUrl} target="_blank" rel="noreferrer">
                      Inspect source artifact ↗
                    </a>
                  </div>
                ))}
              </section>
            </aside>
            <div className="folio-content">
              <section>
                <h3>01 / THE QUESTION</h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3>02 / MY CONTRIBUTION</h3>
                <ul>
                  {project.built.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>03 / HOW THE PIECES FIT</h3>
                <div className="architecture-flow">
                  {flows[project.demoType].map((s, i) => (
                    <span key={s}>
                      {i > 0 && <b aria-hidden="true">→ </b>}
                      {s}
                    </span>
                  ))}
                </div>
                {project.decisions.map((d) => (
                  <div className="decision" key={d.decision}>
                    <h4>{d.decision}</h4>
                    <p>{d.rationale}</p>
                    <p>
                      <strong>The trade-off:</strong> {d.tradeoff}
                    </p>
                  </div>
                ))}
              </section>
              <section className="limit-note">
                <h3>04 / WHAT THIS DOESN'T PROVE</h3>
                {project.limitations.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </section>
            </div>
          </div>
          <section id="project-experiment" className="demo-section">
            <h3>Now, try it yourself.</h3>
            <p>{demoNotes[project.demoType]}</p>
            <ErrorBoundary label={`${project.title} experiment`}>
              <Suspense fallback={<p role="status">Opening the experiment…</p>}>
                {Demo ? (
                  <Demo />
                ) : (
                  <p>No browser experiment is available for this project.</p>
                )}
              </Suspense>
            </ErrorBoundary>
          </section>
        </div>
      </article>
    </dialog>
  );
}
