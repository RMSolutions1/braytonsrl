'use client';

import { useState } from 'react';

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(apiUrl + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Error al enviar');
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', projectType: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-brayton-navy mb-6">
        Solicitar cotización
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brayton-navy mb-1">
              Nombre *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition"
              placeholder="Su nombre"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-brayton-navy mb-1">
              Empresa
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition"
              placeholder="Nombre de la empresa"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brayton-navy mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition"
              placeholder="email@empresa.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-brayton-navy mb-1">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition"
              placeholder="+54 9 11 1234-5678"
            />
          </div>
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-brayton-navy mb-1">
            Tipo de proyecto
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition bg-white"
          >
            <option value="">Seleccione una opción</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-brayton-navy mb-1">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brayton-accent focus:border-brayton-accent outline-none transition resize-none"
            placeholder="Describa brevemente su proyecto o necesidad..."
          />
        </div>
        {status === 'success' && (
          <p className="text-green-600 font-medium">
            Mensaje enviado correctamente. Nos pondremos en contacto a la brevedad.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 font-medium">
            Hubo un error al enviar. Intente nuevamente o contáctenos por teléfono/email.
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto px-8 py-4 rounded-md bg-brayton-accent text-white font-semibold hover:bg-brayton-accent-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  );
}
