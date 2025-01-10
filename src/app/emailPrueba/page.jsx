"use client"

export default function emailPrueba() {
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

      

      return(
        <h1 onClick={sendEmails}>Email de prueba</h1>
      )
}

