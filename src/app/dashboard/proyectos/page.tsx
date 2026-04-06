'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  image_url: string;
  sector_id: string | null;
  sort_order: number;
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    image_url: '',
    sector_id: '',
    sort_order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
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

      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchProjects();
        setEditing(null);
        setFormData({
          title: '',
          description: '',
          details: '',
          image_url: '',
          sector_id: '',
          sort_order: 0,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setFormData({
      title: project.title,
      description: project.description,
      details: project.details,
      image_url: project.image_url,
      sector_id: project.sector_id || '',
      sort_order: project.sort_order,
    });
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader className="animate-spin w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brayton-navy">Gestionar Proyectos</h1>
        {!editing && (
          <button
            onClick={() => setEditing({} as Project)}
            className="flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark"
          >
            <Plus size={20} /> Nuevo Proyecto
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">{editing.id ? 'Editar' : 'Nuevo'} Proyecto</h2>
          
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          
          <textarea
            placeholder="Detalles completos"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
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
                setFormData({
                  title: '',
                  description: '',
                  details: '',
                  image_url: '',
                  sector_id: '',
                  sort_order: 0,
                });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p className="text-brayton-slate">No hay proyectos creados aún</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-brayton-navy">{project.title}</h3>
                <p className="text-sm text-brayton-slate">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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
