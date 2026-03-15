'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Payment = {
  id: string;
  amount: string;
  date: string;
  type: string;
  reference: string | null;
  provider?: { company: string };
  invoice?: { number: string };
};

export default function PagosPage() {
  const [list, setList] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Payment[]>('/api/payments')
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Pagos</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Fecha</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Monto</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Tipo</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Proveedor / Factura</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Referencia</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm">{new Date(p.date).toLocaleDateString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">$ {Number(p.amount).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">{p.type}</td>
                <td className="px-4 py-3 text-sm">{p.provider?.company || p.invoice?.number || '-'}</td>
                <td className="px-4 py-3 text-sm">{p.reference || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
