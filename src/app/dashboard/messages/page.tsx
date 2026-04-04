'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, Check, Clock, Eye } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este mensaje?')) {
      try {
        await fetch(`/api/contact/${id}`, { method: 'DELETE' });
        setMessages(messages.filter((m) => m.id !== id));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { 
        method: 'PATCH',
        body: JSON.stringify({ status: 'read' })
      });
      setMessages(messages.map((m) => 
        m.id === id ? { ...m, status: 'read' } : m
      ));
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brayton-navy mb-2">Mensajes de Contacto</h1>
        <p className="text-brayton-slate">Total de mensajes: {messages.length}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-brayton-slate">Cargando mensajes...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-gray-200">
          <Mail size={48} className="text-gray-300 mb-4" />
          <p className="text-brayton-slate">No hay mensajes aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-brayton-navy text-lg">{msg.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      msg.status === 'new' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {msg.status === 'new' ? 'Nuevo' : 'Leído'}
                    </span>
                  </div>
                  <p className="text-sm text-brayton-slate mb-1">{msg.email}</p>
                  {msg.phone && <p className="text-sm text-brayton-slate">{msg.phone}</p>}
                  <p className="text-gray-600 line-clamp-2 mt-3">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {msg.status === 'new' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(msg.id);
                      }}
                      className="p-2 hover:bg-blue-50 rounded-lg"
                      title="Marcar como leído"
                    >
                      <Check size={20} className="text-blue-600" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="Eliminar"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-brayton-slate">
                {new Date(msg.created_at).toLocaleDateString('es-AR')} - {msg.project_type}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para ver mensaje completo */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-brayton-navy mb-4">{selectedMessage.name}</h2>
            <div className="space-y-3 mb-6">
              <p><span className="font-semibold">Email:</span> {selectedMessage.email}</p>
              {selectedMessage.phone && <p><span className="font-semibold">Teléfono:</span> {selectedMessage.phone}</p>}
              {selectedMessage.company && <p><span className="font-semibold">Empresa:</span> {selectedMessage.company}</p>}
              {selectedMessage.project_type && <p><span className="font-semibold">Tipo de Proyecto:</span> {selectedMessage.project_type}</p>}
              <p><span className="font-semibold">Fecha:</span> {new Date(selectedMessage.created_at).toLocaleString('es-AR')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="whitespace-pre-wrap text-gray-700">{selectedMessage.message}</p>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
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
