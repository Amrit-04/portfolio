import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_GROUPS } from '../../data/site';

export const Skills: React.FC = () => (
  <section id="skills" className="relative py-24 md:py-32">
    <div className="max-w-page mx-auto px-5 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="label-mono text-red mb-3">03 — Toolbox</p>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-tight">
            Drawers, labeled honestly.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink2 leading-relaxed">
          No skill bars, no percentages — just the tools each shipped system actually used.
        </p>
      </div>

      <div className="border-t-[1.5px] border-ink">
        {SKILL_GROUPS.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-10 py-7 border-b-[1.5px] border-ink items-baseline"
          >
            <div>
              <h3 className="font-serif text-2xl md:text-3xl">{g.title}</h3>
              <p className="annotation text-lg text-ink3">{g.note}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="font-mono text-xs border-[1.5px] border-ink px-3 py-1.5 shadow-hard-sm bg-paper hover:-translate-y-0.5 hover:shadow-hard transition-transform duration-150">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
