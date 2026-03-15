import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Proyecto no encontrado' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const images = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <>
      <section className="pt-28 pb-8 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/proyectos"
            className="text-brayton-accent font-medium hover:underline"
          >
            ← Volver a proyectos
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-brayton-accent uppercase tracking-wider">
              {project.sector}
            </span>
            {project.year && (
              <span className="text-brayton-slate">· {project.year}</span>
            )}
            {project.location && (
              <span className="text-brayton-slate">· {project.location}</span>
            )}
          </div>
          <h1 className="mt-4 font-display font-bold text-3xl lg:text-4xl text-brayton-navy">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-brayton-slate max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-brayton-steel"
              >
                <Image
                  src={src}
                  alt={`${project.title} - imagen ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display font-semibold text-xl text-brayton-navy">
                Aspectos destacados
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="px-4 py-2 bg-slate-100 rounded-full text-brayton-steel text-sm font-medium"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl text-brayton-navy">
            ¿Tiene un proyecto similar?
          </h2>
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
