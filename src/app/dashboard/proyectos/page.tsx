'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Project = {
  id: string;
  name: string;
  location: string | null;
  status: string;
  budget: string | null;
  client?: { company: string };
};

export default function ProyectosPage() {
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Project[]>('/api/projects').then(setList).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Proyectos</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Nombre</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Cliente</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Ubicación</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Estado</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Presupuesto</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm">{p.name}</td>
                <td className="px-4 py-3 text-sm">{p.client?.company || '-'}</td>
                <td className="px-4 py-3 text-sm">{p.location || '-'}</td>
                <td className="px-4 py-3 text-sm">{p.status}</td>
                <td className="px-4 py-3 text-sm">{p.budget ? Number(p.budget).toLocaleString('es-AR') : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
