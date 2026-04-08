'use client';

import { useEffect, useState } from 'react';
import { Mail, FileText, Users, TrendingUp, Wrench, Building2, Zap } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  messages: number;
  quotes: number;
  applications: number;
  services: number;
  projects: number;
  sectors: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    messages: 0,
    quotes: 0,
    applications: 0,
    services: 0,
    projects: 0,
    sectors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [messagesRes, quotesRes, applicationsRes, servicesRes, projectsRes, sectorsRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/quotes'),
          fetch('/api/applications'),
          fetch('/api/services'),
          fetch('/api/projects'),
          fetch('/api/sectors'),
        ]);

        const [messages, quotes, applications, services, projects, sectors] = await Promise.all([
          messagesRes.json(),
          quotesRes.json(),
          applicationsRes.json(),
          servicesRes.json(),
          projectsRes.json(),
          sectorsRes.json(),
        ]);

        setStats({
          messages: Array.isArray(messages) ? messages.length : 0,
          quotes: Array.isArray(quotes) ? quotes.length : 0,
          applications: Array.isArray(applications) ? applications.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
          sectors: Array.isArray(sectors) ? sectors.length : 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const contentCards = [
    {
      label: 'Servicios',
      value: stats.services,
      icon: Wrench,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      href: '/dashboard/servicios',
    },
    {
      label: 'Proyectos',
      value: stats.projects,
      icon: Building2,
      color: 'bg-green-50 text-green-600 border-green-200',
      href: '/dashboard/proyectos',
    },
    {
      label: 'Sectores',
      value: stats.sectors,
      icon: Zap,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      href: '/dashboard/sectores',
    },
  ];

  const contactCards = [
    {
      label: 'Mensajes de Contacto',
      value: stats.messages,
      icon: Mail,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      href: '/dashboard/messages',
    },
    {
      label: 'Cotizaciones',
      value: stats.quotes,
      icon: FileText,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      href: '/dashboard/quotes',
    },
    {
      label: 'Solicitudes de Empleo',
      value: stats.applications,
      icon: Users,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      href: '/dashboard/applications',
    },
  ];

  if (error) return <p className="text-red-600 font-medium">{error}</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-brayton-navy mb-2">Panel de Control</h1>
        <p className="text-brayton-slate">Administración completa de BRAYTON SRL</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200">
          <p className="text-brayton-slate font-medium">Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Contenido del Sitio */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-brayton-navy mb-4">Contenido del Sitio Web</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contentCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.label}
                    href={card.href}
                    className={`${card.color} border-2 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={32} />
                      <TrendingUp size={20} className="opacity-50" />
                    </div>
                    <p className="text-sm font-medium opacity-75">{card.label}</p>
                    <p className="text-4xl font-bold mt-2">{card.value}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contactos y Solicitudes */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-brayton-navy mb-4">Contactos y Solicitudes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.label}
                    href={card.href}
                    className={`${card.color} border-2 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={32} />
                      <TrendingUp size={20} className="opacity-50" />
                    </div>
                    <p className="text-sm font-medium opacity-75">{card.label}</p>
                    <p className="text-4xl font-bold mt-2">{card.value}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-brayton-navy mb-6">Resumen General</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-brayton-slate">Total de Contenidos:</span>
                  <span className="font-bold text-brayton-navy">{stats.services + stats.projects + stats.sectors}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-brayton-slate">Total de Contactos:</span>
                  <span className="font-bold text-brayton-navy">{stats.messages + stats.quotes + stats.applications}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-brayton-slate">Última actualización:</span>
                  <span className="font-semibold text-brayton-navy">{new Date().toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brayton-accent/10 to-brayton-blue/10 rounded-xl border-2 border-brayton-accent/20 p-8">
              <h2 className="text-xl font-bold text-brayton-navy mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/servicios"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  + Agregar Servicio
                </Link>
                <Link
                  href="/dashboard/proyectos"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-green-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  + Agregar Proyecto
                </Link>
                <Link
                  href="/dashboard/sectores"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-purple-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  + Agregar Sector
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
