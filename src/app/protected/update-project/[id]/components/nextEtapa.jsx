'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';

export default function NextEtapa({idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior}) {
  const router = useRouter();

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


function AddUserModal({ onClose, router, idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior }) {
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

  const updateChanges = async () => {

    if (etapaEdit.etapa == '') {
      return toast.error("Etapa sin completar!")
    }

    const response = await useFetchBackend("updateEtapa", "POST", etapaEdit)
    if (!response.ok) {
      const result = await response.json()
      
      if (result.msj) {
        return toast.error(result.msj)
      }

      throw new Error('Error al guardar el proyecto');
    }

    // Reload page here
    toast.success("Etapa actualizada exitosamente!");
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