'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const projectTypes = [
  'Construcción integral',
  'Ingeniería',
  'Arquitectura',
  'Instalaciones',
  'Transporte / logística',
  'Otro',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Error al enviar');
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', projectType: '', message: '' });
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre y Empresa */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brayton-navy mb-2">
            Nombre <span className="text-brayton-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200"
            placeholder="Su nombre completo"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-brayton-navy mb-2">
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200"
            placeholder="Nombre de su empresa"
          />
        </div>
      </div>

      {/* Email y Teléfono */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brayton-navy mb-2">
            Email <span className="text-brayton-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200"
            placeholder="su@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brayton-navy mb-2">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200"
            placeholder="+54 9 11 1234-5678"
          />
        </div>
      </div>

      {/* Tipo de Proyecto */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-semibold text-brayton-navy mb-2">
          Tipo de Proyecto
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200"
        >
          <option value="">Seleccione una opción</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brayton-navy mb-2">
          Mensaje <span className="text-brayton-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brayton-navy placeholder-brayton-slate/50 focus:border-brayton-accent focus:ring-2 focus:ring-brayton-accent/10 outline-none transition-all duration-200 resize-none"
          placeholder="Describa detalladamente su proyecto o necesidad..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
          <CheckCircle className="text-emerald-600" size={20} />
          <p className="text-emerald-700 font-medium">
            Mensaje enviado correctamente. Nos pondremos en contacto en breve.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-700 font-medium">
            Hubo un error al enviar. Intente nuevamente o contáctenos directamente.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-brayton-accent to-brayton-accent-dark text-white font-semibold font-display text-lg hover:shadow-lg hover:shadow-brayton-accent/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar Mensaje'
        )}
      </button>
    </form>
  );
}
