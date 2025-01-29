'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { handleChange } from '@/utils/handleChange';
import SendEmails from './SendEmails';

export default function NextEtapa({idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior, getUpdatedData, userData}) {
  const router = useRouter();
  const emailData = getUpdatedData()

  console.log("Subetapa anterior desde la raiz", subetapaAnterior)

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
        userData = {userData}
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


function AddUserModal({ onClose, router, idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior, emailData, userData }) {



  const [siguienteEtapa, setSiguienteEtapa] = useState()
  const [siguienteSubetapa, setSiguienteSubetapa] =useState()
  const [subetapasEtapa, setSubetapasEtapa] = useState()
  const [selectSubetapa, setSelectSubetapa] = useState({
    subetapa: ""
  })
  const [forceUpdate, setForceUpdate] = useState(true)

  useEffect(() => {
    useFetchBackend("getEtapas", "GET")
        .then((fetchedData) => {
          const etapaAnteriorID = fetchedData[0].find(etapa => etapa.nombre == etapaAnterior).id
          const subetapasDeEtapa = fetchedData[1].filter(subetapa => subetapa.etapa_id == etapaAnteriorID)
          console.log(subetapasDeEtapa)
          

          if (subetapasDeEtapa[subetapasDeEtapa.length - 1].nombre == subetapaAnterior) {
            console.log("Entro a ultima subetapa")
            setSiguienteEtapa(fetchedData[0][etapaAnteriorID])
            const newSubetapas = fetchedData[1].filter(subetapas => subetapas.etapa_id == etapaAnteriorID + 1 )
            setSubetapasEtapa(newSubetapas)
            setSiguienteSubetapa(newSubetapas[0])
          } else {
            console.log("Entro a una subetapa")
            setSiguienteEtapa(fetchedData[0][etapaAnteriorID - 1])

            for (let i = 0; i < subetapasDeEtapa.length; i++) {
              console.log("Subetapa Actual", subetapasDeEtapa)
              console.log("Subetapa Anterior", subetapaAnterior)
              if (subetapasDeEtapa[i].nombre == subetapaAnterior) {
                setSiguienteSubetapa(subetapasDeEtapa[i + 1])
                setSubetapasEtapa(subetapasDeEtapa)
                return
              } else{
                continue
              }
              
            }
            
          }

        })
        .catch((error) => console.error('Error fetching admin data:', error));
  }, [forceUpdate]);

  const [inputData, setInputData] = useState({
    data: "",
    color: "#03579B",
  })




  const sendEmails = async (etapaEdit) => {

    let emailsToGetRole
    
    const Analista = "analista_asigna_ipsum_id"
    const Ingeniero = "ingeniero_id"
    const Arquitecto = "arquitecto_id"

    //DEFINIENDO EL ROL_ID PARA MANDAR LOS CORREOS
    switch (etapaEdit.etapa) {
      case 2: //A visita
      emailsToGetRole = Ingeniero
        break;

      case 3: // A confeccion expediente

        switch (etapaEdit.subetapa) {
          case 17: // A Inicio de Confeccion Expediente
          emailsToGetRole =  Analista
            break;
        
          case 12: // A Documentacion Técnica
            emailsToGetRole =  Arquitecto
            break;
          case 13: // A Revision
            emailsToGetRole = Analista
            break;
        }
        break


      case 4: // A Enviado al centro de negocios
        emailsToGetRole = Analista
        break

      case 5: // A Ingresó al Banvhi
        emailsToGetRole =  Analista
        break

      case 6: // A permisos de construcción

        switch (etapaEdit.subetapa) {
          case 18: // A Inicio de permisos de construccion
            emailsToGetRole = Arquitecto
            break;
        
          case 14: // A Finalizacion de procesos de construccion
            emailsToGetRole = Analista
            break;
          default:
            break;
        }
        emailsToGetRole = Analista
        break

      case 7: // A Procesos de formalizacion
        emailsToGetRole = Analista
        break

      case 8: // A Solicitud de servicio publico
        emailsToGetRole =Analista
        break

      case 9: // A Construccion
        emailsToGetRole = [Analista, Ingeniero, Arquitecto]
        break
      case 10: // A Entregado
        emailsToGetRole = Analista
        break
      case 11: // Facturado
        emailsToGetRole =  Analista
        break

      default:
        break;
    }

    let destinatarios = []

    const result = await useFetchBackend(`getEmails?emails=${emailsToGetRole}&id_proyecto=${idProyecto}`, "GET")
    console.log(result)

    
    for (let i = 0; i < result.emails.length; i++) {
      for (const [clave, valor] of Object.entries(result.emails[i])) {
        destinatarios.push(valor);
  
      }
    }

    
    try {
      console.log(destinatarios)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipients: destinatarios,
            subject: `Avance de etapa proyecto "${nombreProyecto}"`,
            content: `<p>El proyecto ${nombreProyecto} ha pasado de ${etapaAnterior} ${subetapaAnterior != null ? ":" + " " + subetapaAnterior : ""} y se ha actualizado a ${siguienteEtapa && siguienteEtapa.nombre} ${siguienteSubetapa && siguienteSubetapa.nombre} . <br /> <p>Por favor corroborar la información en el sistema</p>`
        })

      });
  
      const data = await response.json();
      console.log('Respuesta:', data);

      for(let i = 0; i < result.emails.length; i++) {
        await useFetchBackend("insertNoti", "POST", {message: `El proyecto ${nombreProyecto} ha pasado de ${etapaAnterior} ${subetapaAnterior != null ? ":" + " " + subetapaAnterior : ""} y se ha actualizado a ${siguienteEtapa && siguienteEtapa.nombre} ${siguienteSubetapa && siguienteSubetapa.nombre}.`, user_id: result.ids[i]})
      }


      
      
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  const updateChanges = async () => {
    setForceUpdate(!forceUpdate)


    const etapaEdit = {
      id: idProyecto,
      etapa: siguienteEtapa.id,
      subetapa: selectSubetapa.subetapa !== "" ? selectSubetapa.subetapa : siguienteSubetapa.id
    }


    const newEntryData = {
      usuario: userData.id, 
      proyecto: idProyecto,
      time: new Date(),
      tipo: "Análisis",
      color: inputData.color,
      descripcion: `Nueva etapa : ${siguienteEtapa && siguienteEtapa.nombre} y subetapa: ${siguienteSubetapa && siguienteSubetapa.nombre}. Descripción: ${inputData.data}`
    }

    




    const response = await useFetchBackend("updateEtapa", "POST", etapaEdit)
    if (response?.errno) {
      
      if (result.msj) {
        return toast.error(result.msj)
      }

      throw new Error('Error al guardar el proyecto');
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

    


    sendEmails(etapaEdit)
    toast.success("Etapa exitosamente actualizada")

    onClose(); // Close the modal
    router.refresh(); // Refresh the page
  }



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


              { siguienteEtapa && (siguienteEtapa.id == 4 || siguienteEtapa.id == 5) ?
              <>
                <label htmlFor="roles">Etapa: {siguienteEtapa && siguienteEtapa.nombre} </label>
                <p></p>

                <label htmlFor="roles">Subetapas: </label>
                <select name="subetapa" id="" value={selectSubetapa.subetapa} onChange={e => handleChange(e, setSelectSubetapa)}>
                <option value="">Selecciona una subetapa</option>
                  {
                    subetapasEtapa && subetapasEtapa.map(subetapa => (
                      <option value={subetapa.id} key={subetapa.id}>{subetapa.nombre}</option>
                    ))
                  }
                </select>
              </>

              :

              <>
                <label htmlFor="roles">Etapa: {siguienteEtapa && siguienteEtapa.nombre} </label>
                <p></p>

                <label htmlFor="roles">Subetapas: {siguienteSubetapa && siguienteSubetapa.nombre}</label>
                <p></p>
              </>
              }

          </div>
      </div>

      <label htmlFor="">Descripción para bitacora</label>
      <input type="text" style={{width: "80%"}} name='data' value={inputData.data} onChange={e => handleChange(e, setInputData)}/>
      {
        inputData.data != "" &&
        <>
        <label htmlFor="color">Color </label>
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
          Actualizar
        </button>

      </div>
    </div>
  )
}