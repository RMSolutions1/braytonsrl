import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso legal y datos fiscales',
  description:
    'Aviso legal, identificación fiscal y datos registrales de BRAYTON SRL.',
};

const fiscalData = [
  { label: 'Razón social', value: 'BRAYTON S.R.L.' },
  { label: 'CUIT', value: '30-71683122-8' },
  { label: 'Forma jurídica', value: 'S.R.L.' },
  { label: 'Fecha contrato social', value: '09-03-2020' },
  { label: 'Domicilio fiscal', value: 'Pasaje Santa Victoria 762, Barrio Centro, 4400 Salta, Salta, Argentina' },
  { label: 'Inscripción', value: 'Constancia de inscripción AFIP/ARCA. Impuestos nacionales y provinciales (IIBB Salta) según normativa vigente.' },
  { label: 'Email', value: 'contacto@braytonsrl.com.ar' },
  { label: 'Teléfono', value: '+54 9 11 1234-5678' },
];

export default function AvisoLegalPage() {
  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-brayton-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Aviso legal y datos fiscales</h1>
          <p className="mt-4 text-white/90 max-w-2xl">
            Identificación de la empresa y datos de registro.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="space-y-10">
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy mb-4">Datos identificativos y fiscales</h2>
            <p className="text-brayton-slate mb-6">
              En cumplimiento del deber de información frente a usuarios y autoridades, se exponen a continuación los datos de identificación y fiscales de la titular del sitio web.
            </p>
            <ul className="space-y-3">
              {fiscalData.map((item) => (
                <li key={item.label} className="flex flex-col sm:flex-row sm:gap-4 border-b border-gray-100 pb-3">
                  <span className="font-semibold text-brayton-navy shrink-0 sm:w-40">{item.label}</span>
                  <span className="text-brayton-slate">{item.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brayton-slate">
              Los datos de identificación y domicilio fiscal corresponden a la Constancia de Inscripción AFIP/ARCA. Para validar la constancia puede consultar la página institucional de ARCA: <a href="http://www.arca.gob.ar" target="_blank" rel="noopener noreferrer" className="text-brayton-accent hover:underline">www.arca.gob.ar</a>.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy mb-4">Objeto del sitio</h2>
            <p className="text-brayton-slate">
              Este sitio web tiene carácter informativo y comercial. Tiene por finalidad dar a conocer los servicios de BRAYTON SRL en materia de ingeniería, construcción y servicios integrales, así como permitir el contacto con la empresa para consultas y cotizaciones. Los contenidos no constituyen asesoramiento legal, fiscal ni técnico vinculante; para contratación y datos contractuales debe contactarse directamente con la empresa.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy mb-4">Propiedad intelectual y uso</h2>
            <p className="text-brayton-slate">
              Los contenidos del sitio (textos, imágenes, logotipos, diseño y marcas) son propiedad de BRAYTON SRL o de sus licenciantes y están protegidos por la legislación aplicable en materia de propiedad intelectual e industrial. Queda prohibida la reproducción, distribución o uso comercial no autorizado.
            </p>
          </section>
          <section>
            <h2 className="font-display font-bold text-xl text-brayton-navy mb-4">Enlaces relacionados</h2>
            <p className="text-brayton-slate mb-4">
              Para más información sobre el uso del sitio y la protección de sus datos, consulte:
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/terminos-y-condiciones" className="text-brayton-accent hover:underline">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-brayton-accent hover:underline">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-brayton-accent hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
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
