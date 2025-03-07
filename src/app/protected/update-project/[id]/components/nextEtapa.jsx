'use client'

import { useRouter } from 'next/navigation';
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from '../newproject.module.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { handleChange } from '@/utils/handleChange';

export default function NextEtapa({idProyecto, nombreProyecto, etapaAnterior, subetapaAnterior, getUpdatedData, userData}) {
  const router = useRouter();
  const emailData = getUpdatedData()

  const etapaPopup = (e) => {
    e.preventDefault()
    confirmAlert({
      closeOnClickOutside: false,
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


  const isAdminOrRoot = 
  userData.role == 'Admin' 
  || 
  userData.role == 'Root' 
  ||
  userData.role == 'Analista Admin'
  ||
  userData.role == 'Ingeniero Admin'
  ||
  userData.role == 'Arquitecto Admin'
  ? true : false;


  const [etapaManual, setEtapaManual] = useState()
  const [subetapaManual, setSubetapaManual] = useState()

  const [siguienteEtapa, setSiguienteEtapa] = useState()
  const [siguienteSubetapa, setSiguienteSubetapa] =useState()
  const [subetapasEtapa, setSubetapasEtapa] = useState()
  const [selectSubetapa, setSelectSubetapa] = useState({
    etapa: "",
    subetapa: "",
    manual: false
  })
  const [forceUpdate, setForceUpdate] = useState(true)

  useEffect(() => {
    useFetchBackend("getEtapas", "GET")
        .then((fetchedData) => {
          const etapaAnteriorID = fetchedData[0].find(etapa => etapa.nombre == etapaAnterior).id
          const subetapasDeEtapa = fetchedData[1].filter(subetapa => subetapa.etapa_id == etapaAnteriorID)

          if (subetapasDeEtapa[subetapasDeEtapa.length - 1].nombre == subetapaAnterior) {
            setSiguienteEtapa(fetchedData[0][etapaAnteriorID])
            const newSubetapas = fetchedData[1].filter(subetapas => subetapas.etapa_id == etapaAnteriorID + 1 )
            setSubetapasEtapa(newSubetapas)
            setSiguienteSubetapa(newSubetapas[0])
          } else {
            setSiguienteEtapa(fetchedData[0][etapaAnteriorID - 1])

            for (let i = 0; i < subetapasDeEtapa.length; i++) {
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


  useEffect(() => {
    if (isAdminOrRoot) {
      useFetchBackend("getEtapas", "GET")
      .then((fetchedData) => {
        setEtapaManual(fetchedData[0])
        setSubetapaManual(fetchedData[1])
      })
      .catch((error) => {console.error('Error fetching admin data:', error); toast.error("Error: Por favor tomar screenshot de esto para investigar el error: " + error)});
    }

  }, []);

  const [inputData, setInputData] = useState({
    data: "",
    color: "#03579B",
  })




  const sendEmails = async () => {


    
    try {
      const etapaEdit = {
        id: idProyecto,
        etapa: parseInt(selectSubetapa.etapa !== "" ? selectSubetapa.etapa : siguienteEtapa.id),
        subetapa: parseInt(selectSubetapa.subetapa !== "" ? selectSubetapa.subetapa : siguienteSubetapa.id)
      }
  
      let emailsToGetRole
      
      const Analista = "analista_asigna_ipsum_id"
      const Ingeniero = "ingeniero_id"
      const Arquitecto = "arquitecto_id"
      //DEFINIENDO EL ROL_ID PARA MANDAR LOS CORREOS
      switch (etapaEdit.etapa) {
        case 1: //A Preanálisis
          emailsToGetRole = [Analista]
          break;
        case 2: //A visita
        emailsToGetRole = Ingeniero
          break;
  
        case 3: // A confeccion expediente
  
          switch (etapaEdit.subetapa) {
            case 12: // A Documentacion Técnica
              emailsToGetRole =  [Arquitecto, Analista]
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
              emailsToGetRole = [Arquitecto, Ingeniero]
              break;
          
            case 14: // A Finalizacion de procesos de construccion
              emailsToGetRole = Analista
              break;
          }
          break;
  
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
  
      
      for (let i = 0; i < result.emails.length; i++) {
        for (const [clave, valor] of Object.entries(result.emails[i])) {
          destinatarios.push(valor);
    
        }
      }
  
      let subetapaCorreo
      let etapaCorreo
  
      if (selectSubetapa.subetapa != "") {
        if (selectSubetapa.etapa != "") {
          const subetapaNuevaSelect = subetapaManual.find(subetapa => subetapa.id == selectSubetapa.subetapa)
          const subetapaNuevaSelectNombre = subetapaNuevaSelect.nombre
          subetapaCorreo = subetapaNuevaSelectNombre
  
        }else {
          const subetapaNuevaSelect = subetapasEtapa.find(subetapa => subetapa.id == selectSubetapa.subetapa)
          const subetapaNuevaSelectNombre = subetapaNuevaSelect.nombre
          subetapaCorreo = subetapaNuevaSelectNombre
        }
      } else {
        subetapaCorreo = siguienteSubetapa && siguienteSubetapa.nombre
      }
  
      if (selectSubetapa.etapa != "") {
        const etapaNuevaSelect = etapaManual.find(etapa => etapa.id == selectSubetapa.etapa)
        const etapaNuevaSelectNombre = etapaNuevaSelect.nombre
        etapaCorreo = etapaNuevaSelectNombre
      } else {
        etapaCorreo = siguienteEtapa && siguienteEtapa.nombre
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipients: destinatarios,
            subject: `Avance de etapa proyecto "${nombreProyecto}"`,
            content: `<h1>${userData.userName} ha avanzado de etapa el proyecto ${nombreProyecto}.</h1> <br /> <p>El proyecto <ins>${nombreProyecto}</ins> ha pasado de <br /> ETAPA: <b>${etapaAnterior}</b>, SUBETAPA: <mark>${subetapaAnterior != null ? subetapaAnterior : ""}</mark> <br /> Fue actualizado a <br /> ETAPA: <b>${etapaCorreo}</b>, SUBETAPA: <mark>${subetapaCorreo}</mark> . <br /> <p>Por favor corroborar la información en el sistema</p>`
        })

      });
  
      const data = await response.json();

      for(let i = 0; i < result.emails.length; i++) {
        await useFetchBackend("insertNoti", "POST", {message: `${userData.userName} ha modificado el proyecto ${nombreProyecto}. El proyecto ha pasado de ${etapaAnterior} ${subetapaAnterior != null ? ":" + " " + subetapaAnterior : ""} y se ha actualizado a ${etapaCorreo} ${subetapaCorreo}.`, user_id: result.ids[i], time: new Date()})
      }


      
      
    } catch (error) {
      toast.error("Error: Por favor tomar screenshot de esto para investigar el error: " + error)
      console.error('Error:', error);
    }
  }; 

  const updateChanges = async () => {
    setForceUpdate(!forceUpdate)


    const etapaEdit = {
      id: idProyecto,
      etapa: parseInt(selectSubetapa.etapa !== "" ? selectSubetapa.etapa : siguienteEtapa.id),
      subetapa: parseInt(selectSubetapa.subetapa !== "" ? selectSubetapa.subetapa : siguienteSubetapa.id)
    }

    let subetapaCorreo
    let etapaCorreo

    if (selectSubetapa.subetapa != "") {
      if (selectSubetapa.etapa != "") {
        const subetapaNuevaSelect = subetapaManual.find(subetapa => subetapa.id == selectSubetapa.subetapa)
        const subetapaNuevaSelectNombre = subetapaNuevaSelect.nombre
        subetapaCorreo = subetapaNuevaSelectNombre

      }else {
        const subetapaNuevaSelect = subetapasEtapa.find(subetapa => subetapa.id == selectSubetapa.subetapa)
        const subetapaNuevaSelectNombre = subetapaNuevaSelect.nombre
        subetapaCorreo = subetapaNuevaSelectNombre
      }
    } else {
      subetapaCorreo = siguienteSubetapa && siguienteSubetapa.nombre
    }

    if (selectSubetapa.etapa != "") {
      const etapaNuevaSelect = etapaManual.find(etapa => etapa.id == selectSubetapa.etapa)
      const etapaNuevaSelectNombre = etapaNuevaSelect.nombre
      etapaCorreo = etapaNuevaSelectNombre
    } else {
      etapaCorreo = siguienteEtapa && siguienteEtapa.nombre
    }

    if (selectSubetapa.manual && selectSubetapa.etapa == "") {
      return toast.error("Por favor elija una etapa")
    }

    if (selectSubetapa.manual && selectSubetapa.subetapa == "") {
      return toast.error("Por favor elija una subetapa")
    }

    const newEntryData = {
      usuario: userData.id, 
      proyecto: idProyecto,
      time: new Date(),
      tipo: "Análisis",
      color: inputData.color,
      descripcion: `Nueva etapa : ${etapaCorreo} y subetapa: ${subetapaCorreo}. Descripción: ${inputData.data}`
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

    


    sendEmails()
    toast.success("Etapa exitosamente actualizada")

    onClose(); // Close the modal
    router.push("/protected/home"); // Refresh the page
  }



  return (
    <div className={styles.newUserModal}>
      <h1 style={{textAlign: "center"}}>Editar etapa de: {nombreProyecto}</h1>

      {
        isAdminOrRoot &&
        <div style={{display: "flex", placeContent: "center", placeItems: "center", textAlign: "center", gap: "1em"}}>
          <label htmlFor="">Pasar etapa manualmente</label>
          <input type="checkbox" id="manual" name="manual" value={selectSubetapa.manual} onChange={e => handleChange(e, setSelectSubetapa)}/>
        </div>
      }

      <div className={styles.modalMain}>
          <div className={styles.modalOld}>
              <h2>Anterior</h2>
              <p>Etapa: {etapaAnterior}</p>
              <p>Subetapa: {subetapaAnterior}</p>
          </div>

          <div className={styles.modalNew}>
              <h2>Nuevo</h2>


              { 
              
              selectSubetapa.manual == true ?

              <div style={{display: "flex", flexDirection: "column"}}>
              <label htmlFor="roles">Etapa:</label>
                <select name="etapa" id="" value={selectSubetapa.etapa} onChange={e => handleChange(e, setSelectSubetapa)}>
                  <option value="">Selecciona una etapa</option>
                  {
                    etapaManual && etapaManual.map(etapa => (
                      <option value={etapa.id} key={etapa.id}>{etapa.nombre}</option>
                    ))
                  }
                </select>

                <label htmlFor="roles">Subetapas: </label>
                <select disabled={!selectSubetapa.etapa} name="subetapa" id="" value={selectSubetapa.subetapa} onChange={e => handleChange(e, setSelectSubetapa)}>
                  <option value="">Selecciona una subetapa</option>
                  {
                    subetapaManual && subetapaManual.map(subetapa => (
                      subetapa.etapa_id == selectSubetapa.etapa &&
                      <option value={subetapa.id} key={subetapa.id}>{subetapa.nombre}</option>
                    ))
                  }
                </select>
              </div>
              
              
              
              :
              
              
              
              siguienteEtapa && (siguienteEtapa.id == 4 || siguienteEtapa.id == 5) ?


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
            style={{width: "50%"}}
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
          {
            (etapaAnterior != "Facturado" || selectSubetapa.manual == true) &&
            <button className={styles.modalUpdate} onClick={updateChanges}>
            Actualizar
            </button>
          }
          <button onClick={onClose} className={styles.modalCancel}>
            Cancelar
          </button>


      </div>
    </div>
  )
}