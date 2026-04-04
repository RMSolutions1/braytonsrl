'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { 
    value: 150, 
    suffix: '+', 
    label: 'Proyectos Completados',
    description: 'Obras ejecutadas con exito'
  },
  { 
    value: 25, 
    suffix: '+', 
    label: 'Anos de Experiencia',
    description: 'Equipo fundador en la industria'
  },
  { 
    value: 80, 
    suffix: '+', 
    label: 'Clientes Satisfechos',
    description: 'Empresas e instituciones'
  },
  { 
    value: 100, 
    suffix: '%', 
    label: 'Compromiso',
    description: 'Cumplimiento de plazos'
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-brayton-navy via-brayton-blue to-brayton-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brayton-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brayton-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center relative"
            >
              {/* Divider */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
              )}
              
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-semibold text-brayton-accent uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
