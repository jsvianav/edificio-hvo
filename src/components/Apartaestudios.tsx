import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, MessageCircle, UtensilsCrossed, Lock } from 'lucide-react';
import { INCLUIDOS_BASE, waLink } from '../constants/negocio';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

interface ModalidadProps {
  tipo: 'propia' | 'comun';
  featured?: boolean;
  delay?: number;
}

const DATA = {
  propia: {
    titulo: 'Con cocina propia',
    subtitulo: 'Privada e integrada',
    descripcion:
      'Tu apartaestudio cuenta con cocina integrada de uso exclusivo. Prepara tus comidas con total independencia, sin horarios ni turnos.',
    extras: ['Cocina privada integrada', 'Independencia total', 'Ideal para estadías largas'],
    badge: 'Mayor privacidad',
    badgeColor: 'bg-turquesa-500 text-white',
    imagenSlot: 'apto-cocina-propia.jpg — apartaestudio amoblado con cocina integrada (800×600)',
    imagenSrc: IMGS.aptoCocinaPropia,
    imagenAlt: 'Apartaestudio con cocina propia integrada en el Edificio HVO',
    waMsg: 'cocinaPropias' as const,
    icono: <Lock size={18} />,
  },
  comun: {
    titulo: 'Con cocina común',
    subtitulo: 'Compartida del edificio',
    descripcion:
      'Accede a la cocina común del edificio, equipada y limpia. Opción práctica y económica, ideal para estancias cortas o quienes prefieren gastar menos.',
    extras: ['Cocina compartida del edificio', 'Opción más económica', 'Ideal para estudiantes'],
    badge: 'Más económico',
    badgeColor: 'bg-piedra-500 text-white',
    imagenSlot: 'apto-cocina-comun.jpg — apartaestudio amoblado (modalidad cocina compartida) (800×600)',
    imagenSrc: IMGS.aptoCocinaComun,
    imagenAlt: 'Apartaestudio con cocina común del edificio HVO',
    waMsg: 'cocinaComun' as const,
    icono: <UtensilsCrossed size={18} />,
  },
};

function TarjetaModalidad({ tipo, featured = false, delay = 0 }: ModalidadProps) {
  const d = DATA[tipo];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${
        featured
          ? 'border-turquesa-300 dark:border-turquesa-600 shadow-xl shadow-turquesa-100 dark:shadow-turquesa-900/20'
          : 'border-piedra-200 dark:border-white/10 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Badge destacado */}
      {featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-turquesa-500 text-white text-xs font-inter font-semibold px-3 py-1 rounded-full shadow">
            Más solicitado
          </span>
        </div>
      )}

      {/* Imagen de la modalidad */}
      <div className="relative">
        {d.imagenSrc ? (
          <img
            src={d.imagenSrc}
            alt={d.imagenAlt}
            className="w-full aspect-[4/3] object-cover object-center"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder
            label={d.imagenSlot}
            className="w-full"
            aspectRatio="4/3"
          />
        )}
        {/* Badge tipo */}
        <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shadow ${d.badgeColor}`}>
          {d.icono}
          {d.badge}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-7 bg-white dark:bg-gray-900">
        <div className="mb-1">
          <span className="font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500">
            {d.subtitulo}
          </span>
        </div>
        <h3 className="font-poppins font-700 text-2xl text-carbon dark:text-white mb-3">
          {d.titulo}
        </h3>
        <p className="font-inter text-carbon/65 dark:text-white/65 text-sm leading-relaxed mb-6">
          {d.descripcion}
        </p>

        {/* Lista de incluidos base */}
        <div className="mb-4">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-piedra-500 dark:text-gray-400 mb-3">
            Incluye en ambas modalidades
          </p>
          <ul className="grid grid-cols-1 gap-1.5">
            {INCLUIDOS_BASE.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={14} className="text-turquesa-500 shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-carbon/75 dark:text-white/75">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Extras específicos de esta modalidad */}
        <div className="mb-6 border-t border-piedra-100 dark:border-white/10 pt-4">
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-piedra-500 dark:text-gray-400 mb-3">
            Características propias
          </p>
          <ul className="space-y-1.5">
            {d.extras.map((e) => (
              <li key={e} className="flex items-center gap-2">
                <Check size={14} className="text-turquesa-500 shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm font-medium text-carbon dark:text-white">{e}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={waLink(d.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-inter font-semibold text-sm transition-all duration-200 ${
              featured
                ? 'bg-whatsapp hover:bg-green-400 text-white shadow-md hover:shadow-lg'
                : 'bg-turquesa-50 dark:bg-turquesa-900/30 hover:bg-turquesa-500 text-turquesa-700 dark:text-turquesa-300 hover:text-white border border-turquesa-200 dark:border-turquesa-700 hover:border-transparent'
            }`}
            aria-label={`Consultar disponibilidad: apartaestudio ${d.titulo}`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Apartaestudios() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="apartaestudios" className="bg-bruma dark:bg-gray-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500 mb-3">
            Elige tu modalidad
          </span>
          <h2 className="font-poppins font-700 text-3xl sm:text-4xl text-carbon dark:text-white mb-4">
            Nuestros apartaestudios
          </h2>
          <p className="font-inter text-carbon/60 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
            Dos opciones pensadas para distintas necesidades — ambas completamente amobladas y listas para habitar.
          </p>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TarjetaModalidad tipo="propia" featured delay={0} />
          <TarjetaModalidad tipo="comun" delay={0.1} />
        </div>
      </div>
    </section>
  );
}
