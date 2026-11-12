import React from 'react';
import { motion } from 'framer-motion';
import { HERO_LINES, HERO_SUB, SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { WorkshopEntranceHeroArt } from '../../components/illustrations';
import { Mail, FileText, ArrowDown, Bike, Sparkles, Compass } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

export const Hero: React.FC<{ onEnterTrack: () => void; scrollTo: (href: string) => void }> = ({
  onEnterTrack,
  scrollTo,
}) => {
  return (
    <section
      className="relative min-h-[96vh] pt-24 pb-16 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center overflow-hidden bg-paper"
      id="top"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Top illustrated studio dispatch badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 mb-4"
        >
          <span className="sticker text-xs text-ink bg-paper2/95 border border-ink3/40 shadow-xs px-3 py-1 rounded-full flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5" />
            SRM &apos;26 · AI/ML Systems &amp; Backend Engineer
          </span>
          <span className="annotation text-ink3 text-sm sm:text-base rotate-[-2deg]">
            ✎ handcrafted world &amp; verified code
          </span>
        </motion.div>

        {/* Grand Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif leading-[1.02] text-[clamp(2.5rem,6.5vw,5rem)] tracking-tight text-ink font-semibold">
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

          {/* Professional Positioning Taxonomy */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm font-mono font-medium text-ink2">
            <span className="px-2.5 py-0.5 rounded-sm bg-paper2/80 border border-ink3/30">AI/ML Systems</span>
            <span className="text-accent">•</span>
            <span className="px-2.5 py-0.5 rounded-sm bg-paper2/80 border border-ink3/30">Backend Engineering</span>
            <span className="text-accent">•</span>
            <span className="px-2.5 py-0.5 rounded-sm bg-paper2/80 border border-ink3/30">Distributed Systems</span>
            <span className="text-accent">•</span>
            <span className="px-2.5 py-0.5 rounded-sm bg-paper2/80 border border-ink3/30">Quantitative Computing</span>
          </div>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-ink2 font-sans">
            {HERO_SUB}
          </p>
        </motion.div>

        {/* Action Buttons as Handcrafted Studio Signposts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4"
        >
          <button
            className="btn-ink"
            onClick={() => scrollTo('#work')}
            data-testid="explore-work-btn"
          >
            <Compass className="w-4 h-4 mr-1 text-gold" />
            Walk the Exhibition Wall <ArrowDown className="w-4 h-4 ml-1" />
          </button>
          <button
            className="btn-red flex items-center gap-2"
            onClick={onEnterTrack}
            data-testid="enter-track-btn"
          >
            <Bike className="w-4 h-4 text-accent" />
            <span>Enter the 2D Track</span>
          </button>
          <a
            href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
            download="Amriteshkumar_Yadav_Resume.pdf"
            className="btn-outline flex items-center gap-2"
            data-testid="resume-btn"
            title="Download verified resume"
          >
            <FileText className="w-4 h-4 text-blue" />
            <span>Verified Blueprint PDF</span>
          </a>
        </motion.div>

        {/* Direct Social & Contact Dispatch Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-sans font-semibold text-ink3"
        >
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="link-sketch text-ink hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" /> GitHub (Amrit-04)
          </a>
          <span>·</span>
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-sketch text-ink hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <span>·</span>
          <a
            href={SITE.links.email}
            className="link-sketch text-ink hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> amriteshkumar0401@gmail.com
          </a>
        </motion.div>

        {/* THE CENTERPIECE ILLUSTRATED WORKSHOP FACADE */}
        <motion.div
          className="mt-8 w-full max-w-4xl relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <div className="relative rounded-xl border border-ink3/40 bg-paper/60 p-2 sm:p-4 shadow-sm">
            <WorkshopEntranceHeroArt className="w-full h-auto text-ink" />
          </div>
          <span className="annotation absolute -bottom-6 right-4 text-sm sm:text-base text-accent rotate-2 hidden sm:block">
            welcome inside the engineering studio ✎
          </span>
        </motion.div>
      </div>

      {/* Downward indicator */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => scrollTo('#work')}
          className="text-xs text-ink3 hover:text-accent flex items-center gap-1.5 font-sans transition-colors cursor-pointer"
        >
          <span>scroll down to the 7 exhibition exhibits</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
