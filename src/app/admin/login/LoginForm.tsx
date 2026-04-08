'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader } from 'lucide-react';

type UserType = 'admin' | 'provider' | 'employee' | 'client';

const USER_TYPES: { value: UserType; label: string }[] = [
  { value: 'admin', label: 'Administración' },
  { value: 'provider', label: 'Proveedor' },
  { value: 'employee', label: 'Empleado' },
  { value: 'client', label: 'Cliente' },
];

export default function LoginForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Redirigir según el tipo de usuario
      const dashboardRoutes: Record<UserType, string> = {
        admin: '/dashboard',
        provider: '/provider-dashboard',
        employee: '/employee-dashboard',
        client: '/client-dashboard',
      };

      router.push(dashboardRoutes[userType]);
      router.refresh();
    } catch (err) {
      setError('Error al procesar la solicitud');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-brayton-navy mb-3">
          Tipo de Usuario
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {USER_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setUserType(type.value)}
              disabled={loading}
              className={`p-3 rounded-lg border-2 transition-all text-center font-medium text-sm ${
                userType === type.value
                  ? 'border-brayton-accent bg-brayton-accent/10 text-brayton-accent'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              } disabled:opacity-50`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brayton-navy mb-2">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brayton-accent focus:border-transparent transition-all"
          disabled={loading}
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-brayton-navy mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brayton-accent focus:border-transparent transition-all"
          disabled={loading}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brayton-accent hover:bg-brayton-accent-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Iniciar Sesión'
        )}
      </button>
    </form>
  );
}
