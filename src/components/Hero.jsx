import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/juanjosesanchezocampo', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/juan-jose-sanchez-ocampo/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:juanjosesanchezocampo2@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hola, soy{' '}
            <span className="gradient-text">Juan José Sánchez</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-secondary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Desarrollador Full Stack | Ingeniero de Sistemas & Multimedia
          </motion.p>
          
          <motion.p
            className="text-lg text-secondary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Universidad San Buenaventura Cali
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-multimedia-dark to-sistemas-dark text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Contáctame
            </motion.a>
            
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass rounded-full font-semibold text-secondary hover:text-multimedia-dark transition-all"
            >
              Descargar CV
            </motion.a>
          </motion.div>

          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-multimedia-dark transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative z-10"
          >
            <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-multimedia-light to-sistemas-light p-2">
              <div className="w-full h-full rounded-full glass flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-multimedia-light to-sistemas-light rounded-full blur-3xl opacity-50"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;