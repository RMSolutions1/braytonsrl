'use client';

import { useEffect, useState } from 'react';
import { Mail, FileText, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  messages: number;
  quotes: number;
  applications: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    messages: 0,
    quotes: 0,
    applications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [messagesRes, quotesRes, applicationsRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/quotes'),
          fetch('/api/applications'),
        ]);

        if (!messagesRes.ok || !quotesRes.ok || !applicationsRes.ok) {
          throw new Error('Error fetching data');
        }

        const [messages, quotes, applications] = await Promise.all([
          messagesRes.json(),
          quotesRes.json(),
          applicationsRes.json(),
        ]);

        setStats({
          messages: Array.isArray(messages) ? messages.length : 0,
          quotes: Array.isArray(quotes) ? quotes.length : 0,
          applications: Array.isArray(applications) ? applications.length : 0,
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

  const statCards = [
    {
      label: 'Mensajes de Contacto',
      value: stats.messages,
      icon: Mail,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
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
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      href: '/dashboard/applications',
    },
  ];

  if (error) return <p className="text-red-600 font-medium">{error}</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-brayton-navy mb-2">Panel de Control</h1>
        <p className="text-brayton-slate">Administración central de BRAYTON SRL</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200">
          <p className="text-brayton-slate font-medium">Cargando datos...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {statCards.map((card) => {
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

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-brayton-navy mb-6">Información General</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-brayton-slate">Total de registros:</span>
                  <span className="font-bold text-brayton-navy">{stats.messages + stats.quotes + stats.applications}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-brayton-slate">Última actualización:</span>
                  <span className="font-semibold text-brayton-navy">{new Date().toLocaleTimeString('es-AR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brayton-slate">Sistema:</span>
                  <span className="font-semibold text-brayton-navy">Dashboard v1.0</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brayton-accent/10 to-brayton-blue/10 rounded-xl border-2 border-brayton-accent/20 p-8">
              <h2 className="text-xl font-bold text-brayton-navy mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/messages"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  Ver Mensajes
                </Link>
                <Link
                  href="/dashboard/quotes"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-yellow-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  Ver Cotizaciones
                </Link>
                <Link
                  href="/dashboard/applications"
                  className="block px-4 py-3 rounded-lg bg-white hover:bg-purple-50 border border-gray-200 text-brayton-navy font-medium transition-colors"
                >
                  Ver Solicitudes de Empleo
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
