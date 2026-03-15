import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacte a BRAYTON SRL para cotizaciones y proyectos de ingeniería y construcción. Formulario, teléfono, email y dirección.',
};

export default function ContactoPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brayton-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Fondo de la sección Contacto"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-brayton-navy/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl lg:text-5xl">Contacto</h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl">
            Cuéntenos su proyecto. Nuestro equipo le responderá a la brevedad.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-brayton-navy mb-6">
              Datos de contacto
            </h2>
            <ul className="space-y-4 text-brayton-slate">
              <li>
                <span className="font-semibold text-brayton-navy block mb-1">Dirección</span>
                Pasaje Santa Victoria 762, Barrio Centro<br />
                4400 Salta, Salta, Argentina
              </li>
              <li>
                <span className="font-semibold text-brayton-navy block mb-1">Teléfono</span>
                <a href="tel:+5491112345678" className="hover:text-brayton-accent">
                  +54 9 11 1234-5678
                </a>
              </li>
              <li>
                <span className="font-semibold text-brayton-navy block mb-1">Email</span>
                <a href="mailto:contacto@braytonsrl.com.ar" className="hover:text-brayton-accent">
                  contacto@braytonsrl.com.ar
                </a>
              </li>
              <li>
                <span className="font-semibold text-brayton-navy block mb-1">Horario</span>
                Lunes a Viernes: 8:00 - 18:00
              </li>
            </ul>
            <div className="mt-8 aspect-video rounded-xl overflow-hidden bg-slate-200">
              <iframe
                title="Mapa - BRAYTON SRL Salta"
                src="https://www.google.com/maps?q=Pasaje+Santa+Victoria+762+Salta+Argentina&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
