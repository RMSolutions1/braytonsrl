'use client';

import { useEffect, useState } from 'react';
import { FileText, Trash2, Check } from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string;
  description: string;
  budget: string;
  status: string;
  created_at: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch('/api/quotes');
        const data = await res.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta cotización?')) {
      try {
        await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
        setQuotes(quotes.filter((q) => q.id !== id));
      } catch (error) {
        console.error('Error deleting quote:', error);
      }
    }
  };

  const handleMarkAsProcessed = async (id: string) => {
    try {
      await fetch(`/api/quotes/${id}`, { 
        method: 'PATCH',
        body: JSON.stringify({ status: 'processed' })
      });
      setQuotes(quotes.map((q) => 
        q.id === id ? { ...q, status: 'processed' } : q
      ));
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Solicitudes de Cotización</h1>
        <p className="text-brayton-slate">Total de cotizaciones: {quotes.length}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-brayton-slate">Cargando cotizaciones...</p>
        </div>
      ) : quotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-gray-200">
          <FileText size={48} className="text-gray-300 mb-4" />
          <p className="text-brayton-slate">No hay cotizaciones aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedQuote(quote)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-brayton-navy text-lg">{quote.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      quote.status === 'new' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {quote.status === 'new' ? 'Pendiente' : 'Procesada'}
                    </span>
                  </div>
                  <p className="text-sm text-brayton-slate mb-1">{quote.email}</p>
                  <p className="text-sm font-semibold text-brayton-navy mt-2">Servicios: {quote.services}</p>
                  <p className="text-gray-600 line-clamp-2 mt-2">{quote.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {quote.status === 'new' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsProcessed(quote.id);
                      }}
                      className="p-2 hover:bg-green-50 rounded-lg"
                      title="Marcar como procesada"
                    >
                      <Check size={20} className="text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(quote.id);
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="Eliminar"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-brayton-slate">
                {new Date(quote.created_at).toLocaleDateString('es-AR')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para ver cotización completa */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-brayton-navy mb-4">{selectedQuote.name}</h2>
            <div className="space-y-3 mb-6">
              <p><span className="font-semibold">Email:</span> {selectedQuote.email}</p>
              {selectedQuote.phone && <p><span className="font-semibold">Teléfono:</span> {selectedQuote.phone}</p>}
              {selectedQuote.company && <p><span className="font-semibold">Empresa:</span> {selectedQuote.company}</p>}
              <p><span className="font-semibold">Servicios Solicitados:</span> {selectedQuote.services}</p>
              {selectedQuote.budget && <p><span className="font-semibold">Presupuesto:</span> {selectedQuote.budget}</p>}
              <p><span className="font-semibold">Fecha:</span> {new Date(selectedQuote.created_at).toLocaleString('es-AR')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-semibold text-brayton-navy mb-2">Descripción del Proyecto:</p>
              <p className="whitespace-pre-wrap text-gray-700">{selectedQuote.description}</p>
            </div>
            <button
              onClick={() => setSelectedQuote(null)}
              className="w-full px-4 py-2 bg-brayton-navy text-white rounded-lg hover:bg-brayton-navy/90 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
