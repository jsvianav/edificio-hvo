# Edificio HVO — Landing Page

Landing page de una sola página para el arriendo de apartaestudios amoblados del **Edificio HVO** en Tuluá, Valle del Cauca, Colombia.

**Stack:** Vite · React · TypeScript · Tailwind CSS · Framer Motion · lucide-react

---

## Cómo correr el proyecto

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

Luego abre `http://localhost:5173` en tu navegador.

```bash
# Construir para producción
npm run build

# Vista previa del build de producción
npm run preview
```

---

## Cómo reemplazar las imágenes con fotos reales

Las fotos van en la carpeta `src/assets/`. Coloca cada imagen con **exactamente** el nombre de archivo indicado:

| Archivo                  | Qué debe mostrar                                              | Tamaño recomendado |
|--------------------------|---------------------------------------------------------------|--------------------|
| `hero-edificio.jpg`      | Fachada del edificio (teal turquesa + enchape piedra gris)    | 1920 × 1080 px     |
| `apto-cocina-propia.jpg` | Apartaestudio amoblado con cocina integrada visible           | 800 × 600 px       |
| `apto-cocina-comun.jpg`  | Apartaestudio amoblado (modalidad sin cocina interna)         | 800 × 600 px       |
| `habitacion-1.jpg`       | Habitación: cama, cabecero, mesa de noche, lámpara, TV       | 800 × 600 px       |
| `estudio-escritorio.jpg` | Zona de escritorio con silla y cortinas                       | 800 × 600 px       |
| `zona-comun.jpg`         | Corredor/terraza con pérgola y jardín vertical                | 1200 × 600 px      |
| `bano.jpg`               | Baño moderno                                                  | 600 × 800 px       |

### Pasos para reemplazar cada imagen

1. Agrega la foto en `src/assets/` con el nombre exacto de la tabla.
2. En cada componente (`Hero.tsx`, `Apartaestudios.tsx`, `Galeria.tsx`), busca el comentario `{/* SLOT: ... */}`.
3. Reemplaza `<ImagePlaceholder ... />` con:
   ```tsx
   <img
     src="/src/assets/nombre-del-archivo.jpg"
     alt="Descripción de la imagen"
     className="w-full h-full object-cover"
     loading="lazy"
   />
   ```

**Tip:** Optimiza las imágenes antes de subirlas (usa [Squoosh](https://squoosh.app/) o similar).

---

## Cómo editar textos y datos del negocio

Todos los datos importantes están centralizados en:

```
src/constants/negocio.ts
```

Desde ese archivo puedes cambiar sin tocar los componentes:
- **Teléfono / WhatsApp**
- **Dirección**
- **Horario**
- **Mensajes prellenados de WhatsApp**
- **Calificación en Google** (`rating`, `ratingCount`)

### Mensajes de WhatsApp

```ts
export const WA_MSGS = {
  general:       encodeURIComponent('Tu mensaje general aquí'),
  cocinaPropias: encodeURIComponent('Tu mensaje para cocina propia aquí'),
  cocinaComun:   encodeURIComponent('Tu mensaje para cocina común aquí'),
}
```

---

## Estructura de archivos

```
src/
├── components/
│   ├── Navbar.tsx          Barra de navegación fija con scroll
│   ├── Hero.tsx            Sección hero con imagen de fondo y CTA
│   ├── Beneficios.tsx      Grid de ventajas (¿Por qué elegirnos?)
│   ├── Apartaestudios.tsx  Tarjetas de las dos modalidades
│   ├── Galeria.tsx         Galería con lightbox
│   ├── Ubicacion.tsx       Dirección + mapa de Google Maps
│   ├── Resenas.tsx         Testimonios y calificación Google
│   ├── CTAFinal.tsx        Banda de conversión final (turquesa)
│   ├── Footer.tsx          Pie de página
│   ├── WhatsappFloat.tsx   Botón flotante de WhatsApp
│   └── ImagePlaceholder.tsx Placeholder temporal de imágenes
├── constants/
│   └── negocio.ts          Datos del negocio y mensajes WhatsApp
├── App.tsx                 Composición principal de la página
└── index.css               Estilos globales + Tailwind
tailwind.config.js          Paleta de colores de marca HVO
```

---

## Reseñas reales de Google

En `src/components/Resenas.tsx`, el array `TESTIMONIOS` tiene ejemplos marcados con `* Ejemplo`. Actualiza el `nombre`, `texto`, `estrellas` y también los valores `rating` y `ratingCount` en `src/constants/negocio.ts`.
