import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const FOTOS = [
  {
    src:   IMGS.heroEdificio,
    slot:  'hero-edificio.jpg',
    alt:   'Fachada exterior del Edificio HVO en Tuluá',
    label: 'Fachada del Edificio HVO',
    desc:  'Vista exterior — fachada turquesa con enchape de piedra',
    span:  'lg:col-span-2 lg:row-span-2',
  },
  {
    src:   IMGS.habitacion1,
    slot:  'habitacion-1.jpg',
    alt:   'Habitación del apartaestudio con cama, cabecero gris y televisor',
    label: 'Habitación con cama y TV',
    desc:  'Cama, cabecero, mesa de noche con lámpara y TV de pared',
    span:  '',
  },
  {
    src:   IMGS.estudioEscritorio,
    slot:  'estudio-escritorio.jpg',
    alt:   'Zona de escritorio con silla y cortinas en el apartaestudio',
    label: 'Zona de escritorio',
    desc:  'Escritorio, silla y cortinas — espacio ideal para trabajar o estudiar',
    span:  '',
  },
  {
    src:   IMGS.zonaComun,
    slot:  'zona-comun.jpg',
    alt:   'Zona común del Edificio HVO con pérgola de madera y jardín vertical',
    label: 'Zona común del edificio',
    desc:  'Corredor con pérgola de madera, jardín vertical y barandas en acero',
    span:  'lg:col-span-2',
  },
  {
    src:   null,            // bano.jpg — pendiente de fotografía
    slot:  'bano.jpg',
    alt:   'Baño moderno del apartaestudio en el Edificio HVO',
    label: 'Baño moderno',
    desc:  'Baño con acabados modernos incluido en cada apartaestudio',
    span:  '',
  },
];

export function Galeria() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500 mb-3">
            Galería
          </span>
          <h2 className="font-poppins font-700 text-3xl sm:text-4xl text-carbon mb-4">
            Conoce el Edificio HVO
          </h2>
          <p className="font-inter text-carbon/60 max-w-md mx-auto">
            Espacios pensados para tu bienestar. Modernos, iluminados y completamente equipados.
          </p>
        </div>

        {/* Grid masonry-like */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[220px]">
          {FOTOS.map((foto, i) => (
            <motion.button
              key={foto.slot}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setSelected(i)}
              className={`group relative rounded-2xl overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-turquesa-400 focus:ring-offset-2 ${foto.span}`}
              aria-label={`Ver foto: ${foto.label}`}
            >
              {foto.src ? (
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              ) : (
                <ImagePlaceholder
                  label={`${foto.slot} — ${foto.desc}`}
                  className="w-full h-full"
                  aspectRatio="auto"
                />
              )}

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                <div>
                  <p className="font-poppins font-600 text-white text-sm">{foto.label}</p>
                  <p className="font-inter text-white/70 text-xs mt-0.5">{foto.desc}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Nota: visible solo mientras haya placeholders */}
        {FOTOS.some(f => !f.src) && (
          <p className="text-center font-inter text-xs text-piedra-400 mt-6">
            Pronto: fotos reales del edificio — copia los archivos .jpg en src/assets/ para activarlas
          </p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-carbon/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {FOTOS[selected].src ? (
                <img
                  src={FOTOS[selected].src!}
                  alt={FOTOS[selected].alt}
                  className="w-full rounded-2xl object-cover object-center max-h-[80vh]"
                />
              ) : (
                <ImagePlaceholder
                  label={`${FOTOS[selected].slot} — ${FOTOS[selected].desc}`}
                  className="w-full rounded-2xl"
                  aspectRatio="16/9"
                />
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg text-carbon hover:text-turquesa-600 transition-colors"
                aria-label="Cerrar imagen"
              >
                <X size={18} />
              </button>
              <p className="text-center text-white/70 font-inter text-sm mt-4">
                {FOTOS[selected].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
