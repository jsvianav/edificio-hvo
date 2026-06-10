import { motion } from 'framer-motion';
import { Overline } from './Overline';

const BENEFICIOS = [
  {
    n: '01',
    titulo: 'Totalmente amoblados',
    desc: 'Cama, escritorio, televisor, ventilador y todo lo necesario para vivir desde el primer día. Llegas y habitas.',
  },
  {
    n: '02',
    titulo: 'Atención 24 horas',
    desc: 'Alguien siempre disponible para atenderte, cualquier día de la semana, a cualquier hora. Sin contestadores.',
  },
  {
    n: '03',
    titulo: 'Ubicación inmejorable',
    desc: 'A pasos del Hospital Departamental Tomás Uribe, la zona comercial y el transporte público de Tuluá.',
  },
  {
    n: '04',
    titulo: 'Ambientes iluminados',
    desc: 'Pisos de porcelanato, buena luz natural y acabados cuidados. Espacios que se sienten bien habitados.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Beneficios() {
  return (
    <section id="beneficios" className="bg-superficie py-20 lg:py-32">
      <div className="contenedor">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Encabezado lateral */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Overline texto="Por qué HVO" className="mb-6" />
              <h2 className="font-display font-medium text-3xl lg:text-4xl leading-[1.12] tracking-[-0.01em] text-tinta mb-5">
                Pensado para llegar y&nbsp;vivir.
              </h2>
              <p className="font-sans text-sm lg:text-base text-suave leading-relaxed max-w-xs">
                Cada apartaestudio está resuelto en los detalles para que tú
                solo te ocupes de lo que viniste a hacer a Tuluá.
              </p>
            </div>
          </div>

          {/* Lista editorial numerada */}
          <div className="lg:col-span-7 lg:col-start-6">
            {BENEFICIOS.map((b, i) => (
              <motion.article
                key={b.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="group grid grid-cols-[3rem_1fr] gap-x-4 border-t border-linea py-8 lg:py-9 last:border-b"
              >
                <span className="etiqueta pt-2" aria-hidden="true">
                  {b.n}
                </span>
                <div>
                  <h3 className="font-display font-medium text-xl lg:text-2xl text-tinta mb-2.5 group-hover:text-acento transition-colors duration-300">
                    {b.titulo}
                  </h3>
                  <p className="font-sans text-sm lg:text-[15px] text-suave leading-relaxed max-w-lg">
                    {b.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
