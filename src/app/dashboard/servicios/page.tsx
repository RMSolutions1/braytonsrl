'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  image_url: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    icon: '',
    image_url: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editing?.id ? 'PUT' : 'POST';
      const body = editing?.id ? { id: editing.id, ...formData } : formData;

      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchServices();
        setEditing(null);
        setFormData({ title: '', slug: '', short_description: '', full_description: '', icon: '', image_url: '', display_order: 0, is_active: true });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    try {
      const res = await fetch('/api/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setFormData({
      title: service.title,
      slug: service.slug || '',
      short_description: service.short_description || '',
      full_description: service.full_description || '',
      icon: service.icon || '',
      image_url: service.image_url || '',
      display_order: service.display_order || 0,
      is_active: service.is_active !== false,
    });
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader className="animate-spin w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brayton-navy">Gestionar Servicios</h1>
        {!editing && (
          <button
            onClick={() => setEditing({} as Service)}
            className="flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark"
          >
            <Plus size={20} /> Nuevo Servicio
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">{editing.id ? 'Editar' : 'Nuevo'} Servicio</h2>
          
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Slug (ej: construccion-civil)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <textarea
            placeholder="Descripción corta"
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
          
          <textarea
            placeholder="Descripción completa"
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={5}
          />

          <input
            type="text"
            placeholder="Icono (ej: FaBuilding)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <input
            type="text"
            placeholder="URL de imagen"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <input
            type="number"
            placeholder="Orden de visualización"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Activo</span>
          </label>
          
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setFormData({ title: '', slug: '', short_description: '', full_description: '', icon: '', image_url: '', display_order: 0, is_active: true });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {services.length === 0 ? (
          <p className="text-brayton-slate">No hay servicios creados aún</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-brayton-navy">{service.title}</h3>
                  {!service.is_active && <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">Inactivo</span>}
                </div>
                <p className="text-sm text-brayton-slate">{service.short_description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
