'use client'

import Image from 'next/image';
import style from './navbar/navbar.module.css'
import SelectPicker from './navbar/components/SelectPicker';
import { useState } from 'react';



export default function Accordion({searchBar = true}){

    console.log("Search bar es:" + searchBar)
    const [opened, setOpened] = useState(false)

    const handleOpened = () => {
        setOpened(!opened)

    }

    return(
    <div className={style.accordion} style={ opened ?{top: "0"} : {top: "-13.1em"}}>
        <form 
        action="/api/search" 
        method='POST' 
        className={style.searchBarAccordion} 
        style={
                     searchBar == false ? {display: "none !important" } : null
                }>
            <SelectPicker></SelectPicker>
            
            <button type="submit" style={{background: "none", border: "none"}} className={style.lupaContainer}>
                <Image src={'lupa.svg'} width={20} height={20}  className={style.lupa}/>
            </button>
        </form>

        <ul className={style.options}>
            <li className={style.option}>Usuario</li>
            <li className={style.option}>Crear nuevo caso</li>
            <li className={style.option}>Mantenimiento</li>
        </ul>

        <Image 
            src={'hamburger.svg'} 
            width={20} 
            height={20} 
            className={style.ham}
            style={
                opened ?
                {top: "1em", right: "5vw"}
                :
                {top: "14.2em", right: "5vw"}
            }
            onClick={handleOpened} 
            />
    </div>
    )
}