'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { servicesData } from '@/data/services';
import BraytonLogo from '@/components/ui/BraytonLogo';

const HEADER_HEIGHT = 80;

type NavItem = { href: string; label: string; hasDropdown?: true };
const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios', hasDropdown: true },
  { href: '/sectores', label: 'Sectores' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Noticias' },
];

// Modern icons as components
const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [serviciosMobileOpen, setServiciosMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiciosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServiciosOpen(false);
        setServiciosMobileOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar with contact info */}
      <div className="hidden lg:block bg-brayton-navy border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-white/60">
              <a href="tel:+543874498588" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneIcon />
                <span>+54 387 4498588</span>
              </a>
              <span className="hidden xl:block">Lun - Vie: 8:00 - 18:00</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/trabaja-con-nosotros" className="text-white/60 hover:text-white transition-colors">
                Trabaja con nosotros
              </Link>
              <span className="w-px h-4 bg-white/20" />
              <Link href="/login" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <UserIcon />
                <span>Ingresar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg shadow-black/5' 
            : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="BRAYTON SRL - Inicio"
            >
              <BraytonLogo className="h-6 w-auto lg:h-7" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Navegacion principal">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.href} 
                      className="relative" 
                      ref={dropdownRef}
                      onMouseLeave={() => setServiciosOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServiciosOpen((v) => !v)}
                        onMouseEnter={() => setServiciosOpen(true)}
                        className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-brayton-navy hover:bg-brayton-navy/5 hover:text-brayton-accent transition-colors"
                        aria-expanded={serviciosOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDownIcon />
                      </button>
                      <AnimatePresence>
                        {serviciosOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute left-0 top-full z-50 mt-2 w-72 origin-top-left rounded-xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/10"
                            role="menu"
                          >
                            <Link
                              href="/servicios"
                              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-brayton-navy hover:bg-brayton-accent/10 hover:text-brayton-accent transition-colors"
                              onClick={() => setServiciosOpen(false)}
                              role="menuitem"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brayton-accent/10 text-brayton-accent">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                              </span>
                              <div>
                                <span className="block">Ver todos los servicios</span>
                                <span className="block text-xs font-normal text-gray-500">Soluciones integrales de construccion</span>
                              </div>
                            </Link>
                            <div className="my-2 border-t border-gray-100" />
                            <div className="space-y-0.5">
                              {servicesData.map((s) => (
                                <Link
                                  key={s.slug}
                                  href={`/servicios/${s.slug}`}
                                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brayton-accent transition-colors"
                                  onClick={() => setServiciosOpen(false)}
                                  role="menuitem"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-brayton-accent/40" />
                                  {s.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-brayton-navy hover:bg-brayton-navy/5 hover:text-brayton-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-lg bg-brayton-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brayton-accent/25 transition-all hover:bg-brayton-accent-dark hover:shadow-xl hover:shadow-brayton-accent/30 hover:-translate-y-0.5"
              >
                Solicitar Cotizacion
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/login"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-brayton-navy hover:bg-gray-100 transition-colors"
                aria-label="Acceder al panel"
              >
                <UserIcon />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-brayton-navy hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                <BraytonLogo className="h-5 w-auto" />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-brayton-navy hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menu"
                >
                  <CloseIcon />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto p-4" aria-label="Menu movil">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    if (item.hasDropdown) {
                      return (
                        <li key={item.href}>
                          <button
                            type="button"
                            onClick={() => setServiciosMobileOpen((v) => !v)}
                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-brayton-navy hover:bg-gray-50 transition-colors"
                            aria-expanded={serviciosMobileOpen}
                          >
                            {item.label}
                            <motion.span
                              animate={{ rotate: serviciosMobileOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDownIcon />
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {serviciosMobileOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <li>
                                  <Link
                                    href="/servicios"
                                    className="block rounded-lg px-8 py-2.5 text-sm font-medium text-brayton-accent hover:bg-gray-50"
                                    onClick={() => { setMobileOpen(false); setServiciosMobileOpen(false); }}
                                  >
                                    Ver todos los servicios
                                  </Link>
                                </li>
                                {servicesData.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/servicios/${s.slug}`}
                                      className="block rounded-lg px-8 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brayton-accent"
                                      onClick={() => { setMobileOpen(false); setServiciosMobileOpen(false); }}
                                    >
                                      {s.title}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-4 py-3 text-base font-medium text-brayton-navy hover:bg-gray-50 hover:text-brayton-accent transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <Link
                    href="/trabaja-con-nosotros"
                    className="block rounded-lg px-4 py-3 text-base font-medium text-brayton-navy hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Trabaja con nosotros
                  </Link>
                </div>

                <div className="mt-6 space-y-3 px-4">
                  <Link
                    href="/contacto"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brayton-accent py-3.5 text-base font-semibold text-white shadow-lg shadow-brayton-accent/25 transition-colors hover:bg-brayton-accent-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    Solicitar Cotizacion
                    <ArrowRightIcon />
                  </Link>
                  <a
                    href="tel:+543874498588"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-base font-medium text-brayton-navy transition-colors hover:bg-gray-50"
                  >
                    <PhoneIcon />
                    +54 387 4498588
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for sticky header */}
      <div className="hidden lg:block h-10" aria-hidden />
    </>
  );
}
