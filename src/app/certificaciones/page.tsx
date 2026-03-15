import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Certificaciones',
  description:
    'Normativas, estándares y compromiso de calidad de BRAYTON SRL en ingeniería y construcción.',
};

const certifications = [
  { name: 'Normativas locales', description: 'Cumplimiento de códigos de construcción y normativas vigentes en cada jurisdicción.' },
  { name: 'Seguridad e higiene', description: 'Protocolos de seguridad en obra y gestión de riesgos laborales.' },
  { name: 'Calidad', description: 'Procedimientos de control de calidad en materiales y ejecución.' },
  { name: 'Ambiente', description: 'Cumplimiento de normativa ambiental aplicable a cada proyecto.' },
];

export default function CertificacionesPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
            alt="Fondo de la sección Certificaciones y calidad"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Certificaciones</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Compromiso con normativas, seguridad y estándares de calidad en cada proyecto.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-center text-brayton-slate max-w-2xl mx-auto mb-16">
          BRAYTON SRL trabaja bajo estándares de calidad y cumplimiento normativo. En cada obra aplicamos procedimientos de control y documentación que nuestros clientes y organismos requieren.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="p-6 lg:p-8 bg-slate-50 rounded-xl border border-gray-100"
            >
              <h2 className="font-display font-semibold text-xl text-brayton-navy">{c.name}</h2>
              <p className="mt-3 text-brayton-slate">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
