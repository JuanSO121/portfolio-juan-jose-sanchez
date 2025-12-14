import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'juanjosesanchezocampo2@gmail.com',
      link: 'mailto:juanjosesanchezocampo2@gmail.com',
      color: 'from-red-200 to-red-300',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Juan José Sánchez Ocampo',
      link: 'https://www.linkedin.com/in/juansanchez01',
      color: 'from-blue-200 to-blue-300',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@juanjosesanchezocampo',
      link: 'https://github.com/JuanSO121',
      color: 'from-gray-200 to-gray-300',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Ubicación',
      value: 'Cali, Colombia',
      link: null,
      color: 'from-green-200 to-green-300',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Hablemos <span className="gradient-text">!</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full"></div>

          <div className="glass rounded-3xl p-8 md:p-12">
            <motion.p
              className="text-center text-lg text-secondary mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Estoy disponible para colaborar en proyectos interesantes, prácticas profesionales o simplemente para conversar sobre tecnología. ¡No dudes en contactarme!
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} cursor-pointer`}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                        <item.icon className="text-2xl text-gray-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                        <div className="text-lg font-semibold text-gray-800">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                        <item.icon className="text-2xl text-gray-700" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                        <div className="text-lg font-semibold text-gray-800">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href="mailto:juanjosesanchezocampo2@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-multimedia-dark to-sistemas-dark text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
              >
                <FaEnvelope /> Envíame un mensaje
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-12 text-center text-secondary"
          >
            <p className="mb-4">© 2025 Juan José Sánchez Ocampo. Todos los derechos reservados.</p>
            <p className="text-sm">Hecho con ❤️ usando React + Vite + Tailwind CSS</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;