import { useState } from "react";
import { SITE, RESEARCH } from "../../data/site";
import { PROJECTS } from "../../data/projects";
import { Workshop, OrbitSketch } from "../../components/Workshop";
import {
  TreeEaselArt,
  ControlConsoleArt,
  PneumaticPipelineArt,
  TradingDeskArt,
  ResearchLedgerArt,
  IsometricWarehouseArt,
  IndustrialVisionArt,
} from "../../components/illustrations";
import { getAssetUrl as asset } from "../../lib/assets";

const exhibits = [
  {
    id: "neural-query-optimizer",
    title: "Teaching a database\nto choose.",
    label: "01 / THE QUERY GARDEN",
    art: TreeEaselArt,
    note: "A query plan is a tree. What if we learned from its shape?",
    color: "blue",
  },
  {
    id: "llm-reliability-control-plane",
    title: "A black box,\nopened up.",
    label: "02 / THE OBSERVABILITY CABINET",
    art: ControlConsoleArt,
    note: "Follow a prompt all the way through the system.",
    color: "green",
  },
  {
    id: "fault-tolerant-ml-telemetry",
    title: "Keep the\nevents flowing.",
    label: "03 / THE TELEMETRY WORKS",
    art: PneumaticPipelineArt,
    note: "Queues, backpressure and a place for the unexpected.",
    color: "red",
  },
  {
    id: "tradeflow",
    title: "Every order.\nEvery transition.",
    label: "04 / THE EXCHANGE DESK",
    art: TradingDeskArt,
    note: "An order is a state machine, not just a row in a table.",
    color: "blue",
  },
  {
    id: "moneyball",
    title: "A little less guess.\nA lot more test.",
    label: "05 / THE QUANT FIELD NOTES",
    art: ResearchLedgerArt,
    note: "Explore uncertainty without pretending to predict it.",
    color: "gold",
  },
  {
    id: "warehouse-routing-engine",
    title: "Find a better\nway through.",
    label: "06 / THE ROUTING TABLE",
    art: IsometricWarehouseArt,
    note: "From a warehouse floor to a graph worth searching.",
    color: "green",
  },
  {
    id: "workplace-safety-vision",
    title: "An extra pair\nof eyes.",
    label: "07 / THE VISION OUTPOST",
    art: IndustrialVisionArt,
    note: "Computer vision for PPE detection and intrusion monitoring.",
    color: "red",
  },
];
const tools = [
  {
    name: "Languages",
    items: ["Python", "C++17 / C++20", "Go", "TypeScript", "SQL", "Lua"],
    project: "neural-query-optimizer",
    note: "Different problems deserve different tools. Python for model experiments; C++ and Go when the system needs a closer look.",
  },
  {
    name: "Backend",
    items: ["FastAPI", "Flask", "Go HTTP", "FIX 4.2"],
    project: "tradeflow",
    note: "APIs, deterministic state machines, risk checks and the durable boundary between a request and its effects.",
  },
  {
    name: "Systems",
    items: ["Write-ahead logs", "Concurrency", "pybind11", "WebAssembly"],
    project: "llm-reliability-control-plane",
    note: "Making failure visible: persistence, ownership, process boundaries and what happens before an acknowledgment.",
  },
  {
    name: "AI / ML",
    items: ["PyTorch", "GCN / GAT", "GraphSAGE", "ONNX", "HMM"],
    project: "neural-query-optimizer",
    note: "Learned cost models, local inference and honest evaluation on held-out query templates.",
  },
  {
    name: "Vision",
    items: ["YOLO", "OpenCV", "Centroid tracking", "Geofencing"],
    project: "workplace-safety-vision",
    note: "The image is only the beginning. Temporal tracking and spatial rules turn detections into useful events.",
  },
  {
    name: "Data",
    items: ["Kafka", "PostgreSQL", "Redis", "DuckDB", "Parquet"],
    project: "fault-tolerant-ml-telemetry",
    note: "Moving, storing and querying events while keeping the failure modes explicit.",
  },
  {
    name: "Infrastructure",
    items: ["Docker", "Linux", "Prometheus", "Grafana"],
    project: "fault-tolerant-ml-telemetry",
    note: "Reproducible services, local experiments, observable queues and measured bottlenecks.",
  },
  {
    name: "Tools",
    items: ["Git", "CMake", "MLflow", "Playwright"],
    project: "warehouse-routing-engine",
    note: "Small feedback loops: version an experiment, inspect a trace, run the test, then look at what actually happened.",
  },
];
const labs = [
  {
    name: "Ubuntu Server",
    role: "Host / operating system",
    note: "Host in this exploration diagram. Current machine and service status are not documented.",
  },
  {
    name: "Docker + Portainer",
    role: "Containers / management",
    note: "Docker is evidenced in the project repositories. Portainer is a listed homelab interest; current deployment is unconfirmed.",
  },
  {
    name: "Pi-hole + Tailscale",
    role: "DNS / private access",
    note: "Listed networking experiments. This page does not probe a private network or claim these services are currently online.",
  },
  {
    name: "Jellyfin + Calibre-Web",
    role: "Media / reading",
    note: "Listed self-hosting experiments. Current service state has not been supplied.",
  },
  {
    name: "Samba + Raspberry Pi",
    role: "Storage / edge devices",
    note: "Listed storage and small-computer experiments. Device topology here is illustrative, not an inventory.",
  },
  {
    name: "Local LLMs",
    role: "Inference / exploration",
    note: "Local-first inference is evidenced in the LLM Reliability Control Plane, using Llama 3.2, Redis and ChromaDB.",
  },
];
const nav = [
  ["Work", "work"],
  ["About", "about"],
  ["Toolboard", "skills"],
  ["Research", "research"],
  ["Homelab", "homelab"],
  ["Notebook", "notebook"],
  ["Contact", "contact"],
];
export default function PortfolioMode({
  onEnterTrack,
  openProject,
}: {
  onEnterTrack: () => void;
  openProject: (id: string) => void;
}) {
  const [menu, setMenu] = useState(false);
  const [tool, setTool] = useState(0);
  const [lab, setLab] = useState(0);
  return (
    <div className="world-portfolio">
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <header className="world-header">
        <a href="#top" className="world-brand" data-testid="nav-home">
          <span className="brand-mark">
            ay<span>.</span>
          </span>
          <span>
            AMRITESH'S
            <br />
            <b>ENGINEERING WORLD</b>
          </span>
        </a>
        <button
          className="mobile-menu"
          aria-expanded={menu}
          aria-controls="world-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Explore"}{" "}
          <span aria-hidden="true">{menu ? "×" : "+"}</span>
        </button>
        <nav id="world-nav" aria-label="Main" className={menu ? "is-open" : ""}>
          {nav.map(([name, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
        </nav>
        <button
          className="header-ride"
          onClick={onEnterTrack}
          data-testid="enter-track-nav"
        >
          Ride the track <span aria-hidden="true">↗</span>
        </button>
      </header>
      <main>
        <section id="top" className="world-hero">
          <div className="hero-kicker">
            <span className="eyebrow">
              SOFTWARE ENGINEER · AI/ML · BACKEND & SYSTEMS
            </span>
            <span className="handwritten">Always taking things apart.</span>
          </div>
          <div className="hero-masthead">
            <div>
              <span className="hero-name">Amritesh's</span>
              <h1>
                ENGINEERING
                <br />
                <span>WORLD.</span>
                <i aria-hidden="true">*</i>
              </h1>
            </div>
            <div className="hero-intro">
              <span className="tiny-cross" aria-hidden="true">
                +
              </span>
              <p>
                Hi, I'm <strong>Amriteshkumar Yadav.</strong>
                <br />I build software, follow strange questions, and like
                knowing what happens under the hood.
              </p>
              <p className="intro-small">
                Come for the projects.
                <br />
                Stay for a ride.
              </p>
              <a
                className="text-link"
                href={asset("resumes/Amriteshkumar_Yadav_.pdf")}
                download
                data-testid="resume-btn"
              >
                My résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <Workshop ride={onEnterTrack} project={openProject} />
          <div className="hero-bottom">
            <div className="hero-actions">
              <a href="#work" className="ink-button">
                Explore portfolio <span aria-hidden="true">↓</span>
              </a>
              <button className="paper-button" onClick={onEnterTrack}>
                Ride the track <span aria-hidden="true">↗</span>
              </button>
            </div>
            <p className="handwritten">Psst. The objects are doors.</p>
            <div className="social-mini">
              <a href={SITE.links.github}>GitHub ↗</a>
              <a href={SITE.links.linkedin}>LinkedIn ↗</a>
              <a href={SITE.links.email}>Email ↗</a>
            </div>
          </div>
        </section>
        <div className="world-divider">
          <span>BUILT TO UNDERSTAND</span>
          <span>NOT JUST TO LOOK AT.</span>
          <span aria-hidden="true">✳</span>
          <span>OPEN THE NOTEBOOKS. TRY THE EXPERIMENTS.</span>
        </div>
        <section id="work" className="world-section exhibition">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 — THE EXHIBITION</p>
              <h2>
                Things I've
                <br />
                <em>put together.</em>
              </h2>
            </div>
            <div className="section-aside">
              <p>
                Seven systems. Different questions.
                <br />
                Each with the source, the decisions, and something you can
                actually try.
              </p>
              <span className="handwritten">No glass cases here. ↙</span>
            </div>
          </div>
          <div className="exhibit-shelf">
            {exhibits.map((e, i) => {
              const p = PROJECTS.find((p) => p.id === e.id)!;
              const Art = e.art;
              return (
                <article
                  key={e.id}
                  className={`exhibit exhibit-${i} exhibit-${e.color}`}
                  data-testid={`project-card-${e.id}`}
                >
                  <div className="exhibit-label">
                    <span>{e.label}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <button
                    className="exhibit-art-button"
                    onClick={() => openProject(e.id)}
                    aria-label={`Explore ${p.title}`}
                  >
                    <span aria-hidden="true">
                      <Art className="exhibit-art" />
                    </span>
                  </button>
                  <div className="exhibit-caption">
                    <div>
                      <h3>
                        {e.title.split("\n").map((s, j) => (
                          <span key={j}>
                            {s}
                            <br />
                          </span>
                        ))}
                      </h3>
                      <p className="exhibit-project-name">{p.title}</p>
                      <p>{e.note}</p>
                      <p className="exhibit-stack">
                        {p.stack.slice(0, 4).join(" / ")}
                      </p>
                    </div>
                    <button
                      className="notebook-open"
                      data-testid={`open-notebook-${e.id}`}
                      onClick={() => openProject(e.id)}
                    >
                      Open notebook <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="work-footnote">
            <span className="handwritten">
              The interesting part is usually the trade-off.
            </span>
            <p>
              Measurements link to their source. Informal runs, offline research
              and browser simulations are labeled inside each notebook.
            </p>
          </div>
        </section>
        <section id="about" className="world-section about-section">
          <div className="about-drawing">
            <OrbitSketch />
            <span className="stamp">
              CURIOUS
              <br />
              BY DEFAULT
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">02 — THE PERSON AT THE DESK</p>
            <h2>
              “But how does
              <br />
              it <em>actually work?</em>”
            </h2>
            <p>
              That's usually where I start. With a library I haven't used, a
              language I don't know yet, or a system that does something I can't
              quite explain.
            </p>
            <p>
              I like following the pieces: how a compiler turns text into
              instructions, how an operating system shares a machine, why a
              database chooses one plan over another. Sometimes that means
              reading a technical book. Sometimes it means building the smallest
              version myself.
            </p>
            <p>
              My work lives around AI/ML, backend engineering and systems. My
              curiosity tends to wander further — old technologies, local AI,
              unfamiliar codebases, and the occasional physics experiment.
            </p>
            <div className="about-signoff">
              <span className="handwritten">Amriteshkumar Yadav</span>
              <span>
                B.Tech CSE · AI/ML
                <br />
                SRM IST · July 2026
              </span>
            </div>
          </div>
        </section>
        <section id="skills" className="world-section tool-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 — THE TOOLBOARD</p>
              <h2>
                The right tool.
                <br />
                <em>Not every tool.</em>
              </h2>
            </div>
            <p className="section-aside">
              Things I've used in my work.
              <br />
              Pick a drawer to see where they fit.
            </p>
          </div>
          <div className="toolboard">
            <div
              className="tool-tabs"
              role="tablist"
              aria-label="Engineering tools"
            >
              {tools.map((t, i) => (
                <button
                  key={t.name}
                  role="tab"
                  id={`tool-tab-${i}`}
                  aria-controls="tool-panel"
                  aria-selected={tool === i}
                  tabIndex={tool === i ? 0 : -1}
                  onKeyDown={(ev) => {
                    const offset = ["ArrowDown", "ArrowRight"].includes(ev.key)
                      ? 1
                      : ["ArrowUp", "ArrowLeft"].includes(ev.key)
                        ? -1
                        : 0;
                    if (offset || ev.key === "Home" || ev.key === "End") {
                      ev.preventDefault();
                      const next =
                        ev.key === "Home"
                          ? 0
                          : ev.key === "End"
                            ? tools.length - 1
                            : (i + offset + tools.length) % tools.length;
                      setTool(next);
                      document.getElementById(`tool-tab-${next}`)?.focus();
                    }
                  }}
                  onClick={() => setTool(i)}
                >
                  <span className="tool-number">0{i + 1}</span>
                  <span>{t.name}</span>
                  <span aria-hidden="true">{tool === i ? "−" : "+"}</span>
                </button>
              ))}
            </div>
            <div
              id="tool-panel"
              className="tool-panel"
              role="tabpanel"
              aria-labelledby={`tool-tab-${tool}`}
            >
              <p className="eyebrow">DRAWER 0{tool + 1} / IN THE WORKSHOP</p>
              <h3>{tools[tool].name}</h3>
              <div className="tool-items">
                {tools[tool].items.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <p>{tools[tool].note}</p>
              <button
                className="text-link"
                onClick={() => openProject(tools[tool].project)}
              >
                See it in a project ↗
              </button>
              <span className="handwritten tool-scribble">
                Used, not rated in percentages.
              </span>
            </div>
          </div>
        </section>
        <section id="research" className="world-section research-section">
          <div className="research-label">
            <p className="eyebrow">04 — A PUBLISHED QUESTION</p>
            <span className="handwritten">
              from the workbench
              <br />
              to the paper ↘
            </span>
            <div className="research-seal">
              IEEE
              <br />
              <strong>2026</strong>
              <span>RMKMATE</span>
            </div>
          </div>
          <article className="research-paper">
            <div className="paper-pin" aria-hidden="true" />
            <p className="eyebrow">COMPUTER VISION / WORKPLACE SAFETY</p>
            <h2>{RESEARCH.title}</h2>
            <p>{RESEARCH.authors}</p>
            <hr />
            <p>
              Two complementary tasks: detect protective equipment and monitor
              intrusion into hazardous areas. A dual-model pipeline pairs PPE
              detection with person tracking and spatial geofencing.
            </p>
            <p className="research-venue">{RESEARCH.venue}</p>
            <div className="research-links">
              <a
                className="ink-button"
                href={RESEARCH.doiUrl}
                target="_blank"
                rel="noreferrer"
              >
                Read on IEEE Xplore ↗
              </a>
              <button
                className="text-link"
                onClick={() => openProject("workplace-safety-vision")}
              >
                Explore the project ↗
              </button>
            </div>
            <p className="source-note">
              Xplore record 11518869 · publication cited by the source
              repository.
            </p>
          </article>
        </section>
        <section id="homelab" className="world-section homelab-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">05 — UNDER THE HOOD</p>
              <h2>
                A lab, not
                <br />
                <em>a black box.</em>
              </h2>
            </div>
            <p className="section-aside">
              A map of self-hosting and local-AI interests.
              <br />
              An exploration diagram, not a live status page.
            </p>
          </div>
          <div className="lab-layout">
            <div className="lab-map">
              <div className="lab-host">
                <span aria-hidden="true">▤</span>
                <b>THE LOCAL WORKBENCH</b>
                <small>Linux · networking · small computers</small>
              </div>
              <div className="lab-wires" aria-hidden="true" />
              <div className="lab-nodes">
                {labs.map((l, i) => (
                  <button
                    key={l.name}
                    className={lab === i ? "selected" : ""}
                    onClick={() => setLab(i)}
                    aria-pressed={lab === i}
                  >
                    <span className="node-dots" aria-hidden="true">
                      ○ ○ ○
                    </span>
                    <strong>{l.name}</strong>
                    <small>{l.role}</small>
                  </button>
                ))}
              </div>
            </div>
            <aside className="lab-note">
              <span className="handwritten">field note #{lab + 1}</span>
              <h3>{labs[lab].name}</h3>
              <p>{labs[lab].note}</p>
              <p className="status-note">Service status: not asserted</p>
              <button
                className="text-link"
                onClick={() => openProject("llm-reliability-control-plane")}
              >
                See the local-first project ↗
              </button>
            </aside>
          </div>
        </section>
        <section id="notebook" className="world-section notebook-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">06 — MARGIN NOTES</p>
              <h2>
                Still figuring
                <br />
                <em>things out.</em>
              </h2>
            </div>
            <p className="section-aside">
              Not a collection of invented articles.
              <br />
              Just genuine interests and work in progress.
            </p>
          </div>
          <div className="note-pages">
            <article>
              <span className="eyebrow">QUESTION / SYSTEMS</span>
              <h3>
                What happens
                <br />
                before “hello, world”?
              </h3>
              <p>
                Compilers, operating systems, runtimes. I'm interested in the
                layers that make a small program possible, and in reading
                unfamiliar code until the pieces fit.
              </p>
              <span className="handwritten">Keep pulling the thread.</span>
            </article>
            <article>
              <span className="eyebrow">EXPERIMENT / C++</span>
              <h3>
                A small engine.
                <br />A very large universe.
              </h3>
              <p>
                A space-physics learning project in C++20 and CMake. Foundations
                first; orbital simulation, Vulkan and CUDA are ambitions, not
                finished features.
              </p>
              <a
                className="text-link"
                href="https://github.com/Amrit-04/Cpp-Physics-Engine-o"
              >
                Open the experiment ↗
              </a>
            </article>
            <article>
              <span className="eyebrow">EXPERIMENT / NEURAL CIRCUITS</span>
              <h3>
                A fly with
                <br />a little circuitry.
              </h3>
              <p>
                Fly_pet explores a desktop pet driven by leaky
                integrate-and-fire neurons. A different way to think about
                sensory input, hunger and movement.
              </p>
              <a
                className="text-link"
                href="https://github.com/Amrit-04/Fly_pet"
              >
                Follow the little fly ↗
              </a>
            </article>
          </div>
        </section>
        <section className="trail-invitation">
          <div>
            <p className="eyebrow">ONE MORE WAY TO EXPLORE</p>
            <h2>
              Take the
              <br />
              <em>scenic route.</em>
            </h2>
            <p>
              Nine stretches of paper terrain. Two wheels.
              <br />A few engineering discoveries along the way.
            </p>
            <button className="ink-button" onClick={onEnterTrack}>
              Ride the Engineering Trail ↗
            </button>
          </div>
          <div className="trail-doodle" aria-hidden="true">
            <svg viewBox="0 0 600 250">
              <path
                d="M0 190L80 190Q125 190 162 135L213 119M252 151Q308 221 361 153L422 65M472 123L517 186 600 186"
                fill="none"
                stroke="#2a2520"
                strokeWidth="3"
              />
              <path
                d="M215 119Q236 100 255 151M421 65Q449 49 475 125"
                fill="none"
                stroke="#c84b31"
                strokeDasharray="5 8"
                strokeWidth="2"
              />
              <g fill="none" stroke="#c84b31" strokeWidth="3">
                <circle cx="331" cy="117" r="23" />
                <circle cx="402" cy="84" r="23" />
                <path d="M331 117L342 71 374 96 331 117 378 57 374 96M374 48L383 47 402 84M334 72L350 66" />
              </g>
              <path
                d="M548 184V85L593 97 548 111"
                fill="#c84b31"
                stroke="#2a2520"
                strokeWidth="2"
              />
            </svg>
            <span className="handwritten">
              Real gaps. Real gravity. Free restarts.
            </span>
          </div>
        </section>
        <section id="contact" className="world-section contact-section">
          <p className="eyebrow">07 — LEAVE A NOTE</p>
          <h2>
            Have a good
            <br />
            <em>problem?</em>
          </h2>
          <div className="contact-bottom">
            <div>
              <p>I'd like to hear about it.</p>
              <a className="contact-email" href={SITE.links.email}>
                {SITE.links.email.replace("mailto:", "")}{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="source-note">
                Open to software and AI/ML engineering opportunities.
              </p>
            </div>
            <div className="contact-links">
              <a href={SITE.links.github}>GitHub ↗</a>
              <a href={SITE.links.linkedin}>LinkedIn ↗</a>
              <a href={asset("resumes/Amriteshkumar_Yadav_.pdf")} download>
                Download résumé ↓
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="world-footer">
        <span>AMRITESHKUMAR YADAV</span>
        <span>Built with curiosity. And a few spare parts.</span>
        <a href="#top">Back to the workbench ↑</a>
      </footer>
    </div>
  );
}
