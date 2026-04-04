'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut, BarChart3, Mail, FileText, Users } from 'lucide-react';

import { Settings, Wrench } from 'lucide-react';

const MENU = [
  { href: '/dashboard', label: 'Panel Principal', icon: BarChart3, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/messages', label: 'Mensajes de Contacto', icon: Mail, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/quotes', label: 'Cotizaciones', icon: FileText, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/applications', label: 'Solicitudes de Empleo', icon: Users, roles: ['SuperAdmin', 'Administrador', 'RRHH'] },
  { href: '/dashboard/services', label: 'Gestionar Servicios', icon: Wrench, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/projects', label: 'Gestionar Proyectos', icon: Settings, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/sectors', label: 'Gestionar Sectores', icon: Settings, roles: ['SuperAdmin', 'Administrador'] },
  { href: '/dashboard/empleados', label: 'Empleados', icon: Users, roles: ['SuperAdmin', 'Administrador', 'RRHH'] },
  { href: '/dashboard/usuarios', label: 'Usuarios', icon: Users, roles: ['SuperAdmin', 'Administrador'] },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
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

  const visibleMenu = MENU.filter((m) => user && m.roles.includes(user.role));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-brayton-slate">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brayton-navy text-white transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/dashboard" className="font-display font-bold text-lg">
            BRAYTON <span className="text-brayton-accent">SRL</span>
          </Link>
          <button type="button" className="lg:hidden p-2" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {visibleMenu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href ? 'bg-brayton-accent text-white' : 'text-white/80 hover:bg-white/10'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button type="button" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <Menu size={24} className="text-brayton-navy" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-semibold text-brayton-navy">{user.role}</span>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brayton-accent/10 text-brayton-accent hover:bg-brayton-accent/20 transition-colors">
              <LogOut size={16} />
              <span className="text-sm font-medium">Cerrar sesión</span>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
