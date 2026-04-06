import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const sectors = await sql`SELECT * FROM cms_sectors ORDER BY sort_order ASC`;
    return NextResponse.json(sectors);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json({ error: 'Error al obtener sectores' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, icon, color, sort_order } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Nombre y descripción son requeridos' },
        { status: 400 }
      );
    }

    const sector = await sql`
      INSERT INTO cms_sectors (name, description, icon, color, sort_order, created_at, updated_at)
      VALUES (${name}, ${description}, ${icon || ''}, ${color || '#000000'}, ${sort_order || 0}, NOW(), NOW())
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
    const { id, name, description, icon, color, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const sector = await sql`
      UPDATE cms_sectors 
      SET name = ${name}, 
          description = ${description},
          icon = ${icon},
          color = ${color},
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
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM cms_sectors WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sector:', error);
    return NextResponse.json({ error: 'Error al eliminar sector' }, { status: 500 });
  }
}
