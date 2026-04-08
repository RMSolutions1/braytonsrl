'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Building, Calendar, Archive, Reply, Eye, Trash2, X, Send, Check } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function MensajesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded' | 'archived'>('new');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter, fetchMessages]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

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
      showNotification('error', 'Error al cargar los mensajes');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    // Marcar como leído si es nuevo
    if (msg.status === 'new') {
      try {
        await fetch('/api/contact/messages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: msg.id, status: 'read' }),
        });
        fetchMessages();
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/contact/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showNotification('success', `Mensaje ${status === 'archived' ? 'archivado' : 'actualizado'}`);
        fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('error', 'Error al actualizar el mensaje');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;
    
    try {
      const res = await fetch('/api/contact/messages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        showNotification('success', 'Mensaje eliminado');
        fetchMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      showNotification('error', 'Error al eliminar el mensaje');
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) {
      showNotification('error', 'Por favor ingresa una respuesta');
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
        showNotification('success', 'Respuesta enviada correctamente desde contacto@braytonsrl.com.ar');
        setReplyText('');
        setShowReplyModal(false);
        setSelectedMessage(null);
        fetchMessages();
      } else {
        const data = await res.json();
        showNotification('error', data.error || 'Error al enviar la respuesta');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      showNotification('error', 'Error al enviar la respuesta');
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      responded: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-600',
    };
    const labels: Record<string, string> = {
      new: 'Nuevo',
      read: 'Leído',
      responded: 'Respondido',
      archived: 'Archivado',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || styles.new}`}>
        {labels[status] || status}
      </span>
    );
  };

  const pendingCount = messages.filter(m => m.status === 'new').length;

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brayton-navy">Mensajes de Contacto</h1>
          {pendingCount > 0 && (
            <p className="text-sm text-brayton-slate mt-1">
              {pendingCount} mensaje{pendingCount > 1 ? 's' : ''} nuevo{pendingCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['new', 'read', 'responded', 'archived', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === tab
                ? 'bg-brayton-accent text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'new' && 'Nuevos'}
            {tab === 'read' && 'Leídos'}
            {tab === 'responded' && 'Respondidos'}
            {tab === 'archived' && 'Archivados'}
            {tab === 'all' && 'Todos'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-brayton-accent border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-gray-500">Cargando mensajes...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay mensajes {filter !== 'all' && `en esta categoría`}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Lista de mensajes */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleViewMessage(msg)}
                className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                  msg.status === 'new' ? 'border-blue-500' : 
                  msg.status === 'read' ? 'border-yellow-500' :
                  msg.status === 'responded' ? 'border-green-500' : 'border-gray-300'
                } ${selectedMessage?.id === msg.id ? 'ring-2 ring-brayton-accent' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`font-bold text-brayton-navy ${msg.status === 'new' ? '' : ''}`}>
                      {msg.name}
                    </h3>
                    <p className="text-sm text-brayton-slate">{msg.email}</p>
                  </div>
                  {getStatusBadge(msg.status)}
                </div>
                <p className="text-gray-600 line-clamp-2 text-sm">{msg.message}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex gap-3">
                    {msg.company && (
                      <span className="flex items-center gap-1">
                        <Building size={12} />
                        {msg.company}
                      </span>
                    )}
                    {msg.project_type && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{msg.project_type}</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(msg.created_at).toLocaleDateString('es-AR')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Panel de detalle */}
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-lg sticky top-4 h-fit">
              <div className="bg-brayton-navy text-white p-4 rounded-t-lg flex items-center justify-between">
                <h2 className="font-bold">Detalle del mensaje</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Info del remitente */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-brayton-navy">{selectedMessage.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-1 hover:text-brayton-accent">
                      <Mail size={14} />
                      {selectedMessage.email}
                    </a>
                    {selectedMessage.phone && (
                      <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-1 hover:text-brayton-accent">
                        <Phone size={14} />
                        {selectedMessage.phone}
                      </a>
                    )}
                    {selectedMessage.company && (
                      <span className="flex items-center gap-1">
                        <Building size={14} />
                        {selectedMessage.company}
                      </span>
                    )}
                  </div>
                  {selectedMessage.project_type && (
                    <span className="inline-block px-2 py-1 bg-brayton-accent/10 text-brayton-accent rounded text-sm">
                      {selectedMessage.project_type}
                    </span>
                  )}
                </div>

                {/* Mensaje */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Mensaje:</p>
                  <p className="whitespace-pre-wrap text-gray-800">{selectedMessage.message}</p>
                </div>

                {/* Respuesta anterior si existe */}
                {selectedMessage.admin_notes && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                      <Check size={16} />
                      Respuesta enviada el {selectedMessage.responded_at && new Date(selectedMessage.responded_at).toLocaleDateString('es-AR')}
                    </p>
                    <p className="whitespace-pre-wrap text-green-800 text-sm">{selectedMessage.admin_notes}</p>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowReplyModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition-colors"
                  >
                    <Reply size={16} />
                    Responder
                  </button>
                  {selectedMessage.status !== 'archived' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'archived')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Archive size={16} />
                      Archivar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-gray-400 sticky top-4 h-64">
              <Eye size={48} className="mb-4" />
              <p>Selecciona un mensaje para ver los detalles</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de respuesta */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-brayton-navy text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Responder mensaje</h2>
                  <p className="text-white/70 text-sm mt-1">
                    Desde: contacto@braytonsrl.com.ar
                  </p>
                </div>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Destinatario */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">Para:</span>
                <span className="font-medium">{selectedMessage.name}</span>
                <span className="text-gray-400">({selectedMessage.email})</span>
              </div>

              {/* Mensaje original */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">Mensaje original:</p>
                <p className="text-sm text-gray-700 line-clamp-3">{selectedMessage.message}</p>
              </div>

              {/* Campo de respuesta */}
              <div>
                <label className="block text-sm font-medium text-brayton-navy mb-2">
                  Tu respuesta
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brayton-accent resize-none"
                  rows={8}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={sending || !replyText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition-colors disabled:opacity-50 font-medium"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar respuesta
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
