// Componente placeholder — reemplaza con <img src="..." alt="..." />
// cuando tengas las fotos reales (ver README para dimensiones recomendadas)
interface Props {
  label: string;
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({ label, className = '', aspectRatio = '4/3' }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center bg-superficie border border-linea ${className}`}
      style={aspectRatio !== 'auto' ? { aspectRatio } : undefined}
    >
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <span className="etiqueta">Fotografía pendiente</span>
        <span className="font-sans text-xs text-suave max-w-[220px] leading-snug">
          {label}
        </span>
      </div>
    </div>
  );
}
