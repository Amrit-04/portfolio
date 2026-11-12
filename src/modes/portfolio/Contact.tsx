import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { Mail, FileText, Bike, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

export const Contact: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="contact" className="relative py-24 md:py-32 px-5 md:px-10">
    <div className="max-w-5xl mx-auto">
      {/* Hand-drawn postcard / studio stationery */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="postcard p-8 md:p-14 bg-paper rounded-3xl border-2 border-ink3/30 shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="sticker text-xs text-accent bg-paper2">
                <Sparkles className="w-3 h-3 text-accent mr-1" />
                The Final Studio Wall
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.0] font-normal tracking-tight text-ink">
              Let&rsquo;s build something <em className="italic text-accent font-medium">measurable</em>.
            </h2>
          </div>

          {/* Hand-drawn Postal Stamp Doodle */}
          <div className="w-20 h-24 border-2 border-dashed border-accent/60 rounded-lg p-2 flex flex-col items-center justify-between text-center bg-paper2/50 rotate-3 shrink-0">
            <span className="text-[9px] font-mono font-bold text-accent">SRM &apos;26</span>
            <Bike className="w-6 h-6 text-accent my-auto" />
            <span className="text-[8px] font-sans text-ink3">AIR MAIL</span>
          </div>
        </div>

        <p className="max-w-xl text-base md:text-lg text-ink2 font-sans leading-relaxed">
          {SITE.openTo}
        </p>

        <p className="mt-4 text-sm text-ink3 font-sans">
          Whether discussing learned query optimizers, low-latency order routing, or quantitative risk infrastructure — my inbox is always open.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={SITE.links.email}
            className="btn-ink text-xs flex items-center gap-2"
            data-testid="contact-email"
          >
            <Mail className="w-4 h-4" /> Send Email
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-xs flex items-center gap-2"
            data-testid="contact-github"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-xs flex items-center gap-2"
            data-testid="contact-linkedin"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
            download="Amriteshkumar_Yadav_Resume.pdf"
            className="btn-outline text-xs flex items-center gap-2"
            title="Download verified resume"
            data-testid="resume-btn"
          >
            <FileText className="w-4 h-4" /> Download Resume
          </a>
        </div>

        {/* Scenic Route Track Action */}
        <div className="mt-12 pt-6 border-t border-ink3/20">
          <button
            onClick={onEnterTrack}
            className="group inline-flex items-center gap-3 text-left cursor-pointer"
            data-testid="contact-enter-track"
          >
            <div className="w-10 h-10 rounded-full bg-paper2 flex items-center justify-center text-accent border border-accent/40 group-hover:scale-110 transition-transform">
              <Bike className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold text-ink group-hover:text-accent transition-colors block">
                Take the scenic route — ride the track to each project
              </span>
              <span className="text-xs text-ink3 font-sans block">
                120Hz Verlet bicycle physics · 8 themed sections · checkpoints with live sandboxes
              </span>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);
