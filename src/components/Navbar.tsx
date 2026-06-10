import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { waLink } from '../constants/negocio';
import { useTheme } from '../hooks/useTheme';

const LINKS = [
  { label: 'Apartaestudios', href: '#apartaestudios' },
  { label: 'Galería',        href: '#galeria' },
  { label: 'Ubicación',      href: '#ubicacion' },
  { label: 'Reseñas',        href: '#resenas' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [activo, setActivo]     = useState('');
  const { isDark, toggle }      = useTheme();

  // Progreso de lectura — hairline en acento bajo la navbar
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sección activa: observa el tercio central del viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActivo(e.target.id === 'inicio' ? '' : `#${e.target.id}`);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ['#inicio', ...LINKS.map((l) => l.href)].forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-fondo/95 backdrop-blur-sm border-b border-linea'
          : 'bg-fondo border-b border-transparent'
      }`}
    >
      <nav className="contenedor h-16 lg:h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <a href="#inicio" className="flex items-baseline gap-3 group" aria-label="Edificio HVO — inicio">
          <span className="font-display font-semibold text-[1.45rem] tracking-tight text-tinta leading-none">
            HVO
          </span>
          <span className="hidden sm:block etiqueta border-l border-linea pl-3">
            Edificio · Tuluá
          </span>
        </a>

        {/* Navegación desktop */}
        <ul className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-sans text-[13px] font-medium underline-offset-[6px] transition-colors duration-200 ${
                  activo === l.href
                    ? 'text-tinta underline decoration-acento'
                    : 'text-suave hover:text-tinta decoration-linea hover:underline'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Controles desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 text-suave hover:text-tinta transition-colors duration-200"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href={waLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-acento hover:bg-acento-fuerte text-acento-contraste text-[13px] font-medium tracking-wide px-5 py-2.5 rounded-full transition-colors duration-200"
            aria-label="Escríbenos por WhatsApp"
          >
            Escríbenos
          </a>
        </div>

        {/* Controles móvil */}
        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 text-suave hover:text-tinta transition-colors"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 text-tinta"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Progreso de lectura */}
      <motion.div
        style={{ scaleX: progreso }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-acento origin-left"
        aria-hidden="true"
      />

      {/* Menú móvil — entrada animada, cierre instantáneo (sin AnimatePresence) */}
      {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden bg-fondo border-t border-linea overflow-hidden"
          >
            <ul className="contenedor py-4 divide-y divide-linea">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    className="block py-3.5 font-sans text-sm text-tinta"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a
                  href={waLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center w-full bg-acento text-acento-contraste text-sm font-medium py-3.5 rounded-full"
                  aria-label="Escríbenos por WhatsApp"
                >
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
      )}
    </header>
  );
}
