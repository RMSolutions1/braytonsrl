'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0d2137]"
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
              alt="Equipo BRAYTON SRL en obra"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div>
            <SectionTitle
              overline="Quiénes somos"
              title="Experiencia y capacidad operativa a su servicio"
              subtitle="BRAYTON SRL es una empresa de ingeniería y construcción con trayectoria en obras públicas y privadas, residenciales, comerciales, industriales y minería."
            />
            <motion.div
              className="mt-6 space-y-4 text-[var(--brayton-muted)] text-sm leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p>Ofrecemos soluciones integrales llave en mano: desde el diseño y la ingeniería hasta la ejecución y puesta en marcha. Nuestro equipo combina ingeniería civil, arquitectura, instalaciones y logística para entregar proyectos con los más altos estándares de calidad.</p>
              <p>Trabajamos para empresas, gobiernos e instituciones que requieren un partner confiable, con capacidad de escala y rigor técnico.</p>
            </motion.div>
            <motion.div className="mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Link href="/nosotros" className="inline-flex items-center px-4 py-2.5 rounded-md border border-[#0a1628] text-[#0a1628] text-sm font-medium transition-colors hover:bg-[#0a1628] hover:text-white">
                Conocer más
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
