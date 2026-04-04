'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface Sector {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  details: string;
  sort_order: number;
}

const defaultSectors = [
  {
    id: '1',
    title: 'Residencial',
    description: 'Vivienda unifamiliar, multifamiliar, conjuntos habitacionales y obras complementarias.',
    icon: 'Home',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    details: 'Proyecto y ejecución de obra civil, instalaciones y terminaciones.',
    sort_order: 0,
  },
  {
    id: '2',
    title: 'Comercial',
    description: 'Edificios de oficinas, locales comerciales, centros de servicio y equipamiento urbano.',
    icon: 'Building2',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    details: 'Diseño y construcción adaptados a uso comercial, entregas llave en mano.',
    sort_order: 1,
  },
];

export default function SectoresContent() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch('/api/sectors');
        const data = await res.json();
        setSectors(Array.isArray(data) && data.length > 0 ? data : defaultSectors);
      } catch (error) {
        console.error('Error fetching sectors:', error);
        setSectors(defaultSectors);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin w-8 h-8 text-brayton-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {sectors
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-xl overflow-hidden border border-gray-200 hover:border-brayton-accent hover:shadow-xl transition-all bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-brayton-slate">
                  {sector.image_url ? (
                    <Image
                      src={sector.image_url}
                      alt={sector.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brayton-navy/20 to-brayton-accent/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-brayton-navy mb-2">{sector.title}</h3>
                  <p className="text-sm text-brayton-slate mb-3">{sector.description}</p>

                  {sector.details && (
                    <motion.div
                      initial={false}
                      animate={{ height: expandedId === sector.id ? 'auto' : 0, opacity: expandedId === sector.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 mb-4 pt-2">{sector.details}</p>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2">
                    {sector.details && (
                      <button
                        onClick={() => setExpandedId(expandedId === sector.id ? null : sector.id)}
                        className="text-brayton-accent hover:underline text-sm font-medium"
                      >
                        {expandedId === sector.id ? 'Menos' : 'Más'} información
                      </button>
                    )}
                    <Link
                      href="/contacto"
                      className="ml-auto text-brayton-accent hover:text-brayton-accent-dark font-semibold text-sm"
                    >
                      Contactar →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
  {
    id: 'residencial',
    name: 'Residencial',
    needs: 'Vivienda unifamiliar, multifamiliar, conjuntos habitacionales y obras complementarias.',
    solutions: 'Proyecto y ejecucion de obra civil, instalaciones y terminaciones. Cumplimiento de codigos y normativas locales.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'comercial',
    name: 'Comercial',
    needs: 'Edificios de oficinas, locales comerciales, centros de servicio y equipamiento urbano.',
    solutions: 'Diseno y construccion adaptados a uso comercial, instalaciones y certificaciones. Entregas llave en mano.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'industrial',
    name: 'Industrial',
    needs: 'Naves, plantas de produccion, depositos, oficinas tecnicas y obras de apoyo.',
    solutions: 'Ingenieria y construccion industrial: estructuras metalicas, hormigon, instalaciones especiales y puesta en marcha.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'agro',
    name: 'Agro',
    needs: 'Galpones, silos, plantas de acopio, instalaciones de proceso y logistica rural.',
    solutions: 'Obras civiles e instalaciones para el sector agropecuario y agroindustrial. Experiencia en grandes superficies.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'factory',
    name: 'Factory',
    needs: 'Espacios productivos, lineas de montaje, talleres y edificios de apoyo fabril.',
    solutions: 'Construccion y adaptacion de espacios para manufactura, con foco en plazos y estandares de seguridad.',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'mineria',
    name: 'Mineria',
    needs: 'Obras de apoyo minero, campamentos, instalaciones de proceso y infraestructura de sitio.',
    solutions: 'Proyectos en entornos mineros: obra civil, instalaciones y logistica. Conocimiento de normativa sectorial.',
    image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function SectoresContent() {
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
            Experiencia Multisectorial
          </span>
          <p className="text-lg text-brayton-slate leading-relaxed">
            Nuestra experiencia abarca multiples industrias, adaptando soluciones de ingenieria y construccion a las necesidades especificas de cada sector.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectors.map((sector, i) => (
            <motion.article
              key={sector.id}
              id={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group scroll-mt-24 relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brayton-accent/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/90 via-brayton-navy/40 to-transparent" />
                
                {/* Icon badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/20">
                  {sector.icon}
                </div>
                
                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-display font-bold text-2xl text-white">
                    {sector.name}
                  </h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-brayton-accent uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="w-4 h-px bg-brayton-accent" />
                      Necesidades del sector
                    </h3>
                    <p className="text-brayton-slate text-sm leading-relaxed">
                      {sector.needs}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-semibold text-brayton-accent uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="w-4 h-px bg-brayton-accent" />
                      Nuestras soluciones
                    </h3>
                    <p className="text-brayton-slate text-sm leading-relaxed">
                      {sector.solutions}
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 text-brayton-accent font-semibold text-sm group-hover:underline"
                >
                  <span>Consultar para este sector</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
              alt="Fondo de la sección"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brayton-navy/90" />
          </div>
          
          <div className="relative p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="font-display font-bold text-2xl">Su sector no esta listado?</h3>
                <p className="mt-3 text-white/70 leading-relaxed">
                  Evaluamos cada proyecto de manera individual. Contamos con la flexibilidad y experiencia para adaptarnos a requerimientos especificos de cualquier industria.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brayton-accent text-white font-semibold rounded-lg hover:bg-brayton-accent/90 transition-colors"
                >
                  <span>Contactenos</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
