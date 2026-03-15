'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ConditionalPublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = pathname === '/login' || pathname?.startsWith('/dashboard');
  if (isApp) {
    return <>{children}</>;
  }
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
