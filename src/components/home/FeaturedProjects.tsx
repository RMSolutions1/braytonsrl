'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { projects, getProjectsBySector } from '@/data/projects';

const sectors = ['Todos', ...Array.from(new Set(projects.map((p) => p.sector)))];

export default function FeaturedProjects() {
  const [filter, setFilter] = useState('Todos');
  const filtered = filter === 'Todos' ? projects : getProjectsBySector(filter);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionTitle
            overline="Portafolio"
            title="Proyectos que transforman"
            subtitle="Trayectoria comprobada en obras de infraestructura y construccion en Salta y la region del NOA."
          />
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-2 text-brayton-accent font-semibold hover:gap-3 transition-all shrink-0"
          >
            Ver todos los proyectos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
          {sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => setFilter(sector)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === sector 
                  ? 'bg-brayton-navy text-white shadow-lg shadow-brayton-navy/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={`/proyectos/${project.slug}`} 
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/90 via-brayton-navy/20 to-transparent" />
                    
                    {/* Sector badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-xs font-semibold text-brayton-navy shadow-lg">
                      {project.sector}
                    </span>
                    
                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-brayton-accent-light transition-colors">
                        {project.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-4 text-sm text-white/70">
                        {project.location && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {project.location}
                          </span>
                        )}
                        {project.areaM2 && (
                          <span>{project.areaM2.toLocaleString('es-AR')} m2</span>
                        )}
                        {project.year && (
                          <span>{project.year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brayton-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
