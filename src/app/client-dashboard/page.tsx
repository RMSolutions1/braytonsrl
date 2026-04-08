'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, FileText, DollarSign } from 'lucide-react';

interface ClientStats {
  totalQuotes: number;
  activeProjects: number;
  totalSpent: number;
}

export default function ClientDashboard() {
  const [stats, setStats] = useState<ClientStats>({
    totalQuotes: 0,
    activeProjects: 0,
    totalSpent: 0,
  });
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar estadísticas del cliente
    const loadStats = async () => {
      try {
        // Aquí iría la lógica para cargar las estadísticas del cliente
        setStats({
          totalQuotes: 0,
          activeProjects: 0,
          totalSpent: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Panel de Cliente</h1>
        <p className="text-brayton-slate">Consulta tus cotizaciones y proyectos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Mis Cotizaciones</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.totalQuotes}</p>
            </div>
            <FileText className="text-brayton-accent" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Proyectos Activos</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.activeProjects}</p>
            </div>
            <ShoppingCart className="text-brayton-accent" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Inversión Total</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">${stats.totalSpent}</p>
            </div>
            <DollarSign className="text-green-600" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
