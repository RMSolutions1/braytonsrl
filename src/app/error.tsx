'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-display font-bold text-2xl text-brayton-navy mb-2">
        Algo salió mal
      </h1>
      <p className="text-brayton-slate text-center max-w-md mb-6">
        Ha ocurrido un error inesperado. Puede intentar de nuevo o volver al inicio.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-brayton-steel text-brayton-navy font-semibold hover:bg-slate-50 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
