import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { waLink } from '../constants/negocio';
import { useTheme } from '../hooks/useTheme';

const LINKS = [
  { label: 'Inicio',           href: '#inicio' },
  { label: 'Apartaestudios',   href: '#apartaestudios' },
  { label: 'Galería',          href: '#galeria' },
  { label: 'Ubicación',        href: '#ubicacion' },
  { label: 'Contacto',         href: '#contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { isDark, toggle }      = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-piedra-100 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-1 group" aria-label="Edificio HVO inicio">
          <span className="font-poppins font-700 text-xl tracking-tight text-carbon dark:text-white group-hover:text-turquesa-600 transition-colors">
            Edificio
          </span>
          <span className="font-poppins font-800 text-xl tracking-tight text-turquesa-500">
            HVO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-turquesa-400 ml-0.5 mt-0.5" aria-hidden="true" />
        </a>

        {/* Navegación desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-inter text-sm font-medium text-carbon/70 dark:text-white/70 hover:text-turquesa-600 dark:hover:text-turquesa-400 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-turquesa-400 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Controles desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-xl text-carbon/70 dark:text-white/70 hover:text-turquesa-600 dark:hover:text-turquesa-400 hover:bg-turquesa-50 dark:hover:bg-white/10 transition-colors"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href={waLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-whatsapp hover:bg-green-500 text-white text-sm font-inter font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Escríbenos por WhatsApp"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        {/* Controles móvil */}
        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 rounded-xl text-carbon dark:text-white hover:text-turquesa-600 dark:hover:text-turquesa-400 hover:bg-turquesa-50 dark:hover:bg-white/10 transition-colors"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 rounded-xl text-carbon dark:text-white hover:text-turquesa-600 hover:bg-turquesa-50 dark:hover:bg-white/10 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-piedra-100 dark:border-white/10 overflow-hidden"
          >
            <ul className="px-4 py-3 space-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    className="block py-2.5 px-3 rounded-xl font-inter text-sm font-medium text-carbon/80 dark:text-white/80 hover:text-turquesa-600 dark:hover:text-turquesa-400 hover:bg-turquesa-50 dark:hover:bg-white/10 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={waLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full bg-whatsapp text-white text-sm font-inter font-semibold py-3 rounded-xl transition-all"
                  aria-label="Escríbenos por WhatsApp"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
