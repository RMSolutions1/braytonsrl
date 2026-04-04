import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    try {
      const user = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
      return NextResponse.json({ authenticated: true, user });
    } catch {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error verificando sesión:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
