'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader, Star } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  client: string;
  location: string;
  year: number;
  featured: boolean;
  details: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    client: '',
    location: '',
    year: new Date().getFullYear(),
    featured: false,
    details: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Error saving project');
      await fetchProjects();
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        image_url: '',
        client: '',
        location: '',
        year: new Date().getFullYear(),
        featured: false,
        details: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el proyecto');
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Confirmar eliminación?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting');
      await fetchProjects();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar proyecto');
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image_url: url });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-3xl text-brayton-navy">Gestionar Proyectos</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              category: '',
              image_url: '',
              client: '',
              location: '',
              year: new Date().getFullYear(),
              featured: false,
              details: '',
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brayton-accent text-white rounded-lg hover:bg-brayton-accent-dark transition"
        >
          <Plus size={20} />
          Agregar Proyecto
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-xl text-brayton-navy mb-4">
            {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
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
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Detalles Completos</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brayton-navy mb-2">Imagen del Proyecto</label>
              <ImageUploader onUpload={handleImageUpload} />
              {formData.image_url && (
                <div className="mt-2 relative w-40 h-40">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover rounded" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Cliente</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Ubicación</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Categoría</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ej: Residencial, Industrial"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brayton-navy mb-2">Año</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brayton-accent outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                id="featured"
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-brayton-navy">Destacado</label>
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
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-brayton-navy">{project.title}</h3>
                {project.featured && <Star size={16} className="text-brayton-accent fill-brayton-accent" />}
              </div>
              <p className="text-sm text-brayton-slate mt-1">{project.description}</p>
              <p className="text-xs text-gray-500 mt-2">{project.client} • {project.location} • {project.year}</p>
              {project.image_url && (
                <div className="mt-3 w-32 h-32">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover rounded" />
                </div>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(project)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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
