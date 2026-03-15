'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ overline, title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      className={`max-w-2xl ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
    >
      {overline && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brayton-accent mb-3">
          {overline}
        </p>
      )}
      <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-brayton-navy tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[var(--brayton-muted)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
