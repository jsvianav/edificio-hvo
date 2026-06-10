import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown, Clock, MapPin, Sofa, UtensilsCrossed } from 'lucide-react';
import { waLink } from '../constants/negocio';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const BADGES = [
  { label: 'Totalmente amoblados', icon: <Sofa size={13} /> },
  { label: 'Atención 24h',         icon: <Clock size={13} /> },
  { label: 'Zona céntrica',        icon: <MapPin size={13} /> },
  { label: 'Cocina propia o común', icon: <UtensilsCrossed size={13} /> },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.13, duration: 0.6, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Imagen de fondo — hero-edificio.jpg */}
      <div className="absolute inset-0 z-0">
        {IMGS.heroEdificio ? (
          <img
            src={IMGS.heroEdificio}
            alt="Fachada del Edificio HVO en Tuluá, Valle del Cauca"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        ) : (
          <ImagePlaceholder
            label="Foto fachada Edificio HVO — hero-edificio.jpg (1920×1080)"
            className="w-full h-full"
            aspectRatio="auto"
          />
        )}
        {/* Overlay degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/90 via-carbon/70 to-carbon/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
      </div>

      {/* Franja de acento turquesa lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-turquesa-300 via-turquesa-500 to-turquesa-300 z-10" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-2xl">

          {/* Etiqueta superior */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-turquesa-500/20 backdrop-blur-sm border border-turquesa-400/40 text-turquesa-200 text-xs font-inter font-semibold px-3 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-turquesa-400 animate-pulse" />
            Disponible — Tuluá, Valle del Cauca
          </motion.div>

          {/* Título principal */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-poppins font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-5"
          >
            Apartaestudios amoblados{' '}
            <span className="text-turquesa-300">en el corazón</span>{' '}
            de Tuluá
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-inter text-lg text-white/75 leading-relaxed mb-8 max-w-xl"
          >
            Vive con independencia, comodidad y todo listo para llegar.
            Atención <strong className="text-white font-semibold">24 horas</strong>.
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <a
              href={waLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-whatsapp hover:bg-green-400 text-white font-poppins font-600 text-base px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              aria-label="Quiero arrendar, escríbenos por WhatsApp"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Quiero arrendar (WhatsApp)
            </a>
            <a
              href="#apartaestudios"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-turquesa-300 text-white hover:text-turquesa-200 font-inter font-semibold text-base px-7 py-3.5 rounded-2xl transition-all duration-200 backdrop-blur-sm"
            >
              Ver apartaestudios
              <ChevronDown size={18} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-2"
          >
            {BADGES.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/85 text-xs font-inter px-3 py-1.5 rounded-full"
              >
                <span className="text-turquesa-300" aria-hidden="true">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Flecha de scroll */}
      <motion.a
        href="#beneficios"
        aria-label="Ver más"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.5 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-turquesa-300 transition-colors"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
