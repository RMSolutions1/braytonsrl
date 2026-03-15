# Auditoría exhaustiva – BRAYTON SRL (web y app)

**Fecha:** 2026  
**Alcance:** Frontend Next.js (App Router), accesibilidad, SEO, seguridad, buenas prácticas.

---

## 1. Resumen ejecutivo

Se realizó una revisión de extremo a extremo del proyecto. Se corrigieron **errores y advertencias** y se aplicaron **mejoras** en accesibilidad, SEO, seguridad y consistencia de código. El build y el lint pasan sin errores.

---

## 2. Correcciones aplicadas

### 2.1 Accesibilidad (a11y)

| Ítem | Estado anterior | Acción |
|------|-----------------|--------|
| Imágenes con `alt=""` | Varias páginas con alt vacío | **Corregido:** textos alternativos descriptivos (ej. "Fondo de la sección Contacto", títulos de servicios/noticias/proyectos). Hero usa el overline del slide. |
| Botones sin `type` | ProyectosClient filtros | **Corregido:** `type="button"` en botones que no son submit. |
| Formulario de contacto | Sin `autoComplete` | **Corregido:** `autoComplete="name"`, `organization`, `email`, `tel"` en los campos correspondientes. |

### 2.2 SEO y metadatos

| Ítem | Estado anterior | Acción |
|------|-----------------|--------|
| `metadataBase` fijo | URL hardcodeada | **Corregido:** uso de `process.env.NEXT_PUBLIC_SITE_URL` con fallback a `https://braytonsrl.com.ar`. |

### 2.3 Seguridad

| Ítem | Estado anterior | Acción |
|------|-----------------|--------|
| Cabeceras HTTP | Sin cabeceras de seguridad | **Añadido en next.config.js:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`. |
| Enlaces externos | Revisados | **Verificado:** enlaces con `target="_blank"` ya tenían `rel="noopener noreferrer"` (aviso-legal, WhatsApp). |

### 2.4 Código y ESLint

| Ítem | Estado anterior | Acción |
|------|-----------------|--------|
| Configuración ESLint | No existía, lint preguntaba | **Creado:** `.eslintrc.json` con `next/core-web-vitals` y `next/typescript`. |
| Import no usado | `Link` en proyectos/page.tsx | **Eliminado** import no utilizado. |
| Variables no usadas | `i` en map() en ProyectosClient y ClientsSection | **Corregido:** eliminado el parámetro no usado del callback. |

### 2.5 Manejo de errores y rutas

| Ítem | Estado anterior | Acción |
|------|-----------------|--------|
| Página 404 | Dependía solo del default de Next | **Creado:** `src/app/not-found.tsx` con mensaje en español y enlace al inicio. |
| Errores en runtime | Sin UI de error | **Creado:** `src/app/error.tsx` con mensaje, botón “Reintentar” y enlace al inicio. |

---

## 3. Mejoras sugeridas ya implementadas

- **Alt en todas las imágenes:** descriptivos o contextuales (fondos de sección, títulos de contenido).
- **Botones tipados:** `type="button"` o `type="submit"` según corresponda.
- **Cabeceras de seguridad** en todas las respuestas del sitio.
- **metadataBase** configurable por entorno para OG y canonical.
- **Páginas de error** propias para mejor experiencia de usuario.

---

## 4. Recomendaciones posteriores (no bloqueantes)

1. **Producción:** Definir `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_API_URL` en el entorno de producción.
2. **Imágenes:** Valorar instalar `sharp` en producción para optimización de imágenes (`npm i sharp`).
3. **Lighthouse:** Ejecutar auditorías de rendimiento y accesibilidad (Lighthouse) y ajustar según resultados.
4. **Tests:** Añadir tests E2E (p. ej. Playwright) para flujos críticos (contacto, login, navegación).

---

## 5. Verificación

- `npm run build`: **OK** (compilación correcta).
- `npm run lint`: **OK** (sin errores; reglas configuradas en `.eslintrc.json`).
- Imágenes: **OK** (alt revisados en todas las páginas).
- Enlaces externos: **OK** (`rel="noopener noreferrer"` donde aplica).
- Formulario contacto: **OK** (labels, `autoComplete`, `type="submit"` en el botón de envío).
