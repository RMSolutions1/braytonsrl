'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-brayton-navy relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brayton-navy via-brayton-navy/95 to-brayton-navy/80" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brayton-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brayton-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-brayton-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brayton-accent">
                Contactenos
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Comencemos su proyecto hoy
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Estamos listos para transformar su vision en realidad. Contactenos para una consulta gratuita y sin compromiso.
            </p>
            
            {/* Contact info */}
            <div className="mt-10 space-y-5">
              <a 
                href="tel:+543874498588" 
                className="group flex items-center gap-4 text-white/85 hover:text-white transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-brayton-accent/20 flex items-center justify-center text-brayton-accent group-hover:bg-brayton-accent group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-white/50">Llamenos</p>
                  <p className="font-semibold">+54 387 4498588</p>
                </div>
              </a>
              
              <a 
                href="mailto:contacto@braytonsrl.com.ar" 
                className="group flex items-center gap-4 text-white/85 hover:text-white transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-brayton-accent/20 flex items-center justify-center text-brayton-accent group-hover:bg-brayton-accent group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-white/50">Escribanos</p>
                  <p className="font-semibold">contacto@braytonsrl.com.ar</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-white/85">
                <span className="w-12 h-12 rounded-xl bg-brayton-accent/20 flex items-center justify-center text-brayton-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-white/50">Visitenos</p>
                  <p className="font-semibold">Pasaje Santa Victoria 762, Centro</p>
                  <p className="text-sm text-white/60">4400 Salta, Argentina</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            <h3 className="font-display font-bold text-2xl text-brayton-navy">
              Solicite una cotizacion
            </h3>
            <p className="mt-2 text-gray-600">
              Complete el formulario y nos pondremos en contacto en menos de 24 horas habiles.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Respuesta en menos de 24 horas</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Presupuesto sin compromiso</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Asesoramiento tecnico gratuito</span>
              </div>
            </div>

            <Link
              href="/contacto"
              className="group mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brayton-accent text-white font-semibold shadow-lg shadow-brayton-accent/30 transition-all hover:bg-brayton-accent-dark hover:-translate-y-0.5"
            >
              Ir al formulario de contacto
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <p className="mt-6 text-center text-xs text-gray-500">
              Horario de atencion: Lunes a Viernes, 8:00 a 18:00
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
