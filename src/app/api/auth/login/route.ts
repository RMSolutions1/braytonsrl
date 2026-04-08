import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType = 'admin' } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Correo y contraseña son requeridos' },
        { status: 400 }
      );
    }

    let user = null;
    let redirectUrl = '/dashboard';

    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      try {
        if (userType === 'admin') {
          // Autenticar administrador desde admin_users
          const users = await sql`
            SELECT id, email, password_hash, role, status FROM admin_users 
            WHERE email = ${email} AND status = 'active'
          `;

          if (users.length > 0) {
            const dbUser = users[0];
            const isPasswordValid = await bcrypt.compare(password, dbUser.password_hash);
            
            if (isPasswordValid) {
              user = {
                id: dbUser.id,
                email: dbUser.email,
                userType: 'admin',
                role: dbUser.role
              };
              redirectUrl = '/dashboard';
            }
          }
        } else if (userType === 'provider') {
          // Autenticar proveedor desde providers
          const providers = await sql`
            SELECT id, email, password_hash, company_name, status FROM providers 
            WHERE email = ${email} AND status = 'active'
          `;

          if (providers.length > 0) {
            const provider = providers[0];
            const isPasswordValid = await bcrypt.compare(password, provider.password_hash);
            
            if (isPasswordValid) {
              user = {
                id: provider.id,
                email: provider.email,
                userType: 'provider',
                name: provider.company_name
              };
              redirectUrl = '/provider-dashboard';
            }
          }
        } else if (userType === 'employee') {
          // Autenticar empleado desde employees
          const employees = await sql`
            SELECT id, email, password_hash, full_name, status FROM employees 
            WHERE email = ${email} AND status = 'active'
          `;

          if (employees.length > 0) {
            const employee = employees[0];
            const isPasswordValid = await bcrypt.compare(password, employee.password_hash);
            
            if (isPasswordValid) {
              user = {
                id: employee.id,
                email: employee.email,
                userType: 'employee',
                name: employee.full_name
              };
              redirectUrl = '/employee-dashboard';
            }
          }
        } else if (userType === 'client') {
          // Autenticar cliente desde clients
          const clients = await sql`
            SELECT id, email, password_hash, full_name, status FROM clients 
            WHERE email = ${email} AND status = 'active'
          `;

          if (clients.length > 0) {
            const client = clients[0];
            const isPasswordValid = await bcrypt.compare(password, client.password_hash);
            
            if (isPasswordValid) {
              user = {
                id: client.id,
                email: client.email,
                userType: 'client',
                name: client.full_name
              };
              redirectUrl = '/client-dashboard';
            }
          }
        }
      } catch (dbError) {
        console.error('[v0] Error de base de datos:', dbError);
      }
    }

    // Si no se autenticó
    if (!user) {
      return NextResponse.json(
        { error: 'Correo o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Crear respuesta con cookie de sesión
    const response = NextResponse.json(
      { 
        success: true,
        redirectUrl,
        user: { 
          id: user.id, 
          email: user.email,
          userType: user.userType,
          role: user.role,
          name: user.name
        } 
      },
      { status: 200 }
    );

    // Establecer cookie segura
    const token = Buffer.from(
      JSON.stringify({ 
        id: user.id,
        email: user.email,
        userType: user.userType,
        role: user.role,
        name: user.name,
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
