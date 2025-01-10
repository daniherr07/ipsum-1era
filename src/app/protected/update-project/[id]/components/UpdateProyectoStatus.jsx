'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function UpdateProyectoStatus({idProyecto, currentStatus,nombreProyecto}) {
  const router = useRouter();



  const etapaPopup = (e) => {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose }) => 
      <DeleteProyectoModal 
        onClose={onClose} 
        router={router} 
        idProyecto={idProyecto} 
        currentStatus={currentStatus}
        nombreProyecto={nombreProyecto}
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


function DeleteProyectoModal({ onClose, router, idProyecto, currentStatus, nombreProyecto}) {

  const sendEmails = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipients: ['dherrera2195@gmail.com', 'maxi.salsa@gmail.com'],
            subject: `Actualizacion de estado del proyecto ${nombreProyecto}`,
            content: `<h1>El proyecto "${nombreProyecto}" ha sido ${currentStatus == 1 ? "eliminado" : "reactivado"}</h1><p>Por favor corroborar la información</p>`
        })

      });
  
      const data = await response.json();
      console.log('Respuesta:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }; 


  const [etapaEdit, setEtapaEdit] = useState({
    id: idProyecto,
    currentStatus: currentStatus
  })

  const updateChanges = async () => {

    const response = await useFetchBackend("deleteProyecto", "POST", etapaEdit)


    if (response.errno) {
      toast.error('Error al descartar proyecto');
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

      <div className={styles.modalBtns}>
        <button className={styles.modalUpdate} onClick={updateChanges}>
          {currentStatus == 1 ? "Descartar" : "Activar"}
        </button>
        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>
      </div>
    </div>
  )
}