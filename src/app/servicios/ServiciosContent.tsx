'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  details: string;
  sort_order: number;
}

const defaultServices = [
  {
    id: '1',
    title: 'Construcción Integral',
    description: 'Proyectos de construcción civil completos desde el diseño hasta la entrega final.',
    icon: 'Building2',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    details: 'Construcción integral de obras civiles con altos estándares de calidad.',
    sort_order: 0,
  },
  {
    id: '2',
    title: 'Ingeniería',
    description: 'Diseño y cálculo de estructuras mediante ingeniería especializada.',
    icon: 'Zap',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80',
    details: 'Ingeniería estructural y cálculo de estructuras.',
    sort_order: 1,
  },
];

export default function ServiciosContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        setServices(Array.isArray(data) && data.length > 0 ? data : defaultServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 hover:border-brayton-accent hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brayton-slate">
                {service.image_url ? (
                  <Image
                    src={service.image_url}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brayton-navy/20 to-brayton-accent/20" />
                )}
              </div>

              <div className="flex-1 p-6 bg-white flex flex-col">
                <h3 className="font-display font-bold text-lg text-brayton-navy mb-2">{service.title}</h3>
                <p className="text-sm text-brayton-slate mb-4 flex-1">{service.description}</p>

                {service.details && (
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2 italic">{service.details}</p>
                )}

                <Link
                  href="/contacto"
                  className="inline-block px-4 py-2 bg-brayton-accent text-white text-sm font-semibold rounded-lg hover:bg-brayton-accent-dark transition-colors self-start"
                >
                  Consultar
                </Link>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
