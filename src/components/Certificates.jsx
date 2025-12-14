import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaCertificate, FaExternalLinkAlt, FaTrophy, FaTimes, FaGraduationCap, FaGlobe, FaShieldAlt, FaChartBar, FaComments } from 'react-icons/fa';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      title: 'Full Stack Empresarial con Spring Boot y Angular',
      issuer: 'Dev Senior',
      date: '2025',
      icon: FaGraduationCap,
      link: 'https://profiles.badgeclaimed.com/user-9457/badges/urn:uuid:3b5748dc-8164-4137-863d-62f41ef5974b.html',
      image: '/certificates/fullstack-cert.jpg',
      featured: true,
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF SET',
      date: '2025',
      level: 'B2 Upper Intermediate',
      icon: FaGlobe,
      link: 'https://cert.efset.org/en/CQ1ejY',
      image: '/certificates/english-cert.jpg',
    },
    {
      title: 'Fortinet Certified Fundamentals in Cybersecurity',
      issuer: 'Fortinet Training Institute',
      date: '2025',
      icon: FaShieldAlt,
      link: '#',
      image: '/certificates/fortinet-cert.jpg',
    },
    {
      title: 'Business Intelligence + Power BI',
      issuer: 'BDG Academy',
      date: '2024',
      icon: FaChartBar,
      link: 'https://certificados.bdginstitute.edu.co/',
      image: '/certificates/powerbi-cert.jpg',
    },
    {
      title: 'Mentoría: Comunicación Consciente',
      issuer: 'Técnica SLP',
      date: '2023',
      icon: FaComments,
      link: 'https://formessis.com/',
      image: '/certificates/slp-cert.jpg',
    },
  ];

  const distinctions = [
    {
      title: 'Beca por Excelencia Académica',
      issuer: 'Universidad San Buenaventura Cali',
      date: '2024-2',
      icon: '🏆',
      image: '/certificates/beca-cert.jpeg',
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Certificaciones <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">& Logros</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-green-400 mx-auto mb-12 rounded-full"></div>

          {/* Distinciones Destacadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
              <FaTrophy className="text-yellow-500" /> Distinciones
            </h3>
            <div className="max-w-2xl mx-auto">
              {distinctions.map((distinction, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-lg cursor-pointer group relative overflow-hidden"
                  onClick={() => setSelectedCert(distinction)}
                >
                  {/* Preview del certificado en hover */}
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="text-white text-center">
                      <FaCertificate className="text-6xl mx-auto mb-2" />
                      <p className="font-semibold">Click para ver certificado</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <distinction.icon className={`text-3xl ${distinction.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">
                        {distinction.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{distinction.issuer}</p>
                      <p className="text-purple-600 font-semibold text-sm">{distinction.date}</p>
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
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden ${
                  cert.featured ? 'border-2 border-purple-400' : 'shadow-lg'
                }`}
                onClick={() => setSelectedCert(cert)}
              >
                {/* Preview del certificado en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-green-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <FaCertificate className="text-6xl mx-auto mb-2" />
                    <p className="font-semibold">Click para ver certificado</p>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="text-purple-500 text-xl">
                    <cert.icon />
                  </div>

                  <FaCertificate className="text-purple-400 text-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-green-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {cert.title}
                </h3>

                <p className="text-gray-600 mb-1 text-sm">{cert.issuer}</p>
                {cert.level && (
                  <p className="text-green-600 font-semibold text-sm mb-1">{cert.level}</p>
                )}
                <p className="text-xs text-gray-500 mb-4">{cert.date}</p>

                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-green-600 transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Verificar en línea <FaExternalLinkAlt size={12} />
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
            <p className="text-gray-600 text-lg mb-4">
              Comprometido con el aprendizaje continuo y la excelencia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <span className="font-bold text-purple-600 text-2xl">{certificates.length}</span>
                <span className="text-gray-600 ml-2">Certificaciones</span>
              </div>
              <div className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
                <FaTrophy className="text-yellow-500 text-xl" />
                <span className="text-gray-600">Beca Excelencia</span>
              </div>
              <div className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
                <FaGlobe className="text-blue-500 text-xl" />
                <span className="font-bold text-green-600">B2</span>
                <span className="text-gray-600">Inglés</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal para visualizar certificado */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal - Fijo */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1 pr-4">
                <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-1">
                  {selectedCert.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <FaTimes className="text-xl text-gray-600" />
              </button>
            </div>

            {/* Imagen del certificado - Ajustada al tamaño del modal */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 flex items-center justify-center">
              <div className="relative rounded-lg overflow-hidden shadow-lg w-full">
                <img
                  src={selectedCert.image}
                  alt={`Certificado de ${selectedCert.title}`}
                  className="w-full h-auto max-h-[55vh] object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f3f4f6" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ECertificado no disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            {/* Footer con acciones - Fijo */}
            <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200 gap-4 flex-wrap flex-shrink-0">
              <div className="text-sm text-gray-600">
                <p className="font-semibold">{selectedCert.date}</p>
                {selectedCert.level && <p className="text-xs md:text-sm">{selectedCert.level}</p>}
              </div>
              
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {selectedCert.link && selectedCert.link !== '#' && (
                  <motion.a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-green-600 text-white rounded-full font-semibold shadow-lg text-sm"
                  >
                    <FaExternalLinkAlt className="text-xs" /> <span className="hidden sm:inline">Verificar en línea</span><span className="sm:hidden">Verificar</span>
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setSelectedCert(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:text-purple-600 transition-colors text-sm"
                >
                  Cerrar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;