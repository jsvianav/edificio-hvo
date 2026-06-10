import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { waLink } from '../constants/negocio';

export function WhatsappFloat() {
  // Aparece solo después de pasar el hero — mientras tanto el CTA principal manda
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href={waLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp — Edificio HVO"
      title="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-[52px] h-[52px] bg-acento hover:bg-acento-fuerte text-acento-contraste rounded-full shadow-lg shadow-tinta/15 hover:scale-105 transition-[background-color,transform] duration-200"
    >
      <MessageCircle size={22} aria-hidden="true" />
    </motion.a>
  );
}
