# BRAYTON SRL — Web lista y funcional

## Estado actual

- **Sitio público:** Next.js (inicio, nosotros, servicios, proyectos, contacto, etc.)
- **Dashboard:** Login + panel por roles (empleados, clientes, facturas, etc.)
- **API:** Express en puerto 4000
- **Base de datos:** SQLite (`prisma/dev.db`) — **sin instalar PostgreSQL ni Docker**

---

## Cómo usar (ya está corriendo)

Si ejecutaste todo desde aquí:

1. **Web:** http://localhost:3000  
2. **Login:** http://localhost:3000/login  

**Usuario administrador:**  
- Email: `admin@braytonsrl.com.ar`  
- Clave: `Admin123!`

Otros usuarios (clave `Test123!`): ver lista en `prisma/seed.js` o en la consola al hacer `npm run db:seed`.

---

## Si reinicias el equipo o cierras la terminal

En la carpeta del proyecto:

```bash
npm run dev:all
```

Eso levanta la web (3000) y la API (4000). La base de datos ya está creada en `prisma/dev.db`.

---

## Si algo falla o quieres resetear la base

1. Cierra todo (Ctrl+C en la terminal donde corre `dev:all`).
2. Ejecuta:
   ```bash
   npm run setup
   ```
   (genera Prisma, crea tablas y vuelve a cargar usuarios de prueba).
3. Vuelve a arrancar:
   ```bash
   npm run dev:all
   ```

---

## Scripts útiles

| Comando        | Qué hace                          |
|----------------|-----------------------------------|
| `npm run dev:all` | Web + API a la vez              |
| `npm run setup`   | Crea/resetea la base y usuarios |
| `npm run dev`     | Solo web (Next.js)              |
| `npm run api:dev` | Solo API (Express)              |
| `npm run build`   | Build de producción (Next)      |

---

## Producción (opcional)

Para usar **PostgreSQL** en lugar de SQLite:

1. En `prisma/schema.prisma` cambia:
   - `provider = "sqlite"` → `provider = "postgresql"`
   - `url = "file:./dev.db"` → `url = env("DATABASE_URL")`
2. Vuelve a poner los tipos `@db.Decimal(...)` donde los habíamos quitado (ver historial del archivo).
3. Define `DATABASE_URL` en el servidor (ej. variable de entorno).
4. Ejecuta `npm run db:push` (o migraciones) en el servidor.

---

*Proyecto listo para usar en desarrollo con un solo comando: `npm run dev:all`.*
