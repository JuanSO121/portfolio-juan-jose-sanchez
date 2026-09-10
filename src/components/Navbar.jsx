import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';

const MENU = [
  { name: 'Proyectos', href: '#projects' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Tecnologías', href: '#skills' },
  { name: 'Perfil', href: '#about' },
  { name: 'Contacto', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  );

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = MENU.map((i) => document.getElementById(i.href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : ''
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#main" className="flex items-center gap-2 font-display text-lg font-bold">
            <img src="/JS.svg" alt="" aria-hidden="true" className="h-7 w-7" />
            <span className="gradient-text">Juan José Sánchez</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {MENU.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-1 text-sm transition-colors ${
                      isActive ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-multimedia"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? 'Activar tema claro' : 'Activar tema oscuro'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
            >
              {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              {open ? <FaTimes size={15} /> : <FaBars size={15} />}
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-multimedia to-sistemas"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-bg lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4 sm:px-8">
              {MENU.map((item) => (
                <li key={item.name} className="border-b border-line last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-xl font-semibold ${
                      active === item.href.slice(1) ? 'text-multimedia' : 'text-ink'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-8 sm:px-8">
              <a href="/Juan_Jose_Sanchez_CV.pdf" download className="btn-ghost w-full">
                Descargar hoja de vida
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;