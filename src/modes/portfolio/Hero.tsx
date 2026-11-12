import React from 'react';
import { motion } from 'framer-motion';
import { HERO_LINES, HERO_SUB, SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { WorkbenchArt } from '../../components/illustrations';
import { Mail, FileText, ArrowDown, Bike, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

export const Hero: React.FC<{ onEnterTrack: () => void; scrollTo: (href: string) => void }> = ({
  onEnterTrack,
  scrollTo,
}) => {
  return (
    <section
      className="relative min-h-[92vh] pt-28 pb-16 px-5 md:px-10 flex flex-col justify-center overflow-hidden watercolor-wash"
      id="top"
    >
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Personal Introduction & Expressive Headline */}
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2.5 mb-6"
          >
            <span className="sticker text-xs text-ink bg-paper2/90 border border-ink3/40">
              <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5" />
              SRM &apos;26 · AI/ML Systems &amp; Backend Engineer
            </span>
            <span className="annotation text-ink3 text-base hidden sm:inline rotate-[-2deg]">
              hand-drawn &amp; fully verified
            </span>
          </motion.div>

          <h1 className="font-serif leading-[1.0] text-[clamp(2.75rem,7vw,5.5rem)] tracking-tight text-ink font-normal">
            {HERO_LINES.map((line, i) => (
              <span key={line} className="block">
                {i === HERO_LINES.length - 1 ? (
                  <span>
                    and <em className="text-accent not-italic font-serif italic font-medium">scale.</em>
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-ink2 font-sans"
          >
            {HERO_SUB}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              className="btn-ink"
              onClick={() => scrollTo('#work')}
              data-testid="explore-work-btn"
            >
              Explore my work <ArrowDown className="w-4 h-4" />
            </button>
            <button
              className="btn-red flex items-center gap-2"
              onClick={onEnterTrack}
              data-testid="enter-track-btn"
            >
              <Bike className="w-4 h-4 text-accent" />
              <span>Enter the track</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 border-t border-ink3/20"
          >
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noreferrer"
              className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href={SITE.links.email}
              className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            <a
              href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
              download="Amriteshkumar_Yadav_Resume.pdf"
              className="link-sketch font-sans text-xs font-semibold text-ink hover:text-accent transition-colors flex items-center gap-1.5"
              title="Download verified resume"
            >
              <FileText className="w-4 h-4" /> Resume PDF
            </a>
          </motion.div>
        </div>

        {/* Right Column: Hand-drawn Illustrated Studio Scene */}
        <motion.div
          className="lg:col-span-5 relative flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative w-full max-w-[560px]">
            <WorkbenchArt className="w-full h-auto text-ink drop-shadow-sm float" />
            <span className="annotation absolute -top-4 right-2 text-xl text-accent rotate-3 hidden sm:block">
              drawn from scratch ✎
            </span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => scrollTo('#work')}
          className="text-xs text-ink3 hover:text-accent flex items-center gap-1.5 font-sans transition-colors"
        >
          <span>scroll to explore the exhibition wall</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
