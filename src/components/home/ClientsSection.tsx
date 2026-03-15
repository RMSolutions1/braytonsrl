'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const clients = [
  'Gobierno de Salta',
  'Empresas industriales',
  'Sector agro',
  'Desarrolladores',
  'Minería',
  'Instituciones',
];

export default function ClientsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Confianza"
            title="Clientes que confían en nosotros"
            subtitle="Colaboramos con organismos públicos, empresas e instituciones de la región."
          />
        </div>
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {clients.map((name) => (
            <div
              key={name}
              className="px-4 py-2.5 rounded-lg bg-white border border-[#e5e7eb] text-[var(--brayton-muted)] text-sm font-medium text-center min-w-[120px] sm:min-w-[140px]"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
