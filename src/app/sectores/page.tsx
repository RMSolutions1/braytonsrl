import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectoresContent from './SectoresContent';

export const metadata: Metadata = {
  title: 'Sectores',
  description:
    'BRAYTON SRL opera en sectores residencial, comercial, industrial, agro, factory y minería. Soluciones a medida para cada industria.',
};

export default function SectoresPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Fondo de la sección Sectores"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Sectores</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Experiencia en múltiples industrias: desde vivienda hasta minería e infraestructura.
          </p>
        </div>
      </section>
      <SectoresContent />
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl text-brayton-navy">¿Su sector no está listado?</h2>
          <p className="mt-2 text-brayton-slate">Consúltenos igual: evaluamos cada proyecto.</p>
          <Link
            href="/contacto"
            className="mt-4 inline-flex items-center px-6 py-3 rounded-md bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
