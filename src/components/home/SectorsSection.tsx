'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const sectors = [
  { name: 'Residencial', slug: 'residencial' },
  { name: 'Comercial', slug: 'comercial' },
  { name: 'Industrial', slug: 'industrial' },
  { name: 'Agro', slug: 'agro' },
  { name: 'Factory', slug: 'factory' },
  { name: 'Minería', slug: 'mineria' },
];

export default function SectorsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Sectores"
            title="Experiencia en múltiples industrias"
            subtitle="Desde vivienda hasta minería e industria."
          />
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/sectores#${sector.slug}`}
                className="flex items-center justify-center h-20 sm:h-24 rounded-lg bg-[#0a1628] text-white font-display font-medium text-sm sm:text-base transition-colors hover:bg-brayton-accent"
              >
                {sector.name}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/sectores"
            className="text-sm font-medium text-brayton-accent hover:underline"
          >
            Ver detalle por sector →
          </Link>
        </div>
      </div>
    </section>
  );
}
