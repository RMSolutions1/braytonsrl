import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import NosotrosContent from './NosotrosContent';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conozca la historia, misión, visión y valores de BRAYTON SRL. Equipo técnico y experiencia en ingeniería y construcción integral.',
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Fondo de la sección Nosotros"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Nosotros</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Una empresa de ingeniería y construcción con foco en soluciones integrales y relaciones de largo plazo.
          </p>
        </div>
      </section>
      <NosotrosContent />
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl text-brayton-navy">¿Quiere conocer más?</h2>
          <p className="mt-2 text-brayton-slate">Hablemos de su próximo proyecto.</p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
