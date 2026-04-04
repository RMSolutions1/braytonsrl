import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacte a BRAYTON SRL para cotizaciones y proyectos de ingeniería y construcción. Formulario, teléfono, email y dirección.',
};

export default function ContactoPage() {
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
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Fondo de la sección Contacto"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brayton-navy/95 via-brayton-navy/90 to-brayton-blue/95" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-balance leading-tight">
              Estamos aquí para <span className="text-brayton-accent">escucharte</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
              Contacte con nuestro equipo de expertos en ingeniería y construcción. Estamos listos para transformar sus ideas en realidad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-brayton-navy mb-2">
                  Solicitar Cotización
                </h2>
                <p className="text-brayton-slate">
                  Complete el formulario y nuestro equipo se pondrá en contacto en menos de 24 horas.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-brayton-navy to-brayton-blue rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brayton-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Pasaje Santa Victoria 762<br />
                      Barrio Centro, 4400<br />
                      Salta, Argentina
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-brayton-accent to-brayton-accent-dark rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">Teléfono</h3>
                    <a 
                      href="tel:+543874498588" 
                      className="text-white hover:text-white/80 transition font-semibold flex items-center gap-2 group"
                    >
                      +54 387 4498588
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gradient-to-br from-brayton-steel to-brayton-navy rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brayton-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">Email</h3>
                    <a 
                      href="mailto:contacto@braytonsrl.com.ar" 
                      className="text-white hover:text-brayton-accent transition font-semibold flex items-center gap-2 group"
                    >
                      contacto@braytonsrl.com.ar
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-gradient-to-br from-brayton-blue to-brayton-steel rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brayton-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-brayton-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">Horarios</h3>
                    <p className="text-white/80 text-sm">
                      <span className="font-semibold text-white">Lunes a Viernes:</span><br />
                      8:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg h-80 border border-gray-200">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brayton-navy to-brayton-blue py-16 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-balance">
            ¿Tiene alguna pregunta?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            No dude en contactarnos. Nuestro equipo de expertos está disponible para ayudarle con cualquier consulta sobre sus proyectos de construcción e ingeniería.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brayton-accent hover:bg-brayton-accent-dark text-white font-semibold rounded-lg transition-colors"
            >
              Enviar mensaje
              <ArrowRight size={20} />
            </a>
            <a 
              href="tel:+543874498588"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              <Phone size={20} />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
