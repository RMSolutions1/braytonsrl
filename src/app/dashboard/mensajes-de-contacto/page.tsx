'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string;
  sector: string;
  admin_notes: string | null;
  responded_at: string | null;
  is_active: boolean;
  created_at: string;
}

export default function MensajesContactoPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded'>('pending');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/contact/messages?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error('Por favor ingresa una respuesta');
      return;
    }

    try {
      setSending(true);
      const res = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: selectedMessage.id,
          replyText: replyText,
        }),
      });

      if (res.ok) {
        toast.success('Respuesta enviada correctamente');
        setReplyText('');
        setSelectedMessage(null);
        fetchMessages();
      } else {
        toast.error('Error al enviar la respuesta');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error al enviar la respuesta');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brayton-navy">Mensajes de Contacto</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['pending', 'responded', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === tab
                ? 'bg-brayton-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'pending' && 'Pendientes'}
            {tab === 'responded' && 'Respondidos'}
            {tab === 'all' && 'Todos'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Cargando mensajes...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No hay mensajes</div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-brayton-navy">{msg.name}</h3>
                  <p className="text-sm text-brayton-slate">{msg.email}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    msg.is_active
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {msg.is_active ? 'Pendiente' : 'Respondido'}
                </span>
              </div>
              <p className="font-semibold text-brayton-navy mb-2">{msg.subject}</p>
              <p className="text-gray-600 line-clamp-2">{msg.message}</p>
              <div className="mt-3 flex gap-4 text-sm text-gray-500">
                {msg.company && <span>{msg.company}</span>}
                {msg.sector && <span>{msg.sector}</span>}
                {msg.phone && <span>{msg.phone}</span>}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.created_at).toLocaleDateString('es-AR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de respuesta */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-brayton-navy text-white p-6 border-b">
              <h2 className="text-xl font-bold">Responder mensaje</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Mensaje original */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-brayton-navy mb-2">Mensaje original</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>De:</strong> {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  {selectedMessage.phone && (
                    <p>
                      <strong>Teléfono:</strong> {selectedMessage.phone}
                    </p>
                  )}
                  {selectedMessage.company && (
                    <p>
                      <strong>Empresa:</strong> {selectedMessage.company}
                    </p>
                  )}
                  {selectedMessage.sector && (
                    <p>
                      <strong>Sector:</strong> {selectedMessage.sector}
                    </p>
                  )}
                  <p className="mt-3">
                    <strong>Asunto:</strong> {selectedMessage.subject}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Respuesta anterior si existe */}
              {selectedMessage.admin_notes && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">Respuesta anterior</h3>
                  <p className="text-sm text-blue-800 whitespace-pre-wrap">
                    {selectedMessage.admin_notes}
                  </p>
                </div>
              )}

              {/* Campo de respuesta */}
              <div>
                <label className="block text-sm font-medium text-brayton-navy mb-2">
                  Tu respuesta
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brayton-accent"
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  El email se enviará desde: contacto@braytonsrl.com.ar
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyText.trim()}
                  className="px-6 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition-colors disabled:opacity-50"
                >
                  {sending ? 'Enviando...' : 'Enviar respuesta'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
