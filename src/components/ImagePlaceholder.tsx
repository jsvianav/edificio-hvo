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
      className={`relative flex items-center justify-center bg-gradient-to-br from-turquesa-100 dark:from-turquesa-900 to-piedra-200 dark:to-gray-700 overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Patrón decorativo de fondo */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${label}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0C757C" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${label})`} />
      </svg>

      {/* Icono central */}
      <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
        <svg
          className="w-10 h-10 text-turquesa-600 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A2.25 2.25 0 0023.25 18V6A2.25 2.25 0 0021 3.75H3A2.25 2.25 0 00.75 6v12A2.25 2.25 0 003 20.25z" />
        </svg>
        <span className="text-xs font-inter font-medium text-turquesa-800 dark:text-turquesa-200 opacity-70 max-w-[160px] leading-snug">
          {label}
        </span>
      </div>
    </div>
  );
}
