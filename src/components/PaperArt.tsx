import type { CSSProperties } from "react";

/** Original ink geometry. No reference image, lettering or path is embedded. */
export function InkFilters() {
  return (
    <svg width="0" height="0" className="ink-defs" aria-hidden="true">
      <defs>
        {[5, 27, 51].map((seed, i) => (
          <filter
            key={seed}
            id={`paper-boil-${i}`}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.013"
              numOctaves="2"
              seed={seed}
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
export function InkFrame({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  const p = (x: number, y: number, i: number) =>
    `${(x + Math.sin(i * 0.83 + variant) * 0.75).toFixed(2)},${(y + Math.cos(i * 0.97 + variant) * 0.65).toFixed(2)}`;
  const points = [
    ...Array.from({ length: 17 }, (_, i) => p(10 + i * 17.5, 10, i)),
    ...Array.from({ length: 17 }, (_, i) => p(290, 10 + i * 17.5, i + 17)),
    ...Array.from({ length: 17 }, (_, i) => p(290 - i * 17.5, 290, i + 34)),
    ...Array.from({ length: 17 }, (_, i) => p(10, 290 - i * 17.5, i + 51)),
  ];
  return (
    <svg
      className={`ink-frame ${className}`}
      viewBox="0 0 300 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={[...points, points[0]].join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <polyline
        points={[...points, points[0]].join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth=".55"
        opacity=".4"
        transform="translate(.8 -.5)"
      />
    </svg>
  );
}
export function InkArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 53C43 55 75 44 99 17M87 20l14-8-3 17" />
      <path d="M12 55C49 57 74 43 100 15" opacity=".45" />
    </svg>
  );
}
export function InkClose() {
  return (
    <svg viewBox="0 0 54 54" aria-hidden="true">
      <path
        d="M7 7L47 5 49 46 9 49ZM18 17l20 20M37 17L19 37"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}
export function ProjectDrawing({ kind = 0 }: { kind?: number }) {
  return (
    <svg
      viewBox="0 0 400 360"
      className="project-drawing"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      {kind === 0 ? (
        <>
          <path d="M200 63L107 155M200 63l92 91M107 155l-57 110M107 155l56 110M292 154l-57 111M292 154l58 112" />
          {[
            [200, 63],
            [107, 155],
            [292, 154],
            [50, 265],
            [163, 265],
            [235, 265],
            [350, 265],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={i < 3 ? 26 : 19} />
              <circle cx={x + 1} cy={y - 1} r={i < 3 ? 28 : 21} opacity=".25" />
            </g>
          ))}
          <path d="M24 327q170-35 353-5M170 65h60M88 151h38" />
        </>
      ) : kind === 1 ? (
        <>
          <path d="M26 84H370M26 148H370M26 212H370M26 276H370" opacity=".25" />
          {[40, 86, 129, 175, 219, 278].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y={42 + i * 29}
                width={90 - i * 7}
                height="22"
                fill="currentColor"
                opacity={0.28 + i * 0.1}
              />
              <path
                d={`M${x + 8} ${64 + i * 29}v29h35`}
                strokeDasharray="3 5"
              />
            </g>
          ))}
          <path d="M26 32v296h350" />
        </>
      ) : kind === 2 ? (
        <>
          <path d="M40 84h73v81H40zM162 84h74v81h-74zM286 84h73v81h-73zM113 124h49M236 124h50M55 224h290v74H55zM322 165v34H88v25" />
          {[76, 199, 322].map((x) => (
            <circle key={x} cx={x} cy="125" r="19" />
          ))}
          <path d="m148 114 14 10-14 10M272 114l14 10-14 10M101 249h204M101 271h160" />
        </>
      ) : kind === 3 ? (
        <>
          <path d="M20 179h51m74 0h52m74 0h95M235 209v68H108v-68" />
          {[108, 234].map((x) => (
            <g key={x}>
              <circle cx={x} cy="180" r="36" />
              <circle cx={x} cy="180" r="30" opacity=".4" />
            </g>
          ))}
          <path d="m354 168 14 11-14 11M213 88h42m-21-21v42M62 317q141-38 284 0" />
        </>
      ) : kind === 4 ? (
        <>
          <path d="M32 28v296h346" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              opacity={0.15 + i * 0.055}
              d={`M32 191${Array.from({ length: 15 }, (_, j) => `L${54 + j * 22} ${Math.max(38, Math.min(307, 190 + Math.sin(j * 0.7 + i * 1.6) * (j * 5 + 8) + i * 3 - j * i))}`).join("")}`}
            />
          ))}
          <path d="M267 36v289" strokeDasharray="5 8" />
        </>
      ) : kind === 5 ? (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M40 ${38 + i * 43}H355M${40 + i * 45} 38V309`}
              opacity=".3"
            />
          ))}
          {[
            [85, 80],
            [85, 123],
            [175, 123],
            [220, 209],
            [130, 209],
            [310, 80],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="42"
              height="40"
              fill="currentColor"
              opacity=".4"
            />
          ))}
          <path d="M61 287V61h178v86h92v139H150" strokeWidth="5" />
          <circle cx="61" cy="287" r="8" fill="currentColor" />
          <path d="m163 275-15 11 15 11" />
        </>
      ) : (
        <>
          <path d="M22 35h355v285H22zM66 78h83v166H66zM237 71h91v176h-91z" />
          <path d="m35 280 134-87 185 41-56 64z" strokeDasharray="7 5" />
          {[109, 282].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={108 + i * 9} r="17" />
              <path
                d={`M${x} ${126 + i * 9}v69m0-51-30 31m30-31 25 24m-25 27-23 42m23-42 23 42`}
              />
              <circle cx={x} cy="245" r="4" fill="currentColor" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
export const paperStyle = (
  x: number,
  y: number,
  w: number,
  r: number,
): CSSProperties => ({
  left: `${x * 100}%`,
  top: `${y * 100}cqw`,
  width: `${w * 100}%`,
  transform: `rotate(${r}deg)`,
});
