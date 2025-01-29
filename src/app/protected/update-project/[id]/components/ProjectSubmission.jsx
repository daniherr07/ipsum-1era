'use client'

import { useRouter } from 'next/navigation';
import { address } from '@/app/const';
import { toast} from 'react-toastify';

import styles from '../newproject.module.css'
import { UseUploadBlob } from '@/hooks/useUploadBlob';

import { useProtectedContext } from '@/app/context/ProtectedContext';
import SendEmails from './SendEmails';


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
  const userData = useProtectedContext()


  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (projectData.desc == "") {
      return toast.error('Seccion 1: Añada una descripcion al proyecto');
    }

    // Validate that there's at least one family member who is the head of the household
    const hasHeadOfHousehold = familyMembers.some(member => member.tipoMiembro == 'Jefe/a de Familia');

    if (!hasHeadOfHousehold) {
      return toast.error('Seccion 2: Debe haber al menos un miembro de familia que sea jefe/a de hogar');
    }

    if (directionData.loteTipoIdentificacion == "") {
      return toast.error('Seccion 3: Seleccione un tipo de identificacion para el dueño del lote');
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

    if (directionData.otrasSenas == "") {
      return toast.error('Seccion 3: Añada otras señas a la direccion');
    }

    if (directionData.numeroPlanoCatastro == "") {
      return toast.error('Seccion 3: Añada un numero de plano de catastro');
    }

    if (formDataAdmin.entidad == "") {
      return toast.error('Seccion 4: Añada una entidad');
    }

    if (formDataAdmin.analistaIPSUM == "") {
      return toast.error('Seccion 4: Seleccione un analista de IPSUM');
    }

    if (formDataAdmin.Promotor_Ipsum == "") {
      return toast.error('Seccion 4: Seleccione un promotor de Ipsum');
    }

    if (formDataAdmin.ingenieroAsignado == "") {
      return toast.error('Seccion 4: Seleccione un ingeniero');
    }

    const headOfHousehold = familyMembers.find(member => member.tipoMiembro == 'Jefe/a de Familia');
    const projectName = headOfHousehold.nombre + ' ' + headOfHousehold.primerApellido + ' ' + headOfHousehold.segundoApellido;



    try {

      const responseBlob = await fetch(`/api/listBlobs?prefix=${projectName}`)
      if (!responseBlob.ok) {
        throw new Error('Failed to fetch blobs')
      }
      const data = await responseBlob.json()
      const blobs = data.blobs

      for (const blob of blobs) {
        const responseDel = await fetch(`/api/deleteBlob`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({"url": blob.url})
        })
          
      }


      // Use Promise.all to wait for all file uploads to complete
      await Promise.all(familyMembers.map(async (member) => {
        if (member.cedulaFile !== "") {
          const memberCedula = member.cedulaFile;

          if (memberCedula instanceof File) {
            const blobResponse = await uploadFile(memberCedula, memberCedula.name, projectName);
          
            if (blobResponse) {
              console.log("La blob respuesta supongo", blobResponse);
              member.cedulaFile = blobResponse.url;
            } else {
              throw new Error(`Failed to upload file for ${member.nombre}`);
            }
          }

          
        }
      }));

      await Promise.all(deletedMembers.map(async (member) => {
        const response = await fetch(`/api/listBlobs?prefix=${projectName}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch blobs')
        }
        const data = await response.json()
        const blobs = data.blobs

        const memberUrl = blobs.find(object => object.pathname == `Proyecto ${projectName}/${member.nombre}`);

        if (memberUrl != undefined) {
          const response = await fetch(`/api/deleteBlob`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"url": memberUrl.url})
          })

          const result = await response.json()
          console.log(result)
        }
      }))

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
      toast.success("Proyecto actualizado exitosamente!");
      router.refresh(); // Refresh the page
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("Hubo un error, verifica los datos e intentalo más tarde");
    }
    


    
  };

  return (
    <>

      <form onSubmit={handleSubmit} style={{width: "100%", display: "flex", placeContent: "center", placeItems: "center"}}>
        <button type="submit" className={styles.saveButton}>
          Actualizar Proyecto
        </button>
      </form>
    
    </>
  );
}