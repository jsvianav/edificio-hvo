import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sofa, Clock, MapPin, Sun } from 'lucide-react';

const CARDS = [
  {
    icon: <Sofa size={28} />,
    titulo: 'Totalmente amoblados',
    desc: 'Llega sin preocupaciones: cama, escritorio, TV, ventilador y todo lo necesario para vivir desde el primer día.',
  },
  {
    icon: <Clock size={28} />,
    titulo: 'Atención 24 horas',
    desc: 'Alguien siempre disponible para atenderte, cualquier día de la semana, a cualquier hora.',
  },
  {
    icon: <MapPin size={28} />,
    titulo: 'Ubicación inmejorable',
    desc: 'A pasos del Hospital Departamental Tomás Uribe, zona comercial, transporte y todo lo que necesitas.',
  },
  {
    icon: <Sun size={28} />,
    titulo: 'Ambientes iluminados',
    desc: 'Espacios modernos con pisos de porcelanato, buena iluminación natural y acabados de calidad.',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Beneficios() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="beneficios" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block font-inter text-xs font-semibold tracking-widest uppercase text-turquesa-500 mb-3">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-poppins font-700 text-3xl sm:text-4xl text-carbon mb-4">
            Todo listo para que te concentres en lo que importa
          </h2>
          <p className="font-inter text-carbon/60 max-w-xl mx-auto leading-relaxed">
            Diseñamos cada apartaestudio pensando en tu comodidad y tranquilidad desde el primer momento.
          </p>
        </div>

        {/* Grid de tarjetas */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.titulo}
              variants={item}
              className="group relative bg-bruma rounded-2xl p-7 border border-piedra-100 hover:border-turquesa-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Fondo de hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-turquesa-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-turquesa-100 text-turquesa-600 flex items-center justify-center mb-5 group-hover:bg-turquesa-500 group-hover:text-white transition-all duration-300">
                  {c.icon}
                </div>
                <h3 className="font-poppins font-600 text-lg text-carbon mb-2">
                  {c.titulo}
                </h3>
                <p className="font-inter text-sm text-carbon/60 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
