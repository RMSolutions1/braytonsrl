-- CMS Tables for BRAYTON SRL - Full Content Management System

-- Services table (editable services)
CREATE TABLE IF NOT EXISTS cms_services (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  icon VARCHAR(50) DEFAULT 'Building2',
  image_url TEXT,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table (portfolio)
CREATE TABLE IF NOT EXISTS cms_projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  client VARCHAR(200),
  location VARCHAR(200),
  year INT,
  category VARCHAR(100),
  short_description TEXT,
  full_description TEXT,
  main_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sectors table
CREATE TABLE IF NOT EXISTS cms_sectors (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  icon VARCHAR(50) DEFAULT 'Building',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(200) NOT NULL,
  client_position VARCHAR(200),
  client_company VARCHAR(200),
  client_image_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS cms_team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  position VARCHAR(200),
  bio TEXT,
  image_url TEXT,
  email VARCHAR(200),
  linkedin_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Partners/Clients logos
CREATE TABLE IF NOT EXISTS cms_partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site configuration (general settings)
CREATE TABLE IF NOT EXISTS cms_site_config (
  id SERIAL PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value TEXT,
  config_type VARCHAR(50) DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Hero slides
CREATE TABLE IF NOT EXISTS cms_hero_slides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  cta_primary_text VARCHAR(100),
  cta_primary_url VARCHAR(200),
  cta_secondary_text VARCHAR(100),
  cta_secondary_url VARCHAR(200),
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media library for uploaded images
CREATE TABLE IF NOT EXISTS cms_media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  url TEXT NOT NULL,
  mime_type VARCHAR(100),
  size_bytes BIGINT,
  alt_text VARCHAR(500),
  folder VARCHAR(100) DEFAULT 'general',
  uploaded_by VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default site configuration
INSERT INTO cms_site_config (config_key, config_value, config_type, description) VALUES
  ('site_name', 'BRAYTON SRL', 'text', 'Nombre del sitio'),
  ('site_tagline', 'Ingeniería y Construcción', 'text', 'Eslogan del sitio'),
  ('contact_email', 'contacto@braytonsrl.com.ar', 'email', 'Email de contacto principal'),
  ('contact_phone', '+54 9 387 XXX-XXXX', 'text', 'Teléfono de contacto'),
  ('contact_address', 'Pasaje Santa Victoria 762, Barrio Centro, 4400 Salta, Argentina', 'textarea', 'Dirección física'),
  ('whatsapp_number', '5493871234567', 'text', 'Número de WhatsApp (solo números)'),
  ('facebook_url', '', 'url', 'URL de Facebook'),
  ('instagram_url', '', 'url', 'URL de Instagram'),
  ('linkedin_url', '', 'url', 'URL de LinkedIn'),
  ('google_maps_embed', '', 'textarea', 'Código embed de Google Maps')
ON CONFLICT (config_key) DO NOTHING;

-- Insert sample services
INSERT INTO cms_services (slug, title, short_description, icon, display_order) VALUES
  ('construccion-integral', 'Construcción Integral', 'Obras llave en mano desde la cimentación hasta la entrega final. Gestión completa de plazos y calidad.', 'Building2', 1),
  ('ingenieria', 'Ingeniería', 'Ingeniería civil, estructural, de procesos y de detalle. Proyectos ejecutivos con normativas vigentes.', 'Lightbulb', 2),
  ('arquitectura', 'Arquitectura', 'Diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales.', 'Home', 3),
  ('instalaciones', 'Instalaciones', 'Instalaciones eléctricas, sanitarias y de gas. Diseño, ejecución y certificación profesional.', 'Zap', 4),
  ('transporte', 'Transporte de Cargas', 'Logística y transporte de materiales, equipos y maquinaria para obras e industria.', 'Truck', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample sectors
INSERT INTO cms_sectors (slug, title, short_description, icon, display_order) VALUES
  ('residencial', 'Residencial', 'Viviendas unifamiliares, edificios y condominios con los más altos estándares de calidad.', 'Home', 1),
  ('comercial', 'Comercial', 'Locales comerciales, oficinas, centros comerciales y espacios de retail.', 'Store', 2),
  ('industrial', 'Industrial', 'Plantas industriales, naves, depósitos y centros de distribución.', 'Factory', 3),
  ('mineria', 'Minería', 'Infraestructura minera, campamentos y servicios especializados.', 'Mountain', 4),
  ('institucional', 'Institucional', 'Edificios gubernamentales, educativos, de salud y espacios públicos.', 'Building', 5),
  ('energia', 'Energía', 'Proyectos de energía renovable, subestaciones y líneas de transmisión.', 'Zap', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample hero slides
INSERT INTO cms_hero_slides (title, subtitle, description, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, display_order) VALUES
  ('Construimos el futuro con excelencia', 'Construcción Profesional', 'Empresa salteña líder en ingeniería, construcción y servicios integrales. Más de 150 proyectos ejecutados con los más altos estándares de calidad.', 'Solicitar Cotización', '/contacto', 'Ver Proyectos', '/proyectos', 1),
  ('Un solo responsable de principio a fin', 'Soluciones Integrales', 'Diseño, ingeniería, construcción e instalaciones bajo un mismo contrato. Garantizamos plazos, calidad y presupuesto acordado.', 'Nuestros Servicios', '/servicios', 'Conocer Sectores', '/sectores', 2),
  ('Confianza y escala para su proyecto', 'Experiencia Comprobada', 'Trabajamos con empresas, organismos públicos e instituciones que exigen calidad, profesionalismo y un partner confiable.', 'Sobre Nosotros', '/nosotros', 'Contactar', '/contacto', 3)
ON CONFLICT DO NOTHING;
