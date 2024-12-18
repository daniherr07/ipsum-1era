'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import Card from './Card'
import { useEffect } from 'react'
import { address } from '@/app/const'



export default function MainSearch({label, value}){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [id, setId] = useState(null)

    function ordenarData() {

        const sortedData = pName.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setData(sortedData)
    }
    

    const handleClick = (item) =>{
        fetch(`${address}/getData/${item.nombre}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data[0])
                setId(item.id)
                
            })            
    }


    useEffect(() => {
        fetch(`${address}/projectNames?label=${label}&value=${value}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPName(data)
                setLoading(false)
                
            })
    }, [])


    
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
                                    <div className={`${style.card} ${item.id == id ? style.focused : null}`} key={item.id} onClick={() => {handleClick(item)}}>
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
                            <Card item={data} />
                        </section>

                    }
                </>
                
            }
        
        </>
    )
}