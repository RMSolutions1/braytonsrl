import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';

    let messages;
    if (status === 'new') {
      messages = await sql`SELECT * FROM contact_messages WHERE status = 'new' ORDER BY created_at DESC`;
    } else if (status === 'read') {
      messages = await sql`SELECT * FROM contact_messages WHERE status = 'read' ORDER BY created_at DESC`;
    } else if (status === 'responded') {
      messages = await sql`SELECT * FROM contact_messages WHERE status = 'responded' ORDER BY responded_at DESC`;
    } else if (status === 'archived') {
      messages = await sql`SELECT * FROM contact_messages WHERE status = 'archived' ORDER BY updated_at DESC`;
    } else {
      messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID y status son requeridos' },
        { status: 400 }
      );
    }

    await sql`
      UPDATE contact_messages 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Error al actualizar mensaje' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    await sql`DELETE FROM contact_messages WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Error al eliminar mensaje' },
      { status: 500 }
    );
  }
}
