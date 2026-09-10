import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SOCIAL = [
  { href: 'https://github.com/JuanSO121', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/jjsanchezo', label: 'LinkedIn', Icon: FaLinkedin },
];

const EMAIL = 'jj.sanchezocampo@gmail.com';

/**
 * Anclas fijas a los márgenes: entre la portada y el cierre hay cuatro
 * pantallas de scroll sin ninguna forma de contactar. Solo aparecen a
 * partir de xl, donde el margen lateral es lo bastante ancho para que
 * no invadan el contenido.
 */
const SideRail = () => (
  <>
    <div className="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-6 xl:flex">
      {SOCIAL.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-faint transition-all duration-200 hover:-translate-y-0.5 hover:text-multimedia"
        >
          <Icon size={18} />
        </a>
      ))}
      <span aria-hidden="true" className="h-24 w-px bg-line" />
    </div>

    <div className="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-6 xl:flex">
      <a
        href={`mailto:${EMAIL}`}
        className="text-xs tracking-[0.15em] text-faint transition-colors hover:text-multimedia"
        style={{ writingMode: 'vertical-rl' }}
      >
        {EMAIL}
      </a>
      <span aria-hidden="true" className="h-24 w-px bg-line" />
    </div>
  </>
);

export default SideRail;