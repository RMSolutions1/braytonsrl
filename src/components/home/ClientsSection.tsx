'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const clientCategories = [
  {
    category: 'Gobierno',
    clients: ['Gobierno de Salta', 'Municipalidad', 'Organismos Publicos']
  },
  {
    category: 'Industria',
    clients: ['Plantas Industriales', 'Fabricas', 'Depositos']
  },
  {
    category: 'Agro',
    clients: ['Agroindustrias', 'Cooperativas', 'Productores']
  },
  {
    category: 'Mineria',
    clients: ['Operaciones Mineras', 'Campamentos', 'Logistica']
  },
  {
    category: 'Comercio',
    clients: ['Desarrolladores', 'Centros Comerciales', 'Retail']
  },
  {
    category: 'Instituciones',
    clients: ['Educacion', 'Salud', 'Fundaciones']
  },
];

const trustedLogos = [
  { name: 'ISO 9001', type: 'certification' },
  { name: 'ISO 14001', type: 'certification' },
  { name: 'ISO 45001', type: 'certification' },
  { name: 'AEA', type: 'certification' },
];

export default function ClientsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-white" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-20">
          <SectionTitle
            overline="Confianza"
            title="Clientes que confian en nosotros"
            subtitle="Colaboramos con organismos publicos, empresas privadas e instituciones de toda la region del NOA."
            align="center"
          />
        </div>

        {/* Client categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-16">
          {clientCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-brayton-accent/10 flex items-center justify-center text-brayton-accent mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-sm text-brayton-navy mb-2">
                {cat.category}
              </h3>
              <ul className="space-y-1">
                {cat.clients.map((client) => (
                  <li key={client} className="text-xs text-gray-500">
                    {client}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-12"
        >
          <p className="text-center text-sm text-gray-500 mb-6">
            Certificaciones y normativas que avalan nuestro trabajo
          </p>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {trustedLogos.map((logo, i) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-brayton-accent/10 flex items-center justify-center text-brayton-accent">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm text-brayton-navy">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
