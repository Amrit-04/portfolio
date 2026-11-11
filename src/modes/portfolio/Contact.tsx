import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { Mail, FileText, Bike } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

export const Contact: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="contact" className="relative py-24 md:py-32 border-t-[1.5px] border-ink grid-bg">
    <div className="max-w-page mx-auto px-5 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="label-mono text-red mb-3">05 — Contact</p>
        <h2 className="font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.95] tracking-tight max-w-4xl">
          Let&rsquo;s build something <em className="italic text-red">measurable</em>.
        </h2>
        <p className="mt-6 max-w-xl text-ink2 leading-relaxed">{SITE.openTo}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={SITE.links.github} target="_blank" rel="noreferrer" className="btn-ink" data-testid="contact-github">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="btn-outline" data-testid="contact-linkedin">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href={SITE.links.email} className="btn-outline" data-testid="contact-email">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a
            href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
            download="Amriteshkumar_Yadav_Resume.pdf"
            className="btn-outline"
            title="Download verified resume"
            data-testid="resume-btn"
          >
            <FileText className="w-4 h-4" /> Resume
          </a>
        </div>

        <button onClick={onEnterTrack} className="mt-14 group inline-flex items-center gap-3 text-left" data-testid="contact-enter-track">
          <Bike className="w-5 h-5 text-red group-hover:translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] border-b-2 border-red pb-1 group-hover:text-red transition-colors">
            Or take the scenic route — ride the track to each project
          </span>
        </button>
      </motion.div>
    </div>
  </section>
);
