'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Loader } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  client: string;
  location: string;
  year: number;
  main_image_url: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    category: '',
    client: '',
    location: '',
    year: new Date().getFullYear(),
    main_image_url: '',
    display_order: 0,
    is_featured: false,
    is_active: true,
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
      const method = editing?.id ? 'PUT' : 'POST';
      const body = editing?.id ? { id: editing.id, ...formData } : formData;

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
          slug: '',
          short_description: '',
          full_description: '',
          category: '',
          client: '',
          location: '',
          year: new Date().getFullYear(),
          main_image_url: '',
          display_order: 0,
          is_featured: false,
          is_active: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: number) => {
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
      slug: project.slug || '',
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      category: project.category || '',
      client: project.client || '',
      location: project.location || '',
      year: project.year || new Date().getFullYear(),
      main_image_url: project.main_image_url || '',
      display_order: project.display_order || 0,
      is_featured: project.is_featured || false,
      is_active: project.is_active !== false,
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
          
          <div className="grid md:grid-cols-2 gap-4">
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
              placeholder="Slug (ej: edificio-comercial)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
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

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Seleccionar categoría</option>
              <option value="Comercial">Comercial</option>
              <option value="Residencial">Residencial</option>
              <option value="Industrial">Industrial</option>
              <option value="Agro">Agro</option>
              <option value="Minería">Minería</option>
              <option value="Infraestructura">Infraestructura</option>
            </select>

            <input
              type="text"
              placeholder="Cliente"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            
            <input
              type="text"
              placeholder="Ubicación"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Año"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            
            <input
              type="text"
              placeholder="URL de imagen principal"
              value={formData.main_image_url}
              onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            
            <input
              type="number"
              placeholder="Orden"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Destacado</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Activo</span>
            </label>
          </div>
          
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
                  slug: '',
                  short_description: '',
                  full_description: '',
                  category: '',
                  client: '',
                  location: '',
                  year: new Date().getFullYear(),
                  main_image_url: '',
                  display_order: 0,
                  is_featured: false,
                  is_active: true,
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
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-brayton-navy">{project.title}</h3>
                  {project.is_featured && <span className="text-xs px-2 py-0.5 bg-brayton-accent text-white rounded">Destacado</span>}
                  {!project.is_active && <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">Inactivo</span>}
                </div>
                <p className="text-sm text-brayton-slate">{project.client} - {project.location} ({project.year})</p>
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
