import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configurar el email
    const mailOptions = {
      from: `"La Casa de la Bendición" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `📬 Nuevo contacto desde el sitio web - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #1f2937;
                background-color: #f3f4f6;
                padding: 20px;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
              }
              .header p {
                color: #d1d5db;
                font-size: 14px;
                margin: 0;
              }
              .content {
                padding: 40px 30px;
              }
              .greeting {
                font-size: 18px;
                color: #111827;
                margin-bottom: 20px;
                font-weight: 600;
              }
              .intro {
                color: #6b7280;
                margin-bottom: 30px;
                font-size: 15px;
              }
              .field {
                margin-bottom: 24px;
                padding: 20px;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 4px solid #1f2937;
              }
              .field-label {
                font-weight: 600;
                color: #1f2937;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
                display: block;
              }
              .field-value {
                color: #374151;
                font-size: 15px;
                word-wrap: break-word;
              }
              .field-value a {
                color: #1f2937;
                text-decoration: none;
              }
              .message-box {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #1f2937;
                margin-top: 30px;
              }
              .message-box .field-label {
                margin-bottom: 12px;
              }
              .message-content {
                color: #374151;
                font-size: 15px;
                line-height: 1.7;
                white-space: pre-wrap;
              }
              .footer {
                background: #f9fafb;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
              }
              .footer p {
                color: #6b7280;
                font-size: 13px;
                margin: 8px 0;
              }
              .date {
                color: #9ca3af;
                font-size: 12px;
                font-weight: 500;
              }
              .reply-button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                background: #1f2937;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>La Casa de la Bendición</h1>
                <p>Nuevo mensaje de contacto</p>
              </div>
              
              <div class="content">
                <p class="greeting">¡Hola! 👋</p>
                <p class="intro">Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web:</p>
                
                <div class="field">
                  <span class="field-label">Nombre</span>
                  <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="field-label">Email</span>
                  <div class="field-value">
                    <a href="mailto:${email}">${email}</a>
                  </div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <span class="field-label">Teléfono</span>
                  <div class="field-value">
                    <a href="tel:${phone}">${phone}</a>
                  </div>
                </div>
                ` : ''}
                
                <div class="message-box">
                  <span class="field-label">Mensaje</span>
                  <div class="message-content">${message}</div>
                </div>
                
                <center>
                  <a href="mailto:${email}" class="reply-button">Responder a ${name}</a>
                </center>
              </div>
              
              <div class="footer">
                <p><strong>La Casa de la Bendición</strong></p>
                <p>Este mensaje fue enviado desde lacasadelabendicion.com</p>
                <p class="date">${new Date().toLocaleString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'America/Argentina/Buenos_Aires' 
                })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    );
  }
}
