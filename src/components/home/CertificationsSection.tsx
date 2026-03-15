'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const certs = [
  { name: 'Normativas locales', short: 'Códigos y AEA' },
  { name: 'Seguridad e higiene', short: 'ISO 45001' },
  { name: 'Calidad', short: 'ISO 9001' },
  { name: 'Medio ambiente', short: 'ISO 14001' },
];

export default function CertificationsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Compromiso"
            title="Certificaciones y cumplimiento"
            subtitle="Estándares de calidad, seguridad y medio ambiente en cada proyecto."
          />
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-lg border border-[#e5e7eb] bg-[#fafafa] text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-lg bg-brayton-accent/15 flex items-center justify-center text-brayton-accent font-display font-semibold text-sm">
                ✓
              </div>
              <h3 className="mt-3 font-display font-semibold text-sm text-[#0a1628]">{c.name}</h3>
              <p className="mt-0.5 text-xs text-[var(--brayton-muted)]">{c.short}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
