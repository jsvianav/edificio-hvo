import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { waLink } from '../constants/negocio';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { delay, duration: 0.7, ease: EASE },
  }),
};

// Líneas del titular — composición fija, se revelan una a una
const LINEAS = [
  <>Apartaestudios</>,
  <><em className="font-normal italic text-acento">amoblados</em> en el</>,
  <>corazón de Tuluá.</>,
];

const DATOS = [
  { n: '01', label: 'Atención 24 horas' },
  { n: '02', label: 'Totalmente amoblados' },
  { n: '03', label: 'Cocina propia o común' },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const sinMovimiento = useReducedMotion();

  // Parallax sutil: la fachada se desplaza más lento que el scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ['-4%', '8%']);
  const y = sinMovimiento ? '0%' : parallax;

  return (
    <section ref={ref} id="inicio" className="relative bg-fondo overflow-hidden">

      {/* Fachada a sangre: cubre la mitad derecha y se funde hacia el centro */}
      {IMGS.heroEdificio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1.2, ease: EASE }}
          className="hidden lg:block absolute inset-y-0 right-0 w-[52%] overflow-hidden"
          aria-hidden="true"
        >
          <motion.div style={{ y }} className="absolute inset-0">
            <img
              src={IMGS.heroEdificio}
              alt=""
              className="w-full h-full object-cover object-center scale-[1.12]"
              fetchPriority="high"
            />
          </motion.div>
          <div className="absolute inset-0 fundido-hero" />
        </motion.div>
      )}

      <div className="contenedor relative z-10 pt-28 lg:pt-44 pb-14 lg:pb-16">
        <div className="lg:w-1/2">
          <motion.p
            custom={0.05}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="etiqueta mb-7"
          >
            Edificio HVO — Tuluá, Valle del Cauca
          </motion.p>

          {/* Titular: revelado línea por línea */}
          <h1 className="font-display font-medium text-[clamp(2.7rem,6.5vw,4.7rem)] leading-[1.06] tracking-[-0.015em] text-tinta mb-7">
            {LINEAS.map((linea, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block pb-[0.08em] -mb-[0.08em]"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.13, duration: 0.9, ease: EASE }}
                >
                  {linea}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-sans text-base lg:text-lg text-suave leading-relaxed max-w-md mb-10"
          >
            Llega con tu maleta y nada más: cama, escritorio, baño privado
            y alguien que te atiende a cualquier hora, todos los días.
          </motion.p>

          <motion.div
            custom={0.75}
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

        {/* Figura en móvil/tablet — en escritorio la fachada va a sangre */}
        <motion.figure
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:hidden mt-12"
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

        {/* Índice de datos */}
        <motion.dl
          custom={0.9}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid sm:grid-cols-3 lg:grid-cols-4 border-t border-linea mt-16 lg:mt-28"
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
          {/* Pie de foto editorial — solo escritorio, cierra la fila */}
          <div className="hidden lg:flex items-baseline justify-end gap-3 py-5">
            <span className="etiqueta">Fig. 01</span>
            <span className="font-sans text-sm text-suave">Fachada del edificio</span>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
