export interface Project {
  id: string;
  slug: string;
  title: string;
  sector: string;
  location?: string;
  year?: string;
  areaM2?: number;
  description: string;
  image: string;
  images?: string[];
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'planta-industrial-procesamiento',
    title: 'Planta industrial de procesamiento',
    sector: 'Industrial',
    location: 'Zona industrial',
    year: '2023',
    areaM2: 12000,
    description:
      'Obra llave en mano: nave principal, oficinas técnicas, instalaciones eléctricas y sanitarias, y puesta en marcha para cliente del sector alimenticio.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80',
    ],
    highlights: ['Estructura metálica', 'Instalaciones industriales', 'Entrega en plazo'],
  },
  {
    id: '2',
    slug: 'edificio-corporativo-multiuso',
    title: 'Edificio corporativo multiuso',
    sector: 'Comercial',
    location: 'Centro urbano',
    year: '2023',
    areaM2: 8500,
    description:
      'Edificio de oficinas y locales comerciales: estructura de hormigón, fachada ventilada, instalaciones completas y espacios comunes.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    ],
    highlights: ['Hormigón armado', 'Fachada ventilada', 'Certificación energética'],
  },
  {
    id: '3',
    slug: 'infraestructura-vial',
    title: 'Obra de infraestructura vial',
    sector: 'Obras públicas',
    location: 'Acceso regional',
    year: '2022',
    areaM2: 3500,
    description:
      'Tramo de pavimentación y obras complementarias (desagües, señalización) para organismo público. Cumplimiento de pliegos y plazos.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
    ],
    highlights: ['Pavimentación', 'Desagües', 'Entregado en plazo'],
  },
  {
    id: '4',
    slug: 'nave-logistica-agro',
    title: 'Nave logística sector agro',
    sector: 'Agro',
    location: 'Parque agroindustrial',
    year: '2022',
    areaM2: 4200,
    description:
      'Nave de acopio y logística con oficinas, instalaciones eléctricas y de incendio. Superficie cubierta y playa de maniobras.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    highlights: ['Estructura metálica', 'Instalaciones contra incendio', 'Plaza de maniobras'],
  },
  {
    id: '5',
    slug: 'ampliacion-plant-factory',
    title: 'Ampliación planta factory',
    sector: 'Factory',
    location: 'Parque industrial',
    year: '2024',
    areaM2: 6800,
    description:
      'Ampliación de nave existente y nuevas instalaciones de apoyo para línea de producción. Coordinación con cliente en operación.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
    highlights: ['Ampliación en operación', 'Estructura metálica', 'Instalaciones'],
  },
  {
    id: '6',
    slug: 'campamento-minero',
    title: 'Campamento y apoyo minero',
    sector: 'Minería',
    location: 'Yacimiento',
    year: '2023',
    areaM2: 2100,
    description:
      'Obras de apoyo para operación minera: campamento, instalaciones sanitarias y eléctricas, y obras civiles de soporte.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    highlights: ['Campamento', 'Instalaciones', 'Normativa minera'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySector(sector: string): Project[] {
  if (!sector) return projects;
  return projects.filter((p) => p.sector.toLowerCase() === sector.toLowerCase());
}
