# Auditoría exhaustiva del proyecto BRAYTONSRL

**Fecha:** 14 de marzo de 2025  
**Alcance:** Código fuente, configuración, seguridad, consistencia y buenas prácticas.

---

## 1. Resumen ejecutivo

El proyecto es un **monorepo** con:
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **Backend:** API Express (Node.js) en JavaScript en `server/`.
- **Base de datos:** PostgreSQL con Prisma 5.
- **Otros:** Tema WordPress en `wordpress-theme/`, Docker para API + DB.

**Estado general:** El build y el lint pasan correctamente. Se detectaron **errores e inconsistencias** que conviene corregir (seguridad, validación, configuración y mantenibilidad).

---

## 2. Hallazgos críticos (prioridad alta)

### 2.1 Falta de `.gitignore`

**Problema:** No existe archivo `.gitignore` en la raíz del proyecto.

**Riesgo:** Riesgo de subir a control de versiones:
- `.env` (secretos: `JWT_SECRET`, `DATABASE_URL`, etc.)
- `node_modules/`
- `.next/`
- `uploads/`
- Archivos de IDE y sistema.

**Recomendación:** Crear `.gitignore` con entradas estándar para Node, Next.js, Prisma, IDE y `.env`.

---

### 2.2 Validación omitida en POST `/api/auth/logout`

**Ubicación:** `server/src/routes/auth.js` (ruta `POST /logout`).

**Problema:** Se usa `body('refreshToken').notEmpty()` pero **no se comprueba `validationResult(req)`** antes de usar `req.body.refreshToken`. Si se envía un body vacío o sin `refreshToken`, se ejecuta:

```js
await prisma.refreshToken.deleteMany({ where: { token: req.body.refreshToken } });
```

Con `req.body.refreshToken` posiblemente `undefined`, el comportamiento con Prisma puede ser inesperado (p.ej. no borrar el token correcto o respuestas confusas).

**Recomendación:** Añadir al inicio del handler de logout:

```js
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
```

---

### 2.3 Posible path traversal en descarga de documentos

**Ubicación:** `server/src/routes/documents.js`, ruta `GET /download/:fileKey`.

**Problema:** Se construye la ruta con:

```js
const filePath = path.join(uploadsDir, req.params.fileKey);
```

Si `fileKey` contiene secuencias como `../` (p. ej. `../../etc/passwd`), un atacante podría intentar leer archivos fuera de `uploadsDir`.

**Recomendación:** Normalizar y validar `fileKey` antes de usarlo, por ejemplo con `path.resolve` y comprobar que el resultado sigue bajo `uploadsDir`, o rechazar cualquier `fileKey` que contenga `..` o sea absoluto.

---

### 2.4 Secretos JWT por defecto en producción

**Ubicación:** `server/src/middleware/auth.js` y `server/src/routes/auth.js`.

**Problema:** Si no se definen `JWT_SECRET` o `JWT_REFRESH_SECRET` en el entorno, se usan valores por defecto:

- `JWT_SECRET || 'change-me-in-production'`
- `JWT_REFRESH_SECRET || 'refresh-change-me'`

**Recomendación:** En producción, no arrancar la API si faltan estas variables o si son exactamente esos valores; lanzar un error al inicio y documentar el uso de secretos fuertes y únicos.

---

## 3. Hallazgos importantes (prioridad media)

### 3.1 Seed de Prisma sin carga de `.env`

**Ubicación:** `prisma/seed.js`.

**Problema:** El seed se ejecuta con `node prisma/seed.js` (script `db:seed` en `package.json`). No se carga `dotenv`, por lo que `DATABASE_URL` depende solo del entorno. En entornos donde no se exporta (p. ej. solo existe en `.env`), el seed fallará.

**Recomendación:** Añadir al inicio de `prisma/seed.js`:

```js
import 'dotenv/config';
```

(o usar `prisma db seed` definiendo el comando en `schema.prisma` y asegurando que Prisma inyecte el entorno).

---

### 3.2 Inconsistencia en uso del cliente API en el frontend

**Ubicación:** `src/lib/api.ts` vs `src/app/login/page.tsx` y `src/app/dashboard/layout.tsx`.

**Problema:**
- `api.ts` exporta `api()`, `setTokens()`, `clearTokens()` y `API_URL`.
- La página de **login** hace `fetch` directo a la API y guarda tokens en `localStorage` manualmente, sin usar `setTokens()` ni `api()`.
- El **dashboard** en logout hace `localStorage.removeItem(...)` manual en lugar de usar `clearTokens()`.

**Recomendación:** Unificar: usar `api()` y `setTokens()` en el login, y `clearTokens()` en el logout para mantener un solo punto de verdad y facilitar cambios futuros (p. ej. cookies o otro almacenamiento).

---

### 3.3 Error handler del servidor y `statusCode`

**Ubicación:** `server/src/middleware/errorHandler.js`.

**Problema:** Se usa `err.statusCode || 500`. En Express, los errores pasados con `next(err)` no tienen `statusCode` por defecto. Si en las rutas no se asigna `err.statusCode` (p. ej. 400, 404), siempre se responderá 500.

**Recomendación:** En rutas que quieran devolver 400/404, usar algo como:

```js
const e = new Error('No encontrado');
e.statusCode = 404;
next(e);
```

O definir convenciones y aplicarlas en el error handler (p. ej. mapear nombres de error a códigos).

---

### 3.4 Formulario de contacto: mensaje no persistido

**Ubicación:** `server/src/routes/contact.js`.

**Problema:** Los datos del formulario solo se registran con `console.log`. No se guardan en base de datos ni se envía email. El usuario recibe mensaje de éxito pero no hay trazabilidad.

**Recomendación:** Decidir flujo (BD, email, o ambos) e implementarlo; si se mantiene solo log, dejarlo documentado y considerar limitar rate por IP.

---

### 3.5 Tailwind: directorio `src/pages` en `content`

**Ubicación:** `tailwind.config.ts`.

**Problema:** En `content` aparece `'./src/pages/**/*.{js,ts,jsx,tsx,mdx}'`. El proyecto usa solo App Router (`src/app/`); no existe `src/pages/`. No genera errores pero es redundante.

**Recomendación:** Quitar la entrada `./src/pages/**/*` o añadirla solo si en el futuro se usan páginas en `pages/`.

---

## 4. Hallazgos menores y recomendaciones

### 4.1 Sin tests automatizados

No hay configuración de Jest, Vitest ni carpeta de tests en `src/` o `server/`. No hay cobertura ni regresión automatizada.

**Recomendación:** Introducir al menos tests para rutas críticas (auth, documentos) y para utilidades compartidas.

---

### 4.2 Prisma sin migraciones versionadas

Solo se usa `db:push`; no hay carpeta `prisma/migrations/`. El script `db:migrate` existe pero no hay migraciones en el repo.

**Recomendación:** Para entornos compartidos y producción, usar `prisma migrate dev` y versionar migraciones en el repositorio.

---

### 4.3 API en JavaScript y frontend en TypeScript

El servidor está en JS; el frontend en TS. No es un error, pero limita el tipado y el autocompletado en la API.

**Recomendación:** Valorar migrar `server/` a TypeScript o al menos añadir JSDoc y comprobación de tipos donde sea posible.

---

### 4.4 Docker: credenciales de Postgres en `docker-compose.yml`

**Ubicación:** `docker-compose.yml`.

**Problema:** Usuario y contraseña de Postgres están en texto plano (`brayton` / `brayton_secret`). Aceptable para desarrollo; en producción deberían venir de variables de entorno o de un gestor de secretos.

**Recomendación:** Usar variables de entorno para `POSTGRES_USER`, `POSTGRES_PASSWORD` y `POSTGRES_DB` en entornos no locales.

---

### 4.5 `robots.ts`: desallow solo `/api/`

**Ubicación:** `src/app/robots.ts`.

**Observación:** `disallow: ['/api/']` en Next no afecta a la API Express (que corre en otro puerto). Si se quiere evitar indexar área privada, se puede añadir `'/dashboard'` y `'/login'` a `disallow`.

---

### 4.6 Duplicación de dependencias entre raíz y `server/`

La raíz tiene dependencias de la API (express, prisma, etc.) y `server/package.json` también. El Dockerfile construye desde la raíz y ejecuta `node server/src/index.js`, por lo que en Docker se usa la raíz. Si alguien ejecuta la API solo desde `server/` con `npm install` en `server/`, podría faltar contexto (p. ej. Prisma generado en raíz).

**Recomendación:** Documentar que la API debe ejecutarse desde la raíz (`npm run api` o `npm run api:dev`) o unificar dependencias y scripts para evitar confusión.

---

## 5. Comprobaciones realizadas (OK)

| Comprobación              | Resultado |
|---------------------------|-----------|
| `npm run lint`            | Sin errores ni warnings |
| `npm run build` (Next.js) | Compila correctamente (42 rutas) |
| TypeScript (frontend)     | Sin errores de tipos |
| Uso de `next(e)` en API   | Rutas pasan errores al middleware |
| Sitemap y robots          | Definidos y coherentes con rutas |
| Prisma schema             | Modelos y relaciones consistentes |
| CORS y Helmet             | Configurados en la API |

---

## 6. Checklist de acciones recomendadas

- [ ] **Crítico:** Crear `.gitignore` e incluir `.env`, `node_modules`, `.next`, `uploads`, etc.
- [ ] **Crítico:** Añadir `validationResult` en el handler de `POST /api/auth/logout`.
- [ ] **Crítico:** Sanitizar/validar `fileKey` en `GET /download/:fileKey` para evitar path traversal.
- [ ] **Alto:** Asegurar que en producción no se usen JWT por defecto; validar al arranque.
- [ ] **Medio:** Cargar `dotenv` en `prisma/seed.js` (o usar `prisma db seed` con env adecuado).
- [ ] **Medio:** Unificar uso de `api.ts` en login y logout (setTokens/clearTokens).
- [ ] **Medio:** Decidir e implementar persistencia/email para el formulario de contacto.
- [ ] **Bajo:** Añadir tests; usar Prisma Migrate; opcionalmente desindexar `/dashboard` y `/login` en robots.
- [ ] **Bajo:** Limpiar `content` de Tailwind (quitar `src/pages` si no se usa).

---

*Auditoría realizada de forma automática sobre el estado del repositorio en la fecha indicada. Revisar y adaptar a las políticas internas de seguridad y despliegue.*
