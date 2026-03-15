'use client';

/**
 * Réplica del logo original BRAYTON SRL: halcón en vuelo, sol rojo, texto.
 * Fondo transparente, escalable. Mismo diseño que la imagen original.
 */
export default function BraytonLogoOriginal({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 80"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      {/* Sol / medio círculo rojo detrás del halcón */}
      <path
        fill="#c41e3a"
        d="M100 8 a 42 42 0 0 1 0 44 L100 52 a 28 28 0 0 0 0 -36 Z"
      />
      {/* Halcón en vuelo (silueta negra), alas en V */}
      <g fill="#1a1a1a">
        <path
          d="M72 28 L58 20 L48 28 L52 36 L62 32 L72 36 L78 32 L88 24 L92 18 L88 14 L82 18 L78 24 L72 28 Z"
        />
        <path
          d="M128 24 L142 18 L152 26 L148 34 L138 30 L128 34 L122 30 L112 22 L108 16 L112 12 L118 16 L122 22 L128 24 Z"
        />
        <path
          d="M82 36 L90 44 L98 38 L106 44 L118 36 L112 28 L100 32 L88 28 L82 36 Z"
        />
        <circle cx="96" cy="34" r="2" fill="#fff" />
      </g>
      {/* Texto BRAYTON SRL */}
      <text
        x="100"
        y="68"
        textAnchor="middle"
        fill="#1a1a1a"
        fontSize="18"
        fontWeight="700"
        letterSpacing="0.12em"
        fontFamily="var(--font-outfit), system-ui, sans-serif"
      >
        BRAYTON SRL
      </text>
    </svg>
  );
}
