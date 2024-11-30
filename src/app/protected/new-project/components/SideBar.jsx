'use client'

import Image from 'next/image';
import style from "../newproject.module.css";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

import Datosdelproyecto from './Datosdelproyecto';
import Miembrosdelafamilia from './Miembrosdelafamilia';
import Direcciondelproyecto from './Direcciondelproyecto';
import Datosadministrativos from './Datosadministrativos';

import ProjectSubmissionForm from './ProjectSubmission';

function Search() {
  const searchParams = useSearchParams()
  const succesful = searchParams.get("succesful")
  const error = searchParams.get("error")

  return(<>
      {succesful && <h2 className={style.sectionTitle2} style={{color: "green"}}>¡Guardado Exitosamente!</h2>}
      {error && <h2 className={style.sectionTitle2} style={{color: "red"}}>Hubo un error, intentalo mas tarde...</h2>}
  </>)
}


export default function AccordionMenu() {

  const [page, setPage] = useState(1)

  const [projectData, setProjectData] = useState({
    hasFIS: false,
    bonoSeleccionado: "",
    grupoSeleccionado: "",
    subtipoSeleccionado: "",
    desc:"",
  });



  const [formData, setFormData] = useState({
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

  const [familyMembers, setFamilyMembers] = useState([
  ]);


  const [directionData, setDirectionData] = useState({
    provincia: "",
    canton: "",
    distrito: "",
    otrasSenas: "",
    numeroPlanoCatastro: "",
    loteTipoIdentificacion: "",
    loteIdentificacion: "",
    finca: "",
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    entidad: '',
    entidadSecundaria: '',
    apc: '',
    cfia: '',
    analistaEntidad: '',
    analistaIPSUM: '',
    promotorEntidad: "",
    Promotor_Ipsum: "",
    fiscalAsignado: '',
    presupuesto: '',
    avaluo: '',
    ingenieroAsignado: ''
  });


  const menuItems = [
    { id: 1, title: 'Datos del proyecto' },
    { id: 2, title: 'Miembros de la familia' },
    { id: 3, title: 'Direccion del proyecto' },
    { id: 4, title: 'Datos administrativos' },
  ];

  return (  
    <>
    <h1 className={style.sectionTitle}>Nuevo Proyecto</h1>
    <Suspense>
      <Search />
    </Suspense>

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

    <ProjectSubmissionForm
      projectData={projectData}
      familyMembers={familyMembers}
      directionData={directionData}
      formDataAdmin={formDataAdmin}
    />
    </>
  )}