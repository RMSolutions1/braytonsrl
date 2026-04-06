-- Seed initial data for Brayton SRL CMS
-- This script populates services, projects, and sectors with the data from the current website

-- ============================================
-- SERVICIOS (Services)
-- ============================================
INSERT INTO cms_services (title, slug, short_description, full_description, icon, image_url, features, display_order, is_active) VALUES
(
  'Construcción integral',
  'construccion-integral',
  'Obras llave en mano: desde cimentación hasta entrega final, con gestión de plazos y calidad.',
  'BRAYTON SRL ejecuta obras civiles de principio a fin, asumiendo la responsabilidad única sobre cimentación, estructura, cerramientos y terminaciones. Nuestra modalidad llave en mano permite al cliente contar con un único interlocutor que gestiona plazos, recursos, calidad y coordinación con subcontratistas y proveedores.

Trabajamos en edificios de uso múltiple, naves industriales, obras públicas y proyectos de infraestructura. Cada obra se planifica con un cronograma realista, se ejecuta con los estándares acordados y se entrega documentada y en condiciones de uso. La construcción integral reduce riesgos de interfaz y retrasos por falta de coordinación entre disciplinas.',
  'Building',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  '["Cimentación y estructura", "Cerramientos y terminaciones", "Gestión única de plazos y calidad", "Entrega llave en mano documentada", "Edificios, naves industriales y obra pública"]'::jsonb,
  1,
  true
),
(
  'Ingeniería',
  'ingenieria',
  'Ingeniería en todas sus ramas: civil, estructural, de procesos y de detalle para proyectos complejos.',
  'Nuestro equipo de ingeniería desarrolla anteproyectos, proyectos ejecutivos y documentación técnica para licitaciones y ejecución de obra. Trabajamos en ingeniería civil, estructural, de procesos y de detalle, con normativas vigentes y estándares internacionales cuando el proyecto lo requiere.

Elaboramos memorias de cálculo, planos, especificaciones técnicas y pliegos que permiten licitar, construir y operar con seguridad y cumplimiento normativo. La ingeniería se integra con nuestra capacidad de obra, permitiendo ofrecer diseño y ejecución desde una misma empresa.',
  'Cog',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
  '["Ingeniería civil y estructural", "Ingeniería de procesos y de detalle", "Anteproyectos y proyectos ejecutivos", "Memorias de cálculo y planos", "Normativas locales e internacionales"]'::jsonb,
  2,
  true
),
(
  'Arquitectura',
  'arquitectura',
  'Diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales.',
  'Ofrecemos diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales. Desde el concepto y el anteproyecto hasta el detalle constructivo y la coordinación con instalaciones, garantizando funcionalidad, estética y cumplimiento de códigos y normativas locales.

Nuestros proyectos priorizan la relación entre uso, confort y coste de construcción, y se integran con la ingeniería estructural y de instalaciones para una documentación ejecutable. La dirección de obra asegura que lo proyectado se materialice en obra con los estándares definidos.',
  'Ruler',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  '["Anteproyecto y proyecto arquitectónico", "Dirección de obra", "Residencial, comercial e industrial", "Coordinación con instalaciones y estructura", "Cumplimiento normativo"]'::jsonb,
  3,
  true
),
(
  'Instalaciones',
  'instalaciones',
  'Eléctricas, sanitarias, de gas y especiales. Diseño, ejecución, pruebas y certificación.',
  'En BRAYTON SRL diseñamos, ejecutamos, probamos y certificamos instalaciones eléctricas, sanitarias, de gas y especiales para obra nueva, refacciones y ampliaciones. Trabajamos con normativas vigentes y estándares de seguridad, y coordinamos con la obra civil cuando el proyecto es integral.',
  'Zap',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  '["Instalaciones eléctricas", "Instalaciones sanitarias y de gas", "Instalaciones especiales (incendio, datos)", "Diseño, ejecución y certificación", "Obra nueva y refacciones"]'::jsonb,
  4,
  true
),
(
  'Transporte de cargas',
  'transporte',
  'Logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales.',
  'Completamos nuestra oferta integral con logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales. Contamos con flota y coordinación para abastecimiento en tiempo y forma, reduciendo demoras en obra y facilitando la gestión de suministros.

El servicio puede contratarse de forma independiente o como parte de un contrato llave en mano, asegurando que los materiales y equipos lleguen al sitio en las condiciones y plazos acordados.',
  'Truck',
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
  '["Transporte de materiales de construcción", "Transporte de equipos y maquinaria", "Logística para obra e industria", "Coordinación y plazos", "Servicio standalone o integrado"]'::jsonb,
  5,
  true
)
ON CONFLICT DO NOTHING;

-- ============================================
-- PROYECTOS (Projects)
-- ============================================
INSERT INTO cms_projects (title, slug, short_description, full_description, category, location, year, main_image_url, gallery_images, features, is_featured, display_order, is_active) VALUES
(
  'Planta industrial de procesamiento',
  'planta-industrial-procesamiento',
  'Obra llave en mano: nave principal, oficinas técnicas, instalaciones eléctricas y sanitarias.',
  'Obra llave en mano: nave principal, oficinas técnicas, instalaciones eléctricas y sanitarias, y puesta en marcha para cliente del sector alimenticio.',
  'Industrial',
  'Zona industrial',
  2023,
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  '["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80", "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80"]'::jsonb,
  '["Estructura metálica", "Instalaciones industriales", "Entrega en plazo"]'::jsonb,
  true,
  1,
  true
),
(
  'Edificio corporativo multiuso',
  'edificio-corporativo-multiuso',
  'Edificio de oficinas y locales comerciales con estructura de hormigón y fachada ventilada.',
  'Edificio de oficinas y locales comerciales: estructura de hormigón, fachada ventilada, instalaciones completas y espacios comunes.',
  'Comercial',
  'Centro urbano',
  2023,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  '["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"]'::jsonb,
  '["Hormigón armado", "Fachada ventilada", "Certificación energética"]'::jsonb,
  true,
  2,
  true
),
(
  'Obra de infraestructura vial',
  'infraestructura-vial',
  'Tramo de pavimentación y obras complementarias para organismo público.',
  'Tramo de pavimentación y obras complementarias (desagües, señalización) para organismo público. Cumplimiento de pliegos y plazos.',
  'Obras públicas',
  'Acceso regional',
  2022,
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  '["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80"]'::jsonb,
  '["Pavimentación", "Desagües", "Entregado en plazo"]'::jsonb,
  true,
  3,
  true
),
(
  'Nave logística sector agro',
  'nave-logistica-agro',
  'Nave de acopio y logística con oficinas e instalaciones de incendio.',
  'Nave de acopio y logística con oficinas, instalaciones eléctricas y de incendio. Superficie cubierta y playa de maniobras.',
  'Agro',
  'Parque agroindustrial',
  2022,
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
  '[]'::jsonb,
  '["Estructura metálica", "Instalaciones contra incendio", "Plaza de maniobras"]'::jsonb,
  true,
  4,
  true
),
(
  'Ampliación planta factory',
  'ampliacion-plant-factory',
  'Ampliación de nave existente y nuevas instalaciones de apoyo.',
  'Ampliación de nave existente y nuevas instalaciones de apoyo para línea de producción. Coordinación con cliente en operación.',
  'Factory',
  'Parque industrial',
  2024,
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
  '[]'::jsonb,
  '["Ampliación en operación", "Estructura metálica", "Instalaciones"]'::jsonb,
  false,
  5,
  true
),
(
  'Campamento y apoyo minero',
  'campamento-minero',
  'Obras de apoyo para operación minera: campamento e instalaciones.',
  'Obras de apoyo para operación minera: campamento, instalaciones sanitarias y eléctricas, y obras civiles de soporte.',
  'Minería',
  'Yacimiento',
  2023,
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  '[]'::jsonb,
  '["Campamento", "Instalaciones", "Normativa minera"]'::jsonb,
  false,
  6,
  true
)
ON CONFLICT DO NOTHING;

-- ============================================
-- SECTORES (Sectors)
-- ============================================
INSERT INTO cms_sectors (title, slug, short_description, full_description, icon, image_url, display_order, is_active) VALUES
(
  'Residencial',
  'residencial',
  'Viviendas unifamiliares y multifamiliares',
  'Construcción de viviendas unifamiliares, edificios de departamentos, countries y barrios cerrados. Desde el diseño hasta la entrega final con los más altos estándares de calidad.',
  'Home',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  1,
  true
),
(
  'Comercial',
  'comercial',
  'Oficinas, locales y centros comerciales',
  'Desarrollo de espacios comerciales: oficinas corporativas, locales comerciales, centros comerciales y edificios de uso mixto. Soluciones funcionales y estéticamente atractivas.',
  'Building2',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  2,
  true
),
(
  'Industrial',
  'industrial',
  'Plantas, naves y depósitos',
  'Construcción de plantas industriales, naves de producción, depósitos y centros de distribución. Estructuras resistentes y funcionales para la industria.',
  'Factory',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  3,
  true
),
(
  'Agro',
  'agro',
  'Infraestructura agroindustrial',
  'Infraestructura para el sector agroindustrial: silos, galpones, plantas de procesamiento, sistemas de riego y toda la infraestructura necesaria para el campo.',
  'Wheat',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
  4,
  true
),
(
  'Minería',
  'mineria',
  'Campamentos y obras de soporte',
  'Obras especializadas para el sector minero: campamentos, instalaciones de apoyo, obras civiles de soporte y toda la infraestructura necesaria para operaciones mineras.',
  'Mountain',
  'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&q=80',
  5,
  true
),
(
  'Obra Pública',
  'obra-publica',
  'Infraestructura y equipamiento urbano',
  'Proyectos de infraestructura pública: pavimentación, desagües, obras viales, edificios públicos y equipamiento urbano. Cumplimiento de pliegos y normativas.',
  'Landmark',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
  6,
  true
)
ON CONFLICT DO NOTHING;
