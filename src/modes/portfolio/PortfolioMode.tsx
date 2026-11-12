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
      {/* Handcrafted Hanging Studio Signboard Navigation */}
      <nav
        className="fixed top-2 inset-x-0 z-50 px-3 md:px-8 max-w-5xl mx-auto pointer-events-none"
        aria-label="Main"
      >
        {/* Hanging bracket links */}
        <div className="flex justify-between px-16 -mb-1 pointer-events-none">
          <div className="w-1 h-3 bg-ink/70 rounded-xs" />
          <div className="w-1 h-3 bg-ink/70 rounded-xs" />
        </div>

        <div className="bg-paper2/95 backdrop-blur-md border-2 border-ink rounded-lg px-4 sm:px-6 py-2 shadow-md flex items-center justify-between gap-4 pointer-events-auto relative">
          {/* Decorative brass rivets */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-ink/60" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ink/60" />
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-ink/60" />
          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ink/60" />

          <a
            href="#top"
            className="flex items-center gap-2.5 min-w-0 group"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#top');
            }}
            data-testid="nav-home"
          >
            <MarkLogo className="w-7 h-7 text-ink shrink-0 group-hover:scale-105 transition-transform" />
            <span className="truncate">
              <span className="font-serif text-sm sm:text-base leading-none block font-bold text-ink group-hover:text-red transition-colors tracking-tight">
                <span className="hidden sm:inline">{SITE.name}</span>
                <span className="sm:hidden">{SITE.shortName}</span>
              </span>
              <span className="text-[10px] text-ink3 hidden sm:block font-mono tracking-wider mt-0.5">
                STUDIO &amp; WORKSHOP
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-semibold text-ink2 hover:text-red hover:underline underline-offset-4 transition-colors font-sans"
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
            className="btn-red !py-1.5 !px-3.5 shrink-0 text-xs rounded-md flex items-center gap-1.5 border-2 shadow-xs cursor-pointer"
            onClick={onEnterTrack}
            data-testid="enter-track-nav"
            title="Launch 2D Free Rider bicycle game mode"
          >
            <Bike className="w-4 h-4" />
            <span className="hidden sm:inline font-bold">Ride the Track</span>
            <span className="sm:hidden font-bold">Ride</span>
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
