# Credenciales de Administrador - BRAYTON SRL

## Acceso al Dashboard Administrativo

**URL de Acceso:** `/admin/login` o directamente a `/dashboard`

### Credenciales:

**Usuario:** `admin`

**Contraseña:** `Brayton2024!`

---

## Sistema de Autenticación

El sistema de autenticación está completamente funcional con las siguientes características:

### ✓ APIs de Autenticación
- **POST /api/auth/login** - Iniciar sesión con usuario y contraseña
- **POST /api/auth/logout** - Cerrar sesión
- **GET /api/auth/me** - Verificar estado de autenticación actual

### ✓ Protección de Rutas
- Todas las rutas `/dashboard/*` y `/admin/*` están protegidas
- Middleware de autenticación automático
- Redirección a login si no está autenticado

### ✓ Seguridad
- Contraseñas hasheadas con bcrypt
- Cookies HTTP-only y seguras
- Token basado en sesión
- Verificación automática de sesión

---

## Funcionalidades del Dashboard

Una vez autenticado, tendrás acceso a:

1. **Gestionar Servicios** - Crear, editar, eliminar servicios
2. **Gestionar Proyectos** - Administrar portafolio de proyectos
3. **Gestionar Sectores** - Configurar sectores industriales
4. **Mensajes de Contacto** - Ver formularios de contacto recibidos
5. **Cotizaciones** - Administrar solicitudes de cotización
6. **Solicitudes de Empleo** - Ver y gestionar aplicaciones de empleados

Toda la edición de contenido soporta carga de imágenes a través de Vercel Blob.

---

## Cambiar Contraseña (Opcional)

Para cambiar la contraseña después, ejecuta este SQL en la consola de Neon:

```sql
-- Generar nuevo hash de bcrypt para la nueva contraseña
-- Usando node: require('bcryptjs').hashSync('nueva_contraseña', 10)

UPDATE admin_users 
SET password_hash = '$2a$10$...' -- Nueva contraseña hasheada
WHERE username = 'admin';
```

---

**Última actualización:** 2026-04-04
