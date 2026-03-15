import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Construcción integral, ingeniería, arquitectura, instalaciones eléctricas, sanitarias, de gas y transporte de cargas. Servicios llave en mano.',
};

export default function ServiciosPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Fondo de la sección Servicios"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Servicios</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Ingeniería, construcción e instalaciones. Un solo responsable para todo el ciclo del proyecto.
          </p>
        </div>
      </section>
      <ServiciosContent />
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl text-brayton-navy">¿Necesita una cotización?</h2>
          <Link
            href="/contacto"
            className="mt-4 inline-flex items-center px-6 py-3 rounded-md bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
