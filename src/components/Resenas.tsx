import { motion } from 'framer-motion';
import { NEGOCIO } from '../constants/negocio';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TESTIMONIOS = [
  {
    nombre: 'Camila R.',
    texto:
      'Llegué a Tuluá por un tratamiento médico y el apartaestudio fue perfecto: todo amoblado, limpio y la atención fue inmediata.',
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
    <span className="font-sans text-xs tracking-[0.2em] text-acento" aria-label={`${n} estrellas de 5`}>
      {'★'.repeat(n)}
      <span className="text-linea">{'★'.repeat(5 - n)}</span>
    </span>
  );
}

function Firma({ t }: { t: (typeof TESTIMONIOS)[number] }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="font-sans text-sm text-tinta">
        {t.nombre}
        <span className="text-suave"> — {t.fuente}</span>
      </p>
      <Estrellas n={t.estrellas} />
    </div>
  );
}

export function Resenas() {
  const [destacado, ...resto] = TESTIMONIOS;

  return (
    <section id="resenas" className="bg-superficie py-20 lg:py-32">
      <div className="contenedor">

        {/* Encabezado con rating tipográfico */}
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <p className="etiqueta mb-6">Reseñas</p>
            <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.01em] text-tinta">
              Lo que dicen quienes ya viven aquí.
            </h2>
          </div>
          <div className="flex items-baseline gap-4">
            <p className="font-display font-medium text-5xl lg:text-6xl text-tinta leading-none">
              {NEGOCIO.rating.replace('.', ',')}
            </p>
            <div>
              <Estrellas n={Math.round(parseFloat(NEGOCIO.rating))} />
              <p className="font-sans text-xs text-suave mt-1">
                Promedio en Google · {NEGOCIO.ratingCount} reseñas
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 border-t border-linea pt-12 lg:pt-16">

          {/* Cita destacada */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:col-span-6 flex flex-col justify-between gap-10"
          >
            <p className="font-display italic font-normal text-2xl lg:text-[2rem] leading-[1.3] text-tinta">
              “{destacado.texto}”
            </p>
            <footer>
              <Firma t={destacado} />
            </footer>
          </motion.blockquote>

          {/* Citas secundarias */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-10">
            {resto.map((t, i) => (
              <motion.blockquote
                key={t.nombre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: EASE }}
                className="border-t border-linea pt-8 first:border-t-0 first:pt-0"
              >
                <p className="font-sans text-sm lg:text-[15px] text-suave leading-relaxed mb-5">
                  “{t.texto}”
                </p>
                <footer>
                  <Firma t={t} />
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <p className="font-sans text-xs text-suave/70 mt-12 italic">
          * Testimonios de ejemplo — reemplazar con reseñas reales de Google.
        </p>
      </div>
    </section>
  );
}
