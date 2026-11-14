// Squigglevision engine inspired by Tiago Fragoso
// Cycles .squiggle-target elements through boiling displacement filters at ~7fps.

export function initSquigglevision(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  let frame = 0;
  const interval = setInterval(() => {
    frame = (frame + 1) % 3;
    const targets = document.querySelectorAll<HTMLElement>('.squiggle-target');
    targets.forEach((el, idx) => {
      const f = (frame + idx) % 3;
      el.style.filter = `url(#squiggle-${f})`;
    });
  }, 1000 / 7);

  return () => clearInterval(interval);
}
