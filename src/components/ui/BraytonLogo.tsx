'use client';

import Image from 'next/image';

export default function BraytonLogo({ 
  className = '', 
  width = 40,
  height = 40
}: { 
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/images/brayton-logo.png"
        alt="BRAYTON SRL"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </div>
  );
}
