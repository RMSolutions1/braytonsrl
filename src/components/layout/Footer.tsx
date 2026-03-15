import Link from 'next/link';
import Image from 'next/image';
import { LOGO_URL } from '@/lib/logo';

const footerSections = [
  {
    title: 'Empresa',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/sectores', label: 'Sectores' },
      { href: '/proyectos', label: 'Proyectos' },
      { href: '/certificaciones', label: 'Certificaciones' },
    ],
  },
  {
    title: 'Enlaces',
    links: [
      { href: '/contacto', label: 'Contacto' },
      { href: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
      { href: '/blog', label: 'Noticias' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terminos-y-condiciones', label: 'Términos y condiciones' },
      { href: '/privacidad', label: 'Política de privacidad' },
      { href: '/aviso-legal', label: 'Aviso legal y datos fiscales' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-10 sm:gap-12 md:grid-cols-5 lg:gap-16">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-md bg-white px-2.5 py-2"
              aria-label="BRAYTON SRL - Inicio"
            >
              <span className="relative block h-10 w-[150px] sm:h-11 sm:w-[165px]">
                <Image
                  src={LOGO_URL}
                  alt="BRAYTON SRL"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 150px, 165px"
                  unoptimized
                />
              </span>
            </Link>
            <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/60">
              Ingeniería, construcción y servicios integrales. Soluciones llave en mano para proyectos residenciales, comerciales, industriales y minería.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <a href="mailto:contacto@braytonsrl.com.ar" className="transition-colors hover:text-white">
                  contacto@braytonsrl.com.ar
                </a>
              </li>
              <li>
                <a href="tel:+5491112345678" className="transition-colors hover:text-white">
                  +54 9 11 1234-5678
                </a>
              </li>
              <li>Lun - Vie: 8:00 - 18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/[0.06] pt-6 sm:mt-16 sm:pt-8">
          <p className="text-center text-xs text-white/40 sm:text-left">
            © {new Date().getFullYear()} BRAYTON S.R.L. Todos los derechos reservados. CUIT: 30-71683122-8
          </p>
        </div>
      </div>
    </footer>
  );
}
