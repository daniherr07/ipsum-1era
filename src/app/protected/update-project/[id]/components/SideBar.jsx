'use client'

import Image from 'next/image';
import style from "../newproject.module.css";
import { useState, useEffect } from 'react';



import Datosdelproyecto from './Datosdelproyecto';
import Miembrosdelafamilia from './Miembrosdelafamilia';
import Direcciondelproyecto from './Direcciondelproyecto';
import Datosadministrativos from './Datosadministrativos';

import ProjectSubmissionForm from './ProjectSubmission';
import NextEtapa from './nextEtapa';
import UpdateProyectoStatus from './UpdateProyectoStatus';
import { useProtectedContext } from '@/app/context/ProtectedContext';




export default function AccordionMenu({projectDataOld, familyMembersOld, directionDataOld, formDataAdminOld}) {
  const userData = useProtectedContext();
  const [page, setPage] = useState(1)
  const [deletedMembers, setDeletedMembers] = useState([])

  const [provincias, setProvincias] = useState("")
  const [cantones, setCantones] = useState("")
  const [distritos, setDistritos] = useState("")
  
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


  const [projectData, setProjectData] = useState({
    idProyecto: formDataAdminOld.proyecto_id,
    hasFIS:projectDataOld.fis,
    bonoSeleccionado: projectDataOld.tipo_bono_id,
    grupoSeleccionado: projectDataOld.grupo_id,
    subtipoSeleccionado: projectDataOld.variante_bono_id,
    desc:projectDataOld.descripcion,
  });



  const [formData, setFormData] = useState({
    id: "",
    primerApellido: '',
    segundoApellido: '',
    nombre: '',
    identificacion: '',
    adultoMayor: false,
    discapacidad: false,
    ingresos: '',
    especifique: '',
    tipoIdentificacion: '',
    tipoIngresos: '',
    telefono: '',
    email: '',
    tipoMiembro: '',
    cedulaFile: '',
  });

  const [familyMembers, setFamilyMembers] = useState(familyMembersOld);


  const [directionData, setDirectionData] = useState({
    lote_id :directionDataOld[0].id,
    provincia: directionDataOld[0].provincia,
    canton: directionDataOld[0].canton,
    distrito: directionDataOld[0].distrito,
    otrasSenas: directionDataOld[0].senas_descripcion,
    numeroPlanoCatastro: directionDataOld[0].numero_plano_catastro,
    loteTipoIdentificacion: directionDataOld[0].tipo_propietario_id == null ? "pendiente" : directionDataOld[0].tipo_propietario_id,
    loteIdentificacion: directionDataOld[0].propietario_cedula,
    finca: directionDataOld[0].numero_finca,
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    entidad: formDataAdminOld.entidad_id,
    entidadSecundaria: formDataAdminOld.centro_negocio_id == null ? "pendiente" : formDataAdminOld.centro_negocio_id,
    apc: formDataAdminOld.codigo_apc,
    cfia: formDataAdminOld.codigo_cfia,
    analistaEntidad: formDataAdminOld.analista_entidad_id == null ? "pendiente" : formDataAdminOld.analista_entidad_id,
    analistaIPSUM: formDataAdminOld.analista_ipsum_id == null ? "pendiente" : formDataAdminOld.analista_ipsum_id,
    arquitecto: formDataAdminOld.arquitecto_id == null ? "pendiente" : formDataAdminOld.arquitecto_id,
    Promotor_Ipsum: formDataAdminOld.promotor_interno_id == null ? "pendiente" : formDataAdminOld.promotor_interno_id,
    fiscalAsignado: formDataAdminOld.fiscal_id == null ? "pendiente" : formDataAdminOld.fiscal_id,
    presupuesto: formDataAdminOld.presupuesto == null ? "" : formDataAdminOld.presupuesto, 
    avaluo: formDataAdminOld.avaluo == null ? "" : formDataAdminOld.avaluo,
    ingenieroAsignado: formDataAdminOld.ingeniero_id == null ? "pendiente" : formDataAdminOld.ingeniero_id,
    constructor: formDataAdminOld.constructor_id == null ? "pendiente" : formDataAdminOld.constructor_id
  });

  const getUpdatedData = () => {
    const emailData = {
      id_analista: formDataAdmin.analistaIPSUM,
      id_ingeniero: formDataAdmin.ingenieroAsignado,
      usuario: userData.userName,
    }

    return emailData
  }



  return (  
    <>
    <h1 className={style.sectionTitle}>Proyecto: {projectDataOld.proyecto_nombre}</h1>

    <aside className={style.accordioncontainer}>
      
      <ul>
        <li onClick={() => setPage(1)} className={style.itemleft} style={page == 1 ? {background: "#03579B"} : {background: "#fff"}}>
          
          <Image 
          src={`${page == 1 ? "/new/houseWhite.svg" : "/new/houseBlue.svg"}`} 
          width={30} 
          height={30} 
          alt='logo' 
          
          className={style.optionleft}
          
          />
          
          <p style={page == 1 ? {color: "#fff"} : {color: "#03579B"}}> Datos </p>
        </li>

        <li onClick={() => setPage(2)} className={style.itemleft} style={page == 2 ? {background: "#03579B"} : {background: "#fff"}}>
          <Image 
          src={`${page == 2 ? "/new/personWhite.svg" : "/new/personBlue.svg"}`} 
          width={30} 
          height={30} 
          alt='logo' 
          
          className={style.optionleft}
          
          />
          <p style={page == 2 ? {color: "#fff"} : {color: "#03579B"}}> Núcleo </p>
        </li>

        <li onClick={() => setPage(3)} className={style.itemleft} style={page == 3 ? {background: "#03579B"} : {background: "#fff"}}>
          <Image 
          src={`${page == 3 ? "/new/locationWhite.svg" : "/new/locationBlue.svg"}`} 
          width={30} 
          height={30} 
          alt='logo' 
          className={style.optionleft}
          
          />

        <p style={page == 3 ? {color: "#fff"} : {color: "#03579B"}}>Ubicación</p>
          
        </li>

        <li onClick={() => setPage(4)} className={style.itemleft} style={page == 4 ? {background: "#03579B"} : {background: "#fff"}}>
          <Image 
          src={`${page == 4 ? "/new/fileWhite.svg" : "/new/fileBlue.svg"}`} 
          width={30} 
          height={30} 
          alt='logo' 
          className={style.optionleft}
          
          />

        <p style={page == 4 ? {color: "#fff"} : {color: "#03579B"}}>Admin.</p>
          
        </li>
      </ul>
    </aside>

    {page === 1 && <Datosdelproyecto projectData={projectData} setProjectData={setProjectData}/>}
    {page === 2 && <Miembrosdelafamilia formData={formData} setFormData={setFormData} familyMembers={familyMembers} setFamilyMembers={setFamilyMembers} deletedMembers={deletedMembers} setDeletedMembers={setDeletedMembers}/>}
    {page === 3 && <Direcciondelproyecto 
    directionData={directionData} 
    setDirectionData={setDirectionData} 
    nombreProyecto={projectDataOld.proyecto_nombre}
    provincias={provincias} 
    setProvincias={setProvincias} 
    cantones={cantones}
    setCantones={setCantones}
    distritos={distritos}
    setDistritos={setDistritos}
    
    
    />}
    {page === 4 && <Datosadministrativos formData={formDataAdmin} setFormData={setFormDataAdmin} />}

    <div className={style.finishBtns}>
      {
        (isAdminOrRoot || userData.role == "Ingeniero") &&/* Añadir otros usuarios despues */
        <UpdateProyectoStatus idProyecto={formDataAdminOld.proyecto_id} currentStatus={projectDataOld.activated} nombreProyecto={projectDataOld.proyecto_nombre}/>
      }

      {
        (isAdminOrRoot || userData.role == "Analista") &&
        <ProjectSubmissionForm
          projectData={projectData}
          familyMembers={familyMembers}
          directionData={directionData}
          formDataAdmin={formDataAdmin}
          deletedMembers={deletedMembers}
          idProyecto={formDataAdminOld.proyecto_id}
        />
      }
      

      <NextEtapa idProyecto={formDataAdminOld.proyecto_id} nombreProyecto={projectDataOld.proyecto_nombre} etapaAnterior={projectDataOld.etapa_nombre} subetapaAnterior={projectDataOld.subetapa_nombre} getUpdatedData={getUpdatedData} userData={userData}/>

    </div>

    </>


  )}