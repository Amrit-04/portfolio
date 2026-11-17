import { useEffect, useRef, useState } from "react";
import { SITE } from "../../data/site";
import { PROJECTS } from "../../data/projects";
import { InkArrow, InkFilters, InkFrame } from "../../components/PaperArt";
import { CATEGORIES, PaperDialog, PaperWall, ProjectPrint } from "./PaperWalls";
import character from "../../assets/paper/character.webp";
import processArt from "../../assets/paper/process.webp";
import { sfx } from "../../lib/sound";
import "./paper-portfolio.css";

const wallFromHash = () => {
  const id = location.hash.replace("#wall-", "");
  return CATEGORIES.some((c) => c.id === id) ? id : null;
};
const asides = [
  "A good question is usually the beginning.",
  "Yes, the bicycle really has physics.",
  "The source code is part of the story.",
  "Still curious? Me too.",
];
export default function PortfolioMode({
  onEnterTrack,
  openProject,
}: {
  onEnterTrack: () => void;
  openProject: (id: string) => void;
}) {
  const [wall, setWall] = useState<string | null>(wallFromHash);
  const [socials, setSocials] = useState(false);
  const [active, setActive] = useState("");
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [muted, setMuted] = useState(sfx.muted);
  const [primed, setPrimed] = useState<string | null>(null);
  const [aside, setAside] = useState(-1);
  const [screenError, setScreenError] = useState("");
  const [gate, setGate] = useState(() => {
    try {
      return (
        matchMedia("(max-width:600px)").matches &&
        !matchMedia("(prefers-reduced-motion:reduce)").matches &&
        sessionStorage.getItem("paper-mobile-ack") !== "yes"
      );
    } catch {
      return false;
    }
  });
  const [splash, setSplash] = useState(
    () => !matchMedia("(prefers-reduced-motion:reduce)").matches,
  );
  const root = useRef<HTMLDivElement>(null),
    reel = useRef<HTMLDivElement>(null),
    about = useRef<HTMLElement>(null),
    gag = useRef<HTMLDivElement>(null);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 850);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const change = () => setWall(wallFromHash());
    addEventListener("popstate", change);
    addEventListener("hashchange", change);
    return () => {
      removeEventListener("popstate", change);
      removeEventListener("hashchange", change);
    };
  }, []);
  useEffect(() => {
    let pending = false;
    const update = () => {
      pending = false;
      const nav = root.current?.querySelector("nav");
      const navHeight = nav?.getBoundingClientRect().height ?? 114;
      const line = navHeight + 8 + (innerHeight - navHeight - 8) * 0.22;
      let current = "";
      for (const id of ["about", "work", "links"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (
        document.getElementById("links")!.getBoundingClientRect().bottom <= line
      )
        current = "";
      setActive(current);
      const section = about.current;
      if (section) {
        const r = section.getBoundingClientRect();
        section.classList.toggle(
          "correction-shown",
          r.top + r.height * 0.7 < innerHeight * 0.9,
        );
      }
      if (gag.current) {
        const r = gag.current.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.65)),
        );
        gag.current.style.setProperty("--gag-p", String(p));
      }
    };
    const onScroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);
  useEffect(() => {
    if (!playing || wall || gate) return;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (reel.current) observer.observe(reel.current);
    const timer = setInterval(() => {
      if (visible && !document.hidden)
        setFrame((f) => (f + 1) % PROJECTS.length);
    }, 4200);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [playing, wall, gate]);
  useEffect(() => {
    const cancel = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".work-box")) {
        clearTimeout(tapTimer.current);
        setPrimed(null);
      }
    };
    document.addEventListener("pointerdown", cancel);
    return () => {
      clearTimeout(tapTimer.current);
      document.removeEventListener("pointerdown", cancel);
    };
  }, []);
  const showWall = (id: string) => {
    clearTimeout(tapTimer.current);
    setPrimed(null);
    history.pushState(null, "", `#wall-${id}`);
    setWall(id);
    sfx.openProject();
  };
  const closeWall = () => {
    setWall(null);
    history.replaceState(null, "", "#work");
  };
  const handleCategory = (id: string, pointer: string) => {
    if (
      pointer !== "touch" ||
      primed === id ||
      matchMedia("(prefers-reduced-motion:reduce)").matches
    ) {
      showWall(id);
      return;
    }
    clearTimeout(tapTimer.current);
    setPrimed(id);
    tapTimer.current = setTimeout(
      () => showWall(id),
      id === "research" || id === "playground" ? 900 : 650,
    );
  };
  const enterTrack = () => {
    setWall(null);
    onEnterTrack();
  };
  return (
    <div className="paper-portfolio" ref={root}>
      <InkFilters />
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      {splash && !gate && (
        <div className="paper-splash" aria-hidden="true">
          <span>AY</span>
        </div>
      )}
      {gate && (
        <PaperDialog
          title="Small-screen note"
          className="mobile-gate"
          onClose={() => {
            setGate(false);
            setSplash(false);
            try {
              sessionStorage.setItem("paper-mobile-ack", "yes");
            } catch {
              /* Storage is optional; dismissal still works. */
            }
          }}
        >
          <p>
            THIS SITE
            <br />
            AND THE PRINTS
            <br />
            WITHIN ARE BEST
            <br />
            EXPLORED ON
            <br />
            BIGGER SCREENS.
          </p>
          <button
            className="gate-enter"
            onClick={() => {
              setGate(false);
              setSplash(false);
              try {
                sessionStorage.setItem("paper-mobile-ack", "yes");
              } catch {
                /* Storage is optional. */
              }
            }}
          >
            I DON'T CARE
            <InkArrow />
          </button>
        </PaperDialog>
      )}
      <nav className="paper-nav" aria-label="Main">
        {["about", "work", "links"].map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={`paper-nav-link ${active === id ? "active" : ""}`}
            style={{ animationDelay: `${-0.24 * i}s` }}
            aria-current={active === id ? "location" : undefined}
          >
            <span>[{id === "links" ? "Links" : id.toUpperCase()}]</span>
          </a>
        ))}
      </nav>
      <main>
        <section
          className="paper-section reel-section"
          id="top"
          aria-label="Selected engineering projects reel"
        >
          <InkFrame className="reel-frame" />
          <div className="paper-reel" ref={reel}>
            <div className="reel-slide" data-frame={frame}>
              <div className="reel-title">
                <span>AMRITESHKUMAR YADAV</span>
                <h2>
                  {
                    [
                      "SYSTEMS.\nLEARNED.",
                      "MAKE FAILURE\nVISIBLE.",
                      "KEEP EVENTS\nMOVING.",
                      "EVERY ORDER.\nEVERY STATE.",
                      "MEASURE\nUNCERTAINTY.",
                      "FIND A\nBETTER WAY.",
                      "AN EXTRA\nPAIR OF EYES.",
                    ][frame]
                  }
                </h2>
                <p>{PROJECTS[frame].title}</p>
              </div>
              <ProjectPrint project={PROJECTS[frame]} index={frame} />
            </div>
            <div className="reel-controls">
              <button
                aria-label={
                  playing ? "Pause project reel" : "Play project reel"
                }
                onClick={() => setPlaying((v) => !v)}
              >
                {playing ? "Ⅱ" : "▷"}
              </button>
              <button
                aria-label="Next project in reel"
                onClick={() => setFrame((f) => (f + 1) % 7)}
              >
                →
              </button>
              <button
                className="fullscreen-reel"
                aria-label="View reel fullscreen"
                onClick={() => {
                  const result = reel.current?.requestFullscreen();
                  result?.catch(() =>
                    setScreenError(
                      "Fullscreen is unavailable in this browser.",
                    ),
                  );
                }}
              >
                ⛶
              </button>
            </div>
          </div>
          <button
            className="reel-unmute"
            aria-pressed={!muted}
            onClick={() => {
              sfx.setMuted(!muted);
              setMuted(!muted);
              if (muted) sfx.openProject();
            }}
          >
            <span>{muted ? "UNMUTE" : "MUTE"}</span>
            <InkArrow />
          </button>
          {screenError && (
            <p className="reel-error" role="status">
              {screenError}
            </p>
          )}
        </section>
        <div className="paper-seam" />
        <section
          className="paper-section paper-about"
          id="about"
          ref={about}
          aria-labelledby="about-name"
        >
          <img
            className="about-character"
            src={character}
            alt="Original illustrated programmer mascot, waving hello—not a portrait likeness."
          />
          <span className="about-hey" aria-hidden="true">
            — HEY.
          </span>
          <span className="about-role" aria-hidden="true">
            SOFTWARE
            <br />
            ENGINEER
            <InkArrow />
          </span>
          <div className="about-name">
            <span>MY NAME IS</span>
            <h1 id="about-name">AMRITESHKUMAR YADAV</h1>
            <span>BUT YOU CAN CALL ME “AMRITESH”.</span>
          </div>
          <p className="about-first">
            AFTER STUDYING COMPUTER SCIENCE
            <br />
            AND AI / ML AT SRM, I KEPT
            <br />
            ASKING WHAT HAPPENS UNDER
            <br />
            THE HOOD.
          </p>
          <p className="about-second">
            I BUILD BACKEND SYSTEMS, LEARNED
            <br />
            MODELS AND TOOLS YOU CAN ACTUALLY
            <br />
            TRY. I LIKE COMPUTER VISION,
            <br />
            QUANT RESEARCH, SELF-HOSTING AND
            <br />
            THE{" "}
            <span className="mistake-word">
              OCASIONAL
              <i aria-hidden="true" />
              <span className="correct-word">OCCASIONAL</span>
            </span>{" "}
            EXPERIMENT.
          </p>
          <div className="about-torn">
            <p>
              I ALSO ACCEPT THAT
              <br />
              GETTING IT WRONG IS PART
              <br />
              OF FIGURING IT OUT.
            </p>
          </div>
          <p className="paper-sr">
            {SITE.education}. {SITE.openTo}. Engineering projects and
            source-backed experiments follow.
          </p>
        </section>
        <div className="paper-seam" />
        <section
          className="paper-section paper-work"
          id="work"
          aria-label="Work categories"
        >
          <h2 className="paper-sr">Projects, research and experiments</h2>
          <div className="paper-work-grid">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                className={`work-box box-${i} ${primed === c.id ? "tap-active" : ""}`}
                data-testid={`category-${c.id}`}
                aria-label={`Open ${c.name}`}
                onClick={(e) =>
                  handleCategory(
                    c.id,
                    (e.nativeEvent as PointerEvent).pointerType ?? "mouse",
                  )
                }
              >
                <InkFrame variant={i} />
                <span className="work-label">{c.label}</span>
                {c.stickers.map((s, j) => (
                  <span
                    key={s}
                    aria-hidden="true"
                    className={`paper-sticker sticker-${j}`}
                  >
                    {s}
                  </span>
                ))}
                {i >= 4 && (
                  <span className="box-preview" aria-hidden="true">
                    {i === 4 ? (
                      <img src={character} alt="" />
                    ) : (
                      <>
                        <span className="preview-bicycle">○╱○</span>
                        <span className="preview-caption">TAKE A DETOUR.</span>
                      </>
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
        <div className="paper-seam" />
        <section
          className="paper-section paper-links"
          id="links"
          aria-label="Contact and links"
        >
          <div className="paper-link-row">
            <a
              className="bracket-link"
              href={SITE.links.email}
              aria-label="Email amriteshyadav2004@gmail.com"
            >
              <span>[</span>E-MAIL<span>]</span>
            </a>
            <button className="bracket-link" onClick={() => setSocials(true)}>
              <span>[</span>SOCIALS<span>]</span>
            </button>
            <button
              className="bracket-link"
              onClick={() => showWall("research")}
            >
              <span>[</span>+STUFF<span>]</span>
            </button>
          </div>
          <figure className="process-print">
            <img
              src={processArt}
              alt="Original ink illustration of a hand sketching a query tree and bicycle in a notebook."
            />
          </figure>
          <p className="process-credit">
            ORIGINAL ART <span aria-hidden="true">✳</span> AI-ASSISTED
            ILLUSTRATION
          </p>
          <a
            href="#top"
            className="paper-signature"
            data-testid="nav-home"
            aria-label="Back to the beginning"
          >
            AY
          </a>
        </section>
        <div className="paper-gag" ref={gag}>
          <div className="gag-sheet">
            <svg viewBox="0 0 440 1150" aria-hidden="true" className="gag-line">
              <path
                d="M224 0c-8 132 8 149 2 284s-3 112 1 211-9 216-1 332 0 193-2 259"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m213 1069 10 18 12-19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span className="gag-really">REALLY?</span>
            <span className="gag-still">STILL HERE??</span>
            <div className="gag-thanks">
              <span>THANK YOU!</span>
              <i aria-hidden="true">\ | /</i>
            </div>
            <button
              className="gag-character"
              onClick={() => setAside((a) => (a + 1) % asides.length)}
              aria-label="A small thought from the programmer"
            >
              <img src={character} alt="" />
            </button>
            <p className="gag-aside" aria-live="polite">
              {aside >= 0 ? asides[aside] : ""}
            </p>
            <p className="gag-caption">ENGINEERING WITH A LITTLE CURIOSITY.</p>
          </div>
        </div>
      </main>
      {wall && (
        <PaperWall
          category={wall}
          onClose={closeWall}
          openProject={openProject}
          onEnterTrack={enterTrack}
        />
      )}
      {socials && (
        <PaperDialog
          title="Social links"
          onClose={() => setSocials(false)}
          className="social-dialog"
        >
          <h2>ELSEWHERE.</h2>
          <a href={SITE.links.github} target="_blank" rel="noreferrer">
            [ GITHUB ↗ ]
          </a>
          <a href={SITE.links.linkedin} target="_blank" rel="noreferrer">
            [ LINKEDIN ↗ ]
          </a>
          <a className="contact-email" href={SITE.links.email}>
            {SITE.links.email.replace("mailto:", "")}
          </a>
        </PaperDialog>
      )}
    </div>
  );
}
