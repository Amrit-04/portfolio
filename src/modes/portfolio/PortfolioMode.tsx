import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { SITE, NAV_LINKS } from '../../data/site';
import { MarkLogo } from '../../components/illustrations';
import { Hero } from './Hero';
import { Marquee } from './Marquee';
import { ProjectsGallery } from './ProjectsGallery';
import { About } from './About';
import { Skills } from './Skills';
import { Research } from './Research';
import { Contact } from './Contact';
import { Bike } from 'lucide-react';

export default function PortfolioMode({
  onEnterTrack,
  openProject,
}: {
  onEnterTrack: () => void;
  openProject: (id: string) => void;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    if (!reduced) {
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => force((n) => n + 1), 50);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -70 });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
      <nav className="fixed top-0 inset-x-0 z-50 border-b-[1.5px] border-ink bg-paper" aria-label="Main">
        <div className="max-w-page mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-3 min-w-0"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#top');
            }}
            data-testid="nav-home"
          >
            <MarkLogo className="w-8 h-8 text-ink shrink-0" />
            <span className="truncate">
              <span className="font-serif text-lg leading-none block">{SITE.name}</span>
              <span className="label-mono text-[9px] text-ink3 hidden sm:block">{SITE.roles}</span>
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label-mono hover:text-red transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <button className="btn-red !py-2 !px-3.5 shrink-0" onClick={onEnterTrack} data-testid="enter-track-nav">
            <Bike className="w-4 h-4" /> <span className="hidden sm:inline">Enter the track</span>
            <span className="sm:hidden">Ride</span>
          </button>
        </div>
      </nav>

      <main>
        <Hero onEnterTrack={onEnterTrack} scrollTo={scrollTo} />
        <Marquee />
        <ProjectsGallery onOpen={openProject} />
        <About />
        <Skills />
        <Research onEnterTrack={onEnterTrack} />
        <Contact onEnterTrack={onEnterTrack} />
      </main>

      <footer className="border-t-[1.5px] border-ink bg-paper2/60">
        <div className="max-w-page mx-auto px-5 md:px-10 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="label-mono text-ink3">© 2026 {SITE.name} — every metric cites its source artifact</p>
          <p className="label-mono text-ink3">Portfolio mode · React · Canvas · ONNX Runtime Web</p>
        </div>
      </footer>
    </motion.div>
  );
}
