'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const MENU = [
  { href: '/dashboard', label: 'Inicio', roles: ['SuperAdmin', 'Administrador', 'RRHH', 'Contabilidad', 'Supervisor de obra'] },
  { href: '/dashboard/empleados', label: 'Empleados', roles: ['SuperAdmin', 'Administrador', 'RRHH'] },
  { href: '/dashboard/sueldos', label: 'Sueldos y recibos', roles: ['SuperAdmin', 'Administrador', 'RRHH', 'Contabilidad', 'Empleado'] },
  { href: '/dashboard/clientes', label: 'Clientes', roles: ['SuperAdmin', 'Administrador', 'Cliente'] },
  { href: '/dashboard/proveedores', label: 'Proveedores', roles: ['SuperAdmin', 'Administrador', 'Proveedor'] },
  { href: '/dashboard/proyectos', label: 'Proyectos', roles: ['SuperAdmin', 'Administrador', 'Supervisor de obra', 'Cliente'] },
  { href: '/dashboard/facturas', label: 'Facturación', roles: ['SuperAdmin', 'Administrador', 'Contabilidad', 'Cliente'] },
  { href: '/dashboard/pagos', label: 'Pagos', roles: ['SuperAdmin', 'Administrador', 'Contabilidad', 'Proveedor'] },
  { href: '/dashboard/usuarios', label: 'Usuarios', roles: ['SuperAdmin', 'Administrador'] },
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
    const u = localStorage.getItem('user');
    if (!u) {
      router.replace('/login');
      return;
    }
    setUser(JSON.parse(u));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.replace('/login');
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {visibleMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href ? 'bg-brayton-accent text-white' : 'text-white/80 hover:bg-white/10'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button type="button" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <svg className="w-6 h-6 text-brayton-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brayton-slate">{user.role}</span>
            <button type="button" onClick={logout} className="text-sm text-brayton-accent hover:underline">
              Cerrar sesión
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
