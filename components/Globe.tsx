type GlobeProps = {
  className?: string;
};

const CX = 200;
const CY = 190;
const R = 150;

/** Parallels drawn as styled ellipses: [rx, ry, cy] */
const PARALLELS: [number, number, number][] = [
  [150, 34, 190],
  [130, 28, 126],
  [130, 28, 254],
  [75, 16, 72],
  [75, 16, 308],
];

/** Meridian half-widths for the vertical ellipses */
const MERIDIANS = [48, 96, 140];

function parallelDots(rx: number, ry: number, cy: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const theta = (i / (count - 1)) * Math.PI; // lower (front) arc
    const depth = Math.sin(theta);
    return {
      x: CX + rx * Math.cos(theta),
      y: cy + ry * Math.sin(theta),
      opacity: 0.18 + depth * 0.5,
    };
  });
}

function meridianDots(rx: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const theta = -Math.PI / 2 + (i / (count - 1)) * Math.PI; // right (front) half
    const depth = Math.cos(theta);
    return {
      x: CX + rx * Math.cos(theta),
      y: CY + R * Math.sin(theta),
      opacity: 0.14 + depth * 0.45,
    };
  });
}

/**
 * Vector "world" — a dotted wireframe globe with Corps hubs, route arcs and
 * gentle SMIL motion (paused for users who prefer reduced motion).
 */
export default function Globe({ className = "" }: GlobeProps) {
  const dots = [
    ...PARALLELS.flatMap(([rx, ry, cy]) => parallelDots(rx, ry, cy, 26)),
    ...MERIDIANS.flatMap((rx) => meridianDots(rx, 22)),
  ];

  const arcUSA = "M118 152 Q175 128 238 232";
  const arcFellowship = "M238 232 Q285 200 305 128";

  return (
    <svg
      viewBox="0 0 440 400"
      fill="none"
      className={className}
      role="img"
      aria-label="Stylised globe showing IPPSCC presence: Corps headquarters in the USA, IPPSCC Nigeria, and a growing international fellowship"
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#16305C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#071120" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="globeArc" x1="118" y1="232" x2="238" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C6A15B" />
          <stop offset="100%" stopColor="#B02A37" />
        </linearGradient>
      </defs>

      <circle cx={CX} cy={CY} r={R + 18} fill="url(#globeGlow)" />
      <circle cx={CX} cy={CY} r={R} stroke="#C6A15B" strokeOpacity="0.5" strokeWidth="1.25" />
      <circle cx={CX} cy={CY} r={R + 18} stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 7" />

      {/* Graticule */}
      {PARALLELS.map(([rx, ry, cy], i) => (
        <ellipse key={`p-${i}`} cx={CX} cy={cy} rx={rx} ry={ry} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1" />
      ))}
      {MERIDIANS.map((rx) => (
        <ellipse key={`m-${rx}`} cx={CX} cy={CY} rx={rx} ry={R} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1" />
      ))}
      <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1" />

      {/* Dotted texture */}
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r="2" fill="#C6A15B" opacity={dot.opacity} />
      ))}

      {/* Route arcs */}
      <path d={arcUSA} stroke="url(#globeArc)" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d={arcFellowship} stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 5" />

      {/* Travelling pulses */}
      <g className="globe-motion">
        <circle r="3.5" fill="#E6CF9A">
          <animateMotion dur="5s" repeatCount="indefinite" path={arcUSA} />
        </circle>
        <circle r="2.5" fill="#FFFFFF" opacity="0.8">
          <animateMotion dur="8s" repeatCount="indefinite" path={arcFellowship} />
        </circle>
      </g>

      {/* Hub: USA */}
      <circle cx="118" cy="152" r="5.5" fill="#C6A15B" />
      <circle cx="118" cy="152" r="5.5" stroke="#C6A15B" strokeWidth="1.5" className="globe-motion">
        <animate attributeName="r" values="6;22" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2.8s" repeatCount="indefinite" />
      </circle>
      {/* Hub: Nigeria */}
      <circle cx="238" cy="232" r="5.5" fill="#B02A37" stroke="#E6CF9A" strokeWidth="1.5" />
      <circle cx="238" cy="232" r="5.5" stroke="#D04552" strokeWidth="1.5" className="globe-motion">
        <animate attributeName="r" values="6;22" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
      </circle>
      {/* Hub: growing fellowship */}
      <circle cx="305" cy="128" r="4" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Labels */}
      <g fontFamily="monospace" fontSize="10.5" letterSpacing="2">
        <text x="118" y="132" textAnchor="middle" fill="#E6CF9A">
          CORPS HQ — USA
        </text>
        <text x="238" y="264" textAnchor="middle" fill="#E6CF9A">
          IPPSCC NIGERIA
        </text>
        <text x="305" y="108" textAnchor="middle" fill="#FFFFFF" opacity="0.65">
          FELLOWSHIP GROWING
        </text>
      </g>
    </svg>
  );
}
