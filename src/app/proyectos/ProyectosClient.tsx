'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

const sectors = ['Todos', 'Industrial', 'Comercial', 'Obras públicas', 'Agro', 'Factory', 'Minería'];

export default function ProyectosClient({ initialProjects }: { initialProjects: Project[] }) {
  const [filter, setFilter] = useState('Todos');

  const filtered = useMemo(() => {
    if (filter === 'Todos') return initialProjects;
    return initialProjects.filter((p) => p.sector === filter);
  }, [initialProjects, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {sectors.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-brayton-accent text-white'
                : 'bg-slate-100 text-brayton-steel hover:bg-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/proyectos/${project.slug}`} className="block group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brayton-steel">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-semibold text-brayton-accent uppercase tracking-wider">
                      {project.sector}
                    </span>
                    <h2 className="mt-1 font-display font-semibold text-lg group-hover:text-brayton-accent transition-colors">
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-brayton-slate py-12">No hay proyectos en esta categoría.</p>
      )}
    </div>
  );
}
