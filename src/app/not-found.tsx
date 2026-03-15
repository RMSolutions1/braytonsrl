import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-display font-bold text-4xl text-brayton-navy mb-2">404</h1>
      <p className="text-brayton-slate text-center max-w-md mb-6">
        La página que busca no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
