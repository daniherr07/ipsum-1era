'use client'

import { useFetchBackend } from "@/hooks/useFetchApi";


export default function SendEmails(id_analista, id_ingeniero, usuario, nombre_proyecto){

    const sendEmails = async () => {
        let emailAnalista
        let emailIngeniero
        try {
          const result = await useFetchBackend(`getEmails?id_analista=${id_analista}&id_ingeniero=${id_ingeniero}`, "GET")

          console.log(result)
          emailAnalista = result[0].correo_electronico
          emailIngeniero = result[1].correo_electronico

          console.log(emailAnalista, emailIngeniero)

          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipients: [emailAnalista, emailIngeniero],
                subject: `Nuevo proyecto asignado`,
                content: `<p>${usuario} ha creado un nuevo proyecto: "${nombre_proyecto}" y se le ha seleccionado como persona colaboradora. <br /> <p>Por favor corroborar la información en el sistema</p>`
            })
    
          });
      
          const data = await response.json();
          console.log('Respuesta:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      }; 

    sendEmails()
}