'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { servicesData } from '@/data/services';
import { LOGO_URL } from '@/lib/logo';

const LOGO_ALT = 'BRAYTON SRL';

const HEADER_HEIGHT = 64;

type NavItem = { href: string; label: string; hasDropdown?: true };
const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios', hasDropdown: true },
  { href: '/sectores', label: 'Sectores' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Noticias' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [serviciosMobileOpen, setServiciosMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServiciosOpen(false);
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
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 border-b border-white/[0.06] transition-[background-color,box-shadow] duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 22, 40, 0.98)' : '#0a1628',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.03)' : 'none',
        }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo: fondo blanco y color de texto oscuro para que el SVG se vea */}
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center rounded-md bg-white px-2 py-1.5 min-h-[2.25rem] min-w-[120px] sm:min-h-10 sm:min-w-[132px] text-brayton-navy"
            aria-label="BRAYTON SRL - Inicio"
          >
            <span className="relative block h-9 w-[132px] sm:h-10 sm:w-[148px]">
              <Image
                src={LOGO_URL}
                alt={LOGO_ALT}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 132px, 148px"
                priority
                unoptimized
              />
            </span>
          </Link>

          {/* Desktop nav (xl+) */}
          <nav className="hidden xl:flex xl:items-center xl:gap-1 xl:flex-1 xl:justify-center xl:min-w-0" aria-label="Navegación principal">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="relative" ref={dropdownRef} onMouseLeave={() => setServiciosOpen(false)}>
                    <button
                      type="button"
                      onClick={() => setServiciosOpen((v) => !v)}
                      onMouseEnter={() => setServiciosOpen(true)}
                      className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-colors"
                      aria-expanded={serviciosOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {serviciosOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full z-50 mt-1 w-52 rounded-md border border-white/[0.08] bg-[#0d2137] py-1.5"
                          role="menu"
                        >
                          <Link
                            href="/servicios"
                            className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:text-brayton-accent transition-colors"
                            onClick={() => setServiciosOpen(false)}
                            role="menuitem"
                          >
                            Ver todos los servicios
                          </Link>
                          <div className="my-1 border-t border-white/10" aria-hidden />
                          {servicesData.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/servicios/${s.slug}`}
                              className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-brayton-accent transition-colors"
                              onClick={() => setServiciosOpen(false)}
                              role="menuitem"
                            >
                              {s.title}
                            </Link>
                          ))}
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
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/95 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop: Empleo, Ingresar, CTA */}
          <div className="hidden xl:flex xl:items-center xl:gap-6 xl:shrink-0 xl:pl-8 xl:ml-4 xl:border-l xl:border-white/15">
            <Link
              href="/trabaja-con-nosotros"
              className="text-sm font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
              title="Trabaja con nosotros"
            >
              Empleo
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
              aria-label="Acceder al panel"
              title="Acceder al panel"
            >
              Ingresar
            </Link>
            <Link
              href="/contacto"
              className="shrink-0 rounded-md bg-brayton-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c95203] focus:outline-none focus:ring-2 focus:ring-brayton-accent focus:ring-offset-2 focus:ring-offset-[#0a1628]"
              title="Solicitar cotización"
            >
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile: Ingresar + hamburger */}
          <div className="flex xl:hidden shrink-0 items-center gap-1">
            <Link
              href="/login"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Acceder al panel"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
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
              className="fixed inset-0 z-40 bg-black/50 xl:hidden"
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0d2137] xl:hidden"
            >
              <nav className="px-4 py-6" aria-label="Menú móvil">
                <ul className="space-y-0">
                  {navItems.map((item) => {
                    if (item.hasDropdown) {
                      return (
                        <li key={item.href}>
                          <button
                            type="button"
                            onClick={() => setServiciosMobileOpen((v) => !v)}
                            className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-white"
                            aria-expanded={serviciosMobileOpen}
                          >
                            {item.label}
                            <svg
                              className={`h-5 w-5 shrink-0 transition-transform ${serviciosMobileOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {serviciosMobileOpen && (
                            <ul className="border-t border-white/10 pb-3 pt-1">
                              <li>
                                <Link
                                  href="/servicios"
                                  className="block py-2.5 pl-4 text-sm text-white/85 hover:text-brayton-accent"
                                  onClick={() => { setMobileOpen(false); setServiciosMobileOpen(false); }}
                                >
                                  Ver todos los servicios
                                </Link>
                              </li>
                              {servicesData.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/servicios/${s.slug}`}
                                    className="block py-2.5 pl-4 text-sm text-white/85 hover:text-brayton-accent"
                                    onClick={() => { setMobileOpen(false); setServiciosMobileOpen(false); }}
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    }
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-3 text-base font-medium text-white hover:text-brayton-accent transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="border-t border-white/10 pt-3">
                    <Link
                      href="/trabaja-con-nosotros"
                      className="block py-3 text-base font-medium text-white hover:text-brayton-accent transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Empleo
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contacto"
                    className="flex items-center justify-center rounded-lg bg-brayton-accent py-3.5 text-base font-semibold text-white transition-colors hover:bg-brayton-accent-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    Solicitar Cotización
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/20 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Ingresar
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so content is not under fixed header */}
      <div style={{ height: HEADER_HEIGHT }} aria-hidden />
    </>
  );
}
