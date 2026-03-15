'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    overline: 'Construcción profesional',
    title: 'Desde 2020',
    highlight: 'años de excelencia',
    description: 'Empresa salteña dedicada a obras públicas, construcción civil, instalaciones e infraestructura.',
    ctaPrimary: 'Solicitar cotización',
    ctaPrimaryHref: '/contacto',
    ctaSecondary: 'Ver proyectos',
    ctaSecondaryHref: '/proyectos',
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
    overline: 'Obras industriales y comerciales',
    title: 'Un solo responsable',
    highlight: 'de principio a fin',
    description: 'Diseño, ingeniería, construcción e instalaciones. Entregas en tiempo y forma.',
    ctaPrimary: 'Nuestros servicios',
    ctaPrimaryHref: '/servicios',
    ctaSecondary: 'Sectores',
    ctaSecondaryHref: '/sectores',
  },
  {
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=80',
    overline: 'Experiencia y capacidad',
    title: 'Confianza y escala',
    highlight: 'para su proyecto',
    description: 'Trabajamos con empresas, organismos públicos e instituciones que exigen calidad y un partner confiable.',
    ctaPrimary: 'Conocer más',
    ctaPrimaryHref: '/nosotros',
    ctaSecondary: 'Contacto',
    ctaSecondaryHref: '/contacto',
  },
];

const DURATION_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), DURATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[88vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a1628]">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0a1628]/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brayton-accent mb-4">
              {slide.overline}
            </p>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              {slide.title}
              <br />
              <span className="text-brayton-accent">{slide.highlight}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              {slide.description}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={slide.ctaPrimaryHref}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-brayton-accent text-white text-sm font-medium transition-colors hover:bg-[#c95203]"
              >
                {slide.ctaPrimary}
              </Link>
              <Link
                href={slide.ctaSecondaryHref}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-white/30 text-white text-sm font-medium transition-colors hover:bg-white/10"
              >
                {slide.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.06] bg-[#0a1628]/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <p className="font-display font-semibold text-xl sm:text-2xl text-brayton-accent">5+</p>
              <p className="text-[11px] sm:text-xs text-white/50 mt-0.5 uppercase tracking-wider">Años</p>
            </div>
            <div>
              <p className="font-display font-semibold text-xl sm:text-2xl text-brayton-accent">150+</p>
              <p className="text-[11px] sm:text-xs text-white/50 mt-0.5 uppercase tracking-wider">Proyectos</p>
            </div>
            <div>
              <p className="font-display font-semibold text-xl sm:text-2xl text-brayton-accent">5</p>
              <p className="text-[11px] sm:text-xs text-white/50 mt-0.5 uppercase tracking-wider">Áreas</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center transition-colors hover:bg-white/10"
        aria-label="Anterior"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center transition-colors hover:bg-white/10"
        aria-label="Siguiente"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-20 sm:bottom-18 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-brayton-accent' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
