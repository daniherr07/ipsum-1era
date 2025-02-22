'use client'
import { useFetchBackend } from '@/hooks/useFetchApi';
import styles from './plantilla.module.css'
import { useState, useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { toast } from 'react-toastify';
import { handleChange } from '@/utils/handleChange';
import { Suspense } from 'react';



export default function EditGeneric({onClose, table}){
    const [data, setData] = useState()
    const [claves, setClaves] = useState([])
    const [entidades, setEntidades] = useState()
    const [tiposBono, setTiposBono] = useState()
    const [update, setUpdate] = useState()
    const [blank, setBlank] = useState(false)

    useEffect(() => {
        try {
            useFetchBackend(`getGenerics?table=${table}`, "GET")
            .then((data) => {
                setClaves(Object.keys(data[0]))
                setData(data)
            }).catch(error => {
                console.log(error)
                setBlank(true)
            })
    
            useFetchBackend(`getEntidades`, "GET")
            .then((data) => {
            setEntidades(data)
            }).catch(error => {
                console.log(error)
                setBlank(true)
            })
    
            useFetchBackend(`getBonosSimple`, "GET")
            .then((data) => {
                setTiposBono(data)
            }).catch(error => {
                console.log(error)
                setBlank(true)
            })
        } catch (error) {
            console.log(error)
            setBlank(true)
        }

    }, [update])


    


    return(
    <>
    <div className={styles.tableContainer}>

        {
            blank ?
            <p>No existen elementos de esta lista</p>

            :
            <table className={styles.table}>
            <thead>
              <tr>
                  {
                      claves &&
                      claves.map((clave, index) => (
                          (clave !== "id" && clave !== "activated") ?
                          <th key={index} className={styles.headerCell}>{
                              clave == "entidad_id" && "Entidad" ||
                              clave == "nombre" && "Nombre" ||
                              clave == "apellido1" && "1° Apellido" ||
                              clave == "apellido2" && "2° Apellido" ||
                              clave == "correo_electronico" && "Email" ||
                              clave == "telefono" && "Teléfono" ||
                              clave == "direccion" && "Dirección" ||
                              clave == "descripcion" && "Descripción" ||
                              clave == "tipo_bono_id" && "Tipo"
                              
                              }</th>
                          :
                          null
                      ) )
                  }
                <th className={styles.headerCell}>Editar</th>
                <th className={styles.headerCell}>Desactivar</th>
              </tr>
            </thead>
            <tbody>
                <Suspense fallback={<p>Loading...</p>}>
                    {data && data.map((row, index) => (
                      (row && row.activated == 1) && //El row es la informacion
                        <InfoRow key={index} 
                        data={row} 
                        claves={claves} 
                        entidades={entidades} 
                        table={table} 
                        tiposBono={tiposBono} 
                        update={update}
                        setUpdate={setUpdate}
                        />
                    ))}
                </Suspense>
            </tbody>
          </table>
        }

    </div>

      

        {
            blank ?
            null
            :
            (data && data.filter(element => element.activated == 0).length > 0) &&
            <>
            <h1 className={styles.title}>Elementos Desactivados</h1>
            <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                {
                        claves &&
                        claves.map((clave, index) => (
                            (clave !== "id" && clave !== "activated") ?
                            <th key={index} className={styles.headerCell}>{
                                clave == "entidad_id" && "Entidad" ||
                                clave == "nombre" && "Nombre" ||
                                clave == "apellido1" && "1° Apellido" ||
                                clave == "apellido2" && "2° Apellido" ||
                                clave == "correo_electronico" && "Email" ||
                                clave == "telefono" && "Teléfono" ||
                                clave == "direccion" && "Dirección" ||
                                clave == "descripcion" && "Descripción" ||
                                clave == "tipo_bono_id" && "Tipo"
                                
                                }</th>
                            :
                            null
                        ) )
                    }
                    <th className={styles.headerCell}>Activar</th>
                </tr>
              </thead>
              <tbody>
              <Suspense fallback={<p>Loading...</p>}>
                      {data && data.map((row, index) => ( //El row es la informacion
                           (row && row.activated == 0) &&
                          <DeletedRow key={index} 
                          data={row} 
                          claves={claves} 
                          entidades={entidades} 
                          table={table} 
                          tiposBono={tiposBono} 
                          update={update}
                          setUpdate={setUpdate}
                          />
                      ))}
                  </Suspense>
              </tbody>
            </table>
    

          </div>
          </>
        }

        <div className={styles.modalBtns}>
            <button onClick={onClose} className={styles.modalCancel}>
            Cancelar
            </button>
        </div>
    </>
    )
    
}

function InfoRow({ data, claves, entidades, table, tiposBono, update, setUpdate}) {

    const [editable, isEditable] = useState(false)
    const [dataEdit, setData] = useState(() => 
        Object.fromEntries(claves.map(clave =>  [clave, data[clave]]))
    );




    const updateChanges = async ()  => {
        const dataToSend = {
            dataEdit,
            table: table
        }
        console.log(dataToSend)


        isEditable(!editable)
        const response = await useFetchBackend(`genericUpdate`, 'POST', dataToSend)
        console.log("Respuesta", response)
        if (response.errno) {
            toast.error('Error al actualizar el registro');
        }
        console.log("SI lo hace")
        toast.success("Registro actualizado correctamente!")
    }

    const updateStatus = async ()  => {
        const data = {
            id: dataEdit.id,
            activated: dataEdit.activated,
            table: table,
        }
        const response = await useFetchBackend(`updateStatusGenerics`, 'POST', data)
        if (response.errno) {
            toast.error(`Hubo un error, intentalo más tarde...`)
        }
        setUpdate(!update)
        toast.success(`Elemento exitosamente ${dataEdit.activated == 1 ? "Desactivado" : "Activado"}`)
    }


  return (
    <>

    {
    (dataEdit && dataEdit.activated == 1) &&

    <tr className={`${styles.row}`}>
        {
            editable ?
            <>
                {(dataEdit && dataEdit.activated == 1) && (
                    () => {
                        var elements = []
                        Object.keys(dataEdit).forEach((Ukey, index) => { // Ukey de Unique Key
                            
                            switch (Ukey) {
                                case "id":
                
                                    break;
                                case "activated":
            
                                break;
                                case "entidad_id":
                                    elements.push(
                                        <td key={index}>
                                            <select key={index} name="entidad_id" id="entidad_id" onChange={e => handleChange(e, setData)} value={dataEdit[Ukey]}>
                                                {
                                                    entidades &&
                                                    entidades.map(entidad => (
                                                        <option value={entidad.id}>{entidad.nombre}</option>
                                                    ))
                                                }

                                            </select>
                                        </td>
                                    )
                                    break
                                case "tipo_bono_id":
                                    elements.push(
                                        <td key={index}>
                                            <select key={index} name="tipo_bono_id" id="tipo_bono_id" onChange={e => handleChange(e, setData)} value={dataEdit[Ukey]}>
                                                {
                                                    tiposBono &&
                                                    tiposBono.map(tiposBono => (
                                                        <option value={tiposBono.id}>{tiposBono.nombre}</option>
                                                    ))
                                                }

                                            </select>
                                        </td>
                                    )
                                    break
                                default:
                                    elements.push(
                                        <td className={styles.cell} key={index}>
                                            <input className={styles.input} type="text" name={Ukey}  value={dataEdit[Ukey]} onChange={e => handleChange(e, setData)} />
                                        </td>
                                    )
                                    break;
                            }
                            

                        })

                        return elements
                    }
                )()
                    
                }
                <td className={`${styles.cell} ${styles.saveContainer}`}  >
                    <p className={styles.updateBtn} onClick={updateChanges} >💾</p>
                    <button className={styles.cancelBtn} type='button' onClick={() => isEditable(!editable)}>Cancelar</button>    
                </td>
                <td className={`${styles.cell} ${styles.btn}`} onClick={updateStatus}>🚫</td>
            </>



            :
            <>
                {(dataEdit && dataEdit.activated == 1) && (
                    () => {
                        var elements = []
                        Object.keys(dataEdit).forEach((Ukey, index) => { // Ukey de Unique Key
                            if (Ukey == "id" || Ukey == "activated") {
                                ()=>{}
                            } else{
                            elements.push(<td key={index} className={styles.cell}>{
                                
                                Ukey == "entidad_id" ?
                                entidades && entidades.find(entidad => entidad.id == dataEdit[Ukey]).nombre
                                :
                                Ukey == "tipo_bono_id" ?
                                tiposBono && tiposBono.find(tipoBono => tipoBono.id == dataEdit[Ukey]).nombre
                                :
                                dataEdit[Ukey]

                                
                            }</td>)}
                        })
                        return elements
                    }
                )()
                    
                }
                
                    <td className={styles.cell} onClick={() => isEditable(!editable)} ><p className={styles.btn}>✏️</p></td>
                    <td className={styles.cell}><p className={styles.btn} onClick={updateStatus}>🚫</p></td>
   
            </>
        }

    </tr>
    }
    </>
  )
}

function DeletedRow({ data, claves, entidades, table, tiposBono, update, setUpdate}) {

    console.log("hola mundo2")
    const [dataEdit, setData] = useState(() => 
        Object.fromEntries(claves.map(clave => [clave, data[clave]]))
    );
    

    

    const updateStatus = async ()  => {
        const data = {
            id: dataEdit.id,
            activated: dataEdit.activated,
            table: table,
        }
        const response = await useFetchBackend(`updateStatusGenerics`, 'POST', data)
        if (response.errno) {
            toast.error(`Hubo un error, intentalo más tarde...`)
        }
        setUpdate(!update)
        toast.success(`Elemento exitosamente ${dataEdit.activated == 1 ? "Desactivado" : "Activado"}`)
    }


  return (
    <>

    {
        (dataEdit && dataEdit.activated == 0) && 
        <tr className={`${styles.row}`}>
            {
                <>
                    {(dataEdit && dataEdit.activated == 0) && (
                        () => {
                            var elements = []
                            Object.keys(dataEdit).forEach((Ukey, index) => { // Ukey de Unique Key
                                if (Ukey == "id" || Ukey == "activated") {
                                    ()=>{}
                                } else{
                                elements.push(<td key={index} className={styles.cell}>{
                                    
                                    Ukey == "entidad_id" ?
                                    entidades && entidades.find(entidad => entidad.id == dataEdit[Ukey]).nombre
                                    :
                                    Ukey == "tipo_bono_id" ?
                                    tiposBono && tiposBono.find(tipoBono => tipoBono.id == dataEdit[Ukey]).nombre
                                    :
                                    dataEdit[Ukey]

                                    
                                }</td>)}
                            })
                            return elements
                        }
                    )()
                        
                    }
                    
                        <td className={styles.cell}><p className={styles.btn} onClick={updateStatus}>✅</p></td>
    
                </>
            }

        </tr>
    }
    </>
  )
}
