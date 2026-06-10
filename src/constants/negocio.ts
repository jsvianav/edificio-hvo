// ============================================================
// CONSTANTES DEL NEGOCIO — Edificio HVO
// Edita este archivo para actualizar datos sin tocar componentes
// ============================================================

export const NEGOCIO = {
  nombre: 'Edificio HVO',
  slogan: 'Apartaestudios amoblados en el corazón de Tuluá',
  direccion: 'Cl 25 # 38 - 17, Tuluá, Valle del Cauca, Colombia',
  telefono: '+57 317 4252048',
  whatsapp: '573174252048',
  horario: 'Atención 24 horas',
  coordenadas: { lat: 4.0842063, lng: -76.1876829 },
  codigoPlus: '3RM6+MW',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.7!2d-76.1876829!3d4.0842063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDUnMDMuMSJOIDc2wrAxMScxNS42Ilc!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco',
  googleMapsUrl:
    'https://maps.google.com/?q=4.0842063,-76.1876829',
  rating: '4.5',
  ratingCount: '12',
} as const;

// Mensajes prellenados de WhatsApp (codificados para URL)
export const WA_MSGS = {
  general: encodeURIComponent(
    'Hola, vi la página del Edificio HVO y estoy interesado(a) en arrendar un apartaestudio. ¿Me pueden dar más información?'
  ),
  cocinaPropias: encodeURIComponent(
    'Hola, me interesa el apartaestudio con cocina propia del Edificio HVO. ¿Está disponible?'
  ),
  cocinaComun: encodeURIComponent(
    'Hola, me interesa el apartaestudio con cocina común del Edificio HVO. ¿Está disponible y cuál es el precio?'
  ),
} as const;

// Genera el link de WhatsApp con el mensaje correspondiente
export const waLink = (msg: keyof typeof WA_MSGS) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${WA_MSGS[msg]}`;

// Lo que incluyen TODOS los apartaestudios
export const INCLUIDOS_BASE = [
  'Cama y cabecero',
  'Mesa de noche con lámpara',
  'Escritorio y silla',
  'Televisor',
  'Ventilador',
  'Cortinas',
  'Baño privado',
  'Pisos de porcelanato',
  'Iluminación natural',
] as const;
