import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/* ─── glob de imágenes ─────────────────────────────────────────── */
const allImages = import.meta.glob(
  '/public/proyects/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true }
);

function getProjectImages(folderName) {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/proyects/${folderName}/`))
    .map(([, mod]) => mod.default);
}

/* ─── datos ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'COMPAS',
    subtitle: 'Sistema de Asistencia AR',
    description:
      'Aplicación móvil accesible con Realidad Aumentada para navegación en interiores, orientada a personas con discapacidad visual. Implementa AR Foundation en Unity para posicionamiento 3D.',
    emoji: '🧭',
    folder: 'compas',
    tags: ['Flutter', 'Unity', 'AR Foundation', 'Accesibilidad'],
    github: '#',
    demo: '#',
    status: 'En desarrollo',
    accent: '#6EE7B7',
  },
  {
    title: 'Productivity',
    subtitle: 'Plataforma IA Académica',
    description:
      'Aplicación móvil de productividad académica con módulos de IA para asistencia y generación de contenido. Arquitectura completa mobile conectada con servicios backend inteligentes.',
    emoji: '📚',
    folder: 'productivity',
    tags: ['Mobile', 'IA', 'Flutter', 'API REST'],
    github: '#',
    demo: '#',
    status: '2024',
    accent: '#93C5FD',
  },
  {
    title: 'Mappa',
    subtitle: 'App Turismo Social',
    description:
      'Aplicación móvil de turismo social con mapas interactivos y geolocalización. Implementa consultas optimizadas en PostgreSQL y experiencia de usuario enfocada en descubrimiento.',
    emoji: '🗺️',
    folder: 'mappa',
    tags: ['Ionic', 'Angular', 'PostgreSQL', 'Maps API'],
    github: '#',
    demo: '#',
    status: 'Mayo 2025',
    accent: '#FCA5A5',
  },
  {
    title: 'Portafolio',
    subtitle: 'Web Profesional',
    description:
      'Portafolio web moderno y responsivo desarrollado con React, Vite y Tailwind CSS. Incluye modo oscuro, animaciones fluidas con Framer Motion y diseño adaptativo.',
    emoji: '💼',
    folder: 'portafolio',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/juanjosesanchezocampo/portafolio',
    demo: '#',
    status: '2025',
    accent: '#F9A8D4',
  },
];

/* ─── ImageStage ─────────────────────────────────────────────────── */
const ImageStage = ({ images, emoji, accent }) => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const hasImg = images.length > 0;

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  }, [idx]);

  useEffect(() => { setIdx(0); }, [images]);

  useEffect(() => {
    if (!hasImg || images.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx((p) => (p + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [hasImg, images.length]);

  if (!hasImg) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 select-none"
        style={{ background: `radial-gradient(ellipse at 60% 40%, ${accent}22, transparent 70%)` }}>
        <span className="text-8xl">{emoji}</span>
        <span className="text-xs tracking-widest uppercase opacity-40 font-mono">Sin capturas</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex flex-col">
      {/* Imagen principal */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d) => ({ x: d > 0 ? '-25%' : '25%', opacity: 0, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center p-3"
          >
            <img
              src={images[idx]}
              alt={`screenshot-${idx}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 8,
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Flechas */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); go((idx - 1 + images.length) % images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-20 transition-all backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <FaChevronLeft size={13} color="white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go((idx + 1) % images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-20 transition-all backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <FaChevronRight size={13} color="white" />
            </button>
          </>
        )}

        {/* Contador */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-20 text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.85)' }}>
            {idx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Tira de thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1.5 p-2 bg-black/70 backdrop-blur-sm overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); go(i); }}
              className="flex-shrink-0 rounded overflow-hidden transition-all duration-300"
              style={{
                width: 52,
                height: 38,
                outline: i === idx ? `2px solid ${accent}` : '2px solid transparent',
                outlineOffset: 1,
                opacity: i === idx ? 1 : 0.4,
              }}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Projects principal ─────────────────────────────────────────── */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [projIdx, setProjIdx] = useState(0);
  const [projDir, setProjDir] = useState(1);

  const projects = PROJECTS.map((p) => ({ ...p, images: getProjectImages(p.folder) }));
  const cur = projects[projIdx];

  const goProj = (next) => {
    setProjDir(next > projIdx ? 1 : -1);
    setProjIdx(next);
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full" />

          <div className="relative">
            <AnimatePresence mode="wait" custom={projDir}>
              <motion.div
                key={projIdx}
                custom={projDir}
                variants={{
                  enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              >
                <div
                  className="glass rounded-3xl overflow-hidden"
                  style={{ boxShadow: `0 0 60px ${cur.accent}18` }}
                >
                  <div className="grid md:grid-cols-[1.1fr_1fr]">

                    {/* ── Visor de imágenes ── */}
                    <div className="h-[320px] md:h-[460px] bg-black">
                      <ImageStage images={cur.images} emoji={cur.emoji} accent={cur.accent} />
                    </div>

                    {/* ── Info ── */}
                    <div className="flex flex-col justify-between p-8 md:p-10 relative overflow-hidden">
                      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                        style={{ background: `${cur.accent}20` }} />

                      <div>
                        <span
                          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wider"
                          style={{ background: `${cur.accent}22`, color: cur.accent }}>
                          {cur.status}
                        </span>

                        <h3 className="text-3xl md:text-4xl font-black mb-1 gradient-text leading-tight">
                          {cur.title}
                        </h3>
                        <p className="text-secondary font-medium mb-5 opacity-60">{cur.subtitle}</p>

                        <p className="text-secondary leading-relaxed text-sm mb-7">
                          {cur.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {cur.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: `${cur.accent}15`,
                                border: `1px solid ${cur.accent}40`,
                                color: cur.accent,
                              }}>
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        {cur.github !== '#' && (
                          <motion.a
                            href={cur.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-semibold text-secondary hover:text-primary transition-colors">
                            <FaGithub /> GitHub
                          </motion.a>
                        )}
                        <motion.a
                          href={cur.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${cur.accent}bb, ${cur.accent})` }}>
                          <FaExternalLinkAlt />
                          {cur.github === '#' ? 'Próximamente' : 'Ver Demo'}
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Flechas de proyecto */}
            <button
              onClick={() => goProj((projIdx - 1 + projects.length) % projects.length)}
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-secondary hover:text-primary transition-colors z-10 shadow-lg">
              <FaChevronLeft size={18} />
            </button>
            <button
              onClick={() => goProj((projIdx + 1) % projects.length)}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-secondary hover:text-primary transition-colors z-10 shadow-lg">
              <FaChevronRight size={18} />
            </button>
          </div>

          {/* Dots de proyecto */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goProj(i)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: i === projIdx ? 28 : 10,
                  background: i === projIdx ? cur.accent : '#d1d5db',
                }}
                aria-label={`Proyecto ${i + 1}`}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;