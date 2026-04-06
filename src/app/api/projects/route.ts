import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const projects = await sql`SELECT * FROM cms_projects ORDER BY sort_order ASC`;
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, image_url, details, sector_id, sort_order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      );
    }

    const project = await sql`
      INSERT INTO cms_projects (title, description, image_url, details, sector_id, sort_order, created_at, updated_at)
      VALUES (${title}, ${description}, ${image_url || ''}, ${details || ''}, ${sector_id || null}, ${sort_order || 0}, NOW(), NOW())
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
    const { id, title, description, image_url, details, sector_id, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const project = await sql`
      UPDATE cms_projects 
      SET title = ${title}, 
          description = ${description},
          image_url = ${image_url},
          details = ${details},
          sector_id = ${sector_id || null},
          sort_order = ${sort_order},
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
