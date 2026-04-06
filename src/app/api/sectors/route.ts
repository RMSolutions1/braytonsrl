import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const sectors = await sql`SELECT * FROM cms_sectors WHERE is_active = true ORDER BY display_order ASC`;
    return NextResponse.json(sectors);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json({ error: 'Error al obtener sectores' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, short_description, full_description, icon, image_url, display_order, is_active } = body;

    if (!title || !short_description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const sector = await sql`
      INSERT INTO cms_sectors (title, slug, short_description, full_description, icon, image_url, display_order, is_active, created_at, updated_at)
      VALUES (${title}, ${generatedSlug}, ${short_description}, ${full_description || ''}, ${icon || ''}, ${image_url || ''}, ${display_order || 0}, ${is_active !== false}, NOW(), NOW())
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
    const { id, title, slug, short_description, full_description, icon, image_url, display_order, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const sector = await sql`
      UPDATE cms_sectors 
      SET title = ${title}, 
          slug = ${slug},
          short_description = ${short_description},
          full_description = ${full_description},
          icon = ${icon},
          image_url = ${image_url},
          display_order = ${display_order},
          is_active = ${is_active},
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
