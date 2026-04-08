'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const sectors = [
  { 
    name: 'Residencial', 
    slug: 'residencial',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    description: 'Viviendas unifamiliares y multifamiliares'
  },
  { 
    name: 'Comercial', 
    slug: 'comercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    description: 'Oficinas, locales y centros comerciales'
  },
  { 
    name: 'Industrial', 
    slug: 'industrial',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    description: 'Plantas, naves y depositos'
  },
  { 
    name: 'Agro', 
    slug: 'agro',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    description: 'Infraestructura agroindustrial'
  },
  { 
    name: 'Mineria', 
    slug: 'mineria',
    image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&q=80',
    description: 'Campamentos y obras de soporte'
  },
  { 
    name: 'Obra Publica', 
    slug: 'obra-publica',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    description: 'Infraestructura y equipamiento urbano'
  },
];

export default function SectorsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <SectionTitle
            overline="Sectores"
            title="Experiencia en multiples industrias"
            subtitle="Desde vivienda residencial hasta proyectos de mineria e infraestructura publica. Conocemos las particularidades de cada sector."
            align="center"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/sectores#${sector.slug}`}
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy via-brayton-navy/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-display font-bold text-xl lg:text-2xl text-white">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-xs lg:text-sm text-white/70 max-w-[200px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {sector.description}
                  </p>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    Ver proyectos
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/sectores"
            className="inline-flex items-center gap-2 text-brayton-accent font-semibold hover:gap-3 transition-all"
          >
            Ver detalle completo por sector
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
