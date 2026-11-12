import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_FACTS, ABOUT_PARAGRAPHS } from '../../data/site';
import { StudioDeskAboutArt } from '../../components/illustrations';
import { Sparkles, Compass } from 'lucide-react';

export const About: React.FC = () => (
  <section id="about" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-paper2/50 border-t-2 border-ink/20">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Left: Illustrated Engineer's Study Desk Scene */}
      <motion.div
        className="lg:col-span-5 relative flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        <div className="relative w-full max-w-[440px] p-2 bg-paper rounded-2xl border-2 border-ink shadow-md">
          <StudioDeskAboutArt className="w-full h-auto text-ink" />
          <div className="p-3 bg-paper2/80 rounded-b-xl border-t border-ink3/20 text-center">
            <span className="font-serif text-lg font-bold text-ink block">
              The Engineer&apos;s Study
            </span>
            <span className="text-xs text-ink3 font-mono block mt-0.5">
              SRM IST (B.Tech CSE AI/ML · Jul 2026)
            </span>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-6 top-8 rotate-6 pointer-events-none">
          <span className="annotation text-base text-accent">pencil behind ear ✎</span>
        </div>
      </motion.div>

      {/* Right: Personal Philosophy & Empirical Receipts */}
      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="sticker text-xs text-accent bg-paper border border-accent/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-accent mr-1 inline" />
            Engineering Philosophy
          </span>
          <span className="annotation text-ink3 text-sm rotate-[-1deg]">
            craftsmanship &amp; precision
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
          An engineer who ships his receipts.
        </h2>

        <div className="mt-6 space-y-4 max-w-2xl text-base leading-relaxed text-ink2 font-sans">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Illustrated Fact Wall */}
        <div className="mt-8 max-w-2xl bg-paper rounded-2xl border-2 border-ink p-6 shadow-xs">
          <h4 className="text-xs font-bold text-accent uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent" />
            Verified Academic &amp; Technical Background
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {ABOUT_FACTS.map((f) => (
              <div key={f.label} className="p-3 bg-paper2/70 rounded-xl border border-ink3/30">
                <span className="text-[10.5px] font-mono font-bold text-ink3 uppercase tracking-wider block">
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
