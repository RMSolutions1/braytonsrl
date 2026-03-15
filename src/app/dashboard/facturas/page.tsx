'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Invoice = {
  id: string;
  number: string;
  amount: string;
  issueDate: string;
  status: string;
  client?: { company: string };
};

export default function FacturasPage() {
  const [list, setList] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Invoice[]>('/api/invoices').then(setList).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Facturación</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Número</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Cliente</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Monto</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Fecha</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Estado</th>
            </tr>
          </thead>
          <tbody>
            {list.map((i) => (
              <tr key={i.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm">{i.number}</td>
                <td className="px-4 py-3 text-sm">{i.client?.company || '-'}</td>
                <td className="px-4 py-3 text-sm">{Number(i.amount).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">{new Date(i.issueDate).toLocaleDateString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">{i.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
