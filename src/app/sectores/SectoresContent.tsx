'use client';

import { motion } from 'framer-motion';

const sectors = [
  {
    id: 'residencial',
    name: 'Residencial',
    needs: 'Vivienda unifamiliar, multifamiliar, conjuntos habitacionales y obras complementarias.',
    solutions: 'Proyecto y ejecución de obra civil, instalaciones y terminaciones. Cumplimiento de códigos y normativas locales.',
  },
  {
    id: 'comercial',
    name: 'Comercial',
    needs: 'Edificios de oficinas, locales comerciales, centros de servicio y equipamiento urbano.',
    solutions: 'Diseño y construcción adaptados a uso comercial, instalaciones y certificaciones. Entregas llave en mano.',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    needs: 'Naves, plantas de producción, depósitos, oficinas técnicas y obras de apoyo.',
    solutions: 'Ingeniería y construcción industrial: estructuras metálicas, hormigón, instalaciones especiales y puesta en marcha.',
  },
  {
    id: 'agro',
    name: 'Agro',
    needs: 'Galpones, silos, plantas de acopio, instalaciones de proceso y logística rural.',
    solutions: 'Obras civiles e instalaciones para el sector agropecuario y agroindustrial. Experiencia en grandes superficies.',
  },
  {
    id: 'factory',
    name: 'Factory',
    needs: 'Espacios productivos, líneas de montaje, talleres y edificios de apoyo fabril.',
    solutions: 'Construcción y adaptación de espacios para manufactura, con foco en plazos y estándares de seguridad.',
  },
  {
    id: 'mineria',
    name: 'Minería',
    needs: 'Obras de apoyo minero, campamentos, instalaciones de proceso y infraestructura de sitio.',
    solutions: 'Proyectos en entornos mineros: obra civil, instalaciones y logística. Conocimiento de normativa sectorial.',
  },
];

export default function SectoresContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sectors.map((sector, i) => (
          <motion.article
            key={sector.id}
            id={sector.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="scroll-mt-24 p-6 lg:p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-display font-bold text-xl text-brayton-navy">{sector.name}</h2>
            <h3 className="mt-4 text-sm font-semibold text-brayton-accent uppercase tracking-wider">Necesidades del sector</h3>
            <p className="mt-1 text-brayton-slate text-sm">{sector.needs}</p>
            <h3 className="mt-4 text-sm font-semibold text-brayton-accent uppercase tracking-wider">Soluciones que ofrecemos</h3>
            <p className="mt-1 text-brayton-slate text-sm">{sector.solutions}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
