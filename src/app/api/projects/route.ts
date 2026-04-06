import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const projects = await sql`SELECT * FROM cms_projects WHERE is_active = true ORDER BY display_order ASC`;
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, short_description, full_description, category, client, location, year, main_image_url, gallery_images, features, display_order, is_featured, is_active } = body;

    if (!title || !short_description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const project = await sql`
      INSERT INTO cms_projects (title, slug, short_description, full_description, category, client, location, year, main_image_url, gallery_images, features, display_order, is_featured, is_active, created_at, updated_at)
      VALUES (${title}, ${generatedSlug}, ${short_description}, ${full_description || ''}, ${category || ''}, ${client || ''}, ${location || ''}, ${year || new Date().getFullYear()}, ${main_image_url || ''}, ${JSON.stringify(gallery_images || [])}, ${JSON.stringify(features || [])}, ${display_order || 0}, ${is_featured || false}, ${is_active !== false}, NOW(), NOW())
      RETURNING *
    `;

    return NextResponse.json(project[0], { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, slug, short_description, full_description, category, client, location, year, main_image_url, gallery_images, features, display_order, is_featured, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const project = await sql`
      UPDATE cms_projects 
      SET title = ${title}, 
          slug = ${slug},
          short_description = ${short_description},
          full_description = ${full_description},
          category = ${category},
          client = ${client},
          location = ${location},
          year = ${year},
          main_image_url = ${main_image_url},
          gallery_images = ${JSON.stringify(gallery_images || [])},
          features = ${JSON.stringify(features || [])},
          display_order = ${display_order},
          is_featured = ${is_featured},
          is_active = ${is_active},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(project[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Error al actualizar proyecto' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM cms_projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Error al eliminar proyecto' }, { status: 500 });
  }
}
