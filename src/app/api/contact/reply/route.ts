import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Crear el transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true para 465 (SSL)
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

    // Verificar configuración SMTP
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP configuration missing');
      return NextResponse.json(
        { error: 'Configuración de email no disponible. Contacte al administrador.' },
        { status: 500 }
      );
    }

    // Enviar el email de respuesta
    await transporter.sendMail({
      from: `"BRAYTON SRL" <${process.env.SMTP_USER}>`,
      to: message.email,
      subject: `Respuesta a tu consulta - BRAYTON SRL`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1E3A5F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">BRAYTON SRL</h1>
            <p style="color: #FF6B35; margin: 5px 0 0 0; font-size: 14px;">Construcción e Infraestructura</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="margin-top: 0;">Estimado/a <strong>${message.name}</strong>,</p>
            
            <p>Gracias por contactarte con nosotros. A continuación nuestra respuesta:</p>
            
            <div style="background-color: white; padding: 20px; border-left: 4px solid #FF6B35; margin: 20px 0; border-radius: 4px;">
              ${replyText.replace(/\n/g, '<br />')}
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px;">
              <strong>Tu mensaje original:</strong><br>
              <em>"${message.message.substring(0, 200)}${message.message.length > 200 ? '...' : ''}"</em>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="margin-bottom: 0;">Saludos cordiales,</p>
            <p style="margin-top: 5px;"><strong>Equipo BRAYTON SRL</strong></p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
              <p style="margin: 0;">
                <strong>BRAYTON SRL</strong><br>
                Construcción e Infraestructura<br>
                Tel: +54 387 4498588<br>
                Email: contacto@braytonsrl.com.ar<br>
                Salta, Argentina
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Actualizar el mensaje como respondido
    await sql`
      UPDATE contact_messages 
      SET admin_notes = ${replyText}, 
          responded_at = NOW(),
          status = 'responded',
          updated_at = NOW()
      WHERE id = ${messageId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending reply:', error);
    return NextResponse.json(
      { error: 'Error al enviar la respuesta. Verifica la configuración del servidor de email.' },
      { status: 500 }
    );
  }
}
