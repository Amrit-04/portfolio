import { useEffect, useRef, type ReactNode } from "react";
import { PROJECTS, type ProjectDefinition } from "../../data/projects";
import { RESEARCH, SITE, SKILL_GROUPS } from "../../data/site";
import { getAssetUrl } from "../../lib/assets";
import {
  InkClose,
  ProjectDrawing,
  paperStyle,
} from "../../components/PaperArt";

export const CATEGORIES = [
  {
    id: "ai",
    label: "AI\n+\nML",
    name: "AI + ML",
    projects: [0, 6],
    stickers: ["PyTorch", "ONNX", "VISION", "GNN"],
  },
  {
    id: "systems",
    label: "BACKEND\nSYSTEMS",
    name: "Backend systems",
    projects: [1, 2],
    stickers: ["C++", "KAFKA", "Go", "WAL"],
  },
  {
    id: "quant",
    label: "QUANT\n+\nFINANCE",
    name: "Quant + finance",
    projects: [3, 4],
    stickers: ["FIX", "CUDA", "RISK", "HMM"],
  },
  {
    id: "algorithms",
    label: "ALGO-\nRITHMS",
    name: "Algorithms",
    projects: [5],
    stickers: ["A*", "C++", "GRAPHS", "2-opt"],
  },
  {
    id: "research",
    label: "RE-\nSEARCH",
    name: "Research + résumé",
    projects: [],
    stickers: [],
  },
  {
    id: "playground",
    label: "PLAY-\nGROUND",
    name: "Playground",
    projects: [],
    stickers: [],
  },
] as const;
export const PROJECT_CATEGORY: Record<string, string> = Object.fromEntries(
  CATEGORIES.flatMap((c) => c.projects.map((i) => [PROJECTS[i].id, c.id])),
);
const shortTitles = [
  "NEURAL QUERY\nOPTIMIZER",
  "LLM RELIABILITY\nCONTROL PLANE",
  "FAULT-TOLERANT\nTELEMETRY",
  "TRADEFLOW",
  "MONEYBALL",
  "WAREHOUSE\nROUTING",
  "WORKPLACE\nSAFETY",
];
export function ProjectPrint({
  project,
  index,
  variant = 0,
}: {
  project: ProjectDefinition;
  index: number;
  variant?: number;
}) {
  const metric = project.metrics[variant % project.metrics.length];
  const headings = [
    shortTitles[index],
    "WHAT HAPPENS\nUNDER THE HOOD?",
    "MEASURE IT.\nTHEN QUESTION IT.",
    "WHY THIS\nAPPROACH?",
    "KNOW THE\nBOUNDARIES.",
    "CHANGE A GRID.\nTRY A ROUTE.",
  ];
  const notes = [
    project.tagline,
    "",
    "",
    project.decisions[0].decision,
    project.limitations[0],
    "Edit obstacles and destinations in the live experiment. Solve with A* and open-path Held–Karp.",
  ];
  return (
    <div className={`project-print print-${index} print-variant-${variant}`}>
      <span className="print-kicker">
        AMRITESHKUMAR YADAV / {String(index + 1).padStart(2, "0")}
      </span>
      <h3>{headings[variant]}</h3>
      <ProjectDrawing kind={index} />
      <div className="print-bottom">
        {variant === 2 ? (
          <>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>Source benchmark, not browser timing.</small>
          </>
        ) : variant === 1 ? (
          <>
            <strong>{project.stack.slice(0, 3).join(" / ")}</strong>
            <span>Architecture, trade-offs & working experiment</span>
          </>
        ) : (
          <>
            <strong>{project.title}</strong>
            <span>{notes[variant]}</span>
          </>
        )}
      </div>
    </div>
  );
}
export function PaperDialog({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const active = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    d.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      d.close();
      document.body.style.overflow = overflow;
      active?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      className={`paper-dialog ${className}`}
      ref={ref}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const a = [
          ...e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href],button:not(:disabled),[tabindex="0"]',
          ),
        ].filter((x) => x.getClientRects().length);
        const first = a[0],
          last = a.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className="paper-sheet">
        <button
          className="paper-close"
          onClick={onClose}
          aria-label={`Close ${title}`}
          autoFocus
        >
          <InkClose />
        </button>
        {children}
      </div>
    </dialog>
  );
}
// Measured first two rows of the supplied print wall. Coordinates are fractions
// of wall WIDTH (not height), retaining the original overlapping freeform model.
const positions = [
  [0.0047, -0.0112, 0.3764, -3.2],
  [0.6845, -0.0094, 0.3268, 0.3],
  [0.368, -0.0112, 0.3418, 3],
  [0.6723, 0.4803, 0.3605, 1.7],
  [0.3099, 0.4813, 0.368, -2.5],
  [-0.0215, 0.5309, 0.3361, -1.5],
];
export function PaperWall({
  category,
  onClose,
  openProject,
  onEnterTrack,
}: {
  category: string;
  onClose: () => void;
  openProject: (id: string) => void;
  onEnterTrack: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const body = scroll.current;
    if (
      !body ||
      !matchMedia("(max-width:600px)").matches ||
      matchMedia("(prefers-reduced-motion:reduce)").matches
    )
      return;
    let touched = false;
    const stop = () => {
      touched = true;
    };
    body.addEventListener("pointerdown", stop, { passive: true });
    let second: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      if (touched) return;
      body.scrollTo({ left: 46, behavior: "smooth" });
      second = setTimeout(() => {
        if (!touched) body.scrollTo({ left: 0, behavior: "smooth" });
      }, 640);
    }, 520);
    return () => {
      clearTimeout(timer);
      clearTimeout(second);
      body.removeEventListener("pointerdown", stop);
    };
  }, []);
  const indices = [...cat.projects] as number[];
  // TV and activation walls use broad landscape prints; the print wall uses
  // overlapping portrait sheets. Keep those distinct source compositions.
  const landscape = category === "systems" || category === "quant";
  const layout =
    category === "systems"
      ? [
          [0.0599, -0.0112, 0.8951, -4],
          [-0.0047, 0.6086, 0.7097, 3],
          [0.6, 0.69, 0.41, -3],
          [0.1, 1.12, 0.85, -2],
          [0, 1.69, 0.48, 3],
          [0.48, 1.8, 0.52, -2],
        ]
      : category === "quant"
        ? [
            [0.0599, -0.0112, 0.8315, 1],
            [0.2669, 0.4738, 0.7434, -4.5],
            [0.0066, 0.6114, 0.4888, -2.5],
            [0.08, 1.08, 0.86, 2],
            [0, 1.59, 0.48, -3],
            [0.5, 1.68, 0.48, 2],
          ]
        : positions;
  const pieces =
    indices.length === 2
      ? [
          { p: indices[0], v: 0 },
          { p: indices[0], v: 2 },
          { p: indices[0], v: 1 },
          { p: indices[1], v: 0 },
          { p: indices[1], v: 1 },
          { p: indices[1], v: 2 },
        ]
      : Array.from({ length: 6 }, (_, v) => ({ p: indices[0] ?? 0, v }));
  return (
    <PaperDialog
      title={`${cat.name} wall`}
      onClose={onClose}
      className={`wall-dialog wall-${category}`}
    >
      <div
        className="paper-wall-scroll"
        ref={scroll}
        tabIndex={0}
        aria-label={`${cat.name} prints. Scroll to explore; on phones scroll sideways too.`}
      >
        {indices.length > 0 ? (
          <div
            className={`paper-wall ${landscape ? "landscape-wall" : ""}`}
            data-testid={`wall-${category}`}
          >
            {pieces.map(({ p, v }, i) => (
              <button
                key={i}
                className={`wall-print ${landscape ? "landscape-print" : ""}`}
                style={paperStyle(
                  ...(layout[i] as [number, number, number, number]),
                )}
                aria-label={`Open ${PROJECTS[p].title}${v ? ` — ${["overview", "architecture", "measurements", "decisions", "limitations", "live experiment"][v]}` : ""}`}
                data-testid={
                  v === 0 ? `open-notebook-${PROJECTS[p].id}` : undefined
                }
                onClick={() => openProject(PROJECTS[p].id)}
              >
                <ProjectPrint project={PROJECTS[p]} index={p} variant={v} />
              </button>
            ))}
            <div className="wall-caption">
              {cat.name} / select a print to open the notebook and run the
              experiment.
            </div>
          </div>
        ) : category === "research" ? (
          <div
            className="paper-wall information-wall"
            data-testid="wall-research"
          >
            <button
              className="research-banner"
              onClick={() => openProject("workplace-safety-vision")}
              aria-label="Open workplace safety research notebook"
            >
              <span>
                <small>IEEE RMKMATE 2026</small>
                <strong>
                  WORKPLACE SAFETY.
                  <br />
                  AN EXTRA PAIR
                  <br />
                  OF EYES.
                </strong>
                <small>COMPUTER VISION / PPE / INTRUSION MONITORING</small>
              </span>
              <ProjectDrawing kind={6} />
            </button>
            <article className="loose-page research-paper">
              <span className="hand-caption">
                A paper, not just a prototype.
              </span>
              <h2>
                WORKPLACE SAFETY
                <br />
                USING COMPUTER VISION
              </h2>
              <ProjectDrawing kind={6} />
              <p>{RESEARCH.title}</p>
              <p>{RESEARCH.authors}</p>
              <p>IEEE RMKMATE 2026 · {RESEARCH.recordId}</p>
              <a href={RESEARCH.doiUrl} target="_blank" rel="noreferrer">
                Read the publication ↗
              </a>
              <button onClick={() => openProject("workplace-safety-vision")}>
                Open the research notebook →
              </button>
            </article>
            <article className="loose-page cv-paper">
              <h2>
                THE SHORT
                <br />
                VERSION.
              </h2>
              <p>{SITE.name}</p>
              <p>{SITE.education}</p>
              <p>{SITE.roles}</p>
              <p>Open to: {SITE.openTo}</p>
              <a
                href={getAssetUrl("resumes/Amriteshkumar_Yadav_.pdf")}
                download
                data-testid="resume-btn"
              >
                Download my résumé ↓
              </a>
            </article>
            <article className="loose-page skills-paper">
              <h2>THINGS I WORK WITH.</h2>
              {SKILL_GROUPS.map((g) => (
                <p key={g.title}>
                  <b>{g.title}</b>
                  <br />
                  {g.items.join(" · ")}
                </p>
              ))}
              <p>
                This portfolio’s checks use Playwright, Vitest and axe-core.
                Project claims link to their own source evidence.
              </p>
              <p className="hand-caption">
                Choose a project print to see the tools in context.
              </p>
            </article>
          </div>
        ) : (
          <div
            className="paper-wall information-wall playground-wall"
            data-testid="wall-playground"
          >
            <article className="loose-page ride-paper">
              <h2>
                TAKE THE
                <br />
                LONG WAY.
              </h2>
              <svg
                viewBox="0 0 400 240"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="95" cy="159" r="56" />
                <circle cx="303" cy="159" r="56" />
                <path d="m95 159 64-103 60 104H95l-14-91m79-13h102l41 103M219 160l43-104 26-8M144 51h40M42 227q159-29 317-3" />
              </svg>
              <p>
                A physical bicycle, a trail through the projects, and an editor
                to build your own detour.
              </p>
              <button data-testid="enter-track-nav" onClick={onEnterTrack}>
                Ride the track →
              </button>
            </article>
            <article className="loose-page homelab-paper">
              <h2>
                A HOMELAB
                <br />
                IN THE MARGINS.
              </h2>
              <p>
                Linux, containers, private networking and local-first tools.
              </p>
              <p>
                <b>Evidenced in my projects:</b> Docker, local Llama 3.2
                inference, Redis and ChromaDB.
              </p>
              <p>
                <b>Interests / experiments:</b> Ubuntu Server, Portainer,
                Pi-hole, Tailscale, Jellyfin, Calibre-Web, Samba and Raspberry
                Pi.
              </p>
              <p>
                Not a live network map. Current deployment and service status
                are unconfirmed.
              </p>
            </article>
            <article className="loose-page experiments-paper">
              <h2>
                SMALL THINGS.
                <br />
                LONG QUESTIONS.
              </h2>
              <h3>Fly_pet</h3>
              <p>
                A desktop fly with leaky integrate-and-fire neurons: sensory
                input, hunger and locomotion.
              </p>
              <a
                href="https://github.com/Amrit-04/Fly_pet"
                target="_blank"
                rel="noreferrer"
              >
                Inspect the experiment ↗
              </a>
              <h3>C++ physics foundations</h3>
              <p>
                C++20 and CMake groundwork. Orbital simulation, Vulkan and CUDA
                are ambitions—not completed features.
              </p>
              <a
                href="https://github.com/Amrit-04/Cpp-Physics-Engine-o"
                target="_blank"
                rel="noreferrer"
              >
                Read the source ↗
              </a>
              <p className="hand-caption">
                Build a little. Measure. Start again.
              </p>
            </article>
          </div>
        )}
      </div>
    </PaperDialog>
  );
}
