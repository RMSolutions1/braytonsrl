'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const services = [
  { title: 'Construcción integral', description: 'Obras llave en mano: desde cimentación hasta entrega final.', href: '/servicios/construccion-integral', count: '200+' },
  { title: 'Ingeniería', description: 'Civil, estructural, de procesos y de detalle. Anteproyectos y ejecutivos.', href: '/servicios/ingenieria', count: '150+' },
  { title: 'Arquitectura', description: 'Diseño arquitectónico y dirección de obra para todo tipo de proyectos.', href: '/servicios/arquitectura', count: '120+' },
  { title: 'Instalaciones', description: 'Eléctricas, sanitarias, de gas. Diseño, ejecución y certificación.', href: '/servicios/instalaciones', count: '180+' },
  { title: 'Transporte de cargas', description: 'Logística y transporte de materiales y equipos para obra.', href: '/servicios/transporte', count: '140+' },
];

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Servicios"
            title="Servicios integrales de construcción"
            subtitle="Obras públicas, construcción civil, instalaciones e infraestructura. Profesionales en ingeniería, higiene y seguridad."
          />
        </div>
        <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={service.href}
                className="block h-full p-5 sm:p-6 bg-white rounded-lg border border-[#e5e7eb] transition-colors hover:border-brayton-accent/40 group"
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-brayton-accent">{service.count} proyectos</p>
                <h3 className="mt-2 font-display font-semibold text-lg text-[#0a1628] group-hover:text-brayton-accent transition-colors">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-sm text-[var(--brayton-muted)] leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-brayton-accent group-hover:underline">
                  Conocer más
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center px-4 py-2.5 rounded-md border border-[#0a1628] text-[#0a1628] text-sm font-medium transition-colors hover:bg-[#0a1628] hover:text-white"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
