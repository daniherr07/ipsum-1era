'use client'

import { useSearchParams } from "next/navigation";
import { TagPicker } from "rsuite"
import 'rsuite/dist/rsuite-no-reset.min.css';
import style from '../navbar.module.css'
import { Suspense } from 'react'


export default function SelectPicker() {
    const searchParams = useSearchParams()

    const data = ['Bono: Articulo 59', 'Bono: CLP', 'Entidad: Mutual', 'Entidad: Mucap'].map(
        item => ({ label: item, value: item })
    );

    var bonos
    var entidades

    if (searchParams.size != 0) {
        bonos = searchParams?.get('bono')?.split(',')
        entidades = searchParams?.get('entidad')?.split(',')

        if (bonos != null) {
            bonos.forEach((bono, index) => {
                bonos[index] = bono.replace('_',' ')
                bonos[index] = "Bono: " + bonos[index]
            })
        }

        if (entidades != null) {
            entidades.forEach((entidad, index) => {
                entidades[index] = entidad.replace('_',' ')
                entidades[index] = "Entidad: " + entidades[index]
            })
        }

    }

    console.log(bonos)
    console.log(entidades)


    var allTags = []
    var allTags = allTags.concat(bonos).concat(entidades)

    console.log(allTags)

    return(
        <>
        <Suspense>
            {
                searchParams.size == 0 
                ?

                <TagPicker 
                data={data} 
                name='tags' 
                className={style.inputText} 
                placeholder='Buscar...'
                /> 

                :

                <TagPicker 
                data={data} 
                name='tags' 
                className={style.inputText} 
                placeholder='Buscar...'
                defaultValue={allTags}
                /> 
            }
        </Suspense>
            
            
        </>


    )
    
}