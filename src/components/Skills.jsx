import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaJava, FaAngular, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython, FaDocker, FaLinux } from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiPostgresql, SiTypescript, SiJavascript, SiFlutter, SiDart, SiMysql, SiUnity } from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: 'Lenguajes',
      color: 'from-blue-200 to-blue-300',
      skills: [
        { name: 'Java', icon: FaJava, level: 85 },
        { name: 'JavaScript', icon: SiJavascript, level: 82 },
        { name: 'TypeScript', icon: SiTypescript, level: 80 },
        { name: 'Python', icon: FaPython, level: 75 },
        { name: 'Dart', icon: SiDart, level: 78 },
      ],
    },
    {
      title: 'Backend',
      color: 'from-green-200 to-green-300',
      skills: [
        { name: 'Spring Boot', icon: SiSpringboot, level: 85 },
        { name: 'Node.js', icon: FaNodeJs, level: 75 },
        { name: 'REST API', icon: FaDatabase, level: 82 },
        { name: 'WebFlux', icon: SiSpringboot, level: 70 },
      ],
    },
    {
      title: 'Frontend',
      color: 'from-purple-200 to-purple-300',
      skills: [
        { name: 'Angular', icon: FaAngular, level: 83 },
        { name: 'React', icon: FaReact, level: 78 },
        { name: 'HTML/CSS', icon: SiJavascript, level: 85 },
      ],
    },
    {
      title: 'Mobile & XR',
      color: 'from-pink-200 to-pink-300',
      skills: [
        { name: 'Flutter', icon: SiFlutter, level: 80 },
        { name: 'Unity AR', icon: SiUnity, level: 75 },
      ],
    },
    {
      title: 'Bases de Datos',
      color: 'from-indigo-200 to-indigo-300',
      skills: [
        { name: 'PostgreSQL', icon: SiPostgresql, level: 82 },
        { name: 'MySQL', icon: SiMysql, level: 80 },
        { name: 'MongoDB', icon: SiMongodb, level: 78 },
      ],
    },
    {
      title: 'DevOps & Tools',
      color: 'from-orange-200 to-orange-300',
      skills: [
        { name: 'Git/GitHub', icon: FaGitAlt, level: 85 },
        { name: 'Docker', icon: FaDocker, level: 72 },
        { name: 'Linux', icon: FaLinux, level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Habilidades <span className="gradient-text">Técnicas</span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-multimedia-dark to-sistemas-dark mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-2xl transition-shadow"
              >
                <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="text-xl text-secondary" />
                          <span className="font-medium text-secondary text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs text-secondary">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: catIndex * 0.1 + skillIndex * 0.1, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
              Siempre aprendiendo y explorando nuevas tecnologías 🚀
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">REST APIs</span>
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">SOAP</span>
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">Microservicios</span>
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">Spring Cloud</span>
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">Power BI</span>
              <span className="px-4 py-2 glass rounded-full text-sm text-secondary">Jupyter</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;