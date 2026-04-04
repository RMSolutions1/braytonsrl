'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Upload, Loader } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  details: string;
  sort_order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image_url: '',
    details: '',
    sort_order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Error saving service');
      await fetchServices();
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
        image_url: '',
        details: '',
        sort_order: 0,
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el servicio');
    }
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Confirmar eliminación?')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting');
      await fetchServices();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar servicio');
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image_url: url });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl text-brayton-navy">Gestionar Servicios</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              icon: '',
              image_url: '',
              details: '',
              sort_order: 0,
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition"
        >
          <Plus size={20} />
          Agregar Servicio
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-xl text-brayton-navy mb-4">
            {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                required
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Detalles Adicionales</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Imagen</label>
              <ImageUploader onUpload={handleImageUpload} />
              {formData.image_url && (
                <div className="mt-2 relative w-32 h-32">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover rounded" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Ícono</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Ej: Building2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Orden</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-brayton-navy">{service.title}</h3>
              <p className="text-sm text-brayton-slate mt-1">{service.description}</p>
              {service.image_url && (
                <div className="mt-3 w-20 h-20">
                  <img src={service.image_url} alt={service.title} className="w-full h-full object-cover rounded" />
                </div>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(service)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
