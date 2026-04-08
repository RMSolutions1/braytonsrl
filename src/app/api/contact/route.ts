import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO contact_messages (name, email, phone, company, project_type, message, status, created_at)
      VALUES (${name}, ${email}, ${phone || ''}, ${company || ''}, ${projectType || ''}, ${message}, 'new', NOW())
    `;

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100`;
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}
