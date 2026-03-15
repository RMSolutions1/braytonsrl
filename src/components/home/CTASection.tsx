'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brayton-accent/8 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            className="text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Comencemos su proyecto hoy
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Estamos listos para transformar su visión en realidad. Contáctenos para una consulta gratuita.
            </p>
            <div className="mt-8 space-y-5">
              <a href="tel:+5491112345678" className="flex items-center gap-3 text-white/85 hover:text-brayton-accent transition-colors">
                <span className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <div>
                  <p className="text-xs text-white/55">Llámenos</p>
                  <p className="font-medium text-sm">+54 9 11 1234-5678</p>
                </div>
              </a>
              <a href="mailto:contacto@braytonsrl.com.ar" className="flex items-center gap-3 text-white/85 hover:text-brayton-accent transition-colors">
                <span className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <div>
                  <p className="text-xs text-white/55">Escríbanos</p>
                  <p className="font-medium text-sm">contacto@braytonsrl.com.ar</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <span className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <div>
                  <p className="text-xs text-white/55">Visítenos</p>
                  <p className="font-medium text-sm">Pasaje Santa Victoria 762, Barrio Centro<br />4400 Salta, Salta, Argentina</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="rounded-lg border border-white/[0.08] bg-white/5 p-6 lg:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold text-lg text-white">Solicite una cotización</h3>
            <p className="mt-1.5 text-xs text-white/65">Complete el formulario y nos pondremos en contacto en menos de 24 horas.</p>
            <Link
              href="/contacto"
              className="mt-5 inline-flex items-center justify-center w-full py-3 rounded-md border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Ir al formulario de contacto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
