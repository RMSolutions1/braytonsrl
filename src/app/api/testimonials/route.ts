import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const testimonials = await sql`SELECT * FROM testimonials WHERE published = true ORDER BY featured DESC, created_at DESC`;
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, company, content, rating, image_url, featured, published } = body;

    if (!author || !content) {
      return NextResponse.json(
        { error: 'Autor y contenido son requeridos' },
        { status: 400 }
      );
    }

    const testimonial = await sql`
      INSERT INTO testimonials (author, company, content, rating, image_url, featured, published, created_at, updated_at)
      VALUES (${author}, ${company || ''}, ${content}, ${rating || 5}, ${image_url || ''}, ${featured || false}, ${published !== false}, NOW(), NOW())
      RETURNING *
    `;

    return NextResponse.json(testimonial[0], { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, author, company, content, rating, image_url, featured, published } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    const testimonial = await sql`
      UPDATE testimonials 
      SET author = ${author}, 
          company = ${company},
          content = ${content},
          rating = ${rating},
          image_url = ${image_url},
          featured = ${featured},
          published = ${published},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(testimonial[0]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
    }

    await sql`DELETE FROM testimonials WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 });
  }
}
