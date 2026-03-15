import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Noticias',
  description:
    'Noticias y novedades de BRAYTON SRL: proyectos, normativas y tendencias en ingeniería y construcción.',
};

const posts = [
  {
    slug: 'obras-publicas-2024',
    title: 'Obras públicas y licitaciones: qué tener en cuenta en 2024',
    excerpt: 'Requisitos y plazos habituales en licitaciones de obra pública. Cómo preparar la documentación técnica y económica.',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
  },
  {
    slug: 'construccion-sostenible',
    title: 'Construcción sostenible: materiales y prácticas',
    excerpt: 'Tendencias en eficiencia energética y uso de materiales con menor impacto ambiental en obra.',
    date: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
  {
    slug: 'instalaciones-industriales',
    title: 'Instalaciones industriales: diseño y ejecución',
    excerpt: 'Criterios de diseño para instalaciones eléctricas y especiales en plantas industriales.',
    date: '2023-12-10',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Fondo de la sección Noticias"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Noticias</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Novedades, normativas y tendencias en ingeniería y construcción.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-brayton-steel">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <time className="text-sm text-brayton-slate">{post.date}</time>
                  <h2 className="mt-1 font-display font-semibold text-xl text-brayton-navy group-hover:text-brayton-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-brayton-slate text-sm">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
