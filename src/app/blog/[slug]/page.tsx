import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const posts: Record<string, { title: string; date: string; image: string; content: string }> = {
  'obras-publicas-2024': {
    title: 'Obras públicas y licitaciones: qué tener en cuenta en 2024',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
    content: `
      Las licitaciones de obra pública exigen documentación técnica y económica al día, plazos de presentación estrictos y conocimiento de los pliegos particulares de cada organismo. En BRAYTON SRL acompañamos a nuestros clientes en la preparación de ofertas y en la ejecución posterior.

      Es fundamental contar con experiencia previa en obra pública, certificaciones y referencias que los pliegos suelen solicitar. La planificación y el equipo técnico son claves para cumplir con los plazos de obra una vez adjudicado el contrato.
    `,
  },
  'construccion-sostenible': {
    title: 'Construcción sostenible: materiales y prácticas',
    date: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    content: `
      La eficiencia energética y el uso de materiales con menor impacto ambiental son cada vez más demandados por clientes y normativas. En nuestros proyectos incorporamos criterios de sostenibilidad cuando el cliente lo requiere: aislación térmica, iluminación eficiente, reutilización de recursos y gestión de residuos de obra.

      La construcción sostenible no solo reduce el impacto ambiental; también puede traducirse en menores costos operativos a largo plazo para el usuario del edificio.
    `,
  },
  'instalaciones-industriales': {
    title: 'Instalaciones industriales: diseño y ejecución',
    date: '2023-12-10',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    content: `
      En plantas industriales las instalaciones eléctricas, de proceso y de seguridad deben diseñarse en función de las cargas, normativas y estándares del sector. Nuestro equipo de ingeniería y obra trabaja en conjunto con el cliente para definir esquemas, recorridos y equipamiento.

      La ejecución debe respetar plazos de parada de planta cuando se trata de ampliaciones o refacciones, por lo que la planificación y la coordinación son fundamentales.
    `,
  },
};

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: 'Noticia no encontrada' };
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <>
      <article className="pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-brayton-accent font-medium hover:underline">
            ← Volver a Noticias
          </Link>
          <time className="block mt-4 text-brayton-slate">{post.date}</time>
          <h1 className="mt-2 font-display font-bold text-3xl lg:text-4xl text-brayton-navy">
            {post.title}
          </h1>
          <div className="mt-8 relative aspect-video rounded-xl overflow-hidden bg-brayton-steel">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8 prose prose-brayton max-w-none text-brayton-slate whitespace-pre-line">
            {post.content.trim()}
          </div>
        </div>
      </article>
    </>
  );
}
