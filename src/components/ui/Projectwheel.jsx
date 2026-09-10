import { motion, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RADIUS = 32; // % desde el centro del contenedor
const SPIN = { type: 'spring', stiffness: 110, damping: 20, mass: 0.8 };

/**
 * Selector radial. Los nodos ocupan posiciones fijas en el aro; lo que
 * gira es el aro completo, de modo que el proyecto activo siempre
 * termina arriba. El contenido de cada nodo gira en sentido contrario
 * con la misma curva, así los logos y los nombres nunca se ven
 * inclinados.
 */
const ProjectWheel = ({ projects, active, onSelect, logos }) => {
  const reduce = useReducedMotion();
  const n = projects.length;
  const step = 360 / n;
  const ringAngle = reduce ? 0 : -active * step;

  const go = (delta) => onSelect((active + delta + n) % n);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div
        className="relative aspect-square"
        role="radiogroup"
        aria-label="Seleccionar proyecto"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1);
        }}
      >
        <div className="absolute inset-[18%] rounded-full border border-dashed border-line" />
        <div className="absolute inset-[30%] rounded-full border border-line" />

        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[13%] h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px]"
          style={{ background: `rgb(${projects[active].accent})` }}
        />

        <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full bg-surface p-4 text-center">
          <span className="text-xs tabular-nums text-faint">
            {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <span className="mt-1 font-display text-base font-bold leading-tight text-ink">
            {projects[active].title}
          </span>
        </div>

        <motion.div
          className="absolute inset-0"
          animate={{ rotate: ringAngle }}
          transition={reduce ? { duration: 0 } : SPIN}
        >
          {projects.map((p, i) => {
            const a = ((i * step - 90) * Math.PI) / 180;
            const left = 50 + RADIUS * Math.cos(a);
            const top = 50 + RADIUS * Math.sin(a);
            const selected = i === active;

            return (
              <div
                key={p.title}
                className="absolute w-[104px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <motion.div
                  animate={{ rotate: -ringAngle }}
                  transition={reduce ? { duration: 0 } : SPIN}
                  className="flex flex-col items-center"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onSelect(i)}
                    className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border bg-surface transition-colors"
                    style={{
                      borderColor: selected ? `rgb(${p.accent})` : 'rgb(var(--line))',
                      boxShadow: selected ? `0 0 0 4px rgb(${p.accent} / 0.16)` : 'none',
                    }}
                  >
                    {logos[p.folder] ? (
                      <img
                        src={logos[p.folder]}
                        alt=""
                        className="h-full w-full object-contain p-3.5"
                        style={{ opacity: selected ? 1 : 0.55 }}
                      />
                    ) : (
                      <span
                        className="font-display text-2xl font-bold"
                        style={{
                          color: selected ? `rgb(${p.accent})` : 'rgb(var(--faint))',
                        }}
                      >
                        {p.title.charAt(0)}
                      </span>
                    )}
                  </button>

                  <span
                    className="mt-2 text-center text-xs leading-tight transition-colors"
                    style={{ color: selected ? 'rgb(var(--ink))' : 'rgb(var(--faint))' }}
                  >
                    {p.title}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Proyecto anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-multimedia hover:text-multimedia"
        >
          <FaChevronLeft size={12} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Proyecto siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-multimedia hover:text-multimedia"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default ProjectWheel;