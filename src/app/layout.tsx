import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import ConditionalPublicLayout from '@/components/layout/ConditionalPublicLayout';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://braytonsrl.com.ar';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BRAYTON SRL | Ingeniería, Construcción y Servicios Integrales',
    template: '%s | BRAYTON SRL',
  },
  description:
    'Empresa líder en ingeniería, construcción y servicios integrales. Construcción llave en mano, ingeniería, arquitectura, instalaciones eléctricas, sanitarias, gas, transporte de cargas y obras públicas y privadas.',
  keywords: [
    'empresa de construcción',
    'ingeniería civil',
    'obras industriales',
    'instalaciones eléctricas',
    'empresa de ingeniería',
    'construcción integral',
    'obras públicas',
    'BRAYTON',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BRAYTON SRL',
  description: 'Empresa de ingeniería, construcción y servicios integrales. Construcción llave en mano, ingeniería, arquitectura, instalaciones y transporte de cargas.',
  url: 'https://braytonsrl.com.ar',
  logo: 'https://braytonsrl.com.ar/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+54-9-11-1234-5678',
    contactType: 'customer service',
    email: 'contacto@braytonsrl.com.ar',
    areaServed: 'AR',
    availableLanguage: 'Spanish',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pasaje Santa Victoria 762, Barrio Centro',
    addressLocality: 'Salta',
    postalCode: '4400',
    addressRegion: 'Salta',
    addressCountry: 'AR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ConditionalPublicLayout>{children}</ConditionalPublicLayout>
      </body>
    </html>
  );
}
