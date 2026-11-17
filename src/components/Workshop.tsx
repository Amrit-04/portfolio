import { useId } from "react";

/** Original engineering still life. Every link is also keyboard reachable. */
export function Workshop({
  ride,
  project,
}: {
  ride: () => void;
  project: (id: string) => void;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="workshop-art"
      viewBox="0 0 1200 410"
      role="group"
      aria-label="Interactive illustrated workshop: laptop, notebook, camera, servers, books and bicycle"
    >
      <defs>
        <pattern
          id={`${id}-hatch`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 8L8 0"
            stroke="#2a2520"
            strokeOpacity=".16"
            strokeWidth="1"
          />
        </pattern>
        <pattern
          id={`${id}-grid`}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M22 0H0V22"
            fill="none"
            stroke="#3a6ea5"
            strokeOpacity=".17"
          />
        </pattern>
      </defs>
      <g
        fill="none"
        stroke="#2a2520"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 364Q302 357 589 363T1184 361M24 369L1170 370" />
        <path d="M76 17L77 348M1112 14L1115 344" strokeOpacity=".18" />
        <path d="M37 332L1092 334 1150 363M82 360L47 335" strokeOpacity=".18" />
        {/* Pegboard and hanging hand tools */}
        <path d="M389 30L744 25 749 145 394 149Z" fill="#f0ece3" />
        {Array.from({ length: 8 }, (_, i) =>
          Array.from({ length: 3 }, (_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={410 + i * 44}
              cy={47 + j * 36}
              r="1.4"
              fill="#8a8478"
              stroke="none"
            />
          )),
        )}
        <path
          d="M437 46L437 109M426 108L445 108M435 111L436 130"
          strokeWidth="6"
        />
        <path
          d="M468 51L491 51 491 62 485 64 485 119 477 119 477 64 468 61Z"
          fill="#c84b31"
        />
        <path
          d="M531 48L546 49 552 73 549 80 549 122 537 122 537 80 529 70Z"
          fill="#f7f6f1"
        />
        <path d="M589 48L611 49 612 89 602 86 592 93Z" fill="#d4a843" />
        <path d="M639 45Q622 79 649 107L660 106Q679 74 659 45M649 105L650 129" />
        <path
          d="M691 48L691 126 728 125 726 114 703 113 703 48Z"
          fill="#3a6ea5"
        />
        <text x="543" y="17" className="svg-note" stroke="none" fill="#4a4540">
          a few tools. many questions.
        </text>
        {/* Books and shelf */}
        <a
          href="#notebook"
          aria-label="Bookshelf: explore learning notebook — the rabbit-hole shelf ↗"
          className="art-link"
        >
          <path
            d="M91 60L300 58 302 142 94 146Z"
            fill="#f7f6f1"
            strokeOpacity=".4"
          />
          <path d="M104 73L128 72 130 132 106 133Z" fill="#c84b31" />
          <path d="M134 67L160 68 159 133 136 133Z" fill="#f0ece3" />
          <path d="M167 76L190 73 199 132 173 135Z" fill="#3a6ea5" />
          <path d="M208 71L222 73 217 134 202 133Z" fill="#d4a843" />
          <path d="M230 87L254 78 276 131 248 135Z" fill="#f0ece3" />
          <path d="M91 138L303 136 303 145 91 149Z" fill="#2a2520" />
          <path
            d="M116 84L117 117M146 82L147 119M181 87L187 117M244 91L256 119"
            stroke="#f7f6f1"
            strokeWidth="2"
          />
          <text
            x="107"
            y="168"
            className="svg-note"
            fill="#4a4540"
            stroke="none"
          >
            the rabbit-hole shelf ↗
          </text>
        </a>
        {/* Workbench */}
        <path d="M172 264L836 260 859 279 155 284Z" fill="#e5d8bb" />
        <path
          d="M155 284L858 279 858 291 154 297Z"
          fill={`url(#${id}-hatch)`}
        />
        <path
          d="M181 297L174 360 190 360 200 296M812 293L826 361 840 361 831 291"
          fill="#f0ece3"
        />
        <path d="M196 325L818 322M202 335L819 332" strokeWidth="3" />
        {/* Laptop */}
        <a
          href="#work"
          aria-label="Laptop: explore project exhibition — open something up."
          className="art-link"
        >
          <path
            d="M316 156Q408 150 499 154L510 257 309 259Z"
            fill="#f7f6f1"
            strokeWidth="3"
          />
          <path d="M328 167L488 166 494 244 322 247Z" fill="#2a2520" />
          <path
            d="M347 190L362 200 348 210M375 214L401 214"
            stroke="#d4a843"
            strokeWidth="3"
          />
          <path d="M348 231L423 231M431 230L462 230" stroke="#83a48c" />
          <path d="M309 259L510 257 535 273 285 276Z" fill="#f0ece3" />
          <path
            d="M322 263L488 262M333 268L468 267M381 271L430 270"
            strokeWidth="1"
          />
          <circle cx="408" cy="161" r="1" />
          <text
            x="344"
            y="143"
            className="svg-note"
            fill="#3a6ea5"
            stroke="none"
          >
            open something up.
          </text>
        </a>
        {/* Lamp */}
        <path d="M566 264Q583 252 611 262L612 268 562 270Z" fill="#3a6ea5" />
        <path d="M586 257L558 203 609 148M595 257L568 204 617 153" />
        <circle cx="563" cy="204" r="6" fill="#f7f6f1" />
        <path d="M602 141Q625 132 637 157L625 174 596 150Z" fill="#3a6ea5" />
        <path
          d="M625 173L654 226 555 222 594 151"
          stroke="#d4a843"
          strokeDasharray="4 7"
          strokeOpacity=".5"
        />
        {/* Open notebook */}
        <a
          href="#about"
          aria-label="Notebook: about Amritesh"
          className="art-link"
        >
          <path
            d="M650 234Q682 224 711 236Q738 224 772 231L791 269Q747 263 715 276Q680 267 644 275Z"
            fill="#f7f6f1"
          />
          <path
            d="M711 236L715 271M660 243L695 242M662 250L698 250M667 258L700 260M727 242L763 239M728 250L771 247M731 259L776 255"
            strokeWidth="1.2"
          />
          <path d="M717 274L721 284 728 278" fill="#c84b31" stroke="#c84b31" />
        </a>
        {/* Coffee and Pi */}
        <path d="M230 235L268 234 266 268Q249 274 234 267Z" fill="#f7f6f1" />
        <path d="M270 240Q291 239 278 253L269 254M241 223Q252 215 243 207M257 224Q266 215 258 205" />
        <path d="M529 276L558 274 569 286 537 288Z" fill="#477a54" />
        <path d="M542 276L548 284M552 276L558 283" stroke="#d4a843" />
        {/* Camera */}
        <a
          href="#research"
          onClick={(e) => {
            e.preventDefault();
            project("workplace-safety-vision");
          }}
          aria-label="Camera: open workplace safety project — see differently"
          className="art-link"
        >
          <rect
            x="760"
            y="72"
            width="175"
            height="107"
            fill="transparent"
            stroke="none"
          />
          <path d="M809 94L860 92 880 108 839 117 808 108Z" fill="#f7f6f1" />
          <path d="M812 105L793 114 791 97 808 94M850 119L850 141 832 146" />
          <path
            d="M798 104L768 77M798 106L766 128"
            stroke="#c84b31"
            strokeDasharray="4 4"
          />
          <text
            x="817"
            y="171"
            className="svg-note"
            fill="#4a4540"
            stroke="none"
          >
            see differently
          </text>
        </a>
        {/* Rack */}
        <a
          href="#homelab"
          aria-label="Server rack: explore homelab — under the hood ↓"
          className="art-link"
        >
          <path d="M949 119L1054 116 1060 333 949 340Z" fill="#f0ece3" />
          <path
            d="M1054 116L1081 132 1085 323 1060 333Z"
            fill={`url(#${id}-hatch)`}
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path
                d={`M961 ${132 + i * 42}L1042 ${130 + i * 42} 1043 ${163 + i * 42} 961 ${164 + i * 42}Z`}
                fill="#2a2520"
              />
              <path
                d={`M974 ${143 + i * 42}L1008 ${142 + i * 42}M974 ${151 + i * 42}L1008 ${150 + i * 42}`}
                stroke="#8a8478"
                strokeWidth="1"
              />
              <circle
                cx="1030"
                cy={148 + i * 42}
                r="3"
                fill={i === 3 ? "#d4a843" : "#8dac94"}
                stroke="none"
              />
            </g>
          ))}
          <path d="M968 310L1041 307M977 323L1036 321M962 340L960 357 973 357 975 338M1040 335L1044 356 1057 355 1053 333" />
          <path d="M951 313Q901 315 922 351Q930 362 894 363" />
          <text
            x="949"
            y="99"
            className="svg-note"
            fill="#477a54"
            stroke="none"
          >
            under the hood ↓
          </text>
        </a>
        {/* Bicycle: visual counterpart to physical game bicycle */}
        <a
          href="#/ride"
          onClick={(e) => {
            e.preventDefault();
            ride();
          }}
          aria-label="Bicycle: ride the Engineering Trail — yes, you can ride it."
          className="art-link bike-art"
        >
          <rect
            x="23"
            y="180"
            width="215"
            height="170"
            fill="transparent"
            stroke="none"
          />
          <circle cx="66" cy="305" r="40" fill="#f7f6f1" strokeWidth="3" />
          <circle cx="195" cy="305" r="40" fill="#f7f6f1" strokeWidth="3" />
          {[66, 195].map((x) => (
            <g key={x} strokeOpacity=".38" strokeWidth="1">
              <path
                d={`M${x - 35} 305h70M${x} 270v70M${x - 24} 281l48 48M${x - 24} 329l48-48`}
              />
            </g>
          ))}
          <path
            d="M66 305L98 250 129 305 66 305 164 253 129 305M164 253L195 305M159 237L172 237 182 242M99 251L94 236"
            stroke="#c84b31"
            strokeWidth="5"
          />
          <path
            d="M82 237L106 236M155 238L164 254M128 305L142 317 151 317"
            strokeWidth="4"
          />
          <circle cx="129" cy="305" r="8" fill="#c84b31" />
          <path
            d="M127 213Q136 188 174 195M173 195L165 187M173 195L163 201"
            stroke="#c84b31"
          />
          <text
            x="78"
            y="197"
            className="svg-note"
            fill="#c84b31"
            stroke="none"
          >
            yes, you can ride it.
          </text>
        </a>
        <path
          d="M284 365L271 380M849 365L863 380M377 383L578 385"
          strokeOpacity=".35"
        />
        <text
          x="456"
          y="401"
          className="svg-label"
          fill="#4a4540"
          stroke="none"
        >
          FIG. 01 — A WORKSHOP FOR CURIOUS CODE
        </text>
      </g>
    </svg>
  );
}

export function OrbitSketch() {
  return (
    <svg viewBox="0 0 440 330" className="orbit-art" aria-hidden="true">
      <g fill="none" stroke="#2a2520" strokeWidth="2" strokeLinecap="round">
        <ellipse
          cx="220"
          cy="160"
          rx="180"
          ry="62"
          transform="rotate(-24 220 160)"
        />
        <ellipse
          cx="220"
          cy="160"
          rx="148"
          ry="110"
          transform="rotate(27 220 160)"
          strokeDasharray="4 6"
        />
        <circle cx="220" cy="160" r="51" fill="#e5d8bb" />
        <path
          d="M177 144q43-42 79-7M177 161q52-34 91-8M185 183q40-30 82-13M201 201q24-23 53-18"
          strokeOpacity=".4"
        />
        <circle cx="368" cy="100" r="16" fill="#3a6ea5" />
        <circle cx="84" cy="250" r="10" fill="#c84b31" />
        <path d="M53 66L106 81M64 54L104 81 67 89M309 243L318 286M313 269L350 256" />
        <text x="24" y="36" className="svg-note" stroke="none" fill="#2a2520">
          what's really going on in there?
        </text>
        <text x="189" y="317" className="svg-note" stroke="none" fill="#c84b31">
          follow the question.
        </text>
      </g>
    </svg>
  );
}
