import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo de Gmail
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación de Gmail
  }
});

export async function POST(request) {

  try {
    const { recipients, subject, content } = await request.json();
    console.log(recipients)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(', '), // Convertir array de destinatarios a string
      subject: subject,
      html: content // Puedes usar HTML en el contenido
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      message: 'Emails sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ 
      message: 'Error sending emails',
      error: error.message 
    });
  }
}



/*
const sendEmails = async () => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: ['correo1@ejemplo.com', 'correo2@ejemplo.com'],
        subject: 'Asunto del correo',
        content: '<h1>Hola!</h1><p>Este es el contenido del correo</p>'
      })
    });

    const data = await response.json();
    console.log('Respuesta:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}; 
*/