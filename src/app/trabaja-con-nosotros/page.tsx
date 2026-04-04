import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JobApplicationForm from './JobApplicationForm';

export const metadata: Metadata = {
  title: 'Trabaja con nosotros - BRAYTON SRL',
  description:
    'Sumate al equipo de BRAYTON SRL. Ofertas de trabajo en ingeniería, construcción y oficina técnica. Envía tu CV y únete a un equipo profesional.',
};

const areas = [
  { title: 'Ingeniería civil y estructural', description: 'Proyectos de diseño y cálculo de estructuras' },
  { title: 'Arquitectura', description: 'Diseño y dirección arquitectónica' },
  { title: 'Instalaciones', description: 'Eléctricas, sanitarias, de gas y especiales' },
  { title: 'Obra y dirección de obra', description: 'Supervisión y ejecución de proyectos' },
  { title: 'Seguridad e higiene', description: 'Cumplimiento normativo y prevención' },
  { title: 'Administración y logística', description: 'Gestión y coordinación de recursos' },
];

export default function TrabajaConNosotrosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-br from-brayton-navy via-brayton-blue to-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-brayton-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-brayton-accent-light rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
            alt="Equipo profesional BRAYTON SRL"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brayton-navy/95 via-brayton-navy/90 to-brayton-blue/95" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-balance leading-tight">
              Trabaja con <span className="text-brayton-accent">nosotros</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
              Formá parte de un equipo técnico de excelencia con proyectos de impacto en ingeniería y construcción en la región.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de trabajo */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-brayton-navy mb-4">
            Áreas en las que sumamos talento
          </h2>
          <p className="text-lg text-brayton-slate mb-12 max-w-2xl">
            Buscamos profesionales en diferentes disciplinas para fortalecer nuestro equipo multidisciplinario.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div key={area.title} className="p-6 rounded-xl border-2 border-gray-200 hover:border-brayton-accent hover:shadow-lg transition-all">
                <h3 className="font-display font-bold text-lg text-brayton-navy mb-2">{area.title}</h3>
                <p className="text-brayton-slate text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores y Beneficios */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-brayton-navy mb-6">
                ¿Por qué unirse a BRAYTON SRL?
              </h2>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brayton-accent/20 flex items-center justify-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brayton-navy mb-1">Proyectos de Impacto</h3>
                    <p className="text-brayton-slate text-sm">Trabaja en obras que generan valor en la comunidad</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brayton-accent/20 flex items-center justify-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brayton-navy mb-1">Crecimiento Profesional</h3>
                    <p className="text-brayton-slate text-sm">Oportunidades de capacitación y desarrollo continuo</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brayton-accent/20 flex items-center justify-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brayton-navy mb-1">Equipo Multidisciplinario</h3>
                    <p className="text-brayton-slate text-sm">Colabora con profesionales especializados y experimentados</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brayton-accent/20 flex items-center justify-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brayton-navy mb-1">Ambiente Profesional</h3>
                    <p className="text-brayton-slate text-sm">Cultura de trabajo basada en valores, ética y respeto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/engineering-team.jpg"
                alt="Equipo de profesionales BRAYTON SRL"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de solicitud */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display font-bold text-3xl text-brayton-navy mb-2">
              Envía tu solicitud
            </h2>
            <p className="text-lg text-brayton-slate">
              Completa el formulario con tus datos y adjunta tu CV. Nos pondremos en contacto a la brevedad.
            </p>
          </div>

          <JobApplicationForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-brayton-navy mb-12">Preguntas Frecuentes</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-brayton-navy mb-2">¿Cuáles son los requisitos?</h3>
              <p className="text-brayton-slate">Buscamos profesionales con formación técnica, experiencia en el área y disposición a trabajar en equipo. La experiencia previa es valorada pero no es excluyente.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-brayton-navy mb-2">¿Qué tipos de contratación ofrecen?</h3>
              <p className="text-brayton-slate">Ofrecemos contratos tanto permanentes como por proyectos específicos, dependiendo de las necesidades y disponibilidad del candidato.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-brayton-navy mb-2">¿Cuánto tiempo tarda el proceso de selección?</h3>
              <p className="text-brayton-slate">Generalmente nos comunicamos dentro de 5 a 10 días hábiles. Si tu perfil es seleccionado, pasarás por entrevistas con nuestro equipo técnico y RRHH.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-brayton-navy mb-2">¿Hay oportunidades para pasantías?</h3>
              <p className="text-brayton-slate">Sí, ofrecemos programas de pasantías para estudiantes avanzados. Contacta con nuestro equipo de RRHH para más información.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
