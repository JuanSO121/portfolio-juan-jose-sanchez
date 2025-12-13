import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: 'COMPAS - Sistema de Asistencia AR',
      description: 'Aplicación móvil accesible con Realidad Aumentada para navegación en interiores, orientada a personas con discapacidad visual. Implementa AR Foundation en Unity para posicionamiento 3D y asistente virtual integrado.',
      image: '🧭',
      tags: ['Flutter', 'Unity', 'AR Foundation', 'Dart', 'Accesibilidad'],
      github: '#',
      demo: '#',
      status: 'En desarrollo'
    },
    {
      title: 'Productivity - Plataforma IA Académica',
      description: 'Aplicación móvil de productividad académica con módulos de IA para asistencia y generación de contenido. Arquitectura completa mobile conectada con servicios backend inteligentes.',
      image: '📚',
      tags: ['Mobile', 'IA', 'Flutter', 'Backend Integration', 'API REST'],
      github: '#',
      demo: '#',
      status: '2024'
    },
    {
      title: 'Mappa - App Turismo Social',
      description: 'Aplicación móvil de turismo social con mapas interactivos y geolocalización. Implementa consultas optimizadas en PostgreSQL y experiencia de usuario enfocada en descubrimiento de lugares.',
      image: '🗺️',
      tags: ['Ionic', 'Angular', 'PostgreSQL', 'Maps API', 'Geolocation'],
      github: '#',
      demo: '#',
      status: 'Mayo 2025'
    },
    {
      title: 'Portafolio Profesional',
      description: 'Portafolio web moderno y responsivo desarrollado con React, Vite y Tailwind CSS. Incluye modo oscuro, animaciones fluidas con Framer Motion y diseño adaptativo para diferentes dispositivos.',
      image: '💼',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
      github: 'https://github.com/juanjosesanchezocampo/portafolio',
      demo: '#',
      status: '2025'
    },
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

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
          
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full"></div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.2 }}
                      className="glass rounded-3xl overflow-hidden max-w-4xl mx-auto"
                    >
                      <div className="grid md:grid-cols-2 gap-6 p-8">
                        <div className="flex items-center justify-center bg-gradient-to-br from-multimedia-light to-sistemas-light rounded-2xl p-12 relative">
                          <div className="text-9xl">{project.image}</div>
                          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-700">
                            {project.status}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                            {project.title}
                          </h3>
                          
                          <p className="text-secondary mb-6 leading-relaxed text-sm md:text-base">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gradient-to-r from-multimedia-light to-sistemas-light rounded-full text-xs font-medium text-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            {project.github !== '#' && (
                              <motion.a
                                href={project.github}
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
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-multimedia-dark to-sistemas-dark text-white rounded-full font-semibold shadow-lg"
                            >
                              <FaExternalLinkAlt /> {project.github === '#' ? 'Próximamente' : 'Demo'}
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={prevProject}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-multimedia-dark transition-colors z-10"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-multimedia-dark transition-colors z-10"
            >
              <FaChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-multimedia-dark to-sistemas-dark w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
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