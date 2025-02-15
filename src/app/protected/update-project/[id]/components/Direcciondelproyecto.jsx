'use client'

import { useEffect, useState } from "react";
import styles from "./location-form.module.css";
import { handleChange } from '@/utils/handleChange';
import { UseUploadBlob } from "@/hooks/useUploadBlob";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Link from "next/link";


export default function DireccionDelProyecto({directionData, setDirectionData, nombreProyecto, provincias, setProvincias, cantones, setCantones, distritos, setDistritos}) {


    const [manual, setManual] = useState({
        manual: false,
    })

    console.log(directionData)
    
    useEffect(() => {

        const fetchAll = async () => {
            let localProvincias
            let localCantones

            await fetch('https://api-geo-cr.vercel.app/provincias?limit=100&page=1')
            .then(response => response.json())
            .then(data => {
                localProvincias = data.data
                setProvincias(data.data)
            })

            let provinciaId = localProvincias.find(prov => prov.descripcion == directionData.provincia).idProvincia;

            switch (provinciaId) {
                case 3:
                    provinciaId = 4
                    break;
                case 4:
                    provinciaId = 3
                    break;
            }

            await fetch(`https://api-geo-cr.vercel.app/provincias/${provinciaId}/cantones?limit=100&page=1`)
            .then(response => response.json())
            .then(data => {
                localCantones = data.data
                setCantones(data.data)
            })

            const cantonId = localCantones.find(can => can.descripcion == directionData.provincia).idCanton;

            await fetch(`https://api-geo-cr.vercel.app/cantones/${cantonId}/distritos?limit=100&page=1`)
            .then(response => response.json())
            .then(data => {
                setDistritos(data.data)
            })
        }

        fetchAll()

      }, [])
  

    const handleProvinciaChange = (e) => {
        let provinciaId = provincias.find(prov => prov.descripcion == e.target.value).idProvincia;

        switch (provinciaId) {
            case 3:
                provinciaId = 4
                break;
            case 4:
                provinciaId = 3
                break;
        }

        fetch(`https://api-geo-cr.vercel.app/provincias/${provinciaId}/cantones?limit=100&page=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCantones(data.data)
        })
    }

    const handleCantonChange = (e) => {
        const cantonId = cantones.find(can => can.descripcion == e.target.value).idCanton;

        fetch(`https://api-geo-cr.vercel.app/cantones/${cantonId}/distritos?limit=100&page=1`)
        .then(response => response.json())
        .then(data => {
            setDistritos(data.data)
        })
    }
    

    const handleInputChange = (e) => {
        const { name } = e.target;
        handleChange(e, setDirectionData);

        // Reset dependent fields
        if (name === "provincia") {
            handleProvinciaChange(e)
            setDirectionData(prevState => ({
                ...prevState,
                canton: "",
                distrito: ""
            }));
        } else if (name === "canton") {
            handleCantonChange(e)
            setDirectionData(prevState => ({
                ...prevState,
                distrito: ""
            }));
        }
    };

    const handleInputChangeManual = (e) => {
        const { name } = e.target;
        handleChange(e, setDirectionData);

        // Reset dependent fields
        if (name === "provincia") {
            setDirectionData(prevState => ({
                ...prevState,
                canton: "",
                distrito: ""
            }));
        } else if (name === "canton") {
            setDirectionData(prevState => ({
                ...prevState,
                distrito: ""
            }));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Editar - Dirección del Proyecto</h1>
            </div>

            <div className={styles.formContent}>


                <div className={styles.column1}>
                    <div className={styles.manualCheck} style={{display: "flex", gap: "1em", placeContent: "start", placeItems: "center", marginBottom: "1em"}}>
                        <label htmlFor="manual">Escribir manualmente</label>
                        <input type="checkbox" name="manual" id="manual" value={manual.manual} onClick={e => handleChange(e, setManual)}/>
                    </div>
                    <div className={styles.locationSelects}>

                    {
                        manual.manual ?
                        <>
                            <div className={styles.selectGroup}>
                                <label>Provincia</label>
                                <input 
                                type="text" 
                                name="provincia" 
                                value={directionData.provincia}
                                onChange={handleInputChangeManual}
                                />
                            </div>

                            <div className={styles.selectGroup}>
                                <label>Cantón</label>
                                <input 
                                type="text" 
                                name="canton" 
                                value={directionData.canton}
                                onChange={handleInputChangeManual}
                                />
                            </div>

                            <div className={styles.selectGroup}>
                                <label>Distrito</label>
                                <input 
                                type="text" 
                                name="distrito" 
                                value={directionData.distrito}
                                onChange={handleInputChangeManual}
                                />
                            </div>
                        </>

                        :

                        <>
                            <div className={styles.selectGroup}>
                                <label>Provincia</label>
                                <select
                                    className={styles.select}
                                    name="provincia"
                                    value={directionData.provincia}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione una provincia</option>
                                    {
                                    
                                    provincias.length > 0 && provincias.map((prov) => (
                                        <option key={prov.idProvincia} value={prov.descripcion}>
                                            {prov.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.selectGroup}>
                                <label>Cantón</label>
                                <select
                                    className={styles.select}
                                    name="canton"
                                    value={directionData.canton}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione un cantón</option>
                                    {(directionData.provincia && cantones.length > 0) &&
                                        cantones.map((canton) => (
                                            <option key={canton.idCanton} value={canton.descripcion}>
                                                {canton.descripcion}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className={styles.selectGroup}>
                                <label>Distrito</label>
                                <select
                                    className={styles.select}
                                    name="distrito"
                                    value={directionData.distrito}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione un distrito</option>
                                    {(directionData.canton && distritos.length > 0) &&
                                        distritos.map((distrito) => (
                                            <option key={distrito.idDistrito} value={distrito.descripcion}>
                                                {distrito.descripcion}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        
                        </>
                    }
                    
                </div>

                    <div className={styles.addressGroup}>
                        <label>Otras señas:</label>
                        <textarea
                            className={styles.textarea}
                            name="otrasSenas"
                            value={directionData.otrasSenas}
                            onChange={handleInputChange}
                            
                        />
                    </div>

                    <div className={styles.locationSelects}>
                        <div className={styles.selectGroup}>
                            <label>Tipo de identificacion</label>
                            <select
                                className={styles.select}
                                name="loteTipoIdentificacion"
                                value={directionData.loteTipoIdentificacion}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccione un Tipo</option>
                                <option value="3">Pendiente</option>
                                <option value="1">Persona Fisica</option>
                                <option value="2">Persona Juridica</option>
                            </select>
                        </div>

                        <div className={styles.selectGroup}>
                            <label>Numero de Identifiacion</label>

                            <input className={styles.select} 
                            type="number" value={directionData.loteIdentificacion} 
                            name="loteIdentificacion" onChange={handleInputChange} 
                            
                            />
                        </div>

                    </div>


                    <div className={styles.cadastralGroup}>
                        <div className={styles.cadastralNumber}>
                            <label>Número de Plano Catastro</label>
                            <input
                                type="text"
                                className={styles.input}
                                name="numeroPlanoCatastro"
                                value={directionData.numeroPlanoCatastro}
                                onChange={handleInputChange}
                                
                            />
                        </div>

                        <div className={styles.cadastralNumber}>
                            <label>Número de Finca</label>
                            <input
                                type="text"
                                className={styles.input}
                                name="finca"
                                value={directionData.finca}
                                onChange={handleInputChange}
                                
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.column2}>
                    <p>Subir imágenes</p>
                    <PhotosCard nombreProyecto={nombreProyecto} />
                </div>

                
            </div>
        </div>
    );
}

function PhotosCard({nombreProyecto}) {
    const { uploadFile, isUploading, uploadError } = UseUploadBlob();
    const [file, setFile] = useState('');
    const directoryName = (nombreProyecto + " " + "Catastros")
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
    
                        <button 
                        onClick={onClose}
                        className={styles.modalDownload}
                        >
                          <Link href={blob.url} target='_blank' className={styles.linkText}>Abrir</Link>
                        </button>
    
                    </div>
    
    
              </div>
            );
          }
        })
      }
  
    useEffect(() => {
  
        const fetchBlobs = async () => {
            try {
              const response = await fetch(`/api/getFiles?prefix=${directoryName.replace(/Proyecto\s+/g, '')}`)
      
              if (!response.ok) {
                if (response.route_not_found) {
                  return
                } else{
                  console.log(response)
                  throw new Error('Failed to fetch blobs', response)
                }
              }
      
              const data = await response.json()
              setBlobs(data.files)
            } catch (error) {
              console.error('Error fetching blobs:', error)
            } finally {
              setLoading(false)
            }
          }
  
      fetchBlobs()
      
    }, [directoryName, update])
  
  
     const handleFileChange = async (event) => {
        toast.info("Subiendo imagen...")

        try {
          const file = event.target.files[0];
          if (file) {
            setFile(file);
          }
          
          const response = await uploadFile(file, file.name, directoryName.replace(/Proyecto\s+/g, ''));
      
          if (response) {
            toast.success("Imagen subida correctamente!")
          } else {
            throw new Error(`Failed to upload file`, uploadError);
          }
      
          setUpdate(!update)
        } catch (error) {
          toast.error("Error al subir la imagen. Recarga la página e intentalo de nuevo")
          console.log(error)
        }
    
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
                <div key={index} className={styles.photo} style={{backgroundImage: `url(${blob.url})`}} onClick={() => deletePopup(blob)}>{blob.pathname.toLowerCase().endsWith('.pdf') && "Vista previa no disponible de PDF"}</div>
              ))}
              <label className={styles.fileInput} style={file ? {} : null}>
                <input type="file" onChange={handleFileChange} />
              </label>
            </>
          )}
  
        </div>
      </div>
    )
  }
