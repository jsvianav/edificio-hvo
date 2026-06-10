import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Revelado editorial de imágenes: cortinilla con clip-path + asentamiento de escala
const CLIPS = {
  izquierda: 'inset(0 100% 0 0)',
  derecha:   'inset(0 0 0 100%)',
  abajo:     'inset(100% 0 0 0)',
} as const;

interface Props {
  children: ReactNode;
  desde?: keyof typeof CLIPS;
  delay?: number;
  className?: string;
}

export function Revelado({ children, desde = 'izquierda', delay = 0, className = '' }: Props) {
  return (
    <motion.div
      initial={{ clipPath: CLIPS[desde] }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 1.05, ease: EASE }}
      className={className}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay, duration: 1.05, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
