'use client'

import { useEffect, useState } from 'react';
import styles from './card.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useProtectedContext } from '@/app/context/ProtectedContext'
import { useFetchBackend } from '@/hooks/useFetchApi';
import { UseUploadBlob } from '@/hooks/useUploadBlob';
import jsPDF from "jspdf"
import "jspdf-autotable"
import heic2any from "heic2any";

export default function Card({item, bitData, handleClick, handleColor}) {
    const userData = useProtectedContext();
    const [page, setPage] = useState(true)

  
    return (
      <>
        <div className={styles.cardButtonsSwitch}>
          <button 
          className={styles.buttonAccion}
          onClick={() => setPage(true)}
          style={page ? {color: "#0058b1", backgroundColor: "#fff", boxShadow: "inset 0px 0px 5px 0px rgba(143,143,143,1)"} : null}
          >
              Info General
          </button>

          <button 
          className={styles.buttonAccion}
          onClick={() => setPage(false)}
          style={page == false ? {color: "#0058b1", backgroundColor: "#fff", boxShadow: "inset 0px 0px 5px 0px rgba(143,143,143,1)"} : null}
          >
              Fotos
          </button>
        </div>

        {page == true && <GeneralInfo item={item} bitData={bitData} userData={userData} handleClick={handleClick} handleColor={handleColor}/>}
        {page == false && <PhotosCard item={item}/>}
      </>
    
    );
  }

function PhotosCard({item}) {
  const { uploadFile, isUploading, uploadError } = UseUploadBlob();
  const [file, setFile] = useState('');
  const directoryName = (item.nombreProyecto)
  const [blobs, setBlobs] = useState()
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false)

  const deletePopup = (blob) => {
    
    confirmAlert({
      customUI: ({ onClose, }) => {
        return (
            <div className={styles.modal}>
                <h1>¿Que deseas hacer?</h1>

                <div className={styles.modalBtns}>
                    <button
                        className={styles.modalUpdate}
                        onClick={() => {
                        deleteImage(blob.pathname);
                        onClose();
                        }}
                    >
                        Eliminar
                    </button>

                    <button 
                    onClick={onClose}
                    className={styles.modalCancel}
                    >
                      Cancelar
                    </button>


                    <Link href={blob.url} target='_blank' className={styles.modalDownload} onClick={onClose}>Abrir</Link>


                </div>


          </div>
        );
      }
    })
  }

  useEffect(() => {
    console.log("entro al useEffect")
    const fetchBlobs = async () => {
      try {
        const response = await fetch(`/api/getFiles?prefix=${directoryName.replace(/Proyecto\s+/g, '') + "/Fotos Proyecto"}`)

        if (!response.ok) {
          if (response.route_not_found) {
            return
          } else{
            throw new Error('Failed to fetch blobs', response)
          }
        }

        const data = await response.json()
        setBlobs(data.files)
        console.log(data)
      } catch (error) {
        console.error('Error fetching blobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlobs()
    return
    
  }, [directoryName, update])


  const handleFileChange = async (event) => {
    toast.info("Subiendo imagenes...");
  
    try {

      let files = event.target.files;
      if (!files[0]) return;
      for (let fileLocal of files){
          console.log(fileLocal)

          // Convert HEIC to JPEG
          if (fileLocal.type === "image/heic" || fileLocal.name.endsWith(".heic")) {
            const convertedBlob = await heic2any({
              blob: fileLocal,
              toType: "image/jpeg",
              quality: 0.9, // optional
            });
      
            // Convert Blob to File so it retains a name
            fileLocal = new File([convertedBlob], fileLocal.name.replace(/\.heic$/i, ".jpg"), {
              type: "image/jpeg",
            });
          }
      
          const response = await uploadFile(fileLocal, fileLocal.name, "Fotos Proyecto", directoryName.replace(/Proyecto\s+/g, ''));
          console.log(isUploading)

          if (response) {
            toast.success("Imagen " + fileLocal.name +" subida correctamente!");
          } else {
            console.log(response)
            console.error(uploadError)
          }
      
          setUpdate(!update);
      }
      setUpdate(!update);

    } catch (error) {
      toast.error("Error al subir la imagen. Recarga la página e intentalo de nuevo");
      console.error(error);
    }
    
    console.log("antes de los 10s")
    await new Promise(resolve => setTimeout(resolve, 10000));
    setUpdate(!update);
    console.log("despues de los 10s")
  };

  const deleteImage = async (pathname) => {
    const response = await fetch(`/api/deleteBlob`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({pathname})
    })

    const result = await response.json()

    toast.success("Imagen eliminada existosamente!")
    setUpdate(!update)
  }


  return(
    <div className={styles.card}>
      <div className={styles.responsiveCardContainer}>


        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {blobs && blobs.map((blob, index) => (
              <div key={index} className={styles.photo} style={{backgroundImage: `url(${blob.url})`, textAlign: "center"}} onClick={() => deletePopup(blob)}>{blob.name.toLowerCase().endsWith('.pdf') && "Vista previa no disponible de PDF"}</div>
            ))}
            <label className={styles.fileInput} style={file ? {} : null}>
              <input type="file" onChange={handleFileChange} multiple/>
            </label>
          </>
        )}

      </div>
    </div>
  )
}

function GeneralInfo({item, bitData, userData, handleClick, handleColor}){

  const [filter, setFilter] = useState("Todos")
  const newBitacora = () => {
    confirmAlert({
      customUI: ({ onClose }) => <AddBitacoraEntry onClose={onClose} userData={userData} proyecto_id={item.id} item={item} handleClick={handleClick} handleColor={handleColor}/>,
    })
  }

  return (
  <div className={styles.card}>
      {/* Header */}
      <header className={styles.header} style={{backgroundColor: `${bitData[0]?.color ? bitData[0].color : "#03579B"}`}}>
        <div className={styles.headerLeft}>
          <h1 className={styles.name}>{item.nombreProyecto}</h1>
          <span className={styles.id}>
          {item.cedula}
          </span>
        </div>

      <PDFDownloadButton data={item}/>

      </header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.leftColumn}>

          <div className={styles.fechaIngresoBlock}>
            <h1>Fecha: {dateConverter(item.fechaIngreso).split(',')[0]}</h1>
          </div>

          {/* Location Grid */}
          <div className={styles.locationGrid}>
            <div>
              <span className={styles.label}>Distrito</span>
              <span className={styles.value}>{item.distrito}</span>
            </div>
            <div>
              <span className={styles.label}>Cantón</span>
              <span className={styles.value}>{item.canton}</span>
            </div>
            <div>
              <span className={styles.label}>Provincia</span>
              <span className={styles.value}>{item.provincia}</span>
            </div>
            <div>
              <span className={styles.label}>Etapa</span>
              <span className={styles.value}>
                Etapa: {item.etapa}
              </span>
              <span className={styles.value}>
                Subetapa: {item.subetapa}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className={styles.address}>
            <span className={styles.label}>Otras señas:</span>
            <p className={styles.value}>{item.senasDescripcion == "" ? "Sin Asignar" : item.senasDescripcion}</p>
          </div>


          {/* Historical Data */}
          <div className={styles.historical}>
            <div className={styles.historicalGrid}>
              <div>
                <span className={styles.label}>APC</span>
                <span className={styles.value}>{item.codigoApc == "" ? "Sin Asignar" : item.codigoApc}</span>
              </div>
              <div>
                <span className={styles.label}>CFIA</span>
                <span className={styles.value}>{item.codigoCfia == "" ? "Sin Asignar" : item.codigoCfia}</span>
              </div>
            </div>
          </div>

          {/* Filter Select */}

          <div className={styles.filterSelectContainer}>
            <label htmlFor="filter">Filtrar Tipo</label>
            <select
              name="filter"
              id="filter"
              value={filter}
              className={styles.newModalInput}
              onChange={e => setFilter(e.target.value)}
            >
                <option value="Todos">
                  Todos
                </option>

                <option value="Análisis">
                  Análisis
                </option>

                <option value="Arquitecto">
                  Arquitecto
                </option>

            </select>
          </div>

          {/* Scrollable Area (placeholder) */}
          <div className={styles.scrollArea}>

            {
              bitData.map((entry) => (
                filter == "Todos" ?

                <div className={styles.bitacoraEntry} key={entry.id} >
                  <div className={styles.colorBit} style={{backgroundColor: entry.color}}></div>
                  <div className={styles.descripcionContainer}>
                    <div className={styles.bitacoraHeader}>
                      <p>{dateConverter(entry.fecha_ingreso)}</p>
                      <p style={entry.tipo == "Análisis" ? {fontWeight: "bold", textDecoration: "underline"} : {color: "#25d366"}}>
                        {entry.tipo}
                      </p>
                      
                    </div>
                    
                    <p className={styles.bitInfo}>{entry.usuario} ingresó: {entry.descripcion}</p>
                  </div>
                </div>

                :
                entry.tipo == filter && 
                
                <div className={styles.bitacoraEntry} key={entry.id} >
                  <div className={styles.colorBit} style={{backgroundColor: entry.color}}></div>
                  <div className={styles.descripcionContainer}>
                    <div className={styles.bitacoraHeader}>
                      <p>{dateConverter(entry.fecha_ingreso)}</p>
                      <p style={entry.tipo == "Análisis" ? {fontWeight: "bold", textDecoration: "underline"} : {color: "#25d366"}}>
                        {entry.tipo}
                      </p>
                      
                    </div>
                    
                    <p className={styles.bitInfo}>{entry.usuario} ingresó: {entry.descripcion}</p>
                  </div>
                </div>
              ))
            }

          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* RAMT Badge */}
          <div className={styles.ramtBadge} style={{backgroundColor: `#03579B`}}>
            <p className={styles.ramtBadgeTxt}>{item.tipoBono}</p>
          </div>

          {/* Cadastral Plan */}
          <div>
            <span className={styles.label}>Plano de Catastro</span>
            <span className={styles.value}>{item.planoCatastro == "" ? "Sin Asignar" : item.planoCatastro}</span>
          </div>

          {/* Edit Button */}
          <Link href={`/protected/update-project/${item.id}`}>
          <button className={styles.editButton}>
            
              <Image src={"/pen.svg"} className={styles.editIcon} width={20} height={20} alt='icono'/>
              <p style={{color: "#fff", textDecoration: "none"}}>Editar</p> 

          </button>
          </Link>

          {/* Phone Number */}
          <div>
            <span className={styles.label}>Teléfono</span>
            <span className={styles.value}>{item.telefono}</span>
          </div>

          {/* Communication Buttons */}
          <div className={styles.communicationButtons}>
            <button className={styles.callButton}>
              <a href={`tel:+506${item.telefono}`}>
                <Image src={"/call.svg"}  width={20} height={20} alt='llamada'/>
              </a>
              
            </button>
            <button className={styles.emailButton}>
              <a href={`mailto:${item.email}`}>
                <Image src={"/mail.svg"}  width={20} height={20} alt='correo' />
              </a>
            </button>
            <button className={styles.whatsappButton}>
              <a href={`https://wa.me/+506${item.telefono}`}>
                <Image src={"/whatsapp.svg"}  width={20} height={20} alt='wasap'/>
              </a>

            </button>
          </div>

          {/* Referral Information */}
          <div>
            <span className={styles.label}>Promotor</span>
            <span className={styles.value}>{item.promotorInterno == null ? "Sin Asignar" : item.promotorInterno}</span>
          </div>

          <br />
          <div>
            <span className={styles.label}>Constructor</span>
            <span className={styles.value}>{item.constructor == null ? "Sin Asignar" : item.constructor}</span>
          </div>

          <button className={styles.editButton} onClick={newBitacora}>
            
            <p style={{color: "#fff", textDecoration: "none"}}>Agregar a bitacora</p> 

          </button>

          <div>
            <span className={styles.label}>Presupuesto</span>
            <span className={styles.value}>{item.presupuesto == null ? "Sin Asignar" : "₡" + item.presupuesto}</span>
          </div>
          <div>
            <span className={styles.label}>Avalúo</span>
            <span className={styles.value}>{item.avaluo == null ? "Sin Asignar" : "₡" + item.avaluo}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <span className={styles.label}>Entidad:</span>
            <span className={styles.value}>{item.entidad == "" ? "Sin Asignar" : item.entidad}</span>
          </div>
          <div>
            <span className={styles.label}>Grupo proyecto</span>
            <span className={styles.value}>{item.grupoProyecto == "" ? "Sin Asignar" : item.grupoProyecto}</span>
          </div>
          <div>
            <span className={styles.label}>Analista Entidad:</span>
            <span className={styles.value}>{item.analistaEntidad == null ? "Sin Asignar" : item.analistaEntidad}</span>
          </div>
          <div>
            <span className={styles.label}>Fiscal Asignado:</span>
            <span className={styles.value}>{item.fiscalAsignado == null ? "Sin Asignar" : item.fiscalAsignado}</span>
          </div>
          <div>
            <span className={styles.label}>Centro de Negocios:</span>
            <span className={styles.value}>{item.centroNegocios == null ? "Sin Asignar" : item.centroNegocios}</span>
          </div>
          <div>
            <span className={styles.label}>Ingeniero</span>
            <span className={styles.value}>{item.ingenieroAsignado == null ? "Sin Asignar" : item.ingenieroAsignado}</span>
          </div>
          <div>
            <span className={styles.label}>Analista IPSUM:</span>
            <span className={styles.value}>{item.analistaIpsum}</span>
          </div>
        </div>
      </footer>
    </div>
  
  )
}

function AddBitacoraEntry({ onClose, userData, proyecto_id, item, handleClick, handleColor }) {

  const [newEntryData, setNewEntryData] = useState({
    descripcion: '',
    color: '#03579B',
    usuario: userData.id, 
    proyecto: proyecto_id,
    time: new Date(),
    tipo: "Análisis",
  })

  const updateChanges = async () => {

    try {
      if (newEntryData.descripcion == '') {
        return toast.error("Descripcion sin completar!")
      }
  
      if (newEntryData.color == '') {
        return toast.error("Por favor elije un color")
      }
  
      if (newEntryData.tipo == '') {
        return toast.error("Por favor elija un tipo")
      }
  
      const response = await useFetchBackend("insertBitacora", "POST", newEntryData)
  
      // Reload page here
      toast.success("Incidencia añadida exitosamente!");
      onClose(); // Close the modal
      handleClick(item)
      handleColor()
    } catch (error) {
      toast.error("Error: Por favor tomar screenshot de esto para investigar el error: " + error)
    }

  }

  return (
    <div className={styles.newUserModal}>
      <h1>Añadir nueva incidencia</h1>

      <label htmlFor="userName">Descripcion </label>
      <textarea
        name="descripcion"
        rows={7}
        value={newEntryData.descripcion}
        className={styles.newModalInput}
        onChange={e => handleChange(e, setNewEntryData)}
        style={{width: "80%"}}
      />

      <div className={styles.selectContainer}>

        <div className={styles.selectInput}>
          <label htmlFor="color">Color </label>
          <select
            name="color"
            id="color"
            value={newEntryData.roles}
            className={styles.newModalInput}
            onChange={e => handleChange(e, setNewEntryData)}
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
        </div>


        <div className={styles.selectInput}>
          <label htmlFor="tipo">Tipo de Incidencia</label>
          <select
            name="tipo"
            id="tipo"
            value={newEntryData.roles}
            className={styles.newModalInput}
            onChange={e => handleChange(e, setNewEntryData)}
          >
              <option value="Análisis">
                Análisis
              </option>

              <option value="Técnico">
                Técnico
              </option>

          </select>

        </div>
      </div>



      <div className={styles.modalBtns}>
        <button className={styles.modalUpdate} onClick={updateChanges}>
          Añadir
        </button>
        <button onClick={onClose} className={styles.modalCancel}>
          Cancelar
        </button>

      </div>
    </div>
  )
}

function PDFDownloadButton({ data }) {
  const formatText = (text) => {
    return text
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height

    // Set title
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(`Información de: ${data.nombreProyecto}`, pageWidth / 2, 15, { align: "center" })

    // Prepare table data
    const tableData = Object.entries(data)
      .filter(([key]) => key !== "id")
      .filter(([key]) => key !== "estadoColor")
      .map(([key, value]) => [formatText(key), 
      (value == null || value == "" || value == " " || value == undefined) ?  formatText("Sin asignar") : 
      (key == "fechaIngreso") ? formatText(value.toString().split("T")[0]) :
      formatText(value.toString())])

    // Calculate table width (80% of page width)
    const tableWidth = pageWidth * 0.8

    // Generate table
    doc.autoTable({
      startY: 25,
      head: [["Campo", "Descripción"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "left",
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: tableWidth * 0.35 },
        1: { cellWidth: tableWidth * 0.65 },
      },
      headStyles: {
        fillColor: [0, 88, 177], // A nice blue color for the header
        textColor: 255, // White text for better contrast
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: (pageWidth - tableWidth) / 2, right: (pageWidth - tableWidth) / 2 },
      didDrawPage: (data) => {
        // Ensure content fits on one page
        if (data.cursor.y > pageHeight - 20) {
          doc.deletePage(doc.internal.getNumberOfPages())
          doc.addPage()
          doc.setFontSize(16)
          doc.text("Project Information", pageWidth / 2, 15, { align: "center" })
          data.cursor.y = 25
        }
      },
    })

    doc.save(`${data.nombreProyecto}`)
  }


  return (
    <button className={styles.copyButton} onClick={downloadPDF}>
    Info
    <Image src={"/download.svg"}  width={20} height={20} alt='download'/>
    </button>
  )
}


function dateConverter(date){
  const newDate = new Date(date).toLocaleString();
  return newDate
}