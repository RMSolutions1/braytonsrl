'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/images/hero-construction.jpg',
    overline: 'Construcción Profesional',
    title: 'Construimos el futuro',
    highlight: 'con excelencia',
    description: 'Empresa salteña líder en ingeniería, construcción y servicios integrales. Más de 150 proyectos ejecutados con los más altos estándares de calidad y profesionalismo.',
    ctaPrimary: 'Solicitar Cotización',
    ctaPrimaryHref: '/contacto',
    ctaSecondary: 'Ver Proyectos',
    ctaSecondaryHref: '/proyectos',
  },
  {
    image: '/images/industrial-project.jpg',
    overline: 'Soluciones Integrales',
    title: 'Un solo responsable',
    highlight: 'de principio a fin',
    description: 'Diseño, ingeniería, construcción e instalaciones bajo un mismo contrato. Garantizamos plazos, calidad y presupuesto acordado con total transparencia.',
    ctaPrimary: 'Nuestros Servicios',
    ctaPrimaryHref: '/servicios',
    ctaSecondary: 'Conocer Sectores',
    ctaSecondaryHref: '/sectores',
  },
  {
    image: '/images/completed-project.jpg',
    overline: 'Experiencia Comprobada',
    title: 'Confianza y escala',
    highlight: 'para su proyecto',
    description: 'Trabajamos con empresas, organismos públicos e instituciones que exigen calidad, profesionalismo y un partner confiable para sus proyectos más importantes.',
    ctaPrimary: 'Sobre Nosotros',
    ctaPrimaryHref: '/nosotros',
    ctaSecondary: 'Contactar',
    ctaSecondaryHref: '/contacto',
  },
];

const stats = [
  { value: '5+', label: 'Años de Experiencia' },
  { value: '150+', label: 'Proyectos Completados' },
  { value: '6', label: 'Sectores de Actividad' },
  { value: '100%', label: 'Compromiso' },
];

const DURATION_MS = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const slide = slides[index];

  const nextSlide = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((i: number) => {
    setIndex(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextSlide();
          return 0;
        }
        return p + (100 / (DURATION_MS / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[100svh] flex flex-col bg-brayton-navy overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-brayton-navy via-brayton-navy/80 to-brayton-navy/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy via-transparent to-brayton-navy/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brayton-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brayton-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Overline */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="h-px w-12 bg-brayton-accent" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brayton-accent">
                    {slide.overline}
                  </span>
                </motion.div>

                {/* Title */}
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
                  {slide.title}
                  <br />
                  <span className="text-brayton-accent">{slide.highlight}</span>
                </h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href={slide.ctaPrimaryHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-brayton-accent text-white text-base font-semibold shadow-xl shadow-brayton-accent/30 transition-all hover:bg-brayton-accent-dark hover:-translate-y-0.5"
                  >
                    {slide.ctaPrimary}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href={slide.ctaSecondaryHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                  >
                    {slide.ctaSecondary}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              i === index 
                ? 'bg-brayton-accent scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          >
            {i === index && (
              <svg className="absolute -inset-1.5 w-6 h-6" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-brayton-accent/40"
                  strokeDasharray={`${progress * 0.628} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 12 12)"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/10 hover:scale-110"
        aria-label="Anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 lg:right-8 md:right-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/10 hover:scale-110 md:hidden"
        aria-label="Siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-brayton-navy/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-6 lg:py-8 text-center"
              >
                <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-brayton-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile slide indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-brayton-accent' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
