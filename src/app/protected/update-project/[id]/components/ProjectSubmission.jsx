'use client'

import { useRouter } from 'next/navigation';
import { address } from '@/app/const';
import { toast} from 'react-toastify';
import styles from '../newproject.module.css'
import { UseUploadBlob } from '@/hooks/useUploadBlob';
import { confirmAlert } from 'react-confirm-alert';
import { useProtectedContext } from '@/app/context/ProtectedContext';
import SendEmails from './SendEmails';
import { useState } from 'react';


export default function ProjectSubmissionForm({
  projectData,
  familyMembers,
  directionData,
  formDataAdmin,
  deletedMembers,
  idProyecto,
}) {
  const router = useRouter();
  const { uploadFile, isUploading, uploadError } = UseUploadBlob();
  const [uploading, setUploading] = useState(false)
  const userData = useProtectedContext()


    const confirmModal = (e) => {
      e.preventDefault()
      // Validacion de errores 

      if (projectData.bonoSeleccionado == "") {
        return toast.error('Seccion 1: Selecciona un tipo de bono');
      }
  
      if (projectData.bonoSeleccionado == "1" || projectData.bonoSeleccionado == "2" || projectData.bonoSeleccionado == "4") {
        if (projectData.subtipoSeleccionado === "" ) {
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
    setUploading(true)

    try {
      const headOfHousehold = familyMembers.find(member => member.tipoMiembro == 'Jefe/a de Familia');
      const projectName = headOfHousehold.nombre + ' ' + headOfHousehold.primerApellido + ' ' + headOfHousehold.segundoApellido;

      //Eliminar todos los blobs de una carpeta
      const responseBlob = await fetch(`/api/deleteBlob`, {
        method: "DELETE",
        body: JSON.stringify({"pathname": projectName + "/Cédulas"})
      })
      if (!responseBlob.ok) {
        throw new Error('Failed to fetch blobs')
      }

      // Sube todos los blobs a la carpeta
      await Promise.all(familyMembers.map(async (member) => {
        if (member.cedulaFile !== "" && !(member in deletedMembers)) {
          const memberCedula = member.cedulaFile;

          if (memberCedula instanceof File) {
            const blobResponse = await uploadFile(memberCedula, memberCedula.name,"Cédulas",projectName);
            
          
            if (blobResponse) {
              const parsedResponse = JSON.parse(blobResponse)


              
              member.cedulaFile = parsedResponse.result.url;
            } else {
              throw new Error(`Failed to upload file for ${member.nombre}`);
            }
          }

          
        }
      }));


      
      // All file uploads are complete, proceed with form submission
      const submissionData = {
        projectData,
        familyMembers,
        directionData,
        formDataAdmin,
        deletedMembers
      };

      const response = await fetch(`${address}/updateData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const result = await response.json();
      SendEmails(idProyecto, userData.userName, projectName)
      setUploading(false)
      toast.info("Proyecto actualizado exitosamente! Redirigiendo al inicio...")
      router.push(`/protected/home`);
      
    } catch (error) {
      setUploading(false)
      console.error('Error:', error);
      toast.error("Error: Por favor tomar screenshot de esto para investigar el error: " + error)
    }
    


    
  };

  return (
    <>

      <form onSubmit={confirmModal} style={{width: "100%", display: "flex", placeContent: "center", placeItems: "center"}}>
        <button type="submit" className={styles.saveButton}>
          {
            uploading ?
            "Actualizando, por favor espere..."
            :
            "Actualizar Proyecto"
          }
          
        </button>
      </form>
    
    </>
  );
}


function GenericModal({ onClose, afterFunction}) {


  return (
    <div className={styles.newUserModal}>
      <h1>¿Esta seguro de actualizar el proyecto?</h1>
      <div className={styles.modalBtns}>

      <button className={styles.modalUpdate} onClick={() =>  {afterFunction(); onClose()}}>
          Actualizar
        </button>

        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>

      </div>
    </div>
  )
}