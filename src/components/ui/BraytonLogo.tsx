'use client';

/**
 * Logo BRAYTON SRL en SVG: fondo transparente, escalable y 100% compatible
 * con la identidad de la web (Outfit, navy, accent).
 * Usa currentColor para el texto principal; SRL en naranja de marca.
 * Tamaño por contenedor: envuelve en un div con h-9 w-[140px] lg:h-10 lg:w-[160px] (o similar).
 */
export default function BraytonLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      className={`font-display ${className}`}
      aria-hidden
    >
      <g fill="none">
        <text
          x="0"
          y="28"
          fill="currentColor"
          fontSize="24"
          fontWeight="700"
          letterSpacing="-0.02em"
          fontFamily="var(--font-outfit), system-ui, sans-serif"
        >
          BRAYTON
        </text>
        <text
          x="118"
          y="28"
          fill="#e85d04"
          fontSize="14"
          fontWeight="600"
          letterSpacing="0.02em"
          fontFamily="var(--font-outfit), system-ui, sans-serif"
        >
          SRL
        </text>
      </g>
    </svg>
  );
}
