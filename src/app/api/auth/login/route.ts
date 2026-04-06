import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Credenciales de admin por defecto (fallback)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Brayton2024!';
const ADMIN_ROLE = 'Administrador';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    let user = null;

    // Intentar autenticar con la base de datos primero
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Verificar si la tabla existe y obtener el usuario
        const users = await sql`
          SELECT id, username, password_hash, role FROM admin_users 
          WHERE username = ${username} AND active = true
        `;

        if (users.length > 0) {
          const dbUser = users[0];
          const isPasswordValid = await bcrypt.compare(password, dbUser.password_hash);
          
          if (isPasswordValid) {
            user = {
              id: dbUser.id,
              username: dbUser.username,
              role: dbUser.role
            };
          }
        }
      } catch (dbError) {
        console.error('[v0] Error de base de datos, usando fallback:', dbError);
        // Continuar con el fallback
      }
    }

    // Fallback: autenticación con credenciales hardcodeadas
    if (!user && username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      user = {
        id: 1,
        username: ADMIN_USERNAME,
        role: ADMIN_ROLE
      };
    }

    // Si no se autenticó de ninguna manera
    if (!user) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Crear respuesta con cookie de sesión
    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        } 
      },
      { status: 200 }
    );

    // Establecer cookie segura
    const token = Buffer.from(
      JSON.stringify({ 
        id: user.id, 
        username: user.username, 
        role: user.role,
        iat: Date.now()
      })
    ).toString('base64');

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[v0] Error en login:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
