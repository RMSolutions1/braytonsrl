# BRAYTON SRL — Arquitectura del sistema

## Visión general

Plataforma digital que integra:

1. **Sitio web corporativo** (público): Next.js, páginas estáticas y formulario de contacto conectado al API.
2. **Sistema ERP** (privado): dashboard por roles, gestión de empleados, sueldos, clientes, proveedores, proyectos, facturación y pagos.
3. **API REST**: Node.js + Express, autenticación JWT, base PostgreSQL con Prisma.

## Stack

| Capa        | Tecnología                    |
|------------|-------------------------------|
| Frontend   | Next.js 14 (App Router), React, Tailwind, Framer Motion |
| Backend    | Node.js, Express              |
| Base de datos | PostgreSQL, Prisma ORM    |
| Auth       | JWT (access + refresh), bcrypt |
| PDF        | PDFKit (recibos de sueldo)    |

## Estructura de carpetas

```
BRAYTONSRL/
├── prisma/
│   ├── schema.prisma    # Modelo de datos
│   └── seed.js          # Roles, permisos, usuario SuperAdmin
├── server/
│   └── src/
│       ├── index.js     # Entrada API
│       ├── lib/prisma.js
│       ├── middleware/  # auth, errorHandler
│       └── routes/      # auth, users, employees, payroll, clients, providers, projects, invoices, payments, documents, notifications, dashboard, contact
├── src/                 # Next.js
│   ├── app/             # Páginas públicas + /login + /dashboard/*
│   ├── components/
│   └── lib/api.ts       # Cliente API con tokens
├── uploads/             # Recibos PDF y documentos (generado en runtime)
├── docker-compose.yml
├── Dockerfile.api
└── package.json         # Scripts: dev, build, api, db:*
```

## Modelo de datos (resumen)

- **Role**, **Permission**, **RolePermission**: roles y permisos configurables.
- **User**: email, passwordHash, roleId, opcionalmente employeeId, clientId, providerId.
- **RefreshToken**: tokens de refresco.
- **Employee**: datos de empleado, cargo, área, salario.
- **Payroll**, **SalaryReceipt**: liquidaciones y PDF de recibos.
- **EmployeeDocument**: documentos del empleado (contrato, ART, etc.).
- **Client**, **Provider**: empresas y contactos.
- **Project**, **ProjectDocument**: obras y documentos de obra.
- **Invoice**, **Payment**: facturación y pagos.
- **Notification**: notificaciones por usuario.
- **CompanyDocument**: repositorio por categoría.

## Roles

| Rol               | Acceso principal                                              |
|-------------------|---------------------------------------------------------------|
| SuperAdmin        | Todo + usuarios y permisos                                   |
| Administrador     | Empleados, clientes, proveedores, proyectos, facturas, pagos |
| RRHH              | Empleados, sueldos, recibos                                   |
| Contabilidad      | Facturas, pagos                                               |
| Supervisor de obra| Proyectos                                                     |
| Empleado          | Solo su perfil y sus recibos                                  |
| Cliente           | Solo sus proyectos y facturas                                 |
| Proveedor         | Solo sus pagos                                                |

## Seguridad

- Contraseñas con bcrypt (factor 12).
- JWT access (15 min) + refresh (7 días), refresh almacenado en DB.
- Validación de entrada con express-validator.
- Helmet y CORS configurados.
- Rutas protegidas por rol en el API.

## Flujos principales

1. **Login**: POST /api/auth/login → accessToken + refreshToken + user; el frontend guarda tokens en localStorage y redirige a /dashboard.
2. **Recibos**: POST /api/payroll crea liquidación y genera PDF; GET /api/payroll/:id/receipt devuelve el PDF (requiere Authorization).
3. **Contacto web**: POST /api/contact recibe el formulario del sitio público (sin auth).
