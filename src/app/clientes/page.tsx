import type { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Clientes',
  description:
    'Empresas, organismos e instituciones que confían en BRAYTON SRL para sus proyectos de ingeniería y construcción.',
};

const clientSectors = [
  'Empresas industriales',
  'Organismos públicos',
  'Sector agro y agroindustrial',
  'Desarrolladores inmobiliarios',
  'Empresas mineras',
  'Instituciones y ONGs',
];

export default function ClientesPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=80"
            alt="Fondo de la sección Clientes"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Clientes</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Trabajamos con empresas, gobiernos e instituciones que exigen calidad y cumplimiento.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionTitle
          title="Sectores que nos eligen"
          subtitle="Nuestros clientes pertenecen a industrias que demandan soluciones técnicas confiables y un partner con capacidad de ejecución."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientSectors.map((sector) => (
            <div
              key={sector}
              className="p-4 lg:p-6 bg-slate-50 rounded-xl border border-gray-100 flex items-center gap-3"
            >
              <span className="text-brayton-accent font-display font-bold text-2xl">✓</span>
              <span className="font-medium text-brayton-navy">{sector}</span>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-brayton-slate max-w-2xl mx-auto">
          Por confidencialidad con nuestros clientes, no publicamos nombres de empresas u organismos sin su autorización. Estamos disponibles para referencias y casos de éxito en instancias de cotización.
        </p>
      </div>
    </>
  );
}
