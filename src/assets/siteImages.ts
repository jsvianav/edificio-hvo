/**
 * siteImages.ts
 * Carga dinámica de imágenes del sitio via import.meta.glob de Vite.
 * Solo incluye los archivos que existan físicamente en src/assets/.
 * Cuando copies un JPG aquí y recargues el servidor de desarrollo,
 * el sitio lo mostrará automáticamente sin cambiar nada más.
 */
const allImages = import.meta.glob(
  '../img/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

function img(filename: string): string | null {
  return allImages[`../img/${filename}`] ?? null
}

/** URLs de las imágenes reales (null = archivo no encontrado → se muestra placeholder) */
export const IMGS = {
  /** Fachada del edificio — hero-edificio.jpg (recomendado 1920×1080) */
  heroEdificio:      img('hero-edificio.jpg'),
  /** Habitación cama + cabecero gris — habitacion-1.jpg (recomendado 800×600) */
  habitacion1:       img('habitacion-1.jpg'),
  /** Zona de escritorio + cortinas — estudio-escritorio.jpg (recomendado 800×600) */
  estudioEscritorio: img('estudio-escritorio.jpg'),
  /** Corredor pérgola + jardín vertical — zona-comun.jpg (recomendado 1200×600) */
  zonaComun:         img('zona-comun.jpg'),
  /** Apartaestudio cocina propia — apto-cocina-propia.jpg (recomendado 800×600) */
  aptoCocinaPropia:  img('apto-cocina-propia.jpg'),
  /** Apartaestudio cocina común — apto-cocina-comun.jpg (recomendado 800×600) */
  aptoCocinaComun:   img('apto-cocina-comun.jpg'),
} as const
