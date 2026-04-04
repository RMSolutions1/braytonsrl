'use client';

/**
 * Logo BRAYTON SRL - Diseño profesional y elegante
 * Icono de construcción integrado con tipografía moderna
 */
export default function BraytonLogo({ 
  className = '', 
  variant = 'full',
  color = 'dark'
}: { 
  className?: string;
  variant?: 'full' | 'icon';
  color?: 'dark' | 'light';
}) {
  const textColor = color === 'dark' ? '#0a1628' : '#ffffff';
  const accentColor = '#e85d04';
  
  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className={className}
        aria-label="BRAYTON SRL"
      >
        {/* Modern construction icon */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#c95203" />
          </linearGradient>
        </defs>
        <rect x="4" y="32" width="40" height="4" rx="1" fill={textColor} opacity="0.9"/>
        <path d="M8 32V18L24 8L40 18V32" stroke={textColor} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="22" width="12" height="10" rx="1" fill="url(#logoGradient)"/>
        <path d="M24 8L24 4" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="url(#logoGradient)"/>
      </svg>
    );
  }
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 48"
      className={className}
      aria-label="BRAYTON SRL"
    >
      <defs>
        <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#c95203" />
        </linearGradient>
      </defs>
      
      {/* Icon */}
      <g transform="translate(0, 0)">
        <rect x="4" y="34" width="36" height="3" rx="1" fill={textColor} opacity="0.85"/>
        <path d="M7 34V20L22 10L37 20V34" stroke={textColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="16" y="23" width="12" height="11" rx="1" fill="url(#logoGradientFull)"/>
        <path d="M22 10V6" stroke="url(#logoGradientFull)" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="22" cy="5" r="2" fill="url(#logoGradientFull)"/>
      </g>
      
      {/* BRAYTON text */}
      <text
        x="48"
        y="30"
        fill={textColor}
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.03em"
        fontFamily="var(--font-outfit), system-ui, sans-serif"
      >
        BRAYTON
      </text>
      
      {/* SRL text */}
      <text
        x="160"
        y="30"
        fill="url(#logoGradientFull)"
        fontSize="14"
        fontWeight="600"
        letterSpacing="0.05em"
        fontFamily="var(--font-outfit), system-ui, sans-serif"
      >
        SRL
      </text>
      
      {/* Tagline */}
      <text
        x="48"
        y="42"
        fill={textColor}
        opacity="0.5"
        fontSize="7"
        fontWeight="500"
        letterSpacing="0.15em"
        fontFamily="var(--font-dm-sans), system-ui, sans-serif"
      >
        INGENIERIA Y CONSTRUCCION
      </text>
    </svg>
  );
}
