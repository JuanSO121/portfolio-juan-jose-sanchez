import { motion, useReducedMotion } from 'framer-motion';

const ORBIT = 37; // % desde el centro
const SIZE_ACTIVE = 40;
const SIZE_IDLE = 21;
const MOVE = { type: 'spring', stiffness: 130, damping: 22, mass: 0.9 };

const STARS = [
  { x: 12, y: 20 },
  { x: 87, y: 28 },
  { x: 20, y: 84 },
  { x: 78, y: 86 },
  { x: 52, y: 5 },
  { x: 5, y: 54 },
];

/**
 * Cada proyecto es un único elemento que nunca se desmonta: al cambiar
 * de selección solo anima su posición y su tamaño hasta el centro o
 * hasta su órbita.
 *
 * La versión anterior compartía layoutId entre la burbuja de órbita y
 * el núcleo, lo que provocaba cuatro montajes y desmontajes en el mismo
 * fotograma; framer-motion emparejaba mal y el logo del centro salía
 * vacío o cambiado.
 */
const ProjectSystem = ({ projects, active, onSelect, logos }) => {
  const reduce = useReducedMotion();
  const n = projects.length;
  const current = projects[active];

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[340px]"
      role="radiogroup"
      aria-label="Seleccionar proyecto"
    >
      {STARS.map((s, i) => (
        <motion.span
          key={`${s.x}-${s.y}`}
          aria-hidden="true"
          className="absolute h-[3px] w-[3px] rounded-full bg-faint"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={reduce ? {} : { opacity: [0.2, 0.85, 0.2] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* El aro punteado gira; los nodos ya no cuelgan de él, así que
          girar aquí no arrastra nada. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[13%] rounded-full border border-dashed border-line opacity-70"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-[26%] rounded-full blur-xl"
        animate={{
          background: `radial-gradient(circle, rgb(${current.accent} / 0.3), transparent 70%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-[30%] rounded-full border"
          style={{ borderColor: `rgb(${current.accent})` }}
          animate={{ scale: [1, 1.4], opacity: [0.45, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {projects.map((p, i) => {
        const selected = i === active;
        const a = ((i * (360 / n) - 90) * Math.PI) / 180;
        const left = selected ? 50 : 50 + ORBIT * Math.cos(a);
        const top = selected ? 50 : 50 + ORBIT * Math.sin(a);
        const size = selected ? SIZE_ACTIVE : SIZE_IDLE;

        return (
          <motion.div
            key={p.title}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{ left: `${left}%`, top: `${top}%`, width: `${size}%` }}
            transition={reduce ? { duration: 0 } : MOVE}
            style={{ zIndex: selected ? 2 : 1 }}
          >
            <motion.button
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={p.title}
              onClick={() => onSelect(i)}
              whileHover={selected ? {} : { scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                borderColor: selected ? `rgb(${p.accent})` : 'rgb(var(--line))',
                opacity: selected ? 1 : 0.6,
                borderWidth: selected ? 2 : 1,
              }}
              transition={{ duration: 0.35 }}
              className="flex aspect-square w-full items-center justify-center rounded-full border bg-surface hover:opacity-100"
            >
              {logos[p.folder] ? (
                <img src={logos[p.folder]} alt="" className="h-full w-full object-contain p-[20%]" />
              ) : (
                <motion.span
                  className="font-display font-bold"
                  animate={{
                    fontSize: selected ? '2.25rem' : '1.05rem',
                    color: selected ? `rgb(${p.accent})` : 'rgb(var(--faint))',
                  }}
                  transition={{ duration: 0.35 }}
                >
                  {p.title.charAt(0)}
                </motion.span>
              )}
            </motion.button>

            <motion.span
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] text-faint sm:text-xs"
              animate={{ opacity: selected ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              {p.title}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectSystem;