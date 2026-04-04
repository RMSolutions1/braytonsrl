import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario en la base de datos
    const users = await sql`
      SELECT id, username, password_hash, role FROM admin_users 
      WHERE username = ${username} AND active = true
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
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

    // Establecer cookie segura con token JWT simple
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
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
