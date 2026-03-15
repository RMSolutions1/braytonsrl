# Tema WordPress vs web Next.js – qué está y qué no

## Lo que SÍ incluye el tema WordPress

| Elemento | Estado |
|----------|--------|
| **Header** | Logo, menú principal, Empleo, Ingresar, Solicitar Cotización, menú móvil |
| **Footer** | Columnas Empresa, Enlaces, Legal, Contacto + copyright |
| **Estructura de páginas** | Cualquier página usa la misma estructura (header + área de contenido + footer) |
| **Portada** | Plantilla `front-page.php`: muestra el contenido que edites (Gutenberg/Elementor) |
| **Blog / listado** | `home.php` para entradas; `single.php` para una entrada; `archive.php` para categorías/etiquetas |
| **Búsqueda** | `search.php` |
| **404** | `404.php` |
| **Plantillas** | Ancho completo, Canvas (sin header/footer) |
| **Editores** | Compatible Elementor y Gutenberg (bloques, colores BRAYTON) |

---

## Lo que NO está desarrollado dentro del tema

El **contenido** de cada página y las **funcionalidades** no están programados en PHP. En la web Next.js sí existen; en el tema WP debes crearlos tú (con Elementor/Gutenberg) o con plantillas PHP a medida.

### Páginas y secciones

| En Next.js | En el tema WP |
|------------|----------------|
| **Inicio** (Hero, Nosotros, Servicios, Sectores, Proyectos destacados, Ventajas, Proceso, Estadísticas, Testimonios, Certificaciones, Clientes, CTA) | No. La portada es un contenido vacío que tú rellenas con Elementor o Gutenberg |
| **Nosotros** (contenido específico) | No. Creas la página y editas el contenido con el editor |
| **Servicios** (listado + detalle por slug) | No. Creas páginas hijas o entradas y las enlazas en el menú |
| **Sectores** | No. Página normal; contenido lo añades tú |
| **Proyectos** (listado + detalle) | No. Igual: páginas o CPT que tú crees y enlazas |
| **Clientes** | No. Página normal |
| **Certificaciones** | No. Página normal |
| **Blog** (listado + [slug]) | Sí listado (`home.php`) y entrada (`single.php`); el diseño del listado es básico |
| **Contacto** (formulario) | No. Necesitas plugin (Contact Form 7, WPForms, etc.) o bloque/Widget de Elementor |
| **Trabaja con nosotros** | No. Página normal; formulario con plugin |
| **Términos, Privacidad, Aviso legal** | No. Páginas normales; el texto lo escribes tú |
| **Login / Dashboard** | No. WordPress tiene su propio login; el dashboard de la app Next.js no existe en el tema |

### Funcionalidades

- **Formulario de contacto**: no incluido → usar plugin o Elementor.
- **Formulario “Trabaja con nosotros”**: igual.
- **Listado de servicios con enlaces a detalle**: no → crear páginas/entradas y menú o plantilla a medida.
- **Listado de proyectos con enlaces a detalle**: no → igual.
- **Login y panel (dashboard) tipo app**: no; el tema es solo front corporativo.

---

## Cómo tener “todo” en WordPress

1. **Con Elementor (recomendado)**  
   Creas cada página (Inicio, Nosotros, Servicios, etc.) y con Elementor montas las secciones (hero, textos, grids, botones). Para formularios, usas el formulario de Elementor o un plugin.

2. **Con Gutenberg**  
   Igual con bloques: párrafos, encabezados, columnas, imágenes, botones. Formularios con plugin.

3. **Con plantillas PHP a medida**  
   Se pueden crear plantillas que repliquen la estructura de la web Next.js (por ejemplo una plantilla “Inicio” con secciones en PHP, o “Servicios” que liste páginas hijas). Eso implica desarrollar cada sección en PHP/HTML dentro del tema.

---

## Resumen

- **Dentro del tema están**: estructura global (header, footer), menú, plantillas de página/entrada/archivo/búsqueda/404, soporte para Elementor y Gutenberg.
- **No están dentro del tema**: las secciones concretas (Hero, About, Services, etc.), los listados y detalles de servicios/proyectos, formularios, login/dashboard. Eso lo añades editando con Elementor/Gutenberg y/o con plugins, o pidiendo plantillas PHP personalizadas.

Si quieres, el siguiente paso puede ser: (1) definir qué páginas quieres con contenido ya maquetado en PHP (por ejemplo solo Inicio y Contacto), o (2) dejarlo todo a Elementor/Gutenberg y solo documentar pasos para replicar la estructura de la web actual.
