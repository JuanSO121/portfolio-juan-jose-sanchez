import { FaExternalLinkAlt } from 'react-icons/fa';
import Section, { Reveal } from './ui/Section';

const CREDENCIALES = [
  {
    titulo: 'Beca por Excelencia Académica',
    emisor: 'Universidad de San Buenaventura Cali',
    año: '2024',
    link: null,
  },
  {
    titulo: 'Full Stack Empresarial con Spring Boot y Angular',
    emisor: 'Dev Senior',
    año: '2025',
    link: 'https://profiles.badgeclaimed.com/user-9457/badges/urn:uuid:3b5748dc-8164-4137-863d-62f41ef5974b.html',
  },
  {
    titulo: 'Inglés B2',
    emisor: 'EF SET',
    año: '2025',
    link: 'https://cert.efset.org/en/CQ1ejY',
  },
  {
    titulo: 'Business Intelligence y Power BI',
    emisor: 'BDG Academy',
    año: '2024',
    link: 'https://certificados.bdginstitute.edu.co/',
  },
];

const About = () => (
  <Section id="about" title="Perfil" band>
    <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
      <Reveal className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
        <p>
          Estudié dos carreras en paralelo, Ingeniería de Sistemas e Ingeniería Multimedia, porque
          ninguna de las dos por separado explicaba lo que quería hacer.
        </p>
        <p>
          Eso se nota en cómo trabajo: discuto el índice de una consulta con el mismo interés con el
          que discuto si un botón se entiende. Busco un equipo donde me revisen el código y me
          exijan más de lo que me exijo yo.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="space-y-7 text-sm md:w-56">
          <div>
            <dt className="mb-3 font-semibold text-ink">Formación</dt>
            <dd className="space-y-3">
              <div className="border-l-2 border-sistemas pl-3">
                <p className="font-medium text-ink">Ingeniería de Sistemas</p>
                <p className="text-faint">2022 — 2026 · pendiente de grado</p>
              </div>
              <div className="border-l-2 border-multimedia pl-3">
                <p className="font-medium text-ink">Ingeniería Multimedia</p>
                <p className="text-faint">2021 — 2026 · pendiente de grado</p>
              </div>
              <p className="pt-1 text-muted">Universidad de San Buenaventura Cali</p>
            </dd>
          </div>

          <div>
            <dt className="mb-1.5 font-semibold text-ink">Idiomas</dt>
            <dd className="text-muted">Español nativo · Inglés B2</dd>
          </div>
        </dl>
      </Reveal>
    </div>

    <Reveal delay={0.12}>
      <div className="mt-14">
        <h3 className="mb-4 border-b border-line pb-2.5 text-sm font-semibold text-ink">
          Certificaciones
        </h3>
        <ul className="divide-y divide-line">
          {CREDENCIALES.map((c) => (
            <li key={c.titulo} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
              <span className="font-medium text-ink">{c.titulo}</span>
              <span className="text-sm text-muted">{c.emisor}</span>
              <span className="text-sm text-faint">{c.año}</span>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-multimedia hover:underline"
                >
                  Verificar <FaExternalLinkAlt size={10} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  </Section>
);

export default About;