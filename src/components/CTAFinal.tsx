import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { waLink, NEGOCIO } from '../constants/negocio';

export function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative bg-turquesa-600 py-20 lg:py-28 overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-turquesa-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-turquesa-800/30 blur-3xl" />
        {/* Patrón de puntos */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-cta" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-cta)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-inter text-turquesa-200 text-sm font-semibold tracking-widest uppercase mb-4">
            Da el siguiente paso
          </p>
          <h2 className="font-poppins font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
            ¿Listo para mudarte?
            <br />
            <span className="text-turquesa-200">Escríbenos y agenda tu visita hoy.</span>
          </h2>
          <p className="font-inter text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Atención <strong className="text-white">24 horas</strong>. Resolvemos todas tus dudas y te mostramos el apartaestudio que mejor se adapta a ti.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-whatsapp hover:bg-green-400 text-white font-poppins font-700 text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              aria-label="Contactar por WhatsApp para arrendar en Edificio HVO"
            >
              <MessageCircle size={22} aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
            <a
              href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-white text-white font-inter font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200 w-full sm:w-auto justify-center hover:bg-white/10"
              aria-label={`Llamar al ${NEGOCIO.telefono}`}
            >
              <Phone size={18} aria-hidden="true" />
              {NEGOCIO.telefono}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
