'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Metrics = {
  projectsActive: number;
  employeesCount: number;
  clientsCount: number;
  providersCount: number;
  invoicingMonth: number;
  paymentsMonth: number;
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Metrics>('/api/dashboard/metrics')
      .then(setMetrics)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!metrics) return <p className="text-brayton-slate">Cargando métricas...</p>;

  const cards = [
    { label: 'Proyectos activos', value: metrics.projectsActive, color: 'bg-blue-500' },
    { label: 'Empleados activos', value: metrics.employeesCount, color: 'bg-emerald-500' },
    { label: 'Clientes', value: metrics.clientsCount, color: 'bg-violet-500' },
    { label: 'Proveedores', value: metrics.providersCount, color: 'bg-amber-500' },
    { label: 'Facturación del mes', value: '$ ' + metrics.invoicingMonth.toLocaleString('es-AR'), color: 'bg-green-600' },
    { label: 'Pagos del mes', value: '$ ' + metrics.paymentsMonth.toLocaleString('es-AR'), color: 'bg-teal-600' },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-brayton-slate">{c.label}</p>
            <p className="mt-2 text-2xl font-semibold text-brayton-navy">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
