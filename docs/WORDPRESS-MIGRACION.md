# Cómo convertir esta web en un tema compatible con WordPress

Hay **tres formas** principales de que el sitio sea "compatible con WordPress". Elige la que mejor se adapte a tu objetivo.

---

## Opción 1: Tema WordPress listo (recomendado para esta web)

**En este repositorio ya tienes un tema completo** en la carpeta `wordpress-theme/brayton-srl/`. Puedes subirlo a WordPress y editarlo con **Elementor** o **Gutenberg** (editor de bloques).

- **Instalación:** Comprime la carpeta `brayton-srl` en ZIP y en WP ve a Apariencia → Temas → Subir tema.
- **Elementor:** Instala el plugin Elementor; al editar una página verás "Editar con Elementor". El tema incluye plantillas "Ancho completo" y "Canvas" (sin header/footer).
- **Gutenberg:** El tema tiene soporte para bloques (align wide/full) y paleta de colores BRAYTON en el editor.
- Instrucciones detalladas: ver `wordpress-theme/brayton-srl/README.md`.

---

## Opción 1b: Tema WordPress clásico (PHP) que replica el diseño a mano

**Qué es:** Creas un tema WP (PHP + CSS/JS) con la misma apariencia que esta web. El contenido se gestiona en el escritorio de WordPress; la plantilla solo define la estructura y los estilos.

**Ventajas:** WordPress 100% nativo, plugins, editor de bloques, hosting típico de WP.  
**Desventajas:** Hay que reescribir la interfaz en PHP/HTML y CSS (no React).

**Pasos resumidos:**

1. Crear la carpeta del tema en `wp-content/themes/brayton-srl/`.
2. Incluir los archivos mínimos: `style.css`, `index.php`, `functions.php`, `header.php`, `footer.php`, `front-page.php`, etc.
3. Copiar los estilos (Tailwind se puede compilar a un único CSS o reemplazar por CSS custom usando las mismas variables de color/fuentes).
4. Sustituir cada página Next.js por su equivalente en PHP (plantillas de página o de entrada).
5. Usar el Customizer o ACF para logo, teléfono, email, etc.

En este repo tienes una **base de tema** en `wordpress-theme/` para empezar.

---

## Opción 2: Headless WordPress (WP como CMS + esta web como front)

**Qué es:** WordPress se usa solo como CMS (contenido, medios, usuarios). Esta aplicación Next.js sigue siendo el frontend y consume los datos vía **REST API** o **WPGraphQL**.

**Ventajas:** Mantienes React/Next.js y el diseño actual; el cliente edita en WP.  
**Desventajas:** Necesitas un servidor para Next.js y otro para WordPress (o un host que soporte ambos).

**Pasos resumidos:**

1. Instalar WordPress en una URL (ej. `https://api.misitio.com` o `https://misitio.com/wp`).
2. En WP: instalar **WPGraphQL** (o usar la REST API nativa).
3. En este proyecto Next.js: sustituir datos estáticos por llamadas a la API de WP (páginas, entradas, servicios, proyectos, etc.).
4. Publicar el build de Next.js donde se sirva el sitio público (Vercel, VPS, etc.) y apuntar el dominio ahí.

No "convierte" la web en un tema WP: la hace **compatible con WP** como backend.

---

## Opción 3: Exportar HTML/CSS estático e importar en WordPress

**Qué es:** Generar HTML estático desde Next.js (`next export` o salida estática) y luego colocar ese HTML en plantillas o en páginas de WordPress (a veces con un page builder).

**Ventajas:** Rápido para una sola página o pocas.  
**Desventajas:** Menos flexible, difícil de mantener y no aprovecha bien el sistema de plantillas de WP.

---

## Recomendación

- Si quieres **todo en WordPress** (tema, plugins, hosting WP): usa la **Opción 1** y desarrolla el tema en `wordpress-theme/`.
- Si quieres **seguir con Next.js** pero que el contenido lo gestione WordPress: usa la **Opción 2** (headless).

En la carpeta `wordpress-theme/` de este repositorio tienes la estructura y archivos mínimos para empezar con la Opción 1.
