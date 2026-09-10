import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  );

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  // Marca de tiempo del último gesto real de scroll. Un desplazamiento
  // programático —un ancla, scrollIntoView— nunca dispara wheel ni
  // touchmove, así que esto distingue "el usuario está bajando" de "la
  // página se está moviendo sola" sin adivinar con temporizadores.
  const lastGesture = useRef(0);

  // Se esconde al bajar y vuelve al subir: devuelve 64px de alto útil
  // mientras se lee, sin obligar a ir hasta arriba para navegar.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const gestureReciente = Date.now() - lastGesture.current < 250;
      if (gestureReciente && Math.abs(y - lastY.current) > 6) {
        setHidden(y > 160 && y > lastY.current);
      }

      lastY.current = y;
    };

    const marcarGesto = () => {
      lastGesture.current = Date.now();
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', marcarGesto, { passive: true });
    window.addEventListener('touchmove', marcarGesto, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', marcarGesto);
      window.removeEventListener('touchmove', marcarGesto);
    };
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

  // Escape cierra, el fondo no hace scroll y el tabulador se queda
  // dentro del panel: sin esto, Tab lleva a enlaces que están detrás y
  // que nadie puede ver.
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const items = panelRef.current?.querySelectorAll('a[href], button');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a[href]')?.focus();

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
      <motion.header
        animate={{ y: hidden && !open && !reduce ? '-100%' : '0%' }}
        transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : ''
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#main"
            aria-label="Volver al inicio"
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <img src="/JS.svg" alt="" aria-hidden="true" className="h-7 w-7" />
            <span className="gradient-text">JJSO</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {MENU.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
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
            <a
              href="/Juan_Jose_Sanchez_CV.pdf"
              download
              className="hidden rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-multimedia hover:text-multimedia lg:inline-flex"
            >
              Hoja de vida
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? 'Activar tema claro' : 'Activar tema oscuro'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
            >
              {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
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
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
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