# Usuarios para probar el dashboard

Tras ejecutar `npm run db:seed`, quedan creados estos usuarios. Úsalos en **http://localhost:3000/login** (con la API y la base de datos en marcha).

| Rol | Email | Contraseña | Qué verás en el panel |
|-----|--------|------------|------------------------|
| **SuperAdmin** | admin@braytonsrl.com.ar | Admin123! | Todo: dashboard, empleados, sueldos, clientes, proveedores, proyectos, facturas, pagos, usuarios |
| **Administrador** | administrador@braytonsrl.com.ar | Test123! | Igual que SuperAdmin (sin gestión de usuarios) |
| **RRHH** | rrhh@braytonsrl.com.ar | Test123! | Inicio, Empleados, Sueldos y recibos |
| **Contabilidad** | contabilidad@braytonsrl.com.ar | Test123! | Inicio, Sueldos, Facturación, Pagos |
| **Supervisor de obra** | supervisor@braytonsrl.com.ar | Test123! | Inicio, Proyectos |
| **Empleado** | empleado@braytonsrl.com.ar | Test123! | Solo Sueldos y recibos (sus propios recibos) |
| **Cliente** | cliente@braytonsrl.com.ar | Test123! | Clientes (solo su empresa), Proyectos (suyos), Facturación (sus facturas) |
| **Proveedor** | proveedor@braytonsrl.com.ar | Test123! | Proveedores (solo su empresa), Pagos (sus pagos) |

**Datos de prueba vinculados al seed:**
- El usuario **Empleado** está asociado al empleado Juan Pérez (EMP-0001).
- El usuario **Cliente** está asociado a Constructora Demo S.A.
- El usuario **Proveedor** está asociado a Proveedores Industriales S.R.L.

Para volver a crear solo los usuarios y entidades de prueba, ejecuta de nuevo:

```bash
npm run db:seed
```

(El seed no borra usuarios existentes; solo crea los que falten.)
