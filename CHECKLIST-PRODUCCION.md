# Checklist producción – BRAYTON SRL

## ¿Estamos listos al 100% para producción?

### Sitio público (marketing + legales)
| Ítem | Estado |
|------|--------|
| Home, Nosotros, Servicios (con submenú y secciones), Sectores, Proyectos (con filtros), Certificaciones, Clientes, Blog, Contacto, Trabaja con nosotros | ✅ Completo |
| Términos y condiciones, Privacidad, Aviso legal (CUIT y domicilio reales) | ✅ Completo |
| Header responsivo (hamburguesa &lt; 1536px), Footer con CUIT | ✅ Completo |
| Formulario de contacto (envío a API) | ✅ Completo |
| Datos fiscales reales (CUIT 30-71683122-8, Salta) | ✅ Incluido |

**Conclusión sitio público:** Listo para producción una vez configurado el entorno (ver abajo).

---

### Dashboards ERP – nivel de desarrollo

| Módulo | Consulta (listado) | Alta / Edición / Baja en UI |
|--------|---------------------|-----------------------------|
| Inicio (métricas) | ✅ | N/A |
| Empleados | ✅ Tabla | ❌ No hay formularios |
| Sueldos y recibos | ✅ Tabla + descarga PDF | ❌ No hay formularios |
| Clientes | ✅ Tabla | ❌ No hay formularios |
| Proveedores | ✅ Tabla | ❌ No hay formularios |
| Proyectos | ✅ Tabla | ❌ No hay formularios |
| Facturación | ✅ Tabla | ❌ No hay formularios |
| Pagos | ✅ Tabla | ❌ No hay formularios |
| Usuarios | ✅ Tabla | ❌ No hay formularios |

- **Backend:** La API tiene POST/PATCH (y donde aplique DELETE) para todos estos recursos. La parte de “consulta” y “descarga de recibo” está cubierta.
- **Frontend dashboard:** Solo hay pantallas de **listado** (y en Sueldos, botón de descarga de PDF). No hay pantallas ni formularios para:
  - Crear empleado, cliente, proveedor, proyecto, factura, pago, usuario, recibo de sueldo.
  - Editar ninguno de los anteriores.
  - Dar de baja o eliminar.

**Conclusión dashboards:**  
- **Al 100% para consulta y descarga de recibos.**  
- **No al 100% para gestión (ABM):** faltan formularios y flujos de alta/edición/baja en el frontend.

---

### Antes de subir a producción

1. **Variables de entorno (producción)**
   - `JWT_SECRET` y `JWT_REFRESH_SECRET`: generar valores seguros (≥ 32 caracteres) y no usar los de ejemplo.
   - `DATABASE_URL`: apuntar a la base PostgreSQL de producción.
   - `FRONTEND_URL`: URL real del frontend (ej. `https://braytonsrl.com.ar`).
   - `NEXT_PUBLIC_API_URL`: URL de la API en producción (ej. `https://api.braytonsrl.com.ar` o la que usen).
   - `NEXT_PUBLIC_SITE_URL`: URL del sitio (ej. `https://braytonsrl.com.ar`).

2. **CORS (API)**  
   - Incluir en orígenes permitidos la URL real del frontend de producción.

3. **Base de datos**  
   - Ejecutar migraciones/Prisma en el servidor de producción y, si aplica, seed inicial.

4. **Opcional para dashboards “completos”**  
   - Si se requiere gestión desde la web: implementar en el frontend formularios y pantallas de alta/edición (y baja donde corresponda) que consuman los endpoints ya existentes de la API.

---

### Resumen directo

- **Sitio público:** listo para producción al 100% (con .env y CORS de producción configurados).
- **Dashboards:** al 100% para **ver** datos y descargar recibos; **no** al 100% para **gestionar** (crear/editar/eliminar) porque esas pantallas no están desarrolladas en el frontend.
