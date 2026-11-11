import React from 'react';
import { motion } from 'framer-motion';
import { HERO_LINES, HERO_SUB, SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { WorkbenchArt } from '../../components/illustrations';
import { Mail, FileText, ArrowDown } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

const lineVariants = {
  hidden: { y: '112%' },
  show: (i: number) => ({
    y: '0%',
    transition: { delay: 0.25 + i * 0.14, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const Hero: React.FC<{ onEnterTrack: () => void; scrollTo: (href: string) => void }> = ({
  onEnterTrack,
  scrollTo,
}) => {
  return (
    <section className="relative min-h-screen grid-bg overflow-hidden flex flex-col justify-center" id="top">
      <div className="max-w-page w-full mx-auto px-5 md:px-10 pt-24 pb-16 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2.5 h-2.5 bg-red" />
            <span className="label-mono">Engineering Notebook — {SITE.name}</span>
          </motion.div>

          <h1 className="font-serif leading-[0.95] text-[clamp(3rem,8.5vw,6.2rem)] tracking-tight">
            {HERO_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                >
                  {i === HERO_LINES.length - 1 ? (
                    <span>
                      their <em className="text-red not-italic font-serif italic">benchmarks.</em>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-ink2"
          >
            {HERO_SUB}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button className="btn-ink" onClick={() => scrollTo('#work')} data-testid="explore-work-btn">
              Explore my work <ArrowDown className="w-4 h-4" />
            </button>
            <button className="btn-red" onClick={onEnterTrack} data-testid="enter-track-btn">
              Enter the track
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a href={SITE.links.github} target="_blank" rel="noreferrer" className="link-sketch font-mono text-xs uppercase tracking-[0.14em] flex items-center gap-1.5">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="link-sketch font-mono text-xs uppercase tracking-[0.14em] flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={SITE.links.email} className="link-sketch font-mono text-xs uppercase tracking-[0.14em] flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a
              href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
              download="Amriteshkumar_Yadav_Resume.pdf"
              className="link-sketch font-mono text-xs uppercase tracking-[0.14em] flex items-center gap-1.5"
              title="Download verified resume"
            >
              <FileText className="w-4 h-4" /> Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <WorkbenchArt className="w-full max-w-[560px] mx-auto text-ink" />
          <span className="annotation absolute top-2 right-4 text-lg rotate-2 hidden md:block">drawn from scratch</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 label-mono flex items-center gap-2 text-ink3"
      >
        scroll <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
};
