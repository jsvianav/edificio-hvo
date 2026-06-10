import { useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, Phone } from 'lucide-react';
import { waLink, NEGOCIO } from '../constants/negocio';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LINEAS = [
  <>¿Listo para mudarte?</>,
  <em className="font-normal italic text-petroleo-claro">Agenda tu visita hoy.</em>,
];

// Guion del chat — se escribe solo al entrar en vista
const GUION = [
  { de: 'visitante', texto: 'Hola, vi la página del Edificio HVO. ¿Tienen apartaestudios disponibles?' },
  { de: 'hvo',       texto: '¡Hola! Sí — amoblados y listos para entrar a vivir. ¿Para cuándo lo necesitas?' },
  { de: 'visitante', texto: '¿Puedo ir a verlos hoy mismo?' },
  { de: 'hvo',       texto: 'Claro: atendemos las 24 horas, todos los días. Te esperamos.' },
] as const;

const DATOS = [
  { n: '01', label: 'Respuesta en minutos' },
  { n: '02', label: 'Visitas cualquier día, a cualquier hora' },
  { n: '03', label: 'Cl 25 # 38-17, centro de Tuluá' },
];

// Tarjeta que flota en 3D siguiendo el cursor (resortes físicos)
function TarjetaTilt({ children }: { children: ReactNode }) {
  const sinMovimiento = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.6 });

  const alMover = (e: MouseEvent<HTMLDivElement>) => {
    if (sinMovimiento) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 8);
  };

  const alSalir = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} onMouseMove={alMover} onMouseLeave={alSalir}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}

// Conversación de WhatsApp que se escribe sola
function Conversacion() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, margin: '-80px' });
  const sinMovimiento = useReducedMotion();
  const [visibles, setVisibles]       = useState(0);
  const [escribiendo, setEscribiendo] = useState(false);

  useEffect(() => {
    if (!enVista) return;
    if (sinMovimiento) {
      setVisibles(GUION.length);
      return;
    }
    let cancelado = false;
    const timeouts: number[] = [];
    let t = 700;
    GUION.forEach((m, i) => {
      if (m.de === 'hvo') {
        timeouts.push(window.setTimeout(() => { if (!cancelado) setEscribiendo(true); }, t));
        t += 1150;
      }
      timeouts.push(window.setTimeout(() => {
        if (cancelado) return;
        setEscribiendo(false);
        setVisibles(i + 1);
      }, t));
      t += 950;
    });
    return () => {
      cancelado = true;
      timeouts.forEach(clearTimeout);
    };
  }, [enVista, sinMovimiento]);

  return (
    <div
      ref={ref}
      className="bg-white/[0.07] border border-marfil/15 rounded-3xl p-5 lg:p-6 backdrop-blur-sm shadow-2xl shadow-black/25"
    >
      {/* Encabezado del chat */}
      <div className="flex items-center gap-3 border-b border-marfil/10 pb-4 mb-4">
        <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-petroleo-claro/60" />
          <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-petroleo-claro" />
        </span>
        <p className="font-sans text-sm font-medium text-marfil">
          Edificio HVO
          <span className="font-normal text-marfil/50"> · en línea</span>
        </p>
      </div>

      {/* Mensajes */}
      <div className="flex flex-col justify-end gap-2.5 min-h-[265px]" aria-live="polite">
        {GUION.slice(0, visibles).map((m, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className={`px-4 py-2.5 font-sans text-sm leading-snug max-w-[85%] ${
              m.de === 'visitante'
                ? 'self-end bg-marfil text-petroleo-oscuro rounded-2xl rounded-br-md'
                : 'self-start bg-white/10 text-marfil rounded-2xl rounded-bl-md'
            }`}
          >
            {m.texto}
          </motion.p>
        ))}

        {/* Indicador de escribiendo… */}
        {escribiendo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="self-start flex items-center gap-1.5 bg-white/10 rounded-2xl rounded-bl-md px-4 py-3"
            aria-label="Escribiendo…"
          >
            <span className="punto-chat w-1.5 h-1.5 rounded-full bg-marfil/70" />
            <span className="punto-chat w-1.5 h-1.5 rounded-full bg-marfil/70" />
            <span className="punto-chat w-1.5 h-1.5 rounded-full bg-marfil/70" />
          </motion.div>
        )}
      </div>

      {/* CTA dentro del chat */}
      <a
        href={waLink('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 w-full bg-marfil hover:bg-white text-petroleo-oscuro font-sans font-medium text-sm tracking-wide py-3.5 rounded-full transition-colors duration-200"
        aria-label="Continuar la conversación por WhatsApp"
      >
        Continuar en WhatsApp
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </div>
  );
}

export function CTAFinal() {
  return (
    <section id="contacto" className="relative bg-petroleo-oscuro py-24 lg:py-32 overflow-hidden">
      {/* Atmósfera: luz suave desde arriba-izquierda */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(110% 75% at 12% 0%, rgba(245,242,234,0.08), transparent 55%)',
        }}
      />

      <div className="contenedor relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-petroleo-claro mb-8"
        >
          Contacto — Atención 24 horas
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Columna editorial */}
          <div className="lg:col-span-6">
            {/* Titular: flip 3D por líneas desde la máscara */}
            <motion.h2
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } } }}
              className="font-display font-medium text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] tracking-[-0.015em] text-marfil"
            >
              {LINEAS.map((linea, i) => (
                <span key={i} className="block overflow-hidden" style={{ perspective: 600 }}>
                  <motion.span
                    className="block pb-[0.08em] -mb-[0.08em] origin-bottom"
                    variants={{
                      oculto:  { y: '105%', rotateX: -55, opacity: 0 },
                      visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
                    }}
                  >
                    {linea}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            >
              <p className="font-sans text-sm lg:text-base text-marfil/60 leading-relaxed max-w-md border-t border-marfil/15 mt-10 pt-6">
                Resolvemos tus dudas y te mostramos el apartaestudio que mejor
                se adapta a ti — cualquier día, a cualquier hora.
              </p>
              <a
                href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`}
                className="mt-5 inline-flex items-center gap-2.5 font-sans text-sm text-marfil/70 hover:text-marfil transition-colors duration-200"
                aria-label={`Llamar al ${NEGOCIO.telefono}`}
              >
                <Phone size={14} aria-hidden="true" />
                {NEGOCIO.telefono}
              </a>
            </motion.div>
          </div>

          {/* Chat con tilt 3D */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <TarjetaTilt>
              <Conversacion />
            </TarjetaTilt>
          </motion.div>
        </div>

        {/* Índice de cierre — eco del hero */}
        <motion.dl
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-3 border-t border-marfil/15 mt-16 lg:mt-20"
        >
          {DATOS.map((d) => (
            <motion.div
              key={d.n}
              variants={{
                oculto:  { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="flex items-baseline gap-3 py-5 sm:pr-8 border-b border-marfil/10 sm:border-b-0 last:border-b-0"
            >
              <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-petroleo-claro">
                {d.n}
              </dt>
              <dd className="font-sans text-sm text-marfil/85">{d.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
