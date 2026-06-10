import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { waLink } from '../constants/negocio';

export function WhatsappFloat() {
  return (
    <motion.a
      href={waLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp — Edificio HVO"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 bg-whatsapp text-white py-3 px-4 rounded-2xl shadow-2xl hover:shadow-green-500/30 wa-pulse hover:scale-105 transition-transform duration-200 group"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="font-inter font-semibold text-sm hidden sm:inline">
        WhatsApp
      </span>

      {/* Tooltip en móvil */}
      <span
        className="sm:hidden absolute right-14 bottom-1 bg-carbon text-white text-xs font-inter px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg"
        aria-hidden="true"
      >
        Escríbenos
      </span>
    </motion.a>
  );
}
