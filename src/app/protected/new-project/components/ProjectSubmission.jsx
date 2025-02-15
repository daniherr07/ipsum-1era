'use client'

import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';

import styles from '../newproject.module.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { UseUploadBlob } from '@/hooks/useUploadBlob';
import SendEmails from './SendEmails';
import { useProtectedContext } from '@/app/context/ProtectedContext';
import { confirmAlert } from 'react-confirm-alert';
import { useState } from 'react';



export default function ProjectSubmissionForm({
  projectData,
  familyMembers,
  directionData,
  formDataAdmin,
}) {
  const router = useRouter();
  const { uploadFile, isUploading, uploadError } = UseUploadBlob();
  const userData = useProtectedContext();
  const [saving, setSaving] = useState(false)

      const confirmModal = (e) => {
        e.preventDefault()
        confirmAlert({
          closeOnClickOutside: false,
          customUI: ({ onClose }) => 
          <GenericModal 
            onClose={onClose} 
            afterFunction={handleSubmit}
          />,
        })
      }

  const handleSubmit = async () => {
    setSaving(true)

    //Validacion de errores

  
    if (projectData.bonoSeleccionado == "") {
      return toast.error('Seccion 1: Selecciona un tipo de bono');
    }

    if (projectData.bonoSeleccionado == "1" || projectData.bonoSeleccionado == "2" || projectData.bonoSeleccionado == "4") {
      if (projectData.subtipoSeleccionado === "" ) {
        console.log(projectData.subtipoSeleccionado)
        return toast.error('Seccion 1: Selecciona una variante de bono');
      }
    }

    if (projectData.grupoSeleccionado == "") {
      return toast.error('Seccion 1: Selecciona un grupo para el proyecto');
    }

    // Validate that there's at least one family member who is the head of the household
    const hasHeadOfHousehold = familyMembers.some(member => member.tipoMiembro == 'Jefe/a de Familia');

    if (!hasHeadOfHousehold) {
      return toast.error('Seccion 2: Debe haber al menos un miembro de familia que sea jefe/a de hogar');
    }

    if (directionData.loteTipoIdentificacion == "") {
      return toast.error('Seccion 3: Seleccione un tipo de identificacion para el dueño del lote o seleccione "Pendiente"');
    }

    if (directionData.provincia == "") {
      return toast.error('Seccion 3: Seleccione una provincia');
    }

    if (directionData.canton == "") {
      return toast.error('Seccion 3: Seleccione una canton');
    }

    if (directionData.distrito == "") {
      return toast.error('Seccion 3: Seleccione un distrito');
    }

    if (formDataAdmin.entidad == "") {
      return toast.error('Seccion 4: Añada una entidad');
    }

    if (formDataAdmin.analistaIPSUM == "") {
      return toast.error('Seccion 4: Seleccione un analista de IPSUM');
    }

    if (formDataAdmin.constructor == "") {
      return toast.error('Seccion 4: Seleccione un constructor o seleccione "Pendiente"');
    }

    if (formDataAdmin.ingenieroAsignado == "") {
      return toast.error('Seccion 4: Seleccione un ingeniero o seleccione "Pendiente"');
    }

    if (formDataAdmin.arquitecto == "") {
      return toast.error('Seccion 4: Seleccione un arquitecto o seleccione "Pendiente"');
    }

    if (formDataAdmin.Promotor_Ipsum == "") {
      return toast.error('Seccion 4: Seleccione un promotor o seleccione "Pendiente"');
    }

    const headOfHousehold = familyMembers.find(member => member.tipoMiembro == 'Jefe/a de Familia');
    const projectName = headOfHousehold.nombre + ' ' + headOfHousehold.primerApellido + ' ' + headOfHousehold.segundoApellido;
    

    

      //Eliminar todos los blobs de una carpeta
      const responseBlob = await fetch(`/api/deleteBlob`, {
        method: "DELETE",
        body: JSON.stringify({projectName})
      })
      if (!responseBlob.ok) {
        throw new Error('Failed to fetch blobs')
      }

      // Sube todos los blobs a la carpeta
      await Promise.all(familyMembers.map(async (member) => {
        if (member.cedulaFile !== "") {
          const memberCedula = member.cedulaFile;

          if (memberCedula instanceof File) {
            const blobResponse = await uploadFile(memberCedula, memberCedula.name, projectName);
            
          
            if (blobResponse) {
              const parsedResponse = JSON.parse(blobResponse)
              console.log("La blob respuesta supongo", parsedResponse);

              
              member.cedulaFile = parsedResponse.result.url;
            } else {
              throw new Error(`Failed to upload file for ${member.nombre}`);
            }
          }

          
        }
      }));
    
    

    const submissionData = {
      projectData,
      familyMembers,
      directionData,
      formDataAdmin
    };

    console.log(submissionData)

    

    try {
      const response = await useFetchBackend('saveData', 'POST', submissionData);

      console.log(response)
      if (!response.ok) {
        return toast.error("Hubo un error, verifica los datos e intentalo más tarde")
      }
      SendEmails(response.results.id, userData.userName, response.results.nombre )
      setSaving(false)
      toast.success("Proyecto añadido exitosamente! Redirigiendo a Editar Proyecto...")
      router.push(`/protected/update-project/${response.results.id}`); // Redirect to a success page
    } catch (error) {
      console.error('Error:', error);
      setSaving(false)
      toast.error("Hubo un error, verifica los datos e intentalo más tarde" + error) // Redirect to a success page
    }
  };

  return (
    <div>
      <form onSubmit={confirmModal} >
        <button type="submit" className={styles.saveButton}>
          {saving == true ? "Guardando Proyecto..." : "Guardar Proyecto"}
        </button>
      </form>
    </div>
  );
}

function GenericModal({ onClose, afterFunction}) {


  return (
    <div className={styles.newUserModal}>
      <h1>¿Esta seguro de guardar el proyecto?</h1>
      <div className={styles.modalBtns}>


        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>
        <button className={styles.modalUpdate} onClick={() =>  {afterFunction(); onClose()}}>
           Guardar
        </button>

      </div>
    </div>
  )
}