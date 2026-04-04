'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  client: string;
  location: string;
  year: number;
  featured: boolean;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Proyecto 1',
    description: 'Descripción del proyecto',
    category: 'Comercial',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    client: 'Cliente',
    location: 'Ubicación',
    year: 2024,
    featured: false,
  },
];

const sectors = ['Todos', 'Comercial', 'Residencial', 'Industrial', 'Agro', 'Factory', 'Minería'];

export default function ProyectosClient() {
  const [filter, setFilter] = useState('Todos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(Array.isArray(data) && data.length > 0 ? data : defaultProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'Todos') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin w-8 h-8 text-brayton-accent" />
      </div>
    );
  }

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
              <Link href="#" className="block group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brayton-slate">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brayton-navy/20 to-brayton-accent/20" />
                  )}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-brayton-accent text-white text-xs font-bold rounded">
                      Destacado
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-brayton-navy group-hover:text-brayton-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brayton-slate line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
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
