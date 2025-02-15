'use client'

import { useFetchBackend } from "@/hooks/useFetchApi";


export default function SendEmails(idProyecto, usuario, nombre_proyecto){

    const sendEmails = async () => {
        let destinatarios = []
        try {
          const result = await useFetchBackend(`getEmails?emails=${["analista_asigna_ipsum_id"]}&id_proyecto=${idProyecto}`, "GET")

          console.log(result)

          for (let i = 0; i < result.emails.length; i++) {
            for (const [clave, valor] of Object.entries(result.emails[i])) {
              destinatarios.push(valor);
        
            }
          }


          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipients: destinatarios,
                subject: `Proyecto Creado`,
                content: `<p>${usuario} ha creado el proyecto: "${nombre_proyecto}" y se encuentra en la etapa de preanálisis. <br /> <p>Por favor corroborar la información en el sistema</p>`
            })
    
          });
      
          const data = await response.json();
          console.log('Respuesta:', data);

          for(let i = 0; i < result.emails.length; i++) {
            await useFetchBackend("insertNoti", "POST", {message: `${usuario} ha creado el proyecto: "${nombre_proyecto}" y se encuentra en la etapa de preanálisis.`, user_id: result.ids[i], time: new Date()})
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }; 

    sendEmails()
}