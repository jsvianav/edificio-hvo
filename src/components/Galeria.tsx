import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FOTOS = [
  {
    src:    IMGS.heroEdificio,
    slot:   'hero-edificio.jpg',
    alt:    'Fachada exterior del Edificio HVO en Tuluá',
    label:  'Fachada del edificio',
    desc:   'Enchape de piedra y carpintería turquesa',
    span:   'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    src:    IMGS.habitacion1,
    slot:   'habitacion-1.jpg',
    alt:    'Habitación del apartaestudio con cama, cabecero gris y televisor',
    label:  'Habitación principal',
    desc:   'Cama, cabecero, mesa de noche y TV',
    span:   'lg:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    src:    IMGS.estudioEscritorio,
    slot:   'estudio-escritorio.jpg',
    alt:    'Zona de escritorio con silla y cortinas en el apartaestudio',
    label:  'Zona de trabajo',
    desc:   'Escritorio y silla junto a la ventana',
    span:   'lg:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    src:    IMGS.zonaComun,
    slot:   'zona-comun.jpg',
    alt:    'Zona común del Edificio HVO con pérgola de madera y jardín vertical',
    label:  'Zona común',
    desc:   'Pérgola de madera y jardín vertical',
    span:   'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    src:    null,
    slot:   'bano.jpg',
    alt:    'Baño moderno del apartaestudio en el Edificio HVO',
    label:  'Baño privado',
    desc:   'Acabados modernos en cada unidad',
    span:   'lg:col-span-5 lg:col-start-8',
    aspect: 'aspect-[4/3]',
  },
];

const num = (i: number) => String(i + 1).padStart(2, '0');

export function Galeria() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-superficie py-20 lg:py-32">
      <div className="contenedor">

        {/* Encabezado */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="etiqueta mb-6">Galería</p>
            <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.01em] text-tinta">
              El edificio, tal como es.
            </h2>
          </div>
          <p className="font-sans text-sm text-suave max-w-xs leading-relaxed">
            Espacios modernos, iluminados y completamente equipados —
            sin retoques de catálogo.
          </p>
        </div>

        {/* Mosaico editorial */}
        <div className="grid lg:grid-cols-12 gap-x-6 gap-y-12 items-start">
          {FOTOS.map((foto, i) => (
            <motion.figure
              key={foto.slot}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.6, ease: EASE }}
              className={foto.span}
            >
              <button
                onClick={() => setSelected(i)}
                className="group block w-full overflow-hidden cursor-zoom-in"
                aria-label={`Ver foto: ${foto.label}`}
              >
                {foto.src ? (
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    className={`w-full ${foto.aspect} object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out`}
                    loading="lazy"
                  />
                ) : (
                  <ImagePlaceholder
                    label={`${foto.slot} — ${foto.desc}`}
                    className={`w-full ${foto.aspect}`}
                    aspectRatio="auto"
                  />
                )}
              </button>
              <figcaption className="flex items-baseline justify-between gap-4 border-t border-linea mt-4 pt-3">
                <span className="font-sans text-xs text-tinta">
                  <span className="etiqueta mr-2">{num(i)}</span>
                  {foto.label}
                </span>
                <span className="font-sans text-xs text-suave text-right hidden sm:block">
                  {foto.desc}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Nota: visible solo mientras haya placeholders */}
        {FOTOS.some(f => !f.src) && (
          <p className="font-sans text-xs text-suave mt-10">
            Pronto: fotos reales del edificio — copia los archivos .jpg en src/img/ para activarlas.
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
            className="fixed inset-0 z-[100] bg-petroleo-oscuro/95 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setSelected(null)}
          >
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {FOTOS[selected].src ? (
                <img
                  src={FOTOS[selected].src!}
                  alt={FOTOS[selected].alt}
                  className="w-full object-cover object-center max-h-[78vh]"
                />
              ) : (
                <ImagePlaceholder
                  label={`${FOTOS[selected].slot} — ${FOTOS[selected].desc}`}
                  className="w-full"
                  aspectRatio="16/9"
                />
              )}
              <figcaption className="flex items-baseline justify-between gap-4 border-t border-marfil/20 mt-4 pt-3">
                <span className="font-sans text-sm text-marfil">
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-marfil/50 mr-3">
                    {num(selected)}
                  </span>
                  {FOTOS[selected].label}
                </span>
                <span className="font-sans text-xs text-marfil/60">{FOTOS[selected].desc}</span>
              </figcaption>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-marfil text-petroleo-oscuro rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Cerrar imagen"
              >
                <X size={17} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
