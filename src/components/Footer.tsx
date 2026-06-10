import { MapPin, Phone, Clock } from 'lucide-react';
import { NEGOCIO, waLink } from '../constants/negocio';

const LINKS = [
  { label: 'Inicio',           href: '#inicio' },
  { label: 'Apartaestudios',   href: '#apartaestudios' },
  { label: 'Galería',          href: '#galeria' },
  { label: 'Ubicación',        href: '#ubicacion' },
  { label: 'Contacto',         href: '#contacto' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-carbon text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/10">

          {/* Marca */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="font-poppins font-700 text-xl text-white">Edificio</span>
              <span className="font-poppins font-800 text-xl text-turquesa-400">HVO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-turquesa-400 ml-0.5 mt-0.5" />
            </div>
            <p className="font-inter text-sm text-white/55 leading-relaxed max-w-xs">
              Apartaestudios amoblados en el corazón de Tuluá. Comodidad, independencia y atención las 24 horas.
            </p>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-poppins font-600 text-sm uppercase tracking-widest text-turquesa-400 mb-5">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start">
                <MapPin size={15} className="text-turquesa-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-white/60">{NEGOCIO.direccion}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={15} className="text-turquesa-400 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`}
                  className="font-inter text-sm text-white/60 hover:text-turquesa-300 transition-colors"
                >
                  {NEGOCIO.telefono}
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Clock size={15} className="text-turquesa-400 shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-white/60">{NEGOCIO.horario}</span>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-poppins font-600 text-sm uppercase tracking-widest text-turquesa-400 mb-5">
              Navegación
            </h3>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-inter text-sm text-white/55 hover:text-turquesa-300 transition-colors"
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
                  className="font-inter text-sm text-whatsapp hover:text-green-300 transition-colors font-medium"
                >
                  → Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="font-inter text-xs text-white/30">
            © {year} Edificio HVO. Todos los derechos reservados.
          </p>
          <p className="font-inter text-xs text-white/25">
            Tuluá, Valle del Cauca, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
