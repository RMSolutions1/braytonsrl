# BRAYTON SRL — Sitio web corporativo

## Estrategia digital del sitio

El sitio funciona como:
- **Carta de presentación corporativa**: Home, Nosotros, Servicios y Sectores transmiten solidez técnica y capacidad operativa.
- **Plataforma de generación de clientes**: CTAs en cada página, formulario de contacto y botón de WhatsApp.
- **Portafolio**: Proyectos con filtros por sector y fichas detalladas.
- **Herramienta SEO**: Meta tags por página, sitemap, robots.txt y schema.org (Organization).
- **Imagen digital**: Estética corporativa, industrial y premium (azul profundo, gris acero, acento naranja).

---

## Mapa del sitio (arquitectura de información)

```
/                     → Home
/nosotros              → Nosotros (historia, misión, visión, valores, equipo)
/servicios             → Servicios (construcción, ingeniería, arquitectura, instalaciones, transporte)
/sectores              → Sectores (residencial, comercial, industrial, agro, factory, minería)
/proyectos             → Portafolio (galería con filtros)
/proyectos/[slug]      → Ficha de proyecto
/contacto              → Contacto (formulario, mapa, datos)
/certificaciones       → Certificaciones y estándares
/clientes              → Clientes y sectores que nos eligen
/blog                  → Noticias / Blog
/blog/[slug]           → Artículo
/trabaja-con-nosotros  → Trabaja con nosotros (CV)
```

---

## Tecnología

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Lenguaje**: TypeScript
- **Imágenes**: next/image (optimización y lazy loading)

---

## Estructura de carpetas

```
BRAYTONSRL/
├── public/                 # Assets estáticos (favicon, logo, etc.)
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── certificaciones/
│   │   ├── clientes/
│   │   ├── contacto/
│   │   ├── nosotros/
│   │   ├── proyectos/
│   │   ├── sectores/
│   │   ├── servicios/
│   │   ├── trabaja-con-nosotros/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   └── data/
│       └── projects.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Guía de despliegue en hosting

### Requisitos

- Node.js 18+
- Cuenta en Vercel, Netlify, o cualquier hosting con soporte Node (VPS, Railway, etc.)

### Opción 1: Vercel (recomendado)

1. Subir el proyecto a un repositorio Git (GitHub, GitLab, Bitbucket).
2. En [vercel.com](https://vercel.com), importar el repositorio.
3. Framework preset: **Next.js**. No es necesario configurar build command ni output.
4. Variable de entorno (opcional): `NEXT_PUBLIC_SITE_URL` = `https://sudominio.com` (para sitemap y canonical).
5. Deploy. Vercel generará una URL y, si conectas un dominio, SSL automático.

### Opción 2: Build estático (export)

Si el hosting solo sirve archivos estáticos:

1. En `next.config.js` agregar: `output: 'export'`.
2. Ejecutar: `npm run build`. Se generará la carpeta `out/`.
3. Subir el contenido de `out/` al hosting (FTP o panel de archivos estáticos).

Nota: con `output: 'export'`, las rutas dinámicas (`/proyectos/[slug]`, `/blog/[slug]`) se pregeneran en build; no hay servidor Node en producción.

### Opción 3: VPS o servidor Node

1. En el servidor: instalar Node.js 18+.
2. Clonar el repo y ejecutar: `npm install`, `npm run build`, `npm start`.
3. Usar un proceso manager (PM2) y un reverse proxy (Nginx) apuntando al puerto que use Next (por defecto 3000).
4. Configurar dominio y SSL (por ejemplo con Let's Encrypt).

### Variables de entorno

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio (sitemap, robots, schema). Ej: `https://braytonsrl.com.ar` |

### Después del despliegue

1. **Formulario de contacto**: El formulario actual simula el envío. Para producción, integrar con:
   - API propia (Node.js, etc.),
   - Formspree / Getform / Netlify Forms, o
   - Servicio de email (SendGrid, Resend, etc.).
2. **WhatsApp**: Editar el número en `src/components/ui/WhatsAppButton.tsx` (variable `WHATSAPP_NUMBER`).
3. **Datos de contacto**: Actualizar teléfono, email y dirección en Footer y página Contacto.
4. **Google Maps**: Reemplazar el iframe del mapa en `/contacto` por el embed real de la dirección de la empresa.
5. **Imágenes**: Sustituir URLs de Unsplash por imágenes propias (por ejemplo en `/public` y referenciar con `/nombre.jpg`).

---

## SEO incluido

- Meta `title` y `description` por página.
- `metadataBase` y template de títulos en el layout.
- Keywords en metadata global.
- `sitemap.xml` generado en `/sitemap.xml`.
- `robots.txt` generado en `/robots.txt`.
- Schema.org tipo `Organization` en el layout.
- Estructura semántica (headings, sections, enlaces internos).

---

## Performance

- Uso de `next/image` con `sizes` y lazy loading.
- Fuentes con `display: swap`.
- Componentes con animaciones solo cuando están en viewport (Framer Motion).
- Build de producción optimizado (Next.js minimiza y divide el código).

Para medir: ejecutar `npm run build` y luego en Chrome DevTools > Lighthouse (modo producción con `npm start`).

---

## Mantenimiento de contenido

- **Proyectos**: editar el array en `src/data/projects.ts` (agregar, quitar o modificar proyectos).
- **Noticias/Blog**: editar el objeto `posts` en `src/app/blog/page.tsx` y en `src/app/blog/[slug]/page.tsx`.
- **Certificaciones**: array en `src/app/certificaciones/page.tsx`.
- **Clientes**: array `clientSectors` en `src/app/clientes/page.tsx`.
- **Trabaja con nosotros**: áreas en `src/app/trabaja-con-nosotros/page.tsx` y email de RRHH.

---

© BRAYTON SRL. Documentación técnica del sitio web.
