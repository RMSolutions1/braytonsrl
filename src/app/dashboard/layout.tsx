'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut, BarChart3, Mail, FileText, Users, Wrench, Settings } from 'lucide-react';

type UserType = 'admin' | 'provider' | 'employee' | 'client';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  userTypes: UserType[];
}

// Menú para Administrador
const ADMIN_MENU: MenuItem[] = [
  { href: '/dashboard', label: 'Panel Principal', icon: BarChart3, userTypes: ['admin'] },
  { href: '/dashboard/servicios', label: 'Gestionar Servicios', icon: Wrench, userTypes: ['admin'] },
  { href: '/dashboard/proyectos', label: 'Gestionar Proyectos', icon: Settings, userTypes: ['admin'] },
  { href: '/dashboard/sectores', label: 'Gestionar Sectores', icon: Settings, userTypes: ['admin'] },
  { href: '/dashboard/mensajes', label: 'Mensajes de Contacto', icon: Mail, userTypes: ['admin'] },
  { href: '/dashboard/cotizaciones', label: 'Cotizaciones', icon: FileText, userTypes: ['admin'] },
  { href: '/dashboard/solicitudes-empleo', label: 'Solicitudes de Empleo', icon: Users, userTypes: ['admin'] },
];

// Menú para Proveedor
const PROVIDER_MENU: MenuItem[] = [
  { href: '/provider-dashboard', label: 'Mi Panel', icon: BarChart3, userTypes: ['provider'] },
  { href: '/provider-dashboard/servicios', label: 'Mis Servicios', icon: Wrench, userTypes: ['provider'] },
  { href: '/provider-dashboard/proyectos', label: 'Mis Proyectos', icon: Settings, userTypes: ['provider'] },
  { href: '/provider-dashboard/mensajes', label: 'Mensajes', icon: Mail, userTypes: ['provider'] },
];

// Menú para Empleado
const EMPLOYEE_MENU: MenuItem[] = [
  { href: '/employee-dashboard', label: 'Mi Panel', icon: BarChart3, userTypes: ['employee'] },
  { href: '/employee-dashboard/tareas', label: 'Mis Tareas', icon: Wrench, userTypes: ['employee'] },
  { href: '/employee-dashboard/proyectos', label: 'Proyectos', icon: Settings, userTypes: ['employee'] },
  { href: '/employee-dashboard/mensajes', label: 'Mensajes', icon: Mail, userTypes: ['employee'] },
];

// Menú para Cliente
const CLIENT_MENU: MenuItem[] = [
  { href: '/client-dashboard', label: 'Mi Panel', icon: BarChart3, userTypes: ['client'] },
  { href: '/client-dashboard/cotizaciones', label: 'Mis Cotizaciones', icon: FileText, userTypes: ['client'] },
  { href: '/client-dashboard/proyectos', label: 'Mis Proyectos', icon: Settings, userTypes: ['client'] },
  { href: '/client-dashboard/mensajes', label: 'Mensajes', icon: Mail, userTypes: ['client'] },
];

const ALL_MENUS: Record<UserType, MenuItem[]> = {
  admin: ADMIN_MENU,
  provider: PROVIDER_MENU,
  employee: EMPLOYEE_MENU,
  client: CLIENT_MENU,
};

interface User {
  id: string;
  email: string;
  userType: UserType;
  name?: string;
  role?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
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

  const userMenu = user ? ALL_MENUS[user.userType] : [];
  const visibleMenu = userMenu;

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

  const getUserTypeName = (userType: UserType): string => {
    const names: Record<UserType, string> = {
      admin: 'Administrador',
      provider: 'Proveedor',
      employee: 'Empleado',
      client: 'Cliente',
    };
    return names[userType];
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brayton-navy text-white transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href={`/${user.userType}-dashboard`} className="font-display font-bold text-lg">
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

        {/* User Info */}
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-sm text-white/70">Tipo de usuario</p>
          <p className="text-white font-semibold">{getUserTypeName(user.userType)}</p>
          {user.name && <p className="text-xs text-white/60 mt-1">{user.name}</p>}
          <p className="text-xs text-white/60">{user.email}</p>
        </div>

        {/* Navigation */}
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

        {/* Logout */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-brayton-navy">{getUserTypeName(user.userType)} - Panel</h1>
          <div />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
