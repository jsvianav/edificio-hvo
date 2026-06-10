import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { IMGS } from '../assets/siteImages';
import { Overline } from './Overline';
import { Revelado } from './Revelado';

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

  const cerrar    = useCallback(() => setSelected(null), []);
  const siguiente = useCallback(
    () => setSelected((s) => (s === null ? s : (s + 1) % FOTOS.length)),
    []
  );
  const anterior  = useCallback(
    () => setSelected((s) => (s === null ? s : (s - 1 + FOTOS.length) % FOTOS.length)),
    []
  );

  // Navegación por teclado dentro del lightbox.
  // Listener único montado una sola vez; lee el estado actual vía ref
  // para no depender de la re-suscripción en cada cambio de foto.
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedRef.current === null) return;
      if (e.key === 'Escape')     cerrar();
      if (e.key === 'ArrowRight') siguiente();
      if (e.key === 'ArrowLeft')  anterior();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cerrar, siguiente, anterior]);

  return (
    <section id="galeria" className="bg-superficie py-20 lg:py-32">
      <div className="contenedor">

        {/* Encabezado */}
        <Overline texto="Galería" className="mb-6" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
          <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.01em] text-tinta">
            El edificio, tal como es.
          </h2>
          <p className="font-sans text-sm text-suave max-w-xs leading-relaxed">
            Espacios modernos, iluminados y completamente equipados —
            sin retoques de catálogo.
          </p>
        </div>

        {/* Mosaico editorial */}
        <div className="grid lg:grid-cols-12 gap-x-6 gap-y-12 items-start">
          {FOTOS.map((foto, i) => (
            <figure key={foto.slot} className={foto.span}>
              <button
                onClick={() => setSelected(i)}
                className="group block w-full overflow-hidden cursor-zoom-in"
                aria-label={`Ver foto: ${foto.label}`}
              >
                <Revelado desde={i % 2 === 0 ? 'izquierda' : 'derecha'}>
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
                </Revelado>
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
            </figure>
          ))}
        </div>

        {/* Nota: visible solo mientras haya placeholders */}
        {FOTOS.some(f => !f.src) && (
          <p className="font-sans text-xs text-suave mt-10">
            Pronto: fotos reales del edificio — copia los archivos .jpg en src/img/ para activarlas.
          </p>
        )}
      </div>

      {/* Lightbox — sin AnimatePresence: el desmontaje con exit queda atascado
          con React 19 + StrictMode; la entrada anima y el cierre es instantáneo */}
      {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-petroleo-oscuro/95 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={cerrar}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${num(selected)} de ${num(FOTOS.length - 1)}: ${FOTOS[selected].label}`}
          >
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* key={selected}: al cambiar de foto se remonta con fundido de entrada.
                  Sin AnimatePresence anidado — bloquea el desmontaje del padre. */}
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {FOTOS[selected].src ? (
                  <img
                    src={FOTOS[selected].src!}
                    alt={FOTOS[selected].alt}
                    className="w-full object-cover object-center max-h-[74vh]"
                  />
                ) : (
                  <ImagePlaceholder
                    label={`${FOTOS[selected].slot} — ${FOTOS[selected].desc}`}
                    className="w-full"
                    aspectRatio="16/9"
                  />
                )}
              </motion.div>

              <figcaption className="flex items-baseline justify-between gap-4 border-t border-marfil/20 mt-4 pt-3">
                <span className="font-sans text-sm text-marfil">
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-marfil/50 mr-3">
                    {num(selected)} / {num(FOTOS.length - 1)}
                  </span>
                  {FOTOS[selected].label}
                </span>
                <span className="font-sans text-xs text-marfil/60 hidden sm:block">
                  {FOTOS[selected].desc}
                </span>
              </figcaption>

              {/* Controles */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={anterior}
                  className="w-10 h-10 bg-marfil/15 hover:bg-marfil/30 text-marfil rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  aria-label="Foto anterior"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={siguiente}
                  className="w-10 h-10 bg-marfil/15 hover:bg-marfil/30 text-marfil rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  aria-label="Foto siguiente"
                >
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={cerrar}
                  className="w-10 h-10 bg-marfil text-petroleo-oscuro rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Cerrar imagen"
                >
                  <X size={17} />
                </button>
              </div>
            </motion.figure>
          </motion.div>
      )}
    </section>
  );
}
