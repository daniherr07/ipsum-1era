'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import Card from './Card'
import { useEffect } from 'react'
import { useFetchBackend } from '@/hooks/useFetchApi'




export default function MainSearch({label, value, isDisabled}){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [id, setId] = useState(null)
    const [bitData, setBitData] = useState()
    const [order, setOrder] = useState("asc")


    

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
        useFetchBackend(`projectNames?label=${label}&value=${value}&order=${order}&isDisabled=${isDisabled}`, "GET")
            .then((data) => {
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