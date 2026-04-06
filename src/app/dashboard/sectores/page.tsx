'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
}

export default function SectoresPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Sector | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#FF6B35',
    sort_order: 0,
  });

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { id: editing.id, ...formData } : formData;

      const res = await fetch('/api/sectors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchSectors();
        setEditing(null);
        setFormData({ name: '', description: '', icon: '', color: '#FF6B35', sort_order: 0 });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este sector?')) return;
    try {
      const res = await fetch('/api/sectors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchSectors();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (sector: Sector) => {
    setEditing(sector);
    setFormData({
      name: sector.name,
      description: sector.description,
      icon: sector.icon,
      color: sector.color,
      sort_order: sector.sort_order,
    });
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader className="animate-spin w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brayton-navy">Gestionar Sectores</h1>
        {!editing && (
          <button
            onClick={() => setEditing({} as Sector)}
            className="flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark"
          >
            <Plus size={20} /> Nuevo Sector
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">{editing.id ? 'Editar' : 'Nuevo'} Sector</h2>
          
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          
          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
          
          <input
            type="text"
            placeholder="Icono (ej: FaIndustry)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <input
            type="color"
            placeholder="Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <input
            type="number"
            placeholder="Orden"
            value={formData.sort_order}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setFormData({ name: '', description: '', icon: '', color: '#FF6B35', sort_order: 0 });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {sectors.length === 0 ? (
          <p className="text-brayton-slate">No hay sectores creados aún</p>
        ) : (
          sectors.map((sector) => (
            <div key={sector.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-brayton-navy">{sector.name}</h3>
                  <p className="text-sm text-brayton-slate">{sector.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(sector)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(sector.id)}
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
