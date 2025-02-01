'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { useProtectedContext } from '@/app/context/ProtectedContext';
import { handleChange } from '@/utils/handleChange';



export default function UpdateProyectoStatus({idProyecto, currentStatus,nombreProyecto}) {
  const router = useRouter();
  const userData = useProtectedContext()



  const etapaPopup = (e) => {
    e.preventDefault()
    confirmAlert({
      closeOnClickOutside: false,
      customUI: ({ onClose }) => 
      <DeleteProyectoModal 
        onClose={onClose} 
        router={router} 
        idProyecto={idProyecto} 
        currentStatus={currentStatus}
        nombreProyecto={nombreProyecto}
        userData = {userData}
      />,
    })
  }

  return (
      <form style={{width: "100%"}}>
        <button onClick={etapaPopup} type="submit" className={styles.deleteProyectoBtn}>
          { currentStatus == 1 ? "Descartar Proyecto" : "Activar Proyecto"}
        </button>
      </form>
  );
}


function DeleteProyectoModal({ onClose, router, idProyecto, currentStatus, nombreProyecto, userData}) {

  const [inputData, setInputData] = useState({
    data: "",
    color: "#03579B",
  })

  const sendEmails = async () => {
    const Analista = "analista_asigna_ipsum_id"

    let destinatarios = []

    const result = await useFetchBackend(`getEmails?emails=analista_asigna_ipsum_id&id_proyecto=${idProyecto}`, "GET")

    for (let i = 0; i < result.emails.length; i++) {
      for (const [clave, valor] of Object.entries(result.emails[i])) {
        destinatarios.push(valor);
  
      }
    }

    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipients: destinatarios,
            subject: `Actualizacion de estado del proyecto "${nombreProyecto}"`,
            content: `<h1>El proyecto "${nombreProyecto}" ha sido ${currentStatus == 1 ? "eliminado" : "reactivado"} por el usuario ${userData.userName}</h1><p>Por favor corroborar la información</p>`
        })

      });
  
      const data = await response.json();
      console.log('Respuesta:', data);

      for(let i = 0; i < result.emails.length; i++) {
        await useFetchBackend("insertNoti", "POST", {message: `El proyecto "${nombreProyecto}" ha sido ${currentStatus == 1 ? "eliminado" : "reactivado"} por el usuario ${userData.userName}`, user_id: result.ids[i]})
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }; 


  const [etapaEdit, setEtapaEdit] = useState({
    id: idProyecto,
    currentStatus: currentStatus
  })

  

  const updateChanges = async () => {
    const newEntryData = {
      usuario: userData.id, 
      proyecto: idProyecto,
      time: new Date(),
      tipo: "Técnico",
      color: inputData.color,
      descripcion: `Se ha ${currentStatus == 1 ? "desactivado" : "activado"} el proyecto "${nombreProyecto}". Descripción: ${inputData.data}`
    }

    

    const response = await useFetchBackend("deleteProyecto", "POST", etapaEdit)


    if (response.errno) {
      return toast.error('Error al descartar proyecto');
    }

    if (inputData.data != "") {
      const responseBit = await useFetchBackend("insertBitacora", "POST", newEntryData)

      if (responseBit?.errno) {
        
        if (result.msj) {
          return toast.error(result.msj)
        }
  
        throw new Error('Error al guardar el proyecto');
      }

      toast.success("Entrada a bitacora exitosamente añadida")
    }

    

    toast.success(`Proyecto ${currentStatus == 1 ? "Desactivado" : "Activado"} Exitosamente`);
    onClose(); // Close the modal
    router.push("/protected/home")
    router.refresh(); // Refresh the page
    sendEmails()
  }



  return (
    <div className={styles.newUserModal}>
      <h1>¿Esta seguro de {currentStatus == 1 ? "descartar" : "activar"} el proyecto?</h1>
      <div style={{display: "flex", flexDirection: "column", placeContent: "center", placeItems: "center", gap: "1em"}}>
      
      <label htmlFor="">Añadir entrada para bitácora:</label>
      <textarea 
      placeholder='(Escriba para añadir una entrada si lo desea)' 
      name="data" 
      id="data" 
      value={inputData.data} 
      onChange={e => handleChange(e, setInputData)} 
      className={styles.bitacoraStyle}
      cols={60}
      rows={5}
      ></textarea>
      </div>

      {
        inputData.data != "" &&
        <>
        <label htmlFor="color">Color: </label>
          <select
            name="color"
            id="color"
            value={inputData.color}
            className={styles.newModalInput}
            onChange={e => handleChange(e, setInputData)}
            style={{width: "80%"}}
          >
              <option value="#03579B">
                Azul:  Todo correcto
              </option>

              <option value="#F4C400">
                Amarillo:  Priorizar 
              </option>

              <option value="#C91212">
                Rojo:  Priorizar con urgencia
              </option>

          </select>
        
        </>
      }
      

      <div className={styles.modalBtns}>
        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>
        <button className={styles.modalUpdate} onClick={updateChanges}>
          {currentStatus == 1 ? "Descartar" : "Activar"}
        </button>

      </div>
    </div>
  )
}