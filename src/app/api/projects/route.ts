import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const projects = await sql`SELECT * FROM projects ORDER BY featured DESC, created_at DESC LIMIT 50`;
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, image_url, client, location, year, featured, details } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      );
    }

    const project = await sql`
      INSERT INTO projects (title, description, category, image_url, client, location, year, featured, details, created_at, updated_at)
      VALUES (${title}, ${description}, ${category || ''}, ${image_url || ''}, ${client || ''}, ${location || ''}, ${year || new Date().getFullYear()}, ${featured || false}, ${details || ''}, NOW(), NOW())
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
    const { id, title, description, category, image_url, client, location, year, featured, details } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const project = await sql`
      UPDATE projects 
      SET title = ${title}, 
          description = ${description},
          category = ${category},
          image_url = ${image_url},
          client = ${client},
          location = ${location},
          year = ${year},
          featured = ${featured},
          details = ${details},
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Error al eliminar proyecto' }, { status: 500 });
  }
}
