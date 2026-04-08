'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp } from 'lucide-react';

interface ProviderStats {
  totalServices: number;
  activeProjects: number;
  totalMessages: number;
}

export default function ProviderDashboard() {
  const [stats, setStats] = useState<ProviderStats>({
    totalServices: 0,
    activeProjects: 0,
    totalMessages: 0,
  });
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar estadísticas del proveedor
    const loadStats = async () => {
      try {
        // Aquí iría la lógica para cargar las estadísticas del proveedor
        setStats({
          totalServices: 0,
          activeProjects: 0,
          totalMessages: 0,
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
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Panel de Proveedor</h1>
        <p className="text-brayton-slate">Bienvenido a tu panel de control</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Mis Servicios</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.totalServices}</p>
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
            <TrendingUp className="text-brayton-accent" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Mensajes</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.totalMessages}</p>
            </div>
            <Users className="text-brayton-accent" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
