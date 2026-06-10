import { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { NEGOCIO } from '../constants/negocio';
import { Overline } from './Overline';

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

// Promedio que cuenta hacia arriba al entrar en vista
function RatingAnimado() {
  const ref = useRef<HTMLParagraphElement>(null);
  const enVista = useInView(ref, { once: true, margin: '-40px' });
  const objetivo = parseFloat(NEGOCIO.rating);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    const controles = animate(0, objetivo, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setValor(v),
    });
    return () => controles.stop();
  }, [enVista, objetivo]);

  return (
    <p ref={ref} className="font-display font-medium text-5xl lg:text-6xl text-tinta leading-none tabular-nums">
      {valor.toFixed(1).replace('.', ',')}
    </p>
  );
}

// Estrellas que se dibujan una a una al entrar en vista
function Estrellas({ n }: { n: number }) {
  return (
    <motion.span
      className="inline-flex gap-[3px] text-xs leading-none"
      aria-label={`${n} estrellas de 5`}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={i < n ? 'text-acento' : 'text-linea'}
          variants={{
            oculto:  { opacity: 0, scale: 0, rotate: -45 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.35, ease: EASE } },
          }}
        >
          ★
        </motion.span>
      ))}
    </motion.span>
  );
}

// Una palabra cuya tinta se "revela" según el progreso de scroll
function Palabra({
  children,
  progreso,
  desde,
  hasta,
}: {
  children: string;
  progreso: MotionValue<number>;
  desde: number;
  hasta: number;
}) {
  const opacidad = useTransform(progreso, [desde, hasta], [0.14, 1]);
  return <motion.span style={{ opacity: opacidad }}>{children} </motion.span>;
}

// Cita que se lee sola: cada palabra pasa de fantasma a tinta,
// ligada (y reversible) a la posición del scroll
function CitaScrub({ texto, className = '' }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const sinMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  if (sinMovimiento) {
    return <p ref={ref} className={className}>“{texto}”</p>;
  }

  const palabras = `“${texto}”`.split(' ');

  return (
    <p ref={ref} className={className}>
      {palabras.map((palabra, i) => (
        <Palabra
          key={i}
          progreso={scrollYProgress}
          desde={i / palabras.length}
          hasta={(i + 1) / palabras.length}
        >
          {palabra}
        </Palabra>
      ))}
    </p>
  );
}

// Comilla gigante decorativa con deriva en parallax
function MarcaCita({ objetivo }: { objetivo: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: objetivo,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [56, -56]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ y }}
      className="absolute -top-20 -left-2 lg:-top-24 lg:-left-4 font-display text-[9rem] lg:text-[12rem] leading-none text-tinta/[0.07] select-none pointer-events-none"
    >
      “
    </motion.span>
  );
}

export function Resenas() {
  const seccionRef = useRef<HTMLElement>(null);
  const [destacado, ...resto] = TESTIMONIOS;

  return (
    <section id="resenas" ref={seccionRef} className="bg-superficie py-20 lg:py-32">
      <div className="contenedor">

        {/* Encabezado con rating tipográfico */}
        <Overline texto="Reseñas" className="mb-6" />
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12 lg:mb-16">
          <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.01em] text-tinta">
            Lo que dicen quienes ya viven aquí.
          </h2>
          <div className="flex items-baseline gap-4">
            <RatingAnimado />
            <div>
              <Estrellas n={Math.round(parseFloat(NEGOCIO.rating))} />
              <p className="font-sans text-xs text-suave mt-1">
                Promedio en Google · {NEGOCIO.ratingCount} reseñas
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 border-t border-linea pt-12 lg:pt-16">

          {/* Cita destacada: se lee sola con el scroll */}
          <blockquote className="relative lg:col-span-6 flex flex-col justify-between gap-10">
            <MarcaCita objetivo={seccionRef} />
            <CitaScrub
              texto={destacado.texto}
              className="relative font-display italic font-normal text-2xl lg:text-[2rem] leading-[1.3] text-tinta"
            />
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-sans text-sm text-tinta">
                  {destacado.nombre}
                  <span className="text-suave"> — {destacado.fuente}</span>
                </p>
                <Estrellas n={destacado.estrellas} />
              </div>
            </motion.footer>
          </blockquote>

          {/* Citas secundarias: entran con profundidad (perspectiva 3D) */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-10" style={{ perspective: 900 }}>
            {resto.map((t, i) => (
              <motion.blockquote
                key={t.nombre}
                initial={{ opacity: 0, y: 36, rotateX: -18 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: EASE }}
                style={{ transformOrigin: 'top center' }}
                className="border-t border-linea pt-8 first:border-t-0 first:pt-0"
              >
                <p className="font-sans text-sm lg:text-[15px] text-suave leading-relaxed mb-5">
                  “{t.texto}”
                </p>
                <footer>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-sans text-sm text-tinta">
                      {t.nombre}
                      <span className="text-suave"> — {t.fuente}</span>
                    </p>
                    <Estrellas n={t.estrellas} />
                  </div>
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
