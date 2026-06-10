import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NEGOCIO } from '../constants/negocio';
import { Overline } from './Overline';
import { Revelado } from './Revelado';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const REFERENCIAS = [
  { lugar: 'Hospital Departamental Tomás Uribe', nota: 'a pasos' },
  { lugar: 'Zona comercial de Tuluá',            nota: 'caminando' },
  { lugar: 'Transporte público',                 nota: 'en la puerta' },
];

export function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-fondo py-20 lg:py-32">
      <div className="contenedor">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">

          {/* Columna editorial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="lg:col-span-5"
          >
            <Overline texto="Ubicación" className="mb-6" />
            <h2 className="font-display font-medium text-3xl lg:text-[2.75rem] leading-[1.12] tracking-[-0.01em] text-tinta mb-5">
              Calle 25 # 38 – 17,
              <br />
              centro de Tuluá.
            </h2>
            <p className="font-sans text-sm lg:text-[15px] text-suave leading-relaxed max-w-sm mb-10">
              En el centro de todo: salud, comercio y transporte quedan a
              pocos pasos de la puerta del edificio.
            </p>

            {/* Referencias cercanas */}
            <ul className="mb-10">
              {REFERENCIAS.map((r) => (
                <li
                  key={r.lugar}
                  className="flex items-baseline justify-between gap-6 border-t border-linea py-3.5 last:border-b"
                >
                  <span className="font-sans text-sm text-tinta">{r.lugar}</span>
                  <span className="font-sans text-xs text-suave shrink-0">— {r.nota}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={NEGOCIO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-acento hover:bg-acento-fuerte text-acento-contraste font-sans font-medium text-sm tracking-wide px-7 py-3.5 rounded-full transition-colors duration-200"
                aria-label="Cómo llegar al Edificio HVO en Google Maps"
              >
                Cómo llegar
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <span className="etiqueta">Plus Code {NEGOCIO.codigoPlus}</span>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
            className="lg:col-span-7"
          >
            <Revelado desde="derecha" className="overflow-hidden border border-linea">
              <iframe
                title="Mapa de ubicación del Edificio HVO en Tuluá, Valle del Cauca"
                src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d250.25!2d${NEGOCIO.coordenadas.lng}!3d${NEGOCIO.coordenadas.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMDUnMDMuMSJOIDc2wrAxMScxNS42Ilc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco`}
                width="100%"
                height="460"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-[filter] duration-500 block"
              />
            </Revelado>
            <figcaption className="flex items-baseline justify-between gap-4 border-t border-linea mt-4 pt-3">
              <span className="font-sans text-xs text-suave">{NEGOCIO.direccion}</span>
              <span className="etiqueta shrink-0">Fig. 02</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
