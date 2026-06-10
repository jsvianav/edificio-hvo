import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { NEGOCIO } from '../constants/negocio';

const TESTIMONIOS = [
  {
    nombre: 'Camila R.',
    texto:
      'Llegué a Tuluá por un tratamiento médico y el apartaestudio fue perfecto: todo amoblado, limpio y la atención fue inmediata. Muy recomendado.',
    estrellas: 5,
    fuente: 'Google Maps',
  },
  {
    nombre: 'Andrés M.',
    texto:
      'Excelente ubicación, a dos cuadras del hospital. El espacio es cómodo, bien iluminado y el precio es justo. Sin duda volvería.',
    estrellas: 5,
    fuente: 'Google Maps',
  },
  {
    nombre: 'Laura T.',
    texto:
      'La cocina compartida es muy práctica y siempre está limpia. Ideal para estudiantes. Muy buen ambiente y atención 24 horas real.',
    estrellas: 4,
    fuente: 'Google Maps',
  },
];

function Estrellas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} estrellas de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? 'text-amber-400 fill-amber-400' : 'text-piedra-200 dark:text-gray-700'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Resenas() {
  return (
    <section id="resenas" className="bg-white dark:bg-gray-900 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado + badge de rating */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">
          <div>
            <span className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500 mb-3">
              Lo que dicen nuestros huéspedes
            </span>
            <h2 className="font-poppins font-700 text-3xl sm:text-4xl text-carbon dark:text-white">
              Reseñas reales
            </h2>
          </div>

          {/* Badge de calificación */}
          <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700/30 rounded-2xl px-6 py-4 shrink-0">
            <div className="text-center">
              <p className="font-poppins font-800 text-3xl text-carbon dark:text-white">{NEGOCIO.rating}</p>
              <Estrellas n={Math.round(parseFloat(NEGOCIO.rating))} />
              <p className="font-inter text-xs text-carbon/50 dark:text-white/50 mt-1">{NEGOCIO.ratingCount} reseñas · Google</p>
            </div>
          </div>
        </div>

        {/* Tarjetas de testimonios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => (
            <motion.div
              key={t.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-bruma dark:bg-gray-800 rounded-2xl p-7 border border-piedra-100 dark:border-white/10 flex flex-col gap-4"
            >
              <Estrellas n={t.estrellas} />
              <p className="font-inter text-carbon/75 dark:text-white/75 text-sm leading-relaxed flex-1 italic">
                "{t.texto}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-poppins font-600 text-carbon dark:text-white text-sm">{t.nombre}</p>
                  <p className="font-inter text-xs text-piedra-400 dark:text-gray-500">{t.fuente}</p>
                </div>
                <span className="text-xs font-inter text-piedra-300 dark:text-gray-600 italic">
                  * Ejemplo — reemplazar con reseña real
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
