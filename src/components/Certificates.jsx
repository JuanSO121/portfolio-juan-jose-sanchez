import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCertificate, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const certificates = [
    {
      title: 'Full Stack Empresarial con Spring Boot y Angular',
      issuer: 'Dev Senior',
      date: '2025',
      icon: '🎓',
      link: '#',
      featured: true,
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF SET',
      date: '2025',
      level: 'B2 Upper Intermediate',
      icon: '🌐',
      link: '#',
    },
    {
      title: 'Fortinet Certified Fundamentals in Cybersecurity',
      issuer: 'Fortinet Training Institute',
      date: '2025',
      icon: '🔐',
      link: '#',
    },
    {
      title: 'Business Intelligence + Power BI',
      issuer: 'BDG Academy',
      date: '2024',
      icon: '📊',
      link: '#',
    },
    {
      title: 'Mentoría: Comunicación Consciente',
      issuer: 'Técnica SLP',
      date: '2023',
      icon: '💬',
      link: '#',
    },
  ];

  const distinctions = [
    {
      title: 'Beca por Excelencia Académica',
      issuer: 'Universidad San Buenaventura Cali',
      date: '2024-2',
      icon: '🏆',
    },
  ];

  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Certificaciones <span className="gradient-text">& Logros</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full"></div>

          {/* Distinciones Destacadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-primary">
              🌟 Distinciones
            </h3>
            <div className="max-w-2xl mx-auto">
              {distinctions.map((distinction, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{distinction.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-primary mb-1">
                        {distinction.title}
                      </h4>
                      <p className="text-secondary text-sm">{distinction.issuer}</p>
                      <p className="text-multimedia-dark font-semibold text-sm">{distinction.date}</p>
                    </div>
                    <FaTrophy className="text-4xl text-yellow-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificaciones */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer group ${
                  cert.featured ? 'border-2 border-multimedia-dark' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{cert.icon}</div>
                  <FaCertificate className="text-multimedia-dark text-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-primary group-hover:gradient-text transition-all">
                  {cert.title}
                </h3>

                <p className="text-secondary mb-1 text-sm">{cert.issuer}</p>
                {cert.level && (
                  <p className="text-sistemas-dark font-semibold text-sm mb-1">{cert.level}</p>
                )}
                <p className="text-xs text-secondary mb-4">{cert.date}</p>

                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-multimedia-dark font-semibold hover:text-sistemas-dark transition-colors text-sm"
                >
                  Ver certificado <FaExternalLinkAlt size={12} />
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-secondary text-lg mb-4">
              Comprometido con el aprendizaje continuo y la excelencia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 glass rounded-full">
                <span className="font-bold text-multimedia-dark text-2xl">{certificates.length}+</span>
                <span className="text-secondary ml-2">Certificaciones</span>
              </div>
              <div className="px-6 py-3 glass rounded-full">
                <span className="font-bold text-yellow-500 text-2xl">🏆</span>
                <span className="text-secondary ml-2">Beca Excelencia</span>
              </div>
              <div className="px-6 py-3 glass rounded-full">
                <span className="font-bold text-sistemas-dark text-2xl">B2</span>
                <span className="text-secondary ml-2">Inglés</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;