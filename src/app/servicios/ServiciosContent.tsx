'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';

export default function ServiciosContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <p className="text-center text-brayton-slate max-w-2xl mx-auto mb-16">
        Ofrecemos servicios que cubren todo el ciclo del proyecto: desde la idea y el diseño hasta la entrega y puesta en marcha. Cada uno con alcance, proceso y beneficios detallados.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {servicesData.map((service, i) => (
          <motion.article
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={`/servicios/${service.slug}`}
              className="block h-full p-6 lg:p-8 bg-white rounded-xl border border-gray-100 hover:border-brayton-accent/30 hover:shadow-lg transition-all group"
            >
              <span className="text-brayton-accent font-display font-bold text-3xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-3 font-display font-bold text-xl text-brayton-navy group-hover:text-brayton-accent transition-colors">
                {service.title}
              </h2>
              <p className="mt-3 text-brayton-slate text-sm leading-relaxed">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center text-brayton-accent font-semibold text-sm group-hover:underline">
                Ver detalle del servicio →
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
