'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Client {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string | null;
}

export default function ClientesPage() {
  const [list, setList] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Client[]>('/api/clients').then(setList).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Clientes</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Empresa</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Contacto</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-gray-50">
                <td className="px-4 py-3 text-sm">{c.company}</td>
                <td className="px-4 py-3 text-sm">{c.contact}</td>
                <td className="px-4 py-3 text-sm">{c.email}</td>
                <td className="px-4 py-3 text-sm">{c.phone ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
