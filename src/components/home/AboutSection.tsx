'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const features = [
  {
    icon: CheckCircle,
    title: 'Garantía de Calidad',
    description: 'Cumplimiento de normas y estándares internacionales de construcción'
  },
  {
    icon: Clock,
    title: 'Cumplimiento de Plazos',
    description: 'Entrega en tiempo y forma según cronograma acordado'
  },
  {
    icon: Users,
    title: 'Equipo Profesional',
    description: 'Ingenieros, arquitectos y técnicos especializados y certificados'
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-brayton-navy/10">
              <Image
                src="/images/engineering-team.jpg"
                alt="Equipo BRAYTON SRL en obra de construcción"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Secondary image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <Image
                src="/images/industrial-project.jpg"
                alt="Proyecto industrial en desarrollo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="256px"
              />
            </div>
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-gradient-to-r from-brayton-accent to-brayton-accent-dark text-white px-6 py-4 rounded-xl shadow-lg"
            >
              <p className="font-display font-bold text-3xl lg:text-4xl">5+</p>
              <p className="text-xs uppercase tracking-wider opacity-90">Años de<br/>Experiencia</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              overline="Quiénes Somos"
              title="Experiencia y capacidad operativa a su servicio"
              subtitle="BRAYTON SRL es una empresa salteña de ingeniería y construcción con amplia trayectoria en obras públicas y privadas, proyectos residenciales, comerciales, industriales y minería."
            />
            
            <div className="mt-8 space-y-4 text-brayton-slate leading-relaxed">
              <p>
                Ofrecemos soluciones integrales llave en mano: desde el diseño y la ingeniería hasta la ejecución y puesta en marcha. Nuestro equipo combina ingeniería civil, arquitectura, instalaciones y logística para entregar proyectos con los más altos estándares de calidad.
              </p>
              <p>
                Trabajamos para empresas, gobiernos e instituciones que requieren un socio confiable, con capacidad de escala y rigor técnico comprobado en más de 150 proyectos exitosos.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brayton-accent/10 text-brayton-accent flex items-center justify-center mt-1">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-brayton-navy text-base">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-brayton-slate">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <Link 
                href="/nosotros" 
                className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-brayton-navy text-brayton-navy font-display font-semibold transition-all hover:bg-brayton-navy hover:text-white"
              >
                Conocer más sobre nosotros
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
