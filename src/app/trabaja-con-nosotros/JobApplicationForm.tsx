'use client';

import { useState, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react';

const positions = [
  'Ingeniero civil',
  'Arquitecto',
  'Técnico en instalaciones',
  'Capataz de obra',
  'Prevencionista',
  'Administrativo',
  'Otro',
];

export default function JobApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea PDF o Word
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024) {
        setCvFile(file);
      } else {
        alert('Por favor, selecciona un CV en formato PDF o Word (máximo 10MB)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Crear FormData para enviar el archivo
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('message', formData.message);
      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error('Error al enviar solicitud');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
      });
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-gray-200 p-8 lg:p-12">
      {/* Nombre y Email */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brayton-navy mb-2">
            Nombre Completo <span className="text-brayton-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brayton-navy mb-2">
            Email <span className="text-brayton-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      {/* Teléfono y Posición */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brayton-navy mb-2">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all"
            placeholder="+54 387 4498588"
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-brayton-navy mb-2">
            Posición Solicitada <span className="text-brayton-accent">*</span>
          </label>
          <select
            id="position"
            name="position"
            required
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all"
          >
            <option value="">Selecciona una posición</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Experiencia */}
      <div className="mb-6">
        <label htmlFor="experience" className="block text-sm font-semibold text-brayton-navy mb-2">
          Años de Experiencia
        </label>
        <input
          id="experience"
          name="experience"
          type="text"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all"
          placeholder="Ej: 5 años en empresas constructoras"
        />
      </div>

      {/* CV Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-brayton-navy mb-3">
          Cargar CV <span className="text-brayton-accent">*</span>
        </label>
        <div
          className="border-2 border-dashed border-brayton-accent/30 rounded-lg p-6 hover:border-brayton-accent transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <Upload size={32} className="text-brayton-accent mb-2" />
            <p className="font-semibold text-brayton-navy text-center">
              {cvFile ? cvFile.name : 'Arrastra tu CV o haz clic para seleccionar'}
            </p>
            <p className="text-sm text-brayton-slate mt-1">PDF o Word (máximo 10MB)</p>
          </div>
        </div>
      </div>

      {/* Mensaje */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-semibold text-brayton-navy mb-2">
          Mensaje (Opcional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all resize-none"
          placeholder="Cuéntanos sobre ti, tu experiencia, o por qué te interesa esta posición..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg mb-6">
          <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
          <p className="text-emerald-700 font-medium">Solicitud enviada correctamente. Te contactaremos pronto.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-6">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-700 font-medium">Error al enviar la solicitud. Intenta nuevamente.</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-brayton-accent to-brayton-accent-dark text-white font-semibold font-display text-lg hover:shadow-lg hover:shadow-brayton-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar Solicitud'
        )}
      </button>

      <p className="text-xs text-brayton-slate mt-4 text-center">
        Al enviar este formulario, aceptas nuestra <a href="/privacidad" className="text-brayton-accent hover:underline">política de privacidad</a> y <a href="/terminos-y-condiciones" className="text-brayton-accent hover:underline">términos y condiciones</a>.
      </p>
    </form>
  );
}
