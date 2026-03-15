# Base de datos — BRAYTON SRL

El login y el dashboard necesitan PostgreSQL. El error `Can't reach database server at localhost:5433` significa que la base de datos no está corriendo.

---

## Opción 1: Con Docker (recomendado)

1. **Abre Docker Desktop** y espera a que esté en marcha.

2. En la raíz del proyecto ejecuta:
   ```bash
   docker-compose up -d db
   ```
   Esto inicia solo PostgreSQL en el puerto **5433**.

3. En tu **`.env`** debe estar:
   ```env
   DATABASE_URL="postgresql://brayton:brayton_secret@localhost:5433/brayton?schema=public"
   ```

4. Crea tablas y datos de prueba:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Vuelve a intentar el login.

---

## Opción 2: PostgreSQL instalado en tu PC

Si tienes PostgreSQL instalado (sin Docker):

1. Crea una base de datos y usuario, por ejemplo:
   - Base de datos: `brayton`
   - Usuario: `brayton` (o el que uses)
   - Contraseña: la que definas

2. En **`.env`** pon la URL con el **puerto que use tu PostgreSQL** (suele ser **5432**):
   ```env
   DATABASE_URL="postgresql://brayton:TU_PASSWORD@localhost:5432/brayton?schema=public"
   ```

3. Luego:
   ```bash
   npm run db:push
   npm run db:seed
   ```

---

## Resumen

| Origen de la DB | Puerto | DATABASE_URL (ejemplo) |
|-----------------|--------|------------------------|
| Docker (`docker-compose up -d db`) | 5433 | `postgresql://brayton:brayton_secret@localhost:5433/brayton?schema=public` |
| PostgreSQL local | 5432 | `postgresql://usuario:password@localhost:5432/brayton?schema=public` |

Después de que la base esté corriendo y hayas ejecutado `db:push` y `db:seed`, el login debería funcionar.
