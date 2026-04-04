'use client';

import { useEffect, useState } from 'react';
import { Users, Trash2, Check, Download } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  cv_url: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications');
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta solicitud?')) {
      try {
        await fetch(`/api/applications/${id}`, { method: 'DELETE' });
        setApplications(applications.filter((a) => a.id !== id));
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleMarkAsReviewed = async (id: string) => {
    try {
      await fetch(`/api/applications/${id}`, { 
        method: 'PATCH',
        body: JSON.stringify({ status: 'reviewed' })
      });
      setApplications(applications.map((a) => 
        a.id === id ? { ...a, status: 'reviewed' } : a
      ));
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Solicitudes de Empleo</h1>
        <p className="text-brayton-slate">Total de solicitudes: {applications.length}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-brayton-slate">Cargando solicitudes...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-gray-200">
          <Users size={48} className="text-gray-300 mb-4" />
          <p className="text-brayton-slate">No hay solicitudes aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-brayton-navy text-lg">{app.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'new' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {app.status === 'new' ? 'Nueva' : 'Revisada'}
                    </span>
                  </div>
                  <p className="text-sm text-brayton-slate mb-1">{app.email}</p>
                  {app.phone && <p className="text-sm text-brayton-slate">{app.phone}</p>}
                  <p className="text-sm font-semibold text-brayton-navy mt-2">Posición: {app.position}</p>
                  {app.cv_url && (
                    <p className="text-sm text-brayton-accent mt-1 flex items-center gap-1">
                      <Download size={14} />
                      CV disponible
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {app.status === 'new' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsReviewed(app.id);
                      }}
                      className="p-2 hover:bg-green-50 rounded-lg"
                      title="Marcar como revisada"
                    >
                      <Check size={20} className="text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(app.id);
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="Eliminar"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-brayton-slate">
                {new Date(app.created_at).toLocaleDateString('es-AR')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para ver aplicación completa */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-brayton-navy mb-4">{selectedApp.name}</h2>
            <div className="space-y-3 mb-6">
              <p><span className="font-semibold">Email:</span> {selectedApp.email}</p>
              {selectedApp.phone && <p><span className="font-semibold">Teléfono:</span> {selectedApp.phone}</p>}
              <p><span className="font-semibold">Posición Solicitada:</span> {selectedApp.position}</p>
              {selectedApp.experience && <p><span className="font-semibold">Experiencia:</span> {selectedApp.experience}</p>}
              <p><span className="font-semibold">Fecha de Solicitud:</span> {new Date(selectedApp.created_at).toLocaleString('es-AR')}</p>
            </div>
            {selectedApp.message && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-brayton-navy mb-2">Mensaje:</p>
                <p className="whitespace-pre-wrap text-gray-700">{selectedApp.message}</p>
              </div>
            )}
            {selectedApp.cv_url && (
              <a
                href={selectedApp.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition-colors mb-4"
              >
                <Download size={18} />
                Descargar CV
              </a>
            )}
            <button
              onClick={() => setSelectedApp(null)}
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
