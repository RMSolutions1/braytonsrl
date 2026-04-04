import LoginForm from './LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - Dashboard BRAYTON',
  description: 'Panel de administración de BRAYTON SRL',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brayton-navy via-brayton-navy to-brayton-steel flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="text-3xl font-display font-bold text-brayton-navy">
              BRAYTON
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-display font-bold text-brayton-navy text-center mb-2">
            Panel Administrativo
          </h1>
          <p className="text-center text-brayton-slate mb-8">
            Accede con tu usuario y contraseña
          </p>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-brayton-slate">
              © 2024 BRAYTON SRL. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
