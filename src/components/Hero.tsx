import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { waLink } from '../constants/negocio';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: EASE },
  }),
};

const DATOS = [
  { n: '01', label: 'Atención 24 horas' },
  { n: '02', label: 'Totalmente amoblados' },
  { n: '03', label: 'Cocina propia o común' },
];

export function Hero() {
  return (
    <section id="inicio" className="bg-fondo pt-28 lg:pt-40 pb-14 lg:pb-20">
      <div className="contenedor">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">

          {/* Columna editorial */}
          <div className="lg:col-span-7">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="etiqueta mb-7"
            >
              Edificio HVO — Tuluá, Valle del Cauca
            </motion.p>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display font-medium text-[clamp(2.7rem,6.5vw,4.7rem)] leading-[1.04] tracking-[-0.015em] text-tinta mb-7"
            >
              Apartaestudios{' '}
              <em className="font-normal italic text-acento">amoblados</em>
              <br className="hidden sm:block" />{' '}
              en el corazón de Tuluá.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-base lg:text-lg text-suave leading-relaxed max-w-md mb-10"
            >
              Llega con tu maleta y nada más: cama, escritorio, baño privado
              y alguien que te atiende a cualquier hora, todos los días.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a
                href={waLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-acento hover:bg-acento-fuerte text-acento-contraste font-sans font-medium text-sm tracking-wide px-7 py-3.5 rounded-full transition-colors duration-200"
                aria-label="Quiero arrendar — escríbenos por WhatsApp"
              >
                Escríbenos por WhatsApp
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#apartaestudios"
                className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-tinta"
              >
                <span className="border-b border-linea group-hover:border-tinta transition-colors duration-200 pb-0.5">
                  Ver los apartaestudios
                </span>
                <ArrowDown size={14} className="text-suave group-hover:text-tinta transition-colors" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Fotografía con pie editorial */}
          <motion.figure
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden">
              {IMGS.heroEdificio ? (
                <img
                  src={IMGS.heroEdificio}
                  alt="Fachada del Edificio HVO en Tuluá, Valle del Cauca"
                  className="w-full aspect-[4/5] object-cover object-center"
                  fetchPriority="high"
                />
              ) : (
                <ImagePlaceholder
                  label="Fachada del edificio — hero-edificio.jpg"
                  className="w-full"
                  aspectRatio="4/5"
                />
              )}
            </div>
            <figcaption className="flex items-baseline justify-between gap-4 border-t border-linea mt-4 pt-3">
              <span className="font-sans text-xs text-suave">
                Fachada del edificio — Cl 25 # 38-17, centro de Tuluá
              </span>
              <span className="etiqueta shrink-0">Fig. 01</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Índice de datos — reemplaza los badges */}
        <motion.dl
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid sm:grid-cols-3 border-t border-linea mt-16 lg:mt-20"
        >
          {DATOS.map((d) => (
            <div
              key={d.n}
              className="flex items-baseline gap-3 py-5 sm:pr-8 border-b border-linea sm:border-b-0 last:border-b-0"
            >
              <dt className="etiqueta">{d.n}</dt>
              <dd className="font-sans text-sm text-tinta">{d.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
