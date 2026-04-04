'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionTitle({ 
  overline, 
  title, 
  subtitle, 
  className = '',
  align = 'left',
  dark = false
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  
  return (
    <motion.div
      className={`max-w-2xl ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {overline && (
        <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-brayton-accent" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brayton-accent">
            {overline}
          </p>
          {align === 'center' && <span className="h-px w-8 bg-brayton-accent" />}
        </div>
      )}
      <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance ${
        dark ? 'text-white' : 'text-brayton-navy'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          dark ? 'text-white/70' : 'text-gray-600'
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
