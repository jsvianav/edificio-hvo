import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Hospital, ShoppingBag, Bus } from 'lucide-react';
import { NEGOCIO } from '../constants/negocio';

const REFERENCIAS = [
  { icon: <Hospital size={16} />, label: 'Hospital Departamental Tomás Uribe' },
  { icon: <ShoppingBag size={16} />, label: 'Zona comercial de Tuluá' },
  { icon: <Bus size={16} />,      label: 'Acceso a transporte público' },
];

export function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-bruma dark:bg-gray-950 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500 mb-3">
            Ubicación
          </span>
          <h2 className="font-poppins font-700 text-3xl sm:text-4xl text-carbon dark:text-white mb-4">
            En el centro de todo
          </h2>
          <p className="font-inter text-carbon/60 dark:text-white/60 max-w-lg mx-auto leading-relaxed">
            Estratégicamente ubicado para que tengas todo cerca: salud, comercio y transporte a pocos pasos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Info de ubicación */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-6"
          >
            {/* Dirección */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-turquesa-100 dark:bg-turquesa-900 text-turquesa-600 dark:text-turquesa-300 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="font-poppins font-600 text-carbon dark:text-white mb-0.5">Dirección</p>
                <p className="font-inter text-carbon/70 dark:text-white/70 text-sm">{NEGOCIO.direccion}</p>
                <p className="font-inter text-piedra-400 dark:text-gray-500 text-xs mt-1">
                  Código Plus: {NEGOCIO.codigoPlus}
                </p>
              </div>
            </div>

            {/* Referencias */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-piedra-100 dark:border-white/10 space-y-4">
              <p className="font-poppins font-600 text-carbon dark:text-white text-sm mb-2">
                Cerca de:
              </p>
              {REFERENCIAS.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-turquesa-500" aria-hidden="true">{r.icon}</span>
                  <span className="font-inter text-sm text-carbon/75 dark:text-white/75">{r.label}</span>
                </div>
              ))}
            </div>

            {/* Botón Cómo llegar */}
            <a
              href={NEGOCIO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-turquesa-500 hover:bg-turquesa-600 text-white font-inter font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              aria-label="Cómo llegar al Edificio HVO en Google Maps"
            >
              <MapPin size={16} aria-hidden="true" />
              Cómo llegar
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </motion.div>

          {/* Mapa embebido */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="rounded-3xl overflow-hidden shadow-xl border border-piedra-100 dark:border-white/10 bg-white dark:bg-gray-800"
          >
            <iframe
              title="Mapa de ubicación del Edificio HVO en Tuluá, Valle del Cauca"
              src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d250.25!2d${NEGOCIO.coordenadas.lng}!3d${NEGOCIO.coordenadas.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDUnMDMuMSJOIDc2wrAxMScxNS42Ilc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco`}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
