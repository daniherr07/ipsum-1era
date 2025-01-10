'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { handleChange } from '@/utils/handleChange';

export default function NextEtapa({idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior, getUpdatedData}) {
  const router = useRouter();
  const emailData = getUpdatedData()



  const etapaPopup = (e) => {
    e.preventDefault()
    confirmAlert({
      customUI: ({ onClose }) => 
      <AddUserModal 
        onClose={onClose} 
        router={router} 
        idProyecto={idProyecto} 
        nombreProyecto={nombreProyecto}  
        etapaAnterior={etapaAnterior} 
        subetapaAnterior={subetapaAnterior}
        emailData = {emailData}
      />,
    })
  }

  return (
      <form style={{width: "100%"}}>
        <button onClick={etapaPopup} type="submit" className={styles.nextEtapaBtn}>
          Pasar Etapa →
        </button>
      </form>
  );
}


function AddUserModal({ onClose, router, idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior, emailData }) {
  const [etapas, setEtapas] = useState([])
  const [subetapas, setSubetapas] = useState([])

  useEffect(() => {
    useFetchBackend("getEtapas", "GET")
        .then((fetchedData) => {
          setEtapas(fetchedData[0]);
          setSubetapas(fetchedData[1])
        })
        .catch((error) => console.error('Error fetching admin data:', error));
  }, []);


  const [etapaEdit, setEtapaEdit] = useState({
    id: idProyecto,
    etapa: "0",
    subetapa: "0",
  })

  const sendEmails = async () => {
    let emailAnalista
    let emailIngeniero

    const result = await useFetchBackend(`getEmails?id_analista=${emailData.id_analista}&id_ingeniero=${emailData.id_ingeniero}`, "GET")

    emailAnalista = result[0].correo_electronico
    emailIngeniero = result[1].correo_electronico

    const etapaActual = etapas.find(etapa => etapa.id == etapaEdit.etapa)
    const subetapaActual = subetapas.find(subetapa => subetapa.id == etapaEdit.subetapa)

    console.log(etapaActual, subetapaActual)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipients: [emailAnalista, emailIngeniero],
            subject: `Avance de etapa proyecto "${nombreProyecto}"`,
            content: `<p>El proyecto ${nombreProyecto} ha pasado de ${etapaAnterior} ${subetapaAnterior != null ? ":" + " " + subetapaAnterior : ""} y se ha actualizado a ${etapaActual.nombre} ${(subetapaActual !== undefined && subetapaActual !== null) ? ":" + " " + subetapaActual.nombre : ""} . <br /> <p>Por favor corroborar la información en el sistema</p>`
        })

      });
  
      const data = await response.json();
      console.log('Respuesta:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  const updateChanges = async () => {

    if (etapaEdit.etapa == '') {
      return toast.error("Etapa sin completar!")
    }

    const response = await useFetchBackend("updateEtapa", "POST", etapaEdit)
    if (response.errno) {
      
      if (result.msj) {
        return toast.error(result.msj)
      }

      throw new Error('Error al guardar el proyecto');
    }


    // Reload page here
    sendEmails()
    toast.success("Etapa exitosamente actualizada")
    onClose(); // Close the modal
    router.refresh(); // Refresh the page
  }





  const isDisabled = !etapaEdit.etapa


  return (
    <div className={styles.newUserModal}>
      <h1>Editar etapa de: {nombreProyecto}</h1>

      <div className={styles.modalMain}>
          <div className={styles.modalOld}>
              <h2>Anterior</h2>
              <p>Etapa: {etapaAnterior}</p>
              <p>Subetapa: {subetapaAnterior}</p>
          </div>

          <div className={styles.modalNew}>
              <h2>Nuevo</h2>
              <label htmlFor="roles">Etapa: </label>
              <select
                name="etapa"
                id="etapa"
                value={etapaEdit.etapa}
                className={styles.newModalInput}
                onChange={e => handleChange(e, setEtapaEdit)}
              >
                {etapas.map((etapa, key) => (
                  <option key={key} value={etapa.id}>
                    {etapa.nombre}
                  </option>
                ))}
              </select>

              <label htmlFor="roles">Subetapas: </label>
              <select
                name="subetapa"
                id="subetapa"
                value={etapaEdit.subetapa}
                className={styles.newModalInput}
                onChange={e => handleChange(e, setEtapaEdit)}
                disabled={isDisabled}
              >

                {subetapas.find((subetapa) => subetapa.etapa_id == etapaEdit.etapa) == undefined &&
                    <option value="0">
                        No hay subetapas disponibles
                    </option>
                }
                {etapaEdit.etapa &&
                    subetapas.map((subetapa) => (
                        subetapa.etapa_id == etapaEdit.etapa &&
                        <option key={subetapa.id} value={subetapa.id}>
                            {subetapa.nombre}
                        </option>
                    ))
                }


              </select>
          </div>
      </div>



      <div className={styles.modalBtns}>
        <button className={styles.modalUpdate} onClick={updateChanges}>
          Actualizar
        </button>
        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>
      </div>
    </div>
  )
}