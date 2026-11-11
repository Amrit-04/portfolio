import React from 'react';
import { MARQUEE_ITEMS } from '../../data/site';

export const Marquee: React.FC = () => {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center py-1" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="font-sans text-xs md:text-sm font-semibold tracking-wide text-ink px-6">
            {item}
          </span>
          {/* Hand-drawn organic asterisk/star separator */}
          <svg viewBox="0 0 14 14" className="w-3 h-3 text-accent shrink-0 opacity-80" aria-hidden="true">
            <path
              d="M7 1 L7 13 M1 7 L13 7 M2.8 2.8 L11.2 11.2 M2.8 11.2 L11.2 2.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="border-y border-ink3/30 bg-paper2/80 py-3 overflow-hidden shadow-sm"
      data-testid="metrics-marquee"
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};
