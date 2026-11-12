import React from 'react';
import { motion } from 'framer-motion';
import { RESEARCH, SIDE_QUESTS } from '../../data/site';
import { BookOpen, ExternalLink, Sparkles, Bike, Compass, Award } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

export const Research: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="research" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-paper2/50 border-t-2 border-ink/20">
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper border border-accent/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-accent mr-1 inline" />
            Peer-Reviewed Research
          </span>
          <span className="annotation text-ink3 text-sm rotate-[-1deg]">
            IEEE RMKMATE 2026 publication
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
          Framed publication &amp; side quests.
        </h2>
      </div>

      {/* Framed Museum Research Certificate / Parchment */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="relative bg-paper rounded-2xl border-2 border-ink p-6 sm:p-10 md:p-12 shadow-md relative overflow-hidden"
      >
        {/* Top hanging wire & brass brackets */}
        <div className="flex justify-between items-center px-8 -mt-2 mb-6 opacity-60">
          <div className="w-3 h-3 rounded-full border-2 border-ink bg-d4a843" />
          <div className="h-0.5 flex-1 bg-ink/30 mx-4" />
          <div className="w-3 h-3 rounded-full border-2 border-ink bg-d4a843" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
              IEEE Conference Publication
            </span>
          </div>
          <span className="sticker text-xs font-mono font-bold text-ink bg-paper2 border border-ink3/40">
            IEEE Xplore: 11518869
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl leading-snug font-bold text-ink">
          {RESEARCH.title}
        </h3>

        <div className="mt-4 p-4 bg-paper2/60 rounded-xl border border-ink3/30 space-y-1">
          <p className="font-sans text-sm text-ink2 leading-relaxed">
            <strong className="text-ink">Authors:</strong> {RESEARCH.authors}
          </p>
          <p className="font-mono text-xs text-blue">
            {RESEARCH.venue}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-ink3/20">
          <a
            href={RESEARCH.doiUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ink text-xs flex items-center gap-2"
            data-testid="ieee-link"
          >
            <ExternalLink className="w-4 h-4 text-gold" /> View on IEEE Xplore
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
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Curious side quests
          </h4>
          <span className="annotation text-base sm:text-lg text-ink3 rotate-[-1deg]">
            unusual systems built to understand how computers work ✎
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
              className="p-5 bg-paper rounded-xl border-2 border-ink hover:border-accent hover:shadow-md transition-all duration-200 group block"
              data-testid={`sidequest-${q.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-xl font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-2">
                  {q.url.startsWith('#/') ? <Bike className="w-4 h-4 text-accent" /> : <Compass className="w-4 h-4 text-blue" />}
                  {q.name}
                </span>
                <span className="text-xs font-mono text-ink3 group-hover:text-accent">
                  Explore ↗
                </span>
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
