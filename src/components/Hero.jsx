import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import AvatarScene from './ui/AvatarScene';
import HeroBackdrop from './ui/HeroBackdrop';
import RevealText from './ui/RevealText';

const DATOS = ['Cali, Colombia', 'Disponible inmediatamente', 'Presencial, híbrido o remoto'];
const STACK = ['React', 'TypeScript', 'Java', 'Python'];

const Hero = () => {
  const reduce = useReducedMotion();

  // Posición del puntero, normalizada a -0.5..0.5 sobre la sección.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 22 });
  const sy = useSpring(py, { stiffness: 140, damping: 22 });

  const rotateY = useTransform(sx, [0, 1], [7, -7]);
  const rotateX = useTransform(sy, [0, 1], [-7, 7]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);

  const onPointerMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } } };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-[clamp(3rem,7vh,5rem)] pt-[calc(4rem+clamp(2rem,5vh,4rem))] sm:px-8"
    >
      <HeroBackdrop />

      {/* Foco que sigue al puntero. Solo aquí: es el saludo del sitio. */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(420px circle at var(--gx) var(--gy), rgb(var(--multimedia) / 0.09), transparent 65%)`,
            '--gx': glowX,
            '--gy': glowY,
          }}
        />
      )}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12">
        <motion.div variants={container} initial="hidden" animate="show">
          <RevealText
            text="Juan José Sánchez"
            delay={0.15}
            className="text-display-lg font-extrabold text-ink"
          />

          <motion.p
            variants={item}
            className="mt-5 max-w-prose text-xl leading-relaxed text-muted sm:text-2xl"
          >
            Desarrollador full stack con doble formación en Ingeniería de Sistemas e Ingeniería
            Multimedia. Construyo aplicaciones web y móviles centradas en la experiencia de quien
            las usa.
          </motion.p>

          {/* El stack sale de la frase y baja a fila propia: la frase se
              lee mejor y las palabras clave siguen arriba del pliegue,
              que es lo que cruza un reclutador contra la vacante. */}
          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-3 py-1 text-sm text-muted"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint"
          >
            {DATOS.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                {d}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary group"
            >
              Ver proyectos
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href="/Juan_Jose_Sanchez_CV.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost"
            >
              Descargar hoja de vida
            </motion.a>
            <div className="flex gap-2">
              {[
                { href: 'https://github.com/JuanSO121', label: 'GitHub', Icon: FaGithub },
                {
                  href: 'https://www.linkedin.com/in/jjsanchezo',
                  label: 'LinkedIn',
                  Icon: FaLinkedin,
                },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-multimedia hover:text-multimedia"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
          className="order-first md:order-none"
        >
          <AvatarScene />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;