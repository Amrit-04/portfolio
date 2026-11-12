import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_GROUPS } from '../../data/site';
import { ToolboardSkillsArt } from '../../components/illustrations';
import { Code2, Database, Brain, Layers, Wrench, Sparkles } from 'lucide-react';

const GROUP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Languages: Code2,
  'Data & Streaming': Database,
  'AI / ML': Brain,
  Infrastructure: Layers,
};

export const Skills: React.FC = () => (
  <section id="skills" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
    {/* Section Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper2 border border-ink3/40 px-3 py-1 rounded-full">
            <Wrench className="w-3.5 h-3.5 text-accent mr-1 inline" />
            The Master Toolboard
          </span>
          <span className="annotation text-ink3 text-sm rotate-[-1.5deg]">
            calibrated for production systems
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
          Instruments on the workshop bench.
        </h2>
      </div>
      <p className="max-w-md text-sm sm:text-base text-ink2 font-sans leading-relaxed">
        No subjective percentage bars or generic buzzwords — just the concrete programming languages, low-latency primitives, and deep learning architectures proven in my repositories.
      </p>
    </div>

    {/* Master Hand-Drawn Pegboard Illustration */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="mb-12 p-3 bg-paper2/50 rounded-2xl border-2 border-ink shadow-sm"
    >
      <ToolboardSkillsArt className="w-full h-auto text-ink" />
    </motion.div>

    {/* Illustrated Workshop Shelves Grid */}
    <div className="grid md:grid-cols-2 gap-8">
      {SKILL_GROUPS.map((g, gi) => {
        const Icon = GROUP_ICONS[g.title] || Layers;
        return (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="bg-paper rounded-2xl border-2 border-ink p-6 md:p-8 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-paper2 flex items-center justify-center text-accent border border-ink3/30 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {g.title}
                  </h3>
                  <p className="annotation text-base text-ink3">
                    {g.note}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-ink3/60">
                0{gi + 1}
              </span>
            </div>

            {/* Wooden Shelf Baseline */}
            <div className="h-1.5 w-full bg-paper3 rounded-full mb-5" />

            {/* Skill Badges */}
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs font-semibold px-3 py-1.5 rounded-md bg-paper2 border border-ink3/40 text-ink shadow-2xs hover:border-accent hover:text-accent transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);
