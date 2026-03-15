'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const testimonials = [
  {
    quote: 'BRAYTON SRL nos entregó la obra en tiempo y forma. Profesionalismo y capacidad técnica de primer nivel.',
    author: 'Ing. Director de Obras',
    company: 'Empresa industrial',
  },
  {
    quote: 'Excelente partner para proyectos de infraestructura. Soluciones integrales y un solo interlocutor.',
    author: 'Responsable de Proyectos',
    company: 'Organismo público',
  },
  {
    quote: 'Confiamos en ellos para nuestra planta. Desde ingeniería hasta puesta en marcha, todo impecable.',
    author: 'Gerente General',
    company: 'Sector agroindustrial',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Testimonios"
            title="Lo que dicen nuestros clientes"
            subtitle="Empresas y organismos que confiaron en BRAYTON SRL para sus proyectos."
          />
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-lg border border-[#e5e7eb] bg-[#fafafa]"
            >
              <p className="text-sm text-[var(--brayton-muted)] italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <cite className="not-italic font-display font-semibold text-sm text-[#0a1628]">{t.author}</cite>
                <p className="text-xs text-[var(--brayton-muted)] mt-0.5">{t.company}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
