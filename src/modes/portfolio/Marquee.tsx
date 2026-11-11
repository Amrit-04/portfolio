import React from 'react';
import { MARQUEE_ITEMS } from '../../data/site';

export const Marquee: React.FC = () => {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.22em] px-6">{item}</span>
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-red shrink-0" aria-hidden="true">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="border-y-[1.5px] border-ink bg-paper2 py-4 overflow-hidden" data-testid="metrics-marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};
