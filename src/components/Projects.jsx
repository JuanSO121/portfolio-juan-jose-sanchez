import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';

// ─────────────────────────────────────────────
// Importa TODAS las imágenes de todas las carpetas
// Ajusta el glob si usas jpg/webp también
// ─────────────────────────────────────────────
const allImages = import.meta.glob(
  '/public/proyects/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true }
);

// Agrupa las imágenes por nombre de carpeta
function getProjectImages(folderName) {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/proyects/${folderName}/`))
    .map(([, mod]) => mod.default);
}

// ─────────────────────────────────────────────
// Mini carrusel de imágenes para cada proyecto
// ─────────────────────────────────────────────
const ImageCarousel = ({ images, emoji }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const hasImages = images && images.length > 0;

  const next = (e) => {
    e.stopPropagation();
    setDirection(1);
    setImgIndex((p) => (p + 1) % images.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setImgIndex((p) => (p - 1 + images.length) % images.length);
  };

  // Auto-avance cada 3 s si hay más de 1 imagen
  useEffect(() => {
    if (!hasImages || images.length <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setImgIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, [hasImages, images]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-multimedia-light to-sistemas-light flex items-center justify-center min-h-[200px]">
      {hasImages ? (
        <>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={imgIndex}
              src={images[imgIndex]}
              alt={`screenshot-${imgIndex}`}
              custom={direction}
              variants={{
                enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Flechas del mini carrusel */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center z-20 transition-all"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center z-20 transition-all"
              >
                <FaChevronRight size={12} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`rounded-full transition-all ${
                      i === imgIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Contador */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-20">
              {imgIndex + 1}/{images.length}
            </div>
          )}
        </>
      ) : (
        // Fallback con emoji si no hay imágenes
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="text-9xl">{emoji}</div>
          <div className="flex items-center gap-1 text-xs bg-black/10 px-3 py-1 rounded-full">
            <FaImage size={10} />
            <span>Sin imágenes aún</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔑 "folder" debe coincidir EXACTAMENTE con el nombre de la carpeta
  //     dentro de public/proyects/
  const projects = [
    {
      title: 'COMPAS - Sistema de Asistencia AR',
      description:
        'Aplicación móvil accesible con Realidad Aumentada para navegación en interiores, orientada a personas con discapacidad visual. Implementa AR Foundation en Unity para posicionamiento 3D y asistente virtual integrado.',
      emoji: '🧭',
      folder: 'compas',          // → public/proyects/compas/
      tags: ['Flutter', 'Unity', 'AR Foundation', 'Accesibilidad'],
      github: '#',
      demo: '#',
      status: 'En desarrollo',
    },
    {
      title: 'Productivity - Plataforma IA Académica',
      description:
        'Aplicación móvil de productividad académica con módulos de IA para asistencia y generación de contenido. Arquitectura completa mobile conectada con servicios backend inteligentes.',
      emoji: '📚',
      folder: 'productivity',    // → public/proyects/productivity/
      tags: ['Mobile', 'IA', 'Flutter', 'Backend Integration', 'API REST'],
      github: '#',
      demo: '#',
      status: '2024',
    },
    {
      title: 'Mappa - App Turismo Social',
      description:
        'Aplicación móvil de turismo social con mapas interactivos y geolocalización. Implementa consultas optimizadas en PostgreSQL y experiencia de usuario enfocada en descubrimiento de lugares.',
      emoji: '🗺️',
      folder: 'mappa',           // → public/proyects/mappa/
      tags: ['Ionic', 'Angular', 'PostgreSQL', 'Maps API', 'Geolocation'],
      github: '#',
      demo: '#',
      status: 'Mayo 2025',
    },
    {
      title: 'Portafolio Profesional',
      description:
        'Portafolio web moderno y responsivo desarrollado con React, Vite y Tailwind CSS. Incluye modo oscuro, animaciones fluidas con Framer Motion y diseño adaptativo para diferentes dispositivos.',
      emoji: '💼',
      folder: 'portafolio',      // → public/proyects/portafolio/
      tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
      github: 'https://github.com/juanjosesanchezocampo/portafolio',
      demo: '#',
      status: '2025',
    },
  ];

  // Precarga imágenes de cada proyecto
  const projectsWithImages = projects.map((p) => ({
    ...p,
    images: getProjectImages(p.folder),
  }));

  const next = () => setCurrentIndex((p) => (p + 1) % projects.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + projects.length) % projects.length);

  const current = projectsWithImages[currentIndex];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full" />

          <div className="relative">
            {/* Carrusel principal de proyectos */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="px-4"
                >
                  <div className="glass rounded-3xl overflow-hidden max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 p-8">
                      {/* Panel de imágenes */}
                      <div className="relative min-h-[260px]">
                        <ImageCarousel images={current.images} emoji={current.emoji} />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-700 z-30">
                          {current.status}
                        </div>
                      </div>

                      {/* Info del proyecto */}
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                          {current.title}
                        </h3>

                        <p className="text-secondary mb-6 leading-relaxed text-sm md:text-base">
                          {current.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {current.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gradient-to-r from-multimedia-light to-sistemas-light rounded-full text-xs font-medium text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          {current.github !== '#' && (
                            <motion.a
                              href={current.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-6 py-3 glass rounded-full font-semibold text-secondary hover:text-multimedia-dark transition-colors"
                            >
                              <FaGithub /> GitHub
                            </motion.a>
                          )}

                          <motion.a
                            href={current.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-multimedia-dark to-sistemas-dark text-white rounded-full font-semibold shadow-lg"
                          >
                            <FaExternalLinkAlt />
                            {current.github === '#' ? 'Próximamente' : 'Demo'}
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Flechas del carrusel de proyectos */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-multimedia-dark transition-colors z-10"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-multimedia-dark transition-colors z-10"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Dots de proyectos */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-multimedia-dark to-sistemas-dark w-8'
                      : 'bg-gray-300 dark:bg-gray-600 w-3'
                  }`}
                  aria-label={`Ir al proyecto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;