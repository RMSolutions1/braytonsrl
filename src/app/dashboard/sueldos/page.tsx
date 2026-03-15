'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { API_URL } from '@/lib/api';

type Payroll = {
  id: string;
  periodMonth: number;
  periodYear: number;
  baseSalary: string;
  netAmount: string;
  receipt?: { id: string; fileName: string };
  employee?: { employeeCode: string; firstName: string; lastName: string };
};

export default function SueldosPage() {
  const [list, setList] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Payroll[]>('/api/payroll').then(setList).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Sueldos y recibos</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Período</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Empleado</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Salario base</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Neto</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Recibo</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-gray-50">
                <td className="px-4 py-3 text-sm">{String(p.periodMonth).padStart(2, '0')}/{p.periodYear}</td>
                <td className="px-4 py-3 text-sm">{p.employee ? p.employee.lastName + ', ' + p.employee.firstName : '-'}</td>
                <td className="px-4 py-3 text-sm">{Number(p.baseSalary).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">{Number(p.netAmount).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">
                  {p.receipt ? (
                    <button
                      type="button"
                      className="text-brayton-accent hover:underline"
                      onClick={() => {
                        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
                        if (!token) return;
                        fetch(API_URL + '/api/payroll/' + p.id + '/receipt', { headers: { Authorization: 'Bearer ' + token } })
                          .then((r) => r.blob())
                          .then((blob) => {
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = p.receipt?.fileName || 'recibo.pdf';
                            a.click();
                            URL.revokeObjectURL(url);
                          });
                      }}
                    >
                      Descargar PDF
                    </button>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
