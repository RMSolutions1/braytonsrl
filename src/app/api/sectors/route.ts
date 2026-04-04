import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const sectors = await sql`SELECT * FROM sectors ORDER BY sort_order ASC, created_at DESC`;
    return NextResponse.json(sectors);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json({ error: 'Error al obtener sectores' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, icon, image_url, details, sort_order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      );
    }

    const sector = await sql`
      INSERT INTO sectors (title, description, icon, image_url, details, sort_order, created_at, updated_at)
      VALUES (${title}, ${description}, ${icon || ''}, ${image_url || ''}, ${details || ''}, ${sort_order || 0}, NOW(), NOW())
      RETURNING *
    `;

    return NextResponse.json(sector[0], { status: 201 });
  } catch (error) {
    console.error('Error creating sector:', error);
    return NextResponse.json({ error: 'Error al crear sector' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, icon, image_url, details, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const sector = await sql`
      UPDATE sectors 
      SET title = ${title}, 
          description = ${description},
          icon = ${icon},
          image_url = ${image_url},
          details = ${details},
          sort_order = ${sort_order},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(sector[0]);
  } catch (error) {
    console.error('Error updating sector:', error);
    return NextResponse.json({ error: 'Error al actualizar sector' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM sectors WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sector:', error);
    return NextResponse.json({ error: 'Error al eliminar sector' }, { status: 500 });
  }
}
