// Cinta tipográfica en bucle — separador de marca entre el hero y el resto
const ITEMS = [
  'Apartaestudios amoblados',
  'Atención 24 horas',
  'Centro de Tuluá',
  'Cocina propia o común',
  'Baño privado',
  'Listos para habitar',
];

export function Cinta() {
  // Contenido duplicado: al desplazarse el 50% el bucle es invisible
  const fila = [...ITEMS, ...ITEMS];

  return (
    <div aria-hidden="true" className="border-y border-linea bg-fondo overflow-hidden py-3.5">
      <div className="flex w-max cinta-animada">
        {fila.map((t, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-suave px-7">
              {t}
            </span>
            <span className="font-display text-sm text-acento leading-none">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
