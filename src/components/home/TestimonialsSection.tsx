'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const testimonials = [
  {
    quote: 'BRAYTON SRL nos entrego la obra en tiempo y forma. Profesionalismo y capacidad tecnica de primer nivel. Sin duda, el mejor socio para nuestros proyectos de infraestructura.',
    author: 'Ing. Carlos Martinez',
    role: 'Director de Obras',
    company: 'Empresa Industrial del Norte',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'
  },
  {
    quote: 'Excelente partner para proyectos de infraestructura publica. Soluciones integrales, cumplimiento de plazos y un solo interlocutor responsable. Muy recomendados.',
    author: 'Lic. Maria Fernandez',
    role: 'Responsable de Proyectos',
    company: 'Organismo Publico Provincial',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'
  },
  {
    quote: 'Confiamos en ellos para nuestra planta industrial. Desde la ingenieria hasta la puesta en marcha, todo impecable. Profesionales serios y comprometidos con el resultado.',
    author: 'Roberto Sanchez',
    role: 'Gerente General',
    company: 'Agroindustrial del NOA',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <SectionTitle
            overline="Testimonios"
            title="Lo que dicen nuestros clientes"
            subtitle="Empresas y organismos que confiaron en BRAYTON SRL para sus proyectos mas importantes."
            align="center"
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-brayton-accent/10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
            >
              <blockquote className="text-center">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-brayton-accent/20 mb-4">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <cite className="not-italic">
                    <span className="block font-display font-bold text-brayton-navy">
                      {testimonials[current].author}
                    </span>
                    <span className="block text-sm text-brayton-accent font-medium mt-0.5">
                      {testimonials[current].role}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                      {testimonials[current].company}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brayton-accent hover:border-brayton-accent transition-colors"
              aria-label="Anterior testimonio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current 
                      ? 'bg-brayton-accent w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a testimonio ${i + 1}`}
                />
              ))}
            </div>
            
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brayton-accent hover:border-brayton-accent transition-colors"
              aria-label="Siguiente testimonio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
