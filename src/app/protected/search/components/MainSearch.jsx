'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import Card from './Card'
import { useEffect } from 'react'
import { useFetchBackend } from '@/hooks/useFetchApi'




export default function MainSearch({label, value}){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [id, setId] = useState(null)
    const [bitData, setBitData] = useState()


    

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
        useFetchBackend(`projectNames?label=${label}&value=${value}`, "GET")
            .then((data) => {
                setPName(data)
                setLoading(false)
            })
    }, [])

    const handleColor = () => {
        useFetchBackend(`projectNames?label=${label}&value=${value}`, "GET")
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
                            <p>Encontrados: {Object.keys(pName).length}</p>
                        }
                        
                        <section className={style.cardsContainer}>
                            
                            {
                                isLoading ? <p>Loading...</p> :
                                pName.map((item) => (
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