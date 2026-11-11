import React from 'react';
import { motion } from 'framer-motion';
import { RESEARCH, SIDE_QUESTS } from '../../data/site';
import { BookOpen, ExternalLink, Flag } from 'lucide-react';
import { Github } from '../../components/BrandIcons';

export const Research: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="research" className="relative py-24 md:py-32 border-t-[1.5px] border-ink bg-paper2/40">
    <div className="max-w-page mx-auto px-5 md:px-10">
      <div className="mb-12 md:mb-16">
        <p className="label-mono text-red mb-3">04 — Research</p>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-tight">
          Peer-reviewed, in print.
        </h2>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative tape bg-paper frame p-6 md:p-10 max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-4 h-4 text-blue" />
          <span className="label-mono">IEEE RMKMATE 2026 — conference publication</span>
        </div>
        <h3 className="font-serif text-2xl md:text-4xl leading-[1.05]">{RESEARCH.title}</h3>
        <p className="mt-4 font-mono text-xs text-ink2">{RESEARCH.authors}</p>
        <p className="mt-1 font-mono text-xs text-ink3 italic">{RESEARCH.venue}</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <a href={RESEARCH.doiUrl} target="_blank" rel="noreferrer" className="btn-ink !py-2.5 !px-4" data-testid="ieee-link">
            <ExternalLink className="w-4 h-4" /> {RESEARCH.recordId}
          </a>
          <a
            href="https://github.com/Amrit-04/workplace-safety-vision"
            target="_blank"
            rel="noreferrer"
            className="btn-outline !py-2.5 !px-4"
          >
            <Github className="w-4 h-4" /> Implementation
          </a>
        </div>
      </motion.article>

      <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="annotation text-xl text-ink3"
        >
          side quests — smaller things built to understand how software works
        </motion.p>
        <div className="space-y-4">
          {SIDE_QUESTS.map((q) => (
            <a
              key={q.name}
              href={q.url}
              target={q.url.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              onClick={q.url.startsWith('#/') ? (e) => { e.preventDefault(); onEnterTrack(); } : undefined}
              className="block frame-sm bg-paper p-4 shadow-hard-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard transition-transform duration-150"
              data-testid={`sidequest-${q.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <p className="font-mono text-xs font-bold flex items-center gap-2">
                <Flag className="w-3.5 h-3.5 text-red" /> {q.name}
              </p>
              <p className="text-[13px] text-ink2 mt-1.5 leading-relaxed">{q.note}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);
