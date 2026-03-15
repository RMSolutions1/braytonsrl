# Tema WordPress BRAYTON SRL

Tema base para usar la misma identidad visual que el sitio Next.js, 100% compatible con WordPress.

## Instalación

1. Copia la carpeta **`brayton-srl`** dentro de `wp-content/themes/` de tu instalación WordPress.
2. En el escritorio de WordPress: **Apariencia → Temas** y activa **BRAYTON SRL**.
3. **Apariencia → Personalizar**: sube el logo y ajusta menús (Menú principal para header, opcional Menú footer).
4. Crea las páginas necesarias (Inicio, Nosotros, Servicios, Proyectos, Contacto, etc.) y asígnalas al menú.
5. En **Ajustes → Lectura** elige "Una página estática" y como portada la página de inicio.

## Estructura del tema

- `style.css` – Metadatos del tema y estilos (colores BRAYTON, header, footer).
- `functions.php` – Soporte de logo, menús, enqueue de CSS/JS.
- `header.php` / `footer.php` – Cabecera y pie (logo, nav, columnas footer).
- `index.php` – Plantilla por defecto.
- `front-page.php` – Plantilla de portada.
- `assets/js/header.js` – Apertura/cierre del menú móvil.

## Compatibilidad con esta web (Next.js)

- Mismos colores (`--brayton-navy`, `--brayton-accent`, etc.).
- Misma estructura de header (logo + nav + Empleo | Ingresar | CTA) y footer (columnas Empresa, Enlaces, Legal, Contacto).
- Menú móvil con panel full-screen y mismo flujo.

Para replicar **todas** las páginas (Servicios con subpáginas, Proyectos, Blog, etc.) hay que añadir más plantillas PHP (`page.php`, `single.php`, `archive.php`, etc.) y opcionalmente **Custom Post Types** para Servicios y Proyectos. La guía completa está en `docs/WORDPRESS-MIGRACION.md`.
