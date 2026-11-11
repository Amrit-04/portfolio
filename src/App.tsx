import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioMode from './modes/portfolio/PortfolioMode';
import { ProjectDetail } from './modes/portfolio/ProjectDetail';
import { getProjectById } from './data/projects';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MarkLogo } from './components/illustrations';

const RideMode = React.lazy(() => import('./modes/ride/RideMode'));

type Mode = 'portfolio' | 'ride';

function isRideHash(): boolean {
  return window.location.hash.replace(/^#\/?/, '') === 'ride';
}

export default function App() {
  const [mode, setMode] = useState<Mode>(() => (isRideHash() ? 'ride' : 'portfolio'));
  const [transition, setTransition] = useState<null | 'to-ride' | 'to-portfolio'>(null);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [rideMounted, setRideMounted] = useState(() => isRideHash());

  const enterTrack = useCallback(() => {
    if (mode === 'ride' || transition) return;
    setTransition('to-ride');
    window.setTimeout(() => {
      window.location.hash = '/ride';
      setMode('ride');
      setRideMounted(true);
    }, 950);
    window.setTimeout(() => setTransition(null), 1500);
  }, [mode, transition]);

  const exitTrack = useCallback(() => {
    if (mode === 'portfolio' || transition) return;
    setOpenProjectId(null);
    setTransition('to-portfolio');
    window.setTimeout(() => {
      window.location.hash = '';
      setMode('portfolio');
      setRideMounted(false);
    }, 350);
    window.setTimeout(() => setTransition(null), 750);
  }, [mode, transition]);

  useEffect(() => {
    const onHash = () => {
      const ride = isRideHash();
      setMode((m) => (ride && m === 'portfolio' ? (setRideMounted(true), 'ride') : !ride && m === 'ride' ? 'portfolio' : m));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // resume the ride engine after the notebook modal closes
  useEffect(() => {
    if (!openProjectId) {
      window.dispatchEvent(new Event('ay-resume-ride'));
    }
  }, [openProjectId]);

  const openProject = useCallback((id: string) => setOpenProjectId(id), []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />

      <ErrorBoundary label="Portfolio mode">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            {mode === 'portfolio' && (
              <PortfolioMode key="portfolio" onEnterTrack={enterTrack} openProject={openProject} />
            )}
          </AnimatePresence>
        </Suspense>
      </ErrorBoundary>

      {rideMounted && (
        <ErrorBoundary label="Ride mode">
          <Suspense
            fallback={
              <div className="fixed inset-0 z-40 bg-paper flex items-center justify-center">
                <p className="label-mono animate-pulse">Inflating the tires…</p>
              </div>
            }
          >
            <RideMode onExit={exitTrack} openProject={openProject} />
          </Suspense>
        </ErrorBoundary>
      )}

      <AnimatePresence>
        {openProjectId && getProjectById(openProjectId) && (
          <ProjectDetail key="detail" project={getProjectById(openProjectId)} onClose={() => setOpenProjectId(null)} />
        )}
      </AnimatePresence>

      {/* mode transition: the track draws itself, then the rider drops in */}
      <AnimatePresence>
        {transition && (
          <motion.div
            className="fixed inset-0 z-[120] bg-paper flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mode-transition"
          >
            <svg viewBox="0 0 1200 400" className="w-full max-w-4xl px-6" aria-hidden="true">
              <motion.path
                d="M -20 240 C 150 180, 260 300, 430 240 S 700 150, 830 230 S 1080 300, 1220 220"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: 'easeInOut' }}
              />
              <motion.path
                d="M 830 230 L 830 160 L 880 172 L 830 186 Z"
                fill="#D9381E"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
            </svg>
            <motion.div
              className="absolute"
              initial={{ top: '8%', left: '30%', opacity: 0, rotate: 0 }}
              animate={{ top: ['8%', '38%'], left: ['30%', '62%'], opacity: [0, 1, 1], rotate: [0, 8, -4] }}
              transition={{ duration: 0.95, ease: 'easeIn' }}
            >
              <MarkLogo className="w-14 h-14 text-ink" />
            </motion.div>
            <p className="label-mono absolute bottom-16 left-1/2 -translate-x-1/2 animate-pulse">
              {transition === 'to-ride' ? 'entering the track' : 'back to the notebook'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
