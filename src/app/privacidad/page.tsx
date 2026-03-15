import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y protección de datos personales de BRAYTON SRL.',
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-brayton-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Política de privacidad</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-brayton max-w-none text-brayton-slate space-y-8">
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">1. Responsable del tratamiento</h2>
            <p>
              BRAYTON S.R.L., con domicilio en Pasaje Santa Victoria 762, Barrio Centro, 4400 Salta, Salta, Argentina, es el responsable del tratamiento de los datos personales que recaba a traves de este sitio web y de los canales de contacto indicados.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">2. Datos que recabamos</h2>
            <p>
              Podemos recabar datos que usted nos proporcione voluntariamente al completar formularios de contacto, solicitar cotizaciones, enviar CV o comunicarse por correo o telefono. Estos pueden incluir: nombre y apellido, razon social, correo electronico, telefono, direccion y cualquier otro dato que incluya en su mensaje o en su currículum.
            </p>
            <p>
              Asimismo, el Sitio puede utilizar cookies o tecnologias similares para el correcto funcionamiento, la medicion de visitas y la mejora de la experiencia de uso, conforme se indica en esta politica.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">3. Finalidad del tratamiento</h2>
            <p>
              Los datos personales se utilizan para: (a) responder a sus consultas y solicitudes de cotizacion; (b) gestionar procesos de reclutamiento cuando envia su CV; (c) enviar informacion comercial o comunicaciones relacionadas con nuestros servicios solo si ha dado su consentimiento o existe un interes legitimo permitido por la ley; (d) cumplir obligaciones legales y (e) mejorar nuestros servicios y el Sitio.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">4. Base legal y conservacion</h2>
            <p>
              El tratamiento se basa en su consentimiento, en la ejecucion de medidas precontractuales o contractuales, en el cumplimiento de obligaciones legales o en el interes legitimo de BRAYTON SRL cuando corresponda. Conservaremos sus datos mientras sea necesario para las finalidades indicadas y, en su caso, durante los plazos legales de prescripcion o retencion aplicables.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">5. Destinatarios y transferencias</h2>
            <p>
              Los datos no se ceden a terceros salvo obligacion legal o cuando sea necesario para la prestacion del servicio (por ejemplo, proveedores tecnicos que actuen como encargados del tratamiento con las garantias adecuadas). No se realizan transferencias internacionales salvo que la ley lo exija o usted lo autorice.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">6. Sus derechos</h2>
            <p>
              De conformidad con la Ley 25.326 de Proteccion de Datos Personales (Argentina) y el Reglamento General de Proteccion de Datos (RGPD) cuando aplique, usted tiene derecho a: acceder a sus datos, rectificarlos, suprimirlos, limitar el tratamiento, oponerse y, cuando corresponda, a la portabilidad. Asimismo, puede retirar su consentimiento en cualquier momento y presentar una reclamacion ante la autoridad de control competente.
            </p>
            <p>
              Para ejercer estos derechos puede dirigirse a{' '}
              <a href="mailto:contacto@braytonsrl.com.ar" className="text-brayton-accent hover:underline">
                contacto@braytonsrl.com.ar
              </a>
              , indicando Proteccion de datos en el asunto.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">7. Seguridad</h2>
            <p>
              BRAYTON SRL adopta medidas tecnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, perdida o alteracion.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy">8. Cambios</h2>
            <p>
              Nos reservamos el derecho de actualizar esta politica de privacidad. Los cambios seran publicados en esta pagina con la fecha de ultima actualizacion.
            </p>
          </section>
        </div>
        <p className="mt-12">
          <Link href="/" className="text-brayton-accent font-medium hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </>
  );
}
