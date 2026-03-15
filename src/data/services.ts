export interface ServiceSection {
  id: string;
  title: string;
  content: string;
  list?: string[];
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  highlights: string[];
  process?: string[];
  benefits?: string[];
  metaDescription: string;
  /** Secciones profundas para contenido de nivel profesional (auditoría 100%) */
  sections?: ServiceSection[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'construccion-integral',
    title: 'Construcción integral',
    shortDescription: 'Obras llave en mano: desde cimentación hasta entrega final, con gestión de plazos y calidad.',
    description: `BRAYTON SRL ejecuta obras civiles de principio a fin, asumiendo la responsabilidad única sobre cimentación, estructura, cerramientos y terminaciones. Nuestra modalidad llave en mano permite al cliente contar con un único interlocutor que gestiona plazos, recursos, calidad y coordinación con subcontratistas y proveedores.

Trabajamos en edificios de uso múltiple, naves industriales, obras públicas y proyectos de infraestructura. Cada obra se planifica con un cronograma realista, se ejecuta con los estándares acordados y se entrega documentada y en condiciones de uso. La construcción integral reduce riesgos de interfaz y retrasos por falta de coordinación entre disciplinas.`,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    highlights: [
      'Cimentación y estructura',
      'Cerramientos y terminaciones',
      'Gestión única de plazos y calidad',
      'Entrega llave en mano documentada',
      'Edificios, naves industriales y obra pública',
    ],
    process: [
      'Relevamiento y definición de alcance con el cliente.',
      'Planificación y cronograma de obra.',
      'Ejecución de cimentación, estructura y cerramientos.',
      'Instalaciones y terminaciones.',
      'Pruebas, documentación y entrega.',
    ],
    benefits: [
      'Un solo responsable en todo el ciclo.',
      'Menor riesgo de retrasos por descoordinación.',
      'Calidad y plazos bajo un mismo contrato.',
    ],
    metaDescription: 'Construcción integral llave en mano: cimentación, estructura, cerramientos y terminaciones. BRAYTON SRL, Salta.',
    sections: [
      { id: 'cimentacion-estructura', title: 'Cimentación y estructura', content: `Ejecutamos cimentaciones directas y profundas (pilotes, losas, vigas de fundación) y estructuras de hormigón armado o metálicas según proyecto. El cálculo y la dirección técnica garantizan la estabilidad y la vida útil de la obra.\n\nTrabajamos con normas CIRSOC, control de hormigón y acero, y documentación de ejecución para clientes y organismos.`, list: ['Fundaciones y losas', 'Estructura hormigón y metal', 'Normas CIRSOC', 'Control de materiales', 'Documentación de obra'] },
      { id: 'cerramientos-terminaciones', title: 'Cerramientos y terminaciones', content: `Incluimos muros, tabiquería, aberturas, cubiertas y terminaciones interiores y exteriores (revestimientos, pisos, cielorrasos, pintura). Los materiales y los plazos se definen en el contrato y se respetan en obra.\n\nCoordinamos con instalaciones para que pasadas y registros queden resueltos antes de las terminaciones.`, list: ['Cerramientos y cubiertas', 'Tabiquería y aberturas', 'Revestimientos y pisos', 'Coordinación con instalaciones', 'Entrega lista para uso'] },
      { id: 'gestion-unicas', title: 'Gestión única de plazos y calidad', content: `Como responsable único del contrato llave en mano, BRAYTON planifica el cronograma, coordina oficios y proveedores, y controla calidad y avance. El cliente tiene un solo interlocutor y evita descoordinaciones entre empresas.\n\nEntregamos informes de avance, actas y documentación según lo acordado.`, list: ['Cronograma integrado', 'Coordinación de oficios', 'Control de calidad', 'Un solo interlocutor', 'Informes y actas'] },
      { id: 'entrega-llave-mano', title: 'Entrega llave en mano documentada', content: `La entrega incluye la obra terminada, en condiciones de uso, con documentación técnica (planos as-built, manuales, certificaciones) y garantías contractuales. Realizamos capacitación al usuario y soporte post-entrega cuando se pacta.`, list: ['Obra terminada y operativa', 'As-built y manuales', 'Certificaciones', 'Garantías', 'Soporte post-entrega'] },
      { id: 'tipos-obra', title: 'Edificios, naves industriales y obra pública', content: `Aplicamos el modelo llave en mano en edificios de uso múltiple, naves industriales, depósitos, obras de infraestructura y proyectos licitados. Conocemos pliegos, normativas y exigencias de organismos públicos y privados en Argentina.`, list: ['Edificios residenciales y comerciales', 'Naves y depósitos', 'Infraestructura', 'Obra pública y licitaciones', 'Normativas locales'] },
    ],
  },
  {
    slug: 'ingenieria',
    title: 'Ingeniería',
    shortDescription: 'Ingeniería en todas sus ramas: civil, estructural, de procesos y de detalle para proyectos complejos.',
    description: `Nuestro equipo de ingeniería desarrolla anteproyectos, proyectos ejecutivos y documentación técnica para licitaciones y ejecución de obra. Trabajamos en ingeniería civil, estructural, de procesos y de detalle, con normativas vigentes y estándares internacionales cuando el proyecto lo requiere.

Elaboramos memorias de cálculo, planos, especificaciones técnicas y pliegos que permiten licitar, construir y operar con seguridad y cumplimiento normativo. La ingeniería se integra con nuestra capacidad de obra, permitiendo ofrecer diseño y ejecución desde una misma empresa.`,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    highlights: [
      'Ingeniería civil y estructural',
      'Ingeniería de procesos y de detalle',
      'Anteproyectos y proyectos ejecutivos',
      'Memorias de cálculo y planos',
      'Normativas locales e internacionales',
    ],
    process: [
      'Definición de requisitos y normativa aplicable.',
      'Anteproyecto y alternativas técnicas.',
      'Proyecto ejecutivo y documentación para obra.',
      'Acompañamiento durante la ejecución si aplica.',
    ],
    benefits: [
      'Documentación técnica lista para licitar o ejecutar.',
      'Cumplimiento normativo y estándares de seguridad.',
      'Integración con la ejecución de obra cuando lo requiera el cliente.',
    ],
    metaDescription: 'Ingeniería civil, estructural y de procesos en Argentina. Anteproyectos y proyectos ejecutivos. BRAYTON SRL.',
    sections: [
      { id: 'civil-estructural', title: 'Ingeniería civil y estructural', content: `Desarrollamos proyectos de ingeniería civil (suelos, movimientos de tierra, pavimentos, desagües) e ingeniería estructural (cálculo de estructuras de hormigón y acero, fundaciones). Utilizamos normas CIRSOC, códigos de construcción y criterios de sismo según zona.\n\nEntregamos memorias de cálculo, planos estructurales y especificaciones para licitar o ejecutar la obra.`, list: ['Suelos y fundaciones', 'Estructuras hormigón y acero', 'CIRSOC y códigos', 'Memorias de cálculo', 'Planos ejecutivos'] },
      { id: 'procesos-detalle', title: 'Ingeniería de procesos y de detalle', content: `Para proyectos industriales ofrecemos ingeniería de procesos (esquemas, balances, equipos) e ingeniería de detalle (planos de implantación, tuberías, soportes, listados de materiales). Integramos con la obra civil y las instalaciones para una documentación ejecutable.`, list: ['Esquemas de proceso', 'Implantación y tuberías', 'Listados de materiales', 'Integración multidisciplinar', 'Documentación para obra'] },
      { id: 'anteproyecto-ejecutivo', title: 'Anteproyectos y proyectos ejecutivos', content: `El anteproyecto define alcance, alternativas técnicas y orden de magnitud de costos y plazos. El proyecto ejecutivo desarrolla la solución elegida con planos, especificaciones y pliegos para construcción y/o licitación.\n\nAcompañamos al cliente en la definición de requisitos y en la aprobación de etapas.`, list: ['Anteproyecto y alternativas', 'Proyecto ejecutivo', 'Planos y especificaciones', 'Pliegos para licitación', 'Seguimiento de etapas'] },
      { id: 'normativas', title: 'Normativas locales e internacionales', content: `Aplicamos normativas argentinas (CIRSOC, AEA, IRAM, códigos provinciales y municipales) y estándares internacionales cuando el proyecto o el cliente lo exigen. Mantenemos criterios de seguridad y durabilidad en todas las disciplinas.`, list: ['CIRSOC, AEA, IRAM', 'Códigos provinciales', 'Estándares internacionales', 'Seguridad y durabilidad'] },
    ],
  },
  {
    slug: 'arquitectura',
    title: 'Arquitectura',
    shortDescription: 'Diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales.',
    description: `Ofrecemos diseño arquitectónico y dirección de obra para proyectos residenciales, comerciales e industriales. Desde el concepto y el anteproyecto hasta el detalle constructivo y la coordinación con instalaciones, garantizando funcionalidad, estética y cumplimiento de códigos y normativas locales.

Nuestros proyectos priorizan la relación entre uso, confort y coste de construcción, y se integran con la ingeniería estructural y de instalaciones para una documentación ejecutable. La dirección de obra asegura que lo proyectado se materialice en obra con los estándares definidos.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    highlights: [
      'Anteproyecto y proyecto arquitectónico',
      'Dirección de obra',
      'Residencial, comercial e industrial',
      'Coordinación con instalaciones y estructura',
      'Cumplimiento normativo',
    ],
    process: [
      'Relevamiento y programa de necesidades.',
      'Anteproyecto y definición de imagen y usos.',
      'Proyecto y documentación para construcción.',
      'Dirección de obra y control de calidad.',
    ],
    benefits: [
      'Diseño alineado con presupuesto y plazos.',
      'Un solo equipo para diseño y ejecución cuando se contrata obra con BRAYTON.',
    ],
    metaDescription: 'Arquitectura y dirección de obra en Argentina. Proyectos residenciales, comerciales e industriales. BRAYTON SRL.',
    sections: [
      { id: 'anteproyecto-proyecto', title: 'Anteproyecto y proyecto arquitectónico', content: `Desarrollamos el concepto y el programa de necesidades, el anteproyecto con plantas, cortes y fachadas, y el proyecto arquitectónico con documentación para construcción: planos de obra, detalles y especificaciones. Todo alineado con códigos de edificación y normativas locales.\n\nPriorizamos funcionalidad, confort y relación con el costo de construcción.`, list: ['Programa y concepto', 'Anteproyecto', 'Proyecto para construcción', 'Códigos y normativas', 'Presupuesto y plazos'] },
      { id: 'direccion-obra', title: 'Dirección de obra', content: `La dirección de obra asegura que lo proyectado se ejecute según los planos y las especificaciones. Realizamos inspecciones, actas, control de calidad y coordinación con contratistas e instalaciones. El cliente recibe una obra que refleja el proyecto aprobado.`, list: ['Inspección y actas', 'Control de calidad', 'Coordinación en obra', 'Cumplimiento del proyecto'] },
      { id: 'residencial-comercial-industrial', title: 'Residencial, comercial e industrial', content: `Trabajamos en vivienda unifamiliar y multifamiliar, edificios de oficinas, locales comerciales, naves industriales y equipamiento urbano. Cada tipología exige criterios específicos de circulación, iluminación, normativa y costos; los aplicamos en cada proyecto.`, list: ['Vivienda y multifamiliar', 'Oficinas y comercios', 'Industrial y equipamiento', 'Criterios por tipología'] },
      { id: 'coordinacion-instalaciones', title: 'Coordinación con instalaciones y estructura', content: `Integramos el proyecto arquitectónico con la ingeniería estructural y las instalaciones (eléctricas, sanitarias, gas, climatización) para evitar conflictos en obra y sobrecostes. La documentación resultante es ejecutable por un solo equipo o por varios con interfaces claras.`, list: ['Estructura e instalaciones', 'Documentación integrada', 'Evitar conflictos en obra', 'Interfaces claras'] },
    ],
  },
  {
    slug: 'instalaciones',
    title: 'Instalaciones',
    shortDescription: 'Eléctricas, sanitarias, de gas y especiales. Diseño, ejecución, pruebas y certificación.',
    description: `En BRAYTON SRL diseñamos, ejecutamos, probamos y certificamos instalaciones eléctricas, sanitarias, de gas y especiales para obra nueva, refacciones y ampliaciones. Trabajamos con normativas vigentes y estándares de seguridad, y coordinamos con la obra civil cuando el proyecto es integral.`,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    highlights: [
      'Instalaciones eléctricas',
      'Instalaciones sanitarias y de gas',
      'Instalaciones especiales (incendio, datos)',
      'Diseño, ejecución y certificación',
      'Obra nueva y refacciones',
    ],
    process: [
      'Relevamiento y diseño de instalaciones.',
      'Ejecución y montaje de redes y equipos.',
      'Pruebas y puesta en marcha.',
      'Documentación y certificación.',
    ],
    benefits: [
      'Cumplimiento normativo y estándares de seguridad.',
      'Coordinación con obra civil en proyectos integrales.',
    ],
    metaDescription: 'Instalaciones eléctricas, sanitarias, de gas y especiales en Argentina. Diseño, ejecución y certificación. BRAYTON SRL, Salta.',
    sections: [
      {
        id: 'electricas',
        title: 'Instalaciones eléctricas',
        content: `Ofrecemos proyectos y ejecución de instalaciones eléctricas en baja y media tensión para edificios residenciales, comerciales, industriales y obra pública. Incluimos tableros generales y seccionales, circuitos de iluminación y fuerza, redes de distribución, grupos electrógenos y conexión a proveedores de energía.\n\nCumplimos con el Reglamento de la Asociación Electrotécnica Argentina (AEA), normativas de ERSEP y requisitos de las distribuidoras locales. Entregamos planos as-built, memorias de cálculo y certificados de puesta a tierra e instalación.`,
        list: ['Baja y media tensión', 'Tableros y circuitos', 'Iluminación y fuerza', 'Puesta a tierra y protecciones', 'Documentación AEA y as-built'],
      },
      {
        id: 'sanitarias-gas',
        title: 'Instalaciones sanitarias y de gas',
        content: `Realizamos instalaciones sanitarias (agua fría, caliente, cloacas, pluviales) y de gas (con instaladores matriculados según normativa vigente). Incluimos redes internas, conexión a redes públicas o equipos autónomos, bombas, termotanques y artefactos.\n\nTrabajamos en obra nueva y en refacciones, con coordinación de recorridos y bajadas para evitar conflictos con estructura e instalaciones eléctricas. Entregamos planos de instalación y certificaciones donde corresponda.`,
        list: ['Agua fría y caliente', 'Cloacas y pluviales', 'Gas por red o envasado', 'Bombas y termotanques', 'Matriculación y certificaciones'],
      },
      {
        id: 'especiales',
        title: 'Instalaciones especiales (incendio, datos, HVAC)',
        content: `Desarrollamos instalaciones especiales según el uso del edificio: detección y extinción contra incendio (sprinklers, gabinetes, alarmas), redes de datos y voz, aire acondicionado y ventilación forzada cuando forman parte del proyecto integral.\n\nAplicamos normas IRAM, reglamentos de bomberos y especificaciones de aseguradoras. Coordinamos con otras disciplinas para que recorridos, equipos y mantenimiento futuro sean viables.`,
        list: ['Detección y extinción de incendio', 'Redes de datos y voz', 'Climatización y ventilación', 'Normas IRAM y bomberos', 'Coordinación multidisciplinar'],
      },
      {
        id: 'diseno-ejecucion-certificacion',
        title: 'Diseño, ejecución y certificación',
        content: `El ciclo completo incluye: relevamiento y anteproyecto, proyecto ejecutivo con planos y especificaciones, ejecución y montaje, pruebas de funcionamiento y puesta en marcha, y documentación final con certificaciones que exigen organismos de control y clientes.\n\nTrabajamos con software de diseño y mediciones reales en obra. La certificación se entrega según el tipo de instalación (eléctrica, gas, incendio) y la jurisdicción.`,
        list: ['Anteproyecto y proyecto ejecutivo', 'Ejecución y montaje', 'Pruebas y puesta en marcha', 'Certificados y as-built', 'Cumplimiento normativo'],
      },
      {
        id: 'obra-nueva-refacciones',
        title: 'Obra nueva y refacciones',
        content: `En obra nueva integramos las instalaciones desde el proyecto, con bajadas y recorridos definidos y coordinados con estructura y arquitectura. En refacciones y ampliaciones realizamos relevamientos, adaptación a instalaciones existentes y conexión a redes actuales sin afectar el uso del edificio más de lo necesario.\n\nGestionamos permisos y conexiones con empresas de servicios cuando corresponde. En industria y comercio planificamos intervenciones en ventanas de parada si hace falta.`,
        list: ['Obra nueva integrada', 'Refacciones y ampliaciones', 'Relevamiento de existentes', 'Conexiones y permisos', 'Planificación de paradas'],
      },
    ],
  },
  {
    slug: 'transporte',
    title: 'Transporte de cargas',
    shortDescription: 'Logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales.',
    description: `Completamos nuestra oferta integral con logística y transporte de materiales, equipos y maquinaria para obra y proyectos industriales. Contamos con flota y coordinación para abastecimiento en tiempo y forma, reduciendo demoras en obra y facilitando la gestión de suministros.

El servicio puede contratarse de forma independiente o como parte de un contrato llave en mano, asegurando que los materiales y equipos lleguen al sitio en las condiciones y plazos acordados.`,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
    highlights: [
      'Transporte de materiales de construcción',
      'Transporte de equipos y maquinaria',
      'Logística para obra e industria',
      'Coordinación y plazos',
      'Servicio standalone o integrado',
    ],
    process: [
      'Definición de cargas, orígenes y destinos.',
      'Planificación de viajes y plazos.',
      'Ejecución y seguimiento.',
      'Entrega y documentación si aplica.',
    ],
    benefits: [
      'Un solo proveedor para obra y logística cuando se contrata el paquete integral.',
      'Menor riesgo de retrasos por falta de materiales en sitio.',
    ],
    metaDescription: 'Transporte de cargas y logística para obra e industria en Argentina. BRAYTON SRL, Salta.',
    sections: [
      { id: 'materiales-construccion', title: 'Transporte de materiales de construcción', content: `Realizamos el acarreo de áridos, hormigón, hierro, madera, cerámicos y demás materiales de construcción desde proveedores o depósitos hasta el frente de obra. Coordinamos cantidades, frecuencias y horarios para no detener la ejecución.\n\nTrabajamos en Salta, Noroeste Argentino y otras regiones según el proyecto.`, list: ['Áridos, hormigón, hierro', 'Cerámicos y terminaciones', 'Frecuencias y plazos', 'Salta y NOA'] },
      { id: 'equipos-maquinaria', title: 'Transporte de equipos y maquinaria', content: `Transportamos equipos industriales, maquinaria pesada y cargas especiales con el vehículo y la logística adecuados. Planificamos rutas, permisos y descargas para que los equipos lleguen en condiciones y en el plazo acordado.`, list: ['Equipos industriales', 'Maquinaria pesada', 'Cargas especiales', 'Permisos y rutas'] },
      { id: 'logistica-obra-industria', title: 'Logística para obra e industria', content: `Ofrecemos planificación de suministros, coordinación de entregas y seguimiento en tiempo real cuando el contrato lo incluye. La logística integrada reduce demoras y facilita la gestión para el cliente.`, list: ['Planificación de suministros', 'Coordinación de entregas', 'Seguimiento', 'Reducción de demoras'] },
      { id: 'standalone-integrado', title: 'Servicio standalone o integrado', content: `El transporte puede contratarse de forma independiente (solo fletes) o como parte de un contrato llave en mano con BRAYTON. En el segundo caso, materiales y equipos forman parte del compromiso único de entrega.`, list: ['Solo fletes', 'Integrado a obra llave en mano', 'Un solo responsable'] },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
