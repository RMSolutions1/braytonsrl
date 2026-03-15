import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trabaja con nosotros',
  description:
    'Sumate al equipo de BRAYTON SRL. Ofertas de trabajo en ingeniería, construcción y oficina técnica.',
};

const areas = [
  'Ingeniería civil y estructural',
  'Arquitectura',
  'Instalaciones (eléctricas, sanitarias, gas)',
  'Obra y dirección de obra',
  'Seguridad e higiene',
  'Administración y logística',
];

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Fondo de la sección Trabaja con nosotros"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Trabaja con nosotros</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Formá parte de un equipo técnico con proyectos de impacto en ingeniería y construcción.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="font-display font-bold text-2xl text-brayton-navy">
              Áreas en las que sumamos talento
            </h2>
            <ul className="mt-6 space-y-3">
              {areas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-brayton-slate">
                  <span className="text-brayton-accent font-bold">•</span>
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-brayton-slate">
              Valoramos la formación técnica, la actitud proactiva y el trabajo en equipo. Ofrecemos un entorno de crecimiento y proyectos variados en escala y sector.
            </p>
          </div>
          <div className="p-8 bg-slate-50 rounded-2xl border border-gray-100">
            <h2 className="font-display font-bold text-xl text-brayton-navy">
              Enviar CV
            </h2>
            <p className="mt-2 text-brayton-slate text-sm">
              Enviá tu CV indicando área de interés a:
            </p>
            <a
              href="mailto:rrhh@braytonsrl.com.ar?subject=CV - Trabaja con nosotros"
              className="mt-4 inline-block font-semibold text-brayton-accent hover:underline"
            >
              rrhh@braytonsrl.com.ar
            </a>
            <p className="mt-6 text-sm text-brayton-slate">
              Asunto sugerido: &quot;CV - Trabaja con nosotros&quot;. Incluí en el cuerpo del mail el área de interés y disponibilidad.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-brayton-navy text-white font-semibold hover:bg-brayton-steel transition-colors"
            >
              Ir a contacto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
