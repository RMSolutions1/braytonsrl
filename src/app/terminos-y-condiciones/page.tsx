import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description:
    'Términos y condiciones de uso del sitio web y de los servicios de BRAYTON SRL.',
};

export default function TerminosYCondicionesPage() {
  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-brayton-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Términos y condiciones</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-brayton max-w-none text-brayton-slate space-y-8">
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">1. Objeto y aceptación</h2>
            <p>
              Los presentes términos y condiciones regulan el uso del sitio web de BRAYTON SRL (en adelante, &quot;el Sitio&quot;) y la información y servicios ofrecidos a través del mismo. El acceso y la utilización del Sitio implican la aceptación de estos términos. Si no está de acuerdo con ellos, le rogamos que no utilice el Sitio.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">2. Titular del Sitio</h2>
            <p>
              El Sitio es operado por BRAYTON S.R.L., sociedad de responsabilidad limitada constituida conforme a las leyes de la República Argentina, con domicilio en Pasaje Santa Victoria 762, Barrio Centro, 4400 Salta, Salta, Argentina.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">3. Uso del Sitio</h2>
            <p>
              El usuario se compromete a utilizar el Sitio de forma lícita, de buena fe y sin fines contrarios a la ley o al orden público. Queda prohibido el uso del Sitio para fines fraudulentos, para transmitir virus o contenido ilícito, o para interferir en el funcionamiento del Sitio o de los sistemas de BRAYTON SRL.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">4. Contenido e información</h2>
            <p>
              La información publicada en el Sitio tiene carácter orientativo. BRAYTON SRL se esfuerza por mantenerla actualizada y veraz, pero no garantiza la exhaustividad o ausencia de errores. Los proyectos, servicios y datos mostrados pueden variar; para información contractual y comercial vinculante debe contactarse directamente con la empresa.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">5. Propiedad intelectual</h2>
            <p>
              Los contenidos del Sitio (textos, imágenes, logotipos, diseño y demás elementos) son propiedad de BRAYTON SRL o de sus titulares autorizados y están protegidos por las leyes de propiedad intelectual. Queda prohibida la reproducción, distribución o uso comercial sin autorización previa y por escrito.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">6. Enlaces</h2>
            <p>
              El Sitio puede contener enlaces a sitios de terceros. BRAYTON SRL no controla ni se hace responsable del contenido o prácticas de dichos sitios. La inclusión de enlaces no implica respaldo alguno.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">7. Modificaciones</h2>
            <p>
              BRAYTON SRL se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en el Sitio. El uso continuado del Sitio tras las modificaciones implica la aceptación de los nuevos términos.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">8. Ley aplicable y jurisdicción</h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a los tribunales competentes de la provincia de Salta.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">9. Contacto</h2>
            <p>
              Para consultas sobre estos términos puede escribir a{' '}
              <a href="mailto:contacto@braytonsrl.com.ar" className="text-brayton-accent hover:underline">
                contacto@braytonsrl.com.ar
              </a>
              .
            </p>
          </section>
        </div>
        <p className="mt-12">
          <Link href="/" className="text-brayton-accent font-medium hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </>
  );
}
