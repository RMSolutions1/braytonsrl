'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Garantia de Calidad',
    description: 'Cumplimiento de normas y estandares de construccion'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Cumplimiento de Plazos',
    description: 'Entrega en tiempo y forma segun cronograma'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Equipo Profesional',
    description: 'Ingenieros, arquitectos y tecnicos certificados'
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
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Equipo BRAYTON SRL en obra de construccion"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Secondary image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
                alt="Proyecto industrial"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-brayton-accent text-white px-6 py-4 rounded-xl shadow-lg"
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
              overline="Quienes Somos"
              title="Experiencia y capacidad operativa a su servicio"
              subtitle="BRAYTON SRL es una empresa salteña de ingenieria y construccion con amplia trayectoria en obras publicas y privadas, proyectos residenciales, comerciales, industriales y mineria."
            />
            
            <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ofrecemos soluciones integrales llave en mano: desde el diseño y la ingenieria hasta la ejecucion y puesta en marcha. Nuestro equipo combina ingenieria civil, arquitectura, instalaciones y logistica para entregar proyectos con los mas altos estandares de calidad.
              </p>
              <p>
                Trabajamos para empresas, gobiernos e instituciones que requieren un socio confiable, con capacidad de escala y rigor tecnico comprobado.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-center sm:text-left"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brayton-accent/10 text-brayton-accent mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-brayton-navy text-sm">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
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
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-brayton-navy text-brayton-navy font-semibold transition-all hover:bg-brayton-navy hover:text-white"
              >
                Conocer mas sobre nosotros
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
