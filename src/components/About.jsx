import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full"></div>

          <div className="glass rounded-3xl p-8 md:p-12">
            <motion.p
              className="text-lg text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Estudiante de <span className="font-semibold text-sistemas-dark">Ingeniería de Sistemas</span> con doble programa en <span className="font-semibold text-multimedia-dark">Ingeniería Multimedia</span> en la Universidad San Buenaventura Cali, orientado a crear soluciones web y móviles claras, funcionales y bien diseñadas.
            </motion.p>

            <motion.p
              className="text-lg text-secondary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Cuento con experiencia académica en el desarrollo de aplicaciones web y móviles utilizando <span className="font-semibold">Java, Spring Boot, Angular y Flutter</span>, apoyándome en bases de datos <span className="font-semibold">SQL y NoSQL</span>.
            </motion.p>

            <motion.p
              className="text-lg text-secondary leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Integro principios de ingeniería de software con criterios de interacción y experiencia de usuario para construir productos simples, útiles y centrados en las personas. Participo activamente en proyectos académicos y trabajo colaborativo, explorando tecnologías como IA y AR cuando el contexto lo requiere.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center p-6 bg-gradient-to-br from-multimedia-light to-multimedia-DEFAULT rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">8°</div>
                <div className="text-primary font-medium">Semestre</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-sistemas-light to-sistemas-DEFAULT rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">2</div>
                <div className="text-primary font-medium">Carreras</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl">
                <div className="text-4xl font-bold gradient-text mb-2">∞</div>
                <div className="text-primary font-medium">Aprendizaje</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;