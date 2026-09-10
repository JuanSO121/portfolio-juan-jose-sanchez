import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectSystem from './ui/ProjectSystem';
import Section from './ui/Section';

const allImages = import.meta.glob('/public/proyects/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
});

// Convención de archivos, por carpeta de proyecto:
//   public/proyects/<carpeta>/logo.svg    → burbuja del sistema orbital
//   public/proyects/<carpeta>/cover.png   → portada del panel de detalle
// Si no hay cover, se usa la primera imagen que no sea el logo, para que
// algo se vea mientras la subes.
const byFolder = (test) =>
  Object.entries(allImages)
    .filter(([path]) => test(path))
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((acc, [path, mod]) => {
      const folder = path.split('/proyects/')[1].split('/')[0];
      if (!acc[folder]) acc[folder] = mod.default;
      return acc;
    }, {});

const isLogo = (path) => /\/logo\.[a-z]+$/i.test(path);
const isCover = (path) => /\/cover\.[a-z]+$/i.test(path);

const LOGOS = byFolder(isLogo);
const EXPLICIT_COVERS = byFolder(isCover);
const FALLBACK_COVERS = byFolder((path) => !isLogo(path) && !isCover(path));
const COVERS = { ...FALLBACK_COVERS, ...EXPLICIT_COVERS };

const PROJECTS = [
  {
    title: 'Valle Humanitario',
    role: 'Desarrollador · Gobernación del Valle del Cauca',
    year: '2026',
    folder: 'valle-humanitario',
    problem:
      'La entrega de ayudas humanitarias se reportaba en documentos sueltos: nadie fuera de la entidad podía ver cuánto llegaba a cada municipio.',
    work: [
      'Micrositio público de rendición de cuentas, abierto a cualquier ciudadano sin registro.',
      'Mapa interactivo de los 41 municipios del Valle con MapLibre, alimentado por APIs REST.',
    ],
    stack: ['Next.js', 'TypeScript', 'MapLibre', 'APIs REST'],
    live: 'https://sigesi.valledelcauca.gov.co/valle-humanitario',
    domain: 'sigesi.valledelcauca.gov.co',
    repo: null,
    accent: '45 212 191',
  },
  {
    title: 'Savia',
    role: 'Desarrollador · Gobernación del Valle del Cauca',
    year: '2026',
    folder: 'savia',
    problem:
      'La capacitación de funcionarios dependía de sesiones presenciales, sin forma de certificar quién había completado qué.',
    work: [
      'Plataforma de formación y certificación, con seguimiento del avance de cada funcionario.',
      'Interfaz para usuarios con baja visión: contraste alto, objetivos táctiles amplios y navegación por teclado.',
    ],
    stack: ['Next.js', 'TypeScript', 'Accesibilidad'],
    live: 'https://savia-dev.vercel.app/',
    domain: 'savia-dev.vercel.app',
    repo: null,
    accent: '167 139 250',
  },
  {
    title: 'COMPAS',
    role: 'Desarrollador full stack y móvil · Proyecto de grado',
    year: '2026',
    folder: 'compas',
    problem:
      'El GPS no funciona bajo techo. Una persona ciega que entra a un edificio público se queda sin guía.',
    work: [
      'Backend en Python y FastAPI, y navegación en realidad aumentada con Unity dentro de la app Flutter.',
      'Comandos de voz clasificados por un modelo TFLite en el dispositivo, con respaldo remoto: funciona sin internet.',
    ],
    stack: ['Flutter', 'Unity AR', 'Python', 'FastAPI', 'TensorFlow Lite'],
    live: 'https://compas-lovat.vercel.app/',
    domain: 'compas-lovat.vercel.app',
    repo: 'https://github.com/JuanSO121/compas-client-mobile',
    accent: '251 146 60',
  },
  {
    title: 'Este portafolio',
    role: 'Diseño y desarrollo',
    year: '2026',
    folder: 'portafolio',
    problem:
      'No quería una plantilla. Si me presento como alguien que construye interfaces, el sitio donde me presento tiene que sostener esa afirmación.',
    work: [
      'Sistema de tokens propio: el tema claro y oscuro se resuelve cambiando variables CSS, sin duplicar una sola clase.',
      'Selector orbital de proyectos, foco visible en teclado y respeto por la preferencia de movimiento reducido del sistema operativo.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://portfolio-juan-jose-sanchez.vercel.app/',
    domain: 'portfolio-juan-jose-sanchez.vercel.app',
    repo: null,
    accent: '251 113 133',
  },
];


/** Marca de HUD: filete de acento y guion que apunta al núcleo. */
const Tick = ({ accent, side }) => (
  <span aria-hidden="true" className="hidden lg:block">
    <span
      className={`absolute top-0 h-full w-px ${side === 'left' ? 'right-0' : 'left-0'}`}
      style={{ background: `linear-gradient(to bottom, transparent, rgb(${accent} / 0.5), transparent)` }}
    />
    <span
      className={`absolute top-1/2 h-px w-5 ${side === 'left' ? '-right-5' : '-left-5'}`}
      style={{ background: `rgb(${accent} / 0.4)` }}
    />
  </span>
);

const Cover = ({ p }) => {
  const src = COVERS[p.folder];
  const frame = 'relative block aspect-[16/9] overflow-hidden rounded-lg border border-line bg-stage';

  const media = src ? (
    <img
      src={src}
      alt={`Pantalla principal de ${p.title}`}
      loading="lazy"
      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
    />
  ) : (
    <div className="flex h-full items-center justify-center p-3">
      <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-line">
        <p className="text-xs text-faint">Captura pendiente</p>
      </div>
    </div>
  );

  if (!p.live) return <div className={frame}>{media}</div>;

  return (
    <a
      href={p.live}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={`group ${frame}`}
    >
      {media}
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
          Abrir sitio
        </span>
      </span>
    </a>
  );
};

const Projects = () => {
  const [active, setActive] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const reduce = useReducedMotion();
  const systemRef = useRef(null);
  const detailRef = useRef(null);
  const p = PROJECTS[active];

  // En móvil el sistema está arriba y el detalle 600px más abajo: al
  // tocar una burbuja el cambio ocurre fuera de pantalla y parece que
  // no pasó nada. Llevamos la vista al detalle.
  const select = useCallback(
    (i) => {
      setActive(i);
      if (window.innerWidth >= 1024) return;
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    },
    [reduce],
  );

  // Vuelta al sistema: aparece cuando ya lo dejaste atrás pero sigues
  // dentro de la sección.
  useEffect(() => {
    const onScroll = () => {
      const sys = systemRef.current?.getBoundingClientRect();
      const det = detailRef.current?.getBoundingClientRect();
      if (!sys || !det) return;
      setShowBack(sys.bottom < 80 && det.bottom > 200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -10 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <Section
      id="projects"
      title="Proyectos"
      lead="Toca un proyecto para traerlo al centro. Dos están en producción y los usan personas que no me conocen."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] lg:gap-10">
        {/* La pista del centro lleva ancho explícito: el sistema tiene
            todo su contenido en absoluto, así que en una pista `auto`
            el navegador le calcula ancho cero y desaparece. */}
        <div ref={systemRef} className="order-1 scroll-mt-20 lg:order-2">
          <ProjectSystem
            projects={PROJECTS}
            active={active}
            onSelect={select}
            logos={LOGOS}
          />
        </div>

        <div ref={detailRef} className="relative order-2 scroll-mt-20 lg:order-1 lg:pr-8">
          <Tick accent={p.accent} side="left" />
          <AnimatePresence mode="wait">
            <motion.div key={active} {...fade} className="lg:text-right">
              <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                {p.role} · {p.year}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{p.problem}</p>
              <ul className="mt-4 space-y-2.5">
                {p.work.map((w) => (
                  <li key={w} className="leading-relaxed text-muted">
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative order-3 lg:pl-8">
          <Tick accent={p.accent} side="right" />
          <AnimatePresence mode="wait">
            <motion.div key={active} {...fade}>
              <Cover p={p} />

              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: `rgb(${p.accent} / 0.14)`, color: `rgb(${p.accent})` }}
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {p.live ? (
                  <>
                    <motion.a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-primary"
                    >
                      Abrir sitio <FaExternalLinkAlt size={11} />
                    </motion.a>
                    <span className="text-xs text-faint">{p.domain}</span>
                  </>
                ) : (
                  <p className="text-sm text-faint">
                    Código privado. Lo muestro con gusto en una entrevista.
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Solo móvil: el escritorio ve sistema y detalle a la vez. */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            onClick={() =>
              systemRef.current?.scrollIntoView({
                behavior: reduce ? 'auto' : 'smooth',
                block: 'start',
              })
            }
            aria-label="Volver a los proyectos"
            className="fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/70 text-ink shadow-lg backdrop-blur-md lg:hidden"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;