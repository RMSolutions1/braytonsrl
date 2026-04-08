'use client';

import { useState } from 'react';
import { Upload, Loader, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes');
      return;
    }

    // Validar tamaño (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no debe exceder 10MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error uploading');
      const data = await res.json();
      onUpload(data.url);
    } catch (err) {
      setError('Error al cargar la imagen');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brayton-accent transition">
        {uploading ? (
          <>
            <Loader className="animate-spin" size={20} />
            <span className="text-sm text-gray-600">Cargando...</span>
          </>
        ) : (
          <>
            <Upload size={20} className="text-gray-600" />
            <span className="text-sm text-gray-600">Seleccionar imagen</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
}
