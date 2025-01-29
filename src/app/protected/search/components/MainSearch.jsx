'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import Card from './Card'
import { useEffect } from 'react'
import { useFetchBackend } from '@/hooks/useFetchApi'
import { useProtectedContext } from '@/app/context/ProtectedContext'




export default function MainSearch({label, value, isDisabled, etapa_id, tipo_bono_id}){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [id, setId] = useState(null)
    const [bitData, setBitData] = useState()
    const [order, setOrder] = useState("asc")
    const userData = useProtectedContext();
    const role = userData.role
    let filterRole;
    let needFilter = false;

    switch (role) {
        case "Analista":
            needFilter = true
            filterRole = "analista_asigna_ipsum_id"
            break;

        case "Promotor":
            needFilter = true;
            filterRole = "promotor_interno_id"
            break;

        case "Ingeniero":
            needFilter = true;
            filterRole = "ingeniero_id"
            break;

        case "Arquitecto":
            needFilter = true;
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
                console.log(data)
                setId(item.id)
        })
                  
    }

    useEffect(() => {
        useFetchBackend(`projectNames?label=${label}&value=${value}&order=${order}&isDisabled=${isDisabled}&etapa_id=${etapa_id}&tipo_bono_id=${tipo_bono_id}&filter_role=${filterRole}&user_id=${userData.id}`, "GET")
            .then((data) => {
                console.log(data)
                setPName(data)
                setLoading(false)
            })
    }, [order])

    const handleColor = () => {
        setLoading(true)
        useFetchBackend(`projectNames?label=${label}&value=${value}&order=${order}&isDisabled=${isDisabled}`, "GET")
            .then((data) => {
                setPName(data)
                setLoading(false)
            })
    } 

    console.log(pName)

    return(
        <>
            { 
                <>
                    <div className={style.cardsContainerAll}>
                        {
                            isLoading ? <p>Loading...</p> :
                            <p>Encontrados: {Object.keys(pName).length}</p>
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