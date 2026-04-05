import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL!);

// Esta ruta crea el usuario administrador inicial
// Solo funciona si no existe ningún admin
export async function GET() {
  try {
    // Primero, crear la tabla si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'Administrador',
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Verificar si ya existe un admin
    const existingAdmin = await sql`
      SELECT id FROM admin_users WHERE username = 'admin'
    `;

    if (existingAdmin.length > 0) {
      // Si existe, actualizar la contraseña con bcrypt
      const passwordHash = await bcrypt.hash('Brayton2024!', 12);
      
      await sql`
        UPDATE admin_users 
        SET password_hash = ${passwordHash}
        WHERE username = 'admin'
      `;

      return NextResponse.json({ 
        message: 'Contraseña del administrador actualizada',
        credentials: {
          username: 'admin',
          password: 'Brayton2024!'
        }
      });
    }

    // Crear hash de contraseña con bcrypt
    const passwordHash = await bcrypt.hash('Brayton2024!', 12);

    // Insertar usuario administrador
    await sql`
      INSERT INTO admin_users (username, password_hash, role, active)
      VALUES ('admin', ${passwordHash}, 'SuperAdmin', true)
      ON CONFLICT (username) DO UPDATE SET password_hash = ${passwordHash}
    `;

    return NextResponse.json({ 
      message: 'Usuario administrador creado exitosamente',
      credentials: {
        username: 'admin',
        password: 'Brayton2024!'
      }
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Error al crear usuario administrador', details: String(error) },
      { status: 500 }
    );
  }
}
