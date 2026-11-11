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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="min-h-screen bg-paper text-ink"
    >
      {/* Floating elegant illustrated header */}
      <nav
        className="fixed top-3 inset-x-0 z-50 px-4 md:px-8 max-w-5xl mx-auto pointer-events-none"
        aria-label="Main"
      >
        <div className="bg-paper/95 backdrop-blur-md border border-ink3/40 rounded-full px-5 py-2.5 shadow-sm flex items-center justify-between gap-4 pointer-events-auto">
          <a
            href="#top"
            className="flex items-center gap-3 min-w-0 group"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#top');
            }}
            data-testid="nav-home"
          >
            <MarkLogo className="w-8 h-8 text-ink shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">
              <span className="font-serif text-base sm:text-lg leading-none block font-semibold text-ink group-hover:text-red transition-colors">
                <span className="hidden sm:inline">{SITE.name}</span>
                <span className="sm:hidden">{SITE.shortName}</span>
              </span>
              <span className="text-[11px] text-ink3 hidden sm:block font-sans mt-0.5">
                AI/ML &amp; Systems Engineer
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-ink2 hover:text-red transition-colors font-sans"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            className="btn-red !py-2 !px-4 shrink-0 text-xs rounded-full flex items-center gap-2"
            onClick={onEnterTrack}
            data-testid="enter-track-nav"
            title="Launch 2D Free Rider bicycle game mode"
          >
            <Bike className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Enter the track</span>
            <span className="sm:hidden font-semibold">Ride</span>
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

      <footer className="border-t border-ink3/30 bg-paper2/70 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">
              Amriteshkumar Yadav
            </p>
            <p className="text-xs text-ink3 font-sans mt-0.5">
              Hand-drawn personal engineering portfolio &amp; 120Hz physics track · All metrics cite source repository artifacts
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans text-ink2">
            <a href={SITE.links.github} target="_blank" rel="noreferrer" className="hover:text-red transition-colors">GitHub</a>
            <span>·</span>
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-red transition-colors">LinkedIn</a>
            <span>·</span>
            <button onClick={onEnterTrack} className="hover:text-red transition-colors font-semibold text-red">Ride Mode</button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
