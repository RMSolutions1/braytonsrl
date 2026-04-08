'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Lightbulb, Home, Zap, Truck, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const services = [
  { 
    title: 'Construcción Integral', 
    description: 'Obras llave en mano desde la cimentación hasta la entrega final. Gestión completa de plazos y calidad bajo un único contrato.',
    href: '/servicios/construccion-integral',
    image: '/images/hero-construction.jpg',
    icon: Building2
  },
  { 
    title: 'Ingeniería', 
    description: 'Ingeniería civil, estructural, de procesos y de detalle. Anteproyectos y proyectos ejecutivos con normativas vigentes.',
    href: '/servicios/ingenieria',
    image: '/images/engineering-team.jpg',
    icon: Lightbulb
  },
  { 
    title: 'Arquitectura', 
    description: 'Diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales.',
    href: '/servicios/arquitectura',
    image: '/images/industrial-project.jpg',
    icon: Home
  },
  { 
    title: 'Instalaciones', 
    description: 'Instalaciones eléctricas, sanitarias y de gas. Diseño, ejecución, pruebas y certificación profesional.',
    href: '/servicios/instalaciones',
    image: '/images/installations.jpg',
    icon: Zap
  },
  { 
    title: 'Transporte de Cargas', 
    description: 'Logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales.',
    href: '/servicios/transporte',
    image: '/images/completed-project.jpg',
    icon: Truck
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <SectionTitle
            overline="Nuestros Servicios"
            title="Soluciones integrales de construcción"
            subtitle="Ofrecemos una gama completa de servicios de ingeniería y construcción para proyectos de cualquier escala y complejidad."
          />
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-brayton-accent font-display font-semibold hover:gap-3 transition-all shrink-0"
          >
            Ver todos los servicios
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/80 via-brayton-navy/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center justify-center w-14 h-14 rounded-xl bg-brayton-accent/95 text-white shadow-lg">
                      <Icon size={28} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-brayton-navy group-hover:text-brayton-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-brayton-slate leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brayton-accent group-hover:gap-3 transition-all">
                      Conocer más
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
