'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut, BarChart3, ShoppingCart, Settings, Mail } from 'lucide-react';

interface User {
  id: string;
  email: string;
  userType: 'client';
  name?: string;
}

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user.userType === 'client') {
            setUser(data.user);
          } else {
            router.replace('/admin/login');
          }
        } else {
          router.replace('/admin/login');
        }
      } catch (error) {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    router.replace('/admin/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-brayton-slate">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-brayton-slate">No autenticado</p>
      </div>
    );
  }

  const MENU = [
    { href: '/client-dashboard', label: 'Mi Panel', icon: BarChart3 },
    { href: '/client-dashboard/cotizaciones', label: 'Mis Cotizaciones', icon: ShoppingCart },
    { href: '/client-dashboard/proyectos', label: 'Mis Proyectos', icon: Settings },
    { href: '/client-dashboard/mensajes', label: 'Mensajes', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brayton-navy text-white transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/client-dashboard" className="font-display font-bold text-lg">
            BRAYTON <span className="text-brayton-accent">SRL</span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-sm text-white/70">Cliente</p>
          {user.name && <p className="text-white font-semibold">{user.name}</p>}
          <p className="text-xs text-white/60">{user.email}</p>
        </div>

        <nav className="p-4 space-y-1">
          {MENU.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-white/80 hover:bg-white/10"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-brayton-navy">Panel de Cliente</h1>
          <div />
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
