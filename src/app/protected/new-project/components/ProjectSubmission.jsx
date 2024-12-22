'use client'

import { useRouter } from 'next/navigation';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../newproject.module.css'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { UseUploadBlob } from '@/hooks/useUploadBlob';


export default function ProjectSubmissionForm({
  projectData,
  familyMembers,
  directionData,
  formDataAdmin,
}) {
  const router = useRouter();
  const { uploadFile, isUploading, uploadError } = UseUploadBlob();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    familyMembers.forEach(async (member, index) => {
      if (member.cedulaFile !== ""){
        const memberCedula = member.cedulaFile;
        const blobResponse = await uploadFile(memberCedula, member.nombre, projectName);
        
        if (blobResponse) {
          member.cedulaFile = blobResponse.url;
        }
      }
    });

    const submissionData = {
      projectData,
      familyMembers,
      directionData,
      formDataAdmin
    };

    console.log(submissionData)

    try {
      const response = await useFetchBackend('saveData', 'POST', submissionData);
      if (!response.ok) {
        return toast.error("Hubo un error, verifica los datos e intentalo más tarde")
      }
      toast.success("Proyecto añadido exitosamente!")
      router.refresh(); // Redirect to a success page
    } catch (error) {
      console.error('Error:', error);
      toast.error("Hubo un error, verifica los datos e intentalo más tarde" + error) // Redirect to a success page
    }
  };

  return (
    <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <form onSubmit={handleSubmit} >
        <button type="submit" className={styles.saveButton}>
          Guardar Proyecto
        </button>
      </form>
    </div>
  );
}