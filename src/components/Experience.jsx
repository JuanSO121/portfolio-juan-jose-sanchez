import Section, { Reveal } from './ui/Section';

const EXPERIENCIA = [
  {
    empresa: 'Gobernación del Valle del Cauca',
    area: 'Secretaría General',
    cargo: 'Desarrollador de software · Práctica profesional',
    // AJUSTA el mes de salida si no fue junio.
    periodo: 'May — Sep 2026',
    actual: false,
    logros: [
      'Llevé a producción dos plataformas que hoy usan funcionarios y ciudadanos: una de formación interna y un micrositio público de rendición de cuentas.',
      'Reemplacé el proceso de votación institucional en papel por una aplicación web con arquitectura en capas, caché con invalidación y control de concurrencia.',
      'Traduje requerimientos de varias áreas en decisiones técnicas concretas, negociando alcance cuando los lineamientos institucionales y lo viable no coincidían.',
    ],
  },
];

const Experience = () => (
  <Section id="experience" title="Experiencia" band>
    <ol className="space-y-10">
      {EXPERIENCIA.map((job) => (
        <li key={job.empresa}>
          <Reveal>
            <article>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl font-bold text-ink">{job.empresa}</h3>
                <p className="flex items-center gap-2 text-sm text-muted">
                  {job.actual && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sistemas" aria-hidden="true" />
                  )}
                  {job.periodo}
                </p>
              </div>

              <p className="mt-1.5 text-sm text-muted">
                {job.cargo} · {job.area}
              </p>

              <ul className="mt-6 space-y-3">
                {job.logros.map((logro) => (
                  <li key={logro} className="flex gap-3 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 flex-none rounded-full bg-faint"
                    />
                    <span className="max-w-prose leading-relaxed">{logro}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-faint">
                El detalle técnico de estos proyectos está arriba, en Valle Humanitario y Savia.
              </p>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;