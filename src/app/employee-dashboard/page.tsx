'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface EmployeeStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export default function EmployeeDashboard() {
  const [stats, setStats] = useState<EmployeeStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar estadísticas del empleado
    const loadStats = async () => {
      try {
        // Aquí iría la lógica para cargar las estadísticas del empleado
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
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
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Panel de Empleado</h1>
        <p className="text-brayton-slate">Gestiona tus tareas y proyectos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Total de Tareas</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.totalTasks}</p>
            </div>
            <AlertCircle className="text-brayton-accent" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Completadas</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.completedTasks}</p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brayton-slate text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold text-brayton-navy mt-2">{stats.pendingTasks}</p>
            </div>
            <Clock className="text-orange-600" size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
