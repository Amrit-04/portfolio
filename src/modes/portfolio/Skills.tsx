import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_GROUPS } from '../../data/site';
import { Code2, Database, Brain, Layers, Wrench } from 'lucide-react';

const GROUP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Languages: Code2,
  'Data & Streaming': Database,
  'AI / ML': Brain,
  Infrastructure: Layers,
};

export const Skills: React.FC = () => (
  <section id="skills" className="relative py-24 md:py-32 px-5 md:px-10">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="sticker text-xs text-accent bg-paper2">
              <Wrench className="w-3 h-3 text-accent mr-1" />
              The Workshop Shelf
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4.2rem)] leading-[1.0] font-normal tracking-tight text-ink">
            Tools on the workshop bench.
          </h2>
        </div>
        <p className="max-w-md text-sm text-ink2 font-sans leading-relaxed">
          No vague skill bars or subjective percentages — just the concrete programming languages, distributed primitives, and deep learning architectures proven in my repositories.
        </p>
      </div>

      {/* Illustrated Shelves Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((g, gi) => {
          const Icon = GROUP_ICONS[g.title] || Layers;
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-paper rounded-2xl border border-ink3/30 p-6 md:p-8 shadow-xs relative overflow-hidden group hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-paper2 flex items-center justify-center text-accent border border-ink3/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      {g.title}
                    </h3>
                    <p className="annotation text-base text-ink3">
                      {g.note}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-ink3/60">
                  0{gi + 1}
                </span>
              </div>

              {/* Wooden Shelf Baseline */}
              <div className="h-1.5 w-full bg-paper3/80 rounded-full mb-5" />

              {/* Skill Stickers */}
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-paper2/90 border border-ink3/30 text-ink hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-150 cursor-default shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
