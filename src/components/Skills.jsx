import {
  FaAngular,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import {
  SiFastapi,
  SiFlutter,
  SiIonic,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import Section, { Reveal } from './ui/Section';

const CATEGORIAS = [
  {
    titulo: 'Lenguajes',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, core: true },
      { name: 'Java', icon: FaJava, core: true },
      { name: 'Python', icon: FaPython, core: true },
      { name: 'JavaScript', icon: SiJavascript },
    ],
  },
  {
    titulo: 'Backend',
    skills: [
      { name: 'Spring Boot', icon: SiSpringboot, core: true },
      { name: 'FastAPI', icon: SiFastapi, core: true },
      { name: 'Node.js', icon: FaNodeJs },
    ],
  },
  {
    titulo: 'Frontend',
    skills: [
      { name: 'Next.js', icon: SiNextdotjs, core: true },
      { name: 'React', icon: FaReact, core: true },
      { name: 'Tailwind CSS', icon: SiTailwindcss, core: true },
      { name: 'Angular', icon: FaAngular },
    ],
  },
  {
    titulo: 'Bases de datos',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, core: true },
      { name: 'MongoDB', icon: SiMongodb, core: true },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    titulo: 'Móvil y XR',
    skills: [
      { name: 'Flutter', icon: SiFlutter, core: true },
      { name: 'Unity', icon: SiUnity },
      { name: 'Ionic', icon: SiIonic },
    ],
  },
  {
    titulo: 'Herramientas',
    skills: [
      { name: 'Git', icon: FaGitAlt, core: true },
      { name: 'Docker', icon: FaDocker },
      { name: 'Linux', icon: FaLinux },
    ],
  },
];

const Skills = () => (
  <Section
    id="skills"
    title="Tecnologías"
    lead="Las marcadas con un punto son las que uso a diario. El resto las he usado en proyectos concretos y puedo defenderlas."
  >
    <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
      {CATEGORIAS.map((cat, i) => (
        <Reveal key={cat.titulo} delay={i * 0.03}>
          <div>
            <h3 className="mb-4 border-b border-line pb-2.5 text-sm font-semibold text-ink">
              {cat.titulo}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {cat.skills.map(({ name, icon: Icon, core }) => (
                <motion.li
                  key={name}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                    core
                      ? 'border-multimedia/35 bg-multimedia/[0.07] font-medium text-ink'
                      : 'border-line text-muted'
                  }`}
                >
                  <Icon aria-hidden="true" className="text-base" />
                  {name}
                  {core && (
                    <span
                      aria-label="Uso diario"
                      className="h-1.5 w-1.5 rounded-full bg-multimedia"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.08}>
      <p className="mt-10 max-w-prose text-muted">
        También trabajo con APIs REST y SOAP, microservicios, Scrum y Power BI.
      </p>
    </Reveal>
  </Section>
);

export default Skills;