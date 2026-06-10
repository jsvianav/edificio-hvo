import { motion } from 'framer-motion';
import { NEGOCIO, waLink } from '../constants/negocio';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LINKS = [
  { label: 'Inicio',         href: '#inicio' },
  { label: 'Apartaestudios', href: '#apartaestudios' },
  { label: 'Galería',        href: '#galeria' },
  { label: 'Ubicación',      href: '#ubicacion' },
  { label: 'Contacto',       href: '#contacto' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-fondo border-t border-linea pt-16 pb-10">
      <div className="contenedor">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 pb-14">

          {/* Marca */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display font-semibold text-2xl tracking-tight text-tinta leading-none">
                HVO
              </span>
              <span className="etiqueta border-l border-linea pl-3">Edificio</span>
            </div>
            <p className="font-sans text-sm text-suave leading-relaxed max-w-xs">
              Apartaestudios amoblados en el corazón de Tuluá. Comodidad,
              independencia y atención las 24 horas.
            </p>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-4 lg:col-start-7">
            <h3 className="etiqueta mb-6">Contacto</h3>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-suave">{NEGOCIO.direccion}</li>
              <li>
                <a
                  href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`}
                  className="font-sans text-sm text-tinta hover:text-acento transition-colors duration-200"
                >
                  {NEGOCIO.telefono}
                </a>
              </li>
              <li className="font-sans text-sm text-suave">{NEGOCIO.horario}</li>
              <li className="pt-1">
                <a
                  href={waLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium text-acento hover:text-acento-fuerte transition-colors duration-200"
                >
                  Escríbenos por WhatsApp ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-2 lg:col-start-11">
            <h3 className="etiqueta mb-6">Índice</h3>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-sm text-suave hover:text-tinta transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark editorial gigante */}
        <div className="overflow-hidden" aria-hidden="true">
          <motion.p
            initial={{ y: '35%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display font-medium text-[clamp(2.5rem,13.5vw,11rem)] leading-[0.95] tracking-[-0.03em] text-linea text-center whitespace-nowrap select-none pb-2"
          >
            Edificio HVO
          </motion.p>
        </div>

        {/* Cierre */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2 border-t border-linea pt-6">
          <p className="font-sans text-xs text-suave/80">
            © {year} Edificio HVO. Todos los derechos reservados.
          </p>
          <p className="etiqueta">Tuluá · Valle del Cauca · Colombia</p>
        </div>
      </div>
    </footer>
  );
}
