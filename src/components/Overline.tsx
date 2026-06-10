import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Apertura de sección: regla que se dibuja + etiqueta editorial
export function Overline({ texto, className = '' }: { texto: string; className?: string }) {
  return (
    <div className={className}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-px bg-linea origin-left mb-5"
        aria-hidden="true"
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="etiqueta"
      >
        {texto}
      </motion.p>
    </div>
  );
}
