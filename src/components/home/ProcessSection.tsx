'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const steps = [
  { num: '01', title: 'Consulta inicial', description: 'Análisis de necesidades, objetivos y requisitos técnicos.' },
  { num: '02', title: 'Evaluación técnica', description: 'Estudio de factibilidad, inspección y anteproyecto.' },
  { num: '03', title: 'Propuesta personalizada', description: 'Solución técnica, cronograma y presupuesto.' },
  { num: '04', title: 'Ejecución profesional', description: 'Construcción con control de calidad y seguridad.' },
  { num: '05', title: 'Entrega y garantía', description: 'Inspección final, documentación y post-entrega.' },
];

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Metodología"
            title="Nuestro proceso de trabajo"
            subtitle="Metodología probada que garantiza resultados en cada etapa."
          />
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center"
            >
              <div className="font-display font-semibold text-2xl text-brayton-accent/40">{step.num}</div>
              <h3 className="mt-2 font-display font-semibold text-sm text-[#0a1628]">{step.title}</h3>
              <p className="mt-1 text-xs text-[var(--brayton-muted)] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
