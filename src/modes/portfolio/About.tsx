import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_FACTS, ABOUT_PARAGRAPHS } from '../../data/site';
import { AvatarSketch } from '../../components/illustrations';
import { Sparkles, Compass } from 'lucide-react';

export const About: React.FC = () => (
  <section id="about" className="relative py-24 md:py-32 px-5 md:px-10 bg-paper2/50 border-t border-ink3/20">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left: Illustrated self-portrait studio wall */}
      <motion.div
        className="lg:col-span-4 relative flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative postcard p-6 pb-8 bg-paper w-full max-w-[320px] rounded-2xl shadow-sm rotate-[-1.5deg]">
          <AvatarSketch className="w-full text-ink drop-shadow-xs" />
          <div className="mt-4 text-center">
            <span className="annotation text-xl text-accent font-semibold block">
              Amriteshkumar Yadav
            </span>
            <span className="text-xs text-ink3 font-sans block mt-0.5">
              engineer · researcher · tinkerer
            </span>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-4 top-10 rotate-6 pointer-events-none">
          <span className="annotation text-lg text-accent">glasses: always on 👓</span>
        </div>
        <div className="hidden lg:block absolute -left-4 bottom-14 -rotate-3 pointer-events-none">
          <span className="annotation text-lg text-accent2">loves low latency ⚡</span>
        </div>
      </motion.div>

      {/* Right: Personal note and verified receipts */}
      <motion.div
        className="lg:col-span-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper">
            <Sparkles className="w-3 h-3 text-accent mr-1" />
            Personal Note
          </span>
        </div>

        <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.0] font-normal tracking-tight text-ink">
          An engineer who ships his receipts.
        </h2>

        <div className="mt-7 space-y-4 max-w-2xl text-base leading-relaxed text-ink2 font-sans">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Illustrated Fact Wall */}
        <div className="mt-10 max-w-2xl bg-paper/80 rounded-2xl border border-ink3/30 p-6 shadow-xs">
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wider font-sans mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent" />
            Verified Background &amp; Focus
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {ABOUT_FACTS.map((f) => (
              <div key={f.label} className="p-3 bg-paper2/60 rounded-xl border border-ink3/20">
                <span className="text-[11px] font-sans font-medium text-ink3 uppercase tracking-wider block">
                  {f.label}
                </span>
                <span className="font-sans text-sm font-semibold text-ink block mt-1">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
