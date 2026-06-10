import { motion } from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';
import { waLink, NEGOCIO } from '../constants/negocio';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LINEAS = [
  <>¿Listo para mudarte?</>,
  <em className="font-normal italic text-petroleo-claro">Agenda tu visita hoy.</em>,
];

export function CTAFinal() {
  return (
    <section id="contacto" className="bg-petroleo-oscuro py-24 lg:py-36">
      <div className="contenedor">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-petroleo-claro mb-8">
            Contacto — Atención 24 horas
          </p>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              {/* whileInView va en el h2 (sin clip) y propaga variants a las líneas:
                  el span enmascarado nunca "entra en vista" para IntersectionObserver */}
              <motion.h2
                initial="oculto"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
                className="font-display font-medium text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.06] tracking-[-0.015em] text-marfil"
              >
                {LINEAS.map((linea, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block pb-[0.08em] -mb-[0.08em]"
                      variants={{
                        oculto:  { y: '110%' },
                        visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
                      }}
                    >
                      {linea}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <a
                href={waLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-marfil hover:bg-white text-petroleo-oscuro font-sans font-medium text-sm tracking-wide px-7 py-3.5 rounded-full transition-colors duration-200"
                aria-label="Contactar por WhatsApp para arrendar en Edificio HVO"
              >
                Escríbenos por WhatsApp
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 font-sans text-sm text-marfil/70 hover:text-marfil transition-colors duration-200 px-1"
                aria-label={`Llamar al ${NEGOCIO.telefono}`}
              >
                <Phone size={14} aria-hidden="true" />
                {NEGOCIO.telefono}
              </a>
            </div>
          </div>

          <p className="font-sans text-sm text-marfil/55 leading-relaxed max-w-md border-t border-marfil/15 mt-14 pt-6">
            Resolvemos tus dudas y te mostramos el apartaestudio que mejor
            se adapta a ti — cualquier día, a cualquier hora.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
