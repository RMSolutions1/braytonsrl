import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, position, experience, cv_url, message } = body;

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: 'Nombre, email y posición son requeridos' },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO job_applications (name, email, phone, position, experience, cv_url, message, status, created_at)
      VALUES (${name}, ${email}, ${phone || ''}, ${position}, ${experience || ''}, ${cv_url || ''}, ${message || ''}, 'new', NOW())
    `;

    return NextResponse.json(
      { message: 'Solicitud enviada correctamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in applications API:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await sql`SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 100`;
    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Error al obtener solicitudes' }, { status: 500 });
  }
}
