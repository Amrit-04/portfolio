import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_FACTS, ABOUT_PARAGRAPHS, SITE } from '../../data/site';
import { AvatarSketch } from '../../components/illustrations';

export const About: React.FC = () => (
  <section id="about" className="relative py-24 md:py-32 border-t-[1.5px] border-ink bg-paper2/40">
    <div className="max-w-page mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <motion.div
        className="lg:col-span-4 relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tape tape-blue bg-paper frame p-6 pb-10 inline-block w-full max-w-[320px] mx-auto block">
          <AvatarSketch className="w-full text-ink" />
        </div>
        <p className="annotation text-lg text-ink3 mt-4 text-center -rotate-2">self-portrait, ink only</p>
        <div className="hidden lg:block absolute -right-8 top-6 rotate-6">
          <span className="annotation text-xl text-red">glasses: required</span>
        </div>
        <div className="hidden lg:block absolute -left-6 bottom-16 -rotate-3">
          <span className="annotation text-xl text-red">runs on coffee</span>
        </div>
      </motion.div>

      <motion.div
        className="lg:col-span-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="label-mono text-red mb-3">02 — About</p>
        <h2 className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-tight">
          An engineer who ships his receipts.
        </h2>
        <div className="mt-8 space-y-5 max-w-2xl text-base leading-relaxed text-ink2">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <dl className="mt-10 max-w-2xl border-t-[1.5px] border-ink">
          {ABOUT_FACTS.map((f) => (
            <div key={f.label} className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] gap-4 py-3 border-b border-ink/25 items-baseline">
              <dt className="label-mono text-ink3">{f.label}</dt>
              <dd className="font-mono text-[13px]">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="annotation text-xl mt-6 text-ink3">{SITE.roles}</p>
      </motion.div>
    </div>
  </section>
);
