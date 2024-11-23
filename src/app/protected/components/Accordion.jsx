'use client'

import Image from 'next/image';
import style from './navbar/navbar.module.css'
import SelectPicker from './navbar/components/SelectPicker';
import { useState } from 'react';



export default function Accordion({searchBar = true}){

    const [opened, setOpened] = useState(false)

    const handleOpened = () => {
        setOpened(!opened)

    }

    return(
    <div className={style.accordion} style={ opened ?{top: "0"} : {top: "-13.1em"}}>

        <ul className={style.options}>
            <li className={style.option}>
                <form action="/api/users" method='POST' >
                
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Usuarios</p>
                    </button>
                </form>
            </li>
            <li className={style.option}>
                <form action="/api/users" method='POST' >
                    
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Control de Usuarios</p>
                    </button>
                </form>
            </li>
            <li className={style.option}>
                <form action="/api/new-project" method='POST' >
                
                    <button type="submit" style={{background: "none", border: "none"}}>
                        <p className={style.option}>Nuevo proyecto</p>
                    </button>
                </form>
            </li>
        </ul>

        <Image 
            src={'/hamburger.svg'} 
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
            alt='hamburger'
            />
    </div>
    )
}