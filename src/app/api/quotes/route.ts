import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, services, description, budget } = body;

    if (!name || !email || !services || !description) {
      return NextResponse.json(
        { error: 'Campos requeridos incompletos' },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO quote_requests (name, email, phone, company, services, description, budget, status, created_at)
      VALUES (${name}, ${email}, ${phone || ''}, ${company || ''}, ${services}, ${description}, ${budget || ''}, 'new', NOW())
    `;

    return NextResponse.json(
      { message: 'Cotización solicitada correctamente' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in quotes API:', error);
    return NextResponse.json(
      { error: 'Error al procesar la cotización' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const quotes = await sql`SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 100`;
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Error al obtener cotizaciones' }, { status: 500 });
  }
}
