import React from 'react';
import { motion } from 'framer-motion';
import { RESEARCH, SIDE_QUESTS } from '../../data/site';
import { BookOpen, ExternalLink, Sparkles, Bike, Compass } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

export const Research: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="research" className="relative py-24 md:py-32 px-5 md:px-10 bg-paper2/50 border-t border-ink3/20">
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper">
            <Sparkles className="w-3 h-3 text-accent mr-1" />
            Peer-Reviewed Research
          </span>
        </div>
        <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.2rem)] leading-[1.0] font-normal tracking-tight text-ink">
          Framed publication &amp; side quests.
        </h2>
      </div>

      {/* Framed Research Certificate / Artifact */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-paper rounded-2xl border-2 border-ink3/30 p-8 md:p-12 shadow-sm gallery-frame"
      >
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-ink3/20">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-accent2" />
            <span className="font-sans text-xs font-semibold text-accent2 uppercase tracking-wider">
              IEEE Conference Publication
            </span>
          </div>
          <span className="sticker text-[11px] font-mono text-ink">
            IEEE Xplore: 11518869
          </span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl leading-snug font-semibold text-ink">
          {RESEARCH.title}
        </h3>

        <p className="mt-4 font-sans text-sm text-ink2 leading-relaxed">
          <strong className="text-ink">Authors:</strong> {RESEARCH.authors}
        </p>
        <p className="mt-1 font-sans text-xs text-ink3 italic">
          {RESEARCH.venue}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-ink3/20">
          <a
            href={RESEARCH.doiUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ink text-xs flex items-center gap-2"
            data-testid="ieee-link"
          >
            <ExternalLink className="w-4 h-4" /> View on IEEE Xplore
          </a>
          <a
            href="https://github.com/Amrit-04/workplace-safety-vision"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-xs flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> Research Repository
          </a>
        </div>
      </motion.article>

      {/* Side Quests Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-serif text-2xl font-semibold text-ink">
            Curious side quests
          </h4>
          <span className="annotation text-lg text-ink3 rotate-[-1deg]">
            strange small things built to understand software
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SIDE_QUESTS.map((q) => (
            <a
              key={q.name}
              href={q.url}
              target={q.url.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              onClick={q.url.startsWith('#/') ? (e) => { e.preventDefault(); onEnterTrack(); } : undefined}
              className="postcard p-5 bg-paper rounded-xl hover:shadow-md transition-all duration-200 group block"
              data-testid={`sidequest-${q.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-xl font-semibold text-ink group-hover:text-accent transition-colors flex items-center gap-2">
                  {q.url.startsWith('#/') ? <Bike className="w-4 h-4 text-accent" /> : <Compass className="w-4 h-4 text-accent2" />}
                  {q.name}
                </span>
                <span className="text-xs text-ink3 font-mono">explore →</span>
              </div>
              <p className="text-xs text-ink2 font-sans leading-relaxed">
                {q.note}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);
