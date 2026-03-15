# Auditoría exhaustiva del proyecto BRAYTON SRL

**Fecha:** 7 de marzo de 2026  
**Alcance:** Sitio público, páginas legales, menús, footer, servicios, dashboards ERP y API.

---

## 1. Resumen ejecutivo

Se realizó una revisión de extremo a extremo del código, rutas, contenidos y funcionalidades. Se detectaron **gaps** (páginas legales ausentes, un error en email y footer sin sección legal) que fueron **corregidos**. Los dashboards del ERP están **operativos en modo solo lectura** (listados completos, sin formularios de alta/edición/eliminación en el frontend); el backend expone CRUD completo vía API.

---

## 2. Estructura del proyecto y rutas

### 2.1 Sitio público (Next.js)

| Ruta | Estado | Notas |
|------|--------|-------|
| `/` | OK | Home con hero, servicios, sectores, proyectos, CTA |
| `/nosotros` | OK | Historia, misión, visión, valores, equipo |
| `/servicios` | OK | Listado de 5 servicios con enlaces a detalle |
| `/servicios/[slug]` | OK | 5 slugs: construccion-integral, ingenieria, arquitectura, instalaciones, transporte |
| `/sectores` | OK | 6 sectores (residencial, comercial, industrial, agro, factory, mineria) |
| `/proyectos` | OK | Grid de proyectos desde `@/data/projects` |
| `/proyectos/[slug]` | OK | 6 proyectos con galería y descripción |
| `/certificaciones` | OK | 4 bloques (normativas, seguridad, calidad, ambiente) |
| `/clientes` | OK | Sectores que nos eligen + texto confidencialidad |
| `/blog` | OK | 3 entradas estáticas |
| `/blog/[slug]` | OK | 3 slugs con notFound() si no existe |
| `/trabaja-con-nosotros` | OK | Áreas + mailto CV (corregido .ar.ar → .ar) |
| `/contacto` | OK | Formulario + datos de contacto + mapa |
| `/login` | OK | Formulario login, redirección a /dashboard |
| `/terminos-y-condiciones` | **Creado** | TYC completos |
| `/privacidad` | **Creado** | Política de privacidad (Ley 25.326 / RGPD) |
| `/aviso-legal` | **Creado** | Datos fiscales (razón social, CUIT placeholder, domicilio) y aviso legal |

### 2.2 Dashboard ERP

| Ruta | Estado | Funcionalidad |
|------|--------|----------------|
| `/dashboard` | OK | Métricas: proyectos activos, empleados, clientes, proveedores, facturación/pagos del mes |
| `/dashboard/empleados` | OK | Tabla listado (sin ABM en UI) |
| `/dashboard/sueldos` | OK | Tabla + descarga PDF recibo por fila |
| `/dashboard/clientes` | OK | Tabla listado |
| `/dashboard/proveedores` | OK | Tabla listado |
| `/dashboard/proyectos` | OK | Tabla listado |
| `/dashboard/facturas` | OK | Tabla listado |
| `/dashboard/pagos` | OK | Tabla listado |
| `/dashboard/usuarios` | OK | Tabla listado (solo Admin/SuperAdmin) |

El menú lateral se filtra por rol (MENU con `roles`). Layout con sidebar, header con rol y “Cerrar sesión”.

---

## 3. Header, footer y menús

### Header
- **Desktop (≥1536px):** menú horizontal con todos los ítems (Inicio, Nosotros, Servicios, Sectores, Proyectos, Certificaciones, Clientes, Noticias, Trabaja, Contacto) + icono usuario + botón Cotización.
- **Mobile/tablet (<1536px):** menú hamburguesa + icono usuario; panel desplegable con los mismos enlaces.
- Enlace “Home” en nav: podría unificarse a “Inicio” para consistencia en español (opcional).

### Footer (actualizado)
- **Empresa:** Nosotros, Servicios, Sectores, Proyectos, Certificaciones.
- **Enlaces:** Contacto, Trabaja con nosotros, Noticias.
- **Legal (nuevo):** Términos y condiciones, Política de privacidad, Aviso legal y datos fiscales.
- **Contacto:** email, teléfono, horario.
- Grid adaptado a 5 columnas en lg.

---

## 4. Páginas legales e información fiscal

- **Antes:** No existían rutas para TYC, privacidad ni aviso legal; el footer no enlazaba sección legal.
- **Después:**
  - `/terminos-y-condiciones`: objeto, titular, uso del sitio, contenido, propiedad intelectual, enlaces, modificaciones, ley aplicable, contacto.
  - `/privacidad`: responsable, datos recabados, finalidad, base legal, destinatarios, derechos (Ley 25.326 / RGPD), seguridad, cambios.
  - `/aviso-legal`: datos fiscales (razón social, CUIT placeholder, domicilio, inscripción IGJ, email, teléfono), objeto del sitio, propiedad intelectual, enlaces a TYC y privacidad.
- **Importante:** En `/aviso-legal` el CUIT y la dirección están como placeholder; deben reemplazarse por los datos reales antes de producción.

---

## 5. Servicios y contenidos

- **Listado:** `ServiciosContent` usa `servicesData` de `@/data/services`; 5 servicios con título, shortDescription y link a `/servicios/[slug]`.
- **Detalle:** Cada servicio tiene: título, shortDescription, imagen, description, highlights, process, benefits, metaDescription. Slugs válidos generan página; slug inválido → `notFound()`.
- Contenido coherente con ingeniería, construcción e instalaciones.

---

## 6. Resto de páginas públicas

- **Nosotros:** NosotrosContent con historia, misión, visión, valores (4), bloque “Equipo técnico”.
- **Sectores:** SectoresContent con 6 sectores (needs + solutions).
- **Proyectos:** ProyectosClient con datos de `@/data/projects` (6 proyectos); detalle con galería e highlights.
- **Certificaciones, Clientes, Blog, Contacto, Trabaja:** Contenido y estructura correctos.
- **Contacto:** Dirección, teléfono, email, horario y mapa (iframe genérico); formulario envía a API `/api/contact`.

---

## 7. Dashboards: funcionalidad y desarrollo

- **Autenticación:** Login con email/password; tokens en localStorage; refresh token; redirección a `/dashboard`; layout lee `user` de localStorage y filtra menú por rol.
- **Métricas:** GET `/api/dashboard/metrics` consumido por la página Inicio del dashboard.
- **Módulos:** Todos los listados consumen la API correcta (employees, payroll, clients, providers, projects, invoices, payments, users). Sueldos incluye descarga de recibo PDF vía `API_URL + '/api/payroll/:id/receipt'`.
- **Gap:** No hay formularios de **alta, edición ni eliminación** en el frontend. El backend sí ofrece POST/PATCH (y en algunos casos lógica de borrado) en:
  - employees, clients, providers, projects, invoices, payments, payroll, users.
- **Conclusión:** Dashboards al **100% para consulta y descarga de recibos**; para “ABM completo” faltaría implementar en el frontend los formularios y llamadas POST/PATCH/DELETE.

---

## 8. Backend API

- **Auth:** POST `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`.
- **CRUD (GET/POST/PATCH según recurso):** users, employees, payroll (+ GET receipt), clients, providers, projects, invoices, payments; documents (upload/download); notifications (GET, PATCH read); dashboard (GET metrics); contact (POST).
- **Middleware:** auth JWT, roles (SuperAdmin, Administrador, RRHH, etc.) aplicados en rutas sensibles.
- **CORS:** Configurado para múltiples orígenes (localhost 3000–3010 y producción) para evitar “Failed to fetch” desde cualquier puerto de Next.

---

## 9. Correcciones aplicadas en esta auditoría

1. **Email en Trabaja con nosotros:** `mailto:rrhh@braytonsrl.com.ar.ar` corregido a `rrhh@braytonsrl.com.ar`.
2. **Páginas legales creadas:** `/terminos-y-condiciones`, `/privacidad`, `/aviso-legal` con contenido completo.
3. **Footer:** Añadida sección “Legal” con enlaces a TYC, Privacidad y Aviso legal; grid a 5 columnas en lg.
4. **Sitemap:** Incluidas las tres nuevas rutas legales (prioridad 0.4, changeFrequency yearly).

---

## 10. Recomendaciones posteriores

1. **Aviso legal:** Completar CUIT y domicilio real en `/aviso-legal` (y en contacto si se desea).
2. **Dashboard ABM:** Si se requiere gestión completa desde la web, agregar en el frontend formularios de alta/edición (y eliminación donde corresponda) para empleados, clientes, proveedores, proyectos, facturas, pagos y usuarios, usando los endpoints ya existentes.
3. **Header:** Opcionalmente cambiar la etiqueta “Home” a “Inicio” en el menú para consistencia en español.
4. **Pruebas manuales:** Ejecutar `npm run dev` y `node server/src/index.js`, recorrer sitio público, login, cada ítem del dashboard y las nuevas páginas legales; verificar formulario de contacto y descarga de recibo PDF.

---

## 11. Verificación rápida de rutas

Para comprobar que no hay enlaces rotos desde el footer/header:

- Header: /, /nosotros, /servicios, /sectores, /proyectos, /certificaciones, /clientes, /blog, /trabaja-con-nosotros, /contacto, /login.
- Footer Empresa: mismos que header (salvo home y login).
- Footer Enlaces: /contacto, /trabaja-con-nosotros, /blog.
- Footer Legal: /terminos-y-condiciones, /privacidad, /aviso-legal.

Todas estas rutas existen y están implementadas.
