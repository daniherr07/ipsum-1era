'use client'

import { useState } from 'react'
import style from './mainSearch.module.css'
import { useSearchParams } from 'next/navigation'
import Card from './Card'
import { useEffect } from 'react'
import Filter from './Filter'



export default function MainSearch(){
    const [pName, setPName] = useState()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState()
    const searchParams = useSearchParams()
    const [id, setId] = useState(null)

    function ordenarData() {

        const sortedData = pName.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setData(sortedData)
    }
    

    const handleClick = (item) =>{
        fetch(`https://ipsum-backend.vercel.app/getData/${item.nombre}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data[0])
                setId(item.id)
                console.log(data[0])
            })            
    }


    useEffect(() => {
        fetch('https://ipsum-backend.vercel.app/projectNames')
            .then((res) => res.json())
            .then((data) => {
                setPName(data)
                setLoading(false)
                console.log(data)
                
            })
    }, [])


    
    return(
        <>
            { 
                <>
                    <div className={style.cardsContainerAll}>
                        <Filter ordenarData={ordenarData}></Filter>
                        {
                            isLoading ? <p>Loading...</p> :
                            <p>Cantidad: {Object.keys(pName).length}</p>
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