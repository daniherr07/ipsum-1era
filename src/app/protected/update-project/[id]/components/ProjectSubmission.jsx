'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { address } from '@/app/const';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../newproject.module.css'

export default function ProjectSubmissionForm({
  projectData,
  familyMembers,
  directionData,
  formDataAdmin
}) {
  const router = useRouter();

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

    console.log(familyMembers)
    // Validate that there's at least one family member who is the head of the household
    const hasHeadOfHousehold = familyMembers.some(member => member.tipoMiembro == 'Jefe/a de Familia' || member.tipoMiembro == 'jefe/a de familia');
    if (!hasHeadOfHousehold) {
      return toast.error('Seccion 2: Debe haber al menos un miembro de familia que sea jefe/a de hogar');
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

    if (directionData.loteTipoIdentificacion == "") {
      return toast.error('Seccion 3: Añada un tipo de identificacion para el lote');
    }

    if (directionData.loteIdentificacion == "") {
      return toast.error('Seccion 3: Añada una identificacion para el lote');
    }

    if (directionData.numeroPlanoCatastro == "") {
      return toast.error('Seccion 3: Añada un numero de plano de catastro');
    }

    if (directionData.finca == "") {
      return toast.error('Seccion 3: Añada un numero de finca');
    }

    if (formDataAdmin.entidad == "") {
      return toast.error('Seccion 4: Añada una entidad');
    }

    if (formDataAdmin.entidadSecundaria == "") {
      return toast.error('Seccion 4: Añada un centro de negocio');
    }

    if (formDataAdmin.apc == "") {
      return toast.error('Seccion 4: Añada un codigo APC');
    }

    if (formDataAdmin.cfia == "") {
      return toast.error('Seccion 4: Añada un codigo CFIA');
    }

    if (formDataAdmin.analistaEntidad == "") {
      return toast.error('Seccion 4: Seleccione un analista de la entidad');
    }

    if (formDataAdmin.analistaIPSUM == "") {
      return toast.error('Seccion 4: Seleccione un analista de IPSUM');
    }

    if (formDataAdmin.promotorEntidad == "") {
      return toast.error('Seccion 4: Seleccione un promotor de la entidad');
    }

    if (formDataAdmin.Promotor_Ipsum == "") {
      return toast.error('Seccion 4: Seleccione un promotor de Ipsum');
    }

    if (formDataAdmin.fiscalAsignado == "") {
      return toast.error('Seccion 4: Seleccione un fiscal');
    }

    if (formDataAdmin.presupuesto == "") {
      return toast.error('Seccion 4: Añada un presupuesto');
    }

    if (formDataAdmin.avaluo == "") {
      return toast.error('Seccion 4: Añada un avaluo');
    }

    if (formDataAdmin.ingenieroAsignado == "") {
      return toast.error('Seccion 4: Seleccione un ingeniero');
    }

    // Combine all data
    const submissionData = {
      projectData,
      familyMembers,
      directionData,
      formDataAdmin
    };

    console.log(submissionData)

    try {
      const response = await fetch(`${address}/updateData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        return toast.error("Hubo un error, verifica los datos e intentalo más tarde")
      }

      const result = await response.json();
      toast.success("Proyecto actualizado exitosamente!")
      router.refresh(); // Redirect to a success page
    } catch (error) {
      console.error('Error:', error);
      toast.error("Hubo un error, verifica los datos e intentalo más tarde") // Redirect to a success page
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