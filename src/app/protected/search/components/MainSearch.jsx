'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import Card from './Card'
import { useEffect } from 'react'
import { useFetchBackend } from '@/hooks/useFetchApi'
import { useProtectedContext } from '@/app/context/ProtectedContext'
import { etapas } from './dataEtapas'
import { dataOtros } from './data'




export default function MainSearch({label, value, isDisabled, etapa_id, tipo_bono_id}){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [id, setId] = useState(null)
    const [bitData, setBitData] = useState()
    const [order, setOrder] = useState("asc")
    const [bonos, setBonos] = useState()
    const userData = useProtectedContext();
    const role = userData.role
    let filterRole;

    let nombresEtapas = []
    let nombresBonos = []
    let nombreOtro = "N/A";
    let valoresOtro = [];

    if (etapa_id) {
        etapa_id.split(",").forEach(element => {
            nombresEtapas.push(etapas.find(etapa => etapa.id == element).nombre)
        });
    }

    if (tipo_bono_id && bonos) {
        tipo_bono_id.split(",").forEach(element => {
            nombresBonos.push(bonos.find(bono => bono.id == element).nombre)
        });

    }

    if (label) {
        nombreOtro = dataOtros.find(elemento => elemento.value == label).label
    }


    switch (role) {
        case "Analista":
            filterRole = "analista_asigna_ipsum_id"
            break;

        case "Promotor":
            filterRole = "promotor_interno_id"
            break;

        case "Ingeniero":
            filterRole = "ingeniero_id"
            break;

        case "Arquitecto":
            filterRole = "arquitecto_id"
            break;
        default:
            break;
    }


    

    const handleClick = (item) =>{
        useFetchBackend(`getData/${item.id}`, "GET")
            .then((data) => {
                setData(data[0][0])
                setBitData(data[1])
                setId(item.id)
        })
                  
    }

    useEffect(() => {
        useFetchBackend(`projectNames?label=${label}&value=${value}&order=${order}&isDisabled=${isDisabled}&etapa_id=${etapa_id}&tipo_bono_id=${tipo_bono_id}&filter_role=${filterRole}&user_id=${userData.id}`, "GET")
            .then((data) => {
                setPName(data)
                setLoading(false)
            })
    }, [order, bitData, label, value, isDisabled, etapa_id, tipo_bono_id])


    useEffect(() => {
        useFetchBackend(`getBonosSimple`, "GET")
            .then((data) => {
                setBonos(data)
            })
    }, [])

    const handleColor = () => {
        setLoading(true)
        useFetchBackend(`projectNames?label=${label}&value=${value}&order=${order}&isDisabled=${isDisabled}`, "GET")
            .then((data) => {
                setPName(data)
                setLoading(false)
            })
    } 

    return(
        <>
            { 
                <>
                    <div className={style.cardsContainerAll}>
                        {
                            isLoading ? <p>Loading...</p> :
                            pName && 
                            
                            <>
                            <p><b>Encontrados: </b>{Object.keys(pName).length}</p>

                            <p><b>Etapa:</b> {nombresEtapas.length >= 1 ? nombresEtapas.join(", ") : "N/A"}</p>
                            <p><b>Tipo de Bono: </b>{nombresBonos.length >= 1 ? nombresBonos.join(", ") : "N/A"}</p>
                            <p><b>Otro: </b>{nombreOtro}</p>
                            
                            </>
                            
                        }

                        <div className={style.filterSelectContainer}>
                            <label htmlFor="order">Filtrar Por Fecha</label>
                            <select
                            name="order"
                            id="order"
                            value={order}
                            className={style.newModalInput}
                            onChange={e => setOrder(e.target.value)}
                            >
                                <option value="asc">
                                Más antiguo primero
                                </option>

                                <option value="desc">
                                Más reciente primero
                                </option>

                            </select>
                        </div>
                        
                        <section className={style.cardsContainer}>    
                            
                            {
                                isLoading ? <p>Loading...</p> :
                                pName && pName.map((item) => (
                                    <div className={`${style.card} ${item.id == id ? style.focused : null}`} 
                                    key={item.id} 
                                    onClick={() => {handleClick(item)}}
                                    style={{backgroundColor: `${item.estado_color}`}}
                                    >
                                        <h1 className={style.cardName}>{item.nombre}</h1>
                                    </div>
                                ))
                            }
                        </section>
                    </div>


                    
                    {
                        id == null 
                        
                        ?
                        <section className={style.info}>

                        </section>

                        :
                        <section className={style.info}>
                            <Card item={data} bitData={bitData} handleClick={handleClick} handleColor={handleColor}/>
                        </section>

                    }
                </>
                
            }
        
        </>
    )
}