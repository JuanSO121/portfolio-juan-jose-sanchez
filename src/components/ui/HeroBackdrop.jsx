import { motion, useReducedMotion } from 'framer-motion';

const ROUTE =
  'M-40 300 L40 300 Q70 300 70 270 L70 200 Q70 170 100 170 L250 170 Q280 170 280 140 L280 70 Q280 40 310 40 L480 40 Q510 40 510 70 L510 210 Q510 240 540 240 L780 240';

const NODES = [
  { x: 70, y: 200 },
  { x: 280, y: 140 },
  { x: 310, y: 40 },
  { x: 510, y: 210 },
];

/**
 * La máscara va en el div contenedor, no dentro del SVG. Con
 * preserveAspectRatio="slice" el lienzo se amplía hasta desbordar, así
 * que una máscara interna queda fuera del área visible y no recorta
 * nada. En CSS se aplica sobre lo que realmente se ve.
 */
const HeroBackdrop = () => {
  const reduce = useReducedMotion();

  const fade =
    'radial-gradient(85% 70% at 72% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 72%)';

  return (
    <>
      {/* El degradado de abajo va del color de página a transparente, no
          de negro a nada: así no queda resto de opacidad en el borde y
          el rectángulo del contenedor deja de verse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-bg to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-40 bg-gradient-to-r from-bg to-transparent md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-60 md:w-[70%]"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        <svg
          viewBox="0 0 740 360"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgb(var(--faint))" opacity="0.22" />
          </pattern>
          <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--multimedia))" />
            <stop offset="100%" stopColor="rgb(var(--sistemas))" />
          </linearGradient>
        </defs>

        <rect width="740" height="360" fill="url(#dots)" />

        <path d={ROUTE} fill="none" stroke="rgb(var(--line))" strokeWidth="1.5" />

        <motion.path
          d={ROUTE}
          fill="none"
          stroke="url(#routeStroke)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.85"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />

        {NODES.map((n, i) => (
          <motion.circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r="3.5"
            fill="rgb(var(--bg))"
            stroke="rgb(var(--sistemas))"
            strokeWidth="1.5"
            initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.35, type: 'spring', stiffness: 320, damping: 18 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}

        {!reduce && (
          <circle r="3.5" fill="rgb(var(--multimedia))">
            <animateMotion dur="9s" begin="2.6s" repeatCount="indefinite" path={ROUTE} />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.06;0.94;1"
              dur="9s"
              begin="2.6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        </svg>
      </div>
    </>
  );
};

export default HeroBackdrop;