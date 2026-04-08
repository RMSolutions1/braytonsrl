import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/admin'];
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // Ruta de login
  const isLoginRoute = request.nextUrl.pathname.startsWith('/admin/login');

  // Si es una ruta protegida
  if (isProtectedRoute && !isLoginRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verificar que el token sea válido
      const user = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

      // Pasar información del usuario al request
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', user.id);
      requestHeaders.set('x-user-role', user.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch {
      // Token inválido, redirigir al login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si está en login y ya tiene token, redirigir al dashboard
  if (isLoginRoute && request.cookies.get('admin_token')?.value) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
