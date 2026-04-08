-- Seed CMS data con los datos actuales de la web BRAYTON SRL
-- Este script inserta los servicios, sectores y proyectos actuales

-- Limpiar tablas existentes
TRUNCATE TABLE cms_services RESTART IDENTITY CASCADE;
TRUNCATE TABLE cms_sectors RESTART IDENTITY CASCADE;
TRUNCATE TABLE cms_projects RESTART IDENTITY CASCADE;
TRUNCATE TABLE cms_site_config RESTART IDENTITY CASCADE;

-- ==========================================
-- SERVICIOS
-- ==========================================
INSERT INTO cms_services (title, slug, short_description, full_description, icon, image_url, display_order, is_active) VALUES
('Construcción integral', 'construccion-integral', 'Obras llave en mano: desde cimentación hasta entrega final, con gestión de plazos y calidad.', 'BRAYTON SRL ejecuta obras civiles de principio a fin, asumiendo la responsabilidad única sobre cimentación, estructura, cerramientos y terminaciones. Nuestra modalidad llave en mano permite al cliente contar con un único interlocutor.', 'Building2', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80', 1, true),
('Ingeniería', 'ingenieria', 'Ingeniería en todas sus ramas: civil, estructural, de procesos y de detalle para proyectos complejos.', 'Nuestro equipo de ingeniería desarrolla anteproyectos, proyectos ejecutivos y documentación técnica para licitaciones y ejecución de obra. Trabajamos en ingeniería civil, estructural, de procesos y de detalle.', 'Cog', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80', 2, true),
('Arquitectura', 'arquitectura', 'Diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales.', 'Ofrecemos diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales. Desde el concepto y el anteproyecto hasta el detalle constructivo.', 'Ruler', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', 3, true),
('Instalaciones', 'instalaciones', 'Eléctricas, sanitarias, de gas y especiales. Diseño, ejecución, pruebas y certificación.', 'En BRAYTON SRL diseñamos, ejecutamos, probamos y certificamos instalaciones eléctricas, sanitarias, de gas y especiales para obra nueva, refacciones y ampliaciones.', 'Zap', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', 4, true),
('Transporte de cargas', 'transporte', 'Logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales.', 'Completamos nuestra oferta integral con logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales.', 'Truck', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80', 5, true);

-- ==========================================
-- SECTORES
-- ==========================================
INSERT INTO cms_sectors (title, slug, short_description, full_description, icon, image_url, display_order, is_active) VALUES
('Residencial', 'residencial', 'Vivienda unifamiliar, multifamiliar, conjuntos habitacionales y obras complementarias.', 'Construcción de viviendas unifamiliares y multifamiliares, conjuntos habitacionales, urbanizaciones y obras complementarias. Trabajamos con desarrolladores, inversores y propietarios.', 'Home', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 1, true),
('Comercial', 'comercial', 'Edificios de oficinas, locales comerciales, centros de servicio y equipamiento urbano.', 'Construcción y refacción de edificios de oficinas, locales comerciales, centros de servicios, estaciones de servicio y equipamiento urbano.', 'Building2', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 2, true),
('Industrial', 'industrial', 'Naves industriales, plantas de producción, depósitos y obras de infraestructura productiva.', 'Construcción de naves industriales, plantas de producción, depósitos, obras de ampliación y mantenimiento de instalaciones productivas.', 'Factory', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', 3, true),
('Agro', 'agro', 'Silos, galpones, tinglados, corrales y obras para el sector agropecuario.', 'Construcción de silos, galpones, tinglados, corrales, playas de acopio y obras complementarias para el sector agropecuario y agroindustrial.', 'Leaf', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', 4, true),
('Minería', 'mineria', 'Obras civiles, instalaciones y logística para proyectos mineros en el NOA.', 'Construcción de obras civiles, instalaciones y servicios de logística para proyectos mineros en el Noroeste Argentino.', 'Mountain', 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80', 5, true),
('Obras públicas', 'obras-publicas', 'Infraestructura vial, pavimentos, redes y equipamiento para organismos públicos.', 'Ejecución de obras públicas: infraestructura vial, pavimentos, redes de servicios, equipamiento urbano y obras licitadas para organismos provinciales y municipales.', 'Landmark', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', 6, true);

-- ==========================================
-- PROYECTOS DE EJEMPLO
-- ==========================================
INSERT INTO cms_projects (title, slug, short_description, full_description, category, client, location, year, main_image_url, is_featured, display_order, is_active) VALUES
('Nave Industrial Parque Industrial Salta', 'nave-industrial-parque-salta', 'Construcción de nave industrial de 2500m² con oficinas administrativas.', 'Construcción completa de nave industrial de 2500m² incluyendo estructura metálica, cerramientos, instalaciones eléctricas y sanitarias, y oficinas administrativas de 200m².', 'Industrial', 'Confidencial', 'Parque Industrial Salta', 2024, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', true, 1, true),
('Edificio Residencial Tres Cerritos', 'edificio-tres-cerritos', 'Edificio de 12 departamentos con amenities y cocheras.', 'Construcción de edificio residencial de 12 unidades funcionales, amenities en terraza, 8 cocheras cubiertas y locales comerciales en planta baja.', 'Residencial', 'Desarrolladora TC', 'Tres Cerritos, Salta', 2023, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', true, 2, true),
('Centro Comercial Norte', 'centro-comercial-norte', 'Complejo comercial con 15 locales y estacionamiento.', 'Construcción de centro comercial de 1800m² con 15 locales comerciales, estacionamiento para 40 vehículos y área de food court.', 'Comercial', 'Inversiones Norte SRL', 'Zona Norte, Salta', 2023, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', false, 3, true),
('Planta de Silos Metán', 'planta-silos-metan', 'Instalación de 4 silos de 500tn cada uno con sistema de acopio.', 'Construcción e instalación de planta de acopio con 4 silos metálicos de 500tn cada uno, noria, secadora y sistema de carga de camiones.', 'Agro', 'Cooperativa Agrícola Metán', 'Metán, Salta', 2024, 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', true, 4, true),
('Campamento Minero Tolar Grande', 'campamento-minero-tolar', 'Construcción de campamento para 80 personas con servicios completos.', 'Construcción de campamento minero para 80 personas incluyendo dormitorios, comedor, cocina industrial, instalaciones sanitarias y sistema de energía.', 'Minería', 'Minera Andina SA', 'Tolar Grande, Salta', 2024, 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80', false, 5, true),
('Pavimentación Ruta Provincial 5', 'pavimentacion-ruta-5', 'Pavimentación de 8km de ruta con obras de arte y señalización.', 'Pavimentación asfáltica de 8km de Ruta Provincial 5, incluyendo obras de arte (alcantarillas y badenes), señalización horizontal y vertical.', 'Obras públicas', 'Gobierno de Salta', 'Departamento Cerrillos', 2023, 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', false, 6, true);

-- ==========================================
-- CONFIGURACIÓN DEL SITIO
-- ==========================================
INSERT INTO cms_site_config (config_key, config_value, config_type, description) VALUES
('company_name', 'BRAYTON SRL', 'general', 'Nombre de la empresa'),
('company_slogan', 'Construcción e Ingeniería', 'general', 'Slogan de la empresa'),
('phone', '+54 387 4498588', 'contact', 'Teléfono principal'),
('whatsapp', '543874498588', 'contact', 'Número de WhatsApp (sin + ni espacios)'),
('email', 'info@braytonsrl.com.ar', 'contact', 'Email de contacto'),
('address', 'Pasaje Santa Victoria 762, Salta, Argentina', 'contact', 'Dirección física'),
('facebook', 'https://facebook.com/braytonsrl', 'social', 'URL de Facebook'),
('instagram', 'https://instagram.com/braytonsrl', 'social', 'URL de Instagram'),
('linkedin', 'https://linkedin.com/company/braytonsrl', 'social', 'URL de LinkedIn'),
('founded_year', '2010', 'general', 'Año de fundación'),
('employees_count', '50+', 'stats', 'Cantidad de empleados'),
('projects_completed', '200+', 'stats', 'Proyectos completados'),
('years_experience', '14+', 'stats', 'Años de experiencia');

-- Verificar que se insertaron los datos
SELECT 'Servicios insertados:' as info, COUNT(*) as total FROM cms_services;
SELECT 'Sectores insertados:' as info, COUNT(*) as total FROM cms_sectors;
SELECT 'Proyectos insertados:' as info, COUNT(*) as total FROM cms_projects;
SELECT 'Configuraciones insertadas:' as info, COUNT(*) as total FROM cms_site_config;
