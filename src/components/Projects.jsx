import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

/* ─── datos ──────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'COMPAS',
    subtitle: 'AR Assistance System',
    description: 'Aplicación móvil accesible con Realidad Aumentada para navegación en interiores, orientada a personas con discapacidad visual.',
    emoji: '🧭', folder: 'compas',
    tags: ['Flutter', 'Unity', 'AR Foundation', 'Accesibilidad'],
    github: '#', demo: '#', status: 'En desarrollo',
    num: '01',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    glow: '#34d399',
  },
  {
    title: 'Productivity',
    subtitle: 'AI Academic Platform',
    description: 'Plataforma móvil de productividad académica con módulos de IA para asistencia y generación de contenido inteligente.',
    emoji: '📚', folder: 'productivity',
    tags: ['Mobile', 'IA', 'Flutter', 'API REST'],
    github: '#', demo: '#', status: '2024',
    num: '02',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    glow: '#a78bfa',
  },
  {
    title: 'Mappa',
    subtitle: 'Social Tourism App',
    description: 'App de turismo social con mapas interactivos, geolocalización y consultas optimizadas para descubrimiento de lugares.',
    emoji: '🗺️', folder: 'mappa',
    tags: ['Ionic', 'Angular', 'PostgreSQL', 'Maps API'],
    github: '#', demo: '#', status: 'Mayo 2025',
    num: '03',
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    glow: '#fb7185',
  },
  {
    title: 'Portafolio',
    subtitle: 'Professional Portfolio',
    description: 'Portafolio web moderno y responsivo con modo oscuro, animaciones fluidas con Framer Motion y diseño adaptativo.',
    emoji: '💼', folder: 'portafolio',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/juanjosesanchezocampo/portafolio',
    demo: '#', status: '2025',
    num: '04',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    glow: '#fb923c',
  },
];

/* ─── ImageViewer ────────────────────────────────────────────────── */
const ImageViewer = ({ images, emoji, glow, gradient }) => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);

  useEffect(() => { setIdx(0); }, [images]);
  useEffect(() => {
    if (images.length <= 1 || hovered) return;
    const t = setInterval(() => { setDir(1); setIdx(p => (p + 1) % images.length); }, 3200);
    return () => clearInterval(t);
  }, [images.length, hovered]);

  if (!images.length) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.07) 20px,rgba(255,255,255,.07) 40px)' }} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <span className="text-8xl drop-shadow-2xl">{emoji}</span>
          <span className="text-white/50 text-xs tracking-[0.4em] uppercase font-mono">Coming soon</span>
        </div>
      </div>
    );
  }

  const prev = (e) => { e.stopPropagation(); setDir(-1); setIdx(p => (p - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setDir(1); setIdx(p => (p + 1) % images.length); };

  return (
    <div className="relative w-full h-full bg-[#030305] overflow-hidden"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* Glow ambiental */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${glow}20, transparent 70%)`, zIndex: 1 }} />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={idx} custom={dir}
          variants={{
            enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
            center: { x: 0 },
            exit: (d) => ({ x: d > 0 ? '-20%' : '20%', opacity: 0, scale: 0.95 }),
          }}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 flex items-center justify-center p-6"
          style={{ zIndex: 2 }}>
          <img src={images[idx]} alt=""
            style={{
              maxWidth: '100%', maxHeight: '100%',
              width: 'auto', height: 'auto',
              objectFit: 'contain',
              borderRadius: 16,
              filter: `drop-shadow(0 24px 80px ${glow}40) drop-shadow(0 4px 20px rgba(0,0,0,0.9))`,
            }} />
        </motion.div>
      </AnimatePresence>

      {/* Flechas en hover */}
      <AnimatePresence>
        {hovered && images.length > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-between px-4 z-10 pointer-events-none">
            <motion.button whileHover={{ scale: 1.1 }} onClick={prev}
              className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center pointer-events-auto"
              style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${glow}50` }}>
              <FaChevronLeft size={13} color="white" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={next}
              className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center pointer-events-auto"
              style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${glow}50` }}>
              <FaChevronRight size={13} color="white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bars */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex gap-1 px-4 pb-3">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setDir(i > idx ? 1 : -1); setIdx(i); }}
              className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              {i === idx && (
                <motion.div className="h-full rounded-full"
                  style={{ background: glow }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.2, ease: 'linear' }}
                  key={idx}
                />
              )}
              {i < idx && <div className="h-full w-full rounded-full" style={{ background: glow }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Projects ─────────────────────────────────────────────────────── */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const projects = PROJECTS.map(p => ({ ...p, images: getProjectImages(p.folder) }));
  const cur = projects[active];

  const go = (next) => { setDir(next > active ? 1 : -1); setActive(next); };

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">

      {/* Ambient background */}
      <AnimatePresence>
        <motion.div key={active} className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ background: `radial-gradient(ellipse 50% 40% at 20% 70%, ${cur.glow}08, transparent 60%)` }} />
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative" ref={ref}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-end justify-between mb-12">
          <div>
            <motion.p className="text-xs font-mono tracking-[0.4em] uppercase mb-3"
              animate={{ color: cur.glow }} transition={{ duration: 0.5 }}>
              Proyectos seleccionados
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-black text-primary leading-none">
              Trabajo <span className="gradient-text">Destacado</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => go((active - 1 + projects.length) % projects.length)}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-105 text-secondary"
              style={{ borderColor: `${cur.glow}40` }}>
              <FaChevronLeft size={16} />
            </button>
            <motion.button onClick={() => go((active + 1) % projects.length)}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all font-bold"
              style={{ background: cur.glow, color: '#000', boxShadow: `0 0 20px ${cur.glow}60` }}>
              <FaChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Card principal */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={active} custom={dir}
              variants={{
                enter: (d) => ({ x: d > 0 ? 50 : -50, opacity: 0, scale: 0.98 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d) => ({ x: d > 0 ? -50 : 50, opacity: 0, scale: 0.98 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}>

              <div className="grid md:grid-cols-[1.4fr_1fr] rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(8,8,12,0.85)',
                  border: `1px solid ${cur.glow}20`,
                  boxShadow: `0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px ${cur.glow}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  backdropFilter: 'blur(24px)',
                }}>

                {/* Imagen */}
                <div className="h-[360px] md:h-[500px] relative">
                  <ImageViewer images={cur.images} emoji={cur.emoji} glow={cur.glow} gradient={cur.gradient} />
                  {/* Número decorativo */}
                  <div className="absolute top-5 left-6 z-20 font-black text-8xl leading-none select-none pointer-events-none"
                    style={{ color: `${cur.glow}12`, fontVariantNumeric: 'tabular-nums' }}>
                    {cur.num}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-8 md:p-10 relative overflow-hidden"
                  style={{ borderLeft: `1px solid ${cur.glow}12` }}>
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <motion.span animate={{ background: `${cur.glow}15`, color: cur.glow, borderColor: `${cur.glow}35` }}
                        transition={{ duration: 0.5 }}
                        className="text-xs font-mono px-3 py-1.5 rounded-full tracking-wider border">
                        {cur.status}
                      </motion.span>
                      <span className="text-xs font-mono opacity-20 text-primary">{cur.num} / 0{projects.length}</span>
                    </div>

                    <motion.h3
                      className={`text-4xl md:text-5xl font-black mb-2 leading-none bg-gradient-to-r ${cur.gradient} bg-clip-text text-transparent`}>
                      {cur.title}
                    </motion.h3>
                    <motion.p animate={{ color: `${cur.glow}90` }} transition={{ duration: 0.5 }}
                      className="text-xs font-mono tracking-[0.2em] uppercase mb-6">{cur.subtitle}</motion.p>

                    <motion.div animate={{ background: `linear-gradient(to right, ${cur.glow}50, transparent)` }}
                      className="w-full h-px mb-6" />

                    <p className="text-sm leading-relaxed mb-8 text-secondary opacity-75">{cur.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {cur.tags.map((tag, i) => (
                        <motion.span key={`${active}-${tag}`}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07, type: 'spring', stiffness: 250 }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
                          style={{ background: `${cur.glow}10`, border: `1px solid ${cur.glow}25`, color: cur.glow }}>
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-3 flex-wrap">
                    {cur.github !== '#' && (
                      <motion.a href={cur.github} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                        <FaGithub /> GitHub
                      </motion.a>
                    )}
                    <motion.a href={cur.demo} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.04, y: -2, boxShadow: `0 12px 40px ${cur.glow}50` }}
                      whileTap={{ scale: 0.96 }}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r ${cur.gradient}`}
                      style={{ boxShadow: `0 6px 24px ${cur.glow}35` }}>
                      <FaExternalLinkAlt />
                      {cur.github === '#' ? 'Próximamente' : 'Ver Demo'}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Selector de proyectos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 grid grid-cols-4 gap-3">
          {projects.map((p, i) => (
            <motion.button key={i} onClick={() => go(i)}
              whileHover={{ y: -2 }}
              className="relative rounded-2xl p-4 text-left overflow-hidden transition-all"
              style={{
                background: i === active ? `${p.glow}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i === active ? p.glow + '40' : 'rgba(255,255,255,0.05)'}`,
                boxShadow: i === active ? `0 0 24px ${p.glow}15` : 'none',
              }}>
              <motion.div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${p.gradient}`}
                animate={{ opacity: i === active ? 1 : 0 }} />
              <span className="text-xs font-mono block mb-1 transition-colors"
                style={{ color: i === active ? p.glow : 'rgba(255,255,255,0.25)' }}>{p.num}</span>
              <span className={`text-sm font-bold block truncate transition-colors ${i === active ? 'text-primary' : 'text-secondary opacity-40'}`}>
                {p.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Flechas móvil */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button onClick={() => go((active - 1 + projects.length) % projects.length)}
            className="w-12 h-12 rounded-full border flex items-center justify-center text-secondary"
            style={{ borderColor: `${cur.glow}40` }}>
            <FaChevronLeft size={16} />
          </button>
          <button onClick={() => go((active + 1) % projects.length)}
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
            style={{ background: cur.glow, color: '#000' }}>
            <FaChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;