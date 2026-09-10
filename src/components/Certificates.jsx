import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FaChartBar,
  FaComments,
  FaExternalLinkAlt,
  FaGlobe,
  FaGraduationCap,
  FaShieldAlt,
  FaTimes,
  FaTrophy,
} from 'react-icons/fa';
import Section, { Reveal } from './ui/Section';

const RECONOCIMIENTO = {
  title: 'Beca por Excelencia Académica',
  issuer: 'Universidad de San Buenaventura Cali',
  date: '2024-2',
  icon: FaTrophy, // Antes era la cadena '🏆' y el JSX hacía <distinction.icon />.
  image: '/certificates/beca-cert.jpeg', // React intentaba montar un componente inexistente.
  link: null,
};

const CERTIFICADOS = [
  {
    title: 'Full Stack Empresarial con Spring Boot y Angular',
    issuer: 'Dev Senior',
    date: '2025',
    icon: FaGraduationCap,
    link: 'https://profiles.badgeclaimed.com/user-9457/badges/urn:uuid:3b5748dc-8164-4137-863d-62f41ef5974b.html',
    image: '/certificates/fullstack-cert.jpg',
  },
  {
    title: 'EF SET English Certificate',
    issuer: 'EF SET',
    date: '2025',
    level: 'Nivel B2',
    icon: FaGlobe,
    link: 'https://cert.efset.org/en/CQ1ejY',
    image: '/certificates/english-cert.jpg',
  },
  {
    title: 'Business Intelligence y Power BI',
    issuer: 'BDG Academy',
    date: '2024',
    icon: FaChartBar,
    link: 'https://certificados.bdginstitute.edu.co/',
    image: '/certificates/powerbi-cert.jpg',
  },
  {
    title: 'Fundamentos de Ciberseguridad',
    issuer: 'Fortinet Training Institute',
    date: '2025',
    icon: FaShieldAlt,
    link: null, // Sin enlace real: antes mostraba "Verificar en línea" apuntando a "#".
    image: '/certificates/fortinet-cert.jpg',
  },
  {
    title: 'Comunicación consciente',
    issuer: 'Técnica SLP',
    date: '2023',
    icon: FaComments,
    link: 'https://formessis.com/',
    image: '/certificates/slp-cert.jpg',
  },
];

const FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e9e9ef" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="system-ui" font-size="22" fill="%237a7a8a" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';

/* ── Modal ───────────────────────────────────────────────────────── */
const CertModal = ({ cert, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-title"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-card border border-line bg-surface"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div>
            <h3 id="cert-title" className="font-display text-lg font-bold text-ink sm:text-xl">
              {cert.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {cert.issuer} · {cert.date}
              {cert.level ? ` · ${cert.level}` : ''}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-stage p-4 sm:p-6">
          <img
            src={cert.image}
            alt={`Certificado: ${cert.title}`}
            className="max-h-[58vh] w-auto max-w-full rounded-lg object-contain"
            onError={(e) => {
              e.currentTarget.src = FALLBACK;
            }}
          />
        </div>

        {cert.link && (
          <div className="border-t border-line p-5 sm:p-6">
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <FaExternalLinkAlt size={12} /> Verificar con la entidad
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Sección ─────────────────────────────────────────────────────── */
const Certificates = () => {
  const [selected, setSelected] = useState(null);
  const reduce = useReducedMotion();

  return (
    <Section
      id="certificates"
      title="Certificaciones"
      lead="Cada tarjeta abre el documento. Las que se pueden verificar enlazan a la entidad que las emitió."
    >
      {/* El reconocimiento se destaca por posición y tamaño, no por un
          degradado amarillo que rompía la paleta del sitio. */}
      <Reveal>
        <button
          type="button"
          onClick={() => setSelected(RECONOCIMIENTO)}
          className="card group mb-4 flex w-full items-center gap-5 p-6 text-left transition-colors hover:border-multimedia/50"
        >
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-multimedia/10 text-multimedia">
            <RECONOCIMIENTO.icon size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-lg font-bold text-ink">
              {RECONOCIMIENTO.title}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {RECONOCIMIENTO.issuer} · {RECONOCIMIENTO.date}
            </span>
          </span>
          <span className="hidden text-sm text-faint transition-colors group-hover:text-multimedia sm:block">
            Ver documento
          </span>
        </button>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2">
        {CERTIFICADOS.map((cert, i) => (
          <li key={cert.title}>
            <Reveal delay={reduce ? 0 : i * 0.04}>
              {/* Toda la tarjeta es un botón. Antes había un <a> dentro
                  de un div clicable, y encima una capa de hover con
                  z-10 que tapaba ese enlace justo al pasar el cursor:
                  era imposible pulsarlo. */}
              <button
                type="button"
                onClick={() => setSelected(cert)}
                className="card group flex h-full w-full flex-col p-6 text-left transition-colors hover:border-multimedia/50"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-multimedia/10 text-multimedia">
                  <cert.icon size={18} />
                </span>

                <span className="font-display text-base font-bold leading-snug text-ink">
                  {cert.title}
                </span>

                <span className="mt-2 text-sm text-muted">{cert.issuer}</span>

                <span className="mt-auto flex items-center gap-2 pt-5 text-sm text-faint">
                  {cert.date}
                  {cert.level && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-sistemas">{cert.level}</span>
                    </>
                  )}
                  {cert.link && (
                    <FaExternalLinkAlt
                      size={10}
                      aria-hidden="true"
                      className="ml-auto transition-colors group-hover:text-multimedia"
                    />
                  )}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* AnimatePresence faltaba: las animaciones de salida del modal
          nunca llegaban a ejecutarse. */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  );
};

export default Certificates;