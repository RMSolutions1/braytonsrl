'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';

const serviceImages: Record<string, string> = {
  'construccion-integral': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  'ingenieria': 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80',
  'arquitectura': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  'instalaciones-electricas': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
  'instalaciones-sanitarias': 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
  'instalaciones-gas': 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
  'transporte': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
};

const serviceIcons: Record<string, React.ReactNode> = {
  'construccion-integral': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'ingenieria': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'arquitectura': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'instalaciones-electricas': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'instalaciones-sanitarias': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'instalaciones-gas': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  'transporte': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
};

export default function ServiciosContent() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brayton-accent/10 text-brayton-accent text-sm font-medium rounded-full mb-4">
            Soluciones Integrales
          </span>
          <p className="text-lg text-brayton-slate leading-relaxed">
            Ofrecemos servicios que cubren todo el ciclo del proyecto: desde la idea y el diseno hasta la entrega y puesta en marcha. Cada servicio con alcance, proceso y beneficios detallados.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {servicesData.map((service, i) => {
            const imageUrl = serviceImages[service.slug] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';
            const icon = serviceIcons[service.slug];
            
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/servicios/${service.slug}`}
                  className="group relative flex flex-col md:flex-row h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brayton-accent/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brayton-navy/60 to-brayton-navy/20" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                      {icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-brayton-accent/60 font-mono text-sm font-medium">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    
                    <h2 className="font-display font-bold text-xl lg:text-2xl text-brayton-navy group-hover:text-brayton-accent transition-colors">
                      {service.title}
                    </h2>
                    
                    <p className="mt-3 text-brayton-slate text-sm leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-brayton-accent font-semibold text-sm">
                      <span>Conocer mas</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
        
        {/* Additional info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 lg:p-12 bg-brayton-navy rounded-2xl text-white"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="font-display font-bold text-2xl">Enfoque Llave en Mano</h3>
              <p className="mt-3 text-white/70 leading-relaxed">
                Todos nuestros servicios pueden integrarse en un solo contrato de obra completa. Un solo responsable, un solo interlocutor, y la garantia de cumplimiento de plazos y presupuesto.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brayton-accent text-white font-semibold rounded-lg hover:bg-brayton-accent/90 transition-colors"
              >
                <span>Solicitar propuesta</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
