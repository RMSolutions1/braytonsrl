'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const advantages = [
  { title: 'Experiencia comprobada', description: '5+ años liderando proyectos de infraestructura y construcción en Salta y la región.', icon: 'calendar' },
  { title: 'Equipo multidisciplinario', description: 'Profesionales en ingeniería, arquitectura, instalaciones y gestión de obras.', icon: 'users' },
  { title: 'Normativas y calidad', description: 'Cumplimiento de códigos, AEA, seguridad e higiene en cada proyecto.', icon: 'shield' },
  { title: 'Soluciones integrales', description: 'Un solo responsable desde el diseño hasta la entrega llave en mano.', icon: 'layers' },
  { title: 'Compromiso con plazos', description: 'Gestión eficiente con planificación y control para cumplir fechas acordadas.', icon: 'clock' },
  { title: 'Mejora continua', description: 'Innovación en procesos y técnicas constructivas para optimizar resultados.', icon: 'trend' },
];

const iconSvg: Record<string, React.ReactNode> = {
  calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  layers: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  trend: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
};

export default function AdvantagesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0a1628] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Ventajas"
            title="Por qué elegir BRAYTON"
            subtitle="Experiencia técnica, compromiso con la calidad y estándares de seguridad."
          />
        </div>
        <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center"
            >
              <div className="w-11 h-11 mx-auto rounded-lg bg-white/10 flex items-center justify-center text-brayton-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{iconSvg[item.icon]}</svg>
              </div>
              <h3 className="mt-3 font-display font-semibold text-base text-white">{item.title}</h3>
              <p className="mt-1.5 text-xs text-white/65 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
