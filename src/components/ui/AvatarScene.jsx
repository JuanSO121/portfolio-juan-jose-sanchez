import { motion, useReducedMotion } from 'framer-motion';

const ORBIT_DOTS = [
  { angle: -35, color: 'var(--sistemas)', r: 5 },
  { angle: 55, color: 'var(--multimedia)', r: 4 },
  { angle: 160, color: 'var(--sistemas)', r: 3.5 },
];

const onRing = (angle, radius) => ({
  x: 200 + radius * Math.cos((angle * Math.PI) / 180),
  y: 200 + radius * Math.sin((angle * Math.PI) / 180),
});

/**
 * Escena para el retrato recortado. El halo y los anillos hacen de
 * marco sin encerrarlo: la figura sobresale por abajo, que es lo que
 * separa un recorte de una foto metida en una caja.
 */
const AvatarScene = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[340px] md:max-w-[480px]">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full scale-125"
      >
        <defs>
          <radialGradient id="aura" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgb(var(--multimedia))" stopOpacity="0.32" />
            <stop offset="60%" stopColor="rgb(var(--sistemas))" stopOpacity="0.16" />
            <stop offset="100%" stopColor="rgb(var(--sistemas))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="195" r="150" fill="url(#aura)" />
        <circle
          cx="200"
          cy="200"
          r="152"
          fill="none"
          stroke="rgb(var(--line))"
          strokeWidth="1"
        />

        <motion.g
          style={{ transformOrigin: '200px 200px' }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="200"
            cy="200"
            r="178"
            fill="none"
            stroke="rgb(var(--line))"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
          {ORBIT_DOTS.map((d) => {
            const { x, y } = onRing(d.angle, 178);
            return (
              <circle key={d.angle} cx={x} cy={y} r={d.r} fill={`rgb(${d.color})`} opacity="0.9" />
            );
          })}
        </motion.g>
      </svg>

      <img
        src="/profile.png"
        alt="Juan José Sánchez Ocampo"
        width="720"
        height="720"
        fetchPriority="high"
        className="relative w-full"
      />
    </div>
  );
};

export default AvatarScene;