'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type User = {
  id: string;
  email: string;
  active: boolean;
  role: { name: string };
};

export default function UsuariosPage() {
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<User[]>('/api/users')
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-6">Usuarios</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Rol</th>
              <th className="px-4 py-3 text-sm font-semibold text-brayton-navy">Estado</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm">{u.email}</td>
                <td className="px-4 py-3 text-sm">{u.role.name}</td>
                <td className="px-4 py-3 text-sm">{u.active ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
