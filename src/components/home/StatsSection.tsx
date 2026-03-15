'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { value: 150, suffix: '+', label: 'Proyectos completados' },
  { value: 25, suffix: '+', label: 'Años de experiencia' },
  { value: 80, suffix: '+', label: 'Clientes atendidos' },
  { value: 6, suffix: '', label: 'Sectores de actividad' },
];

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0d2137] text-white border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display font-semibold text-3xl sm:text-4xl text-brayton-accent">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs text-white/55 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
