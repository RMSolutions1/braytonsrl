import type { Metadata } from 'next';
import Image from 'next/image';
import ProyectosClient from './ProyectosClient';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Portafolio de obras de BRAYTON SRL: construcción, ingeniería e instalaciones en sectores residencial, comercial, industrial, agro y minería.',
};

export default function ProyectosPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Fondo de la sección Proyectos"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Proyectos</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Obras ejecutadas con los más altos estándares de calidad y plazos cumplidos.
          </p>
        </div>
      </section>
      <ProyectosClient initialProjects={projects} />
    </>
  );
}
