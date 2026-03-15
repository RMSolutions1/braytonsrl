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
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionTitle
            overline="Portafolio"
            title="Proyectos que transforman"
            subtitle="Trayectoria en obras de infraestructura y construcción en Salta y la región."
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => setFilter(sector)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === sector ? 'bg-[#0a1628] text-white' : 'bg-[#f1f5f9] text-[var(--brayton-muted)] hover:bg-[#e2e8f0]'}`}
            >
              {sector}
            </button>
          ))}
        </div>
        <motion.div layout className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/proyectos/${project.slug}`} className="block group">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0d2137]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 text-[10px] font-medium uppercase tracking-wider text-[#0a1628]">
                      {project.sector}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-display font-semibold text-base group-hover:text-brayton-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/70">{project.location}</p>
                      <div className="mt-1.5 flex gap-3 text-[11px] text-white/60">
                        {project.areaM2 != null && <span>{project.areaM2.toLocaleString('es-AR')} m²</span>}
                        {project.year && <span>{project.year}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-10 text-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center px-4 py-2.5 rounded-md border border-[#0a1628] text-[#0a1628] text-sm font-medium transition-colors hover:bg-[#0a1628] hover:text-white"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
