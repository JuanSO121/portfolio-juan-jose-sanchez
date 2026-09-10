import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { Reveal } from './ui/Section';

const CONTACTO = [
  {
    icon: FaEnvelope,
    label: 'Correo',
    value: 'jj.sanchezocampo@gmail.com',
    href: 'mailto:jj.sanchezocampo@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+57 316 447 5039',
    href: 'https://wa.me/573164475039',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/jjsanchezo',
    href: 'https://www.linkedin.com/in/jjsanchezo',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/JuanSO121',
    href: 'https://github.com/JuanSO121',
  },
];

const Contact = () => (
  <footer
    id="contact"
    className="flex min-h-[calc(100svh-4rem)] items-center border-t border-line bg-surface/50"
  >
    <div className="mx-auto w-full max-w-6xl px-5 pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(1.25rem,3vh,2.25rem)] sm:px-8">
      <Reveal>
        <h2 className="max-w-3xl text-display-md font-extrabold text-ink">
          Busco mi primer trabajo como desarrollador.
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
          Estoy disponible desde ya. Si tienes una vacante, o solo quieres preguntarme cómo hice
          algo de lo de arriba, escríbeme. Respondo el mismo día.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="mailto:jj.sanchezocampo@gmail.com" className="btn-primary">
            <FaEnvelope size={14} /> Escribirme un correo
          </a>
          <a href="/Juan_Jose_Sanchez_CV.pdf" download className="btn-ghost">
            Descargar hoja de vida
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-16 grid gap-x-10 border-t border-line sm:grid-cols-2">
          {CONTACTO.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="border-b border-line">
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4"
              >
                <Icon aria-hidden="true" className="flex-none text-lg text-multimedia" />
                <span className="w-20 flex-none text-sm text-faint">{label}</span>
                <span className="min-w-0 break-all font-medium text-ink transition-colors group-hover:text-multimedia">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="mt-12 text-sm text-faint">
          Cali, Colombia · © {new Date().getFullYear()} Juan José Sánchez Ocampo · Construido con
          React, Vite y Tailwind CSS, desplegado en Vercel
        </p>
      </Reveal>
    </div>
  </footer>
);

export default Contact;