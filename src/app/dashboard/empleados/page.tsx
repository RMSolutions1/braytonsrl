'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Employee = {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  area: string;
  salary: string;
  active: boolean;
};

export default function EmpleadosPage() {
  const [list, setList] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Employee[]>('/api/employees')
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Empleados</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Legajo</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Nombre</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Cargo</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Área</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Salario</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Estado</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm">{e.employeeCode}</td>
                <td className="px-4 py-3 text-sm">{e.lastName}, {e.firstName}</td>
                <td className="px-4 py-3 text-sm">{e.email}</td>
                <td className="px-4 py-3 text-sm">{e.position}</td>
                <td className="px-4 py-3 text-sm">{e.area}</td>
                <td className="px-4 py-3 text-sm">$ {Number(e.salary).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-sm">{e.active ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
