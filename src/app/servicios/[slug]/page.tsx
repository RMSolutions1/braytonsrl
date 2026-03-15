import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Servicio no encontrado' };
  return {
    title: `${service.title} | BRAYTON SRL - Argentina`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.title} | BRAYTON SRL`,
      description: service.metaDescription,
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const hasSections = service.sections && service.sections.length > 0;

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/servicios"
            className="text-brayton-accent font-medium text-sm hover:underline mb-4 inline-block"
          >
            ← Volver a Servicios
          </Link>
          <h1 className="font-display font-bold text-4xl lg:text-5xl">{service.title}</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8">
              {hasSections ? (
                <>
                  <nav aria-label="En esta página">
                    <h2 className="font-display font-bold text-lg text-brayton-navy mb-4">
                      En esta página
                    </h2>
                    <ul className="space-y-2">
                      {service.sections!.map((sec) => (
                        <li key={sec.id}>
                          <a
                            href={`#${sec.id}`}
                            className="text-sm text-brayton-slate hover:text-brayton-accent transition-colors block py-1"
                          >
                            {sec.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <Link
                    href="/contacto"
                    className="block w-full py-3 px-4 rounded-md bg-brayton-accent text-white font-semibold text-center hover:bg-brayton-accent-dark transition-colors"
                  >
                    Solicitar cotización
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="font-display font-bold text-lg text-brayton-navy mb-4">
                      Aspectos destacados
                    </h2>
                    <ul className="space-y-2">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-brayton-slate text-sm">
                          <span className="text-brayton-accent mt-0.5 shrink-0">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/contacto"
                    className="block w-full py-3 px-4 rounded-md bg-brayton-accent text-white font-semibold text-center hover:bg-brayton-accent-dark transition-colors"
                  >
                    Solicitar cotización
                  </Link>
                </>
              )}
            </div>
          </aside>

          <div className="lg:col-span-2 order-1 lg:order-2 space-y-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-brayton-slate leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {hasSections &&
              service.sections!.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-gray-100 pb-10 last:border-0"
                >
                  <h2 className="font-display font-bold text-2xl text-brayton-navy mb-4">
                    {section.title}
                  </h2>
                  <div className="text-brayton-slate leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                  {section.list && section.list.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-brayton-slate">
                          <span className="text-brayton-accent shrink-0 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

            {!hasSections && (
              <>
                {service.process && service.process.length > 0 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl text-brayton-navy mb-4">
                      Proceso de trabajo
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-brayton-slate">
                      {service.process.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl text-brayton-navy mb-4">
                      Beneficios
                    </h2>
                    <ul className="space-y-2 text-brayton-slate">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-brayton-accent shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl text-brayton-navy">
            ¿Necesita este servicio?
          </h2>
          <p className="mt-2 text-brayton-slate max-w-xl mx-auto">
            Contáctenos para una cotización sin compromiso. Atendemos proyectos en Salta y todo el país.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
