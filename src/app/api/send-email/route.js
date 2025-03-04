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
    console.error('Error sending emails en api/send-email:', error);
    return NextResponse.json({ 
      message: 'Error sending emails',
      error: error.message 
    });
  }
}

