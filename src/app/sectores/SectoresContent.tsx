'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface Sector {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  details: string;
  sort_order: number;
}

const defaultSectors = [
  {
    id: '1',
    title: 'Residencial',
    description: 'Vivienda unifamiliar, multifamiliar, conjuntos habitacionales y obras complementarias.',
    icon: 'Home',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    details: 'Proyecto y ejecución de obra civil, instalaciones y terminaciones.',
    sort_order: 0,
  },
  {
    id: '2',
    title: 'Comercial',
    description: 'Edificios de oficinas, locales comerciales, centros de servicio y equipamiento urbano.',
    icon: 'Building2',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    details: 'Diseño y construcción adaptados a uso comercial, entregas llave en mano.',
    sort_order: 1,
  },
];

export default function SectoresContent() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const res = await fetch('/api/sectors');
        const data = await res.json();
        setSectors(Array.isArray(data) && data.length > 0 ? data : defaultSectors);
      } catch (error) {
        console.error('Error fetching sectors:', error);
        setSectors(defaultSectors);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin w-8 h-8 text-brayton-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {sectors
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((sector, idx) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-xl overflow-hidden border border-gray-200 hover:border-brayton-accent hover:shadow-xl transition-all bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-brayton-slate">
                  {sector.image_url ? (
                    <Image
                      src={sector.image_url}
                      alt={sector.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brayton-navy/20 to-brayton-accent/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brayton-navy/80 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-brayton-navy mb-2">{sector.title}</h3>
                  <p className="text-sm text-brayton-slate mb-3">{sector.description}</p>

                  {sector.details && (
                    <motion.div
                      initial={false}
                      animate={{ height: expandedId === sector.id ? 'auto' : 0, opacity: expandedId === sector.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 mb-4 pt-2">{sector.details}</p>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2">
                    {sector.details && (
                      <button
                        onClick={() => setExpandedId(expandedId === sector.id ? null : sector.id)}
                        className="text-brayton-accent hover:underline text-sm font-medium"
                      >
                        {expandedId === sector.id ? 'Menos' : 'Más'} información
                      </button>
                    )}
                    <Link
                      href="/contacto"
                      className="ml-auto text-brayton-accent hover:text-brayton-accent-dark font-semibold text-sm"
                    >
                      Contactar →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
