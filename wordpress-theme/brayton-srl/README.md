# Tema WordPress BRAYTON SRL

Tema corporativo listo para subir a WordPress. **Compatible con Elementor y Gutenberg** para editar el contenido de páginas y entradas.

---

## Instalación

1. Comprime la carpeta **`brayton-srl`** en un archivo ZIP (la raíz del ZIP debe ser la carpeta `brayton-srl` con style.css, functions.php, etc. dentro).
2. En WordPress: **Apariencia → Temas → Añadir nuevo → Subir tema** y elige el ZIP.
3. **Activar** el tema BRAYTON SRL.
4. **Apariencia → Personalizar**: sube el **logo** (Identidad del sitio) y crea el **Menú principal** (Menús).
5. Crea las páginas que necesites (Inicio, Nosotros, Servicios, Proyectos, Contacto, Trabaja con nosotros, etc.) y asígnalas al menú principal.
6. En **Ajustes → Lectura**: elige "Una página estática" y como **Portada** la página de Inicio; como **Página de entradas** la de Noticias/Blog si la tienes.

---

## Editar con Elementor

1. Instala el plugin **Elementor** (o Elementor Pro) desde **Plugins → Añadir nuevo**.
2. Edita cualquier **página**: clic en **Editar con Elementor**. El contenido de la página se sustituye por el diseño de Elementor; el header y el footer del tema se mantienen.
3. **Plantillas de página** (al editar la página, en el panel derecho):
   - **Predeterminada**: contenido con ancho máximo 1280px (recomendado).
   - **Ancho completo**: contenido sin límite de ancho.
   - **Canvas**: sin header ni footer del tema; solo el contenido (ideal para landings a pantalla completa).

---

## Editar con Gutenberg (editor de bloques)

1. Edita cualquier **página** o **entrada** con el editor de bloques (Gutenberg) que viene con WordPress.
2. El tema incluye **alineación amplia y completa** (alignwide, alignfull) para bloques.
3. En la paleta de colores del editor aparecen los colores BRAYTON (Navy, Azul, Acero, Naranja) para usarlos en bloques.

---

## Estructura del tema

- **style.css** – Estilos globales, header, footer, contenido, bloques.
- **functions.php** – Soporte para Gutenberg (bloques, colores, editor) y detección de páginas Elementor.
- **header.php** / **footer.php** – Cabecera y pie del sitio (logo, menú, columnas footer).
- **page.php** – Páginas (compatible Elementor y Gutenberg).
- **single.php** – Entradas del blog.
- **front-page.php** – Portada (cuando está configurada como página estática).
- **home.php** – Listado de entradas (blog).
- **archive.php** – Archivos (categorías, etiquetas, fechas).
- **search.php** – Resultados de búsqueda.
- **404.php** – Página no encontrada.
- **template-full-width.php** – Plantilla de página: ancho completo.
- **template-elementor-canvas.php** – Plantilla de página: canvas (sin header/footer).
- **assets/css/editor-style.css** – Estilos en el editor Gutenberg.
- **assets/js/header.js** – Menú móvil (abrir/cerrar).

---

## Logo

- Sube el logo en **Apariencia → Personalizar → Identidad del sitio → Logo del sitio**.
- Si no hay logo, se muestra el texto "BRAYTON SRL". Opcional: coloca una imagen en `assets/img/logo.png` como respaldo.

---

## Menú principal

En **Apariencia → Menús** crea un menú y asígnalo a **Menú principal (header)**. Los enlaces que añadas se mostrarán en la barra de navegación. El tema muestra además, a la derecha, "Empleo", "Ingresar" y "Solicitar Cotización" (enlaces fijos a /trabaja-con-nosotros, /login y /contacto). Crea esas páginas si quieres que funcionen.
