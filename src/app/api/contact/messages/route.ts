import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';

    let query;
    if (status === 'pending') {
      query = sql`SELECT * FROM contact_messages WHERE is_active = true ORDER BY created_at DESC`;
    } else if (status === 'responded') {
      query = sql`SELECT * FROM contact_messages WHERE is_active = false ORDER BY responded_at DESC`;
    } else {
      query = sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    }

    const messages = await query;
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Error al obtener mensajes' },
      { status: 500 }
    );
  }
}
