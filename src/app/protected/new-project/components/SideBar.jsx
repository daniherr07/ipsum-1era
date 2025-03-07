'use client'

import Image from 'next/image';
import style from "../newproject.module.css";
import { useState } from 'react';

import Datosdelproyecto from './Datosdelproyecto';
import Miembrosdelafamilia from './Miembrosdelafamilia';
import Direcciondelproyecto from './Direcciondelproyecto';
import Datosadministrativos from './Datosadministrativos';

import ProjectSubmissionForm from './ProjectSubmission';



export default function AccordionMenu() {
  const [provincias, setProvincias] = useState("")
  const [cantones, setCantones] = useState("")
  const [distritos, setDistritos] = useState("")
  const [files, setFiles] = useState([])

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
    tipoMiembro: '',
    cedulaFile: '',
  });

  const [familyMembers, setFamilyMembers] = useState([
  ]);


  const [directionData, setDirectionData] = useState({
    provincia: "",
    canton: "",
    distrito: "",
    otrasSenas: "",
    numeroPlanoCatastro: "",
    loteTipoIdentificacion: "3",
    loteIdentificacion: "",
    finca: "",
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    entidad: '',
    entidadSecundaria: 'pendiente',
    apc: '',
    cfia: '',
    analistaEntidad: '',
    analistaIPSUM: '',
    arquitecto: "pendiente",
    Promotor_Ipsum: "pendiente",
    fiscalAsignado: 'pendiente',
    presupuesto: '',
    avaluo: '',
    ingenieroAsignado: 'pendiente',
    constructor: 'pendiente'
  });

  return (  
    <>
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
    {page === 3 && <Direcciondelproyecto 
                      directionData={directionData} 
                      setDirectionData={setDirectionData} 
                      provincias={provincias} 
                      setProvincias={setProvincias} 
                      cantones={cantones}
                      setCantones={setCantones}
                      distritos={distritos}
                      setDistritos={setDistritos}
                      files={files}
                      setFiles={setFiles}
                      />}
    {page === 4 && <Datosadministrativos formData={formDataAdmin} setFormData={setFormDataAdmin} />}

    <ProjectSubmissionForm
      projectData={projectData}
      familyMembers={familyMembers}
      directionData={directionData}
      formDataAdmin={formDataAdmin}
      photosFiles={files}
    />
    </>
  )}