import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '../../data/site';
import { getAssetUrl } from '../../lib/assets';
import { DispatchDeskContactArt } from '../../components/illustrations';
import { Mail, FileText, Bike, Sparkles, Send } from 'lucide-react';
import { Github, Linkedin } from '../../components/BrandIcons';

export const Contact: React.FC<{ onEnterTrack: () => void }> = ({ onEnterTrack }) => (
  <section id="contact" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10 max-w-6xl mx-auto">
    {/* Hand-drawn postcard / studio stationery */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
      className="p-6 sm:p-10 md:p-14 bg-paper rounded-3xl border-2 border-ink shadow-md relative overflow-hidden"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="sticker text-xs text-accent bg-paper2 border border-accent/40 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-accent mr-1 inline" />
              The Dispatch Desk
            </span>
            <span className="annotation text-ink3 text-sm rotate-[-1deg]">
              hand-stamped &amp; ready to send
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
            Let&rsquo;s build something <em className="italic text-accent font-medium">measurable</em>.
          </h2>

          <p className="mt-4 max-w-xl text-base sm:text-lg text-ink2 font-sans leading-relaxed">
            {SITE.openTo}
          </p>

          <p className="mt-3 text-sm text-ink3 font-sans leading-relaxed">
            Whether discussing learned query optimizers, low-latency order routing, or quantitative risk infrastructure — my inbox is always open.
          </p>
        </div>

        {/* Right side: Illustrated Writing Desk */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[360px] p-2 bg-paper2/50 rounded-xl border border-ink3/30">
            <DispatchDeskContactArt className="w-full h-auto text-ink" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t-2 border-ink/10">
        <a
          href={SITE.links.email}
          className="btn-ink text-xs flex items-center gap-2 cursor-pointer"
          data-testid="contact-email"
        >
          <Mail className="w-4 h-4 text-gold" /> Send Email
        </a>
        <a
          href={SITE.links.github}
          target="_blank"
          rel="noreferrer"
          className="btn-outline text-xs flex items-center gap-2 cursor-pointer"
          data-testid="contact-github"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a
          href={SITE.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn-outline text-xs flex items-center gap-2 cursor-pointer"
          data-testid="contact-linkedin"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a
          href={getAssetUrl('resumes/Amriteshkumar_Yadav_.pdf')}
          download="Amriteshkumar_Yadav_Resume.pdf"
          className="btn-outline text-xs flex items-center gap-2 cursor-pointer"
          title="Download verified resume"
          data-testid="contact-resume-btn"
        >
          <FileText className="w-4 h-4 text-blue" /> Download Resume
        </a>
      </div>

      {/* Scenic Route Track Action */}
      <div className="mt-10 pt-6 border-t border-ink3/20 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onEnterTrack}
          className="group inline-flex items-center gap-3 text-left cursor-pointer"
          data-testid="contact-enter-track"
        >
          <div className="w-10 h-10 rounded-full bg-paper2 flex items-center justify-center text-accent border border-accent/40 group-hover:scale-110 transition-transform">
            <Bike className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-ink group-hover:text-accent transition-colors block">
              Take the scenic route — ride the track through each project
            </span>
            <span className="text-xs text-ink3 font-sans block">
              Free Rider HD 2D physics bicycle mode with interactive checkpoints
            </span>
          </div>
        </button>

        <span className="annotation text-sm text-ink3">
          Made in India · SRM IST &apos;26
        </span>
      </div>
    </motion.div>
  </section>
);
