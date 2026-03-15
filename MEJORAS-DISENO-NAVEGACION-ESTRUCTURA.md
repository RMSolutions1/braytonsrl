# Análisis de diseño, navegación y estructura — BRAYTON SRL

**Enfoque:** Experto en desarrollo e ingeniería + perspectiva BRAYTON (empresa).  
**Metodología:** Navegación real por el sitio (home, nosotros, servicios, servicio detalle, proyectos, sectores, certificaciones, contacto) y revisión de componentes y rutas.

---

## 1. Resumen ejecutivo

El sitio transmite **profesionalismo** y está bien estructurado a nivel de información y rutas. La navegación es coherente y el contenido encaja con el posicionamiento de BRAYTON (ingeniería, construcción, llave en mano). A continuación se detallan mejoras concretas de **diseño**, **navegación**, **estructura** y **experiencia de usuario** que refuerzan la imagen de marca y la usabilidad.

---

## 2. Navegación y estructura

### 2.1 Lo que funciona bien

- **Header fijo** con logo, nav principal, dropdown de Servicios (desktop), CTA “Solicitar cotización” e “Ingresar” siempre visibles.
- **Menú móvil** con drawer, submenú Servicios desplegable, Escape para cerrar y bloqueo de scroll cuando está abierto.
- **Jerarquía clara:** Inicio → Nosotros, Servicios, Sectores, Proyectos, Noticias; más Certificaciones, Contacto y Trabaja con nosotros en footer.
- **Servicios:** Listado numerado (01–05), enlaces “Ver detalle del servicio →” y páginas de detalle con “En esta página” (TOC) y “← Volver a Servicios”.
- **Proyectos:** Filtros por sector (Todos, Industrial, Comercial, etc.) y cards con sector, título, ubicación y m².
- **Footer** con Empresa, Enlaces, Legal y Contacto; WhatsApp, teléfono y email accesibles.

### 2.2 Mejoras recomendadas

| Área | Mejora | Prioridad |
|------|--------|-----------|
| **Breadcrumbs** | Añadir breadcrumbs en páginas interiores (ej. Servicios > Instalaciones, Proyectos > [nombre]). Mejora orientación y SEO. | Alta |
| **Estado activo en nav** | Resaltar la sección actual en el header (ej. “Nosotros” cuando se está en /nosotros) para que el usuario sepa dónde está. | Media |
| **Enlace “Certificaciones” en header** | Certificaciones está solo en el footer; si es un diferenciador, considerar añadirlo al nav principal o al dropdown de Servicios. | Baja |
| **CTA al final de páginas largas** | En Nosotros, Sectores y detalle de servicios, añadir un bloque final “¿Hablamos de su proyecto?” con botón a Contacto antes del footer. | Media |
| **Consistencia “Noticias” vs “Blog”** | En el header figura “Noticias” y la ruta es /blog; unificar etiqueta y URL (ej. “Noticias” → /noticias o “Blog” en nav). | Baja |

---

## 3. Diseño y experiencia visual

### 3.1 Puntos fuertes

- **Paleta:** Navy (#0a1628), acento naranja (#e85d04), buen contraste y legibilidad.
- **Tipografía:** Uso de variables `--font-outfit` y `--font-dm-sans`; jerarquía de headings clara.
- **Hero:** Carrusel con 3 slides, CTAs, indicadores y flechas; barra inferior con 5+ años, 150+ proyectos, 5 áreas.
- **Páginas interiores:** Cabecera con imagen de fondo, título y descripción; contenido bien espaciado.

### 3.2 Mejoras de diseño

| Aspecto | Mejora | Prioridad |
|--------|--------|------------|
| **Hero – Mensaje del primer slide** | Hoy se muestra “Desde 2020” (línea 1) y “años de excelencia” (línea 2). Para evitar ambigüedad (“¿20 años o desde el año 2020?”), considerar: “Desde 2020. Años de excelencia.” con punto, o “20 años de excelencia” si la idea son 20 años. | Media |
| **Indicadores del carrusel** | Los botones “Slide 1/2/3” son muy pequeños (1.5 × 1.5). Aumentar tamaño o área clickeable y asegurar contraste (accesibilidad). | Media |
| **Formulario de contacto** | Campos con buen label y placeholder. Añadir: mensaje de éxito/error más visible (ej. banner o alert), y opcionalmente un indicador de “Enviando…” en el botón. | Media |
| **Tarjetas de proyectos** | En listado y filtros, asegurar que el estado “hover” y “focus” sea claro (borde, sombra o cambio de color) para teclado y ratón. | Baja |
| **WhatsApp flotante** | Verificar que el botón flotante no tape contenido crítico en móvil (ej. campos del formulario de contacto) y que tenga `aria-label` descriptivo. | Baja |

---

## 4. Estructura de contenido y páginas

### 4.1 Contenido

- **Nosotros:** Historia, Misión, Visión, Valores (Integridad, Excelencia técnica, Compromiso, Trabajo en equipo) y bloque de equipo técnico. Estructura clara.
- **Servicios:** Descripción por servicio con listas (✓), proceso, beneficios y en detalle secciones profundas con “En esta página”.
- **Sectores:** Residencial, Comercial, Industrial, Agro, Factory, Minería con “Necesidades del sector” y “Soluciones que ofrecemos”; cierre “¿Su sector no está listado?”.
- **Certificaciones:** Normativas locales, Seguridad e higiene, Calidad, Ambiente. Se podría enlazar desde servicios o proyectos (“trabajamos con X normativa”).

### 4.2 Mejoras de estructura

| Página / Área | Mejora | Prioridad |
|---------------|--------|-----------|
| **Títulos de pestaña (servicio)** | Evitar duplicar marca en el title. Ej. actual: “Instalaciones \| BRAYTON SRL - Argentina \| BRAYTON SRL”. Dejar algo como: “Instalaciones \| BRAYTON SRL” y usar el template del layout sin repetir “BRAYTON SRL”. | Media |
| **Nosotros** | Añadir una frase corta de CTA bajo “¿Quiere conocer más?” con botón a Contacto (no solo texto). | Media |
| **Contacto** | Incluir breve texto sobre plazo de respuesta (ej. “Respondemos en menos de 24 h”) para generar confianza. | Baja |
| **404** | La página not-found está correcta; opcionalmente enlazar a Servicios, Proyectos y Contacto para reconducir. | Baja |

---

## 5. Accesibilidad y usabilidad

- **Header:** `aria-label`, `aria-expanded` en menús, cierre con Escape y bloqueo de scroll en móvil están bien.
- **Formulario contacto:** Campos con `name`, `required` y placeholders; el combobox “Tipo de proyecto” tiene opciones claras.
- **Enlaces:** “BRAYTON SRL - Inicio”, “Acceder al panel”, “Solicitar cotización”, etc. son descriptivos.

**Recomendaciones adicionales:**

- Asegurar que todos los botones del carrusel (Anterior, Siguiente, Slide 1/2/3) tengan área de toque ≥ 44×44 px en móvil.
- Revisar contraste de “text-white/50” y “text-white/60” sobre fondos oscuros (WCAG AA).
- En páginas con muchas secciones (ej. detalle de servicio), mantener el TOC “En esta página” fijo o sticky en desktop para facilitar el salto entre secciones.

---

## 6. Perspectiva BRAYTON (empresa)

Como **BRAYTON**, el sitio debe transmitir:

1. **Seriedad técnica** — Cumplido con contenido de servicios, sectores y certificaciones.
2. **Un solo responsable (llave en mano)** — Reforzado en hero, servicios y metodología.
3. **Facilidad para el primer contacto** — CTA “Solicitar cotización” visible; formulario claro. Mejorable con CTAs al final de páginas largas y mensaje de respuesta en 24 h.
4. **Presencia en Salta y región** — Aparece en textos; se puede reforzar en hero o footer con “Salta, Argentina” o “Noroeste Argentino”.
5. **Confianza** — Testimonios, cifras (5+ años, 150+ proyectos) y certificaciones ayudan. Añadir enlace “Certificaciones” en nav si se quiere destacar más.

---

## 7. Checklist de implementación sugerida

**Alta prioridad**

- [ ] Breadcrumbs en páginas interiores (servicios, servicio detalle, proyectos, proyecto detalle).
- [ ] Estado activo del ítem actual en la navegación del header.

**Media prioridad**

- [ ] Ajustar redacción del hero (“Desde 2020. Años de excelencia.” o “20 años”).
- [ ] Revisar y acortar `title` en detalle de servicio (evitar doble “BRAYTON SRL”).
- [ ] Bloque CTA final “¿Hablamos de su proyecto?” en Nosotros, Sectores y detalle de servicios.
- [ ] Mejorar tamaño/área clickeable de indicadores del carrusel y mensajes del formulario de contacto.

**Baja prioridad**

- [ ] Unificar “Noticias” / “Blog” (etiqueta y ruta).
- [ ] Considerar “Certificaciones” en nav principal.
- [ ] Texto en Contacto sobre tiempo de respuesta (ej. 24 h).
- [ ] Revisar contraste de textos grises en footer y botones del carrusel (WCAG).

---

*Análisis realizado tras navegación completa del sitio en entorno de desarrollo (Next.js). Ajustar prioridades según roadmap y recursos de BRAYTON.*
