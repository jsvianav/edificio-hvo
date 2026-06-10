import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { INCLUIDOS_BASE, waLink } from '../constants/negocio';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MODALIDADES = [
  {
    n: 'A',
    titulo: 'Con cocina propia',
    descripcion:
      'Tu apartaestudio cuenta con cocina integrada de uso exclusivo. Prepara tus comidas con total independencia, sin horarios ni turnos.',
    extras: ['Cocina privada integrada', 'Independencia total', 'Ideal para estadías largas'],
    nota: 'El más solicitado',
    imagenSlot: 'apto-cocina-propia.jpg — apartaestudio con cocina integrada',
    imagenSrc: IMGS.aptoCocinaPropia,
    imagenAlt: 'Apartaestudio con cocina propia integrada en el Edificio HVO',
    waMsg: 'cocinaPropias' as const,
    reverse: false,
  },
  {
    n: 'B',
    titulo: 'Con cocina común',
    descripcion:
      'Accede a la cocina común del edificio, equipada y limpia. Una opción práctica y económica, ideal para estancias cortas o para gastar menos.',
    extras: ['Cocina compartida equipada', 'La opción más económica', 'Ideal para estudiantes'],
    nota: null,
    imagenSlot: 'apto-cocina-comun.jpg — apartaestudio modalidad cocina compartida',
    imagenSrc: IMGS.aptoCocinaComun,
    imagenAlt: 'Apartaestudio con cocina común del Edificio HVO',
    waMsg: 'cocinaComun' as const,
    reverse: true,
  },
];

export function Apartaestudios() {
  return (
    <section id="apartaestudios" className="bg-fondo py-20 lg:py-32">
      <div className="contenedor">

        {/* Encabezado asimétrico */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="etiqueta mb-6">Los apartaestudios</p>
            <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.01em] text-tinta">
              Dos modalidades,{' '}
              <em className="font-normal italic text-acento">una sola</em>{' '}
              forma de vivir bien.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 font-sans text-sm lg:text-[15px] text-suave leading-relaxed">
            Ambas completamente amobladas y listas para habitar. La diferencia
            está en la cocina — tú eliges según tu estadía y tu presupuesto.
          </p>
        </div>

        {/* Franja: lo que incluyen todos */}
        <div className="border-y border-linea py-7 mb-16 lg:mb-20">
          <p className="etiqueta mb-5">Todos los apartaestudios incluyen</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2.5">
            {INCLUIDOS_BASE.map((item) => (
              <li key={item} className="font-sans text-sm text-tinta leading-snug">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Fichas alternadas */}
        <div className="space-y-20 lg:space-y-28">
          {MODALIDADES.map((m) => (
            <motion.article
              key={m.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Imagen */}
              <figure className={`lg:col-span-6 ${m.reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <div className="overflow-hidden">
                  {m.imagenSrc ? (
                    <img
                      src={m.imagenSrc}
                      alt={m.imagenAlt}
                      className="w-full aspect-[4/3] object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder label={m.imagenSlot} className="w-full" aspectRatio="4/3" />
                  )}
                </div>
              </figure>

              {/* Ficha */}
              <div className={`lg:col-span-5 ${m.reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                <div className="flex items-baseline justify-between gap-4 mb-6">
                  <p className="etiqueta">Modalidad {m.n}</p>
                  {m.nota && (
                    <p className="shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-acento">
                      {m.nota}
                    </p>
                  )}
                </div>

                <h3 className="font-display font-medium text-3xl lg:text-4xl tracking-[-0.01em] text-tinta mb-4">
                  {m.titulo}
                </h3>
                <p className="font-sans text-sm lg:text-[15px] text-suave leading-relaxed mb-8">
                  {m.descripcion}
                </p>

                <ul className="mb-9">
                  {m.extras.map((e) => (
                    <li
                      key={e}
                      className="flex items-baseline gap-3 border-t border-linea py-3 last:border-b"
                    >
                      <span className="text-acento leading-none" aria-hidden="true">—</span>
                      <span className="font-sans text-sm text-tinta">{e}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(m.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-acento hover:bg-acento-fuerte text-acento-contraste font-sans font-medium text-sm tracking-wide px-7 py-3.5 rounded-full transition-colors duration-200"
                  aria-label={`Consultar disponibilidad: apartaestudio ${m.titulo}`}
                >
                  Consultar disponibilidad
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
