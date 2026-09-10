import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/**
 * El título va encima del contenido, no en un rail lateral: con títulos
 * de una palabra aquella columna dejaba casi 200px vacíos a la
 * izquierda en escritorio.
 *
 * La altura es 100svh menos el navbar, y el ancla lleva el mismo
 * desplazamiento, así que al llegar desde el menú la sección encaja
 * justo bajo la barra y su contenido queda centrado en lo visible.
 */
const Section = ({ id, title, lead, band = false, children }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex min-h-[calc(100svh-4rem)] items-center ${
        band ? 'border-y border-line bg-surface/50' : ''
      }`}
    >
      {/* Relleno asimétrico a propósito: arriba ya están los 64px del
          navbar, así que la sección solo necesita un margen mínimo. El
          aire de las secciones cortas lo da min-h con el centrado, no
          el relleno; usarlo para eso desperdiciaba altura justo en las
          secciones que no caben. */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(1.25rem,3vh,2.25rem)] sm:px-8">
        <header className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h2>
          <div className="mt-3 h-px w-24 overflow-hidden bg-line">
            <motion.div
              style={{ scaleX: fill }}
              className="h-full w-full origin-left bg-gradient-to-r from-multimedia to-sistemas"
            />
          </div>
        </header>

        {lead && <p className="mb-8 max-w-prose text-lg leading-relaxed text-muted">{lead}</p>}

        {children}
      </div>
    </section>
  );
};

export default Section;