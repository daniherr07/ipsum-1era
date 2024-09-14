'use client'
import { useState } from 'react'
import style from './mainSearch.module.css'
import { useSearchParams } from 'next/navigation'

export default function MainSearch(){
    const searchParams = useSearchParams()
    const [id, setId] = useState(null)

    var bonos
    var entidades

    const handleId = (cardId) => {
        setId(cardId)
    }

    const data = [{
        "id": 0,
        "name": "Felipe Vásquez M.",
        "bono": "Articulo 59",
        "entidad": "Mutual"
    }, 
    {
        "id": 1,
        "name": "Steven Salazar",
        "bono": "CLP",
        "entidad": "Mucap"
    },
    {
        "id": 2,
        "name": "Max Corrales",
        "bono": "CLP",
        "entidad": "Mutual"
    },
    {
        "id": 3,
        "name": "Daniel Jiménez",
        "bono": "Articulo 59",
        "entidad": "Mucap"
    }]


    if (searchParams.size != 0) {
        bonos = searchParams?.get('bono')?.split(',')
        entidades = searchParams?.get('entidad')?.split(',')

        if (bonos != null) {
            bonos.forEach((bono, index) => {
                bonos[index] = bono.replace('_',' ')
            })
        }

        if (entidades != null) {
            entidades.forEach((entidad, index) => {
                entidades[index] = entidad.replace('_',' ')
            })
        }

    }

    return(
        <>

        {
            searchParams.size == 0 
            
            ?
            <>
                <section className={style.cardsContainer}>
                    {
                    data.map((item) => (
                        <div className={`${style.card} ${item.id == id ? style.focused : null}`} key={item.id} onClick={() => handleId(item.id)}>
                            <h1 className={style.cardName}>{item.name}</h1>
                        </div>
                    ))
                    
                    }
                </section>
                
                {
                    id == null 
                    
                    ?
                    <section className={style.info}>

                    </section>

                    :
                    <section className={style.info}>
                        <ul style={{listStyle: "none"}}>
                            <li>{data[id].bono}</li>
                            <li>{data[id].entidad}</li>
                        </ul>
                    </section>


                }
            </>
            :
            <>
                <section className={style.cardsContainer}>
                    {
                    data.map((item) => {
                        var bonoBool = false
                        var entiBool = false

                        if (bonos != null) {
                            if (bonos.includes(item.bono)) {
                                bonoBool = true;
                            }   
                        } else bonoBool = true;

                        if (entidades != null) {
                            if (entidades.includes(item.entidad)) {
                                entiBool = true
                            }
                        } else entiBool = true

                        if (bonoBool && entiBool) {
                            return(
                                <div className={`${style.card} ${item.id == id ? style.focused : null}`} key={item.id} onClick={() => handleId(item.id)}>
                                    <h1 className={style.cardName}>{item.name}</h1>
                                </div>
                            )
                        } else{
                            return
                        }

                    })
                    
                    }
                </section>

                {
                    id == null 
                    
                    ?
                    <section className={style.info}>

                    </section>

                    :
                    <section className={style.info}>
                        <ul style={{listStyle: "none"}}>
                            <li>{data[id].bono}</li>
                            <li>{data[id].entidad}</li>
                        </ul>
                    </section>


                }
                

            </>
            
        }
        

        </>
    )
}