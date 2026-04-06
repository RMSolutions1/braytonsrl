import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Crear el transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messageId, replyText } = body;

    if (!messageId || !replyText) {
      return NextResponse.json(
        { error: 'ID del mensaje y respuesta son requeridos' },
        { status: 400 }
      );
    }

    // Obtener el mensaje de contacto
    const messages = await sql`
      SELECT * FROM contact_messages WHERE id = ${messageId}
    `;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Mensaje no encontrado' },
        { status: 404 }
      );
    }

    const message = messages[0];

    // Enviar el email de respuesta
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: message.email,
      subject: `Re: ${message.subject}`,
      html: `
        <h2>Respuesta a tu mensaje</h2>
        <p>Estimado/a ${message.name},</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #FF6B35;">
          ${replyText.replace(/\n/g, '<br />')}
        </div>
        <p>Saludos cordiales,<br/>
        <strong>BRAYTON SRL</strong><br/>
        Construcción e Infraestructura</p>
      `,
    });

    // Actualizar el mensaje como respondido
    await sql`
      UPDATE contact_messages 
      SET admin_notes = ${replyText}, 
          responded_at = NOW(),
          is_active = false
      WHERE id = ${messageId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json(
      { error: 'Error al enviar la respuesta' },
      { status: 500 }
    );
  }
}
