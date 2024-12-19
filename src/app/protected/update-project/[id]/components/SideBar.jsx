'use client'

import Image from 'next/image';
import style from "../newproject.module.css";
import { useState, useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Datosdelproyecto from './Datosdelproyecto';
import Miembrosdelafamilia from './Miembrosdelafamilia';
import Direcciondelproyecto from './Direcciondelproyecto';
import Datosadministrativos from './Datosadministrativos';

import ProjectSubmissionForm from './ProjectSubmission';
import NextEtapa from './nextEtapa';




export default function AccordionMenu({projectDataOld, familyMembersOld, directionDataOld, formDataAdminOld}) {

  console.log(projectDataOld)
  const [page, setPage] = useState(1)

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
    tipoTelefono: '',
    email: '',
    tipoMiembro: ''
  });

  const [familyMembers, setFamilyMembers] = useState(familyMembersOld);


  const [directionData, setDirectionData] = useState({
    lote_id :directionDataOld[0].id,
    provincia: directionDataOld[0].provincia,
    canton: directionDataOld[0].canton,
    distrito: directionDataOld[0].distrito,
    otrasSenas: directionDataOld[0].senas_descripcion,
    numeroPlanoCatastro: directionDataOld[0].numero_plano_catastro,
    loteTipoIdentificacion: directionDataOld[0].tipo_propietario_id ,
    loteIdentificacion: directionDataOld[0].propietario_cedula,
    finca: directionDataOld[0].numero_finca,
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    entidad: formDataAdminOld.entidad_id,
    entidadSecundaria: formDataAdminOld.centro_negocio_id,
    apc: formDataAdminOld.codigo_apc,
    cfia: formDataAdminOld.codigo_cfia,
    analistaEntidad: formDataAdminOld.analista_entidad_id,
    analistaIPSUM: formDataAdminOld.analista_ipsum_id,
    promotorEntidad: formDataAdminOld.promotor_externo_id,
    Promotor_Ipsum: formDataAdminOld.promotor_interno_id,
    fiscalAsignado: formDataAdminOld.fiscal_id,
    presupuesto: formDataAdminOld.presupuesto,
    avaluo: formDataAdminOld.avaluo,
    ingenieroAsignado: formDataAdminOld.ingeniero_id
  });



  return (  
    <>
    <h1 className={style.sectionTitle}>Editando proyecto: {projectDataOld.proyecto_nombre}</h1>

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
    {page === 2 && <Miembrosdelafamilia formData={formData} setFormData={setFormData} familyMembers={familyMembers} setFamilyMembers={setFamilyMembers}/>}
    {page === 3 && <Direcciondelproyecto directionData={directionData} setDirectionData={setDirectionData} />}
    {page === 4 && <Datosadministrativos formData={formDataAdmin} setFormData={setFormDataAdmin} />}

    <div className={style.finishBtns}>
      <ProjectSubmissionForm
        projectData={projectData}
        familyMembers={familyMembers}
        directionData={directionData}
        formDataAdmin={formDataAdmin}
      />
      <NextEtapa idProyecto={formDataAdminOld.proyecto_id} nombreProyecto={projectDataOld.proyecto_nombre} etapaAnterior={projectDataOld.etapa_nombre} subetapaAnterior={projectDataOld.subetapa_nombre}/>
    </div>

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


    </>


  )}