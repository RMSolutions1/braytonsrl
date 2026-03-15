'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  { title: 'Integridad', description: 'Transparencia y cumplimiento en cada relación y contrato.' },
  { title: 'Excelencia técnica', description: 'Rigor en ingeniería, procesos y estándares de calidad.' },
  { title: 'Compromiso', description: 'Cumplimiento de plazos y resultados acordados con el cliente.' },
  { title: 'Trabajo en equipo', description: 'Coordinación interna y con el cliente para el éxito del proyecto.' },
];

export default function NosotrosContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-brayton-navy">Nuestra historia</h2>
          <p className="mt-4 text-brayton-slate">
            BRAYTON SRL nació con el objetivo de ofrecer servicios integrales de ingeniería y construcción a empresas, organismos públicos e instituciones. Con una base técnica sólida y una visión de largo plazo, hemos crecido en sectores como el industrial, comercial, residencial, agro y minería, siempre con el foco en entregar obras con los más altos estándares de calidad y en los plazos comprometidos.
          </p>
          <p className="mt-4 text-brayton-slate">
            Nuestro equipo combina ingenieros civiles, arquitectos, técnicos en instalaciones y profesionales de obra, permitiéndonos asumir proyectos llave en mano desde la planificación hasta la puesta en marcha.
          </p>
        </div>
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
            alt="Equipo de obra BRAYTON"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display font-bold text-2xl text-brayton-navy">Misión</h2>
          <p className="mt-3 text-brayton-slate">
            Proveer soluciones integrales de ingeniería y construcción que cumplan con los más altos estándares de calidad, plazos y seguridad, generando valor y confianza para nuestros clientes y colaboradores.
          </p>
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-brayton-navy">Visión</h2>
          <p className="mt-3 text-brayton-slate">
            Ser reconocidos como una empresa líder en ingeniería y construcción en los sectores donde operamos, destacando por nuestra capacidad técnica, cumplimiento y relaciones de largo plazo.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-display font-bold text-2xl lg:text-3xl text-brayton-navy text-center">Valores</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-50 rounded-xl border border-gray-100"
            >
              <h3 className="font-display font-semibold text-lg text-brayton-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-brayton-slate">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 p-8 lg:p-12 bg-brayton-navy text-white rounded-2xl">
        <h2 className="font-display font-bold text-2xl">Equipo técnico y experiencia</h2>
        <p className="mt-4 text-white/90 max-w-3xl">
          Contamos con ingenieros, arquitectos y técnicos especializados en obra civil, estructuras, instalaciones eléctricas, sanitarias y de gas, así como en gestión de proyectos y seguridad. Esta capacidad nos permite diseñar y ejecutar obras de diversa escala y complejidad, siempre con un enfoque de mejora continua y cumplimiento normativo.
        </p>
      </div>
    </div>
  );
}
